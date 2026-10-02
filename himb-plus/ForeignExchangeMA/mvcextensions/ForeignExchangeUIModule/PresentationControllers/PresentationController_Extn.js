define([], function() {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
      this.market = "10 1";
    return {
      initializePresentationController : function() {
        this.foreignExchangeFormName = {"friendlyName":"frmForexDashboard","appName":"ForeignExchangeMA"};
     },

     /**
      * no service call navigation to frmForexDashboard
      */
  //    noServiceNavigate : function() {
  //     applicationManager.getNavigationManager().navigateTo({
  //       "appName": "ForeignExchangeMA",
  //       "friendlyName": "ForeignExchangeUIModule/frmExchangeRate"
  //   });
  //  },


 /**
  * no service call navigation to frmForexDashboard
  */
  noServicesNavigate : function() {
    applicationManager.getNavigationManager().navigateTo({
      "appName": "ForeignExchangeMA",
      "friendlyName": "ForeignExchangeUIModule/frmExchangeRate"
    });
  },
   initializePresentationController : function() {
    this.foreignExchangeFormName = {"friendlyName":"frmForexDashboard","appName":"ForeignExchangeMA"};
 },
 preLoginNoServicesNavigate : function() {
  applicationManager.getNavigationManager().navigateTo({
    "appName": "ForeignExchangeMA",
    "friendlyName": "ForeignExchangeUIModule/frmExchangeRate"
  },false,"preLogin");
},

 /**
  * no service call navigation to frmForexDashboard
  */
    fetchCurrencyCode:function(preLogin){
        param ={
          "CountryCode":"",
          "companyCode":scope_configManager.BranchIdReference,
          "market":"10 1"
        }
        if(preLogin == true){
          applicationManager.getTermsAndConditionManager().fetchPreLoginCurrencyCodeDetails(param, this.getPreloginDashboardCurrencyDetail.bind(this), this.getDashboardCurrencyError.bind(this));
        }else{
          applicationManager.getTermsAndConditionManager().fetchCurrencyCodeDetails(param, this.getDashboardCurrencyDetail.bind(this), this.getDashboardCurrencyError.bind(this));
        }
      },
    
      getPreloginDashboardCurrencyDetail :function(response){
        kony.application.showLoadingScreen();
        param ={
          "baseCurrencyCode":response.code,
          "companyCode":scope_configManager.BranchIdReference,
          "market":"10 1"
        }
        applicationManager.getTermsAndConditionManager().getPreloginDashboardCurrencyDetails(param, this.getDashboardCurrencySuccess.bind(this), this.getDashboardCurrencyError.bind(this));
      },
   getDashboardCurrencyDetail : function(response){
        kony.application.showLoadingScreen();
        param ={
          "baseCurrencyCode":response.code,
          "companyCode":scope_configManager.BranchIdReference,
          "market":"10 1"
        }
        applicationManager.getTermsAndConditionManager().getDashboardCurrencyDetails(param, this.getDashboardCurrencySuccess.bind(this), this.getDashboardCurrencyError.bind(this));
    },
    getDashboardCurrencySuccess: function(response) {
        var viewProperties = {};
        viewProperties.progressBar = false;
        viewProperties.dashBoradCurrencySuccess = response;
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmExchangeRate");
    },
    getDashboardCurrencyError: function(errorMessage) {
      kony.application.dismissLoadingScreen();
      var viewProperties = {};
      viewProperties.dashBoardError = errorMessage;
      viewProperties.progressBar = false;
      applicationManager.getNavigationManager().updateForm(viewProperties, "frmExchangeRate");
    },
    getCurrentTimeDetail : function(preLogin){
      kony.application.showLoadingScreen();
      if(preLogin == true){
        applicationManager.getTermsAndConditionManager().getPreloginCurrentTimeDetails(true, this.getCurrentTimeSuccess.bind(this), this.getCurrentTimeError.bind(this));
      }else{
        applicationManager.getTermsAndConditionManager().getCurrentTimeDetails(true, this.getCurrentTimeSuccess.bind(this), this.getCurrentTimeError.bind(this));
      }
   },
  getCurrentTimeSuccess: function(response) {
      var viewProperties = {};
      viewProperties.progressBar = false;
      viewProperties.getCurrentTimeSuccess = response;
      applicationManager.getNavigationManager().updateForm(viewProperties, "frmExchangeRate");
  },
  getCurrentTimeError: function(errorMessage) {
    kony.application.dismissLoadingScreen();
    var viewProperties = {};
    viewProperties.currentTimeError = errorMessage;
    viewProperties.progressBar = false;
    applicationManager.getNavigationManager().updateForm(viewProperties, "frmExchangeRates");
  },
  }
});