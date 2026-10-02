define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
    return {
      init: function () {
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
        this.view.onDeviceBack = function () { };
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.view.onHide = this.onHide;
        this.view.onTouchEnd = this.formOnTouchEndHandler;
        this.touchEndSubscribers = new Map();
        this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"});
      },
      onBreakpointChange: function (form, width) {
        // FormControllerUtility.setupFormOnTouchEnd(width);    
        this.view.customheadernew.onBreakpointChangeComponent(width);
        this.view.customfooternew.onBreakpointChangeComponent(width);
      },
      touchEndSubscribers : new Map(),

      formOnTouchEndHandler: function(){
        //when a user clicks on dropdown item onTouchEnd is triggered first and click is not registered
        //this delay postpones the onTouchEnd so that the click is registered
        kony.timer.schedule("touchEndTimer", this.hideSubscribedWidgetsIfVisible, 0.1, false);
        FormControllerUtility.hidePopupsNew();
      },

      hideSubscribedWidgetsIfVisible: function() {
        this.touchEndSubscribers.forEach((value, key, map) =>{
            if (value.shouldBeVisible) {
                value.shouldBeVisible = false;
                kony.print("**~~**"+key+" has shouldBeVisible is true, so set it up as false and not hiding it");
                return;
            }
            else if (value.widget.isVisible) {
                value.hideFunction();
                kony.print("**~~**"+key+" hidden");
                return;
            }
            kony.print("**~~**"+key+" is not visible");
          })
      },

      subscribeToTouchEnd : function(subscriberKey,subscriberValue){
        if (this.touchEndSubscribers.has(subscriberKey)) {
          kony.print("same key exists");
          return false;
        }
        let value = {
          widget : subscriberValue.widget,
          hideFunction : subscriberValue.hideFunction,
          shouldBeVisible : subscriberValue.shouldBeVisible
        }
        this.touchEndSubscribers.set(subscriberKey,value);
        return true;
      },

      updateTouchEndSubscriber:function(subscriberKey,subscriberValue){
        if (!this.touchEndSubscribers.has(subscriberKey)) {
          kony.print("key doesn't exist");
          return false;
        }
        let value = this.touchEndSubscribers.get(subscriberKey);
        if (subscriberValue.shouldBeVisible !== undefined && subscriberValue.shouldBeVisible !== null) {
          value.shouldBeVisible = subscriberValue.shouldBeVisible;
          this.touchEndSubscribers.set(subscriberKey,value);
          return true;
        }
        kony.print("Can only update shouldBeVisible");
        return false;
      },
      /**
      * @api : onNavigate
       * gets invoked as soon as the control comes to the form
      * @return : NA
      */
      onNavigate: function (param) {
        this.view.UnifiedTransferInternational.setContext(param);
        this.view.UnifiedTransferInternational.onError = this.onError;
        this.view.UnifiedTransferInternational.onCancelTransfer = this.onCancelTransfer;
        this.view.UnifiedTransferInternational.showErrorMessage = this.showErrorMessage;
        this.view.UnifiedTransferInternational.createTransfer = this.createTransfer;
      },
      preShow: function () {
        var scope = this;
        scope.setLocationValue();
        this.touchEndSubscribers.clear();
        this.view.UnifiedTransferInternational.subscribeToTouchEnd = this.subscribeToTouchEnd;
        this.view.UnifiedTransferInternational.updateTouchEndSubscriber = this.updateTouchEndSubscriber;
        this.view.flxFormContent.doLayout = function () {
          if(this.view.flxFooter.info.height!== undefined){
            this.view.flxMain.minHeight = this.view.flxFormContent.frame.height - this.view.flxFooter.info.height + "dp";
          }
        }.bind(this);
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        this.view.customheadernew.activateMenu("UNIFIEDTRANSFER", "");
        this.view.flxTransferOption1.onTouchStart = this.showTransferScreen.bind(this, "Same Bank");
        this.view.flxTransferOption2.onTouchStart = this.showTransferScreen.bind(this, "Domestic Transfer");
        this.view.flxTransferOption3.onTouchStart = this.showTransferScreen.bind(this, "International Transfer");
        this.view.flxTransferOption4.onTouchStart = this.showTransferScreen.bind(this, "Pay a Person");
        this.view.GenericMessageNew.closepopup =function() {
          scope.view.flxTransferError.setVisibility(false);
        }
      },
      /*method to get latitute and longitute value of the user*/
      setLocationValue: function(){
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                  function(position) {
                      var lat = position.coords.latitude;
                      var lon = position.coords.longitude;
                      kony.store.setItem("userLatitude", lat);
                      kony.store.setItem("userLongitude",lon);
                  },
                  function(error) {
                      kony.print("Geolocation Error: " + error.message);
                  }
              );
          } else {
              kony.print("Geolocation is not supported by this browser.");
          }
      },
      postShow: function () {
        this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
        applicationManager.getNavigationManager().applyUpdates(this);
        applicationManager.executeAuthorizationFramework(this);
        this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
        this.view.flxDialogs.zIndex = 1200;
        this.view.btnBypass.focusSkin = "bbSknLbl727272SSP15Px";
        var scopeObj = this;
        this.view.btnBypass.onClick = function() {
          scopeObj.view.flxTransferOption1.setActive(true);
        }
        this.view.customheadernew.btnSkipNav.onClick = function() {
          scopeObj.view.lblTransfersHeading.setActive(true);
        }
      },
      onKeyPressCallBack: function (eventObject, eventPayload) {
        if (eventPayload.keyCode === 27) {
            if (this.view.flxLogout.isVisible === true) {
                this.view.flxLogout.setVisibility(false);
                this.view.flxDialogs.setVisibility(false);
                this.view.customheadernew.btnLogout.setFocus(true);
            }
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
      },
      onHide: function() {
        this.view.flxTransferError.setVisibility(false);
        this.view.UnifiedTransferInternational.unsubscribeStore();
      },
      /**
       * updateFormUI - the entry point method for the form controller.
       * @param {Object} viewModel - it contains the set of view properties and keys.
       */
      updateFormUI: function (viewModel) {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if(viewModel.FailureValidateresponse != null && viewModel.FailureValidateresponse != undefined){
          this.view.flxTransferError.setVisibility(true);
          this.view.GenericMessageNew.setContext(viewModel.FailureValidateresponse);
      }
      if(viewModel.FailureCreateresponse !=null && viewModel.FailureCreateresponse !=undefined){
          this.view.flxTransferError.setVisibility(true);
          this.view.GenericMessageNew.setContext(viewModel.FailureCreateresponse);
      }
      },
      /**
       * @api : onError
       * Error thrown from catch block in component and shown on the form
       * @return : NA
       */
      onError: function (err) {
       kony.print(JSON.stringify(err));
      },
      onCancelTransfer: function(context) {
        var self = this;
        var navManager = kony.mvc.getNavigationManager();
        if (context === "Edit") {
            self.ManageActivitiesPresenter.showTransferScreen({
                context: "ScheduledPayments"
            });
        } else if (context === "Repeat") {
            self.ManageActivitiesPresenter.showTransferScreen({
                context: "PastPayments"
            });
        } else {
            var obj = {
                context: this,
                callbackModelConfig: {
                    "frm": "frmUTFLanding",
                    "appName": "TransfersMA"
                }
            };
            navManager.navigate(obj);
        }
    },
      showErrorMessage: function (errorObj) {
        var scope = this;
        scope.view.flxTransferError.setVisibility(true);
        var error = {
          dbpErrMsg:
            errorObj.errorMessage || errorObj.dbpErrMsg || errorObj.errmsg
        };
        if(!kony.sdk.isNullOrUndefined(errorObj.errorDetails)){
          errorObj.errorDetails ? error.errorDetails =  errorObj.errorDetails : "";
        } else if (!kony.sdk.isNullOrUndefined(errorObj.serverErrorRes.errorDetails)){
          errorObj.serverErrorRes.errorDetails ? error.errorDetails =  errorObj.serverErrorRes.errorDetails : "";  
        }
        if(error.dbpErrMsg!="" || error.errorDetails!="")
        this.view.GenericMessageNew.setContext(error);
      },
      createTransfer: function (collectionObj,param) {
        var context = {
          "Transaction": collectionObj.Collection["Transaction"],
          "Recipients": collectionObj.Collection["Recipients"],
          "BankDetails": collectionObj.Collection["BankDetails"],
          "transferFlow": param.transferFlow
        };
        var navManager = kony.mvc.getNavigationManager();
        var obj = {
          context: this,
          params: context,
          callbackModelConfig:{"frm":"frmUTFInternationalTransferConfirmation",
          "appName": "TransfersMA" }
        };    
        navManager.navigate(obj);
      },
      showTransferScreen: function(transferType){
        var frmName = "";
        switch (transferType) {
          case "Same Bank":
            frmName = "frmUTFSameBankTransfer";
            break;
          case "Domestic Transfer":
            frmName = "frmUTFDomesticTransfer";
            break;
          case "International Transfer":
            frmName = "frmUTFInternationalTransfer";
            break;
          case "Pay a Person":
            frmName = "frmUTFP2PTransfer";
            break;
        }
        var context = {
          "transferType": transferType
        };
        var navManager = kony.mvc.getNavigationManager();
        var obj = {
          context: this,
          params: context,
          callbackModelConfig:{"frm":frmName,
          "appName": "TransfersMA" }
        };
          navManager.navigate(obj);
      },
      showSameBankTransferOption: function() {
        this.view.flxTransferOption1.setVisibility(true);
      },
      hideSameBankTransferOption: function() {
        this.view.flxTransferOption1.setVisibility(false);
      },
      showDomesticTransferOption: function() {
        this.view.flxTransferOption2.setVisibility(true);
      },
      hideDomesticTransferOption: function() {
        this.view.flxTransferOption2.setVisibility(false);
      },
      showInternationalTransferOption: function() {
        this.view.flxTransferOption3.setVisibility(false);
      },
      hideInternationalTransferOption: function() {
        this.view.flxTransferOption3.setVisibility(false);
      },
      showP2PTransferOption: function() {
        this.view.flxTransferOption4.setVisibility(false);
      },
      hideP2PTransferOption: function() {
        this.view.flxTransferOption4.setVisibility(false);
      }
    };
  });