/* eslint-disable */
define([],function(){

  return {
  onNavigate: function(){
	this.view.preShow = this.preShow;
    this.initActions();
  },
  initActions: function(){
    this.view.btnNavToPortfolioDetails.onClick = this.navigateToPortfolio;
  },

  preShow: function() 
  {
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
    if (kony.i18n.getCurrentLocale() === "ar_AE"){
      this.view.customHeader.lblLocateUs.right = "43%";
    }else{
      this.view.customHeader.lblLocateUs.left = "30%";
    }

  },  
    navigateToPortfolio:function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmPortfolioDetails");
  },

}
});