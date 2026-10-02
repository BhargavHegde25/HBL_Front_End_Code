define(["CommonUtilities","OLBConstants"],function(CommonUtilities,OLBConstants){
  return{
  getPreLoginCampaignsOnBreakpointChange : function () {
        var self = this;
        var configurationManager = applicationManager.getConfigurationManager();
        let clientProperties = OLBConstants.CLIENT_PROPERTIES;
        if (Object.keys(clientProperties).length === 0) {
            let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
            configurationSvc.getAllClientAppProperties(function (response) {
                OLBConstants.CLIENT_PROPERTIES = response;
                const ftKeys = [
                        "FT_DOMESTIC_INPUT_CONFIG",
                        "FT_INTERNATIONAL_INPUT_CONFIG",
                        "FT_SAMEBANK_INPUT_CONFIG",
                        "ADDPAYEE_OTHERBANK_INPUT_CONFIG",
                        "ADDPAYEE_INTERNATIONAL_INPUT_CONFIG",
                        "ADDPAYEE_SAMEBANK_INPUT_CONFIG"
                    ];

                    ftKeys.forEach(function(key){
                        if(response[key]){
                            // Save JSON as string or object
                            try {
                                const parsed = JSON.parse(response[key]);
                                configurationManager[key] = parsed; // dynamically attach
                            } catch(e){
                                console.warn("Invalid JSON for " + key, response[key]);
                            }
                        }
                    });
                configurationManager.setOnBoardingAppDirectionURL(response["DBP_ONBOARDING_URL"]);
                configurationManager.setExchangerateURL(response["URL_EXCHANGE_RATE"]);
                configurationManager.setDepositRateURL(response["URL_DEPOSIT_RATE"]);
                configurationManager.setLoanrateURL(response["URL_LOAN_RATE"]);
                configurationManager.setCorporateOffice(response["CORPORATE_OFFICE"]);
                configurationManager.setBranchReference(response["BRANCH_ID_REFERENCE"]);
                configurationManager.setPaperStatementStatus(response["DISABLE_PAPER_STATEMENT"]);
                configurationManager.setCustomerSupport1phone(response["CUSTOMRER_SUPPORT1_PHONE"]);
                configurationManager.setNoOfChequeLeaves(response["NO_OF_CHEQUE_LEAVES"]);
                configurationManager.setBillPayActivationMessage(response["BILLPAY_ACTIVATION_MESSAGE"]);
                configurationManager.setEnrollKYCMessage(response["KYC_REG_KEY"]);
                configurationManager.setDebtorAgentBankIdValue(response["BANK_ID"]);
                configurationManager.setNPI_BILLERS_URL(response["NCHL_ORIGIN_URL"]);
                configurationManager.setCardTopUpPayableAccNo(response["S2M_CARD_TOPUP_PAYABLE_ACCNOUNT_NO"]);
                configurationManager.setCardPaymentPayableAccNo(response["S2M_CARD_PAYMENT_PAYABLE_ACCNOUNT_NO"]);
				configurationManager.setPrepaidCardTopupVisibility(response["PREPAID_CARD_TOPUP_VISIBILITY"]);
				configurationManager.setDollarCardTopupVisibility(response["DOLLAR_CARD_TOPUP_VISIBILITY"]);
                configurationManager.setLockCardStatus(response["STATUS_LOCK_CARD"]);               
                configurationManager.setReportLostCardStatus(response["STATUS_REPORT_LOST_CARD"]);
                configurationManager.setActivateCardStatus(response["STATUS_ACTIVATE_CARD"]);
				configurationManager.setInActiveCardStatus(response["STATUS_INACTIVE_CARD"]);
                configurationManager.setExpiredCardStatus(response["STATUS_EXPIRED_CARD"]);
				configurationManager.setExpiredCardsValidityDisplay(response["EXPIRED_CARDS_VALIDITY_DISPLAY"]);
                configurationManager.setEmiTenureMonth(response["CARD_EMI_INSTA_NUMBER"]);
                configurationManager.setEmiInterestDate(response["CARD_EMI_INTREST_RATE"]);
                configurationManager.setNormalFDMinAmt(response["MIN_ELIGIBLE_AMT_NORMAL_FD"]);
                configurationManager.setHimalRemitMinAmt(response["MIN_ELIGIBLE_AMT_HIMAL_FD"]);
                configurationManager.setStructureFDMinAmt(response["MIN_ELIGIBLE_AMT_STRUCTURE_FD"]);
                configurationManager.setResetPinEstimatedTime(response["RESET_PIN_ESTIMATED_TIME"]);
                configurationManager.setDebtorAgentBranchId(response["BRANCH_ID"]);
                configurationManager.setCustomerSupport2phone(response["CUSTOMRER_SUPPORT2_PHONE"]);
                configurationManager.setCustomerSupport3phone(response["CUSTOMRER_SUPPORT3_PHONE"]);
                configurationManager.setCustomerSupport1Email(response["CUSTOMRER_SUPPORT1_EMAIL"]);
                configurationManager.setCustomerSupport2Email(response["CUSTOMRER_SUPPORT2_EMAIL"]);
                configurationManager.setCustomerSupport3Email(response["CUSTOMRER_SUPPORT3_EMAIL"]);
                configurationManager.setContactUsBanner(response["CONTACTUS_BANNER"]);
                configurationManager.setSSOConfig(response["SSO_CONFIG"]);
                configurationManager.setHblCopyRight(response["HBL_COPY_RIGHTS"]);  
                configurationManager.setCardPaymentDueDate(response["CARD_PAYMENT_DUE_DATE"]);
                configurationManager.setEligibleDaysForCardDisputeTransaction(response["NO_OF_DAYS_CARD_DISPUTE"]);
                configurationManager.setEligibleDaysForCardsTransactionConvertEmi(response["NO_OF_DAYS_CARD_EMI"]);
                configurationManager.setDisablePaperStatement(response["DISABLE_PAPER_STATEMENT"]);
                configurationManager.setHideThemeMB(response["MB_HIDE_THEME_SECTION"]);
				configurationManager.setCardEstimatedDeliveryTime(response["CARD_ESTIMATED_TIME"]);
                configurationManager.setPhysicalPrepaidCardFee(response["PHYSICAL_PREPAID_CARD_FEE"]);
                configurationManager.setVirtualPrepaidCardFee(response["VIRTUAL_PREPAID_CARD_FEE"]);   
				configurationManager.setCardTopUpPayableAccName(response["S2M_CARD_TOPUP_PAYABLE_ACCNOUNT_NAME"]);
                configurationManager.setLockCardStatus(response["ENABLE_LANGUAGE_SWITCH"]);
                if (response.OLB_ENABLE_INAPP_CAMPAIGNS && response.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
                    var directMktManager = applicationManager.getDirectMarketingManager();
                    directMktManager.getAds("preLoginDesktopAds", self.getCampaignsSuccess.bind(self), self.getCampaignsFailure.bind(self));
            } else {
                self.getCampaignsSuccess([]);
            }
            }, function(){});
        } else if(clientProperties && clientProperties.OLB_ENABLE_INAPP_CAMPAIGNS && clientProperties.OLB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE"){
                var directMktManager = applicationManager.getDirectMarketingManager();
                directMktManager.getAds("preLoginDesktopAds", self.getCampaignsSuccess.bind(self), self.getCampaignsFailure.bind(self));
        } else {
            self.getCampaignsSuccess([]);
        }
    },
    getFTConfig: function(key) {
            const clientProps = OLBConstants.CLIENT_PROPERTIES || {};
            if(clientProps[key]){
                try {
                    return JSON.parse(clientProps[key]);
                } catch(e){
                    console.warn("Invalid JSON for " + key, clientProps[key]);
                    return null;
                }
            }
            return null;
        },
   getTermsandConditions : function(){
        var config = applicationManager.getConfigurationManager();
       var locale=config.getLocale();
       var termsAndConditions=config.getTermsAndConditions();
        var param={
        "languageCode": termsAndConditions[locale],
         "termsAndConditionsCode": "Enroll_TnC"
      };
       var termsAndConditions = applicationManager.getTermsAndConditionsManager();
       termsAndConditions.fetchTermsAndConditionsPreLogin(param,scope_AuthPresenter.getTermsandConditionsSuccessCallBack,scope_AuthPresenter.getTermsandConditionsErrorCallback);
     },
    getTermsandConditionsSuccessCallBack : function(response){
        applicationManager.getNavigationManager().navigateTo("frmPreTermsandCondition");
        applicationManager.getNavigationManager().updateForm({
            "TnCcontent": response
        },"frmPreTermsandCondition");
       var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
       navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll","contentTypeID":response.contentTypeId});
       
      },
     getTermsandConditionsErrorCallback : function(err){
         applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
           }else{
                 var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
               var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
               controller.bindViewError(errorMsg);
           }
      },
      getTandCPostLogin : function(){
        var config = applicationManager.getConfigurationManager();
       var locale=config.getLocale();
       var termsAndConditions=config.getTermsAndConditions();
        var param={
        "languageCode": termsAndConditions[locale],
         "termsAndConditionsCode": "Thirdparty_Auth"
      };
       var termsAndConditions = applicationManager.getTermsAndConditionsManager();
       termsAndConditions.fetchTermsAndConditionsPreLogin(param,scope_AuthPresenter.getTandCPostLoginSuccessCallBack,scope_AuthPresenter.getTandCPostLoginErrorCallback);
     },
    getTandCPostLoginSuccessCallBack : function(response){
        // applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
        applicationManager.getNavigationManager().navigateTo({
            "appName": "OnlineBanking",
            "friendlyName": "frmActivateThirdParties"
        });
        applicationManager.getNavigationManager().updateForm({
            "TnCcontent": response
        },"frmActivateThirdParties");
       var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
       navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll","contentTypeID":response.contentTypeId});
       
      },
      getTandCPostLoginErrorCallback : function(err){
         applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
           }else{
                 var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
               var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
               controller.bindViewError(errorMsg);
           }
      },
	  getResetThirdPartyStatus : function(params){
      const registrationManager = applicationManager.getRegistrationManager();
      registrationManager.getResetThirdPartyStatus(
        params,
        scope_AuthPresenter.getResetThirdPartyStatusSuccessCB,
        scope_AuthPresenter.getResetThirdPartyStatusErrorCB
      );
    },
    getResetThirdPartyStatusSuccessCB: function(response) {
      if(response.resetThirdpartyFlag == "false"){
        var navManager = applicationManager.getNavigationManager();
        var customInfo = navManager.getCustomInfo("frmTermsAndCondition");
        // applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
        applicationManager.getNavigationManager().navigateTo({
            "appName": "OnlineBanking",
            "friendlyName": "frmActivateThirdParties"
        });
        applicationManager.getNavigationManager().updateForm({
          "isUserAuthenticationSuccess": customInfo.response
        }, "frmActivateThirdParties");
      }
      else{
        var controller = applicationManager.getPresentationUtility().getController('frmActivateThirdParties', true);
        var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.auth.userActivatedUseLogin");
        controller.bindViewError(errorMsg);
      }
    },
    getResetThirdPartyStatusErrorCB: function(err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      } else {
        var controller = applicationManager.getPresentationUtility().getController('frmActivateThirdParties', true);
        var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
        controller.bindViewError(errorMsg);
      }
    },
	getUsernamePasswordDetails: function(param) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("usrName",param.userName);
      var config = applicationManager.getConfigurationManager();
      var locale = config.getLocale();
      var termsAndConditions = config.getTermsAndConditions();
      var termsAndConditions = applicationManager.getTermsAndConditionsManager();
      termsAndConditions.fetchSignInDetails(param, scope_AuthPresenter.getUsernamePasswordDetailsSuccessCallBack, scope_AuthPresenter.getUsernamePasswordDetailsErrorCallback);
    },
    getUsernamePasswordDetailsSuccessCallBack: function(response) {
      var navManager = applicationManager.getNavigationManager();
      var flag = navManager.getCustomInfo("thirdPartyAuthFlow");
      if(flag == "activate"){
         var param = {userName : navManager.getCustomInfo("usrName")};
        this.getResetThirdPartyStatus(param);
      }
      else{
        // applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
        applicationManager.getNavigationManager().navigateTo({
            "appName": "OnlineBanking",
            "friendlyName": "frmActivateThirdParties"
        });
        applicationManager.getNavigationManager().updateForm({
          "isUserAuthenticationSuccess": response
        }, "frmActivateThirdParties");
      }

      var navManager = applicationManager.getNavigationManager();
      //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
      navManager.setCustomInfo("frmTermsAndCondition", {
        "content": response.termsAndConditionsContent,
        "flowType": "Enroll",
        "contentTypeID": response.contentTypeId,
        "response":response
      });
    },
      getUsernamePasswordDetails: function(param) {
        var config = applicationManager.getConfigurationManager();
        var locale = config.getLocale();
        var termsAndConditions = config.getTermsAndConditions();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.fetchSignInDetails(param, scope_AuthPresenter.getUsernamePasswordDetailsSuccessCallBack, scope_AuthPresenter.getUsernamePasswordDetailsErrorCallback);
    },
    getUsernamePasswordDetailsSuccessCallBack: function(response) {
        // applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
        applicationManager.getNavigationManager().navigateTo({
            "appName": "OnlineBanking",
            "friendlyName": "frmActivateThirdParties"
        });
        applicationManager.getNavigationManager().updateForm({
            "isUserAuthenticationSuccess": response
        }, "frmActivateThirdParties");
        var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
        navManager.setCustomInfo("frmTermsAndCondition", {
            "content": response.termsAndConditionsContent,
            "flowType": "Enroll",
            "contentTypeID": response.contentTypeId
        });
    },
    getUsernamePasswordDetailsErrorCallback: function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
    },
    SetQRCode: function(param) {
        var config = applicationManager.getConfigurationManager();
        var locale = config.getLocale();
        var termsAndConditions = config.getTermsAndConditions();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.getQRCode(param, scope_AuthPresenter.SetQRCodeSuccessCallBack, scope_AuthPresenter.SetQRCodeErrorCallback);
    },
    SetQRCodeSuccessCallBack: function(response) {
        //applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
        applicationManager.getNavigationManager().updateForm({
            "qrcode": response
        }, "frmActivateThirdParties");
        var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
        navManager.setCustomInfo("frmTermsAndCondition", {
            "content": response.termsAndConditionsContent,
            "flowType": "Enroll",
            "contentTypeID": response.contentTypeId
        });
    },
    SetQRCodeErrorCallback: function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
    },
    Settotp: function(param) {
        var config = applicationManager.getConfigurationManager();
        var locale = config.getLocale();
        var termsAndConditions = config.getTermsAndConditions();
        var termsAndConditions = applicationManager.getTermsAndConditionsManager();
        termsAndConditions.gettotp(param, scope_AuthPresenter.SettotpSuccessCallBack, scope_AuthPresenter.SettotpErrorCallback);
    },
    SettotpSuccessCallBack: function(response) {
        //applicationManager.getNavigationManager().navigateTo("frmActivateThirdParty");
        applicationManager.getNavigationManager().updateForm({
            "totp": response
        }, "frmActivateThirdParties");
        var navManager = applicationManager.getNavigationManager();
        //navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
        navManager.setCustomInfo("frmTermsAndCondition", {
            "content": response.termsAndConditionsContent,
            "flowType": "Enroll",
            "contentTypeID": response.contentTypeId
        });
    },
    SettotpErrorCallback: function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
    },
    loginPostCalls: function(userName, authParams, response) {
      var scopeObj = this;
      scopeObj.setIdleTimeout();
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("AuthParam", authParams);
      if (!CommonUtilities.isCSRMode()) {
          userName = scopeObj.authParams.username;
          scopeObj.saveUserName(scopeObj.authParams);
      }
      kony.setUserID(userName);
      if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") === 'false') {
          var defaultLegalEntity = kony.sdk.getCurrentInstance().tokens[applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.defaultLegalEntity;
          if (defaultLegalEntity != "" && !kony.sdk.isNullOrUndefined(defaultLegalEntity)) {
              this.callGetPostLoginWithEntity(defaultLegalEntity);
              var multiEntityManager = applicationManager.getMultiEntityManager();
              multiEntityManager.getUserLegalEntities(function() {}, function() {});
          } else {
              this.getEntity();
          }
      } else {
          if (kony.application.getCurrentForm().id === "frmLogin") {
              var self = this;
              var asyncManager = applicationManager.getAsyncManager();
              var scopeObj = self;
              var userPrefManager = applicationManager.getUserPreferencesManager();
              userPrefManager.isLoggedIn = true;
              const configManager = applicationManager.getConfigurationManager();
              const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
              if (isHomepageMAPresent) {
                  //let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
                  //accounts.presentationController.fetchAccounts(userName);
              }
              if (applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true) {
                  asyncManager.callAsync(
                      [
                          asyncManager.asyncItem(userPrefManager, 'fetchUser'),
                          asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                              "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                              "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC
                          }]),
                          asyncManager.asyncItem(userPrefManager, 'fetchUserImage'),
                          asyncManager.asyncItem(userPrefManager, 'getUserFeaturesAndPermissions')
                      ], scopeObj.onPostLoginServicesComplete.bind(scopeObj));
              } else {
                  asyncManager.callAsync(
                      [
                          asyncManager.asyncItem(userPrefManager, 'fetchUser'),
                          asyncManager.asyncItem(userPrefManager, 'getUserFeaturesAndPermissions'),
                          asyncManager.asyncItem(applicationManager.getTermsAndConditionManager(), 'fetchTermsAndConditionsPostLogin', [{
                              "languageCode": kony.i18n.getCurrentLocale().replace("_", "-"),
                              "termsAndConditionsCode": OLBConstants.TNC_FLOW_TYPES.Login_TnC
                          }]),
                      ], scopeObj.onPostLoginServicesComplete.bind(scopeObj));
              }
          } else {
              this.postLoginServices();
          }
      }
  },
  
  postLoginCall: function(authParams) {
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("authCred", authParams);
    let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
    accounts.presentationController.fetchAccounts();
    applicationManager.getNavigationManager().setCustomInfo("getListflowType", "loginflow");
    //this.CalldefaultAccService();
  },

    CalldefaultAccService:function(){
    var navManager = applicationManager.getNavigationManager();
    var authParams=navManager.getCustomInfo("authParams");
    applicationManager.getAccountManager().defaultAccount(authParams, this.defaultAccountSC.bind(this), this.defaultAccountEC.bind(this));
    },
     defaultAccountSC: function(response) {
        var resData = response;
        if(response.Accounts.length==0){
            var navManager = applicationManager.getNavigationManager();
            var flow="defaultAccount";
            navManager.setCustomInfo("flow", flow);
            CommonUtilities.showServerDownScreen();
            }
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("defaultAcc", resData);
        const configManager = applicationManager.getConfigurationManager();
    const isHomepageMAPresent = configManager.isMicroAppPresent('HomepageMA');
    if (isHomepageMAPresent) {
        let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "HomepageMA", moduleName: "AccountsUIModule" });
        accounts.presentationController.accountActivity();
    }
    },
     defaultAccountEC: function(err){
        // alert("error" + err)
		 applicationManager.getPresentationUtility().Alert("error" + err)
     },
	 onLoginSuccessMFA : function () {
        var scopeObj = this;
        var configManager = applicationManager.getConfigurationManager();
        var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
        if (!scopeObj.authParams) {
            scopeObj.authParams = {};
            scopeObj.authParams.username = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
            scopeObj.authParams.rememberMe = kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus;
        }
        kony.setUserID(userName);
        userName = scopeObj.authParams.username;
        scopeObj.saveUserName(scopeObj.authParams);
        var params = {
            "deviceId": kony.os.deviceInfo().deviceid,
        };
        /*if (kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus) {
            applicationManager.getRegistrationManager().updateDeviceRegistrationStatus(params, this.onDeviceRegistrationSuccess.bind(this), this.onDeviceRegistrationFailure.bind(this));
        } else {
            applicationManager.getRegistrationManager().trackRegisteredDevice(function () { }, function () { });
        }*/
        this.initializePermissions();
        this.loginPostCalls(userName);
    },
     onLoginSuccess : function (authParams, response) {
      var scopeObj = this;
      //BCT change to make CSR mode false. Making this change since we are facing issues when CSR is coming true // for below line
      kony.mvc.MDAApplication.getSharedInstance().appContext.isCSR_Assist_Mode=false;
      scopeObj.userId = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].profile.userid;
      scopeObj.authParams = scopeObj.authParams ? scopeObj.authParams : authParams; //cache for saving user names
      var mfaManager = applicationManager.getMFAManager();
      var userName;

      var configurationManager = applicationManager.getConfigurationManager();
      if (kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes) {
          var user_attributes = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
          configurationManager.customerTypeId = user_attributes.customerTypeId;
          configurationManager.UserAttributes=kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.user_attributes;
          var backendIdentifiers = user_attributes.backendIdentifiers ? user_attributes.backendIdentifiers : "";
          if (backendIdentifiers.length > 0) {
              var jsonRes = JSON.parse(backendIdentifiers);
              if (jsonRes.T24 && jsonRes.T24[0]) {
                  var backendId = jsonRes.T24[0].BackendId;
                  applicationManager.getUserPreferencesManager().setBackendIdentifier(backendId);
              }
              else if (jsonRes.CORE && jsonRes.CORE[0]) {
                  var backendId = jsonRes.CORE[0].BackendId;
                  applicationManager.getUserPreferencesManager().setBackendIdentifier(backendId);
              }
          }
      }
      this.initializePermissions();
      if (CommonUtilities.isCSRMode()) {
          function onGetUserAttributesSuccess(response) {
              scopeObj.callPostLoginServices(response.UserName, authParams, response);
          }
          function onGetUserAttributesFailure(response) {
              scopeObj.onLoginFailure(response);
          }
          var configManager = applicationManager.getConfigurationManager();
          kony.sdk.getCurrentInstance().getIdentityService(configManager.constants.IDENTITYSERVICENAME).getUserAttributes(onGetUserAttributesSuccess, onGetUserAttributesFailure);
      } else {
          userName = scopeObj.authParams.username;
          scopeObj.saveUserName(scopeObj.authParams);
         // applicationManager.getRegistrationManager().trackRegisteredDevice(function () { }, function () { });
          this.callPostLoginServices(userName, authParams, response);
      }
      if (!isNaN(OLBConstants.CLIENT_PROPERTIES.IDLE_TIMEOUT)){
          configurationManager.constants.IDLE_TIMEOUT = Number(OLBConstants.CLIENT_PROPERTIES.IDLE_TIMEOUT);
      } else {
          if (!configurationManager.constants.IDLE_TIMEOUT ) {
              configurationManager.constants.IDLE_TIMEOUT = 5;
          }
      } 
      if (!isNaN(OLBConstants.CLIENT_PROPERTIES.ALERT_IDLE_TIMEOUT)) {
          configurationManager.constants.ALERT_IDLE_TIMEOUT = Number(OLBConstants.CLIENT_PROPERTIES.ALERT_IDLE_TIMEOUT);
      } else {
          if (!configurationManager.constants.ALERT_IDLE_TIMEOUT ) {
              configurationManager.constants.ALERT_IDLE_TIMEOUT = 4;
          } 
      }

      if (configurationManager.constants.ALERT_IDLE_TIMEOUT >= configurationManager.constants.IDLE_TIMEOUT) {
          configurationManager.constants.ALERT_IDLE_TIMEOUT = 0;
      }
     },
  getTnC: function() {
      var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsUIModule");
      termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Login_TnC, this.getTnCOnSuccess.bind(this), this.getTnCOnFailure.bind(this));
  },
  getTnCOnSuccess: function(response) {
      if (response.alreadySigned && kony.application.getCurrentForm().id == "frmFirst") {
          this.doPostLoginWork();
      } else if (response.alreadySigned) {
          var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
              "appName": "AuthenticationMA",
              "moduleName": "AuthUIModule"
          });
          var navManager = applicationManager.getNavigationManager();
          var x = navManager.getCustomInfo('AuthParam');
          authModule.presentationController.postLoginCall(x);
      } else {
          applicationManager.getNavigationManager().navigateTo("frmPreTermsandCondition");
          applicationManager.getNavigationManager().updateForm({
              "TnCcontent": response
          });
      }
  },
  getTnCOnFailure: function(response) {
      applicationManager.getNavigationManager().updateForm({
          "hideProgressBar": true,
          "loginFailure": true,
          "errorMessage": (response) ? response : ""
      });
  },
        doLogout: function (context) {
            applicationManager.getAuthManager().logout(this.logoutSuccessCallback.bind(this, context), this.logoutSuccessCallback.bind(this));
        },
        /**
         * Method will handle post logout actions like unregister time out etc.
         * @param {Object} context - context object which specify reason for logout ex: session expire, server down, user logout action etc.
         */
        logoutSuccessCallback: function (context) {
            kony.application.unregisterForIdleTimeout();
            var configurationManager = applicationManager.getConfigurationManager();
            context.userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
            context.isUserLoggedoutSuccessfully = true;
            context.userType = {
                isSMEUser: configurationManager.isSMEUser,
                isRBUser: configurationManager.isRBUser,
                isMBBUser: configurationManager.isMBBUser
            }
            var navManager = applicationManager.getNavigationManager();
            var x = navManager.getCustomInfo("flow");
            if (x == "defaultAccount") {
                context.errorMessages = "testing";
                context.action = "";
                applicationManager.getStorageManager().setStoredItem('OLBLogoutStatus', context);
            }
            else {
                applicationManager.getStorageManager().setStoredItem('OLBLogoutStatus', context);
            }
            window.location.reload(); //Refersh page to clear all data.
        },
        logoutErrorCallback: function () {
            kony.application.unregisterForIdleTimeout();
            applicationManager.getNavigationManager().updateForm({
                "action": "ServerDown"
            }, this.loginFormName);
        },
		onVerifyUserNameSuccessCallBack : function (response) {
			var userDetails = response.user_attributes;
			if (userDetails && userDetails.length > 0) {
				applicationManager.getAuthManager().setServicekey(response.serviceKey);
				applicationManager.getAuthManager().setPrimarykeyAttribute(userDetails);
				var navManager = applicationManager.getNavigationManager();
				navManager.setCustomInfo("cantSignInCustId",response.user_attributes[0].id);
				applicationManager.getNavigationManager().updateForm({
					"verifyUserList": userDetails,
					"hideProgressBar": true
				});
			} else {
				applicationManager.getNavigationManager().updateForm({
					"verifyUserDetailsError": {"response" : response} 
				});
			}
		}
    };
});