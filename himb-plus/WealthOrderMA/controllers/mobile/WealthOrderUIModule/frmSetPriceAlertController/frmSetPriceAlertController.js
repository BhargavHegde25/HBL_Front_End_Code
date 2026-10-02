define(['CommonUtilities'],function(CommonUtilities){ 	

  var navManager;
  var wtchLstRsp;
  var slctdInstDet;
  var currencySymbol;
  var condition;
  var alertValue;
  var crntInstDet;
  var instrumentISIN;

  const BTN_ENABLE_SKIN = "sknBtn0095e4RoundedffffffSSP26px";
  const BTN_DISABLE_SKIN = "sknlblEAEBF1SSPSemiBold72727215px";

  const LBL_POSITIVE_VALUE_SKIN = "sknIbl2f8523SSPsb45px";
  const LBL_NEGATIVE_VALUE_SKIN = "sknIblEE0005SSPsb45px";
  const MSG_ALERT_SUCCESS = "i18n.wealth.watchlist.alertSuccess";
  const MSG_ALERT_UPDATE_SUCCESS = "i18n.wealth.watchlist.alertModified";

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
        this.view.flxSetPriceAlert.top = "0dp";
      }
         }catch(err) {
        this.setError(err, "preShow");
      }
    },   

    postShow: function(){
      try{
      //Retrieve details from Watchlist form
      navManager = applicationManager.getNavigationManager();
      wtchLstRsp = navManager.getCustomInfo('segDet'); 
      slctdInstDet = navManager.getCustomInfo('frmInstrumentDetails'); 
      crntInstDet = slctdInstDet.response;

      //reset if any flex popup enabled in previous sessions
      this.view.flxPopupParent.setVisibility(false);

      this.setInitialUI();
      this.setInitialUIAlertCondAndValues();

      this.view.customHeader.flxBack.setVisibility(false);
      this.view.customHeader.btnRight.onTouchEnd = this.navigateToWatchList;
      this.view.btnSet.onTouchEnd = this.saveAlert;
      this.view.btnDone.onClick = this.navigateToWatchList;

      this.view.flxAlertPriceCondition.onTouchEnd = this.openalertCondition;
      this.view.flxAddAlertPrice.onTouchEnd = this.openAlertValue;

      this.view.flxNo.onTouchEnd = this.closePopup;

      this.view.flxYes.onTouchEnd = function(){
        scope_WealthPresentationController.instruList[instrumentISIN] = undefined;
        var navMan = applicationManager.getNavigationManager();
        scope_WealthPresentationController.tempAlert=undefined;
        navMan.navigateTo('frmWatchlist');
      };

      this.view.btnRemoveAlert.onClick = this.showAlertRemoveConfirmation;
      this.view.btnModify.onClick = this.updateAlert;
      }catch(err) {
        this.setError(err, "postShow");
      }
    },

    /*
    * Set the initial UI - Top card
    */
    setInitialUI: function() {
      try{
      var instDetail = slctdInstDet.response;

      this.view.lblName.text = instDetail.instrumentName;
      this.view.lblId.text = instDetail.ISINCode + " | " + instDetail.exchange;
      instrumentISIN = instDetail.ISINCode;

      var formatUtil = applicationManager.getFormatUtilManager();
      currencySymbol = formatUtil.getCurrencySymbol(instDetail.referenceCurrency); 
      this.view.lblLatestPrice.text = currencySymbol + instDetail.lastRate;


      if(instDetail.percentageChange === "" || instDetail.percentageChange === undefined || instDetail.percentageChange === null) {
        this.view.lblChangeValue.text = "";
      } else {
        this.view.lblChangeValue.text = instDetail.percentageChange + "%" ;
        if (instDetail.percentageChange > 0) {
          this.view.lblChangeValue.skin = LBL_POSITIVE_VALUE_SKIN;
          this.view.lblChangeValue.text = "+" + instDetail.percentageChange + "%" ;
        } else if (instDetail.percentageChange < 0) {
          this.view.lblChangeValue.skin = LBL_NEGATIVE_VALUE_SKIN;
        } else {
          this.view.lblChangeValue.skin = LBL_POSITIVE_VALUE_SKIN;
        }
      }
         }catch(err) {
        this.setError(err, "setInitialUI");
      }
    },


    setInitialUIAlertCondAndValues: function(){
      try{
      var alertDetails = scope_WealthPresentationController.instruList[instrumentISIN];
      var tempAlertDetails = scope_WealthPresentationController.tempAlert;

      if(alertDetails){
        this.view.flxModifyButton.setVisibility(true);
        this.view.flxSetAlertButton.setVisibility(false);

        //Values set already so modify logic
        this.view.lblSelectCondition.text = alertDetails.alertCondition;
        this.view.lblAdd.text = alertDetails.alertValue;

        //temp alert is set which means values are modified, so need to enable modify button and set mdoified values
        if(tempAlertDetails) {

          //Modify logic and values are changed
          this.view.lblSelectCondition.text = tempAlertDetails.alertCondition ? tempAlertDetails.alertCondition : this.view.lblSelectCondition.text;
          this.view.lblAdd.text = tempAlertDetails.alertValue ? tempAlertDetails.alertValue : this.view.lblAdd.text;

          if(alertDetails.alertCondition !== tempAlertDetails.alertCondition || alertDetails.alertValue !== tempAlertDetails.alertValue) {
            CommonUtilities.enableButton( this.view.btnModify);
            this.view.btnModify.skin = BTN_ENABLE_SKIN;
            this.view.btnModify.focusSkin = BTN_ENABLE_SKIN;
          }

        } else {
          CommonUtilities.disableButton( this.view.btnModify);
          this.view.btnModify.skin = BTN_DISABLE_SKIN;
          this.view.btnModify.focusSkin = BTN_DISABLE_SKIN;
        }
      } else {
        
        this.view.flxModifyButton.setVisibility(false);
        this.view.flxSetAlertButton.setVisibility(true);
        
        //if temp alert has value then values are available but not set
        if(tempAlertDetails) {
          this.view.lblSelectCondition.text = tempAlertDetails.alertCondition ?  tempAlertDetails.alertCondition : kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition");
          this.view.lblAdd.text = tempAlertDetails.alertValue ?  tempAlertDetails.alertValue : kony.i18n.getLocalizedString("i18n.wealth.add");

          if(tempAlertDetails.alertCondition && tempAlertDetails.alertValue && tempAlertDetails.alertCondition!==kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition") && tempAlertDetails.alertValue!=="" ) {
            CommonUtilities.enableButton(this.view.btnSet);
            this.view.btnSet.skin = BTN_ENABLE_SKIN;
            this.view.btnSet.focusSkin = BTN_ENABLE_SKIN;
          }
        } else {
          //alert to be set for the frst time Or values temporarily available not set fully
          this.view.lblSelectCondition.text = kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition");
          this.view.lblAdd.text = kony.i18n.getLocalizedString("i18n.wealth.add");
          CommonUtilities.disableButton(this.view.btnSet);
          this.view.btnSet.skin = BTN_DISABLE_SKIN;
          this.view.btnSet.focusSkin = BTN_DISABLE_SKIN;
        }
      }

      this.view.lblAdd.text = (this.view.lblAdd.text=== kony.i18n.getLocalizedString("i18n.wealth.add")) ? kony.i18n.getLocalizedString("i18n.wealth.add") : (currencySymbol + " " + this.view.lblAdd.text);
    }catch(err) {
        this.setError(err, "setInitialUIAlertCondAndValues");
      }
      },

    saveAlert: function(){
      try{
      var alertDetails = {};
      alertDetails.alertCondition = this.view.lblSelectCondition.text;
      alertDetails.alertValue = this.view.lblAdd.text.slice(2);
      scope_WealthPresentationController.instruList[instrumentISIN]  = alertDetails;

      //Show pop up : successfully set price alert
      this.view.lblAlert.text = kony.i18n.getLocalizedString(MSG_ALERT_SUCCESS);
      this.view.flxConfirmationContainer.setVisibility(false);
      this.view.flxConfAlt.setVisibility(false);
      this.view.flxPopupParent.setVisibility(true);
      this.view.flxPopup.setVisibility(true);

      scope_WealthPresentationController.tempAlert = undefined;
     }catch(err) {
        this.setError(err, "saveAlert");
      }
    },

    updateAlert: function() {
      try{
      var alertDetails = {};
      alertDetails.alertCondition = this.view.lblSelectCondition.text;
      alertDetails.alertValue = this.view.lblAdd.text.slice(2);
      scope_WealthPresentationController.instruList[instrumentISIN]  = alertDetails;

      //Show pop up : successfully updated the price alert
      this.view.lblAlert.text = kony.i18n.getLocalizedString(MSG_ALERT_UPDATE_SUCCESS);
      this.view.flxConfirmationContainer.setVisibility(false);
      this.view.flxConfAlt.setVisibility(false);
      this.view.flxPopupParent.setVisibility(true);
      this.view.flxPopup.setVisibility(true);

      scope_WealthPresentationController.tempAlert=undefined;
         }catch(err) {
        this.setError(err, "updateAlert");
      }
    },

    showAlertRemoveConfirmation: function(){
      try{
      this.view.flxPopupParent.setVisibility(true);
      this.view.flxConfAlt.setVisibility(false);
      this.view.flxPopup.setVisibility(false);
      this.view.flxConfirmationContainer.setVisibility(true);

      this.view.lblMsg.text = kony.i18n.getLocalizedString("i18n.wealth.cancelAlertMsg") +' "' + slctdInstDet.response.instrumentName + '" ' + kony.i18n.getLocalizedString("i18n.wealth.instrument")  +'"?';
   }catch(err) {
        this.setError(err, "showAlertRemoveConfirmation");
      }
      },

    navigateToWatchList: function() {
      try{
      scope_WealthPresentationController.tempAlert=undefined;
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo('frmWatchlist');
         }catch(err) {
        this.setError(err, "navigateToWatchList");
      }
    },

    openalertCondition: function() {
      try{
      this.navToSetValue(1);
         }catch(err) {
        this.setError(err, "openalertCondition");
      }
    },
    openAlertValue: function() {
      try{
      this.navToSetValue(3);
      //this.navToSetValue(2);
         }catch(err) {
        this.setError(err, "openAlertValue");
      }
    },

    navToSetValue:function(cardNumber) {
     try{
      var reqValues = {
        "alertCondition" :  this.view.lblSelectCondition.text,
        "alertValue" : (this.view.lblAdd.text=== kony.i18n.getLocalizedString("i18n.wealth.add")) ? "" : this.view.lblAdd.text,
        "currencySymbol" : currencySymbol,
        "cardNumber" : cardNumber
      };
      var navManager = applicationManager.getNavigationManager();
      wtchLstRsp = navManager.setCustomInfo('tempAlertDetails', reqValues);
      navManager.navigateTo('frmSetPriceValue');
        }catch(err) {
        this.setError(err, "navToSetValue");
      }
    },
    closePopup: function() {
      try{
      this.view.flxPopupParent.setVisibility(false);
         }catch(err) {
        this.setError(err, "closePopup");
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