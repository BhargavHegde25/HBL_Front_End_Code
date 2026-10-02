define(function() {

  return {
    preShow: function(){
      try{
        this.setFlowAction();
        // set profile picture
        this.setPrifilePicture();
      }catch(err){
        kony.print("HeaderHBL_preShow" + err);
      }

    },
    setFlowAction: function(){
      try{
        var scopeObj = this; 
      /*  this.view.flxNotify.onClick = function(){
          var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "MessagesUIModule",
            "appName": "SecureMessageMA"
          });
          messagesModule.presentationController.getInboxRequests();
        };
        this.view.flxSettings.onClick = function(){
          var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "SettingsUIModule",
            "appName": "ManageProfileMA"
          });
          settingsModule.presentationController.showSettings();
        };*/
        //sign out
        this.view.flxSignout.onClick = function(){
            scopeObj.confirmSignOut();
        };
        //Personal Details Navigation
        this.view.flxProfile.onClick = function(){
            var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
      settings.presentationController.showSettings();
        }
      }catch(err){
        kony.print("HeaderHBL_setFlowAction" + err);
      }
    },

    confirmSignOut:function(){
    let signOutStr = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
    var basicConf = {
        message: signOutStr,
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        yesLabel: "Yes",
        noLabel: "No",
        alertHandler: function(res) {
            if (res === true) {
                applicationManager.getPresentationFormUtility().logoutUser(true);
            }
        }
    };
    var pspConf = {
        contentAlignment: constants.ALERT_CONTENT_ALIGN_LEFT,
        iconPosition: constants.ALERT_ICON_POSITION_LEFT
    };
    applicationManager.getPresentationUtility().Alert(basicConf, pspConf);
},

setPrifilePicture:function(){
    //var navManager = applicationManager.getNavigationManager();
    //var profilePicdata = navManager.getCustomInfo("frmDashboardProfilePic");
    //let profilepicture = profilePicdata.imageURL;
    var profilepicture =  applicationManager.getUserPreferencesManager().getUserImage();
    var configManager = applicationManager.getConfigurationManager();
    if(profilepicture && configManager.getProfileImageAvailabilityFlag()){
      this.view.imgProfilePic.base64 = profilepicture;
      this.view.imgProfilePic.width = "100%";
      this.view.imgProfilePic.height = "100%";
    }
    else{
      this.view.imgProfilePic.src = "profileicon.png";
      this.view.imgProfilePic.width = "100%";
      this.view.imgProfilePic.height = "100%";
    }
    this.view.forceLayout();
},
  };
});