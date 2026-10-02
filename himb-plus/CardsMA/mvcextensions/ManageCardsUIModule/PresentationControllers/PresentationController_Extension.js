define(function() {
	return {
		CardNameData: [],
		fetchCardsListSuccess: function(response) {
			response = response.cardDataInfo_out;
			var actresponse = []; //JSON.parse(JSON.stringify(response));
			for (var i = 0; i < response.length; i++) {
				if (response[i]["cardStatus"] === scope_configManager.getActivateCardStatus() || response[i]["cardStatus"] === scope_configManager.getReportLostCardStatus() || response[i]["cardStatus"] === scope_configManager.getLockCardStatus() || response[i]["cardStatus"] === scope_configManager.getInActiveCardStatus() || (response[i]["cardStatus"] === scope_configManager.getExpiredCardStatus() && this.isExpiryWithin30Days(response[i]["cardExpDate"]))) {
					// for (var j = 0; j < response.length; j++) {
					//     if (i !== j && (response[i]["maskedCardNumber"] === response[j]["maskedCardNumber"])) {
					//         var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
					//         actresponse.splice(id, 1);
					//         break;
					//     }
					// }
					actresponse.push(response[i]);
				}
				// else if (response[i]["cardStatus"] === "Expired") {
				//     var id = actresponse.findIndex(x => x.cardId === response[i].cardId);
				//     actresponse.splice(id, 1);
				// }
			}
			var viewProperties = {};
			viewProperties.progressBar = true;
			viewProperties.cards = actresponse;
			actresponse = this.appendNickNameinCardsDataFromAccountsData(actresponse);
			this.allCardsData = actresponse;
			this.filterMultipleCardsWithSameAccountNumber();
			this.filterMultipleCardsWithSameCardName();
			this.getCardLimitsforACKScreen();
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
			//this.fetchCardsStatus(actresponse);
		},
		isExpiryWithin30Days: function(expiry) {
			var expiryDate = new Date(expiry);
			var currentDate = new Date();
			var thirtyDaysFromNow = new Date();
			thirtyDaysFromNow.setDate(currentDate.getDate() + parseInt(scope_configManager.getExpiredCardsValidityDisplay()));
			return expiryDate >= currentDate && expiryDate <= thirtyDaysFromNow;
		},
		searchAccounts: function(searchString, searchFrom) {
			if (searchString.length > 0) {
				var data = this.CardNameData.filter(function(record) {
					return (record["accountNumber"] && record["accountNumber"].toUpperCase().indexOf(searchString.toUpperCase()) !== -1 ||
						record["nickName"] && record["nickName"].toUpperCase().indexOf(searchString.toUpperCase()) !== -1)
				});
			} else {
				var data = this.CardNameData;
			}
			var viewModel = {
				searchResults: data,
				searchPerformed: true,
				searchFrom: searchFrom
			}
			applicationManager.getNavigationManager().updateForm(viewModel, 'frmCardManagement');
		},
		filterMultipleCardsWithSameCardName: function() {
			var cardsData = [];
			var uniqueCards = []
			for (var individualCard of this.allCardsData) {
				if (uniqueCards.indexOf(individualCard.Card_Category) == -1) {
					var data = this.allCardsData.filter(function(record) {
						return (record["Card_Category"] == individualCard.Card_Category);
					});
					uniqueCards.push(individualCard.Card_Category);
					cardsData.push(data[0]);
				}
			}
			this.CardNameData = cardsData;
		},
		getCardCVV: function(accNum, cardData) {
			let param = {
				"cardNumber": accNum
			};
			applicationManager.getCardsManager().getCardCVV(param, this.getCardCVVSuccess.bind(this, cardData), this.getCardCVVFailure.bind(this));
		},
		getCardCVVSuccess: function(cardData, response) {
			if (response.respCode_out) {
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.setCardCVV = response;
				viewProperties.cardData = cardData;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		getCardCVVFailure: function(errorMessage) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},

		getCardLimits: function(accountData) {
			applicationManager.getCardsManager().fetchCardLimits(this.fetchCardLimitsSuccess.bind(this, accountData), this.fetchCardLimitsFailure.bind(this));
		},
		checkIfCardRequestExists: function(params) {
			var cards = applicationManager.getCardsManager();
			cards.checkCardRequestExists(param, this.checkIfCardRequestExistsCallBack, this.checkIfCardRequestExistsErrorCallback);
		},
		checkIfCardRequestExistsCallBack: function(response) {
			var data = response;
			var navManager = applicationManager.getNavigationManager();
			var flow = navManager.getCustomInfo("requestCardFlowType");
			navManager.setCustomInfo("cardRequestExists", data);
			if (data.isCardReqExists === "true") {
				var currentForm = kony.application.getCurrentForm().id;
				var controller = applicationManager.getPresentationUtility().getController(currentForm, true);
				controller.checkForRequestExistsError(data.status);
			} else if (data.isCardReqExists === "false") {
				var navManager = applicationManager.getNavigationManager();
				if (flow === "virtualCard") {
					var data = navManager.getCustomInfo("virtualPrepaidCardDetails");
					totalDebitAmountInNpr = data.totalDebitAmountInNpr;
					var params = {
						"fromAccountCurrency": "USD",
						"transactionCurrency": "NPR",
						"transactionAmount": totalDebitAmountInNpr
					}
					navManager.setCustomInfo("currencyConversionData", params);
					var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
					manageCardsModule.presentationController.getCurrencyExchangeRate(params);
				} else {
					navManager.navigateTo({
						"appName": "CardsMA",
						"friendlyName": "ManageCardsUIModule/frmCardRequestConfirmation"
					});
				}
			}
		},

		checkIfCardRequestExistsErrorCallback: function(err) {
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			if (err["isServerUnreachable"]) {
				applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString(err));
			} else {
				applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.ProfileManagement.weAreUnableToProcess"));
			}
		},
		fetchCardLimitsSuccess: function(accountData, response) {
			if (response.cardConfigLimit) {
				var viewProperties = {};
				viewProperties.progressBar = false;
				if (accountData == {})
					viewProperties.cardLimits = response.cardConfigLimit;
				else {
					viewProperties.accountData = accountData;
					viewProperties.setCardProductDetails = response.cardConfigLimit;
				}
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		fetchCardLimitsFailure: function(errorMessage) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},
		getCardLimitsforACKScreen: function() {
			applicationManager.getCardsManager().fetchCardLimits(this.getCardLimitsforACKScreenSuccess.bind(this), this.getCardLimitsforACKScreenFailure.bind(this));
		},
		getCardLimitsforACKScreenSuccess: function(response) {
			if (response.cardConfigLimit) {
				var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("getCardLimitsforACKScreen", response.cardConfigLimit);
			}
		},
		getCardLimitsforACKScreenFailure: function(errorMessage) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},
		lockCard: function(card, action) {
			kony.application.showLoadingScreen();
			this.card = card;
			this.action = action;
			var params = {
				"cardNumber": card.cardNumber,
				'status': scope_configManager.getLockCardStatus(),
				'reason': ''
			}
			applicationManager.getCardsManager().lockCard(params, this.lockCardSuccess.bind(this), this.lockCardFailure.bind(this));
		},
		showTermsAndConditionsUnlockCard: function() {
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
				"moduleName": "TermsAndConditionsUIModule",
				"appName": "AuthenticationMA"
			}).presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.UnlockCard_TnC, this.getTnCOnSuccessUnlockCard.bind(this), this.getTnCOnFailure.bind(this));
		},

		getTnCOnSuccessUnlockCard: function(response) {
			applicationManager.getNavigationManager().updateForm({
				"TndCSuccessUnlockCard": response
			}, "frmCardManagement");
		},
		lockCardSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "LOCK_CARD",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				if (response.respCode_out === "000" && response.result === "000" && response.respLabel_out === "SUCCESS") {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.card = this.card;
					viewProperties.actionAcknowledgement = this.action;
					viewProperties.progressBar = false;
					viewProperties.card.orderId = response.orderId;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				} else {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					viewProperties.serverError = response[0].respLabel_out;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
			}
		},
		/**
		 * method used as failure call back to lock card.
		 * @param {String} errorMessage - contains the errormessage to lock card.
		 */
		lockCardFailure: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		unlockCard: function(card, action) {
			kony.application.showLoadingScreen();
			this.card = card;
			this.action = action;
			var params = {
				// "cardId": card.cardId,
				"cardNumber": card.cardNumber,
				'status': scope_configManager.getActivateCardStatus(),
				'reason': ''
			};
			applicationManager.getCardsManager().unLockCard(params, this.unlockCardSuccess.bind(this), this.unlockCardFailure.bind(this));
		},
		unlockCardSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "UNLOCK_CARD",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.card = this.card;
				viewProperties.actionAcknowledgement = this.action;
				viewProperties.progressBar = false;
				viewProperties.card.orderId = response.orderId;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		/**
		 * method used as failure call back to un-lock card.
		 * @param {String} errorMessage - contains the errormessage to lock card.
		 */
		unlockCardFailure: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		changePin: function(params, action) {
			kony.application.showLoadingScreen();
			this.card = params.card;
			this.action = action;

			applicationManager.getCardsManager().changePin({
				cardId: params.card.cardId,
				cardNumber: params.card.cardNumber,
				Reason: params.reason,
				notes: params.notes,
				newPin: params.newPin
				// pinNumber: params.pinNumber,
			}, this.changePinSuccess.bind(this), this.changePinFailure.bind(this));

		},
		/**
		 * method used as success call back to change pin
		 * @param {Object} card - contains card object
		 * @param {String} action - contains the action to be - change pin.
		 * @param {Object} response - contains the response to change pin.
		 */
		changePinSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "CHANGE_PIN_DEBIT",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {

				if (response.p_err_code === "000" && response.result === "0") {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.card = this.card;
					viewProperties.actionAcknowledgement = this.action;
					viewProperties.progressBar = false;
					viewProperties.card.orderId = response.orderId;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				} else {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					viewProperties.serverError = response;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
			}
		},
		/**
		 * method used as failure call back to change pin
		 * @param {String} errorMessage - contains the errormessage to change pin.
		 */
		changePinFailure: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		reportLost: function(params, action) {
			kony.application.showLoadingScreen();
			this.card = params.card;
			this.action = action;
			applicationManager.getCardsManager().reportLost({
				cardNumber: params.card.cardNumber,
				status: scope_configManager.getReportLostCardStatus(),
				reason: params.Reason
			}, this.reportLostSuccess.bind(this), this.reportLostFailure.bind(this));
		},
		/**
		 * method used as success call back to report lost card.
		 * @param {Object} card - contains card object
		 * @param {String} action - contains the action to be - report lost card.
		 * @param {Object} response - contains the response to report lost card.
		 */
		reportLostSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "REPORT_LOST",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				if (response.respCode_out === "000" && response.result === "000" && response.respLabel_out === "SUCCESS") {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.card = this.card;
					viewProperties.actionAcknowledgement = this.action;
					viewProperties.progressBar = false;
					viewProperties.card.orderId = response.orderId;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				} else {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					viewProperties.serverError = response.respLabel_out;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
			}
		},
		/**
		 * method used as failure call back to report lost card.
		 * @param {String} errorMessage - contains the errormessage to report lost card.
		 */
		reportLostFailure: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		getCVV: function(card, action, isMFARequired) {
			kony.application.showLoadingScreen();
			this.card = card;
			this.action = action;
			var params = {
				"cardNumber": card.cardNumber
			};
			applicationManager.getCardsManager().getCardCVV(params, this.activateCard.bind(this, card, action, false), this.showCVVError.bind(this));
		},
		showCVVError: function(error) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = error;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		activateCard: function(card, action, isMFARequired, response) {
			kony.application.showLoadingScreen();
			if (response.respCode_out === "00" && response.respLabel_out === "APPROVED") {
				if (response.cvv2_out == card.cvv) {
					this.card = card;
					this.action = action;
					var params = {
						'cardNumber': card.cardNumber,
						'status': scope_configManager.getActivateCardStatus(),
						'reason': ''
					};
					applicationManager.getCardsManager().activateCards(params, this.activateCardSuccess.bind(this), this.activateCardFailure.bind(this));
				} else {
					var viewProperties = {};
					viewProperties.serverError = "Incorrect CVV code entered";
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
			} else {
				var viewProperties = {};
				viewProperties.serverError = response.respLabel_out;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		activateCardSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "ACTIVATE_CARD",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				if (response.respCode_out === "000" && response.result === "000" && response.respLabel_out === "SUCCESS") {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.card = this.card;
					viewProperties.card.orderId = response.orderId;
					viewProperties.actionAcknowledgement = this.action;
					viewProperties.progressBar = false;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				} else {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					viewProperties.serverError = response.respLabel_out;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
			}
		},

		activateCardFailure: function(error) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			if (error.isServerUnreachable) {
				applicationManager.getNavigationManager().updateForm({
					"hideProgressBar": true
				});
				CommonUtilities.showServerDownScreen();
			} else {
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.serverError = error;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		createCardRequest: function(params, action) {
			this.card = params;
			this.action = action;
			if (action == "Offline_Change_Pin") {
				params.cardId = params.card.cardId;
				delete params["CardAccountNumber"];
				params.Action = "PinChangeCredit";
			}
			applicationManager.getCardsManager().createCardRequest(params, this.createCardRequestSuccess.bind(this), this.createCardRequestFailure.bind(this));
		},
		appendNickNameinCardsDataFromAccountsData: function(cards) {
			var cardsWithNickname = [];
			var accounts = applicationManager.getAccountManager().getInternalAccounts();
			// for (var individualAccountData of accounts) {
			/*var cardsData = cards.filter(function(record) {
			                return (record["accountNumber"] && record["accountNumber"] == individualAccountData.accountID)
			            });*/
			if (!accounts) {
				accounts = [];
			}
			for (var matchingAccounts of cards) {
				var individualAccountData = accounts.filter(function(account) {
					return (account["accountID"] && account["accountID"] == matchingAccounts.bankAccNum)
				});
				matchingAccounts.nickName = (individualAccountData.nickName) ? individualAccountData.nickName : (individualAccountData.accountName) ? individualAccountData.accountName : "";
				matchingAccounts.nickName = (matchingAccounts.nickName) ? matchingAccounts.nickName : (individualAccountData[0] && individualAccountData[0].nickName) ? individualAccountData[0].nickName : (individualAccountData[0] && individualAccountData[0].accountName) ? individualAccountData[0].accountName : "";
				//matchingAccounts.maskedNickNameAndNumber = matchingAccounts.nickName && matchingAccounts.nickName !== "" && (individualAccountData && individualAccountData.accountID) ? CommonUtilities.mergeAccountNameNumber(matchingAccounts.nickName, individualAccountData.accountID) : "";
				matchingAccounts.maskedNickNameAndNumber = (matchingAccounts.maskedNickNameAndNumber) ? matchingAccounts.maskedNickNameAndNumber : ((matchingAccounts.nickName && matchingAccounts.nickName !== "") && (individualAccountData[0] && individualAccountData[0].accountID)) ? this.mergeAccountNameNumber(matchingAccounts.nickName, individualAccountData[0].accountID) : "";
				cardsWithNickname.push(matchingAccounts);
			}
			// }
			return cardsWithNickname;
		},
		mergeAccountNameNumber: function(accountName, accountNumber) {
			if (typeof(accountNumber) == "number") {
				accountNumber = accountNumber.toString();
			}
			accountNumber = accountNumber.substr(-4);
			return accountName + " ...." + accountNumber;
		},
		fetchAccountsSuccess: function(resInp) {
			var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
				"moduleName": "AccountsUIModule",
				"appName": "HomepageMA"
			});
			var cardsMan = applicationManager.getCardsManager();
			var accounts = cardsMan.fetchAccountsForNewcard();
			var filterList = function(input) {
				try {
					if (input.length > 0)
						var accountData = JSON.parse(JSON.stringify(input));
					// let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
					return accountData;
				} catch (err) {
					return input;
				}
			};
			var savingAcc = accounts[1].length > 0 ? accountMod.presentationController.processAccountsData(filterList(accounts[1])) : [];
			var checkingAcc = accounts[0].length > 0 ? accountMod.presentationController.processAccountsData(filterList(accounts[0])) : [];
			var processedAcc = [];
			if (checkingAcc && checkingAcc.length > 0)
				processedAcc.push(checkingAcc);
			if (savingAcc && savingAcc.length > 0)
				processedAcc.push(savingAcc);
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.setAccountsForCards = processedAcc;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		getAvailableBalanceCurrencyString: function(data) {
			var forUtility = applicationManager.getFormatUtilManager();
			var configManager = applicationManager.getConfigurationManager();
			var currencyCode = data["currencyCode"];
			switch (data.accountType) {
				case configManager.constants.SAVINGS:
					return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
				case configManager.constants.CHECKING:
					return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
				case configManager.constants.CREDITCARD:
					return forUtility.formatAmountandAppendCurrencySymbol(data["currentBalance"], currencyCode);
				case configManager.constants.DEPOSIT:
					return forUtility.formatAmountandAppendCurrencySymbol(data["currentBalance"], currencyCode);
				case configManager.constants.MORTGAGE:
					return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
				case configManager.constants.LOAN:
					return forUtility.formatAmountandAppendCurrencySymbol(data["outstandingBalance"], currencyCode);
				default:
					return forUtility.formatAmountandAppendCurrencySymbol(data["availableBalance"], currencyCode);
			}
		},
		applyNewCard: function(cardsObj) {
			kony.application.showLoadingScreen();
			var cardsManager = applicationManager.getCardsManager();
			var cardType = cardsObj.cardType;
			if (cardType == "debitcard")
				cardsManager.applyNewDebitCard(cardsObj, this.applyNewCardSuccess.bind(this, cardType), this.applyNewCardError.bind(this));
			else if (cardType == "physicalPrepaidCard")
				cardsManager.applyNewPrepaidCard(cardsObj, this.applyNewCardSuccess.bind(this, cardType), this.applyNewCardError.bind(this));
			else if (cardType == "virtualPrepaidCard")
				cardsManager.applyNewVirtualDollarCard(cardsObj, this.applyNewCardSuccess.bind(this, cardType), this.applyNewCardError.bind(this));
		},
		applyNewCardSuccess: function(cardType, response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				if (cardType == "debitcard") {
					var mfaJSON = {
						"serviceName": mfaManager.getServiceId(),
						"flowType": "APPLY_FOR_DEBIT_CARD",
						"response": response
					};
					applicationManager.getNavigationManager().setCustomInfo("MFAFlowName", "REQUEST_CARD");
				} else if (cardType == "physicalPrepaidCard") {
					var mfaJSON = {
						"serviceName": mfaManager.getServiceId(),
						"flowType": "APPLY_FOR_PHYSICAL_PREPAID_CARD",
						"response": response
					};
					applicationManager.getNavigationManager().setCustomInfo("MFAFlowName", "REQUEST_CARD");
				} else if (cardType == "virtualPrepaidCard") {
					var mfaJSON = {
						"serviceName": mfaManager.getServiceId(),
						"flowType": "APPLY_FOR_VIRTUAL_PREPAID_CARD",
						"response": response
					};
					applicationManager.getNavigationManager().setCustomInfo("MFAFlowName", "notREQUEST_CARD");
				}
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				if (response.ReferenceNumber != null && response.ReferenceNumber != undefined) {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					response.productName = this.cardProductName;
					viewProperties.setDataToAcknowledgement = response;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				} else {
					new kony.mvc.Navigation({
						"appName": "CardsMA",
						"friendlyName": "frmCardManagement"
					}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					viewProperties.serverError = response;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
				//applicationManager.getNavigationManager().navigateTo("frmCardManagement");

			}
		},
		applyNewCardError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			if (errorMessage.errorMessage == "REQ_EXISTS")
				errorMessage.errorMessage = "You have applied for all eligible cards using this account. Kindly try using a different account.";
			viewProperties.serverError = errorMessage;
			viewProperties.applyCardError = true;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		topUpCard: function(params, ackData) {
			kony.application.showLoadingScreen();
			if (ackData.flow == "topUpPrepaidCard")
				applicationManager.getCardsManager().topUpPrepaidCard(params, this.topUpCardSuccess.bind(this, ackData), this.topUpCardFailure.bind(this));
			else if (ackData.flow == "topUpVirtualCard")
				applicationManager.getCardsManager().topUpDollarCard(params, this.topUpCardSuccess.bind(this, ackData), this.topUpCardFailure.bind(this));
		},
		topUpCardSuccess: function(ackData, response) {
			kony.application.dismissLoadingScreen();

			if (response.respCode_out && response.respCode_out == "000" && respLabel_out == "SUCCESS") {
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.topUpCardRes = response;
				viewProperties.topUpCardAckData = ackData;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.serverError = response;
				applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
			}
		},
		topUpCardFailure: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.serverError = errorMessage;
			viewProperties.topUpCardError = true;
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},
		downloadCardStatement: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().downloadpdfCardStatement(params, this.cardStatementSuccess.bind(this), this.cardStatementError.bind(this));
		},

		cardStatementSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			if (response.fileId != null) {
				response.fileType = "pdf";
				applicationManager.getNavigationManager().updateForm({
					transactionDownloadFile: applicationManager.getAccountManager().getDownloadTransctionURL(response)
				}, "frmCardManagement");
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.serverError = response.respLabel_out;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		cardStatementError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},

		getTransactionsDetail: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().getTransactionsDetails(params, this.getTransactionDetailsSuccess.bind(this), this.getTransactionDetailsError.bind(this));
		},

		getTransactionDetailsSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			if (response.respCode_out === "000" && response.respLabel_out === "SUCCESS") {
				var viewProperties = {};
				viewProperties.progressBar = false;
				response.productName = this.cardProductName;
				viewProperties.setTransactionDetails = response;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.getTransactionError = response.respLabel_out;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},

		getTransactionDetailsError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.getTransactionError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},

		getEmiTransactionsDetail: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().getTransactionsDetails(params, this.getEmiTransactionDetailsSuccess.bind(this), this.getEmiTransactionDetailsError.bind(this));
		},

		getEmiTransactionDetailsSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			if (response.respCode_out === "000" && response.respLabel_out === "SUCCESS") {
				var viewProperties = {};
				viewProperties.progressBar = false;
				response.productName = this.cardProductName;
				viewProperties.setEmiTransactionDetails = response;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.getEMITransactionError = response.respLabel_out;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},

		getEmiTransactionDetailsError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.getEMITransactionError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},

		getConvertEMIRequestDetail: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().getConvertEMIRequestDetails(params, this.getEmiRequestDetailsSuccess.bind(this), this.getEmiRequestDetailsError.bind(this));
		},
		getEmiRequestDetailsSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "EMI_TRANSACTION",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				if (response.httpStatusCode === "200" && response.respLabel === "000") {
					var viewProperties = {};
					viewProperties.progressBar = false;
					response.productName = this.cardProductName;
					viewProperties.convertEMIAcknowledgement = response;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				} else {
					// new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
					var viewProperties = {};
					viewProperties.progressBar = false;
					viewProperties.getEMIRequestError = response.responseMsg;
					applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
				}
			}
		},
		getEmiRequestDetailsError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			// new kony.mvc.Navigation({"appName" : "CardsMA", "friendlyName" : "frmCardManagement"}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.getEMIRequestError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		showPrintPage: function(data) {
			var scopeObj = this;
			data.printKeyValueGroupModel.printCallback = function() {
				scopeObj.showAcknowlegeScreenOnPrintCancel();
			}
			applicationManager.getNavigationManager().navigateTo({
				"appName": "CommonsMA",
				"friendlyName": "frmPrintTransfer"
			});
			applicationManager.getNavigationManager().updateForm(data, 'frmPrintTransfer');
		},
		intraBankTransfer: function(params, card) {
			kony.application.showLoadingScreen();
			var ackData = navManager.getCustomInfo("topUpCardAckData");
			if (ackData.flow == "topUpPrepaidCard") {
				applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.intraBankTransferSuccess.bind(this, card), this.intraBankTransferError.bind(this));
			} else if (ackData.flow == "topUpVirtualCard") {
				applicationManager.getCardsManager().intraBankTransferDollar(params, this.intraBankTransferSuccess.bind(this, card), this.intraBankTransferError.bind(this));
			}
		},
		intraBankTransferSuccess: function(response, card) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			var res = {
				"cardResponse": response,
				"card": card
			}
			viewProperties.transferSuccess = res;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		intraBankTransferError: function(errorMessage) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},
		intraBankFinalTransfer: function(params) {
			kony.application.showLoadingScreen();
			var ackData = navManager.getCustomInfo("topUpCardAckData");
			if (ackData.flow == "topUpVirtualCard") {
				applicationManager.getCardsManager().intraBankTransferDollar(params, this.intraBankTransferFinalSuccess.bind(this), this.intraBankTransferFinalError.bind(this));
			} else if (ackData.flow == "topUpPrepaidCard") {
				applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.intraBankTransferFinalSuccess.bind(this), this.intraBankTransferFinalError.bind(this));
			}
			// applicationManager.getCardsManager().intraBankTransferDollar(params, this.intraBankTransferFinalSuccess.bind(this), this.intraBankTransferFinalError.bind(this));
		},
		intraBankTransferFinalSuccess: function(response) {
			var mfaManager = applicationManager.getMFAManager();
			var navManager = applicationManager.getNavigationManager();
			var ackData = navManager.getCustomInfo("topUpCardAckData");
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				if (ackData.flow == "topUpPrepaidCard") {
					var mfaJSON = {
						"serviceName": mfaManager.getServiceId(),
						"flowType": "TOPUP_DOMESTIC_CARD",
						"response": response
					};
					applicationManager.getMFAManager().initMFAFlow(mfaJSON);
				} else if (ackData.flow == "topUpVirtualCard") {
					var mfaJSON = {
						"serviceName": mfaManager.getServiceId(),
						"flowType": "TOPUP_VIRTUAL_CARD",
						"response": response
					};
					applicationManager.getMFAManager().initMFAFlow(mfaJSON);
				}
			} else {
				var ackData = navManager.getCustomInfo("topUpCardAckData");
				param = {
					"paymentOrderId": ackData.transactionId
				}
				applicationManager.getCardsManager().getIntraBankTransactionStatus(param, this.intraBankTransferNewSuccess.bind(this, response), this.intraBankTransferNewError.bind(this))
			}
		},
		intraBankTransferNewSuccess: function(intraBankResponse, response) {
			if ((response.currentStatus == "Complete" || response.currentStatus == "Placed") && response.status == "success") {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.transferFinalSuccess = intraBankResponse;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.serverError = response;
				viewProperties.topUpCardError = true;
				applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
			}
		},
		intraBankTransferFinalError: function(errorMessage) {
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			viewProperties.topUpCardError = true;
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},
		intraBankTransferNewError: function(errorMessage) {
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			viewProperties.topUpCardError = true;
			applicationManager.getNavigationManager().updateForm(viewProperties, 'frmCardManagement');
		},
		makeCardPayment: function(params, data) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().makeCardPayment(params, this.makeCardPaymentSuccess.bind(this, data), this.makeCardPaymentError.bind(this));
		},
		makeCardPaymentSuccess: function(data, response) {
			var viewProperties = {};
			viewProperties.progressBar = false;
			var res = {
				"cardResponse": response,
				"data": data
			}
			viewProperties.cardPaymentSuccess = res;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		makeCardPaymentError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		makeCardFinalPayment: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().makeCardPayment(params, this.makeCardFinalPaymentSuccess.bind(this), this.makeCardFinalPaymentError.bind(this));
		},
		makeCardFinalPaymentSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var mfaManager = applicationManager.getMFAManager();
			if (response.MFAAttributes && response.MFAAttributes.isMFARequired) {
				var mfaJSON = {
					"serviceName": mfaManager.getServiceId(),
					"flowType": "CARD_BILLPAYMENT",
					"response": response
				};
				applicationManager.getMFAManager().initMFAFlow(mfaJSON);
			} else {
				new kony.mvc.Navigation({
					"appName": "CardsMA",
					"friendlyName": "frmCardManagement"
				}).navigate();
				var viewProperties = {};
				viewProperties.progressBar = false;
				viewProperties.cardFinalPaymentSuccess = response;
				applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
			}
		},
		makeCardFinalPaymentError: function(errorMessage) {
			kony.application.dismissLoadingScreen();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.serverError = errorMessage;
			viewProperties.CardPaymentError = true;
			new kony.mvc.Navigation({
				"appName": "CardsMA",
				"friendlyName": "frmCardManagement"
			}).navigate();
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		getBankDate: function() {
			applicationManager.getBillManager().fetchBankDate({}, this.getBankDateSuccess.bind(this), this.getBankDateFailure.bind(this));
		},
		getBankDateSuccess: function(response) {
			var bankDates = response.date[0];
			applicationManager.getNavigationManager().setCustomInfo("bankDates", bankDates);
		},
		getBankDateFailure: function(response) {
			applicationManager.getNavigationManager().setCustomInfo("bankDates", undefined);
		},

		getCurrecyExchangeRate: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().getConvertedAmount(params, this.convertedAmountSuccess.bind(this), this.convertedAmountError.bind(this));
		},
		convertedAmountSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var viewProperties = {};
			applicationManager.getNavigationManager().setCustomInfo("ConvertedNPRPrice", response.convertedAmount);
		},
		convertedAmountError: function(errorMessage) {
			kony.print("getExchangeRate service failure");
		},

		getCurrecyExchangeRate1: function(params) {
			kony.application.showLoadingScreen();
			applicationManager.getCardsManager().getConvertedAmount(params, this.convertedAmountSuccess1.bind(this), this.convertedAmountError1.bind(this));
		},
		convertedAmountSuccess1: function(response) {
			kony.application.dismissLoadingScreen();
			var viewProperties = {};
			applicationManager.getNavigationManager().setCustomInfo("ConvertedUSDPrice", response.convertedAmount);
		},
		convertedAmountError1: function(errorMessage) {
			kony.print("getExchangeRate service failure");
		},
		getBranchList: function() {
			applicationManager.getCardsManager().fetchBranchList({}, this.getBranchListSuccess.bind(this), this.getBranchListFailure.bind(this));
		},
		getBranchListSuccess: function(response) {
			kony.application.dismissLoadingScreen();
			var viewProperties = {};
			viewProperties.progressBar = false;
			viewProperties.branchListSuccess = response;
			applicationManager.getNavigationManager().updateForm(viewProperties, "frmCardManagement");
		},
		getBranchListFailure: function(errorMessage) {
			kony.print("getExchangeRate service failure");
		},
	};
});