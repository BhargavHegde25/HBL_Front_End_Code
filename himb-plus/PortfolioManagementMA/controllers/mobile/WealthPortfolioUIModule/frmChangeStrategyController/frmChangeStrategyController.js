/* eslint-disable */
define(['CommonUtilities'], function(CommonUtilities){

  return {
    onNavigate: function() {
    this.view.preShow = this.preShow;
    this.initActions();
      this.view.postShow = this.postShow;
  },
  
  preShow: function() {
    this.view.imgCheckBox.src = "inactivecheckbox.png";
    this.view.btnConfirm.skin = "sknBtnE2E9F0Rounded";
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.changeStrategy");
    this.view.title = kony.i18n.getLocalizedString("i18n.wealth.changeStrategy");
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = false;
    }
    
    if(kony.application.getPreviousForm().id === "frmReviewSuitability" ){
       var params = {
    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
    "portfolioServiceType": "Advisory",
     "score":scope_WealthPresentationController.score
    }
    }else{
       var params = {
    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
    "portfolioServiceType": "Advisory",
    "strategyName": scope_WealthPresentationController.recStrategyName,
    }
    }
    
    if(!params.score && !params.strategyName) {
      params.strategyName = scope_WealthPresentationController.recStrategyName;
    }
    

    this.view.chooseStrategy.setData(params, this.setStrategyLabel);
    
    //reset score if already there
    scope_WealthPresentationController.score = undefined;
    
    
    this.checkPermissions();
  },
    
    checkPermissions: function(){
      
      var checkUserPermission = function (permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
          }
        
             var checkFeature = function (feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
          }
        
      		var isChangeStrategyConfirmation = applicationManager.getConfigurationManager().checkUserPermission("CHANGE_STRATEGY_CONFIRMATION");

      			self = this;
      
      		self.view.flxConfirmation.isVisible = isChangeStrategyConfirmation;
      
      		if(isChangeStrategyConfirmation == false){
              this.view.flxMain.top = "";
              this.view.flxMain.bottom = "50px";
            }
    },
   
    
    setStrategyLabel:function(strategyName, stratId, flxheight){
      var navManager = applicationManager.getNavigationManager();
      this.strName = strategyName;   
      this.strId = stratId;
      this.maxheight = flxheight;
      this.view.flxMain.height = (this.maxheight+80) + "dp";
      this.view.flxScroll.height = (this.maxheight+140) + "dp";
      //this.view.flxConfirmation.top = (this.maxheight+200) + "dp";
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxConfirmation.top = (this.maxheight+150) + "dp";
      } else {
        this.view.flxConfirmation.top = (this.maxheight+190) + "dp";
      }
      //this.view.forceLayout();
      navManager.setCustomInfo('frmChangeStrategy', this.strName);
      this.view.rtbConfirmation.text = kony.i18n.getLocalizedString("i18n.wealth.recommendedStrategyConfirmationMsgCheck")+" " + "<strong>" + strategyName + "</strong>";
    },

  initActions: function() {
    this.view.btnConfirm.onClick = this.confirmAck;
    this.view.imgCheckBox.onTouchEnd = this.imgCkeckBoxChange;
    this.view.customHeader.btnRight.onClick = this.goBack;
    },

    goBack:function(){
      this.view.chooseStrategy.onClickBack();
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmFirstUserBoolean");
      if(data !== undefined){
        data = undefined;
        navManager.setCustomInfo("frmFirstUserBoolean", data);
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmPortfolioDetails"
            }).navigate();
      }else{
            new kony.mvc.Navigation({
                "appName": "PortfolioManagementMA",
                "friendlyName": "frmStrategyAllocation"
            }).navigate();
      }
      
    },
  confirmAck:function(){
    if(this.view.imgCheckBox.src === "activecheckbox.png"){
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var confirmparam ={};
      if(kony.application.getPreviousForm().id === "frmReviewSuitability" ){
         confirmparam = {
                          "strategyId":this.strId, 
                          "portfolioServiceType": "Advisory",
                          "strategyName": this.strName, 
                          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                          "questionnaireHistoCode": scope_WealthPresentationController.questionnaireHistoCode
        }
    
      wealthModule.confirmStrategyFromQuestion(confirmparam);
      }else{
        confirmparam = {
                          "strategyId":this.strId, 
                          "portfolioServiceType": "Advisory",
                          "strategyName": this.strName, 
                          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId
        }
    
      wealthModule.confirmChangeStrat(confirmparam);
      }
    }
    else
      {
      }
  },
    
    navigateToAck:function(){
      var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo("frmChangeStrAck");
    },
  
  imgCkeckBoxChange:function(){
    if(this.view.imgCheckBox.src === "inactivecheckbox.png"){
      this.view.imgCheckBox.src = "activecheckbox.png";
      this.view.btnConfirm.skin = "ICSknBtnF6F6F615px";
    }
    else if(this.view.imgCheckBox.src === "activecheckbox.png"){
      this.view.imgCheckBox.src = "inactivecheckbox.png";
      this.view.btnConfirm.skin = "sknBtnE2E9F0Rounded";
    }
  }
}
});