define(['CommonUtilities'], function(CommonUtilities) {

  return{

    onNavigate: function(){
      this.view.preShow = this.preShow;
    },

    preShow: function(){
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
      }
      this.initActions();

      var portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;

      let params = 
          {
            "portfolioId": portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio"
          };
      this.view.AllocationCheck.setContext(params,true);

    },

    initActions: function(){
      this.view.customHeader.flxBack.onClick =this.backOnClick; 
    },


    backOnClick: function(){
      var navigationMan = applicationManager.getNavigationManager();
      navigationMan.goBack();
    },

  }
});