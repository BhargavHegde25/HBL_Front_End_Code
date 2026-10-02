define({ 

  init:function(){
    const scope = this;
    // const navManager = applicationManager.getNavigationManager();
    // const currentForm = navManager.getCurrentForm();
    // applicationManager.getPresentationFormUtility().initCommonActions(scope, "YES", currentForm);
    this.view.btnLogIn.onClick = this.signInOnClick;
    this.view.onDeviceBack = function(){};
  },
  
  preshow:function(){
    if(scope_AuthPresenter.isLogoutScreen && !scope_AuthPresenter.isPasswordUpdated){
      this.view.flxSuccess.setVisibility(true);
      this.view.flxeBanking.setVisibility(false);
      this.view.flxUpdatePassword.setVisibility(false);
      this.view.flxSessionExpired.setVisibility(false);
    } else if (!scope_AuthPresenter.isLogoutScreen && !scope_AuthPresenter.isPasswordUpdated && !scope_AuthPresenter.isSessionExpired){
      this.view.flxSuccess.setVisibility(false);
      this.view.flxeBanking.setVisibility(true);
      this.view.flxUpdatePassword.setVisibility(false);
      this.view.flxSessionExpired.setVisibility(false);
    } else if(scope_AuthPresenter.isSessionExpired){
      
      this.view.flxSuccess.setVisibility(false);
      this.view.flxeBanking.setVisibility(false);
      this.view.flxUpdatePassword.setVisibility(false);
      this.view.flxSessionExpired.setVisibility(true);
    
    }else {
      this.view.flxSuccess.setVisibility(false);
      this.view.flxeBanking.setVisibility(false);
      this.view.flxUpdatePassword.setVisibility(true);
      this.view.flxSessionExpired.setVisibility(false);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    //applicationManager.invokeValidUserForDeviceServ(function(){});
  },

  signInOnClick:function(){
    const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMod.presentationController.signInFromLogoutScreen();
  },
  invokeDeviceBack:function(){
    kony.print("Device back invoked");
    const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMod.presentationController.signInFromLogoutScreen();
  }

});