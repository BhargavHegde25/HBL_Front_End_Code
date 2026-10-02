define([],function(){

  //Type your controller code here
  return{
    onNavigate: function()
    {
      this.view.customHeader.btnRight.onClick = this.navback;
      this.view.preShow= this.preShow;
      this.view.postShow= this.postShow;
      this.view.initActions = this.initActions;
      
    },
    initActions: function(){
      this.view.btnClose.onClick = this.navback;
    },
    navback: function(){
      var previousForm = kony.application.getPreviousForm().id;
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo(previousForm);
     },
    preShow: function(){
      scope_WealthPresentationController.currentYearFilter = true;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
      } else {
        this.view.flxHeader.isVisible = true;
       // this.view.customHeader.flxBack
        
      }
      if (kony.i18n.getCurrentLocale() === "ar_AE"){
      this.view.imgBackChat.src = "left_arrow.png";
        this.view.imgBack.src = "left_arrow.png";
    }
    },
    postShow: function(){
      this.view.flxSendMessage.onTouchEnd = this.navToSendMsg;
     // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.healthCheck");
      //this.view.customHeader.lblLocateUs
      //this.view.title = kony.i18n.getLocalizedString("i18n.wealth.healthCheck");
    },
    
    navToSendMsg: function(){
      var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "MessagesUIModule", "appName" : "SecureMessageMA"});
      messagesModule.presentationController.getInboxRequests();
    }
    

   
  };

});