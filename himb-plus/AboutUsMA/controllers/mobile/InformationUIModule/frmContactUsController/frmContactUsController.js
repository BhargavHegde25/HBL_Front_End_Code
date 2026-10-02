define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.postShow = this.postShow;
    },

    postShow: function () {
      var userObj = applicationManager.getUserPreferencesManager();
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      if (userObj.isUserLoggedin() === true) {
        this.view.enabledForIdleTimeout = true;
      } else {
        this.view.enabledForIdleTimeout = false;
        }
      }
      this.view.customHeader.flxBack.onClick = this.backIcon;
      this.setTitleBarVisibility();
      this.view.contactUsHBL.setVisibility(true);
    },
    setTitleBarVisibility : function () {
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
      }
      else{
        this.view.flxHeader.isVisible = false;
      }
    },

backIcon: function(){
        /*applicationManager.getPresentationUtility().showLoadingScreen();
         var configurationManager = applicationManager.getConfigurationManager();
         const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.dashboardService();
                }
				*/
				applicationManager.getNavigationManager().goBack();
     },
   
  };
});

