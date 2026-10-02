define(['CommonUtilities'],function(CommonUtilities) { 	

  var currencySymbol;
  var currentInstruDetails;
  var navigatedTocondition = false;
  var slctdInstDet;
  var prevValue=0;

  //Type your controller code here 
  return{
    onNavigate: function()
    {
      try{
      this.view.preShow= this.preShow;
      this.view.postShow= this.postShow;
         }catch(err) {
        this.setError(err, "onNavigate");
      }
    },
    preShow: function(){
      try{
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
        this.view.flxSetCondition.top = "-56dp"
        this.view.flxAlertAddition.top = "0dp"
      }
      this.view.tbxAmount.restrictCharactersSet= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+×÷=/_<>[]!@#?%^&*()-':;?`~\|{}€£¥$°•???¦???????¤«»¡¿ \" ";
      }catch(err) {
        this.setError(err, "preShow");
      }
    },   

    postShow: function(){
      try{
      this.setInitialUI();
      
      var navManager = applicationManager.getNavigationManager();
      slctdInstDet = navManager.getCustomInfo('frmInstrumentDetails');
      var currency = slctdInstDet.response.referenceCurrency;
      
      var formatUtil = applicationManager.getFormatUtilManager();
      currencySymbol = formatUtil.getCurrencySymbol(currency);

      this.view.customHeader.flxBack.onTouchEnd = this.onBack;
      this.view.customHeader.btnRight.onTouchEnd = this.cancelToAlert;
      this.view.flxLess.onTouchEnd = this.enableFlex.bind(this, 1);
      this.view.flxGreater.onTouchEnd = this.enableFlex.bind(this, 2);
      this.view.btnSetCondition.onTouchEnd = this.moveToSetValue;
      this.view.btnAddAlert.onTouchEnd = this.setAlert;
      this.view.tbxAmount.onTextChange = this.enableSetBtn;
	    this.view.lblCurrencyValue.text = currency + "(" + currencySymbol + ")";
     }catch(err) {
        this.setError(err, "postShow");
      }
      },

    setInitialUI: function() {
      try{
      var navManager = applicationManager.getNavigationManager();
      var alertDetails = navManager.getCustomInfo('tempAlertDetails');

      //if 1 then condition is clicked, if 2 then price clicked in previous form
      if(alertDetails.cardNumber===1){
        navigatedTocondition = true;

        //Set to default
        this.view.flxGreater.skin = "bbSKnFlxffffff";
        this.view.flxLess.skin = "bbSKnFlxffffff"

        //If value already not set then set lesser than as default
        if(alertDetails.alertCondition === kony.i18n.getLocalizedString("i18n.wealth.watchlist.lessThan")) {
          this.view.flxLess.skin = "ICSknFlxF6F6F6Radius26px"
        } else if(alertDetails.alertCondition === kony.i18n.getLocalizedString("i18n.wealth.watchlist.greaterThan")) { 
          this.view.flxGreater.skin = "ICSknFlxF6F6F6Radius26px"
        } else {
          this.view.flxLess.skin = "ICSknFlxF6F6F6Radius26px"
        }

        this.view.flxSetCondition.setVisibility(true);
        this.view.flxSetCondButton.setVisibility(true);

        this.view.flxAlertAddition.setVisibility(false);
        this.view.flxAddAlertButton.setVisibility(false);

      } else {

        this.view.tbxAmount.text = alertDetails.alertValue.slice(2);

        this.view.flxSetCondition.setVisibility(false);
        this.view.flxSetCondButton.setVisibility(false);

        this.view.flxAlertAddition.setVisibility(true);
        this.view.flxAddAlertButton.setVisibility(true);
        
      }

      //By default the set button must be set to disable
      CommonUtilities.disableButton(this.view.btnAddAlert);
      this.view.btnAddAlert.skin = "sknlblEAEBF1SSPSemiBold72727215px";
      this.view.btnAddAlert.focusSkin = "sknlblEAEBF1SSPSemiBold72727215px";
      this.enableSetBtn();
     }catch(err) {
        this.setError(err, "setInitialUI");
      }
    },
    moveToSetValue: function() {
     try{
      var condition;
      if(this.view.flxLess.skin === "ICSknFlxF6F6F6Radius26px")
      { 
        condition = kony.i18n.getLocalizedString("i18n.wealth.watchlist.lessThan");
      }
      else if(this.view.flxGreater.skin === "ICSknFlxF6F6F6Radius26px")
      {
        condition = kony.i18n.getLocalizedString("i18n.wealth.watchlist.greaterThan");
      }


      var navManager = applicationManager.getNavigationManager();
      var alertDetails = navManager.getCustomInfo('tempAlertDetails');
      alertDetails.cardNumber = 2;

      alertDetails.alertCondition = condition;
      navManager.setCustomInfo('tempAlertDetails', alertDetails);
      this.setInitialUI();
      }catch(err) {
        this.setError(err, "moveToSetValue");
      }
    },
    setAlert: function() {
      try{
      var navManager = applicationManager.getNavigationManager();
      var tAlert = navManager.getCustomInfo('tempAlertDetails');

      var alertDetails = {};
      alertDetails.alertCondition = tAlert.alertCondition
      alertDetails.alertValue = this.view.tbxAmount.text

      navManager.setCustomInfo('tempAlertDetails', undefined);

      scope_WealthPresentationController.tempAlert = alertDetails;

      navManager.navigateTo('frmSetPriceAlert');
      }catch(err) {
        this.setError(err, "setAlert");
      }
    },

    enableFlex: function(conditionIndex) {
     try{
      if(conditionIndex===1) { 
        this.view.flxLess.skin = "ICSknFlxF6F6F6Radius26px";
        this.view.flxGreater.skin = "bbSKnFlxffffff";

      } else {
        this.view.flxGreater.skin = "ICSknFlxF6F6F6Radius26px";
        this.view.flxLess.skin = "bbSKnFlxffffff";
      }
     }catch(err) {
        this.setError(err, "enableFlex");
      }
    },
    enableSetBtn: function() {
      try{
      var val = this.view.tbxAmount.text;
      let decimalRegex = /^\d{0,5}(\.\d{0,2}|,\d{0,2})?$/;

      if(val && val.length>0){
        CommonUtilities.enableButton(this.view.btnAddAlert);
        this.view.btnAddAlert.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnAddAlert.focusSkin = "sknBtn0095e4RoundedffffffSSP26px";
      } else {
        CommonUtilities.disableButton(this.view.btnAddAlert);
        this.view.btnAddAlert.skin = "sknlblEAEBF1SSPSemiBold72727215px";
        this.view.btnAddAlert.focusSkin = "sknlblEAEBF1SSPSemiBold72727215px";
      }
      if(decimalRegex.test(val)){
        prevValue=val;
      }
      else{
        this.view.tbxAmount.text=prevValue;
      }
         }catch(err) {
        this.setError(err, "enableSetBtn");
      }
    },

    cancelToAlert: function() {
      try{
      navigatedTocondition = false;
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo('frmSetPriceAlert');
         }catch(err) {
        this.setError(err, "cancelToAlert");
      }
    },

    onBack: function() {
      try{
       var navManager = applicationManager.getNavigationManager();
      var alertDetails = navManager.getCustomInfo('tempAlertDetails');
      if(alertDetails.cardNumber === 2 && navigatedTocondition) {
        alertDetails.cardNumber = 1;
        navManager.setCustomInfo('tempAlertDetails', alertDetails);
        this.setInitialUI();
      } else {
        this.cancelToAlert();
      }
         }catch(err) {
        this.setError(err, "onBack");
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