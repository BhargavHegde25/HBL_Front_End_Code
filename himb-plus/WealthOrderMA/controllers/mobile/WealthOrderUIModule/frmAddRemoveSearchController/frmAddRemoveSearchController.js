/* eslint-disable */
define([],function(){
 return { 
  onNavigate: function(){
    try{
    this.view.preShow =  this.preShow;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
     }catch(err) {
        this.setError(err, "onNavigate");
      }
  },
  
  preShow:function(){
    try{
    this.initActions();
    }catch(err) {
        this.setError(err, "preShow");
      }
  },
  initActions: function(){
    try{
    this.view.addRemoveSearch.showVisibleSearchWatch = function(){
    var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmWatchlist");
    }
    this.view.addRemoveSearch.viewInstrumentDetails = function(data){
      var navManager = applicationManager.getNavigationManager();
         
      navManager.setCustomInfo("frmWatchlistsegParam", data);
        navManager.navigateTo("frmWatchlist");
    }
       }catch(err) {
        this.setError(err, "initActions");
      }
  },    
   setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }
 };
});
