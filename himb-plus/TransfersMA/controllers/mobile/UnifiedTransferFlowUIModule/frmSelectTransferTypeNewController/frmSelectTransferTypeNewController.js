define(['CommonUtilities'],function(CommonUtilities){ 
  return{

  userContext: [],
  transferFlowType: [],
  visibleDescription: [],
  onNavigate:function(uidata){
   var scope = this;
   if(!kony.sdk.isNullOrUndefined(uidata)){
    if(uidata.error){
        this.toastMsg();
    }
   }
   var configManager = applicationManager.getConfigurationManager();
     var userPermission=configManager.getUserPermissions();
     var userFeatures=configManager.getUserFeatures();
    if(userPermission.indexOf("ESEWA_TOPUP")!=-1||userFeatures.indexOf("ESEWA_TOPUP")!=-1){
        scope.view.flxTransferType5.setVisibility(true);
     }
     else{
         scope.view.flxTransferType5.setVisibility(false);
     }
    var userContext = applicationManager.getUserPreferencesManager().getUserObj();
    if(applicationManager.getConfigurationManager().isMicroAppPresent("TransfersMA")) {
    if(!kony.sdk.isNullOrUndefined(userContext) && userContext !== "") {
      this.userContext = userContext;
      if(scope.userContext.isP2PActivated === "true" && scope.userContext.hasOwnProperty("isP2PActivated")) {
        this.view.flxTransferType4.setVisibility(true);
        this.view.flxP2PActivation.setVisibility(false);
      } else {
        this.view.flxTransferType4.setVisibility(false);
        this.view.flxP2PActivation.setVisibility(false);
        } 
      }
    } else {
      this.view.flxTransferType4.setVisibility(false);
      this.view.flxP2PActivation.setVisibility(false);
    }
   if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    // this.view.flxTop.setVisibility(false);
    this.view.title =this.view.lblAcknowledgement.text;
    this.view.flxHeader.setVisibility(false);
    } else {
      this.view.flxTop.setVisibility(true);
    }
   var params = {};
   if (CommonUtilities.getSCAType() == 1) {
   var tokenParams = kony.sdk.getCurrentInstance().tokens.CIBACustomIdentity.provider_token.params.security_attributes;
   }
   else{
   var tokenParams = kony.sdk.getCurrentInstance().tokens.DbxUserLogin.provider_token.params.security_attributes;
    }
   params.entitlement = {};
   params.entitlement.features = JSON.parse(tokenParams.features);
   params.entitlement.permissions = JSON.parse(tokenParams.permissions);
    this.view.transferType1.setContext(params);
    this.view.transferType2.setContext(params);
    this.view.transferType3.setContext(params);
    this.view.transferType4.setContext(params);
    this.view.P2PActivationTile.setContext(params);
    this.view.flxSelectTransferType.onScrolling = this.iPhoneHeaderHandler;
    this.view.transferType1.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType1";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType2.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType2";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType3.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType3";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType4.enableHideDescription = function(visibleDesc){
      scope.transferFlowType = "transferType4";
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.transferType1.buttonActionHandling = function(trannsferTypeDetails){
        applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.getNavigationManager().setCustomInfo("frmTransfersDetails",null);
         var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
      if(trannsferTypeDetails["id"] === "MakeTransfer"){
       // scope.navigatePage(trannsferTypeDetails);                                               
        transfMod.transferFlow ="sameBank";
        transfMod.addpayeeFlow ="";
        transfMod.transferAutoPopulated =false;
        transfMod.scheduleFlow ="";
        transferMod.presentationController.getList();
      } else if(trannsferTypeDetails["id"] === "AddNewAccount") {
          var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });  
        transfMod.transferFlow ="sameBank";
        transfMod.addpayeeFlow ="addSameBank";
        transfMod.transferAutoPopulated =false;
        transfMod.scheduleFlow ="";
        transferMod.presentationController.getList();
        //scope.navigateAddAccount(trannsferTypeDetails);
      }else if(trannsferTypeDetails["id"] === "ScheduleTransfer"){
        var CommonUtilities = require('CommonUtilities');
    var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
    var ftInput = (clientProperties.FT_SCHEDULE_SAMEBANK);
    if(ftInput =="TRUE" || ftInput == true){
         transfMod.transferFlow ="sameBank";
        transfMod.addpayeeFlow ="";
        transfMod.transferAutoPopulated =false;
         transfMod.scheduleFlow ="withinbank";
        transferMod.presentationController.getList();
      }else{
        applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
    };
    this.view.transferType2.buttonActionHandling = function(trannsferTypeDetails){
        applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.getNavigationManager().setCustomInfo("frmTransfersDetails",null);
        var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
     if(trannsferTypeDetails["id"] === "MakeTransfer"){
        transfMod.transferFlow = "domesticBank";
        transfMod.addpayeeFlow ="";
        transfMod.transferAutoPopulated =false;
        transfMod.scheduleFlow ="";
        transferMod.presentationController.getList();
        //scope.navigatePage(trannsferTypeDetails);
      } else if(trannsferTypeDetails["id"] === "AddNewAccount") { 
        transfMod.transferFlow ="domesticBank";
        transfMod.addpayeeFlow ="addSameBank";
        transfMod.transferAutoPopulated =false;
        transfMod.scheduleFlow ="";
        transferMod.presentationController.getList();
       // scope.navigateAddAccount(trannsferTypeDetails);
      }else if(trannsferTypeDetails["id"] === "ScheduleTransfer"){
        var CommonUtilities = require('CommonUtilities');
    var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
    var ftInput = (clientProperties.FT_SCHEDULE_DOMESTIC);
    if(ftInput ==true || ftInput == 'TRUE'){
      transfMod.transferFlow ="domesticBank";
        transfMod.addpayeeFlow ="";
        transfMod.transferAutoPopulated =false;
         transfMod.scheduleFlow ="otherBank";
        transferMod.presentationController.getList();
    }else{
      applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
      }
    };
    this.view.transferType3.buttonActionHandling = function(trannsferTypeDetails){
       if(trannsferTypeDetails["id"] === "MakeTransfer"){
        scope.navigatePage(trannsferTypeDetails);
      } else {
        scope.navigateAddAccount(trannsferTypeDetails);
      }
    };
    this.view.transferType4.buttonActionHandling = function(trannsferTypeDetails){
      if(trannsferTypeDetails["id"] === "MakeTransfer"){
        scope.navigatePage(trannsferTypeDetails);
      } else {
        scope.navigateAddAccount(trannsferTypeDetails);
      }
    };
    this.view.P2PActivationTile.enableHideDescription = function(visibleDesc){
      if(visibleDesc){
        scope.enablingDetails();
      }else{
        scope.hideDetailsPage(); 
      }
    };
    this.view.P2PActivationTile.buttonActionHandling = function(transferTypeDetails){
      scope.navigateToActivateP2P();
    };
    this.view.transferType1.hideTile = function() {
      scope.view.flxTransferType1.setVisibility(false);
    };
    this.view.transferType2.hideTile = function() {
      scope.view.flxTransferType2.setVisibility(false);
    };
    this.view.transferType3.hideTile = function() {
      scope.view.flxTransferType3.setVisibility(false);
    };
    this.view.transferType4.hideTile = function() {
      scope.view.flxTransferType4.setVisibility(false);
    };
    this.view.P2PActivationTile.hideTile = function() {
      scope.view.flxP2PActivation.setVisibility(false);
    };
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler = applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUACCOUNTS);
    // Footer Menu
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxFooterMenu.setVisibility(false);
      var footerMenuUtility = require("FooterMenuUtility");
      this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
      var cm = applicationManager.getConfigurationManager();
      this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
      };
      this.footerMenuUtility.scope = this;
      this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
      this.view.imgBack.setVisibility(true);
    }
    applicationManager.getPresentationFormUtility().stayCurrentForm(scope);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   },

  enablingDetails:function() {
    var scope = this;
    this.visibleDescription = true;
    this.view.flxSelectTransferType.setVisibility(false);
    this.view.flxSelectTransferType.forceLayout();
  }, 

  hideDetailsPage:function(){
    this.visibleDescription = false;
    this.view.flxSelectTransferType.setVisibility(true);
    this.view.flxSelectTransferType.forceLayout();
  },

  navigatePage:function(transferTypeDetails) {
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("UTFFlow","UTFNew");
    if(transferTypeDetails["transferType"] === "Within Same Bank") {
//       var ntf = new kony.mvc.Navigation("frmSameBank");
      navMan.setCustomInfo("frmSameBank", transferTypeDetails);
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmSameBankNew");
      
    } else if(transferTypeDetails["transferType"] === "Domestic Transfer") {
//       var ntf = new kony.mvc.Navigation("frmDomesticTransfer");
      navMan.setCustomInfo("frmDomesticTransferNew", transferTypeDetails);
      navMan.navigateTo("UnifiedTransferFlowUIModule/frmDomesticTransferNew");
    } else if (transferTypeDetails["transferType"] === "International Transfer") {
//       var ntf = new kony.mvc.Navigation("frmInternationalTransfer");
      navMan.setCustomInfo("frmFTAmount", transferTypeDetails); 
            applicationManager.getPresentationUtility().showLoadingScreen();
            var configManager = applicationManager.getConfigurationManager();
            var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getAccListDetailsForFT(userName);
    }
    else {
      navMan.setCustomInfo("frmP2PTransferNew", transferTypeDetails);
      navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "UnifiedTransferFlowUIModule/frmP2PTransferNew"});
    } 
//     ntf.navigate(transferTypeDetails);
  },
  
  navigateAddAccount:function(transferTypeDetails) {
     var navMan = applicationManager.getNavigationManager();
   
    if(transferTypeDetails["transferType"] === "Within Same Bank") {
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmSameBankAddAccountNew");
      
    } else if(transferTypeDetails["transferType"] === "Domestic Transfer") {
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmDomesticAddAccountNew");
      
    } else if(transferTypeDetails["transferType"] === "International Transfer"){
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmInternationalAddAccountNew");
    }
    else {
      navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "UnifiedAddBeneficiaryUIModule/frmP2PAddAccountNew"});
    }
  },

  navigateToActivateP2P :  function() {
    var navMan = applicationManager.getNavigationManager();
    this.userContext["flowType"] = "Activation";
    navMan.setCustomInfo("frmP2PActivation", this.userContext);
    navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "P2PActivationDeactivationUIModule/frmP2PActivation"});
  },

  iPhoneHeaderHandler: function(){
    var scope = this;
    if(this.view.flxSelectTransferType.contentOffsetMeasured.y > 50){
      scope.view.title = kony.i18n.getLocalizedString("i18n.konybb.transfers.TransferType");
    }
    else if(this.view.flxSelectTransferType.contentOffsetMeasured.y < 45){
      scope.view.title = "";
    }
  },

  onDeactivate :  function() {
    var navMan = applicationManager.getNavigationManager();
    this.userContext["flowType"] = "Deactivation";
    navMan.setCustomInfo("frmP2PActivation", this.userContext);
    navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "P2PActivationDeactivationUIModule/frmP2PActivation"});
  },
   
  backNavigation: function(){
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    if(this.visibleDescription === true)   {
      if (kony.os.deviceInfo().name === "iPhone") {
      scope.hideDescriptionBack();
       }
    } else {
      // var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
      // accountMod.presentationController.showDashboard();
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
    }
  },
    toastMsg: function(){
        var msg = kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong");
        applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
         applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
  hideDescriptionBack: function() {
    var scope = this;
      if(scope.transferFlowType === "transferType1"){
      this.view.transferType1.closeDescription();
      } else if (scope.transferFlowType === "transferType2"){
      this.view.transferType2.closeDescription(); 
      } else if (scope.transferFlowType === "transferType3"){
      this.view.transferType3.closeDescription(); 
      } else if (scope.transferFlowType === "transferType4"){
      this.view.transferType4.closeDescription(); 
      } else {
      this.view.P2PActivationTile.closeDescription();
      }
  },
  navigateToHistory:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().showLoadingScreen();
		var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule").presentationController;
		transferMod.getEsewaHistory();
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa navigateToHistory*********************************"+e);
  }
		},
	showGenericErrorMsg: function(){
	try{
		var scope =this;
	applicationManager.getDataProcessorUtility().showToastMessageError(scope, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
	applicationManager.getPresentationUtility().dismissLoadingScreen();
	}catch(err){
	kony.print("err"+err);
	}
},
};
});