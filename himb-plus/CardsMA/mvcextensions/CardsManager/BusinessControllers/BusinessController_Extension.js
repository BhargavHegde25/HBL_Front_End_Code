define(['CommonUtilities'], function(CommonUtilities) {
	return {
		fetchCardsList: function(presentationSuccessCallback, presentationErrorCallback) {
			var scope = this;

			function getAllCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					scope.cards = obj.data;
					// scope.filterAccounts(obj["data"]);
					presentationSuccessCallback(obj["data"]);
				} 
				else if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(data) && data.hasOwnProperty("cardDataInfo_out")){
					scope.cards = data;
					presentationSuccessCallback(scope.cards);
				}
				else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
			var loggerManager = applicationManager.getLoggerManager();
			try {
				loggerManager.log("#### start CardsManager : fetchExternalAccounts ####");
				var self = this;
				var cardsRepo = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ListOfCards");
				cardsRepo.customVerb('getCustomerCards', {}, getAllCompletionCallback);
				// cardsRepo.getAll(getAllCompletionCallback);
			} catch (err) {
				loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
			}
		},
		fetchCardLimits : function(presentationSuccessCallback, presentationErrorCallback) {
			var scope=this;
			function getAllCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					scope.cards = obj.data;
					scope.filterAccounts(obj["data"]);
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
			var loggerManager = applicationManager.getLoggerManager();
			try {
				loggerManager.log("#### start CardsManager : fetchCardLimits ####");
				var self = this;
				var cardsRepo = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
				cardsRepo.customVerb('getCardLimits', {}, getAllCompletionCallback);
			} catch (err) {
				loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
			}
		},
		lockCard : function (params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			cardsModel.customVerb('LockCard', params, completionCallback);
	
			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},	
		unLockCard: function (params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			cardsModel.customVerb('UnlockCard', params, completionCallback);
			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		changePin : function (context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			if (CommonUtilities.getSCAType()!=0) 
			params.isMFARequired = context.isMFARequired;
			cardsModel.customVerb("cardChangeClearPIN", context, completionCallback);
			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		reportLost : function (context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			cardsModel.customVerb("ReportLostCard", context, completionCallback);
			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		getCardCVV: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("showCVV", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},

		topUpCard: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("prepaidTopup", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		activateCards : function (context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("ActivateCard", context, completionCallBack);
			function completionCallBack(status, data, error) {
			  var srh = applicationManager.getServiceResponseHandler();
			  var obj = srh.manageResponse(status, data, error);
			  if (obj["status"] === true) {
				presentationSuccess(obj["data"]);
			  } else
				presentationFailure(obj["errmsg"]);
			}
		  },
		downloadpdfCardStatement: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("DownloadTransactions");
			cardsModel.customVerb("generate", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		getCardTransactionsDetails: function(param, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("getCardPendingTransactions", param, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		applyNewDebitCard: function(params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("requestDebitCard", params, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		applyNewPrepaidCard: function(params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("requestPrepaidCard", params, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		applyNewVirtualDollarCard: function(params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("requestVirtualDollarCard", params, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		intraBankTransferPrepaid : function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("IntraBankAccFundTxrPrepaidTopup", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
        intraBankTransferDollar : function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Transaction");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("IntraBankAccFundTxrDollarCardTopup", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
		getIntraBankTransactionStatus : function(params, presentationSuccessCallback, presentationErrorCallback) {
			var transacObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("CIPSTransfers");
			//var transObj = this.convertDateFormat(tranObj);
			transacObj.customVerb("getTransactionStatus", params, saveCompletionCallback);

			function saveCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
		convertDateFormat : function(transactionObj) {
			var formatUtil = applicationManager.getFormatUtilManager();
			if (transactionObj.scheduledDate) transactionObj.scheduledDate = formatUtil.convertToUTC(transactionObj.scheduledDate);
			if (transactionObj.frequencyStartDate) transactionObj.frequencyStartDate = formatUtil.convertToUTC(transactionObj.frequencyStartDate);
			if (transactionObj.frequencyEndDate) transactionObj.frequencyEndDate = formatUtil.convertToUTC(transactionObj.frequencyEndDate);
			return transactionObj;
		},
		topUpPrepaidCard: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("prepaidTopup", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		topUpDollarCard: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("dollarCardTopup", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		setFilterAccounts: function(filterCardAccounts) {
			this.filterCardAccounts = filterCardAccounts;
		},
		lockCard: function(params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			cardsModel.customVerb('LockCard', params, completionCallback);

			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		unLockCard: function(params, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			cardsModel.customVerb('UnlockCard', params, completionCallback);

			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		changePin: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			if (CommonUtilities.getSCAType() != 0)
				params.isMFARequired = context.isMFARequired;
			cardsModel.customVerb("cardChangeClearPIN", context, completionCallback);

			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		reportLost: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('S2MCardServices');
			cardsModel.customVerb("ReportLostCard", context, completionCallback);

			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		activateCards: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("ActivateCard", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		getConvertEMIRequestDetails: function(context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("cardEMIRequest", context, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		makeCardPayment : function(params, presentationSuccess, presentationFailure){
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Transaction");
			cardsModel.customVerb("IntraBankAccFundTransferCards", params, completionCallBack);

			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},
		getTransactionsDetails : function (context, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("S2MCardServices");
			cardsModel.customVerb("getCardPendingTransactions", context, completionCallBack);
			function completionCallBack(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},

		generateCvv : function (param,presentationSuccessCallback, presentationErrorCallback) {
			var self = this;
			var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("S2MCardServices");
			infoTerms.customVerb('showCVV',param,  getCompletionCallback);
			function  getCompletionCallback(status,  data,  error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status,  data,  error);
				if (obj["status"] === true) {
				  presentationSuccessCallback(obj["data"]);
				} else {
				  presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
		getCardLimitsNew : function (param,presentationSuccessCallback, presentationErrorCallback) {
			var self = this;
			var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("S2MCardServices");
			infoTerms.customVerb('getCardLimits',param,  getCompletionCallback);
			function  getCompletionCallback(status,  data,  error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status,  data,  error);
				if (obj["status"] === true) {
				  presentationSuccessCallback(obj["data"]);
				} else {
				  presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
		getConvertedAmount :function (param,presentationSuccessCallback, presentationErrorCallback) {
			var self = this;
			var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Forex");
			infoTerms.customVerb('getConvertedAmount',param,  getCompletionCallback);
			function  getCompletionCallback(status,  data,  error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status,  data,  error);
				if (obj["status"] === true) {
				  presentationSuccessCallback(obj["data"]);
				} else {
				  presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
		fetchBranchList :function (param,presentationSuccessCallback, presentationErrorCallback) {
			var self = this;
			var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DigitalArrangements");
			infoTerms.customVerb('getHBLBranchList',param,  getCompletionCallback);
			function  getCompletionCallback(status,  data,  error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status,  data,  error);
				if (obj["status"] === true) {
				  presentationSuccessCallback(obj["data"]);
				} else {
				  presentationErrorCallback(obj["errmsg"]);
				}
			}
		},

		checkCardRequestExists : function (param, presentationSuccessCallback, presentationErrorCallback) {
			var self = this;
			var infoTerms = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("S2MCardServices");
			infoTerms.customVerb('checkCardRequest', param, getCompletionCallback);
			function getCompletionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccessCallback(obj["data"]);
				} else {
					presentationErrorCallback(obj["errmsg"]);
				}
			}
		},
	};
});