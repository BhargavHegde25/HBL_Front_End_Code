define({

  init: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.preShow=this.preShow;
    this.view.postShow=this.postShow;
       }catch(err) {
        this.setError(err, "init");
      }
  },

  preShow: function () {
    try{
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxFullScroll.top='0dp';    
   }
    if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
    this.view.customHeader.lblLocateUs.right = "43%";
    }
    this.initActions();
      }catch(err) {
        this.setError(err, "preShow");
      }
  },
  initActions: function () {
    try{
    this.view.btnView.onClick = this.onViewOrder;
    this.view.btnClose.onClick = this.onClose;
      }catch(err) {
        this.setError(err, "initActions");
      }
  },
  postShow:function(){
    try{
      this.setUIData();
    }catch(err) {
      this.setError(err, "postShow");
    }
  },
 setUIData: function () {
    try{
        var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
     var formatUtil=applicationManager.getFormatUtilManager();
     var data= wealthMod.getWealthObject();
    var currency1=data.sellCurrency.substr(0,3);
      var currency2=data.buyCurrency.substr(0,3);
      this.view.lblFromVal.text=data.sellCurrency;
      this.view.lblFromAmountVal.text=formatUtil.formatAmountandAppendCurrencySymbol(data.sellAmount,currency1);
      this.view.lblToVal.text=data.buyCurrency;
      this.view.lblToAmountVal.text=formatUtil.formatAmountandAppendCurrencySymbol(data.buyAmount,currency2);
		if (scope_WealthPresentationController.convertNowFlow === true) {

			this.view.lblOption.text = kony.i18n.getLocalizedString("i18n.wealth.convertNow");
			
          var today = new Date();
          this.view.lblDate.text = String(today.getMonth() + 1).padStart(2, '0') + '/' +String(today.getDate()).padStart(2, '0') + '/'+ today.getFullYear();
      

		} else {
			this.view.lblOption.text = kony.i18n.getLocalizedString("i18n.wealth.scheduledon");
			
		}
        }catch(err) {
        this.setError(err, "setUIData");
      }
	},
  onViewOrder: function(){
    try{
    var sortByValue = undefined; 
        var data = {};
        data.response = sortByValue;
        var navManager = applicationManager.getNavigationManager();	
        navManager.setCustomInfo("frmPortfolioDetails", true);
        navManager.setCustomInfo("frmSortBy", data);
		//applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isFrmWatchlist=false;
		//applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = "";
        new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmOrders"}).navigate();
   }catch(err) {
        this.setError(err, "onViewOrder");
      }
    },
  onClose: function(){
    try{
 var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
 wealthMod.setVerifyFlow(false);
 wealthMod.clearWealthData();
     var params = {"portfolioId":scope_WealthPresentationController.portfolioId,"navPage":"Portfolio","graphDuration":"OneY"};
  wealthMod.getPortfolioAndGraphDetails(params);
     }catch(err) {
        this.setError(err, "onClose");
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

});
