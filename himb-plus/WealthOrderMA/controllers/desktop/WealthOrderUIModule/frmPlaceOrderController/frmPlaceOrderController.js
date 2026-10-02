define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], 
       function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    flag: false,//IW-3757 - Bhuvanesh
    buyOrSellClicked: false,
    funcResultCodeValue : '',
    instrumentDetails: {},
    instrumentId: "",
    ricCode: "",
    favIds: "",
    favRics: "",
    instrumentDetailsQuantity: "0",
    modifyPlaceOrder: "",
    instrIsin: "",
    instrName: "",
    accountsListObj : {},
    currentInstrumentData: {},
    portfolioId: "",
    orderScreen: "",
    orderResponse: {},
    orderRequest: {},
    operation: "",
    selectedOrderType: "Limit",
    orderParams: {},
    navFromForm: "",
    portfolioDetailsData: {},
    portfolioDetails: {},
    orderFlow: "",
    getInstrumentCurrentPosition: "",
    getInstrumentPricingData: "",
    getInstrumentDetailValues: "",
    isPortfolioJoint:"",
    orderType: {
      'Market': 'Market', //"i18n.transfers.frequency.once",
      'Limit': 'Limit',
      'Stop Loss': 'Stop Loss',
      'Stop Limit': 'Stop Limit'
    },
    orderValidity: {
      //for backend data
      'GTD': 'Day Order', //"i18n.transfers.frequency.once",
      'GTC': 'Good Till Cancelled'
    },
    orderTypePrice: 0,
	lblCurrency:"",
    init: function() {
    },
    updateFormUI: function(uiData) {
      if (uiData) {
        if (uiData.ProductDetails) {
          /*
		  if(uiData.ProductDetails.instrumentDetails){
          if ((Object.entries(uiData.ProductDetails.instrumentDetails).length)>0) {
            this.instrumentDetails = uiData.ProductDetails.instrumentDetails;   
            this.instrumentDetails.stockExchange = uiData.ProductDetails.instrumentMinimal[0].stockExchange;
            this.instrumentDetails.instrumentName = uiData.ProductDetails.instrumentMinimal[0].instrumentName;
            this.instrumentDetails.ISINCode = uiData.ProductDetails.instrumentMinimal[0].ISINCode;
          } 
          }else {
            if(uiData.ProductDetails.instrumentMinimal){
            if((Object.entries(uiData.ProductDetails.instrumentMinimal[0]).length)>0)
              this.instrumentDetails = uiData.ProductDetails.instrumentMinimal[0];       
            else
              this.view.InstrumentDetailsPlaceOrder.setVisibility(false);
          }
          }*/
		  
		  if(uiData.ProductDetails.productDetails && Object.entries(uiData.ProductDetails.productDetails).length>0){
            this.instrumentDetails = uiData.ProductDetails.productDetails;   
          }else {
              this.view.InstrumentDetailsPlaceOrder.setVisibility(false);
          }
		  
          
          var currForm = kony.application.getCurrentForm();   
          this.getInstrumentDetails(this.instrumentDetails);
          this.disableQuantityFieldForTAP(scope_WealthPresentationController.isTAPIntegration && scope_WealthPresentationController.instrumentAction == "Modify");//IW-3582
          this.setFavouriteStatus();
          if(uiData.ProductDetails.pricingDetails){
            this.getPricingDetails(uiData.ProductDetails.pricingDetails);
            this.view.flxRight.setVisibility(true);
            this.view.flxRight.setVisibility(true);
          }
          else{
            this.view.flxRight.setVisibility(false);
            this.view.flxRight.setVisibility(false);
          }
          if (this.modifyPlaceOrder !== "") {
            this.operation = this.modifyPlaceOrder.orderMode;
          }
          if(scope_WealthPresentationController.reload == "Reload" && scope_WealthPresentationController.instrumentAction !== "Modify")
		  this.operation = scope_WealthPresentationController.instrumentAction;
          this.setOperation();
          currForm.forceLayout();
          //avoiding resetting the quantity in case of reload
          if(scope_WealthPresentationController.reload !== "Reload"){
            this.view.lblApproximatelyVal.text = this.setApproximatelyValue("0");

            if (this.modifyPlaceOrder !== "") {
              this.populateModifyForm(this.modifyPlaceOrder);
              this.view.btnProceedPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.modifyOrder");
              this.operation === "Buy" ? CommonUtilities.disableButton(this.view.InstrumentDetailsPlaceOrder.btnSell) : CommonUtilities.disableButton(this.view.InstrumentDetailsPlaceOrder.btnBuy);
            } else {
              this.view.btnProceedPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.placeOrderButton");
              this.view.flxModifyOrder.isVisible = false;
              CommonUtilities.enableButton(this.view.InstrumentDetailsPlaceOrder.btnSell);
							CommonUtilities.enableButton(this.view.InstrumentDetailsPlaceOrder.btnBuy);
					if(this.operation === "Sell"){
					this.view.InstrumentDetailsPlaceOrder.btnBuy.skin = 'sknBtnSSPBgffffffNoBorder';
                    this.view.InstrumentDetailsPlaceOrder.btnSell.skin = 'sknBtnSSPBg0273e3NoBorder0273e3';
					}else{
						this.view.InstrumentDetailsPlaceOrder.btnBuy.skin = 'sknBtnSSPBg0273e3NoBorder0273e3';
                    this.view.InstrumentDetailsPlaceOrder.btnSell.skin = 'sknBtnSSPBgffffffNoBorder';
					}
            }
          }
          this.instrIsin = this.instrumentDetails.ISINCode;
          this.instrName = this.instrumentDetails.instrumentName;
          
          this.view.lblCurrentPositionAmount.text = (applicationManager.getFormatUtilManager().getCurrencySymbol(this.lblCurrency)) + applicationManager.getFormatUtilManager().formatAmount(applicationManager.getFormatUtilManager().deFormatAmount(scope_WealthPresentationController.currentPosition)) + " (" + scope_WealthPresentationController.quantity  +")";
		  
          if(applicationManager.getFormatUtilManager().deFormatAmount(scope_WealthPresentationController.currentPosition) == "0" || applicationManager.getFormatUtilManager().deFormatAmount(scope_WealthPresentationController.currentPosition) == "0.00"){
            this.view.lblCurrentPositionAmount.text = applicationManager.getFormatUtilManager().formatAmount(applicationManager.getFormatUtilManager().deFormatAmount(scope_WealthPresentationController.currentPosition)) + " (" + scope_WealthPresentationController.quantity  +")";
          }
		  this.view.lblStopLimitPriceCurrency.text = this.lblCurrency;
          this.view.lblStopLimitOrderCurrency.text = this.lblCurrency;
          this.view.lblLimitPriceCurrency.text = this.lblCurrency;
          this.view.lblLimitPriceCurrencyRow2.text = this.lblCurrency;
          this.setUiChanges();
        }
        if (uiData.CreateOrderResponse) {
          if (uiData.CreateOrderResponse.errorDetails) {
                        this.setUpOverridesAndErrors(uiData.CreateOrderResponse);
                        CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
                    this.view.flxOrderDetailsConfirmation.setVisibility(false);
                    this.view.flxFormContent.setContentOffset({
                        "y": "0dp"
                    });
                    }else{
          this.orderResponse = uiData.CreateOrderResponse;
          this.funcResultCodeValue = this.orderResponse.funcResultCode || '';
           if(this.orderResponse.messageDetails && this.orderFlow !== "Acknowledge"){
            this.orderResponse.warn = true;
            this.setUpOverridesAndErrors(this.orderResponse);
          }
          if(orderRequest.validate_only == ""){
            this.setAknowledgementData(orderRequest);
            return;
          }
          this.orderViewSummary();
          this.view.flxOrderWarning.setVisibility(false);
          this.view.flxAccountDetails.setVisibility(false);
          this.view.flxOrderDetails.setVisibility(false);
          this.view.flxPlaceOrderButtons.setVisibility(false);
          this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(false);
          this.view.lblOrderDetails.setVisibility(true);
          this.view.flxSeparatorLine1.setVisibility(true);
          this.view.OrderDetailsConfirmation.skin = "slFbox";
          this.view.flxOrderDetailsConfirmation.setVisibility(true);
          this.setUiChanges();
          this.view.OrderDetailsConfirmation.Buttons.btnCancel.onClick = this.openCancelOrderPopup;
        }}
        if (uiData.ModifyOrderResponse) {
          this.orderResponse = uiData.ModifyOrderResponse;
           if(this.orderResponse.messageDetails && this.orderFlow !== "Acknowledge"){
            this.orderResponse.warn = true;
            this.setUpOverridesAndErrors(this.orderResponse);
          }
          if(orderRequest.validate_only == ""){
            this.setAknowledgementData(orderRequest);
            return;
          }
          this.orderViewSummary();
          if (this.orderFlow === "Acknowledge") {
            this.view.flxPlaceOrderContainer.setVisibility(false);
            this.view.lblPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.orderAcknowledgement");
            this.view.flxAcknowledgement.setVisibility(true);
          }
          if (this.orderFlow === "Confirm") {
            this.view.flxAcknowledgement.setVisibility(false);
            this.view.flxAccountDetails.setVisibility(false);
            this.view.flxOrderDetails.setVisibility(false);
            this.view.flxPlaceOrderButtons.setVisibility(false);
            this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(false);
            this.view.lblOrderDetails.setVisibility(true);
            this.view.flxSeparatorLine1.setVisibility(true);
            this.view.OrderDetailsConfirmation.skin = "slFbox";
            this.view.flxOrderDetailsConfirmation.setVisibility(true);
            this.setUiChanges();
            this.view.OrderDetailsConfirmation.Buttons.btnCancel.onClick = this.openCancelOrderPopup;
          }
        }
        if(uiData.CreateOrderResponseError){
          if(uiData.CreateOrderResponseError.serverErrorRes.errorDetails){
            if (!uiData.CreateOrderResponseError.serverErrorRes.dbpErrMsg) uiData.CreateOrderResponseError.serverErrorRes.dbpErrMsg = uiData.CreateOrderResponseError.serverErrorRes.errorDetails;
            this.setUpOverridesAndErrors(uiData.CreateOrderResponseError.serverErrorRes);
            return;
          }
          else if(uiData.CreateOrderResponseError.messageDetails){
            this.setUpOverridesAndErrors(uiData.CreateOrderResponseError);
            return;
          }
          CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
          this.view.flxOrderDetailsConfirmation.setVisibility(false);
          this.view.flxFormContent.setContentOffset({
            "y": "0dp"
          });
        }
        if(uiData.holdingsList){
          //  this.instrumentDetailsQuantity = uiData.holdingsList.portfolioHoldings[0].quantity;
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.flxLoading.setVisibility(false);
      }
    },
    disableQuantityFieldForTAP: function(val){
        this.view.tbxQuantity.setEnabled(!val);
        if(val){
        this.view.tbxQuantity.skin = "skndisabled"; 
        this.view.tbxQuantity.hoverSkin = "sknTbxBorder0036751px";
        this.view.tbxQuantity.focusSkin = "sknTbxBorder0036751px";
        }
    },
    setUpOverridesAndErrors: function(res){
      this.view.GenericMessageNew.setContext(res);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.flxFormContent.setContentOffset({
        "y": "0dp"
      });
    },
    setOperation: function(){
      switch(this.operation) {
        case "Sell":
          this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(true);
          this.view.InstrumentDetailsPlaceOrder.btnBuy.skin = 'sknBtnSSPBgffffffNoBorder';
          this.view.InstrumentDetailsPlaceOrder.btnSell.skin = 'sknBtnSSPBg0273e3NoBorder0273e3'; 
          if(scope_WealthPresentationController.isTAPIntegration && scope_WealthPresentationController.instrumentAction == "Modify"){
            this.view.flxAll.setVisibility(false);
          }else{
            this.view.flxAll.setVisibility(true);
          }
          /*if(scope_WealthPresentationController.isTapIntegration){
						this.view.flxAll.isVisible = false;
					}*/
          //WIW-664 DEFECT FIX
          break;
        case "Buy":
          this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(true);
          this.view.InstrumentDetailsPlaceOrder.btnBuy.skin = 'sknBtnSSPBg0273e3NoBorder0273e3';
          this.view.InstrumentDetailsPlaceOrder.btnSell.skin = 'sknBtnSSPBgffffffNoBorder';
          this.view.flxAll.setVisibility(false);
          this.view.imgActive.src = "inactive.png";
          this.view.tbxQuantity.setEnabled(true);
          this.view.tbxQuantity.skin = "sknTbxSSPffffff15PxBorder727272opa20";
          break;
        case "Modify":
          this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(false);
          this.view.flxAll.isVisible = false;
          break;
        default:
      }
      this.view.imgActive.setEnabled(true);
      if(scope_WealthPresentationController.isTAPIntegration && scope_WealthPresentationController.instrumentAction == "Modify"){
      this.view.imgActive.setEnabled(false);
      this.disableQuantityFieldForTAP(scope_WealthPresentationController.isTAPIntegration);
      }
      this.checkPermissions();
    },	
    changeOperation: function(widgetInfo) {
      let key = "";
      if(widgetInfo.id === undefined ||  widgetInfo.id === ""){
        key = "btn" + widgetInfo;
        buyOrSellClicked = false;
      }
      else{
        buyOrSellClicked = true;
        key = widgetInfo.id; 
      }
      this.view.tbxQuantity.text = this.modifyPlaceOrder.quantity?this.modifyPlaceOrder.quantity:"0";
      this.view.lblApproximatelyVal.text = this.setApproximatelyValue((this.modifyPlaceOrder.quantity?this.modifyPlaceOrder.quantity:"0"));
      switch(key) {
        case "btnBuy":
          this.operation = "Buy";
          this.setOperation();
          break;
        case "btnSell":
          this.operation = "Sell";
          this.setOperation();
          break;
        default:
      }
      scope_WealthPresentationController.instrumentAction = this.operation;
      this.checkPermissions();
    },
    populateModifyForm: function(params){
      var formUtilityMan = applicationManager.getFormatUtilManager();
      var orderRef = this.modifyPlaceOrder.orderReference;
      var instrOperation = this.modifyPlaceOrder.orderMode;
      this.operation = instrOperation;
      var orderType = this.modifyPlaceOrder.orderType;
      var limitPrice = this.modifyPlaceOrder.limitPrice === "" ? "0" : this.modifyPlaceOrder.limitPrice;
      var stopPrice = this.modifyPlaceOrder.stopPrice === "" ? "0" : this.modifyPlaceOrder.stopPrice;
      var stopLimitPrice = this.modifyPlaceOrder.stopLimitPrice === "" ? "0" : this.modifyPlaceOrder.stopLimitPrice;
      var limitPriceStopLimit = this.modifyPlaceOrder.limitPriceStopLimit === "" ? "0" : this.modifyPlaceOrder.limitPriceStopLimit;
      var stopLimitPriceRow2 = this.modifyPlaceOrder.stopLimitPriceRow2 === "" ? "0" : this.modifyPlaceOrder.stopLimitPriceRow2;
      var orderFees = this.modifyPlaceOrder.fees;
      var orderModeType = this.modifyPlaceOrder.orderModeType;
      var orderQuant = this.modifyPlaceOrder.quantity;
      var orderStatus = this.modifyPlaceOrder.status;
      var orderTradeDate = this.modifyPlaceOrder.tradeDate;
      var orderValidity = this.modifyPlaceOrder.validity;
      var orderValueDate = this.modifyPlaceOrder.valueDate;
      var currency = this.modifyPlaceOrder.instrumentCurrency;
      this.selectedOrderType = this.modifyPlaceOrder.orderModeType;
      if(limitPrice === "" || limitPrice === "0") 
      {
        limitPrice = this.modifyPlaceOrder.orderExecutionPrice ? this.modifyPlaceOrder.orderExecutionPrice : "0";
      }
      // set flxModifyOrder to visible
      this.view.flxModifyOrder.isVisible = true;
      // change page title
      this.view.lblPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.modifyOrder");
      // assign values from order
      this.view.tbxQuantity.text = orderQuant;
      
      this.view.lbxValidity.selectedKey = orderValidity === "Day Order"?this.view.lbxValidity.masterData[0][0]:this.view.lbxValidity.masterData[1][0];
      this.view.lbxOrderType.selectedKey = orderModeType;    
      if (orderModeType === "Stop Limit") {
        this.view.tbxLimitPriceStopLimit.text = formUtilityMan.formatAmount(limitPrice);
        this.view.tbxStopLimitPrice.text = formUtilityMan.formatAmount(stopPrice);
        this.view.flxRow3.setVisibility(true);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
      } else if (orderModeType === "Stop Loss") {
        this.view.tbxStopLimitPriceRow2.text = formUtilityMan.formatAmount(stopPrice);
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(true);
      } else if (orderModeType === "Limit") {
        this.view.tbxLimitPrice.text = formUtilityMan.formatAmount(limitPrice);
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(true);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
      }
      else{
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
      }
      //this.view.lbxValidity.selectedKey = orderValidity; // to be enabled after Transact integration
      this.view.lblOrderRef.text = "Order Ref  " + orderRef + "  from  " + orderTradeDate;
      this.setApproximatelyValue(orderQuant);
      this.view.lblApproximatelyVal.text = this.setApproximatelyValue(orderQuant);
      //this.checkValidityPaceOrderForm();
    },
    preShow: function() {
    this.view.CancelOrder.lblHeading.text = kony.i18n.getLocalizedString("i18n.wealth.orders");
      this.view.CancelOrder.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.wealth.cancelOrderConfirmation");
    this.view.flxLimitPrice.setVisibility(true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.flxLoading.setVisibility(true);
    this.view.flxSuccessMessage.setVisibility(false);
    this.instrumentId = "";
    let scopeObj = this;
    this.view.GenericMessageNew.closepopup = this.closepopup;
    this.view.onBreakpointChange = function () {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
    }
    this.getInstrumentCurrentPosition = applicationManager.getModulesPresentationController("WealthOrderUIModule").getInstrumentCurrentPosition();
    this.getInstrumentPricingData = applicationManager.getModulesPresentationController("WealthOrderUIModule").getInstrumentPricingData();
    this.getInstrumentDetailValues = applicationManager.getModulesPresentationController("WealthOrderUIModule").getInstrumentDetails();
    if (scope_WealthPresentationController.isJointAccount === true) {
        this.view.btnProceedPlaceOrder.setVisibility(false);
        this.view.flx3Dot.isVisible = false;
    }
    else {
        this.view.btnProceedPlaceOrder.setVisibility(true);
        this.view.flx3Dot.isVisible = true;
    }
    this.checkPermissions();
    this.view.InstrumentDetailsPlaceOrder.imgRefresh.onTouchEnd = this.reloadProductDetails.bind();
    this.view.accountActionsMenu.setVisibility(false);
    this.view.flx3Dot.skin = "slFbox";
    var wealthModule = applicationManager.getModulesPresentationController({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" });
    this.portfolioId = wealthModule.getPortfolioId();
    if (Object.keys(this.getInstrumentPricingData).length > 0 || Object.keys(this.getInstrumentDetailValues).length > 0 || Object.keys(this.getInstrumentCurrentPosition).length > 0) {
        this.view.flxRight.setVisibility(true);
        this.instrumentDetails = this.getInstrumentDetailValues;
        var currForm = kony.application.getCurrentForm();
        this.getInstrumentDetails(this.instrumentDetails);
        //         this.setFavouriteStatus();
        if (Object.keys(this.getInstrumentPricingData).length > 0) {
            this.getPricingDetails(this.getInstrumentPricingData);
            this.view.flxRight.setVisibility(true);
        }
        else {
            this.view.flxRight.setVisibility(false);
        }
        if (this.modifyPlaceOrder !== "") {
            this.operation = this.modifyPlaceOrder.orderMode;
        }
        this.setOperation();
        currForm.forceLayout();
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue("0");
        if (this.modifyPlaceOrder !== "") {
          /*if(data1 === true){
            data1=applicationManager.getNavigationManager().setCustomInfo('frmModifyButton',false);
            this.view.btnProceedPlaceOrder.setEnabled(false);
          }*/
            this.populateModifyForm(this.modifyPlaceOrder);
            this.view.btnProceedPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.modifyOrder");
            this.operation === "Buy" ? CommonUtilities.disableButton(this.view.InstrumentDetailsPlaceOrder.btnSell) : CommonUtilities.disableButton(this.view.InstrumentDetailsPlaceOrder.btnBuy);
        } else {
            this.view.btnProceedPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.placeOrderButton");
            this.view.flxModifyOrder.isVisible = false;
            CommonUtilities.enableButton(this.view.InstrumentDetailsPlaceOrder.btnSell);
            CommonUtilities.enableButton(this.view.InstrumentDetailsPlaceOrder.btnBuy);
            this.setOperation();
        }
        this.instrIsin = this.instrumentDetails.ISINCode;
        this.instrName = this.instrumentDetails.instrumentName;
        this.view.lblCurrentPositionAmount.text = this.setCurrentPosition();
        this.setUiChanges();
        this.view.flxLoading.setVisibility(false);
    } else
        this.view.flxRight.setVisibility(false);
    this.getProductDetails();
    this.accountsListObj = wealthModule.getAccountsListObj();
    var navManager = applicationManager.getNavigationManager();
    var dataCustom = navManager.getCustomInfo('frmPlaceOrder');
    this.currentInstrumentData = dataCustom;
    /*var forUtility = applicationManager.getFormatUtilManager();
    var currentCurrency;
    var data1 = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');
    if (data1 !== undefined) {
        var instrumentMinimal = data1.productDetails !== undefined ? (data1.productDetails.instrumentMinimal !== undefined ? data1.productDetails.instrumentMinimal[0] : "") : "";
        var instruDetails = data1.productDetails !== undefined ? (data1.productDetails.instrumentDetails !== undefined ? data1.productDetails.instrumentDetails : "") : "";
    }


    if (dataCustom.holdingsData !== undefined && dataCustom.holdingsData !== "") {
        var currencyCode = dataCustom.holdingsData.instrumentCurrency || dataCustom.holdingsData.secCCy;
        currentCurrency = forUtility.getCurrencySymbol(currencyCode);
    }
    else {
        if (this.navFromForm.friendlyName === "AccountsUIModule/frmDashboard") {
            if (dataCustom.secCCy != undefined) { currentCurrency = forUtility.getCurrencySymbol(dataCustom.secCCy); }
            //else currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.tradeCurrency);
            else if (instrumentMinimal.hasOwnProperty("referenceCurrency")) {
                currentCurrency = forUtility.getCurrencySymbol(instrumentMinimal.referenceCurrency);
            }
            else if (instruDetails.hasOwnProperty("referenceCurrency")) {
                currentCurrency = forUtility.getCurrencySymbol(instruDetails.referenceCurrency.toUpperCase());
            }
            else { currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.tradeCurrency); }
        }
        else if (this.navFromForm !== "frmWatchlist") {
            scope_WealthPresentationController.tradeCurrency = scope_WealthPresentationController.selectedInstrDetails.lblCurrency;
            currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.tradeCurrency);
        }
        else {
            if (dataCustom.secCCy != undefined) {
                currentCurrency = forUtility.getCurrencySymbol(dataCustom.secCCy);
            }
            else if (instrumentMinimal.hasOwnProperty("referenceCurrency")) {
                currentCurrency = forUtility.getCurrencySymbol(instrumentMinimal.referenceCurrency);
            }
            else if (instruDetails.hasOwnProperty("referenceCurrency")) {
                currentCurrency = forUtility.getCurrencySymbol(instruDetails.referenceCurrency.toUpperCase());
            }
            else { currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.referenceCurrency); }
        }
    }*/
    this.view.lblStopLimitPriceCurrency.text = this.lblCurrency;
    this.view.lblStopLimitOrderCurrency.text = this.lblCurrency;
    this.view.lblLimitPriceCurrency.text = this.lblCurrency;
    this.view.lblLimitPriceCurrencyRow2.text = this.lblCurrency;
    this.view.OrderDetailsConfirmation.Buttons.btnConfirm.onClick = this.goToAcknowledgement;
    this.view.btnProceedPlaceOrder.onClick = this.goToOrderConfirmation;
    this.view.flxPlaceOrderContainer.setVisibility(true);
    this.view.flxAcknowledgement.setVisibility(false);
    this.view.lblPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.placeOrder");
    this.view.flxLoadingIndicatorFrom.setVisibility(true);
    this.getCashBalance();
    this.view.imgActive.onTouchEnd = this.onClickSelectAll;
    this.view.btnCancelPlaceOrder.onClick = this.goBack;
    this.view.OrderDetailsConfirmation.Buttons.btnModify.onClick = this.modifyOrderView;
    this.view.flx3Dot.onClick = this.toggleAccountActionsMenu;
    this.view.flxImgInfoIcon.onClick = this.onInfoValidityClick;
    this.view.flxOrderImgInfoIcon.onClick = this.onInfoOrderTypeClick;
    this.view.flxLimitPriceImgInfo.onClick = this.onInfoLimitPriceClick;
    this.view.flxStopLimitPriceImgInfoRow2.onClick = this.onInfoStopPriceClick;
    this.view.flxStopLimitPriceImgInfo.onClick = this.onInfoStopLimitPriceClick;
    this.view.flxStopLimitOrderImgInfoIcon.onClick = this.onInfoLimitPriceClick;
    this.view.lbxOrderType.masterData = this.getOrderTypes();
    //this.view.lbxOrderType.selectedKey = this.selectedOrderType;
    this.view.lbxOrderType.selectedKey = this.view.lbxOrderType.masterData[1][1];
    this.view.lbxOrderType.onSelection = this.onOrderTypeSelected;
    this.onOrderTypeSelected(this.view.lbxOrderType);
    this.view.lbxValidity.masterData = this.getOrderValidity();
    this.view.lbxValidity.selectedKey = this.view.lbxValidity.masterData[0][0];
    this.view.lbxOrderAccountsList.masterData = this.getOrderAccountsList(this.accountsListObj);
    var navFrom = applicationManager.getNavigationManager().getPreviousForm();
    this.view.lbxOrderAccountsList.selectedKey = this.portfolioId;
    this.view.lbxOrderAccountsList.onSelection = this.onOrderAccountSelected;
    scope_WealthPresentationController.instrumentAction === "Sell" ? this.view.flxAll.setVisibility(true) : this.view.flxAll.setVisibility(false);
    this.view.flxAccountDetails.setVisibility(true);
    this.view.flxOrderDetails.setVisibility(true);
    this.view.flxPlaceOrderButtons.setVisibility(true);
    this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(true);
    this.view.lblOrderDetails.setVisibility(false);
    this.view.flxSeparatorLine1.setVisibility(false);
    this.view.flxOrderDetailsConfirmation.setVisibility(false);
    //this.view.CancelOrder.btnYes.onClick = this.goBack;
    this.view.CancelOrder.btnYes.onClick = this.cancelTheOrder;
    this.view.btnCancelTransfer.onClick = this.goBack;
    this.view.btnViewOrder.onClick = this.viewOrders;
    this.operation = dataCustom.operation;
    this.changeOperation(dataCustom.operation);
    this.view.InstrumentDetailsPlaceOrder.btnBuy.onClick = this.changeOperation.bind(this);
    this.view.InstrumentDetailsPlaceOrder.btnSell.onClick = this.changeOperation.bind(this);
    this.view.flxDialogCancelOrder.setVisibility(false);
    this.view.imgActive.src = "inactive.png";
    this.view.tbxQuantity.setEnabled(true);
    this.view.tbxQuantity.skin = "sknTbxSSPffffff15PxBorder727272opa20";
    this.view.tbxQuantity.onTextChange = this.onQuantityChange;
    this.view.tbxQuantity.onTextChange = this.onQuantityChange;
    this.view.tbxQuantity.onTouchEnd = this.onQuantityChange;
    this.view.tbxQuantity.onDone = this.onQuantityChange;
    this.view.flxOrderWarning.setVisibility(false);
    this.restrictSpecialCharacters();
    FormControllerUtility.wrapAmountField(this.view.tbxLimitPrice).onKeyUp(this.checkValidityPaceOrderForm);
    FormControllerUtility.wrapAmountField(this.view.tbxStopLimitPriceRow2).onKeyUp(this.checkValidityPaceOrderForm);
    FormControllerUtility.wrapAmountField(this.view.tbxLimitPriceStopLimit).onKeyUp(this.checkValidityPaceOrderForm);
    FormControllerUtility.wrapAmountField(this.view.tbxStopLimitPrice).onKeyUp(this.checkValidityPaceOrderForm);
    this.view.lbxValidity.onSelection = this.checkValidityPaceOrderForm;
    this.view.tbxLimitPrice.onTextChange = this.onQuantityChange;
    this.view.tbxLimitPriceStopLimit.onTextChange = this.onQuantityChange;
    this.view.tbxStopLimitPrice.onTextChange = this.onQuantityChange;
    this.view.tbxStopLimitPriceRow2.onTextChange = this.onQuantityChange;
    this.portfolioDetailsData = applicationManager.getNavigationManager().getCustomInfo('frmPlaceOrder');
    //      this.portfolioDetails.RICCode = this.portfolioDetailsData.RICCode;
    this.instrIsin = this.portfolioDetailsData.ISIN;
    this.orderFlow = "";
    if (this.view.InstrumentDetailsPlaceOrder.imgStar.isVisible) {
        this.getFavouriteStatus();
        this.view.InstrumentDetailsPlaceOrder.imgStar.onTouchEnd = this.updateFavList.bind();
    }
    this.view.onTouchEnd = this.close;//IW-3757 - Bhuvanesh
    applicationManager.getPresentationUtility().dismissLoadingScreen();
},
      //IW-3757 - Bhuvanesh - Starts
      close: function () {
      var scope = this;
      if (scope.view.accountActionsMenu.isVisible) {
        scope.view.accountActionsMenu.setVisibility(false);
        this.flag = true;
      }
      else {
        this.flag = false;
      }
      var currFormObj = kony.application.getCurrentForm();
      if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
        setTimeout(function() {
          currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
          currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
          currFormObj.customheadernew.imgLblTransfers.text = "O";
        }, "17ms")
      }

    },
    //IW-3757 - Ends
    postShow: function() {
      this.setUiChanges();
      CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
    },
    onInfoOrderTypeClick: function(){
      this.hideAllPopups();
      this.view.imgOrderInfoIcon.src = "bluealert_2.png";
      this.view.flxInfoIconOrderType.setVisibility(true);
      this.view.InfoIconOrderType.flxCross.onClick = this.closeOrderTypePopup;
    },
    onInfoValidityClick: function(){
      this.hideAllPopups();
      this.view.imgInfoIcon.src = "bluealert_2.png";
      this.view.flxInfoIconValidity.setVisibility(true);
      this.view.InfoIconValidity.flxCross.onClick = this.closeValidityPopup;
    },
    onInfoLimitPriceClick: function(){
      this.hideAllPopups();
      this.view.imgLimitPriceInfoIcon.src = "bluealert_2.png";
      this.view.imgStopLimitOrderInfoIcon.src = "bluealert_2.png";
      this.view.flxInfoIconLimitPrice.setVisibility(true);
      this.view.InfoIconLimitPrice.flxCross.onClick = this.closePricePopup;
      if(this.view.lbxOrderType.selectedKey == "Stop Limit"){
        this.view.flxInfoIconLimitPrice.bottom = "280dp";
        this.view.flxInfoIconLimitPrice.left = "5%"; 
      }else{
        this.view.flxInfoIconLimitPrice.bottom = "348dp";
        this.view.flxInfoIconLimitPrice.left = "24%";
      } 
    },
    onInfoStopPriceClick: function(){
      this.hideAllPopups();
      this.view.imgStopLimitPriceInfoIconRow2.src = "bluealert_2.png";
      this.view.flxInfoIconStopPrice.setVisibility(true);
      this.view.InfoIconStopPrice.flxCross.onClick = this.closeStopPricePopup;
      
    },
    onInfoStopLimitPriceClick : function(){
      this.hideAllPopups();
      this.view.imgStopLimitPriceInfoIcon.src = "bluealert_2.png";
      this.view.flxInfoIconStopLimitPrice.setVisibility(true);
      this.view.InfoIconStopLimitPrice.flxCross.onClick = this.closeStopLimitPricePopup;
      
    },
    closePricePopup: function(){
      this.view.flxInfoIconLimitPrice.setVisibility(false);
      this.view.imgLimitPriceInfoIcon.src = "info_grey.png";
      this.view.imgStopLimitOrderInfoIcon.src = "info_grey.png";
    },
    closeStopPricePopup: function(){
      this.view.flxInfoIconStopPrice.setVisibility(false);
      this.view.imgStopLimitPriceInfoIconRow2.src = "info_grey.png";    
    },	
    closeStopLimitPricePopup : function(){
      this.view.flxInfoIconStopLimitPrice.setVisibility(false);
	  this.view.imgStopLimitPriceInfoIcon.src = "info_grey.png";
	},
    closeOrderTypePopup: function(){
      this.view.flxInfoIconOrderType.setVisibility(false);
      this.view.imgOrderInfoIcon.src = "info_grey.png";
    },
    closeValidityPopup: function(){
      this.view.flxInfoIconValidity.setVisibility(false);
      this.view.imgInfoIcon.src = "info_grey.png";
    },
    toggleAccountActionsMenu: function() {
      this.closeOrderTypePopup();
      this.closeValidityPopup();
      this.closePricePopup();
      //IW-3757 - Bhuvanesh - Starts
      if(this.flag){
        this.view.accountActionsMenu.setVisibility(true);
      }
      //IW-3757 - Ends
      if (this.view.accountActionsMenu.isVisible === false) {
        this.view.accountActionsMenu.setVisibility(true);
        this.view.flx3Dot.skin = "sknFlxOlb3DotRadiusf7f7f7";
      } else {
        this.view.accountActionsMenu.setVisibility(false);
        this.view.flx3Dot.skin = "slFbox";
      }
    },
    getProductDetails: function(){
      this.navFromForm = applicationManager.getNavigationManager().getPreviousForm();
      var navManager = applicationManager.getNavigationManager();
      var dataCustom = navManager.getCustomInfo('frmPlaceOrder');
      if (dataCustom.holdingsData && dataCustom.holdingsData.operation === "Modify") {
        this.modifyPlaceOrder = dataCustom.holdingsData;
        this.getInstrumentPricingData = {};
        this.getInstrumentDetailValues = {};
        this.getInstrumentCurrentPosition = {};
      } else {
        this.modifyPlaceOrder = "";
      }
      this.operation = dataCustom.operation;
      scope_WealthPresentationController.instrumentAction = this.operation;
      if(dataCustom.holdingsData !== undefined){
        scope_WealthPresentationController.tradeCurrency = dataCustom.holdingsData.secCCy;
        scope_WealthPresentationController.currentPosition = dataCustom.holdingsData.marketValPOS;
        scope_WealthPresentationController.quantity  = dataCustom.holdingsData.quantity;
        scope_WealthPresentationController.instrumentId = dataCustom.holdingsData.holdingsId  || dataCustom.holdingsData.instrumentId;
		scope_WealthPresentationController.holdingsType = dataCustom.holdingsData.ISIN;
      }
      if(this.navFromForm == "frmWatchlist")
       scope_WealthPresentationController.tradeCurrency = scope_WealthPresentationController.selectedInstrDetails.lblCurrency;
//       if(Object.keys(this.getInstrumentPricingData).length > 0 || Object.keys(this.getInstrumentDetailValues).length > 0 || Object.keys(this.getInstrumentCurrentPosition).length > 0){
//       }
//       else{
      var data = {
        "searchByInstrumentName": (dataCustom.searchByInstrumentName !== undefined)?dataCustom.searchByInstrumentName: dataCustom.description,
        "portfolioId": this.portfolioId,
        "sortBy": "",
        "navPage": "Holdings"
      };
      var navFrom = applicationManager.getNavigationManager().getPreviousForm();
      this.navFromForm = navFrom;
      data.instrumentId = scope_WealthPresentationController.instrumentId;
	  data.ISIN = scope_WealthPresentationController.holdingsType;
      var navData = this.navFromForm === "frmWatchlist" ? dataCustom : data;
      applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getHoldingsCurrentPosition(navData);
      //applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getHoldings(navData);
//       }
      },
    getCashBalance: function() {
      this.view.lblAmount.setVisibility(false);
      this.view.flxLoadingIndicatorFrom.setVisibility(true);
      var params = {
        "portfolioId":  this.portfolioId
      };
      var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"});
      wealthModule.getCashBalanceDetails(params);
    },
    setCashBalance: function(data) {
      if(scope_WealthPresentationController.cashBalance=="")
        {
          this.view.lblCashBalance.setVisibility(false);
          this.view.flxValue.setVisibility(false);
          this.view.flx3Dot.setVisibility(scope_WealthPresentationController.isJointAccount === true?false:true);
        }
      else{
        this.view.lblCashBalance.setVisibility(true);
        this.view.flxValue.setVisibility(true);
        this.view.flx3Dot.setVisibility(scope_WealthPresentationController.isJointAccount === true?false:true);
      }
      this.view.lblAmount.text = scope_WealthPresentationController.cashBalance;
      this.view.lblAmount.setVisibility(true);
      this.view.flxLoadingIndicatorFrom.setVisibility(false);
    },
    onBreakpointChange: function(form, width){
      responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {
       if((this.orderFlow === "Acknowledge") && (orderRequest !== "")){
           this.setAknowledgementData(orderRequest);
          }
      }.bind(this));
      this.setUiChanges();
	  this.view.customheadernew.onBreakpointChangeComponent(width); 
      this.view.customfooternew.onBreakpointChangeComponent(width); 
      if((this.orderFlow === "Acknowledge") && (orderRequest !== "")){
        this.setAknowledgementData(orderRequest);
      }
    },
    getPricingDetails: function(prices) {
      this.view.PricingDataPlaceOrder.lblCurrency.text = ((prices.referenceCurrency) ? (prices.referenceCurrency.toUpperCase()) : "");
      this.view.PricingDataPlaceOrder.lblCode.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.bidRate, prices.referenceCurrency.toUpperCase());
        // Commenting these lines as the conversion is happening in line no 752,757,758,759
        /*  if(prices.bidVolume === 0 || prices.askVolume === 0 || prices.volume === 0){
                 prices.bidVolume =  prices.bidVolume.toString();
                 prices.askVolume = prices.askVolume.toString();
                 prices.volume = prices.volume.toString();
               } */   
      this.view.PricingDataPlaceOrder.lblBidValue.text = ((prices.bidVolume) ? prices.bidVolume : "0").toString();
      this.view.PricingDataPlaceOrder.lblCur.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblCurT.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.askRate, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblValT.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.askRate, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblAskVal.text = ((prices.askVolume) ? prices.askVolume : "0").toString();
      this.view.PricingDataPlaceOrder.lblAskValT.text = ((prices.askVolume) ? prices.askVolume : "0").toString();
      this.view.PricingDataPlaceOrder.lblVolVal.text = ((prices.volume) ? prices.volume : "0").toString();
      this.view.PricingDataPlaceOrder.lblCurr.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblOpenVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.openRate, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblCurre.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblCloseVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.closeRate, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblCurVal.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblCurValT.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblHighVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.high52W, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblHighValT.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.high52W, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblLowCur.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblLowVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.low52W, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblLatCur.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblLatCurT.text = ((prices.referenceCurrency) ? prices.referenceCurrency.toUpperCase() : "");
      this.view.PricingDataPlaceOrder.lblLatestVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.latestRate, prices.referenceCurrency.toUpperCase());
      this.view.PricingDataPlaceOrder.lblLatestValT.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(prices.latestRate, prices.referenceCurrency.toUpperCase());
    },
	getInstrumentDetails: function(instrument) {
		
    this.instrumentId = instrument.instrumentId;
	scope_WealthPresentationController.instrumentId = this.instrumentId;
    
    this.ricCode = instrument.RICCode;

    this.view.InstrumentDetailsPlaceOrder.lblCorp.text = ((instrument.instrumentName) ? instrument.instrumentName : "");
    this.view.InstrumentDetailsPlaceOrder.lblCode.text = ((instrument.isinExchange) ? instrument.isinExchange : "");

    this.lblCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(instrument.instrumentCurrencyId.toUpperCase());
    
    scope_WealthPresentationController.referenceCurrency = instrument.instrumentCurrencyId;
    this.view.InstrumentDetailsPlaceOrder.lblAmount.text="";
    this.view.InstrumentDetailsPlaceOrder.lblCurrency.text = "";
    
    if (instrument.marketPrice !== "") {
		this.view.InstrumentDetailsPlaceOrder.lblAmount.text = applicationManager.getFormatUtilManager().formatAmount(instrument.marketPrice);
		this.view.InstrumentDetailsPlaceOrder.lblCurrency.text = this.lblCurrency;
    }
	
	this.view.InstrumentDetailsPlaceOrder.lblProfit.text = instrument.formatted_netperChange; 
	if (parseFloat(instrument.percentageChange) >= 0) {
		this.view.InstrumentDetailsPlaceOrder.lblProfit.skin = "sknIW2F8523";
	}else if (parseFloat(instrument.percentageChange) < 0) {
        this.view.InstrumentDetailsPlaceOrder.lblProfit.skin = "sknlblff000015px";
    } else {
        this.view.InstrumentDetailsPlaceOrder.lblProfit.skin = "sknlbl727272SSPReg15px";
    }	

    var instrumentDetailsDate = {
        "timeReceived": ((instrument.timeReceived !== undefined && instrument.timeReceived !== "") ? instrument.timeReceived : "00:00:00"),
        "dateReceived": ((instrument.dateReceived !== undefined && instrument.dateReceived !== "") ? instrument.dateReceived : "")
    };
    if (Object.keys(this.getInstrumentDetailValues).length > 0) {
        this.view.InstrumentDetailsPlaceOrder.lblTime.text = this.getInstrumentDetailValues.asOfdateTime;
    } else if (instrument.dateReceived && instrument.dateReceived !== "") {
        this.view.InstrumentDetailsPlaceOrder.lblTime.text = kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + this.setInstrumentDate(instrumentDetailsDate);
    } else {
		this.view.InstrumentDetailsPlaceOrder.lblTime.text = "";
	}

},
    setInstrumentDate: function(instrumentDate){
      let month = instrumentDate.dateReceived.substring(3,6);
      let day = instrumentDate.dateReceived.substring(0,2);
      let year = instrumentDate.dateReceived.substring(7,12);
      var dateFormat = "";
      let hour = instrumentDate.timeReceived.substring(0,2);
      let min = instrumentDate.timeReceived.substring(3,5);
      
      let firstPart = applicationManager.getFormatUtilManager().getTwelveHourTimeString(hour+': '+min);          
      let trdPart = month + ' ' + day;

      return firstPart + ' ' + "UTC" + ' ' + trdPart;
    },
    goToOrderConfirmation: function(){
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
        var isWealthUserMultiCustomer = accountsModule.presentationController.isWealthUserMultiCustomer;
      //remove the top error/overrides on click of "Place order/Modify Order"
         this.closepopup();
      
      // to remove the popups after orderconfirmation
      this.view.flxInfoIconOrderType.setVisibility(false);
      this.view.flxInfoIconValidity.setVisibility(false);
      this.view.flxInfoIconLimitPrice.setVisibility(false);
      
      
      // to remove hardcoded params
      this.setPlaceOrderFormData();
      var order;
      var params;
      var limitPrice;
      var price;
      var marketPrice;
      var userManager = applicationManager.getUserPreferencesManager();
          var custId = userManager.getBackendIdentifier();
			if (custId === "") {
				if(userManager.primaryCustomerId.id === "" || userManager.primaryCustomerId.id === undefined) {
					custId = userManager.accessibleCustomerIds[0].id;
				} else {
					custId = userManager.primaryCustomerId.id;
				}
			}
      if(this.modifyPlaceOrder.orderReference !== undefined){
        if(this.view.lbxOrderType.selectedKey == "Stop Limit"){
          order = "STOP.LIMIT";
          limitPrice = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxLimitPriceStopLimit.text);
          price = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxStopLimitPrice.text);
        }
        else if(this.view.lbxOrderType.selectedKey == "Stop Loss"){
          order = "STOP";
          limitPrice = "";
          price = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxStopLimitPriceRow2.text);
        }
        else if(this.view.lbxOrderType.selectedKey == "Limit"){
          order = "LIMIT";
          limitPrice = applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxLimitPrice.text);
          price = "";
        }
        else{
          order = "MARKET";
          limitPrice = "";
          price = "";
          marketPrice= this.instrumentDetails.marketPrice
        }
		 params = {
           "portfolioId": this.portfolioId,
           "quantity": this.view.tbxQuantity.text,  
           "orderType": order,
           "limitPrice": limitPrice,
           "price": price, 
           "marketPrice" : marketPrice,
           "orderId":this.modifyPlaceOrder.orderReference,
           "validate_only":true,
           "validity": this.view.lbxValidity.selectedKeyValue[0],
           "instrumentId": this.instrumentDetails.instrumentId,
           "coreCustomerId": isWealthUserMultiCustomer ? scope_WealthPresentationController.selectedCustomerID :"",
           "tradeCurrency": this.instrumentDetails.instrumentCurrencyId,
        };
        if (scope_WealthPresentationController.wealthBankDate) {
          params.bankDate = scope_WealthPresentationController.wealthBankDate
        }  
        this.modifyMarketOrder(params);
      }
      else{
      if(scope_WealthPresentationController.instrumentAction == "Sell"){
          order = scope_WealthPresentationController.instrumentAction.substr(0,3).toUpperCase();
      }
      else{
          order = scope_WealthPresentationController.instrumentAction.toUpperCase();
      }
      params = {    
        "portfolioId": this.portfolioId,
        "instrumentId": this.instrumentDetails.instrumentId,
        "coreCustomerId": isWealthUserMultiCustomer ? scope_WealthPresentationController.selectedCustomerID :"",
        "stockExchange": this.instrumentDetails.stockExchange,
		    "tradeCurrency": this.instrumentDetails.instrumentCurrencyId,
        "limitPrice": orderParams.limitPrice,
        "order": order,
        "orderType": orderParams.orderType.toUpperCase(),
        "quantity": orderParams.quantity,
        "validity": orderParams.validity,
        "price":orderParams.stopLimitPrice,
        "dealStatus":"TRANSMITTED",
        "validate_only": true,
        //added for TAP - sending empty on CreateOrder
        "funcResultCode": ""
      };
        
      if(orderParams.orderType == "Stop Loss"){
        params.price = orderParams.stopLimitPriceRow2;
      }
      if(orderParams.orderType == "Stop Limit"){
        params.limitPrice = orderParams.limitPriceStopLimit;
      }
      if (orderParams.orderType == "Market") {
		    params.marketPrice= this.instrumentDetails.marketPrice        
      }
      if (scope_WealthPresentationController.wealthBankDate) {
        params.bankDate = scope_WealthPresentationController.wealthBankDate
      }  
      this.createMarketOrder(params);
      }
      params.marketPrice = orderParams.marketPrice;
      orderRequest = params;
      this.orderFlow = "Confirm";
      buyOrSellClicked = false;
 },
    setUiChanges: function() {
      var currBreakpoint = kony.application.getCurrentBreakpoint();
      if (currBreakpoint === 1024 && this.view.flxOrderDetailsConfirmation.isVisible) {
        this.view.flxPlaceOrderContainer.height = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "984dp" : "950dp";
        this.view.flxRight.top = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "744dp" : "720dp";
      } else if (currBreakpoint === 1024) { 
        if (this.view.flxModifyOrder.isVisible) {
          this.view.flxPlaceOrderContainer.height = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "1110dp" : "1026dp";
          this.view.flxRight.top = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "870dp" : "794dp";
          this.view.flxInfoIconOrderType.bottom = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "630dp" : "546dp";
          this.view.flxInfoIconValidity.bottom = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "470dp" : "470dp";
        } else {
          this.view.flxPlaceOrderContainer.height = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "1070dp" : "986dp";
          this.view.flxRight.top = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "830dp" : "754dp";
          this.view.flxInfoIconOrderType.bottom = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "630dp" : "546dp";
          this.view.flxInfoIconValidity.bottom = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "470dp" : "470dp";
        }
      } else if (currBreakpoint !== -1) {               
        if (this.view.flxOrderDetailsConfirmation.isVisible) {
          this.view.flxPlaceOrderContainer.height = this.view.lbxOrderType.selectedKey === "Stop Limit" ? "740dp" : "700dp";
        } else {
          if (this.view.lbxOrderType.selectedKey === "Stop Limit") {
            this.view.flxPlaceOrderContainer.height = this.view.flxModifyOrder.isVisible ? "840dp" : "800dp";
            this.view.flxInfoIconOrderType.bottom = "358dp";
            this.view.flxInfoIconValidity.bottom = "196dp";
          } else {
            this.view.flxPlaceOrderContainer.height = this.view.flxModifyOrder.isVisible ? "800dp" : "760dp";
            this.view.flxInfoIconOrderType.bottom = "316dp";
            this.view.flxInfoIconValidity.bottom = "236dp";
          }
        }
      }
    },
     closepopup: function() {
        this.view.flxSuccessMessage.setVisibility(false);
      },
    openCancelOrderPopup: function(){
      this.view.CancelOrder.centerY = "50%";
      this.view.flxDialogCancelOrder.setVisibility(true);
      this.view.CancelOrder.btnNo.onClick = this.onCancelInPopup;
      this.view.CancelOrder.flxCross.onClick = this.onCancelInPopup;
    },
    onCancelInPopup: function(){
      this.view.flxDialogCancelOrder.setVisibility(false);
    },
    goToAcknowledgement: function(){
      this.closepopup();
      var params = orderRequest;
      params.validate_only = "";
      if(this.modifyPlaceOrder.orderReference !== undefined){
      this.modifyMarketOrder(params);
      }
      else{
      params.funcResultCode = this.funcResultCodeValue;
      this.createMarketOrder(params);
      }
      orderRequest = params;
      // orderRequest = params;
      this.setAknowledgementData(params);
      this.orderFlow = "Acknowledge";
      //      this.view.flxPlaceOrderContainer.setVisibility(false);
      //      this.view.lblPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.orderAcknowledgement");
      //      this.view.flxAcknowledgement.setVisibility(true);
    },
    setAknowledgementData: function(params) {
      var formUtilityMan = applicationManager.getFormatUtilManager();
      if(scope_WealthPresentationController.cashBalance == "")
            {
                this.view.acknowledgmentMyRequests.flxBalance.setVisibility(false);
            }
            else{
                this.view.acknowledgmentMyRequests.flxBalance.setVisibility(true);
            }
      this.view.acknowledgmentMyRequests.lblBalanceValue.text = scope_WealthPresentationController.cashBalance;
      if (this.orderResponse && this.orderResponse.status === "success") {
        this.view.flxPlaceOrderContainer.setVisibility(false);
        this.view.lblPlaceOrder.text = kony.i18n.getLocalizedString("i18n.wealth.orderAcknowledgement");
        this.view.flxAcknowledgement.setVisibility(true);
        this.view.AcknowledgementDetails.lblAccountValue.text = this.orderResponse.id;
        this.view.AcknowledgementDetails.lblChequeBooksValue.text = this.view.OrderDetailsConfirmation.lblOrderValue.text;
        this.view.AcknowledgementDetails.lblFeeValue.text = params.quantity;
        this.view.AcknowledgementDetails.lblDeliveryTypeValue.text = this.view.OrderDetailsConfirmation.lblOrderTypeValue.text;

        this.view.AcknowledgementDetails.lblNotesValue.text = this.view.lbxValidity.selectedKeyValue[1];
        this.view.AcknowledgementDetails.lblExtra1Value.text = this.view.OrderDetailsConfirmation.lblTotalOrderAmountValue.text;
        //this.view.AcknowledgementDetails.lblExtra2Value.text = formUtilityMan.formatAmountandAppendCurrencySymbol(this.orderResponse.fees, this.currentInstrumentData.currency || this.currentInstrumentData.secCCy);
        this.view.AcknowledgementDetails.lblExtra2Value.text = formUtilityMan.formatAmountandAppendCurrencySymbol(this.orderResponse.fees, this.view.lblLimitPriceCurrency.text);
        if(this.view.AcknowledgementDetails.lblDeliveryTypeValue.text === "Stop Limit"){
          //this.view.AcknowledgementDetails.lblAddressValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxStopLimitPrice.text, false, this.view.InstrumentDetailsPlaceOrder.lblCurrency.text);
          this.view.AcknowledgementDetails.lblAddressValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxStopLimitPrice.text, false, this.view.lblLimitPriceCurrency.text);
          //this.view.AcknowledgementDetails.lblExtra3Value.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxLimitPriceStopLimit.text, false, this.view.InstrumentDetailsPlaceOrder.lblCurrency.text);
          this.view.AcknowledgementDetails.lblExtra3Value.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxLimitPriceStopLimit.text, false, this.view.lblLimitPriceCurrency.text);
        } else if (this.view.AcknowledgementDetails.lblDeliveryTypeValue.text === "Stop Loss"){					
          //this.view.AcknowledgementDetails.lblAddressValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxStopLimitPriceRow2.text, false, this.view.InstrumentDetailsPlaceOrder.lblCurrency.text);
          this.view.AcknowledgementDetails.lblAddressValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxStopLimitPriceRow2.text, false, this.view.lblLimitPriceCurrency.text);
        } else if (this.view.AcknowledgementDetails.lblDeliveryTypeValue.text === "Limit"){
          //this.view.AcknowledgementDetails.lblAddressValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxLimitPrice.text, false, this.view.InstrumentDetailsPlaceOrder.lblCurrency.text);
          this.view.AcknowledgementDetails.lblAddressValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxLimitPrice.text, false, this.view.lblLimitPriceCurrency.text);
        } else {
          this.view.AcknowledgementDetails.lblAddressValue.text = formUtilityMan.formatAmountandAppendCurrencySymbol(params.marketPrice, this.lblCurrency);
        }
      }
    },
    /** sets the order type with i18 value
         */
    getOrderTypes: function() {
      var list = [];
      for (var key in this.orderType) {
        if (this.orderType.hasOwnProperty(key)) {
          //list.push([key, kony.i18n.getLocalizedString(this.orderType[key])]);
          list.push([key, this.orderType[key]]);
        }
      }
      return list;
    },
    /** sets the order type with i18 value
         */
    getOrderValidity: function() {
      var list = [];
      for (var key in this.orderValidity) {
        if (this.orderValidity.hasOwnProperty(key)) {
          //list.push([key, kony.i18n.getLocalizedString(this.orderValidity[key])]);
          list.push([key, this.orderValidity[key]]);
        }
      }
      return list;
    },
    getOrderAccountsList: function(accountList) {      
      var data=accountList;
      var currForm = kony.application.getCurrentForm();
      var segdata = [];
      for (var list in data){	
         if(data[list].investmentType === 'Advisory'){
           continue;
         }
        else{
        segdata.push([ data[list].portfolioId, CommonUtilities.truncateStringWithGivenLength(data[list].accountName + "....", 26) + CommonUtilities.getLastFourDigit(data[list].accountNumber)]);
        }
      }
       if(segdata.length !== 0) {
       this.portfolioId = (this.portfolioId === ""?segdata[0][0]:this.portfolioId);
       }
      return segdata;
    },
    onOrderAccountSelected: function(data) {
        this.portfolioId = data.selectedKey;
      if(scope_WealthPresentationController.jointAccountDetails){
            var list=scope_WealthPresentationController.jointAccountDetails.portfolioList;
            for(var l in list){
                 var index = l;
                 var d = list[index];  
                 if(d.portfolioId===this.portfolioId ){
                     this.isPortfolioJoint=d.isJointAccount;  
                 } 
            }
            if(this.isPortfolioJoint==="true"){
                 CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);   
            }else{
                  CommonUtilities.enableButton(this.view.btnProceedPlaceOrder);
            }
      }
      this.getProductDetails();
      this.getCashBalance();
    },
    onOrderTypeSelected: function(data) {
      var quantityText = this.view.tbxQuantity.text || "0";
      if (data.selectedKey === "Stop Limit") {
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.tbxLimitPriceStopLimit.text = "";
        this.view.tbxStopLimitPrice.text = "";
        this.selectedOrderType = "Stop Limit";
        this.view.flxRow3.setVisibility(true);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
        this.view.AcknowledgementDetails.flxExtra3.setVisibility(true);
        this.view.AcknowledgementDetails.lblExtra3.text = kony.i18n.getLocalizedString("i18n.wealth.limitPrice");
        this.view.AcknowledgementDetails.lblAddress.text = kony.i18n.getLocalizedString("i18n.wealth.stopPrice");
      } else if (data.selectedKey === "Stop Loss") {
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.tbxStopLimitPriceRow2.text = "";
        this.selectedOrderType = "Stop Loss";
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(true);
        this.view.AcknowledgementDetails.flxExtra3.setVisibility(false);
        this.view.AcknowledgementDetails.lblAddress.text = kony.i18n.getLocalizedString("i18n.wealth.stopPrice");;
      } else if (data.selectedKey === "Limit") {
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.tbxLimitPrice.text = "";
        this.selectedOrderType = "Limit";
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(true);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
        this.view.AcknowledgementDetails.flxExtra3.setVisibility(false);
        this.view.AcknowledgementDetails.lblAddress.text = kony.i18n.getLocalizedString("i18n.wealth.limitPrice");
      } else {
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.selectedOrderType = "Market";
        this.view.tbxLimitPriceStopLimit.text = "";
        this.view.tbxStopLimitPrice.text = "";
        this.view.tbxStopLimitPriceRow2.text = "";
        this.view.tbxLimitPrice.text = "";
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
        this.view.AcknowledgementDetails.flxExtra3.setVisibility(false);
        this.view.AcknowledgementDetails.lblAddress.text = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement.marketPrice");
      }
      this.checkValidityPaceOrderForm();
      this.setUiChanges();
      this.onQuantityChange();
      var navManager = applicationManager.getNavigationManager();
      var dataCustom = navManager.getCustomInfo('frmPlaceOrder');
      if (dataCustom.holdingsData && dataCustom.holdingsData.operation === "Modify" && scope_WealthPresentationController.isTAPIntegration === true) {
        this.disableQuantityFieldForTAP(scope_WealthPresentationController.isTAPIntegration);
      }
    },
        onModifySelected: function(data) {
          var quantityText = this.view.tbxQuantity.text || "0";
      if (data.orderType === "Stop Limit") {
        this.view.tbxQuantity.text = data.quantity;
        this.view.tbxLimitPriceStopLimit.text = data.limitPriceStopLimit;
        this.view.tbxStopLimitPrice.text = data.stopLimitPrice;
        this.view.lbxOrderType.selectedKey = "Stop Limit";		
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.flxRow3.setVisibility(true);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
      } else if (data.orderType === "Stop Loss") {
        this.view.tbxQuantity.text = data.quantity;
        this.view.tbxStopLimitPriceRow2.text = data.stopLimitPriceRow2;
        this.view.lbxOrderType.selectedKey = "Stop Loss";
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(true);
      } else if (data.orderType === "Limit") {
        this.view.tbxQuantity.text = data.quantity;
        this.view.tbxLimitPrice.text = data.limitPrice;
        this.view.lbxOrderType.selectedKey = "Limit";
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(true);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
      } else {
        this.view.tbxQuantity.text = data.quantity;
        this.view.lbxOrderType.selectedKey = "Market";
        this.setApproximatelyValue(quantityText);
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(quantityText);
        this.view.flxRow3.setVisibility(false);
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopLimitPriceRow2.setVisibility(false);
        CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
      }
      this.setUiChanges();
    },
    modifyOrderView: function() {
      this.view.flxAccountDetails.setVisibility(true);
      this.view.flxOrderDetails.setVisibility(true);
      this.view.flxPlaceOrderButtons.setVisibility(true);
      this.view.InstrumentDetailsPlaceOrder.flxButtons.setVisibility(true);
      this.view.lblOrderDetails.setVisibility(false);
      this.view.flxSeparatorLine1.setVisibility(false);
      this.view.flxOrderDetailsConfirmation.setVisibility(false);
      this.onOrderTypeSelected(this.view.lbxOrderType);
      this.onModifySelected(this.modifyPlaceOrder);
      this.view.flxSuccessMessage.setVisibility(false);//WIW-1921 Issue fixed
      this.orderFlow = "";
    },
    orderViewSummary:function() {
      var currForm = kony.application.getCurrentForm();
      this.modifyPlaceOrder = this.setPlaceOrderFormData();
      this.view.OrderDetailsConfirmation.lblOrderValue.text = this.operation;
      this.view.OrderDetailsConfirmation.lblQuantityValue.text = this.view.tbxQuantity.text;
      this.view.OrderDetailsConfirmation.lblOrderTypeValue.text = this.view.lbxOrderType.selectedKeyValue[0];
	  var orderType = this.view.lbxOrderType.selectedKeyValue[0];
	  let formatUtil= applicationManager.getFormatUtilManager();
      switch (this.view.lbxOrderType.selectedKeyValue[0]) {
        case "Market":
          this.view.OrderDetailsConfirmation.flxLimitPrice.setVisibility(false);
          this.view.OrderDetailsConfirmation.flxLimitPrice.height = 0;
          this.view.OrderDetailsConfirmation.flxStopPrice.setVisibility(false);
          this.view.OrderDetailsConfirmation.flxStopPrice.height = 0;
          break;
        case "Limit":
          this.view.OrderDetailsConfirmation.flxLimitPrice.setVisibility(true);
          this.view.OrderDetailsConfirmation.flxStopPrice.setVisibility(false);
          this.view.OrderDetailsConfirmation.flxStopPrice.height = 0;
		  this.view.OrderDetailsConfirmation.flxLimitPrice.height = "40dp";
          this.view.OrderDetailsConfirmation.lblLimitPriceValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxLimitPrice.text, false, this.view.lblLimitPriceCurrency.text);
          break;
        case "Stop Loss":
          this.view.OrderDetailsConfirmation.flxLimitPrice.setVisibility(false);
          this.view.OrderDetailsConfirmation.flxLimitPrice.height = 0;
          this.view.OrderDetailsConfirmation.flxStopPrice.setVisibility(true);
		  this.view.OrderDetailsConfirmation.flxStopPrice.height = "40dp";
          this.view.OrderDetailsConfirmation.lblStopPriceValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxStopLimitPriceRow2.text, false,  this.view.lblLimitPriceCurrency.text);
          break;
        case "Stop Limit":
          this.view.OrderDetailsConfirmation.flxLimitPrice.setVisibility(true);
          this.view.OrderDetailsConfirmation.flxStopPrice.setVisibility(true);
		  this.view.OrderDetailsConfirmation.flxStopPrice.height = "40dp";
		  this.view.OrderDetailsConfirmation.flxLimitPrice.height = "40dp";
          this.view.OrderDetailsConfirmation.lblLimitPriceValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxLimitPriceStopLimit.text, false, this.view.lblLimitPriceCurrency.text);
          this.view.OrderDetailsConfirmation.lblStopPriceValue.text = CommonUtilities.formatCurrencyWithCommas(this.view.tbxStopLimitPrice.text, false, this.view.lblLimitPriceCurrency.text);
          break;
        default:
      }
      this.view.OrderDetailsConfirmation.lblValidityValue.text = this.view.lbxValidity.selectedKeyValue[1];
      var totalAmount = Number(this.view.tbxQuantity.text) * Number(this.view.InstrumentDetailsPlaceOrder.lblAmount.text);
      this.view.OrderDetailsConfirmation.lblTotalOrderAmountValue.text = this.view.lblApproximatelyVal.text;
      this.view.OrderDetailsConfirmation.lblEstimatedFeesValue.text = CommonUtilities.formatCurrencyWithCommas(Number(this.orderResponse.fees), false, this.view.lblLimitPriceCurrency.text);
	  if(this.orderResponse.hasOwnProperty("feeDetails")){
            if (this.orderResponse.feeDetails.length !== 0) {
                if (this.orderResponse.feeDetails.advisoryFeesInTradeCurrency !== undefined) {
                    this.view.OrderDetailsConfirmation.lblAdvTrade.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblAdvTradeValue.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblAdvTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.orderResponse.feeDetails.advisoryFeesInTradeCurrency, this.orderResponse.feeDetails.tradeCurrency);
                } else {
                    this.view.OrderDetailsConfirmation.lblAdvTrade.isVisible = false;
                    this.view.OrderDetailsConfirmation.lblAdvTradeValue.isVisible = false;
                }
                if (this.orderResponse.feeDetails.advisoryFeesInChargeCurrency !== undefined) {
                    this.view.OrderDetailsConfirmation.lblAdvCharge.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblAdvChargeValue.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblAdvChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.orderResponse.feeDetails.advisoryFeesInChargeCurrency, this.orderResponse.feeDetails.chargeCurrency);
                } else {
                    this.view.OrderDetailsConfirmation.lblAdvCharge.isVisible = false;
                    this.view.OrderDetailsConfirmation.lblAdvChargeValue.isVisible = false;
                }
                if (this.orderResponse.feeDetails.safekeepChargeInTradeCurrency !== undefined) {
					this.view.OrderDetailsConfirmation.flxLimitPrice.setVisibility(true);
					if(orderType=="Market"){
						this.view.OrderDetailsConfirmation.lblLimitPrice.setVisibility(false);
						this.view.OrderDetailsConfirmation.lblLimitPriceValue.setVisibility(false);
					}else if(orderType=="Limit"){
						this.view.OrderDetailsConfirmation.lblLimitPrice.setVisibility(true);
						this.view.OrderDetailsConfirmation.lblLimitPriceValue.setVisibility(true);
					}else if(orderType=="Stop Loss"){
						this.view.OrderDetailsConfirmation.lblLimitPrice.setVisibility(false);
						this.view.OrderDetailsConfirmation.lblLimitPriceValue.setVisibility(false);
					}else if(orderType=="Stop Limit"){
						this.view.OrderDetailsConfirmation.lblLimitPrice.setVisibility(true);
						this.view.OrderDetailsConfirmation.lblLimitPriceValue.setVisibility(true);
					}					
                    this.view.OrderDetailsConfirmation.lblSafeTrade.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblSafeTradeValue.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblSafeTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.orderResponse.feeDetails.safekeepChargeInTradeCurrency, this.orderResponse.feeDetails.tradeCurrency);
                } else {
                    this.view.OrderDetailsConfirmation.lblSafeTrade.isVisible = false;
                    this.view.OrderDetailsConfirmation.lblSafeTradeValue.isVisible = false;
                }
                if (this.orderResponse.feeDetails.safekeepChargeInChargeCurrency !== undefined) {
					this.view.OrderDetailsConfirmation.flxStopPrice.setVisibility(true);
					if(orderType=="Market"){
						this.view.OrderDetailsConfirmation.lblStopPrice.setVisibility(false);
						this.view.OrderDetailsConfirmation.lblStopPriceValue.setVisibility(false);
					}else if(orderType=="Limit"){
						this.view.OrderDetailsConfirmation.lblStopPrice.setVisibility(false);
						this.view.OrderDetailsConfirmation.lblStopPriceValue.setVisibility(false);
					}else if(orderType=="Stop Loss"){
						this.view.OrderDetailsConfirmation.lblStopPrice.setVisibility(true);
						this.view.OrderDetailsConfirmation.lblStopPriceValue.setVisibility(true);
					}else if(orderType=="Stop Limit"){
						this.view.OrderDetailsConfirmation.lblStopPrice.setVisibility(true);
						this.view.OrderDetailsConfirmation.lblStopPriceValue.setVisibility(true);
					}	
                    this.view.OrderDetailsConfirmation.lblSafeCharge.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblSafeChargeValue.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblSafeChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.orderResponse.feeDetails.safekeepChargeInChargeCurrency, this.orderResponse.feeDetails.chargeCurrency);
                } else {
                    this.view.OrderDetailsConfirmation.lblSafeCharge.isVisible = false;
                    this.view.OrderDetailsConfirmation.lblSafeChargeValue.isVisible = false;
                }
                if (this.orderResponse.feeDetails.InducementFeesInTradeCurrency !== undefined) {
                    this.view.OrderDetailsConfirmation.lblIndTrade.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblIndTradeValue.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblIndTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.orderResponse.feeDetails.InducementFeesInTradeCurrency, this.orderResponse.feeDetails.tradeCurrency);
                } else {
                    this.view.OrderDetailsConfirmation.lblIndTrade.isVisible = false;
                    this.view.OrderDetailsConfirmation.lblIndTradeValue.isVisible = false;
                }
                if (this.orderResponse.feeDetails.InducementFeesInChargeCurrency !== undefined) {
                    this.view.OrderDetailsConfirmation.lblIndCharge.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblIndChargeValue.isVisible = true;
                    this.view.OrderDetailsConfirmation.lblIndChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(this.orderResponse.feeDetails.InducementFeesInChargeCurrency, this.orderResponse.feeDetails.chargeCurrency);
                } else {
                    this.view.OrderDetailsConfirmation.lblIndCharge.isVisible = false;
                    this.view.OrderDetailsConfirmation.lblIndChargeValue.isVisible = false;
                }
	  }}
	  else{
		  this.view.OrderDetailsConfirmation.lblFeesDetails.setVisibility(false);
		  this.view.OrderDetailsConfirmation.lblAdvTrade.setVisibility(false);
	      this.view.OrderDetailsConfirmation.lblAdvCharge.setVisibility(false);
          this.view.OrderDetailsConfirmation.lblSafeTrade.setVisibility(false);
          this.view.OrderDetailsConfirmation.lblSafeCharge.setVisibility(false);
          this.view.OrderDetailsConfirmation.lblIndTrade.setVisibility(false);
          this.view.OrderDetailsConfirmation.lblIndCharge.setVisibility(false);
	  }
      currForm.forceLayout();
    },
    restrictSpecialCharacters: function() {
      var scopeObj = this;
      var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
      scopeObj.view.tbxQuantity.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
      scopeObj.view.tbxLimitPrice.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
      scopeObj.view.tbxStopLimitPriceRow2.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
      scopeObj.view.tbxLimitPriceStopLimit.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
      scopeObj.view.tbxStopLimitPrice.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
    },
    checkValidityPaceOrderForm: function() {
      var formData = this.setPlaceOrderFormData();
       if(scope_WealthPresentationController.isJointAccount === true || this.isPortfolioJoint === "true"){
         CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
      }
      else{
      if (Number(formData.quantity) !== 0 && this.view.flxOrderWarning.isVisible !== true) {
        if (this.selectedOrderType === "Market") {
          if (formData.quantity && formData.orderType && formData.validity) {
            CommonUtilities.enableButton(this.view.btnProceedPlaceOrder);
            return;
          }
          CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
        } else if (this.selectedOrderType === "Limit") {
          if (formData.quantity && formData.orderType && formData.limitPrice && formData.validity) {
            CommonUtilities.enableButton(this.view.btnProceedPlaceOrder);
            return;
          }
          CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
        } else if (this.selectedOrderType === "Stop Loss") {
          if (formData.quantity && formData.orderType && formData.stopLimitPriceRow2 && formData.validity) {
            CommonUtilities.enableButton(this.view.btnProceedPlaceOrder);
            return;
          }
          CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
        } else {
          if (Number(formData.quantity)>0 && formData.orderType && formData.stopLimitPrice && formData.limitPriceStopLimit && formData.validity) {
            CommonUtilities.enableButton(this.view.btnProceedPlaceOrder);
            return;
          }
          CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
        }
      } else {
        CommonUtilities.disableButton(this.view.btnProceedPlaceOrder); 
      }
      }
      var navManager = applicationManager.getNavigationManager();
      var dataCustom = navManager.getCustomInfo('frmPlaceOrder');
      if (dataCustom.holdingsData && dataCustom.holdingsData.operation === "Modify" && scope_WealthPresentationController.isTAPIntegration === true) {
        this.disableQuantityFieldForTAP(scope_WealthPresentationController.isTAPIntegration);
      }
    },
    setPlaceOrderFormData: function() {
      var viewModel = {};
      var formUtilityMan = applicationManager.getFormatUtilManager();
      (this.view.tbxQuantity.text !== "") ? (viewModel.quantity = this.removeCurrencyWithCommas(this.view.tbxQuantity.text)) : (viewModel.quantity = "");
      (this.view.tbxLimitPrice.text !== "") ? (viewModel.limitPrice = this.removeCurrencyWithCommas(this.view.tbxLimitPrice.text)) : (viewModel.limitPrice = "");
      (this.view.tbxStopLimitPriceRow2.text !== "") ? (viewModel.stopLimitPriceRow2 = this.removeCurrencyWithCommas(this.view.tbxStopLimitPriceRow2.text)) : (viewModel.stopLimitPriceRow2 = "");
      (this.view.tbxLimitPriceStopLimit.text !== "") ? (viewModel.limitPriceStopLimit = this.removeCurrencyWithCommas(this.view.tbxLimitPriceStopLimit.text)) : (viewModel.limitPriceStopLimit = "");
      (this.view.tbxStopLimitPrice && this.view.tbxStopLimitPrice.text !== "") ? (viewModel.stopLimitPrice = this.removeCurrencyWithCommas(this.view.tbxStopLimitPrice.text)) : (viewModel.stopLimitPrice = "");
      (this.view.lbxOrderType.selectedKey !== "") ? (viewModel.orderType = this.view.lbxOrderType.selectedKey) : (viewModel.orderType = "");
      (this.view.lbxValidity.selectedKey !== "") ? (viewModel.validity = this.view.lbxValidity.selectedKeyValue[0]) : (viewModel.validity = "");
      (this.view.lblApproximatelyVal.text !== "") ? (viewModel.netAmount = this.removeCurrencyWithCommas(this.view.lblApproximatelyVal.text)) : (viewModel.netAmount = "");
      (this.view.lbxOrderType.selectedKey !== "") ? viewModel.marketPrice = formUtilityMan.deFormatAmount(this.view.InstrumentDetailsPlaceOrder.lblAmount.text) : (viewModel.marketPrice = "");
      viewModel.orderReference = this.modifyPlaceOrder.orderReference;
      viewModel.orderMode = this.modifyPlaceOrder.orderMode;
      viewModel.orderModeType = viewModel.orderType;
      viewModel.tradeDate = this.modifyPlaceOrder.tradeDate;
      orderParams = viewModel; 
      return viewModel;
    },
    /**Removes commans from currency
         * @param  {number} amount amount entered
         * @returns {number} amount
         */
    removeCurrencyWithCommas: function(amount) {
      if (amount === undefined || amount === null) {
        return;
      }
      return applicationManager.getFormatUtilManager().deFormatAmount(amount);
    },
    hideAllPopups: function() {
      this.closeOrderTypePopup();
      this.closeValidityPopup();
      this.closePricePopup();
      this.view.accountActionsMenu.setVisibility(false);
      this.view.flx3Dot.skin = "slFbox";
    },
    trialfunc: function(variable){

      var configManager = applicationManager.getConfigurationManager();
      if (configManager.getBaseCurrency() === 'EUR')
      {
        if(variable.indexOf(",") >= 0){

          var left = (variable.substr(0, variable.indexOf(","))) ;
          var right = (variable.substr(variable.indexOf(","), 4));
          const va = /^(,{2})\d+$/;
          const va1 = /^(,{2})$/;
          const va2 = /^(,{3})$/;

          if( va1.test(right) || va2.test(right) || va.test(right))
          {
            return "";
          }
          else{
            return (left+right);
          }
        }
        else{
          return variable;
        }
        //th
        //this.view.tbxQuantity.text = (t.indexOf(",") >= 0) ? (t.substr(0, t.indexOf(",")) + t.substr(t.indexOf(","), 3)) : t;
      } else

      {
        if(variable.indexOf(".") >= 0){

          var left1 = (variable.substr(0, variable.indexOf("."))) ;
          var right1 = (variable.substr(variable.indexOf("."), 3));
          const va = /^(\.{2})\d+$/;
          const va1 = /^(\.{2})$/;
          const va2 = /^(\.{3})$/;

          if( va1.test(right1) || va2.test(right1) || va.test(right1)){
            return "";
          }else{
            return (left1+right1);
          }
        }
        else{
          return variable;
        }
        //this.view.tbxQuantity.text = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
      }

    },
    onQuantityChange: function() {
      var t = this.view.tbxQuantity.text;
      this.view.tbxLimitPrice.text = this.trialfunc(this.view.tbxLimitPrice.text);
      this.view.tbxStopLimitPriceRow2.text = this.trialfunc(this.view.tbxStopLimitPriceRow2.text);
      this.view.tbxLimitPriceStopLimit.text = this.trialfunc(this.view.tbxLimitPriceStopLimit.text);
      this.view.tbxStopLimitPrice.text = this.trialfunc(this.view.tbxStopLimitPrice.text);

      var configManager = applicationManager.getConfigurationManager();
      if (configManager.getBaseCurrency() === 'EUR')
      {
        if(t.indexOf(",") >= 0){

          var left = (t.substr(0, t.indexOf(","))) ;
          var right = (t.substr(t.indexOf(","), 3));
          const va = /^(,{2})\d+$/;
          const va1 = /^(,{2})$/;
          const va2 = /^(,{3})$/;

          if( va1.test(right) || va2.test(right) || va.test(right))
          {
            this.view.tbxQuantity.text = "";
          }
          else{
            this.view.tbxQuantity.text = (left+right);
          }}
        else{
          this.view.tbxQuantity.text = t;
        }
        //th
        //this.view.tbxQuantity.text = (t.indexOf(",") >= 0) ? (t.substr(0, t.indexOf(",")) + t.substr(t.indexOf(","), 3)) : t;
      } else

      {
        if(t.indexOf(".") >= 0){

          var left1 = (t.substr(0, t.indexOf("."))) ;
          var right1 = (t.substr(t.indexOf("."), 3));
          const va = /^(\.{2})\d+$/;
          const va1 = /^(\.{2})$/;
          const va2 = /^(\.{3})$/;

          if( va1.test(right1) || va2.test(right1) || va.test(right1)){
            this.view.tbxQuantity.text = "";
          }else{
            this.view.tbxQuantity.text = (left1+right1);
          }}
        else{
          this.view.tbxQuantity.text = t;
        }
        //this.view.tbxQuantity.text = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
      }
      var formatQuantity = this.view.tbxQuantity.text;
      this.view.tbxQuantity.skin = "sknTbxSSPffffff15PxBorder727272opa20";
//       this.view.tbxQuantity.hoverSkin = "sknTbxBorder0036751px";
//       this.view.tbxQuantity.focusSkin = "sknTbxBorder0036751px";
      this.view.tbxQuantity.text = formatQuantity.replace(/^0+/, '');  
      this.view.lblApproximatelyVal.text = this.setApproximatelyValue(this.view.tbxQuantity.text);
      this.setApproximatelyValue(this.view.tbxQuantity.text);
      var portfolioCurrentPosition = this.currentInstrumentData;
      if (this.currentInstrumentData.holdingsData !== undefined && this.currentInstrumentData.holdingsData !== "") {
        if(this.operation === "Sell" && this.view.lblPlaceOrder.text == kony.i18n.getLocalizedString("i18n.wealth.modifyOrder"))
          this.instrumentDetailsQuantity = this.view.lblCurrentPositionAmount.text.split("(")[1].replace(")", "");
        else
          this.instrumentDetailsQuantity = this.currentInstrumentData.holdingsData.quantity;
      }
      else
        this.instrumentDetailsQuantity = scope_WealthPresentationController.quantity;
      scope_WealthPresentationController.quantity  = this.instrumentDetailsQuantity || "0";
      portfolioCurrentPosition = portfolioCurrentPosition.marketPrice ? this.currentInstrumentData : scope_WealthPresentationController.selectedInstrDetails;
      var approximatelyValue = Number(this.view.tbxQuantity.text) * this.orderTypePrice;
      var forUtility = applicationManager.getFormatUtilManager();
      var totalValCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(scope_WealthPresentationController.portfolioTotalValueCurr);
      var cashBalance = Number(forUtility.deFormatAmount(scope_WealthPresentationController.portfolioTotalValue, [totalValCurrency]));
      if (this.operation === "Sell" && (Number(this.view.tbxQuantity.text) > Number(this.instrumentDetailsQuantity) || Number(this.instrumentDetailsQuantity) < 0)) {
        this.view.tbxQuantity.skin = "skntbxSSPFF000015pxnoborder";
       // this.view.tbxQuantity.hoverSkin = "skntbxSSPFF000015pxnoborder";
       // this.view.tbxQuantity.focusSkin = "skntbxSSPFF000015pxnoborder";
        this.view.flxOrderWarning.setVisibility(true);
        this.view.lblOrderWarning.text = kony.i18n.getLocalizedString("i18n.wealth.orderWarning");
      } 
//       else if (this.operation === "Buy" && approximatelyValue > (cashBalance)) {
//         this.view.tbxQuantity.skin = "skntbxSSPFF000015pxnoborder";
//         this.view.tbxQuantity.hoverSkin = "skntbxSSPFF000015pxnoborder";
//         this.view.tbxQuantity.focusSkin = "skntbxSSPFF000015pxnoborder";
//         this.view.flxOrderWarning.setVisibility(true);
//         this.view.lblOrderWarning.text = "Balance is insufficient to buy these quantities";
//       }
      else {
        var quantitySkin = this.view.imgActive.src === "active.png" ? "skndisabled" : "sknTbxSSPffffff15PxBorder727272opa20";
        this.view.tbxQuantity.skin = quantitySkin;
        this.view.tbxQuantity.hoverSkin = "sknTbxBorder0036751px";
        this.view.tbxQuantity.focusSkin = "sknTbxBorder0036751px";
        this.view.flxOrderWarning.setVisibility(false);
      }
       if(scope_WealthPresentationController.isJointAccount === true || this.isPortfolioJoint === "true"){
         CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
      }
      else{
          CommonUtilities.enableButton(this.view.btnProceedPlaceOrder);
          }
      this.view.forceLayout();
     this.checkValidityPaceOrderForm();
    },    
    setApproximatelyValue: function(quantity) {
      var portfolioCurrentPosition = this.currentInstrumentData;
      portfolioCurrentPosition = portfolioCurrentPosition.marketPrice ? this.currentInstrumentData : scope_WealthPresentationController.selectedInstrDetails;
      var formUtilityMan = applicationManager.getFormatUtilManager();
      var currentPositionAmount;
      if (this.view.lbxOrderType.selectedKey === "Limit") {
        this.orderTypePrice = Number(formUtilityMan.deFormatAmount(this.view.tbxLimitPrice.text));
        this.view.lblApproximatelyEnd.text = "at limit price";
      } else if (this.view.lbxOrderType.selectedKey === "Stop Limit") {
        this.orderTypePrice = Number(formUtilityMan.deFormatAmount(this.view.tbxLimitPriceStopLimit.text));
        this.view.lblApproximatelyEnd.text = "at stop limit price";
      } else if (this.view.lbxOrderType.selectedKey === "Stop Loss") {
        this.orderTypePrice = Number(formUtilityMan.deFormatAmount(this.view.tbxStopLimitPriceRow2.text));
        this.view.lblApproximatelyEnd.text = "at stop loss price";
      } else {
        this.orderTypePrice = this.instrumentDetails.marketPrice;
        this.view.lblApproximatelyEnd.text = "at market price";
      }
      if (quantity === "" || quantity === "0") {
        currentPositionAmount = 0 * this.orderTypePrice;
        this.view.tbxQuantity.text = quantity;
      } else if (quantity === "1") {
        currentPositionAmount = 1 * this.orderTypePrice;
        this.view.tbxQuantity.text = quantity;
      } else {
        currentPositionAmount = (Number(quantity) || Number(portfolioCurrentPosition.quantity)) * this.orderTypePrice;
      }
      var forUtility = applicationManager.getFormatUtilManager();
      /*var currentCurrency;
      var data1=applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');
      if(data1!==undefined){
        var instrumentMinimal = data1.productDetails!==undefined?(data1.productDetails.instrumentMinimal!==undefined?data1.productDetails.instrumentMinimal[0]:""):"";
        var instruDetails = data1.productDetails!==undefined?(data1.productDetails.instrumentDetails!==undefined?data1.productDetails.instrumentDetails:""):"";
      }
	  
      if (this.currentInstrumentData.holdingsData !== undefined && this.currentInstrumentData.holdingsData !== "") {
        var currencyCode = this.currentInstrumentData.holdingsData.instrumentCurrency || this.currentInstrumentData.holdingsData.secCCy;
        currentCurrency = forUtility.getCurrencySymbol(currencyCode);
      } else if (this.navFromForm == "frmWatchlist") {
			currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.tradeCurrency);
	  } else { 
			if(this.currentInstrumentData.secCCy != undefined){
				currentCurrency = forUtility.getCurrencySymbol(this.currentInstrumentData.secCCy);}
			//else
				//currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.priceCurrency);
        	else if(instrumentMinimal.hasOwnProperty("referenceCurrency")){
				currentCurrency = forUtility.getCurrencySymbol(instrumentMinimal.referenceCurrency);}
			else if(instruDetails.hasOwnProperty("referenceCurrency")){
				currentCurrency = forUtility.getCurrencySymbol(instruDetails.referenceCurrency.toUpperCase());}
            else{
                currentCurrency = forUtility.getCurrencySymbol(scope_WealthPresentationController.referenceCurrency);
            }
	 }*/
      return forUtility.formatAmountandAppendCurrencySymbol(String(currentPositionAmount || 0), this.lblCurrency);  
    },
    setCurrentPosition: function() {
            let currentPositionQuantity = this.getInstrumentCurrentPosition.quantity || "0";
            let currentPositionCurrency = this.getInstrumentCurrentPosition.secCCy || applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getPortfolioCurrency();
            let tempPrice = this.getInstrumentCurrentPosition.marketValPOS || "0.00";
            var forUtility = applicationManager.getFormatUtilManager();
            let currentPositionPrice = forUtility.deFormatAmount(tempPrice);  
      	    scope_WealthPresentationController.currentPosition = currentPositionPrice;
			scope_WealthPresentationController.quantity  = currentPositionQuantity;
			scope_WealthPresentationController.tradeCurrency = this.lblCurrency;
      if(scope_WealthPresentationController.currentPosition == "0" || scope_WealthPresentationController.currentPosition == "0.00")
       return forUtility.formatAmount(String(currentPositionPrice)) + " (" + currentPositionQuantity + ")";
      else
       return forUtility.formatAmountandAppendCurrencySymbol(String(currentPositionPrice), this.lblCurrency) + " (" + currentPositionQuantity + ")";
     },
    onClickSelectAll: function() {
      if (this.view.imgActive.src === "inactive.png") {
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue(this.instrumentDetailsQuantity);
        this.view.tbxQuantity.text = scope_WealthPresentationController.quantity ;
        this.onQuantityChange(scope_WealthPresentationController.quantity );
        this.view.imgActive.src = "active.png";
        this.view.tbxQuantity.skin = "skndisabled";
        this.view.tbxQuantity.setEnabled(false);
      } else {
        this.view.imgActive.src = "inactive.png";
        this.view.tbxQuantity.skin = "sknTbxSSPffffff15PxBorder727272opa20";
        this.view.lblApproximatelyVal.text = this.setApproximatelyValue("0");
        this.view.tbxQuantity.setEnabled(true);
        CommonUtilities.disableButton(this.view.btnProceedPlaceOrder);
      }
    },
    cancelTheOrder: function(){
      // to remove hardcoded Portofolio ID
      var portId = this.portfolioId;  
      var params = {
        "portfolioId": portId,
        "orderId": this.orderResponse.id
      };
      this.cancelOrder(params);
      this.clearOrderDetails();
      this.goBack();
    },
    clearOrderDetails: function(){
      this.orderResponse = "";
      this.orderRequest = "";
      /* if(uiData.CreateOrderResponse) {
          delete uiData.CreateOrderResponse;
      }
      if(uiData.CancelOrderResponse) {
          delete uiData.CancelOrderResponse;
      }*/
    },
    viewOrders: function() {
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentCurrentPosition({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentPricingData({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentDetails({});
      scope_WealthPresentationController.viewOrdersTab = true;
      this.goToPortfolioDetails(this.portfolioId);
    },
    goToPortfolioDetails: function(portfolioId) {
      var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"});
      wealthModule.setPortfolioId(portfolioId);
      scope_WealthPresentationController.isFirst = true;
      if (applicationManager.getConfigurationManager().checkUserFeature("WEALTH_PORTFOLIO_DETAILS")) {
       // applicationManager.getNavigationManager().navigateTo("frmPortfolioOverview");
      new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioOverview"}).navigate();
      }
    },
    reloadProductDetails: function() {
      scope_WealthPresentationController.reload = "Reload";
		let  paramsProdDetails = {
        "ISINCode": this.instrumentDetails.ISINCode,
        "RICCode": this.instrumentDetails.RICCode,
        "instrumentId": this.instrumentDetails.instrumentId,
		"application": this.instrumentDetails.application,
      };
        applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.getModulesPresentationController("WealthOrderUIModule").getProductDetailsById(paramsProdDetails);
 
    },
    goBack: function() {
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentCurrentPosition({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentPricingData({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentDetails({});
           scope_WealthPresentationController.instrumentAction = "";
           scope_WealthPresentationController.reload = "";
           this.modifyPlaceOrder = "";
      this.orderFlow ="";
            var previousForm = kony.application.getPreviousForm().id;
            var navMan = applicationManager.getNavigationManager();
            if (previousForm === "frmPortfolioOverview") {
              //  navMan.navigateTo("frmPortfolioOverview");
              new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioOverview"}).navigate();
            } 
            else if (previousForm === "frmWatchlist") {
              new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmWatchlist"}).navigate();
                //navMan.navigateTo("frmWatchlist");
            } else {
              new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmProductDetails"}).navigate();
               //navMan.navigateTo("frmProductDetails");
           }
    },
    createMarketOrder: function(params) {
      var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthModule.createMarketOrder(params);
    },
    modifyMarketOrder: function(params) {
      var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthModule.modifyMarketOrder(params);
    },
    cancelOrder: function(params){
      var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthModule.cancelOrder(params);
    },
    checkPermissions: function(){
      var configManager =  applicationManager.getConfigurationManager();
      var checkUserPermission = function (permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      };
      let instrumCreatePermission = configManager.addToWatchlistPermissions().some(checkUserPermission);
      let orderEditPermission = configManager.mgmtOrderEditPermissions().some(checkUserPermission);
      let orderCancelPermission = configManager.mgmtOrderCancelPermissions().some(checkUserPermission);
      let orderVerifyPermission = configManager.mgmtOrderVerifyPermissions().some(checkUserPermission);
      let orderViewAckPermission = configManager.mgmtOrderViewAckPermissions().some(checkUserPermission);
      let orderSellPermission = configManager.sellOrderPermissions().some(checkUserPermission);
      let orderBuyPermission = configManager.buyOrderPermissions().some(checkUserPermission);
      let orderLinkPermission = configManager.mgmtOrderViewOrderLinkPermissions().some(checkUserPermission);
      this.view.InstrumentDetailsPlaceOrder.btnSell.setVisibility(orderSellPermission);
      this.view.InstrumentDetailsPlaceOrder.btnBuy.setVisibility(orderBuyPermission);
      if (orderSellPermission && orderBuyPermission) {
        if(this.orderFlow !== "Confirm"){
          this.view.InstrumentDetailsPlaceOrder.flxButtons.isVisible = true;
        }
        else {
          if(!buyOrSellClicked)
          this.view.InstrumentDetailsPlaceOrder.flxButtons.isVisible = false;
        }
      } else {
        this.view.InstrumentDetailsPlaceOrder.flxButtons.isVisible = false;
      }

      this.view.InstrumentDetailsPlaceOrder.imgStar.setVisibility(instrumCreatePermission);
      this.view.OrderDetailsConfirmation.Buttons.btnModify.setVisibility(orderEditPermission);
      this.view.OrderDetailsConfirmation.Buttons.btnCancel.setVisibility(orderCancelPermission);
      this.view.btnCancelPlaceOrder.setVisibility(orderCancelPermission); 
      this.view.btnProceedPlaceOrder.setVisibility(orderVerifyPermission); 
      this.view.OrderDetailsConfirmation.Buttons.btnConfirm.setVisibility(orderViewAckPermission); 
      this.view.InstrumentDetailsPlaceOrder.btnSell.setVisibility(orderSellPermission);
      this.view.InstrumentDetailsPlaceOrder.btnBuy.setVisibility(orderBuyPermission);
      this.view.btnViewOrder.setVisibility(orderLinkPermission);


      //       this.view.InstrumentDetailsPlaceOrder.imgStar.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_WATCHLIST_INSTRUMENT_CREATE"));
      //       this.view.OrderDetailsConfirmation.Buttons.btnModify.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_EDIT"));
      //       this.view.OrderDetailsConfirmation.Buttons.btnCancel.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_CANCEL"));
      //       this.view.btnCancelPlaceOrder.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_CANCEL")); 
      //       this.view.btnProceedPlaceOrder.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_VERIFICATION_VIEW")); 
      //       this.view.OrderDetailsConfirmation.Buttons.btnConfirm.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_ACKNOWLEDGEMENT_VIEW")); 
      //       this.view.InstrumentDetailsPlaceOrder.btnSell.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_SELL_ORDER_CREATE"));
      //       this.view.InstrumentDetailsPlaceOrder.btnBuy.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_BUY_ORDER_CREATE"));
      //       this.view.btnViewOrder.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_LINK_VIEW"));
    },
    setStarValue: function(favoriteList){      
      if(favoriteList && favoriteList.find(element=>element.RIC===this.portfolioDetails.RICCode)){        
        this.view.InstrumentDetailsPlaceOrder.imgStar.src = "activestar.png";  
      }   
    },
    updateFavList: function(oper){
      var params = {};
      var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"});

      if(oper === 'get'){

        params = {
          "sortBy": "volume",
          "pageOffset": 0,
          "pageSize": 3
        };
        wealthModule.getFavoriteInstruments(params);

      }else{

        if(this.view.InstrumentDetailsPlaceOrder.imgStar.src==="activestar.png"){
          this.view.InstrumentDetailsPlaceOrder.imgStar.src = "unfilled_star.png";
          oper = 'Remove';
        }else{
          this.view.InstrumentDetailsPlaceOrder.imgStar.src="activestar.png";
          oper = 'Add';
        }
        params = {
          "RICCode": this.ricCode || this.portfolioDetails.RICCode,
          "instrumentId": this.instrumentId,
          "operation": oper
        };
		params.application = scope_WealthPresentationController.application;
        wealthModule.updateFavouriteInstruments(params);
      }

    },
    
    getFavouriteStatus: function() {
      var params = {};
      var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthModule.getUserFavouriteInstruments(params);
    },

    setFavourite: function(obj) {
      this.favIds = obj.favInstrumentIds !== undefined ? obj.favInstrumentIds : "";
      this.favRics = obj.favInstrumentCodes!== undefined ? obj.favInstrumentCodes : "";
      if (this.instrumentId !== "") {
        this.setFavouriteStatus();
      }
    },
    
    setFavouriteStatus() {
	var navManager = applicationManager.getNavigationManager();      
	var response = navManager.getCustomInfo('updateUserFavouriteInstruments');
	if(response!=undefined){
		this.favIds = response.favInstrumentIds !== undefined ? response.favInstrumentIds : "";
        this.favRics = response.favInstrumentCodes!== undefined ? response.favInstrumentCodes : "";
	}
	
      if (this.instrumentId !== "" && this.instrumentId !== undefined && this.favIds.search(this.instrumentId) > -1) {
        this.view.InstrumentDetailsPlaceOrder.imgStar.src="activestar.png";
      } else if (this.ricCode !== "" && this.ricCode !== undefined && this.favRics.search(this.ricCode) > -1) {
        this.view.InstrumentDetailsPlaceOrder.imgStar.src="activestar.png";
      } else {
        this.view.InstrumentDetailsPlaceOrder.imgStar.src = "unfilled_star.png";
      }
    }
    
  };
});