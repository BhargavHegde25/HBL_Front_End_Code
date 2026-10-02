define([], function() {

  return{
    onNavigate:function(){
      this.view.preShow = this.preShow;
      this.initActions();
    },
    
    preShow:function(){
      var navManager = applicationManager.getNavigationManager();
      this.view.flxAdditionalOptions.setVisibility(false);
      this.view.flxButton.setVisibility(true);
      if (kony.i18n.getCurrentLocale() === "ar_AE"){
      	this.view.customHeader.lblLocateUs.right = "7%";
      }
      var data = navManager.getCustomInfo('frmChangeStrategy');
      //[IW-3846 - Sarah]
      var rev = navManager.getCustomInfo('frmRevSuitability');
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement");
      if(rev === true){
        this.view.lblActiveStatus.text = kony.i18n.getLocalizedString("i18n.wealth.newStrategy") + " " + data;
        navManager.setCustomInfo("frmRevSuitability", false);
      }
      else{
      this.view.lblActiveStatus.text = kony.i18n.getLocalizedString("i18n.wealth.strategyMsg") + " " + data;
      }
      //code added till here
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
        
    } else {
      this.view.flxHeader.isVisible = false;
    }
    this.view.imgConfirmation.src = (kony.theme.getCurrentTheme() === "darkTheme") ? 'success_ack_dark.png' : 'greentickack.png';
    },
    
    initActions:function(){
      this.view.btnReviewStrategy.onClick = this.navToReview;
      this.view.btnChangeStrategy.onClick = this.navToChangeStr;
      this.view.customHeader.imgSearch.onTouchEnd = this.setUpActionSheet;
      //this.view.customHeader.btnRight.onClick = this.setUpActionSheet;
    },
    
    navToReview:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmStrategyAllocation");
    },
    
    navToChangeStr:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmChangeStrategy");
    },
    
    setUpActionSheet: function() {
      /*
      this.view.flxButton.setVisibility(false);
      this.view.lblPerformance.text =  "Download";
      //this.view.flxPerformance.onTouchEnd = this.onClickDownloadTxns;
      this.view.flxCancelOption.onTouchEnd = this.onClickCancel;
      this.view.flxAdditionalOptions.isVisible = true;
      */
  },

  /*onClickDownloadTxns: function() {
    this.view.flxAdditionalOptions.isVisible = false;
    alert("Downloaded Strategy");
  },*/
  
  onClickCancel: function() {
    this.view.flxButton.setVisibility(true);
    this.view.flxAdditionalOptions.isVisible = false;
  },
    
  }
  
});