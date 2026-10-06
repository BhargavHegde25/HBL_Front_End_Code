define(['CommonUtilities'],function(CommonUtilities){
    return{
	LANGUAGEFLAG:"",
	EMVQR_PARAMS:"",
	/* Card management. Unset leaves every card on a 4 digit PIN and the transaction
	   window on its 30 day fallback - see CardsManager getCardPinLength / getCardTransactionDateRange. */
	CARD_PIN_LENGTH_6_BINS:"",
	CARD_TRANSACTION_DAYS:"",
	/* "true" shows the login performance popup. Anything else, or unset, keeps it hidden. */
	SHOW_PERF_POPUP:"",
	/* Login deferral experiment. "true" moves that call off the login critical path to a couple of
	   seconds after the dashboard paints. Anything else, or unset, keeps today's behaviour.
	   These are measurement scaffolding - once the winning behaviour is known, make it
	   unconditional and delete the flags rather than leaving three switches over login sequencing. */
	LOGIN_DEFER_NOTIFICATIONS:"",
	LOGIN_DEFER_DEVICE_TRACKING:"",
	LOGIN_DEFER_LOCKOUT_SETTINGS:"",
	/* "false" hides the Alerts section in Settings and stops its category service being called.
	   Default is true - absent or unreadable leaves the section as it is today. */
	SHOW_ALERTS_IN_SETTINGS:"",
	/* "true" sends the dashboard accounts call as soon as the login response names
	   the dashboard variant, instead of queueing it behind the post login services.
	   Absent or anything else keeps today's ordering. */
	LOGIN_PREFETCH_ACCOUNTS:"",
	/* Login performance phase 1 (mobile login component).
	   LOGIN_PREWARM: anonymous app login + connection warm-up when the login screen opens, and loading
	   of the Dashboard modules while the password is typed. Default ON - "false" switches it off.
	   LOGIN_PREVALIDATE_USER: runs ValidateUserDeviceLogin when the user moves to the password field and
	   reuses a successful result on tap for the same username within 60 s. Default OFF - "true" enables it. */
	LOGIN_PREWARM:"",
	LOGIN_PREVALIDATE_USER:"",
	/* Login performance phase 2. "true" starts the post-login calls right after DbxUserLogin, in parallel
	   with getUserAttributes. Default OFF - enable only after the backend confirms no dependency. */
	LOGIN_PARALLEL_WAVE:"",
	/* "true": the Dashboard is kept between visits (not rebuilt each time) and its freshly loaded account
	   list is reused once by the first "View all" / Transfers action. Default OFF. */
	DASHBOARD_REUSE:"",
	/* "true": after login the Dashboard opens straight away with a saved, encrypted summary of the default
	   account (name, masked number, type - no balance) and refreshes when the accounts load. Default OFF;
	   enable only after product and security sign-off. */
	LOGIN_INSTANT_DASHBOARD:"",
	/* FonePay QR. Read by frmQRScanController.readFonepayFlag. The two consumers take opposite
	   defaults on purpose: the scan rail runs unless this is an explicit "false" (the server gate
	   is authoritative), while the FonePay badge on the scanner strip shows only on an explicit
	   "true", so an unset property never advertises the rail. Declared here so
	   getConfigurationValue("FONEPAY_QR_ENABLED") resolves instead of returning undefined. */
	FONEPAY_QR_ENABLED:"",
	/* Modern-design extension point - remove with DesignResolver.js */
	UI_DESIGN:"",
	HAM_APPROVAL_REQUEST:"",
	HAM_SEND_MONEY:"",
	HAM_TRANSFERS:"",
	HAM_ACCOUNT_SWEEP:"",
	HAM_CHECK_DEPOSITS:"",
	NO_OF_CHEQUE_LEAVES:"",
	MIN_AMT_STRUCTURE_FD:"",
	MB_UI_MOCK_SUCCESS:"",
	MB_CARDLESS_MAX_LIMIT:"",
	ESEWA_TOPUP_PAYABLE_ACCOUNT:"",
	ESEWA_PURPOSE:"",
	HIMAL_FD_ACCOUNT_CODES:"",
    locale : {
      'US-English': 'en_US',
      'UK-English': 'en_GB',
      Spanish: 'es_ES',
      German: 'de_DE',
      French: 'fr_FR',
      'Arabic': 'ar_AE',
      'Nepali': 'ne_NP'
    },
    frontendDateFormat : {
      en_US: 'm/d/Y',
      en_GB: 'd/m/Y',
      es_ES: 'd/m/Y',
      de_DE: 'd.m.Y',
      fr_FR: 'd/m/Y',
      sv_SE: 'Y-m-d',
      ar_AE: 'd/m/Y',
      ne_NP: 'm/d/Y'
    },
    termsAndConditions : {
      "Login" : 'Login_TnC',
      "Enroll" : 'Enroll_TnC',
      "EStatements":"Estatements_TnC",
      "Hamburger" : "Common_TnC",
      "Footer" : "Common_TnC",
      "BillPayment" : "BillPay_TnC",
      "QRPayment":"QRPayment_Activation_TnC",
      "NAO" : "Origination_TnC",
      "CardLock" : "LockCard_TnC",
      "CardCancel" : "CancelCard_TnC",
      "SEPA_TnC":"SEPA_TnC",
      "OnlineBankingAccess" : "OnlineBanking_Access_TnC",
      "AccountAggregation" : "AccountAggregation_TnC",
      "OpenNewAccount":"Origination_TnC",
      "de_DE":"de-DE",
      "en_GB":"en-GB",
      "en_US":"en-US",
      "es_ES":"es-ES",
      "fr_FR":"fr-FR",
      "it_IT":"it-IT",
      "sv_SE":"sv-SE",
      "ar_AE":"ar-AE",
      "ne_NP":"ne_NP"
    },
    setExchangerateURL : function (ExchangerateURL) {
      scope_configManager.ExchangerateURL = ExchangerateURL;
    },
    getExchangerateURL : function () {
      return this.ExchangerateURL;
    },
    setDepositRateURL : function (DepositRateURL) {
      scope_configManager.DepositRateURL = DepositRateURL;
    },
    getDepositrateURL : function () {
      return this.DepositRateURL;
    },
    setLoanrateURL : function (LoanrateURL) {
      scope_configManager.LoanrateURL = LoanrateURL;
    },
    getLoanrateURL : function () {
      return this.LoanrateURL;
    },
    setBranchReference: function(BranchIdReference){
      scope_configManager.BranchIdReference=BranchIdReference;
    },
    getBranchReference: function(){
      return this.BranchIdReference;
    },
    setPaperStatementStatus: function(PaperStatementStatus){
      scope_configManager.PaperStatementStatus=PaperStatementStatus;
    },
    getPaperStatementStatus: function(){
      return this.PaperStatementStatus;
    },
    setCorporateOffice : function (CorporateOffice) {
      scope_configManager.CorporateOffice = CorporateOffice;
    },
    getCorporateOffice : function () {
      return this.CorporateOffice;
    },
	setCardEstimatedDeliveryTime : function (cardEstimatedDeliveryTime) {
      scope_configManager.cardEstimatedDeliveryTime = cardEstimatedDeliveryTime;
    },
    getCardEstimatedDeliveryTime : function () {
      return this.cardEstimatedDeliveryTime;
    },
    setCardPaymentDueDate : function (cardPaymentDueDate) {
      scope_configManager.cardPaymentDueDate = cardPaymentDueDate;
    },
    getCardPaymentDueDate : function () {
      return this.cardPaymentDueDate;
    },
    setEligibleDaysForCardDisputeTransaction : function (eligibleDaysForCardDisputeTransaction) {
      scope_configManager.eligibleDaysForCardDisputeTransaction = eligibleDaysForCardDisputeTransaction;
    },
    getEligibleDaysForCardDisputeTransaction : function () {
      return this.eligibleDaysForCardDisputeTransaction;
    },
    setEligibleDaysForCardsTransactionConvertEmi : function (eligibleDaysForCardsTransactionConvertEmi) {
      scope_configManager.eligibleDaysForCardsTransactionConvertEmi = eligibleDaysForCardsTransactionConvertEmi;
    },
    getEligibleDaysForCardsTransactionConvertEmi : function () {
      return this.eligibleDaysForCardsTransactionConvertEmi;
    },
    setDisablePaperStatement : function (disablePaperStatement) {
      scope_configManager.disablePaperStatement = disablePaperStatement;
    },
    getDisablePaperStatement : function () {
      return this.disablePaperStatement;
    },
    setHideThemeMB : function (mbHideTheme) {
      scope_configManager.mbHideTheme = mbHideTheme;
    },
    getHideThemeMB : function () {
      return this.mbHideTheme;
    },
    setMaxAmountForEmiEligible : function (MaxAmountForEmiEligible) {
      scope_configManager.MaxAmountForEmiEligible = MaxAmountForEmiEligible;
    },
    getMaxAmountForEmiEligible : function () {
      return this.MaxAmountForEmiEligible;
    },
	setPhysicalPrepaidCardFee : function (physicalPrepaidCardFee) {
      scope_configManager.physicalPrepaidCardFee = physicalPrepaidCardFee;
    },
    getPhysicalPrepaidCardFee : function () {
      return this.physicalPrepaidCardFee;
    },
	setVirtualPrepaidCardFee : function (virtualCardFee) {
      scope_configManager.virtualCardFee = virtualCardFee;
    },
    getVirtualPrepaidCardFee : function () {
      return this.virtualCardFee;
    },
    setCardPaymentPayableAccNo : function (cardPaymentPayableAccNo) {
      scope_configManager.cardPaymentPayableAccNo = cardPaymentPayableAccNo;
    },
    getCardPaymentPayableAccNo : function () {
      return this.cardPaymentPayableAccNo;
    },
    setCardTopUpPayableAccNo : function (topUpPayableAccNo) {
      scope_configManager.topUpPayableAccNo = topUpPayableAccNo;
    },
    getCardTopUpPayableAccNo : function () {
      return this.topUpPayableAccNo;
    },
	setCardTopUpPayableAccName : function (topUpPayableAccName) {
      scope_configManager.topUpPayableAccName = topUpPayableAccName;
    },
    getCardTopUpPayableAccName : function () {
      return this.topUpPayableAccName;
    },
	setDollarCardTopupVisibility : function (dollarCardTopupVisibility) {
      scope_configManager.dollarCardTopupVisibility = dollarCardTopupVisibility;
    },
    getDollarCardTopupVisibility : function () {
      return this.dollarCardTopupVisibility;
    },
	setPrepaidCardTopupVisibility : function (prepaidCardTopupVisibility) {
      scope_configManager.prepaidCardTopupVisibility = prepaidCardTopupVisibility;
    },
    getPrepaidCardTopupVisibility : function () {
      return this.prepaidCardTopupVisibility;
    },
    setLockCardStatus : function (lockCardStatus) {
      scope_configManager.lockCardStatus = lockCardStatus;
    },
    getLockCardStatus : function () {
      return this.lockCardStatus;
    },
    setResetPinEstimatedTime : function (resetPinTime) {
      scope_configManager.resetPinTime = resetPinTime;
    },
    getResetPinEstimatedTime : function () {
      return this.resetPinTime;
    },
    getNormalFDMinAmt : function () {
      return this.normalFDMinAmt;
    },
    setNormalFDMinAmt : function (normalFDMinAmt){
      scope_configManager.normalFDMinAmt = normalFDMinAmt;
    },
    getHimalRemitMinAmt : function () {
      return this.himalRemitMinAmt;;
    },
    setHimalRemitMinAmt : function (himalRemitMinAmt){
      scope_configManager.himalRemitMinAmt = himalRemitMinAmt;
    },
    getStructureFDMinAmt : function () {
      return this.structureFDMinAmt;
    },
    setStructureFDMinAmt : function (structureFDMinAmt){
      scope_configManager.structureFDMinAmt = structureFDMinAmt;
    },
    setReportLostCardStatus : function (reportLostCardStatus) {
      scope_configManager.reportLostCardStatus = reportLostCardStatus;
    },
    getReportLostCardStatus : function () {
      return this.reportLostCardStatus;
    },
    setActivateCardStatus : function (activateCardStatus) {
      scope_configManager.activateCardStatus = activateCardStatus;
    },
    getActivateCardStatus : function () {
      return this.activateCardStatus;
    }, 
	setExpiredCardsValidityDisplay : function (expiredCardsValidityDisplay) {
      scope_configManager.expiredCardsValidityDisplay = expiredCardsValidityDisplay;
    },
    getExpiredCardsValidityDisplay : function () {
      return this.expiredCardsValidityDisplay;
    }, 
	setInActiveCardStatus : function (inActiveCardStatus) {
      scope_configManager.inActiveCardStatus = inActiveCardStatus;
    },
    getInActiveCardStatus : function () {
      return this.inActiveCardStatus;
    },
    setEnableLanguageStatus : function (enableLanguageStatus) {
      scope_configManager.enableLanguageStatus = enableLanguageStatus;
    },
    getEnableLanguageStatus : function () {
      return this.enableLanguageStatus;
    },
	setExpiredCardStatus : function (expiredCardStatus) {
      scope_configManager.expiredCardStatus = expiredCardStatus;
    },
    getExpiredCardStatus : function () {
      return this.expiredCardStatus;
    },
    setEmiTenureMonth : function (cardEmiTenureMonth) {
      scope_configManager.cardEmiTenureMonth = cardEmiTenureMonth;
    },
    getEmiTenureMonth : function () {
      return this.cardEmiTenureMonth;
    },
    setHblCopyRight : function (hblCopyRight) {
      scope_configManager.hblCopyRight = hblCopyRight;
    },
    getHblCopyRight : function () {
      return this.hblCopyRight;
    },
    setEmiInterestDate : function (cardEmiInterestDate) {
      scope_configManager.cardEmiInterestDate = cardEmiInterestDate;
    },
    getEmiInterestDate : function () {
      return this.cardEmiInterestDate;
    },
    setDebtorAgentBranchId : function (debtorAgentBranchId) {
      scope_configManager.debtorAgentBranchId = debtorAgentBranchId;
    },
    getDebtorAgentBranchId : function () {
      return this.debtorAgentBranchId;
    },
    setDebtorAgentBankIdValue : function (DebtorAgentBankId) {
      scope_configManager.DebtorAgentBankId = DebtorAgentBankId;
    },
    getDebtorAgentBankIdValue : function () {
      return this.DebtorAgentBankId;
    },
    setNPI_BILLERS_URL : function (NPI_BILLERS_URL) {
      scope_configManager.NPI_BILLERS_URL = NPI_BILLERS_URL;
    },
    getNPI_BILLERS_URL : function () {
      return this.NPI_BILLERS_URL;
    },
    setCustomerSupport1phone : function (CustomerSupport1phone) {
      scope_configManager.CustomerSupport1phone = CustomerSupport1phone;
    },
    getCustomerSupport1phone : function () {
      return this.CustomerSupport1phone;
    },
    setNoOfChequeLeaves : function (NoOfChequeLeaves) {
      scope_configManager.NoOfChequeLeaves = NoOfChequeLeaves;
    },
    getNoOfChequeLeaves : function () {
      return this.NoOfChequeLeaves;
    },
    setBillPayActivationMessage : function (activationMessage) {
      scope_configManager.activationMessage = activationMessage;
    },
    getBillPayActivationMessage : function () {
      return this.activationMessage;
    },
    setEnrollKYCMessage : function (message) {
      scope_configManager.message = message;
    },
    getEnrollKYCMessage : function () {
      return this.message;
    },
    setCustomerSupport2phone : function (CustomerSupport2phone) {
      scope_configManager.CustomerSupport2phone = CustomerSupport2phone;
    },
    getCustomerSupport2phone : function () {
      return this.CustomerSupport2phone;
    },
    setCustomerSupport3phone : function (CustomerSupport3phone) {
      scope_configManager.CustomerSupport3phone = CustomerSupport3phone;
    },
    getCustomerSupport3phone : function () {
      return this.CustomerSupport3phone;
    },
    setCustomerSupport1Email : function (CustomerSupport1Email) {
      scope_configManager.CustomerSupport1Email = CustomerSupport1Email;
    },
    getCustomerSupport1Email : function () {
      return this.CustomerSupport1Email;
    },
    setCustomerSupport2Email : function (CustomerSupport2Email) {
      scope_configManager.CustomerSupport2Email = CustomerSupport2Email;
    },
    getCustomerSupport2Email : function () {
      return this.CustomerSupport2Email;
    },
    setCustomerSupport3Email : function (CustomerSupport3Email) {
      scope_configManager.CustomerSupport3Email = CustomerSupport3Email;
    },
    getCustomerSupport3Email : function () {
      return this.CustomerSupport3Email;
    },
    setContactUsBanner : function (ContactUsBanner) {
      scope_configManager.ContactUsBanner = ContactUsBanner;
    },
    setCardStatusInActive : function (cardStatusInActive) {
      scope_configManager.cardStatusInActive = cardStatusInActive;
    },
    getCardStatusInActive : function () {
      return this.cardStatusInActive;
    },
    setPrepaidDomesticCardsTopupVisibilityMB : function (prepaidDomesticCardsTopupVisibilityMB) {
      scope_configManager.prepaidDomesticCardsTopupVisibilityMB = prepaidDomesticCardsTopupVisibilityMB;
    },
    getPrepaidDomesticCardsTopupVisibilityMB : function () {
      return this.prepaidDomesticCardsTopupVisibilityMB;
    },
    setPrepaidDollarCardsTopupVisibilityMB : function (prepaidDollarCardsTopupVisibilityMB) {
      scope_configManager.prepaidDollarCardsTopupVisibilityMB = prepaidDollarCardsTopupVisibilityMB;
    },
    getPrepaidDollarCardsTopupVisibilityMB : function () {
      return this.prepaidDollarCardsTopupVisibilityMB;
    },
    setCreditCardPaymentVisibilityMB : function (creditCardPaymentVisibilityMB) {
      scope_configManager.creditCardPaymentVisibilityMB = creditCardPaymentVisibilityMB;
    },
    getCreditCardPaymentVisibilityMB : function () {
      return this.creditCardPaymentVisibilityMB;
    },
	
	getContactUsBanner : function () {
      return this.ContactUsBanner;
        },
        fetchApplicationProperties: function (presentationSuccess, presentationError) {
            checkAppinit = false;
            var self = this;
            var applicationRepo = kony.mvc.MDAApplication.getSharedInstance()
                .getRepoManager()
                .getRepository("Application");
            var deviceInfo = applicationManager.getDeviceUtilManager().getDeviceInfo();
            var options = {
                OSType: deviceInfo.name,
                OSversion: deviceInfo.version,
                AppVersion: appConfig.appVersion,
            };
            applicationRepo.save(options, applicationRepoCompletionCallBack);
            function applicationRepoCompletionCallBack(status, data, error) {
                var srh = applicationManager.getServiceResponseHandler();
                var res = srh.manageResponse(status, data, error);
                // res=JSON.parse(res);
                if (res["status"]) {

                    var config = applicationManager.getConfigurationManager();
					if(res["data"].upgrade && res["data"].upgrade.toUpperCase()=="OPTIONAL"){
						
								var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.mb.upgrade.title"),
      "message": kony.i18n.getLocalizedString("i18n.mb.upgrade.optional"),
      "alertHandler": self.alertCallback.bind(self),
      "yesLabel": kony.i18n.getLocalizedString("i18n.mb.upgrade.title"),
      "noLabel": kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    
    applicationManager.getPresentationUtility().CustomAlert(basicConfig, pspConfig, custConfig);   
	
					}
					else if(res["data"].upgrade && res["data"].upgrade.toUpperCase()=="MANDATORY"){
						kony.application.getCurrentForm().onDeviceBack=function(){};
						var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.mb.upgrade.title"),
      "message": kony.i18n.getLocalizedString("i18n.mb.upgrade.mandatory"),
      "alertHandler": self.alertCallback.bind(self),
      "yesLabel": kony.i18n.getLocalizedString("i18n.mb.upgrade.title"),
      "noLabel": ""
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
	
    applicationManager.getPresentationUtility().CustomAlert(basicConfig, pspConfig, custConfig);   
	
					}
					else {
						
					}
                    self.setConfigurationValue(
                        "androidPhoneNativeAppLink",
                        res["data"].playStoreLink
                    );
                    self.setConfigurationValue(
                        "iphoneNativeAppLink",
                        res["data"].appStoreLink
                    );
					 self.setConfigurationValue(
                        "storeURL",
                        res["data"].storeURL
                    );
                    self.setConfigurationValue("BANNER_IMAGE", res["data"].bannerImageURL);
                    self.setConfigurationValue("DESKTOP_BANNER_IMAGE", res["data"].desktopBannerImageURL);
                    self.setConfigurationValue("MOBILE_BANNER_IMAGE", res["data"].mobileBannerImageURL);
                    self.setConfigurationValue("LINK_TO_DBX", res["data"].viewMoreDBXLink);
                    config.configurations.setItem("SecondTimeRating", res["data"].noOfDaysForAnotherAttemptForRating);
                    config.configurations.setItem("FirstTransactionRating", res["data"].noOfDaysForRatingFromTransactions);
                    config.configurations.setItem("FirstProfileRating", res["data"].noOfDaysForRatingFromProfile);
                    config.configurations.setItem("NumberoftimesforRating", res["data"].maxtimesFeedbackperversion);
                    config.configurations.setItem("MajorVersionforRating", res["data"].majorVersionsForFeedback);
                    config.configurations.setItem("isPostLoginAdsEnabled", res["data"].showAdsPostLogin);
                    config.configurations.setItem("BANNER_URL", res["data"].bannerURL);
                    config.configurations.setItem("BANKNAME", res["data"].bankName);
                    config.configurations.setItem("BUSINESSDAYS", res["data"].businessDays);
                    config.configurations.setItem("OCRAPIKEY", res["data"].ocrApiKey);
                    config.configurations.setItem("OCRSECRETKEY", res["data"].ocrSecretKey);
                    config.configurations.setItem("isAccountCentricCore", res["data"].isAccountCentricCore);
                    config.configurations.setItem("isSingleEntity", res["data"].isSingleEntity);
                    config.configurations.setItem("cardStatementYears", res["data"].cardStatementYears ? res["data"].cardStatementYears : 1);
                    config.configurations.setItem(
                        "FACIALLICENSESTRING",
                        res["data"].facialLicenseString
                    );
                    config.configurations.setItem(
                        "FACIALLICENSESERVERURL",
                        res["data"].facialLicenseServerUrl
                    );
                    config.configurations.setItem(
                        "ISUPDATEMANDATORY",
                        res["data"].isUpdateMandatory
                    );
                    config.configurations.setItem("ISUPDATE", res["data"].isUpdate);
                    config.configurations.setItem(
                        "ISLANGUAGESELECTION",
                        res["data"].isLanguageSelectionEnabled
                    );
                    config.configurations.setItem(
                        "ISBACKENDCURRENCYSYMBOLENABLED",
                        res["data"].isBackEndCurencySymbolEnabled
                    );
                    config.configurations.setItem(
                        "ISCOUNTRYCODEENABLED",
                        res["data"].isCountryCodeEnabled
                    );
                    config.configurations.setItem(
                        "ISSORTCODEVISIBLE",
                        res["data"].isSortCodeVisible
                    );
                    config.configurations.setItem(
                        "ISUTCDATEFORMATTINGENABLED",
                        res["data"].isUTCDateFormattingEnabled
                    );
                    config.configurations.setItem(
                        "isAlertAccountIDLevel",
                        res["data"].isAlertAccountIDLevel
                    );
                    config.configurations.setItem(
                        "DEPLOYMENTGEOGRAPHY",
                        res["data"].deploymentGeography
                    );
                    if (res["data"].isprofileImageAvailable !== undefined) {
                        config.configurations.setItem(
                            "isprofileImageAvailable",
                            res["data"].isprofileImageAvailable
                        );
                    }
                    config.configurations.setItem("BASECURRENCY", res["data"].currencyCode);
                    config.configurations.setItem(
                        "ISBUSINESSBANKINGENABLED",
                        res["data"].isBusinessBankingEnabled
                    );
                    config.configurations.setItem("timeZoneOffset", res["data"].timeZoneOffset);
                    if (res["data"].isFeedbackEnabled !== undefined) {
                        config.configurations.setItem(
                            "isFeedbackEnabled",
                            res["data"].isFeedbackEnabled
                        );
                        config.configurations.setItem(
                            "showFeedBackPostLogout",
                            res["data"].isFeedbackEnabled
                        );
                    }
                    if (res["data"].isAccountAggregationEnabled !== undefined) {
                        self.isAggregatedAccountsEnabled =
                            res["data"].isAccountAggregationEnabled;
                        self.AggregatedExternalAccountEnabled =
                            res["data"].isAccountAggregationEnabled === "true" ? true : false;
                    }
                    if (res["data"].stopReasons !== undefined) {
                        config.configurations.setItem(
                            "stopReasons",
                            config.getStopReasonsList(JSON.parse(res.data.stopReasons)));
                        }
                    if (res["data"].currenciesSupported !== undefined) {
                        config.configurations.setItem(
                            "currenciesSupported",
                            config.getCurrenciesList(
                                res["data"].currenciesSupported
                            )
                        );
                    }
                    if (res["data"].currencyCode !== undefined) {
                        if (config.currencyCode[res["data"].currencyCode]) {
                            config.configurations.setItem(
                                "CURRENCYCODE",
                                config.currencyCode[res["data"].currencyCode]
                            );
                        } else {
                            config.configurations.setItem(
                                "CURRENCYCODE",
                                res["data"].currencyCode
                            );
                        }
                    } else {
                        config.configurations.setItem("CURRENCYCODE", "USD");
                    }
                    if (res["data"].bwFileTransactionsLimit !== undefined) {
                        self.bulkWireFileTransactionsLimit = res["data"].bwFileTransactionsLimit;
                    }
                    // TODO: Review/check once Engage Customer 360 config flag is ready.
                    if (res["data"].isEngageEnabled !== undefined) {
                        self.EngageEnabled = res["data"].isEngageEnabled;
                    }
                    config.setLocaleAndDateFormat(res);
                    if (res["data"].deploymentGeography == "EUROPE" && !(scope_configManager.isCombinedUser === "true")) {
                        scope_configManager.isFastTransferEnabled = "false";
                        scope_configManager.fastTransfersFlowEnabled = "false";
                    }
                    //applicationManager.getPresentationUtility().dismissLoadingScreen();
                    presentationSuccess(res["data"]);
					
                } else {
                    // alert("An error occured in fetch application properties" + res["errmsg"]);
                    presentationError(res["errmsg"]);
                }
            }
        },
		alertCallback: function(response) {
			try{
        var scope = this;
        //var navMan = applicationManager.getNavigationManager();
        if (response) {
          kony.application.openURL(scope.storeURL); 
		  if(applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone"){
		  kony.timer.schedule("1", scope.timercallback.bind(scope), 4, false);
		  }
		  else{
		  kony.application.exit();
		  }
        } else {
           
        }
			}catch(e){
				kony.print("error in alertCallback"+e);
			}
    },
	timercallback:function(){
		try{
			kony.application.exit();
			kony.timer.cancel("1");
		}catch(e){
			kony.print("error in timercallback"+e);
		}
	},
		getCalendarDateFormat : function() {
    var dummy;
    var locale = this.getLocale();
	if(!locale){
		locale="en";
	}
    locale = locale.toLowerCase();
    locale = locale.replace('_', '-');
    if (locale == 'en-us' || locale == 'en' || locale == 'ar-ae') {
      dummy = 'MM/DD/YYYY';
    } else if (locale == 'en-gb' || locale == 'fr-fr' || locale == 'es-es') {
      dummy = 'DD/MM/YYYY';
    } else if (locale == 'de-de') {
      dummy = 'DD.MM.YYYY';
    } else if (locale == 'sv-se') {
      dummy = 'YYYY-DD-MM';
    }
    return dummy;
  },
  fetchClientSideConfigurations : function(){
    var scope = this;
    var KNYMobileFabric = kony.sdk.getCurrentInstance();
    var config = KNYMobileFabric.getConfigurationService();
    config.getAllClientAppProperties(function(res) {
      kony.print("client key value pairs retrieved : " + JSON.stringify(res));
      if(res && res["S2M_CARD_TOPUP_PAYABLE_ACCNOUNT_NO"]){
        scope_configManager.setCardTopUpPayableAccNo(res["S2M_CARD_TOPUP_PAYABLE_ACCNOUNT_NO"]);
      }
      if(res && res["S2M_CARD_PAYMENT_PAYABLE_ACCNOUNT_NO"]){
        scope_configManager.setCardPaymentPayableAccNo(res["S2M_CARD_PAYMENT_PAYABLE_ACCNOUNT_NO"]);
      }
	  if(res && res["S2M_CARD_TOPUP_PAYABLE_ACCNOUNT_NAME"]){
        scope_configManager.setCardTopUpPayableAccName(res["S2M_CARD_TOPUP_PAYABLE_ACCNOUNT_NAME"]);
      }
	  if(res && res["DOLLAR_CARD_TOPUP_VISIBILITY"]){
        scope_configManager.setDollarCardTopupVisibility(res["DOLLAR_CARD_TOPUP_VISIBILITY"]);
      }
	   if(res && res["PREPAID_CARD_TOPUP_VISIBILITY"]){
        scope_configManager.setPrepaidCardTopupVisibility(res["PREPAID_CARD_TOPUP_VISIBILITY"]);
      }
      if(res && res["STATUS_LOCK_CARD"]){
        scope_configManager.setLockCardStatus(res["STATUS_LOCK_CARD"]);
      }
      if(res && res["STATUS_REPORT_LOST_CARD"]){
        scope_configManager.setReportLostCardStatus(res["STATUS_REPORT_LOST_CARD"]);
      }
      if(res && res["STATUS_ACTIVATE_CARD"]){
        scope_configManager.setActivateCardStatus(res["STATUS_ACTIVATE_CARD"]);
      }
	  if(res && res["STATUS_EXPIRED_CARD"]){
        scope_configManager.setExpiredCardStatus(res["STATUS_EXPIRED_CARD"]);
      }
      if(res && res["STATUS_INACTIVE_CARD"]){ 
        scope_configManager.setInActiveCardStatus(res["STATUS_INACTIVE_CARD"]);
      }
	  if(res && res["EXPIRED_CARDS_VALIDITY_DISPLAY"]){ 
        scope_configManager.setExpiredCardsValidityDisplay(res["EXPIRED_CARDS_VALIDITY_DISPLAY"]);
      }
	  
      if(res && res["CARD_EMI_INSTA_NUMBER"]){
        scope_configManager.setEmiTenureMonth(res["CARD_EMI_INSTA_NUMBER"]);
      }
      if(res && res["HBL_COPY_RIGHTS"]){
        scope_configManager.setHblCopyRight(res["HBL_COPY_RIGHTS"]);
      }
      if(res && res["CARD_EMI_INTREST_RATE"]){
        scope_configManager.setEmiInterestDate(res["CARD_EMI_INTREST_RATE"]);
      }
      if(res && res["MIN_ELIGIBLE_AMT_NORMAL_FD"]){
        scope_configManager.setNormalFDMinAmt(res["MIN_ELIGIBLE_AMT_NORMAL_FD"]);
      }
      if(res && res["MIN_ELIGIBLE_AMT_HIMAL_FD"]){
        scope_configManager.setHimalRemitMinAmt(res["MIN_ELIGIBLE_AMT_HIMAL_FD"]);
      }
      if(res && res["MIN_ELIGIBLE_AMT_STRUCTURE_FD"]){
        scope_configManager.setStructureFDMinAmt(res["MIN_ELIGIBLE_AMT_STRUCTURE_FD"]);
      }
      if(res && res["RESET_PIN_ESTIMATED_TIME"]){
        scope_configManager.setResetPinEstimatedTime(res["RESET_PIN_ESTIMATED_TIME"]);
      }
      if(res && res["DBP_ONBOARDING_URL"]){
        scope_configManager.setOnBoardingAppDirectionURL(res["DBP_ONBOARDING_URL"]);
      }
	    if(res && res["EMBED_ORIGINATION"]){
        scope_configManager.setEmbeddedOriginationType(res["EMBED_ORIGINATION"]);
      }
      if (res && res["CLIENT_MAP_KEY"]) {
        scope_configManager.mapKey=res["CLIENT_MAP_KEY"];
      }
      if (res && res["TRANSACTIONS_COUNT"]) {
        scope_configManager.transactionsCount = parseInt(res["TRANSACTIONS_COUNT"]);
      }
      if (res && res["EXPLORE_PRODUCTS_URL"]) {
        scope_configManager.setExploreProductsUrl(res["EXPLORE_PRODUCTS_URL"]);
      }
      if (res && res["RESUME_APPLICATION_URL"]) {
        scope_configManager.setResumeApplUrl(res["RESUME_APPLICATION_URL"]);
      }
	  if (res && res["HAM_APPROVAL_REQUEST"]) {
        scope_configManager.HAM_APPROVAL_REQUEST=(res["HAM_APPROVAL_REQUEST"]);
      }
	 if (res && res["ENABLE_LANGUAGE_SWITCH"]) {
        scope_configManager.LANGUAGEFLAG=(res["ENABLE_LANGUAGE_SWITCH"]);
      }
	  if (res && res["EMVQR_PARAMS"]) {
        scope_configManager.EMVQR_PARAMS=(res["EMVQR_PARAMS"]);
      }
	  if (res && res["CARD_PIN_LENGTH_6_BINS"]) {
        scope_configManager.CARD_PIN_LENGTH_6_BINS=(res["CARD_PIN_LENGTH_6_BINS"]);
      }
	  if (res && res["CARD_TRANSACTION_DAYS"]) {
        scope_configManager.CARD_TRANSACTION_DAYS=(res["CARD_TRANSACTION_DAYS"]);
      }
	  if (res && res["SHOW_PERF_POPUP"]) {
        scope_configManager.SHOW_PERF_POPUP=(res["SHOW_PERF_POPUP"]);
      }
	  if (res && res["LOGIN_DEFER_NOTIFICATIONS"]) {
        scope_configManager.LOGIN_DEFER_NOTIFICATIONS=(res["LOGIN_DEFER_NOTIFICATIONS"]);
      }
	  if (res && res["LOGIN_DEFER_DEVICE_TRACKING"]) {
        scope_configManager.LOGIN_DEFER_DEVICE_TRACKING=(res["LOGIN_DEFER_DEVICE_TRACKING"]);
      }
	  if (res && res["LOGIN_DEFER_LOCKOUT_SETTINGS"]) {
        scope_configManager.LOGIN_DEFER_LOCKOUT_SETTINGS=(res["LOGIN_DEFER_LOCKOUT_SETTINGS"]);
      }
	  if (res && res["SHOW_ALERTS_IN_SETTINGS"]) {
        scope_configManager.SHOW_ALERTS_IN_SETTINGS=(res["SHOW_ALERTS_IN_SETTINGS"]);
      }
	  if (res && res["LOGIN_PREFETCH_ACCOUNTS"]) {
        scope_configManager.LOGIN_PREFETCH_ACCOUNTS=(res["LOGIN_PREFETCH_ACCOUNTS"]);
      }
	  if (res && res["LOGIN_PREWARM"]) {
        scope_configManager.LOGIN_PREWARM=(res["LOGIN_PREWARM"]);
      }
	  if (res && res["LOGIN_PREVALIDATE_USER"]) {
        scope_configManager.LOGIN_PREVALIDATE_USER=(res["LOGIN_PREVALIDATE_USER"]);
      }
	  if (res && res["LOGIN_PARALLEL_WAVE"]) {
        scope_configManager.LOGIN_PARALLEL_WAVE=(res["LOGIN_PARALLEL_WAVE"]);
      }
	  if (res && res["DASHBOARD_REUSE"]) {
        scope_configManager.DASHBOARD_REUSE=(res["DASHBOARD_REUSE"]);
      }
	  if (res && res["LOGIN_INSTANT_DASHBOARD"]) {
        scope_configManager.LOGIN_INSTANT_DASHBOARD=(res["LOGIN_INSTANT_DASHBOARD"]);
      }
	  if (res && res["FONEPAY_QR_ENABLED"]) {
        scope_configManager.FONEPAY_QR_ENABLED=(res["FONEPAY_QR_ENABLED"]);
      }
	  //TEMP DIAGNOSTIC - remove. Records what Fabric actually returned so the card screen can show it.
	  //try {
        //var diagKeyCount = res ? Object.keys(res).length : -1;
        //applicationManager.getNavigationManager().setCustomInfo("diagClientProps",
          //"props returned: " + diagKeyCount +
          //"\nCARD_PIN_LENGTH_6_BINS: " + ((res && res["CARD_PIN_LENGTH_6_BINS"]) ? res["CARD_PIN_LENGTH_6_BINS"] : "ABSENT") +
          //"\nCARD_TRANSACTION_DAYS: " + ((res && res["CARD_TRANSACTION_DAYS"]) ? res["CARD_TRANSACTION_DAYS"] : "ABSENT"));
      //}
      //catch (diagError) {
        //kony.print("[DIAG] client props capture failed: " + diagError);
      //}
	  if (res && res["PERSONAL_QR_FORMAT"]) {
        scope_configManager.PERSONAL_QR_FORMAT=(res["PERSONAL_QR_FORMAT"]);
      }
	  /* Modern-design extension point - remove with DesignResolver.js.
	     Unset, empty, or any value other than MODERN leaves the app on the
	     Classic dashboard, exactly as PERSONAL_QR_FORMAT defaults to JSON. */
	  if (res && res["UI_DESIGN"]) {
        scope_configManager.UI_DESIGN=(res["UI_DESIGN"]);
      }
	  if (res && res["ESEWA_PURPOSE"]) {
        scope_configManager.ESEWA_PURPOSE=(res["ESEWA_PURPOSE"]);
      }
	  if (res && res["ESEWA_TOPUP_PAYABLE_ACCOUNT"]) {
        scope_configManager.ESEWA_TOPUP_PAYABLE_ACCOUNT=(res["ESEWA_TOPUP_PAYABLE_ACCOUNT"]);
      }
	   if (res && res["HAM_SEND_MONEY"]) {
        scope_configManager.HAM_SEND_MONEY=(res["HAM_SEND_MONEY"]);
      }
	   if (res && res["HAM_TRANSFERS"]) {
        scope_configManager.HAM_TRANSFERS=(res["HAM_TRANSFERS"]);
      }
	  if (res && res["MB_CARDLESS_MAX_LIMIT"]) {
        scope_configManager.MB_CARDLESS_MAX_LIMIT=(res["MB_CARDLESS_MAX_LIMIT"]);
      }
	   if (res && res["HAM_ACCOUNT_SWEEP"]) {
        scope_configManager.HAM_ACCOUNT_SWEEP=(res["HAM_ACCOUNT_SWEEP"]);
      }
	   if (res && res["HAM_CHECK_DEPOSITS"]) {
        scope_configManager.HAM_CHECK_DEPOSITS=(res["HAM_CHECK_DEPOSITS"]);
      }
	  if (res && res["MIN_ELIGIBLE_AMT_STRUCTURE_FD"]) {
        scope_configManager.MIN_AMT_STRUCTURE_FD=(res["MIN_ELIGIBLE_AMT_STRUCTURE_FD"]);
      }
	  	  if (res && res["HIMAL_FD_ACCOUNT_CODES"]) {
        scope_configManager.HIMAL_FD_ACCOUNT_CODES = (res["HIMAL_FD_ACCOUNT_CODES"]);
      }
	  if (res && res["MB_UI_MOCK_SUCCESS"]) {
        scope_configManager.MB_UI_MOCK_SUCCESS=(res["MB_UI_MOCK_SUCCESS"]);
      }
	  if (res && res["CARD_ESTIMATED_TIME"]) {
        scope_configManager.setCardEstimatedDeliveryTime(res["CARD_ESTIMATED_TIME"]);
      }
      if (res && res["CARD_PAYMENT_DUE_DATE"]) {
        scope_configManager.setCardPaymentDueDate(res["CARD_PAYMENT_DUE_DATE"]);
      }
	   if (res && res["PHYSICAL_PREPAID_CARD_FEE"]) {
        scope_configManager.setPhysicalPrepaidCardFee(res["PHYSICAL_PREPAID_CARD_FEE"]);
      }
	  if (res && res["VIRTUAL_PREPAID_CARD_FEE"]) {
        scope_configManager.setVirtualPrepaidCardFee(res["VIRTUAL_PREPAID_CARD_FEE"]);
      }
	  if (res && res["NO_OF_CHEQUE_LEAVES"]) {
        scope_configManager.NO_OF_CHEQUE_LEAVES=(res["NO_OF_CHEQUE_LEAVES"]);
      }
      if (res && res["DISABLE_PAPER_STATEMENT"]) {
        scope_configManager.setDisablePaperStatement(res["DISABLE_PAPER_STATEMENT"]);
      }
      if (res && res["NO_OF_DAYS_CARD_DISPUTE"]) {
        scope_configManager.setEligibleDaysForCardDisputeTransaction(res["NO_OF_DAYS_CARD_DISPUTE"]);
      }
      if (res && res["NO_OF_DAYS_CARD_EMI"]) {
        scope_configManager.setEligibleDaysForCardsTransactionConvertEmi(res["NO_OF_DAYS_CARD_EMI"]);
      }
      if (res && res["MB_HIDE_THEME_SECTION"]) {
        scope_configManager.setHideThemeMB(res["MB_HIDE_THEME_SECTION"]);
      }
      if (res && res["MAX_AMOUNT_FOR_EMI_ELIGIBLE"]) {
        scope_configManager.setMaxAmountForEmiEligible(res["MAX_AMOUNT_FOR_EMI_ELIGIBLE"]);
      }
      if (res && res["STATUS_CARD_INACTIVE"]) {
        scope_configManager.setCardStatusInActive(res["STATUS_CARD_INACTIVE"]);
      }
      if (res && res["PREPAID_CARD_TOPUP_VISIBILITY"]) {
        scope_configManager.setPrepaidDomesticCardsTopupVisibilityMB(res["PREPAID_CARD_TOPUP_VISIBILITY"]);
      }
      if (res && res["DOLLAR_CARD_TOPUP_VISIBILITY"]) {
        scope_configManager.setPrepaidDollarCardsTopupVisibilityMB(res["DOLLAR_CARD_TOPUP_VISIBILITY"]);
      }
      if(res && res["ENABLE_LANGUAGE_SWITCH"]) {  
        scope_configManager.setEnableLanguageStatus(res["ENABLE_LANGUAGE_SWITCH"]);
      }
      if (res && res["CREDIT_CARD_PAYMENT_VISIBILITY"]) {
        scope_configManager.setCreditCardPaymentVisibilityMB(res["CREDIT_CARD_PAYMENT_VISIBILITY"]);
      }
      
    },function(err) {
      kony.print(" Failed to retrieve client key value pairs : " + JSON.stringify(err));
    }
                                    )
  },
    };
});