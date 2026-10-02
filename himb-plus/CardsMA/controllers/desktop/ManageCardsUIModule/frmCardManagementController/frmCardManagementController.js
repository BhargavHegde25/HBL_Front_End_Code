define(['CommonUtilities', 'CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility', 'CacheUtils'], function(CommonUtilities, CommonUtilities2, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility, CacheUtils) {
	var orientationHandler = new OrientationHandler();
	var searchSeg = true;
	return {
		/**
		 * Globals for storing travel-notification,card-image, status-skin mappings.
		 */
		notificationObject: {},
		cardImages: {},
		countries: {},
		ConvertedUSDPrice:"",
        ConvertedNPRPrice:"",
		states: {},
		cities: {},
		debitCards: {},
		prePaidCards: {},
		selectedCountry: {},
		statusSkinsLandingScreen: {},
		statusSkinsDetailsScreen: {},
		travelNotificationDataMap: {},
		actionPermissionMap: {},
		campaigns: [],
		criteria: [],
		branchList:[],
		offset: 0,
		travelPlanDestinationList: {},
		profileAccess: "",
		virtualDollarCardCount: 0,
		requestCardFlow: "",
		selectedCardSubType: "",
		selectedVDCardType: "",
		acknowledgementObj: {},
		debitCardList: {'VISA': [],'MASTERCARD': [],'NEPALPAY': [],'SCTUPI': [],'UNIONPAY': []},	
		prepaidCardList: {"Physical Visa Domestic Prepaid Card": [], "Physical AMEX Domestic Prepaid Card": [], "Physical Visa International Prepaid Card": [], "Physical AMEX International Prepaid Card": []},	
		/**
		 * Form lifecycle method.
		 */
		formPreShowFunction: function() {
			var scopeObj = this;
			this.view.myCards.txtSearch.text = "";
			this.view.tbxNameOnCard.text = "";
			this.view.myCards.flxCards.setVisibility(false);
			this.view.flxFormContent.skin ="flxWhite";
			this.view.flxRequestANewCard.hoverSkin = "sknBtnNormalSSPFFFFFF15pxradius6";
			this.view.flxRequestANewPrepaidCard.hoverSkin = "sknBtnNormalSSPFFFFFF15pxradius6";
			this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
			FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxContainer', 'customheader', 'flxFooter', 'flxHeader', 'flxMain', 'btnfindCVV', 'flxCardCVV', 'flxActivateContent', 'flxCVVPopup', 'flxFormContent']);
			this.view.onBreakpointChange = function() {
				scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
			};
			//this.onBreakpointChange(kony.application.getCurrentBreakpoint());
			this.view.customheader.forceCloseHamburger();
			this.view.myCards.lblFilterType.setVisibility(true);
			this.initializeCards();
			this.updateHamburgerMenu();
			applicationManager.getLoggerManager().setCustomMetrics(this, false, "Cards");
			this.initRightContainer();
			this.restrictCharactersSet();
			//this.ShowAllCards();
			// this.hideAllCardManagementViews();
			//  this.setTravelNotificationActions();
			this.view.customheader.btnSkip.onClick = function() {
				scopeObj.view.myCards.lblMyCardsHeader.setActive(true);
				scopeObj.view.lblSetCardLimitsHeader.setActive(true);
				scopeObj.view.lblNewCardHeader.setActive(true);
				scopeObj.view.lblCardAcknowledgement.setActive(true);
				scopeObj.view.lblActivateCardHeader.setActive(true);
				scopeObj.view.CardLockVerificationStep.confirmHeaders.lblHeading.setActive(true);
				scopeObj.view.CardLockVerificationStep.lblCardHeader.setActive(true);
				scopeObj.view.CardActivation.lblHeader.setActive(true);
				scopeObj.view.lblMyCardsHeader.setActive(true);
				// scopeObj.view.lblConfirmTravelPlan.setActive(true);
			};
			this.view.btnCancel8.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnDisputeTransaction.onClick = function() {
				var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"moduleName": "DisputeTransactionUIModule",
					"appName": "ArrangementsMA"
				});
				disputeModule.presentationController.showDisputeTransactionModule({
					show: OLBConstants.ACTION.SHOW_DISPUTE_LIST
				});
			};
			this.view.btnViewTransactionCancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnEMICancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			// this.view.btnEMIContinue.onClick = function() {
			// 	var selectedData = scopeObj.view.segEMITransactionDetails.selectedRowItems[0];
			// 	var navManager = applicationManager.getNavigationManager();
			// 	for (var i = 0; i < scopeObj.cacheUtils.data.length; i++) {
			// 		if (selectedData.lbl3 == scopeObj.cacheUtils.data[i].referenceNumber) {
			// 			navManager.setCustomInfo("EMI_authcode", scopeObj.cacheUtils.data[i].authCode);
			// 			scopeObj.view.flxConvertToEMI.setVisibility(false);
			// 			scopeObj.view.flxConvertToEMIConfirm.setVisibility(true);
			// 			scopeObj.view.lblEMIDescriptionValue.text = scopeObj.cacheUtils.data[i].merchantCategoryCode;
			// 			navManager.setCustomInfo("EMI_Description", scopeObj.cacheUtils.data[i].merchantCategoryCode);
			// 			scopeObj.view.lblEMIAmountValue.text = selectedData.lbl4;
			// 			navManager.setCustomInfo("EMI_TotalAmount", selectedData.lbl4);
			// 			scopeObj.view.lblEMIRoiValue.text = scope_configManager.getEmiInterestDate();
			// 			scopeObj.view.lblEMITenureValue.text = scope_configManager.getEmiTenureMonth();
			// 			var rate = scope_configManager.getEmiInterestDate().split("%");
			// 			var time = scope_configManager.getEmiTenureMonth().match(/\d+/);
			// 			var principal = selectedData.lbl4.split(" ");
			// 			var monthlyRate = (rate[0] / 12) / 100;
			// 			scopeObj.view.lblEMIAmountValues.text = principal[0] + " " + ((principal[1] * monthlyRate * Math.pow(1 + monthlyRate, time[0])) / (Math.pow(1 + monthlyRate, time[0]) - 1)).toFixed(2);
			// 			navManager.setCustomInfo("EMI_Amount", scopeObj.view.lblEMIAmountValues.text);
			// 			scopeObj.showEMIConfirmationScreen();
			// 		}
			// 	}
			// };
			this.view.segCardYearDropdownValues.onRowClick = this.onYearSelection.bind(this);
			this.view.segCardMonthStatement.onRowClick = this.DownloadPdf.bind(this);
			this.view.btnCancel8.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnDisputeTransaction.onClick = function() {
				var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"moduleName": "DisputeTransactionUIModule",
					"appName": "ArrangementsMA"
				});
				disputeModule.presentationController.showDisputeTransactionModule({
					show: OLBConstants.ACTION.SHOW_DISPUTE_LIST
				});
			};
			this.view.segCardYearDropdownValues.onRowClick = this.onYearSelection.bind(this);
			this.view.segCardMonthStatement.onRowClick = this.DownloadPdf.bind(this);
			this.view.flxCardYearDropdown.onClick = function() {
				if (scopeObj.view.lblCardYearDropdownIcon.text == "P") {
					scopeObj.view.segCardYearDropdownValues.setVisibility(false);
					scopeObj.view.lblCardYearDropdownIcon.text = "O";
					scopeObj.view.flxCardYearSegment.setVisibility(false);
				} else {
					scopeObj.view.segCardYearDropdownValues.setVisibility(true);
					scopeObj.view.lblCardYearDropdownIcon.text = "P";
					scopeObj.view.flxCardYearSegment.setVisibility(true);
				}
			}
			this.view.btnCancel8.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnBillable.onClick = function() {

				scopeObj.view.btnBillable.skin = "sknBtnSSPSemiboldSelected";
				scopeObj.view.btnUnBillable.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
				if (scopeObj.view.segTransactionDetailsBilled.data.length != 0) {
					scopeObj.view.segTransactionDetailsBilled.setVisibility(true);
					scopeObj.view.flxNoTransaction.setVisibility(false);
					scopeObj.view.segTransactionDetails.setVisibility(false);
					scopeObj.view.flxPaginationContainer.top = "0px";
					scopeObj.view.flxPaginationContainer.setVisibility(true);
				} else {
					scopeObj.view.segTransactionDetailsBilled.setVisibility(false);
					scopeObj.view.flxNoTransaction.setVisibility(true);
					scopeObj.view.segTransactionDetails.setVisibility(false);
					scopeObj.view.flxPaginationContainer.setVisibility(false);
				}
			};
			this.view.btnUnBillable.onClick = function() {
				scopeObj.view.btnBillable.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
				scopeObj.view.btnUnBillable.skin = "sknBtnSSPSemiboldSelected";
				if (scopeObj.view.segTransactionDetails.data.length != 0) {
					scopeObj.view.segTransactionDetailsBilled.setVisibility(false);
					scopeObj.view.flxNoTransaction.setVisibility(false);
					scopeObj.view.segTransactionDetails.setVisibility(true);
					scopeObj.view.flxPaginationContainer.top = "0px";
					scopeObj.view.flxPaginationContainer.setVisibility(true);
				} else {
					scopeObj.view.segTransactionDetailsBilled.setVisibility(false);
					scopeObj.view.flxNoTransaction.setVisibility(true);
					scopeObj.view.segTransactionDetails.setVisibility(false);
					scopeObj.view.flxPaginationContainer.setVisibility(false);
				}
			};
			let defaultParams = {
				"sortBy": "desc", //this.criteria["sortBy"],
				"pageSize": applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage'),
				"onUpdate": this.cacheCallBack,
				"filterParam": "transactionType",
				"filterValue": "All",
				"sortOrder": "desc",
				//   "segregationTypes" : this.transactionListTypes,
				//   "segregationField" : this._segregationDecider
			};
			this.cacheUtils = new CacheUtils(defaultParams);
			var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
			this.transactionsSortMap = [{
					name: 'transactionDate',
					imageFlx: this.view.imgDateSort,
					clickContainer: this.view.flxImage
				} //, 
				// {
				//     name: 'amount',
				//     imageFlx: this.view.transactions.imgSortAmount,
				//     clickContainer: this.view.transactions.flxSortAmount
				// }
			];
			this.view.flxImage.onClick = this.flxDateonClick.bind(this);
			this.view.flxAmountSort.onClick = this.flxAmountOnClick.bind(this);
			this.view.flxCardYearDropdown.onClick = function() {
				scopeObj.view.segCardYearDropdownValues.setVisibility(true);
				scopeObj.view.lblCardYearDropdownIcon.text = "P";
				scopeObj.view.flxCardYearSegment.setVisibility(true);
			}
			var dateformat = applicationManager.getFormatUtilManager().getDateFormat();
			this.view.calFrom.dateFormat = dateformat;
			this.view.calTo.dateFormat = dateformat;
			CommonUtilities.disableOldDaySelection(this.view.calFrom);
			CommonUtilities.disableOldDaySelection(this.view.calTo);
			this.view.calFrom.hidePreviousNextMonthDates = true;
			this.view.calTo.hidePreviousNextMonthDates = true;
			FormControllerUtility.disableButton(this.view.btnCardsContinue);
			this.view.flxDownload.setVisibility(false); // TODO: implementation in next sprint,currently hidding the view
			//this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
			// this.view.flxMangeTravelPlans.setVisibility(true);
			applicationManager.getNavigationManager().applyUpdates(this);
			//this.view.myCards.txtSearch.onKeyUp = this.searchCards;
			this.view.myCards.txtSearch.onTextChange = function() {
				scopeObj.view.myCards.flxCards.setVisibility(false);
				scopeObj.view.myCards.txtSearch.accessibilityConfig = {
					"a11yARIA": {
						"aria-autocomplete": "list",
						"aria-expanded": true,
						"role": "combobox",
						"aria-required": false,
						"aria-controls": (scopeObj.view.myCards.flxSearchSegment.isVisible) ? "flxSearchSegment" : "flxSearch",
						"tabindex": 0
					}
				};
				if (this.view.myCards.txtSearch.text.length > 0) {
					this.view.myCards.flxClearBtn.setVisibility(true)
				}
				else{
					this.view.myCards.flxClearBtn.setVisibility(false)
				}
				if (this.view.myCards.txtSearch.text.length >= 3) {
					kony.application.showLoadingScreen();
                    this.searchCards();
                }
                else{
                    var navManager = applicationManager.getNavigationManager();
					kony.application.showLoadingScreen();
				var cards=navManager.getCustomInfo("getCardsResponse");
                    this.setCardsData(this.constructCardsViewModel(cards));
                }
			}.bind(this);
			this.view.myCards.flxtxtSearchandClearbtn.onClick = function() {
				scopeObj.view.myCards.txtSearch.isVisible ? scopeObj.view.myCards.txtSearch.setActive(true) : null;
			}.bind(this);
			this.view.myCards.txtSearch.onKeyPress = this.txtSearchKeyPressCallback;
			this.view.myCards.txtSearch.accessibilityConfig = {
				"a11yARIA": {
					"aria-autocomplete": "list",
					"aria-expanded": false,
					"role": "combobox",
					"aria-required": false,
					"aria-controls": (scopeObj.view.myCards.flxSearchSegment.isVisible) ? "flxSearchSegment" : "flxSearch",
					"tabindex": 0
				}
			};
			if (kony.application.getCurrentBreakpoint() === 640) {
				this.view.myCard.btnByPass.setVisibility(false);
				this.view.myCard.flxClearBtn.left = "5%";
				this.view.myCard.flxClearBtn.width = "8%";
			}
			this.view.myCards.btnByPass.onClick = this.byPassBlock;
			this.view.myCards.flxClearBtn.onClick = function() {
				var navManager = applicationManager.getNavigationManager();
                kony.application.showLoadingScreen();
                var cards = navManager.getCustomInfo("getCardsResponse");
                scopeObj.setCardsData(scopeObj.constructCardsViewModel(cards));
                scopeObj.view.myCards.flxtxtSearchandClearbtn.setActive(true);
                scopeObj.view.myCards.flxClearBtn.setVisibility(false);
                scopeObj.view.myCards.txtSearch.text = "";
                scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
                scopeObj.view.myCards.flxAccountName.setVisibility(false);
			};
			this.view.myCards.flxFiltersWrapper.onClick = function() {
				if (scopeObj.view.myCards.lblDropdown.text == "O") {
					var segData = scopeObj.view.myCards.segCardsSegment.data;
					if (segData && segData.length > 0) {
            			segData[segData.length - 1].flxSeparator = {
                		isVisible: false
            		};
            		scopeObj.view.myCards.segCardsSegment.setData(segData);
        			}
					scopeObj.view.myCards.flxCards.setVisibility(true);
					scopeObj.view.myCards.lblDropdown.text = "P";
				} else if (scopeObj.view.myCards.lblDropdown.text == "P") {
					scopeObj.view.myCards.flxCards.setVisibility(false);
					scopeObj.view.myCards.lblDropdown.text = "O";
				}
			};
			this.view.myCards.segCardsSegment.onRowClick = function() {
				var selectedItem = scopeObj.view.myCards.segCardsSegment.selectedRowItems[0];
				var cards = selectedItem.lblAccountName;
				if (cards == "Debit Cards") {
					scopeObj.view.myCards.flxDebitCards.setVisibility(true);
					scopeObj.view.myCards.flxCreditCards.setVisibility(false);
					scopeObj.view.myCards.flxPrepaidCards.setVisibility(false);
				} else if (cards == "Credit Cards") {
					scopeObj.view.myCards.flxDebitCards.setVisibility(false);
					scopeObj.view.myCards.flxCreditCards.setVisibility(true);
					scopeObj.view.myCards.flxPrepaidCards.setVisibility(false);
				} else if (cards == "Prepaid Cards") {
					scopeObj.view.myCards.flxDebitCards.setVisibility(false);
					scopeObj.view.myCards.flxCreditCards.setVisibility(false);
					scopeObj.view.myCards.flxPrepaidCards.setVisibility(true);
				} else {
					scopeObj.view.myCards.flxDebitCards.setVisibility(true);
					scopeObj.view.myCards.flxCreditCards.setVisibility(true);
					scopeObj.view.myCards.flxPrepaidCards.setVisibility(true);
				}
				scopeObj.view.myCards.flxCards.setVisibility(false);
				scopeObj.view.myCards.lblDropdown.text = "O";
				scopeObj.view.myCards.lblType.text = cards;
			};
			this.view.onKeyPress = this.onKeyPressCallBack;
			this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
			this.view.myCards.flxAccountName.setVisibility(false);
			this.view.myCards.segSearch.onRowClick = this.searchSegOnRowClick;
			this.view.myCards.flxCross.onClick = this.ShowAllCards;
			this.view.myCards.flxClearBtn.onKeyPress = function(eventObject, eventPayload) {
				if (eventPayload.keyCode === 27) {
					scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
				} else if (eventPayload.keyCode === 9)
					if (!scopeObj.view.myCards.segSearch.isVisible) {
						scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
					}
			};
			scopeObj.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
			CampaignUtility.fetchPopupCampaigns();
		},
		cacheCallBack: function(data, params) {
			this.totalRecords = params.pagination.totalSize;
		},
		init: function() {
			FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
		},
		onKeyPressCallBack: function(eventObject, eventPayload) {
			var self = this;
			if (eventPayload.keyCode === 27) {
				if (self.view.flxLogout.isVisible === true) {
					self.view.flxLogout.isVisible = false;
					self.view.customheader.onKeyPressCallBack(eventObject, eventPayload);
				}
			}
		},
		txtSearchKeyPressCallback: function(eventObject, eventPayload) {
			var scopeObj = this;
			if (eventPayload.keyCode === 27) {
				if (scopeObj.view.myCards.flxSearchSegment.isVisible) {
					scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
					eventPayload.preventDefault();
					scopeObj.view.myCards.flxtxtSearchandClearbtn.accessibilityConfig = {
						"a11yARIA": {
							"aria-autocomplete": "list",
							"aria-expanded": false,
							"role": "combobox",
							"aria-required": false,
							"aria-controls": (scopeObj.view.myCards.flxSearchSegment.isVisible) ? "flxSearchSegment" : "flxSearch",
							"tabindex": -1
						}
					};
					scopeObj.view.myCards.flxtxtSearchandClearbtn.setActive(true);
				}
			} else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
				scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
			}
		},
		byPassBlock: function() {
			this.view.flxRequestANewCard.setActive(true);
		},

		setTravelNotificationActions: function() {
			this.showContactUsNavigation();
		},
		/**
		 * initializeCards - Method to initialize the globals.
		 */
		initializeCards: function() {
			this.initializeCardImages();
			this.initializeStatusSkins();
		},
		/**
		 * initializeStatusSkins - Method to initialize the status skins in globals.
		 */
		initializeStatusSkins: function() {
			this.statusSkinsLandingScreen['Active'] = ViewConstants.SKINS.CARDS_ACTIVE_STATUS_LANDING;
			this.statusSkinsLandingScreen['Locked'] = ViewConstants.SKINS.CARDS_LOCKED_STATUS_LANDING;
			this.statusSkinsLandingScreen['Reported Lost'] = ViewConstants.SKINS.CARDS_REPORTED_LOST_STATUS_LANDING;
			this.statusSkinsLandingScreen['Replace Request Sent'] = ViewConstants.SKINS.CARDS_REPLACE_REQUEST_SENT_STATUS_LANDING;
			this.statusSkinsLandingScreen['Replaced'] = ViewConstants.SKINS.CARDS_REPLACE_REQUEST_SENT_STATUS_LANDING;
			this.statusSkinsLandingScreen['Cancel Request Sent'] = ViewConstants.SKINS.CARDS_CANCEL_REQUEST_SENT_STATUS_LANDING;
			this.statusSkinsLandingScreen['Cancelled'] = ViewConstants.SKINS.CARDS_CANCELLED_STATUS_LANDING;
			this.statusSkinsLandingScreen['Inactive'] = ViewConstants.SKINS.CARDS_INACTIVE_STATUS_LANDING;
			this.statusSkinsDetailsScreen['Active'] = ViewConstants.SKINS.CARDS_ACTIVE_STATUS_DETAILS;
			this.statusSkinsDetailsScreen['Locked'] = ViewConstants.SKINS.CARDS_LOCKED_STATUS_DETAILS;
			this.statusSkinsDetailsScreen['Reported Lost'] = ViewConstants.SKINS.CARDS_REPORTED_LOST_STATUS_DETAILS;
			this.statusSkinsDetailsScreen['Replace Request Sent'] = ViewConstants.SKINS.CARDS_REPLACE_REQUEST_SENT_STATUS_DETAILS;
			this.statusSkinsDetailsScreen['Replaced'] = ViewConstants.SKINS.CARDS_REPLACE_REQUEST_SENT_STATUS_DETAILS;
			this.statusSkinsDetailsScreen['Cancel Request Sent'] = ViewConstants.SKINS.CARDS_CANCEL_REQUEST_SENT_STATUS_DETAILS;
			this.statusSkinsDetailsScreen['Cancelled'] = ViewConstants.SKINS.CARDS_CANCELLED_STATUS_DETAILS;
			this.statusSkinsLandingScreen['Issued'] = ViewConstants.SKINS.CARDS_ISSUED_STATUS_LANDING;
			this.statusSkinsLandingScreen['NearingExpiry'] = ViewConstants.SKINS.CARDS_ACTIVE_STATUS_LANDING;
			this.statusSkinsDetailsScreen['Expired'] = ViewConstants.SKINS.CARDS_LOCKED_STATUS_DETAILS;
		},
		/**
		 * initializeCardImages - Method to initialize the card images in globals.
		 */
		initializeCardImages: function() {
			this.cardImages['My Platinum Credit Card'] = ViewConstants.IMAGES.PREMIUM_CLUB_CREDITS;
			this.cardImages['Gold Debit Card'] = ViewConstants.IMAGES.GOLDEN_CARDS;
			this.cardImages['Premium Club Credit Card'] = ViewConstants.IMAGES.PLATINUM_CARDS;
			this.cardImages['Shopping Card'] = ViewConstants.IMAGES.SHOPPING_CARDS;
			this.cardImages['Petro Card'] = ViewConstants.IMAGES.PETRO_CARDS;
			this.cardImages['Eazee Food Card'] = ViewConstants.IMAGES.EAZEE_FOOD_CARDS;
			this.cardImages['Freedom Credit Card'] = ViewConstants.IMAGES.PREMIUM_CLUB_CREDITS;
			this.cardImages['visa'] = ViewConstants.IMAGES.PREMIUM_CLUB_CREDITS;
		},
		changeLimitWithdrawal: function(card) {
			/**
			 * Method to update the card limit value for Withdrawal
			 */
			this.view.lblSetWithdrawalLimitSlider.text = "";
			var selValue = this.view.limitWithdrawalSlider.selectedValue;
			selValue = CommonUtilities.formatCurrencyWithCommas(selValue, false, card.currencyCode);
			this.view.lblSetWithdrawalLimitSlider.text = selValue;
		},

		restoreDefaultsWithdrawalLim: function(card) {
			var prevValue = this.view.limitPrevWithdrawalSlider.selectedValue;
			this.view.limitWithdrawalSlider.selectedValue = parseInt(prevValue);
			prevValue = CommonUtilities.formatCurrencyWithCommas(prevValue, false, card.currencyCode);
			this.view.lblSetWithdrawalLimitSlider.text = prevValue;
		},
		changeLimitPurchase: function(card) {
			/**
			 * Method to update the card limit value for Purchase
			 */
			this.view.lblSetPurchaseLimitSlider.text = "";
			var selValue = this.view.limitPurchaseSlider.selectedValue;
			selValue = CommonUtilities.formatCurrencyWithCommas(selValue, false, card.currencyCode);
			this.view.lblSetPurchaseLimitSlider.text = selValue;
		},
		restoreDefaultsPurchaseLim: function(card) {
			var prevValue = this.view.limitPrevPurchaseSlider.selectedValue;
			this.view.limitPurchaseSlider.selectedValue = parseInt(prevValue);
			prevValue = CommonUtilities.formatCurrencyWithCommas(prevValue, false, card.currencyCode);
			this.view.lblSetPurchaseLimitSlider.text = prevValue;
		},
		initLimitsSliders: function(card) {
			/**
			 * Method to initialize the values for card limits sliders
			 */
			withdrawalLimit = card.dailyWithdrawalLimit;
			this.view.lblSetWithdrawalLimitSlider.text = withdrawalLimit;
			withdrawalLimit = CommonUtilities.deFormatAmount(withdrawalLimit);

			withdrawalMinLimit = card.withdrawalMinLimit;
			withdrawalMaxLimit = card.withdrawalMaxLimit;
			withdrawalStepLimit = card.withdrawalStepLimit;
			withdrawalMinLimit == undefined || withdrawalMinLimit == null ? withdrawalMinLimit = 0 : withdrawalMinLimit;
			Number(withdrawalLimit) < Number(withdrawalMinLimit) ? withdrawalLimit = withdrawalMinLimit : withdrawalLimit;
			withdrawalMaxLimit == 0 || withdrawalMaxLimit == undefined || withdrawalMaxLimit == null ? withdrawalMaxLimit = 5000 : withdrawalMaxLimit;
			withdrawalStepLimit == 0 || withdrawalStepLimit == undefined || withdrawalStepLimit == null ? withdrawalStepLimit = 50 : withdrawalStepLimit;

			purchaseLimit = card.purchaseLimit;
			this.view.lblSetPurchaseLimitSlider.text = purchaseLimit;
			purchaseLimit = CommonUtilities.deFormatAmount(purchaseLimit);

			purchaseMinLimit = card.purchaseMinLimit;
			purchaseMaxLimit = card.purchaseMaxLimit;
			purchaseStepLimit = card.purchaseStepLimit;
			purchaseMinLimit == undefined || purchaseMinLimit == null ? purchaseMinLimit = 0 : purchaseMinLimit;
			Number(purchaseLimit) < Number(purchaseMinLimit) ? purchaseLimit = purchaseMinLimit : purchaseLimit;
			purchaseMaxLimit == 0 || purchaseMaxLimit == undefined || purchaseMaxLimit == null ? purchaseMaxLimit = 5000 : purchaseMaxLimit;
			purchaseStepLimit == 0 || purchaseStepLimit == undefined || purchaseStepLimit == null ? purchaseStepLimit = 50 : purchaseStepLimit;

			this.view.limitWithdrawalSlider.max = parseInt(withdrawalMaxLimit);
			this.view.limitWithdrawalSlider.selectedValue = parseInt(withdrawalLimit);
			this.view.limitWithdrawalSlider.min = parseInt(withdrawalMinLimit);
			this.view.limitWithdrawalSlider.step = parseInt(withdrawalStepLimit);
			this.view.limitPrevWithdrawalSlider.max = parseInt(withdrawalMaxLimit);
			this.view.limitPrevWithdrawalSlider.selectedValue = parseInt(withdrawalLimit);
			this.view.limitPrevWithdrawalSlider.min = parseInt(withdrawalMinLimit);

			this.view.limitPurchaseSlider.max = parseInt(purchaseMaxLimit);
			this.view.limitPurchaseSlider.selectedValue = parseInt(purchaseLimit);
			this.view.limitPurchaseSlider.min = parseInt(purchaseMinLimit);
			this.view.limitPurchaseSlider.step = parseInt(purchaseStepLimit);
			this.view.limitPrevPurchaseSlider.max = parseInt(purchaseMaxLimit);
			this.view.limitPrevPurchaseSlider.selectedValue = parseInt(purchaseLimit);
			this.view.limitPrevPurchaseSlider.min = parseInt(purchaseMinLimit);

			this.setCardLimitsSliders(card);

		},
		updateCardLimits: function(card) {
			/**
			 * Method to update the card limitis sliders values
			 */
			withdrawalLimit = this.view.lblSetWithdrawalLimitSlider.text;
			withdrawalLimit = CommonUtilities.deFormatAmount(withdrawalLimit);
			purchaseLimit = this.view.lblSetPurchaseLimitSlider.text;
			purchaseLimit = CommonUtilities.deFormatAmount(purchaseLimit);
			this.view.lblWithdrawalLimitValue.text = this.view.lblSetWithdrawalLimitSlider.text;
			this.view.lblPurchaseLimitValue.text = this.view.lblSetPurchaseLimitSlider.text;
			if (this.view.flxDailyWithdrawalLimit.isVisible) {
				params = {
					"cardId": card.cardId,
					"withdrawalLimit": withdrawalLimit,
					"card": card
				};
				if (CommonUtilities.getSCAType() != 0)
					params.isMFARequired = card.isMFARequired;
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.updateWithdrawalLimit(params);

			}
			if (this.view.flxDailyPurchaseLimit.isVisible) {
				params = {
					"cardId": card.cardId,
					"purchaseLimit": purchaseLimit,
					"card": card
				};
				if (CommonUtilities.getSCAType() != 0)
					params.isMFARequired = card.isMFARequired;
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.updatePurchaseLimit(params);
			}

		},
		setCardLimitsSliders: function(card) {
			/**
			 * Method to manage the sliders for updating the card limits
			 */
			/* this.view.btnRestoreDefaults.onClick = () => {
			     this.restoreDefaultsWithdrawalLim(card);
			     this.restoreDefaultsPurchaseLim(card);
			 }; */
			this.view.btnRestoreWithdrawlDefaults.onClick = () => {
				this.restoreDefaultsWithdrawalLim(card);
				// this.restoreDefaultsPurchaseLim(card);
			};
			this.view.btnRestorePurchaseDefaults.onClick = () => {
				//this.restoreDefaultsWithdrawalLim(card);
				this.restoreDefaultsPurchaseLim(card);
			};

			this.view.limitWithdrawalSlider.onSlide = () => {
				this.changeLimitWithdrawal(card);
			};
			this.view.limitPurchaseSlider.onSlide = () => {
				this.changeLimitPurchase(card);
			};
		},
		/**
		 * Method to initialize the actions for right side flex.
		 */
		initRightContainer: function() {
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblActivateNewCard.text = kony.i18n.getLocalizedString("i18n.footer.contactUs");
			this.view.lblApplyForNewCard.text = kony.i18n.getLocalizedString("i18n.CardManagement.ApplyForNewCard");
			var infoContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
				"appName": "AboutUsMA",
				"moduleName": "InformationContentUIModule"
			});
			this.view.flxActivateNewCard.onClick = infoContentModule.presentationController.showContactUsPage.bind(infoContentModule.presentationController);
		},
		/**
		 * Form lifecycle method.
		 */
		PostShowfrmCardManagement: function() {
			var scope = this;
			var context1 = {
				"widget": this.view.calFrom,
				"anchor": "bottom"
			};
			this.view.calFrom.setContext(context1);
			context1 = {
				"widget": this.view.calTo,
				"anchor": "bottom"
			};
			this.view.CardLockVerificationStep.CardActivation.lblAgree.accessibilityConfig = {
				a11yHidden: true,
				"a11yARIA": {
					"tabindex": -1
				}
			}
			this.view.calTo.setContext(context1);
			context1 = {
				"widget": this.view.CardLockVerificationStep.calFrom1,
				"anchor": "bottom"
			};
			this.view.CardLockVerificationStep.calFrom1.setContext(context1);
			context1 = {
				"widget": this.view.CardLockVerificationStep.calTo1,
				"anchor": "bottom"
			};
			this.view.CardLockVerificationStep.calTo1.setContext(context1);
			this.setTravelNotificationDataMap();
			this.setActionPermissionMap();
			//  this.view.myCards.flxFiltersList.setVisibility(false);
			applicationManager.executeAuthorizationFramework(this);
			this.view.customheader.customhamburger.collapseAll();
			this.AdjustScreen();
			scope.view.flxTC.onKeyPress = scope.termsAndConditionsAccessibility;
			scope.view.flxClose.accessibilityConfig = {
				"a11yLabel": "Close this popup",
				"a11yARIA": {
					"role": "button",
					"tabindex": 0
				},
			}
			this.view.flxRequestANewCard.accessibilityConfig = {
				"a11yARIA": {
					"role": "link",
					"tabindex": 0
				},
			}
			this.view.myCards.lblMyCardsHeader.accessibilityConfig = {
				"a11yLabel": " ",
				"tagName": "h1",
				"a11yARIA": {
					"tabindex": -1
				}
			}
			//  this.view.lblManageTravelPlans.toolTip = '';
			this.view.lblActivateNewCard.toolTip = '';
			if (kony.os.deviceInfo().screenHeight < 400) {
				if (kony.os.deviceInfo().screenWidth <= 640) {
					this.view.CardLockVerificationStep.cardDetails.lbl1.isVisible = true;
					this.view.CardLockVerificationStep.cardDetails.lbl1.top = "10dp";
					this.view.CardLockVerificationStep.cardDetails.lbl2.isVisible = true;
					this.view.CardLockVerificationStep.cardDetails.lbl3.isVisible = true;
					this.view.CardLockVerificationStep.cardDetails.flxCardHeader.height = "180dp";
					this.view.CardLockVerificationStep.flxLeft.clipBounds = false;
					this.view.CardLockVerificationStep.flxRight.top = "90dp";
					this.view.CardLockVerificationStep.CardActivation.lblWarning.width = "70%";
				}
			}
			this.view.confirmButtons.btnConfirm.toolTip = "";
			this.view.confirmButtons.btnCancel.toolTip = "";
			var param = {
				"fromAccountCurrency": "USD",
				"transactionCurrency": "NPR",
				"transactionAmount": "1"
			}
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getCurrecyExchangeRate(param);
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.
			getBankDate();
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getBranchList();
			var param1 = {
				"fromAccountCurrency": "NPR",
				"transactionCurrency": "USD",
				"transactionAmount": "1"
			}
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getCurrecyExchangeRate1(param1);
			kony.application.dismissLoadingScreen();
		},

		termsAndConditionsAccessibility: function(eventObject, eventPayload) {
			var scope = this;
			if (eventPayload.keyCode === 27) {
				scope.view.flxTermsAndConditionsPopUp.setVisibility(false);
				if (scope.currentTermsAndConditionsWidget.toLowerCase() === "lockcard") {
					scope.view.CardLockVerificationStep.CardActivation.btnTermsAndConditions.setActive(true);
				} else if (scope.currentTermsAndConditionsWidget.toLowerCase() === "unlockcard") {
					scope.view.CardActivation.btnTermsAndConditions.setActive(true);
				}
			}
		},

		removeActionDelete: function() {
			//   delete this.travelNotificationDataMap["btnAction2"];  don't remove function
		},

		removeActionUpdate: function() {
			//  delete this.travelNotificationDataMap["btnAction1"];
			// this.view.flxMangeTravelPlans.setVisibility(false);
			this.view.flxCardAccounts.forceLayout();
		},

		removeActionLockCard: function() {
			// delete this.actionPermissionMap["CARD_MANAGEMENT_LOCK_CARD"];
		},

		removeActionReplaceCard: function() {
			delete this.actionPermissionMap["CARD_MANAGEMENT_REPLACE_CARD"];
		},

		removeActionReportLost: function() {
			delete this.actionPermissionMap["CARD_MANAGEMENT_REPORT_CARD_STOLEN"];
		},

		removeActionChangePin: function() {
			delete this.actionPermissionMap["CARD_MANAGEMENT_CHANGE_PIN"];
		},

		removeActionCancelCard: function() {
			delete this.actionPermissionMap["CARD_MANAGEMENT_CANCEL_CARD"];
		},

		removeActionUnlockCard: function() {
			delete this.actionPermissionMap["CARD_MANAGEMENT_UNLOCK_CARD"];
		},

		checkForNAOPermission: function() {
			applicationManager.executeAuthorizationFramework(this, "NAO");
		},

		removeActionApplyForNewCards: function() {
			this.view.myCards.flxApplyForCards.setVisibility(false);
		},

		hideManageTravelPlans: function() {
			this.view.flxMangeTravelPlans.setVisibility(false);
		},


		doNotRemoveActions: function() {

		},

		setActionPermissionMap: function() {
			this.actionPermissionMap = {
				"CARD_MANAGEMENT_LOCK_CARD": kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"),
				"CARD_MANAGEMENT_REPLACE_CARD": kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard"),
				"CARD_MANAGEMENT_REPORT_CARD_STOLEN": kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"),
				"CARD_MANAGEMENT_CHANGE_PIN": kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"),
				"CARD_MANAGEMENT_CANCEL_CARD": kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"),
				"CARD_MANAGEMENT_UNLOCK_CARD": kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"),
				"CARD_MANAGEMENT_SET_LIMITS": kony.i18n.getLocalizedString("i18n.CardManagement.SetLimits"),
				"CARD_MANAGEMENT_ISSUED_CARD": kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"),
				"CARD_MANAGEMENT_CONVERT_TO_EMI": kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI"),
				"CARD_MANAGEMENT_PAY_BILL": kony.i18n.getLocalizedString("i18n.Pay.PayBill"),
				"CARD_MANAGEMENT_DOWNLOAD_STATEMENT": kony.i18n.getLocalizedString("i18n.HBL.Cards.DownloadStatement"),
				"CARD_MANAGEMENT_TOPUP_CARD": kony.i18n.getLocalizedString("i18n.HBL.Cards.TopUpCard"),
				"CARD_MANAGEMENT_VIEW_TRANSACTIONS": kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"),
			}
		},

		getValidActions: function() {
			var scope = this;
			return Object.keys(scope.actionPermissionMap).map(function(key) {
				return scope.actionPermissionMap[key];
			});
		},

		setTravelNotificationDataMap: function() {
			this.travelNotificationDataMap = {
				"flxActions": "flxActions",
				"lblSeparator1": "lblSeparator1",
				"lblCardHeader": "lblCardHeader",
				"lblCardId": "lblCardId",
				"lblCardStatus": "lblCardStatus",
				"lblIdentifier": "lblIdentifier",
				"flxCollapse": "flxCollapse",
				"imgCollapse": "imgCollapse",
				"imgChevron": "imgChevron",
				"lblKey1": "lblKey1",
				"rtxValue1": "rtxValue1",
				"lblKey2": "lblKey2",
				"rtxValue2": "rtxValue2",
				"flxDestination1": "flxDestination1",
				"flxDestination2": "flxDestination2",
				"flxDestination3": "flxDestination3",
				"flxDestination4": "flxDestination4",
				"flxDestination5": "flxDestination5",
				"lblDestination1": "lblDestination1",
				"rtxDestination1": "rtxDestination1",
				"lblDestination2": "lblDestination2",
				"rtxDestination2": "rtxDestination2",
				"lblDestination3": "lblDestination3",
				"rtxDestination3": "rtxDestination3",
				"lblDestination4": "lblDestination4",
				"rtxDestination4": "rtxDestination4",
				"lblDestination5": "lblDestination5",
				"rtxDestination5": "rtxDestination5",
				"lblKey4": "lblKey4",
				"rtxValue4": "rtxValue4",
				"lblKey5": "lblKey5",
				"rtxValue5": "rtxValue5",
				"lblKey6": "lblKey6",
				"rtxValueA": "rtxValueA",
				"btnAction1": "btnAction1",
				"btnAction2": "btnAction2",
				"lblCardStatusAccesibility": "lblCardStatusAccesibility"
			};
		},

		/**
		 * showIncorrectSecureAnswersFlex: This function enables the incorrect security answers flex.
		 */
		showIncorrectSecurityAnswersFlex: function() {
			CommonUtilities.hideProgressBar(this.view);
			this.view.CardLockVerificationStep.flxWarningMessage.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.lblWarning.text = kony.i18n.getLocalizedString("i18n.MFA.EnteredSecurityQuestionsDoesNotMatch");
			this.view.forceLayout();
		},
		/**
		 * showSecurityQuestionsScreen - Shows the screen where user can enter secure access code and verify.
		 * @param {Array} - Security Questions array.
		 * @param {params} contains the params object.
		 * @param {String} action - contains the action to be performed.
		 */
		showSecurityQuestionsScreen: function(securityQuestions, params, action) {
			var self = this;
			if (action === kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LockCardSecurityQuestions"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin") || action === "Offline_Change_Pin") {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinSecurityQuestions"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCardSecurityQuestions"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolenCardSecurityQuestions"));
			} else if (action === kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ReplaceCardSecurityQuestions"));
			} else if (action === kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelVerification"));
			}
			this.view.CardLockVerificationStep.flxWarningMessage.setVisibility(false);
			FormControllerUtility.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			this.view.CardLockVerificationStep.flxVerifyByOptions.setVisibility(false);
			this.view.CardLockVerificationStep.flxVerifyBySecureAccessCode.setVisibility(false);
			this.view.CardLockVerificationStep.flxVerifyBySecurityQuestions.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.lblAnswerSecurityQuestion1.text = securityQuestions[0].Question;
			this.view.CardLockVerificationStep.lblAnswerSecurityQuestion2.text = securityQuestions[1].Question;
			this.view.CardLockVerificationStep.tbxAnswers1.text = "";
			this.view.CardLockVerificationStep.tbxAnswers2.text = "";
			this.view.forceLayout();
			this.view.CardLockVerificationStep.tbxAnswers1.onKeyUp = function() {
				if (self.view.CardLockVerificationStep.tbxAnswers1.text === "" || self.view.CardLockVerificationStep.tbxAnswers2.text === "" || CommonUtilities.isCSRMode()) {
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
				} else {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
				}
			};
			this.view.CardLockVerificationStep.tbxAnswers2.onKeyUp = function() {
				if (self.view.CardLockVerificationStep.tbxAnswers1.text === "" || self.view.CardLockVerificationStep.tbxAnswers2.text === "" || CommonUtilities.isCSRMode()) {
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
				} else {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
				}
			};
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			this.view.CardLockVerificationStep.btnCancel.onClick = this.showMFAScreen.bind(this, params, action);
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = FormControllerUtility.disableButtonActionForCSRMode();
			} else {
				this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
					self.view.CardLockVerificationStep.flxWarningMessage.setVisibility(false);
					var questionAnswers = [];
					questionAnswers.push({
						'questionId': securityQuestions[0].SecurityQuestion_id,
						'customerAnswer': self.view.CardLockVerificationStep.tbxAnswers1.text
					}, {
						'questionId': securityQuestions[1].SecurityQuestion_id,
						'customerAnswer': self.view.CardLockVerificationStep.tbxAnswers2.text
					});
					params.questionAnswers = questionAnswers;
					FormControllerUtility.showProgressBar(self.view);
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.verifySecurityQuestionAnswers(params, action);
				};
			}
			CommonUtilities.hideProgressBar(self.view);
		},
		getSelectedAddressId: function() {
			var i = 0;
			var addresses = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchUserAddresses();
			if (this.view.CardLockVerificationStep.lblAddressCheckBox1.text === "M") i = 0;
			if (this.view.CardLockVerificationStep.lblAddressCheckBox2.text === "M") i = 1;
			if (this.view.CardLockVerificationStep.lblAddressCheckBox3.text === "M") i = 2;
			return addresses[i].addressId;
			//return kony.mvc.MDAApplication.getSharedInstance().appContext.address[i].Address_id;
		},
		updateFormUI: function(viewPropertiesMap) {
			var navManager = applicationManager.getNavigationManager();
			if (viewPropertiesMap.cards && viewPropertiesMap.cards !== null && viewPropertiesMap.cards !== undefined) {
				var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("getCardsResponse", viewPropertiesMap.cards);
				var reqModify = navManager.getCustomInfo("RequestCardModify")
                if(reqModify == "Modify"){
                    var reqCardRes = navManager.getCustomInfo("RequestCardInput");
                    this.view.lblAccountvalue.text = reqCardRes.fromAccount;
                    this.view.lblCardValue.text = reqCardRes.cardType;
                    this.view.lblDailyPurchaseLimitValue.text = reqCardRes.dailyPurchaseLimitValue;
                    this.view.lblDailyWithdrawLimitValue.text = reqCardRes.dailyWithdrawLimitValue;
                    this.view.lblAnnualCharges.text = reqCardRes.annualChargesValue;
                    this.view.tbxNameOnCard.text = reqCardRes.nameOnCard;
                    this.view.lblBranchNames.text = reqCardRes.branchName;
                    navManager.setCustomInfo("RequestCardModify", "notModify");
                }else{
                    this.showCards();
                    //this.seggregateCards(viewPropertiesMap.cards)
                    this.setCardsData(this.constructCardsViewModel(viewPropertiesMap.cards));
                }
			}
			if (viewPropertiesMap.searchPerformed) {
				if (viewPropertiesMap.searchFrom == "AccountsDashboard") {
					this.showSelectedCardDetails(viewPropertiesMap.searchResults, "AccountsDashboard")
				} else {
					this.showSearchResultsOfCards(viewPropertiesMap.searchResults);
				}
				//this.setCardsData(this.constructCardsViewModel(viewPropertiesMap.cards));
			}
			if (viewPropertiesMap.secureAccessCode) {
				this.showSecureAccessCodeScreen(viewPropertiesMap.params, viewPropertiesMap.action);
			}
			if (viewPropertiesMap.progressBar === true) {
				FormControllerUtility.showProgressBar(this.view);
				this.hideServerError();
			} else if (viewPropertiesMap.progressBar === false) {
				CommonUtilities.hideProgressBar(this.view);
				this.hideServerError();
			}
			/*if (viewPropertiesMap.showIncorrectCVV) {
				this.showErrorCVV(viewPropertiesMap.card);
			}*/
			if (viewPropertiesMap.serverError) {
				CommonUtilities.hideProgressBar(this.view);
				this.showServerError(viewPropertiesMap.serverError);
			}
			if (viewPropertiesMap.applyCardError) {
				CommonUtilities.hideProgressBar(this.view);
				this.showSetPinScreen(navManager.getCustomInfo("newCardConfirmData1"), navManager.getCustomInfo("newCardConfirmData2"));
			}
			if (viewPropertiesMap.topUpCardError) {
				CommonUtilities.hideProgressBar(this.view);
				this.formTopUpData(navManager.getCustomInfo("topUpCOnfirmData"))
			}
			
			if (viewPropertiesMap.serverDown) {
				CommonUtilities.hideProgressBar(this.view);
				CommonUtilities.showServerDownScreen();
			}
			if (viewPropertiesMap.sideMenu) {
				this.updateHamburgerMenu(viewPropertiesMap.sideMenu);
			}
			if (viewPropertiesMap.incorrectSecureAccessCode) {
				this.showIncorrectSecureAccessCodeFlex();
			}
			if (viewPropertiesMap.TndCSuccessLockCard) {
				this.showTermsAndConditionsSuccessScreenLockCard(viewPropertiesMap.TndCSuccessLockCard);
			}
			if (viewPropertiesMap.TndCSuccessUnlockCard) {
				this.showTermsAndConditionsSuccessScreenUnlockCard(viewPropertiesMap.TndCSuccessUnlockCard);
			}
			if (viewPropertiesMap.TndCSuccessCancelCard) {
				this.showTermsAndConditionsSuccessScreenCancelCard(viewPropertiesMap.TndCSuccessCancelCard);
			}
			// if (viewPropertiesMap.travelNotificationsList) {
			//     applicationManager.executeAuthorizationFramework(this, "updateTravelNotifications");
			//     this.showTravelNotifications(viewPropertiesMap.travelNotificationsList.TravelRequests);
			// }
			if (viewPropertiesMap.actionAcknowledgement) {
				this.showAcknowledgementScreen(viewPropertiesMap.card, viewPropertiesMap.actionAcknowledgement);
			}
			// if (viewPropertiesMap.AddNewTravelPlan) {
			//     this.showAddNewTravelPlan(viewPropertiesMap);
			// }
			// if (viewPropertiesMap.notificationAcknowledgement) {
			//     this.showTravelNotificationAcknowledgement(viewPropertiesMap.notificationAcknowledgement);
			// }
			if (viewPropertiesMap.eligibleCards) {
				this.showSelectCardScreen(viewPropertiesMap.eligibleCards);
			}
			// if (viewPropertiesMap.travelStatus) {
			//     this.showCards();
			//     this.showCardsStatus(viewPropertiesMap.travelStatus, true);
			//     this.view.myCards.flxAccountName.setVisibility(false);
			//     applicationManager.executeAuthorizationFramework(this, "applyForNewCards");
			// }
			if (viewPropertiesMap.securityQuestions) {
				this.showSecurityQuestionsScreen(viewPropertiesMap.securityQuestions, viewPropertiesMap.card, viewPropertiesMap.action);
			}
			if (viewPropertiesMap.incorrectSecurityAnswers) {
				this.showIncorrectSecurityAnswersFlex();
			}
			if (viewPropertiesMap.notificationDeleted) {
				this.deleteNotificationSuccess();
			}
			if (viewPropertiesMap.isPrintCancelled) {
				this.showAcknowledgementOnPrintCancel();
			}
			if (viewPropertiesMap.campaign) {
				this.campaigns = viewPropertiesMap.campaign;
			}
			if (viewPropertiesMap.setAccountsForCards) {
				if (this.requestCardFlow == "virtualPrepaidCard") {
					this.navigateToRequestVDCardFlow(viewPropertiesMap.setAccountsForCards);
				} else if (this.requestCardFlow == "topUpPrepaidCard" || this.requestCardFlow == "topUpVirtualCard") {
					this.setTopUpFromAccounts(viewPropertiesMap.setAccountsForCards);
				} else {
					this.showAccountsForNewCard(viewPropertiesMap.setAccountsForCards);
				}
			}
			if (viewPropertiesMap.setCardProductDetails) {
				this.showCardProductDetails(viewPropertiesMap.setCardProductDetails, viewPropertiesMap.accountData);
			}
			if (viewPropertiesMap.setCardCVV) {
				this.setCVV(viewPropertiesMap.setCardCVV, viewPropertiesMap.cardData);
			}
			if (viewPropertiesMap.setDataToAcknowledgement) {
				this.showAcknowledgementScreenForApplyCard(viewPropertiesMap.setDataToAcknowledgement);
			}
			if (viewPropertiesMap.cardLimitAcknowledgement) {
				this.showNewCardLimitAcknowledgement(viewPropertiesMap);
			}
			if (viewPropertiesMap.setTransactionDetails) {
				this.showTransactionDetails(viewPropertiesMap.setTransactionDetails);
				this.view.PaginationContainer.setVisibility(true);
			}
			if (viewPropertiesMap.getTransactionError) {
				CommonUtilities.hideProgressBar(this.view);
				this.showServerError(viewPropertiesMap.getTransactionError);
				this.view.segTransactionDetails.setData([]);
				this.view.segTransactionDetailsBilled.setData([]);
				this.view.flxNoTransaction.setVisibility(true);
				this.view.segTransactionDetails.setVisibility(false);
				this.view.PaginationContainer.setVisibility(false);
			}
			if (viewPropertiesMap.transactionDownloadFile) {
				this.downLoadTransactionFile(viewPropertiesMap.transactionDownloadFile)
			}
			if (viewPropertiesMap.setEmiTransactionDetails) {
				this.showEmiTransactionDetails(viewPropertiesMap.setEmiTransactionDetails);
				this.view.PaginationContainer1.setVisibility(true);
			}
			if (viewPropertiesMap.getEMIRequestError) {
				CommonUtilities.hideProgressBar(this.view);
				this.showServerError(viewPropertiesMap.getEMIRequestError);
			}
			if (viewPropertiesMap.getEMITransactionError) {
				CommonUtilities.hideProgressBar(this.view);
				this.showServerError(viewPropertiesMap.getEMITransactionError);
				this.view.flxNoEMITransaction.setVisibility(true);
				this.view.segEMITransactionDetails.setVisibility(false);
				this.view.PaginationContainer1.setVisibility(false);
			}
			if (viewPropertiesMap.topUpCardAckData) {
				this.showTopUpCardAcknowledgement(viewPropertiesMap.topUpCardAckData, viewPropertiesMap.topUpCardRes);
			}
			if (viewPropertiesMap.convertEMIAcknowledgement) {
				this.showEMIAcknowledgementScreen(viewPropertiesMap.actionAcknowledgement);
			}
			if (viewPropertiesMap.transferSuccess) {
				// this.topUpServiceCall();
				this.formTopUpData(viewPropertiesMap.transferSuccess);
			}
			if (viewPropertiesMap.transferFinalSuccess) {
                this.topUpServiceCall(viewPropertiesMap.transferFinalSuccess);
            }
			if (viewPropertiesMap.cardPaymentSuccess) {
                this.showCardPaymentConfirmScreen(viewPropertiesMap.cardPaymentSuccess);
            }
            if (viewPropertiesMap.cardFinalPaymentSuccess) {
                this.showCardPaymentAck(viewPropertiesMap.cardFinalPaymentSuccess);
            }
			if (viewPropertiesMap.branchListSuccess) {
                this.setBranchDropdownValue(viewPropertiesMap.branchListSuccess.hblBranchList);
            }			
			if (viewPropertiesMap.PinNotSet) {
                // this.showServerError(kony.i18n.getLocalizedString("i18n.TPSetup"));
                // FormControllerUtility.hideProgressBar(this.view);
				// applicationManager.getNavigationManager().navigateTo({
				// 	"appName": "ManageProfileMA",
				// 	"friendlyName": "SettingsNewUIModule/frmTransactionPin"
				// });
				this.showTransactionPinPopUp();
            }
			if (viewPropertiesMap.CardPaymentError) {
				CommonUtilities.hideProgressBar(this.view);
				this.view.flxBillPayErrorMessage.setVisibility(true);
				this.view.flxCardBillPaymentConfirm.setVisibility(true);
				this.view.flxCardBillPayment.setVisibility(false);
				this.view.flxViewStatements.setVisibility(false);
				this.view.flxViewTransactions.setVisibility(false);
				this.view.flxMyCardsView.setVisibility(false);
				this.view.flxTopUpPrepaidCard.setVisibility(false);
				this.view.flxConvertToEMI.setVisibility(false);
				this.view.flxConvertToEMIConfirm.setVisibility(false);
				this.view.flxConvertEMIConfirm.setVisibility(false);
				this.view.flxAcknowledgment.setVisibility(false);
                this.view.lblCardBillPayKey1.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
                this.view.lblCardBillPayKey2.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
                this.view.lblCardBillPayKey3.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentType") + ":";
                this.view.lblCardBillPayKey4.text = kony.i18n.getLocalizedString("kony.mb.common.TransactionDateColon");
                this.view.lblCardBillPayKey5.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.TransactionAmount");
                this.view.lblCardBillPayKey6.text = kony.i18n.getLocalizedString("i18n.payments.transactionDescriptionWithColon");
                this.view.lblCardBillPayValue1.left = "0px";
                this.view.lblCardBillPayValue2.left = "0px";
                this.view.lblCardBillPayValue3.left = "0px";
                this.view.lblCardBillPayValue4.left = "0px";
                this.view.lblCardBillPayValue5.left = "0px";
                this.view.lblCardBillPayValue6.left = "0px";
			}
			kony.application.dismissLoadingScreen();
		},
		/**
		 * setBranchDrowdown - Method that set the branch dropdown value.
		 * @param {Object} - card object.
		 */
		setBranchDropdownValue : function(branchName){
			var scope = this;
            var segData = [];
			scope.view.segBranchDropDown.widgetDataMap = {
                "flxAccountTypes": "flxAccountTypes",
                "lblUsers": "lblUsers",
                "lblSeparator": "lblSeparator",
                "emailTo":"emailTo",
                "branchCode":"branchCode",
                "branchccemail":"branchccemail"
            };
            for (var i = 0; i < branchName.length; i++) {
                    var data = {
						"emailTo":branchName[i].emailto,
						"branchCode":branchName[i].mnemonic,
						"branchccemail": branchName[i].emailcc,
                        "lblUsers": branchName[i].branchname,
						"flxAccountTypes": {
							"height" : "25%"
						} 
                    }
                    segData.push(data);
                }
			scope.branchList = segData;
            scope.view.segBranchDropDown.setData(segData);
        },
		/**
		 * showErrorCVV - Method that shows incorrect cvv code screen.
		 * @param {Object} - card object.
		 */
		showErrorCVV: function(card) {
			CommonUtilities.hideProgressBar(this.view);
			this.view.tbxCVVNumber.text = "";
			card.oldCVV = "";
			card.cvv = "";
			this.view.tbxCVVNumber.secureTextEntry = true;
			this.view.imgViewCVV.src = "eye_hide.png";
			FormControllerUtility.disableButton(this.view.btnContinue2);
			this.setCVVScreen(card);
			this.view.flxCardCVV.setVisibility(true);
			this.view.flxIncorrectCVV.setVisibility(true);
			if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
				this.view.flxMyCardsView.setVisibility(false);
			}
			this.view.forceLayout();
			this.setCVVpopUpUI();
			this.AdjustScreen();
		},
		lxAmountOnClick: function() {
			var self = this;
			try {
				var image = "sorting.png";
				this.criteria["sortBy"] = "billingAmount";
				this.criteria["order"] = "desc";
				this.state = "sortedData";
				if (this.view.imgAmountSort.src === "sorting_next.png" || this.view.imgAmountSort.src === "sorting.png") {
					image = "sorting_previous.png",
						this.criteria["order"] = "asc";
					this.view.flxAmountSort.accessibilityConfig = {
						"a11yARIA": {
							"role": "button"
						},
						"a11yLabel": "Amount column. Sorted in ascending order. Click to Sort in Descending order."
					}
				} else if (this.view.imgAmountSort.src === "sorting_previous.png") {
					image = "sorting_next.png",
						this.criteria["order"] = "desc";
					this.view.flxAmountSort.accessibilityConfig = {
						"a11yARIA": {
							"role": "button"
						},
						"a11yLabel": "Amount column. Sorted in descending order. Click to Sort in Ascending order."
					}
				}
				this.resetSortingImages();
				this.view.imgAmountSort.src = image;
				this.getCacheData();
				this.offset = 0;
				if (this.offset === 0)
					this.sortTransactionDetails(this.cacheUtils._sortedData);
				else {
					var values = {
						'show': true,
						'offset': this.offset
					};
					this.onFirst(values, this.cacheUtils._sortedData);
				}
			} catch (err) {
				var errorObj = {
					"errorInfo": "Error in setting the criteria and invoking column 1 related service call",
					"errorLevel": "Business",
					"error": err
				};
				self.onError(errorObj);
			}
		},

		flxAmountOnClick: function() {
			var self = this;
			try {
				var image = "sorting.png";
				this.criteria["sortBy"] = "billingAmount";
				this.criteria["order"] = "desc";
				this.state = "sortedData";
				if (this.view.imgAmountSort.src === "sorting_next.png" || this.view.imgAmountSort.src === "sorting.png") {
					image = "sorting_previous.png",
						this.criteria["order"] = "asc";
					this.view.flxAmountSort.accessibilityConfig = {
						"a11yARIA": {
							"role": "button"
						},
						"a11yLabel": "Amount column. Sorted in ascending order. Click to Sort in Descending order."
					}
				} else if (this.view.imgAmountSort.src === "sorting_previous.png") {
					image = "sorting_next.png",
						this.criteria["order"] = "desc";
					this.view.flxAmountSort.accessibilityConfig = {
						"a11yARIA": {
							"role": "button"
						},
						"a11yLabel": "Amount column. Sorted in descending order. Click to Sort in Ascending order."
					}
				}
				this.resetSortingImages();
				this.view.imgAmountSort.src = image;
				this.getCacheData();
				this.offset = 0;
				if (this.offset === 0)
					this.sortTransactionDetails(this.cacheUtils._sortedData);
				else {
					var values = {
						'show': true,
						'offset': this.offset
					};
					this.onFirst(values, this.cacheUtils._sortedData);
				}
			} catch (err) {
				var errorObj = {
					"errorInfo": "Error in setting the criteria and invoking column 1 related service call",
					"errorLevel": "Business",
					"error": err
				};
				self.onError(errorObj);
			}
		},
		flxDateonClick: function() {
			var self = this;
			try {
				var image = "sorting.png";
				this.criteria["sortBy"] = "transactionDate";
				this.criteria["order"] = "desc";
				this.state = "sortedData";
				if (this.view.imgDateSort.src === "sorting_next.png" || this.view.imgDateSort.src === "sorting.png") {
					image = "sorting_previous.png",
						this.criteria["order"] = "asc";
					this.view.flxImage.accessibilityConfig = {
						"a11yARIA": {
							"role": "button"
						},
						"a11yLabel": "Date column. Sorted in ascending order. Click to Sort in Descending order."
					}
				} else if (this.view.imgDateSort.src === "sorting_previous.png") {
					image = "sorting_next.png",
						this.criteria["order"] = "desc";
					this.view.flxImage.accessibilityConfig = {
						"a11yARIA": {
							"role": "button"
						},
						"a11yLabel": "Date column. Sorted in descending order. Click to Sort in Ascending order."
					}
				}
				this.resetSortingImages();
				this.view.imgDateSort.src = image;
				this.getCacheData();
				this.offset = 0;
				if (this.offset === 0)
					this.sortTransactionDetails(this.cacheUtils._sortedData);
				else {
					var values = {
						'show': true,
						'offset': this.offset
					};
					this.onFirst(values, this.cacheUtils._sortedData);
				}
			} catch (err) {
				var errorObj = {
					"errorInfo": "Error in setting the criteria and invoking column 1 related service call",
					"errorLevel": "Business",
					"error": err
				};
				self.onError(errorObj);
			}
		},
		getCacheData: function() {
			var self = this;
			try {
				//var filterValues = this.getFilterValue();
				if (this.state === "pagination") {
					this.cacheUtils.applyPagination(offset, this.noOfRecords);
					this.tab6CacheUtils.pageSize = this.noOfRecords;
				} else if (this.state === "filterData") {
					this.onResetPagination();
					this.cacheUtils.applyFilter("transactionType", filterValues);
				} else if (this.state === "sortedData") {
					//   this.onResetPagination();
					this.cacheUtils.applySorting(this.criteria["sortBy"], this.criteria["order"]);
				}
			} catch (err) {
				var errorObj = {
					"errorInfo": "Error in the get cache data method.",
					"errorLevel": "Business",
					"error": err
				};
				self.onError(errorObj);
			}
		},
		resetSortingImages: function() {
			var self = this;
			try {
				this.view.imgDateSort.src = "sorting.png";
				this.view.imgAmountSort.src = "sorting.png";
			} catch (err) {
				var errorObj = {
					"errorInfo": "Error in setting the sorting images",
					"errorLevel": "Configuration",
					"error": err
				};
				self.onError(errorObj);
			}
		},
		DownloadPdf: function() {
			var selectedData = this.view.segCardMonthStatement.selectedRowItems[0];
			var dateVal = selectedData["value"];
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("statement_monthYear", dateVal.replace(" ",""));
			// to convert date to the format
			var date = new Date(dateVal);
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			var formattedMonth = month < 10 ? `0${month}` : month;
			var statementDate = `${formattedMonth}/${year}`;
			var cardNumber = navManager.getCustomInfo("statement_cardNumber");
			var cardHolder = navManager.getCustomInfo("statement_chName");
			var userId = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
			// var param ={
			//     'cardNumber':cardNumber,
			//     'statementDate':statementDate 
			// }
			var param = {
				'accountNumber': cardNumber,
				'accountName': cardHolder,
				'searchTransactionType': "Cards",
				'searchStartDate': statementDate,
				'searchEndDate': '',
				'dateFormat': 'm/d/Y',
				'fileType': 'pdf',
				'title': 'Transactions',
				'generatedBy': userId
			}
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.downloadCardStatement(param);

		},
		onYearSelection: function() {
			var selectedData = this.view.segCardYearDropdownValues.selectedRowItems[0];
			this.view.lblCardYearDropdownValue.text = selectedData["value"];
			var year = selectedData["value"].split(" ");
			this.view.lblStatements.text = year[0] + " Statements";
			var navManager = applicationManager.getNavigationManager();
			var currentYear = navManager.getCustomInfo("statement_currentyear");
			var month = navManager.getCustomInfo("statement_month");
			this.setMonthDropdownValue(this, currentYear, month);
			this.hideYearDropdown();
		},
		hideYearDropdown: function() {
			this.view.flxCardYearSegment.isVisible = false;
			this.view.lblCardYearDropdownIcon.text = "O";
		},
		downloadStatement: function(card) {
			this.view.flxViewStatements.setVisibility(true);
			//this.view.flxMain.scrollToBeginning(true);
			this.view.flxViewTransactions.setVisibility(false);
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(false);
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
			var now = new Date();
			var currentFullYear = now.getFullYear();
			this.view.lblCardNumberValue.text = card.maskedCardNumber;
			this.view.lblCardYearDropdownValue.text = currentFullYear + " Statements";
			this.view.lblStatements.text = currentFullYear + " Statements";
			var dateParts = card.issuedDate.split('-');
			var day = dateParts[0]; // 16
			var month = dateParts[1]; // FEB
			var shortYear = dateParts[2]; // 21
			var currentYear = 2000 + parseInt(shortYear);
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("statement_currentyear", currentYear);
			navManager.setCustomInfo("statement_month", month);
			navManager.setCustomInfo("statement_cardNumber", card.cardNumber);
			navManager.setCustomInfo("statement_chName", card.chName);
			this.setYearDropdownValue(card, currentYear);
			this.setMonthDropdownValue(card, currentYear, month);
			this.AdjustScreen();
			this.view.lblViewStatements.setFocus(true);
		},
		setYearDropdownValue: function(card, currentYear) {
			var now = new Date();
			var currentFullYear = now.getFullYear();
			var i = 0;
			var param = [];
			for (var year = currentYear; year <= currentFullYear; year++) {
				param.push({
					"key": i,
					"value": year + ' Statements'
				});
				i++;
			}
			// var StatementYear = '[{"key":"1","value":"2024 Statements"},{"key":"2","value":"2023 Statements"},{"key":"3","value":"2022 Statements"}]';
			var year = JSON.stringify(param, null, i);
			var Statement = JSON.parse(year);
			this.view.segCardYearDropdownValues.widgetDataMap = {
				"lblUsers": "value"
			};
			this.view.segCardYearDropdownValues.setData(Statement);

		},
		setMonthDropdownValue(card, startYear, monthStr) {

			var months = [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			// To get monthValue
			var getMonthNumber = month => ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].indexOf(monthStr.toUpperCase()) + 1;
			var startMonthIndex = months.indexOf(monthStr);

			//to check the selected year
			var selectedYear = this.view.lblCardYearDropdownValue.text.split(" ");

			// Get the current date
			var currentDate = new Date();
			var currentYear = currentDate.getFullYear();
			var currentMonth = currentDate.getMonth();

			// Create an array to store months in the required format
			var monthsArray = [];
			var key = 1;

			// If the start month is before February, start from February
			var year = selectedYear[0];
			var month = startMonthIndex;
			if (selectedYear[0] == startYear) {
				month = getMonthNumber(monthStr) - 1; //2
				currentMonth = month - 1;
				while (month >= currentMonth) {
					monthsArray.push({
						key: key.toString(), // Key will be incremented (e.g., '1', '2', '3', ...)
						value: `${months[month]} ${year}` // Month name and year (e.g., "February 2021")
					});

					// Move to the next month
					month++;
					if (month === 12) {
						month = 0; // Reset to January if we go past December
						// year++;     // Move to the next year
						break;
					}

					key++; // Increment key for each month
				}
			} else if (selectedYear[0] == currentYear) {
				month = 0;
				while (month <= currentMonth) {
					monthsArray.push({
						key: key.toString(), // Key will be incremented (e.g., '1', '2', '3', ...)
						value: `${months[month]} ${year}` // Month name and year (e.g., "February 2021")
					});

					// Move to the next month
					month++;
					if (month === 12) {
						month = 0; // Reset to January if we go past December
						// year++;     // Move to the next year
						break;
					}

					key++; // Increment key for each month
				}
			} else {
				month = 0;
				currentMonth = 12;
				while (month <= currentMonth) {
					monthsArray.push({
						key: key.toString(), // Key will be incremented (e.g., '1', '2', '3', ...)
						value: `${months[month]} ${year}` // Month name and year (e.g., "February 2021")
					});

					// Move to the next month
					month++;
					if (month === 12) {
						month = 0; // Reset to January if we go past December
						// year++;     // Move to the next year
						break;
					}

					key++; // Increment key for each month
				}
			}


			// Convert the array to a JSON string
			var monthValue = JSON.stringify(monthsArray, null, key);
			var monthDrop = JSON.parse(monthValue);
			this.view.segCardMonthStatement.widgetDataMap = {
				"lblValue": "value"
			};
			if (key >= 7 && key <= 12) {
				this.view.flxMonthStatementDetails.height = "700dp";
				this.view.flxCardMothStatementSegment.height = "700dp";
				this.view.segCardMonthStatement.height = "700dp";
			}
			if (key >= 1 && key <= 6) {
				this.view.flxMonthStatementDetails.height = "350dp";
				this.view.flxCardMothStatementSegment.height = "350dp";
				this.view.segCardMonthStatement.height = "350dp";
			}
			this.view.segCardMonthStatement.setData(monthDrop);
		},
		getTransactions: function(card) {
			this.view.flxViewTransactionBody.skin = "sknFlxWhiteRoundedBorder";
			this.view.flxPaginationContainer.top = "0px";
            this.view.lblTransactionSeparator.setVisibility(false);
			this.view.flxViewTransactions.setVisibility(true);
			this.view.flxViewStatements.setVisibility(false);
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(false);
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
			var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
			var today = new Date(bankDate.currentWorkingDate);
			var toDate = String(today.getDate()).padStart(2, '0');
			var toMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
			var toYear = today.getFullYear();
			var toDayDate = `${toDate}/${toMonth}/${toYear}`;
			var resultDate;

			if (card.cardType == 'Credit') {
				if (today.getDate() > 2) {
					// If the date is after the 2nd of the current month, consider the previous month
					today.setMonth(today.getMonth() - 1); // Move to the previous month
					resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
				} else if (today.getDate() === 1) {
					// If the date is the 1st of the current month, consider two months back
					today.setMonth(today.getMonth() - 2); // Move to two months back
					resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
				}
			} else {
				today.setDate(today.getDate() - 31); // Subtract 30 days exclude today
				var thirtyday = String(today.getDate()).padStart(2, '0');
				var fromMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
				var fromYear = today.getFullYear();
				resultDate = `${thirtyday}/${fromMonth}/${fromYear}`;
			}

			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("transaction_cardNumber", card.cardNumber);
			navManager.setCustomInfo("transaction_cardType",card.cardType);
			var param = {
				'cardNumber': card.cardNumber,
				'cardRefNbr': 'N',
				'dateFrom': resultDate,
				'dateTo': toDayDate
			}
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getTransactionsDetail(param);
		},
		getEmiTransaction: function(card) {
			var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
			var today = new Date(bankDate.currentWorkingDate);
			var toDate = String(today.getDate()).padStart(2, '0');
			var toMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
			var toYear = today.getFullYear();
			var toDayDate = `${toDate}/${toMonth}/${toYear}`;
			var resultDate;
			if (today.getDate() > 2) {
				// If the date is after the 2nd of the current month, consider the previous month
				today.setMonth(today.getMonth() - 1); // Move to the previous month
				resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
			} else if (today.getDate() === 1) {
				// If the date is the 1st of the current month, consider two months back
				date.setMonth(today.getMonth() - 2); // Move to two months back
				resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
			}
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("transaction_cardNumber", card.cardNumber); //4101020000014231,
			var param = {
				'cardNumber': card.cardNumber, //4101020000014231
				'cardRefNbr': 'N',
				'dateFrom': resultDate, //"20/04/2020"
				'dateTo': toDayDate
			}
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getEmiTransactionsDetail(param);
			this.view.btnEMIContinue.onClick = this.EmiConversionConfirm.bind(this,card);
		},
		EmiConversionConfirm:function(card){
            var scopeObj =this;
            var selectedData = scopeObj.view.segEMITransactionDetails.selectedRowItems[0];
                var navManager = applicationManager.getNavigationManager();
				var param ={};
                for (var i = 0; i < scopeObj.cacheUtils.data.length; i++) {
                    if (selectedData.lbl3 == scopeObj.cacheUtils.data[i].referenceNumber) {
                        navManager.setCustomInfo("EMI_authcode", scopeObj.cacheUtils.data[i].authCode);
						param ={
							"authCode": scopeObj.cacheUtils.data[i].authCode,
							"referenceNumber": scopeObj.cacheUtils.data[i].referenceNumber,
							"billingAmount": scopeObj.cacheUtils.data[i].billingAmount,
							"transactionCurrency": scopeObj.cacheUtils.data[i].transactionCurrency,
							"transactionDate": scopeObj.cacheUtils.data[i].transactionDate,
							"pan": scopeObj.cacheUtils.data[i].pan,
							"bankActNum": scopeObj.cacheUtils.data[i].bankActNum
						}
                        scopeObj.view.flxConvertToEMI.setVisibility(false);
                        scopeObj.view.flxConvertToEMIConfirm.setVisibility(false);
                        scopeObj.view.flxConvertEMIConfirm.setVisibility(true);
						scopeObj.view.flxDetailsEMI.width ="95%";
                        
                        // scopeObj.view.lblEMIDescriptionValue.text = scopeObj.cacheUtils.data[i].merchantCategoryCode;
                        navManager.setCustomInfo("EMI_Description", scopeObj.cacheUtils.data[i].merchantCategoryCode);
                        // scopeObj.view.lblEMIAmountValue.text = selectedData.lbl4;
                        navManager.setCustomInfo("EMI_TotalAmount", selectedData.lbl4);
						navManager.setCustomInfo("EMI_ReferenceID",scopeObj.cacheUtils.data[i].referenceNumber);
						navManager.setCustomInfo("EMI_TransactionDate",scopeObj.cacheUtils.data[i].transactionDate);
						navManager.setCustomInfo("EMI_CardNumber",card.pan);
						scopeObj.view.lblRememberMeIcon.text ="D";
						scopeObj.view.lblKeyEMI3.text = kony.i18n.getLocalizedString("i18n.TradeFinance.transactionReferenceNumber")+ ":"; 
                        // scopeObj.view.lblEMIRoiValue.text = scope_configManager.getEmiInterestDate();
                        // scopeObj.view.lblEMITenureValue.text = scope_configManager.getEmiTenureMonth();
                        // var rate = scope_configManager.getEmiInterestDate().split("%");
                        // var time = scope_configManager.getEmiTenureMonth().match(/\d+/);
                        // var principal = selectedData.lbl4.split(" ");
                        // var monthlyRate = (rate[0] / 12) / 100;
                        // scopeObj.view.lblEMIAmountValues.text = principal[0] + " " + ((principal[1] * monthlyRate * Math.pow(1 + monthlyRate, time[0])) / (Math.pow(1 + monthlyRate, time[0]) - 1)).toFixed(2);
                        // navManager.setCustomInfo("EMI_Amount", scopeObj.view.lblEMIAmountValues.text);
						function maskExceptLast4(acctNum) {
                        if (!acctNum || acctNum.length < 4) return acctNum;
                        var masked = acctNum.slice(0, -4).replace(/\d/g, "X");
                        return masked + acctNum.slice(-4);
                        }
                        scopeObj.view.lblValueEMI1.text =maskExceptLast4(card.pan);
                        scopeObj.view.lblValueEMI2.text = scopeObj.cacheUtils.data[i].merchantCategoryCode;
                        scopeObj.view.lblValueEMI3.text = scopeObj.cacheUtils.data[i].referenceNumber;
                        scopeObj.view.lblValueEMI4.text =scopeObj.cacheUtils.data[i].transactionDate;
                        scopeObj.view.lblValueEMI5.text =selectedData.lbl4;
                        scopeObj.view.imgEyeIcon.src = "eye_show.png";
						FormControllerUtility.disableButton(scopeObj.view.btnConfirmEMI);
                        scopeObj.view.flxEyeIcon.onClick = function(){
                            if(scopeObj.view.imgEyeIcon.src == "eye_show.png"){
                                scopeObj.view.lblValueEMI1.text = card.pan;
                                scopeObj.view.imgEyeIcon.src ="eye_hide.png";
                            }else{
                                scopeObj.view.lblValueEMI1.text = maskExceptLast4(card.pan); 
                                scopeObj.view.imgEyeIcon.src ="eye_show.png";
                                
                            }
                        }.bind();
                        this.view.flxCheckbox.onClick = function() {
                            CommonUtilities.toggleFontCheckbox(scopeObj.view.lblRememberMeIcon);
                            if (CommonUtilities.isFontIconChecked(scopeObj.view.lblRememberMeIcon)) {
                                FormControllerUtility.enableButton(scopeObj.view.btnConfirmEMI);
                            }
                            else{
                                FormControllerUtility.disableButton(scopeObj.view.btnConfirmEMI);
                            }
                        }
                        scopeObj.showEMIConfirmationScreen(param);
                    }
                }
        },
		/**
		 * AdjustScreen - Method that sets the height of footer properly.
		 */
		AdjustScreen: function() {

			this.view.forceLayout();
			var mainheight = 0;
			var screenheight = kony.os.deviceInfo().screenHeight;
			mainheight = this.view.customheader.info.frame.height + this.view.flxFormContent.info.frame.height;
			var diff = screenheight - mainheight;
			if (mainheight < screenheight) {
				diff = diff - this.view.flxFooter.info.frame.height;
				if (diff > 0) {
					this.view.flxFooter.top = 50 + "dp";//mainheight + diff - 60 + "dp";
				} else {
					this.view.flxFooter.top = 1500+ "dp";//mainheight - 60 + "dp";
				}
			} else {
				this.view.flxFooter.top = 50 + "dp";//mainheight - 60 + "dp";// 
			}
			// if(this.view.flxNewcard.isVisible == true){
            //     this.view.flxFooter.top = mainheight + 100 +"dp";
            // }
			if(this.view.flxTopUpConfirm.isVisible == true){
                this.view.flxFooter.top = mainheight + 100 + "dp";
            }
			this.view.forceLayout();
		},
		seggregateCards: function(cards) {
			for(key in cards) {
				if (cards[key].cardType == "Debit") {
					this.debitCardList[cards[key].Card_Type].push(cards[key].accountNumber);
				}
				
				else if (cards[key].cardType == "Prepaid") {
					this.prepaidCardList[cards[key].Card_Type].push(cards[key].accountNumber);
				}
			}
		},
		/**
		 * Method that hides all other flexes except the Cards segment.
		 * @param {Array} - Array of JSON objects of cards.
		 */
		showCards: function(cards) {
			var self = this;
			this.hideAllCardManagementViews();
			this.view.flxTermsAndConditions.setVisibility(false);
			this.showContactUsNavigation();
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			// this.view.lblManageTravelPlans.text = kony.i18n.getLocalizedString('i18n.CardManagement.ManageTravelPlans');
			//  this.view.flxMangeTravelPlans.onClick = self.fetchTravelNotifications;
			this.view.title = kony.i18n.getLocalizedString("i18n.CardManagement.MyCards");
			this.view.forceLayout();
			//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchCardsStatus(cards);
		},
		/**
		 *  Method that hides all flexes in frmCardManagement.
		 */
		hideAllCardManagementViews: function() {
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxActivateCard.setVisibility(false);
			this.view.flxCardVerification.setVisibility(false);
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.breadcrumb.setVisibility(false);
			//  this.view.flxTravelPlan.setVisibility(false);
			this.view.flxConfirm.setVisibility(false);
			this.view.myCards.flxNoError.setVisibility(false);
			this.view.myCards.segDebitCards.setVisibility(false);
			this.view.flxEligibleCardsButtons.setVisibility(false);
			this.view.flxCardDetailsMobile.setVisibility(false);
			this.view.flxSetCardLimits.setVisibility(false);
			this.view.flxCardLimits.setVisibility(false);
			this.view.flxSetCardLimitsOverview.setVisibility(false);
			this.view.flxSetCardLimitsNew.setVisibility(false);
			this.view.flxCVVPopup.setVisibility(false);
			this.view.flxCardCVV.setVisibility(false);
			this.view.flxNewcard.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
		},
		/**
		 *  Method to navigate to contactus.
		 */
		showContactUsNavigation: function() {
			//this.view.flxRequestANewCard.setVisibility(false);
			// this.view.myCards.flxRequestANewCard.setVisibility(false);
			this.view.flxCardAccounts.top = "0dp";
			this.view.flxApplyForNewCard.setVisibility(false);
			this.view.lblActivateNewCard.onTouchEnd = function() {
				var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
				informationContentModule.presentationController.showContactUsPage();
			};
		},
		/**
		 * Method to call function of presenter to fetch travel notifications
		 */
		fetchTravelNotifications: function() {
			FormControllerUtility.showProgressBar(this.view);
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchTravelNotifications();
		},
		/**
		 * This function shows the masked Secure Access Code on click of the eye icon
		 *�@param�{Object} - The textbox widget of the Secure Access Code.
		 */
		toggleSecureAccessCodeMasking: function(widgetId) {
			widgetId.secureTextEntry = !(widgetId.secureTextEntry);
		},
		/**
		 *Shows the screen where user can enter secure access code and verify.
		 * @param {Object} - card object
		 * @param {String} action - contains the action to be performed.
		 */
		showSecureAccessCodeScreen: function(params, action) {
			var self = this;
			if (action === kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LockCardSecureAccessCode"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin") || action === "Offline_Change_Pin") {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinSecureAccessCode"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCardSecureAccessCode"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolenCardSecureAccessCode"));
			} else if (action === kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ReplaceCardSecureAccessCode"));
			} else if (action === kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelVerification"));
			}
			this.hideServerError();
			FormControllerUtility.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			this.view.CardLockVerificationStep.lblWarningSecureAccessCode.setVisibility(false);
			this.view.CardLockVerificationStep.flxVerifyByOptions.setVisibility(false);
			this.view.CardLockVerificationStep.flxVerifyBySecureAccessCode.setVisibility(true);
			this.view.CardLockVerificationStep.tbxCVV.text = "";
			this.view.CardLockVerificationStep.tbxCVV.secureTextEntry = false;
			this.view.CardLockVerificationStep.imgViewCVV.setVisibility(false);
			this.view.forceLayout();
			this.view.CardLockVerificationStep.imgViewCVV.onTouchStart = this.toggleSecureAccessCodeMasking.bind(this, this.view.CardLockVerificationStep.tbxCVV);
			this.view.CardLockVerificationStep.tbxCVV.onKeyUp = function() {
				if (!self.isValidSecureAccessCode(self.view.CardLockVerificationStep.tbxCVV.text) || CommonUtilities.isCSRMode()) {
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
				} else {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
				}
			};
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify")
				},
				'btnModify': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.login.ResendOtp")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			var resendOtpTimer;
			this.view.CardLockVerificationStep.btnCancel.onClick = function() {
				clearTimeout(resendOtpTimer);
				self.view.forceLayout();
				self.view.CardLockVerificationStep.lblWarningSecureAccessCode.setVisibility(false);
				self.showMFAScreen(params, action);
			};
			FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnModify);
			resendOtpTimer = setTimeout(
				function() {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnModify);
				}, 5000);
			this.view.CardLockVerificationStep.btnModify.onClick = function() {
				FormControllerUtility.showProgressBar(self.view);
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.sendSecureAccessCode(params, action);
				self.view.CardLockVerificationStep.lblWarningSecureAccessCode.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				self.view.CardLockVerificationStep.lblWarningSecureAccessCode.text = kony.i18n.getLocalizedString("i18n.MFA.ResentOTPMessage");
				FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnModify);
				resendOtpTimer = setTimeout(
					function() {
						FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnModify);
					}, 5000);
				self.view.forceLayout();
			};
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = FormControllerUtility.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = FormControllerUtility.disableButtonSkinForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.focusSkin = FormControllerUtility.disableButtonSkinForCSRMode();
			} else {
				this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
					clearTimeout(resendOtpTimer);
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnModify);
					var enteredAccessCode = self.view.CardLockVerificationStep.tbxCVV.text;
					params.enteredAccessCode = enteredAccessCode;
					FormControllerUtility.showProgressBar(self.view);
					self.view.CardLockVerificationStep.lblWarningSecureAccessCode.setVisibility(false);
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.verifySecureAccessCode(params, action);
					self.view.forceLayout();
				};
			}
			self.view.forceLayout();
		},


		showTermsAndConditionsSuccessScreenLockCard: function(TnCcontent) {
			//CommonUtilities.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			// this.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
			this.view.CardLockVerificationStep.CardActivation.flxIAgree.setVisibility(true);
			if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
				this.view.CardLockVerificationStep.CardActivation.btnTermsAndConditions.onClick = function() {
					window.open(TnCcontent.termsAndConditionsContent);
				}
			} else {
				this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
			}
			this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
		},

		showTermsAndConditionsSuccessScreenUnlockCard: function(TnCcontent) {
			this.view.CardActivation.flxIAgree.setVisibility(true);
			if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
				this.view.CardActivation.btnTermsAndConditions.onClick = function() {
					window.open(TnCcontent.termsAndConditionsContent);
				}
			} else {
				this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
			}
			this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
		},

		showTermsAndConditionsSuccessScreenCancelCard: function(TnCcontent) {
			// CommonUtilities.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			// this.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
			this.view.CardLockVerificationStep.WarningMessage.flxIAgree.setVisibility(true);
			if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
				this.view.CardLockVerificationStep.WarningMessage.btnTermsAndConditions.onClick = function() {
					window.open(TnCcontent.termsAndConditionsContent);
				}
			} else {
				this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
			}
			this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
		},
		showTermsAndConditionPopUp: function() {
			var height = this.view.flxHeader.info.frame.height + this.view.flxContainer.info.frame.height + this.view.flxFooter.info.frame.height;
			this.view.flxTermsAndConditionsPopUp.height = height + "dp";
			this.view.flxTermsAndConditionsPopUp.setVisibility(true);
		},
		hideTermsAndConditionPopUp: function() {
			var self = this;
			this.view.flxTermsAndConditionsPopUp.setVisibility(false);
			if (self.currentTermsAndConditionsWidget.toLowerCase() === "lockcard") {
				self.view.CardLockVerificationStep.CardActivation.btnTermsAndConditions.setActive(true);
			} else if (self.currentTermsAndConditionsWidget.toLowerCase() === "unlockcard") {
				self.view.CardActivation.btnTermsAndConditions.setActive(true);
			}
			FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, "");
		},

		setTnCDATASection: function(content) {
			this.view.rtxTC.text = content;
			this.view.flxTCContents.isVisible = false;
			FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, content);
		},
		toggleTnC: function(widget, buttonWidget) {
			CommonUtilities.toggleFontCheckbox(widget);
			if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED)
				CommonUtilities.disableButton(buttonWidget);
			else
				CommonUtilities.enableButton(buttonWidget);
		},
		/**
		 * This function enables the incorrect OTP flex.
		 */
		showIncorrectSecureAccessCodeFlex: function() {
			CommonUtilities.hideProgressBar(this.view);
			FormControllerUtility.enableButton(this.view.CardLockVerificationStep.btnModify);
			this.view.CardLockVerificationStep.lblWarningSecureAccessCode.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.lblWarningSecureAccessCode.text = kony.i18n.getLocalizedString("i18n.MFA.EnteredSecureAccessCodeDoesNotMatch")
			this.view.CardLockVerificationStep.tbxCVV.text = "";
			this.view.forceLayout();
		},
		/**
		 *  Method to show error flex.
		 * @param {String} - Error message to be displayed.
		 */
		showServerError: function(errorMsg) {
			this.view.flxDowntimeWarning.setVisibility(true);
			if (errorMsg.errorMessage && errorMsg.errorMessage != "") {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                this.view.rtxDowntimeWarning.text = errorMsg.errorMessage;
            } else if(errorMsg.dbpErrMsg && errorMsg.dbpErrMsg !=""){
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                this.view.rtxDowntimeWarning.text = errorMsg.errorMessage;
			}else {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                this.view.rtxDowntimeWarning.text = errorMsg;
            }
			this.view.CardLockVerificationStep.btnModify.setVisibility(false);
			//if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)
				//this.view.CardLockVerificationStep.btnCancel.right = '26.5%';
			//else
				//this.view.CardLockVerificationStep.btnCancel.right = '16.5%';
			this.view.CardLockVerificationStep.height = "100dp";
			this.view.rtxDowntimeWarning.setActive(true);
			this.AdjustScreen();
		},
		/**
		 * Method to hide error flex.
		 */
		hideServerError: function() {
			this.view.flxDowntimeWarning.setVisibility(false);
		},
		/**
		 * Method that updates Hamburger Menu.
		 * @param {Object} sideMenuModel - contains the side menu view model.
		 */
		updateHamburgerMenu: function() {
			this.view.customheader.customhamburger.activateMenu("ACCOUNTS", "Card Management");
		},
		/**
		 * Method to navigate to travel notifications screen
		 * @param {Object} - travelNotifications object
		 */
		showTravelNotifications: function(travelNotifications) {
			var self = this;
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblManageTravelPlans.text = kony.i18n.getLocalizedString('i18n.CardManagement.AddNewTravelPlan')
			this.view.flxMangeTravelPlans.onClick = self.navigateToAddTravelNotification.bind(this);
			this.setBreadCrumbAndHeaderDataTravelPlan();
			this.hideAllCardManagementViews();
			this.view.flxMyCardsView.setVisibility(true);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxViewStatements.setVisibility(false);
			this.view.flxTravelPlan.setVisibility(false);
			this.view.flxMyCards.setVisibility(true);
			this.view.flxRightBar.setVisibility(true);
			this.setTravelNotificationsData(travelNotifications);
		},
		/**
		 * Method to navigate to creat travel notifications screen
		 */
		navigateToAddTravelNotification: function() {
			var self = this;
			FormControllerUtility.showProgressBar(this.view);
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.AddNewTravelPlan();
		},
		/**
		 * Method to set breadcrumb and header data for Travel plan
		 */
		setBreadCrumbAndHeaderDataTravelPlan: function() {
			var self = this;
			this.view.breadcrumb.setVisibility(false);
			this.view.breadcrumb.setBreadcrumbData([{
				'text': kony.i18n.getLocalizedString("i18n.CardManagement.MyCards"),
				'callback': kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchCardsList.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController)
			}, {
				'text': kony.i18n.getLocalizedString("i18n.CardManagement.ManageTravelPlans"),
				'callback': null
			}]);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.myCards.lblMyCardsHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.ManageTravelPlans");
		},
		/**
		 * Method to set travel notifications data.
		 */
		setTravelNotificationsData: function(travelNotifications) {
			var self = this;
			if (travelNotifications == undefined || travelNotifications.lengh == 0) {
				self.showNoTravelNotificationScreen();
			} else {
				self.view.myCards.segDebitCards.setVisibility(true);
				self.view.myCards.flxSearch.setVisibility(false);
				self.view.title = self.view.myCards.lblMyCardsHeader.text;
				var widgetDataMap = this.travelNotificationDataMap;
				var flxCardSkin = (kony.application.getCurrentBreakpoint() === 640) ? "sknFlxffffffRoundedBorder" : "sknFlxffffffBorderRoundedLeftRed";
				var segData = travelNotifications.map(function(dataItem) {
					var destinations = self.returnDestinationsArray(dataItem.destinations);
					return {
						"flxActions": {
							"isVisible": true
						},
						"lblSeparator1": " ",
						"lblIdentifier": {
							"text": " ",
							"accessibilityconfig": {
								"a11yLabel": " "
							}
						},
						"lblCardHeader": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.requestId"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.requestId")
							}
						},
						"lblCardId": {
							"text": dataItem.notificationId,
							"accessibilityconfig": {
								"a11yLabel": dataItem.notificationId
							}
						},
						"lblCardStatus": {
							"text": dataItem.status,
							"skin": self.statusSkinsLandingScreen[dataItem.status] ? self.statusSkinsLandingScreen[dataItem.status] : self.statusSkinsDetailsScreen[dataItem.status],
							"accessibilityconfig": {
								"a11yLabel": dataItem.status
							}
						},
						"flxCollapse": {
							"isVisible": true,
							"accessibilityConfig": {
								"a11yLabel": "Show more details for request ID " + dataItem.notificationId,
								"a11yARIA": {
									"tabindex": 0,
									"aria-expanded": false,
									"role": "button"
								}
							},
							"onClick": self.changeNotificationRowTemplate.bind(self, dataItem)
						},
						"imgCollapse": {
							"src": ViewConstants.IMAGES.ARRAOW_DOWN,
							"accessibilityconfig": {
								"a11yLabel": "View Transaction Details"
							}
						},
						"lblKey1": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.travelStartDate"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.travelStartDate")
							}
						},
						"rtxValue1": {
							"text": self.returnFrontendDate(dataItem.startDate),
							"accessibilityconfig": {
								"a11yLabel": self.returnFrontendDate(dataItem.startDate)
							}
						},
						"lblKey2": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.travelEndDate"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.travelEndDate")
							}
						},
						"rtxValue2": {
							"text": self.returnFrontendDate(dataItem.endDate),
							"accessibilityconfig": {
								"a11yLabel": self.returnFrontendDate(dataItem.endDate)
							}
						},
						"flxDestination1": {
							"isVisible": destinations[0] ? true : false
						},
						"lblDestination1": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.destination1"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.destination1")
							}
						},
						"rtxDestination1": destinations[0],
						"flxDestination2": {
							"isVisible": destinations[1] ? true : false
						},
						"lblDestination2": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.destination2"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.destination2")
							}
						},
						"rtxDestination2": destinations[1],
						"flxDestination3": {
							"isVisible": destinations[2] ? true : false
						},
						"lblDestination3": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.destination3"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.destination3")
							}
						},
						"rtxDestination3": destinations[2],
						"flxDestination4": {
							"isVisible": destinations[3] ? true : false
						},
						"lblDestination4": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.destination4"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.destination4")
							}
						},
						"rtxDestination4": destinations[3],
						"flxDestination5": {
							"isVisible": destinations[4] ? true : false
						},
						"lblDestination5": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.destination5"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.destination5")
							}
						},
						"rtxDestination5": destinations[4],
						"lblKey4": {
							"text": kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumber"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumber")
							}
						},
						"rtxValue4": {
							"text": dataItem.contactNumber,
							"accessibilityconfig": {
								"a11yLabel": dataItem.contactNumber
							}
						},
						"lblKey5": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.additionalInfo"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.additionalInfo")
							}
						},
						"rtxValue5": {
							"text": dataItem.additionalNotes !== undefined && dataItem.additionalNotes.length >= 1 ? dataItem.additionalNotes : kony.i18n.getLocalizedString("i18n.common.none"),
							"accessibilityconfig": {
								"a11yLabel": dataItem.additionalNotes !== undefined && dataItem.additionalNotes.length >= 1 ? dataItem.additionalNotes : kony.i18n.getLocalizedString("i18n.common.none")
							}
						},
						"lblKey6": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.selectedCards"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.selectedCards")
							}
						},
						"rtxValueA": {
							"text": self.returnCardDisplayName(dataItem.cardNumber),
							"accessibilityconfig": {
								"a11yLabel": self.returnCardDisplayName(dataItem.cardNumber)
							}
						},
						"btnAction1": {
							"skin": dataItem.status === 'Expired' ? "sknBtnSSP3343A817PxBg0CSR" : "sknBtnSecondaryNoBorderSSP4176a415px",
							"text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
							"isVisible": dataItem.status === 'Expired' ? false : true,
							"accessibilityConfig": {
								"a11yLabel": dataItem.status === 'Expired' ? "Edit travel plan with request ID " + dataItem.notificationId + " Disabled" : "Edit travel plan with request ID " + dataItem.notificationId,
								"a11yARIA": {
									"tabindex": 0,
									"role": "button"
								}
							},
							"onClick": dataItem.status === 'Expired' ? null : self.editTravelNotification.bind(self, dataItem)
						},
						"btnAction2": {
							"skin": dataItem.status === 'Expired' ? "sknBtnSSP3343A817PxBg0CSR" : "sknBtnSecondaryNoBorderSSP4176a415px",
							"text": kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
							"isVisible": dataItem.status === 'Expired' ? false : true,
							"accessibilityConfig": {
								"a11yLabel": dataItem.status === 'Expired' ? "Delete travel plan with request ID " + dataItem.notificationId + " Disabled" : "Delete travel plan with request ID" + dataItem.notificationId,
								"a11yARIA": {
									"tabindex": 0,
									"role": "button"
								}
							},
							"onClick": dataItem.status === 'Expired' ? null : self.deleteNotification.bind(self, dataItem.notificationId)
						},
						"flxMyCards": {
							"clipBounds": false,
							"skin": flxCardSkin,
							"onClick": self.viewCardDetailsMobile,
						},
						"lblCardStatusAccesibility": {
							"text": "Travel plan with Request ID " + dataItem.notificationId + "is " + dataItem.status,
							"skin": self.statusSkinsLandingScreen[dataItem.status] ? self.statusSkinsLandingScreen[dataItem.status] : self.statusSkinsDetailsScreen[dataItem.status],
							"accessibilityConfig": {
								"a11yARIA": {
									"tabindex": -1,
									"tagName": "span"
								}
							}
						},
						"imgChevron": "arrow_left_grey.png",
						"template": "flxTravelNotificationsCollapsed"
					};
				});
				this.view.myCards.segDebitCards.widgetDataMap = widgetDataMap;
				this.view.myCards.segDebitCards.setData(segData);
				this.view.forceLayout();
			}
			this.view.forceLayout();
			this.AdjustScreen();
			// this.view.flxFooter.top = "700dp";
			CommonUtilities.hideProgressBar(this.view);
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxTravelPlan.btnBypass.onClick = this.byPassBlock;
		},
		/**
		 * Method to show no travel notification screen
		 */
		showNoTravelNotificationScreen: function() {
			this.view.myCards.flxNoError.setVisibility(true);
			this.view.myCards.flxNoError.skin = "slfBoxffffffB1R5";
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.CardsManagement.NoTravelNotificationError')
			this.view.myCards.btnApplyForCard.text = kony.i18n.getLocalizedString("i18n.CardManagement.BackToCards")
			this.view.myCards.flxApplyForCards.setVisibility(true);
			this.view.myCards.btnApplyForCard.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			}

			this.AdjustScreen();
		},
		/**
		 * Method to be called after success of delete Notification to refresh and load notification list
		 */
		deleteNotificationSuccess: function() {
			this.fetchTravelNotifications();
		},
		/**
		 * Method to return cards names with line break for manage travel plan
		 * @param {String} cards Cards names seperated by comma
		 * @returns {String} cards name seperated by line break
		 */
		returnCardDisplayName: function(cards) {
			return cards.replace(/,/g, "<br/>");
		},
		/**
		 * Method to return frontend date for Travel Plan
		 * @param {Date} date in yyyy-mm-dd format
		 * @returns {String} dateString which has date in frontend date format
		 */
		returnFrontendDate: function(date) {
			var dateString = CommonUtilities.getFrontendDateString(date);
			return dateString;
		},
		/**
		 * changeRowTemplateMethod to toggle row template(btween selected and unselected templates for Travel Notifications) for selected row of segment
		 */
		changeNotificationRowTemplate: function() {
			var index = this.view.myCards.segDebitCards.selectedRowIndex;
			var rowIndex = index[1];
			var data = this.view.myCards.segDebitCards.data;
			for (var i = 0; i < data.length; i++) {
				if (i === rowIndex) {
					if (data[i].template === "flxTravelNotificationsCollapsed") {
						data[i].imgCollapse = {
							"src": ViewConstants.IMAGES.ARRAOW_UP,
							"accessibilityconfig": {
								"a11yLabel": "View Details"
							}
						};
						data[i].template = "flxTravelNotificationsExpanded";
						data[i].flxCollapse.accessibilityConfig = {
							"a11yLabel": "Hide more details for request ID " + data[i].lblCardId.text,
							"a11yARIA": {
								"tabindex": 0,
								"aria-expanded": true,
								"role": "button"
							}
						}
					} else {
						data[i].imgCollapse = {
							"src": ViewConstants.IMAGES.ARRAOW_DOWN,
							"accessibilityconfig": {
								"a11yLabel": "View Details"
							}
						};
						data[i].template = "flxTravelNotificationsCollapsed";
						data[i].flxCollapse.accessibilityConfig = {
							"a11yLabel": "Show more details for request ID " + data[i].lblCardId.text,
							"a11yARIA": {
								"tabindex": 0,
								"aria-expanded": false,
								"role": "button"
							}
						}
					}
				} else {
					data[i].imgCollapse = {
						"src": ViewConstants.IMAGES.ARRAOW_DOWN,
						"accessibilityconfig": {
							"a11yLabel": "View Details"
						}
					};
					data[i].template = "flxTravelNotificationsCollapsed";
				}
			}
			this.view.myCards.segDebitCards.setData(data);
			if (data[rowIndex].template === "flxTravelNotificationsExpanded")
				this.view.myCards.segDebitCards.setActive(rowIndex, 0, "flxTravelNotificationsExpanded.flxCollapse");
			else if (data[rowIndex].template === "flxTravelNotificationsCollapsed")
				this.view.myCards.segDebitCards.setActive(rowIndex, 0, "flxTravelNotificationsCollapsed.flxCollapse");
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method to return array of destinations from a string seperated by '-'
		 * @param {String} destinations Destination seperated by '-'
		 * @returns {Array} array that stores destinations
		 */
		returnDestinationsArray: function(destinations) {
			var array = [];
			destinations.split('-').forEach(function(destination) {
				array.push(destination);
			})
			return array;
		},
		/**
		 * Method to show edit travel notification screen
		 * @param {Object} - notification object
		 */
		editTravelNotification: function(data) {
			var self = this;
			this.notificationObject.requestId = data.notificationId;
			this.notificationObject.isEditFlow = true;
			self.navigateToAddTravelNotification();
			self.getBackendCards(data.cardNumber);
			this.view.lblRequestID.setVisibility(true);
			this.view.lblRequestNo.setVisibility(true);
			this.view.segDestinations.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			FormControllerUtility.disableButton(this.view.btnCardsContinue);
			this.view.lblRequestID.text = kony.i18n.getLocalizedString('i18n.CardManagement.requestId');
			this.view.lblRequestNo.text = data.notificationId;
			this.view.calFrom.dateComponents = this.getDateComponent(self.returnFrontendDate(data.startDate));
			this.view.calTo.dateComponents = this.getDateComponent(self.returnFrontendDate(data.endDate));
			this.view.txtPhoneNumber.text = data.contactNumber;
			this.view.txtareaUserComments.text = data.additionalNotes;
			this.view.title = this.view.myCards.lblMyCardsHeader.text;
			this.setDestinations(data.destinations);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method to get already selected cards for edit travel notification
		 * @param {Object} - cards object
		 */
		getBackendCards: function(data) {
			var cardNumber, cards = [];
			if (data) {
				if (data.indexOf(",")) {
					data = data.split(",");
					data.map(function(dataItem) {
						cardNumber = dataItem.substring(dataItem.length - OLBConstants.MASKED_CARD_NUMBER_LENGTH, dataItem.length);
						cards.push({
							"number": cardNumber
						});
					});
				} else {
					data.map(function(dataItem) {
						cardNumber = dataItem.substring(dataItem.length - OLBConstants.MASKED_CARD_NUMBER_LENGTH, dataItem.length);
						cards.push({
							"number": cardNumber
						});
					});
				}
				this.notificationObject.selectedcards = cards;
			}
		},
		/**
		 * Method to set destinations for edit travel notification
		 * @param {Object} - locationsObject
		 */
		setDestinations: function(data) {
			var self = this;
			var destinations = [];
			if (data) {
				var dataMap = {
					"lblDestination": "lblDestination",
					"lblPlace": "lblPlace",
					"lblAnotherDestination": "lblAnotherDestination",
					"lblSeparator2": "lblSeparator2",
					"imgClose": "imgClose",
					"flxClose": "flxClose",
					"flxSelectDestination": "flxSelectDestination"
				};
				if (data.indexOf("-") > 0) {
					data = data.split("-");
					data.forEach(function(dataItem) {
						var segData = {
							"lblDestination": {
								"text": kony.i18n.getLocalizedString('i18n.CardManagement.destination'),
								"accessibilityconfig": {
									"a11yLabel": kony.i18n.getLocalizedString('i18n.CardManagement.destination')
								}
							},
							"lblPlace": {
								"text": dataItem,
								"accessibilityconfig": {
									"a11yLabel": dataItem
								}
							},
							"imgClose": {
								"src": "icon_close_grey.png"
								//"onTouchEnd": self.removeAddressFromList.bind(self)
							},
							"flxClose": {
								"isVisible": true,
								"accessibilityConfig": {
									"a11yLabel": dataItem,
									"a11yARIA": {
										"tabindex": 0
									}
								},
								"onClick": self.removeAddressFromList.bind(self)
							},
							"lblSeparator2": "a"
						};
						destinations.push(segData);
					})
				} else {
					var segData = {
						"lblDestination": kony.i18n.getLocalizedString('i18n.CardManagement.destination'),
						"lblPlace": {
							"text": data,
							"accessibilityconfig": {
								"a11yLabel": data
							}
						},
						"imgClose": {
							"src": "icon_close_grey.png"
							//"onTouchEnd": self.removeAddressFromList.bind(self)
						},
						"flxClose": {
							"isVisible": true,
							"accessibilityConfig": {
								"a11yLabel": data,
								"a11yARIA": {
									"tabindex": 0,
									"role": "button"
								}
							},
							"onClick": self.removeAddressFromList.bind(self)
						},
						"lblSeparator2": "a"
					};
					destinations.push(segData);
				}
				this.view.segDestinations.widgetDataMap = dataMap;
				destinations.forEach(function(item, value) {
					item.lblDestination = kony.i18n.getLocalizedString("i18n.CardManagement.destination") + " " + (value + 1);
					item.flxClose.accessibilityConfig.a11yLabel = "Remove " + item.lblDestination + " " + item.lblPlace.text;
				})
				this.travelPlanDestinationList = destinations;
				this.view.segDestinations.setData(destinations);
			}
			this.validateTravelPlanData();
		},
		/**
		 * Method to remove address from the list of address for create/edit travel notification
		 */
		removeAddressFromList: function() {
			var self = this;
			var index = this.view.segDestinations.selectedRowIndex;
			if (index) {
				this.view.segDestinations.removeAt(index[1]);
			}
			var data = this.view.segDestinations.data;
			data.forEach(function(item, value) {
				item.lblDestination = {
					"text": kony.i18n.getLocalizedString("i18n.CardManagement.destination") + " " + (value + 1),
					"accessibilityconfig": {
						"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.destination") + " " + (value + 1)
					}
				};
			});
			this.view.segDestinations.setData(data);
			self.validateTravelPlanData();
			if (index[1] - 1 >= 0)
				this.view.segDestinations.setActive(index[1] - 1, 0, "flxSelectDestination.flxClose");
			else
				this.view.txtPhoneNumber.setActive(true);
		},
		/**
		 * Method to validate the data entered by user for creating/editing travel notification
		 */
		validateTravelPlanData: function() {
			var self = this;
			var validationUtilityManager = applicationManager.getValidationUtilManager();
			if (this.view.txtPhoneNumber.text !== "") {
				if (validationUtilityManager.isValidPhoneNumber(this.view.txtPhoneNumber.text) && this.view.txtPhoneNumber.text.length == 10 && this.view.segDestinations.data.length > 0) {
					FormControllerUtility.enableButton(this.view.btnContinue);
					this.view.lblWarningTravelPlan.setVisibility(false);
				} else {
					FormControllerUtility.disableButton(this.view.btnContinue);
					this.view.lblWarningTravelPlan.setVisibility(true);
					this.view.lblWarningTravelPlan.text = kony.i18n.getLocalizedString("i18n.common.errorCodes.10058");
				}
			} else {
				FormControllerUtility.disableButton(this.view.btnContinue);
			}
		},
		/**
		 * Method to get date component
		 * @param {string} - Date string
		 * @returns {Object} - dateComponent Object
		 */
		getDateComponent: function(dateString) {
			var dateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
			return [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
		},
		showCardPaymentConfirmScreen : function (response){
			this.view.flxCardBillPaymentConfirm.setVisibility(true);
			this.view.flxCardBillPayment.setVisibility(false);
			this.view.flxViewStatements.setVisibility(false);
            this.view.flxViewTransactions.setVisibility(false);
            this.view.flxMyCardsView.setVisibility(false);
            this.view.flxTopUpPrepaidCard.setVisibility(false);
            this.view.flxConvertToEMI.setVisibility(false);
            this.view.flxConvertToEMIConfirm.setVisibility(false);
            this.view.flxConvertEMIConfirm.setVisibility(false);
            this.view.flxAcknowledgment.setVisibility(false);
		},
		showCardPaymentAck: function(respData) {
			this.setBreadCrumbAndHeaderDataForCardOperation("Pay Bill - Acknowledgment");
            this.view.flxAcknowledgment.setVisibility(true);
            this.view.flxMyCardsView.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
            var navManager = applicationManager.getNavigationManager();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblCardAcknowledgement.text = "Your Transaction Details";
            this.view.ConfirmDialog.lblHeading.text = "Card Payment Details"
            this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(true);
			this.view.Acknowledgement.lblCardTransactionMessage.text ="Your card payment request has been submitted successfully";
            this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
            this.view.Acknowledgement.lblUnlockCardMessage.text = respData.message;
            this.view.Acknowledgement.lblRequestID.setVisibility(true);
            this.view.Acknowledgement.lblRequestID.text ="Reference Number :";
            this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
            this.view.Acknowledgement.lblRefrenceNumber.text = respData.referenceId;
            this.view.Acknowledgement.lblMessage.setVisibility(false);
            this.view.btnRequestReplacement.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyCards");
            this.view.btnBackToCards.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyDashboard");
            this.view.btnRequestReplacement.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
            this.view.btnBackToCards.onClick = function() {
				var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"appName": "AuthenticationMA",
					"moduleName": "AuthUIModule"
				});
				var navManager = applicationManager.getNavigationManager();
				var x = navManager.getCustomInfo('AuthParam');
				authModule.presentationController.postLoginCall(x);
				applicationManager.getPresentationUtility().showLoadingScreen();
            };
            ackData = navManager.getCustomInfo("payBillAckData");
            this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = ackData.from;
            this.view.ConfirmDialog.keyValueCardHolder.flxValue.left ="31%"
            this.view.ConfirmDialog.keyValueCardHolder.flxKey.width ="30%"
            this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            this.view.ConfirmDialog.keyValueCardName.lblValue.text = ackData.to;
            this.view.ConfirmDialog.keyValueCardName.flxValue.left ="31%"
            this.view.ConfirmDialog.keyValueCardName.flxKey.width ="30%"
            this.view.ConfirmDialog.keyValueValidThrough.setVisibility(false);
            this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentType") + ":";
            this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = ackData.PaymentType;
            this.view.ConfirmDialog.keyValueValidThrough.flxValue.left ="31%"
            this.view.ConfirmDialog.keyValueValidThrough.flxKey.width ="30%"
            this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = kony.i18n.getLocalizedString("kony.mb.common.TransactionDateColon");
            this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = ackData.date;
            this.view.ConfirmDialog.keyValueServiceProvider.flxValue.left ="31%"
            this.view.ConfirmDialog.keyValueServiceProvider.flxKey.width ="30%"
            this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.TransactionAmount");
            this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = ackData.amount;
            this.view.ConfirmDialog.keyValueCreditLimit.flxValue.left ="31%"
            this.view.ConfirmDialog.keyValueCreditLimit.flxKey.width ="30%"
            this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = kony.i18n.getLocalizedString("i18n.payments.transactionDescriptionWithColon");
            this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = ackData.note;
            this.view.ConfirmDialog.keyValueAvailableCredit.flxValue.left ="31%"
            this.view.ConfirmDialog.keyValueAvailableCredit.flxKey.width ="30%"
            this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(true);
            this.view.flxPrint.onClick = this.printAcknowlegement.bind(this);
        },
		showTopUpCardAcknowledgement: function(ackData, res) {
			this.setBreadCrumbAndHeaderDataForCardOperation("Topup Prepaid Card - Acknowledgment");
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			var navManager = applicationManager.getNavigationManager();
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblCardAcknowledgement.text = "Your Transaction Details";
			this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(false);
			this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(true);
			this.view.Acknowledgement.lblUnlockCardMessage.text = "Your transaction has been submitted successfully.";
			this.view.Acknowledgement.lblRequestID.setVisibility(false);
			this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
			this.view.Acknowledgement.lblRefrenceNumber.text = "";
			this.view.Acknowledgement.lblMessage.setVisibility(false);
			this.view.btnRequestReplacement.text = "Transfer Activities";
			this.view.btnBackToCards.text = "New Transfer";
			this.view.btnBackToCards.onClick = function(){
			 var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName"
					: "TransfersMA",
                    "friendlyName": "frmUTFLanding"
                }, false, data);
			};
			this.view.btnRequestReplacement.onClick = function(){
				applicationManager.getModulesPresentationController({
                            "appName": "TransfersMA",
                            "moduleName": "TransferFastUIModule"
                        }).getPastPayments();
			};
			this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = "From:";
			this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = navManager.getCustomInfo("accountName");;
			this.view.ConfirmDialog.keyValueCardName.lblKey.text = "To:"
			this.view.ConfirmDialog.keyValueCardName.lblValue.text = ackData.cCardNumber;
			this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = "Amount:";
			this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = "USD "+ackData.topUpAmount;
			this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = "Note:";
			this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = ackData.notes;
			if (this.requestCardFlow == "topUpVirtualCard") {
				this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = "Exchange Rate:";
				this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = ackData.exchangeRate;
				this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = "Debit Amount";
				this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = "NPR "+ackData.debitAmount;
			} else {
				this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
				this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			}
		},
		/**
		 * Shows the acknowledgement screen based on the action.
		 * @param {Object} - card object.
		 * @param {String} - contains the actino to be performed.
		 */
		showEMIAcknowledgementScreen: function(action) {
			this.setBreadCrumbAndHeaderDataForCardOperation("EMI Conversion - Acknowledgment");
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			var navManager = applicationManager.getNavigationManager();
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblCardAcknowledgement.text = "EMI Conversion - Acknowledgment";
			this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(false);
			this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
			this.view.Acknowledgement.lblRequestID.setVisibility(true);
			this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
			this.view.Acknowledgement.lblRefrenceNumber.text = action.referenceId;
            this.view.Acknowledgement.lblMessage.setVisibility(true);
            var amount =navManager.getCustomInfo("EMI_TotalAmount");
            var emiDate =navManager.getCustomInfo("EMI_TransactionDate");
            var Ref =navManager.getCustomInfo("EMI_ReferenceID");
            var cardNum =navManager.getCustomInfo("EMI_CardNumber");
            this.view.Acknowledgement.lblMessage.text = "Your request to convert your recent transaction of "+ amount+ " on "+emiDate + "into EMI has been successfully submitted.We are currently processing your request. You will receive a confirmation once the EMI conversion is approved and details are finalized.";
            // this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.payments.transactionDescriptionWithColon");
			// this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = navManager.getCustomInfo("EMI_Description");
			// this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.TransactionAmount");
			// this.view.ConfirmDialog.keyValueCardName.lblValue.text = navManager.getCustomInfo("EMI_TotalAmount");;
			// this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.EMIamount"); //kony.i18n.getLocalizedString("i18n.CardManagement.ValidThrough");
			// this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = navManager.getCustomInfo("EMI_Amount");
			// this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.EMITenure");
			// this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = scope_configManager.getEmiTenureMonth();;
			// this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.RoIperMonth");
			// this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = scope_configManager.getEmiInterestDate();
			this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = "Card Number:";//kony.i18n.getLocalizedString("i18n.payments.transactionDescriptionWithColon");
            this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = cardNum;//navManager.getCustomInfo("EMI_Description");
            this.view.ConfirmDialog.keyValueCardName.lblKey.text = "Transaction Description:"//kony.i18n.getLocalizedString("i18n.HBl.Cards.TransactionAmount");
            this.view.ConfirmDialog.keyValueCardName.lblValue.text = navManager.getCustomInfo("EMI_Description");//navManager.getCustomInfo("EMI_TotalAmount");
            this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = "Transaction Reference Number:";//kony.i18n.getLocalizedString("i18n.HBl.Cards.EMIamount"); //kony.i18n.getLocalizedString("i18n.CardManagement.ValidThrough");
            this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = Ref;//navManager.getCustomInfo("EMI_Amount");
            this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = "Transaction Date:"//kony.i18n.getLocalizedString("i18n.HBl.Cards.EMITenure");
            this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = emiDate;//scope_configManager.getEmiTenureMonth();;
            this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = "Transaction Amount:"//kony.i18n.getLocalizedString("i18n.HBl.Cards.RoIperMonth");
            this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = amount;//scope_configManager.getEmiInterestDate();
			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
		},
		showAcknowledgementScreen: function(card, action) {
			var self = this;
			if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard")) {
				CommonUtilities.hideProgressBar(self.view);
				var accountDetails = applicationManager.getAccountManager().getInternalAccountByID(card.maskedAccountNumber);
				this.hideAllCardManagementViews();
				this.view.ConfirmDialog.confirmButtons.setVisibility(false);
				this.view.flxAcknowledgment.setVisibility(true);
				this.view.ConfirmDialog.flxDestination.setVisibility(false);
				this.view.ConfirmDialog.flxSelectCards.setVisibility(false);
				this.view.btnRequestReplacement.setVisibility(false);
				this.view.btnBackToCardLimits.setVisibility(false);
				this.view.btnBackToCards.skin = "sknbtnSSPffffff0278ee15pxbr3px";
				this.view.btnRequestReplacement.skin = "sknBtnffffffBorder0273e31pxRadius2px";
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				if (card.isExpiring === "0") {
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.ActivateACard")
					this.view.title = kony.i18n.getLocalizedString("i18n.CardManagement.ActivateACard") + " - Acknowledgement";
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardActivated")
					this.view.ConfirmDialog.lblHeading.text = kony.i18n.getLocalizedString("i18n.CardManagement.NewCardDetails")
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.btnLearnAbout.setVisibility(false);
				} else {
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.ActivateRenewalCard")
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.RenewedCardActivated")
					this.view.ConfirmDialog.lblHeading.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardDetails")
					this.view.Acknowledgement.lblUnlockCardMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.CutOldCard")
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(true);
					this.view.Acknowledgement.btnLearnAbout.setVisibility(true);
				}
				this.view.Acknowledgement.btnLearnAbout.text = kony.i18n.getLocalizedString("i18n.CardManagement.LearnMore");
				if (card.orderId) {
					this.view.Acknowledgement.lblRequestID.text = kony.i18n.getLocalizedString("i18n.CardManagement.requestId")
					this.view.Acknowledgement.lblRefrenceNumber.text = card.orderId
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
				} else {
					this.view.Acknowledgement.lblRequestID.setVisibility(false);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
				}

				this.view.Acknowledgement.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement")

				this.view.btnRequestReplacement.setVisibility(true);
				this.view.btnRequestReplacement.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyCards")
				this.view.btnRequestReplacement.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
				this.view.btnBackToCards.setVisibility(true);
				this.view.btnBackToCards.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyDashboard")
				this.view.btnBackToCards.onClick =function(){
					var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
						"appName": "AuthenticationMA",
						"moduleName": "AuthUIModule"
					});
					var navManager = applicationManager.getNavigationManager();
					var x = navManager.getCustomInfo('AuthParam');
					authModule.presentationController.postLoginCall(x);
					applicationManager.getPresentationUtility().showLoadingScreen();
				}
				this.view.Acknowledgement.btnLearnAbout.onClick = function() {
					window.open("https://www.google.com/");
				};
				this.view.flxPrint.setVisibility(false);
				this.view.Acknowledgement.lblMessage.setVisibility(false);
				// this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.Card")
				// this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.ChequeBookReq.account")
				// this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard")
				// this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = /*card.productName + " - " +*/ card.maskedCardNumber;
				// this.view.ConfirmDialog.keyValueCardName.lblValue.text = card.maskedNickNameAndNumber
				// this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = card.cardHolder
				this.view.ConfirmDialog.keyValueCardHolder.setVisibility(true);
				this.view.ConfirmDialog.keyValueCardName.setVisibility(true);
				this.view.ConfirmDialog.keyValueValidThrough.setVisibility(true);
				this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(true);
				this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(true);
				this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(true);
				
				this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.HBL.CardHolderName");
                this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = card.cardHolder;
                this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardName");
                this.view.ConfirmDialog.keyValueCardName.lblValue.text = card.Card_Category;
                this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber"); //kony.i18n.getLocalizedString("i18n.CardManagement.ValidThrough");
                this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = card.maskedCardNumber;
                this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.ServiceProvider");
                this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = card.Card_Type;
                this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit");
                this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text ="-";
                this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit");
                this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text ="-";
				this.AdjustScreen();
				this.view.customheader.btnSkip.setVisibility(true);
				this.view.customheader.btnSkip.setActive(true);
			} else {
				this.showCardOperationAcknowledgement(card, action);
			}

		},
		/**
		 * Shows the acknowledgement screen based on the action.
		 * @param {Object} - card object.
		 * @param {String} - contains the actino to be performed.
		 */
		showCardOperationAcknowledgement: function(card, action) {
			var self = this;
			CommonUtilities.hideProgressBar(self.view);
			this.hideAllCardManagementViews();
			this.view.ConfirmDialog.confirmButtons.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.Acknowledgement.btnLearnAbout.setVisibility(false);
			this.view.ConfirmDialog.flxDestination.setVisibility(false);
			this.view.ConfirmDialog.flxSelectCards.setVisibility(false);
			this.view.btnBackToCardLimits.setVisibility(false);
			this.view.btnManageCards.setVisibility(false);
			this.view.btnRequestReplacement.setVisibility(true);
			this.view.btnRequestReplacement.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyCards")
			this.view.btnRequestReplacement.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.btnBackToCards.setVisibility(true);
			this.view.btnBackToCards.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyDashboard")
			this.view.btnBackToCards.onClick =function(){
				var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"appName": "AuthenticationMA",
					"moduleName": "AuthUIModule"
				});
				var navManager = applicationManager.getNavigationManager();
				var x = navManager.getCustomInfo('AuthParam');
				authModule.presentationController.postLoginCall(x);
				applicationManager.getPresentationUtility().showLoadingScreen();
			}
			switch (action) {
				case kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"): {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LockCardAcknowledgement"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.AckMessage1")
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(true);
					this.view.Acknowledgement.lblUnlockCardMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.AckMessage2")
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
					this.view.Acknowledgement.lblMessage.setVisibility(false);
					break;
				}
				case "Offline_Change_Pin": {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinAcknowledgement"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.ChangeCardPin")
					this.view.Acknowledgement.lblCardTransactionMessage.text = (card.cardType === 'Debit') ? kony.i18n.getLocalizedString("i18n.CardManagement.SuccessfulChangePinAckMessage") : kony.i18n.getLocalizedString("i18n.CardManagement.SucessfulChangePinRequestAckMessage")
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.lblRequestID.setVisibility(false);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
					this.view.Acknowledgement.lblMessage.setVisibility(false);
					break;
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"): {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinAcknowledgement"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.ChangeCardPin")
					this.view.Acknowledgement.lblCardTransactionMessage.text = (card.cardType === 'Debit') ? kony.i18n.getLocalizedString("i18n.CardManagement.SuccessfulChangePinAckMessage") : kony.i18n.getLocalizedString("i18n.CardManagement.SucessfulChangePinRequestAckMessage");
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
					this.view.Acknowledgement.lblMessage.setVisibility(false);
					break;
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"): {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCardAcknowledgement"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard");
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.SuccessfulUnlockCardAckMessage");
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(true);
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
					this.view.Acknowledgement.lblMessage.setVisibility(false);
					break;
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"): {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolenCardAcknowledgement"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolenLower");
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.SucessfulRequestAckMessage");
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
					this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(true);
					this.view.Acknowledgement.lblMessage.setVisibility(false);
					break;
				}
				case kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard"): {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ReplaceCardAcknowledgement"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard");
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.SucessfulRequestAckMessage");
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
					break;
				}
				case kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"): {
					this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelAck"));
					var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
					this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard");
					this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelMsg");
					this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
					this.view.Acknowledgement.lblRequestID.setVisibility(true);
					this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
					this.view.Acknowledgement.lblCardTransactionMessage.setVisibility(true);
					this.view.Acknowledgement.lblMessage.setVisibility(false);
					break;
				}
			}
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.Acknowledgement.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement");
			this.view.ConfirmDialog.lblHeading.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardDetails");

			this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.HBL.CardHolderName");
			this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = card.cardHolder;

			this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardName");
			this.view.ConfirmDialog.keyValueCardName.lblValue.text = card.Card_Category;

			this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber"); //kony.i18n.getLocalizedString("i18n.CardManagement.ValidThrough");
			this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = card.maskedCardNumber;

			this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.ServiceProvider");
			this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = card.Card_Type;
			// this.view.ConfirmDialog.keyValueName.setVisibility(true);
            // this.view.ConfirmDialog.keyValueName.lblKey.text = kony.i18n.getLocalizedString("i18n.HBL.CardHolderName");
            // this.view.ConfirmDialog.keyValueName.lblValue.text = card.cardHolder;
            // this.view.ConfirmDialog.keyValueName.flxIcon.setVisibility(false);
            // this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardName");
            // this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = card.Card_Category;
            // this.view.ConfirmDialog.keyValueCardName.lblKey.text = "Card Number in Masked Format:";
            // this.view.ConfirmDialog.keyValueCardName.lblValue.text = card.maskedCardNumber;
            // this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.ServiceProvider"); //kony.i18n.getLocalizedString("i18n.CardManagement.ValidThrough");
            // this.view.ConfirmDialog.keyValueValidThrough.lblValue.text =  card.Card_Type;
			if (card.orderId) {
				this.view.Acknowledgement.lblRequestID.text = kony.i18n.getLocalizedString("i18n.CardManagement.requestId");
				this.view.Acknowledgement.lblRefrenceNumber.text = card.orderId;
			} else {
				this.view.Acknowledgement.lblRequestID.setVisibility(false);
				this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
			}

			this.view.ConfirmDialog.keyValueCardHolder.setVisibility(true);
			this.view.ConfirmDialog.keyValueCardName.setVisibility(true);
			this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(true);
			//if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
			if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
				this.view.ConfirmDialog.keyValueName.setVisibility(true);
				this.view.ConfirmDialog.keyValueName.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardName");
				this.view.ConfirmDialog.keyValueName.lblValue.text = card.productName;
				this.view.ConfirmDialog.keyValueName.lblIcon.text = card.isTypeBusiness === "1" ? "r" : "s"
			} else {
				// this.view.ConfirmDialog.keyValueName.setVisibility(false);
			}
			this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit");
            this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text ="-";
            this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit");
            this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text ="-";
			/*Getting Acknowledgement value from Limit api */

			// this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(false);
			// this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			// this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
			// var navManager = applicationManager.getNavigationManager();
            // var cardLimits=navManager.getCustomInfo("getCardLimitsforACKScreen");
			// for(i=0;i<cardLimits.length;i++){
			// 	var data = cardLimits[i] ;
            // 	var limit =this.formatLimits(JSON.parse(data.cardLimits).limits);
			// 	if (card.cardType === 'Credit' && cardLimits[i].cardType=="Credit Card" &&cardLimits[i].cardCategory.toUpperCase() ==card.Card_Type.toUpperCase() ) {
			// 		if(limit[0] != undefined && limit[0] != null){
			// 			this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = limit[0].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = limit[0].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(false);
			// 		}
			// 		if(limit[1]!= undefined && limit[1] != null){
			// 			this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = limit[1].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = limit[1].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
			// 		}
			// 		if(limit[2] != undefined && limit[2] != null){
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = limit[2].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = limit[2].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			// 		}
			// 		break;
			// 	} else if (card.cardType === 'Debit' && cardLimits[i].cardType=="Debit Card" &&cardLimits[i].cardCategory.toUpperCase()==card.Card_Type.toUpperCase()) {
			// 		if(limit[0] != undefined && limit[0] != null){
			// 			this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = limit[0].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = limit[0].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(false);
			// 		}
			// 		if(limit[1]!= undefined && limit[1] != null){
			// 			this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = limit[1].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = limit[1].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
			// 		}
			// 		if(limit[2] != undefined && limit[2] != null){
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = limit[2].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = limit[2].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			// 		}
			// 		break;
			// 	} else if(card.cardType === 'Prepaid' && cardLimits[i].cardType=="Prepaid Card" &&cardLimits[i].cardCategory.toUpperCase()==card.Card_Type.toUpperCase()){
			// 		if(limit[0] != undefined && limit[0] != null){
			// 			this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = limit[0].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = limit[0].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(false);
			// 		}
			// 		if(limit[1]!= undefined && limit[1] != null){
			// 			this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = limit[1].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = limit[1].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
			// 		}
			// 		if(limit[2] != undefined && limit[2] != null){
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = limit[2].split(":")[0];
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = limit[2].split(":")[1];
			// 		}else{
			// 			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			// 		}
			// 		break;
			// 	}
			// }
			// this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.flxPrint.onClick = this.printAcknowlegement;
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},
		/**
		 *  Entry point for replace card flow.
		 * @param {Object} - card object.
		 */
		cancelCard: function(card) {
			this.showCancelCardView();
			this.setCancelCardButtonsActions(card);
			this.setCardDetails(card);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		showCancelCardView: function() {
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			this.view.flxCardVerification.setVisibility(true);
			this.view.CardLockVerificationStep.setVisibility(true);
			this.view.CardLockVerificationStep.flxLeft.setVisibility(true);
			this.view.CardLockVerificationStep.flxWarning2.setVisibility(true);
			this.view.CardLockVerificationStep.flxCardReplacement.setVisibility(true);
			this.view.CardLockVerificationStep.lblUpgrade.setVisibility(false);
			this.view.CardLockVerificationStep.flxAddresslabel.setVisibility(false);
			this.view.CardLockVerificationStep.flxAddress.setVisibility(false);
			FormControllerUtility.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			CommonUtilities.setCheckboxState(false, this.view.CardLockVerificationStep.CardActivation.imgChecbox);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText1.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelWarn1");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText2.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelWarn2");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText3.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelWarn3");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText4.text = kony.i18n.getLocalizedString("i18n.cardsManagement.cancelWarn4");
			this.view.CardLockVerificationStep.lblReason2.setVisibility(true);
			this.view.CardLockVerificationStep.lbxReason2.setVisibility(true);
			this.view.CardLockVerificationStep.lblReason1.setVisibility(false);
			this.view.CardLockVerificationStep.WarningMessage.flxIAgree.setVisibility(true);
			CommonUtilities.setCheckboxState(false, this.view.CardLockVerificationStep.WarningMessage.imgChecbox);
			this.view.CardLockVerificationStep.lblReason2.text = kony.i18n.getLocalizedString("i18n.CardManagement.PleaseEnterTheReasonMessage");
			var reasonMasterData = [];
			reasonMasterData.push(["Reason1", kony.i18n.getLocalizedString("i18n.cardManagement.privacy")]);
			reasonMasterData.push(["Reason2", kony.i18n.getLocalizedString("i18n.cardsManagement.annualCharges")]);
			reasonMasterData.push(["Reason3", kony.i18n.getLocalizedString("i18n.cardsManagement.others")]);
			this.view.CardLockVerificationStep.lbxReason2.masterData = reasonMasterData;
			this.view.CardLockVerificationStep.lbxReason2.selectedKey = "Reason1";
			this.view.forceLayout();
			this.AdjustScreen();
		},
		setCancelCardButtonsActions: function(card) {
			var self = this;
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString('i18n.common.proceed')
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			this.view.CardLockVerificationStep.btnCancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
					var params = {
						'card': card,
						'Action': 'Cancel Card',
						'Reason': self.view.CardLockVerificationStep.lbxReason2.selectedKeyValue[1],
						'notes': ""
					};
					self.initMFAFlow.call(self, params, kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"));
				}.bind(this);
			}
			this.view.CardLockVerificationStep.WarningMessage.flxCheckbox.onClick = function() {
				CommonUtilities.toggleCheckBox(self.view.CardLockVerificationStep.WarningMessage.imgChecbox);
				if (CommonUtilities.isChecked(self.view.CardLockVerificationStep.WarningMessage.imgChecbox)) {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setCheckboxState(true, self.view.CardLockVerificationStep.WarningMessage.imgChecbox);
				} else {

					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setCheckboxState(false, self.view.CardLockVerificationStep.WarningMessage.imgChecbox);
				}
			};
			this.setCheckBoxToggleProperty();
			this.AdjustScreen();
			this.view.forceLayout();
		},
		setCheckBoxToggleProperty: function() {
			var self = this;
			this.view.CardLockVerificationStep.WarningMessage.btnTermsAndConditions.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.height = (self.view.flxMain.info.frame.height + 355) + "dp";
				self.view.flxTC.top = "100dp";
				self.view.flxTermsAndConditionsPopUp.setVisibility(true);
				self.view.lblTermsAndConditions.setFocus(true);
				if (CommonUtilities.isChecked(self.view.CardLockVerificationStep.WarningMessage.imgChecbox)) {
					CommonUtilities.setLblCheckboxState(true, self.view.lblTCContentsCheckboxIcon);
				} else {
					CommonUtilities.setLblCheckboxState(false, self.view.lblTCContentsCheckboxIcon);
				}
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.showTermsAndConditionsCancelCard();
			};
			this.view.btnCancel.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.setVisibility(false);
			};
			this.view.flxClose.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.setVisibility(false);
			};
			this.view.flxTCContentsCheckbox.onClick = function() {
				CommonUtilities.toggleFontCheckbox(self.view.lblTCContentsCheckboxIcon);
			};
			this.view.btnSave.onClick = function() {
				if (CommonUtilities.isFontIconChecked(self.view.lblTCContentsCheckboxIcon)) {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setCheckboxState(true, self.view.CardLockVerificationStep.WarningMessage.imgChecbox);
				} else {
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setCheckboxState(false, self.view.CardLockVerificationStep.WarningMessage.imgChecbox);
				}
				self.view.flxTermsAndConditionsPopUp.setVisibility(false);
			};
		},
		/*DownloadPdf: function() {
			var selectedData = this.view.segCardMonthStatement.selectedRowItems[0];
			var dateVal = selectedData["value"];
			// to convert date to the format
			var date = new Date(dateVal);
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			var formattedMonth = month < 10 ? `0${month}` : month;
			var statementDate = `${formattedMonth}/${year}`;
			var navManager = applicationManager.getNavigationManager();
			var cardNumber = navManager.getCustomInfo("statement_cardNumber");
			var param = {
				'cardNumber': cardNumber,
				'statementDate': statementDate

			}
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.downloadCardStatement(param);
		},
		onYearSelection: function() {
			var selectedData = this.view.segCardYearDropdownValues.selectedRowItems[0];
			this.view.lblCardYearDropdownValue.text = selectedData["value"];
			var year = selectedData["value"].split(" ");
			this.view.lblStatements.text = year[0] + " Statements";
			var navManager = applicationManager.getNavigationManager();
			var currentYear = navManager.getCustomInfo("statement_currentyear");
			var month = navManager.getCustomInfo("statement_month");
			this.setMonthDropdownValue(this, currentYear, month);
			this.hideYearDropdown();
		},
		hideYearDropdown: function() {
			this.view.flxCardYearSegment.isVisible = false;
			this.view.lblCardYearDropdownIcon.text = "O";
		},
		downloadStatement: function(card) {
			this.view.flxViewStatements.setVisibility(true);
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			var now = new Date();
			var currentFullYear = now.getFullYear();
			this.view.lblCardNumberValue.text = card.maskedCardNumber;
			this.view.lblCardYearDropdownValue.text = currentFullYear + " Statements";
			this.view.lblStatements.text = currentFullYear + " Statements";
			var dateParts = card.issuedDate.split('-');
			var day = dateParts[0]; // 16
			var month = dateParts[1]; // FEB
			var shortYear = dateParts[2]; // 21
			var currentYear = 2000 + parseInt(shortYear);
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("statement_currentyear", currentYear);
			navManager.setCustomInfo("statement_month", month);
			navManager.setCustomInfo("statement_cardNumber", card.cardNumber);
			this.setYearDropdownValue(card, currentYear);
			this.setMonthDropdownValue(card, currentYear, month);
			this.AdjustScreen();
		},
		setYearDropdownValue: function(card, currentYear) {
			var now = new Date();
			var currentFullYear = now.getFullYear();
			var i = 0;
			var param = [];
			for (var year = currentYear; year <= currentFullYear; year++) {
				param.push({
					"key": i,
					"value": year + ' Statements'
				});
				i++;
			}
			// var StatementYear = '[{"key":"1","value":"2024 Statements"},{"key":"2","value":"2023 Statements"},{"key":"3","value":"2022 Statements"}]';
			var year = JSON.stringify(param, null, i);
			var Statement = JSON.parse(year);
			this.view.segCardYearDropdownValues.widgetDataMap = {
				"lblUsers": "value"
			};
			this.view.segCardYearDropdownValues.setData(Statement);
		},
		setMonthDropdownValue(card, startYear, monthStr) {
			var months = [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			// To get monthValue
			var getMonthNumber = month => ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].indexOf(monthStr.toUpperCase()) + 1;
			var startMonthIndex = months.indexOf(monthStr);

			//to check the selected year
			var selectedYear = this.view.lblCardYearDropdownValue.text.split(" ");

			// Get the current date
			var currentDate = new Date();
			var currentYear = currentDate.getFullYear();
			var currentMonth = currentDate.getMonth();

			// Create an array to store months in the required format
			var monthsArray = [];
			var key = 1;

			// If the start month is before February, start from February
			var year = selectedYear[0];
			var month = startMonthIndex;
			if (selectedYear[0] == startYear) {
				month = getMonthNumber(monthStr) - 1; //2
				currentMonth = month - 1;
				while (month >= currentMonth) {
					monthsArray.push({
						key: key.toString(), // Key will be incremented (e.g., '1', '2', '3', ...)
						value: `${months[month]} ${year}` // Month name and year (e.g., "February 2021")
					});

					// Move to the next month
					month++;
					if (month === 12) {
						month = 0; // Reset to January if we go past December
						// year++;     // Move to the next year
						break;
					}

					key++; // Increment key for each month
				}
			} else if (selectedYear[0] == currentYear) {
				month = 0;
				while (month <= currentMonth) {
					monthsArray.push({
						key: key.toString(), // Key will be incremented (e.g., '1', '2', '3', ...)
						value: `${months[month]} ${year}` // Month name and year (e.g., "February 2021")
					});

					// Move to the next month
					month++;
					if (month === 12) {
						month = 0; // Reset to January if we go past December
						// year++;     // Move to the next year
						break;
					}

					key++; // Increment key for each month
				}
			} else {
				month = 0;
				currentMonth = 12;
				while (month <= currentMonth) {
					monthsArray.push({
						key: key.toString(), // Key will be incremented (e.g., '1', '2', '3', ...)
						value: `${months[month]} ${year}` // Month name and year (e.g., "February 2021")
					});

					// Move to the next month
					month++;
					if (month === 12) {
						month = 0; // Reset to January if we go past December
						// year++;     // Move to the next year
						break;
					}

					key++; // Increment key for each month
				}
			}


			// Convert the array to a JSON string
			var monthValue = JSON.stringify(monthsArray, null, key);
			var monthDrop = JSON.parse(monthValue);
			this.view.segCardMonthStatement.widgetDataMap = {
				"lblValue": "value"
			};
			if (key >= 7 && key <= 12) {
				this.view.flxMonthStatementDetails.height = "700dp";
				this.view.flxCardMothStatementSegment.height = "700dp";
				this.view.segCardMonthStatement.height = "700dp";
			}
			if (key >= 1 && key <= 6) {
				this.view.flxMonthStatementDetails.height = "350dp";
				this.view.flxCardMothStatementSegment.height = "350dp";
				this.view.segCardMonthStatement.height = "350dp";
			}
			this.view.segCardMonthStatement.setData(monthDrop);
		},*/
		/**
		 *  Entry point for replace card flow.
		 * @param {Object} - card object.
		 */
		replaceCard: function(card) {
			this.showCardReplacementView();
			this.setCardDetails(card);
			this.showCardReplacementGuildlines(card);
			this.setMobileHeader(kony.i18n.getLocalizedString("i18n.CardManagement.cardReplacement"));
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxMain.setFocus(true);
		},
		/**
		 * Method to show replaced card details
		 */
		showCardReplacementView: function() {
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			this.view.flxCardVerification.setVisibility(true);
			this.view.CardLockVerificationStep.setVisibility(true);
			this.view.CardLockVerificationStep.flxLeft.setVisibility(true);
			this.view.CardLockVerificationStep.flxCardReplacement.setVisibility(true);
			this.view.CardLockVerificationStep.lblUpgrade.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.CardLockVerificationStep.WarningMessage.flxIAgree.setVisibility(false);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method to show guidelines card replacement.
		 * @param {Object} - card object
		 */
		showCardReplacementGuildlines: function(card) {
			var self = this;
			var isPrimaryAvailable = false;
			this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.cardReplacement"));
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText1.text = kony.i18n.getLocalizedString("i18n.CardManagement.replaceCardGuidline1");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText2.text = kony.i18n.getLocalizedString("i18n.CardManagement.replaceCardGuidline2");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText3.text = kony.i18n.getLocalizedString("i18n.CardManagement.replaceCardGuidline3");
			this.view.CardLockVerificationStep.WarningMessage.flxWarningText4.setVisibility(false);
			this.view.CardLockVerificationStep.lblReason2.setVisibility(false);
			this.view.CardLockVerificationStep.lbxReason2.setVisibility(false);
			this.view.CardLockVerificationStep.lblUpgrade.setVisibility(false);
			this.view.CardLockVerificationStep.flxAddresslabel.setVisibility(true);
			this.view.CardLockVerificationStep.flxAddress.setVisibility(true);
			this.view.CardLockVerificationStep.tbxNoteOptional.text = "";
			this.view.CardLockVerificationStep.tbxNoteOptional.maxTextLength = OLBConstants.NOTES_LENGTH;
			this.view.CardLockVerificationStep.lblReason2.setVisibility(true);
			this.view.CardLockVerificationStep.lb1Reason1.setVisibility(false);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.lblReason2.text = kony.i18n.getLocalizedString("i18n.CardsManagement.replaceReason");
			var reasonMasterData = [];
			reasonMasterData.push(["Reason1", kony.i18n.getLocalizedString("i18n.CardsManagement.replaceReason1")]);
			reasonMasterData.push(["Reason2", kony.i18n.getLocalizedString("i18n.CardsManagement.damageCard")]);
			reasonMasterData.push(["Reason3", kony.i18n.getLocalizedString("i18n.cardsManagement.others")]);
			this.view.CardLockVerificationStep.lbxReason2.masterData = reasonMasterData;
			this.view.CardLockVerificationStep.lbxReason2.selectedKey = "Reason1";
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.lblAddress.text = kony.i18n.getLocalizedString("i18n.CardManagement.addressforcards");
			var addressObject = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchUserAddresses();
			var addressArray = [];
			for (var addressIndex = 0; addressIndex < 3; addressIndex = addressIndex + 1) { //To reset all the radio buttons to off state.
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep["lblAddressCheckBox" + (addressIndex + 1)].text = "L";
				this.view.CardLockVerificationStep["lblAddressCheckBox" + (addressIndex + 1)].skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep["flxAddressCheckbox" + (addressIndex + 1)].accessibilityConfig = {
					"a11yLabel": this.view.CardLockVerificationStep["rtxAddress" + (addressIndex + 1)].text,
					"a11yARIA": {
						"role": "radio",
						"aria-checked": false
					}
				};
			}
			if (addressObject) {
				addressObject.forEach(function(dataItem) {
					var finalData;
					if (dataItem.AddressLine1 !== "" && dataItem.AddressLine1 !== undefined && dataItem.AddressLine1 !== null) finalData = dataItem.AddressLine1;
					if (dataItem.AddressLine2 && finalData !== undefined) finalData = finalData + "," + dataItem.AddressLine2;
					if (!kony.sdk.isNullOrUndefined(dataItem.CityName)) finalData = finalData + "," + dataItem.CityName;
					if (!kony.sdk.isNullOrUndefined(dataItem.CountryName)) finalData = finalData + "," + dataItem.CountryName;
					if (!kony.sdk.isNullOrUndefined(dataItem.CountryCode)) finalData = finalData + "," + dataItem.CountryCode;

					if (!kony.sdk.isNullOrUndefined(dataItem.ZipCode)) finalData = finalData + "," + dataItem.ZipCode;
					addressArray.push(finalData);
				});
			}
			if (addressArray[0]) {
				this.view.CardLockVerificationStep.rtxAddress1.setVisibility(true);
				this.view.CardLockVerificationStep.flxAddressCheckbox1.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.rtxAddress1.text = addressArray[0];
				this.view.CardLockVerificationStep.flxAddress1.setVisibility(true);
			} else {
				this.view.CardLockVerificationStep.flxAddress1.setVisibility(false);
				this.view.CardLockVerificationStep.flxAddresslabel.setVisibility(false);
				this.view.CardLockVerificationStep.rtxAddress1.setVisibility(false);
				this.view.CardLockVerificationStep.flxAddressCheckbox1.setVisibility(false);
			}
			if (addressArray[1]) {
				this.view.CardLockVerificationStep.rtxAddress2.setVisibility(true);
				this.view.CardLockVerificationStep.flxAddressCheckbox2.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.rtxAddress2.text = addressArray[1];
				this.view.CardLockVerificationStep.flxAddress2.setVisibility(true);
			} else {
				this.view.CardLockVerificationStep.flxAddressCheckbox2.setVisibility(false);
				this.view.CardLockVerificationStep.rtxAddress2.setVisibility(false);
				this.view.CardLockVerificationStep.flxAddress2.setVisibility(false);
			}
			if (addressArray[2]) {
				this.view.CardLockVerificationStep.rtxAddress3.setVisibility(true);
				this.view.CardLockVerificationStep.flxAddressCheckbox3.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.rtxAddress3.text = addressArray[2];
				this.view.CardLockVerificationStep.flxAddress3.setVisibility(true);
			} else {
				this.view.CardLockVerificationStep.flxAddressCheckbox3.setVisibility(false);
				this.view.CardLockVerificationStep.rtxAddress3.setVisibility(false);
				this.view.CardLockVerificationStep.flxAddress3.setVisibility(false);
			}
			if (addressObject) {
				for (var addressIndex = 0; addressIndex < addressObject.length && addressIndex < 3; addressIndex = addressIndex + 1) {
					if (addressObject[addressIndex].isPrimary == "true") {
						var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
						isPrimaryAvailable = true;
						this.view.CardLockVerificationStep["lblAddressCheckBox" + (addressIndex + 1)].text = "M";
						this.view.CardLockVerificationStep["lblAddressCheckBox" + (addressIndex + 1)].skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
						this.view.CardLockVerificationStep["flxAddressCheckbox" + (addressIndex + 1)].accessibilityConfig = {
							"a11yLabel": this.view.CardLockVerificationStep["rtxAddress" + (addressIndex + 1)].text,
							"a11yARIA": {
								"role": "radio",
								"aria-checked": true
							}
						};
					} else {
						var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
						this.view.CardLockVerificationStep["lblAddressCheckBox" + (addressIndex + 1)].text = "L";
						this.view.CardLockVerificationStep["lblAddressCheckBox" + (addressIndex + 1)].skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
						this.view.CardLockVerificationStep["flxAddressCheckbox" + (addressIndex + 1)].accessibilityConfig = {
							"a11yLabel": this.view.CardLockVerificationStep["rtxAddress" + (addressIndex + 1)].text,
							"a11yARIA": {
								"role": "radio",
								"aria-checked": false
							}
						};
					}
				}
			}
			if (!isPrimaryAvailable) {
				this.view.CardLockVerificationStep.lblAddressCheckBox1.text = "M";
				this.view.CardLockVerificationStep.lblAddressCheckBox1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
				this.view.CardLockVerificationStep.flxAddressCheckBox1.accessibilityConfig = {
					"a11yLabel": this.view.CardLockVerificationStep.rtxAddress1.text,
					"a11yARIA": {
						"role": "radio",
						"aria-checked": false
					}
				};
			}
			var checkBoxArray = [];
			checkBoxArray.push({
				'flex1': this.view.CardLockVerificationStep.flxAddressCheckbox1,
				'flex2': this.view.CardLockVerificationStep.flxAddressCheckbox2,
				'flex3': this.view.CardLockVerificationStep.flxAddressCheckbox3
			});
			this.view.CardLockVerificationStep.flxAddressCheckbox1.onClick = this.onRadioButtonSelection.bind(this, checkBoxArray);
			this.view.CardLockVerificationStep.flxAddressCheckbox2.onClick = this.onRadioButtonSelection.bind(this, checkBoxArray);
			this.view.CardLockVerificationStep.flxAddressCheckbox3.onClick = this.onRadioButtonSelection.bind(this, checkBoxArray);
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString('i18n.common.proceed')
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			this.view.CardLockVerificationStep.btnCancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				if (this.view.CardLockVerificationStep.flxAddress.isVisible === true) {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
						var params = {
							'card': card,
							'userName': kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getUserName(),
							'CardAccountNumber': card.maskedCardNumber,
							'CardAccountName': card.maskedAccountNumber,
							'AccountType': 'CARD',
							'RequestCode': 'REPLACEMENT',
							'Channel': OLBConstants.Channel,
							'Address_id': self.getSelectedAddressId(),
							'AdditionalNotes': self.view.CardLockVerificationStep.tbxNoteOptional.text,
							'reason': self.view.CardLockVerificationStep.lbxReason2.selectedKeyValue[1]
						};
						self.initMFAFlow.call(self, params, kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard"));
					}.bind(this);
				} else {
					this.showServerError("The logged-in user does not have any addresses");
					this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
					this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
				}
			}
			this.AdjustScreen();
			this.view.CardLockVerificationStep.btnConfirm.accessibilityConfig = {
				"a11yLabel": "Continue with the replacement card request process",
				"a11yARIA": {
					"role": "button"
				}
			};
			this.view.CardLockVerificationStep.btnCancel.accessibilityConfig = {
				"a11yLabel": "Cancel card replacement process",
				"a11yARIA": {
					"role": "button"
				}
			};
		},
		/**
		 * Method to reset skin to calendar
		 */
		setSkinToCalendar: function() {
			this.view.calFrom.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
			this.view.calTo.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
			this.view.lblWarningTravelPlan.setVisibility(false);
			this.AdjustScreen();
		},
		/**
		 * Method to show creat travel notifications screen
		 * @param {Object} - country , region(states) , city object
		 */
		showAddNewTravelPlan: function(locationData) {
			var self = this;
			this.setSkinToCalendar();
			if (locationData) {
				if (locationData.country) {
					this.setCountryObject(locationData.country);
				}
				if (locationData.states) {
					this.setStatesObject(locationData.states);
				}
				if (locationData.city) {
					this.setCitiesObject(locationData.city)
				}
			}
			if (self.view.lblManageTravelPlans.text === kony.i18n.getLocalizedString('i18n.CardManagement.AddNewTravelPlan')) {
				self.view.flxMyCards.setVisibility(false);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				//this.view.myCards.lblMyCardsHeader.text = kony.i18n.getLocalizedString('i18n.CardManagement.CreateTravelPlan');
				self.view.lblRequestID.setVisibility(false);
				self.view.lblRequestNo.setVisibility(false);
				self.view.flxTravelPlan.setVisibility(true);
				this.view.lblWarningTravelPlan.setVisibility(false);
				this.view.calFrom.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
				this.view.calTo.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
				this.view.calFrom.onSelection = self.setSkinToCalendar;
				this.view.calTo.onSelection = self.setSkinToCalendar;
				this.view.flxOtherDestinations.setVisibility(false);
				FormControllerUtility.disableButton(this.view.btnContinue);
				this.setDefaultDataForNotifications();
				this.view.lblAnotherDestination.skin = 'sknlbla0a0a015px';
				this.view.flxAddFeatureRequestandimg.accessibilityConfig = {
						"a11yLabel": "Unavailable Add Destination",
						"a11yARIA": {
							"tabindex": -1,
							"role": "button"
						}
					},
					this.view.txtPhoneNumber.onKeyUp = self.validateTravelPlanData.bind(this);
				this.view.btnCancel1.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
				this.view.btnCancel1.onClick = function() {
					if (self.notificationObject.isEditFlow) {
						self.notificationObject.isEditFlow = false;
					}
					self.fetchTravelNotifications();
				}
				this.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.common.proceed");
				this.view.btnContinue.onClick = function() {
					if (self.validateDateRange()) {
						FormControllerUtility.showProgressBar(self.view);
						self.view.lblWarningTravelPlan.setVisibility(false);
						self.getDetailsOfNotification(self.notificationObject.isEditFlow);
						kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getEligibleCards();
					} else {
						self.view.lblWarningTravelPlan.setVisibility(true);
						var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
						self.view.lblWarningTravelPlan.text = kony.i18n.getLocalizedString('i18n.CardManagement.invalidDateError');
						self.view.calFrom.skin = ViewConstants.SKINS.SKNFF0000CAL;
						self.view.calTo.skin = ViewConstants.SKINS.SKNFF0000CAL;
					}
				}
				this.view.flxDestinationList.setVisibility(false);
				this.setFlowActions();
				this.view.forceLayout();
				this.AdjustScreen();
				CommonUtilities.hideProgressBar(this.view);
				this.view.customheader.btnSkip.setVisibility(true);
				this.view.customheader.btnSkip.setActive(true);
			}
		},
		/**
		 * Method to set countryObject for create/edit travel notification
		 * @param {Object} - countryObject
		 */
		setCountryObject: function(countryList) {
			var self = this
			countryList.forEach(
				function(element) {
					self.countries[element.id] = {
						"name": element.Name
					}
				})
		},
		/**
		 * Method to set statesObject for create/edit travel notification
		 * @param {Object} - stateObject(regionObject)
		 */
		setStatesObject: function(stateList) {
			var self = this
			stateList.forEach(
				function(element) {
					self.states[element.id] = {
						"name": element.Name,
						"country_id": element.Country_id
					}
				})
		},
		/**
		 * Method to set cityObject for create/edit travel notification
		 * @param {Object} - cityObject
		 */
		setCitiesObject: function(cityList) {
			var self = this
			cityList.forEach(
				function(element) {
					self.cities[element.id] = {
						"name": element.Name,
						"state_id": element.Region_id,
						"country_id": element.Country_id
					}
				})
		},
		/**
		 * Method to set default data for create/edit travel notification
		 */
		setDefaultDataForNotifications: function() {
			var self = this;
			if (this.notificationObject.isEditFlow === true) {
				this.view.flxOtherDestinations.setVisibility(true);
				this.view.segDestinations.setData(JSON.parse(JSON.stringify(this.travelPlanDestinationList)))
				this.view.lblRequestID.setVisibility(true);
				this.view.lblRequestNo.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				//  this.view.lblManageTravelPlans.text = kony.i18n.getLocalizedString('i18n.CardManagement.AddNewTravelPlan');
				// this.view.flxMangeTravelPlans.onClick = function () {
				//     self.notificationObject.isEditFlow = false;
				//     self.navigateToAddTravelNotification();
				// }
				//  this.view.myCards.lblMyCardsHeader.text = kony.i18n.getLocalizedString('i18n.CardManagement.editTravelPlan');
				//self.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString('i18n.CardManagement.editTravelPlan'));
				FormControllerUtility.enableButton(this.view.btnContinue);
				//this.view.lblMyCardsHeader.text = kony.i18n.getLocalizedString('i18n.CardManagement.editTravelPlan');
			} else {
				this.view.txtDestination.text = "";
				this.view.txtPhoneNumber.text = "";
				this.view.txtareaUserComments.text = "";
				this.view.segDestinations.setData([]);
				this.view.segDestinationList.setData([]);
				this.notificationObject.selectedcards = [];
				this.blockFutureDateSelection(self.view.calFrom);
				CommonUtilities.blockFutureDate(this.view.calTo, 60, kony.os.date());
				this.view.calFrom.dateComponents = self.getDateComponents(kony.os.date(applicationManager.getFormatUtilManager().getDateFormat()));
				this.view.calTo.dateComponents = self.getDateComponents(kony.os.date(applicationManager.getFormatUtilManager().getDateFormat()));
				this.view.calFrom.dateEditable = false;
				this.view.calTo.dateEditable = false;
				this.view.txtPhoneNumber.placeholder = kony.i18n.getLocalizedString("i18n.PayAPerson.EnterPhoneNumber");
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				// this.view.lblManageTravelPlans.text = kony.i18n.getLocalizedString('i18n.CardManagement.ManageTravelPlans');
				//this.view.flxMangeTravelPlans.onClick = self.fetchTravelNotifications.bind(this);
				// self.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString('i18n.CardManagement.CreateTravelPlan'));
				//this.view.lblMyCardsHeader.text = kony.i18n.getLocalizedString('i18n.CardManagement.CreateTravelPlan');
			}
		},
		getDateComponents: function(dateString) {
			var dateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase())
			return [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
		},
		/**
		 * Method to block future date selection for create/edit travel notification screen
		 * @param {Object} - widget reference
		 */
		blockFutureDateSelection: function(widgetId) {
			CommonUtilities.blockFutureDate(this.view.calFrom, 60, kony.os.date());
		},
		setBreadCrumbAndHeaderDataForCardOperation: function(header) {
			this.view.breadcrumb.setVisibility(false);
			this.view.breadcrumb.setBreadcrumbData([{
				'text': kony.i18n.getLocalizedString("i18n.CardManagement.ManageCard"),
				'callback': kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController)
			}, {
				'text': header,
				'callback': null
			}]);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.confirmHeaders.lblHeading.text = header;
			this.view.title = header;

			let h1TagsArr = [
				"i18n.CardManagement.LockCard",
				"i18n.CardManagement.UnlockCard",
				"i18n.CardManagement.ChangeCardPin",
				"i18n.CardManagement.cardReplacement",
				"i18n.CardManagement.LostOrStolen"
			];
			if (h1TagsArr.some((str) => kony.i18n.getLocalizedString(str) === header)) {
				this.view.CardLockVerificationStep.confirmHeaders.setVisibility(false);
				this.view.CardLockVerificationStep.flxCardHeader.setVisibility(true);
				this.view.CardLockVerificationStep.lblCardHeader.text = header;
			} else {
				this.view.CardLockVerificationStep.confirmHeaders.setVisibility(true);
				this.view.CardLockVerificationStep.flxCardHeader.setVisibility(false);
			}
		},

		/**
		 * Method to get details of the notification for creating/updating travel notification
		 */
		getDetailsOfNotification: function(isEditFlow) {
			var self = this;
			var selectedcards = self.notificationObject.selectedcards;
			var requestId = this.notificationObject.requestId;
			self.notificationObject = {
				'fromDate': this.view.calFrom.formattedDate,
				'toDate': this.view.calTo.formattedDate,
				'phone': this.view.txtPhoneNumber.text,
				'notes': this.view.txtareaUserComments.text,
				'locations': self.getSelectedLocations()
			};
			if (selectedcards) {
				self.notificationObject.selectedcards = selectedcards;
			}
			if (isEditFlow) {
				self.notificationObject.isEditFlow = isEditFlow;
				self.notificationObject.requestId = requestId
			}
			return self.notificationObject;
		},
		/**
		 * Method to get selected locations for create/edit travel notification
		 * @returns {Object} selectedLocations object
		 */
		getSelectedLocations: function() {
			var locationArray = this.view.segDestinations.data;
			var selectedLocations = [];
			for (var key in locationArray) {
				selectedLocations.push(locationArray[key].lblPlace.text);
			}
			return selectedLocations;
		},
		/**
		 * Method to set country,regions(states),city in drop down for create/edit travel notification
		 */
		setFlowActions: function() {
			var scope = this;
			this.view.txtDestination.onKeyUp = function() {
				scope.showTypeAhead();
			};
			this.view.segDestinationList.onRowClick = function() {
				var rowNo = scope.view.segDestinationList.selectedRowIndex[1];
				var dest = scope.view.segDestinationList.data[rowNo].lblListBoxValues;
				scope.view.txtDestination.text = dest.text;
				scope.view.txtDestination.onKeyUp = function() {
					scope.showTypeAhead();
					if (dest === scope.view.txtDestination.text) {
						scope.enableAddButton();
					} else {
						scope.disableAddButton();
					}
				}
				scope.enableAddButton();
				scope.view.flxDestinationList.setVisibility(false);
				scope.view.txtDestination.accessibilityConfig = {
					a11yARIA: {
						"aria-labelledby": "lblDestination",
						"aria-required": true,
						"aria-haspopup": "true",
						"role": "combobox",
						"aria-expanded": false,
						"aria-autocomplete": "none",
						"aria-controls": "segDestinationList",
					}
				}
				scope.view.txtDestination.setActive(true);
			};
		},
		/**
		 * Method to show country,regions(states),city in drop down for create/edit travel notification
		 */
		showTypeAhead: function() {
			var countryData = [];
			var newData = {};
			var stateId;
			var countryId;
			var key;
			var dataMap = {
				"flxCustomListBox": "flxCustomListBox",
				"lblListBoxValues": "lblListBoxValues"
			};
			var tbxText = this.toTitleCase(this.view.txtDestination.text);
			if (tbxText.length > 2) {
				for (key in this.cities) {
					if (this.cities[key].name.indexOf('' + tbxText) === 0) {
						stateId = this.cities[key].state_id;
						countryId = this.cities[key].country_id;
						newData = {
							"countryId": countryId,
							"lblListBoxValues": {
								"text": this.countries[countryId].name + ", " + this.states[stateId].name + ", " + this.cities[key].name,
								"accessibilityconfig": {
									"a11yLabel": this.countries[countryId].name + ", " + this.states[stateId].name + ", " + this.cities[key].name
								}
							},
							"flxCustomListBox": {
								"accessibilityConfig": {
									"a11yLabel": this.countries[countryId].name + ", " + this.states[stateId].name + ", " + this.cities[key].name,
									"a11yARIA": {
										"tabindex": 0
									}
								}
							},
							"template": "flxCustomListBox"
						};
						countryData.push(newData);
					}
				}
				for (key in this.states) {
					if (this.states[key].name.indexOf('' + tbxText) === 0) {
						countryId = this.states[key].country_id;
						newData = {
							"countryId": countryId,
							"lblListBoxValues": {
								"text": this.countries[countryId].name + ", " + this.states[key].name,
								"accessibilityconfig": {
									"a11yLabel": this.countries[countryId].name + ", " + this.states[key].name
								}
							},
							"flxCustomListBox": {
								"accessibilityConfig": {
									"a11yLabel": this.countries[countryId].name + ", " + this.states[key].name,
									"a11yARIA": {
										"tabindex": 0
									}
								}
							},
							"template": "flxCustomListBox"
						};
						countryData.push(newData);
					}
				}
				for (key in this.countries) {
					if (this.countries[key].name.indexOf('' + tbxText) === 0) {
						newData = {
							"countryId": countryId,
							"lblListBoxValues": {
								"text": "" + this.countries[key].name,
								"accessibilityconfig": {
									"a11yLabel": "" + this.countries[key].name
								}
							},
							"flxCustomListBox": {
								"accessibilityConfig": {
									"a11yLabel": "" + this.countries[key].name,
									"a11yARIA": {
										"tabindex": 0
									}
								}
							},
							"template": "flxCustomListBox"
						};
						countryData.push(newData);
					}
				}
				this.view.segDestinationList.widgetDataMap = dataMap;
				for (i in countryData)
					countryData[i].flxCustomListBox.onKeyPress = this.onSegKeyPressCallBack;
				this.view.segDestinationList.setData(countryData);
				this.view.flxDestinationList.setVisibility(true);
				this.view.txtDestination.accessibilityConfig = {
					a11yARIA: {
						"aria-labelledby": "lblDestination",
						"aria-required": true,
						"aria-haspopup": "true",
						"role": "combobox",
						"aria-expanded": true,
						"aria-autocomplete": "none",
						"aria-controls": "segDestinationList",
					}
				}
				// if (this.view.lblWarningTravelPlan.isVisible === true)
				//     this.view.flxDestinationList.top = 275 + "dp";
				// else if (this.view.lblRequestID.isVisible === true && this.view.lblRequestNo.isVisible === true)
				//     this.view.flxDestinationList.top = 320 + "dp";
				// else
				//     this.view.flxDestinationList.top = 245 + "dp";
				this.view.forceLayout();
			} else {
				this.view.flxDestinationList.setVisibility(false);
				this.view.txtDestination.accessibilityConfig = {
					a11yARIA: {
						"aria-labelledby": "lblDestination",
						"aria-required": true,
						"aria-haspopup": "true",
						"role": "combobox",
						"aria-expanded": false,
						"aria-autocomplete": "none",
						"aria-controls": "segDestinationList",
					}
				}
			}
			this.AdjustScreen();
		},
		onSegKeyPressCallBack: function(eventObject, eventPayload, context) {
			var scopeObj = this;
			if (eventPayload.keyCode === 27) {
				scopeObj.view.flxDestinationList.setVisibility(false);
				scopeObj.view.flxDestination.setActive(true);
				scopeObj.view.txtDestination.accessibilityConfig = {
					a11yARIA: {
						"aria-labelledby": "lblDestination",
						"aria-required": true,
						"aria-haspopup": "true",
						"role": "combobox",
						"aria-expanded": true,
						"aria-autocomplete": "none",
						"aria-controls": "segDestinationList",
					}
				};
			} else if (eventPayload.keyCode === 9) {
				if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
					eventPayload.preventDefault();
					if (context.rowIndex === 0 && context.sectionIndex === 0) {
						scopeObj.view.flxDestinationList.setVisibility(false);
						scopeObj.view.txtDestination.accessibilityConfig = {
							a11yARIA: {
								"aria-labelledby": "lblDestination",
								"aria-required": true,
								"aria-haspopup": "true",
								"role": "combobox",
								"aria-expanded": true,
								"aria-autocomplete": "none",
								"aria-controls": "segDestinationList",
							}
						};
						scopeObj.view.flxDestination.setActive(true);
					} else if (context.rowIndex > 0) {
						scopeObj.view.segDestinationList.setActive((context.rowIndex - 1), 0, "flxCustomListBox");
					}
				} else if (context.rowIndex === context.widgetInfo.data.length - 1) {
					scopeObj.view.flxDestinationList.setVisibility(false);
					eventPayload.preventDefault();
					scopeObj.view.txtDestination.accessibilityConfig = {
						a11yARIA: {
							"aria-labelledby": "lblDestination",
							"aria-required": true,
							"aria-haspopup": "true",
							"role": "combobox",
							"aria-expanded": true,
							"aria-autocomplete": "none",
							"aria-controls": "segDestinationList",
						}
					};
					scopeObj.view.flxDestination.setActive(true);
				}
			}
		},
		/**
		 * Method to enable Add button on create/edit travel notification screen
		 */
		enableAddButton: function() {
			var self = this;
			if (this.view.segDestinations.data.length < applicationManager.getConfigurationManager().numberOfLocations) {
				this.view.lblAnotherDestination.skin = "skn3343a8labelSSPRegular";
				this.view.flxAddFeatureRequestandimg.onClick = self.addAddressTOList;
				this.view.flxAddFeatureRequestandimg.accessibilityConfig = {
					"a11yLabel": "Add Destination",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				}
			}
		},
		/**
		 * Method to disable Add button on create/edit travel notification screen
		 */
		disableAddButton: function() {
			this.view.lblAnotherDestination.skin = 'sknlbla0a0a015px';
			this.view.flxAddFeatureRequestandimg.onClick = null;
			this.view.flxAddFeatureRequestandimg.accessibilityConfig = {
				"a11yLabel": "Unavailable Add Destination",
				"a11yARIA": {
					"tabindex": -1,
					"role": "button"
				}
			}
		},
		/**
		 * changeRowTemplate - Method to toggle row template(btween selected and unselected templates for My Cards) for selected row of segment
		 */
		changeRowNewTemplate: function(dataItem, action) {
    var self = this;
    this.view.myCards.flxCards.setVisibility(false);
    var segId;
    if (dataItem.cardType == "Prepaid") segId = "segPrepaidCards";
    else if (dataItem.cardType == "Credit") segId = "segCreditCards";
    else segId = "segDebitCards";

    var rowIndex = dataItem.row;
    var data = this.view.myCards[segId].data || [];

    for (var i = 0; i < data.length; i++) {
        if (i !== rowIndex) continue;

        // Determine current state if action not provided
        var isCollapsed = data[i].imgCollapse && data[i].imgCollapse.src === ViewConstants.IMAGES.ARRAOW_DOWN;
        var doExpand;
        if (action === "expand") doExpand = true;
        else if (action === "collapse") doExpand = false;
        else doExpand = isCollapsed; // toggle if no explicit action

        if (doExpand) {
            // EXPAND
            data[i].imgCollapse = {
                "src": ViewConstants.IMAGES.ARRAOW_UP,
                "accessibilityconfig": { "a11yLabel": "View Details" }
            };
            data[i].flxCollapse.accessibilityConfig = {
                "a11yLabel": "Hide details for card " + data[i].lblCardHeader.text,
                "a11yARIA": { "aria-expanded": true, "role": "button" }
            };

            // show View Less, hide View More
            data[i].btnViewMore = {
                "text": "View More...",
                "isVisible": false,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowNewTemplate.bind(self, dataItem, "expand")), // keep expand if clicked again
                "accessibilityConfig": {
                    "a11yLabel": "Show more details for card " + dataItem.productName,
                    "a11yARIA": { "role": "button", "aria-expanded": false }
                }
            };
            data[i].btnViewLess = {
                "text": "View Less...",
                "isVisible": true,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowNewTemplate.bind(self, dataItem, "collapse")), // explicit collapse
                "accessibilityConfig": {
                    "a11yLabel": "Hide details for card " + dataItem.productName,
                    "a11yARIA": { "role": "button", "aria-expanded": true }
                }
            };

            data[i].flxDetailsRow4 = { "isVisible": true };
            data[i].flxDetailsRow5 = { "isVisible": true };
            if (segId == "segCreditCards") {
                data[i].flxMyCards = { "height": "360dp" };
                data[i].flxCardDetails = { "height": "300dp" };
                data[i].flxDetailsRow7 = { "isVisible": true };
                data[i].flxDetailsRow8 = { "isVisible": true };
                data[i].flxDetailsRow9 = { "isVisible": true };
            } else {
                data[i].flxMyCards = { "height": "300dp" };
                data[i].flxCardDetails = { "height": "190dp" };
                data[i].flxDetailsRow7 = { "isVisible": false };
                data[i].flxDetailsRow8 = { "isVisible": false };
                data[i].flxDetailsRow9 = { "isVisible": false };
            }
            if (segId !== "segDebitCards") data[i].flxDetailsRow6 = { "isVisible": true };
            else data[i].flxDetailsRow6 = { "isVisible": false };
            data[i].flxActions = { "height": "250dp" };

        } else {
            // COLLAPSE
            data[i].imgCollapse = {
                "src": ViewConstants.IMAGES.ARRAOW_DOWN,
                "accessibilityconfig": { "a11yLabel": "View Details" }
            };
            data[i].flxCollapse.accessibilityConfig = {
                "a11yLabel": "Show details for card " + data[i].lblCardHeader.text,
                "a11yARIA": { "aria-expanded": false, "role": "button" }
            };

            // show View More, hide View Less
            data[i].btnViewMore = {
                "text": "View More...",
                "isVisible": (dataItem.cardStatus === "Active") ? true : false,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowNewTemplate.bind(self, dataItem, "expand")),
                "accessibilityConfig": {
                    "a11yLabel": "Show more details for card " + dataItem.productName,
                    "a11yARIA": { "role": "button", "aria-expanded": false }
                }
            };
            data[i].btnViewLess = {
                "text": "View Less...",
                "isVisible": false,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowNewTemplate.bind(self, dataItem, "collapse")),
                "accessibilityConfig": {
                    "a11yLabel": "Hide details for card " + dataItem.productName,
                    "a11yARIA": { "role": "button", "aria-expanded": false }
                }
            };

            data[i].flxDetailsRow4 = { "isVisible": false };
            data[i].flxDetailsRow5 = { "isVisible": false };
            data[i].flxDetailsRow6 = { "isVisible": false };
            data[i].flxDetailsRow7 = { "isVisible": false };
            data[i].flxDetailsRow8 = { "isVisible": false };
            data[i].flxDetailsRow9 = { "isVisible": false };

            data[i].flxMyCards = { "height": "200dp" };
            data[i].flxCardDetails = { "height": "100dp" };
            data[i].flxActions = { "height": "110dp" };
        }

        // update row
        try {
            this.view.myCards[segId].setDataAt(data[rowIndex], rowIndex);
        } catch (e) {
            // fallback
            data[rowIndex] = data[i];
            this.view.myCards[segId].setData(data);
        }
        this.view.forceLayout();
        this.AdjustScreen();
    }
},

changeRowTemplate: function(dataItem, action) {
    var self = this;
    this.view.myCards.flxCards.setVisibility(false);
    var segId;
    if (dataItem.cardType == "Debit") segId = "segDebitCards";
    else if (dataItem.cardType == "Credit") segId = "segCreditCards";
    else segId = "segPrepaidCards";

    var rowIndex = dataItem.row;
    var data = this.view.myCards[segId].data || [];

    for (var i = 0; i < data.length; i++) {
        if (i !== rowIndex) continue;

        var isCollapsed = data[i].imgCollapse && data[i].imgCollapse.src === ViewConstants.IMAGES.ARRAOW_DOWN;
        var doExpand;
        if (action === "expand") doExpand = true;
        else if (action === "collapse") doExpand = false;
        else doExpand = isCollapsed;

        if (doExpand) {
            // EXPAND (same pattern as above but adjusted for this template)
            data[i].imgCollapse = { "src": ViewConstants.IMAGES.ARRAOW_UP, "accessibilityconfig": { "a11yLabel": "View Details" } };
            data[i].flxCollapse.accessibilityConfig = {
                "a11yLabel": "Hide details for card " + data[i].lblCardHeader.text,
                "a11yARIA": { "aria-expanded": true, "role": "button" }
            };

            data[i].flxDetailsRow4 = { "isVisible": true };
            data[i].flxDetailsRow5 = { "isVisible": true };

            data[i].btnViewMore = {
                "text": "View More...",
                "isVisible": false,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowTemplate.bind(self, dataItem, "expand")),
                "accessibilityConfig": { "a11yLabel": "Show more details for card " + dataItem.productName, "a11yARIA": { "role": "button", "aria-expanded": false } }
            };
            data[i].btnViewLess = {
                "text": "View Less...",
                "isVisible": true,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowTemplate.bind(self, dataItem, "collapse")),
                "accessibilityConfig": { "a11yLabel": "Hide details for card " + dataItem.productName, "a11yARIA": { "role": "button", "aria-expanded": true } }
            };

            if (segId == "segCreditCards") {
                data[i].flxMyCards = { "height": "360dp" };
                data[i].flxCardDetails = { "height": "300dp" };
                data[i].flxDetailsRow7 = { "isVisible": true };
                data[i].flxDetailsRow8 = { "isVisible": true };
                data[i].flxDetailsRow9 = { "isVisible": true };
            } else {
                data[i].flxMyCards = { "height": "300dp" };
                data[i].flxCardDetails = { "height": "190dp" };
                data[i].flxDetailsRow7 = { "isVisible": false };
                data[i].flxDetailsRow8 = { "isVisible": false };
                data[i].flxDetailsRow9 = { "isVisible": false };
            }
            if (segId !== "segDebitCards") data[i].flxDetailsRow6 = { "isVisible": true };
            else data[i].flxDetailsRow6 = { "isVisible": false };
            data[i].flxActions = { "height": "250dp" };

        } else {
            // COLLAPSE
            data[i].imgCollapse = { "src": ViewConstants.IMAGES.ARRAOW_DOWN, "accessibilityconfig": { "a11yLabel": "View Details" } };
            data[i].flxCollapse.accessibilityConfig = {
                "a11yLabel": "Show details for card " + data[i].lblCardHeader.text,
                "a11yARIA": { "aria-expanded": false, "role": "button" }
            };

            data[i].flxDetailsRow4 = { "isVisible": false };
            data[i].flxDetailsRow5 = { "isVisible": false };
            data[i].flxDetailsRow6 = { "isVisible": false };
            data[i].flxDetailsRow7 = { "isVisible": false };
            data[i].flxDetailsRow8 = { "isVisible": false };
            data[i].flxDetailsRow9 = { "isVisible": false };

            data[i].btnViewMore = {
                "text": "View More...",
                "isVisible": (dataItem.cardStatus === "Active") ? true : false,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowTemplate.bind(self, dataItem, "expand")),
                "accessibilityConfig": { "a11yLabel": "Show more details for card " + dataItem.productName, "a11yARIA": { "role": "button", "aria-expanded": false } }
            };
            data[i].btnViewLess = {
                "text": "View Less...",
                "isVisible": false,
                "onClick": (kony.application.getCurrentBreakpoint() === 640)
                    ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile)
                    : (self.changeRowTemplate.bind(self, dataItem, "collapse")),
                "accessibilityConfig": { "a11yLabel": "Hide details for card " + dataItem.productName, "a11yARIA": { "role": "button", "aria-expanded": false } }
            };

            data[i].flxMyCards = { "height": "200dp" };
            data[i].flxCardDetails = { "height": "100dp" };
            data[i].flxActions = { "height": "110dp" };
        }

        // update row
        try {
            this.view.myCards[segId].setDataAt(data[rowIndex], rowIndex);
        } catch (e) {
            data[rowIndex] = data[i];
            this.view.myCards[segId].setData(data);
        }
        this.view.forceLayout();
        this.AdjustScreen();
    }
},

			
		/**
		 * Method that hides all right side flexes in frmCardManagement.
		 */
		hideAllCardManagementRightViews: function() {
			this.view.CardLockVerificationStep.flxVerifyByOptions.setVisibility(false);
			this.view.CardLockVerificationStep.flxVerifyBySecureAccessCode.setVisibility(false);
			this.view.CardLockVerificationStep.flxVerifyBySecurityQuestions.setVisibility(false);
			this.view.CardLockVerificationStep.flxDeactivateCard.setVisibility(false);
			// this.view.CardLockVerificationStep.flxTravelNotification.setVisibility(false);
			this.view.CardLockVerificationStep.flxChangeCardPin.setVisibility(false);
			this.view.CardLockVerificationStep.flxConfirmPIN.setVisibility(false);
			this.view.CardLockVerificationStep.flxCardReplacement.setVisibility(false);
		},
		/**
		 * Method to show pop up for delete notification and register onClicks for custom pop up
		 * @param {String} notificationId id of notification that is to be deleted
		 */
		deleteNotification: function(notificationId) {
			var self = this;
			this.view.flxAlert.setVisibility(true);
			// this.view.CustomAlertPopup.lblHeading.setFocus(true);
			// var height = this.view.customheader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
			// this.view.flxAlert.height = height + "dp";
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			// this.view.CustomAlertPopup.lblPopupMessage.text = (kony.i18n.getLocalizedString("i18n.CardManagement.deleteTravelMsg") + " " + notificationId + " ?");
			this.view.CustomAlertPopup.lblPopupMessage.text = 'Are you sure you want to delete this Request ' + notificationId + " ?";
			this.view.CustomAlertPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount");
			this.view.CustomAlertPopup.lblHeading.setActive(true);
			this.view.flxAlert.isModalContainer = true;
			this.view.CustomAlertPopup.lblHeading.accessibilityConfig = {
				"a11yLabel": " ",
				"tagName": "span",
				"a11yARIA": {
					"tabindex": -1
				}
			}
			this.view.CustomAlertPopup.btnYes.accessibilityConfig = {
					"a11yLabel": "Yes, delete this request",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.CustomAlertPopup.btnNo.accessibilityConfig = {
					"a11yLabel": "No. Don�t delete this request",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.CustomAlertPopup.btnYes.onClick = function() {
					FormControllerUtility.showProgressBar(self.view);
					self.view.flxAlert.setVisibility(false);
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.deleteNotification(notificationId);
				};
			var widget = arguments;
			this.view.CustomAlertPopup.flxCross.onClick = function() {
				self.view.flxAlert.isVisible = false;
				if (widget !== null && widget[2].rowIndex) self.view.myCards.segDebitCards.setActive(widget[2].rowIndex, 0, "flxMyCardsCollapsed.btnAction2");
				if (widget[2].rowIndex === 0) widget[2].widgetInfo.setActive(widget[2].rowIndex, 0, "flxMyCardsCollapsed.btnAction2");
			};
			this.view.CustomAlertPopup.btnNo.onClick = function() {
				self.view.flxAlert.isVisible = false;
				if (widget !== null && widget[2].rowIndex) self.view.myCards.segDebitCards.setActive(widget[2].rowIndex, 0, "flxMyCardsCollapsed.btnAction2");
				if (widget[2].rowIndex === 0) widget[2].widgetInfo.setActive(widget[2].rowIndex, 0, "flxMyCardsCollapsed.btnAction2");
			};
			this.view.CustomAlertPopup.onKeyPress = function(eventObject, eventPayload) {
				if (eventPayload.keyCode === 27) {
					self.view.flxAlert.isVisible = false;
					if (widget[2].rowIndex === 0) widget[2].widgetInfo.setActive(widget[2].rowIndex, 0, "flxMyCardsCollapsed.btnAction2");
					else
						self.view.myCards.segDebitCards.setActive(widget[2].rowIndex, 0, "flxMyCardsCollapsed.btnAction2");
				}
			};
			this.view.forceLayout();
			this.view.CustomAlertPopup.lblHeading.setActive(true);
		},
		/**
		 * Method to validate fromDate and toDate for create/edit travel notification screen
		 */
		validateDateRange: function() {
			var startDateObject = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(this.view.calFrom.formattedDate, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
			var endDateObject = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(this.view.calTo.formattedDate, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
			if (startDateObject < endDateObject) {
				return true;
			}
			return false;
		},
		/**
		 * Method to show cards selection screen
		 * @param {Object} - cards object
		 */
		showSelectCardScreen: function(cards) {
			var self = this;
			//var combinedUser = applicationManager.getConfigurationManager().isCombinedUser==="true";
			var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
			var internationEligibleCards = [];
			if (this.isInternationalPlan()) {
				cards.forEach(function(item) {
					if (item.isInternational == "true")
						internationEligibleCards.push(item);
				});
				cards = internationEligibleCards;
			}
			if (cards.length > 0) {
				this.view.myCards.flxNoError.setVisibility(false);
				this.view.flxMyCards.setVisibility(true);
				this.view.flxMyCards.top = "0dp";
				var flxCardSkin = (kony.application.getCurrentBreakpoint() === 640) ? "sknFlxffffffRoundedBorder" : "sknFlxffffffBorderRoundedLeftRed";
				// this.view.flxMyCards.skin= flxCardSkin;
				this.view.flxEligibleCardsButtons.skin = flxCardSkin;
				this.view.myCards.segDebitCards.setVisibility(true);
				this.view.myCards.lblMyCardsHeader.left = "20dp";
				//  this.view.flxTravelPlan.setVisibility(false);
				var widgetDataMap = {
					"imgCard": "imgCard",
					"lblTravelNotificationEnabled": "lblTravelNotificationEnabled",
					"flxCheckBox": "flxCheckBox",
					"lblCheckBox": "lblCheckBox",
					"flxCardDetails": "flxCardDetails",
					"flxDetailsRow1": "flxDetailsRow1",
					"flxDetailsRow2": "flxDetailsRow2",
					"flxDetailsRow3": "flxDetailsRow3",
					"lblKey1": "lblKey1",
					"lblKey2": "lblKey2",
					"lblKey3": "lblKey3",
					"rtxValue1": "rtxValue1",
					"rtxValue2": "rtxValue2",
					"rtxValue3": "rtxValue3",
					"lblSeparator2": "lblSeparator2",
					"lblSeperator3": "lblSeperator3",
					"lblCardsSeperator": "lblCardsSeperator",
					"imgChevron": "imgChevron",
					"flxIcon": "flxIcon",
					"imgIcon": "imgIcon"
				};
				var cardSegData = [];
				var card = {};
				cards.forEach(function(dataItem) {
					card = {
						"lblCardsSeperator": {
							"text": ".",
							"height": "105px"
						},
						"lblSeperator3": {
							"text": "a",
							"height": "1"
						},
						"imgCard": {
							"src": dataItem.cardimage //self.getImageForCard(dataItem.cardProductName),
						},
						"flxCheckBox": {
							"accessibilityConfig": {
								"a11yLabel": "Card " + dataItem.cardProductName,
								"a11yARIA": {
									"tabindex": 0,
									"role": "checkbox",
									"aria-checked": false
								}
							},
							"onClick": function(eventobj, xcord, ycord, context) {
								self.toggleSelectedCardCheckbox()
							}.bind(self)
						},
						//                         "flxCheckBox": {
						//                             "onClick": self.toggleSelectedCardCheckbox.bind(self),
						//                         },
						"lblCheckBox": {
							"text": self.isCardSelected(dataItem),
							"accessibilityconfig": {
								"a11yLabel": self.isCardSelected(dataItem)
							}
						},
						"lblKey1": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.cardName"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.cardName")
							}
						},
						"lblKey2": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber")
							}
						},
						"lblKey3": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.internationalEligible"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.internationalEligible")
							}
						},
						"rtxValue1": {
							"text": dataItem.cardProductName,
							//"left": combinedUser ? "215dp" : "184dp" ,
							"left": this.profileAccess === "both" ? "215dp" : "184dp",
							"accessibilityconfig": {
								"a11yLabel": dataItem.cardProductName
							}
						},
						"rtxValue2": {
							"text": dataItem.maskedCardNumber,
							"accessibilityconfig": {
								"a11yLabel": dataItem.maskedCardNumber
							}
						},
						"rtxValue3": {
							"text": dataItem.isInternational === "false" ? kony.i18n.getLocalizedString('i18n.common.no') : kony.i18n.getLocalizedString('i18n.common.yes'),
							"accessibilityconfig": {
								"a11yLabel": dataItem.isInternational === "false" ? kony.i18n.getLocalizedString('i18n.common.no') : kony.i18n.getLocalizedString('i18n.common.yes')
							}
						},
						"flxIcon": {
							//"isVisible": combinedUser
							"isVisible": this.profileAccess === "both" ? true : false
						},
						"imgIcon": {
							"text": dataItem.isTypeBusiness === "1" ? "r" : "s"
						},
						"template": "flxSelectFromEligibleCards"
					};
					cardSegData.push(card);
				});
				this.view.btnCardsContinue.accessibilityConfig = {
						"a11yLabel": "Continue to confirmation",
						"a11yARIA": {
							"tabindex": 0,
							"role": "button"
						}

					},
					this.view.btnCardsCancel.accessibilityConfig = {
						"a11yLabel": "Cancel Card Selection",
						"a11yARIA": {
							"tabindex": 0,
							"role": "button"
						}

					},
					this.view.myCards.segDebitCards.widgetDataMap = widgetDataMap;
				this.view.myCards.segDebitCards.setData(cardSegData);
				this.view.flxEligibleCardsButtons.setVisibility(true);
				this.view.myCards.flxApplyForCards.setVisibility(false);
				this.view.btnCardsCancel.onClick = this.showNotificationToModify.bind(this);
				// self.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString('i18n.CardManagement.ManageTravelPlans'));
				this.view.btnCardsContinue.onClick = function() {
					self.getSelectedCards();
					self.showConfirmationScreen(self.notificationObject);
				}
			} else {
				this.view.myCards.flxNoError.setVisibility(true);
				this.view.myCards.flxNoError.skin = "slfBoxffffffB1R5";
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.CardManagement.noInternationalCardError');
				this.view.flxMyCards.setVisibility(true);
				this.view.flxMyCards.top = "0dp";
				this.view.flxMyCards.skin = "sknFlxffffffBorderRoundedLeftRed";
				this.view.myCards.segDebitCards.setVisibility(false);
				// this.view.flxTravelPlan.setVisibility(false);
				this.view.myCards.flxApplyForCards.setVisibility(true);
				this.view.flxEligibleCardsButtons.setVisibility(false);
				this.view.myCards.btnApplyForCard.setVisibility(true);
				this.view.myCards.btnApplyForCard.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				this.view.myCards.btnApplyForCard.onClick = this.showNotificationToModify.bind(this);
			}
			this.view.forceLayout();
			this.AdjustScreen();
			CommonUtilities.hideProgressBar(this.view);
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},
		/**
		 * Method to get selected cards for creating/editing travel notification
		 */
		getSelectedCards: function() {
			var cards = this.view.myCards.segDebitCards.data;
			var selectedcards = []
			cards.forEach(function(dataItem) {
				if (dataItem.lblCheckBox.text === "C") {
					if (this.profileAccess === "both") {
						//if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
						if (dataItem.imgIcon.text === "s" || dataItem.imgIcon.text === "r") {
							selectedcards.push({
								"name": dataItem.rtxValue1.text,
								"number": dataItem.rtxValue2.text,
								"icon": dataItem.imgIcon.text
							});
						}
					} else {
						selectedcards.push({
							"name": dataItem.rtxValue1.text,
							"number": dataItem.rtxValue2.text
						});
					}
				}
			});
			this.notificationObject.selectedcards = selectedcards;
		},
		/**
		 * Method to check if travel notification is international travel notification
		 */
		isInternationalPlan: function() {
			var userCountry;
			var Country = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchUserAddresses();
			Country.forEach(function(dataItem) {
				if (dataItem.isPrimary === "true") userCountry = dataItem.CountryName;
			});
			var selectedCountries = this.notificationObject.locations.map(function(item) {
				var arr = item.split(",");
				return arr[0];
			});
			for (var key in selectedCountries) {
				if (selectedCountries[key] === userCountry) return false;
			}
			return true;
		},
		/**
		 * Method to show confirmation screen for create/edit travel notification
		 */
		showEMIConfirmationScreen: function(data) {
			var self = this;
			this.view.btnCancelEMI.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
			this.view.btnCancelEMI.onClick = function() {
				self.showEMIPopUp();
			}
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.btnModifyEMI.text = kony.i18n.getLocalizedString('i18n.common.modifiy');
			this.view.btnModifyEMI.onClick = this.showEMIToModify.bind(this);
			this.view.btnConfirmEMI.text = kony.i18n.getLocalizedString('i18n.common.confirm');
			this.view.btnConfirmEMI.onClick = function() {
				FormControllerUtility.showProgressBar(self.view);
				var navManager = applicationManager.getNavigationManager();
				var authCode = navManager.getCustomInfo("EMI_authcode");
				param = {
					"authCode": authCode
				}
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getConvertEMIRequestDetail(data);
			}
			this.view.btnConfirmEMI.accessibilityConfig = {
					"a11yLabel": "Continue to Acknowledgement",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.btnModifyEMI.accessibilityConfig = {
					"a11yLabel": "Modify Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.btnCancelEMI.accessibilityConfig = {
					"a11yLabel": "Cancel Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.forceLayout();
			this.AdjustScreen();
		},
		showEMIToModify: function() {
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(true);
		},
		showEMIPopUp: function() {
			var self = this;
			this.view.flxAlert.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
			this.view.flxAlert.setVisibility(true);
			//this.view.CustomAlertPopup.lblHeading.setFocus(true);
			this.view.CustomAlertPopup.lblHeading.setActive(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CustomAlertPopup.lblPopupMessage.text = kony.i18n.getLocalizedString('i18n.CardManagement.cancelCreateMsg');
			this.view.CustomAlertPopup.isModalContainer = true;
			this.view.CustomAlertPopup.lblHeading.text = "Cancel";
			this.view.CustomAlertPopup.btnYes.accessibilityConfig = {
					"a11yLabel": "Yes, Cancel this Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.CustomAlertPopup.btnNo.accessibilityConfig = {
					"a11yLabel": "No, Don't Cancel this Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.CustomAlertPopup.btnYes.onClick = function() {
					self.view.flxConvertToEMIConfirm.setVisibility(false);
					self.view.flxConvertToEMI.setVisibility(false);
					self.view.flxAlert.setVisibility(false);
					self.notificationObject = {};
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
				}
			this.view.CustomAlertPopup.btnNo.onClick = function() {
				self.view.flxAlert.setVisibility(false);
				self.view.btnEMICancelPlan.setActive(true);
			}
			this.view.CustomAlertPopup.flxCross.onClick = function() {
				self.view.flxAlert.setVisibility(false);
				self.view.btnEMICancelPlan.setActive(true);
			}
			this.view.CustomAlertPopup.onKeyPress = function(eventobject, eventPayload) {
				if (eventPayload.keyCode === 27) {
					self.view.flxAlert.setVisibility(false);
					self.view.btnEMICancelPlan.setActive(true);
				}
			}
		},
		showConfirmationScreen: function(data) {
			var self = this;
			var cards = "";
			this.view.flxConfirmBody.top = "2dp";
			this.view.flxActivateCard.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxCardVerification.setVisibility(false);
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxConfirm.setVisibility(true);
			this.view.flxDestination2.setVisibility(false);
			this.view.flxDestination3.setVisibility(false);
			this.view.flxDestination4.setVisibility(false);
			this.view.flxDestination5.setVisibility(false);
			this.view.flxErrorMessage.setVisibility(false);
			this.view.flxConfirmHeading.setVisibility(true);
			this.view.lblSeparator5.setVisibility(false);
			this.view.flxDownload.setVisibility(false);
			// self.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString('i18n.CardManagement.manageTravelPlanConfirmation'));
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblKey1.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedStartDate');
			this.view.rtxValue1.text = data.fromDate;
			this.view.lblKey2.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedEndDate');
			this.view.rtxValue2.text = data.toDate;
			this.view.lblDestination1.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination1');
			this.view.rtxDestination1.text = data.locations[0];
			if (data.locations[1]) {
				this.view.flxDestination2.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.lblDestination2.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination2');
				this.view.rtxDestination2.text = data.locations[1];
			}
			if (data.locations[2]) {
				this.view.flxDestination3.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.lblDestination3.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination3');
				this.view.rtxDestination3.text = data.locations[2];
			}
			if (data.locations[3]) {
				this.view.flxDestination4.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.lblDestination4.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination4');
				this.view.rtxDestination4.text = data.locations[3];
			}
			if (data.locations[4]) {
				this.view.flxDestination5.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.lblDestination5.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination5');
				this.view.rtxDestination5.text = data.locations[4];
			}
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblKey5.text = kony.i18n.getLocalizedString('i18n.ProfileManagement.PhoneNumber');
			this.view.rtxValue5.text = data.phone;
			this.view.lblKey6.text = kony.i18n.getLocalizedString('i18n.CardManagement.AddInformation');
			if (data.notes === undefined || data.notes === "")
				this.view.rtxValue6.text = "none";
			else
				this.view.rtxValue6.text = data.notes;
			this.view.lblKey4.text = kony.i18n.getLocalizedString('i18n.CardManagement.selectedCards');
			var cardSegData = [];
			for (var i = 0; i < data.selectedcards.length; i++) {
				if (data.selectedcards[i].icon) {
					if (data.selectedcards[i].icon == "s" || data.selectedcards[i].icon == "r") {
						var card = {};
						data.selectedcards.forEach(function(dataItem) {
							card = {
								"lblValue": {
									"text": dataItem.name + "-" + dataItem.number
								},
								"lblIcon": {
									"text": dataItem.icon,
									"Skin": "sknLblOLBFontIconsvs"
								}
							};
						});
						cardSegData.push(card);
					}
				}
			}
			if (cardSegData.length > 0) {
				this.view.segSelectedCards.setData(cardSegData);
				this.view.rtxValueA.setVisibility(false);
				this.view.flxCards.setVisibility(true);
			} else {
				data.selectedcards.map(function(dataItem) {
					cards = cards + dataItem.name + "-" + dataItem.number + "<br/>";
				});
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.rtxValueA.text = cards;
				this.view.rtxValueA.setVisibility(true);
				this.view.flxCards.setVisibility(false);
			}
			//             data.selectedcards.map(function(dataItem) {
			//                 cards = cards + dataItem.name + "-" + dataItem.number + "<br/>";
			//             });
			//             var accessibilityConfig=CommonUtilities.getaccessibilityConfig();
			this.view.btnCancelPlan.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
			this.view.btnCancelPlan.onClick = function() {
				self.showPopUp();
			}
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.btnModify.text = kony.i18n.getLocalizedString('i18n.common.modifiy');
			this.view.btnModify.onClick = this.showNotificationToModify.bind(this);
			this.view.btnConfirm.text = kony.i18n.getLocalizedString('i18n.common.confirm');
			if (this.notificationObject.isEditFlow) {
				this.view.btnConfirm.onClick = function() {
					FormControllerUtility.showProgressBar(self.view);
					// kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.updateTravelNotifications(self.notificationObject);
				}
			} else {
				this.view.btnConfirm.onClick = function() {
					FormControllerUtility.showProgressBar(self.view);
					//  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.createTravelNotification(self.notificationObject);
				}
			}
			this.view.btnConfirm.accessibilityConfig = {
					"a11yLabel": "Continue to Acknowledgement",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.btnModify.accessibilityConfig = {
					"a11yLabel": "Modify Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.btnCancelPlan.accessibilityConfig = {
					"a11yLabel": "Cancel Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.forceLayout();
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},

		/**
		 * Method to show confirmation pop up for create/edit travel notification
		 */
		showTransactionPinPopUp: function() {
            var self = this;
            this.view.flxAlert.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
            this.view.flxAlert.setVisibility(true);
            //this.view.CustomAlertPopup.lblHeading.setFocus(true);
            this.view.CustomAlertPopup.lblHeading.setActive(true);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.CustomAlertPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("18n.HBL.Cards.ResetPinError");
            this.view.CustomAlertPopup.isModalContainer = true;
            this.view.CustomAlertPopup.lblHeading.text = kony.i18n.getLocalizedString("18n.HBL.Cards.TransctionPinAlert");
            this.view.CustomAlertPopup.btnNo.text =kony.i18n.getLocalizedString("i18n.HBL.Cards.Exit");
            this.view.CustomAlertPopup.btnYes.text =kony.i18n.getLocalizedString("i18n.konybb.common.Proceed")
            this.view.CustomAlertPopup.btnYes.accessibilityConfig = {
                    "a11yLabel": "Yes, Cancel this Travel Plan",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button"
                    }
                },
                this.view.CustomAlertPopup.btnNo.accessibilityConfig = {
                    "a11yLabel": "No, Don't Cancel this Travel Plan",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button"
                    }
                },
                this.view.CustomAlertPopup.btnYes.onClick = function() {
                    self.view.flxAlert.setVisibility(false);
                    applicationManager.getNavigationManager().navigateTo({
                            "appName": "ManageProfileMA",
                            "friendlyName": "SettingsNewUIModule/frmTransactionPin"
                    });
                }
            this.view.CustomAlertPopup.btnNo.onClick = function() {
                self.view.flxAlert.setVisibility(false);
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
            }
            this.view.CustomAlertPopup.flxCross.onClick = function() {
                self.view.flxAlert.setVisibility(false);
            }
            this.view.CustomAlertPopup.onKeyPress = function(eventobject, eventPayload) {
                if (eventPayload.keyCode === 27) {
                    self.view.flxAlert.setVisibility(false);
                }
            }
        },
		showPopUp: function() {
			var self = this;
			this.view.flxAlert.height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height + "dp";
			this.view.flxAlert.setVisibility(true);
			//this.view.CustomAlertPopup.lblHeading.setFocus(true);
			this.view.CustomAlertPopup.lblHeading.setActive(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CustomAlertPopup.lblPopupMessage.text = kony.i18n.getLocalizedString('i18n.CardManagement.cancelCreateMsg');
			this.view.CustomAlertPopup.isModalContainer = true;
			this.view.CustomAlertPopup.lblHeading.text = "Cancel";
			this.view.CustomAlertPopup.btnYes.accessibilityConfig = {
					"a11yLabel": "Yes, Cancel this Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.CustomAlertPopup.btnNo.accessibilityConfig = {
					"a11yLabel": "No, Don't Cancel this Travel Plan",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				},
				this.view.CustomAlertPopup.btnYes.onClick = function() {
					self.view.flxAlert.setVisibility(false);
					self.notificationObject = {};
					self.fetchTravelNotifications();
				}
			this.view.CustomAlertPopup.btnNo.onClick = function() {
				self.view.flxAlert.setVisibility(false);
				self.view.btnCancelPlan.setActive(true);
			}
			this.view.CustomAlertPopup.flxCross.onClick = function() {
				self.view.flxAlert.setVisibility(false);
				self.view.btnCancelPlan.setActive(true);
			}
			this.view.CustomAlertPopup.onKeyPress = function(eventobject, eventPayload) {
				if (eventPayload.keyCode === 27) {
					self.view.flxAlert.setVisibility(false);
					self.view.btnCancelPlan.setActive(true);
				}
			}
		},
		/**
		 * Method to show create/edit travel notification for modification
		 */
		showNotificationToModify: function() {
			this.requestCardFlow = "debitcard";
			this.view.txtDestination.text = "";
			this.view.flxDowntimeWarning.setVisibility(false);
			this.view.lblRequestID.setVisibility(false);
			this.view.lblRequestNo.setVisibility(false);
			this.view.flxConfirm.setVisibility(false);
			this.view.flxMyCards.setVisibility(false);
			this.view.myCards.btnApplyForCard.setVisibility(false);
			// this.view.flxTravelPlan.setVisibility(true);
			this.view.flxOtherDestinations.setVisibility(true);
			this.view.flxMyCardsView.setVisibility(true);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxViewStatements.setVisibility(false);
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},
		/**
		 * Method to validate whether a card is selected or not
		 * @param {Object} - cards object
		 */
		isCardSelected: function(dataItem) {
			var self = this;
			var cardNumber = dataItem.maskedCardNumber;
			var selectedcards = this.notificationObject.selectedcards;
			var txt = "D";
			if (selectedcards) {
				selectedcards.forEach(function(data) {
					if (data.number === cardNumber) {
						txt = "C";
						FormControllerUtility.enableButton(self.view.btnCardsContinue);
					}
				});
			} else {
				txt = "D";
			}
			return txt;
		},
		/**
		 * Method to get the image for a given card product.
		 * @param {String} - card product name.
		 * @returns {String} - Name of image file.
		 */
		getImageForCard: function(cardProductName) {
			if (cardProductName && this.cardImages[cardProductName])
				return this.cardImages[cardProductName];
			return ViewConstants.IMAGES.PLATINUM_CARDS;
		},
		/**
		 * Method to handle selection of cards on card selection screen
		 */
		toggleSelectedCardCheckbox: function(context) {
			var self = this;
			// var selectedRowIndex = context.rowIndex;
			var selectedRowIndex = this.view.myCards.segDebitCards.selectedRowIndex[1];
			var data = this.view.myCards.segDebitCards.data;
			for (var index = 0; index < data.length; index++) {
				if (index === selectedRowIndex) {
					if (data[index].lblCheckBox.text === "C") {
						data[index].lblCheckBox.text = "D";
						data[index].flxCheckBox.accessibilityConfig = {
							"a11yLabel": "Card " + data[index].rtxValue1.text,
							"a11yARIA": {
								"tabindex": 0,
								"role": "checkbox",
								"aria-checked": false
							}
						}
					} else {
						data[index].lblCheckBox.text = "C";
						data[index].flxCheckBox.accessibilityConfig = {
							"a11yLabel": "Card " + data[index].rtxValue1.text,
							"a11yARIA": {
								"tabindex": 0,
								"role": "checkbox",
								"aria-checked": true
							}
						}
					}
				}
			}
			this.view.myCards.segDebitCards.setData(data);
			self.checkContinue(data);
			this.view.myCards.segDebitCards.setActive(selectedRowIndex, 0, "flxMyCardsCollapsed.flxCheckBox");
		},
		/**
		 * Method to enable continue button,if any of the card is selected
		 * @param {Object} - cards data
		 */
		checkContinue: function(data) {
			var enable = false;
			data.forEach(function(dataItem) {
				if (dataItem.lblCheckBox.text === "C")
					enable = true;
			})
			if (enable) {
				FormControllerUtility.enableButton(this.view.btnCardsContinue)
			} else {
				FormControllerUtility.disableButton(this.view.btnCardsContinue)
			}
		},
		/**
		 * Method to add selected address to the list of address for create/edit travel notification
		 */
		addAddressTOList: function() {
			if (this.view.txtDestination.text !== "") {
				this.view.flxOtherDestinations.setVisibility(true);
				var self = this;
				var dataMap = {
					"lblDestination": "lblDestination",
					"lblPlace": "lblPlace",
					"lblAnotherDestination": "lblAnotherDestination",
					"lblSeparator2": "lblSeparator2",
					"imgClose": "imgClose",
					"flxClose": "flxClose",
					"flxSelectDestination": "flxSelectDestination"
				};
				var data = [{
					"lblDestination": kony.i18n.getLocalizedString('i18n.CardManagement.destination'),
					"lblPlace": {
						"text": this.view.txtDestination.text,
						"accessibilityconfig": {
							"a11yLabel": this.view.txtDestination.text
						}
					},
					"imgClose": {
						"src": "icon_close_grey.png"
						//"onTouchEnd": self.removeAddressFromList
					},
					"flxClose": {
						"isVisible": true,
						"accessibilityConfig": {
							"a11yLabel": "Remove " + kony.i18n.getLocalizedString("i18n.CardManagement.destination") + " " + (this.view.segDestinations.data.length + 1) + " " + this.view.txtDestination.text,
							"a11yARIA": {
								"tabindex": 0,
								"role": "button"
							}
						},
						"onClick": self.removeAddressFromList
					},
					"lblSeparator2": "a"
				}];
				data[0].lblDestination = kony.i18n.getLocalizedString("i18n.CardManagement.destination") + " " + (this.view.segDestinations.data.length + 1);
				this.view.segDestinations.widgetDataMap = dataMap;
				this.view.segDestinations.addAll(data);
				this.view.txtDestination.text = "";
				// this.view.txtDestination.setActive(true);
				this.view.segDestinations.setActive(0, 0, "flxSelectDestination.flxClose");
				self.disableAddButton();
				// this.validateTravelPlanData();
			}
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * showCardsStatus - Method that hides all other flexes except the Cards segment.
		 * @param {Array} - Array of card ids.
		 */
		showCardsStatus: function(cards, accessibilityHeaderFlag = false) {
			var self = this;
			this.setCardsData(cards);
			this.view.flxMyCardsView.setVisibility(true);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxViewStatements.setVisibility(false);
			this.view.flxViewTransactions.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(false);
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
			this.view.flxMyCards.setVisibility(true);
			this.view.myCards.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.myCards.lblMyCardsHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.MyCards");
			this.view.title = kony.i18n.getLocalizedString("i18n.CardManagement.MyCards");
			this.view.flxMyCards.skin = "sknFlxffffffBorderRoundedLeftRed";
			this.view.forceLayout();
			this.AdjustScreen();
			CampaignUtility.showCampaign(this.campaigns, this.view, "flxMain");
			this.campaigns = [];
			CommonUtilities.hideProgressBar(this.view);
			if (accessibilityHeaderFlag) {
				this.view.customheader.btnSkip.setVisibility(true);
				this.view.customheader.btnSkip.setActive(true);
			}
		},
		/**
		 * setCardsData - Method that binds the cards data to the segment.
		 * @param {Array} - Array of JSON objects of cards.
		 */
		setCardsData: function(cards) {
			//var combinedUser = applicationManager.getConfigurationManager().isCombinedUser==="true";
			var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
			var isMobile = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile);
			if (cards.data && cards.data.length <= 0) {
				if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
					this.view.flxRightBar.setVisibility(false);
				} else {
					this.view.flxRightBar.setVisibility(true);
				}
				this.showCardsNotAvailableScreen();
			} else {
				var self = this;
				self.view.myCards.flxSearch.setVisibility(true);
				var flxCardSkin = (kony.application.getCurrentBreakpoint() === 640) ? "sknFlxffffffBorderRoundedLeftRed" : "sknFlxffffffBorderRoundedLeftRed";
				var dataMap = {
					"btnAction1": "btnAction1",
					"btnAction2": "btnAction2",
					"btnAction3": "btnAction3",
					"btnAction4": "btnAction4",
					"btnAction5": "btnAction5",
					"btnAction6": "btnAction6",
					"btnAction7": "btnAction7",
					"btnAction8": "btnAction8",
					"flxActions": "flxActions",
					"btnViewMore": "btnViewMore",
					"btnViewLess":"btnViewLess",
					"imgCardNumberView": "imgCardNumberView",
					"imgCVV": "imgCVV",
					"flxEyeIcon": "flxEyeIcon",
					"flxEyeIcon2": "flxEyeIcon2",
					"flxBlankSpace1": "flxBlankSpace1",
					"flxBlankSpace2": "flxBlankSpace2",
					"flxCardDetails": "flxCardDetails",
					"flxCardHeader": "flxCardHeader",
					"flxCardImageAndCollapse": "flxCardImageAndCollapse",
					"lblCardsSeperator": "lblCardsSeperator",
					"flxCollapse": "flxCollapse",
					"flxDetailsRow1": "flxDetailsRow1",
					"flxDetailsRow10": "flxDetailsRow10",
					"flxDetailsRow2": "flxDetailsRow2",
					"flxDetailsRow3": "flxDetailsRow3",
					"flxDetailsRow4": "flxDetailsRow4",
					"flxDetailsRow5": "flxDetailsRow5",
					"flxDetailsRow6": "flxDetailsRow6",
					"flxDetailsRow7": "flxDetailsRow7",
					"flxDetailsRow8": "flxDetailsRow8",
					"flxDetailsRow9": "flxDetailsRow9",
					"flxMyCards": "flxMyCards",
					"flxExpiry": "flxExpiry",
					"imgInfo": "imgInfo",
					"flxExpiryMessage": "flxExpiryMessage",
					"lblExpiryMessage": "lblExpiryMessage",
					"btnActivateNow": "btnActivateNow",
					"btnActivate": "btnActivate",
					"flxMyCardsExpanded": "flxMyCardsExpanded",
					"flxRowIndicatorColor": "flxRowIndicatorColor",
					"lblIdentifier": "lblIdentifier",
					"lblSeparator1": "lblSeparator1",
					"lblSeparator2": "lblSeparator2",
					"lblSeperator": "lblSeperator",
					"imgCard": "imgCard",
					"imgCollapse": "imgCollapse",
					"lblChevron": "lblChevron",
					"lblCardHeader": "lblCardHeader",
					"lblCardStatus": "lblCardStatus",
					"lblCardStatusAccessibility": "lblCardStatusAccessibility",
					"lblTravelNotificationEnabled": "lblTravelNotificationEnabled",
					"lblKey1": "lblKey1",
					"lblKey10": "lblKey10",
					"lblKey2": "lblKey2",
					"lblKey3": "lblKey3",
					"lblKey4": "lblKey4",
					"lblKey5": "lblKey5",
					"lblKey6": "lblKey6",
					"lblKey7": "lblKey7",
					"lblKey8": "lblKey8",
					"lblKey9": "lblKey9",
					"rtxValue1": "rtxValue1",
					"rtxValue10": "rtxValue10",
					"rtxValue2": "rtxValue2",
					"rtxValue3": "rtxValue3",
					"rtxValue4": "rtxValue4",
					"rtxValue5": "rtxValue5",
					"rtxValue6": "rtxValue6",
					"rtxValue7": "rtxValue7",
					"rtxValue8": "rtxValue8",
					"rtxValue9": "rtxValue9",
					"segMyCardsExpanded": "segMyCardsExpanded",
					"flxIcon": "flxIcon",
					"imgIcon": "imgIcon",
					"lblCardNumber": "lblCardNumber",
					"lblValidThru": "lblValidThru",
					"lblCardHolderName": "lblCardHolderName",
					"index": "index"
				};
				var cardsSegmentData = [];
				var card = {};
				cards.data = this.constructCardsViewModel(cards);
				//this.seggregateCards(cards.data);
				//   var travelStatusData = cards.status;
				 var c=0 , d=0, p=0;
				for (var i = 0; i < cards.data.length; i++) {
					var dataItem = cards.data[i];
					dataItem.row = dataItem.cardType === "Credit"? c++ : dataItem.cardType === "Debit" ? d++ : p++;
					card = {
						"lblCardsSeperator": {
							"text": ".",
							"height": "105px"
						},
						"flxCollapse": {
							"isVisible": dataItem.cardStatus === "Issued" ? false : true,
							"onClick": (kony.application.getCurrentBreakpoint() === 640) ? ((dataItem.cardStatus === "Issued") ? null : self.viewCardDetailsMobile) : (self.changeRowTemplate.bind(self, dataItem)),
							"accessibilityConfig": {
								"a11yLabel": "Show more details for card " + dataItem.productName,
								"a11yARIA": {
									"role": "button",
									"aria-expanded": false
								}
							}
						},
						"btnViewMore": {
                            "isVisible": dataItem.cardStatus === "Active" ? true : false,                       
							"onClick": (kony.application.getCurrentBreakpoint() === 640) ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile) : (self.changeRowNewTemplate.bind(self, dataItem)),
							"accessibilityConfig": {
                                "a11yLabel": "Show more details for card " + dataItem.productName,
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false
                                }
                            }
                        },
						"flxRowIndicatorColor": {
							"height": "190Px",
							"skin": "sknFlxF4BA22"
						},
						"lblSeperator": ".",
						"lblSeparator1": ".",
						"lblSeparator2": ".",
						"imgCard": {
							"src": dataItem.cardimage //self.getImageForCard(dataItem.productName),
						},
						"imgCollapse": {
							"src": ViewConstants.IMAGES.ARRAOW_DOWN,
							"accessibilityconfig": {
								"a11yLabel": "View Details"
							}
						},
						"lblCardHeader": {
							"text": dataItem.productName,
							//"left": combinedUser ? (isMobile ? "30dp" : "70dp") :(isMobile? "0dp": "40dp"),
							"left": this.profileAccess === "both" ? (isMobile ? "30dp" : "70dp") : (isMobile ? "0dp" : "40dp"),
							"accessibilityconfig": {
								"a11yLabel": dataItem.productName
							}
						},
						"lblCardStatus": {
							"text": self.geti18nDrivenString(dataItem.cardStatus),
							"skin": self.statusSkinsLandingScreen[dataItem.cardStatus],
							"accessibilityConfig": {
								"a11yHidden": true,
								"a11yLabel": self.geti18nDrivenString(dataItem.cardStatus)
							}
						},
						"lblCardStatusAccessibility": {
							"text": (dataItem.isExpiring === '1' && dataItem.cardStatus === "Active") ? ("Card status - " + kony.i18n.getLocalizedString("i18n.CardManagement.NearingExpiry")) : ("Card status - " + self.geti18nDrivenString(dataItem.cardStatus)),
							"skin": (dataItem.isExpiring === '1' && dataItem.cardStatus === "Active") ? self.statusSkinsLandingScreen["NearingExpiry"] : self.statusSkinsLandingScreen[dataItem.cardStatus],
							"accessibilityConfig": {
								"tagName": "span",
								"a11yARIA": {
									"tabindex": -1
								}
							}
						},
						"template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxMyCardsCollapsedMobile" : "flxMyCardsCollapsed",
						"flxExpiry": {
							"isVisible": dataItem.isExpiring === '1' ? true : false
						},
						"btnActivateNow": {
							"onClick": self.activateCard.bind(self, cards.data[i])
						},
						"btnActivate": {
							"isVisible": dataItem.cardStatus === "Issued" ? true : false,
							"onClick": self.activateCard.bind(self, cards.data[i])
						},
						"flxEyeIcon": {
							"onClick": self.showCardNumber.bind(self, cards.data[i]),
							"isVisible": true,
						},
						"imgCardNumberView": {
							"src": "eye_show.png",
							"isVisible": true,
							"accessibilityConfig": {
								"a11yLabel": "eye_show.png"
							}
						},
						"flxEyeIcon2": {
							"onClick": self.getCVV.bind(self, cards.data[i]),
							"isVisible": true,
						},
						"imgCVV": {
							"src": "eye_show.png",
							"isVisible": true,
							"accessibilityConfig": {
								"a11yLabel": "eye_show.png"
							}
						},
						"flxDetailsRow1": {
							"isVisible": true
						},
						"flxDetailsRow2": {
							"isVisible": dataItem.cardStatus === "Issued" ? false : true
						},
						"flxDetailsRow3": {
							"isVisible": (dataItem.cardStatus === "Issued" || dataItem.isExpiring === '1') ? false : true
						},
						"flxDetailsRow4": {
							"isVisible": true
						},
						"flxDetailsRow5": {
							"isVisible": true
						},
						"flxDetailsRow6": {
							"isVisible": dataItem.cardType === "Debit" ? false : true
						},
						"flxDetailsRow7": {
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"flxDetailsRow8": {
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"flxDetailsRow9": {
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"lblKey1": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber")
							}
						},
						"lblKey10": {
							"text": kony.i18n.getLocalizedString("i18n.CardManagement.productName"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.productName")
							},
							"isVisible": false
						},
						"lblKey4": {
							"text": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate")
							}
						},
						"lblKey2": {
							"text": kony.i18n.getLocalizedString("i18n.HBL.CardHolderName"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.CardHolderName"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit")
							}
						},
						"lblKey5": {
							"text": kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.transfers.accountName") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.transfers.accountName") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit")
							},
							"isVisible": true
						},
						"lblKey6": {
							"text": dataItem.cardType === "Credit" ? kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit") : kony.i18n.getLocalizedString("i18n.HBL.Cards.Balance"), //kony.i18n.getLocalizedString("i18n.CardManagement.BillingAddress"),
							"accessibilityconfig": {
								"a11yLabel": dataItem.cardType === "Debit" ? kony.i18n.getLocalizedString("i18n.common.accountNumber") : kony.i18n.getLocalizedString("i18n.CardManagement.BillingAddress")
							},
							"isVisible": dataItem.cardType === "Debit" ? false : true
						},
						"lblKey7": {
							"text": kony.i18n.getLocalizedString("i18n.HBL.Cards.OutstandingAmount"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.OutstandingAmount")
							},
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"lblKey8": {
							"text": kony.i18n.getLocalizedString("i18n.HBL.Cards.PaymentDueDate"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.PaymentDueDate")
							},
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"lblKey9": {
							"text": kony.i18n.getLocalizedString("i18n.HBL.Cards.RemainingLimit1"),
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.RemainingLimit1")
							},
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"lblKey3": {
							"text": kony.i18n.getLocalizedString("i18n.serviceRequests.Status:"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : "Reward Points" + ":",
							"accessibilityconfig": {
								"a11yLabel": kony.i18n.getLocalizedString("i18n.common.status"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : "Reward Points" + ":"
							}
						},
						"rtxValue1": {
							"text": dataItem.maskedCardNumber,
							"accessibilityconfig": {
								"a11yLabel": dataItem.maskedCardNumber
							}
						},
						"rtxValue10": {
							"text": dataItem.productName,
							"accessibilityconfig": {
								"a11yLabel": dataItem.productName
							},
							"isVisible": false
						},
						"rtxValue4": {
							"text": dataItem.validThrough,
							"accessibilityconfig": {
								"a11yLabel": dataItem.validThrough
							}
						},
						"rtxValue2": {
							"text": dataItem.cardHolder, //dataItem.cardType === 'Debit' ? dataItem.dailyWithdrawalLimit : dataItem.availableCredit,
							"accessibilityconfig": {
								"a11yLabel": dataItem.cardHolder, //dataItem.cardType === 'Debit' ? dataItem.dailyWithdrawalLimit : dataItem.availableCredit
							}
						},
						"rtxValue5": {
							"text": "XXX", //dataItem.cardType === 'Debit' ? dataItem.accountName : dataItem.creditLimit,
							"accessibilityconfig": {
								"a11yLabel": "XXX" //dataItem.cardType === 'Debit' ? dataItem.accountName : dataItem.creditLimit
							},
							"isVisible": true
						},
						"rtxValue6": {
							"text": dataItem.cardType === "Credit" ? dataItem.creditLimit : dataItem.balance,
							"accessibilityconfig": {
								"a11yLabel": dataItem.cardType === "Debit" ? dataItem.maskedAccountNumber : dataItem.billingAddress
							},
							"isVisible": dataItem.cardType === "Debit" ? false : true
						},
						"rtxValue7": {
							"text": dataItem.outstdBalance,
							"accessibilityconfig": {
								"a11yLabel": dataItem.outstdBalance
							},
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"rtxValue8": {
							"text": "", //dataItem.cardHolder,
							"accessibilityconfig": {
								"a11yLabel": "" //dataItem.cardHolder
							},
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"rtxValue9": {
							"text": "", //dataItem.secondaryCardHolder,
							"accessibilityconfig": {
								"a11yLabel": "" //dataItem.secondaryCardHolder
							},
							"isVisible": dataItem.cardType === "Credit" ? true : false
						},
						"rtxValue3": {
							"text": dataItem.cardStatus, //dataItem.cardType === 'Debit' ? dataItem.purchaseLimit : dataItem.rewardsPoint,
							"accessibilityconfig": {
								"a11yLabel": dataItem.cardStatus, //dataItem.cardType === 'Debit' ? dataItem.purchaseLimit : dataItem.rewardsPoint
							}
						},
						// "lblTravelNotificationEnabled": {
						//     "text": cards.status[i].status.toLowerCase() === "yes" ? kony.i18n.getLocalizedString('i18n.CardManagement.TravelNotificationsEnabled') : "",
						//     "accessibilityconfig": {
						//         "a11yLabel": cards.status[i].status.toLowerCase() === "yes" ? kony.i18n.getLocalizedString('i18n.CardManagement.TravelNotificationsEnabled') : ""
						//     }
						// },
						"flxMyCards": {
							"clipBounds": false,
							"skin": flxCardSkin
						},
						"lblChevron": {
							"isVisible": dataItem.cardStatus === "Issued" ? false : true,
							"skin": "sknLblrightArrowFontIcon0273E3"
						},
						"flxIcon": {
							"isVisible": this.profileAccess === "both"

						},
						"imgIcon": {
							"text": dataItem.isTypeBusiness === "1" ? "r" : "s"
						},
						"cardType": dataItem.cardType,
						"index": i,
						"lblCardNumber": dataItem.maskedCardNumber,
						"lblValidThru": dataItem.validThrough,
						"lblCardHolderName": dataItem.cardHolder,
					};
					var actionButtonIndex;
					for (var index = 0; index < dataItem.actions.length; index++) {
						actionButtonIndex = Number(index) + 1;
						card['btnAction' + actionButtonIndex] = self.getActionButton(dataItem, dataItem.actions[index]);
					}
					cardsSegmentData.push(card);
				}
				this.view.myCards.segDebitCards.widgetDataMap = dataMap;
				var scopeObj=this;
				scopeObj.view.myCards.flxDebitCards.setVisibility(true);
				scopeObj.view.myCards.flxCreditCards.setVisibility(true);
				scopeObj.view.myCards.flxPrepaidCards.setVisibility(true);
				var debitCardsData = cardsSegmentData.filter(function(card) {
					if (card.cardType == "Debit") {
						return card;
					}
				});
				var prepaidCardsData = cardsSegmentData.filter(function(card) {
					if (card.cardType == "Prepaid") {
						return card;
					}
				});
				var creditCardsData = cardsSegmentData.filter(function(card) {
					if (card.cardType == "Credit") {
						return card;
					}
				})
				if (debitCardsData && debitCardsData.length <= 0) {
					this.view.myCards.flxNoError.isVisible = true;
					this.view.myCards.segDebitCards.isVisible = false;
					this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.HBL.Cards.NoDebitCards');
				} else {
					this.view.myCards.flxNoError.isVisible = false;
					this.view.myCards.segDebitCards.isVisible = true;
					this.view.myCards.segDebitCards.setData(debitCardsData);
				}
				if (creditCardsData && creditCardsData.length <= 0) {
					this.view.myCards.flxCreditCardsError.isVisible = true;
					this.view.myCards.segCreditCards.isVisible = false;
					this.view.myCards.lblNoCreditCardsError.text = kony.i18n.getLocalizedString('i18n.HBL.Cards.NoCreditcards');
				} else {
					this.view.myCards.flxCreditCardsError.isVisible = false;
					this.view.myCards.segCreditCards.isVisible = true;
					this.view.myCards.segCreditCards.setData(creditCardsData);
				}
				if (prepaidCardsData && prepaidCardsData.length <= 0) {
					this.view.myCards.flxNoPrepaidCardsError.isVisible = true;
					this.view.myCards.segPrepaidCards.isVisible = false;
					this.view.myCards.lblNoPrepaidCardsError.text = kony.i18n.getLocalizedString('i18n.HBL.Cards.NoPrepaidCards');
				} else {
					this.view.myCards.flxNoPrepaidCardsError.isVisible = false;
					this.view.myCards.segPrepaidCards.isVisible = true;
					this.view.myCards.segPrepaidCards.setData(prepaidCardsData);
				}
				this.view.flxNewcard.setVisibility(false);
				this.view.flxMyCardsView.setVisibility(true);
				this.view.flxViewStatements.setVisibility(false);
				this.view.flxViewTransactions.setVisibility(false);
				this.view.flxAcknowledgment.setVisibility(false);
				this.view.flxConvertToEMI.setVisibility(false);
				this.view.flxConvertToEMIConfirm.setVisibility(false);
				this.view.flxConvertEMIConfirm.setVisibility(false);
				this.view.flxMyCards.setVisibility(true);
				this.view.myCards.segDebitCards.setVisibility(true);
				this.view.flxRequestANewCard.setVisibility(true);
				this.view.flxCardBillPayment.setVisibility(false);
            	this.view.flxCardBillPaymentConfirm.setVisibility(false);
				if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
					this.view.flxRightBar.setVisibility(false);
					this.view.myCards.flxRequestANewCard.setVisibility(true);
				} else {
					this.view.flxRightBar.setVisibility(true);
					this.view.flxCardAccounts.top = "10dp";
				}
				this.view.flxRequestANewCard.onClick = function() {
					self.view.myCards.flxCards.setVisibility(false);
					self.requestCardFlow = "debitcard";
					applicationManager.getPresentationUtility().showLoadingScreen();
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
				};
				this.view.flxRequestANewPrepaidCard.onClick = function() {
					self.view.myCards.flxCards.setVisibility(false);
					self.selectCardTypeFlow();
				};
				this.view.myCards.btnApplyForPrepaidCard.onClick = function() {
					self.view.myCards.flxCards.setVisibility(false);
					self.selectCardTypeFlow();
				};
				this.view.myCards.btnApplyForCard.onClick = function() {
                    self.requestCardFlow = "debitcard";
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
                };
				/*this.view.flxRequestANewVirtualDollarCard.onClick = function () {
					self.requestCardFlow = "virtualPrepaidCard";
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToVirtualDollarCardFlow();
                };*/

			}
			kony.application.dismissLoadingScreen();
		},
		showCardNumber: function(card) {
			var segId;
			var self = this;
			if (card.cardType == "Debit")
				segId = "segDebitCards";
			else if (card.cardType == "Credit")
				segId = "segCreditCards";
			else
				segId = "segPrepaidCards";
			var index = this.view.myCards[segId].selectedRowIndex;
			var rowIndex = index[1];
			var data = this.view.myCards[segId].data;
			for (var i = 0; i < data.length; i++) {
				if (i == rowIndex) {
					if (data[i].imgCardNumberView.src == "eye_show.png") {
						data[i].imgCardNumberView = {
							'src': "eye_hide.png",
							'isVisible': true,
							'accessibilityConfig': {
								'a11yLabel': "eye_hide.png"
							}
						}
						data[i].rtxValue1.text = this.formatCardNumber(card.pan);
					} else if (data[i].imgCardNumberView.src == "eye_hide.png") {
						data[i].imgCardNumberView = {
							'src': "eye_show.png",
							'isVisible': true,
							'accessibilityConfig': {
								'a11yLabel': "eye_show.png"
							},
						}
						data[i].rtxValue1.text = card.maskedCardNumber;
					}
				}
			}
			this.view.myCards[segId].setDataAt(data[rowIndex], rowIndex, index[0]);
			this.view.myCards[segId].setActive(rowIndex, 0, "flxMyCardsCollapsed.flxMyCards.flxCardHeader.flxCollapse");
			this.view.forceLayout();
			this.AdjustScreen();
		},
		getCVV: function(card) {
			applicationManager.getPresentationUtility().showLoadingScreen();
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.getCardCVV(card.pan, card);
		},
		setCVV: function(response, cardData) {
			var self = this;
			if (cardData.cardType == "Debit")
				segId = "segDebitCards";
			else if (cardData.cardType == "Credit")
				segId = "segCreditCards";
			else
				segId = "segPrepaidCards";
			let cvv = response.cvv2_out;
			var segId;
			var index = this.view.myCards[segId].selectedRowIndex;
			var rowIndex = index[1];
			var data = this.view.myCards[segId].data;
			for (var i = 0; i < data.length; i++) {
				if (i == rowIndex) {
					if (data[i].imgCVV.src == "eye_show.png") {
						data[i].imgCVV = {
							'src': "eye_hide.png",
							'isVisible': true,
							'accessibilityConfig': {
								'a11yLabel': "eye_hide.png"
							}
						}
						data[i].rtxValue5.text = cvv;
					} else if (data[i].imgCVV.src == "eye_hide.png") {
						data[i].imgCVV = {
							'src': "eye_show.png",
							'isVisible': true,
							'accessibilityConfig': {
								'a11yLabel': "eye_show.png"
							},
						}
						data[i].rtxValue5.text = "XXX";
					}
				}

			}
			this.view.myCards[segId].setDataAt(data[rowIndex], rowIndex, index[0]);
			this.view.myCards[segId].setActive(rowIndex, 0, "flxMyCardsCollapsed.flxMyCards.flxCardHeader.flxCollapse");
			this.view.forceLayout();
			this.AdjustScreen();
		},
		selectCardTypeFlow: function() {
            var scope = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.flxMyCards.setVisibility(false);
            this.view.flxRightBar.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxSelectPrepaidCardType.setVisibility(true);
            this.view.lblSelectPrepaidCard.text = "Select a Prepaid Card Type to apply for:";
            this.view.flxNewcard.setVisibility(true);
            this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
            this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
            this.view.flxCardBody.setVisibility(false);
            this.view.flxAccountsSegments.setVisibility(false);
            this.view.flxVirtualDollarCardAccount.setVisibility(false);
            this.view.flxVirtualDollarCardBody.setVisibility(false);
            this.view.flxCardProductsSegments.setVisibility(false);
            this.view.customheader.btnSkip.setVisibility(true);
            this.view.customheader.btnSkip.setActive(true);
            this.view.flxCardTypeNewCard.setVisibility(true);
			this.view.lblPhysicalCard.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.PhysicalCard");
            this.view.lblCardSubType.setVisibility(true);
			scope.view.lbxCardSubType.selectedKey = "lb0";
				var segData = [
					{ lblListItems: { text: "Domestic" } },
					{ lblListItems: { text: "International" } }   
				];
				scope.view.lblrbg1.text = "M";
				scope.view.lblrbg2.text = "L";
				scope.view.segCardSubType.setData(segData);
            this.view.lblCardSubType.text = "Select Card Type";
            this.view.radioBtnCardType.selectedKey = "rbg1";
           
            this.view.lblrbg1.text = "M";
            this.view.lblrbg2.text = "L";
            this.view.lblArrow.text = "O";
            this.view.flxListItems.setVisibility(false);
            this.view.lbxCardSubType.selectedKey = "lb0";
			this.view.segCardSubType.onRowClick = () => {
				scope.view.lblCardSubType.text = this.view.segCardSubType.selectedRowItems[0].lblListItems.text;
				scope.onCardSubTypeSelection(this.view.segCardSubType.selectedRowItems[0].lblListItems.text);
			};
            this.view.flxrbg1.onClick = () => {
				scope.view.lblArrow.text = "O";
				scope.view.flxListItems.setVisibility(false);
				scope.view.lbxCardSubType.selectedKey = "lb0";
				var segData = [
					{ lblListItems: { text: "Domestic" } },
					{ lblListItems: { text: "International" } }   
				];
				scope.view.lblrbg1.text = "M";
				scope.view.lblrbg2.text = "L";
				scope.view.segCardSubType.setData(segData);
				scope.view.lblCardSubType.text = "Select Card Type";
				this.view.segCardSubType.onRowClick = () => {
					scope.view.lblCardSubType.text = this.view.segCardSubType.selectedRowItems[0].lblListItems.text;
					scope.onCardSubTypeSelection(this.view.segCardSubType.selectedRowItems[0].lblListItems.text);
				};
				scope.onCardTypeSelection(kony.i18n.getLocalizedString("i18n.HBL.Cards.PhysicalCard"));
            };
            this.view.flxrbg2.onClick = () => {
				scope.view.lblArrow.text = "O";
				scope.view.flxListItems.setVisibility(false);
				scope.view.lbxCardSubType.selectedKey = "lb0";
				var segData = [
					{ lblListItems: { text: "VISA" } }  
				];
				scope.view.lblrbg1.text = "L";
				scope.view.lblrbg2.text = "M";
				scope.view.segCardSubType.setData(segData);
				scope.view.lblCardSubType.text = "Select Card Type";  
				scope.view.segCardSubType.onRowClick = () => {
					var navManager = applicationManager.getNavigationManager();
					scope.view.lblCardSubType.text = this.view.segCardSubType.selectedRowItems[0].lblListItems.text;
					navManager.setCustomInfo("cardSubType", this.view.segCardSubType.selectedRowItems[0].lblListItems.text);
					scope.onCardSubTypeSelection(this.view.segCardSubType.selectedRowItems[0].lblListItems.text);
				};
				scope.onCardTypeSelection(kony.i18n.getLocalizedString("i18n.HBL.Cards.VirtualCard"));
            };
            this.view.flxtbx.onClick = () => {
                if(scope.view.flxListItems.isVisible) {
                    scope.view.flxListItems.setVisibility(false);
                    scope.view.lblArrow.text = "O";
                }
                else {scope.view.flxListItems.setVisibility(true);
                    scope.view.lblArrow.text = "P";
                }

            };
            this.onCardTypeSelection(kony.i18n.getLocalizedString("i18n.HBL.Cards.PhysicalCard"));
            FormControllerUtility.disableButton(this.view.btnContinueSelectCard);
            this.view.radioBtnCardType.onSelection = this.onCardTypeSelection;
            this.view.lbxCardSubType.onSelection = this.onCardSubTypeSelection;
        },
        onCardTypeSelection: function(selectionObj) {
            let selectedCardType = selectionObj;
			var scope = this;
			let subType = this.view.lblCardSubType.text;
           if (selectedCardType == kony.i18n.getLocalizedString("i18n.HBL.Cards.PhysicalCard")) {
                this.requestCardFlow = "physicalPrepaidCard";
                if (subType === "Select Card Type") {
                    FormControllerUtility.disableButton(this.view.btnContinueSelectCard);
                } else {
                    FormControllerUtility.enableButton(this.view.btnContinueSelectCard);
                }
            } else if (selectedCardType == kony.i18n.getLocalizedString("i18n.HBL.Cards.VirtualCard")) {
                 if (subType === "Select Card Type") {
                    FormControllerUtility.disableButton(this.view.btnContinueSelectCard);
                } else {
                    FormControllerUtility.enableButton(this.view.btnContinueSelectCard);
                }
                this.requestCardFlow = "virtualPrepaidCard";
            }
          //  if (this.requestCardFlow == "physicalPrepaidCard") {
                this.view.btnContinueSelectCard.onClick = function() {
                    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
                    manageCardsModule.presentationController.getCardLimits({}, "physicalPrepaidCard");
                }
				 this.view.btnBackSelectCard.onClick = function() {
                    scope.view.flxSelectPrepaidCardType.isVisible = false;
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
                }
           /* } else if (this.requestCardFlow == "virtualPrepaidCard") {
                this.view.btnContinueSelectCard.onClick = function() {
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
                }
            }*/
        },
        onCardSubTypeSelection: function(selectionObj) {
          let cardSubType =  selectionObj;
          let subType = this.view.segCardSubType.selectedRowItems[0].lblListItems.text;
          this.view.lblCardSubType.text = subType;
          this.view.lblArrow.text = "O";
          this.view.flxListItems.setVisibility(false);
            if (subType === "Select Card Type") {
                FormControllerUtility.disableButton(this.view.btnContinueSelectCard);
            } else {
                FormControllerUtility.enableButton(this.view.btnContinueSelectCard);
            }
            this.selectedCardSubType = cardSubType;
        },
		/**
		 * showCardsNotAvailableScreen - Method to show no cards screen.
		 */
		showCardsNotAvailableScreen: function() {
			var self = this;
			this.view.flxMyCardsView.setVisibility(true);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.myCards.segDebitCards.setVisibility(false);
			this.view.flxViewStatements.setVisibility(false);
			this.view.flxViewTransactions.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(false);
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.myCards.flxNoError.setVisibility(true);
			this.view.myCards.flxNoError.skin = "slfBoxffffffB1R5";
			this.view.myCards.flxApplyForCards.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			if (applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_CREATE_CARD_REQUEST"))
				this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.CardsManagement.NocardsError');
			else
				this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.CardsManagement.GetPermissionsToApplyForCard');

			this.view.myCards.btnApplyForCard.text = kony.i18n.getLocalizedString("i18n.CardManagement.ApplyNow");

			this.view.myCards.btnApplyForCard.onClick = function() {
				self.view.myCards.flxCards.setVisibility(false);
				self.requestCardFlow = "debitcard";
				//                 var naoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
				//                 naoModule.presentationController.showNewAccountOpening();
				applicationManager.getPresentationUtility().showLoadingScreen();
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
			};
		},
		/**
		 * getActionButton - Method to get a JSON for action button based on the action.
		 * @param {Object, String} - card object.
		 * @param {String} actino - contains the action to be performed.
		 * @returns {Object} - JSON with text and onclick function for the button.
		 */
		getActionButton: function(card, action) {
			return {
				'text': action,
				'onClick': this.getAction(card, action),
				'isVisible': true,
				'accessibilityConfig': {
					'a11yLabel': action + ((action === "Set Limits" || action === "Change PIN" || action === "Activate Card") ? " for" : "") + ' - ' + card.productName
				}
			};
		},
		/**
		 * getAction - Method that actually returns the action to the action.
		 * @param {Object, String} - card object .
		 * @param {String} action - contains the action to be performed.
		 * @returns {function} - Action for the given name.
		 */
		getAction: function(card, action) {
			switch (action) {
				case kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"): {
					return this.lockCard.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"): {
					return this.unlockCard.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard"): {
					return this.replaceCard.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"): {
					return this.reportLost.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"): {
					return this.cancelCard.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"): {
					return this.changePin.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.SetLimits"): {
					return this.setLimits.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"): {
					return this.activateCard.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI"): {
					return this.convertToEMI.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.Pay.PayBill"): {
					return this.payBill.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.HBL.Cards.DownloadStatement"): {
					return this.downloadStatement.bind(this, card);
				}
				case kony.i18n.getLocalizedString("i18n.HBL.Cards.TopUpCard"): {
					return this.topUpCard.bind(this, card);
				}
				case kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"): {
					return this.getTransactions.bind(this, card);
				}
			}
		},
		restrictCharactersSet: function() {
			var scope = this;
			var specialCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\";
			var numeric = "0123456789";
			var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
			scope.view.tbxCVVNumber.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
			//scope.view.tbxEnterCardPIN.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
			//scope.view.tbxConfirmCardPIN.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
			scope.view.CardLockVerificationStep.tbxCurrentPIN.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
			scope.view.CardLockVerificationStep.tbxNewPIN.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
			scope.view.CardLockVerificationStep.tbxConfirmPIN.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
			scope.view.tbxPANNo.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase() ;
           scope.view.tbxNameOnCard.restrictCharactersSet = numeric;
		},
		isValidCVV: function(cvv) {
			if (cvv.length !== 3) return false;
			var regex = new RegExp('^[0-9]+$');
			return regex.test(cvv);
		},
		convertToEMI: function(card) {
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(true);
			this.view.flxViewStatements.setVisibility(false);
			this.view.flxViewTransactions.setVisibility(false);
			this.view.myCards.segDebitCards.setVisibility(false);;
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.myCards.flxNoError.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
			this.getEmiTransaction(card);
		},
		//payBill: function(card) {},
		topUpCard: function(card) {
			var self = this;
			FormControllerUtility.disableButton(this.view.btnContinueTopUp);
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopupCardBody.setVisibility(true);
			this.view.flxTopUpRightBar.setVisibility(true);
			this.view.flxTopUpConfirm.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(false);
			this.view.flxConvertToEMI.setVisibility(false);
			this.view.flxViewStatements.setVisibility(false);
			this.view.flxViewTransactions.setVisibility(false);
			this.view.myCards.segDebitCards.setVisibility(false);;
			this.view.flxConvertToEMIConfirm.setVisibility(false);
			this.view.flxConvertEMIConfirm.setVisibility(false);
			this.view.myCards.flxNoError.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(true);
			this.view.flxExRateNDebitAmt.setVisibility(false);
			this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
			this.view.lblChars.text = "0/140";
			this.view.flxTopUpConfirm.skin ="slFbox";
            this.view.CopyflxConfirmBody0gaf2577a505348.skin ="sknFlxffffffBorderRoundedLeftRed";
            this.view.CopylblSeparator0acf6691b77904b.setVisibility(false);
			var navMan = applicationManager.getNavigationManager();
            var data = applicationManager.getUserPreferencesManager().getUserObj();
			let ConvertedNPRPrice = applicationManager.getNavigationManager().getCustomInfo("ConvertedNPRPrice");
			this.view.lblExchangeRate.text = "1 NPR = "+ConvertedNPRPrice+ " USD";
			this.view.lblDebitAmount.text = "";
			this.view.flxDomesticTransfer.text ="Domestic Transfers";
			this.view.flxSameBankTransfer.text ="Same Bank Tranfers";
			this.view.flxSameBankTransfer.onClick = function(){
				navMan.navigateTo({
					"appName": "TransfersMA",
					"friendlyName": "frmUTFLanding"
				}, false, data);
			};
			this.view.flxDomesticTransfer.onClick = function(){
				navMan.navigateTo({
					"appName": "TransfersMA",
					"friendlyName": "frmUTFLanding"
				}, false, data);
			};
			this.view.txtAreaNote.text = "";
			this.view.tbxTopupAmount.text = "";
			if (card.Card_Category.split(" ")[0] !== "Virtual") {
				this.requestCardFlow = "topUpPrepaidCard";
				this.view.lblRemaininLimit.isVisible = false;
				this.view.lblRemainingTopUpLimit.isVisible = false;
				this.view.flxExRateNDebitAmt.isVisible = false;
			} else {
				this.requestCardFlow = "topUpVirtualCard";
				this.view.lblRemaininLimit.isVisible = true;
				this.view.lblRemainingTopUpLimit.isVisible = true;
				this.view.flxExRateNDebitAmt.isVisible = true;
			}
			this.view.rchTxtTo.text = this.maskCardNumber(card.pan);
			this.view.lblToAccVal.text = this.maskCardNumber(card.pan);
			this.view.btnContinueTopUp.onClick = function() {
				self.formTopUpFirstData(card);
			};
			this.view.tbxTopupAmount.onTextChange = function() {
				let ConvertedUSDPrice = applicationManager.getNavigationManager().getCustomInfo("ConvertedUSDPrice");
				self.view.tbxTopupAmount.text = self.view.tbxTopupAmount.text.replace(/[^0-9.]/g, "");
				self.view.lblDebitAmount.text = (self.view.tbxTopupAmount.text / ConvertedUSDPrice).toFixed(2);
				self.enableTopUpLandingScreenContinueBtn();
			};
			this.view.txtAreaNote.onTextChange = function() {
				var textLength = self.view.txtAreaNote.text.length;
				self.view.lblChars.text = textLength.toString() + "/140";
				self.enableTopUpLandingScreenContinueBtn();
			};
			this.view.btnModifyTopUpConfirm.onClick = function() {
				self.view.flxTopupCardBody.setVisibility(true);
				self.view.flxTopUpConfirm.setVisibility(false);
				self.view.flxTopUpRightBar.setVisibility(true);
			};

			this.view.btnCancelTopUpConfirm.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnCancelTopUp.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};

			applicationManager.getPresentationUtility().showLoadingScreen();
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
		},
		formTopUpFirstData : function(card){
			var scope = this;
            var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("topUpCOnfirmData", card);
            var fromAcc = navManager.getCustomInfo("selectedAccountAccId");
            var name = navManager.getCustomInfo("accountName");
            var topUpCardData = {
                "topupAmou": this.view.lblDebitAmount.text,
                "topUpAmount": this.view.tbxTopupAmount.text,
                "cCardNumber": card.pan,
                "mxpAccountNumber": fromAcc,
                "topupCurrency": "NPR",
                "notes": this.view.txtAreaNote.text,
                "fromAcc": fromAcc,
                "exchangeRate": this.view.lblExchangeRate.text,
                "debitAmount": this.view.lblDebitAmount.text,
                "remainingLimit": "",
                "flow": this.requestCardFlow,
                "name": name
            };
            this.view.flxTopupCardBody.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(true);
            this.view.flxTopUpConfirm.setVisibility(true);
            this.view.flxTopUpRightBar.setVisibility(false);
            this.view.flxTopUpConfirm5.setVisibility(false);
            this.view.flxTopUpConfirm6.setVisibility(false);
            if (this.requestCardFlow == "topUpVirtualCard") {
                this.view.flxTopUpConfirm5.setVisibility(true);
                this.view.flxTopUpConfirm6.setVisibility(true);
                this.view.rchTxtExchangeRate.text = this.view.lblExchangeRate.text;
                this.view.rchTxtRemainingLimit.text = "";
                this.view.rchTxtDebitAmount.text = "USD " + this.view.lblDebitAmount.text;
            }
			card.fromAccountNum = this.view.lblFromRecordField3.text;
            this.view.rchTxtFrom.text =  this.view.lblFromRecordField3.text;
            this.view.lblAmountVal.text = "NPR " + topUpCardData.topUpAmount;
            this.view.lblToAccVal.text = topUpCardData.cCardNumber;
            this.view.rchTxtNote.text = topUpCardData.notes;
            var params = {
                "topupAmou": this.view.tbxTopupAmount.text,
                "cCardNumber": card.pan,
                "mxpAccountNumber": fromAcc,
                "topupCurrency": "NPR",
            };
            navManager.setCustomInfo("topUpCardPayload", params);
            navManager.setCustomInfo("topUpCardAckData", topUpCardData);
            // this.view.btnContinueTopUpConfirm.onClick = function() {
                scope.preTopUpFirstCall(topUpCardData,card);
				this.AdjustScreen();
            // };
        },
		preTopUpFirstCall : function(data,card){
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
            var currentBankDate="";
            if(bankDate){
                currentBankDate=bankDate.currentWorkingDate;
                if(currentBankDate)
                    currentBankDate=currentBankDate+"T00:00:00.000Z";
            }

			var amount = this.requestCardFlow == "topUpVirtualCard" ?data.topupAmou : data.topUpAmount;
			var params = {
				"amount": amount,
				"beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
				"frequencyType": "Once",
				"fromAccountCurrency": "NPR",
				"fromAccountNumber": data.fromAcc,
				"scheduledDate": currentBankDate,
				"serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
				"toAccountCurrency": "NPR",
				"toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
				"transactionCurrency": "NPR",
				"transactionsNotes": data.notes,
				"frequencyEndDate": currentBankDate,
				"frequencyStartDate": currentBankDate,
				"transactionType": "InternalTransfer",
				"validate": "true",
				"isScheduled": "0",
				"createWithPaymentId": "true",
				"cardNumber": card.pan
			};
			var navManager = applicationManager.getNavigationManager();
			manageCardsModule.presentationController.intraBankTransfer(params,card);
		},
		extractAmountInNumbersFromBalance: function(selectedAccBalance) {
			if (!selectedAccBalance) return 0;
			//selectedAccBalance = selectedAccBalance.replace(",", "").match(/(\d+)/);
            //return parseInt(selectedAccBalance[0]);
			const numericString = selectedAccBalance.replace(/[^\d.]/g, '');
			return parseFloat(numericString);
		},
		enableTopUpLandingScreenContinueBtn: function() {
			let ConvertedUSDPrice = applicationManager.getNavigationManager().getCustomInfo("ConvertedUSDPrice");
			var toAcc = this.view.lblToAccVal.text;
			var amount = this.view.tbxTopupAmount.text;
			var notes = this.view.txtAreaNote.text;
			var navManager = applicationManager.getNavigationManager();
			var selectedAccBalance = this.extractAmountInNumbersFromBalance(navManager.getCustomInfo("selectedAccAvailableBalance"));
			var minAmount = this.requestCardFlow == "topUpPrepaidCard" ? 1 : 50 * ConvertedUSDPrice; 
			var maxAmount = this.requestCardFlow == "topUpPrepaidCard" ? "NA" : 500 * ConvertedUSDPrice; 
			if (parseFloat(amount) < 50 && this.requestCardFlow !== "topUpPrepaidCard") {
				this.view.flxWarning5.setVisibility(true);
				this.view.lblWarning5.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.MinTopUpAmount");
				FormControllerUtility.disableButton(this.view.btnContinueTopUp);
				return;
			} else if (parseFloat(amount) > 500 &&  this.requestCardFlow !== "topUpPrepaidCard" ) {
				this.view.flxWarning5.setVisibility(true);
				this.view.lblWarning5.text = "Maximum Top up amount allowed is USD 500";
				FormControllerUtility.disableButton(this.view.btnContinueTopUp);
				//kony.i18n.getLocalizedString("i18n.HBL.Cards.MinTopUpAmount");
				return;
			} else {
				if (amount < selectedAccBalance) {
					this.view.flxWarning5.setVisibility(false);
					if (!(this.isEmptyNullOrUndefined(toAcc)) && !(this.isEmptyNullOrUndefined(amount)) && !(this.isEmptyNullOrUndefined(notes)))
						FormControllerUtility.enableButton(this.view.btnContinueTopUp);
					else
						FormControllerUtility.disableButton(this.view.btnContinueTopUp);
				} else {
					this.view.flxWarning5.setVisibility(true);
					this.view.lblWarning5.text = "Insufficient funds."
					FormControllerUtility.disableButton(this.view.btnContinueTopUp);
				}
			}
			this.view.lblConsenttypedropdown2.text = "O";
		},
		setTopUpFromAccounts: function(accounts) {
			var savings = [];
            var checkings = [];
            if (accounts && accounts[1]) savings = accounts[1];
            if (accounts && accounts[0]) checkings = accounts[0];
            var accountsDataMerged = checkings.concat(savings);
			var scope = this;
			this.groupIdentifier = {
				"internal": {
					"identifier": "accountTypeKey"
				},
				"segregation": {
					"Checking": "Checking Account",
					"CreditCard": "Credit Card Account",
					"Deposit": "Deposit Account",
					"Loan": "Loan Account",
					"Savings": "Saving Account",
					"default": "All Payees"
				}
			};
			this.view.flxFromAccountList2.onClick = function() {
				if (scope.view.lblConsenttypedropdown2.text == "P") {
					scope.view.lblConsenttypedropdown2.text = "O";
					scope.view.flxFromAccountSegment2.setVisibility(false);
					scope.view.flxFromAccountTextBoxAndIcon2.skin = "sknFlxffffffBorderRoundedLeftRed";
				} else {
					scope.view.lblConsenttypedropdown2.text = "P";
					scope.view.flxFromAccountSegment2.setVisibility(true);
					scope.view.flxFromAccountTextBoxAndIcon2.skin = "sknFlxffffffBorderRoundedLeftRedFocus";
				}
			};

			this.view.lblHeader6.text = "Topup Card";//kony.i18n.getLocalizedString("i18n.hamburger.transfers");
			this.view.lblHeader6.left = "0dp";
			this.view.segFromAccounts2.onRowClick = this.onFromAccountSelection2.bind(this);
			this.setFromAccountsList2(scope_configManager.userAccounts, "segFromAccounts2");
			this.setDefaultAccount2(scope_configManager.userAccounts);
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.lblHeader6.setFocus(true);
		},
		formTopUpData: function(card) {
            var scope = this;
            var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("topUpCOnfirmData", card);
            var fromAcc = navManager.getCustomInfo("selectedAccountAccId");
			var fromAccName = navManager.getCustomInfo("accountname_name");
            var name = navManager.getCustomInfo("accountName");
            var topUpCardData = {
                "topupAmou": this.view.lblDebitAmount.text,
                "topUpAmount": this.view.tbxTopupAmount.text,
                "cCardNumber": card.cardResponse.pan,
                "mxpAccountNumber": fromAcc,
                "topupCurrency": "NPR",
                "notes": this.view.txtAreaNote.text,
                "fromAcc": fromAcc,
                "exchangeRate": this.view.lblExchangeRate.text,
                "debitAmount": this.view.lblDebitAmount.text,
                "remainingLimit": "",
                "flow": this.requestCardFlow,
				"transactionId":card.card.referenceId,
                "name": name
            };
            this.view.flxTopupCardBody.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(true);
            this.view.flxTopUpConfirm.setVisibility(true);
            this.view.flxTopUpRightBar.setVisibility(false);
            this.view.flxTopUpConfirm5.setVisibility(false);
            this.view.flxTopUpConfirm6.setVisibility(false);
			this.view.flxTopUpConfirm7.setVisibility(false);
            if (this.requestCardFlow == "topUpVirtualCard") {
                this.view.flxTopUpConfirm5.setVisibility(true);
                this.view.flxTopUpConfirm6.setVisibility(true);
                this.view.rchTxtExchangeRate.text = this.view.lblExchangeRate.text;
                this.view.rchTxtRemainingLimit.text = "";
                this.view.rchTxtDebitAmount.text = "USD " + topUpCardData.topUpAmount;
				this.view.flxTopUpConfirm7.setVisibility(true);
            }
            this.view.rchTxtFrom.text = card.cardResponse.fromAccountNum;
            this.view.lblAmountVal.text = "NPR " + this.view.lblDebitAmount.text;
            this.view.lblToAccVal.text = topUpCardData.cCardNumber;
            this.view.rchTxtNote.text = topUpCardData.notes;
            var params = {
                "topupAmou": this.view.tbxTopupAmount.text,
                "cCardNumber": card.cardResponse.pan,
                "mxpAccountNumber": fromAcc,
                "topupCurrency": this.requestCardFlow == "topUpVirtualCard" ? "USD" : "NPR",
                "cardProduct": card.cardResponse.Card_Type,
                "cardType": card.cardResponse.Card_Label,
                "cardHolderName": card.cardResponse.cardHolder,
                "accountNumber": fromAcc,
                "debtorName": fromAccName,
                "convertedAmount": card.card.convertedAmount
            };
            navManager.setCustomInfo("topUpCardPayload", params);
            navManager.setCustomInfo("topUpCardAckData", topUpCardData);
            this.view.btnContinueTopUpConfirm.onClick = function() {
                scope.preTopUpCall(topUpCardData);
            };
        },
		//viewTransactions: function(card) {},
		/**
		 * Entry point for Activate new card and Renewal Card flow.
		 * @param {Object} - card object.
		 */
		activateCard: function(card) {
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			// this.setCardDetails(card);
			FormControllerUtility.disableButton(this.view.btnContinue2);
			var scope = this;
			scope.restrictCharactersSet();
			scope.view.tbxCVVNumber.text = "";
			scope.view.tbxCVVNumber.secureTextEntry = true;
			scope.view.imgViewCVV.src = "eye_hide.png";
			card.oldCVV = "";
			card.cvv = "";
			this.view.flxCVVPopup.onKeyPress = function(eventObject, eventPayload) {
				if (eventPayload.keyCode === 27) {
					scope.view.flxCVVPopup.setVisibility(false);
					scope.view.btnfindCVV.accessibilityConfig = {
						"a11yARIA": {
							"role": "button",
							"aria-expanded": false
						}
					};
					scope.view.btnfindCVV.setActive(true);
				}
			};
			this.view.CVVInfo.flxCross.onKeyPress = function(eventObject, eventPayload) {
				if (eventPayload.keyCode === 9 || eventPayload.keyCode === 27) {
					scope.view.flxCVVPopup.setVisibility(false);
					eventPayload.preventDefault();
					scope.view.btnfindCVV.accessibilityConfig = {
						"a11yARIA": {
							"role": "button",
							"aria-expanded": false
						}
					};
					scope.view.btnfindCVV.setActive(true);
				}
			};
			this.view.btnfindCVV.onKeyPress = function(eventObject, eventPayload) {
				if (eventPayload.keyCode === 27) {
					scope.view.flxCVVPopup.setVisibility(false);
					scope.view.btnfindCVV.accessibilityConfig = {
						"a11yARIA": {
							"role": "button",
							"aria-expanded": false
						}
					};
					scope.view.btnfindCVV.setActive(true);
				} else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
					scope.view.flxCVVPopup.setVisibility(false);
					scope.view.btnfindCVV.accessibilityConfig = {
						"a11yARIA": {
							"role": "button",
							"aria-expanded": false
						}
					};
				}
			};
			this.view.imgViewCVVWrapper.accessibilityConfig = {
				"a11yLabel": "View CVV code, your CVV code is currently hidden",
				"a11yARIA": {
					"role": "button"
				}
			};
			this.view.imgViewCVVWrapper.onClick = function() {
				scope.view.tbxCVVNumber.secureTextEntry = !scope.view.tbxCVVNumber.secureTextEntry;
				if (scope.view.imgViewCVV.src === "eye_hide.png") {
					scope.view.imgViewCVVWrapper.accessibilityConfig = {
						"a11yLabel": "Hide CVV code, your CVV code is currently visible",
						"a11yARIA": {
							"role": "button"
						}
					};
					scope.view.imgViewCVV.src = "eye_show.png";
				} else {
					scope.view.imgViewCVVWrapper.accessibilityConfig = {
						"a11yLabel": "View CVV code, your CVV code is currently hidden",
						"a11yARIA": {
							"role": "button"
						}
					};
					scope.view.imgViewCVV.src = "eye_hide.png";
				}
			};
			this.toggleSecureAccessCodeMasking.bind(this, this.view.tbxCVVNumber);
			this.view.tbxCVVNumber.onKeyUp = function() {
				if (!scope.isValidCVV(scope.view.tbxCVVNumber.text)) {
					FormControllerUtility.disableButton(scope.view.btnContinue2);
				} else {
					FormControllerUtility.enableButton(scope.view.btnContinue2);
				}
			};
			this.view.btnfindCVV.accessibilityConfig = {
				"a11yARIA": {
					"role": "button",
					"aria-expanded": false
				}
			};
			this.view.btnfindCVV.onClick = function() {
				scope.view.flxCVVPopup.setVisibility(true);
				scope.view.forceLayout();
				scope.setCVVpopUpUI();
				scope.AdjustScreen();
				scope.view.btnfindCVV.accessibilityConfig = {
					"a11yARIA": {
						"role": "button",
						"aria-expanded": true
					}
				};
				scope.view.CVVInfo.lblInfo.setActive(true);
			};
			this.view.CVVInfo.flxCross.accessibilityConfig = {
				"a11yLabel": "Close this popup",
				"a11yARIA": {
					"role": "button"
				}
			}
			this.view.CVVInfo.flxCross.onClick = function() {
				scope.view.flxCVVPopup.setVisibility(false);
				scope.view.btnfindCVV.accessibilityConfig = {
					"a11yARIA": {
						"role": "button",
						"aria-expanded": false
					}
				};
				scope.view.btnfindCVV.setActive(true);
			};
			this.view.btnCancel2.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.lblCardNumber.text = kony.i18n.getLocalizedString("i18n.CardManagement.EnterCVV");
			this.view.flxIncorrectCVV.setVisibility(false);
			if (CommonUtilities.getSCAType() != 0)
				this.setCVVScreenSCA(card);
			else
				this.setCVVScreen(card);
			this.view.flxCardCVV.setVisibility(true);
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.btnCancel2.accessibilityConfig = {
				"a11yLabel": "Cancel card activation process"
			};
			this.view.btnContinue2.accessibilityConfig = {
				"a11yLabel": "Continue with card activation process"
			};
		},
		setCVVpopUpUI: function() {
			//this.view.flxCVVPopup.top = (this.view.flxMain.info.frame.y + this.view.flxCardCVV.info.frame.y + this.view.flxActivateContent.info.frame.y + this.view.btnfindCVV.info.frame.y - this.view.flxCVVPopup.info.frame.height) + "dp";
			this.view.flxCVVPopup.top = "-" + (this.view.flxCVVPopup.height);
			this.view.forceLayout();
		},
		/**
		 * Set the CVV screen based on Expiry Flag
		 * @param {Object} - card object.
		 */
		setCVVScreen: function(card, isMFARequired) {
			var scope = this;
			if (card.isExpiring === "0") {
				this.view.lblActivateCardHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.ActivateACard");
				this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.CVVPIN");
				this.view.title = this.view.lblActivateCardHeader.text;
				this.view.lblCVV.text = kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCVVOnBackOfCard");
				this.view.btnContinue2.onClick = function() {
					card.cvv = scope.view.tbxCVVNumber.text;
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.activateCard(card, kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"), isMFARequired);
				};
			} else {
				this.view.lblActivateCardHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.ActivateRenewalCard");
				this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.CurrentCardCVV");
				this.view.title = this.view.lblActivateCardHeader.text;
				this.view.lblCVV.text = kony.i18n.getLocalizedString("i18n.CardManagement.CVVOnBackOfCard");
				this.view.btnContinue2.onClick = function() {
					/*if (card.oldCVV === "") {
						card.oldCVV = scope.view.tbxCVVNumber.text;
						scope.view.tbxCVVNumber.text = "";
						scope.view.tbxCVVNumber.secureTextEntry = true;
						scope.view.flxCVVPopup.setVisibility(false);
						scope.view.imgViewCVV.src = "eye_hide.png";
						scope.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.RenewalCardCVV");
						scope.view.lblCVV.text = kony.i18n.getLocalizedString("i18n.CardManagement.CVVCode");
					} else {*/
					card.cvv = scope.view.tbxCVVNumber.text;
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.getCVV(card, kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"), isMFARequired);
					//}
				};
			}
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},
		/**
		 * Entry point for lock card flow.
		 * @param {Object} - card object.
		 */
		lockCard: function(card) {
			this.showLockCardView();
			this.setCardDetails(card);
			this.showLockCardGuidelines(card);
			this.setMobileHeader(kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"))
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxMain.setFocus(true);
		},
		/**
		 * Sets the UI for lock card flow.
		 */
		showLockCardView: function() {
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			this.view.flxCardVerification.setVisibility(true);
			this.view.CardLockVerificationStep.setVisibility(true);
			this.view.CardLockVerificationStep.flxLeft.setVisibility(true);
			this.view.CardLockVerificationStep.flxDeactivateCard.setVisibility(true);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Binds the card details.
		 * @param {Object} - Card object.
		 */
		setCardDetails: function(card) {
			var self = this;
			//var combinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
			var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
			var isMobile = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			//if(combinedUser){
			if (this.profileAccess === "both") {
				this.view.CardLockVerificationStep.cardDetails.flxIcon.isVisible = isMobile ? false : true;
				this.view.CardLockVerificationStep.cardDetails.flxHeaderIcon.isVisible = isMobile ? true : false;
				this.view.CardLockVerificationStep.cardDetails.imgIcon.text = (card.isTypeBusiness === "1") ? "r" : "s";
				this.view.CardLockVerificationStep.cardDetails.imgHeaderIcon.text = (card.isTypeBusiness === "1") ? "r" : "s";
				this.view.CardLockVerificationStep.cardDetails.lblCardName.left = "60dp";
				this.view.CardLockVerificationStep.cardDetails.lblCardHeader.left = "120dp";
			}
			this.view.CardLockVerificationStep.cardDetails.lblCardName.text = card.productName, accessibilityConfig;
			this.view.CardLockVerificationStep.cardDetails.lblCardStatus.text = self.geti18nDrivenString(card.cardStatus);
			this.view.CardLockVerificationStep.cardDetails.lblCardStatusAccessibility.text = 'Card Status - ' + self.geti18nDrivenString(card.cardStatus);
			this.view.CardLockVerificationStep.cardDetails.lblCardStatus.skin = self.statusSkinsDetailsScreen[card.cardStatus];
			this.view.CardLockVerificationStep.cardDetails.imgCard.src = card.cardimage;
			this.view.CardLockVerificationStep.cardDetails.flxDetailsRow1.setVisibility(true);
			this.view.CardLockVerificationStep.cardDetails.lblKey1.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber");
			this.view.CardLockVerificationStep.cardDetails.lbl1.text = kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber");
			this.view.CardLockVerificationStep.cardDetails.rtxValue1.text = card.maskedCardNumber;
			this.view.CardLockVerificationStep.cardDetails.lblCardNumber.text = card.maskedCardNumber;
			this.view.CardLockVerificationStep.cardDetails.lblCardValid.text = card.validThrough;
			this.view.CardLockVerificationStep.cardDetails.lblCardHolderNume.text = card.chName;
			this.view.CardLockVerificationStep.cardDetails.flxRow1Detail.imgEyeIcon.src = "eye_show.png";
			var unMaskedNumber = card.maskedCardNumber;
			var maskedCardNumber = this.formatCardNumber(card.pan);
			this.view.CardLockVerificationStep.cardDetails.flxRow1Detail.onClick = function() {
                if (this.imgEyeIcon.src == "eye_show.png") {
                    this.rtxValue1.text = maskedCardNumber;
                    this.imgEyeIcon.src = "eye_hide.png";
                } else {
                    this.rtxValue1.text = unMaskedNumber;
                    this.imgEyeIcon.src = "eye_show.png";
                }
            }
			if (card.cardType === 'Debit') {
				// this.view.CardLockVerificationStep.cardDetails.height = "250dp";
				// this.view.CardLockVerificationStep.flxWrapper.height ="450dp";
				// this.view.CardLockVerificationStep.cardDetails.flxCardDetails.top = "50dp";
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow2.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow3.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow4.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow5.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow6.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow7.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow8.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow9.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.lblKey2.text = kony.i18n.getLocalizedString("i18n.HBL.CardHolderName");
				this.view.CardLockVerificationStep.cardDetails.rtxValue2.text = card.cardHolder;
				this.view.CardLockVerificationStep.cardDetails.lblKey3.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Status:");
				this.view.CardLockVerificationStep.cardDetails.rtxValue3.text = card.cardStatus;
				this.view.CardLockVerificationStep.cardDetails.lblKey4.text = kony.i18n.getLocalizedString("i18n.Wealth.expiryDate");
				this.view.CardLockVerificationStep.cardDetails.rtxValue4.text = card.validThrough;
				this.view.CardLockVerificationStep.cardDetails.lblKey5.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV");
				this.view.CardLockVerificationStep.cardDetails.rtxValue5.text = card.CVVInfo;


				// this.view.CardLockVerificationStep.cardDetails.lblKey5.text = (card.cardType === 'Debit') ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit");
				// this.view.CardLockVerificationStep.cardDetails.lbl2.text = (card.cardType === 'Debit') ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit");
				// this.view.CardLockVerificationStep.cardDetails.rtxValue3.text = (card.cardType === 'Debit') ? card.dailyWithdrawalLimit : card.creditLimit;
				// this.view.CardLockVerificationStep.cardDetails.lbl3.text = (card.cardType === 'Debit') ? card.dailyWithdrawalLimit : card.creditLimit;
				// this.view.CardLockVerificationStep.cardDetails.lblKey3.text = (card.cardType === 'Debit') ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit");
				// this.view.CardLockVerificationStep.cardDetails.rtxValue3.text = (card.cardType === 'Debit') ? card.purchaseLimit : card.creditLimit;
				// this.view.CardLockVerificationStep.cardDetails.flxDetailsRow4.setVisibility(card.cardType === 'Credit');
				// this.view.CardLockVerificationStep.cardDetails.lblKey4.text = kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit");
				// this.view.CardLockVerificationStep.cardDetails.rtxValue4.text = card.availableCredit;
			} else if (card.cardType === 'Credit') {
				// this.view.CardLockVerificationStep.cardDetails.height = "400dp";
				// this.view.CardLockVerificationStep.flxWrapper.height ="450dp";
				// this.view.CardLockVerificationStep.cardDetails.flxCardDetails.top = "43dp";
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow2.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow3.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow4.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow5.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow6.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow7.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow8.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow9.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.lblKey2.text = kony.i18n.getLocalizedString("i18n.HBL.CardHolderName");
				this.view.CardLockVerificationStep.cardDetails.rtxValue2.text = card.cardHolder;
				this.view.CardLockVerificationStep.cardDetails.lblKey3.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Status:");
				this.view.CardLockVerificationStep.cardDetails.rtxValue3.text = card.cardStatus;
				this.view.CardLockVerificationStep.cardDetails.lblKey4.text = kony.i18n.getLocalizedString("i18n.Wealth.expiryDate");
				this.view.CardLockVerificationStep.cardDetails.rtxValue4.text = card.validThrough;
				this.view.CardLockVerificationStep.cardDetails.lblKey5.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV");
				this.view.CardLockVerificationStep.cardDetails.rtxValue5.text = card.CVVInfo;
				this.view.CardLockVerificationStep.cardDetails.lblKey6.text = kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit");
				this.view.CardLockVerificationStep.cardDetails.rtxValue6.text = card.creditLimit;
				this.view.CardLockVerificationStep.cardDetails.lblKey7.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.OutstandingAmount");
				this.view.CardLockVerificationStep.cardDetails.rtxValue7.text = card.outstdBalance;
				this.view.CardLockVerificationStep.cardDetails.lblKey8.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.PaymentDueDate");
				this.view.CardLockVerificationStep.cardDetails.rtxValue8.text = "";
				this.view.CardLockVerificationStep.cardDetails.lblKey9.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RemainingLimit1");
				this.view.CardLockVerificationStep.cardDetails.rtxValue9.text = "";
			} else if (card.cardType === 'Prepaid') {
				// this.view.CardLockVerificationStep.cardDetails.height = "250dp";
				// this.view.CardLockVerificationStep.cardDetails.flxCardDetails.top = "30dp";
				// this.view.CardLockVerificationStep.flxWrapper.height ="450dp";
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow2.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow3.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow4.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow5.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow6.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow7.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow8.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow9.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.lblKey2.text = kony.i18n.getLocalizedString("i18n.HBL.CardHolderName");
				this.view.CardLockVerificationStep.cardDetails.rtxValue2.text = card.cardHolder;
				this.view.CardLockVerificationStep.cardDetails.lblKey3.text = kony.i18n.getLocalizedString("i18n.serviceRequests.Status:");
				this.view.CardLockVerificationStep.cardDetails.rtxValue3.text = card.cardStatus;
				this.view.CardLockVerificationStep.cardDetails.lblKey4.text = kony.i18n.getLocalizedString("i18n.Wealth.expiryDate");
				this.view.CardLockVerificationStep.cardDetails.rtxValue4.text = card.validThrough;
				this.view.CardLockVerificationStep.cardDetails.lblKey5.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV");
				this.view.CardLockVerificationStep.cardDetails.rtxValue5.text = card.CVVInfo;
				this.view.CardLockVerificationStep.cardDetails.lblKey6.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.Balance");
				this.view.CardLockVerificationStep.cardDetails.rtxValue6.text = card.balance;
			} else {
				this.view.CardLockVerificationStep.cardDetails.height = "200dp";
				this.view.CardLockVerificationStep.cardDetails.flxCardDetails.top = "43dp";
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow2.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow3.setVisibility(true);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow4.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow5.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow6.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.flxDetailsRow7.setVisibility(false);
				this.view.CardLockVerificationStep.cardDetails.lblKey2.text = kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit");
				this.view.CardLockVerificationStep.cardDetails.rtxValue2.text = "";
				this.view.CardLockVerificationStep.cardDetails.lblKey3.text = kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit");
				this.view.CardLockVerificationStep.cardDetails.rtxValue3.text = "";
			}
			// this.view.CardLockVerificationStep.cardDetails.lblCardName.text = card.productName, accessibilityConfig;
			// this.view.CardLockVerificationStep.cardDetails.lblCardStatus.text = self.geti18nDrivenString(card.cardStatus);
			// this.view.CardLockVerificationStep.cardDetails.lblCardStatusAccessibility.text = 'Card Status - ' + self.geti18nDrivenString(card.cardStatus);
			// this.view.CardLockVerificationStep.cardDetails.lblCardStatus.skin = self.statusSkinsDetailsScreen[card.cardStatus];
			//this.getImageForCard(card.productName);


			this.view.CardLockVerificationStep.cardDetails.lblCardHeader.text = card.productName;
			this.view.CardLockVerificationStep.cardDetails.rtxValueMobile.text = card.maskedCardNumber;
			this.view.CardLockVerificationStep.cardDetails.lblCardStatusMobile.text = self.geti18nDrivenString(card.cardStatus);
			this.view.CardLockVerificationStep.cardDetails.lblCardStatusMobile.skin = self.statusSkinsDetailsScreen[card.cardStatus];
		},
		/**
		 * geti18nDrivenString - Returns i18n driven string for card status
		 * @param {String} - card status.
		 * @returns {String}  - i18n driven card status.
		 */
		geti18nDrivenString: function(cardStatus) {
			if (cardStatus === OLBConstants.CARD_STATUS.Active) {
				return kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE");
			}
			if (cardStatus === OLBConstants.CARD_STATUS.Inactive) {
				return kony.i18n.getLocalizedString("i18n.CardManagement.inactive");
			}
			/*  if (cardStatus === OLBConstants.CARD_STATUS.Cancelled) {
			      return kony.i18n.getLocalizedString("i18n.CardManagement.cancelled");
			  }*/
			if (cardStatus === OLBConstants.CARD_STATUS.ReportedLost) {
				return kony.i18n.getLocalizedString("i18n.CardManagement.reportedCardLost");
			}
			/*  if (cardStatus === OLBConstants.CARD_STATUS.ReplaceRequestSent) {
			      return kony.i18n.getLocalizedString("i18n.CardManagement.replaceRequestSent");
			  }
			  if (cardStatus === OLBConstants.CARD_STATUS.CancelRequestSent) {
			      return kony.i18n.getLocalizedString("i18n.CardManagement.cancelRequestSent");
			  }*/
			if (cardStatus === OLBConstants.CARD_STATUS.Locked) {
				return kony.i18n.getLocalizedString("i18n.CardManagement.locked");
			}
			/* if (cardStatus === OLBConstants.CARD_STATUS.Replaced) {
			     return kony.i18n.getLocalizedString("i18n.CardManagement.replaced");
			 }
			 if (cardStatus === OLBConstants.CARD_STATUS.Issued) {
			     return kony.i18n.getLocalizedString("i18n.CardManagement.inactive");
			 }*/
		},
		/**
		 * Method to enable terms and conditions on lock card.
		 */
		EnableTermsAndConditionsForLockCards: function() {
			var self = this;
			this.view.CardLockVerificationStep.CardActivation.btnTermsAndConditions.onClick = function() {
				self.currentTermsAndConditionsWidget = "LockCard";
				self.view.flxTermsAndConditionsPopUp.height = (self.view.flxMain.info.frame.height + 320) + "dp";
				self.view.flxTermsAndConditionsPopUp.isVisible = true;
				self.view.lblTermsAndConditions.setActive(true);
				if (CommonUtilities.isFontIconChecked(self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon)) {
					CommonUtilities.setLblCheckboxState(true, self.view.lblTCContentsCheckboxIcon);
				} else {
					CommonUtilities.setLblCheckboxState(false, self.view.lblTCContentsCheckboxIcon);
				}
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.showTermsAndConditionsLockCard();
			};
			this.view.btnCancel.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.isVisible = false;
			};
			this.view.flxClose.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.isVisible = false;
				if (self.currentTermsAndConditionsWidget.toLowerCase() === "lockcard") {
					self.view.CardLockVerificationStep.CardActivation.btnTermsAndConditions.setActive(true);
				} else if (self.currentTermsAndConditionsWidget.toLowerCase() === "unlockcard") {
					self.view.CardActivation.btnTermsAndConditions.setActive(true);
				}
			};
			this.view.flxTCContentsCheckbox.onClick = function() {
				CommonUtilities.toggleFontCheckbox(self.view.lblTCContentsCheckboxIcon);
			};
			this.view.btnSave.onClick = function() {
				if (CommonUtilities.isFontIconChecked(self.view.lblTCContentsCheckboxIcon)) {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setLblCheckboxState(true, self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
				} else {
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setLblCheckboxState(false, self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
				}
				self.view.flxTermsAndConditionsPopUp.isVisible = false;
			};
		},
		/**
		 * showLockCardGuidelines - Shows the guidelines for Locking a card and sets flow actions.
		 * @param {Object} - card object.
		 */
		showLockCardGuidelines: function(card) {
			var self = this;
			self.EnableTermsAndConditionsForLockCards();
			this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"));
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.CardActivation.lblWarning.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockingCard").replace('$CardType', card.cardType.toLowerCase()).replace('$CardNumber', card.maskedCardNumber);
			this.view.CardLockVerificationStep.CardActivation.lblIns1.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockedCardGuideline1");
			this.view.CardLockVerificationStep.CardActivation.lblIns2.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockedCardGuideline2");
			this.view.CardLockVerificationStep.CardActivation.lblIns3.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockedCardGuideline3");
			this.view.CardLockVerificationStep.CardActivation.lblIns4.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockedCardGuideline4");
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString('i18n.common.proceed')
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			FormControllerUtility.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			CommonUtilities.setLblCheckboxState(false, this.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
			self.view.CardLockVerificationStep.CardActivation.flxCheckbox.accessibilityConfig = {
				"a11yLabel": "I Agree to terms and conditions",
				"a11yARIA": {
					"aria-checked": false,
					"role": "checkbox"
				}
			};
			self.view.CardLockVerificationStep.CardActivation.flxCheckbox.onClick = function() {
				CommonUtilities.toggleFontCheckbox(self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
				if (CommonUtilities.isFontIconChecked(self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon)) {
					FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setLblCheckboxState(true, self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
					self.view.CardLockVerificationStep.CardActivation.flxCheckbox.accessibilityConfig = {
						"a11yLabel": "I Agree to terms and conditions",
						"a11yARIA": {
							"aria-checked": true,
							"role": "checkbox"
						}
					};
				} else {
					FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					CommonUtilities.setLblCheckboxState(false, self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
					self.view.CardLockVerificationStep.CardActivation.flxCheckbox.accessibilityConfig = {
						"a11yLabel": "I Agree to terms and conditions",
						"a11yARIA": {
							"aria-checked": false,
							"role": "checkbox"
						}
					};
				}
			};
			var params = {
				'card': card
			};
			this.view.CardLockVerificationStep.btnCancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				this.view.CardLockVerificationStep.CardActivation.flxCheckbox.onClick = function() {
					CommonUtilities.toggleFontCheckbox(self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
					if (CommonUtilities.isFontIconChecked(self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon)) {
						FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
						CommonUtilities.setLblCheckboxState(true, self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
						self.view.CardLockVerificationStep.CardActivation.flxCheckbox.accessibilityConfig = {
							"a11yLabel": "I Agree to terms and conditions",
							"a11yARIA": {
								"aria-checked": true,
								"role": "checkbox"
							}
						};
					} else {
						FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
						CommonUtilities.setLblCheckboxState(false, self.view.CardLockVerificationStep.CardActivation.lblRememberMeIcon);
						self.view.CardLockVerificationStep.CardActivation.flxCheckbox.accessibilityConfig = {
							"a11yLabel": "I Agree to terms and conditions",
							"a11yARIA": {
								"aria-checked": false,
								"role": "checkbox"
							}
						};
					}
				}.bind(this);
				this.view.CardLockVerificationStep.btnConfirm.onClick = self.initMFAFlow.bind(this, params, kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"));
			}
			this.view.CardLockVerificationStep.btnConfirm.accessibilityConfig = {
				"a11yLabel": "Continue with the lock card process"
			};
			this.view.CardLockVerificationStep.btnCancel.accessibilityConfig = {
				"a11yLabel": "Cancel lock card process"
			};
		},
		alignConfirmButtons: function(buttonsJSON) {
			if (buttonsJSON.btnModify.isVisible) {
				//this.view.CardLockVerificationStep.btnCancel.left = '30.33%';
				if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)
					this.view.CardLockVerificationStep.height = "170dp";
				else
					this.view.CardLockVerificationStep.height = "500dp";
			} else {
				//if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) 
					//this.view.CardLockVerificationStep.btnCancel.right = '26.5%';
				//else
					//this.view.CardLockVerificationStep.btnCancel.right = '16.5%';
				this.view.CardLockVerificationStep.height = "500dp";
			}
			this.view.CardLockVerificationStep.btnConfirm.setVisibility(buttonsJSON.btnConfirm.isVisible);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.btnConfirm.text = buttonsJSON.btnConfirm.text;
			this.view.CardLockVerificationStep.btnModify.setVisibility(buttonsJSON.btnModify.isVisible);
			this.view.CardLockVerificationStep.btnModify.text = buttonsJSON.btnModify.text;
			this.view.CardLockVerificationStep.btnCancel.setVisibility(buttonsJSON.btnCancel.isVisible);
			this.view.CardLockVerificationStep.btnCancel.text = buttonsJSON.btnCancel.text;
			this.view.forceLayout();
		},
		/**
		 * unlockCard - Entry point for unlock card flow.
		 * @param {Object} - card object.
		 */
		unlockCard: function(card) {
			this.showUnlockCardGuidelines(card);
			this.view.forceLayout();
		},
		/**
		 * showUnlockCardViewAndShowMFAScreen - Sets the UI for unlock card flow.
		 * @param {Object} params - contains the card details.
		 * @param {String} action - contains the action to be performed.
		 */
		showUnlockCardViewAndShowMFAScreen: function(params, action) {
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			this.view.flxActivateCard.setVisibility(false);
			this.view.flxCardVerification.setVisibility(true);
			this.view.CardLockVerificationStep.setVisibility(true);
			this.view.CardLockVerificationStep.flxLeft.setVisibility(true);
			this.view.CardLockVerificationStep.flxVerifyByOptions.setVisibility(true);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.setCardDetails(params.card);
			this.showMFAScreen(params, kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"));
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.flxMain.setFocus(true);
		},
		/**
		 * Method used to show the unlock card guidelines screen.
		 * @param {Object} card - contains the card object.
		 */
		showUnlockCardGuidelines: function(card) {
			var self = this;
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			this.view.flxActivateCard.setVisibility(true);
			this.view.flxTermsAndConditions.setVisibility(false);
			self.EnableTermsAndConditionsForUnLockCards();
			this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"));
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardActivation.lblWarning.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockingCard").replace('$CardType', card.cardType.toLowerCase()).replace('$CardNumber', card.maskedCardNumber);
			this.view.CardActivation.lblHeading2.text = kony.i18n.getLocalizedString("i18n.CardManagement.BenefitsOfUnlockingTheCard");
			this.view.CardActivation.lblIns1.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockBenefit1");
			this.view.CardActivation.lblIns2.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockBenefit2");
			this.view.CardActivation.lblIns3.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockBenefit3");
			this.view.CardActivation.flxFour.setVisibility(false);
			FormControllerUtility.disableButton(this.view.CardActivation.btnProceed);
			CommonUtilities.setLblCheckboxState(false, this.view.CardActivation.lblRememberMeIcon);
			self.view.CardActivation.flxCheckbox.accessibilityConfig = {
				"a11yLabel": "I Agree to terms and conditions",
				"a11yARIA": {
					"aria-checked": false,
					"role": "checkbox"
				}
			};
			this.view.CardActivation.btnCancel.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			if (CommonUtilities.isCSRMode()) {
				this.view.CardActivation.btnProceed.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardActivation.btnProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				this.view.CardActivation.flxCheckbox.onClick = function() {
					CommonUtilities.toggleFontCheckbox(self.view.CardActivation.lblRememberMeIcon);
					if (CommonUtilities.isFontIconChecked(self.view.CardActivation.lblRememberMeIcon)) {
						FormControllerUtility.enableButton(self.view.CardActivation.btnProceed);
						CommonUtilities.setLblCheckboxState(true, self.view.lblTCContentsCheckboxIcon);
						self.view.CardActivation.flxCheckbox.accessibilityConfig = {
							"a11yLabel": "I Agree to terms and conditions",
							"a11yARIA": {
								"aria-checked": true,
								"role": "checkbox"
							}
						};
					} else {
						FormControllerUtility.disableButton(self.view.CardActivation.btnProceed);
						CommonUtilities.setLblCheckboxState(false, self.view.lblTCContentsCheckboxIcon);
						self.view.CardActivation.flxCheckbox.accessibilityConfig = {
							"a11yLabel": "I Agree to terms and conditions",
							"a11yARIA": {
								"aria-checked": false,
								"role": "checkbox"
							}
						};
					}
				}.bind(this);
				this.view.CardActivation.btnProceed.onClick = function() {
					var params = {
						'card': card
					};
					self.initMFAFlow.call(self, params, kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"));
				}.bind(this);
			}
			this.AdjustScreen();
			self.view.CardActivation.btnCancel.accessibilityConfig = {
				"a11yLabel": "Cancel unlock card process"
			};
			self.view.CardActivation.btnProceed.accessibilityConfig = {
				"a11yLabel": "Continue with the unlock card process"
			};
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},
		/**
		 * EnableTermsAndConditionsForUnLockCards - Method to enable terms and conditions on unlock card.
		 */
		EnableTermsAndConditionsForUnLockCards: function() {
			var self = this;
			this.view.CardActivation.btnTermsAndConditions.onClick = function() {
				self.currentTermsAndConditionsWidget = "UnLockCard";
				self.view.flxTermsAndConditionsPopUp.height = (self.view.flxMain.info.frame.height + 270) + "dp";
				self.view.flxTermsAndConditionsPopUp.isVisible = true;
				self.view.lblTermsAndConditions.setActive(true);
				if (CommonUtilities.isFontIconChecked(self.view.CardActivation.lblRememberMeIcon)) {
					CommonUtilities.setLblCheckboxState(true, self.view.lblTCContentsCheckboxIcon);
				} else {
					CommonUtilities.setLblCheckboxState(false, self.view.lblTCContentsCheckboxIcon);
				}
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.showTermsAndConditionsUnlockCard();
			};
			this.view.btnCancel.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.isVisible = false;
			};
			this.view.flxClose.onClick = function() {
				self.view.flxTermsAndConditionsPopUp.isVisible = false;
				if (self.currentTermsAndConditionsWidget.toLowerCase() === "lockcard") {
					self.view.CardLockVerificationStep.CardActivation.btnTermsAndConditions.setActive(true);
				} else if (self.currentTermsAndConditionsWidget.toLowerCase() === "unlockcard") {
					self.view.CardActivation.btnTermsAndConditions.setActive(true);
				}
			};
			this.view.flxTCContentsCheckbox.onClick = function() {
				CommonUtilities.toggleFontCheckbox(self.view.lblTCContentsCheckboxIcon);
			};
			this.view.btnSave.onClick = function() {
				if (CommonUtilities.isFontIconChecked(self.view.lblTCContentsCheckboxIcon)) {
					CommonUtilities.setLblCheckboxState(true, self.view.CardActivation.lblRememberMeIcon);
					FormControllerUtility.enableButton(self.view.CardActivation.btnProceed);
				} else {
					FormControllerUtility.disableButton(self.view.CardActivation.btnProceed);
					CommonUtilities.setLblCheckboxState(false, self.view.CardActivation.lblRememberMeIcon);
				}
				self.view.flxTermsAndConditionsPopUp.isVisible = false;
			};
		},
		/**
		 * Method used as the entry point for report lost screen.
		 * @param {Object} card - contains the card object.
		 */
		reportLost: function(card) {
			this.showReportLostView();
			this.setCardDetails(card);
			this.showReportLostGuidelines(card);
			this.setMobileHeader(kony.i18n.getLocalizedString("i18n.CardManagement.ReportLostOrStolen"));
			this.AdjustScreen();
			this.view.forceLayout();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxMain.setFocus(true);
		},
		/**
		 * Method used to show report lost view.
		 */
		showReportLostView: function() {
			this.hideAllCardManagementViews();
			this.hideAllCardManagementRightViews();
			this.view.flxCardVerification.setVisibility(true);
			this.view.CardLockVerificationStep.setVisibility(true);
			this.view.CardLockVerificationStep.flxLeft.setVisibility(true);
			this.view.CardLockVerificationStep.flxCardReplacement.setVisibility(true);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.CardLockVerificationStep.WarningMessage.flxIAgree.setVisibility(false);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method used to set report card lost guidelines.
		 */
		showReportLostGuidelines: function(card) {
			var self = this;
			this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolen"));
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.CardManagement.ReportLostOrStolen");
			this.view.title = this.view.CardLockVerificationStep.confirmHeaders.lblHeading.text;
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText1.text = kony.i18n.getLocalizedString("i18n.CardManagement.ReportLostOrStolenGuideline1");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText2.text = kony.i18n.getLocalizedString("i18n.CardManagement.ReportLostOrStolenGuideline2");
			this.view.CardLockVerificationStep.WarningMessage.rtxWarningText3.text = kony.i18n.getLocalizedString("i18n.CardManagement.ReportLostOrStolenGuideline3");
			this.view.CardLockVerificationStep.WarningMessage.flxWarningText4.setVisibility(false);
			this.view.CardLockVerificationStep.lblReason2.setVisibility(true);
			this.view.CardLockVerificationStep.lblReason2.text = kony.i18n.getLocalizedString("i18n.CardManagement.PleaseEnterTheReasonMessage") + " :";
			this.view.CardLockVerificationStep.lbxReason2.setVisibility(false);
			this.view.CardLockVerificationStep.lblReason1.setVisibility(true);
			this.view.CardLockVerificationStep.lblReason1.left = "100dp";
			this.view.CardLockVerificationStep.lblReason1.top = "-18dp";
			var reasonsMasterData = [];
			reasonsMasterData.push([OLBConstants.CARD_REPORTLOST_REASON.LOST, kony.i18n.getLocalizedString("kony.mb.cardManage.Lost")], [OLBConstants.CARD_REPORTLOST_REASON.STOLEN, kony.i18n.getLocalizedString("kony.mb.cardManage.Stolen")]);
			//this.view.CardLockVerificationStep.lbxReason2.masterData = reasonsMasterData;
			//this.view.CardLockVerificationStep.lbxReason2.selectedKey = OLBConstants.CARD_REPORTLOST_REASON.LOST;
			this.view.CardLockVerificationStep.lblReason1.text = OLBConstants.CARD_REPORTLOST_REASON.LOST;;
			this.view.CardLockVerificationStep.tbxNoteOptional.text = "";
			this.view.CardLockVerificationStep.tbxNoteOptional.maxTextLength = OLBConstants.NOTES_LENGTH;
			this.view.CardLockVerificationStep.lblUpgrade.setVisibility(false);
			this.view.CardLockVerificationStep.flxAddresslabel.setVisibility(false);
			this.view.CardLockVerificationStep.flxAddress.setVisibility(false);
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString('i18n.common.proceed')
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			this.view.CardLockVerificationStep.btnCancel.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
					var params = {
						'card': card,
						'Reason': self.view.CardLockVerificationStep.lblReason1.text,
						'notes': self.view.CardLockVerificationStep.tbxNoteOptional.text
					};
					self.initMFAFlow.call(self, params, kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				}.bind(this);
			}

			this.view.CardLockVerificationStep.btnConfirm.accessibilityConfig = {
				"a11yLabel": "Continue with the report lost/stolen card process",
				"a11yARIA": {
					"role": "button"
				}
			};
			this.view.CardLockVerificationStep.btnCancel.accessibilityConfig = {
				"a11yLabel": "Cancel report lost/stolen card process",
				"a11yARIA": {
					"role": "button"
				}
			};
		},
		/**
		 * Method used as entry point method for change pin flow.
		 * @param {Object} card - contains the card object.
		 */
		changePin: function(card) {
			this.showChangePinView();
			this.setCardDetails(card);
			// if (card.cardType === 'Credit') {
			//  this.startOfflineChangePinFlow(card);
			//} else if (card.cardType === 'Debit') {
			this.startOnlineChangePinFlow(card);
			//}
			this.setMobileHeader(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"))
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.CardLockVerificationStep.btnConfirm.accessibilityConfig = {
				"a11yLabel": "Continue with the change card pin process"
			};
			this.view.CardLockVerificationStep.btnCancel.accessibilityConfig = {
				"a11yLabel": "Cancel change card pin process"
			};
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxMain.setFocus(true);
		},
		/**
		 * Method used to show change pin view.
		 */
		showChangePinView: function() {
			this.hideAllCardManagementViews();
			this.view.flxCardVerification.setVisibility(true);
			this.view.CardLockVerificationStep.setVisibility(true);
			this.view.CardLockVerificationStep.flxLeft.setVisibility(true);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.CardLockVerificationStep.lblCurrentPIN.setVisibility(false);
			this.view.CardLockVerificationStep.flxCurrentPIN.setVisibility(false);
			this.view.CardLockVerificationStep.WarningMessage.flxIAgree.setVisibility(false);
			this.view.CardLockVerificationStep.Copywarning0b8a8390f76a040.flxIAgree.setVisibility(false);
			this.view.CardLockVerificationStep.warning.flxIAgree.setVisibility(false);
			this.AdjustScreen();
		},
		/**
		 * Method used to start online change pin flow.
		 * @param {Object} card - contains the card object.
		 */
		startOnlineChangePinFlow: function(card) {
			var self = this;
			this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangeCardPin"));
			this.hideAllCardManagementRightViews();
			this.view.CardLockVerificationStep.flxConfirmPIN.right = "";
			this.view.CardLockVerificationStep.flxConfirmPIN.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.warning.rtxWarningText1.text = kony.i18n.getLocalizedString("i18n.CardManagement.OnlineChangePinGuideline1");
			this.view.CardLockVerificationStep.warning.rtxWarningText2.text = kony.i18n.getLocalizedString("i18n.CardManagement.OnlineChangePinGuideline2");
			this.view.CardLockVerificationStep.warning.flxWarningText3.setVisibility(false);
			this.view.CardLockVerificationStep.warning.flxWarningText4.setVisibility(false);
			this.view.CardLockVerificationStep.lblReason.setVisibility(false);
			this.view.CardLockVerificationStep.lbxReason.setVisibility(false);
			this.view.CardLockVerificationStep.tbxCurrentPIN.text = "";
			this.view.CardLockVerificationStep.tbxNewPIN.text = "";
			this.view.CardLockVerificationStep.imgNewPIN.setVisibility(false);
			this.view.CardLockVerificationStep.tbxConfirmPIN.text = "";
			this.view.CardLockVerificationStep.imgConfirmPIN.setVisibility(false);
			this.view.CardLockVerificationStep.tbxNote.text = "";
			this.view.CardLockVerificationStep.tbxNote.maxTextLength = OLBConstants.NOTES_LENGTH;
			this.view.CardLockVerificationStep.tbxConfirmPIN.secureTextEntry = false;
			FormControllerUtility.disableButton(this.view.CardLockVerificationStep.btnConfirm);
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.common.proceed")
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			this.view.CardLockVerificationStep.btnCancel.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				this.view.CardLockVerificationStep.tbxCurrentPIN.onKeyUp = function() {
					this.hideServerError();
					var enteredPin = self.view.CardLockVerificationStep.tbxCurrentPIN.text;
					if (self.isValidPin(enteredPin) && self.isValidPin(self.view.CardLockVerificationStep.tbxNewPIN.text) && self.view.CardLockVerificationStep.tbxNewPIN.text === self.view.CardLockVerificationStep.tbxConfirmPIN.text) {
						FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					} else {
						FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					}
				}.bind(this);
				this.view.CardLockVerificationStep.tbxNewPIN.onKeyUp = function() {
					this.hideServerError();
					var enteredPin = self.view.CardLockVerificationStep.tbxNewPIN.text;
					if (self.isValidPin(enteredPin) && /*self.isValidPin(self.view.CardLockVerificationStep.tbxCurrentPIN.text) &&*/ enteredPin === self.view.CardLockVerificationStep.tbxConfirmPIN.text) {
						FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					} else {
						FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					}
					if (self.isValidPin(enteredPin) && enteredPin === self.view.CardLockVerificationStep.tbxConfirmPIN.text) {
						self.view.CardLockVerificationStep.imgConfirmPIN.setVisibility(true);
						self.view.CardLockVerificationStep.imgConfirmPIN.src = 'success_green.png';
						self.view.forceLayout();
						self.view.CardLockVerificationStep.tbxNewPIN.accessibilityConfig = {
							"a11yLabel": "New pin validated successfully"
						};
					} else {
						self.view.CardLockVerificationStep.imgConfirmPIN.setVisibility(false);
						self.view.CardLockVerificationStep.tbxNewPIN.accessibilityConfig = {
							"a11yLabel": "New PIN"
						};
					}
					if (self.isValidPin(enteredPin)) {
						self.view.CardLockVerificationStep.imgNewPIN.setVisibility(true);
						self.view.CardLockVerificationStep.imgNewPIN.src = 'success_green.png';
						self.view.CardLockVerificationStep.tbxNewPIN.accessibilityConfig = {
							"a11yLabel": "New PIN validated successfully"
						};
						self.view.forceLayout();
					} else {
						self.view.CardLockVerificationStep.imgNewPIN.setVisibility(false);
						self.view.CardLockVerificationStep.tbxNewPIN.accessibilityConfig = {
							"a11yLabel": "New PIN"
						};
					}
				}.bind(this);
				this.view.CardLockVerificationStep.tbxConfirmPIN.onKeyUp = function() {
					this.hideServerError();
					var enteredPin = self.view.CardLockVerificationStep.tbxConfirmPIN.text;
					if (self.isValidPin(enteredPin) && /*self.isValidPin(self.view.CardLockVerificationStep.tbxCurrentPIN.text) &&*/ enteredPin === self.view.CardLockVerificationStep.tbxNewPIN.text) {
						FormControllerUtility.enableButton(self.view.CardLockVerificationStep.btnConfirm);
					} else {
						FormControllerUtility.disableButton(self.view.CardLockVerificationStep.btnConfirm);
					}
					if (self.isValidPin(enteredPin) && enteredPin === self.view.CardLockVerificationStep.tbxNewPIN.text) {
						self.view.CardLockVerificationStep.imgConfirmPIN.setVisibility(true);
						self.view.CardLockVerificationStep.imgConfirmPIN.src = 'success_green.png';
						self.view.CardLockVerificationStep.tbxConfirmPIN.accessibilityConfig = {
							"a11yLabel": "Confirm PIN validated successfully"
						};
						self.view.forceLayout();
					} else {
						self.view.CardLockVerificationStep.imgConfirmPIN.setVisibility(false);
						self.view.CardLockVerificationStep.tbxConfirmPIN.accessibilityConfig = {
							"a11yLabel": "Confirm PIN"
						};
					}
				}.bind(this);
				this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
					var params = {
						'card': card,
						'reason': self.view.CardLockVerificationStep.lbxReasonPinChange.selectedKey,
						'notes': self.view.CardLockVerificationStep.tbxNote.text,
						'newPin': self.view.CardLockVerificationStep.tbxConfirmPIN.text,
						'pinNumber': self.view.CardLockVerificationStep.tbxCurrentPIN.text
					};
					self.initMFAFlow(params, kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"));
				}.bind(this);
			}
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method used to check if the entered pin is valid or not.
		 * @param {String} pin - contains the entered pin.
		 */
		isValidPin: function(pin) {
			var regex = new RegExp('^[0-9]{4,4}$');
			if (regex.test(pin)) {
				for (var i = 1; i < pin.length; i++) {
					if (Number(pin[i]) - 1 !== Number(pin[i - 1])) {
						return true;
					}
				}
			}
			return false;
		},
		/**
		 * Method used to start teh offline change pin flow.
		 * @param {Object} card - contains the card object.
		 */
		startOfflineChangePinFlow: function(card) {
			var self = this;
			var selectedOption = "E-mail ID";
			this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangeCardPin"));
			this.hideAllCardManagementRightViews();
			this.view.CardLockVerificationStep.flxChangeCardPin.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.Copywarning0b8a8390f76a040.rtxWarningText1.text = kony.i18n.getLocalizedString("i18n.CardManagement.OfflineChangePinGuideline1");
			this.view.CardLockVerificationStep.Copywarning0b8a8390f76a040.rtxWarningText2.text = kony.i18n.getLocalizedString("i18n.CardManagement.OfflineChangePinGuideline2");
			this.view.CardLockVerificationStep.Copywarning0b8a8390f76a040.flxWarningText3.setVisibility(false);
			this.view.CardLockVerificationStep.Copywarning0b8a8390f76a040.flxWarningText4.setVisibility(false);
			var reasonsMasterData = [];
			reasonsMasterData.push([OLBConstants.CARD_CHANGE_PIN_REASON.PIN_COMPROMISED, OLBConstants.CARD_CHANGE_PIN_REASON.PIN_COMPROMISED]);
			reasonsMasterData.push([OLBConstants.CARD_CHANGE_PIN_REASON.FORGOT_PIN, OLBConstants.CARD_CHANGE_PIN_REASON.FORGOT_PIN]);
			reasonsMasterData.push([OLBConstants.CARD_CHANGE_PIN_REASON.OTHER, OLBConstants.CARD_CHANGE_PIN_REASON.OTHER]);
			this.view.CardLockVerificationStep.lbxReasonPinChange.masterData = reasonsMasterData;
			this.view.CardLockVerificationStep.lbxReasonPinChange.selectedKey = OLBConstants.CARD_CHANGE_PIN_REASON.PIN_COMPROMISED;
			this.view.CardLockVerificationStep.tbxNotePinChange.text = "";
			this.view.CardLockVerificationStep.tbxNotePinChange.maxTextLength = OLBConstants.NOTES_LENGTH;
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.CardLockVerificationStep.lblOption1.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId");
			this.view.CardLockVerificationStep.lblOption2.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumbers");
			this.view.CardLockVerificationStep.lblOption3.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.postalAddress");
			this.view.CardLockVerificationStep.lblCheckBox1.skin = ViewConstants.SKINS.CARD_RADIOBTN_LABEL_SELECTED;
			this.view.CardLockVerificationStep.lblCheckBox1.text = "M";
			this.view.CardLockVerificationStep.lblCheckBox2.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
			this.view.CardLockVerificationStep.lblCheckBox2.text = "L";
			this.view.CardLockVerificationStep.lblCheckBox3.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
			this.view.CardLockVerificationStep.lblCheckBox3.text = "L";
			this.view.CardLockVerificationStep.rtxRegisteredOption.text = kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredEmailID") + " " + applicationManager.getUserPreferencesManager().getUserEmail();;
			this.view.CardLockVerificationStep.flxCheckBox1.onTouchEnd = function() {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				self.view.CardLockVerificationStep.lblCheckBox1.skin = ViewConstants.SKINS.CARD_RADIOBTN_LABEL_SELECTED;
				self.view.CardLockVerificationStep.lblCheckBox1.text = "M";
				self.view.CardLockVerificationStep.lblCheckBox2.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
				self.view.CardLockVerificationStep.lblCheckBox2.text = "L";
				self.view.CardLockVerificationStep.lblCheckBox3.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
				self.view.CardLockVerificationStep.lblCheckBox3.text = "L";
				selectedOption = "E-mail ID";
				self.view.CardLockVerificationStep.rtxRegisteredOption.text = kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredEmailID") + " " + applicationManager.getUserPreferencesManager().getUserEmail();;
			};
			this.view.CardLockVerificationStep.flxCheckBox2.onTouchEnd = function() {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				self.view.CardLockVerificationStep.lblCheckBox1.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
				self.view.CardLockVerificationStep.lblCheckBox1.text = "L";
				self.view.CardLockVerificationStep.lblCheckBox2.skin = ViewConstants.SKINS.CARD_RADIOBTN_LABEL_SELECTED;
				self.view.CardLockVerificationStep.lblCheckBox2.text = "M";
				self.view.CardLockVerificationStep.lblCheckBox3.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
				self.view.CardLockVerificationStep.lblCheckBox3.text = "L";
				selectedOption = "Phone No";
				self.view.CardLockVerificationStep.rtxRegisteredOption.text = kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredPhoneNo") + " " + applicationManager.getUserPreferencesManager().getUserPhone();
			};
			this.view.CardLockVerificationStep.flxCheckBox3.onTouchEnd = function() {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				self.view.CardLockVerificationStep.lblCheckBox1.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
				self.view.CardLockVerificationStep.lblCheckBox1.text = "L";
				self.view.CardLockVerificationStep.lblCheckBox2.skin = ViewConstants.SKINS.CARDS_RADIOBTN_LABEL_UNSELECTED;
				self.view.CardLockVerificationStep.lblCheckBox2.text = "L";
				self.view.CardLockVerificationStep.lblCheckBox3.skin = ViewConstants.SKINS.CARD_RADIOBTN_LABEL_SELECTED;
				self.view.CardLockVerificationStep.lblCheckBox3.text = "M";
				selectedOption = 'Postal Address';
				self.view.CardLockVerificationStep.rtxRegisteredOption.text = kony.i18n.getLocalizedString("i18n.CardManagement.RegisteredAddress") + " " + card.billingAddress;
			};
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.common.proceed")
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			FormControllerUtility.enableButton(this.view.CardLockVerificationStep.btnConfirm);
			this.view.CardLockVerificationStep.btnCancel.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.CardLockVerificationStep.btnCancel.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			if (CommonUtilities.isCSRMode()) {
				this.view.CardLockVerificationStep.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
				this.view.CardLockVerificationStep.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
			} else {
				this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
					var params = {
						'card': card,
						'CardAccountNumber': card.maskedCardNumber,
						'CardAccountName': card.productName,
						'RequestReason': self.view.CardLockVerificationStep.lbxReasonPinChange.selectedKey,
						'AdditionalNotes': self.view.CardLockVerificationStep.tbxNotePinChange.text,
						'AccountType': 'CARD',
						'RequestCode': 'NEW_PIN',
						'Channel': OLBConstants.CHANNEL_DESKTOP
					};
					if (selectedOption === 'Postal Address') {
						params['Address_id'] = self.getSelectedAddressId();
					} else if (selectedOption === "Phone No") {
						var contactNumbers = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchUserPhoneNumbers();
						params['communication_id'] = contactNumbers.filter(function(item) {
							return item.isPrimary === "true"
						})[0].id;
					} else {
						var emailids = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchUserEmailIds();
						params['communication_id'] = emailids.filter(function(item) {
							return item.isPrimary === "true"
						})[0].id;
					}
					self.initMFAFlow(params, "Offline_Change_Pin");
				}.bind(this);
			}
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method used as entry point method for set limits flow.
		 * @param {Object} card - contains the card object.
		 */
		setLimits: function(card) {
			var scope = this;
			this.initLimitsSliders(card);
			this.setCardLimitsGoToManageCards();
			this.editCardLimit();
			this.setCardLimitGoBackToCardLimits(card);
			this.setCardLimitShowConfirm(card);
			this.showSetCardLimitsOverviewView();
			this.view.lblCardName.text = card.productName;
			this.view.rtxCardNr.text = card.maskedCardNumber;
			this.view.lblWithdrawalLimitValue.text = card.dailyWithdrawalLimit;
			this.view.lblPurchaseLimitValue.text = card.purchaseLimit;
			this.setMobileHeader(kony.i18n.getLocalizedString("i18n.CardManagement.SetCardLimits"));
			this.view.flxContactUs1.onClick = function() {
				var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"appName": "AboutUsMA",
					"moduleName": "InformationContentUIModule"
				});
				informationContentModule.presentationController.showContactUsPage();
			};
			this.view.flxContactUs.onClick = function() {
				var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"appName": "AboutUsMA",
					"moduleName": "InformationContentUIModule"
				});
				informationContentModule.presentationController.showContactUsPage();
			};
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.lblSetCardLimitsHeader.setFocus(true);
			this.view.title = kony.i18n.getLocalizedString("i18n.CardManagement.SetCardLimits");
			//  this.view.btnRestoreWithdrawlDefaults.text = "Restore default value";
			//  this.view.btnRestorePurchaseDefaults.text = "Restore default value";
			this.view.confirmButtons.btnConfirm.accessibilityConfig = {
				"a11yLabel": "Confirm card limits"
			};
			this.view.confirmButtons.btnCancel.accessibilityConfig = {
				"a11yLabel": "Cancel set card limit process"
			};
			if (kony.os.deviceInfo().screenHeight < 200) {
				this.view.lblContactUsMsg.width = "90%";
				this.view.flxIncreaseLimits.height = "80dp";
				this.view.lblIncreaseLimit.width = "90%";
			}
		},
		/**
		 * Sets the UI for set limits Overview flow.
		 */
		showSetCardLimitsOverviewView: function() {
			this.hideAllCardManagementViews();
			this.view.rtxCardNr.setVisibility(true);
			this.view.btnRestoreWithdrawlDefaults.setVisibility(false);
			this.view.btnRestorePurchaseDefaults.setVisibility(false);
			//this.view.btnRestoreDefaults.setVisibility(false);
			this.view.flxSetCardLimits.setVisibility(true);
			this.view.flxCardLimits.setVisibility(true);
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxSetCardLimitsOverview.setVisibility(true);
			this.view.flxRightBarSetCardLimits.setVisibility(true);
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.lblSetCardLimitsHeader.setFocus(true);
			this.view.btnEditLimitWithdrawal.accessibilityConfig = {
				"a11yLabel": "Edit limit for daily withdrawal",
				"a11yARIA": {
					"tabindex": 0,
				}
			}
			this.view.btnEditLimitPurchase.accessibilityConfig = {
				"a11yLabel": "Edit limit for daily purchase",
				"a11yARIA": {
					"tabindex": 0,
				}
			}
		},
		/**
		 * Sets the UI for set limits go to Manage Cards.
		 */
		setCardLimitsGoToManageCards: function() {
			this.view.btnBack.onClick = () => {
				this.hideAllCardManagementViews();
				this.showCards();
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnManageCards.onClick = () => {
				this.hideAllCardManagementViews();
				this.showCards();
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
		},
		/**
		 * Sets the UI for set limits New flow.
		 */
		showSetCardLimitsNewView: function(res) {
			this.hideAllCardManagementViews();
			var isMirrorLayoutEnabled = CommonUtilities2.isMirrorLayoutEnabled();
			//this.view.rtxCardNr.setVisibility(false);
			this.view.flxSetCardLimits.setVisibility(true);
			this.view.flxCardLimits.setVisibility(true);
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.flxSetCardLimitsNew.setVisibility(true);
			if (res === "withdrawl") {
				this.view.btnRestoreWithdrawlDefaults.setVisibility(true);
				this.view.btnRestorePurchaseDefaults.setVisibility(false);
			}
			if (res === "purchase") {
				//this.view.btnRestorePurchaseDefaults.right = "2.1%";
				if (isMirrorLayoutEnabled) {
					this.view.btnRestorePurchaseDefaults.width = "";
					this.view.btnRestorePurchaseDefaults.right = "";
				}
				this.view.btnRestorePurchaseDefaults.setVisibility(true);
				this.view.btnRestoreWithdrawlDefaults.setVisibility(false);
			}
			//this.view.btnRestoreDefaults.setVisibility(true);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Sets the UI for set limits Edit Limit.
		 */
		editCardLimit: function() {
			var res;
			this.view.btnEditLimitWithdrawal.onClick = () => {
				res = "withdrawl";
				this.showSetCardLimitsNewView(res);
				this.view.limitPrevWithdrawalSlider.selectedValue = this.view.limitWithdrawalSlider.selectedValue;
				this.view.flxDailyWithdrawalLimit.setVisibility(true);
				this.view.flxDailyPurchaseLimit.setVisibility(false);
			};
			this.view.btnEditLimitPurchase.onClick = () => {
				res = "purchase";
				this.showSetCardLimitsNewView(res);
				this.view.limitPrevPurchaseSlider.selectedValue = this.view.limitPurchaseSlider.selectedValue;
				this.view.flxDailyWithdrawalLimit.setVisibility(false);
				this.view.flxDailyPurchaseLimit.setVisibility(true);
			};
		},
		/**
		 * Sets the UI for set limits go to Card limits.
		 */
		setCardLimitGoBackToCardLimits: function(card) {
			this.view.confirmButtons.btnCancel.onClick = () => {
				this.restoreDefaultsWithdrawalLim(card);
				this.restoreDefaultsPurchaseLim(card);
				this.showSetCardLimitsOverviewView();
			};
			this.view.btnBackToCardLimits.onClick = () => {
				this.showSetCardLimitsOverviewView();
			};
		},
		/**
		 * Sets the UI for set limits Confirm.
		 */
		setCardLimitShowConfirm: function(card) {
			this.view.confirmButtons.btnConfirm.onClick = () => {
				this.hideAllCardManagementViews();
				applicationManager.getPresentationUtility().showLoadingScreen();
				if (CommonUtilities.getSCAType() == 0)
					this.updateCardLimits(card);
				else
					this.updateCardLimitsSCA(card);
				//            this.showNewCardLimitAcknowledgement(card);
			};
		},
		//ADDING SCA CODE
		setCVVScreenSCA: function(card) {
			FormControllerUtility.showProgressBar(this.view);
			let rmsComponent = new com.temenos.infinity.sca.rmsComponent({
				"appName": "ResourcesHIDMA"
			});
			let scopeObj = this;
			let appSessionId = "";
			if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
				appSessionId = applicationManager.getRmsSessionID();
			this.action = "CARD_MANAGEMENT_ACTIVATE_CARD";

			rmsComponent.rmsActionSuccess = function(output) {
				FormControllerUtility.hideProgressBar(this.view);
				if (output.userBlock == "true") {
					var errorMessage = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
					var viewProperties = {};
					viewProperties.serverError = errorMessage;
					viewProperties.progressBar = false;
					scopeObj.updateFormUI(viewProperties);
				} else {
					this.stepUp = output.stepUp;
					scopeObj.setCVVScreen(card, this.stepUp);
				}
			};
			rmsComponent.rmsActionFailure = function(output) {
				FormControllerUtility.hideProgressBar(this.view);
				this.stepUp = "true";
				scopeObj.setCVVScreen(card, this.stepUp);
			};

			rmsComponent.rmsActionCreate(this.action, appSessionId);


		},
		updateCardLimitsSCA: function(card) {
			FormControllerUtility.showProgressBar(this.view);
			let rmsComponent = new com.temenos.infinity.sca.rmsComponent({
				"appName": "ResourcesHIDMA"
			});
			let scopeObj = this;
			var rmsaction = "";
			if (this.view.flxDailyWithdrawalLimit.isVisible)
				rmsaction = "WITHDRAWAL";
			else
				rmsaction = "PURCHASE";
			rmsaction = "CARD_MANAGEMENT_UPDATE_" + rmsaction;
			let appSessionId = "";
			if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
				appSessionId = applicationManager.getRmsSessionID();
			rmsComponent.rmsActionSuccess = function(output) {
				FormControllerUtility.hideProgressBar(this.view);
				if (output.userBlock == "true") {
					var errorMessage = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
					var viewProperties = {};
					viewProperties.serverError = errorMessage;
					viewProperties.progressBar = false;
					scopeObj.updateFormUI(viewProperties);
				} else {
					var stepUp = output.stepUp;
					card.isMFARequired = stepUp;
					scopeObj.updateCardLimits(card);
				}
			};
			rmsComponent.rmsActionFailure = function(output) {
				FormControllerUtility.hideProgressBar(this.view);
				var stepUp = "true";
				card.isMFARequired = stepUp;
				scopeObj.updateCardLimits(card);
			};

			rmsComponent.rmsActionCreate(rmsaction, appSessionId);
		},
		initMFAFlow: function(params, action) {
			FormControllerUtility.showProgressBar(this.view);
			var rmsaction = action;
			let scopeObj = this;
			let rmsComponent = new com.temenos.infinity.sca.rmsComponent({
				"appName": "ResourcesHIDMA"
			});
			let appSessionId = "";
			if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE") appSessionId = applicationManager.getRmsSessionID();
			rmsaction = rmsaction.replace(/ /g, "_");
			switch (rmsaction) {
				case "Report_Lost":
					rmsaction = "Report_Card_Stolen";
					break;
				case "Offline_Change_Pin":
					rmsaction = "Change_Pin";
					break;
					deafult: rmsaction = rmsaction;
			}
			rmsaction = "CARD_MANAGEMENT_" + rmsaction;
			rmsComponent.rmsActionSuccess = function(output) {
				FormControllerUtility.hideProgressBar(this.view);
				if (output.userBlock == "true") {
					var errorMessage = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
					var viewProperties = {};
					viewProperties.serverError = errorMessage;
					viewProperties.progressBar = false;
					scopeObj.updateFormUI(viewProperties);
				} else {
					this.stepUp = output.stepUp;
					params.isMFARequired = this.stepUp;
					scopeObj.initSCARMSflow(params, action);
				}
			};
			rmsComponent.rmsActionFailure = function(output) {
				FormControllerUtility.hideProgressBar(this.view);
				this.stepUp = "true";
				params.isMFARequired = this.stepUp;
				scopeObj.initSCARMSflow(params, action);
			};
			rmsComponent.rmsActionCreate(rmsaction, appSessionId);
		},
		initSCARMSflow: function(params, action) {
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.verifySecureAccessCodeSuccess(params, action);
		},
		downLoadTransactionFile: function(fileUrl) {
			var data = {
				"url": fileUrl
			};
			var statement  = "Card_Statement_" + navManager.getCustomInfo("statement_monthYear");
            this.callDownloadService(data, statement)
			// this.callDownloadService(data, kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
			// 	"moduleName": "ManageCardsUIModule",
			// 	"appName": "CardsMA"
			// }).presentationController.transactionDetails);
			// this.view.downloadTransction.flxDowntimeWarning.setVisibility(false);
			FormControllerUtility.hideProgressBar(this.view);
		},
		callDownloadService: function(mfDownloadURL, fileName) {
			try {
				var self = this;
				var authToken = KNYMobileFabric.currentClaimToken;
				var xhr = new kony.net.HttpRequest();
				xhr.open('GET', mfDownloadURL.url, true);
				xhr.setRequestHeader("X-Kony-Authorization", authToken);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.responseType = "blob";
				xhr.onReadyStateChange = function() {
					try {
						if (xhr.readyState === 4 && xhr.status === 200) {
							self.downloadFileFromResponse(xhr.response, fileName);
						} else if (xhr.status !== 200) {
							kony.print(" ERROR: Error downloadin csv");
						}
					} catch (err) {
						kony.print(" ERROR:" + err);
					}
				};
				xhr.send();
			} catch (err) {
				kony.print(" ERROR:" + err);
			}
		},
		downloadFileFromResponse: function(csvData, fileName) {
			var format = "";
			fileType = "pdf";
			// fileType = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
			// 	"moduleName": "AccountsUIModule",
			// 	"appName": "ArrangementsMA"
			// }).presentationController.transactionDetails.fileType;
			switch (fileType) {
				case "csv":
					format = "text/csv;charset=utf-8,";
					break;
				case "xls":
					format = "application/vnd.ms-excel;charset=utf-8,";
					break;
				case "pdf":
					format = "application/pdf;charset=utf-8,";
					break;
			}
			var blobObj = new Blob([csvData], {
				type: format
			});
			var url = URL.createObjectURL(blobObj);
			var downloadLink = document.createElement("a");
			downloadLink.setAttribute('href', url);
			downloadLink.download = fileName + "." + fileType;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			kony.print("----" + fileType + "file downloaded----");
		},
		sortTransactionDetails: function(cardDetails) {
            this.view.segTransactionDetails.setVisibility(true);
            this.view.flxNoTransaction.setVisibility(false);
            this.view.segTransactionDetails.setData([]);
            this.view.segTransactionDetailsBilled.setData([]);
            this.view.segTransactionDetailsBilled.setVisibility(false);
            this.transactionList = cardDetails;
            var dataMap = {
                "flxTransactionList": "flxTransactionList",
                "flxList": "flxList",
                "lbl1": "lbl1",
                "lbl2": "lbl2",
                "lbl3": "lbl3",
                "lbl4": "lbl4",
                "lbl5": "lbl5"
            }
            this.view.segTransactionDetailsBilled.widgetDataMap = dataMap;
            this.view.segTransactionDetailsBilled.rowTemplate = "flxTransactionList";
            this.view.segTransactionDetails.widgetDataMap = dataMap;
            this.view.segTransactionDetails.rowTemplate = "flxTransactionList";
            var data = [];
            var data1 = [];
            if (cardDetails.pendingAuthInfo_out != undefined) {
                var TranList = cardDetails.pendingAuthInfo_out
            } else {
                var TranList = cardDetails
            }
            var transactions = TranList;;
            this.cacheUtils.setData(transactions);
            var navManager = applicationManager.getNavigationManager();
            var cardType = navManager.getCustomInfo("transaction_cardType");
            if (cardType == 'Credit') {
                for (var i = 0; i < transactions.length; i++) {
                    var date = new Date(transactions[i].postingDate);
                    var day = String(date.getDate()).padStart(2, '0');
                    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    var year = date.getFullYear();
                    var compareDate = `${year}-${month}-${day}`;
                    var formattedDate = `${day}/${month}/${year}`;
                    var action = '';
					var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
					var currentBankDate="";
					if(bankDate){
						currentBankDate = bankDate.currentWorkingDate;
					}
					var dispute = "false";
                    var disputeDate = new Date(currentBankDate);
                    disputeDate.setDate(disputeDate.getDate() -  OLBConstants.CLIENT_PROPERTIES.NO_OF_DAYS_CARD_DISPUTE);
					var comparedDate = new Date(compareDate);
					if(comparedDate > disputeDate){
						dispute = "true";
					}
                    if (TranList[i].reserved5 == '00' && TranList[i].reserved4 == 'Matched' && TranList[i].isDisputed != 'true' && dispute == "true") {
                        action = 'Mark as Dispute';
                    } else if (TranList[i].isDisputed == 'true') {
                        action = 'Disputed';
                    } else {
                        action = ''
                    }
                    var amount = TranList[i].billingAmount.split(".");
                    if (amount[0] == null || amount[0] == undefined || amount[0] == "") {
                        amount = "0." + amount[1];
                    } else {
                        amount = TranList[i].billingAmount;
                    }
                    var today = new Date();
                    var toDate = String(today.getDate()).padStart(2, '0');
                    var toMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    var toYear = today.getFullYear();
                    var toDayDate = `${toDate}/${toMonth}/${toYear}`;
                    var resultDate;
                    if (today.getDate() >= 2) {
                        // If the date is after the 2nd of the current month, consider the previous month
                        resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
                    } else if (today.getDate() === 1) {
                        // If the date is the 1st of the current month, consider two months back
                        date.setMonth(today.getMonth() - 2); // Move to two months back
                        resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
                    }
                    var dateToCompare = this.parseDate(resultDate); // The date to compare against
                    var formattedDateObj = this.parseDate(formattedDate);
                    if (formattedDateObj >= dateToCompare) {
                        var param = {
                            "flxTransactionList": {
                                "skin": "sknSegBgFCF9F9"
                            },
                            "lbl1": formattedDate,
                            "lbl2": transactions[i].merchantNameLocation,
                            "lbl3": transactions[i].referenceNumber,
                            "lbl4": transactions[i].transactionCurrency + " " + amount,
                            "lbl5": {
                                "text": action,
                                "skin": (action == 'Mark as Dispute') ? "sknlbl3B74A615px" : "bbSknLbl424242SSP15Px"
                            },
                            "flxLbl5": {
                                "onClick": function(eventobj, Transaction) {
                                    this.btnDisputeOnClick(eventobj, this.view.segTransactionDetails.selectedRowItems[0] ? this.view.segTransactionDetails.selectedRowItems[0] : this.view.segTransactionDetailsBilled.selectedRowItems[0]);
                                }.bind(this)
                            }
                        }
                        data.push(param);
                    } else {
                        var param1 = {
                            "lbl1": formattedDate,
                            "lbl2": transactions[i].merchantNameLocation,
                            "lbl3": transactions[i].referenceNumber,
                            "lbl4": transactions[i].transactionCurrency + " " + amount,
                            "lbl5": {
                                "text": action,
                                "skin": (action == 'Mark as Dispute') ? "sknlbl3B74A615px" : "bbSknLbl424242SSP15Px"
                            },
                            "flxLbl5": {
                                "onClick": function(eventobj, Transaction) {
                                    this.btnDisputeOnClick(eventobj, this.view.segTransactionDetails.selectedRowItems[0] ? this.view.segTransactionDetails.selectedRowItems[0] : this.view.segTransactionDetailsBilled.selectedRowItems[0]);
                                }.bind(this)
                            }
                        }
                        data1.push(param1);
                    }
                }
                if (this.view.btnBillable.skin === "sknBtnSSPSemiboldSelected") {
                    this.view.segTransactionDetailsBilled.setVisibility(true);
                    this.view.segTransactionDetails.setVisibility(false);
                    if (data1.length != 0) {
                        this.view.segTransactionDetailsBilled.setData(data1);
                    } else{
                        this.view.flxNoTransaction.setVisibility(true);
                        this.view.segTransactionDetailsBilled.setVisibility(false);
                        this.view.segTransactionDetails.setVisibility(false);
                    }
                } else {
                    this.view.segTransactionDetails.setVisibility(true);
                    this.view.segTransactionDetailsBilled.setVisibility(false);
                    if (data.length != 0) {
                        this.view.segTransactionDetails.setData(data);
                    }else {
                        this.view.flxNoTransaction.setVisibility(true);
                        this.view.segTransactionDetailsBilled.setVisibility(false);
                        this.view.segTransactionDetails.setVisibility(false);
                    }
                }
            } else {
                for (var i = 0; i < transactions.length; i++) {
                    var date = new Date(transactions[i].postingDate);
                    var day = String(date.getDate()).padStart(2, '0');
                    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    var year = date.getFullYear();
                    var compareDate = `${year}-${month}-${day}`;
                    var formattedDate = `${day}/${month}/${year}`;
                    var action = '';
					var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
					var currentBankDate="";
					if(bankDate){
						currentBankDate = bankDate.currentWorkingDate;
					}
					var dispute = "false";
                    var disputeDate = new Date(currentBankDate);
                    disputeDate.setDate(disputeDate.getDate() -  OLBConstants.CLIENT_PROPERTIES.NO_OF_DAYS_CARD_DISPUTE);
					var comparedDate = new Date(compareDate);
					if(comparedDate > disputeDate){
						dispute = "true";
					}
                    if (TranList[i].reserved5 == '00' && TranList[i].reserved4 == 'Matched' && TranList[i].isDisputed != 'true' && dispute == "true") {
                        action = 'Mark as Dispute';
                    } else if (TranList[i].isDisputed == 'true') {
                        action = 'Disputed';
                    } else {
                        action = ''
                    }
                    var amount = TranList[i].billingAmount.split(".");
                    if (amount[0] == null || amount[0] == undefined || amount[0] == "") {
                        amount = "0." + amount[1];
                    } else {
                        amount = TranList[i].billingAmount;
                    }
                    var param = {
                        "flxTransactionList": {
                            "skin": "sknSegBgFCF9F9"
                        },
                        "lbl1": formattedDate,
                        "lbl2": transactions[i].merchantNameLocation,
                        "lbl3": transactions[i].referenceNumber,
                        "lbl4": transactions[i].transactionCurrency + " " + amount,
                        "lbl5": {
                            "text": action,
                            "skin": (action == 'Mark as Dispute') ? "sknlbl3B74A615px" : "bbSknLbl424242SSP15Px"
                        },
                        "flxLbl5": {
                            "onClick": function(eventobj, Transaction) {
                                this.btnDisputeOnClick(eventobj, this.view.segTransactionDetails.selectedRowItems[0] ? this.view.segTransactionDetails.selectedRowItems[0] : this.view.segTransactionDetailsBilled.selectedRowItems[0]);
                            }.bind(this)
                        }
                    }
                    data.push(param);
                }
                if (data.length != 0) {
                    this.view.segTransactionDetails.setData(data);
                } else {
                    this.view.flxNoTransaction.setVisibility(true);
                    this.view.segTransactionDetailsBilled.setVisibility(false);
                    this.view.segTransactionDetails.setVisibility(false);
                }
            }  
        },
		showEmiTransactionDetails: function(cardDetails) {
			this.view.flxNoEMITransaction.setVisibility(false);
            this.view.segEMITransactionDetails.setVisibility(true);
            this.view.segEMITransactionDetails.setData([]);
            this.transactionList = cardDetails;
            var dataMap = {
                "flxEMITransactionList": "flxEMITransactionList",
                "flxList": "flxList",
                "flxLbl5": "flxLbl5",
                "lbl1": "lbl1",
                "lbl2": "lbl2",
                "lbl3": "lbl3",
                "lbl4": "lbl4",
                "lbl5": "lbl5"
            }
            this.view.segEMITransactionDetails.widgetDataMap = dataMap;
            this.view.segEMITransactionDetails.rowTemplate = "flxEMITransactionList";
            var data = [];
            var TranList = cardDetails.pendingAuthInfo_out; 
            var bankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
            var today = new Date(bankDate.currentWorkingDate);
            var toDate = String(today.getDate()).padStart(2, '0');
            var toMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            var toYear = today.getFullYear();
            var toDate = `${toDate}/${toMonth}/${toYear}`;
            var fromDate;
            if (today.getDate() > 2) {
                today.setMonth(today.getMonth() ); // Move to the previous month
                fromDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
            } else if (today.getDate() === 1) {
                // If the date is after the 2nd of the current month, consider the previous month
                today.setMonth(today.getMonth() - 1); // Move to the previous month
                fromDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
            }
            this.cacheUtils.setData(TranList);
            
            for (var i = 0; i < TranList.length; i++) {
                var date = new Date(TranList[i].postingDate);
                var day = String(date.getDate()).padStart(2, '0');
                var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                var year = date.getFullYear();
                var formattedDate = `${day}/${month}/${year}`;
                var action;
                if (TranList[i].reserved5 == '00' && TranList[i].reserved4 == 'Matched') {
                    action = true;
                }
                var amount = TranList[i].billingAmount.split(".");
                if (amount[0] == null || amount[0] == undefined || amount[0] == "") {
                    amount = "0." + amount[1];
                } else {
                    amount = TranList[i].billingAmount;
                }
                if(TranList[i].reserved5 == '00' && TranList[i].reserved4 == 'Matched' &&  Number(amount) > Number(OLBConstants.CLIENT_PROPERTIES.MAX_AMOUNT_FOR_EMI_ELIGIBLE )  && fromDate >= formattedDate && toDate <= formattedDate){
                        sortData = TranList[i];
                var param = {
                    "flxTransactionList": {
                        "skin": "sknSegBgFCF9F9"
                    },
                    "lbl1": formattedDate,
                    "lbl2": TranList[i].merchantNameLocation,
                    "lbl3": TranList[i].referenceNumber,
                    "lbl4": TranList[i].transactionCurrency + " " + amount,
                    "imgRadio": {
                        "src": "radioinactive1.png"
                    },
                    "flxLbl5": {
                        "isVisible": (amount > 1 == true && action == true) ? true : false,
                        "onClick": function(eventobj, Transaction) {
                            this.imgRadio(eventobj, this.view.segEMITransactionDetails.selectedRowItems[0])
                        }.bind(this)
                    }
                }
                data.push(param);
            }
            }
            if (data.length != 0) {
                this.view.segEMITransactionDetails.setData(data);
            } else {
                this.view.flxNoEMITransaction.setVisibility(true);
                this.view.segEMITransactionDetails.setVisibility(false);
            }
            this.setEMIPagination({
                'show': true,
                'offset': this.offset
            }, data);
            this.view.segEMITransactionDetails.setData(data.slice(this.offset, this.lastRecord));
            this.AdjustScreen();
            this.view.flxMain.setFocus(true);
        },
		imgRadio: function(eventobj, result) {
			if (eventobj.widgets()[0].src == "radiobuttonactive.png") {
				FormControllerUtility.enableButton(this.view.btnEMIContinue);
			}
		},
		showTransactionDetails: function(cardDetails) {
            this.view.flxNoTransaction.setVisibility(false);
            this.view.segTransactionDetails.setVisibility(true);
            this.view.btnBillable.skin = "sknBtnAccountSummaryUnselectedTransfer424242";
            this.view.btnUnBillable.skin = "sknBtnSSPSemiboldSelected";
            this.view.flxNoTransaction.setVisibility(false);
            this.view.segTransactionDetails.setData([]);
            this.view.segTransactionDetailsBilled.setData([]);
            this.view.segTransactionDetailsBilled.setVisibility(false);
            this.transactionList = cardDetails;
            var dataMap = {
                "flxTransactionList": "flxTransactionList",
                "flxList": "flxList",
                "flxLbl5": "flxLbl5",
                "lbl1": "lbl1",
                "lbl2": "lbl2",
                "lbl3": "lbl3",
                "lbl4": "lbl4",
                "lbl5": "lbl5"
            }
            this.view.segTransactionDetailsBilled.widgetDataMap = dataMap;
            this.view.segTransactionDetailsBilled.rowTemplate = "flxTransactionList";
            this.view.segTransactionDetails.widgetDataMap = dataMap;
            this.view.segTransactionDetails.rowTemplate = "flxTransactionList";
            var data = [];
            var data1 = [];
            var TranList = cardDetails.pendingAuthInfo_out;
            this.cacheUtils.setData(TranList);
            var navManager = applicationManager.getNavigationManager();
            var cardType = navManager.getCustomInfo("transaction_cardType");
            if (cardType == 'Credit') {
                this.view.flxBtnTransaction.setVisibility(true);
                for (var i = 0; i < TranList.length; i++) {
                    var date = new Date(TranList[i].postingDate);
                    var day = String(date.getDate()).padStart(2, '0');
                    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    var year = date.getFullYear();
					var compareDate = `${year}-${month}-${day}`;
                    var formattedDate = `${day}/${month}/${year}`;
                    var action = '';
					var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
					var currentBankDate="";
					if(bankDate){
						currentBankDate = bankDate.currentWorkingDate;
					}
					var dispute = "false";
                    var disputeDate = new Date(currentBankDate);
                    disputeDate.setDate(disputeDate.getDate() -  OLBConstants.CLIENT_PROPERTIES.NO_OF_DAYS_CARD_DISPUTE);
					var comparedDate = new Date(compareDate);
					if(comparedDate > disputeDate){
						dispute = "true";
					}
                    if (TranList[i].reserved5 == '00' && TranList[i].reserved4 == 'Matched' && TranList[i].isDisputed != 'true' && dispute== "true") {
                        action = 'Mark as Dispute';
                    } else if (TranList[i].isDisputed == 'true') {
                        action = 'Disputed';
                    } else {
                        action = ''
                    }
                    var amount = TranList[i].billingAmount.split(".");
                    if (amount[0] == null || amount[0] == undefined || amount[0] == "") {
                        amount = "0." + amount[1];
                    } else {
                        amount = TranList[i].billingAmount;
                    }
                    var today = new Date();
                    var toDate = String(today.getDate()).padStart(2, '0');
                    var toMonth = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    var toYear = today.getFullYear();
                    var toDayDate = `${toDate}/${toMonth}/${toYear}`;
                    var resultDate;
                    if (today.getDate() >= 2) {
                        // If the date is after the 2nd of the current month, consider the previous month
                        resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
                    } else if (today.getDate() === 1) {
                        // If the date is the 1st of the current month, consider two months back
                        date.setMonth(today.getMonth() - 2); // Move to two months back
                        resultDate = `${String(2).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
                    }
                    var dateToCompare = this.parseDate(resultDate); // The date to compare against
                    var formattedDateObj = this.parseDate(formattedDate);
                    if (formattedDateObj >= dateToCompare) {
                        var param = {
                            "flxTransactionList": {
                                "skin": "sknSegBgFCF9F9"
                            },
                            "lbl1": formattedDate,
                            "lbl2": TranList[i].merchantNameLocation,
                            "lbl3": TranList[i].referenceNumber,
                            "lbl4": TranList[i].transactionCurrency + " " + amount,
                            "lbl5": {
                                "text": action,
                                "skin": (action == 'Mark as Dispute') ? "sknlbl3B74A615px" : "bbSknLbl424242SSP15Px"
                            },
                            "flxLbl5": {
                                "onClick": function(eventobj, Transaction) {
                                    this.btnDisputeOnClick(eventobj, this.view.segTransactionDetails.selectedRowItems[0] ? this.view.segTransactionDetails.selectedRowItems[0] : this.view.segTransactionDetailsBilled.selectedRowItems[0])
                                }.bind(this)
                            }
                        }
                        data.push(param);
                    } else {
                        var param1 = {
                            "lbl1": formattedDate,
                            "lbl2": TranList[i].merchantNameLocation,
                            "lbl3": TranList[i].referenceNumber,
                            "lbl4": TranList[i].transactionCurrency + " " + amount,
                            "lbl5": {
                                "text": action,
                                "skin": (action == 'Mark as Dispute') ? "sknlbl3B74A615px" : "bbSknLbl424242SSP15Px"
                            },
                            "flxLbl5": {
                                "onClick": function(eventobj, Transaction) {
                                    this.btnDisputeOnClick(eventobj, this.view.segTransactionDetails.selectedRowItems[0] ? this.view.segTransactionDetails.selectedRowItems[0] : this.view.segTransactionDetailsBilled.selectedRowItems[0]);
                                }.bind(this)
                            }
                        }
                        data1.push(param1);
                    }
                }
                if (data.length != 0) {
                    this.view.segTransactionDetails.setData(data);
                } else {
                    this.view.flxNoTransaction.setVisibility(true);
                    this.view.segTransactionDetailsBilled.setVisibility(false);
                    this.view.segTransactionDetails.setVisibility(false);
                    this.view.flxPaginationContainer.setVisibility(false);
                }
                if (data1.length != 0) {
                    this.view.segTransactionDetailsBilled.setData(data1);
                }
            } else {
                this.view.flxBtnTransaction.setVisibility(false);
                for (var i = 0; i < TranList.length; i++) {
                    var date = new Date(TranList[i].postingDate);
                    var day = String(date.getDate()).padStart(2, '0');
                    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    var year = date.getFullYear();
                    var compareDate = `${year}-${month}-${day}`;
                    var formattedDate = `${day}/${month}/${year}`;
                    var action = '';
					var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
					var currentBankDate="";
					if(bankDate){
						currentBankDate = bankDate.currentWorkingDate;
					}
					var dispute = "false";
                    var disputeDate = new Date(currentBankDate);
                    disputeDate.setDate(disputeDate.getDate() -  OLBConstants.CLIENT_PROPERTIES.NO_OF_DAYS_CARD_DISPUTE);
					var comparedDate = new Date(compareDate);
					if(comparedDate > disputeDate){
						dispute = "true";
					}
                    if (TranList[i].reserved5 == '00' && TranList[i].reserved4 == 'Matched' && TranList[i].isDisputed != 'true' && dispute) {
                        action = 'Mark as Dispute';
                    } else if (TranList[i].isDisputed == 'true') {
                        action = 'Disputed';
                    } else {
                        action = ''
                    }
                    var amount = TranList[i].billingAmount.split(".");
                    if (amount[0] == null || amount[0] == undefined || amount[0] == "") {
                        amount = "0." + amount[1];
                    } else {
                        amount = TranList[i].billingAmount;
                    }
                    var param = {
                        "flxTransactionList": {
                            "skin": "sknSegBgFCF9F9"
                        },
                        "lbl1": formattedDate,
                        "lbl2": TranList[i].merchantNameLocation,
                        "lbl3": TranList[i].referenceNumber,
                        "lbl4": TranList[i].transactionCurrency + " " + amount,
                        "lbl5": {
                            "text": action,
                            "skin": (action == 'Mark as Dispute') ? "sknlbl3B74A615px" : "bbSknLbl424242SSP15Px"
                        },
                        "flxLbl5": {
                            "onClick": function(eventobj, Transaction) {
                                this.btnDisputeOnClick(eventobj, this.view.segTransactionDetails.selectedRowItems[0] ? this.view.segTransactionDetails.selectedRowItems[0] : this.view.segTransactionDetailsBilled.selectedRowItems[0])
                            }.bind(this)
                        }
                    }
                    data.push(param);
                }
                if (data.length != 0) {
                    this.view.segTransactionDetails.setData(data);
                } else {
                    this.view.flxNoTransaction.setVisibility(true);
                    this.view.segTransactionDetailsBilled.setVisibility(false);
                    this.view.segTransactionDetails.setVisibility(false);
                    this.view.flxPaginationContainer.setVisibility(false);
                }
            }
            this.setPagination({
                'show': true,
                'offset': this.offset
            }, data);
            this.view.segTransactionDetails.setData(data.slice(this.offset, this.lastRecord));
            this.setPagination({
                'show': true,
                'offset': this.offset
            }, data1);
            this.view.segTransactionDetailsBilled.setData(data1.slice(this.offset, this.lastRecord));
			this.AdjustScreen();
			this.view.flxMain.setFocus(true);
        },
		btnDisputeOnClick: function(eventobj, result) {
			if (result.lbl5.text == "Mark as Dispute") {
				var navManager = applicationManager.getNavigationManager();
				var cardNumber = navManager.getCustomInfo("transaction_cardNumber");
				var data = result;
				data.id = "cardDispute";
				data.fromAccountNumber = cardNumber;
				data.amount = result.lbl4;
				data.referenceNumber = result.lbl3;
				data.date = result.lbl1;
				data.notes = result.lbl2;
				data.types = "Cards Transaction";
				data.transactionId = result.lbl3;
				data.transactionType = "Cards";
				data.transactionsNotes = result.lbl2;
				data.description = result.lbl2;
				data.transactionDate = result.lbl1;
				data.fromAccountName = "";
				data.accountName = "";
				var transaction = this.cacheUtils.data;
				for (var i = 0; i < transaction.length; i++) {
					if (transaction[i].referenceNumber == result.lbl3) {
						data.toAccount = transaction[i].merchantCategoryCode;
						data.Status = transaction[i].reserved3;
						break;
					}
				}

				var disputeModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"moduleName": "DisputeTransactionUIModule",
					"appName": "ArrangementsMA"
				});
				disputeModule.presentationController.showDisputeTransactionModule({
					show: OLBConstants.ACTION.SHOW_DISPUTE_TRANSACTION_FORM,
					data: {
						disputeTransactionObject: data,
						onCancel: function() {
							var cards = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
								"moduleName": "ManageCardsUIModule",
								"appName": "CardsMA"
							});
							cards.presentationController.navigateToManageCards();
						}
					}
				});
			}
		},
		parseDate: function(dateStr) {
			var [day, month, year] = dateStr.split('/'); // Split the string by '/'
			return new Date(year, month - 1, day); // JavaScript months are 0-indexed
		},
		/**
		 * Method to show acknowledgement for new card limit 
		 * @param {Object} - notification object
		 */
		showNewCardLimitAcknowledgement: function(response) {
			var data = this.notificationObject;
			this.hideAllCardManagementViews();
			// Acknowledgment
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.Acknowledgement.btnLearnAbout.setVisibility(false);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString('i18n.CardManagement.SetCardLimits');
			this.view.title = kony.i18n.getLocalizedString('i18n.CardManagement.SetCardLimits') + " - Acknowledgement";
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			if (this.view.flxDailyWithdrawalLimit.isVisible) {
				this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString('i18n.CardManagement.YourDailyWithdrawalLimitHasBeenUpdated');
			};
			if (this.view.flxDailyPurchaseLimit.isVisible) {
				this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString('i18n.CardManagement.YourDailyPurchaseLimitHasBeenUpdated');
			};
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.Acknowledgement.lblUnlockCardMessage.setVisibility(false);
			if (response.orderId) {
				this.view.Acknowledgement.lblRequestID.text = kony.i18n.getLocalizedString('i18n.CardManagement.requestId');
				this.view.Acknowledgement.lblRefrenceNumber.text = response.orderId; //response.data.request_id;
				this.view.Acknowledgement.lblRequestID.setVisibility(true);
				this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
			} else {
				this.view.Acknowledgement.lblRequestID.setVisibility(false);
				this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
			}
			// Card details
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.ConfirmDialog.lblHeading.text = kony.i18n.getLocalizedString('i18n.CardManagement.YourCardDetails');
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString('i18n.CardManagement.Card');
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString('i18n.ChequeBookReq.account');
			if (this.view.flxDailyWithdrawalLimit.isVisible) {
				this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString('i18n.CardManagement.NewDailyWithdrawalLimit');
				this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = this.view.lblSetWithdrawalLimitSlider.text;
				//CommonUtilities.formatCurrencyWithCommas(this.view.limitWithdrawalSlider.selectedValue,"","$");
			}
			if (this.view.flxDailyPurchaseLimit.isVisible) {
				this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString('i18n.CardManagement.NewDailyPurchaseLimit');
				this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = this.view.lblSetPurchaseLimitSlider.text;
				//CommonUtilities.formatCurrencyWithCommas(this.view.limitPurchaseSlider.selectedValue,"","$"); 
			}
			this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = response.card.productName + " " + response.card.maskedCardNumber;
			this.view.ConfirmDialog.keyValueCardName.lblValue.text = response.card.accountName + " " + response.card.maskedAccountNumber;
			this.view.ConfirmDialog.confirmButtons.setVisibility(false);
			this.view.ConfirmDialog.keyValueValidThrough.setVisibility(false);
			this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(false);
			this.view.ConfirmDialog.keyValueCardName.lblColon.setVisibility(false);
			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			this.view.ConfirmDialog.keyValueCreditLimit.lblColon.setVisibility(false);
			this.view.flxPrint.setVisibility(false);
			// Actions
			this.view.btnBackToCards.setVisibility(false);
			this.view.btnRequestReplacement.setVisibility(false);
			this.view.btnManageCards.setVisibility(true);
			this.view.btnManageCards.skin = "sknBtnffffffBorder0273e31pxRadius2px"
			this.view.btnBackToCardLimits.setVisibility(true);
			this.notificationObject = {};
			CommonUtilities.hideProgressBar(this.view);
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			this.view.forceLayout();
			this.AdjustScreen();
		},
		/**
		 * Method used to change the text to title case.
		 * @param {String} str - string to be changed to title case.
		 */
		toTitleCase: function(str) {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		},
		/**
		 * Method used to change the radio button selection in the replace card flow.
		 * @param {Object} radioButtons - contains the radio buttons list.
		 * @param {Object} selectedradioButton - contains the raido button selected widget Object.
		 */
		onRadioButtonSelection: function(radioButtons, selectedradioButton) {
			var scope = this;
			scope.view.CardLockVerificationStep.flxAddressCheckbox1.accessibilityConfig = {
				"a11yARIA": {
					"role": "radio",
					"aria-checked": false,
					"aria-labelledby": "rtxAddress2"
				}
			};
			scope.view.CardLockVerificationStep.flxAddressCheckbox2.accessibilityConfig = {
				"a11yARIA": {
					"role": "radio",
					"aria-checked": false,
					"aria-labelledby": "rtxAddress2"
				}
			};
			scope.view.CardLockVerificationStep.flxAddressCheckbox3.accessibilityConfig = {
				"a11yARIA": {
					"role": "radio",
					"aria-checked": false,
					"aria-labelledby": "rtxAddress3"
				}
			};
			if (selectedradioButton.widgets()["0"].id === "lblAddressCheckBox1") {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.lblAddressCheckBox1.text = "M";
				this.view.CardLockVerificationStep.lblAddressCheckBox1.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
				this.view.CardLockVerificationStep.lblAddressCheckBox2.text = "L";
				this.view.CardLockVerificationStep.lblAddressCheckBox2.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep.lblAddressCheckBox3.text = "L";
				this.view.CardLockVerificationStep.lblAddressCheckBox3.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep.flxAddressCheckbox1.accessibilityConfig = {
					"a11yARIA": {
						"role": "radio",
						"aria-checked": true,
						"aria-labelledby": "rtxAddress1"
					}
				};
			}
			if (selectedradioButton.widgets()["0"].id === "lblAddressCheckBox2") {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.lblAddressCheckBox2.text = "M";
				this.view.CardLockVerificationStep.lblAddressCheckBox2.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
				this.view.CardLockVerificationStep.lblAddressCheckBox1.text = "L";
				this.view.CardLockVerificationStep.lblAddressCheckBox1.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep.lblAddressCheckBox3.text = "L";
				this.view.CardLockVerificationStep.lblAddressCheckBox3.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep.flxAddressCheckbox2.accessibilityConfig = {
					"a11yARIA": {
						"role": "radio",
						"aria-checked": true,
						"aria-labelledby": "rtxAddress2"
					}
				};
			}
			if (selectedradioButton.widgets()["0"].id === "lblAddressCheckBox3") {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.lblAddressCheckBox3.text = "M";
				this.view.CardLockVerificationStep.lblAddressCheckBox3.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
				this.view.CardLockVerificationStep.lblAddressCheckBox1.text = "L";
				this.view.CardLockVerificationStep.lblAddressCheckBox1.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep.lblAddressCheckBox2.text = "L";
				this.view.CardLockVerificationStep.lblAddressCheckBox2.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
				this.view.CardLockVerificationStep.flxAddressCheckbox3.accessibilityConfig = {
					"a11yARIA": {
						"role": "radio",
						"aria-checked": true,
						"aria-labelledby": "rtxAddress3"
					}
				};
			}
		},
		/**
		 * Validates given secure access code.
		 * @param {String} secureaccesscode - contains the secure access code entered in form.
		 */
		isValidSecureAccessCode: function(secureaccesscode) {
			if (secureaccesscode.length !== OLBConstants.OTPLength) return false;
			var regex = new RegExp('^[0-9]+$');
			return regex.test(secureaccesscode);
		},
		/**
		 * Method to show travel notification acknowledgement for create/update travel notification
		 * @param {Object} - notification object
		 */
		showTravelNotificationAcknowledgement: function(response) {
			var self = this;
			var data = this.notificationObject;
			var cards = "";
			self.hideAllCardManagementViews();
			this.view.flxPrint.setVisibility(false);
			this.view.flxPrint.setVisibility(false);
			this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.ConfirmDialog.confirmButtons.setVisibility(false);
			this.view.Acknowledgement.lblRequestID.setVisibility(false);
			this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
			this.view.Acknowledgement.btnLearnAbout.setVisibility(false);
			self.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString('i18n.CardManagement.manageTravelPlanAcknowledgement'));
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString('i18n.CardManagement.travelNotification')
			if (this.notificationObject.isEditFlow) {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString('i18n.CardManagement.travelNotificationUpdateMsg');
				this.view.Acknowledgement.lblUnlockCardMessage.text = (kony.i18n.getLocalizedString('i18n.CardManagement.requestId') + this.notificationObject.requestId);
			} else {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.Acknowledgement.lblCardTransactionMessage.text = kony.i18n.getLocalizedString('i18n.CardManagement.travelNotificationCreatationMsg');
				this.view.Acknowledgement.lblUnlockCardMessage.text = (kony.i18n.getLocalizedString('i18n.CardManagement.requestId') + response.data.request_id);
			}
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.ConfirmDialog.lblHeading.text = kony.i18n.getLocalizedString('i18n.CardManagement.travelDetails');
			this.view.ConfirmDialog.flxDestination.setVisibility(true);
			this.view.ConfirmDialog.flxSelectCards.setVisibility(true);
			this.view.ConfirmDialog.flxDestination2.setVisibility(false);
			this.view.ConfirmDialog.flxDestination3.setVisibility(false);
			this.view.ConfirmDialog.flxDestination4.setVisibility(false);
			this.view.ConfirmDialog.flxDestination5.setVisibility(false);
			this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedStartDate');
			this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = data.fromDate;
			this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedEndDate');
			this.view.ConfirmDialog.keyValueCardName.lblValue.text = data.toDate;
			this.view.ConfirmDialog.flxDestination1.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination1');
			this.view.ConfirmDialog.rtxDestination1.text = data.locations[0];
			if (data.locations[1]) {
				this.view.ConfirmDialog.flxDestination2.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.ConfirmDialog.lblDestination2.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination2');
				this.view.ConfirmDialog.rtxDestination2.text = data.locations[1];
			}
			if (data.locations[2]) {
				this.view.ConfirmDialog.flxDestination3.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.ConfirmDialog.lblDestination3.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination3');
				this.view.ConfirmDialog.rtxDestination3.text = data.locations[2];
			}
			if (data.locations[3]) {
				this.view.ConfirmDialog.flxDestination4.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.ConfirmDialog.lblDestination4.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination4');
				this.view.ConfirmDialog.rtxDestination4.text = data.locations[3];
			}
			if (data.locations[4]) {
				this.view.ConfirmDialog.flxDestination5.setVisibility(true);
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.ConfirmDialog.lblDestination5.text = kony.i18n.getLocalizedString('i18n.CardManagement.SelectedDestination5');
				this.view.ConfirmDialog.rtxDestination5.text = data.locations[4];
			}
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.ConfirmDialog.keyValueValidThrough.setVisibility(true);
			this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString('i18n.ProfileManagement.PhoneNumber');
			this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = data.phone;
			this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = kony.i18n.getLocalizedString('i18n.CardManagement.AddInformation');
			this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = data.notes;
			this.view.ConfirmDialog.lblKey6.text = kony.i18n.getLocalizedString('i18n.CardManagement.selectedCards');
			var cardSegData = [];
			for (var i = 0; i < data.selectedcards.length; i++) {
				if (data.selectedcards[i].icon) {
					if (data.selectedcards[i].icon == "s" || data.selectedcards[i].icon == "r") {
						var card = {};
						data.selectedcards.forEach(function(dataItem) {
							card = {
								"lblValue": {
									"text": dataItem.name + "-" + dataItem.number
								},
								"lblIcon": {
									"text": dataItem.icon,
									"Skin": "sknLblOLBFontIconsvs"
								}
							};
						});
						cardSegData.push(card);
					}
				}
			}
			if (cardSegData.length > 0) {
				this.view.ConfirmDialog.segSelectedCards.setData(cardSegData);
				this.view.ConfirmDialog.rtxValueA.setVisibility(false);
				this.view.ConfirmDialog.flxCards.setVisibility(true);
			} else {
				data.selectedcards.map(function(dataItem) {
					cards = cards + dataItem.name + "-" + dataItem.number + "<br/>";
				});
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.ConfirmDialog.rtxValueA.text = cards;
				this.view.ConfirmDialog.rtxValueA.setVisibility(true);
				this.view.ConfirmDialog.flxCards.setVisibility(false);
			}
			//             data.selectedcards.map(function(dataItem) {
			//                 cards = cards + dataItem.name + "-" + dataItem.number + "<br/>";
			//             });
			//             var accessibilityConfig=CommonUtilities.getaccessibilityConfig();
			this.view.btnBackToCards.setVisibility(true);
			this.view.btnRequestReplacement.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.btnRequestReplacement.text = kony.i18n.getLocalizedString('i18n.CardManagement.BackToCards');
			this.view.btnRequestReplacement.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.btnBackToCards.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.btnBackToCards.text = kony.i18n.getLocalizedString('i18n.CardManagement.goToTravelPlan');
			this.view.btnBackToCards.onClick = function() {
				self.fetchTravelNotifications();
			}
			this.notificationObject = {};
			CommonUtilities.hideProgressBar(this.view);
			this.view.forceLayout();
			this.AdjustScreen();
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
		},
		/**
		 * Shows the MFA Options available.
		 * @param {Object} - card object .
		 * @param {String} action - contains the action to be performed.
		 */
		showMFAScreen: function(params, action) {
			var self = this;
			if (action === kony.i18n.getLocalizedString("i18n.CardManagement.LockCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LockCardVerification"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin") || action === "Offline_Change_Pin") {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePinVerification"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCardVerification"));
			} else if (action === kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolenVerification"));
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.CardLockVerificationStep.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.CardManagement.LostOrStolenCardVerification");
			} else if (action === kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.requestReplaceCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.CardManagement.ReplaceCardVerification"));
			} else if (action === kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard")) {
				this.setBreadCrumbAndHeaderDataForCardOperation(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelVerification"));
			}
			this.hideServerError();
			this.view.flxTermsAndConditions.setVisibility(false);
			var selectedMFAOption = OLBConstants.MFA_OPTIONS.SECURE_ACCESS_CODE;
			self.view.CardLockVerificationStep.imgUsernameVerificationcheckedRadio.src = ViewConstants.IMAGES.ICON_RADIOBTN_ACTIVE;
			self.view.CardLockVerificationStep.imgUsernameVerificationcheckedRadioOption2.src = ViewConstants.IMAGES.ICON_RADIOBTN;
			if (applicationManager.getConfigurationManager().isSecurityQuestionConfigured === "true") {
				this.view.CardLockVerificationStep.flxUsernameVerificationOption2.setVisibility(true);
			} else {
				this.view.CardLockVerificationStep.flxUsernameVerificationOption2.setVisibility(false);
			}
			this.hideAllCardManagementRightViews();
			this.view.CardLockVerificationStep.flxVerifyByOptions.setVisibility(true);
			FormControllerUtility.enableButton(this.view.CardLockVerificationStep.btnConfirm);
			this.view.CardLockVerificationStep.flxUsernameVerificationRadioOption1.onTouchEnd = function() {
				self.view.CardLockVerificationStep.imgUsernameVerificationcheckedRadio.src = ViewConstants.IMAGES.ICON_RADIOBTN_ACTIVE;
				self.view.CardLockVerificationStep.imgUsernameVerificationcheckedRadioOption2.src = ViewConstants.IMAGES.ICON_RADIOBTN;
				selectedMFAOption = OLBConstants.MFA_OPTIONS.SECURE_ACCESS_CODE;
			};
			this.view.CardLockVerificationStep.flxUsernameVerificationRadiobtnOption2.onTouchEnd = function() {
				self.view.CardLockVerificationStep.imgUsernameVerificationcheckedRadio.src = ViewConstants.IMAGES.ICON_RADIOBTN;
				self.view.CardLockVerificationStep.imgUsernameVerificationcheckedRadioOption2.src = ViewConstants.IMAGES.ICON_RADIOBTN_ACTIVE;
				selectedMFAOption = OLBConstants.MFA_OPTIONS.SECURITY_QUESTIONS;
			};
			var buttonsJSON = {
				'btnConfirm': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString('i18n.common.proceed')
				},
				'btnModify': {
					'isVisible': false,
					'text': kony.i18n.getLocalizedString("i18n.common.modifiy")
				},
				'btnCancel': {
					'isVisible': true,
					'text': kony.i18n.getLocalizedString("i18n.transfers.Cancel")
				},
			};
			this.alignConfirmButtons(buttonsJSON);
			this.view.CardLockVerificationStep.btnCancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.CardLockVerificationStep.btnConfirm.onClick = function() {
				if (selectedMFAOption === OLBConstants.MFA_OPTIONS.SECURE_ACCESS_CODE) {
					FormControllerUtility.showProgressBar(self.view);
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.sendSecureAccessCode(params, action);
				} else if (selectedMFAOption === OLBConstants.MFA_OPTIONS.SECURITY_QUESTIONS) {
					FormControllerUtility.showProgressBar(self.view);
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.fetchSecurityQuestions(params, action);
				}
			};
			this.AdjustScreen();
		},
		/**
		 * Returns the contact for which the isPrimary flag is true. Expects only one of the contacts to be primary. If there are more than one, returns the last.
		 *�@param�{Array} - Array of contacts.
		 */
		getPrimaryContact: function(contacts) {
			var primaryContact = "";
			contacts.forEach(function(item) {
				if (item.isPrimary === "true") {
					primaryContact = item.Value;
				}
			});
			return primaryContact;
		},
		constructCardsViewModel: function(cards) {
			var self = this;
			var cardsViewModel = [];
			if (cards !== null && cards !== undefined) {
				cards.forEach(function(card) {
					if (card.customerId[0] === "D") {
						cardsViewModel.push(self.getDebitCardViewModel(card));
					} else if (card.customerId[0] === "C") {
						cardsViewModel.push(self.getCreditCardViewModel(card));
					} else if (card.customerId[0] === "P") {
						cardsViewModel.push(self.getPrepaidCardViewModel(card));
						//self.getVirtualDollarCardCount(card.cardProgLabel);
					}
				});
			}
			return cardsViewModel;
		},
		getVirtualDollarCardCount: function(card) {
			let last2 = card.slice(-2);
			let last3 = card.slice(-3);
			if (last2 == "IO" || last3 == "ISO")
				this.virtualDollarCardCount++;
		},
		getCardStatus: function(status) {
			if (status == scope_configManager.getActivateCardStatus() || status == "Active") {
				return "Active";
			} else if (status == scope_configManager.getReportLostCardStatus() || status == "Reported Lost") {
				return "Reported Lost";
			} else if (status == scope_configManager.getLockCardStatus() || status == "Locked") {
				return "Locked";
			} else if (status == scope_configManager.getInActiveCardStatus() || status == "Inactive") {
				return "Inactive";
			} else if (status == scope_configManager.getExpiredCardStatus() || status == "Expired") {
				return "Expired";
			}
		},
		getExpDateInFromat: function(date) {
			let d = new Date(date);
			let month = ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1));
			return month + "/" + d.getFullYear();
		},
		maskCardNumber: function(number) {
			if (number.length == 16)
				return number.slice(0, 4) + " " + number.slice(4, 6) + "XX XXXX " + number.slice(-4);
			else if (number.length == 15)
				return number.slice(0, 5) + " " + number.slice(5, 6) + "XXXX X" + number.slice(-4);
			else if (number.length == 19)
				return number.slice(0, 5) + " " + number.slice(5, 6) + "XXXX XXXXX " + number.slice(-4);
		},
		formatCardNumber: function(number) {
			if (number.length == 16)
				return number.slice(0, 4) + " " + number.slice(4, 8) + " " + number.slice(8, 12) + " " + number.slice(12, 16);
			else if (number.length == 15)
				return number.slice(0, 5) + " " + number.slice(5, 10) + " " + number.slice(10, 15);
			else if (number.length == 19)
				return number.slice(0, 5) + " " + number.slice(5, 10) + " " + number.slice(10, 15) + " " + number.slice(15, 19);
		},
		/**
		 * getDebitCardViewModel - Generates a viewModel for the given debit card.
		 * @param {Object} - Debit card object.
		 * @returns {Object}  - constructed view model for debit card.
		 */
		getDebitCardViewModel: function(debitCard) {
			var mfaManager = applicationManager.getMFAManager();
			var formatUtil = applicationManager.getFormatUtilManager();
			mfaManager.setServiceId("SERVICE_ID_40");
			var debitCardViewModel = [];
			var debitCardActions = [];
			//debitCardViewModel.cardId = debitCard.cardId;
			debitCardViewModel.cardType = "Debit"; //debitCard.cardType;
			debitCardViewModel.cardStatus = this.getCardStatus(debitCard.cardStatus);
			debitCardViewModel.pan = debitCard.pan;
			debitCardViewModel.cardNumber = debitCard.pan;
			debitCardViewModel.cardimage = debitCard.cardimage;
			debitCardViewModel.customerId = debitCard.customerId;
			debitCardViewModel.Card_Type = debitCard.Card_Type;
			debitCardViewModel.maskedCardNumber = this.maskCardNumber(debitCard.pan); //formatUtil.formatCardNumber(debitCard.maskedCardNumber);
			debitCardViewModel.Card_Category = debitCard.Card_Category;
			debitCardViewModel.productName = debitCard.Card_Category;
			debitCardViewModel.cardExpDate = debitCard.cardExpDate
			debitCardViewModel.validThrough = this.getExpDateInFromat(debitCard.cardExpDate);
			// debitCardViewModel.dailyWithdrawalLimit = CommonUtilities.formatCurrencyWithCommas(debitCard.withdrawlLimit, false, debitCard.currencyCode);
			// debitCardViewModel.purchaseLimit = CommonUtilities.formatCurrencyWithCommas(debitCard.purchaseLimit, false, debitCard.currencyCode);
			// debitCardViewModel.withdrawalMinLimit = debitCard.withdrawalMinLimit;
			// debitCardViewModel.withdrawalMaxLimit = debitCard.withdrawalMaxLimit;
			// debitCardViewModel.withdrawalStepLimit = debitCard.withdrawalStepLimit;
			//  debitCardViewModel.purchaseMinLimit = debitCard.purchaseMinLimit;
			// debitCardViewModel.purchaseMaxLimit = debitCard.purchaseMaxLimit;
			// debitCardViewModel.purchaseStepLimit = debitCard.purchaseStepLimit;
			// debitCardViewModel.accountName = debitCard.accountName;
			// debitCardViewModel.maskedAccountNumber = debitCard.maskedAccountNumber;
			//debitCardViewModel.serviceProvider = debitCard.serviceProvider;
			debitCardViewModel.chName = debitCard.chName;
			debitCardViewModel.cardHolder = debitCard.chName;
			//  debitCardViewModel.secondaryCardHolder = debitCard.secondaryCardHolder;
			//debitCardViewModel.isTypeBusiness = debitCard.isTypeBusiness;
			// debitCardViewModel.isExpiring = this.getExpDateInFromat(debitCard.cardExpDate);
			// debitCardViewModel.currencyCode = debitCard.currencyCode;
			debitCardViewModel.bankAccNum = debitCard.bankAccNum;
			debitCardViewModel.accountNumber = debitCard.bankAccNum;			//debitCardViewModel.remainingLimit = debitCard.remainingLimit;
			//debitCardViewModel.paymentDueDate = debitCard.paymentDueDate;
			//  debitCardViewModel.maskedNickNameAndNumber = debitCard.maskedNickNameAndNumber;
			switch (debitCardViewModel.cardStatus) {
				case "Active": {
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"));
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"));
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
					break;
				}
				case "Locked": {
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"));
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
					break;
				}
				case "Reported Lost": {
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
					break;
				}
				case "Expired": {
					//TODO
					break;
				}
				case "Inactive": {
					debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
					break;
				}
				// case "Replaced": {
				//     debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				//     break;
				// }
				// case "Replace Request Sent": {
				//     debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				//     break;
				// }
				// case "Issued": {
				//     debitCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
				//     break;
				// }
				default: {
					break;
				}
			}
			var validActions = this.getValidActions();
			// debitCardActions = debitCardActions.filter(function(action) {
			// 	return validActions.indexOf(action) > -1;
			// });
			debitCardViewModel.actions = debitCardActions;
			return debitCardViewModel;
		},
		/**
		 * getValidThroughForCard - Generates a validThrough/expiry date for a given timestamp.
		 * @param {String} - Expiry Date Timestamp.
		 * @returns {String}  - Expiry Date in mm/yy format.
		 */
		getValidThroughForCard: function(expiryDate) {
			if (expiryDate === null || expiryDate === undefined || expiryDate === "")
				return "";
			expiryDate = expiryDate.split('T')[0];
			expiryDate = expiryDate.split('-');
			return expiryDate[1] + '/' + expiryDate[0].slice(2);
		},
		/**
		 * getCreditCardViewModel - Generates a viewModel for the given credit card.
		 * @param {Object} - credit card object.
		 * @returns {Object}  - constructed view model for credit card.
		 */
		getCreditCardViewModel: function(creditCard) {
			var mfaManager = applicationManager.getMFAManager();
			var formatUtil = applicationManager.getFormatUtilManager();
			var creditCardViewModel = [];
			var creditCardActions = [];
			//creditCardViewModel.cardId = creditCard.cardId;
			creditCardViewModel.cardType = "Credit"; //creditCard.cardType;
			creditCardViewModel.cardStatus = this.getCardStatus(creditCard.cardStatus);
			creditCardViewModel.pan = creditCard.pan;
			creditCardViewModel.cardNumber = creditCard.pan;
			creditCardViewModel.cardimage = creditCard.cardimage;
			creditCardViewModel.customerId = creditCard.customerId;
			creditCardViewModel.issuedDate = creditCard.cardIssueDate ? creditCard.cardIssueDate : creditCard.issuedDate;
			creditCardViewModel.maskedCardNumber = this.maskCardNumber(creditCard.pan);
			// creditCardViewModel.maskedCardNumber = formatUtil.formatCardNumber(creditCard.maskedCardNumber);
			creditCardViewModel.Card_Category = creditCard.Card_Category;
			creditCardViewModel.productName = creditCard.Card_Category;
			creditCardViewModel.cardExpDate = creditCard.cardExpDate;
			creditCardViewModel.Card_Type = creditCard.Card_Type;
			creditCardViewModel.mxpAccNum = creditCard.mxpAccNum;
			creditCardViewModel.currCode = creditCard.currCode;
			creditCardViewModel.validThrough = this.getExpDateInFromat(creditCard.cardExpDate);
			creditCardViewModel.creditLimit = creditCard.creditLimit //CommonUtilities.formatCurrencyWithCommas(creditCard.creditLimit, false, creditCard.currencyCode);
			creditCardViewModel.balance = creditCard.balance;
			creditCardViewModel.availableCredit = creditCard.balance; //CommonUtilities.formatCurrencyWithCommas(creditCard.availableCredit, false, creditCard.currencyCode);
			//creditCardViewModel.dailyWithdrawalLimit = CommonUtilities.formatCurrencyWithCommas(creditCard.withdrawlLimit, false, creditCard.currencyCode);
			//creditCardViewModel.purchaseLimit = CommonUtilities.formatCurrencyWithCommas(creditCard.purchaseLimit, false, creditCard.currencyCode);
			//creditCardViewModel.withdrawalMinLimit = creditCard.withdrawalMinLimit;
			//creditCardViewModel.withdrawalMaxLimit = creditCard.withdrawalMaxLimit;
			//creditCardViewModel.withdrawalStepLimit = creditCard.withdrawalStepLimit;
			//creditCardViewModel.purchaseMinLimit = creditCard.purchaseMinLimit;
			//creditCardViewModel.purchaseMaxLimit = creditCard.purchaseMaxLimit;
			//creditCardViewModel.purchaseStepLimit = creditCard.purchaseStepLimit;
			//creditCardViewModel.serviceProvider = creditCard.serviceProvider;
			creditCardViewModel.bankAccNum = creditCard.bankAccNum;
			creditCardViewModel.accountNumber = creditCard.bankAccNum;
			creditCardViewModel.chName = creditCard.chName;
			creditCardViewModel.cardHolder = creditCard.chName
			creditCardViewModel.outstdBalance = creditCard.outstdBalance;
			//creditCardViewModel.secondaryCardHolder = creditCard.secondaryCardHolderName;
			creditCardViewModel.isExpiring = this.getExpDateInFromat(creditCard.cardExpDate);
			//creditCardViewModel.billingAddress = creditCard.billingAddress;
			//creditCardViewModel.accountName = creditCard.accountName;
			// creditCardViewModel.maskedAccountNumber = creditCard.maskedAccountNumber;
			//creditCardViewModel.rewardsPoint = creditCard.rewardsPoint;
			//creditCardViewModel.isTypeBusiness = creditCard.isTypeBusiness;
			//creditCardViewModel.currencyCode = creditCard.currencyCode;
			switch (creditCardViewModel.cardStatus) {
				case "Active": {
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
					creditCardActions.push(kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.DownloadStatement"));
					if (OLBConstants.CLIENT_PROPERTIES.CREDIT_CARD_PAYMENT_VISIBILITY == "TRUE" ) creditCardActions.push(kony.i18n.getLocalizedString("i18n.Pay.PayBill"));
					break;
				}
				case "Locked": {
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
					creditCardActions.push(kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI"));
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.DownloadStatement"));
					if (OLBConstants.CLIENT_PROPERTIES.CREDIT_CARD_PAYMENT_VISIBILITY == "TRUE" ) creditCardActions.push(kony.i18n.getLocalizedString("i18n.Pay.PayBill"));
					break;
				}
				case "Reported Lost": {
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
					break;
				}
				case "Inactive": {
					creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
					break;
				}
				case "Expired": {
					//TODO
					break;
				}
				// case "Replaced": {
				//     creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				//     creditCardActions.push(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"));
				//     break;
				// }
				// case "Replace Request Sent": {
				//     creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				//     creditCardActions.push(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"));
				//     break;
				// }
				// case "Issued": {
				//     creditCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
				//     break;
				// }
				default: {
					break;
				}
			}
			var validActions = this.getValidActions();
			// creditCardActions = creditCardActions.filter(function(action) {
			// 	return validActions.indexOf(action) > -1;
			// });
			creditCardViewModel.actions = creditCardActions;
			return creditCardViewModel;
		},
		getPrepaidCardViewModel: function(prepaidCard) {
			var mfaManager = applicationManager.getMFAManager();
			var formatUtil = applicationManager.getFormatUtilManager();
			var prepaidCardViewModel = [];
			var prepaidCardActions = [];
			//prepaidCardViewModel.cardId = prepaidCard.cardId;
			prepaidCardViewModel.cardType = "Prepaid"; //prepaidCard.cardType;
			prepaidCardViewModel.cardStatus = this.getCardStatus(prepaidCard.cardStatus);
			prepaidCardViewModel.pan = prepaidCard.pan;
			prepaidCardViewModel.cardNumber = prepaidCard.pan;
			prepaidCardViewModel.cardimage = prepaidCard.cardimage;
			prepaidCardViewModel.customerId = prepaidCard.customerId;
			prepaidCardViewModel.cardProgLabel = prepaidCard.cardProgLabel;
			prepaidCardViewModel.maskedCardNumber = this.maskCardNumber(prepaidCard.pan);
			prepaidCardViewModel.issuedDate = prepaidCard.cardIssueDate ? prepaidCard.cardIssueDate : prepaidCard.issuedDate;
			// prepaidCardViewModel.maskedCardNumber = formatUtil.formatCardNumber(prepaidCard.maskedCardNumber);
			prepaidCardViewModel.Card_Category = prepaidCard.Card_Category;
			prepaidCardViewModel.Card_Type = prepaidCard.Card_Type;
			prepaidCardViewModel.Card_Label = prepaidCard.Card_Label;
			prepaidCardViewModel.productName = prepaidCard.Card_Category;
			prepaidCardViewModel.cardExpDate = prepaidCard.cardExpDate;
			prepaidCardViewModel.validThrough = this.getExpDateInFromat(prepaidCard.cardExpDate);
			prepaidCardViewModel.balance = prepaidCard.balance;
			// prepaidCardViewModel.creditLimit = prepaidCard.creditLimit//CommonUtilities.formatCurrencyWithCommas(prepaidCard.creditLimit, false, prepaidCard.currencyCode);
			//prepaidCardViewModel.availableCredit = prepaidCard.balance//CommonUtilities.formatCurrencyWithCommas(prepaidCard.availableCredit, false, prepaidCard.currencyCode);
			//prepaidCardViewModel.dailyWithdrawalLimit = CommonUtilities.formatCurrencyWithCommas(prepaidCard.withdrawlLimit, false, prepaidCard.currencyCode);
			//prepaidCardViewModel.purchaseLimit = CommonUtilities.formatCurrencyWithCommas(prepaidCard.purchaseLimit, false, prepaidCard.currencyCode);
			//prepaidCardViewModel.withdrawalMinLimit = prepaidCard.withdrawalMinLimit;
			//prepaidCardViewModel.withdrawalMaxLimit = prepaidCard.withdrawalMaxLimit;
			//prepaidCardViewModel.withdrawalStepLimit = prepaidCard.withdrawalStepLimit;
			//prepaidCardViewModel.purchaseMinLimit = prepaidCard.purchaseMinLimit;
			//prepaidCardViewModel.purchaseMaxLimit = prepaidCard.purchaseMaxLimit;
			//prepaidCardViewModel.purchaseStepLimit = prepaidCard.purchaseStepLimit;
			//prepaidCardViewModel.serviceProvider = prepaidCard.serviceProvider;
			prepaidCardViewModel.chName = prepaidCard.chName;
			prepaidCardViewModel.cardHolder = prepaidCard.chName;
			prepaidCardViewModel.bankAccNum = prepaidCard.bankAccNum;
			prepaidCardViewModel.accountNumber = prepaidCard.bankAccNum;
			//prepaidCardViewModel.secondaryCardHolder = prepaidCard.secondaryCardHolderName;
			prepaidCardViewModel.isExpiring = this.getExpDateInFromat(prepaidCard.cardExpDate);
			//prepaidCardViewModel.billingAddress = prepaidCard.billingAddress;
			//prepaidCardViewModel.accountName = prepaidCard.accountName;
			// prepaidCardViewModel.maskedAccountNumber = prepaidCard.maskedAccountNumber;
			//prepaidCardViewModel.rewardsPoint = prepaidCard.rewardsPoint;
			//prepaidCardViewModel.isTypeBusiness = prepaidCard.isTypeBusiness;
			//prepaidCardViewModel.currencyCode = prepaidCard.currencyCode;
			switch (prepaidCardViewModel.cardStatus) {
				case "Active": {
					prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.LockCard"));
					//prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ChangePin"));
					if (prepaidCard.Card_Category.split(" ")[0] !== "Virtual")
						prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
					prepaidCardActions.push(kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"));
					prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.DownloadStatement"));
					if((!(prepaidCard.Card_Category.includes("Virtual")) && scope_configManager.getPrepaidCardTopupVisibility() == "TRUE") || ((prepaidCard.Card_Category.includes("Virtual")) && scope_configManager.getDollarCardTopupVisibility() == "TRUE")) 
						prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.TopUpCard"));
					break;
				}
				case "Locked": {
					prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard"));
					if (prepaidCard.Card_Category.split(" ")[0] !== "Virtual")
						prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
					prepaidCardActions.push(kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"));
					prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.HBL.Cards.DownloadStatement"));
					break;
				}
				case "Reported Lost": {
					prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
					break;
				}
				case "Expired": {
					//TODO
					break;
				}
				case "Inactive": {
					prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
					break;
				}
				// case "Replaced": {
				//     prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				//     prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"));
				//     break;
				// }
				// case "Replace Request Sent": {
				//     prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.reportedLost"));
				//     prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.cardsManagement.cancelCard"));
				//     break;
				// }
				// case "Issued": {
				//     prepaidCardActions.push(kony.i18n.getLocalizedString("i18n.CardManagement.ActivateCard"));
				//     break;
				// }
				default: {
					break;
				}
			}
			var validActions = this.getValidActions();
			// prepaidCardActions = prepaidCardActions.filter(function(action) {
			// 	return validActions.indexOf(action) > -1;
			// });
			prepaidCardViewModel.actions = prepaidCardActions;
			return prepaidCardViewModel;
		},
		/**
		 * onBreakpointChange : Handles ui changes on .
		 *�@member�of�{frmCardManagementController}
		 *�@param�{integer} width - current browser width
		 *�@return�{}
		 *�@throws�{}
		 */
		onBreakpointChange: function(width) {
			kony.print('on breakpoint change');
			orientationHandler.onOrientationChange(this.onBreakpointChange);
			this.view.customheader.onBreakpointChangeComponent(width);
			this.setupFormOnTouchEnd(width);
			var scope = this;
			this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
			this.view.CustomAlertPopup.onBreakpointChangeComponent(scope.view.CustomAlertPopup, width);
			var data;
			this.view.breadcrumb.setVisibility(false);
			var responsiveFonts = new ResponsiveFonts();
			// this.view.flxTravelPlan.skin = "slFbox";
			this.AdjustScreen();
			if (width === 640 || orientationHandler.isMobile) {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.customheader.lblHeaderMobile.text = "My Cards";
				responsiveFonts.setMobileFonts();
				this.view.CardLockVerificationStep.cardDetails.skin = "slFbox";
				this.view.CardLockVerificationStep.btnCancel.skin = "sknBtnffffffBorder0273e31pxRadius2px";
				this.view.btnBackToCardLimits.left = "0%";
				this.view.btnManageCards.left = "0%";
				this.view.flxHeader.height = "50px";
				data = this.view.myCards.segDebitCards.data;
				if (data !== undefined && data !== null) {
					data.forEach(function(e) {
						e.template = "flxMyCardsCollapsedMobile";
						e.flxMyCards = {
							"clipBounds": false,
							"skin": "sknFlxffffffBorderRoundedLeftRed",
							"onClick": scope.viewCardDetailsMobile
						}
					});
					scope.view.myCards.segDebitCards.setData(data);
				}
				scope.view.flxMyCardsView.isVisible = true;
			} else {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.customheader.lblHeaderMobile.text = "";
				responsiveFonts.setDesktopFonts();
				data = this.view.myCards.segDebitCards.data;
				if (data !== undefined && data !== null) {
					data.forEach(function(e) {
						e.template = "flxMyCardsCollapsed";
						e.flxCollapse = {
							//   "isVisible": e.cardStatus === "Issued" ? false : true,
							"onClick": scope.changeRowTemplate,
							"accessibilityConfig": {
								"a11yARIA": {
									"role": "button",
									"aria-expanded": false
								}
							}
						}
					});
					scope.view.myCards.segDebitCards.setData(data);
				}
			}
			this.AdjustScreen();
		},
		hideSearchSegPopup: function() {
			var currFormObj = kony.application.getCurrentForm();
			if ((currFormObj.myCards.flxSearchSegment.isVisible === true && searchSeg === true)) {
				searchSeg = false;
			} else if ((currFormObj.myCards.flxSearchSegment.isVisible === true && searchSeg === false)) {
				setTimeout(function() {
					currFormObj.myCards.flxSearchSegment.setVisibility(false);
					searchSeg = true;
				}, "17ms");
			}
		},
		setupFormOnTouchEnd: function(width) {
			var self = this;
			if (width == 640) {
				this.view.onTouchEnd = function() {
					self.hideSearchSegPopup();
				}
				this.nullifyPopupOnTouchStart();
			} else {
				if (width == 1024) {
					this.view.onTouchEnd = function() {
						self.hideSearchSegPopup();
					}
					this.nullifyPopupOnTouchStart();
				} else {
					this.view.onTouchEnd = function() {
						hidePopups();
						self.hideSearchSegPopup();
					}
				}
				var userAgent = kony.os.deviceInfo().userAgent;
				if (userAgent.indexOf("iPad") != -1) {
					this.view.onTouchEnd = function() {}
					this.nullifyPopupOnTouchStart();
				} else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
					this.view.onTouchEnd = function() {}
					this.nullifyPopupOnTouchStart();
				}
			}
		},
		nullifyPopupOnTouchStart: function() {},
		/**
		 * viewCardDetailsMobile : Goes to view card details flex, mobile only function
		 *�@member�of�{frmCardManagementController}
		 *�@param�{}
		 *�@return�{}
		 *�@throws�{}
		 */
		viewCardDetailsMobile: function() {
			//var combinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
			var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
			if (kony.application.getCurrentBreakpoint() != 640) {
				return;
			}
			if (this.view.flxCardDetailsMobile.isVisible == true) {
				return;
			}
			var scope = this;
			var index = this.view.myCards.segDebitCards.selectedRowIndex;
			var rowIndex = index[1];
			var data = [];
			data.push(this.view.myCards.segDebitCards.data[rowIndex]);
			data[0].template = "flxMyCardsExpandedMobile"
			data[0].flxMyCards = {
				"onClick": null
			};
			data[0].flxDetailsRow1 = {
				"isVisible": false
			};
			data[0].flxDetailsRow4 = {
				"isVisible": true
			};
			data[0].flxBlankSpace2 = {
				"isVisible": true
			};
			data[0].lblCardHeader = {
				//"left": combinedUser ? "125dp" :"95dp",
				"left": this.profileAccess === "both" ? "125dp" : "95dp",
				"text": data[0].lblCardHeader.text
			};
			if (data[0].btnAction1 != undefined) {
				var action1 = data[0].btnAction1.onClick;
				data[0].btnAction1 = {
					"isVisible": true,
					"text": data[0].btnAction1.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action1();
						scope.view.flxHeader.setFocus(true);
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction1 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction2 != undefined) {
				var action2 = data[0].btnAction2.onClick;
				data[0].btnAction2 = {
					"isVisible": true,
					"text": data[0].btnAction2.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action2();
						scope.view.flxHeader.setFocus(true);
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction2 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction3 != undefined) {
				var action3 = data[0].btnAction3.onClick;
				data[0].btnAction3 = {
					"isVisible": true,
					"text": data[0].btnAction3.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action3();
						scope.view.flxHeader.setFocus(true);
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction3 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction4 != undefined) {
				var action4 = data[0].btnAction4.onClick;
				data[0].btnAction4 = {
					"isVisible": true,
					"text": data[0].btnAction4.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action4();
						scope.view.flxHeader.setFocus(true);
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction4 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction5 != undefined) {
				var action5 = data[0].btnAction5.onClick;
				data[0].btnAction5 = {
					"isVisible": true,
					"text": data[0].btnAction5.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action5();
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction5 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction6 != undefined) {
				var action6 = data[0].btnAction6.onClick;
				data[0].btnAction6 = {
					"isVisible": true,
					"text": data[0].btnAction6.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action6();
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction6 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction7 != undefined) {
				var action7 = data[0].btnAction7.onClick;
				data[0].btnAction7 = {
					"isVisible": true,
					"text": data[0].btnAction7.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action7();
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction7 = {
					"isVisible": false
				}
			}
			if (data[0].btnAction8 != undefined) {
				var action8 = data[0].btnAction8.onClick;
				data[0].btnAction8 = {
					"isVisible": true,
					"text": data[0].btnAction8.text,
					"onClick": function() {
						scope.view.flxCardDetailsMobile.isVisible = false;
						action8();
						scope.AdjustScreen();
					}
				};
			} else {
				data[0].btnAction8 = {
					"isVisible": false
				}
			}
			data[0].flxBlankSpace2 = {
				"height": "5dp"
			}
			data[0].flxBlankSpace = {
				"height": "5dp"
			}
			var dataMap = {
				"btnAction1": "btnAction1",
				"btnAction2": "btnAction2",
				"btnAction3": "btnAction3",
				"btnAction4": "btnAction4",
				"btnAction5": "btnAction5",
				"btnAction6": "btnAction6",
				"btnAction7": "btnAction7",
				"btnAction8": "btnAction8",
				"flxActions": "flxActions",
				"flxBlankSpace1": "flxBlankSpace1",
				"flxBlankSpace2": "flxBlankSpace2",
				"flxBlankSpace": "flxBlankSpace",
				"flxCardDetails": "flxCardDetails",
				"flxCardHeader": "flxCardHeader",
				"flxCardImageAndCollapse": "flxCardImageAndCollapse",
				"lblCardsSeperator": "lblCardsSeperator",
				"flxCollapse": "flxCollapse",
				//  "flxDetailsRow1": "flxDetailsRow1",
				"flxDetailsRow10": "flxDetailsRow10",
				"flxDetailsRow2": "flxDetailsRow2",
				"flxDetailsRow3": "flxDetailsRow3",
				"flxDetailsRow4": "flxDetailsRow4",
				"flxDetailsRow5": "flxDetailsRow5",
				"flxDetailsRow6": "flxDetailsRow6",
				"flxDetailsRow7": "flxDetailsRow7",
				"flxDetailsRow8": "flxDetailsRow8",
				"flxDetailsRow9": "flxDetailsRow9",
				"flxMyCards": "flxMyCards",
				"flxMyCardsExpanded": "flxMyCardsExpanded",
				"flxRowIndicatorColor": "flxRowIndicatorColor",
				"lblIdentifier": "lblIdentifier",
				"lblSeparator1": "lblSeparator1",
				"lblSeparator2": "lblSeparator2",
				"lblSeperator": "lblSeperator",
				"imgCard": "imgCard",
				"imgCollapse": "imgCollapse",
				"lblCardHeader": "lblCardHeader",
				"lblCardStatus": "lblCardStatus",
				"lblTravelNotificationEnabled": "lblTravelNotificationEnabled",
				//     "lblKey1": "lblKey1",
				"lblKey10": "lblKey10",
				"lblKey2": "lblKey2",
				"lblKey3": "lblKey3",
				"lblKey4": "lblKey4",
				"lblKey5": "lblKey5",
				"lblKey6": "lblKey6",
				"lblKey7": "lblKey7",
				"lblKey8": "lblKey8",
				"lblKey9": "lblKey9",
				"rtxValue1": "rtxValue1",
				"rtxValue10": "rtxValue10",
				"rtxValue2": "rtxValue2",
				"rtxValue3": "rtxValue3",
				"rtxValue4": "rtxValue4",
				"rtxValue5": "rtxValue5",
				"rtxValue6": "rtxValue6",
				"rtxValue7": "rtxValue7",
				"rtxValue8": "rtxValue8",
				"rtxValue9": "rtxValue9",
				"flxIcon": "flxIcon",
				"imgIcon": "imgIcon",
				"lblCardStatusAccessibility": "lblCardStatusAccessibility"
			};
			this.view.segCardDetails.widgetDataMap = dataMap;
			this.view.segCardDetails.setData(data);
			this.view.flxBackToCards.onClick = function() {
				scope.view.flxMyCardsView.isVisible = true;
				scope.view.flxCardDetailsMobile.isVisible = false;
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			}
			this.view.flxHeader.setFocus(true);
			this.view.flxMyCardsView.isVisible = false;
			this.view.flxCardDetailsMobile.isVisible = true;
			this.AdjustScreen();
			this.view.flxBackToCards.setActive(true);
		},
		showAcknowledgementOnPrintCancel: function() {
			var self = this;
			this.hideAllCardManagementViews();
			this.view.ConfirmDialog.confirmButtons.setVisibility(false);
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.ConfirmDialog.flxDestination.setVisibility(false);
			this.view.ConfirmDialog.flxSelectCards.setVisibility(false);
			this.view.btnRequestReplacement.setVisibility(true);
			this.view.btnBackToCards.onClick =function(){
				var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
					"appName": "AuthenticationMA",
					"moduleName": "AuthUIModule"
				});
				var navManager = applicationManager.getNavigationManager();
				var x = navManager.getCustomInfo('AuthParam');
				authModule.presentationController.postLoginCall(x);
				applicationManager.getPresentationUtility().showLoadingScreen();
			}
			this.view.btnRequestReplacement.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.AdjustScreen();
		},
		printAcknowlegement: function() {
			var acknowledgementData = [];
			acknowledgementData.push({
				key: kony.i18n.getLocalizedString('i18n.common.status'),
				value: this.view.Acknowledgement.lblCardTransactionMessage.text
			});
			acknowledgementData.push({
				key: this.view.ConfirmDialog.keyValueCardHolder.lblKey.text,
				value: this.view.ConfirmDialog.keyValueCardHolder.lblValue.text,
			})
			acknowledgementData.push({
				key: this.view.ConfirmDialog.keyValueCardName.lblKey.text,
				value: this.view.ConfirmDialog.keyValueCardName.lblValue.text
			})
			acknowledgementData.push({
				key: this.view.ConfirmDialog.keyValueValidThrough.lblKey.text,
				value: this.view.ConfirmDialog.keyValueValidThrough.lblValue.text,
			})
			acknowledgementData.push({
				key: this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text,
				value: this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text
			})
			acknowledgementData.push({
				key: this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text,
				value: this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text
			})
			acknowledgementData.push({
				key: this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text,
				value: this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text
			})
			var tableList = [{
				tableHeader: kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement"),
				tableRows: acknowledgementData
			}]
			var viewModel = {
				moduleHeader: this.view.lblCardAcknowledgement.text,
				tableList: tableList
			};
			kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.showPrintPage({
				printKeyValueGroupModel: viewModel
			});
		},
		setMobileHeader: function(text) {
			if (kony.application.getCurrentBreakpoint() === 640) {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.customheader.lblHeaderMobile.text = text;
			} else {
				var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
				this.view.customheader.lblHeaderMobile.text = "";
			}
		},
		searchCards: function() {
			if (this.view.myCards.txtSearch.text.length > 0) {
				this.view.myCards.flxClearBtn.setVisibility(true)
			}
			var navManager = applicationManager.getNavigationManager();
				var cardsdata= navManager.getCustomInfo("getCardsResponse");
			var searchString = this.view.myCards.txtSearch.text;
			//this.constructSearchCriteria(searchString);
			this.SetCardsBasedOnsearchString(this.constructSearchCriteria(searchString));
			//var presentationController = applicationManager.getModulesPresentationController("ManageCardsUIModule");
			//presentationController.searchAccounts(searchString, "frmCardManagement");
		},

		constructSearchCriteria:function(searchString){
			var navManager = applicationManager.getNavigationManager();
				var cards= navManager.getCustomInfo("getCardsResponse");
				var self = this;
            var cardsViewModel = [];
			//var data = cards.filter(function(record) {
			//	return (record["Card_Category"] && record["Card_Category"].toUpperCase().indexOf(searchString.toUpperCase()) !== -1)
			//});
            if (cards !== null && cards !== undefined) {
                cards.forEach(function(card) {
                    if (card.customerId[0] === "D" && (card["Card_Category"] && card["Card_Category"].toUpperCase().lastIndexOf(searchString.toUpperCase()) !== -1)) {
                        cardsViewModel.push(self.getDebitCardViewModel(card));
                    } else if (card.customerId[0] === "C" && (card["Card_Category"] && card["Card_Category"].toUpperCase().lastIndexOf(searchString.toUpperCase()) !== -1)) {
                        cardsViewModel.push(self.getCreditCardViewModel(card));
                    } else if (card.customerId[0] === "P" && (card["Card_Category"] && card["Card_Category"].toUpperCase().lastIndexOf(searchString.toUpperCase()) !== -1)) {
                        cardsViewModel.push(self.getPrepaidCardViewModel(card));
                        //self.getVirtualDollarCardCount(card.cardProgLabel);
                    }
                });
            }
            return cardsViewModel;
		},
		SetCardsBasedOnsearchString: function(cards) {
			if(cards.length<1){
				kony.application.showLoadingScreen();
                    var navManager = applicationManager.getNavigationManager();
				var cards=navManager.getCustomInfo("getCardsResponse");
                    this.setCardsData(this.constructCardsViewModel(cards));
					this.view.myCards.segSearch.setVisibility(false);
					this.view.myCards.flxSearchSegment.setVisibility(true);
					this.view.myCards.flxNoResultsSearch.setVisibility(true);

			}else{
            //var combinedUser = applicationManager.getConfigurationManager().isCombinedUser==="true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
			this.view.myCards.flxSearchSegment.setVisibility(false);
            var isMobile = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile);
            if (cards.data && cards.data.length <= 0) {
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxRightBar.setVisibility(false);
                } else {
                    this.view.flxRightBar.setVisibility(true);
                }
                this.showCardsNotAvailableScreen();
            } else {
                var self = this;
                self.view.myCards.flxSearch.setVisibility(true);
                var flxCardSkin = (kony.application.getCurrentBreakpoint() === 640) ? "sknFlxffffffBorderRoundedLeftRed" : "sknFlxffffffBorderRoundedLeftRed";
                var dataMap = {
                    "btnAction1": "btnAction1",
                    "btnAction2": "btnAction2",
                    "btnAction3": "btnAction3",
                    "btnAction4": "btnAction4",
                    "btnAction5": "btnAction5",
                    "btnAction6": "btnAction6",
                    "btnAction7": "btnAction7",
                    "btnAction8": "btnAction8",
                    "flxActions": "flxActions",
					"btnViewMore": "btnViewMore",
					"btnViewLess":"btnViewLess",
                    "imgCardNumberView": "imgCardNumberView",
                    "imgCVV": "imgCVV",
                    "flxEyeIcon": "flxEyeIcon",
                    "flxEyeIcon2": "flxEyeIcon2",
                    "flxBlankSpace1": "flxBlankSpace1",
                    "flxBlankSpace2": "flxBlankSpace2",
                    "flxCardDetails": "flxCardDetails",
                    "flxCardHeader": "flxCardHeader",
                    "flxCardImageAndCollapse": "flxCardImageAndCollapse",
                    "lblCardsSeperator": "lblCardsSeperator",
                    "flxCollapse": "flxCollapse",
                    "flxDetailsRow1": "flxDetailsRow1",
                    "flxDetailsRow10": "flxDetailsRow10",
                    "flxDetailsRow2": "flxDetailsRow2",
                    "flxDetailsRow3": "flxDetailsRow3",
                    "flxDetailsRow4": "flxDetailsRow4",
                    "flxDetailsRow5": "flxDetailsRow5",
                    "flxDetailsRow6": "flxDetailsRow6",
                    "flxDetailsRow7": "flxDetailsRow7",
                    "flxDetailsRow8": "flxDetailsRow8",
                    "flxDetailsRow9": "flxDetailsRow9",
                    "flxMyCards": "flxMyCards",
                    "flxExpiry": "flxExpiry",
                    "imgInfo": "imgInfo",
                    "flxExpiryMessage": "flxExpiryMessage",
                    "lblExpiryMessage": "lblExpiryMessage",
                    "btnActivateNow": "btnActivateNow",
                    "btnActivate": "btnActivate",
                    "flxMyCardsExpanded": "flxMyCardsExpanded",
                    "flxRowIndicatorColor": "flxRowIndicatorColor",
                    "lblIdentifier": "lblIdentifier",
                    "lblSeparator1": "lblSeparator1",
                    "lblSeparator2": "lblSeparator2",
                    "lblSeperator": "lblSeperator",
                    "imgCard": "imgCard",
                    "imgCollapse": "imgCollapse",
                    "lblChevron": "lblChevron",
                    "lblCardHeader": "lblCardHeader",
                    "lblCardStatus": "lblCardStatus",
                    "lblCardStatusAccessibility": "lblCardStatusAccessibility",
                    "lblTravelNotificationEnabled": "lblTravelNotificationEnabled",
                    "lblKey1": "lblKey1",
                    "lblKey10": "lblKey10",
                    "lblKey2": "lblKey2",
                    "lblKey3": "lblKey3",
                    "lblKey4": "lblKey4",
                    "lblKey5": "lblKey5",
                    "lblKey6": "lblKey6",
                    "lblKey7": "lblKey7",
                    "lblKey8": "lblKey8",
                    "lblKey9": "lblKey9",
                    "rtxValue1": "rtxValue1",
                    "rtxValue10": "rtxValue10",
                    "rtxValue2": "rtxValue2",
                    "rtxValue3": "rtxValue3",
                    "rtxValue4": "rtxValue4",
                    "rtxValue5": "rtxValue5",
                    "rtxValue6": "rtxValue6",
                    "rtxValue7": "rtxValue7",
                    "rtxValue8": "rtxValue8",
                    "rtxValue9": "rtxValue9",
                    "segMyCardsExpanded": "segMyCardsExpanded",
                    "flxIcon": "flxIcon",
                    "imgIcon": "imgIcon",
                    "lblCardNumber": "lblCardNumber",
                    "lblValidThru": "lblValidThru",
                    "lblCardHolderName": "lblCardHolderName",
                    "index": "index"
                };
                var cardsSegmentData = [];
                var card = {};
                cards.data = cards;
                //   var travelStatusData = cards.status;
				 var c=0 , d=0, p=0;
                for (var i = 0; i < cards.data.length; i++) {
                    var dataItem = cards.data[i];
					dataItem.row = dataItem.cardType === "Credit"? c++ : dataItem.cardType === "Debit" ? d++ : p++;
                    card = {
                        "lblCardsSeperator": {
                            "text": ".",
                            "height": "105px"
                        },
                        "flxCollapse": {
                            "isVisible": dataItem.cardStatus === "Issued" ? false : true,
                            "onClick": (kony.application.getCurrentBreakpoint() === 640) ? ((dataItem.cardStatus === "Issued") ? null : self.viewCardDetailsMobile) : (self.changeRowTemplate.bind(self, dataItem)),
                            "accessibilityConfig": {
                                "a11yLabel": "Show more details for card " + dataItem.productName,
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false
                                }
                            }
                        },
						"btnViewMore": {
                                "text": "View More...",
                                "isVisible": dataItem.cardStatus === "Active" ? true : false,
                                "onClick": (kony.application.getCurrentBreakpoint() === 640) ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile) : (self.changeRowNewTemplate.bind(self, dataItem)),
                                "accessibilityConfig": {
                                    "a11yLabel": "Show more details for card " + dataItem.productName,
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false
                                    }
                                }
                            },
                            "btnViewLess": {
                                "text": "View Less...",
                                "isVisible": false,
                                "onClick": (kony.application.getCurrentBreakpoint() === 640) ? ((dataItem.cardStatus === "Active") ? null : self.viewCardDetailsMobile) : (self.changeRowNewTemplate.bind(self, dataItem)),
                                "accessibilityConfig": {
                                    "a11yLabel": "Show more details for card " + dataItem.productName,
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false
                                    }
                                }
                            },
                        "flxRowIndicatorColor": {
                            "height": "190Px",
                            "skin": "sknFlxF4BA22"
                        },
                        "lblSeperator": ".",
                        "lblSeparator1": ".",
                        "lblSeparator2": ".",
                        "imgCard": {
                            "src": dataItem.cardimage //self.getImageForCard(dataItem.productName),
                        },
                        "imgCollapse": {
                            "src": ViewConstants.IMAGES.ARRAOW_DOWN,
                            "accessibilityconfig": {
                                "a11yLabel": "View Details"
                            }
                        },
                        "lblCardHeader": {
                            "text": dataItem.productName,
                            //"left": combinedUser ? (isMobile ? "30dp" : "70dp") :(isMobile? "0dp": "40dp"),
                            "left": this.profileAccess === "both" ? (isMobile ? "30dp" : "70dp") : (isMobile ? "0dp" : "40dp"),
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.productName
                            }
                        },
                        "lblCardStatus": {
                            "text": self.geti18nDrivenString(dataItem.cardStatus),
                            "skin": self.statusSkinsLandingScreen[dataItem.cardStatus],
                            "accessibilityConfig": {
                                "a11yHidden": true,
                                "a11yLabel": self.geti18nDrivenString(dataItem.cardStatus)
                            }
                        },
                        "lblCardStatusAccessibility": {
                            "text": (dataItem.isExpiring === '1' && dataItem.cardStatus === "Active") ? ("Card status - " + kony.i18n.getLocalizedString("i18n.CardManagement.NearingExpiry")) : ("Card status - " + self.geti18nDrivenString(dataItem.cardStatus)),
                            "skin": (dataItem.isExpiring === '1' && dataItem.cardStatus === "Active") ? self.statusSkinsLandingScreen["NearingExpiry"] : self.statusSkinsLandingScreen[dataItem.cardStatus],
                            "accessibilityConfig": {
                                "tagName": "span",
                                "a11yARIA": {
                                    "tabindex": -1
                                }
                            }
                        },
                        "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxMyCardsCollapsedMobile" : "flxMyCardsCollapsed",
                        "flxExpiry": {
                            "isVisible": dataItem.isExpiring === '1' ? true : false
                        },
                        "btnActivateNow": {
                            "onClick": self.activateCard.bind(self, cards.data[i])
                        },
                        "btnActivate": {
                            "isVisible": dataItem.cardStatus === "Issued" ? true : false,
                            "onClick": self.activateCard.bind(self, cards.data[i])
                        },
                        "flxEyeIcon": {
                            "onClick": self.showCardNumber.bind(self, cards.data[i]),
                            "isVisible": true,
                        },
                        "imgCardNumberView": {
                            "src": "eye_show.png",
                            "isVisible": true,
                            "accessibilityConfig": {
                                "a11yLabel": "eye_show.png"
                            }
                        },
                        "flxEyeIcon2": {
                            "onClick": self.getCVV.bind(self, cards.data[i]),
                            "isVisible": true,
                        },
                        "imgCVV": {
                            "src": "eye_show.png",
                            "isVisible": true,
                            "accessibilityConfig": {
                                "a11yLabel": "eye_show.png"
                            }
                        },
                        "flxDetailsRow1": {
                            "isVisible": true
                        },
                        "flxDetailsRow2": {
                            "isVisible": dataItem.cardStatus === "Issued" ? false : true
                        },
                        "flxDetailsRow3": {
                            "isVisible": (dataItem.cardStatus === "Issued" || dataItem.isExpiring === '1') ? false : true
                        },
                        "flxDetailsRow4": {
                            "isVisible": false
                        },
                        "flxDetailsRow5": {
                            "isVisible": false
                        },
                        "flxDetailsRow6": {
                            "isVisible": dataItem.cardType === "Debit" ? false : true
                        },
                        "flxDetailsRow7": {
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "flxDetailsRow8": {
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "flxDetailsRow9": {
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "lblKey1": {
                            "text": kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.CardNumber")
                            }
                        },
                        "lblKey10": {
                            "text": kony.i18n.getLocalizedString("i18n.CardManagement.productName"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.productName")
                            },
                            "isVisible": false
                        },
                        "lblKey4": {
                            "text": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate")
                            }
                        },
                        "lblKey2": {
                            "text": kony.i18n.getLocalizedString("i18n.HBL.CardHolderName"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.CardHolderName"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyWithdrawalLimit") : kony.i18n.getLocalizedString("i18n.accountDetail.availableCredit")
                            }
                        },
                        "lblKey5": {
                            "text": kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.transfers.accountName") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.CVV"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.transfers.accountName") : kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit")
                            },
                            "isVisible": true
                        },
                        "lblKey6": {
                            "text": dataItem.cardType === "Credit" ? kony.i18n.getLocalizedString("i18n.accountDetail.creditLimit") : kony.i18n.getLocalizedString("i18n.HBL.Cards.Balance"), //kony.i18n.getLocalizedString("i18n.CardManagement.BillingAddress"),
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.cardType === "Debit" ? kony.i18n.getLocalizedString("i18n.common.accountNumber") : kony.i18n.getLocalizedString("i18n.CardManagement.BillingAddress")
                            },
                            "isVisible": dataItem.cardType === "Debit" ? false : true
                        },
                        "lblKey7": {
                            "text": kony.i18n.getLocalizedString("i18n.HBL.Cards.OutstandingAmount"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.OutstandingAmount")
                            },
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "lblKey8": {
                            "text": kony.i18n.getLocalizedString("i18n.HBL.Cards.PaymentDueDate"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.PaymentDueDate")
                            },
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "lblKey9": {
                            "text": kony.i18n.getLocalizedString("i18n.HBL.Cards.RemainingLimit1"),
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.HBL.Cards.RemainingLimit1")
                            },
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "lblKey3": {
                            "text": kony.i18n.getLocalizedString("i18n.serviceRequests.Status:"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : "Reward Points" + ":",
                            "accessibilityconfig": {
                                "a11yLabel": kony.i18n.getLocalizedString("i18n.common.status"), //dataItem.cardType === 'Debit' ? kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit") : "Reward Points" + ":"
                            }
                        },
                        "rtxValue1": {
                            "text": dataItem.maskedCardNumber,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.maskedCardNumber
                            }
                        },
                        "rtxValue10": {
                            "text": dataItem.productName,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.productName
                            },
                            "isVisible": false
                        },
                        "rtxValue4": {
                            "text": dataItem.validThrough,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.validThrough
                            }
                        },
                        "rtxValue2": {
                            "text": dataItem.cardHolder, //dataItem.cardType === 'Debit' ? dataItem.dailyWithdrawalLimit : dataItem.availableCredit,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.cardHolder, //dataItem.cardType === 'Debit' ? dataItem.dailyWithdrawalLimit : dataItem.availableCredit
                            }
                        },
                        "rtxValue5": {
                            "text": "XXX", //dataItem.cardType === 'Debit' ? dataItem.accountName : dataItem.creditLimit,
                            "accessibilityconfig": {
                                "a11yLabel": "XXX" //dataItem.cardType === 'Debit' ? dataItem.accountName : dataItem.creditLimit
                            },
                            "isVisible": true
                        },
                        "rtxValue6": {
                            "text": dataItem.cardType === "Credit" ? dataItem.creditLimit : dataItem.balance,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.cardType === "Debit" ? dataItem.maskedAccountNumber : dataItem.billingAddress
                            },
                            "isVisible": dataItem.cardType === "Debit" ? false : true
                        },
                        "rtxValue7": {
                            "text": dataItem.outstdBalance,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.outstdBalance
                            },
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "rtxValue8": {
                            "text": "", //dataItem.cardHolder,
                            "accessibilityconfig": {
                                "a11yLabel": "" //dataItem.cardHolder
                            },
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "rtxValue9": {
                            "text": "", //dataItem.secondaryCardHolder,
                            "accessibilityconfig": {
                                "a11yLabel": "" //dataItem.secondaryCardHolder
                            },
                            "isVisible": dataItem.cardType === "Credit" ? true : false
                        },
                        "rtxValue3": {
                            "text": dataItem.cardStatus, //dataItem.cardType === 'Debit' ? dataItem.purchaseLimit : dataItem.rewardsPoint,
                            "accessibilityconfig": {
                                "a11yLabel": dataItem.cardStatus, //dataItem.cardType === 'Debit' ? dataItem.purchaseLimit : dataItem.rewardsPoint
                            }
                        },
                        // "lblTravelNotificationEnabled": {
                        //     "text": cards.status[i].status.toLowerCase() === "yes" ? kony.i18n.getLocalizedString('i18n.CardManagement.TravelNotificationsEnabled') : "",
                        //     "accessibilityconfig": {
                        //         "a11yLabel": cards.status[i].status.toLowerCase() === "yes" ? kony.i18n.getLocalizedString('i18n.CardManagement.TravelNotificationsEnabled') : ""
                        //     }
                        // },
                        "flxMyCards": {
                            "clipBounds": false,
                            "skin": flxCardSkin
                        },
                        "lblChevron": {
                            "isVisible": dataItem.cardStatus === "Issued" ? false : true,
                            "skin": "sknLblrightArrowFontIcon0273E3"
                        },
                        "flxIcon": {
                            "isVisible": this.profileAccess === "both"
                        },
                        "imgIcon": {
                            "text": dataItem.isTypeBusiness === "1" ? "r" : "s"
                        },
                        "cardType": dataItem.cardType,
                        "index": i,
                        "lblCardNumber": dataItem.maskedCardNumber,
                        "lblValidThru": dataItem.validThrough,
                        "lblCardHolderName": dataItem.cardHolder,
                    };
                    var actionButtonIndex;
                    for (var index = 0; index < dataItem.actions.length; index++) {
                        actionButtonIndex = Number(index) + 1;
                        card['btnAction' + actionButtonIndex] = self.getActionButton(dataItem, dataItem.actions[index]);
                    }
                    cardsSegmentData.push(card);
                }
				this.view.myCards.segDebitCards.widgetDataMap = dataMap;
				var scopeObj=this;
				scopeObj.view.myCards.flxDebitCards.setVisibility(false);
				scopeObj.view.myCards.flxCreditCards.setVisibility(false);
				scopeObj.view.myCards.flxPrepaidCards.setVisibility(false);
                var debitCardsData = cardsSegmentData.filter(function(card) {
                    if (card.cardType == "Debit") {
						scopeObj.view.myCards.flxDebitCards.setVisibility(true);
                        return card;
                    }
                });
                var prepaidCardsData = cardsSegmentData.filter(function(card) {
                    if (card.cardType == "Prepaid") {
						scopeObj.view.myCards.flxPrepaidCards.setVisibility(true);
                        return card;
                    }
                });
                var creditCardsData = cardsSegmentData.filter(function(card) {
                    if (card.cardType == "Credit") {
						scopeObj.view.myCards.flxCreditCards.setVisibility(true);
                        return card;
                    }
                })
                /*if (debitCardsData && debitCardsData.length <= 0) {
                    this.view.myCards.flxNoError.isVisible = true;
                    this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.HBL.Cards.NoDebitCards');
                } else {*/
                   if(debitCardsData && debitCardsData.length >= 0){
				   this.view.myCards.segDebitCards.setData(debitCardsData);
				   }
                //}
               /* if (creditCardsData && creditCardsData.length <= 0) {
                    this.view.myCards.flxCreditCardsError.isVisible = true;
                    this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.HBL.Cards.NoCreditcards');
                } else {
                    this.view.myCards.segCreditCards.setData(creditCardsData);
                }*/
				if (creditCardsData&& creditCardsData.length >= 0){
					this.view.myCards.segCreditCards.setData(creditCardsData);
				}
                /*if (prepaidCardsData && prepaidCardsData.length <= 0) {
                    this.view.myCards.flxNoPrepaidCardsError.isVisible = true;
                    this.view.myCards.lblNoCardsError.text = kony.i18n.getLocalizedString('i18n.HBL.Cards.NoPrepaidCards');
                } else {
                    this.view.myCards.segPrepaidCards.setData(prepaidCardsData);
                }*/
					if (prepaidCardsData && prepaidCardsData.length >= 0) {
						this.view.myCards.segPrepaidCards.setData(prepaidCardsData);
					}
                this.view.flxNewcard.setVisibility(false);
                this.view.flxMyCardsView.setVisibility(true);
                this.view.flxViewStatements.setVisibility(false);
                this.view.flxViewTransactions.setVisibility(false);
                this.view.flxAcknowledgment.setVisibility(false);
                this.view.flxConvertToEMI.setVisibility(false);
                this.view.flxConvertToEMIConfirm.setVisibility(false);
				this.view.flxConvertEMIConfirm.setVisibility(false);
                this.view.flxMyCards.setVisibility(true);
                this.view.myCards.segDebitCards.setVisibility(true);
				this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
                this.view.flxRequestANewCard.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile || kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.flxRightBar.setVisibility(false);
                    this.view.myCards.flxRequestANewCard.setVisibility(true);
                } else {
                    this.view.flxRightBar.setVisibility(true);
                    this.view.flxCardAccounts.top = "10dp";
                }
                this.view.flxRequestANewCard.onClick = function() {
                    self.requestCardFlow = "debitcard";
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
                };
                this.view.flxRequestANewPrepaidCard.onClick = function() {
					self.view.myCards.flxCards.setVisibility(false);
                    self.selectCardTypeFlow();
                };
                this.view.myCards.btnApplyForPrepaidCard.onClick = function() {
					self.view.myCards.flxCards.setVisibility(false);
                    self.selectCardTypeFlow();
                };
				this.view.myCards.btnApplyForCard.onClick = function() {
					self.requestCardFlow = "debitcard";
					applicationManager.getPresentationUtility().showLoadingScreen();
					kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
                };
                /*this.view.flxRequestANewVirtualDollarCard.onClick = function () {
					self.requestCardFlow = "virtualPrepaidCard";
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToVirtualDollarCardFlow();
                };*/
            }
		}
            kony.application.dismissLoadingScreen();
        },
		showSearchResultsOfCards: function(data) {
			var scopeObj = this;
			var segSearchData = [];
			this.view.myCards.segSearch.widgetDataMap = {
				"flxSearchAccounts": "flxSearchAccounts",
				"lblAccountName": "lblAccountName",
				"cardDetails": "data"
			};
			data && data.forEach((ele) => {
				segSearchData.push({
					"flxSearchAccounts": {
						"accessibilityConfig": {
							"a11yLabel": `Account ${ele.maskedNickNameAndNumber}`,
							"a11yARIA": {
								"role": "button",
								"tabindex": 0
							}
						},
						"onKeyPress": scopeObj.segSearchOnKeyPress
					},
					"lblAccountName": {
						"text": ele.maskedNickNameAndNumber,
						"accessibilityConfig": {
							"tagName": "span",
							"a11yARIA": {
								"tabindex": -1
							}
						},
					},
					"accountNumber": ele.accountNumber
				});
			});
			this.view.myCards.flxSearchSegment.setVisibility(true);
			if (segSearchData.length > 0) {
				this.view.myCards.segSearch.setVisibility(true);
				this.view.myCards.flxNoResultsSearch.setVisibility(false);
				this.view.myCards.segSearch.setData(segSearchData);
				this.view.myCards.flxSearchSegment.enableScrolling = true;

			} else {
				this.view.myCards.segSearch.setVisibility(false);
				this.view.myCards.flxNoResultsSearch.setVisibility(true);
				this.view.myCards.flxSearchSegment.enableScrolling = false;
			}
		},
		segSearchOnKeyPress: function(eventObject, eventPayload, context) {
			var scopeObj = this;
			if (eventPayload.keyCode === 27) {
				scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
				eventPayload.preventDefault();
				scopeObj.view.myCards.flxtxtSearchandClearbtn.accessibilityConfig = {
					"a11yARIA": {
						"aria-autocomplete": "list",
						"aria-expanded": false,
						"role": "combobox",
						"aria-required": false,
						"aria-controls": (scopeObj.view.myCards.flxSearchSegment.isVisible) ? "flxSearchSegment" : "flxSearch",
						"tabindex": -1
					}
				}
				scopeObj.view.myCards.flxtxtSearchandClearbtn.setActive(true);
			} else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
				if (context.rowIndex === 0) {
					scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
					eventPayload.preventDefault();
					scopeObj.view.myCards.flxtxtSearchandClearbtn.accessibilityConfig = {
						"a11yARIA": {
							"aria-autocomplete": "list",
							"aria-expanded": false,
							"role": "combobox",
							"aria-required": false,
							"aria-controls": (scopeObj.view.myCards.flxSearchSegment.isVisible) ? "flxSearchSegment" : "flxSearch",
							"tabindex": -1
						}
					}
					scopeObj.view.myCards.flxtxtSearchandClearbtn.setActive(true);
				}
			} else if (eventPayload.keyCode === 9) {
				if (context.rowIndex === context.widgetInfo.data.length - 1) {
					scopeObj.view.myCards.flxSearchSegment.setVisibility(false);
				}
			}
		},
		clearSearchItems: function() {
			this.view.myCards.flxSearchSegment.setVisibility(false);
			this.view.myCards.flxClearBtn.setVisibility(false);
			this.view.myCards.txtSearch.text = "";
		},
		searchSegOnRowClick: function() {
			var scopeObj = this;
			var presentationController = applicationManager.getModulesPresentationController("ManageCardsUIModule");
			var cardsData = presentationController.getAllCardsByAccountNumber(this.view.myCards.segSearch.selectedRowItems[0].accountNumber);
			this.showSelectedCardDetails(cardsData, "SearchClick");
		},
		showSelectedCardDetails: function(selectedAccountNumber, requestFrom) {
			var scopeObj = this;
			var presentationController = applicationManager.getModulesPresentationController("ManageCardsUIModule");
			if (selectedAccountNumber && selectedAccountNumber.length > 0) {
				if (requestFrom == "SearchClick" || requestFrom == "AccountsDashboard") {
					this.view.myCards.lblAccountName.text = (selectedAccountNumber && selectedAccountNumber[0].maskedNickNameAndNumber) ? selectedAccountNumber[0].maskedNickNameAndNumber :
						(selectedAccountNumber[0].maskedAccountNumber) ? selectedAccountNumber[0].maskedAccountNumber : "";
					this.view.myCards.flxAccountName.setVisibility(true);
					this.view.myCards.flxCross.accessibilityConfig = {
						"a11yLabel": `Currently showing cards for account ${this.view.myCards.lblAccountName.text}, Click to close and show all cards`,
						"a11yARIA": {
							"role": "button",
							"tabindex": 0
						}
					}
					scopeObj.view.myCards.flxCross.setActive(true);
				}
				var selectedCardDetails = {
					"data": selectedAccountNumber,
					"status": presentationController.CardStatus
				};
				this.clearSearchItems();
				this.showCardsStatus(selectedCardDetails, false);
			} else {
				this.showCardsNotAvailableScreen();
				CommonUtilities.hideProgressBar(this.view);
				this.AdjustScreen();
			}
		},
		ShowAllCards: function() {
			this.view.myCards.flxAccountName.setVisibility(false);
			var presentationController = applicationManager.getModulesPresentationController("ManageCardsUIModule");
			this.showSelectedCardDetails(presentationController.allCardsData, "AllCards");
			this.view.myCards.txtSearch.setActive(true);
		},

		showAccountsForNewCard: function(accountsData) {
			var scopeObj = this;
			var savings = [];
			var checkings = [];
			if (accountsData && accountsData[1])
				savings = accountsData[1];
			if (accountsData && accountsData[0])
				checkings = accountsData[0];
			var accountsDataMerged = checkings.concat(savings);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			//  this.view.flxTravelPlan.setVisibility(false);
			this.view.flxMyCards.setVisibility(false);
			this.view.flxRightBar.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.flxNewcard.setVisibility(true);
			this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard"); 			
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
			this.view.flxCardProductsSegments.setVisibility(false);
			this.view.flxSelectPrepaidCardType.setVisibility(false);
			this.view.flxCardBody.setVisibility(false);
			this.view.flxVirtualDollarCardBody.setVisibility(false);
			this.view.flxVirtualDollarCardAccount.setVisibility(false);
			this.view.flxAccountsSegments.setVisibility(true);
			var dataMap = {
				"flxMyCardsAccountListItem": "flxMyCardsAccountListItem",
				"flxMyCardsAccountListItemMobile": "flxMyCardsAccountListItemMobile",
				"flxAccountNameWrapper": "flxAccountNameWrapper",
				"lblAccountName": "lblAccountName",
				"lblAccount": "lblAccount",
				"lblseprator": "lblseprator",
				"imgCollapse": "imgCollapse",
				"segMyCardsAccountListItem": "segMyCardsAccountListItem"
			};
			var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
			var cardsAccountsSegmentData = [];
			var accounts = {};
			for (var i = 0; i < accountsDataMerged.length; i++) {
				var dataItem = accountsDataMerged[i];
				var match = allAccounts.find(acc => acc.accountID === dataItem.accountID);
				var accountTypeText = (match && match.description) ? match.description : dataItem.accountType;	
				if(dataItem.currencyCode == "NPR" && dataItem.supportTransferFrom == "1") {
					accounts = {
						"flxAccountNameWrapper": {
							"isVisible": true
						},
						"lblAccountName": {
							"text": dataItem.nickName + " ...." + dataItem.accountID.substring(dataItem.accountID.length - 4), //CommonUtilities.mergeAccountNameNumber(dataItem.nickName, dataItem.accountID), //data.nickName + " "+ CommonUtilities.accountNumberMask(data.accountID),
							"accessibilityconfig": {
								"a11yLabel": dataItem.nickName + " ...." + dataItem.accountID.substring(dataItem.accountID.length - 4), //CommonUtilities.mergeAccountNameNumber(dataItem.nickName, dataItem.accountID), //data.nickName + " "+ CommonUtilities.accountNumberMask(data.accountID),
							}
						},
						"lblAccount": {
							"text": accountTypeText || dataItem.accountType,
							"accessibilityconfig": {
								"a11yLabel": dataItem.accountType,
							}
						},
						"imgCollapse": {
							"src": "right_arrow.png",
						},
						"template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxMyCardsAccountListItemMobile" : "flxMyCardsAccountListItem",
						"lblseprator": {
							"isVisible": true,
							"text": "."
						},
						"flxMyCardsAccountListItem": {
							"accessibilityConfig": {
								"a11yLabel": `Select ${scopeObj.view.lblAccountsHeader.text} with account nickname ${(dataItem.nickName + " ...." + dataItem.accountID.substring(dataItem.accountID.length - 4))} and account type ${dataItem.accountType}`,
								"a11yARIA": {
									"tabindex": 0,
									"role": "link"
								}
							}
						},
						"flxMyCardsAccountListItemMobile": {
							"accessibilityConfig": {
								"a11yLabel": `Select ${scopeObj.view.lblAccountsHeader.text} with account nickname ${(dataItem.nickName + " ...." + dataItem.accountID.substring(dataItem.accountID.length - 4))} and account type ${dataItem.accountType}`,
								"a11yARIA": {
									"tabindex": 0,
									"role": "link"
								}
							}
						}
					};
					cardsAccountsSegmentData.push(accounts);
				}
			}
			this.view.segAccounts.widgetDataMap = dataMap;
			if (cardsAccountsSegmentData.length > 0) {
				if (cardsAccountsSegmentData[cardsAccountsSegmentData.length - 1].lblseprator) {
					cardsAccountsSegmentData[cardsAccountsSegmentData.length - 1].lblseprator.isVisible = false;
				}
			}
			this.view.segAccounts.setData(cardsAccountsSegmentData);
			this.view.segAccounts.onRowClick = this.navigateToNewCardList.bind(this, accountsData);
			this.view.btnCancelAccount.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.btnCancelAccount.accessibilityConfig = {
				"a11yLabel": "Cancel new card request process",
				"a11yARIA": {
					"tabindex": 0,
					"role": "button"
				}
			};
			this.view.forceLayout();
			this.AdjustScreen();
		},


		navigateToNewCardList: function(accountsData) {
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			var selectedAccountData = this.getAccountsData(accountsData);
			if (selectedAccountData.availableBalance.slice(0, 1) === "-") {
				this.view.flxDowntimeWarning.setVisibility(true);
				this.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.CardManagement.NegativeBalance");
			} else {
				this.view.flxDowntimeWarning.setVisibility(false);
				var data = this.view.segAccounts.selectedRowItems[0];
				var accountType = data.lblAccount.text;
				var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
				// manageCardsModule.presentationController.getSelectCardProducts(accountType, selectedAccountData);
				manageCardsModule.presentationController.getCardLimits(selectedAccountData);
			}
		},

		getAccountsData: function(data) {
			var index = this.view.segAccounts.selectedRowIndex[1];
			var noOfCheckingAccounts = data[0].length;
			if (index >= 0 && index < noOfCheckingAccounts) {
				return data[0][index];
			} else
				return data[1][index % noOfCheckingAccounts];
		},
		navigateToRequestVDCardFlow: function(accounts) {
			var savings = [];
            var checkings = [];
            if (accounts && accounts[1]) savings = accounts[1];
            if (accounts && accounts[0]) checkings = accounts[0];
            var accountsDataMerged = checkings.concat(savings);
			var scope = this;
			scope.restrictCharactersSet();
			scope.view.tbxPANNo.text = "";
			scope.view.tbxAmount.text = "";
			// this.view.lstBoxCardType.selectedKey = "lb1";
			scope.view.tbxPANNo.maxTextLength= 9;
			this.groupIdentifier = {
				"internal": {
					"identifier": "accountTypeKey"
				},
				"segregation": {
					"Checking": "Checking Account",
					"CreditCard": "Credit Card Account",
					"Deposit": "Deposit Account",
					"Loan": "Loan Account",
					"Savings": "Saving Account",
					"default": "All Payees"
				}
			};
			FormControllerUtility.disableButton(this.view.btnContinue3);
			this.view.flxMyCards.setVisibility(false);
			this.view.flxRightBar.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.flxSelectPrepaidCardType.setVisibility(false);
			this.view.flxNewcard.setVisibility(true);
			this.view.flxVirtualDollarCardAccount.setVisibility(true);
			//this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
			//this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestCard");
			this.view.lblNewCardHeader.text = "Request Virtual Card";
			this.view.title = "Request Virtual Card";
            this.view.flxCardBody.setVisibility(false);
			this.view.flxAccountsSegments.setVisibility(false);
			this.view.flxCardProductsSegments.setVisibility(false);
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.flxVirtualDollarCardBody.setVisibility(false);
			this.view.customheader.btnSkip.setActive(true);
			this.view.segFromAccounts.onRowClick = this.onFromAccountSelection.bind(this);
		    //this.view.lblCardsHeader2.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.SelectAccToReqCard");			
			this.view.lblCardsHeader2.text = "Select an Account to Request a Virtual Card for:";
			this.view.lblCardsHeader2.left = "25dp";
			this.view.lblCardsHeader2.skin = "sknlbl424242SSP15pxSemibold";
			this.view.radioBtnCardType.onSelection = this.onCardTypeSelection;
			this.view.lbxCardSubType.onSelection = this.onCardSubTypeSelection;
			this.view.flxFromAccountList.onClick = function() {
				if (scope.view.lblConsenttypedropdown.text == "P") {
					scope.view.lblConsenttypedropdown.text = "O";
					scope.view.flxFromAccountSegment.setVisibility(false);
					scope.view.flxFromAccountTextBoxAndIcon.skin = "sknFlxffffffBorderRoundedLeftRed";
				} else {
					scope.view.lblConsenttypedropdown.text = "P";
					scope.view.flxFromAccountSegment.setVisibility(true);
					scope.view.flxFromAccountTextBoxAndIcon.skin = "sknFlxffffffBorderRoundedLeftRedFocus";
				}
			};
			this.view.btnCancelVirtualCard.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();;
				scope.view.btnCancelVirtualCard.accessibilityConfig = {
					"a11yLabel": "Cancel new card request process",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				};
			};
			this.view.btnModifyVirtualCard.onClick = function() {
				scope.view.flxVirtualDollarCardAccount.isVisible = false;
				scope.view.flxCardProductsSegments.isVisible = true;
			};
			this.view.tbxPANNo.onTextChange = this.enableVDContinueButton;
			this.view.tbxAmount.onTextChange = this.enableVDContinueButton;
			this.view.btnContinue5.onClick = this.selectVirtualDollarCard;
			this.setFromAccountsList(scope_configManager.userAccounts, "segFromAccounts");
			this.setDefaultAccount(scope_configManager.userAccounts);
			this.view.forceLayout();
			this.AdjustScreen();
		},
		enableVDContinueButton: function() {
            this.view.tbxPANNo.text = this.view.tbxPANNo.text.replace(/[^0-9]/g, "").substring(0, 9);
			let panNo = this.view.tbxPANNo.text;
			let topupAmount = this.view.tbxAmount.text
			if (panNo.length == 9 && !(this.isEmptyNullOrUndefined(panNo)) && !(this.isEmptyNullOrUndefined(topupAmount)) && !(this.isEmptyNullOrUndefined(this.selectedVDCardType)) && this.selectedVDCardType !== "Select Card")
				FormControllerUtility.enableButton(this.view.btnContinue3);
			else{
				//display valid error message "Please enter a valid 9-digit PAN Number."				
				FormControllerUtility.disableButton(this.view.btnContinue3);
			}

		},
		 selectVirtualDollarCard: function() {
            var scope = this;
            this.view.flxVirtualDollarCardAccount.setVisibility(false);
            this.view.flxVirtualDollarCardBody.setVisibility(true);
            this.enableVDContinueButton();
            //this.view.tbxAmount.text = "";
            //this.view.tbxPANNo.text = "";
            //this.view.lblMyCardsHeader3.text = "Select an Account to Request a Virtual Card for";
            this.view.lblMyCardsHeader3.skin = "sknlbl424242SSP15pxSemibold";
            var navManager = applicationManager.getNavigationManager();
            var selectedAcc = navManager.getCustomInfo("selectedAccountForVDCard");
            this.view.lblFrmAccVal.text = selectedAcc.lblRecordField1;
			var navManager = applicationManager.getNavigationManager();
			this.view.lblCardTypeValue.text  = navManager.getCustomInfo("cardSubType");
			this.selectedVDCardType = navManager.getCustomInfo("cardSubType");
          //  this.view.lstBoxCardType.onSelection = this.onVDCardTypeSelection;
            this.view.btnCancel3.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
                scope.view.btnCancel3.accessibilityConfig = {
                    "a11yLabel": "Cancel new card request process",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button"
                    }
                };
            };
            this.view.btnContinue3.onClick = this.requestVDCardConfirmation;
			this.view.btnModify3.onClick = function(){
				scope.view.flxVirtualDollarCardBody.isVisible = false;
				scope.view.flxVirtualDollarCardAccount.isVisible = true;
			};
			this.enableVDContinueButton();
        },
		/*onVDCardTypeSelection: function(selectionObj) {
			let cardType = selectionObj.selectedKeyValue[1];
			this.selectedVDCardType = cardType;
			this.enableVDContinueButton();
		},*/
		requestVDCardConfirmation: function() {
			var navManager = applicationManager.getNavigationManager();
			var selectedAcc = navManager.getCustomInfo("selectedAccountForVDCard");
			this.view.flxCardBody.height ="590dp";
			var cardsObj = {
				"cardType": "virtualPrepaidCard",
				"debitAccount": selectedAcc.lblRecordField4,
				"serviceProvider": this.selectedVDCardType,
				"nameOnTheCard": "",
				"cardCategory": this.selectedCardSubType,
				"panNo": this.view.tbxPANNo.text,
				"topupAmount": this.view.tbxAmount.text,
			};
			this.showSetPinScreen(cardsObj, selectedAcc);
		},
		onFromAccountSelection: function() {
			var scope = this;
			try {
				var selectedRecord = this.view["segFromAccounts"].selectedRowItems[0];
				var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("selectedAccountForVDCard", selectedRecord);
				scope.view["flxClearFromText"].setVisibility(false);
				scope.view["tbxFromAccount"].setVisibility(false);
				scope.view["lblFromRecordField1"].setVisibility(true);
				scope.view["lblFromRecordField2"].setVisibility(true);
				scope.view["tbxFromAccount"].text = selectedRecord.lblRecordField1 || "";
				scope.view["lblFromRecordField1"].text = selectedRecord.lblRecordField1 || "";
				scope.view["lblFromRecordField2"].text = selectedRecord.lblRecordField2 || "";
				//scope.view["lblFromRecordField4"].text=selectedRecord.lblRecordField4 || "";
				scope.view.flxFromAccountSegment.setVisibility(false);
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "onFromAccountSelection",
					"error": err
				};
				//scope.onError(errorObj);
			}
		},
		onFromAccountSelection2: function() {
			var scope = this;
			try {
				var selectedRecord = this.view["segFromAccounts2"].selectedRowItems[0];
				var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("selectedAccountAccId", selectedRecord.lblRecordField4);
				navManager.setCustomInfo("selectedAccAvailableBalance", selectedRecord.lblRecordField2);
				navManager.setCustomInfo("accountName", selectedRecord.lblRecordField1);
				var collectionObj = scope_configManager.userAccounts;
				for(var i=0;i<collectionObj.length;i++){
                    if(selectedRecord.lblRecordField4 == collectionObj[i].Account_id){
                        navManager.setCustomInfo("accountname_name",(this.collectionObj[i].nickName || this.collectionObj[i].accountName));
                        break;
                    }
				}
				scope.view["flxClearFromText2"].setVisibility(false);
				scope.view["tbxFromAccount2"].setVisibility(false);
				scope.view["lblFromRecordField3"].setVisibility(true);
				scope.view["lblFromRecordField4"].setVisibility(true);
				scope.view["tbxFromAccount2"].text = selectedRecord.lblRecordField1 || "";
				scope.view["lblFromRecordField3"].text = selectedRecord.lblRecordField1 || "";
				scope.view["lblFromRecordField4"].text = selectedRecord.lblRecordField2 || "";
				scope.view.flxFromAccountSegment2.setVisibility(false);
				scope.enableTopUpLandingScreenContinueBtn();
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "onFromAccountSelection2",
					"error": err
				};
				//scope.onError(errorObj);
			}
		},
		setFromAccountsList2: function(collectionObj, segWidgetId) {
			this.collectionObj = collectionObj;
			var scope = this;
			try {
				scope.setAccountsSegmentTemplateAndWidgetMap(scope.view[segWidgetId]);
				var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
				var segmentData = [];
				for (var i = 0; i < this.collectionObj.length; i++) {
					if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && this.collectionObj[i].currencyCode == "NPR") {
						var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].accountID);
						var navManager = applicationManager.getNavigationManager();
						navManager.setCustomInfo("accountname_id", account_name);
						let amount = this.collectionObj[i].availableBalance;
						let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
						var Available_balance = /*scope.getCurrencySymbol*/ (this.collectionObj[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
						var navManager = applicationManager.getNavigationManager();
						navManager.setCustomInfo("Account_balance", Available_balance);
						var match = allAccounts.find(acc => acc.accountID === this.collectionObj[i].accountID);
						var accountTypeText = (match && match.description) ? match.description : this.collectionObj[i].accountType;
						var segData = {
							lblRecordField1: account_name,
							lblRecordField2: Available_balance,//"Available Balance " + this.collectionObj[i].availableBalance,
							lblRecordField3: accountTypeText,
							lblRecordField4: this.collectionObj[i].accountID,
							accountTypeKey: this.collectionObj[i].accountType
						}
						segmentData.push(segData);
					}
				}
				this.view[segWidgetId].setData(segmentData);
				//var segData = scope.performSegmentDataMapping("segFromAccounts");
				var segData = segmentData;
				for (var i = 0; i < segData.length; i++) {
					segData[i]["flxRecordFieldTypeIcon2"] = {
						"isVisible": false
					};
					segData[i]["flxAccountsDropdownList"] = {
						"height": "53dp"
					};
					segData[i]["flxAccountsDropdownListMobile"] = {
						"height": "60dp"
					};
				}
				//scope.FromRecords = segData;
				if (scope.groupIdentifier != undefined) {
					scope.groupedFromRecords = scope.prepareAccountsSegmentData2(segmentData, "From");
				} else {
					scope.groupedFromRecords = segData;
				}
				scope.view[segWidgetId].setData(scope.groupedFromRecords);
				// scope.showLoadingIndicator(false, "From");
				//scope.setAccountsDropdownHeight("From");
				//scope.setFromAccount();
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "setFromAccountsList",
					"error": err
				};
				//scope.onError(errorObj);
			}
		},
		setFromAccountsList: function(collectionObj, segWidgetId) {
			this.collectionObj = collectionObj;
			var scope = this;
			try {
				scope.setAccountsSegmentTemplateAndWidgetMap(scope.view[segWidgetId]);
				var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
				var segmentData = [];
				for (var i = 0; i < this.collectionObj.length; i++) {
					if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && this.collectionObj[i].currencyCode == "NPR" && this.collectionObj[i].supportTransferFrom == "1") {
						var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].accountID);
						var navManager = applicationManager.getNavigationManager();
						navManager.setCustomInfo("accountname_id", account_name);
						let amount = this.collectionObj[i].availableBalance;
						let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
						// var Available_balance = /*scope.getCurrencySymbol*/ (this.collectionObj[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
						var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(this.collectionObj[i].availableBalance, this.collectionObj[i].currencyCode);
                        var navManager = applicationManager.getNavigationManager();
						navManager.setCustomInfo("Account_balance", Available_balance);
						var match = allAccounts.find(acc => acc.accountID === this.collectionObj[i].accountID);
						var accountTypeText = (match && match.description) ? match.description : this.collectionObj[i].accountType;
						var segData = {
							lblRecordField1: account_name,
							lblRecordField2: "Available Balance " + Available_balance,
							lblRecordField3: accountTypeText,
							lblRecordField4: this.collectionObj[i].accountID,
							accountTypeKey: this.collectionObj[i].accountType
						}
						segmentData.push(segData);
					}
				}
				this.view[segWidgetId].setData(segmentData);
				//var segData = scope.performSegmentDataMapping("segFromAccounts");
				var segData = segmentData;
				for (var i = 0; i < segData.length; i++) {
					segData[i]["flxRecordFieldTypeIcon2"] = {
						"isVisible": false
					};
					segData[i]["flxAccountsDropdownList"] = {
						"height": "53dp"
					};
					segData[i]["flxAccountsDropdownListMobile"] = {
						"height": "60dp"
					};
				}
				//scope.FromRecords = segData;
				if (scope.groupIdentifier != undefined) {
					scope.groupedFromRecords = scope.prepareAccountsSegmentData(segmentData, "From");
				} else {
					scope.groupedFromRecords = segData;
				}
				scope.view[segWidgetId].setData(scope.groupedFromRecords);
				// scope.showLoadingIndicator(false, "From");
				//scope.setAccountsDropdownHeight("From");
				//scope.setFromAccount();
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "setFromAccountsList",
					"error": err
				};
				//scope.onError(errorObj);
			}
		},
		groupAccountsData: function(data) {
			var scope = this;
			try {
				var internalContract = this.groupIdentifier["internal"];
				if (!internalContract != undefined) {
					var interalKey = internalContract.identifier;
				}
				if (data !== undefined) {
					return data.reduce(function(value, obj) {
						if (!(interalKey === null || interalKey === undefined || interalKey === "")) {
							(value[obj[interalKey]] = value[obj[interalKey]] || []).push(obj);
							return value;
						} else {
							(value[obj["GroupField"]] = value[obj["GroupField"]] || []).push(obj);
							return value;
						}
					}, {});
				} else return {};
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "groupAccountsData",
					"error": err
				};
				scope.onError(errorObj);
			}
		},
		prepareAccountsSegmentData2: function(recordsList, fieldType) {
			var scope = this;
			try {
				var data = [];
				var groupedRecordsList = this.groupAccountsData(recordsList);
				var types = Object.keys(groupedRecordsList);
				if (types.length != 0) {
					for (var i = 0; i < types.length; i++) {
						var displayText;
						if (types[i] != "undefined") {
							displayText = this.groupIdentifier["segregation"][types[i]];
						} else {
							displayText = this.groupIdentifier["segregation"]["default"];
						}
						if (displayText != undefined) {
							displayText = types[i];
						}
						data[i] = [{
								"lblRecordType": {
									"text": displayText + " (" + groupedRecordsList[types[i]].length + ")"
								},
								"lblDropdownIcon": {
									"text": "P",
									"accessibilityConfig": {
										"a11yHidden": true
									}
								},
								"flxDropdownIcon": {
									"onClick": scope.showOrHideAccountSection2.bind(scope, fieldType)
								}
							},
							groupedRecordsList[types[i]]
						]
					}
				}
				return data;
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "prepareAccountsSegmentData",
					"error": err
				};
				scope.onError(errorObj);
			}
		},
		prepareAccountsSegmentData: function(recordsList, fieldType) {
			var scope = this;
			try {
				var data = [];
				var groupedRecordsList = this.groupAccountsData(recordsList);
				var types = Object.keys(groupedRecordsList);
				if (types.length != 0) {
					for (var i = 0; i < types.length; i++) {
						var displayText;
						if (types[i] != "undefined") {
							displayText = this.groupIdentifier["segregation"][types[i]];
						} else {
							displayText = this.groupIdentifier["segregation"]["default"];
						}
						if (displayText != undefined) {
							displayText = types[i];
						}
						data[i] = [{
								"lblRecordType": {
									"text": displayText + " (" + groupedRecordsList[types[i]].length + ")"
								},
								"lblDropdownIcon": {
									"text": "P",
									"accessibilityConfig": {
										"a11yHidden": true
									}
								},
								"flxDropdownIcon": {
									"onClick": scope.showOrHideAccountSection.bind(scope, fieldType)
								}
							},
							groupedRecordsList[types[i]]
						]
					}
				}
				return data;
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "prepareAccountsSegmentData",
					"error": err
				};
				scope.onError(errorObj);
			}
		},
		formatNumberWithCommas: function(amount) {
			let parts = amount.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			if (parts[1] == null || parts[1] == undefined) {
				parts[1] = "00";
			}
			return parts.join(".");
		},
		setDefaultAccount2: function(userAccounts) {
			var scope = this;
			var configManager = applicationManager.getConfigurationManager();
			this.view.flxFromAccountList2.setVisibility(true);
			var navManager = applicationManager.getNavigationManager();
			var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
			for (i = 0; i < userAccounts['length']; i++) {
				if (defaultPrimaryAccount == userAccounts[i].accountID) {
					var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].accountID);
					var navManager = applicationManager.getNavigationManager();
					navManager.setCustomInfo("accountname_id", account_name);
					navManager.setCustomInfo("accountname_name",(this.collectionObj[i].nickName || this.collectionObj[i].accountName));
					let amount = userAccounts[i].availableBalance;
					let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
					var Available_balance = userAccounts[i].currencyCode + " " + formattedAmount;//userAccounts[i].availableBalance
					var navManager = applicationManager.getNavigationManager();
					navManager.setCustomInfo("Account_balance", Available_balance);
					scope.view["lblFromRecordField3"].setVisibility(true);
					scope.view["lblFromRecordField4"].setVisibility(true);
					//scope.view["tbxFromAccount"].text = selectedRecord.lblRecordField1 || "";
					scope.view["lblFromRecordField3"].text = account_name || "";
					scope.view["lblFromRecordField4"].text = Available_balance || "";
					navManager.setCustomInfo("AccountIdconsent", userAccounts[i].accountID);
					navManager.setCustomInfo("selectedAccAvailableBalance", Available_balance);
					navManager.setCustomInfo("selectedAccountAccId", userAccounts[i].accountID);
					navManager.setCustomInfo("accountName", account_name);
					break;
				}

			}
			// var configManager = applicationManager.getConfigurationManager();
			// var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
			//  var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
			//  "appName": "TransfersMA",
			//  "moduleName": "ManageActivitiesUIModule"
			//  });
			// ManageActivitiesPresenter.getAccListDetails(userName);
		},
		setDefaultAccount: function(userAccounts) {
			var scope = this;
			var configManager = applicationManager.getConfigurationManager();
			this.view.flxFromAccountList.setVisibility(true);
			var navManager = applicationManager.getNavigationManager();
			var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
			for (i = 0; i < userAccounts['length']; i++) {
				if (defaultPrimaryAccount == userAccounts[i].accountID) {
					if (userAccounts[i].accountType === "Savings" || userAccounts[i].accountType === "Checking") {
						var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].accountID);
					}
					var navManager = applicationManager.getNavigationManager();
					navManager.setCustomInfo("accountname_id", account_name);
					//let amount = userAccounts[i].availableBalance;
					//let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
					// var Available_balance = userAccounts[i].availableBalance ///*scope.getCurrencySymbol*/ (userAccounts[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
					var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(userAccounts[i].availableBalance, userAccounts[i].currencyCode);
                    var navManager = applicationManager.getNavigationManager();
					navManager.setCustomInfo("Account_balance", Available_balance);
					scope.view["lblFromRecordField1"].setVisibility(true);
					scope.view["lblFromRecordField2"].setVisibility(true);
					//scope.view["tbxFromAccount"].text = selectedRecord.lblRecordField1 || "";
					scope.view["lblFromRecordField1"].text = account_name || "";
					scope.view["lblFromRecordField2"].text = Available_balance || "";
					navManager.setCustomInfo("AccountIdconsent", userAccounts[i].accountID);
					var selectedAccount = {
						"lblRecordField1": account_name,
						"lblRecordField2": Available_balance,
						"lblRecordField4": userAccounts[i].accountID
					}
					navManager.setCustomInfo("selectedAccountForVDCard", selectedAccount);
					break;
				}
			}
			// var configManager = applicationManager.getConfigurationManager();
			// var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
			//  var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
			//  "appName": "TransfersMA",
			//  "moduleName": "ManageActivitiesUIModule"
			//  });
			// ManageActivitiesPresenter.getAccListDetails(userName);
		},
		showOrHideAccountSection2: function(fieldType) {
			var scope = this;
			var sectionIndex = scope.view["segFromAccounts2"].selectedRowIndex[0];
			var segData = scope.view["segFromAccounts2"].data;
			var isRowVisible = true;
			if (segData[sectionIndex][0].lblDropdownIcon["text"] === "P") {
				segData[sectionIndex][0].flxDropdownIcon2.accessibilityConfig = {
					a11yLabel: segData[sectionIndex][0].lblRecordType.text,
					a11yARIA: {
						"aria-expanded": false,
						"role": "button",
						tabindex: 0
					},
				}
				segData[sectionIndex][0].lblDropdownIcon["text"] = "O";
				isRowVisible = false;
			} else {
				segData[sectionIndex][0].flxDropdownIcon.accessibilityConfig = {
					a11yLabel: segData[sectionIndex][0].lblRecordType2.text,
					a11yARIA: {
						"aria-expanded": true,
						"role": "button",
						tabindex: 0
					},
				}
				segData[sectionIndex][0].lblDropdownIcon["text"] = "P";
				isRowVisible = true;
			}
			var rowFlex = kony.application.getCurrentBreakpoint() === 640 ? "flxAccountsDropdownListMobile2" : "flxAccountsDropdownList2";
			scope.view["segFromAccounts2"].setSectionAt(segData[sectionIndex], sectionIndex);
			for (var i = 0; i < segData[sectionIndex][1].length; i++) {
				var rowDataTobeUpdated = segData[sectionIndex][1][i];
				rowDataTobeUpdated[rowFlex] = {
					"height": isRowVisible ? "60dp" : "0dp",
					"isVisible": isRowVisible ? true : false
				};
				scope.view["segFromAccounts2"].setDataAt(rowDataTobeUpdated, i, sectionIndex);
			}
			scope.view.segFromAccounts2.setActive(-1, sectionIndex, "flxAccountsDropdownHeader2.flxRecordType2.flxDropdownIcon2");

		},
		showOrHideAccountSection: function(fieldType) {
			var scope = this;
			var sectionIndex = scope.view["seg" + fieldType + "Accounts"].selectedRowIndex[0];
			var segData = scope.view["seg" + fieldType + "Accounts"].data;
			var isRowVisible = true;
			if (segData[sectionIndex][0].lblDropdownIcon["text"] === "P") {
				segData[sectionIndex][0].flxDropdownIcon.accessibilityConfig = {
					a11yLabel: segData[sectionIndex][0].lblRecordType.text,
					a11yARIA: {
						"aria-expanded": false,
						"role": "button",
						tabindex: 0
					},
				}
				segData[sectionIndex][0].lblDropdownIcon["text"] = "O";
				isRowVisible = false;
			} else {
				segData[sectionIndex][0].flxDropdownIcon.accessibilityConfig = {
					a11yLabel: segData[sectionIndex][0].lblRecordType.text,
					a11yARIA: {
						"aria-expanded": true,
						"role": "button",
						tabindex: 0
					},
				}
				segData[sectionIndex][0].lblDropdownIcon["text"] = "P";
				isRowVisible = true;
			}
			var rowFlex = kony.application.getCurrentBreakpoint() === 640 ? "flxAccountsDropdownListMobile" : "flxAccountsDropdownList";
			scope.view["seg" + fieldType + "Accounts"].setSectionAt(segData[sectionIndex], sectionIndex);
			for (var i = 0; i < segData[sectionIndex][1].length; i++) {
				var rowDataTobeUpdated = segData[sectionIndex][1][i];
				rowDataTobeUpdated[rowFlex] = {
					"height": isRowVisible ? "60dp" : "0dp",
					"isVisible": isRowVisible ? true : false
				};
				scope.view["seg" + fieldType + "Accounts"].setDataAt(rowDataTobeUpdated, i, sectionIndex);
			}
			//scope.setAccountsDropdownHeight(fieldType);
			if (fieldType == "From") {
				scope.view.segFromAccounts.setActive(-1, sectionIndex, "flxAccountsDropdownHeader.flxRecordType.flxDropdownIcon");
			}
		},
		setAccountsSegmentTemplateAndWidgetMap: function(segWidget) {
			var scope = this;
			try {
				if (kony.application.getCurrentBreakpoint() === 640) {
					segWidget.sectionHeaderTemplate = "flxAccountsDropdownHeaderMobile";
					segWidget.rowTemplate = "flxAccountsDropdownListMobile";
				} else {
					segWidget.sectionHeaderTemplate = "flxAccountsDropdownHeader";
					segWidget.rowTemplate = "flxAccountsDropdownList";
				}
				segWidget.widgetDataMap = {
					"lblRecordType": "lblRecordType",
					"lblDropdownIcon": "lblDropdownIcon",
					"flxRecordFieldType": "flxRecordFieldType",
					"lblRecordField1": "lblRecordField1",
					"lblRecordField2": "lblRecordField2",
					"flxRecordFieldTypeIcon1": "flxRecordFieldTypeIcon1",
					"flxRecordFieldTypeIcon2": "flxRecordFieldTypeIcon2",
					"lblRecordFieldTypeIcon1": "lblRecordFieldTypeIcon1",
					"imgRecordFieldTypeIcon2": "imgRecordFieldTypeIcon2",
					"lblRecordField3": "lblRecordField3",
					"flxAccountsDropdownList": "flxAccountsDropdownList",
					"flxAccountsDropdownListMobile": "flxAccountsDropdownListMobile",
					"flxDropdownIcon": "flxDropdownIcon"
				};
			} catch (err) {
				var errorObj = {
					"level": "ComponentController",
					"method": "setAccountsSegmentTemplateAndWidgetMap",
					"error": err
				};
				scope.onError(errorObj);
			}
		},
		showCardProductDetails: function(cardProductDetails, selectedAccountData) {
			var scope = this;
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			//  this.view.flxTravelPlan.setVisibility(false);
			this.view.flxMyCards.setVisibility(false);
			this.view.flxRightBar.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.flxSelectPrepaidCardType.setVisibility(false);
			this.view.flxVirtualDollarCardAccount.setVisibility(false);
			this.view.flxVirtualDollarCardBody.setVisibility(false);
			this.view.flxNewcard.setVisibility(true);			
			this.view.flxCardBody.setVisibility(false);
			this.view.flxAccountsSegments.setVisibility(false);
			this.view.flxCardProductsSegments.setVisibility(true);
			this.view.flxCardProductsSegments.top = "70dp";
			this.view.flxSelectCardHeader.skin = "slfBoxffffffB1R5";
            this.view.lblSelectCardHeader.skin = "sknlbl424242SSP15pxSemibold";
			this.view.lblSelectCardHeader.top = "13dp";
            this.view.flxSelectCardHeader.width = "100%";
			this.view.flxSelectCardHeader.centerX = "50%";
			this.view.segCardProducts.top = "-35dp";
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			var dataMap = {
				"flxCardProducts": "flxCardProducts",
				"flxCardProductsMobile": "flxCardProductsMobile",
				"flxMyCards": "flxMyCards",
				"flxProductDetails": "flxProductDetails",
				"flxCardImage": "flxCardImage",
				"imgCard": "imgCard",
				"flxCardDetails": "flxCardDetails",
				"lblCardHeader": "lblCardHeader",
				"lblCardValue1": "lblCardValue1",
				"lblCardValue2": "lblCardValue2",
				"rtxValue": "rtxValue",
				"flxRepresentative": "flxRepresentative",
				"lblRepresentativeheader": "lblRepresentativeheader",
				"flxRepresentativeKeyValue": "flxRepresentativeKeyValue",
				"lblKey1": "lblKey1",
				"lblValue1": "lblValue1",
				"flxPurchaseKeyvalue": "flxPurchaseKeyvalue",
				"lblKey2": "lblKey2",
				"lblValue2": "lblValue2",
				"flxCreditLimitKeyvalue": "flxCreditLimitKeyvalue",
				"lblKey3": "lblKey3",
				"lblValue3": "lblValue3",
				"lblSeparator2": "lblSeparator2",
				"btnSelect": "btnSelect",
				"segMyCardProductDetails": "segMyCardProductDetails"
			};
			var cardsProductDetailsSegmentData = [];
			var productDetails = {};

			cardProductDetails = cardProductDetails.filter(function(card) {
				if (card.cardType == "Debit Card" && scope.requestCardFlow == "debitcard") {
					scope.view.lblSelectCardHeader.left = "15px";
                    scope.view.lblSelectCardHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectDebitCard")+":";
                    scope.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
                    scope.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
                    return card;
                } else if (card.cardCategory.toLowerCase().includes(scope.selectedCardSubType.toLowerCase()) && card.cardType == "Physical Prepaid Card" && scope.requestCardFlow == "physicalPrepaidCard" && card.cardCategory.split(" ")[0] !== "Virtual") {
                   	scope.view.lblSelectCardHeader.left = "15px";
                    scope.view.lblSelectCardHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectPrepaidCard1");
                    scope.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                    scope.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                    return card;
                }
				else if (card.cardCategory.toLowerCase().includes(scope.selectedCardSubType.toLowerCase()) && card.cardType == "Virtual Prepaid Card" && scope.requestCardFlow == "virtualPrepaidCard" && card.cardCategory.split(" ")[0] !== "Physical") {
                   	scope.view.lblSelectCardHeader.left = "15px";
                    scope.view.lblSelectCardHeader.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.SelectPrepaidCard1");
                    scope.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                    scope.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                    return card;
                }
            });
			for (var i = 0; i < cardProductDetails.length; i++) {
				var dataItem = cardProductDetails[i];
				dataItem.limits = this.formatLimits(JSON.parse(dataItem.cardLimits).limits);
				//dataItem.productName = this.setProductName(dataItem.cardCategory, dataItem.cardType);
				productDetails = {
					"flxMyCards": {
						"isVisible": true
						
					},
					"flxProductDetails": {
						"isVisible": true
					},
					"flxCardImage": {
						"isVisible": true
					},
					"imgCard": {
						"src": dataItem.cardImage,
					},
					// "lblCardNumber":{
					//     "text":dataItem.cardImage
					// },
					// "lblValidThru":{
					//     "text":dataItem.cardImage
					// },
					// "lblCardHolderName":{
					//     "text":dataItem.chName
					// },
					"flxCardDetails": {
						"isVisible": true
					},
					"lblCardHeader": {
						"text": dataItem.productName,
						"accessibilityconfig": {
							"a11yLabel": dataItem.productName,
						}
					},
					"lblCardValue1": {
						"text": dataItem.cardDescription,
						"accessibilityconfig": {
							"a11yLabel": dataItem.cardDescription,
						}
					},
					"lblCardValue2": {
						"text": dataItem.shortDescription,
						"accessibilityconfig": {
							"a11yLabel": dataItem.shortDescription,
						}
					},
					/*"rtxValue": {
					    "text": dataItem.featureOverview,
					    "accessibilityconfig": {
					        "a11yLabel": dataItem.featureOverview,
					    }
					},*/
					"flxRepresentative": {
						"isVisible": true,
						"left": (kony.application.getCurrentBreakpoint() === 1024) ? "0dp" : "25dp"
					},
					"lblRepresentativeheader": {
						"text": kony.i18n.getLocalizedString("i18n.CardManagement.RepresentativeExample"),
						"accessibilityconfig": {
							"a11yLabel": kony.i18n.getLocalizedString("i18n.CardManagement.RepresentativeExample"),
						}
					},
					"flxRepresentativeKeyValue": {
						"isVisible": true
					},
					"lblKey1": {
						"isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
						"text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "": dataItem.limits[0].split(":")[0],
						"accessibilityconfig": {
							"a11yLabel": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "": "NPR" + dataItem.limits[0].split(":")[0],
						}
					},
					"lblValue1": {
						"isVisible": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? false : true,
						"text": this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : dataItem.limits[0].split(":")[1],
						"accessibilityconfig": {
						"a11yLabel":  this.isEmptyNullOrUndefined(dataItem.limits[0]) ? "" : "NPR" + dataItem.limits[0].split(":")[1],
						}
					},
					"flxPurchaseKeyvalue": {
						"isVisible": true
					},
					"lblKey2": {
						"isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
						"text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "": dataItem.limits[1].split(":")[0],
						"accessibilityconfig": {
							"a11yLabel": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "": "NPR" + dataItem.limits[1].split(":")[0],
						}
					},
					"lblValue2": {
						"isVisible": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? false : true,
						"text": this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : dataItem.limits[1].split(":")[1],
						"accessibilityconfig": {
						"a11yLabel":  this.isEmptyNullOrUndefined(dataItem.limits[1]) ? "" : "NPR" + dataItem.limits[1].split(":")[1],
						}
					},
					"flxCreditLimitKeyvalue": {
						"isVisible": true
					},
					"lblKey3": {
						"isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
						"text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "": dataItem.limits[2].split(":")[0],
						"accessibilityconfig": {
							"a11yLabel": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "": "NPR" + dataItem.limits[2].split(":")[0],
						}
					},
					"lblValue3": {
						"isVisible": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? false : true,
						"text": this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : dataItem.limits[2].split(":")[1],
						"accessibilityconfig": {
						"a11yLabel":  this.isEmptyNullOrUndefined(dataItem.limits[2]) ? "" : "NPR" + dataItem.limits[2].split(":")[1],
						}
					},
					"lblSeparator2": ".",
					"template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxCardProductsMobile" : "flxCardProducts",
					"btnSelect": {
						"text": kony.i18n.getLocalizedString("i18n.NUO.Select"),
						"onClick": scope.flowTypeCheck.bind(scope, dataItem, selectedAccountData),
						"accessibilityConfig": {
							"a11yLabel": `Select card - ${dataItem.productName}`,
						}
					},
				};
				cardsProductDetailsSegmentData.push(productDetails);
			}
			this.view.segCardProducts.widgetDataMap = dataMap;
			this.view.segCardProducts.setData(cardsProductDetailsSegmentData);
			this.view.btnCancelCard.onClick =function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			};
			this.view.btnModifyCard.onClick =function() {
				scope.view.flxCardProductsSegments.isVisible = false;
				if(scope.requestCardFlow == "debitcard"){
					scope.view.flxAccountsSegments.isVisible = true;
				}
				else{
					scope.view.flxSelectPrepaidCardType.isVisible = true;
				}
			};
			this.view.btnCancelCard.accessibilityConfig = {
				"a11yLabel": "Cancel new card request process",
				"a11yARIA": {
					"tabindex": 0,
					"role": "button"
				}
			};
			this.view.forceLayout();
			this.AdjustScreen();
		},
		ifCardExistedOrRequested : function(dataItem, selectedAccountData){
			if (this.requestCardFlow == "virtualPrepaidCard") {
				applicationManager.getPresentationUtility().showLoadingScreen();
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
			}
			else{
				var navManager = applicationManager.getNavigationManager();
				var params = {
					"cardType":this.requestCardFlow,
					"debitAccount": selectedAccountData.accountID,
					"serviceProvider":this.requestCardFlow == "debitcard" ? dataItem.cardCategory :navManager.getCustomInfo("cardSubType") 
				}
				var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
                manageCardsModule.presentationController.checkIfCardRequestExists(params);
			}
		},
		flowTypeCheck : function(dataItem, selectedAccountData){
			if (this.requestCardFlow == "virtualPrepaidCard") {
				applicationManager.getPresentationUtility().showLoadingScreen();
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToNewCardFlow();
			}
			else{
				this.showSetPinScreen(dataItem, selectedAccountData);
			}
			this.view.flxReviewCardDetails.setVisibility(false);
            this.view.flxDisclimerWarning.setVisibility(false);
		},
		formatLimits : function(limits){
			var limitsData = [];
			for (var key in limits){
				if(limits.hasOwnProperty(key)){
					var keynVal = key + ":" +(limits[key]);
					limitsData.push(keynVal);
				}
			}
			return limitsData;
		},
		navigatetoCardsProductDetails: function() {
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			if (this.requestCardFlow == "debitcard") {
                this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
            }
			else {
                this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
			}
			this.view.flxCardBody.setVisibility(false);
			this.view.flxAccountsSegments.setVisibility(false);
			this.view.flxVirtualDollarCardAccount.setVisibility(false);
			this.view.flxVirtualDollarCardBody.setVisibility(false);
			this.view.flxCardProductsSegments.setVisibility(true);
			this.view.flxSelectPrepaidCardType.setVisibility(false);
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			this.AdjustScreen();
		},
		validationFields: function() {
			var i = this.view.tbxEnterCardPIN.text;
			var j = this.view.tbxConfirmCardPIN.text
			var isValidtbxEnterCardPin = this.isValidPin(i);
			var isValidtbxConfirmCardPIN = this.isValidPin(j);
			if (!isValidtbxEnterCardPin || !isValidtbxConfirmCardPIN) {
				if (i.length == 4 || j.length == 4) {
					this.view.lblWarning.setVisibility(!0);
					this.view.lblWarning.text = kony.i18n.getLocalizedString("konyolb.cards.debitpinerr");
				} else
					this.view.lblWarning.setVisibility(0);
			}
			// if (this.view.tbxNameOnCard.text && isValidtbxEnterCardPin && isValidtbxConfirmCardPIN) {
			if (this.view.tbxNameOnCard.text) {
				this.view.lblWarning.setVisibility(0);
				FormControllerUtility.enableButton(this.view.btnNewCardContinue);
			} else {
				FormControllerUtility.disableButton(this.view.btnNewCardContinue);
			}
		},
		showSetPinScreen: function(selectedCardProductDetails, selectedAccountData) {

			var self = this;
			this.view.flxCardHeader.setVisibility(true);
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("newCardConfirmData1", selectedCardProductDetails);
			navManager.setCustomInfo("newCardConfirmData2", selectedAccountData);
			this.view.flxWarning1.setVisibility(false);
			this.view.tbxNameOnCard.setEnabled(false);
			this.view.tbxNameOnCard.onTextChange  = function(){
				let nickName = self.view.tbxNameOnCard.text;
			    self.view.tbxNameOnCard.text = nickName.length > 25 ? nickName.substring(0, 25).toUpperCase() : nickName.toUpperCase();
				var navManager = applicationManager.getNavigationManager();
			    navManager.setCustomInfo("nameOnCard", self.view.tbxNameOnCard.text);
				self.acknowledgementObj.nameOnCard = self.view.tbxNameOnCard.text;
				self.validationFields();
			};
			this.view.lblBranchNames.text ="Please Select";
			this.view.tbxBranchName.setVisibility(false);
            this.view.lblBranchNames.setVisibility(true);
			this.view.flxBranchtextBox.onClick = function() {
                 if (self.view.lblBranchDropDown.text == "P") {
                    self.view.lblBranchDropDown.text = "O";
                    self.view.flxBranchDropdown.setVisibility(false);
                    self.view.tbxBranchName.setVisibility(false);
                    self.view.lblBranchNames.setVisibility(true);
                   // self.view.flxBranchSegment.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
                } else {
                    self.view.lblBranchDropDown.text = "P";
                    self.view.flxBranchDropdown.setVisibility(true);
                    self.view.tbxBranchName.setVisibility(true);
                    self.view.tbxBranchName.text="";
                    self.view.segBranchDropDown.setData(self.branchList);
                    self.view.lblBranchNames.setVisibility(false);
                    self.view.flxFromAccountTextBoxAndIcon.skin = "sknFlxffffffBorderRoundedLeftRed";
                }
            };
            self.view.segBranchDropDown.onRowClick = self.onBranchSelection.bind(this);
           this.view.tbxBranchName.onTextChange = function() {
                var searchText = self.view.tbxBranchName.text;
                if(searchText != ""){
                    var result = [];
					var data = self.branchList;
					for (var i = 0; i < data.length; i++) {
						if ((data[i].lblUsers && data[i].lblUsers.toLowerCase().indexOf(searchText) != -1) ) {
							result.push(data[i]);
						}
					}
					if (!(result.length > 0)) {
						self.view.segBranchDropDown.setData(result);
					} else {
						self.view.segBranchDropDown.removeAll();
						self.view.segBranchDropDown.setData(result);
						self.view.flxBranchDropdown.setVisibility(true);
					}
                }else{
                    self.view.segBranchDropDown.removeAll();
					self.view.segBranchDropDown.setData(self.branchList);
					self.view.flxBranchDropdown.setVisibility(true);
                }
					
				}
			if (this.requestCardFlow == "debitcard") {
				this.view.flxBranchName.isVisible = true;
				this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");    
				let nickName = selectedAccountData.nickName;
				var navManager = applicationManager.getNavigationManager();
			    var nameOnCard25char = nickName.length > 25 ? nickName.substring(0, 25).toUpperCase() + "..." : nickName.toUpperCase();
                navManager.setCustomInfo("nameOnCard", nameOnCard25char);
				this.view.flxNameOnCard.setVisibility(true);
				var account = this.view.segAccounts.selectedRowItems[0];
				var accountValue = account.lblAccountName.text;
				this.view.tbxNameOnCard.text = nickName.length > 25 ? nickName.substring(0, 25).toUpperCase() + "..." : nickName.toUpperCase();
				this.view.lblAccount.text = kony.i18n.getLocalizedString("i18n.accounts.FromAccount");
				this.view.lblAccountvalue.text = accountValue;
				this.view.lblCard.text = kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");
				this.view.lblCardValue.text = selectedCardProductDetails.productName;
				this.view.flxDailyPurchaseLimt.isVisible = false;
				this.view.flxDailyWithdrawlLimit.isVisible = false;
				this.view.flxAnnualCharges.isVisible = false;
				if(!this.isEmptyNullOrUndefined(selectedCardProductDetails.limits[0])){
					this.view.flxDailyPurchaseLimt.isVisible = true;
					this.view.lblDailyPurchaseLimt.text = selectedCardProductDetails.limits[0].split(":")[0] + ":";
					this.view.lblDailyPurchaseLimitValue.text = selectedCardProductDetails.limits[0].split(":")[1];
				}
				if(!this.isEmptyNullOrUndefined(selectedCardProductDetails.limits[1])){
					this.view.flxDailyWithdrawlLimit.isVisible = true;
					this.view.lblDailyWithdrawLimit.text = selectedCardProductDetails.limits[1].split(":")[0] + ":";
					this.view.lblDailyWithdrawLimitValue.text = selectedCardProductDetails.limits[1].split(":")[1];;
				}
				if(!this.isEmptyNullOrUndefined(selectedCardProductDetails.limits[2])){
					this.view.flxAnnualCharges.isVisible = true;
					this.view.lblAnnualCharges.text = selectedCardProductDetails.limits[2].split(":")[0] + ":";
					this.view.lblAnnualChargesValue.text = selectedCardProductDetails.limits[2].split(":")[1];;
				}
				this.view.flxConfirm6.setVisibility(false);
				this.validationFields();
				this.view.btnNewCardModify.onClick = self.navigatetoCardsProductDetails.bind(self);
				this.view.btnNewCardModify.accessibilityConfig = {
					"a11yLabel": "Back to card selection",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				};
				this.acknowledgementObj = {
					"fromAccount": accountValue,
					"cardType": selectedCardProductDetails.productName,
					"nameOnCard": navManager.getCustomInfo("nameOnCard"),
					"limits": selectedCardProductDetails.limits
				};
				for (i in selectedCardProductDetails.limits){
					self.acknowledgementObj[selectedCardProductDetails.limits[i].split(":")[0]] = selectedCardProductDetails.limits[i].split(":")[1];
				}
				
			} else if (this.requestCardFlow == "physicalPrepaidCard") {
				this.view.flxBranchName.isVisible = true;
				this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
				var customerName = scope_configManager.UserAttributes.FirstName+" "+scope_configManager.UserAttributes.LastName;
				var navManager = applicationManager.getNavigationManager();
                var nameOnCard25char = customerName.length > 25 ? customerName.substring(0, 25).toUpperCase() + "..." : customerName.toUpperCase();
                navManager.setCustomInfo("nameOnCard", nameOnCard25char);
				this.view.flxNameOnCard.setVisibility(true);
				var card = selectedCardProductDetails.productName;
				this.view.tbxNameOnCard.text = customerName.length > 25 ? customerName.substring(0, 25).toUpperCase() + "..." : customerName.toUpperCase();
				this.view.lblAccount.text = kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");
				this.view.lblAccountvalue.text = self.selectedCardSubType;
				this.view.lblCard.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardName");
				this.view.lblCardValue.text = selectedCardProductDetails.productName;
				this.view.flxDailyPurchaseLimt.isVisible = false;
				this.view.flxDailyWithdrawlLimit.isVisible = false;
				this.view.flxAnnualCharges.isVisible = false;
				if(!this.isEmptyNullOrUndefined(selectedCardProductDetails.limits[0])){
					this.view.lblDailyPurchaseLimt.text = selectedCardProductDetails.limits[0].split(":")[0] + ":";
					this.view.lblDailyPurchaseLimitValue.text = selectedCardProductDetails.limits[0].split(":")[1];
					this.view.flxDailyPurchaseLimt.isVisible = true;
				}
				if(!this.isEmptyNullOrUndefined(selectedCardProductDetails.limits[1])){
					this.view.lblDailyWithdrawLimit.text = selectedCardProductDetails.limits[1].split(":")[0] + ":";
					this.view.lblDailyWithdrawLimitValue.text = selectedCardProductDetails.limits[1].split(":")[1];
					this.view.flxDailyWithdrawlLimit.isVisible = true;					
				}
				if(!this.isEmptyNullOrUndefined(selectedCardProductDetails.limits[2])){
					this.view.lblAnnualCharges.text = selectedCardProductDetails.limits[2].split(":")[0] + ":";
					this.view.lblAnnualChargesValue.text = selectedCardProductDetails.limits[2].split(":")[1];
					this.view.flxAnnualCharges.isVisible = true;
				}
				this.view.flxConfirm6.setVisibility(false);
				this.validationFields();
				this.view.btnNewCardModify.onClick = self.navigatetoCardsProductDetails.bind(self);
				this.view.btnNewCardModify.accessibilityConfig = {
					"a11yLabel": "Back to card selection",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				};
				this.acknowledgementObj = {
					"cardType": self.selectedCardSubType,
					"cardName": selectedCardProductDetails.productName,
					"nameOnCard": navManager.getCustomInfo("nameOnCard"),
					"limits": selectedCardProductDetails.limits
				}
				for (i in selectedCardProductDetails.limits){
					self.acknowledgementObj[selectedCardProductDetails.limits[i].split(":")[0]] = selectedCardProductDetails.limits[i].split(":")[1];
				}
				

			} else if (this.requestCardFlow == "virtualPrepaidCard") {
				this.view.flxBranchName.isVisible = false;
				let ConvertedUSDPrice = applicationManager.getNavigationManager().getCustomInfo("ConvertedUSDPrice");
				this.view.lblNewCardHeader.text = "Request Virtual Card";
                this.view.title = "Request Virtual Card";
				this.view.flxNameOnCard.setVisibility(false);
				this.view.flxDailyPurchaseLimt.isVisible = true;
				this.view.flxDailyWithdrawlLimit.isVisible = true;
				this.view.flxAnnualCharges.isVisible = true;
				this.view.flxWarning1.setVisibility(true);
                this.view.imgWarning1.src = "warning_yellow.png";
                this.view.lblWarning1.text = "• " + kony.i18n.getLocalizedString("i18n.HBL.TopupCards.Warning1");
                this.view.lblWarning2.text = "• " + kony.i18n.getLocalizedString("i18n.HBL.TopupCards.Warning2");
				var topupAmount = parseFloat(selectedCardProductDetails.topupAmount);
				var debitAmount = (parseFloat(topupAmount) + parseFloat(scope_configManager.getVirtualPrepaidCardFee())) * parseFloat(ConvertedUSDPrice);
				this.view.lblAccount.text = kony.i18n.getLocalizedString("i18n.accounts.FromAccount");
				this.view.lblAccountvalue.text = selectedAccountData.lblRecordField1;
				this.view.lblCard.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.PANNo");
				this.view.lblCardValue.text = selectedCardProductDetails.panNo;
				this.view.lblDailyPurchaseLimt.text = "Card Fee"; //kony.i18n.getLocalizedString("i18n.account.FromAccount");
				this.view.lblDailyPurchaseLimitValue.text = "USD " + scope_configManager.getVirtualPrepaidCardFee();
				this.view.lblDailyWithdrawLimit.text = "Topup Amount"; //kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");
				this.view.lblDailyWithdrawLimitValue.text = "USD " + topupAmount;
				this.view.lblAnnualCharges.text = kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"); //kony.i18n.getLocalizedString("i18n.account.FromAccount");
				selectedCardProductDetails.totalDebitAmount = (debitAmount.toFixed(2)).toString();
				this.view.lblAnnualChargesValue.text = "NPR " + (debitAmount.toFixed(2)).toString();
				this.view.flxConfirm6.setVisibility(true);
				this.view.lblConfirmKey6.text = kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");
				this.view.lblConfirmValue6.text = selectedCardProductDetails.serviceProvider;
				FormControllerUtility.enableButton(this.view.btnNewCardContinue);
				this.view.btnNewCardModify.onClick = self.selectVirtualDollarCard.bind(self);
				this.view.btnNewCardModify.accessibilityConfig = {
					"a11yLabel": "Back to card type selection",
					"a11yARIA": {
						"tabindex": 0,
						"role": "button"
					}
				};
				this.acknowledgementObj = {
					"fromAccount": selectedAccountData.lblRecordField1,
					"panNo": selectedCardProductDetails.panNo,
					"cardFee": this.view.lblDailyPurchaseLimitValue.text,
					"topupAmount": "USD " + topupAmount,
					"totalDebitAmt": "NPR " + debitAmount.toString(),
					"cardType": selectedCardProductDetails.serviceProvider
				}
			}
			//  this.view.flxTravelPlan.setVisibility(false);
			this.view.flxMyCards.setVisibility(false);
			this.view.flxRightBar.setVisibility(false);
			this.view.flxTermsAndConditions.setVisibility(false);
			this.view.flxSelectPrepaidCardType.setVisibility(false);
			this.view.flxNewcard.setVisibility(true);
			this.setMobileHeader("");
			//this.view.lblNewCardHeader.text = kony.i18n.getLocalizedString("i18n.CardManagement.applyANewCardCardDetails");
			//this.view.title = kony.i18n.getLocalizedString("i18n.CardManagement.applyANewCardCardDetails");
			this.view.flxAccountsSegments.setVisibility(false);
			this.view.flxVirtualDollarCardAccount.setVisibility(false);
			this.view.flxVirtualDollarCardBody.setVisibility(false);
			this.view.flxCardProductsSegments.setVisibility(false);
			this.view.flxSelectPrepaidCardType.setVisibility(false);
			this.view.flxCardBody.setVisibility(true);
			this.view.flxBranchDropdown.height = "125px";
			this.view.flxBranchDropdown.skin = "sknFlxWhiteRoundedBorder";
			this.view.flxBranchDropdown.top = "45px";
			this.view.customheader.btnSkip.setVisibility(true);
			this.view.customheader.btnSkip.setActive(true);
			// this.view.lblAccountvalue.text = accountValue;
			// this.view.lblCardValue.text = card;
			self.restrictCharactersSet();
			this.view.lblEnterCardPIN.setVisibility(false);
			this.view.lblConfirmCardPIN.setVisibility(false);
			this.view.tbxEnterCardPIN.setVisibility(false);
			this.view.tbxConfirmCardPIN.setVisibility(false);
			/*
				var amount = selectedAccountData.availableBalance;
				if (isNaN(amount.slice(0, 1))) {
					amount = amount.substring(1);
				} else {
					amount = amount;
				}*/
			//this.view.tbxNameOnCard.text = "";
			//this.view.tbxEnterCardPIN.text = "";
			//this.view.tbxConfirmCardPIN.text = "";
			//this.view.tbxEnterCardPIN.onTextChange = this.validationFields;
			//this.view.tbxConfirmCardPIN.onTextChange = this.validationFields;
			this.view.btnNewCardCancel.onClick = function() {
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
			}
			this.view.btnNewCardContinue.accessibilityConfig = {
				"a11yLabel": "Continue with the new card request process",
				"a11yARIA": {
					"tabindex": 0,
					"role": "button"
				}
			};
			this.view.btnNewCardContinue.onClick = function() {
				if(self.view.lblBranchNames.text !="Please Select" || self.requestCardFlow == "virtualPrepaidCard"){
				//var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
				var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
				//                 if (self.view.tbxEnterCardPIN.text !== self.view.tbxConfirmCardPIN.text) {
				//                     self.view.lblWarning.text = kony.i18n.getLocalizedString("i18n.CardManagement.errorMessageForPin");
				//                     self.view.lblWarning.setVisibility(true);
				//                 } else {
				//                     self.view.lblWarning.setVisibility(false);
				//var address = manageCardsModule.presentationController.getBillingAddress();
				/*  if (address === "") {
				      self.view.flxDowntimeWarning.setVisibility(true);
				      CommonUtilities.setText(self.view.rtxDowntimeWarning, kony.i18n.getLocalizedString("i18n.CardManagement.AddAddress"), accessibilityConfig);
				  }
				  else {*/
				  var navManager = applicationManager.getNavigationManager();
				  
				  self.view.flxDowntimeWarning.setVisibility(false);
				if (self.requestCardFlow == "virtualPrepaidCard") {
					var cardsObj = selectedCardProductDetails;
				} else {
					Object.assign(selectedCardProductDetails, {
                    "branchname": navManager.getCustomInfo("branchname"),
                    "branchCode": navManager.getCustomInfo("branchCode"),
                    "branchtoemail": navManager.getCustomInfo("emailTo"),
                    "branchccemail": (navManager.getCustomInfo("branchccemail") !== undefined)? navManager.getCustomInfo("branchccemail"): ""
                  });
					var cardsObj = {
						"serviceProvider": selectedCardProductDetails.cardCategory.toLowerCase(),
						"cardType": self.requestCardFlow,
						"cardDescription": selectedCardProductDetails.cardDescription,
						"nameOnTheCard": navManager.getCustomInfo("nameOnCard"),
						"cardCategory": "", //need to send for prepaid cards
						"panNo": "", //required for virtual dollar cards
						"topupAmount": "",
						"branchname": navManager.getCustomInfo("branchname"),
						"branchcode": navManager.getCustomInfo("branchCode"),
						"branchtoemail": navManager.getCustomInfo("emailTo"),
						"branchccemail": (navManager.getCustomInfo("branchccemail") !== undefined)? navManager.getCustomInfo("branchccemail"): ""
						//required for virtual dollar cards
						/*pinNumber: self.view.tbxConfirmCardPIN.text,
						accountId: selectedAccountData.accountID,
						cardProductName: self.view.lblCardValue.text,
						withdrawlLimit: selectedCardProductDetails.withdrawlLimit,
						purchaseLimit: selectedCardProductDetails.purchaseLimit,
						cardHolderName: self.view.tbxNameOnCard.text,
						currentBalance: applicationManager.getFormatUtilManager().deFormatAmount(amount),
						availableBalance: applicationManager.getFormatUtilManager().deFormatAmount(amount),
						billingAddress: address,
						// currencyCode:
						accountType: selectedCardProductDetails.accountType,
						bankName: selectedAccountData.bankName,
						accountName: selectedAccountData.accountName,
						accountBalanceType: selectedAccountData.accountBalanceType,
						withdrawalMinLimit: selectedCardProductDetails.withdrawalMinLimit,
						withdrawalMaxLimit: selectedCardProductDetails.withdrawalMaxLimit,
						withdrawalStepLimit: selectedCardProductDetails.withdrawalStepLimit,
						purchaseMinLimit: selectedCardProductDetails.purchaseMinLimit,
						purchaseMaxLimit: selectedCardProductDetails.purchaseMaxLimit,
						cardDisplayName: self.view.tbxNameOnCard.text*/
					}
					for (i in selectedCardProductDetails.limits){
						cardsObj[selectedCardProductDetails.limits[i].split(":")[0]] = selectedCardProductDetails.limits[i].split(":")[1];
					}
				}
				if (self.requestCardFlow == "debitcard") {
					cardsObj.debitAccount = selectedAccountData.accountID
				}
				if (self.requestCardFlow == "physicalPrepaidCard") {
					cardsObj.cardCategory = self.selectedCardSubType;
				}
				var reqCardObj = {
                        "fromAccount":self.view.lblAccountvalue.text,
                        "cardType":self.view.lblCardValue.text,
                        "dailyPurchaseLimitValue" : self.view.lblDailyPurchaseLimitValue.text,
                        "dailyWithdrawLimitValue": self.view.lblDailyWithdrawLimitValue.text,
                        "annualChargesValue":self.view.lblAnnualChargesValue.text,
                        "nameOnCard": self.view.tbxNameOnCard.text,
                        "branchName": self.view.lblBranchNames.text
                }
                navManager.setCustomInfo("RequestCardInput", reqCardObj);
				kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.applyNewCard(cardsObj);
				//this.cardObject = cardsObj;
				// }
				// }
				}else{
					self.view.lblWarning.setVisibility(true);
                    self.view.flxCardBody.height ="590dp";
                    self.view.lblWarning.text = "Please select the branch name";
				}
			};
	
			this.view.forceLayout();
			this.AdjustScreen();
		},
		onBranchSelection : function(){
			var navManager = applicationManager.getNavigationManager();
            var selectedData = this.view.segBranchDropDown.selectedRowItems[0];
            this.view.lblBranchNames.text = selectedData.lblUsers;
            this.view.tbxBranchName.setVisibility(false);
            this.view.lblBranchNames.setVisibility(true);
            this.view.lblBranchNames.skin = "ICSknLbl42424215PX";
            if (this.view.lblBranchDropDown.text == "P") {
                this.view.lblBranchDropDown.text = "O";
                this.view.flxBranchDropdown.setVisibility(false);
                this.view.flxBranchSegment.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
            } else {
                this.view.lblBranchDropDown.text = "P";
                this.view.flxBranchDropdown.setVisibility(true);
                this.view.flxFromAccountTextBoxAndIcon.skin = "sknFlxffffffBorderRoundedLeftRedFocus";
            }
            navManager.setCustomInfo("branchCode", selectedData.branchCode);
            navManager.setCustomInfo("branchccemail", selectedData.branchccemail);
            navManager.setCustomInfo("emailTo", selectedData.emailTo);
            navManager.setCustomInfo("branchname", selectedData.lblUsers);
            this.view.lblWarning.setVisibility(false);
            this.view.flxCardBody.height = "510dp";
            this.view.flxBranchDropdown.setActive(true);
        },
		setEMIPagination: function(values, viewModel) {
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			var recipientDetails = viewModel.length;
			const lastRecord = Math.min((values.offset + paginationCount), recipientDetails);
			this.lastRecord = lastRecord;
			var page = parseInt((values.offset / paginationCount) + 1);
			var lastPage = (Math.ceil(recipientDetails / paginationCount));
			this.view.PaginationContainer1.lblPagination.text = page + " - " + lastPage + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Pages");
			this.view.PaginationContainer1.flxPaginationFirst.isVisible = true;
			this.view.PaginationContainer1.flxPaginationLast.isVisible = true;
			this.view.PaginationContainer1.flxPaginationFirst.right = "0dp";
			if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
				this.view.PaginationContainer1.imgPaginationPrevious.src = "pagination_back_blue.png";
				this.view.PaginationContainer1.imgPaginationFirst.src = "pagination_first_active.png";
				this.view.PaginationContainer1.flxPaginationFirst.setEnabled(true);
				this.view.PaginationContainer1.flxPaginationPrevious.setEnabled(true);
				this.view.PaginationContainer1.flxPaginationPrevious.onClick = this.onEMIPrevious.bind(this, values, viewModel);
				this.view.PaginationContainer1.flxPaginationFirst.onClick = this.onEMIFirst.bind(this, values, viewModel);
			} else {
				this.view.PaginationContainer1.imgPaginationPrevious.src = "pagination_back_inactive.png";
				this.view.PaginationContainer1.imgPaginationFirst.src = "pagination_inactive.png";
				this.view.PaginationContainer1.flxPaginationFirst.setEnabled(false);
				this.view.PaginationContainer1.flxPaginationPrevious.setEnabled(false);
			}
			if (recipientDetails <= paginationCount || lastRecord > recipientDetails - 1) {
				this.view.PaginationContainer1.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
				this.view.PaginationContainer1.imgPaginationLast.src = "pagination_last_inactive.png";
				this.view.PaginationContainer1.flxPaginationLast.setEnabled(false);
				this.view.PaginationContainer1.flxPaginationNext.setEnabled(false);
			} else {
				this.view.PaginationContainer1.imgPaginationNext.src = "pagination_blue.png";
				this.view.PaginationContainer1.imgPaginationLast.src = "pagination_last_active.png";
				this.view.PaginationContainer1.flxPaginationLast.setEnabled(true);
				this.view.PaginationContainer1.flxPaginationNext.setEnabled(true);
				this.view.PaginationContainer1.flxPaginationNext.onClick = this.onEMINext.bind(this, values, viewModel);
				this.view.PaginationContainer1.flxPaginationLast.onClick = this.onEMILast.bind(this, values, viewModel);
			}
		},
		setPagination: function(values, viewModel) {
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			var recipientDetails = viewModel.length;
			const lastRecord = Math.min((values.offset + paginationCount), recipientDetails);
			this.lastRecord = lastRecord;
			var page = parseInt((values.offset / paginationCount) + 1);
			var lastPage = (Math.ceil(recipientDetails / paginationCount));
			this.view.PaginationContainer.lblPagination.text = page + " - " + lastPage + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.Pages");
			this.view.PaginationContainer.flxPaginationFirst.isVisible = true;
			this.view.PaginationContainer.flxPaginationLast.isVisible = true;
			this.view.PaginationContainer.flxPaginationFirst.right = "0dp";
			if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
				this.view.PaginationContainer.imgPaginationPrevious.src = "pagination_back_blue.png";
				this.view.PaginationContainer.imgPaginationFirst.src = "pagination_first_active.png";
				this.view.PaginationContainer.flxPaginationFirst.setEnabled(true);
				this.view.PaginationContainer.flxPaginationPrevious.setEnabled(true);
				this.view.PaginationContainer.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel);
				this.view.PaginationContainer.flxPaginationFirst.onClick = this.onFirst.bind(this, values, viewModel);
			} else {
				this.view.PaginationContainer.imgPaginationPrevious.src = "pagination_back_inactive.png";
				this.view.PaginationContainer.imgPaginationFirst.src = "pagination_inactive.png";
				this.view.PaginationContainer.flxPaginationFirst.setEnabled(false);
				this.view.PaginationContainer.flxPaginationPrevious.setEnabled(false);
			}
			if (recipientDetails <= paginationCount || lastRecord > recipientDetails - 1) {
				this.view.PaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
				this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_inactive.png";
				this.view.PaginationContainer.flxPaginationLast.setEnabled(false);
				this.view.PaginationContainer.flxPaginationNext.setEnabled(false);
			} else {
				this.view.PaginationContainer.imgPaginationNext.src = "pagination_blue.png";
				this.view.PaginationContainer.imgPaginationLast.src = "pagination_last_active.png";
				this.view.PaginationContainer.flxPaginationLast.setEnabled(true);
				this.view.PaginationContainer.flxPaginationNext.setEnabled(true);
				this.view.PaginationContainer.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel);
				this.view.PaginationContainer.flxPaginationLast.onClick = this.onLast.bind(this, values, viewModel);
			}
		},
		onEMIFirst: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			if (values.offset < recipientDetails) {
				values.offset = 0;
				this.offset = values.offset;
			}
			this.onClickEMIPaginationTransactionDetails(viewModel, values);
		},
		onEMIPrevious: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			if (values.offset < recipientDetails) {
				values.offset = values.offset - paginationCount;
				this.offset = values.offset;
			}
			this.onClickEMIPaginationTransactionDetails(viewModel, values);
		},
		onEMINext: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			if (values.offset < recipientDetails) {
				values.offset = values.offset + paginationCount;
				this.offset = values.offset;
			}
			this.onClickEMIPaginationTransactionDetails(viewModel, values);
		},
		onClickEMIPaginationTransactionDetails: function(cards, values) {
			this.setEMIPagination({
				'show': true,
				'offset': this.offset
			}, cards);
			this.view.segEMITransactionDetails.setData(cards.slice(this.offset, this.lastRecord));

		},
		onEMILast: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			if (values.offset < recipientDetails) {
				var value = Math.floor(recipientDetails / paginationCount)
				values.offset = Math.min(paginationCount * value, recipientDetails)
				this.offset = values.offset === recipientDetails ? (values.offset - paginationCount) : values.offset;
			}
			this.onClickEMIPaginationTransactionDetails(viewModel, values);
		},



		onFirst: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			if (values.offset < recipientDetails) {
				values.offset = 0;
				this.offset = values.offset;
			}
			this.onClickPaginationTransactionDetails(viewModel, values);
		},
		onPrevious: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			if (values.offset < recipientDetails) {
				values.offset = values.offset - paginationCount;
				this.offset = values.offset;
			}
			this.onClickPaginationTransactionDetails(viewModel, values);
		},
		onNext: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			if (values.offset < recipientDetails) {
				values.offset = values.offset + paginationCount;
				this.offset = values.offset;
			}
			this.onClickPaginationTransactionDetails(viewModel, values);
		},
		onClickPaginationTransactionDetails: function(cards, values) {
			if (this.view.segTransactionDetails.isVisible == true) {
				this.setPagination({
					'show': true,
					'offset': this.offset
				}, cards);
				this.view.segTransactionDetails.setData(cards.slice(this.offset, this.lastRecord));
			} else if (this.view.segTransactionDetailsBilled.isVisible == true) {
				this.setPagination({
					'show': true,
					'offset': this.offset
				}, cards);
				this.view.segTransactionDetailsBilled.setData(cards.slice(this.offset, this.lastRecord));
			}
		},
		onLast: function(values, viewModel) {
			var recipientDetails = viewModel.length;
			var paginationCount = 20; //applicationManager.getConfigurationManager().getConfigurationValue('transactionsPerPage');
			if (values.offset < recipientDetails) {
				var value = Math.floor(recipientDetails / paginationCount)
				values.offset = Math.min(paginationCount * value, recipientDetails)
				this.offset = values.offset === recipientDetails ? (values.offset - paginationCount) : values.offset;
			}
			this.onClickPaginationTransactionDetails(viewModel, values);
		},
		showAcknowledgementScreenForApplyCard: function(cardDetails) {
			var referenceNumber = cardDetails.ReferenceNumber;
			cardDetails = this.acknowledgementObj;
			var navManager = applicationManager.getNavigationManager();
			var self = this;
			//var account = this.view.segAccounts.selectedRowItems[0];
			//var accountValue = account.lblAccountName.text;
			//var card = cardDetails.productName;
			var nameOncard = navManager.getCustomInfo("nameOnCard");
			var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
			this.view.flxMyCardsView.setVisibility(false);
			this.view.flxTopUpPrepaidCard.setVisibility(false);
			this.view.flxCardHeader.setVisibility(true);
			this.view.flxAcknowledgment.setVisibility(true);
			this.view.lblCardAcknowledgement.skin = "sknlbl424242SSPReg17px";
			this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.CardManagement.applyANewCardAcknowledgement");
			this.view.title = kony.i18n.getLocalizedString("i18n.CardManagement.applyANewCardAcknowledgement");
			//this.view.Acknowledgement.lblCardTransactionMessage.text = cardDetails.message
			if (referenceNumber) {
				this.view.Acknowledgement.lblRequestID.setVisibility(true);
				this.view.Acknowledgement.lblRefrenceNumber.setVisibility(true);
				this.view.Acknowledgement.lblMessage.setVisibility(true);
				this.view.Acknowledgement.lblRequestID.text = kony.i18n.getLocalizedString("i18n.CardManagement.requestId");
				this.view.Acknowledgement.lblRefrenceNumber.text = referenceNumber;
				//this.view.Acknowledgement.lblMessage.text = 
			} else {
				this.view.Acknowledgement.lblRequestID.setVisibility(false);
				this.view.Acknowledgement.lblRefrenceNumber.setVisibility(false);
			}
			//this.view.Acknowledgement.lblUnlockCardMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage");
			this.view.ConfirmDialog.lblHeading.text = "";
			this.view.ConfirmDialog.lblHeading.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardReuestDetails");
			// this.view.ConfirmDialog.keyValueName.setVisibility(false);
			this.view.ConfirmDialog.flxDestination.setVisibility(false);
			this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(false);
			this.view.ConfirmDialog.flxSelectCards.setVisibility(false);
			this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(false);
			this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(false);
			this.view.ConfirmDialog.confirmButtons.setVisibility(false);
			this.view.btnManageCards.setVisibility(false);
			this.view.btnBackToCardLimits.setVisibility(false);
			this.view.flxPrint.setVisibility(false);
			this.view.ConfirmDialog.keyValueCardHolder.setVisibility(true);
			this.view.ConfirmDialog.keyValueCardName.setVisibility(true);
			this.view.ConfirmDialog.keyValueValidThrough.setVisibility(true);
			this.view.btnBackToCards.setVisibility(true);
			this.view.btnRequestReplacement.setVisibility(true);
			var branchName= navManager.getCustomInfo("branchname");
			this.view.ConfirmDialog.keyValueName.setVisibility(true);
            this.view.ConfirmDialog.keyValueName.lblKey.text ="Preferred branch for card collection :";
			this.view.ConfirmDialog.keyValueName.flxKey.width ="50%";
			this.view.ConfirmDialog.keyValueName.flxValue.left = "50%";
			this.view.ConfirmDialog.keyValueName.lblValue.text = branchName;
            this.view.ConfirmDialog.keyValueName.flxIcon.setVisibility(false);
			if (this.requestCardFlow == "physicalPrepaidCard") {
				this.view.ConfirmDialog.keyValueName.flxContainer.isVisible = true;
				this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
			    this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
				this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");
				this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.cardName");
				this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard");
				this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = this.acknowledgementObj.cardType;
				this.view.ConfirmDialog.keyValueCardName.lblValue.text = this.acknowledgementObj.cardName;
				this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = this.acknowledgementObj.nameOnCard;
				var message = JSON.parse(OLBConstants.CLIENT_PROPERTIES.CARD_REQUEST_PREPAID_ETA);
                // this.view.Acknowledgement.lblUnlockCardMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage").replace("X", OLBConstants.CLIENT_PROPERTIES.CARD_ESTIMATED_TIME);
                this.view.Acknowledgement.lblUnlockCardMessage.text = message[kony.i18n.getCurrentLocale()];
				if(!this.isEmptyNullOrUndefined(cardDetails.limits[0])){
					this.view.ConfirmDialog.keyValueServiceProvider.isVisible = true;
					this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = cardDetails.limits[0].split(":")[0] + ":";
					this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = cardDetails.limits[0].split(":")[1];
				}
				if(!this.isEmptyNullOrUndefined(cardDetails.limits[1])){
					this.view.ConfirmDialog.keyValueCreditLimit.isVisible = true;
					this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = cardDetails.limits[1].split(":")[0] + ":";
					this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = cardDetails.limits[1].split(":")[1];;
				}
				if(!this.isEmptyNullOrUndefined(cardDetails.limits[2])){
					this.view.ConfirmDialog.keyValueAvailableCredit.isVisible = true;
					this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = cardDetails.limits[2].split(":")[0] + ":";
					this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = cardDetails.limits[2].split(":")[1];;
				}

			} else if (this.requestCardFlow == "debitcard") {
				this.view.ConfirmDialog.keyValueName.flxContainer.isVisible = true;
				this.view.lblCardAcknowledgement.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
				this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.accounts.FromAccount");
				this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");
				this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard");
				var message = JSON.parse(OLBConstants.CLIENT_PROPERTIES.CARD_REQUEST_DEBIT_ETA);
                // this.view.Acknowledgement.lblUnlockCardMessage.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage").replace("X", OLBConstants.CLIENT_PROPERTIES.CARD_ESTIMATED_TIME);
                this.view.Acknowledgement.lblUnlockCardMessage.text = message[kony.i18n.getCurrentLocale()];
                
				if(!this.isEmptyNullOrUndefined(cardDetails.limits[0])){
					this.view.ConfirmDialog.keyValueServiceProvider.isVisible = true;
					this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = cardDetails.limits[0].split(":")[0] + ":";
					this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = cardDetails.limits[0].split(":")[1];
				}
				if(!this.isEmptyNullOrUndefined(cardDetails.limits[1])){
					this.view.ConfirmDialog.keyValueCreditLimit.isVisible = true;
					this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = cardDetails.limits[1].split(":")[0] + ":";
					this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = cardDetails.limits[1].split(":")[1];;
				}
				if(!this.isEmptyNullOrUndefined(cardDetails.limits[2])){
					this.view.ConfirmDialog.keyValueAvailableCredit.isVisible = true;
					this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = cardDetails.limits[2].split(":")[0] + ":";
					this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = cardDetails.limits[2].split(":")[1];;
				}
				
				this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = this.acknowledgementObj.fromAccount;
				this.view.ConfirmDialog.keyValueCardName.lblValue.text = this.acknowledgementObj.cardType;
				this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = this.acknowledgementObj.nameOnCard;

			} else if (this.requestCardFlow == "virtualPrepaidCard") {
				this.view.ConfirmDialog.keyValueName.flxContainer.isVisible = false;
				this.view.lblCardAcknowledgement.text = "Request Virtual Card";
                this.view.title = "Request Virtual Card";
				var message = JSON.parse(OLBConstants.CLIENT_PROPERTIES.CARD_REQUEST_VIRTUAL_ETA);
				this.view.Acknowledgement.lblUnlockCardMessage.text = message[kony.i18n.getCurrentLocale()];
				
				this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.accounts.FromAccount");
				this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.PANNo");
				this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = "Card Fee"; //kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard");
				this.view.ConfirmDialog.keyValueServiceProvider.setVisibility(true);
			    this.view.ConfirmDialog.keyValueCreditLimit.setVisibility(true);
			    this.view.ConfirmDialog.keyValueAvailableCredit.setVisibility(true);
				this.view.ConfirmDialog.keyValueServiceProvider.lblKey.text = "Topup Amount"; //kony.i18n.getLocalizedString("i18n.CardManagement.DailyPurchaseLimit");
				this.view.ConfirmDialog.keyValueCreditLimit.lblKey.text = kony.i18n.getLocalizedString("kony.i18n.verifyDetails.totalDebitAmount");
				this.view.ConfirmDialog.keyValueAvailableCredit.lblKey.text = kony.i18n.getLocalizedString("i18n.hbl.cards.cardType");

				this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = this.acknowledgementObj.fromAccount;
				this.view.ConfirmDialog.keyValueCardName.lblValue.text = this.acknowledgementObj.panNo;
				this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = this.acknowledgementObj.cardFee;
				this.view.ConfirmDialog.keyValueServiceProvider.lblValue.text = this.acknowledgementObj.topupAmount;
				this.view.ConfirmDialog.keyValueCreditLimit.lblValue.text = this.acknowledgementObj.totalDebitAmt;
				this.view.ConfirmDialog.keyValueAvailableCredit.lblValue.text = this.acknowledgementObj.cardType;
			}
			//this.view.ConfirmDialog.keyValueCardHolder.lblKey.text = kony.i18n.getLocalizedString("i18n.ChequeBookReq.account");
			//this.view.ConfirmDialog.keyValueCardName.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.Card");
			//this.view.ConfirmDialog.keyValueValidThrough.lblKey.text = kony.i18n.getLocalizedString("i18n.CardManagement.NameOnCard");
			//this.view.ConfirmDialog.keyValueCardHolder.lblValue.text = accountValue;
			//this.view.ConfirmDialog.keyValueCardName.lblValue.text = card;
			//this.view.ConfirmDialog.keyValueValidThrough.lblValue.text = nameOncard;
			this.view.btnBackToCards.skin = "sknbtnSSPffffff0278ee15pxbr3px";
			this.view.btnRequestReplacement.skin = "sknBtnffffffBorder0273e31pxRadius2px";
			/* if (kony.application.getCurrentBreakpoint() === 1366 && kony.i18n.getCurrentLocale() === "ar_AE") {
			      this.view.btnBackToCards.right = "10dp";
			      this.view.btnRequestReplacement.right = "23.6%";
			  }*/
			this.view.btnBackToCards.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyDashboard");
			this.view.btnRequestReplacement.text = kony.i18n.getLocalizedString("i18n.CardManagement.GoToMyCards");
			this.view.btnBackToCards.onClick =function(){
			var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
				"appName": "AuthenticationMA",
				"moduleName": "AuthUIModule"
			});
			var navManager = applicationManager.getNavigationManager();
			var x = navManager.getCustomInfo('AuthParam');
			authModule.presentationController.postLoginCall(x);
			applicationManager.getPresentationUtility().showLoadingScreen();
		}
			this.view.btnRequestReplacement.onClick = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards.bind(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController);
			this.view.Acknowledgement.lblHeading.accessibilityConfig = {
				"tagName": "h2",
				"a11yARIA": {
					"tabindex": -1
				}
			};
			this.view.ConfirmDialog.lblHeading.accessibilityConfig = {
				"tagName": "h2",
				"a11yARIA": {
					"tabindex": -1
				}
			};
			this.AdjustScreen();
		},
		preTopUpCall : function(data){
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
            var currentBankDate="";
            if(bankDate){
                currentBankDate=bankDate.currentWorkingDate;
                if(currentBankDate)
                    currentBankDate=currentBankDate+"T00:00:00.000Z";
            }

			var amount = this.requestCardFlow == "topUpVirtualCard" ?data.topupAmou : data.topUpAmount;
			var params = {
				"amount": amount.toString(),
				"transactionAmount": amount.toString(),
				"beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
				"frequencyType": "Once",
				"fromAccountCurrency": "NPR",
				"fromAccountNumber": data.fromAcc,
				"scheduledDate": currentBankDate,
				"serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
				"toAccountCurrency": "NPR",
				"toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
				"ExternalAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
				"transactionCurrency": "NPR",
				"transactionsNotes": data.notes,
				"frequencyEndDate": currentBankDate,
				"frequencyStartDate": currentBankDate,
				"transactionType": "ExternalTransfer",
				"transactionId": data.transactionId,
				"validate": "",
				"isScheduled": "0",
				"createWithPaymentId": "true",
				"cardNumber": data.cCardNumber
			};
			var navManager = applicationManager.getNavigationManager();
			manageCardsModule.presentationController.intraBankFinalTransfer(params);
		},
		topUpServiceCall : function(response){
			this.view.flxTopUpConfirm.setVisibility(true);
			this.view.flxTopUpPrepaidCard.setVisibility(true);
			var navManager = applicationManager.getNavigationManager();
			var params = navManager.getCustomInfo("topUpCardPayload");
			var ackData = navManager.getCustomInfo("topUpCardAckData");
			params.paymentReferenceId= response.backendReferenceId;
            params.referenceId = response.referenceId;
            params.transactionId = response.transactionId;
			var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
			manageCardsModule.presentationController.topUpCard(params, ackData);
		},
		payBill: function(card) {
            var scope = this;
            scope.view.flxViewStatements.setVisibility(false);
            scope.view.flxViewTransactions.setVisibility(false);
            scope.view.flxMyCardsView.setVisibility(false);
            scope.view.flxTopUpPrepaidCard.setVisibility(false);
            scope.view.flxConvertToEMI.setVisibility(false);
            scope.view.flxConvertToEMIConfirm.setVisibility(false);
            scope.view.flxConvertEMIConfirm.setVisibility(false);
            scope.view.flxAcknowledgment.setVisibility(false);
            scope.view.flxCardBillPayment.setVisibility(true);
            scope.view.flxCardBillPaymentConfirm.setVisibility(false);
            scope.setBillPayFromAccount();
            scope.view.lblToRecordField1.setVisibility(true);
            scope.view.lblToRecordField1.text = card.maskedCardNumber;
            scope.view.tbxAmount0.setVisibility(false);
            scope.view.lblSelectedCurrencySymbol.setVisibility(true);
		//	scope.view.calStartDate.dateEditable = false;
            var navManager = applicationManager.getNavigationManager();
            // navManager.setCustomInfo("SelectedPaymentType", "Outstanding Due");
            FormControllerUtility.disableButton(scope.view.btnPayBillContinue);
			scope.view.flxPaymentAmountType1.setVisibility(false);
            scope.view.flxPaymentAmountType2.setVisibility(false);
            scope.view.flxPaymentAmountType3.setVisibility(false);
            scope.view.flxPaymentTypeOption4.setVisibility(false);
            scope.view.lblPaymentType.setVisibility(false);
            scope.view.lblPaymentType41.left ="0px";
            scope.view.lblPaymentType4.setVisibility(false);
			this.view.tbxAmount0.setVisibility(true);
            this.view.lblSelectedCurrencySymbol.setVisibility(false);
            this.view.tbxAmount0.text = "";
			scope.view.lblSelectedTransferCurrency.text =card.currCode;
			// scope.onPaymentMethodSelect( 1, card);
            // scope.view.lblSelectedCurrencySymbol.text = (card.outstdBalance != undefined) ? card.outstdBalance : "0.00";
            // scope.view.flxPaymentTypeOption1.onClick = scope.onPaymentMethodSelect.bind(this, 1, card);
            // scope.view.flxPaymentTypeOption2.onClick = scope.onPaymentMethodSelect.bind(this, 2, card);
            // scope.view.flxPaymentTypeOption3.onClick = scope.onPaymentMethodSelect.bind(this, 3, card);
            // scope.view.flxPaymentTypeOption4.onClick = scope.onPaymentMethodSelect.bind(this, 4, card);
            // scope.calenderChanges(card);
			this.view.flxStartDate.setVisibility(false);
			this.view.flxPaymentAmountTypeField.setVisibility(false);
			scope.view.txtNotes.text ="";
            this.view.tbxAmount0.onTextChange = function() {
				var amount = scope.view.lblFromRecordFields0.text.split(" ")[1];
				var currencyCode =scope.view.lblFromRecordFields0.text.split(" ")[0];
				var cleaned = amount.replace(/,/g, "");
                if (parseInt(cleaned) >= parseInt(scope.view.tbxAmount0.text)) {
                    if (parseInt(scope.view.tbxAmount0.text) >= 1) {
                        if(currencyCode == scope.view.lblSelectedTransferCurrency.text){
                            scope.enableContinueButton();
                            scope.view.flxBillPayErrorMessage.setVisibility(false);
                        }else{
                            scope.view.flxBillPayErrorMessage.setVisibility(true);
                            scope.view.rtxErrorMessage.text = "Transfer Currency should be same";
                            FormControllerUtility.disableButton(scope.view.btnPayBillContinue);
                        }
                       
                    } else {
                        scope.view.flxBillPayErrorMessage.setVisibility(true);
                        scope.view.rtxErrorMessage.text = "Amount should be more than NPR 1";
                        FormControllerUtility.disableButton(scope.view.btnPayBillContinue);
                    }
                } else {
                    scope.view.flxBillPayErrorMessage.setVisibility(true);
                    scope.view.rtxErrorMessage.text = "Entered amount should be less than available balance";
                    FormControllerUtility.disableButton(scope.view.btnPayBillContinue);
                }
            };
            this.view.tbxAmount0.onEndEditing = function() {
                if (scope.view.tbxAmount0.text != null && scope.view.tbxAmount0.text != "") {
                    scope.view.tbxAmount0.text = scope.formatNumber(scope.view.tbxAmount0.text);
                }
            };
            this.view.txtNotes.onTextChange = function() {
                scope.view.lblNotesLength.text = scope.view.txtNotes.text.length + "/140";
                if (scope.view.txtNotes.text.length >= 140) {
                    scope.view.txtNotes.text = scope.view.txtNotes.text.slice(0, 140);
                }
                scope.enableContinueButton();
            };
            scope.view.btnPayBillContinue.onClick = scope.billPayConfirm.bind(this, card);
            scope.view.btnPayBillCancel.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
            }
			var bankDate =applicationManager.getNavigationManager().getCustomInfo("bankDates");
            var bank = bankDate.currentWorkingDate.split("-");
			if(bank[2] < scope_configManager.getCardPaymentDueDate()){
				scope.view.lblPaymentType41.text = "Due Date: "+scope_configManager.getCardPaymentDueDate()+"/"+bank[1]+"/"+bank[0];
			} else{
				if(bank[1] == 12 ){
					scope.view.lblPaymentType41.text = "Due Date: "+scope_configManager.getCardPaymentDueDate()+"/"+1+"/"+(parseInt(bank[0])+1);
				}else{
					scope.view.lblPaymentType41.text = "Due Date: "+scope_configManager.getCardPaymentDueDate()+"/"+(parseInt(bank[1])+1)+"/"+bank[0]
				}
			}
            
            this.view.forceLayout();
			this.view.flxFromAccKey.setFocus(true);
            // this.AdjustScreen();
        },
        enableContinueButton : function(){
            if(this.view.txtNotes.text.length !=0 &&((this.view.tbxAmount0.isVisible == true && this.view.tbxAmount0.text !="")||this.view.tbxAmount0.isVisible == false) && this.view.lblFromRecordFields0.text.split(" ")[0] == this.view.lblSelectedTransferCurrency.text){
                FormControllerUtility.enableButton(this.view.btnPayBillContinue);
            }else{
                FormControllerUtility.disableButton(this.view.btnPayBillContinue);
            }
        },
        formatNumber: function(num) {
            return parseFloat(num).toFixed(2).toLocaleString('en-US');
        },
        billPayConfirm: function(card) {
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            // var params = {
            // 	"ExternalAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
            // 	"amount": card.outstdBalance,
            // 	"beneficiaryName": card.chName,
            // 	"frequencyType": "Once",
            // 	"fromAccountCurrency": "NPR",
            // 	"fromAccountNumber": "25135",
            // 	"scheduledDate": "2025-03-07T00:00:00.000Z",
            // 	"serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
            // 	"toAccountCurrency": "NPR",
            // 	"toAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
            // 	"transactionCurrency": "NPR",
            // 	"transactionsNotes": "test",
            // };
          //  var input = this.view.calStartDate.formattedDate;
           // var [day, month, year] = input.split('/');
            // Create a JavaScript Date object (month is 0-based)
           // var date = new Date(Date.UTC(year, month - 1, day));
            // Convert to ISO 8601 format
           // var isoString = date.toISOString();
            var navManager = applicationManager.getNavigationManager();
            // var paymentType = navManager.getCustomInfo("SelectedPaymentType");
            // var amt;
            // if (paymentType == "Others") {
                amt = this.view.tbxAmount0.text;
            // } else {
                // amt = this.view.lblSelectedCurrencySymbol.text;
            // }
			date = navManager.getCustomInfo("bankDates");
            var accNum =navManager.getCustomInfo("selectedCardBillPayAccountAccId");
            var data = {
                "from": this.view.lblFromRecordField0.text,
                "to": this.view.lblToRecordField1.text,
                "PaymentType": "",
                "amount": amt,
               "date": date.currentWorkingDate,
                "note": this.view.txtNotes.text,
                "name": card.chName,
              //  "startDate": isoString,
                "fromAccNum": accNum,
                "cardNum": card.pan,
				"fromNickName":card.chName,
                "cardAccNumber":card.mxpAccNum,
            }
            var params = {
                "ExternalAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
                "amount": amt,
                "beneficiaryAddressLine1": "",
                "beneficiaryAddressLine2": "",
                "beneficiaryCity": "",
                "beneficiarycountry": "",
                "beneficiaryEmail": "",
                "beneficiaryName": card.chName,
                "beneficiaryNickname": "",
                "beneficiaryPhone": "",
                "beneficiaryState": "",
                "beneficiaryZipcode": "",
                "createWithPaymentId": "true",
                "deletedDocuments": "",
              //  "frequencyEndDate": isoString,
              //  "frequencyStartDate": isoString,
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "fromAccountNumber": accNum,
                "iban": "",
                "isScheduled": "0",
                "numberOfRecurrences": "",
                "paidBy": "",
                "paymentType": "",
              //  "scheduledDate": isoString,
                "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
                "swiftCode": "",
                "toAccountCurrency": "NPR",
                "toAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
                "transactionCurrency": "NPR",
                "transactionId": "",
                "transactionType": "ExternalTransfer",
                "transactionsNotes": this.view.txtNotes.text,
                "uploadedattachments": "",
                "userId": "",
                "cardNumber": card.pan,
                "validate": "true"
            }
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("payBillAckData", data);
            manageCardsModule.presentationController.makeCardPayment(params, data);
        },
        showCardPaymentConfirmScreen: function(response) {
            this.view.flxCardBillPaymentConfirm.setVisibility(true);
            this.view.flxCardBillPayment.setVisibility(false);
            this.view.flxViewStatements.setVisibility(false);
            this.view.flxViewTransactions.setVisibility(false);
            this.view.flxMyCardsView.setVisibility(false);
            this.view.flxTopUpPrepaidCard.setVisibility(false);
            this.view.flxConvertToEMI.setVisibility(false);
            this.view.flxConvertToEMIConfirm.setVisibility(false);
            this.view.flxConvertEMIConfirm.setVisibility(false);
            this.view.flxAcknowledgment.setVisibility(false);
            this.confirmationScreenData(response);
        },
        confirmationScreenData: function(response) {
            this.view.lblCardBillPayKey1.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            this.view.lblCardBillPayKey2.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            this.view.lblCardBillPayKey3.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentType") + ":";
            this.view.lblCardBillPayKey4.text = kony.i18n.getLocalizedString("kony.mb.common.TransactionDateColon");
            this.view.lblCardBillPayKey5.text = kony.i18n.getLocalizedString("i18n.HBl.Cards.TransactionAmount");
            this.view.lblCardBillPayKey6.text = kony.i18n.getLocalizedString("i18n.payments.transactionDescriptionWithColon");
            this.view.lblCardBillPayValue1.left ="0px";
			this.view.lblCardBillPayValue2.left ="0px";
			this.view.lblCardBillPayValue3.left ="0px";
			this.view.lblCardBillPayValue4.left ="0px";
			this.view.lblCardBillPayValue5.left ="0px";
			this.view.lblCardBillPayValue6.left ="0px";
			this.view.flxCardBillPayDetailsRow3.setVisibility(false);
            this.view.lblCardBillPayValue1.text = response.data.from;
            this.view.lblCardBillPayValue2.text = response.data.to;
            this.view.lblCardBillPayValue3.text = response.data.PaymentType;
            this.view.lblCardBillPayValue4.text = response.data.date;
            this.view.lblCardBillPayValue5.text = "NPR " + response.data.amount;
            this.view.lblCardBillPayValue6.text = response.data.note;
            this.view.btnCardBillPayConfirm.onClick = this.cardBillPayConfirm.bind(this, response);
            this.view.btnCardBillPayCancel.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
            }
			 this.view.btnCardBillPayModify.onClick = this.cardPaymentModify.bind(this);	
        },
        cardPaymentModify:function(){
            this.view.flxCardBillPaymentConfirm.setVisibility(false);
				this.view.flxCardBillPayment.setVisibility(true);
				this.view.flxViewStatements.setVisibility(false);
				this.view.flxViewTransactions.setVisibility(false);
				this.view.flxMyCardsView.setVisibility(false);
				this.view.flxTopUpPrepaidCard.setVisibility(false);
				this.view.flxConvertToEMI.setVisibility(false);
				this.view.flxConvertToEMIConfirm.setVisibility(false);
				this.view.flxConvertEMIConfirm.setVisibility(false);
				this.view.flxAcknowledgment.setVisibility(false);
				this.view.flxFromAccKey.setFocus(true);
        },
        cardBillPayConfirm: function(response) {
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            var params = {
                "ExternalAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
                "amount": response.data.amount,
                "beneficiaryAddressLine1": "",
                "beneficiaryAddressLine2": "",
                "beneficiaryCity": "",
                "beneficiarycountry": "",
                "beneficiaryEmail": "",
                "beneficiaryName": response.data.name,
                "beneficiaryNickname": "",
                "beneficiaryPhone": "",
                "beneficiaryState": "",
                "beneficiaryZipcode": "",
                "createWithPaymentId": "true",
                "deletedDocuments": "",
                "frequencyEndDate": response.data.startDate,
                "frequencyStartDate": response.data.startDate,
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "fromAccountNumber": response.data.fromAccNum,
                "iban": "",
                "isScheduled": "0",
                "numberOfRecurrences": "",
                "paidBy": "",
                "paymentType": "cardPayment",
                "fromNickName ":response.data.fromNickName,
                "cardAccNumber":response.data.cardAccNumber,
                "scheduledDate": response.data.startDate,
                "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
                "swiftCode": "",
                "toAccountCurrency": "NPR",
                "toAccountNumber": scope_configManager.getCardPaymentPayableAccNo(),
                "transactionCurrency": "NPR",
                "transactionId": response.cardResponse.referenceId,
                "transactionType": "ExternalTransfer",
                "transactionsNotes": response.data.note,
                "uploadedattachments": "",
                "userId": "",
                "cardNumber": response.data.cardNum,
                "createWithPaymentId": "true"
            }
            // var navManager = applicationManager.getNavigationManager();
            // navManager.setCustomInfo("payBillAckData", params);
            manageCardsModule.presentationController.makeCardFinalPayment(params);
        },
        calenderChanges: function(card) {
            var bankDate =applicationManager.getNavigationManager().getCustomInfo("bankDates");
            var startDate = new Date(bankDate.currentWorkingDate);
            this.view.calStartDate.dateComponents = [startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()];
            // var scope = this;
			// // var bank =bankDate.currentWorkingDate.split("-");
            // // CommonUtilities.disableOldDaySelection(this.view.calStartDate);
            var futureDate = new Date(card.cardExpDate);
			this.view.calStartDate.enableRangeOfDates([startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
            // var fromdate = scope.view.calStartDate.formattedDate;
            // this.view.calStartDate.onSelection = function() {
            //     var fromdate = scope.view.calStartDate.formattedDate;
            //     // var today = new Date();
				
            //     dateparts = fromdate.split("/");
            // };
            // this.disableOldDaySelection(this.view.calStartDate, bankDate.currentWorkingDate,card.cardExpDate);
            
        },
        onPaymentMethodSelect: function(idx, card) {
            var scope = this;
            var i = idx;
            try {
                // if (this.view["flxPaymentMethod" + i].isVisible) {
                var navManager = applicationManager.getNavigationManager();
                if (i === 1) {
                    text = "lblPaymentTypeOption1";
                    this.view.flxPaymentTypeOption1.accessibilityConfig = {
                        a11yARIA: {
                            "aria-required": true,
                            "aria-checked": true,
                            "role": "radio",
                            "aria-labelledby": "text"
                        },
                    };
                    navManager.setCustomInfo("SelectedPaymentType", "Outstanding Due");
                    this.view.tbxAmount0.setVisibility(false);
                    this.view.lblSelectedCurrencySymbol.setVisibility(true);
                    scope.enableContinueButton();
                    scope.view.lblSelectedCurrencySymbol.text = (card.outstdBalance != undefined) ? card.outstdBalance : "0.00";
                    this.view.flxPaymentTypeOption1.text = "M";
                    this.view.flxPaymentTypeOption1.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption1.text = "M";
                    this.view.lblPaymentTypeOption1.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption2.text = "L";
                    this.view.lblPaymentTypeOption2.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption3.text = "L";
                    this.view.lblPaymentTypeOption3.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption4.text = "L";
                    this.view.lblPaymentTypeOption4.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                } else if (i === 2) {
                    text = "lblPaymentTypeOption2";
                    this.view.flxPaymentTypeOption2.accessibilityConfig = {
                        a11yARIA: {
                            "aria-required": true,
                            "aria-checked": true,
                            "role": "radio",
                            "aria-labelledby": "text"
                        },
                    };
                    this.view.tbxAmount0.setVisibility(false);
                    this.view.lblSelectedCurrencySymbol.setVisibility(true);
                    scope.enableContinueButton();
                    navManager.setCustomInfo("SelectedPaymentType", "Statement Due");
                    this.view.lblSelectedCurrencySymbol.text = (card.outstdBalance != undefined) ? card.outstdBalance : "0.00";
                    this.view.flxPaymentTypeOption2.text = "M";
                    this.view.flxPaymentTypeOption2.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption2.text = "M";
                    this.view.lblPaymentTypeOption2.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption1.text = "L";
                    this.view.lblPaymentTypeOption1.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption3.text = "L";
                    this.view.lblPaymentTypeOption3.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption4.text = "L";
                    this.view.lblPaymentTypeOption4.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                } else if (i === 3) {
                    text = "lblPaymentTypeOption3";
                    this.view.flxPaymentTypeOption3.accessibilityConfig = {
                        a11yARIA: {
                            "aria-required": true,
                            "aria-checked": true,
                            "role": "radio",
                            "aria-labelledby": "text"
                        },
                    };
                    this.view.tbxAmount0.setVisibility(false);
                    this.view.lblSelectedCurrencySymbol.setVisibility(true);
                    navManager.setCustomInfo("SelectedPaymentType", "Minimum Due");
                    scope.enableContinueButton();
                    scope.view.lblSelectedCurrencySymbol.text = (card.minPaymentAmount != undefined) ? card.minPaymentAmount : "0.00";
                    this.view.flxPaymentTypeOption3.text = "M";
                    this.view.flxPaymentTypeOption3.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption3.text = "M";
                    this.view.lblPaymentTypeOption3.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption2.text = "L";
                    this.view.lblPaymentTypeOption2.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption1.text = "L";
                    this.view.lblPaymentTypeOption1.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption4.text = "L";
                    this.view.lblPaymentTypeOption4.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                } else if (i === 4) {
                    text = "lblPaymentTypeOption4";
                    this.view.flxPaymentTypeOption4.accessibilityConfig = {
                        a11yARIA: {
                            "aria-required": true,
                            "aria-checked": true,
                            "role": "radio",
                            "aria-labelledby": "text"
                        },
                    };
                    this.view.tbxAmount0.setVisibility(true);
                    this.view.lblSelectedCurrencySymbol.setVisibility(false);
                    navManager.setCustomInfo("SelectedPaymentType", "Others");
                    this.view.tbxAmount0.text ="";
                    scope.enableContinueButton();
                    this.view.flxPaymentTypeOption4.text = "M";
                    this.view.flxPaymentTypeOption4.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption4.text = "M";
                    this.view.lblPaymentTypeOption4.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
                    this.view.lblPaymentTypeOption2.text = "L";
                    this.view.lblPaymentTypeOption2.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption3.text = "L";
                    this.view.lblPaymentTypeOption3.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                    this.view.lblPaymentTypeOption1.text = "L";
                    this.view.lblPaymentTypeOption1.skin = "ICSknLblRadioBtnUnelectedFontIcona0a0a020px";
                }
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "onPaymentMethodSelect",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        setBillPayFromAccount: function() {
            var scope = this;
            this.groupIdentifier = {
                "internal": {
                    "identifier": "accountTypeKey"
                },
                "segregation": {
                    "Checking": "Checking Account",
                    "CreditCard": "Credit Card Account",
                    "Deposit": "Deposit Account",
                    "Loan": "Loan Account",
                    "Savings": "Saving Account",
                    "default": "All Payees"
                }
            };
            this.view.flxFromAccountList0.onClick = function() {
                if (scope.view.lblConsenttypedropdown0.text == "P") {
                    scope.view.lblConsenttypedropdown0.text = "O";
                    scope.view.flxFromAccountSegment0.setVisibility(false);
                    scope.view.flxFromAccountTextBoxAndIcon0.skin = "sknFlxffffffBorderRoundedLeftRed";
                } else {
                    scope.view.lblConsenttypedropdown0.text = "P";
                    scope.view.flxFromAccountSegment0.setVisibility(true);
                    scope.view.flxFromAccountTextBoxAndIcon0.skin = "sknFlxffffffBorderRoundedLeftRedFocus";
                }
            };
            // this.view.lblHeader6.text = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
            this.view.segFromAccounts0.onRowClick = this.onFromAccountSelection0.bind(this);
            this.setFromAccountsList0(scope_configManager.userAccounts, "segFromAccounts0");
            this.setDefaultAccount0(scope_configManager.userAccounts);
        },
        onFromAccountSelection0: function() {
            var scope = this;
            try {
                var selectedRecord = this.view["segFromAccounts0"].selectedRowItems[0];
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("selectedAccountAccId", selectedRecord.lblRecordField4);
                navManager.setCustomInfo("selectedAccAvailableBalance", selectedRecord.lblRecordField2);
                navManager.setCustomInfo("accountName", selectedRecord.lblRecordField1);
                scope.view["flxClearFromText0"].setVisibility(false);
                scope.view["tbxFromAccount2"].setVisibility(false);
                scope.view["lblFromRecordField0"].setVisibility(true);
                scope.view["lblFromRecordFields0"].setVisibility(true);
                scope.view["tbxFromAccount2"].text = selectedRecord.lblRecordField1 || "";
                scope.view["lblFromRecordField0"].text = selectedRecord.lblRecordField1 || "";
                scope.view["lblFromRecordFields0"].text = selectedRecord.lblRecordField2 || "";
                scope.view.lblConsenttypedropdown0.text = "O";
                scope.view.flxFromAccountSegment0.setVisibility(false);
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "onFromAccountSelection2",
                    "error": err
                };
                //scope.onError(errorObj);
            }
        },
        setFromAccountsList0: function(collectionObj, segWidgetId) {
            this.collectionObj = collectionObj;
            var scope = this;
            try {
                scope.setAccountsSegmentTemplateAndWidgetMap(scope.view[segWidgetId]);
                var allAccounts = applicationManager.getAccountManager().getInternalAccounts();
				var segmentData = [];
                for (var i = 0; i < this.collectionObj.length; i++) {
                    if ((this.collectionObj[i].accountType === "Savings" || this.collectionObj[i].accountType === "Checking") && this.collectionObj[i].currencyCode == "NPR" && this.collectionObj[i].supportTransferFrom == "1") {
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].accountID);
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("accountname_id", account_name);
                        let amount = this.collectionObj[i].availableBalance;
                        let formattedAmount = scope.formatNumberWithCommas(amount); // To display amount in proper format
                        var Available_balance =applicationManager.getFormatUtilManager().convertAmountValue(this.collectionObj[i].availableBalance,this.collectionObj[i].currencyCode);// /*scope.getCurrencySymbol*/ (this.collectionObj[i].currencyCode) + " " + formattedAmount //scope.getFormattedAmount(this.collectionObj[i].availableBalance);
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("Account_balance", Available_balance);
                        var match = allAccounts.find(acc => acc.accountID === this.collectionObj[i].accountID);
						var accountTypeText = (match && match.description) ? match.description : this.collectionObj[i].accountType;
						var segData = {
                            lblRecordField1: account_name,
                            lblRecordField2: Available_balance,
                            lblRecordField3: accountTypeText,
							lblRecordField4: this.collectionObj[i].accountID,
							accountTypeKey: this.collectionObj[i].accountType
                        }
                        segmentData.push(segData);
                    }
                }
                this.view[segWidgetId].setData(segmentData);
                //var segData = scope.performSegmentDataMapping("segFromAccounts");
                var segData = segmentData;
                for (var i = 0; i < segData.length; i++) {
                    segData[i]["flxRecordFieldTypeIcon2"] = {
                        "isVisible": false
                    };
                    segData[i]["flxAccountsDropdownList"] = {
                        "height": "53dp"
                    };
                    segData[i]["flxAccountsDropdownListMobile"] = {
                        "height": "60dp"
                    };
                }
                //scope.FromRecords = segData;
                if (scope.groupIdentifier != undefined) {
                    scope.groupedFromRecords = scope.prepareAccountsSegmentData0(segmentData, "From");
                } else {
                    scope.groupedFromRecords = segData;
                }
                scope.view[segWidgetId].setData(scope.groupedFromRecords);
				if (scope.view.segFromAccounts0.data.length == 0) {
                    scope.showAccErrorPopup();
                }
                // scope.showLoadingIndicator(false, "From");
                //scope.setAccountsDropdownHeight("From");
                //scope.setFromAccount();
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "setFromAccountsList",
                    "error": err
                };
                //scope.onError(errorObj);
            }
        },
		showAccErrorPopup: function() {
            var scope = this;
            this.view.flxAlert.setVisibility(true);
            this.view.CustomAlertPopup.lblHeading.text ="";
            this.view.CustomAlertPopup.lblPopupMessage.text ="Dear Customer, We regret to inform you that you do not have any eligible accounts to access this feature. Kindly contact your nearest branch for further assistance and information";
            this.view.CustomAlertPopup.btnYes.text ="Ok";
            this.view.CustomAlertPopup.btnYes.onClick = function() {
                scope.view.flxAlert.setVisibility(false);
				scope.view.flxAlert.setVisibility(false);
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
                applicationManager.getPresentationUtility().showLoadingScreen();
                // kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule").presentationController.navigateToManageCards();
             }
			 this.view.CustomAlertPopup.flxCross.onClick = function() {
                scope.view.flxAlert.setVisibility(false);
                scope.view.flxAlert.setVisibility(false);
                var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "AuthenticationMA",
                    "moduleName": "AuthUIModule"
                });
                var navManager = applicationManager.getNavigationManager();
                var x = navManager.getCustomInfo('AuthParam');
                authModule.presentationController.postLoginCall(x);
                applicationManager.getPresentationUtility().showLoadingScreen();
            }
            this.view.CustomAlertPopup.btnNo.setVisibility(false);
        },
        prepareAccountsSegmentData0: function(recordsList, fieldType) {
            var scope = this;
            try {
                var data = [];
                var groupedRecordsList = this.groupAccountsData(recordsList);
                var types = Object.keys(groupedRecordsList);
                if (types.length != 0) {
                    for (var i = 0; i < types.length; i++) {
                        var displayText;
                        if (types[i] != "undefined") {
                            displayText = this.groupIdentifier["segregation"][types[i]];
                        } else {
                            displayText = this.groupIdentifier["segregation"]["default"];
                        }
                        if (displayText != undefined) {
                            displayText = types[i];
                        }
                        data[i] = [{
                                "lblRecordType": {
                                    "text": displayText + " (" + groupedRecordsList[types[i]].length + ")"
                                },
                                "lblDropdownIcon": {
                                    "text": "P",
                                    "accessibilityConfig": {
                                        "a11yHidden": true
                                    }
                                },
                                "flxDropdownIcon": {
                                    "onClick": scope.showOrHideAccountSection2.bind(scope, fieldType)
                                }
                            },
                            groupedRecordsList[types[i]]
                        ]
                    }
                }
                return data;
            } catch (err) {
                var errorObj = {
                    "level": "ComponentController",
                    "method": "prepareAccountsSegmentData",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        setDefaultAccount0: function(userAccounts) {
            var scope = this;
            var configManager = applicationManager.getConfigurationManager();
            this.view.flxFromAccountList2.setVisibility(true);
            var navManager = applicationManager.getNavigationManager();
            var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0].accountID;
            for (i = 0; i < userAccounts['length']; i++) {
                if (defaultPrimaryAccount == userAccounts[i].accountID ) {
                    if((userAccounts[i].accountType === "Savings" || userAccounts[i].accountType === "Checking") && /*userAccounts[i].currencyCode == "NPR" &&*/ userAccounts[i].supportTransferFrom == "1"){
                        var account_name = CommonUtilities.mergeAccountNameNumber(this.collectionObj[i].nickName || this.collectionObj[i].accountName, this.collectionObj[i].accountID);
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("accountname_id", account_name);
                        var Available_balance = applicationManager.getFormatUtilManager().convertAmountValue(userAccounts[i].availableBalance,userAccounts[i].currencyCode );
                        var navManager = applicationManager.getNavigationManager();
                        navManager.setCustomInfo("Account_balance", Available_balance);
                        scope.view["lblFromRecordField0"].setVisibility(true);
                        scope.view["lblFromRecordFields0"].setVisibility(true);
                        scope.view["lblFromRecordField0"].text = account_name || "";
                        scope.view["lblFromRecordFields0"].text = Available_balance || "";
                        navManager.setCustomInfo("selectedCardBillPayAccountAccId", userAccounts[i].accountID);
						navManager.setCustomInfo("accountName", account_name);
                        break;
                    }else if(scope.view.segFromAccounts0.data.length != 0) {
                        var acc =this.view.segFromAccounts0.data[0];
                        var accData =acc[1];   
                        scope.view["lblFromRecordField0"].setVisibility(true);
                        scope.view["lblFromRecordFields0"].setVisibility(true);
                        scope.view["lblFromRecordField0"].text = accData[0].lblRecordField1 || "";
                        scope.view["lblFromRecordFields0"].text = accData[0].lblRecordField2 || "";
                        navManager.setCustomInfo("selectedCardBillPayAccountAccId", accData[0].lblRecordField4);
                    }
                    
                }
            }
            // var configManager = applicationManager.getConfigurationManager();
            // var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
            //  var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            //  "appName": "TransfersMA",
            //  "moduleName": "ManageActivitiesUIModule"
            //  });
            // ManageActivitiesPresenter.getAccListDetails(userName);
        },
		isEmptyNullOrUndefined: function(val) {
			if (val == null || val == undefined || val == "" || val == [])
				return true;
			else
				return false;
		}

	};
});