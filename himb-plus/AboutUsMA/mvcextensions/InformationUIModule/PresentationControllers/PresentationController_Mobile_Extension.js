define(["CommonUtilities", "OLBConstants"], function (CommonUtilities, OLBConstants) {
  return {
    onClickContactUs: function (clientProperties) {
      var navManager = applicationManager.getNavigationManager();
      var configurationManager = applicationManager.getConfigurationManager();
      navManager.setCustomInfo("frmContactUs", { "headerValue": clientProperties });
      if (Object.keys(clientProperties).length > 0) {
        configurationManager.setExchangerateURL(clientProperties["URL_EXCHANGE_RATE"]);
        configurationManager.setDepositRateURL(clientProperties["URL_DEPOSIT_RATE"]);
        configurationManager.setLoanrateURL(clientProperties["URL_LOAN_RATE"]);
        configurationManager.setCorporateOffice(clientProperties["CORPORATE_OFFICE"]);
        configurationManager.setBranchReference(clientProperties["BRANCH_ID_REFERENCE"]);
        configurationManager.setCustomerSupport1phone(clientProperties["CUSTOMRER_SUPPORT1_PHONE"]);
        configurationManager.setCustomerSupport2phone(clientProperties["CUSTOMRER_SUPPORT2_PHONE"]);
        configurationManager.setCustomerSupport3phone(clientProperties["CUSTOMRER_SUPPORT3_PHONE"]);
        configurationManager.setCustomerSupport1Email(clientProperties["CUSTOMRER_SUPPORT1_EMAIL"]);
        configurationManager.setCustomerSupport2Email(clientProperties["CUSTOMRER_SUPPORT2_EMAIL"]);
        configurationManager.setCustomerSupport3Email(clientProperties["CUSTOMRER_SUPPORT3_EMAIL"]);
        configurationManager.setContactUsBanner(clientProperties["CONTACTUS_BANNER"]);
        configurationManager.setCustomerSupportMbCallUs(clientProperties["CUSTOMER_SUPPORT_MB_CALLUS"]);
      }
      var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
      infoCall.presentationController.contactUsInfo(); 
    },

    onClickExchangeRates: function (headerValue) {
      var faqBC = applicationManager.getInformationManager();
      faqBC.exchangeRateServerDate(presentationSuccessCallback, presentationErrorCallback);
      function presentationSuccessCallback(response) {
        var navManager = applicationManager.getNavigationManager();
        var ExchangerateResponse = response.date;
        navManager.setCustomInfo("frmExchangeRateTableScreen", ExchangerateResponse);
        var param = {
          "companyCode": "NP0010001",
          "market": "10 1"
        }
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "InformationUIModule", "appName": "AboutUsMA" });
        manageCardsModule.presentationController.exchangerateFunction(param);
        // this.ExchangerateFunction(param);
        //navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationUIModule/frmExchangeRateTableScreen"});   
        //navManager.navigateTo("frmSupportInfo");
      }
      function presentationErrorCallback(response) {
        var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().showLoadingScreen();
        if (response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    },

    exchangerateFunction: function (headerValue) {
      var faqBC = applicationManager.getInformationManager();
      faqBC.exchangeRateTable(headerValue, presentationSuccessCallback, presentationErrorCallback);
      function presentationSuccessCallback(response) {
        var navManager = applicationManager.getNavigationManager();
        var ExchangerateResp = response;
        navManager.setCustomInfo("frmExchangeRate", ExchangerateResp);
        navManager.navigateTo({ "appName": "AboutUsMA", "friendlyName": "InformationUIModule/frmExchangeRateTableScreen" });
      }
      function presentationErrorCallback(response) {
        var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().showLoadingScreen();
        if (response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    },
     onClickTermsAndConditions : function(headerValue){
      var config = applicationManager.getConfigurationManager();
      var userPreferencesManager = applicationManager.getUserPreferencesManager();
      var tncman = applicationManager.getTermsAndConditionsManager();
      /*
      var locale=config.getLocale();
      if(!locale){
        var value =kony.i18n.getCurrentLocale();
	    var locale = value.replace(/_/g, "-");
    }
      */
      var termsAndConditions=config.getTermsAndConditions();
      if (userPreferencesManager.isUserLoggedin() === true) {
        var locale = "en-US";
          var parmns={
            "languageCode": locale,
            "termsAndConditionsCode": termsAndConditions["Hamburger"]
          };
      tncman.fetchTermsAndConditionsPostLogin(parmns,presentationSuccessCallback,presentationErrorCallback);
    }
      else {
        var locale = "en-US";
      var parmns={
        "languageCode": locale,
        "termsAndConditionsCode": termsAndConditions["Footer"]
      };
      tncman.fetchTermsAndConditionsPreLogin(parmns,presentationSuccessCallback,presentationErrorCallback);
    }
    function presentationSuccessCallback(response){
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmSupportInfo",{"richTextData":"<font face='SourceSansPro-Regular'>"+response.termsAndConditionsContent,"header":headerValue});
      if(response.contentTypeId == "URL"){
        kony.application.openURL(response.termsAndConditionsContent);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      else{
        navManager.navigateTo({"appName" :"AboutUsMA","friendlyName":"InformationUIModule/frmSupportInfo"}); 
        //navManager.navigateTo("frmSupportInfo");
      }
    }
    function presentationErrorCallback(response){
      var error = applicationManager.getLoggerManager();
      error.log(response);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if(response["isServerUnreachable"])
      {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
      else
      {
        var controller = applicationManager.getPresentationUtility().getController('frmTermsAndCondition', true);
        controller.bindGenericError(response.errorMessage);
      }
    }
    },
    contactUsInfo : function () {
      var callBC = applicationManager.getInformationManager();
      callBC.fetchContactUs(presentationSuccessCallback, presentationErrorCallback);
      function presentationSuccessCallback(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("contactUsDetails", response);
        navManager.navigateTo({ "appName": "AboutUsMA", "friendlyName": "InformationUIModule/frmContactUs" });
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      function presentationErrorCallback(response) {
        var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
    },

    onClickCallUs: function () {
      var callBC = applicationManager.getInformationManager();
      callBC.fetchContactUs(presentationSuccessCallback, presentationErrorCallback);
      function presentationSuccessCallback(response) {
        try {
          var phoneNumber, cusSupportNumTitle = "";
          var navManager = applicationManager.getNavigationManager();
          var getCardsHomeFormController = applicationManager.getPresentationUtility().getController("ManageCardsUIModule/frmCardManageHome", true, { "appName": "CardsMA" });
          var callKey = navManager.getCustomInfo("callCustomerSupport");
          navManager.setCustomInfo("callCustomerSupport", null);
          if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(callKey)) {
            switch (callKey) {
              case "CARD_REPORT_LOST_SUPPORT":
                cusSupportNumTitle = "Cards Support";
                break;
            }
            if (response.records.length === 0) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              // var controller = applicationManager.getPresentationUtility().getController('frmSupport', true);
              // applicationManager.getDataProcessorUtility().showToastMessageError(controller, "Your request cannot be processed right now, Please try again later.");
              getCardsHomeFormController.showCustomOkPopup("kony.mb.An.Internal.Error.occured.Please.try.after.sometime.", "konymb.errorpopup.trylater");
            }
            else {
              for (var i in response.records) {
                if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(cusSupportNumTitle) && response.records[i].serviceTitle === cusSupportNumTitle) {
                  if (response.records[i].hasOwnProperty("Phone") && response.records[i].Phone[0].hasOwnProperty("value") &&
                    !kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.records[i].Phone[0].value)) {
                    phoneNumber = response.records[1].Phone[0].value.replace(/[|&;$%@"<>()+,-]/g, "");
                    break;
                  }
                }
              }
              if (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(phoneNumber) && !isNaN(phoneNumber)) {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                kony.phone.dial(phoneNumber);
              } else getCardsHomeFormController.showCustomOkPopup("kony.mb.An.Internal.Error.occured.Please.try.after.sometime.", "konymb.errorpopup.trylater");
            }
          } else {
            if (response.records.length === 0) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              var controller = applicationManager.getPresentationUtility().getController('frmSupport', true);
              applicationManager.getDataProcessorUtility().showToastMessageError(controller, "Your request cannot be processed right now, Please try again later.");
            }
            else {
              var records = response.records[0].Phone;
              for (var i = 0; i < records.length; i++) {
                var number = records[i].value.replace(/[|&;$%@"<>()+,-]/g, "");
                if (!isNaN(number)) {
                  phoneNumber = number;
                  break;
                }
              }

              applicationManager.getPresentationUtility().dismissLoadingScreen();
              kony.phone.dial(phoneNumber);
            }
          }
        } catch (err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "i18n.alertSettings.NoPrimaryMsg", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      }
      function presentationErrorCallback(response) {
        var error = applicationManager.getLoggerManager();
        error.log(response);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (response["isServerUnreachable"])
          applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", response);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    showOkPopup: function (title, info) {
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": kony.i18n.getLocalizedString(title),
        "message": kony.i18n.getLocalizedString(info),
        "alertHandler": this.alertCallback.bind(this),
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      };
      applicationManager.getPresentationUtility().Alert(basicConfig, {});
      return;
    },
    alertCallback: function () {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  };
});