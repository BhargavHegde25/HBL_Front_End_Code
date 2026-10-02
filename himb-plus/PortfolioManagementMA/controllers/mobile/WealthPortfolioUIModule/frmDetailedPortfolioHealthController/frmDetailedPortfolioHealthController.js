define(['CommonUtilities'], function(CommonUtilities) {

  return{

    onNavigate: function(){
      this.view.preShow = this.preShow;
    },

    preShow: function(){
      try{
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
        //this.view.AllocationCheck.top = "-50Dp";
       this.view.title = kony.i18n.getLocalizedString("i18n.wealth.portfolioHealth");
      }
      else{
        this.view.flxHeader.isVisible = true
      }
      this.initActions();
	  var params = {};
      var navManager = applicationManager.getNavigationManager();
      var portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;
	  var InvestmentProposal =  navManager.getCustomInfo('InvestmentProposal');  
      
      if(InvestmentProposal === "NewProposal"){
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.portfolioHealth");

        params = {
            "portfolioId" :portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio",
            "sortBy": "",
            "sortOrder": "",
            "searchByInstrumentName": "",
            "pageSize": "",
            "pageOffset": "",
	     "type":"",
            "funcResultCode":scope_WealthPresentationController.funcResultCode
          };
        }
      else {
         this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.portfolioHealth");
        params = {
          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
          "sortBy": "instrumentName",
          "sortOrder": "desc",
          "searchByInstrumentName": " ",
          "pageSize": "10",
          "pageOffset": "0",
          "portfolioServiceType": "Advisory",
          "pastProposalId": "",
          "type":"pastProposal"
        };
      }
      this.view.AllocationCheck.setContext(params,false);
        } catch(err) {
        this.setError(err, "preShow");
      } 
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