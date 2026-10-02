define(['./UnifiedTransferSelectionBusinessController', './UnifiedTransferSelectionStore', 'CommonUtilities','OLBConstants'], function (BusinessController, UnifiedTransferSelectionStore, CommonUtilities,OLBConstants) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._dataMapping = {};
      this.businessController = new BusinessController();
      UnifiedTransferSelectionStore.subscribe(this.render.bind(this));
      this.store = UnifiedTransferSelectionStore;
      this.businessController.store = this.store;
      this.collectionObj = UnifiedTransferSelectionStore.getState();
      this.richTextId = " ";
      this.popupKey=false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
            defineGetter(this, 'dataMapping', () => {
                return this._dataMapping;
            });
            defineSetter(this, 'dataMapping', value => {
                this._dataMapping = value;
            });
            defineGetter(this, 'rtxtId', () => {
                return this._rtxtId;
            });
            defineSetter(this, 'rtxtId', value => {
                this._rtxtId = value;
                this.richTextId = this._rtxtId;
            });
        },
    /**
  * @api : preShow
    * Gets invoked initially before rendering of UI
  * @return : NA
  */
    preShow: function () {
      var scope = this;
      try {
        this.businessController.setDataInCollection(this.context);
        this.initActionsOfButtons();
        this.bindFieldsData();
        this.view.flxPopup.onKeyPress = this.onKeyPressCallBack;
        this.view.flxMainContainer.doLayout = CommonUtilities.centerPopupFlex;
        this.view.flxScrollMainContainer.accessibilityConfig = {
          "a11yARIA": {
            tabindex: -1
          }
        }
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

    setAccessibility: function (a11yLabel) {
      this.view.btnCrossPopup.accessibilityConfig = {
        a11yLabel: "Close this learn more dialog",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      this.view.btnClosePopup.accessibilityConfig = {
        a11yLabel: "Close this learn more dialog",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      this.view.rtLearnMore.accessibilityConfig={
        "a11yLabel": a11yLabel.rtLearnMore,
        "a11yARIA": {
          tabindex: -1
        }
      }
      this.view.btnAction1.accessibilityConfig = {
        "a11yLabel": a11yLabel.btnAction1,
        "a11yARIA": {
          role: "link"
        }
      }
      this.view.btnAction2.accessibilityConfig = {
        "a11yLabel": a11yLabel.btnAction2,
        "a11yARIA": {
          role: "link"
        }
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
        this.context = context;
      }
      catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "SetContext",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
  * @api : initActionsOfButtons
    * Actions of buttons are initialized
  * @return : NA
  */
    initActionsOfButtons: function () {
      var scope = this;
      this.view.rtLearnMore.onClick = this.showDescription.bind(this);
      this.view.btnAction1.onClick = this.buttonActionHandling.bind(this, this._dataMapping.transferType ==="Pay a Person"  ? "Wallets" : "MakeTransfer");
      this.view.btnAction2.onClick = this.buttonActionHandling.bind(this, this._dataMapping.transferType ==="Pay a Person"  ? "TransactionHistory" : "AddNewAccount");
      this.view.btnAction3.onClick = this.buttonActionHandling.bind(this, "ScheduleTransfer");
      this.view.btnCrossPopup.onClick = this.closeDescription.bind(this);
      this.view.btnClosePopup.onClick = this.closeDescription.bind(this);
    },
    /**
  * @api : render
  * This method will be invoked when collection is updated to refresh UI
  * @return : NA
  */
    render: function () {
      this.collectionObj = UnifiedTransferSelectionStore.getState();
      var dataMapping = this.dataMapping;
    },

    /**
     * @api : bindFieldsData
     * Binds the view data from dataMapping
     * @return : NA
     */
    bindFieldsData: function() {
            this.view.imgTransactionIcon.src = this.businessController.getDataBasedOnDataMapping("imgTransactionIcon", this._dataMapping);
            this.view.lblTransactionType.text = this.businessController.getDataBasedOnDataMapping("lblTransactionType", this._dataMapping);
            var descriptionText = this.businessController.getDataBasedOnDataMapping("rtLearnMore", this._dataMapping);
            if (this._dataMapping.transferType == "Same Bank") this.view.rtLearnMore.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.sameBankDescriptionNew");
            else if (this._dataMapping.transferType == "Domestic Transfer") this.view.rtLearnMore.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.domesticDescriptionNew");
            else if (this._dataMapping.transferType == "International Transfer") this.view.rtLearnMore.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.internationalDescriptionNew");
            else this.view.rtLearnMore.text = this.view.rtLearnMore.text =   kony.i18n.getLocalizedString("i18n.UnifiedTransfer.eSewaDescriptionNew") ;
            var btn1Entitlement = this.businessController.isEntitled(this.businessController.getDataBasedOnDataMapping("MakeTransfer", this._dataMapping));
            var btn2Entitlement = this.businessController.isEntitled(this.businessController.getDataBasedOnDataMapping("AddNewAccount", this._dataMapping));
            this.view.btnAction2.centerX = "85%";
            this.view.btnAction2.width = "110px";
            if(kony.os.deviceInfo().screenWidth>640 && kony.os.deviceInfo().screenWidth<830)
            {
                this.view.btnAction1.width = "70px";
                this.view.btnAction1.left = "7px";
                this.view.btnAction2.width = "55px";
                this.view.btnAction2.left = "197px";
                this.view.btnAction3.width = "100px";
                this.view.btnAction3.left = "87px";
            }
            else if(kony.os.deviceInfo().screenWidth>=830 && kony.os.deviceInfo().screenWidth<1024)
            {
                this.view.btnAction1.width = "100px";
                this.view.btnAction1.left = "10px";
                this.view.btnAction2.width = "100px";
                this.view.btnAction3.width = "130px";
                this.view.btnAction3.left = "120px";
            }
            else{
            this.view.btnAction2.centerX = "85%";
            this.view.btnAction2.width = "110px";
            this.view.btnAction1.width = "110px";
            this.view.btnAction3.width = "150px";
            }
            
            if (this.view.lblTransactionType.text === "International Transfer") {
                btn2Entitlement = false;
                this.view.btnAction3.setVisibility(false);
                this.view.flxSeparator21.setVisibility(false);
                this.view.rtLearnMore.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.internationalDescriptionNew");
            }
            if (this.view.lblTransactionType.text === "Pay a Person") {
                this.view.lblTransactionType.text = "Wallet";
                this.view.rtLearnMore.text = this.view.rtLearnMore.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.eSewaDescriptionNew");
                this.view.rtLearnMore.setVisibility(true);
                this.view.btnAction1.text = "Load eSewa";
                this.view.btnAction2.text = "Transaction History";
                this.view.btnAction3.setVisibility(false);
                this.view.flxSeparator21.setVisibility(false);
                this.view.btnAction2.centerX = "81%";
                this.view.btnAction2.width = "150px";
                
                this.view.flxSeparator2.centerX = "50%";
                 if(kony.os.deviceInfo().screenWidth>640 && kony.os.deviceInfo().screenWidth<830)
                {
                     this.view.btnAction2.centerX = "71%";
                     this.view.btnAction1.left = "10px";
                     
                }
                 else if(kony.os.deviceInfo().screenWidth>=830 && kony.os.deviceInfo().screenWidth<1024)
                {
                     this.view.btnAction2.centerX = "81%";
                     this.view.btnAction2.width = "130px";
                     this.view.btnAction1.width = "100px";
                     this.view.btnAction1.left = "10px";
                     
                }
                else{
                    this.view.btnAction2.centerX = "81%";
                    this.view.btnAction2.width = "150px";
                    this.view.btnAction1.width = "110px";
            
                }
                this.view.imgTransactionIcon.src = "wallet.png";
            }
            if (this.view.lblTransactionType.text === "Domestic Transfer") {
                this.view.btnAction3.setVisibility(true);
                this.view.flxSeparator21.setVisibility(false);
                this.view.flxSeparator2.centerX = "50%";
                if(OLBConstants.CLIENT_PROPERTIES.FT_SCHEDULE_DOMESTIC.toUpperCase()  == "FALSE"){
                  this.view.btnAction3.setVisibility(false);
                  this.view.flxSeparator21.setVisibility(false);
              }
                if(kony.os.deviceInfo().screenWidth>640 && kony.os.deviceInfo().screenWidth<830)
            {
                this.view.btnAction1.width = "70px";
                this.view.btnAction1.left = "7px";
                this.view.btnAction2.width = "55px";
                this.view.btnAction2.left = "197px";
                this.view.btnAction3.width = "100px";
                this.view.btnAction3.left = "87px";
            }
            else if(kony.os.deviceInfo().screenWidth>=830 && kony.os.deviceInfo().screenWidth<1024)
            {
                this.view.btnAction1.width = "100px";
                this.view.btnAction1.left = "10px";
                this.view.btnAction2.width = "100px";
                this.view.btnAction3.width = "130px";
                this.view.btnAction3.left = "120px";
            }
            else{
            this.view.btnAction2.centerX = "85%";
            this.view.btnAction2.width = "110px";
            this.view.btnAction1.width = "110px";
            this.view.btnAction3.width = "150px";
            }
            
            }
      if (btn1Entitlement && btn2Entitlement) {
        this.view.btnAction1.setVisibility(true);
        this.view.btnAction2.setVisibility(true);
       // this.view.flxSeparator2.setVisibility(true);
      }
      else if (btn1Entitlement) {
        this.view.btnAction1.centerX = "50%";
        this.view.btnAction1.setVisibility(true);
        this.view.btnAction2.setVisibility(false);
        this.view.flxSeparator2.setVisibility(false);
      }
      else if (btn2Entitlement) {
        this.view.btnAction2.centerX = "50%";
        this.view.btnAction1.setVisibility(false);
        this.view.btnAction2.setVisibility(true);
        this.view.flxSeparator2.setVisibility(false);
      }
      else {
        this.hideTile();
      }
      this.view.flxTransferTypes.forceLayout();
    },

    onKeyPressCallBack: function(eventObject, eventPayload) {
      if(eventPayload.keyCode === 27){
        if(this.view.flxPopupHeader.isVisible === true){
          this.closeDescription();  
        }
      }
    },
    /**
     * @api : getShortDescription
     * Get formatted short description with the link
     * @return : short text
     */
    getShortDescription: function(description) {
      var descriptionRender;
      if (kony.application.getCurrentBreakpoint() === 640) {
          descriptionRender = 120;
      } else {
          descriptionRender = 60;
      }
      if(this.richTextId=="LearnMore1"){
      var moreLink = "<a id= " + this.richTextId + " aria-label='Learn more about within same bank transfer' tabindex = 0 role = button  href = " + "#>" + this.businessController.getDataBasedOnDataMapping("MoreLink", this._dataMapping) + "</a>";
      }
      else if (this.richTextId=="LearnMore2")
      {
          var moreLink = "<a id= " + this.richTextId + " aria-label='Learn more about domestic transfer' tabindex = 0 role = button  href = " + "#>" + this.businessController.getDataBasedOnDataMapping("MoreLink", this._dataMapping) + "</a>";

      }
      else if(this.richTextId=="LearnMore3"){
          var moreLink = "<a id= " + this.richTextId + " aria-label= 'Learn more about international transfer' tabindex = 0 role = button  href = " + "#>" + this.businessController.getDataBasedOnDataMapping("MoreLink", this._dataMapping) + "</a>";

      }
      else
      {
          var moreLink = "<a id= " + this.richTextId + " aria-label='Learn more about pay a person' tabindex = 0 role = button   href = " + "#>" + this.businessController.getDataBasedOnDataMapping("MoreLink", this._dataMapping) + "</a>";
      }
      var shortText = description.slice(0, descriptionRender) + "..." + moreLink;
      return shortText;
  },

    setRichTextFocus: function() {
      if(this.popupKey){
          this.popupKey=false;
          document.getElementById(this.richTextId).focus();
      }
      else{
          let currForm = kony.application.getCurrentForm();
          currForm.lblTransfersHead.setActive(true);
      }
  
  },

    /**
     * @api : showDescription
     * Shows the description popup on click of learn more link
     * @return : NA
     */
    showDescription: function () {
      var form = kony.application.getCurrentForm();
      this.view.lblTransactionTypePopup.text = this.businessController.getDataBasedOnDataMapping("lblTransactionTypePopup", this._dataMapping);
      this.view.rtPopupDescription.text = this.businessController.getDataBasedOnDataMapping("rtPopupDescription", this._dataMapping);
      this.view.lblTermsConditionsTitle.text = this.businessController.getDataBasedOnDataMapping("lblTermsConditionsTitle", this._dataMapping);
      this.view.rtTermsConditions.text = this.businessController.getDataBasedOnDataMapping("rtTermsConditions", this._dataMapping);
      this.removeRTFocus();
      this.popupObj = this.view.flxPopup.clone();
      form.add(this.popupObj);
      this.popupObj.isVisible = true;
      this.view.flxTransferTypes.forceLayout();
      this.popupObj.lblTransactionTypePopup.setActive(true);
      this.popupObj.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1,
          "aria-modal": true,
          "role": "dialog"
        }
      }
    },
    removeRTFocus: function(){
      var lm1 = document.getElementById("LearnMore1");
      lm1.tabIndex = -1;
      var lm2 = document.getElementById("LearnMore2");
      lm2.tabIndex = -1;
      var lm3 = document.getElementById("LearnMore3");
      lm3.tabIndex = -1;
      var lm4 = document.getElementById("LearnMore4");
      lm4.tabIndex = -1;
    },
    setRTIndex: function(){
      var lm1 = document.getElementById("LearnMore1");
      lm1.tabIndex = 0;
      var lm2 = document.getElementById("LearnMore2");
      lm2.tabIndex = 0;
      var lm3 = document.getElementById("LearnMore3");
      lm3.tabIndex = 0;
      var lm4 = document.getElementById("LearnMore4");
      lm4.tabIndex = 0;
    },
    /**
     * @api : closeDescription
     * Closes the description popup on click of close
     * @return : NA
     */
    closeDescription: function() {
      this.popupKey=true;
      var currForm = kony.application.getCurrentForm();
      currForm.remove(this.popupObj);
      this.view.flxPopup.setVisibility(false);
      this.setRTIndex();
      this.setRichTextFocus();
  },
    /**
     * @api : buttonActionHandling
     * Handles the action of btnAction1 and btnAction2
     * @return : NA
     */
    buttonActionHandling: function (clickedButton) {
      var navManager = applicationManager.getNavigationManager(); 
		  navManager.setCustomInfo("transactionTypeModule",clickedButton);
      var selectedTransferType =
      {
        "transferType": this.businessController.getDataBasedOnDataMapping("transferType", this._dataMapping),
        "clickedButton": (clickedButton == "ScheduleTransfer" ) ? "MakeTransfer":clickedButton
      };
      
      this.transferTypeDetails(selectedTransferType);
    }
  };
});