define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils'], function(FormatUtils, DataValidationHandler, InvokeServiceUtils) {

	function BusinessController() {
		this.store = {};
		this.objectMetadata = {};
		this.context = {};
		this.serviceParameters = {};
		this.dataMapping = {};
		this.breakpoints = {};
		this.formatUtils = new FormatUtils();
		this.dataValidationHandler = new DataValidationHandler();
		this.invokeServiceUtils = new InvokeServiceUtils();
		this.error = [];
	}
	/**
	 * @api : setPropertiesFromComponent
	 * set properties from component
	 * @return : NA
	 */
	BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON, dataMapping, breakpoints) {
		this.serviceParameters = serviceParameters;
		this.dataMapping = dataMapping;
		this.breakpoints = breakpoints;
	};
	/**
	 * @api : getDataBasedOnDataMapping
	 * get data from datamapping
	 * @return : NA
	 */
	BusinessController.prototype.getDataBasedOnDataMapping = function(widget) {
		var collectionObj = this.store.getState();
		for (var record in this.dataMapping) {
			var keyValues = this.dataMapping[record];
			for (var key in keyValues) {
				if (widget === key) {
					var fieldValue = this.dataMapping[record][widget];
					if (typeof fieldValue === "string") {
						if (!fieldValue.indexOf("${Collection")) {
							var group = fieldValue.split(".")[1];
							var fieldType = fieldValue.split(".")[2].replace("}", "");
							if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
								if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
									return collectionObj.Collection[group][fieldType];
								}
							}
						} else if (!fieldValue.indexOf("${i18n")) {
							return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
						}
					} else if (typeof fieldValue === "object") {
						var data = this.getDataSpecificToBreakpoint(fieldValue);
						return kony.i18n.getLocalizedString(data.substring(data.indexOf("${i18n{") + 7, data.length - 2));
					}
				}
			}
		}
		return "";
	};
	/**
	 * @api : resetCollection
	 * clears the data in collection
	 * @return : NA
	 */
	BusinessController.prototype.resetCollection = function(objectName) {
		var collectionObj = this.store.getState();
		if (objectName) {
			collectionObj["Collection"][objectName] = {};
		} else {
			collectionObj["Cache"] = {},
				collectionObj["Collection"] = {};
		}
	};
	/**
	 * @api : getDataSpecificToBreakpoint
	 * gets data specified to the corresponding breakpoint
	 * @return : NA
	 */
	BusinessController.prototype.getDataSpecificToBreakpoint = function(inputJSON) {
		var currentBreakpoint = kony.application.getCurrentBreakpoint();
		if (Object.keys(this.breakpoints).length !== 0) {
			for (var key in this.breakpoints) {
				if (currentBreakpoint === this.breakpoints[key]) {
					if (!kony.sdk.isNullOrUndefined(inputJSON.key)) {
						return inputJSON.key;
					}
				}
			}
		}
		if (inputJSON.hasOwnProperty("default")) {
			return inputJSON["default"];
		}
	};
	/**
	 * @api : setDataInCollection
	 * Store the data in context object under collection and invoke formatting data
	 * @return : NA
	 */
	BusinessController.prototype.setDataInCollection = function(context) {
		this.store.dispatch({
			type: "UPDATE_COLLECTION",
			data: context
		});
	};
	/**
	 * @api : createDomesticTransfer
	 * validate the selected bank using service call
	 * @return : NA
	 */
	BusinessController.prototype.createDomesticTransfer = function(params) {
		var scope = this;
		var payload = scope.createIntraBankAccountTransferPayload();
		var criteria = this.getCriteria(this.serviceParameters["CreateOneTimeTransfer"].Criteria);
		if (!criteria["payeeCurrency"]) criteria["payeeCurrency"] = criteria["transactionCurrency"];
		var cipsTransfers = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
		params.transactionId = "";
		criteria.verifyPayee = "true";
        criteria.toAccountNumber = criteria.toAccountNumber != "" ? criteria.toAccountNumber : params.creditorAccount;
		criteria.transactionsNotes = criteria.transactionsNotes != null ? criteria.transactionsNotes : "";
		criteria.createWithPaymentId = "false";
		criteria.amount = criteria.totalAmount;
        criteria.beneficiaryBankName=params.beneficiaryBankName;
        criteria.toAccountCurrency =  (criteria.toAccountCurrency== "" || criteria.toAccountCurrency == undefined )? "NPR" : criteria.toAccountCurrency;
		criteria.beneficiaryName = params.beneficiaryName;
		scope.store.getState().Collection["Transaction"]["accountNumber"]=params.creditorAccount;
		scope.store.getState().Collection["Transaction"]["AccountNumber"]=params.creditorAccount;
		scope.store.getState().Collection["Transaction"]["bankName"]=params.beneficiaryBankName;
		scope.store.getState().Collection["Transaction"]["beneficiaryName"]=params.beneficiaryName;
		scope.store.getState().Collection["Transaction"]["beneficiaryBankName"]=params.beneficiaryBankName;
		scope.store.getState().Collection["Transaction"]["payeeName"]=params.beneficiaryName;
		params = Object.assign(params, criteria);
		params.transactionAmount = params.transactionAmount.toString().replace(/,/g, "");
		params.amount = params.amount.toString().replace(",","");
		params.totalAmount = params.totalAmount.toString().replace(",","");
        params.transactionCurrency = "NPR";
		cipsTransfers.customVerb("createExternalTransaction", params, getOtherBankTransferCompletionCallback);

		function getOtherBankTransferCompletionCallback(status, data, error) {
			var srh = applicationManager.getServiceResponseHandler();
			var obj = srh.manageResponse(status, data, error);
			if (data && data.MFAAttributes) {
				if (data.MFAAttributes.isMFARequired == "true") {
					var mfaJSON = {
						"flowType": "INTERBANKDOMESTICTRANSFER",
						"response": data
					};
					applicationManager.getMFAManager().initMFAFlow(mfaJSON);
				}
			} 
			else{
			if (obj["status"] === true) {
				scope.setAcknowledgementInCollection("CIPSTransfers", data);
			} else {
				var objectName = "Transaction";
				var collectionObj = scope.store.getState();
				//collectionObj.Collection["Transaction"].createSuccess="false";
				collectionObj.Collection["Transaction"].validateSuccess = false;
				if (error != null) collectionObj.Collection["Transaction"]["errorDetails"] = error;
				else {
					error = {};
					error.dbpErrCode = data.dbpErrCode;
					error.dbpErrMsg = data.dbpErrMsg;
				}
				error.serverErrorRes = {};
				collectionObj.Collection["Transaction"]["errorDetails"] = error;
				scope.setError("invokeCustomVerbforCreateTransaction", error);
			}
		}
		};
	};
	BusinessController.prototype.createOtherBankTransferWithNewPayee_old = function(params) {
		var scope = this;
		var payload = scope.createIntraBankAccountTransferPayload();
		var cipsTransfers = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
		//cipsTransfers.customVerb('createOtherBankTransfer', params, getCompletionCallback);
		var intraBankTansfer = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
		intraBankTansfer.customVerb("IntraBankAccFundTransfer", payload, getIntraBankCompletionCallback);

		function getIntraBankCompletionCallback(status, data, error) {
			var srh = applicationManager.getServiceResponseHandler();
			var obj = srh.manageResponse(status, data, error);
			if (data && data.MFAAttributes) {
				if (data.MFAAttributes.isMFARequired == "true") {
					var mfaJSON = {
						"flowType": "INTRABANKDOMESTICTRANSFER",
						"response": data
					};
					applicationManager.getMFAManager().initMFAFlow(mfaJSON);
				}
			} else {
				if (obj["status"] === true) {
					payload.transactionId = data.referenceId;
					payload.transactionDetails = data;
					cipsTransfers.customVerb('createOtherBankTransfer', params, getOtherBankTransferCompletionCallback);
				} else {
					//delete scope.store.getState().Collection["Transaction"];
					var collectionObj = scope.store.getState();
					//collectionObj.Collection["Transaction"].createSuccess="false";
					collectionObj.Collection["Transaction"].validateSuccess = false;
					if (error != null)
						collectionObj.Collection["Transaction"]["errorDetails"] = error;
					else {
						error = {};
						error.dbpErrCode = data.dbpErrCode;
						error.dbpErrMsg = data.dbpErrMsg;
					}
					error.serverErrorRes = {};

					scope.setError("invokeCustomVerbforCreateTransaction", error);
				}
			}
		};

		function getOtherBankTransferCompletionCallback(status, data, error) {
			var srh = applicationManager.getServiceResponseHandler();
			var obj = srh.manageResponse(status, data, error);
			if (obj["status"] === true) {
				scope.setAcknowledgementInCollection("CIPSTransfers", data);
			} else {
				var objectName = "Transaction";
				var collectionObj = scope.store.getState();
				//collectionObj.Collection["Transaction"].createSuccess="false";
				collectionObj.Collection["Transaction"].validateSuccess = false;
				if (error != null)
					collectionObj.Collection["Transaction"]["errorDetails"] = error;
				else {
					error = {};
					error.dbpErrCode = data.dbpErrCode;
					error.dbpErrMsg = data.dbpErrMsg;
				}
				error.serverErrorRes = {};
				collectionObj.Collection["Transaction"]["errorDetails"] = error;
				scope.setError("invokeCustomVerbforCreateTransaction", error);
			}
		};


		/*function getCompletionCallback(status, data, error) {
		  var srh = applicationManager.getServiceResponseHandler();
		  var obj =  srh.manageResponse(status, data, error);
		  if(obj["status"] === true){
		    scope.setAcknowledgementInCollection("CIPSTransfers", data);
		  }
		  else {
		    scope.setError("invokeCustomVerbforCreateTransaction");
		  }
		}
		*/
	};
	BusinessController.prototype.createIntraBankAccountTransferPayload = function() {
		var collectionObj = this.store.getState();
		//var payload={};
		var serviceName = "IntraBankAccFundTransfer";
		var payload = this.getCriteria(this.serviceParameters[serviceName].Criteria);
		if (!payload["toAccountCurrency"]) payload["toAccountCurrency"] = payload["transactionCurrency"];
		if (payload["amount"]) payload["amount"] = this.getDeformattedAmount(payload["amount"]);
		//payload.validate = "true"
		payload.ExternalAccountNumber = "15481757"; //parking Account Number
		payload.beneficiaryName = "Gandreddi098"; //parking Account Name
		payload.createWithPaymentId = "true";
		payload.toAccountNumber = "15481757"; //parking Account Number
		payload.paidBy = "";
		return payload;
	};

	/**
	 * @api : createPaymentService
	 * validate the selected bank using service call
	 * @return : NA
	 */
	BusinessController.prototype.createPaymentService = function() {
		var scope = this;
		var internalNationTransfers = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CrossBorderPayments");
		internalNationTransfers.customVerb('createPayment', true, getCompletionCallback);

		function getCompletionCallback(status, data, error) {
			var srh = applicationManager.getServiceResponseHandler();
			var obj = srh.manageResponse(status, data, error);
			if (obj["status"] === true) {
				scope.setAcknowledgementInCollection("CrossBorderPayments", data);
			} else {
				scope.setError("invokeCustomVerbforCreateTransaction");
			}
		}
	};
	/**
	 * @api : invokeCustomVerbforCreateTransaction
	 * invoke the transaction data using service call
	 * @return : NA
	 */
	BusinessController.prototype.invokeCustomVerbforCreateTransaction = function() {
		kony.application.showLoadingScreen();
		var scope = this;
		var collectionObj = this.store.getState();
		var transObj = collectionObj.Collection["Transaction"];
		var serviceName = "";
		var transferType = collectionObj.Collection["Transaction"]["transferType"];
		var accountType = collectionObj.Collection["Transaction"]["accountType"];
		var transferSubType = collectionObj.Collection["Transaction"]["transferSubType"];
		var navManager = applicationManager.getNavigationManager();
		if (transferType !== "Domestic Transfer") {
			if (collectionObj.Collection["Transaction"]["payeeType"] === "Existing Payee") {
				if (transferType === "Same Bank") {
					if (accountType === "External") {
						serviceName = "IntraBankAccFundTransfer";
						navManager.setCustomInfo("Transfer_serviceName", "INTRABANKTRANSFER");
					} else if (accountType === "CreditCard") {
						serviceName = "createCreditCardTransfer";
						navManager.setCustomInfo("Transfer_serviceName", serviceName);
					} else if (accountType === "Loan") {
						if (transferSubType === "PayOther") {
							serviceName = "PayOther";
							navManager.setCustomInfo("Transfer_serviceName", serviceName);
						} else {
							serviceName = "PayDue";
							navManager.setCustomInfo("Transfer_serviceName", serviceName);
						}
					} else {
						serviceName = "TransferToOwnAccounts";
						navManager.setCustomInfo("Transfer_serviceName", "WITHINSAMEBANK");
					}
				} else if (transferType === "Domestic Transfer") {
					serviceName = "InterBankAccFundTransfer";
					navManager.setCustomInfo("Transfer_serviceName", serviceName);
				} else if (transferType === "International Transfer") {
					serviceName = "InternationalAccFundTransfer";
					navManager.setCustomInfo("Transfer_serviceName", serviceName);
				} else {
					serviceName = "P2PTransfer";
					navManager.setCustomInfo("Transfer_serviceName", serviceName);
				}
			} else {
				serviceName = "CreateOneTimeTransfer";
				navManager.setCustomInfo("Transfer_serviceName", serviceName);
			}
		} else {
			//serviceName = "OtherBankTransferWithNewPayee";
			var params = {
				"amount": transObj.amount,
				"currency": transObj.transactionCurrency,
				"debtorAgent": "0701",
				"debtorBranch": "1",
				"debtorName": transObj.fromAccountName,
				"debtorAccount": transObj.fromAccountNumber,
				"creditorAgent": transObj.bankId,
				"beneficiaryBankName": transObj.bankName,
				"creditorBranch": transObj.branchCode,
				"creditorName": transObj.creditorName,
				"creditorAccount": transObj.creditorAccount,
				"serviceCharge": transObj.serviceCharge,
				"bankId": transObj.bankId,
				"convertedAmount": transObj.convertedAmount,
				"feeCurrency": "NPR",
				"beneficiaryName": transObj.beneficiaryName
			}
			this.createDomesticTransfer(params);
			return;
		}

		kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
		var criteria = this.getCriteria(this.serviceParameters[serviceName].Criteria);
		if (!criteria["toAccountCurrency"]) criteria["toAccountCurrency"] = criteria["transactionCurrency"];
		if (criteria["amount"]) criteria["amount"] = this.getDeformattedAmount(criteria["amount"]);
		if (criteria["transactionAmount"]) criteria["transactionAmount"] = this.getDeformattedAmount(criteria["transactionAmount"]);
	/*	if(!(transObj.isBalanceAvailableWithFee)){
			scope.dataJSON["createSuccess"] = "false";
			this.store.dispatch({
				type: "UPDATE_COLLECTION",
				data: transObj,
				key: "Transaction"
			});
		}*/
		scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters[serviceName].Object, criteria, this.serviceParameters[serviceName].Verb)
			.then(this.setAcknowledgementInCollection.bind(this, this.serviceParameters[serviceName].Object))
			.catch(scope.setError.bind(this, "invokeCustomVerbforCreateTransaction"));
	};

	/**
	 * @api : invokeCustomVerbforEditTransaction
	 * invoke the transaction data using service call
	 * @return : NA
	 */
	BusinessController.prototype.invokeCustomVerbforEditTransaction = function() {
		var scope = this;
		var collectionObj = this.store.getState();
		var serviceName = "";
		var transferType = collectionObj.Collection["Transaction"]["transferType"];
		var accountType = collectionObj.Collection["Transaction"]["accountType"];
		if (collectionObj.Collection["Transaction"]["payeeType"] === "Existing Payee") {
			if (transferType === "Same Bank") {
				if (accountType === "External") serviceName = "IntraBankAccFundTransferEdit";
				else serviceName = "TransferToOwnAccountsEdit";
			} else if (transferType === "Domestic Transfer") serviceName = "InterBankFundTransferEdit";
			else if (transferType === "International Transfer") serviceName = "InternationalFundTransferEdit";
		} else if (collectionObj.Collection["Transaction"]["payeeType"] === "New Payee" && transferType === "Domestic Transfer") {
			serviceName = "OtherBankTransferWithNewPayee";
		} else {
			serviceName = "CreateOneTimeTransfer";
		}
		kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
		var criteria = this.getCriteria(this.serviceParameters[serviceName].Criteria);
		if (!criteria["payeeCurrency"]) criteria["payeeCurrency"] = criteria["transactionCurrency"];
		if (criteria["amount"]) criteria["amount"] = this.getDeformattedAmount(criteria["amount"]);
		if (criteria["transactionAmount"]) criteria["transactionAmount"] = this.getDeformattedAmount(criteria["transactionAmount"]);
		scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters[serviceName].Object, criteria, this.serviceParameters[serviceName].Verb)
			.then(this.setAcknowledgementInCollection.bind(this, this.serviceParameters[serviceName].Object))
			.catch(scope.setError.bind(this, "invokeCustomVerbforEditTransaction"));
	};
	/**
	 * @api : getCriteria
	 * Parse the criteria based and set context values.
	 * @param : criteria {JSON} - value collected from exposed contract
	 * @return : {JSONObject} - jsonvalue for criteria
	 */
	BusinessController.prototype.getCriteria = function(criteriaJSON) {
		var collectionObj = this.store.getState();
		var criteria = JSON.parse(JSON.stringify(criteriaJSON));
		for (var key in criteria) {
			var value = criteria[key];
			if (typeof value === "string") {
				if (value.indexOf("$") !== -1) {
					var token = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
					var objectName = token.split(".")[1];
					token = token.split(".")[2];
					if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName]) && !kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName][token])) {
						criteria[key] = collectionObj.Collection[objectName][token];
					} else {
						criteria[key] = "";
					}
				}
			}
		}
		return criteria;
	};

	/**
	 * @api : setWithInSameBankAcknowledgement
	 * sets acknowledgement data in collection for SameBank Transfer
	 * @return : NA
	 */
	BusinessController.prototype.setInterDomesticTransferAcknowledgement = function(status,data,error) {
		var scope=this;
			if (data && data.MFAAttributes) {
				if (data.MFAAttributes.isMFARequired == "true") {
					var mfaJSON = {
						"flowType": "INTERBANKDOMESTICTRANSFER",
						"response": data
					};
					applicationManager.getMFAManager().initMFAFlow(mfaJSON);
				}
			} 
			else {
			kony.application.dismissLoadingScreen();
			var collectionObj = this.store.getState();
			var objectName = "Transaction";
			scope.dataJSON = collectionObj.Collection[objectName];
			var successMessage = this.getDataBasedOnDataMapping("lblSuccess");
			var pendingMessage = this.getDataBasedOnDataMapping("lblPending");
			if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
				scope.dataJSON = collectionObj.Collection[objectName];
			} else {
				collectionObj.Collection[objectName] = {};
				scope.dataJSON = collectionObj.Collection[objectName];
			}
			if (data.messageDetails) {
				scope.dataJSON["messageDetails"] = data.messageDetails;
			} else {
				delete scope.dataJSON.messageDetails;
			}
			if((data.referenceId && data.paymentId) && scope.dataJSON["transferType"] == "Domestic Transfer"){
				data.referenceId = data.paymentId;
			}
			if ((data.referenceId || data.id) && (data.status === "failed" || data.status === "success") && (data.message === "Transaction Reversed")) {
				scope.dataJSON["message"] = data.errorMessage ? data.errorMessage : successMessage;
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.backendReferenceId && (data.status === "Sent" || data.status === "success")) {
				scope.dataJSON["referenceId"] = data.backendReferenceId;
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if ((data.referenceId || data.id) && (data.status === "Sent" || data.status === "success")) {
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.Id || data.PayPersonId) {
				scope.dataJSON["referenceId"] = data.Id ? data.Id : data.PayPersonId;
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.status === "Pending") {
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["message"] = data.message ? data.message : pendingMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.status === "Denied") {
				scope.dataJSON["message"] = data.message;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.errmsg || data.dbpErrMsg) {
				scope.dataJSON["errorDetails"] = data;
				scope.dataJSON["createSuccess"] = "false";
			} else if (data.MFAAttributes) {
				scope.dataJSON["serviceName"] = collectionObj.Collection[objectName].serviceName;
				scope.dataJSON["MFAAttributes"] = data.MFAAttributes;
			} else if (data.payeeVerificationStatus === "Failure") {
				scope.dataJSON["payeeVerificationStatus"] = "Failure";
				scope.dataJSON["payeeVerificationErrMsg"] = data.payeeVerificationErrMsg;
				scope.dataJSON["payeeVerifica                                                                                                           tionName"] = data.payeeVerificationName;
				scope.dataJSON["createSuccess"] = "false";
			}
			this.store.dispatch({
				type: "UPDATE_COLLECTION",
				data: scope.dataJSON,
				key: objectName
			});
		}
		};
	BusinessController.prototype.setWithInSameBankAcknowledgement = function(data) {
		var scope = this;
		if (data && data.MFAAttributes) {
			if (data.MFAAttributes.isMFARequired == "true") {
				var mfaJSON = {
					"flowType": "WITHINSAMEBANK",
					"response": data
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			}
		} else {
			kony.application.dismissLoadingScreen();
			var collectionObj = this.store.getState();
			var objectName = "Transaction";
			var successMessage = this.getDataBasedOnDataMapping("lblSuccess");
			var pendingMessage = this.getDataBasedOnDataMapping("lblPending");
			if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
				scope.dataJSON = collectionObj.Collection[objectName];
			} else {
				collectionObj.Collection[objectName] = {};
				scope.dataJSON = collectionObj.Collection[objectName];
			}
			if (data.messageDetails) {
				scope.dataJSON["messageDetails"] = data.messageDetails;
			} else {
				delete scope.dataJSON.messageDetails;
			}
			if (data.backendReferenceId && (data.status === "Sent" || data.status === "success")) {
				scope.dataJSON["referenceId"] = data.backendReferenceId;
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if ((data.referenceId || data.id) && (data.status === "Sent" || data.status === "success")) {
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.Id || data.PayPersonId) {
				scope.dataJSON["referenceId"] = data.Id ? data.Id : data.PayPersonId;
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.status === "Pending") {
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["message"] = data.message ? data.message : pendingMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.status === "Denied") {
				scope.dataJSON["message"] = data.message;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.errmsg || data.dbpErrMsg) {
				scope.dataJSON["errorDetails"] = data;
				scope.dataJSON["createSuccess"] = "false";
			} else if (data.MFAAttributes) {
				scope.dataJSON["serviceName"] = collectionObj.Collection[objectName].serviceName;
				scope.dataJSON["MFAAttributes"] = data.MFAAttributes;
			} else if (data.payeeVerificationStatus === "Failure") {
				scope.dataJSON["payeeVerificationStatus"] = "Failure";
				scope.dataJSON["payeeVerificationErrMsg"] = data.payeeVerificationErrMsg;
				scope.dataJSON["payeeVerificationName"] = data.payeeVerificationName;
				scope.dataJSON["createSuccess"] = "false";
			}
			this.store.dispatch({
				type: "UPDATE_COLLECTION",
				data: scope.dataJSON,
				key: objectName
			});
		}
	};
	BusinessController.prototype.setDomesticTransferAcknowledgement = function(data) {
		var scope = this;
		if (data && data.MFAAttributes) {
			if (data.MFAAttributes.isMFARequired == "true") {
				var mfaJSON = {
					"flowType": "INTRABANKDOMESTICTRANSFER",
					"response": data
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			}
		} else if ((data.referenceId || data.id) && (data.status === "failed" || data.status === "success") && (data.message === "Transaction Reversed")) {
			scope.dataJSON["message"] = data.errorMessage ? data.errorMessage : successMessage;
			scope.dataJSON["referenceId"] = data.referenceId;
			scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
			scope.dataJSON["createSuccess"] = "true";
		} else {
			if (data.status === "Sent" && data.referenceId != "") {
				var payload = scope.createIntraBankAccountTransferPayload();
				var cipsTransfers = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
				var navManager = applicationManager.getNavigationManager();
				var params = navManager.getCustomInfo("domesticTransfer_param");
				payload.transactionId = data.referenceId;
				payload.transactionDetails = data;
				cipsTransfers.customVerb('createOtherBankTransfer', params, getOtherBankTransferCompletionCallback);
			} else {
				//delete scope.store.getState().Collection["Transaction"];
				var collectionObj = scope.store.getState();
				//collectionObj.Collection["Transaction"].createSuccess="false";
				collectionObj.Collection["Transaction"].validateSuccess = false;
				if (error != null)
					collectionObj.Collection["Transaction"]["errorDetails"] = error;
				else {
					error = {};
					error.dbpErrCode = data.dbpErrCode;
					error.dbpErrMsg = data.dbpErrMsg;
				}
				error.serverErrorRes = {};
				scope.setError("invokeCustomVerbforCreateTransaction", error);
			}
		}

		function getOtherBankTransferCompletionCallback(status, data, error) {
			var srh = applicationManager.getServiceResponseHandler();
			var obj = srh.manageResponse(status, data, error);
			if (obj["status"] === true) {
				scope.setAcknowledgementInCollection("CIPSTransfers", data);
			} else {
				var objectName = "Transaction";
				var collectionObj = scope.store.getState();
				//collectionObj.Collection["Transaction"].createSuccess="false";
				collectionObj.Collection["Transaction"].validateSuccess = false;
				if (error != null) collectionObj.Collection["Transaction"]["errorDetails"] = error;
				else {
					error = {};
					error.dbpErrCode = data.dbpErrCode;
					error.dbpErrMsg = data.dbpErrMsg;
				}
				error.serverErrorRes = {};
				collectionObj.Collection["Transaction"]["errorDetails"] = error;
				scope.setError("invokeCustomVerbforCreateTransaction", error);
			}
		};
	};

	/**
	 * @api : setAcknowledgementInCollection
	 * sets acknowledgement data in collection
	 * @return : NA
	 */
	BusinessController.prototype.setAcknowledgementInCollection = function(object, data) {
		kony.application.dismissLoadingScreen();
		var scope = this;
		if (data && data.MFAAttributes) {
			if (data.MFAAttributes.isMFARequired == "true") {
				var navManager = applicationManager.getNavigationManager();
				var flowType = navManager.getCustomInfo("Transfer_serviceName");
				var mfaJSON = {
					"flowType": flowType,
					"response": data
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			}
		} else {
			kony.application.dismissLoadingScreen();
			var collectionObj = this.store.getState();
			var objectName = "Transaction";
			scope.dataJSON = collectionObj.Collection[objectName];
			var successMessage = this.getDataBasedOnDataMapping("lblSuccess");
			var pendingMessage = this.getDataBasedOnDataMapping("lblPending");
			if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
				scope.dataJSON = collectionObj.Collection[objectName];
			} else {
				collectionObj.Collection[objectName] = {};
				scope.dataJSON = collectionObj.Collection[objectName];
			}
			if (data.messageDetails) {
				scope.dataJSON["messageDetails"] = data.messageDetails;
			} else {
				delete scope.dataJSON.messageDetails;
			}
			if((data.referenceId && data.paymentId) && scope.dataJSON["transferType"] == "Domestic Transfer"){
				data.referenceId = data.paymentId;
			}
			if ((data.referenceId || data.id) && (data.status === "failed" || data.status === "success") && (data.message === "Transaction Reversed")) {
				scope.dataJSON["message"] = data.errorMessage ? data.errorMessage : successMessage;
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.backendReferenceId && (data.status === "Sent" || data.status === "success")) {
				scope.dataJSON["referenceId"] = data.backendReferenceId;
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if ((data.referenceId || data.id) && (data.status === "Sent" || data.status === "success")) {
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.Id || data.PayPersonId) {
				scope.dataJSON["referenceId"] = data.Id ? data.Id : data.PayPersonId;
				scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.status === "Pending") {
				scope.dataJSON["referenceId"] = data.referenceId;
				scope.dataJSON["message"] = data.message ? data.message : pendingMessage;
				scope.dataJSON["payeeVerificationStatus"] = data.payeeVerificationStatus;
				scope.dataJSON["createSuccess"] = "true";
			} else if (data.status === "Denied") {
				scope.dataJSON["message"] = data.message;
				scope.dataJSON["createSuccess"] = "true";
			} 
			else if (data.errmsg || data.dbpErrMsg) {
				scope.dataJSON["errorDetails"] = data;
				scope.dataJSON["createSuccess"] = "false";
			} else if (data.MFAAttributes) {
				scope.dataJSON["serviceName"] = collectionObj.Collection[objectName].serviceName;
				scope.dataJSON["MFAAttributes"] = data.MFAAttributes;
			} else if (data.payeeVerificationStatus === "Failure") {
				scope.dataJSON["payeeVerificationStatus"] = "Failure";
				scope.dataJSON["payeeVerificationErrMsg"] = data.payeeVerificationErrMsg;
				scope.dataJSON["payeeVerificationName"] = data.payeeVerificationName;
				scope.dataJSON["createSuccess"] = "false";
			}
			if(data.isScheduled === "true"){
				scope.dataJSON["message"] = data.message;
			}
            if(scope.dataJSON.transferType!="Domestic Transfer" && scope.dataJSON.exchangeRate!=undefined && scope.dataJSON.exchangeRate!=""){
			 scope.dataJSON["exchangeRate"] = "1 " + scope.dataJSON.fromAccountCurrency + " = " + scope.dataJSON.exchangeRate + " " + scope.dataJSON.toAccountCurrency;
			}
			this.store.dispatch({
				type: "UPDATE_COLLECTION",
				data: scope.dataJSON,
				key: objectName
			});
		}
	};
	/**
	 * @api : getDeformattedAmount
	 * get the deformatted amount value
	 * @return : deformattedAmount
	 */
	BusinessController.prototype.getDeformattedAmount = function(amountValue) {
		const isDeformatted = (/^(\-|)\d+(?:\.\d{1,2})?$/g).test(amountValue);
		if (isDeformatted) return amountValue;
		if (amountValue.lastIndexOf('.') > amountValue.lastIndexOf(',')) return amountValue.replace(/\,/g, '');
		return amountValue.replace(/\./g, '').replace(/\,/g, '.');
	};
	/**
	 * @api : setError
	 * triggered as a error call back for any service
	 * @return : NA
	 */
	BusinessController.prototype.setError = function(method, errorDetails) {
		var collectionObj = this.store.getState();
		var objectName = "ErrorDetails";
		kony.application.dismissLoadingScreen();
		collectionObj.Collection[objectName] = {};
		this.store.dispatch({
			type: "UPDATE_COLLECTION",
			data: errorDetails,
			key: objectName
		});
	};
	return BusinessController;
});