define(['CampaignUtility','CommonUtilities'], function(CampaignUtility,CommonUtilities){
  return{
    preShow: function () {
      try{
      this.view.postShow = this.postShow;
      this.initActions();
      //  this.enableOrDisableHamburger();
      this.view.segSupport.isVisible = false;
	  this.setSupportDataVisibilityOff();
      var navManager = applicationManager.getNavigationManager();
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler =  applicationManager.getMenuHandler();
      var userObj = applicationManager.getUserPreferencesManager();
      if (userObj.isUserLoggedin() === true) {
        MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUCONTACT);
      }
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        if (userObj.isUserLoggedin() === true) {
        this.view.enabledForIdleTimeout = true;
      }else{
        this.view.enabledForIdleTimeout = false;
        }
      }
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      var ContactUs = applicationManager.getLoggerManager();
      //ContactUs.setCustomMetrics(this, false, "Support");
      let scopeObj = this;
      function campaignPopUpSuccess(response){
        CampaignUtility.showCampaign(response, scopeObj.view);
      }
      function campaignPopUpError(response){
        kony.print(response, "Campaign Not Found!");
      }
      if(applicationManager.getUserPreferencesManager().isUserLoggedin()){
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      }
      if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === 'Arabic'){
        scopeObj.view.customHeader.imgBack.src = "backbutton_reverse.png";
      }
      configManager.reloadCustomConstants();
      /*
      var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
      infoCall.presentationController.contactUsInfo();
      */
     }
      catch(e){
        kony.print("preShow"+e);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    postShow : function(){
      try{
      this.setSegmentData();
      this.view.customHeader.flxBack.onClick=this.backIcon;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      }
      else{
        this.view.flxHeader.isVisible = true;
      }
      this.view.onDeviceBack = this.backIcon;
      //hard-coded version due to techincal limation of XXX.YYY.ZZZ
      this.view.lblAppVersion.text= kony.i18n.getLocalizedString("kony.mb.Support.AppVersion")+" "+appConfig.appVersion;
      this.enableOrDisableHamburger();
      this.populateCustomFooterLinks();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
       }
      catch(e){
        kony.print("postShow"+e);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    initActions: function(){
      var scope = this;
      this.view.btnCallBranch.onClick = function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
        infoCall.presentationController.onClickCallUs();
      }
    },
	 setSupportDataVisibilityOff: function(){
      var scope = this;
      this.view.flxSupportData.isVisible = false;
    },
    enableOrDisableHamburger :function(){
       var userObj = applicationManager.getUserPreferencesManager();
       var Login = userObj.isUserLoggedin();
       if(Login === true){
           this.view.customHeader.flxBack.imgBack.src = "backbutton.png";
           if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
               this.view.flxSupportMain.bottom = "60dp";
               this.view.flxFooter.isVisible = true;
            }
           else{
               this.view.flxSupportMain.bottom = "0dp";
               this.view.flxFooter.isVisible = false;
           }
       }else{
           var scope = this;
           this.view.flxFooter.isVisible = false;
           this.view.flxSupportMain.bottom = "0dp";
        this.view.customHeader.flxBack.imgBack.src = "backbutton.png";
        this.view.customHeader.flxBack.onClick = function(){
         scope.backIcon();
       };
       }
       },
    showDial: function (phoneNumber) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.phone.dial(phoneNumber);
    },
    backIcon: function() {
      try{
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        var userObj = applicationManager.getUserPreferencesManager();
        var Login = userObj.isUserLoggedin();
        if(Login === true){
//           var navManager = applicationManager.getNavigationManager();
//           navManager.goBack();
          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
          accountMod.presentationController.showDashboard();

        }
       else{
          var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationUIModule" });
          if (CommonUtilities.getSCAType() == '2')
            informationPC.presentationController.commonFunctionForNavigation({ "appName": "AuthenticationMA", "friendlyName": "frmLoginUniken" });
          else
            informationPC.presentationController.commonFunctionForNavigation({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmLogin" });
        }
      }
      else{
        var userObj = applicationManager.getUserPreferencesManager();
        var Login = userObj.isUserLoggedin();
        if(Login === true){
          //           var navManager = applicationManager.getNavigationManager();
          //           navManager.goBack();
          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
          accountMod.presentationController.showDashboard();
		}
       else{
          var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AboutUsMA", "moduleName": "InformationUIModule" });
          if (CommonUtilities.getSCAType() == '2')
            informationPC.presentationController.commonFunctionForNavigation({ "appName": "AuthenticationMA", "friendlyName": "frmLoginUniken" });
          else
            informationPC.presentationController.commonFunctionForNavigation({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmLogin" });
        }
      }
       }
      catch(e){
        kony.print("backIcon"+e);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    
            setSegmentData: function () {
              try{
              var scope = this;
              var configManager = applicationManager.getConfigurationManager();
              if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === 'Arabic'){
                var data = [
                  {
                    "imgArrow": "chevron_reverse.png",
                    "lblTitle": configManager.constants.PRIVACY
                  },{
                    "imgArrow": "chevron_reverse.png",
                    "lblTitle": configManager.constants.TERMS
                  },{
                    "imgArrow": "chevron_reverse.png",
                    "lblTitle": configManager.constants.FAQ
                  } 
                ];
              }
              else{
                data = [
                  {
                    "imgArrow": "chevron.png",
                    "lblTitle":  configManager.customConstants.CONTACTUS
                  },{
                    "imgArrow": "chevron.png",
                    "lblTitle": configManager.constants.PRIVACY
                  },{
                    "imgArrow": "chevron.png",
                    "lblTitle": configManager.constants.TERMS
                  },{
                    "imgArrow": "chevron.png",
                    "lblTitle": configManager.constants.FAQ
                  }, {
                    "imgArrow": "chevron.png",
                    "lblTitle": configManager.customConstants.EXCHANGERATES
                  },{
                    "imgArrow": "chevron.png",
                    "lblTitle": configManager.customConstants.DEPOSITINTEREST
                  },{
                    "imgArrow": "chevron.png",
                    "lblTitle": configManager.customConstants.LOANINTEREST
                  }
                ];
              }
              this.view.segSupport.setData([]);
              this.view.segSupport.setData(data);
              this.view.segSupport.isVisible = true;
              var segData = [{
                "lblTimeZone": kony.i18n.getLocalizedString("kony.mb.informationUI.timeZone"),
                "lblTimingTitle": kony.i18n.getLocalizedString("kony.mb.support.MonToFri"),
                "lblTimingValue": kony.i18n.getLocalizedString("kony.mb.informationUI.time")
              },{
                "lblTimeZone": kony.i18n.getLocalizedString("kony.mb.informationUI.timeZone"),
                "lblTimingTitle": kony.i18n.getLocalizedString("kony.mb.support.Sat"),
                "lblTimingValue": kony.i18n.getLocalizedString("kony.mb.segtimings.lblTimingvalue")
              }
                            ];

              this.view.segTimings.setData(segData);
              this.view.segSupport.onRowClick = function(){
                var selectedvalue = scope.view.segSupport.selectedItems[0].lblTitle;
                if(selectedvalue === configManager.constants.PRIVACY){
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickPrivacyPolicy(selectedvalue);
                } else if(selectedvalue === configManager.constants.TERMS){
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickTermsAndConditions(selectedvalue);
                } else if(selectedvalue === configManager.constants.ABOUT){
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickAboutUs(selectedvalue);
                } else if(selectedvalue === configManager.constants.FAQ){
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickFAQs(selectedvalue);
                }else if(selectedvalue === configManager.customConstants.EXCHANGERATES){
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickExchangeRates(selectedvalue);
                }else if(selectedvalue === configManager.customConstants.DEPOSITINTEREST){
                  //applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickDepositInterest(selectedvalue);
                }else if(selectedvalue === configManager.customConstants.LOANINTEREST){
                  //applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
                  informationPC.presentationController.onClickLoanInterest(selectedvalue);
                }else if(selectedvalue === configManager.customConstants.CONTACTUS){
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
				  let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
                  applicationManager.getPresentationUtility().showLoadingScreen();
                  informationPC.presentationController.onClickContactUs(clientProperties);
                }

              }
               }
      catch(e){
        kony.print("setSegmentData"+e);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
            },
              populateCustomFooterLinks : function (){
                var configurationManager = applicationManager.getConfigurationManager();
                let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
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
              }
};
       });
