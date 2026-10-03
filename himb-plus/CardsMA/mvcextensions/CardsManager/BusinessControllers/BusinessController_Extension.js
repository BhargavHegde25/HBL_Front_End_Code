define(['CommonUtilities'], function(CommonUtilities) {
	/**
	 * dd/mm/yyyy, the format the card services expect, built explicitly.
	 * getFormatedDateString is not used here: "d/m/y" yields a 2 digit year, and with UTC date
	 * formatting disabled it returns the Date object untouched - either way the service cannot
	 * read the range and silently answers with the card's whole history.
	 * @param {Date} dateObj
	 * @returns {String}
	 */
	function formatDateForCardService(dateObj) {
		var day = dateObj.getDate();
		var month = dateObj.getMonth() + 1;
		return (day < 10 ? "0" : "") + day + "/" + (month < 10 ? "0" : "") + month + "/" + dateObj.getFullYear();
	}
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
		/**
		 * Required PIN length for a card, shared by mobile and desktop.
		 * CARD_PIN_LENGTH_6_BINS lists only the BINs that take a 6 digit PIN, comma separated;
		 * every card whose number does not start with a listed BIN uses 4. A missing, empty or
		 * malformed property leaves every card on 4. Matching is on prefix, so 6 and 8 digit
		 * BINs can both be listed.
		 * @param {Object} card - card object carrying maskedCardNumber, cardId or cardNumber
		 * @returns {Number} required PIN length
		 */
		getCardPinLength: function(card) {
			var DEFAULT_PIN_LENGTH = 4;
			var EXTENDED_PIN_LENGTH = 6;
			//BINs that take a 6 digit PIN, held in code so the feature works with no Fabric dependency -
			//client app properties were not reaching the device without clearing the app's data.
			//CARD_PIN_LENGTH_6_BINS REPLACES this list whenever it is readable and non empty, so Fabric
			//can add, correct or remove a BIN without a build. A missing, empty, malformed or unreadable
			//property falls back to the list below, which therefore must stay correct in its own right.
			var SIX_DIGIT_PIN_BINS = ["62347715", "62245460", "62911505"];
			try {
				if (card === undefined || card === null) {
					return DEFAULT_PIN_LENGTH;
				}
				var bins = SIX_DIGIT_PIN_BINS.slice(0);
				try {
					var configuredBins = applicationManager.getConfigurationManager().getConfigurationValue("CARD_PIN_LENGTH_6_BINS");
					if (configuredBins !== undefined && configuredBins !== null && String(configuredBins).trim() !== "") {
						bins = String(configuredBins).split(",");
					}
				} catch (configError) {
					applicationManager.getLoggerManager().log("#### CardsManager : getCardPinLength falling back to the built in BIN list - " + configError + " ####");
				}
				//only the LEADING run of digits is usable, a masked number such as 623477XXXXXX1234 would otherwise
				//collapse to 6234771234 and stop an 8 digit BIN from matching. The longest run wins so a full
				//PAN is preferred over a value that only exposes the first six digits.
				var candidates = [card.maskedCardNumber, card.cardId, card.cardNumber];
				var cardDigits = "";
				for (var c = 0; c < candidates.length; c++) {
					//strip grouping separators first so "6291 1505 0001 2594" is usable, then take the LEADING run only
					var candidateValue = (candidates[c] === undefined || candidates[c] === null) ? "" : String(candidates[c]).replace(/[\s-]/g, "");
					var leadingDigits = candidateValue.match(/^[0-9]+/);
					if (leadingDigits !== null && leadingDigits[0].length > cardDigits.length) {
						cardDigits = leadingDigits[0];
					}
				}
				if (cardDigits === "") {
					return DEFAULT_PIN_LENGTH;
				}
				for (var i = 0; i < bins.length; i++) {
					var bin = bins[i].replace(/[^0-9]/g, "");
					if (bin !== "" && cardDigits.indexOf(bin) === 0) {
						return EXTENDED_PIN_LENGTH;
					}
				}
			} catch (err) {
				applicationManager.getLoggerManager().log("#### CardsManager : getCardPinLength falling back to " + DEFAULT_PIN_LENGTH + " - " + err + " ####");
			}
			return DEFAULT_PIN_LENGTH;
		},
		/**
		 * Transaction date range for credit and prepaid cards, shared by mobile and desktop.
		 * The window is CARD_TRANSACTION_DAYS days including the working date, widened when
		 * needed so it always reaches the 1st of the previous calendar month - the lower
		 * bound the mobile billed section depends on.
		 * @param {Date} workingDate - bank current working date
		 * @returns {Object} fromDate and toDate as Date objects, plus the days value used
		 */
		getCardTransactionDateRange: function(workingDate) {
			var DEFAULT_TRANSACTION_DAYS = 30;
			var days = DEFAULT_TRANSACTION_DAYS;
			try {
				var configuredDays = parseInt(applicationManager.getConfigurationManager().getConfigurationValue("CARD_TRANSACTION_DAYS"), 10);
				if (!isNaN(configuredDays) && configuredDays > 0) {
					days = configuredDays;
				}
			} catch (err) {
				applicationManager.getLoggerManager().log("#### CardsManager : getCardTransactionDateRange falling back to " + DEFAULT_TRANSACTION_DAYS + " days - " + err + " ####");
			}
			var toDate = new Date(workingDate.getFullYear(), workingDate.getMonth(), workingDate.getDate());
			var windowStart = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() - (days - 1));
			var previousMonthStart = new Date(toDate.getFullYear(), toDate.getMonth() - 1, 1);
			var fromDate = windowStart < previousMonthStart ? windowStart : previousMonthStart;
			return {
				"fromDate": fromDate,
				"toDate": toDate,
				"fromDateText": formatDateForCardService(fromDate),
				"toDateText": formatDateForCardService(toDate),
				"days": days
			};
		},
	};
});