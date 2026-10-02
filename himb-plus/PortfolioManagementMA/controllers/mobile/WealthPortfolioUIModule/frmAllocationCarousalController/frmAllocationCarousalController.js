define({ 

  onNavigate: function(){
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = false;
    }
    this.view.onActionBarBack = this.goBack;
    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.AllocationCarousal.preShow();
    //this.view.Tabs.setData(temp);
    //this.invokeService();
    //Type your controller code here 
  },
  goBack: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("AllocationData", undefined);
    navMan.navigateTo("frmPortfolioDetails");
  }
});