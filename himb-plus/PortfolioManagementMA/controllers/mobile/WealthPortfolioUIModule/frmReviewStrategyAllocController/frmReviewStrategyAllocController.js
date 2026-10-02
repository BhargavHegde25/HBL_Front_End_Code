define(['CommonUtilities'], function(CommonUtilities) {

  return{

    onNavigate: function(){
      this.view.postShow = this.postShow;
    },

    postShow: function(){
      try{
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
        this.view.flxContent.top = "0dp";
      }
      this.initActions();

      var reqParams = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
        "portfolioServiceType": "Advisory"
      } ;
     
      this.view.strategyAllocation.setContext(reqParams);
        }catch(err) {
        this.setError(err, "postShow");
      }

      //       var portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;

      //       let params = 
      //           {
      //             "portfolioId": portfolioId,
      //             "portfolioServiceType": "Advisory",
      //             "navPage": "Portfolio"
      //           };
      //       this.view.AllocationCheck.setContext(params);

    },

    initActions: function(){
      this.view.customHeader.flxBack.onClick =this.backOnClick; 
    },


    backOnClick: function(){
      var navigationMan = applicationManager.getNavigationManager();
      navigationMan.goBack();
    },
    /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }

  }
});