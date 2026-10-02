/*eslint-disable*/
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){ 
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  //Type your controller code here 
  return{

    onNavigate: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.onTouchEnd = this.onFormTouchEnd;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.initActions();
      //this.setActiveHeaderHamburger();
    },
    initActions: function(){
      this.view.btnClose.onClick = this.navback;
      this.view.customheadernew.flxAccounts.onTouchEnd = this.backToAccounts;
    },
    preShow: function(){
    },
    backToAccounts: function() {
      let controller = applicationManager.getPresentationUtility().getController('frmInvestmentProposal', true);
      controller.backToAccounts();
    },
    postShow: function(){
      this.setActiveHeaderHamburger();
      this.view.flxSendMessage.onTouchEnd = this.navToSendMsg;
      if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
        this.view.imgBackSend.src = "left.png";
        this.view.imgBackChat.src = "left.png";
        this.view.imgCombinedshapeSend.left = "-1px";
        this.view.imgCombinedshapeChat.left = "-1px";
        this.view.imgCombinedshapeCall.left = "-1px";
        this.view.imgCombinedshapeSend.src = "combinedshapeleft.png";
        this.view.imgCombinedshapeChat.src = "combinedshapeleft.png";
        this.view.imgCombinedshapeCall.src = "combinedshapeleft.png";
        this.view.lblMessage.right = "60%";

        if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
          this.view.lblMessage.right = "0px";
          this.view.imgLeft.right = "10px";
		  this.view.imgLeft.width = "333px";
		  this.view.imgLeft.height = "218px";
        }

      }
    },

    onFormTouchEnd:function(){
      var currFormObj = kony.application.getCurrentForm();
   if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
      setTimeout(function() {
        currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
        currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
         currFormObj.customheadernew.imgLblTransfers.text = "O";
      }, "17ms")
   }
    },
    navToSendMsg: function(){
      // IW-3796 
       var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AlertsMsgsUIModule", "appName" : "SecureMessageMA"});
                alertsModule.presentationController.showAlertsPage('',{show:"CreateNewMessage"});
      
    },

    navback: function(){
      var previousForm = kony.application.getPreviousForm().id;
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo(previousForm);
    },
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooter.onBreakpointChangeComponent(width);
    }
  };
});