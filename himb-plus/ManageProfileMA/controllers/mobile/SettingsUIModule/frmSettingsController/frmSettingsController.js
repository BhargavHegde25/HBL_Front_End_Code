define(['CampaignUtility', 'OLBConstants', 'CommonUtilities'], function(CampaignUtility, OLBConstants, CommonUtilities){
  return{
    timerCounter : 0,
	acctPreviewStatus : "",
    devRegStatus : "",
    defLoginStatus : "",
    pinStatus : "",
    faceIdStatus : "",
    touchIdStatus : "",
    isTouchIdAva : "",
    isFaceIdAva : "",
    selectedAcntRow: "",
    alertStatus:"",
    contentOffset : "0dp",
    deviceManagementData: [],
    scaPasswordEnabled: true,
    selectedRadioButton: "radiobtnactive.png",
    unselectedRadioButton: "radiobtninactive.png",
    isVisibleLanguage:false,
  init : function(){
      var scope = this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
      //applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
	 
	this.view.onNavigate = this.onNavigate;
    if (CommonUtilities.getSCAType() == '2') 
        Controllers.set("frmSettingsController", this);
  },
  onNavigate: function () {
	    // Footer Menu
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
    },
    flxBackOnClick: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var configurationManager = applicationManager.getConfigurationManager();
      const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
      if (isAccUIModulePresent) {
        var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
          appName: "HomepageMA",
          moduleName: "AccountsUIModule"
        });
        accMode.presentationController.dashboardService();
      }
    },
    frmSettingsPreShow: function() {
        this.view.postShow = this.postShow;
      	var dataMap = {
      "flxRightWrapper": "flxRightWrapper",
      "flxSepartaor": "flxSepartaor",
      "flxSettings": "flxSettings",
      "flxSettingsHeader": "flxSettingsHeader",
      "imgArrow": "imgArrow",
      "lblProfileHeading": "lblProfileHeading",
      "lblTitle": "lblTitle",
      "lblValue": "lblValue",
      "lblSeperator":"lblSeperator",
      "flxTopShadow":"flxTopShadow",
      "lblCategoryTitle" : "lblCategoryTitle"
    };
      this.view.segSettingsLogin.widgetDataMap = dataMap;
	  var CommonUtilities = require('CommonUtilities');
    var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
	 this.isVisibleLanguage = clientProperties.ENABLE_LANGUAGE_SWITCH;
	 if(this.isVisibleLanguage=="true"||this.isVisibleLanguage==true){
		 this.isVisibleLanguage=true;
	 }else{
		 this.isVisibleLanguage=false;
	 }
        this.setFlowActions();
        this.setPreshowData();
		this.frmPreShow();
        this.checkForToastMessage();
        this.checkForToastMessagePinStatus();
        this.checkForToastMessageSuccess();
        this.showPopUpMessage();
		var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
        let scopeObj = this;
        function campaignPopUpSuccess(response){
          CampaignUtility.showCampaign(response, scopeObj.view);
        }
        function campaignPopUpError(response){
          kony.print(response, "Campaign Not Found!");
        }
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
        if((configManager.checkUserFeature("PROFILE_SETTINGS") || configManager.checkUserPermission("PROFILE_SETTINGS_VIEW") || configManager.checkUserPermission("PROFILE_SETTINGS_UPDATE"))) {
          this.view.segSettingsProfile.isVisible = true;
          if (CommonUtilities.getSCAType() == '2') 
          this.segChangePassword();
          else
          this.setSegSettingsProfile();
        }
      else{
          this.view.segSettingsProfile.isVisible = false;
        }
      
        if((configManager.checkUserFeature("ACCOUNT_SETTINGS") || configManager.checkUserPermission("ACCOUNT_SETTINGS_VIEW") || configManager.checkUserPermission("ACCOUNT_SETTINGS_EDIT"))) {
          this.view.segSettingsDefaultAccount.isVisible = true;
        }
        else{
          this.view.segSettingsDefaultAccount.isVisible = false;
        }
        if((configManager.checkUserFeature("CDP_CONSENT") || configManager.checkUserPermission("CDP_CONSENT_VIEW") || configManager.checkUserPermission("CDP_CONSENT_EDIT"))) {
          this.view.segConsentManagement.isVisible = true;
        }
        else{
          this.view.segConsentManagement.isVisible = false;
        }
		
        if((configManager.checkUserFeature("PSD2_TPP_CONSENT") || configManager.checkUserPermission("PSD2_TPP_CONSENT_VIEW") || configManager.checkUserPermission("PSD2_TPP_CONSENT_REVOKE"))) {
          this.view.segManageAccountAcces.isVisible = true;
        }
        else{
          this.view.segManageAccountAcces.isVisible = false;
        }
		if (applicationManager.getPresentationFormUtility().getDeviceName() !==	"iPhone") {
			// Footer Menu
			this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
		
		}
        this.view.customHeader.flxBack.isVisible = true;
        this.view.customHeader.flxBack.onClick = this.navigateBack;
        this.showAvailableThemes();
        this.navBackToSettings();
    },
    postShow: function(){
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});   
        var scrollToAccountSettings = settingsModule.presentationController['navigatingFromAccountDetails'];   
        if(!kony.sdk.isNullOrUndefined(scrollToAccountSettings) && scrollToAccountSettings == true){
            this.view.flxMainContainer.scrollToWidget(this.view.segSettingsDefaultAccount);
            settingsModule.presentationController.navigatingFromAccountDetails = false;
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    setFlowActions: function() {
        var scope = this;
//       this.view.customHeader.flxBack.onClick = function() {
//         //scope.navToMenu();
        
//       };
	    this.view.segSettingsDefaultAccount.onRowClick = this.segDefaultAccountOnClick;
		this.view.segSettingsLogin.onRowClick = this.segloginOnClick;
    this.view.segSettingsDeviceManagement.onRowClick = this.onRowClickDeviceManagement;
		this.view.segSettingsProfile.onRowClick = function(){
          scope.onRowClickOfProfile();
        };
      this.view.segSettingsAlerts.onRowClick= this.segAlertsOnClick;
      this.view.segConsentManagement.onRowClick= this.segConsentOnClick;
      this.view.segManageAccountAcces.onRowClick= this.segManageAccountAccesOnClick;
      this.view.flxCross.onClick = this.navBackToSettings;
      this.view.btnOk.onClick = this.navBackToSettings;
    },
    navBackToSettings: function() {
        this.view.flxResetPinError.isVisible = false;
        this.view.flxMainContainer.isVisible = true ;
    },
    navToMenu: function() {
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsMod.presentationController.commonFunctionForNavigation("frmMenu");
    },
    setPreshowData: function() {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxMainContainer.bottom = "0dp";
        this.view.flxFooter.isVisible = false;
      } else {
        this.view.flxHeader.isVisible = false;
        this.view.flxFooter.isVisible = true;
        this.view.flxMainContainer.bottom = "60dp";
        this.view.flxMainContainer.top = "0dp";
      }
      //        this.view.flxMainContainer.contentOffset = {x:0,y:0};
      var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      if (settingsModule .presentationController.retainSegmentoffset) {
        this.view.flxMainContainer.setContentOffset({"y" : this.contentOffset});
      } else {
        this.view.flxMainContainer.setContentOffset({"y" : "0dp"});
      }
    },
   /**
   * used to fetch the alerts categories.
   */
  	setUserAlerts: function() {
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsMod.presentationController.getAlertcategoriesList();
    },

    showPopUpMessage: function () {
      try {
        var navManager = applicationManager.getNavigationManager();
        var msgData = navManager.getCustomInfo("frmSettings");
        if (!kony.sdk.isNullOrUndefined(msgData)) {
          //if((msgData.popUpMsg!==null)&&(msgData.popUpMsg!=="")&&(msgData.popUpMsg !== undefined))
          if (!kony.sdk.isNullOrUndefined(msgData.popUpMsg) && msgData.popUpMsg !== "") {
            var scopeObj = this;
            applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj, msgData.popUpMsg);
          }
          msgData.popUpMsg = "";
          navManager.setCustomInfo("frmSettings", msgData);
        }
      }
      catch (err) {
        kony.print("Error in showPopUpMessage: " + JSON.stringify(err));
      }
    },
    showPwdUpdatedSuccess: function() {
        var scopeObj = this;
        this.timerCounter = parseInt(this.timerCounter) + 1;
        var timerId = "timerPopupError" + this.timerCounter;
        this.view.flxPopup.skin = "sknFlx43ce6e";
        this.view.customPopup.imgPopup.src = "confirmation.png";
        this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.Profile.changePassword");
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);
    },
    showUsernameUpdatedSuccess: function() {
        var scopeObj = this;
        this.timerCounter = parseInt(this.timerCounter) + 1;
        var timerId = "timerPopupError" + this.timerCounter;
        this.view.flxPopup.skin = "sknFlx43ce6e";
        this.view.customPopup.imgPopup.src = "confirmation.png";
        this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.Profile.changeUsername");
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);
    },
    segDefaultAccountOnClick :function(){
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var selectedAcntRow = this.view.segSettingsDefaultAccount.selectedIndex[1];
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      var selectedRecord = this.view.segSettingsDefaultAccount.data[0][1][selectedAcntRow];
      var data = [];
      data[0]=selectedRecord;
      navManager.setCustomInfo("frmPreferencesDefaultAccount",data);
      settingsMode.presentationController.retainSegmentoffset = true;
      settingsMode.presentationController.setDataDefaultLogin(selectedAcntRow);
    },
    
    frmPreShow : function(){
      var scope = this;
      scope.setDeviceManagementDataUtility();
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler =  applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUSETTINGS);
      this.setSegLoginData();
      if (CommonUtilities.getSCAType() == '2') 
      this.segChangePassword();
      else
      this.setSegSettingsProfile();
      this.setAccountSettings();
      //this.isPinServiceCallRequired();

      if((configManager.checkUserFeature("CDP_CONSENT") || configManager.checkUserPermission("CDP_CONSENT_VIEW") || configManager.checkUserPermission("CDP_CONSENT_EDIT"))) {
        this.view.segConsentManagement.isVisible = true;
        this.setConsentManagement();
      }
      else{
        this.view.segConsentManagement.isVisible = false;
      }

      if((configManager.checkUserFeature("PSD2_TPP_CONSENT") || configManager.checkUserPermission("PSD2_TPP_CONSENT_VIEW") || configManager.checkUserPermission("PSD2_TPP_CONSENT_REVOKE"))) {
        this.view.segManageAccountAcces.isVisible = true;
        this.setManageAccountAcces();
      }
      else{
        this.view.segManageAccountAcces.isVisible = false;
      }
      var alertManagement = applicationManager.getConfigurationManager().checkUserPermission("ALERT_MANAGEMENT") ? true : false;
      /* SHOW_ALERTS_IN_SETTINGS gates the Alerts section. Default FALSE: only an explicit "true"
         shows it, so an absent, empty, misspelt or unreadable property leaves the section hidden.
         The property is therefore required to keep Alerts visible - it is not optional.
         The section heading lives in the segment data, so hiding the segment removes the heading with
         it, and setUserAlerts sits inside this branch, so the alerts category service is not called
         when the section is hidden. */
      var alertsSectionEnabled = CommonUtilities.getBooleanConfig("SHOW_ALERTS_IN_SETTINGS", false);
      if(alertManagement && alertsSectionEnabled){
        this.view.segSettingsAlerts.isVisible = true;
        this.setUserAlerts();
      }else{
        this.view.segSettingsAlerts.isVisible = false;
      }

    },
   /**
  * used to bind alert data to the segment.
  * @param {object} alertData - contains category list and config properties
  */
    bindData: function(categoryData) {
      var categoryList = categoryData.records;
      var alertConfig = (categoryData.alertConfiguration && categoryData.alertConfiguration.length >0) ?
          categoryData.alertConfiguration[0] : "";
      var data = [
        [{
          "lblProfileHeading": kony.i18n.getLocalizedString("kony.mb.Settings.Alerts"), "lblSeperator":"-"
        },
         []
        ]
      ];
      for (var i = 0; i < categoryList.length; i++) {
        var status = categoryList[i].categorySubscription.isSubscribed;
        if (status === "true") this.alertStatus = kony.i18n.getLocalizedString("kony.mb.On");
        else this.alertStatus = kony.i18n.getLocalizedString("kony.mb.Off");
        //show category if there are groups/alerts only
        if (categoryList[i].alertcategory_Name == "Security") {
          categoryList[i].alertcategory_Name = kony.i18n.getLocalizedString("i18n.OnlineHelp.SecurityHeader");
        } else if (categoryList[i].alertcategory_Name == "Transaction & Payment") {
          categoryList[i].alertcategory_Name = kony.i18n.getLocalizedString("kony.mb.alerts.TransactionAlerts");
        } else if (categoryList[i].alertcategory_Name == "Account") {
          categoryList[i].alertcategory_Name = kony.i18n.getLocalizedString("kony.mb.accounts.account");
        } else if (categoryList[i].alertcategory_Name == "Approvals") {
          categoryList[i].alertcategory_Name = kony.i18n.getLocalizedString("kony.mb.approvalRequest.approvalHeaderName");
        } else if (categoryList[i].alertcategory_Name == "Trade Finance") {
          categoryList[i].alertcategory_Name = kony.i18n.getLocalizedString("i18n.ImportLC.TradeFinance");
        } else if (categoryList[i].alertcategory_Name == "Trade Supply Finance") {
          categoryList[i].alertcategory_Name = kony.i18n.getLocalizedString("kony.mb.alerts.TradeSupplyFinance");
        }
        if(categoryList[i].Groups_count === "0" || (categoryList[i].Alerts_count && categoryList[i].Alerts_count === "0") ||
          categoryList[i].alertcategory_status_id !== "SID_ACTIVE"){
          //do-nothing
        } else{
          if (kony.i18n.getCurrentLocale() === "ar_AE"){
         data[0][1].push({
            "lblTitle": categoryList[i].alertcategory_Name,
            "lblValue": (categoryList[i].alertcategory_accountLevel === "false") ? this.alertStatus : "",
            "imgArrow": "chevron_reverse.png",
            "category": categoryList[i].alertcategory_id,
            "sequence": categoryList[i].alertcategory_DisplaySequence,
            "categorySubscription": categoryList[i].categorySubscription,
            "isAccountLevel":categoryList[i].alertcategory_accountLevel
          });
        }
          else{
            data[0][1].push({
              "lblTitle": categoryList[i].alertcategory_Name,
              "lblValue": (categoryList[i].alertcategory_accountLevel === "false") ? this.alertStatus : "",
              "imgArrow": "chevron.png",
              "category": categoryList[i].alertcategory_id,
              "sequence": categoryList[i].alertcategory_DisplaySequence,
              "categorySubscription": categoryList[i].categorySubscription,
              "isAccountLevel":categoryList[i].alertcategory_accountLevel
            });

          }
        }
       
      }
      if (kony.i18n.getCurrentLocale() === "ar_AE"){
      var communicationRow = [{
        "lblTitle": "Alert Communication",
        "lblValue": "",
        "imgArrow": "chevron_reverse.png",
        "category": "ALERT_COMMUNICATION",
        "sequence": "",
        "categorySubscription": null,
        "isAccountLevel":null
      }];
    }
    else{
      var communicationRow = [{
        "lblTitle": "Alert Communication",
        "lblValue": "",
        "imgArrow": "chevron.png",
        "category": "ALERT_COMMUNICATION",
        "sequence": "",
        "categorySubscription": null,
        "isAccountLevel":null
      }];
    }
      if(alertConfig && alertConfig.enableSeparateContact &&
         categoryData.alertConfiguration[0].enableSeparateContact === "1"){
        data[0][1] = communicationRow.concat(data[0][1]);
      }
      this.view.segSettingsAlerts.widgetDataMap = {
      "flxRightWrapper": "flxRightWrapper",
      "flxSepartaor": "flxSepartaor",
      "flxSettings": "flxSettings",
      "flxSettingsHeader": "flxSettingsHeader",
      "imgArrow": "imgArrow",
      "lblProfileHeading": "lblProfileHeading",
      "lblTitle": "lblTitle",
      "lblValue": "lblValue",
      "lblSeperator":"lblSeperator",
      "flxTopShadow":"flxTopShadow"
      
    };
	if(applicationManager.getConfigurationManager().checkUserFeature("VIEW_ONLY_ROLE")){
		for(i=0;i<data[0][1].length;i++){
			if(data[0][1][i].lblTitle==kony.i18n.getLocalizedString("kony.mb.enroll.security")){
				data[0][1].splice(i, 1)
			}
			if(data[0][1][i].lblTitle==kony.i18n.getLocalizedString("kony.mb.Hamburger.Notifications")){
				data[0][1].splice(i, 1)
			}
		}
	}
      this.view.segSettingsAlerts.setData(data);  //sibhi
      this.view.flxMainContainer.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
 /* segAccountsData : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    var data = settingsMode.presentationController.defaultAccounts();
    this.view.segSettingsDefaultAccount.setData(data);
  },*/
  onRowClickOfProfile : function(){
    try{
    var scopeObj = this;
    var selectedIndex = this.view.segSettingsProfile.selectedRowIndex;
    selectedIndex = parseInt(selectedIndex[1]);
    var selectedSegData = this.profileData[selectedIndex]["lblTitle"];
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.ProfileChangeUsername.Title")){
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsMode.presentationController.getUsernameRulesAndPolicy();
    }
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title")){
      if (CommonUtilities.getSCAType() == '2'){
        this.handleSynErrorResponse(RDNAAPI.initiateUpdateFlowForCredential("Password"));
      }else{
        var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        settingsMode.presentationController.navigateToChangePassword();
      }
    }
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title")){
      var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settings.presentationController.navigateToProfilePersonalDetails();
    }
    if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage")){
      var settingsLanguage = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsLanguage.presentationController.navigateToProfileChangeLanguage();
    }
    if(selectedSegData === kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences")){
      var settingsLanguage = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsLanguage.presentationController.navigateToProfileEntity();
    }
	 ///if(selectedSegData === kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPin.Title")){
   var titleSetup  = kony.i18n.getLocalizedString("i18n.HBL.SetupTransactionPIN");
   var titleChange = kony.i18n.getLocalizedString("kony.mb.Profile.ChangeTransactionPIN");
    if (selectedSegData === titleSetup || selectedSegData === titleChange) {
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settingsMode.presentationController.navigateToSetOrResetTransactionPin();
      } if (selectedSegData === kony.i18n.getLocalizedString("i18n.mb.transactionpin.reset")) {
       /*
      applicationManager.getPresentationUtility().showLoadingScreen();
      var configManager = applicationManager.getConfigurationManager();
      var param = {
        "username": kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName,
      }
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsUIModule", "appName": "ManageProfileMA" });
      settingsMode.presentationController.transactionPINResetStatus(param);
      */
      var message = kony.i18n.getLocalizedString("i18n.HBL.ResetPinConfirmation");
      var btnPrimary = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      var btnSecondary = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      applicationManager.getPresentationUtility().Alert(message, scopeObj.onClickResetPinHandler.bind(scopeObj), constants.ALERT_TYPE_CONFIRMATION, btnPrimary, btnSecondary, "");
    }
	 if(selectedSegData === kony.i18n.getLocalizedString("kony.i18n.settings.biotransactionpin")){
     var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo("MFAEnrtyPoint","frmSettings");
	 navManager.navigateTo("frmEnableBiometricMFA");
    }
    }catch(e){
    kony.print("onRowClickOfProfile"+e);
  }
  },

   onClickResetPinHandler : function (response) {
      if (response === true) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
        var param = {
          "username": kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName,
        }
        var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsUIModule", "appName": "ManageProfileMA" });
        settingsMode.presentationController.transactionPINResetStatus(param);
      } else {
        kony.print("on click No in Reset PIN");
      }
    },

    checkForToastMessageResetPinError: function () {
      //this.view.rchTxtError.text = kony.i18n.getLocalizedString("i18n.HBL.ResetPopUpMessage");
      this.view.rchTxtError.text = kony.i18n.getLocalizedString("i18n.HBL.ResetPopUpMessageNew");
      this.view.flxResetPinError.isVisible = true;
      this.view.flxMainContainer.isVisible = false;
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxResetPinError.top = "0dp";
        this.view.flxResetPinError.bottom = "60dp";
      } else {
        this.view.flxResetPinError.bottom = "0dp";
        this.view.flxResetPinError.top = "56dp";
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    checkForToastMessageSuccess: function () {
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("resetPinSuccess");
      if (!kony.sdk.isNullOrUndefined(data)) {
        var msg = data.message;
        if (!kony.sdk.isNullOrUndefined(msg)) {
          applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
          navManager.setCustomInfo("resetPinSuccess", null);
        }
      }
    },
    checkForToastMessageResetCommonError: function () {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.deviceConnectivityIssueMessage"));
    },
  updatePassword : function(response){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('UpdatePasswordRules', response.challengeResponse.challengeInfo.filter((res)=> res.key == "PASSWORD_POLICY")[0].value);
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "SettingsUIModule",
      "appName": "ManageProfileMA"
    });

    settingsMode.presentationController.navigateToChangePassword();
  },
  segChangePassword : function(){
    var userObj = applicationManager.getUserPreferencesManager();
    var userName = userObj.getUserName();
    if (CommonUtilities.getSCAType() == '2') {
    this.handleSynErrorResponse(RDNAAPI.getAllChallenges(userName));
    }
  },
  onCredentialsAvailableForUpdate : function(response){
    if (response.options[0] != 'Password') this.scaPasswordEnabled = false;
      var configManager = applicationManager.getConfigurationManager();
    let navigationManager = applicationManager.getNavigationManager();
    var tempData = [];
  if (this.scaPasswordEnabled == true) {

      if (kony.i18n.getCurrentLocale() === "ar_AE"){
        if(configManager.checkUserPermission("PASSWORD_UPDATE")) {
          tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title"),"lblValue":"","imgArrow":"chevron_reverse.png"});
        }
      }
      else{
        if(configManager.checkUserPermission("PASSWORD_UPDATE")) {
          tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title"),"lblValue":"","imgArrow":"chevron.png"});
        }
      }
    }
   
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
      tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title"),"lblValue":"","imgArrow":"chevron_reverse.png"});
	  if(this.isVisibleLanguage){
		  tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage"),"lblValue":"","imgArrow":"chevron_reverse.png"});
	  }
    }
    else{
      tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title"),"lblValue":"","imgArrow":"chevron.png"});
	if(this.isVisibleLanguage){
		tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage"),"lblValue":"","imgArrow":"chevron.png"});
	}

    }
    let singleEntityValue = "true";
    if (configManager.configurations.getItem("isSingleEntity") !== undefined) {
      singleEntityValue = configManager.configurations.getItem("isSingleEntity");
    }
    let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
    if (configManager.checkUserFeature("MULTI_ENTITY_PREFERENCE") && configManager.checkUserPermission("SET_DEFAULT_ENTITY_PREFERENCE") && singleEntityValue === "false" && userLegalEntitesSize > 0) {
      let defaultLegalEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
      let userLegalEntitiesList = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
      navigationManager.setCustomInfo("frmSettingsEntityPreferences", userLegalEntitiesList);
      let defaultLegalEntityName = "";
      let defaultLegalEntityData = userLegalEntitiesList.find(entityData => entityData.id === defaultLegalEntity);
      defaultLegalEntityName = defaultLegalEntityData && defaultLegalEntityData.companyName ? defaultLegalEntityData.companyName : "";
      if (kony.i18n.getCurrentLocale() === "ar_AE") { 
        tempData.push({ "lblTitle": kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences"), "lblValue": {"text": defaultLegalEntityName, "skin":"sknLbl727272SSP30pxTab"}, "imgArrow": "chevron_reverse.png" });
      } 
      else 
      { 
        tempData.push({ "lblTitle": kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences"), "lblValue": {"text": defaultLegalEntityName, "skin":"sknLbl727272SSP30pxTab"}, "imgArrow": "chevron.png" });
      }
    }
    var data = [
      [
        {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.Settings.Profile"),"lblSeperator":"-"},
        tempData
      ]];
    this.profileData = tempData;
    this.view.segSettingsProfile.widgetDataMap = {
      "flxRightWrapper": "flxRightWrapper",
      "flxSepartaor": "flxSepartaor",
      "flxSettings": "flxSettings",
      "flxSettingsHeader": "flxSettingsHeader",
      "imgArrow": "imgArrow",
      "lblProfileHeading": "lblProfileHeading",
      "lblTitle": "lblTitle",
      "lblValue": "lblValue",
      "lblSeperator":"lblSeperator",
      "flxTopShadow":"flxTopShadow"

    };
    this.view.segSettingsProfile.setData(data); //sibhi

    this.view.segSettingsProfile.onRowClick = this.onRowClickOfProfile;

    
  },
  handleSynErrorResponse: function(response) {
    kony.print("Avengers : handlesyncresponse : " + JSON.stringify(response));

    function SHOW_ALERT_Callback(form) {
      // form.rdnaObj.resetAuthState();
    }
    if (response[0].shortErrorCode !== 0) {
      if(response[0].shortErrorCode === 213){
        var errormsg = "Something went wrong, please Retry";
        this.failureCallback(errormsg);
      }
      else{
        var error = "Error while updating password"
        this.failureCallback(error);
      }
    }

  },
  failureCallback: function(error){
    kony.ui.Alert({
                  "alertType": constants.ALERT_TYPE_ERROR,
                  "alertTitle": null,
                  "yesLabel": null,
                  "noLabel": null,
                  "alertIcon": null,
                  "message": error
                  }, {
                  "iconPosition": constants.ALERT_ICON_POSITION_LEFT
              });
  },
  getSettingsStatus : function(){
	 try{
	var navManager = applicationManager.getNavigationManager();
    var loginData = navManager.getCustomInfo("frmSettings");
    var tempLoginMode="";
    if (CommonUtilities.getSCAType() == '2')
        tempLoginMode =  applicationManager.getUserPreferencesManager().getDefaultAuthMode();
    else{
		if(loginData&&loginData.defLoginMode)
        tempLoginMode = loginData.defLoginMode;
	else
		tempLoginMode = applicationManager.getUserPreferencesManager().getDefaultAuthMode();
	}
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var alertsTurnedOn = userPrefManager.getAlertsInfo();
	if(loginData.hasOwnProperty("istouchIdAvail")&&(!kony.sdk.isNullOrUndefined(loginData.istouchIdAvail))){
    this.isTouchIdAva = loginData.istouchIdAvail;
	}
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
   // this.isFaceIdAva = loginData.isFaceIdAvail;
     if (tempLoginMode == "password")
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.login.password");
    else if (tempLoginMode == "pin")
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.devReg.pin");
    else if (tempLoginMode == "touchid"){
      if(isIphone)
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.devReg.touchidTitle");
      else
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.devReg.Biometric");
    }
    else if (tempLoginMode == "faceid")
          this.defLoginStatus = kony.i18n.getLocalizedString("kony.mb.common.FaceCaps");
    if(loginData.accPreview === true){
       this.acctPreviewStatus = kony.i18n.getLocalizedString("kony.mb.On");
    }
    else{
       this.acctPreviewStatus = kony.i18n.getLocalizedString("kony.mb.Off");
    }
    if(loginData.deviceReg === true){
       this.devRegStatus = kony.i18n.getLocalizedString("kony.mb.On");
    }
    else{
       this.devRegStatus = kony.i18n.getLocalizedString("kony.mb.Off");
    }
    if(alertsTurnedOn === "true"){
       this.alertStatus = kony.i18n.getLocalizedString("kony.mb.On");
    }
    else{
       this.alertStatus = kony.i18n.getLocalizedString("kony.mb.Off");
    }
	 }catch(err){
		kony.print("err:"+err); 
	 }
    
 },
  setSegLoginData : function(){
    this.getSettingsStatus();
    var data;
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
    if(applicationManager.getConfigurationManager().checkUserFeature("ONLINE_BANKING_ACCESS")){
      data=[
        [
              {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.login.logIn"),"lblSeperator" : "-"},
            [
                  //{"lblTitle":kony.i18n.getLocalizedString("kony.mb.login.accountPreview"),"lblValue":this.acctPreviewStatus,"imgArrow":"chevron_reverse.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.devReg.defaultLogin"),"lblValue":this.defLoginStatus,"imgArrow":"chevron_reverse.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.settings.eBankingAccess"),"lblValue":"","imgArrow":"chevron_reverse.png"}
            ]
       ]];
    }else{
      data=[
        [
              {"lblProfileHeading": {"text" : kony.i18n.getLocalizedString("kony.mb.login.logIn")},"lblSeperator" : "-"},
            [
                  //{"lblTitle":kony.i18n.getLocalizedString("kony.mb.login.accountPreview"),"lblValue":this.acctPreviewStatus,"imgArrow":"chevron_reverse.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.devReg.defaultLogin"),"lblValue":this.defLoginStatus,"imgArrow":"chevron_reverse.png"},
            ]
       ]];
    }
  }
  else{
    if(applicationManager.getConfigurationManager().checkUserFeature("ONLINE_BANKING_ACCESS")){
      data=[
        [
              {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.login.logIn"),"lblSeperator" : "-"},
            [
                  //{"lblTitle":kony.i18n.getLocalizedString("kony.mb.login.accountPreview"),"lblValue":this.acctPreviewStatus,"imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.devReg.defaultLogin"),"lblValue":this.defLoginStatus,"imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.settings.eBankingAccess"),"lblValue":"","imgArrow":"chevron.png"}
            ]
       ]];
    }else{
      data=[
        [
              {"lblProfileHeading": {"text" : kony.i18n.getLocalizedString("kony.mb.login.logIn")},"lblSeperator" : "-"},
            [
                  //{"lblTitle":kony.i18n.getLocalizedString("kony.mb.login.accountPreview"),"lblValue":this.acctPreviewStatus,"imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.devReg.defaultLogin"),"lblValue":this.defLoginStatus,"imgArrow":"chevron.png"},
            ]
       ]];
    }
  }
    this.view.segSettingsLogin.setData(data); // sibhi
    /*if(!this.isFaceIdAva){
      this.view.segSettingsLogin.removeAt(4,0);
    }*/
  },
    segloginOnClick : function(){
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";
      var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});      
      settingsModule.presentationController.retainSegmentoffset = true;
      this.selectedAcntRow = this.view.segSettingsLogin.selectedIndex[1];
      var navManager = applicationManager.getNavigationManager();
      switch(this.selectedAcntRow ){
        case 0:
          this.gotoDefaultLogin();
          break;               
        case 1:
          this.enableEBankingAccess();
          break;
        /*
        case 2:
          this.enableEBankingAccess();
          break;
          /*case 3:
        	this.goToPinSettings();
            break;
      case 4:
          /* if(this.isFaceIdAva)
            	gotoFaceIdSettings();
          else if(!hasFaceId && hasTouchId)
            	this.goToTouchIdSettings();
        	break;*/
      }
    },
    
    segConsentOnClick : function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "CDPConsentUIModule", "appName": "ConsentMgmtMA"});
      new kony.mvc.Navigation({"appName" : "ConsentMgmtMA", "friendlyName" : "CDPConsentUIModule/frmConsentManagement"}).navigate();
    },
    
    segManageAccountAccesOnClick : function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "PSD2ConsentUIModule", "appName": "ConsentMgmtMA"});
      new kony.mvc.Navigation({"appName" : "ConsentMgmtMA", "friendlyName" : "PSD2ConsentUIModule/frmSelectTPP"}).navigate();
    },
    
  gotoAcctPreview : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
	var navManager = applicationManager.getNavigationManager();
    var loginData = navManager.getCustomInfo("frmSettings");
    navManager.setCustomInfo("frmPreferencesAccountPreview",loginData);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    //settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesAccountPreview");
    settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsUIModule/frmPreferencesAccountPreview"});
  },
  updateSegmentData : function(feature,status)
  {
    var record = {"lblTitle":feature,"lblValue":status,"imgArrow":"segmentarrow.png"};
    this.view.segSettingsLogin.setDataAt(record,this.selectedAcntRow);
  },
  //Navigate to DevReg flow
  gotoDevRegistration : function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var navManager = applicationManager.getNavigationManager();
     var loginData = navManager.getCustomInfo("frmSettings");
     var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
     if(loginData.deviceReg){
        //settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesDeviceDeRegistration");
        settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsUIModule/frmPreferencesDeviceDeRegistration"});
     }
     else{
       navManager.setCustomInfo("frmPreferencesDeviceRegistration",loginData);
        //settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesDeviceRegistration");
        settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsUIModule/frmPreferencesDeviceRegistration"});
     }
  },
  //Navigate to Default login
   gotoDefaultLogin : function(){
     try{
     applicationManager.getPresentationUtility().showLoadingScreen();
     var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
     var navManager = applicationManager.getNavigationManager();
     var flagData = authMod.presentationController.getAuthFlags();
     flagData.popUpMsg="";
     if (CommonUtilities.getSCAType() == '2')
        navManager.setCustomInfo("frmLDAToggleUniken",flagData);
     else
        navManager.setCustomInfo("frmPreferencesDefaultLogin",flagData);
     var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
     if (CommonUtilities.getSCAType() == 1) {
                settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesDefaultLoginHID"});
      }else if (CommonUtilities.getSCAType() == 2) {
                settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsUnikenUIModule/frmLDAToggleUniken"});
      }
      else{
                //settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesDefaultLogin");
                settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsUIModule/frmPreferencesDefaultLogin"});
     }
   }catch(er){
	   applicationManager.getPresentationUtility().dismissLoadingScreen();
       kony.print(er);
     }
  },
  //Navigate to Pin Login flow
  goToPinSettings : function(){
      	 var navManager = applicationManager.getNavigationManager();
         var userPreferencesManager = applicationManager.getUserPreferencesManager();
         var loginData = navManager.getCustomInfo("frmSettings");
         var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
         if(loginData.pin){
                if (CommonUtilities.getSCAType() == 1) {
                    settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesPinHID"});}
                else{
                    //settingsMod.presentationController.commonFunctionForNavigation("frmPreferencesPin");}
                    settingsMod.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsUIModule/frmPreferencesPin"});}
            }
    	 else{
            settingsMod.presentationController.commonFunctionForNavigation("frmDevRegPin");
          }
    },

    enableEBankingAccess : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      //settingsMod.presentationController.commonFunctionForNavigation("frmEBankingAccess");
      settingsMod.presentationController.getLegalEntities();
    },
    
   checkForToastMessage : function(){
      var navigationManager = applicationManager.getNavigationManager();
      var data = navigationManager.getCustomInfo('frmProfileUsername');
      if(data && data.updateUsernameStatus ==='usernameUpdated'){
        var i18n_string = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changeUsername');
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,i18n_string);
        data.updateUsernameStatus = null;
        navigationManager.setCustomInfo('frmProfileUsername',data);
      }
     var data1 = navigationManager.getCustomInfo('frmProfileChangeAndUpdatePassword');
     if(data1 === "passwordUpdated"){
       var i18n_str = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changePassword');
       applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,i18n_str);
       navigationManager.setCustomInfo('frmProfileChangeAndUpdatePassword',null);
     }
   },
    checkForToastMessagePinStatus: function () {
      var navManager = applicationManager.getNavigationManager();
      var showSetTransactionSuccessMessage = navManager.getCustomInfo("showSetTransactionSuccessMessage");
      var showChangeTransactionSuccessMessage = navManager.getCustomInfo("showChangeTransactionSuccessMessage");
      if (showSetTransactionSuccessMessage !== undefined && showSetTransactionSuccessMessage !== "" && showSetTransactionSuccessMessage !== null && showSetTransactionSuccessMessage == true) {
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinSetSuccessMessage"));
        navManager.setCustomInfo('showSetTransactionSuccessMessage', null);
      } else if (showChangeTransactionSuccessMessage !== undefined && showChangeTransactionSuccessMessage !== "" && showChangeTransactionSuccessMessage !== null && showChangeTransactionSuccessMessage == true) {
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinResetSuccessMessage"));
        navManager.setCustomInfo('showChangeTransactionSuccessMessage', null);
      }
    },
  /**
* used to retrieve categoryID and navigate to frmAlertsList.
*/
    segAlertsOnClick : function(){
      this.contentOffset = this.view.flxMainContainer.contentOffsetMeasured.y + "dp";     
      var selectedAlertData = this.view.segSettingsAlerts.selectedRowItems[0];
      var categoryID = selectedAlertData.category;
      var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsAlertsUIModule", "appName" : "AlertSettingsMA"});
      settingsModule.presentationController.retainSegmentoffset = true;
      settingsModule.presentationController.setAlertsCategoryID(categoryID);
      var navManager = applicationManager.getNavigationManager();
      if(selectedAlertData.isAccountLevel ===  "true"){
        applicationManager.getPresentationUtility().showLoadingScreen();
        navManager.setCustomInfo("frmAlertsListHeader",selectedAlertData.lblTitle);
        navManager.setCustomInfo("accountAlertsData",selectedAlertData);
        navManager.setCustomInfo("selectedCategoryInfo",selectedAlertData);
        settingsModule.presentationController.getCustomerAccountAlertPreference();
       
        // 	 settingsModule.presentationController.commonFunctionForNavigation("frmAlertsAccountPref");
      } else if(categoryID ===  "ALERT_COMMUNICATION"){
        navManager.setCustomInfo("frmAlertsListHeader",selectedAlertData.lblTitle);
        settingsModule.presentationController.commonFunctionForNavigation({"appName" : "AlertSettingsMA", "friendlyName" : "frmAlertsCommunication"});
      }
      else{
        navManager.setCustomInfo("frmAlertsListHeader",selectedAlertData.lblTitle);
        navManager.setCustomInfo("selectedCategoryInfo",selectedAlertData);
        settingsModule.presentationController.getAlertsBasedOnCategoryID(false);
      }
        
        //settingsModule.presentationController.commonFunctionForNavigation("frmAlertGroupsList");
        
    },
  gotoAccountAlerts : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    try{
       	var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsAlertsUIModule", "appName" : "AlertSettingsMA"});
      	settingsModule.presentationController.getAllAccountAlerts(this.getAllAccountAlertsSuccess.bind(this), this.getAllAccountAlertsFailure.bind(this));
        }
      catch(exception){
      }
  },
  getAllAccountAlertsSuccess: function(response){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmAlertsAccountList", response);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsAlertsUIModule", "appName" : "AlertSettingsMA"});
    settingsMod.presentationController.commonFunctionForNavigation("frmAlertsAccountList");
  },
  getAllAccountAlertsFailure : function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  gotoDealsAndSecurityAlerts : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    try{
      	var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      	settingsModule.presentationController.getDealsAndSecurityAlerts(this.getDealsAndSecurityAlertsSuccess.bind(this),this.getDealsAndSecurityAlertsFailure.bind(this));
      }
      catch(exception){
      }
  },
  getDealsAndSecurityAlertsSuccess: function(response){
    var navManager = applicationManager.getNavigationManager();
    response.push(alertType);
    navManager.setCustomInfo("frmAlertsDealsAndSecurity", response);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsMod.presentationController.commonFunctionForNavigation("frmAlertsDealsAndSecurity");
  },
  getDealsAndSecurityAlertsFailure : function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  setAccountSettings :function(){
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
    var data=[
      		[
                {"lblProfileHeading":  {"text" :kony.i18n.getLocalizedString("kony.mb.Settings.AccountSettings")}, "lblSeperator":"-"},
              [
                    {"lblTitle":kony.i18n.getLocalizedString("kony.mb.EStmt.AccountPreferences"),"lblValue":"","imgArrow":"chevron_reverse.png"},
                    {"lblTitle":kony.i18n.getLocalizedString("kony.mb.settings.SetDefaultAccount"),"lblValue":"","imgArrow":"chevron_reverse.png"},
              ]
         ]];
        }
    else{
      var data=[
        [
              {"lblProfileHeading":  {"text" :kony.i18n.getLocalizedString("kony.mb.Settings.AccountSettings")}, "lblSeperator":"-"},
            [
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.EStmt.AccountPreferences"),"lblValue":"","imgArrow":"chevron.png"},
                  {"lblTitle":kony.i18n.getLocalizedString("kony.mb.settings.SetDefaultAccount"),"lblValue":"","imgArrow":"chevron.png"},
            ]
       ]];
    }
    this.view.segSettingsDefaultAccount.setData(data); //sibhi
  },
 isPinServiceCallRequired: function () {
      var navManager = applicationManager.getNavigationManager();
      var pinStatus = navManager.getCustomInfo("transactionPinSetOrNot");
      var serviceCallReq = false;
      if (pinStatus == undefined || pinStatus == null || pinStatus == "") {
        serviceCallReq = true;
      } else if(pinStatus == "true") {
        serviceCallReq = false;
      } else if(pinStatus == "false") {
        serviceCallReq = true;
      }
      if (serviceCallReq) {
        this.profileTransactionPinStatus();
      }
    },
  
    profileTransactionPinStatus: function() {
    var navManager = applicationManager.getNavigationManager();
    var username = navManager.getCustomInfo("frmLoginusername");
      var configManager = applicationManager.getConfigurationManager();
    var param={
        // "userName": username
        "userName": kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName,
    }
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
    settingsMod.presentationController.transactionPinStatus(param); 
},


  onRowClickDeviceManagement: function() {
            const selectedRowIndex = parseInt(this.view.segSettingsDeviceManagement.selectedRowIndex[1]);
            const selectedSegRowName = this.deviceManagementData[selectedRowIndex]["lblTitle"];
            const settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "SettingsUIModule",
                "appName": "ManageProfileMA"
            });
            if (1 === CommonUtilities.getSCAType()) {
            if (selectedSegRowName === kony.i18n.getLocalizedString("kony.mb.sca.RegisteredDevices")) {
                settingsModule.presentationController.commonFunctionForNavigation({
                    "appName": "ManageProfileMA",
                    "friendlyName": "SettingsHIDUIModule/frmDeviceManagement"
                });
            }
            }
            else
              if (2 === CommonUtilities.getSCAType()) {
                if (selectedSegRowName === kony.i18n.getLocalizedString("kony.mb.sca.RegisteredDevices")) {
                  settingsModule.presentationController.commonFunctionForNavigation({
                    "appName": "ManageProfileMA",
                    "friendlyName": "SettingsUnikenUIModule/frmDeviceManagementUniken"
                  });
                }
              }
    },
    setDeviceManagementDataUtility: function(){
      //if(CommonUtilities.isSCAEnabled()){
         if (1 === CommonUtilities.getSCAType()||2 === CommonUtilities.getSCAType()) {
        this.view.segSettingsDeviceManagement.setVisibility(true);
        this.setDeviceManagementData();
      } else {
        this.view.segSettingsDeviceManagement.setVisibility(false);        
      }
      this.view.flxMainContainer.forceLayout();
    },

    setDeviceManagementData: function(){
      const segRowData = [
        {"lblTitle":kony.i18n.getLocalizedString("kony.mb.sca.RegisteredDevices"),"lblValue":"","imgArrow":"chevron.png"},
      ];
      const data=[
        [
          {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.sca.DeviceManagement"),"lblSeperator" : "-"},
          segRowData
        ]
      ];
      this.deviceManagementData = segRowData;
      this.view.segSettingsDeviceManagement.setData(data);
    },
  setSegSettingsProfile : function(){
    var configManager = applicationManager.getConfigurationManager();
    let navigationManager = applicationManager.getNavigationManager();
    var tempData = [];
    var navManager = applicationManager.getNavigationManager();
    var flag = navManager.getCustomInfo("transactionPinSetOrNot");
    var transactionPinTitle = "";
    if (flag === "true") {
        transactionPinTitle = kony.i18n.getLocalizedString("kony.mb.Profile.ChangeTransactionPIN");
    } else {
        transactionPinTitle = kony.i18n.getLocalizedString("i18n.HBL.SetupTransactionPIN");  
    }
    // AAC-7267 : Disable username edit
    // if(configManager.checkUserPermission("USERNAME_UPDATE")) {
    //   tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeUsername.Title"),"lblValue":"","imgArrow":"chevron.png"});
    // }
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
    if(configManager.checkUserPermission("PASSWORD_UPDATE")) {
      tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title"),"lblValue":"","imgArrow":"chevron_reverse.png"});
    }
  }
  else{
    if(configManager.checkUserPermission("PASSWORD_UPDATE")) {
      tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfileChangeAndUpdatePassword.Title"),"lblValue":"","imgArrow":"chevron.png"});
  }
}
if (kony.i18n.getCurrentLocale() === "ar_AE"){
    tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title"),"lblValue":"","imgArrow":"chevron_reverse.png"});
    if(this.isVisibleLanguage){
		tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage"),"lblValue":"","imgArrow":"chevron_reverse.png"});
	}
}
else{
 // tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPin.Title"),"lblValue":"","imgArrow":"chevron.png"});
 tempData.push({
            "lblTitle": transactionPinTitle,   
            "lblValue": "",
            "imgArrow": "chevron.png"
        });
  //tempData.push({ "lblTitle": kony.i18n.getLocalizedString("i18n.HBL.ResetTransactionPIN"), "lblValue": "", "imgArrow": "chevron.png" });
  if (flag === "true") {
            tempData.push({
                "lblTitle": kony.i18n.getLocalizedString("i18n.mb.transactionpin.reset"),
                "lblValue": "",
                "imgArrow": "chevron.png"
            });
        }
	tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.i18n.settings.biotransactionpin"),"lblValue":"","imgArrow":"chevron.png"});
  tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.ProfilePersonalDetails.Title"),"lblValue":"","imgArrow":"chevron.png"});
  if(this.isVisibleLanguage){
		tempData.push({"lblTitle":kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage"),"lblValue":"","imgArrow":"chevron.png"});
	}
    
}
    let singleEntityValue = "true";
    if (configManager.configurations.getItem("isSingleEntity") !== undefined) {
      singleEntityValue = configManager.configurations.getItem("isSingleEntity");
    }
    let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
    if (configManager.checkUserFeature("MULTI_ENTITY_PREFERENCE") && configManager.checkUserPermission("SET_DEFAULT_ENTITY_PREFERENCE") && singleEntityValue === "false" && userLegalEntitesSize > 0) {
      let defaultLegalEntity = applicationManager.getUserPreferencesManager().getDefaultLegalEntity();
      let userLegalEntitiesList = applicationManager.getMultiEntityManager().getUserLegalEntitiesListArr();
      navigationManager.setCustomInfo("frmSettingsEntityPreferences", userLegalEntitiesList);
      let defaultLegalEntityName = "";
      let defaultLegalEntityData = userLegalEntitiesList.find(entityData => entityData.id === defaultLegalEntity);
      defaultLegalEntityName = defaultLegalEntityData && defaultLegalEntityData.companyName ? defaultLegalEntityData.companyName : "";
      if (kony.i18n.getCurrentLocale() === "ar_AE") { 
        tempData.push({ "lblTitle": kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences"), "lblValue": {"text": defaultLegalEntityName, "skin":"sknLbl727272SSP30pxTab"}, "imgArrow": "chevron_reverse.png" });
    } 
      else 
      { 
        tempData.push({ "lblTitle": kony.i18n.getLocalizedString("i18n.Profile.EntityPreferences"), "lblValue": {"text": defaultLegalEntityName, "skin":"sknLbl727272SSP30pxTab"}, "imgArrow": "chevron.png" });
      }
  }
  try{
  //language hiding as per client requirement (dont change it)
  if(!configManager.LANGUAGEFLAG||configManager.LANGUAGEFLAG=="false"||configManager.LANGUAGEFLAG=="FALSE"||configManager.LANGUAGEFLAG==0||configManager.LANGUAGEFLAG=="0"){
	  for (i = 0; i < tempData.length; i++) if (tempData[i].lblTitle == kony.i18n.getLocalizedString("kony.mb.Login.ChangeLanguage")) break;
            tempData.splice(i, 1);
  }
  else{
	  
  }
  }catch(e){
	  kony.print("error in language"+e);
  }
    var data = [
      [
        {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.Settings.Profile"),"lblSeperator":"-"},
        tempData
      ]];
    this.profileData = tempData;
    this.view.segSettingsProfile.widgetDataMap = {
      "flxRightWrapper": "flxRightWrapper",
      "flxSepartaor": "flxSepartaor",
      "flxSettings": "flxSettings",
      "flxSettingsHeader": "flxSettingsHeader",
      "imgArrow": "imgArrow",
      "lblProfileHeading": "lblProfileHeading",
      "lblTitle": "lblTitle",
      "lblValue": "lblValue",
      "lblSeperator":"lblSeperator",
      "flxTopShadow":"flxTopShadow"
      
    };
    this.view.segSettingsProfile.setData(data); //sibhi
    
    this.view.segSettingsProfile.onRowClick = this.onRowClickOfProfile;
  
  },
    setConsentManagement :function(){
      if (kony.i18n.getCurrentLocale() === "ar_AE"){
      var data=[
        [
          {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.consent.management"), "lblSeperator":"-"},
          [
            {"lblTitle":kony.i18n.getLocalizedString("kony.mb.your.consent"),"lblValue":"","imgArrow":"chevron_reverse.png"},
          ]
        ]];
      }
      else{ var data=[
        [
          {"lblProfileHeading":kony.i18n.getLocalizedString("kony.mb.consent.management"), "lblSeperator":"-"},
          [
            {"lblTitle":kony.i18n.getLocalizedString("kony.mb.your.consent"),"lblValue":"","imgArrow":"chevron.png"},
          ]
        ]];}
      this.view.segConsentManagement.setData(data); //sibhi


    },
   
      setManageAccountAcces :function(){
        if (kony.i18n.getCurrentLocale() === "ar_AE"){
        var data=[
          [
            {"lblProfileHeading":kony.i18n.getLocalizedString("i18n.ProfileManagement.ManageAccountAccess"), "lblSeperator":"-"},
            [
              {"lblTitle":kony.i18n.getLocalizedString("i18n.ProfileManagement.FromThirdParties"),"imgArrow":"chevron_reverse.png"},
            ]
          ]];
        }
        else{
          var data=[
            [
              {"lblProfileHeading":kony.i18n.getLocalizedString("i18n.ProfileManagement.ManageAccountAccess"), "lblSeperator":"-"},
              [
                {"lblTitle":kony.i18n.getLocalizedString("i18n.ProfileManagement.FromThirdParties"),"imgArrow":"chevron.png"},
              ]
            ]];
        }
        this.view.segManageAccountAcces.setData(data); //sibhi
    },
    showAvailableThemes : function(){
        var scope = this;
        var currentTheme = kony.theme.getCurrentTheme();
      var themeList = {
        "default": {
          "displayName": kony.i18n.getLocalizedString("i18n.UserManagement.AccountDefault")
        },
        "darkTheme": {
          "displayName": kony.i18n.getLocalizedString("Kony.mb.settings.dark")
        }
      };
        var data = [
        [
            {"lblProfileHeading": {"text" : kony.i18n.getLocalizedString("kony.mb.settings.theme")},"lblSeperator" : "-"},
            []
        ]
        ];
      for (key in themeList) {
            var temp = {
          "lblTheme": themeList[key]["displayName"],
                "imgThemeSelector" :  currentTheme == key ? this.selectedRadioButton : this.unselectedRadioButton,
                "themeName" : key,
                "flxThemeSelector" : {
                    "onClick" : scope.changeTheme.bind(this, key)
                }
            }
            data[0][1].push(temp);
        }
        var widgetDataMap ={
            "lblTheme" : "lblTheme",
            "imgThemeSelector" :  "imgThemeSelector",
            "themeName" : "themeName",
            "flxThemeSelector" : "flxThemeSelector",
            "flxSelectThemes": "flxSelectThemes",
            "flxSepartaor": "flxSepartaor",
            "flxSettingsHeader": "flxSettingsHeader",
            "flxTopShadow": "flxTopShadow",
            "lblProfileHeading": "lblProfileHeading",
            "lblSeperator": "lblSeperator",
        }
        this.view.segSettingsTheme.widgetDataMap = widgetDataMap;
        if(data.length > 0){
          if(scope_configManager.getHideThemeMB() === "0"){
            this.view.segSettingsTheme.setVisibility(true);
          }else if(scope_configManager.getHideThemeMB() === "1"){
            this.view.segSettingsTheme.setVisibility(false);
          }
            this.view.segSettingsTheme.setData(data);
        }else{
            this.view.segSettingsTheme.setVisibility(false);
        }
        
    },
    updateSegdata : function(){
        var rowIndex = this.view.segSettingsTheme.selectedIndex[1];
        var segData = this.view.segSettingsTheme.data;
        for(var i=0;i<segData[0][1].length;i++){
            segData[0][1][i]["imgThemeSelector"] =  rowIndex == i ? this.selectedRadioButton : this.unselectedRadioButton;
        }
        this.view.segSettingsTheme.setData(segData);
    },
    changeTheme: function(theme){
        kony.theme.setCurrentTheme (theme, this.themeSuccessCallback.bind(this, theme), this.themeErrorCallback.bind(this));
    },
    themeSuccessCallback:function(theme){
        kony.print("Theme Change: Success");
        applicationManager.getStorageManager().setStoredItem("themeDetails" ,theme)
        this.updateSegdata();
        // kony.application.destroyForm("frmSettings");
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "SettingsUIModule",
            "appName": "ManageProfileMA"
        });
        settingsModule.presentationController.showSettings();
    },
    themeErrorCallback:function(e){
        kony.print("Theme Change: Failed");
    },
	showToastSuccess:function(){
		var navManager= applicationManager.getNavigationManager();
		var bioInfo=kony.store.getItem("BiometricMFAEnable");
			if(bioInfo){
		applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,kony.i18n.getLocalizedString("i18n.mb.mfa.biometricsuccess"));
    }
			else{
				applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,kony.i18n.getLocalizedString("i18n.mb.mfa.biometric.diablebiomertic"));
			}
	},
    navigateBack: function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
         var configurationManager = applicationManager.getConfigurationManager();
         const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.dashboardService();
                }
     },
  };
});
