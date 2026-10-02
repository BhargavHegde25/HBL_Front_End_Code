define({
  init: function () {
    try{
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
   }catch(err) {
        this.setError(err, "init");
      }
    },
  preShow: function() {
    try{
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.view.customCalendar.preShow();
    this.view.customCalendar.selectedDate = '';
    this.view.customCalendar.triggerContinueAction = false;
    var startDate = new Date();
    var todayDate = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear();
    this.view.customCalendar.setFirstEnabledDate(todayDate);
    this.view.customCalendar.setSelectedDate(todayDate);
    this.initActions();
       }catch(err) {
        this.setError(err, "preShow");
      }
  },
  initActions: function() {
    try{
    var scope = this;
    this.view.btnContinue.onClick = this.continueAction;
    this.view.customHeader.flxBack.onClick = this.onBack;
       }catch(err) {
        this.setError(err, "initActions");
      }
  },
  onBack: function () {
    try{
	 var navigationMan = applicationManager.getNavigationManager();
	 navigationMan.goBack();
       }catch(err) {
        this.setError(err, "onBack");
      }
  },
  continueAction: function() {
    try{
    var navMan=applicationManager.getNavigationManager();
    var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
     if(wealthMod.getVerifyFlow()){
            navMan.navigateTo("frmConvertCurrencyVerify");
      }else{
            navMan.navigateTo("frmConvertCurrency");
      }
       }catch(err) {
        this.setError(err, "continueAction");
      }
  },
  postShow: function() {
    //To be added
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
});