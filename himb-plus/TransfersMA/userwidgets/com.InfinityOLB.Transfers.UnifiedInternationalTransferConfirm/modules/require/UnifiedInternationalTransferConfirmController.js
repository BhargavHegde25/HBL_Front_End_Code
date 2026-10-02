define(['./UnifiedTransferConfirmBusinessController', './UnifiedTransferConfirmStore','CommonUtilities'], function (BusinessController, UnifiedTransferConfirmStore, CommonUtilities) {
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this._breakpoints = {};
      this._contListServiceParameters = {};
      this._contListDataMapping = {};
      this._contListDataFormatting = {};
      this._contListBreakpoints = {};
      this._ROContListServiceParameters = {};
      this._ROContListDataMapping = {};
      this._ROContListDataFormatting = {};
      this._ROContListBreakpoints = {};
      this.businessController = new BusinessController();
      this.store = UnifiedTransferConfirmStore;
      this.businessController.store = this.store;
      this.collectionObj = UnifiedTransferConfirmStore.getState();

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
      defineGetter(this, 'contListServiceParameters', () => {
        return this._contListServiceParameters;
      });
      defineSetter(this, 'contListServiceParameters', value => {
        this._contListServiceParameters = value;
      });
      defineGetter(this, 'contListDataMapping', () => {
        return this._contListDataMapping;
      });
      defineSetter(this, 'contListDataMapping', value => {
        this._contListDataMapping = value;
      });
      defineGetter(this, 'contListDataFormatting', () => {
        return this._contListDataFormatting;
      });
      defineSetter(this, 'contListDataFormatting', value => {
        this._contListDataFormatting = value;
      });
      defineGetter(this, 'contListBreakpoints', () => {
        return this._contListBreakpoints;
      });
      defineSetter(this, 'contListBreakpoints', value => {
        this._contListBreakpoints = value;
      });
      defineGetter(this, 'ROContListServiceParameters', () => {
        return this._ROContListServiceParameters;
      });
      defineSetter(this, 'ROContListServiceParameters', value => {
        this._ROContListServiceParameters = value;
      });
      defineGetter(this, 'ROContListDataMapping', () => {
        return this._ROContListDataMapping;
      });
      defineSetter(this, 'ROContListDataMapping', value => {
        this._ROContListDataMapping = value;
      });
      defineGetter(this, 'ROContListDataFormatting', () => {
        return this._ROContListDataFormatting;
      });
      defineSetter(this, 'ROContListDataFormatting', value => {
        this._ROContListDataFormatting = value;
      });
      defineGetter(this, 'ROContListBreakpoints', () => {
        return this._ROContListBreakpoints;
      });
      defineSetter(this, 'ROContListBreakpoints', value => {
        this._ROContListBreakpoints = value;
      });
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
    },

    /**
    * @api : preShow
     * Gets invoked initially before rendering of UI
    * @return : NA
    */
    preShow: function () {
      var scope = this;
	  this.view.btnAction3.toolTip = "";
      this.view.btnAction2.toolTip = "";
      this.view.btnAction1.toolTip = "";
      try {
        this.initActionsOfButtons();
        this.businessController.setProperties(this.serviceParameters, this.dataFormatting, this.dataMapping, this.breakpoints);
        this.businessController.setDataInCollection(this.context);
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : postShow
    * Gets invoked initially after rendering of UI
    * @return : NA
    */
    postShow: function () {
      var scope = this;
      try {
        scope.view.lblKeyDocumentName.text = kony.i18n.getLocalizedString("i18n.TransfersEur.SupportingDocuments") + ":";
        scope.view.btnAction3.accessibilityConfig = {
          a11yLabel: "Confirm money transfer details"
        };
        scope.view.btnAction2.accessibilityConfig = {
          a11yLabel: "Modify money transfer details"
        };
        scope.view.btnAction1.accessibilityConfig = {
          a11yLabel: "Cancel money transfer"
        };
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function (context) {
      var scope = this;
      try {
        this.unsubscribe = UnifiedTransferConfirmStore.subscribe(this.render.bind(this));
        this.storeValue(context);
        this.context = context;
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "setContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    storeValue:function(){
      var scope =this;
    },

    /**
    * @api : onBreakPointChange
    * Gets invoked on change of breakpoint in UI
    * @return : NA
    */
    onBreakPointChange: function () {
      var scope = this;
      try {
      }
      catch (err) {
        var errorObj =
        {
          "level": "ComponentController",
          "method": "onBreakPointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : unsubscribeStore
     * Method to unsubscribe the store's listener
     * @return : NA
     */
    unsubscribeStore: function () {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    },

    /**
    * @api : setAcknowledgement
    * This method will be invoked when navigating to acknowledgement screen
    * @return : NA
    */
    setAcknowledgement: function () {
      var scope = this;
      scope.buttonConfirmOnClick(scope.collectionObj);
    },
    /**
    * @api : render
    * This method will be invoked when collection is updated to refresh UI
    * @return : NA
    */
    render: function () {
      var scope = this;
      this.collectionObj = UnifiedTransferConfirmStore.getState();
        if (!scope.isEmptyNullOrUndefined(scope.collectionObj.Collection["ErrorDetails"])) {
          var form = kony.application.getCurrentForm();
          scope.buttonModifyOnClick(scope.collectionObj);
          scope.businessController.resetCollection("ErrorDetails");
        }else if(!scope.isEmptyNullOrUndefined(scope.collectionObj.Collection["payeeVerificationStatus"])){
          //need to navigate to Transfer input screen
          var form = kony.application.getCurrentForm();
          scope.buttonModifyOnClick(scope.collectionObj);
        }
      if (!scope.isEmptyNullOrUndefined(this.collectionObj.Collection)) {
        var navManager = applicationManager.getNavigationManager();
        scope.view.lblValue1.text =navManager.getCustomInfo("int_AccSelection");
        scope.view.lblValue2.text =navManager.getCustomInfo("int_VpaId");
        scope.view.lblValue4.text =navManager.getCustomInfo("int_Rcountry");
        scope.view.lblValue5.text =navManager.getCustomInfo("int_RVpaId");
        scope.view.flxConfirmDetail6.setVisibility(false);
        scope.view.flxConfirmDetail3.setVisibility(true);
        scope.view.lblValue3.text =navManager.getCustomInfo("int_RName");
        scope.view.lblValue7.text =navManager.getCustomInfo("int_Currency");
        scope.view.lblValue8.text =navManager.getCustomInfo("int_Amount");
        scope.view.lblValue9.text =navManager.getCustomInfo("int_ExchangeRate");
        scope.view.lblValue10.text =navManager.getCustomInfo("int_InrAmt");
        scope.view.lblValue11.text =navManager.getCustomInfo("int_Charge");
        var amount = parseInt(navManager.getCustomInfo("int_Charge").split(" ")[1])+ parseInt(navManager.getCustomInfo("int_InrAmt"));
        scope.view.lblValue12.text ="NPR" +amount;
        scope.view.lblValue13.text =navManager.getCustomInfo("int_AuthorizedValue");
        scope.view.lblValue14.text =navManager.getCustomInfo("int_ConsumerVal");
        // scope.view.lblValue14.text =navManager.getCustomInfo("cbcAccBalance");
        this.view.flxConfirmDetail14.setVisibility(false);
        this.view.flxConfirmDetail13.setVisibility(false);
        this.view.flxConfirmDetail2.setVisibility(false);
        scope.view.lblValue15.text =navManager.getCustomInfo("int_Purpose");
        scope.view.lblValue16.text =navManager.getCustomInfo("int_Relation");
        var currentDate = new Date();
        scope.view.lblValue17.text =currentDate.toLocaleDateString();
        scope.view.lblValue18.text =navManager.getCustomInfo("int_Note");
      }

      if (!scope.isEmptyNullOrUndefined(this.collectionObj.Collection["Transaction"])) {
        if (this.collectionObj.Collection["Transaction"]["createSuccess"] === "true") {
          scope.setAcknowledgement();
        } else if (this.collectionObj.Collection["Transaction"]["createSuccess"] === "false") {
          scope.buttonModifyOnClick(scope.collectionObj);
        } else if (this.collectionObj.Collection["Transaction"]["MFAAttributes"]) {
          scope.confirmTransferMFA(scope.collectionObj.Collection["Transaction"])
        }
      }
    },

    // /**
    //  * @api : populateDocumentsName
    //  * To set the visibility of the flex for supporting documents  based on the input documents
    //  * @return : NA
    //  */
    // populateDocumentsName: function () {
    //   var containDocument = false;
    //   var documentList = this.context.Transaction.attachedFileList;
    //   // set all files to visibility false.
    //   for (var val = 1; val <= 5; val++) {
    //     this.view["flxValueDocName" + val].isVisible = false;
    //   }
    //   if (documentList) {
    //     this.view.flxConfirmSupportingDocs.setVisibility(true);
    //     for (var i = 0; i < documentList.length; i++) {
    //       var j = i + 1;
    //       this.view["lblValueDocName" + j].text = documentList[i][0];
    //       this.view["icon" + j].src = documentList[i][1];
    //       containDocument = true;
    //       this.view["lblValueDocName" + j].isVisible = true;
    //       this.view["icon" + j].isVisible = true;
    //       this.view["flxValueDocName" + j].isVisible = true;
    //     }
    //   }
    //   if (containDocument === false) {
    //     this.view.flxConfirmSupportingDocs.setVisibility(true);
    //     this.view.flxValueDocName1.setVisibility(true);
    //     this.view.icon1.setVisibility(false);
    //     this.view.lblValueDocName1.setVisibility(true);
    //     this.view.lblValueDocName1.text = kony.i18n.getLocalizedString("i18n.common.none");
    //   }
    
    // },

    /**
    /**
    * @api : initActionsOfButtons
     * Actions of buttons are initialized
    * @return : NA
    */
    initActionsOfButtons: function () {
      var scope = this;
      this.view.btnAction3.onClick = function () {
        // if(scope.context.transferFlow === "Edit" || scope.context.transferFlow === "EditModify"){
        //   scope.businessController.invokeCustomVerbforEditTransaction();
        // }else{
          // scope.businessController.invokeCustomVerbforCreateTransaction();
          var navManager = applicationManager.getNavigationManager();
          param = {
            "orgRequestUniqueId" :navManager.getCustomInfo("int_orgRequestUniqueId"),
            "endToEndId":navManager.getCustomInfo("int_endToEndId"),
            "amount": navManager.getCustomInfo("int_ResponseAmt") 
          }
          scope.businessController.createPaymentService(param);
        // }
      };
      this.view.btnAction2.onClick = function () {
        scope.buttonModifyOnClick(scope.collectionObj);
      };
      this.view.btnAction1.onClick = this.showCancelPopup.bind(this);
    },
    /**
     * @api : showCancelPopup
     * displays popup on click of cancel button
     * @return : NA
     */
    showCancelPopup: function () {
      var scope = this;
      try {
        if (kony.application.getCurrentForm()) {
          var flxPopupFlex = new kony.ui.FlexScrollContainer({
            id: "flxComNamePopup",
            isVisible: true,
            layoutType: kony.flex.FREE_FORM,
            skin: "ICSknScrlFlx000000OP40",
            left: "0dp",
            top: "0dp",
            width: "100%",
            height: "100%",
            zIndex: 1200,
            enableScrolling: true,
            scrollDirection: kony.flex.SCROLL_VERTICAL,
            verticalScrollIndicator: true,
            bounces: true,
            allowVerticalBounce: true,
            bouncesZoom: true,
            accessibilityConfig : {
              a11yARIA:{
                "tabindex":-1
              }
            }
          }, {}, {});
          flxPopupFlex.setDefaultUnit(kony.flex.DP);
          kony.application.getCurrentForm().add(flxPopupFlex);
          var CustomPopup = new com.InfinityOLB.Resources.CustomPopup({
            autogrowMode: kony.flex.AUTOGROW_NONE,
            id: "cancelPopup",
            top: "0dp",
            layoutType: kony.flex.FREE_FORM,
            masterType: constants.MASTER_TYPE_DEFAULT,
            isModalContainer: true,
            isVisible: true,
            appName: "ResourcesMA",
          });
          flxPopupFlex.add(CustomPopup);
          CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        }
        CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        CustomPopup.flxCross.accessibilityConfig = {
          a11yLabel: "Close this cancel dialog",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        CustomPopup.btnYes.accessibilityConfig = {
          a11yLabel: "Yes, cancel the process",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        CustomPopup.btnNo.accessibilityConfig = {
          a11yLabel: "No, don't cancel the process",
          a11yARIA: {
            tabindex: 0,
            role: "button"
          }
        };
        CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.PayAPerson.CancelAlert");
        CustomPopup.flxCross.onClick = () => {
          flxPopupFlex.setVisibility(false);
          scope.view.btnAction1.setActive(true);
          kony.application.getCurrentForm().remove(flxPopupFlex);
        }
        CustomPopup.btnNo.onClick = () => {
          flxPopupFlex.setVisibility(false);
          scope.view.btnAction1.setActive(true);
          kony.application.getCurrentForm().remove(flxPopupFlex);
        }
        CustomPopup.btnYes.onClick = () => {
          flxPopupFlex.setVisibility(false);
          kony.application.getCurrentForm().remove(flxPopupFlex);
          scope.btnCancelOnClick();
        }
        if (kony.application.getCurrentBreakpoint() <= 640) {
          kony.application.getCurrentForm().flxComNamePopup.top = "0dp";
          kony.application.getCurrentForm().cancelPopup.height = "250dp";
        }
        CustomPopup.onKeyPress = this.onKeyPressCallback.bind(this,flxPopupFlex);
        CustomPopup.lblHeading.setActive(true);
        CustomPopup.accessibilityConfig = {
          "a11yARIA":{
            "tabindex": -1,
            "role": "dialog"
          }
       };
        scope.view.forceLayout();

      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "showCancelPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    onKeyPressCallback: function (flxPopupFlex, eventObject, eventPayload) {
      var scopeObj = this;
      if (eventPayload.keyCode === 27) {
          if(flxPopupFlex.isVisible === true) {
              flxPopupFlex.setVisibility(false);
              kony.application.getCurrentForm().remove(flxPopupFlex);
              scopeObj.view.btnAction1.setActive(true);
          }
      }
    },
    /**
      * @api : isEmptyNullOrUndefined
      * Verifies if the value is empty, null or undefined
      * data {any} - value to be verified
      * @return : {boolean} - validity of the value passed
      */
    isEmptyNullOrUndefined: function (data) {
      if (data === null || data === undefined || data === "") return true;
      if (typeof data === "object") {
        if (Array.isArray(data)) return data.length === 0;
        return Object.keys(data).length === 0;
      }
      return false;
    },
  };
});
