define(function() {

  return {
    preShow: function(){
      try{
        this.setFlowAction();
      }catch(err){
        kony.print("HeaderHBL_preShow" + err);
      }

    },
    setFlowAction: function(){
      try{
        this.view.flxNotify.onClick = function(){
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
        };
        this.view.flxSignout.onClick = function(){
         applicationManager.getPresentationFormUtility().logoutUser(true);
        };
        
      }catch(err){
        kony.print("HeaderHBL_setFlowAction" + err);
      }
    },
  };
});