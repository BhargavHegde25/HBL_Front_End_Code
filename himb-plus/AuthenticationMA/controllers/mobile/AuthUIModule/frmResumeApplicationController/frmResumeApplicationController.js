define([], function () {
  return {
    
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },

    onNavigate: function () {
      try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (e) {
        kony.print("Exception in onNavigate" + e);
      }
    },

    preshow: function () {
      try {
        kony.print("Entered preShow");
        this.setPreShowData();
        this.setFlowActions();
      //  this.renderTitleBar();
      } catch (e) {
        kony.print("Exception in preshow" + e);
      }
    },

    renderTitleBar: function () {
      let deviceUtilManager = applicationManager.getDeviceUtilManager();
      let isIphone = deviceUtilManager.isIPhone();
      if (!isIphone) {
        this.view.flxRAHeader.isVisible = true;
      } else {
        this.view.flxRAHeader.isVisible = false;
      }
    },

    setPreShowData: function () {
        this.view.brsrResumeApp.setVisibility(false);
        kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null)
        this.view.brsrResumeApp.onSuccess = this.onSuccessMethod;
        const configManager = applicationManager.getConfigurationManager();  
        var url = configManager.getResumeApplUrl();
        url = this.setTheme(url);    
        this.view.brsrResumeApp.requestURLConfig={
            "URL": url,
            "requestMethod": constants.BROWSER_REQUEST_METHOD_GET
        };
        this.view.flxPopup.setVisibility(false);
    },

    setFlowActions: function () {
      let self = this;
      this.view.flxClose1.onClick = function () {
        self.view.flxPopup.setVisibility(true);
      };
      this.view.flxClose2.onClick = function () {
        self.view.flxPopup.setVisibility(false);
      };
      this.view.btnNo.onClick = function () {
        self.view.flxPopup.setVisibility(false);
      };
      this.view.btnYes.onClick = function () {
        const navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmLogin"});
      };
    },
    setTheme: function (urlString) {
      if (kony.theme.getCurrentTheme() == "darkTheme") {
        if (urlString.search("&brand") > -1) {
          var urlComps = urlString.split("?");
          var queryParams = urlComps[1].split("&");
          for (i in queryParams) {
            if (queryParams[i].search("brand=") > -1) {
              queryParams[i] = "brand=Native-Dark";
            }
          }
          urlComps[1] = queryParams.join("&");
          urlString = urlComps.join("?");
        } else {
          urlString = urlString + "&brand=Native-Dark";
        }
      }
      return urlString;
    },
    onSuccessMethod: function () {
      this.view.brsrResumeApp.setVisibility(true);
      kony.application.dismissLoadingScreen();
    }
   };  
});