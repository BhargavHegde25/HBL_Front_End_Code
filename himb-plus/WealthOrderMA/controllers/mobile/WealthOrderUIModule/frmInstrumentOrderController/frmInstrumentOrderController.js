define({
    ricCode: "",
  isinCode:"",
  quantityValue:"0",
  instrumentName:"",
  priceValue:'0.00',
    marketPrice: "",
    quantity: "",
    keypadString: '0',
    estimatedValue: "",
    isPeriodUsed: false,
    timerCounter: 0,
    error: '0',
    activeInput: null,
    instrumentMinimal : {},
  productDetails : {},
    ORDER_MODE: {
        BUY: 'Buy',
        SELL: 'Sell'
    },
    ORDER_TYPE: {
        MARKET: 'Market',
        LIMIT: 'Limit',
        STOPLOSS: 'Stop Loss',
        STOPLIMIT: 'Stop Limit'
    },
    VALIDITY: {
        DAYORDER: 'Day Order',
        GOODTILL: 'Good Till Canceled'
    },
    orderMode: null,
    orderType: null,
    validity: null,
    sellAllFlag: false,
    currentCurrency:"",
  holdingsquantity:"",
    holdingData: {
        ISINCode: 'USAMAZON2345',
        instrumentPrice: 2399.44,
        currentBalance: 10000,
        currentQuantity: 24,
        currency: 'USD'
    },
    init: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    }catch(err) {
        this.setError(err, "init");
      }
      },
    preShow: function() {
      try{
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            // this.view.flxHeader.isVisible = false;
            this.view.flxHeader.setVisibility(false);
            this.view.flxMainContainer.top = "0dp";
        }
        //     this.view.lblNote.text=kony.i18n.getLocalizedString("kony.tab.common.Note")+" "+kony.i18n.getLocalizedString("i18n.wealth.approximateAmountNote");
        //     var wealthMod = applicationManager.getModulesPresentationController("WealthModule");
        this.setQuantityError(null);
        this.view.lblError.setVisibility(false);
      this.view.lblQuantityError.setVisibility(false);
      scope_WealthOrderPresentationController.overrideMessage= "";
      scope_WealthOrderPresentationController.fees = "";
      this.view.flxCancelPopup.setVisibility(false);
      
         }catch(err) {
        this.setError(err, "preShow");
      }
    },
  postShow: function() {
    try{
    let currentTheme = kony.theme.getCurrentTheme();
    if(currentTheme === "default"){
        this.view.keypad.imgClear.src = "cancelkeypad.png";
    }else{
        this.view.keypad.imgClear.src = "keypadcancel.png";
    }
	this.toggleKeypad(0, this.view.flxQuantityWrapper);
    this.setQuantityError(null);
    var nav = applicationManager.getNavigationManager();
    var orderData = nav.getCustomInfo("frmInstrumentOrder");
    var instrumentDetailData = nav.getCustomInfo("frmInstrumentDetails");
    this.productDetails = instrumentDetailData.instrumentDetails.productDetails;   
    if(this.productDetails){
      this.currentCurrency = this.productDetails.instrumentCurrencyId;
    }

    /* const data = {
           orderMode : orderData.orderMode || this.ORDER_MODE.BUY,
           orderType : orderData.orderType || this.ORDER_TYPE.MARKET,
           validity : orderData.validity || this.VALIDITY.DAYORDER
         }*/
    if(scope_WealthPresentationController.isFrmOrder === true){
      var orderMode = orderData.orderMode;
      var orderType = orderData.orderModeType;
      this.orderType = orderType;
      var validity = orderData.validity;
      this.validity = validity;
      if(validity === kony.i18n.getLocalizedString("i18n.wealth.dayOrder") || validity ==="GTD" ){
        this.view.lblValidityValue.text=kony.i18n.getLocalizedString("i18n.wealth.dayOrder");
      }else{
        this.view.lblValidityValue.text=kony.i18n.getLocalizedString("i18n.wealth.goodTillCanceled");
      }
      this.setOrderMode(orderMode);
      this.setOrderType(orderType);
      this.keypadString= orderData.quantity;
      this.view.lblAmount.text = orderData.quantity;
      this.view.lblLimitPriceField.text = orderData.limitPrice;
      this.view.lblStopPriceField.text = orderData.stopPrice;
      this.view.lblSellQuantity.text = orderData.quantity;
      this.view.imgToggle.src = 'checkbox_normal.png';
      this.sellAllFlag = false;
     // if(orderMode === 'Sell'){  
      //  this.sellAllFlag = true;
        //this.view.lblSellQuantity.text = '(' + (scope_WealthPresentationController.quantity || orderData.quantity || data.response.totalValue) + ')';
       // this.view.imgToggle.src = this.sellAllFlag ? 'checkboxtick.png' : 'checkboxempty.png';
    //  }
    //  else{
    //    this.sellAllFlag = false;
      //  this.view.imgToggle.src = this.sellAllFlag ? 'checkboxtick.png' : 'checkboxempty.png';
   //   }
      
      this.updateQuantityValue();

      //this.setHoldingsInfo();
      //this.validateQuantity();
     // scope_WealthPresentationController.isFrmOrder = false;
    }
    else{
      var Data = nav.getCustomInfo("frmPlaceOrder");
      if (Data !== undefined){
        var mode = Data.buy ? this.ORDER_MODE.BUY : this.ORDER_MODE.SELL;
      }
      else{
        var mode =  orderData.orderMode;
      }
      var orderMode = orderData.order || mode;
      var orderType = orderData.orderType || kony.i18n.getLocalizedString("i18n.wealth." + this.ORDER_TYPE.LIMIT.toLowerCase());
      this.orderType = orderType;
      //this.sellAllFlag = false;
      //this.view.imgToggle.src = this.sellAllFlag ? 'checkboxtick.png' : 'checkboxempty.png';
      var validity = orderData.validity || this.VALIDITY.DAYORDER;
      this.validity = validity;
      if(validity === kony.i18n.getLocalizedString("i18n.wealth.dayOrder") || validity ==="GTD" ){
        this.view.lblValidityValue.text=kony.i18n.getLocalizedString("i18n.wealth.dayOrder");
      }else{
        this.view.lblValidityValue.text=kony.i18n.getLocalizedString("i18n.wealth.goodTillCanceled");
      }
      this.setOrderMode(orderMode);
      this.sellAllFlag = false;
      if(kony.application.getPreviousForm().id === "frmOrderType"){
        if(this.view.imgToggle.src === 'checkbox_ticked.png'){
          this.sellAllFlag = true;
          this.view.imgToggle.src = 'checkbox_ticked.png';
        }
        else{
          this.sellAllFlag = false;
          this.view.imgToggle.src = 'checkbox_normal.png';
        }
      }
      if (scope_WealthOrderPresentationController.instrumentOrder === true || scope_WealthOrderPresentationController.placeOrder === true) {
        var navManager = applicationManager.getNavigationManager();
        var qty= navManager.getCustomInfo("frmOrderType");
        if(scope_WealthOrderPresentationController.placeOrder){
          this.view.lblAmount.text = '0';
          qty = '0';
          this.view.lblQuantityError.setVisibility(false);
        }else{
          this.view.lblAmount.text = qty ? qty : '0';
        }

        this.view.lblLimitPriceField.text = '0.00';
        this.view.lblStopPriceField.text = '0.00';
        this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
        this.view.btnContinue.setEnabled(false);
        var formatUtil = applicationManager.getFormatUtilManager();
        if(this.orderType === kony.i18n.getLocalizedString("i18n.wealth.market")){
          var estValue = parseFloat(this.keypadString) * this.marketPrice;
          this.view.lblEstimatedValue.text = formatUtil.formatAmountandAppendCurrencySymbol(estValue, this.currentCurrency);
          this.estimatedValue = estValue;
        }else{
          this.view.lblEstimatedValue.text = formatUtil.formatAmountandAppendCurrencySymbol('0', this.currentCurrency);
        }

        this.keypadString = '0';
        this.quantityValue= qty ? qty : '0';
        this.priceValue='0.00';
        this.view.imgToggle.src = this.sellAllFlag ? 'checkbox_ticked.png' : 'checkbox_normal.png';
        if(validity === "Day Order" || validity ==="GTD" ){
          this.view.lblValidityValue.text=kony.i18n.getLocalizedString("i18n.wealth.dayOrder");
        }else{
          this.view.lblValidityValue.text=kony.i18n.getLocalizedString("i18n.wealth.goodTillCanceled");
        }
        //this.view.lblValidityValue.text = validity;
        this.setOrderType(orderType);
        /*if(scope_WealthOrderPresentationController.placeOrder === true){
          this.setHoldingsInfo();
        }*/
      }
    }
    if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()))
            {
              if(this.orderType === "Stop Limit"){
              this.view.flxQuantityWrapper.left = "9dp";
              this.view.flxLimitPriceWrapper.left = "0dp";
              this.view.flxStopPriceWrapper.left = "9dp";
            }else if(this.orderType === "Market"){
              this.view.flxQuantityWrapper.left = "0dp";
            }else if(this.orderType === "Limit"){
              this.view.flxQuantityWrapper.left = "9dp";
              this.view.flxLimitPriceWrapper.left = "0dp";
              this.view.flxStopPriceWrapper.left = "9dp";
            }else if(this.orderType === "Stop Loss"){
              this.view.flxQuantityWrapper.left = "9dp";
              this.view.flxStopPriceWrapper.left = "0dp";
            }
            }
    //this.toggleKeypad(0, this.view.flxQuantityWrapper);
    this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
    this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
    this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.checkAndEnableConfirm();
    this.initActions();
        var dataForButton = nav.getCustomInfo('frmOrdersModifyButton');
        if(dataForButton){
          this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
          this.view.btnContinue.setEnabled(false);
        }
    //var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    var params = {
                "portfolioId":scope_WealthPresentationController.portfolioId?scope_WealthPresentationController.portfolioId: scope_WealthPresentationController.watchlistPortfolioId,
                "navPage": "Holdings",
                "sortBy": "description",
                "searchByInstrumentName": " ",
                "isIncluOrders":"false"
            }
     var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
        wealthModule.getHoldings(params);
       }catch(err) {
        this.setError(err, "postShow");
      }
  },
  setModifyButton:function(){
    var nav = applicationManager.getNavigationManager();
        var dataForButton = nav.getCustomInfo('frmOrdersModifyButton');
        if(dataForButton){
          this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
          this.view.btnContinue.setEnabled(false);
          nav.setCustomInfo('frmOrdersModifyButton', false);
        }else{
          this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
          this.view.btnContinue.setEnabled(true);         
        }
  },
    bindGenericError: function(errorRes){
      try{
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var scope = this;
    var errorObject = {};
    var formattedText;
    if (errorRes.messageDetails) {
      formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
      errorObject.formattedSuccessText = formattedText;
      var referenceId = errorRes.id;
      errorObject.referenceId = referenceId;     
      errorObject.messageDetails = errorRes.messageDetails;
      errorObject.isSuccess = true;
      this.view.CancelTransactionPopup.setContext(errorObject);
      this.view.flxCancelPopup.setVisibility(true);
      this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction)
        scope.view.flxCancelPopup.setVisibility(false);
        if(errorRes.currentForm === "frmInstrumentOrder")
          navManager.navigateTo("frmPlaceOrderVerifyDetails");
        else
          navManager.navigateTo("frmInstrumentOrderAck");
    };
      
    }
      else if(errorRes.errorDetails || errorRes.serverErrorRes){
      if(errorRes.errorDetails)
        errorObject.messageDetails = errorRes.errorDetails;
      else if(errorRes.serverErrorRes){
        if(errorRes.serverErrorRes.errorDetails)
        errorObject.messageDetails = errorRes.serverErrorRes.errorDetails;
      }
    formattedText = "Order Failed. " + kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
    errorObject.formattedFailedText = formattedText;
    errorObject.isSuccess = false;
    this.view.CancelTransactionPopup.setContext(errorObject);
    this.view.flxCancelPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction){
        scope.view.flxCancelPopup.setVisibility(false);
      }
    };
    }
      else{
        if(errorRes.currentForm === "frmInstrumentOrder")
          navManager.navigateTo("frmPlaceOrderVerifyDetails");
         else
           navManager.navigateTo("frmInstrumentOrderAck");
       }
//       if(errorRes.serverErrorRes.errormessage){
// 		this.view.lblError.text = errorRes.serverErrorRes.errormessage;
//           }
//       else if(errorRes.serverErrorRes.errormsg){
//         this.view.lblError.text = errorRes.serverErrorRes.errormsg;
//       }
//       else if(errorRes.errorMessage){
//         this.view.lblError.text = errorRes.errorMessage;
//       }
//      else if(errorRes.errormessage){
//         this.view.lblError.text = errorRes.errormessage;
//      }
//        else{
//           this.view.lblError.text = "Unknown Error";
//           }
//       this.view.lblError.setVisibility(true);
         }catch(err) {
        this.setError(err, "bindGenericError");
      }
    },
    initActions: function() {
      try{
      this.view.flxToggle.setEnabled(true);
      this.view.flxQuantityWrapper.setEnabled(true);
    //  if(scope_WealthPresentationController.isTapIntegration === "true"){
        if(scope_WealthPresentationController.isTapIntegration === "true" && (kony.application.getPreviousForm().id ==="frmOrders" || kony.application.getPreviousForm().id ==="frmOrderType" || kony.application.getPreviousForm().id ==="frmValidity")){
        this.view.flxToggle.setEnabled(false);
        this.view.flxQuantityWrapper.setEnabled(false);
//      Iw- 3270 Sneha
        this.view.flxSellAllToggle.isVisible = false;
        this.view.flxSeparator2.isVisible = false;
//         Iw-3270 ends
      }
        this.view.btnContinue.onClick = this.continueOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
        this.view.customHeader.flxBack.onClick = this.backOnClick;
        this.view.flxQuantityWrapper.onClick = this.toggleKeypad.bind(this, 1, this.view.flxQuantityWrapper);
        this.view.flxLimitPriceWrapper.onClick = this.toggleKeypad.bind(this, 1, this.view.flxLimitPriceWrapper);
        this.view.flxStopPriceWrapper.onClick = this.toggleKeypad.bind(this, 1, this.view.flxStopPriceWrapper);
        this.view.flxDone.onClick = this.toggleKeypad.bind(this, 0, null);
        this.view.flxToggle.onClick = this.toggleSellAll;
        this.view.imgRefresh.onTouchEnd = this.onRefresh;
        var nav = applicationManager.getNavigationManager();
        var instrumentorderdata = nav.getCustomInfo('frmInstrumentOrder');

        this.view.flxToImg.onClick = function() {
          if(instrumentorderdata.orderModeType !== undefined || instrumentorderdata.orderModeType !== null){
                instrumentorderdata.orderType = instrumentorderdata.orderModeType;
            }
            else{
            var orderType = instrumentorderdata.orderType;
            if (kony.sdk.isNullOrUndefined(orderType)) {
                instrumentorderdata.orderType = this.orderType;
            }
            }
            nav.navigateTo("frmOrderType");
        }

        this.view.flxFromAmountImage.onClick = function() {
            var validity = instrumentorderdata.validity;
            if (kony.sdk.isNullOrUndefined(validity)) {
                instrumentorderdata.validity = this.validity;
            }
            nav.navigateTo("frmValidity");
        }

        this.view.imgClear.onTouchEnd = this.clearData;
        this.view.imgClear1.onTouchEnd = this.clearData;
        this.view.imgClear2.onTouchEnd = this.clearData;
        //var data = nav.getCustomInfo('frmInstrumentDetails');
      /*if(data.instrumentDetails){
        if(data.instrumentDetails.productDetails){
          this.view.lblSellQuantity.text = '(' + (data.instrumentDetails.productDetails.quantity==""?"0":data.instrumentDetails.productDetails.quantity) + ')';
        }
      }*/
     /* if(data.response !== undefined){
      if((data.response.quantity || data.response.totalValue) !== undefined){
        this.view.lblSellQuantity.text =  (data.response.quantity || data.response.totalValue)==""? "(0)":'('+ (data.response.quantity || data.response.totalValue) + ')';
      }else{
        this.view.lblSellQuantity.text = "(0)";
      }
    }
        else{
            this.view.lblSellQuantity.text = '(' + (scope_WealthPresentationController.quantity || instrumentorderdata.quantity || instrumentorderdata.totalValue) + ')';
        }*/
       // this.view.lblSellQuantity.text = '(' + (data.response.quantity || data.response.totalValue) + ')';
    }catch(err) {
        this.setError(err, "initActions");
      }
      },
  setSellQuantity:function(selldata){
    try{
      this.view.lblSellQuantity.text = "(0)";
      for(var i =0;i<selldata.response.portfolioHoldings.length;i++){
      /* 
       First it filetrs the instruments based on holdings contextual row click  then it checks for the depository whether it matches with the 
       clicked holdings instrument and sets the quantity
      */
        if((this.productDetails.instrumentId === selldata.response.portfolioHoldings[i].instrumentId || (this.productDetails.instrumentName === selldata.response.portfolioHoldings[i].description && this.productDetails.ISINCode === selldata.response.portfolioHoldings[i].ISIN))){
         this.view.lblSellQuantity.text =  '(' + (selldata.response.portfolioHoldings[i].quantity) + ')' ;
          if (((scope_WealthPresentationController.depositoryId === "" && !(selldata.response.portfolioHoldings[i].hasOwnProperty("depositoryId"))) || (selldata.response.portfolioHoldings[i].hasOwnProperty("depositoryId") && selldata.response.portfolioHoldings[i].depositoryId === scope_WealthPresentationController.depositoryId))){
          var nav = applicationManager.getNavigationManager();
          var data = nav.getCustomInfo('frmInstrumentDetails');
          var instrumentorderdata = nav.getCustomInfo('frmInstrumentOrder');
          if(selldata.response !== undefined){
            this.holdingsquantity = selldata.response.portfolioHoldings[i].quantity
            if((selldata.response.portfolioHoldings[i].quantity || data.response.totalValue) !== undefined){
              this.view.lblSellQuantity.text =  (selldata.response.portfolioHoldings[i].quantity || data.response.totalValue)===""? "(0)":'('+ (selldata.response.portfolioHoldings[i].quantity || data.response.totalValue) + ')';
              i = selldata.response.portfolioHoldings.length+10;
            }else{
              this.view.lblSellQuantity.text = "(0)";
            }// if
          }// if
        }// if 
        }//if
      }// for
      if(scope_WealthPresentationController.isFrmOrder === true){
        //this.updateQuantityValue();
        this.setHoldingsInfo();
        this.validateQuantity();
        scope_WealthPresentationController.isFrmOrder = false;
      }else{
        if(scope_WealthOrderPresentationController.placeOrder === true){
          this.setHoldingsInfo();
        }
      scope_WealthOrderPresentationController.instrumentOrder = false;
      scope_WealthOrderPresentationController.placeOrder = false;
    }
    if(kony.application.getPreviousForm().id === "frmOrders"){ // WIW-1774 defect fix
   this.setModifyButton();
    }
     
       }catch(err) {
        this.setError(err, "setSellQuantity");
      }
  },
    onRefresh: function() {
      try{
        var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      var param = {
        "ISINCode": this.isinCode,
        "RICCode":this.ricCode,
        "instrumentId" : this.productDetails.instrumentId,
        "application" : this.productDetails.application
        }
        wealthMod.getPlaceOrderDetails(param);
         }catch(err) {
        this.setError(err, "onRefresh");
      }
    },
    setDetails: function(response) { 
      try{
      var data = response.productDetails;
        var formatUtil = applicationManager.getFormatUtilManager();
        this.view.lblInstrumentName.text = data.instrumentName;
      
       var instrumentDetailsDate = {
          "timeReceived": ((data.timeReceived) ? data.timeReceived : "00:00:00"),
          "dateReceived": ((data.dateReceived) ? data.dateReceived : "")
        };
      

      
      this.view.lblCurrentValue.text="";
      if (data.marketPrice !== "") {
        this.marketPrice = data.marketPrice;
        this.view.lblCurrentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(data.marketPrice, data.instrumentCurrencyId);
        }
      this.view.lblPriceMovement.text = data.formatted_netperChange;
      if (parseFloat(data.percentageChange) > 0) {
        this.view.lblPriceMovement.skin = "sknIlbl2F8523SSPR13px";
      }else if (parseFloat(data.percentageChange) < 0) {
        this.view.lblPriceMovement.skin = "sknIblEE0005SSPsb45px";
      } else {
        this.view.lblPriceMovement.skin = "sknlbl727272SSP17px";
      }

        this.view.lblInstrumentValueTime.text = "As on "+ this.setDate(instrumentDetailsDate);
      
        var inputField = this.view.flxQuantityWrapper;
        let children = inputField.widgets();
        this.activeInput = children[1];
        this.keypadString = this.activeInput.text;
        this.validateQuantity();
         }catch(err) {
        this.setError(err, "setDetails");
      }
    },
    setHoldingsInfo: function() {
      try{
      var formatUtil = applicationManager.getFormatUtilManager();
      var navManager = applicationManager.getNavigationManager();
      var data1 = navManager.getCustomInfo('frmInstrumentDetails');
      var orderData = navManager.getCustomInfo('frmInstrumentOrder');
      var currentposition = data1.response;
      var data={};
      //var data = data1.instrumentDetails && data1.instrumentDetails.instrumentDetails ? data1.instrumentDetails.instrumentDetails : this.holdingData;
      if(data1.instrumentDetails.productDetails){
        data= data1.instrumentDetails.productDetails;
        this.productDetails = data;
        var instrumentDetailsDate = {};
        instrumentDetailsDate = {
          "timeReceived": ((data.timeReceived) ? data.timeReceived : "00:00:00"),
          "dateReceived": ((data.dateReceived) ? data.dateReceived : "")
        };
      }
                  
      if(scope_WealthPresentationController.isFrmOrder === true){
        this.ricCode = (data.RICCode === undefined) ? "" : data.RICCode;
        this.isinCode=data.ISIN;
        //this.quantity = data.quantity;
        this.quantity = this.holdingsquantity ? this.holdingsquantity :data.quantity;
        this.view.lblInstrumentName.text = data.instrumentName;
        this.instrumentName=data.instrumentName;

      }
      else{
        this.ricCode = (currentposition.RICCode === undefined) ? (data.RICCode ? data.RICCode : "" ) : currentposition.RICCode;
        this.isinCode=currentposition.ISIN;
        this.quantity = currentposition.quantity;
        this.view.lblInstrumentName.text = currentposition.description;
        this.instrumentName=currentposition.description;

    }

    if(data.marketPrice===undefined || data.marketPrice===""){
      if((data1.instrumentDetails) && 
         (data1.instrumentDetails.instrumentMinimal) && 
         (data1.instrumentDetails.instrumentMinimal[0] &&
          data1.instrumentDetails.instrumentMinimal[0].marketPrice)){
        data.marketPrice = data1.instrumentDetails.instrumentMinimal[0].marketPrice;

      }
    }

    this.marketPrice = data.marketPrice;
    this.view.lblCurrentValue.text = formatUtil.formatAmountandAppendCurrencySymbol(data.marketPrice, data.instrumentCurrencyId);

    if (data !== this.holdingData) {
      this.holdingData = data;
    }

      this.view.lblPriceMovement.isVisible=true;
      this.view.lblPriceMovement.text = data.formatted_netperChange;
      if (parseFloat(data.percentageChange) > 0) {
        this.view.lblPriceMovement.skin = "sknIlbl2F8523SSPR13px";
      }else if (parseFloat(data.percentageChange) < 0) {
        this.view.lblPriceMovement.skin = "sknIblEE0005SSPsb45px";
      } else if(parseFloat(data.percentageChange) === 0){
        this.view.lblPriceMovement.skin = "sknlbl727272SSP17px";
      }else{
        this.view.lblPriceMovement.isVisible=false;
      }

      
      if(scope_WealthOrderPresentationController.orderDetails != ""){
        this.view.lblInstrumentName.text = scope_WealthOrderPresentationController.orderDetails.instrumentName;
        this.view.lblCurrentValue.text = scope_WealthOrderPresentationController.orderDetails.amount;
        this.view.lblPriceMovement.text = scope_WealthOrderPresentationController.orderDetails.PL;
      }
      if (data.quantity === 0) {
        // Disable Sell All Toggle
        this.view.flxToggle.onClick = null;
        this.view.imgToggle.src = 'disable.png';
      }
      if(data.dateReceived && data.dateReceived !== ""){
        this.view.lblInstrumentValueTime.setVisibility(true);
        this.view.lblInstrumentValueTime.text = "As on "+ this.setDate(instrumentDetailsDate);
      }else{
        this.view.lblInstrumentValueTime.setVisibility(false);
      }
        }catch(err) {
        this.setError(err, "setHoldingsInfo");
      }
       
    },
    // Set up UI for either BUY or SELL
    setOrderMode: function(mode) {
      try{
        const MODE = this.ORDER_MODE;
        //  switch(mode) {
        //   case MODE.BUY : 
        if (mode === MODE.BUY) {
            this.view.title = kony.i18n.getLocalizedString("i18n.wealth.buy");
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.buy");
            this.view.flxSellAllToggle.setVisibility(false);
            this.view.flxSeparator2.setVisibility(false);
            this.orderMode = this.ORDER_MODE.BUY;
        } else {
            //  break;
            //  case MODE.SELL : 
            this.view.title = kony.i18n.getLocalizedString("i18n.wealth.sell");
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.sell");
            this.view.flxSellAllToggle.setVisibility(true);
            this.view.flxSeparator2.setVisibility(true);
            this.orderMode = this.ORDER_MODE.SELL;
            //   break;
        }
         }catch(err) {
        this.setError(err, "setOrderMode");
      }
    },
    // Set up UI for the particular Order Type
    setOrderType: function(type) {
      try{
        const TYPE = this.ORDER_TYPE;
        //this.resetUI();
        //switch(type) {
        //  case TYPE.MARKET:
        if (type === kony.i18n.getLocalizedString("i18n.wealth.market")) {
            this.view.lblOrderTypeValue.text = kony.i18n.getLocalizedString("i18n.wealth.market");
            this.orderType = TYPE.MARKET;
            this.view.flxQuantityField.width = '100%';
            this.view.flxQuantityWrapper.width="100%";
          if(!scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()))
            this.view.flxQuantityWrapper.left = "0dp";
            this.view.flxFieldsRow1.layoutType = kony.flex.FLOW_HORIZONTAL;
            this.view.flxLimitPrice.setVisibility(false);
            this.view.flxStopPrice.setVisibility(false);
            //break;
        } else if (type === kony.i18n.getLocalizedString("i18n.wealth.limit")) {
            // case TYPE.LIMIT:
            this.view.lblOrderTypeValue.text = kony.i18n.getLocalizedString("i18n.wealth.limit");
            this.orderType = TYPE.LIMIT;
            this.view.flxQuantityField.width = '50%';
            this.view.flxFieldsRow1.layoutType = kony.flex.RESPONSIVE_GRID;
            this.view.flxQuantityField.responsiveConfig.span.portrait = 6;
            this.view.flxStopPrice.setVisibility(false);
            this.view.flxLimitPrice.setVisibility(true);
            this.view.flxQuantityWrapper.width="95%";
          if(!scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()))
            this.view.flxQuantityWrapper.left = "0dp";
            // break;
        } else if (type === kony.i18n.getLocalizedString("i18n.wealth.stopLoss")) {
            //case TYPE.STOPLOSS:
            this.view.lblOrderTypeValue.text = kony.i18n.getLocalizedString("i18n.wealth.stopLoss");
            this.view.lblStopPrice.text = kony.i18n.getLocalizedString("i18n.wealth.orders.stopPrice");
            this.orderType = TYPE.STOPLOSS;
            this.view.flxQuantityField.width = '50%';
            this.view.flxStopPriceWrapper.width = '98%';
            this.view.flxFieldsRow1.layoutType = kony.flex.RESPONSIVE_GRID;
            this.view.flxQuantityField.responsiveConfig.span.portrait = 6;
            this.view.flxLimitPrice.setVisibility(false);
            this.view.flxStopPrice.setVisibility(true);
            this.view.flxQuantityWrapper.width="95%";
          if(!scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()))
            this.view.flxQuantityWrapper.left = "0dp";
            // break;
        } else {
            //case TYPE.STOPLIMIT:
            this.view.lblOrderTypeValue.text = kony.i18n.getLocalizedString("i18n.wealth.stopLimit");
            this.view.lblStopPrice.text =  kony.i18n.getLocalizedString("i18n.wealth.orders.stopPrice");
            this.orderType = TYPE.STOPLIMIT;
            this.view.flxQuantityField.width = '50%';
            this.view.flxStopPriceWrapper.width = '95%';
            this.view.flxQuantityWrapper.width="95%";
            this.view.flxFieldsRow1.layoutType = kony.flex.RESPONSIVE_GRID;
            this.view.flxQuantityField.responsiveConfig.span.portrait = 6;
            this.view.flxLimitPrice.setVisibility(true);
            this.view.flxStopPrice.setVisibility(true);
          if(!scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale()))
            this.view.flxQuantityWrapper.left = "0dp";
            //  break;  
        }
        // }
         }catch(err) {
        this.setError(err, "setOrderType");
      }
    },
    resetUI: function() {
      try{
        console.log(this.view.flxQuantityField.responsiveConfig.span.portrait);
        this.view.flxFieldsRow1.layoutType = kony.flex.RESPONSIVE_GRID;
        //     this.view.flxQuantityField.responsiveConfig = {
        //       "span" : {
        //         "portrait": 12,
        //         "landscape": 12
        //       }
        //     };
        this.view.flxLimitPrice.setVisibility(false);
        this.view.flxStopPrice.setVisibility(false);
         }catch(err) {
        this.setError(err, "resetUI");
      }
    },
    toggleSellAll: function() {
      try{
        this.sellAllFlag = !this.sellAllFlag;
        this.view.imgToggle.src = this.sellAllFlag ? 'checkbox_ticked.png' : 'checkbox_normal.png';
        if (this.sellAllFlag) {
            this.updateQuantityValue();
            let inputField = this.view.flxQuantityWrapper;
            let children = inputField.widgets();
            this.activeInput = children[1];
            this.keypadString = this.activeInput.text;
          this.quantityValue=this.activeInput.text.replace(/,/g,"");
            this.validateQuantity();
        } else {
          inputField = this.view.flxQuantityWrapper;
        let children = inputField.widgets();
        this.activeInput = children[1];
            this.clearData();
        }
      this.checkAndEnableConfirm();
         }catch(err) {
        this.setError(err, "toggleSellAll");
      }
    },
    setReference: function(amount) {
      try{
        if (amount) {
            this.keypadString = amount;
        } else {
            this.keypadString = "0";
        }
         }catch(err) {
        this.setError(err, "setReference");
      }
    },
    clearData: function() {
      try{
        this.keypadString = '0';
     if (this.activeInput.id === 'lblLimitPriceField') {
            this.keypadString = '0.00';
            this.view.lblLimitPriceField.text = '0.00';
          this.priceValue='0.00';
        } else if (this.activeInput.id === 'lblStopPriceField') {
            this.keypadString = '0.00';
            this.view.lblStopPriceField.text = '0.00';
          if(this.orderType==="Stop Loss"){
            this.priceValue='0.00';
          }
        }else{
          this.sellAllFlag = false;
            this.view.imgToggle.src = this.sellAllFlag ? 'checkbox_ticked.png' : 'checkbox_normal.png';
          this.view.lblAmount.text = '0';
          this.quantityValue='0';
            var formatUtil = applicationManager.getFormatUtilManager();
            this.view.lblEstimatedValue.text = formatUtil.formatAmountandAppendCurrencySymbol('0', this.currentCurrency);
       
        }
         }catch(err) {
        this.setError(err, "clearData");
      }
    },
  
    setDate:function(instrumentDate){
      try{
      let month = instrumentDate.dateReceived.substring(3,6);
      let day = instrumentDate.dateReceived.substring(0,2);
      let year = instrumentDate.dateReceived.substring(7,12);
      var dateFormat = "";
      let hour = instrumentDate.timeReceived.substring(0,2);
      let min = instrumentDate.timeReceived.substring(3,5);
      
      let firstPart = applicationManager.getFormatUtilManager().getTwelveHourTimeString(hour+': '+min);          
      let trdPart = month + ' ' + day;

      return firstPart + ' ' + "UTC" + ' ' + trdPart;
      }catch(err) {
        this.setError(err, "setDate");
      }
    },
    cancelOnClick: function() {
      try{
      //var controller = applicationManager.getPresentationUtility().getController('frmPlaceOrder', true);
     	var navigationMan = applicationManager.getNavigationManager();
    if(kony.application.getPreviousForm().id === "frmPlaceOrder"|| kony.application.getPreviousForm().id ==="frmOrders" || scope_WealthOrderPresentationController.navForm === "frmInstrumentDetails" ||scope_WealthPresentationController.watchlistFlow === true||applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"}).ordersPage === true)
      {
        if (scope_WealthPresentationController.watchlistFlow === true) {
          var ntf = new kony.mvc.Navigation("frmWatchlist");
          ntf.navigate();
        } 
        // if(kony.application.getPreviousForm().id==="frmOrders"){
        //   new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmOrders"}).navigate();
        // }
       else if(scope_WealthOrderPresentationController.navForm === "frmInstrumentDetails" || scope_WealthOrderPresentationController.navForm === "frmHoldings"){
        //navigationMan.navigateTo("frmInstrumentDetails");
		//IW-3874 STARTS BHARATH
        if(scope_WealthPresentationController.isfrmInstrumentSearch && scope_WealthOrderPresentationController.navForm !== "frmHoldings"){
          new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmPortfolioDetails"}).navigate();
        } else {
          new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmHoldings"}).navigate();
        }
      }
        else if (applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"}).ordersPage === true) {
          new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmOrders"}).navigate();
        } 
		//IW-3874 STARTS BHARATH
    //   if (kony.application.getPreviousForm().id === "frmPlaceOrder"){
    //   if(!scope_WealthPresentationController.isfrmInstrumentSearch){ 
    //     new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmHoldings"}).navigate();
    //   }
    // }
      
    }
    else {
      var params = {
        "portfolioId": scope_WealthPresentationController.portfolioId,
        "navPage": "Portfolio",
        "graphDuration": "OneY"
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthModule.getPortfolioAndGraphDetails(params);
    }
         }catch(err) {
        this.setError(err, "cancelOnClick");
      }
  },
  backOnClick: function() {
    try{
    scope_WealthPresentationController.isPortfolio=true;
    //         var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    //         wealthMod.commonFunctionForgoBack();
    var orderforms = ["frmOrders","frmOrderType","frmValidity"];
    if(orderforms.includes(kony.application.getPreviousForm().id) && scope_WealthOrderPresentationController.ordersPage === true){
      scope_WealthOrderPresentationController.ordersPage = false;
      new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmOrders"}).navigate();
    }

    else{ 
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmPlaceOrder");
    }
      }catch(err) {
        this.setError(err, "backOnClick");
      }
  },
    continueOnClick: function() {
      try{
        var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
        var nav = applicationManager.getNavigationManager();
        var formatUtil = applicationManager.getFormatUtilManager();
        var data1 = nav.getCustomInfo('frmInstrumentDetails');
        var instrumentOrderData=nav.getCustomInfo('frmInstrumentOrder');
      //let instrumentData = data1.instrumentDetails && data1.instrumentDetails.instrumentDetails ? data1.instrumentDetails.instrumentDetails : this.holdingData;
        scope_WealthOrderPresentationController.marketPrice = this.marketPrice;
        let customerId = "";
      let userMan = applicationManager.getUserPreferencesManager();
      if (userMan.backendIdentifier && userMan.backendIdentifier  !== "") {
        customerId = userMan.backendIdentifier;
      } else if(userMan.primaryCustomerId.id && userMan.primaryCustomerId.id !== "") {
        customerId = userMan.primaryCustomerId.id;
      } else {
        customerId = userMan.accessibleCustomerIds[0].id;
      }
      let instrumentData="";

      if(data1.instrumentDetails.productDetails){
        instrumentData= data1.instrumentDetails.productDetails;
      }
      var portId = nav.getCustomInfo('frmInvestmentAccPortfolio');
      if(instrumentOrderData.orderReference){
        let typ = this.orderType;
        var orderData = {};
        orderData = {
			portfolioId : portId? portId :scope_WealthPresentationController.portfolioId,
            orderType: this.orderType === "Stop Limit" ? "STOP.LIMIT":this.orderType === "Stop Loss"?"STOP":typ.toUpperCase(),
            quantity: (this.view.lblAmount.text).replace(/[,.]/g,''),
            orderId : instrumentOrderData.orderReference,
            limitPrice: (this.orderType === this.ORDER_TYPE.LIMIT || this.orderType === this.ORDER_TYPE.STOPLIMIT) ?this.view.lblLimitPriceField.text.replace(/,/g,"") : 0,
            price : (this.orderType === this.ORDER_TYPE.STOPLIMIT || this.orderType === this.ORDER_TYPE.STOPLOSS) ? this.view.lblStopPriceField.text.replace(/,/g,"") : "",
            validate_only : "",
            validity : this.view.lblValidityValue.text ===  kony.i18n.getLocalizedString("i18n.wealth.dayOrder") ? "GTD" :"GTC",
            tradeCurrency : instrumentData.instrumentCurrencyId,
            customerId : customerId,
            instrumentId : instrumentData.instrumentId,
            marketPrice : this.marketPrice
       };
        instrumentOrderData.quantity = this.view.lblAmount.text;
        instrumentOrderData.netAmount = this.estimatedValue;
        instrumentOrderData.tradeCurrency = instrumentOrderData.instrumentCurrency;
        instrumentOrderData.order = instrumentOrderData.orderMode;
        instrumentOrderData.price= orderData.price;
        instrumentOrderData.limitPrice= orderData.limitPrice;
        instrumentOrderData.marketPrice= orderData.marketPrice;
        instrumentOrderData.orderMode = this.view.title;
        instrumentOrderData.orderTypeLabel = this.view.lblOrderTypeValue.text;
        instrumentOrderData.validityLabel = this.view.lblValidityValue.text;
        nav.setCustomInfo('frmInstrumentOrder', instrumentOrderData);
        wealthMod.modifyMarketOrder(orderData);
       }
      else{
        let tempMode = this.orderMode;
        let tempType = this.orderType;
        var orderData = {
           ISINCode: instrumentData.ISINCode,
           netAmount: this.estimatedValue,
            order: (tempMode.length == 4)? tempMode.toUpperCase().slice(0, -1): tempMode.toUpperCase(),
            orderType: tempType.toUpperCase(),
            quantity: (this.view.lblAmount.text).replace(/[,.]/g,''),
            validity: this.view.lblValidityValue.text === kony.i18n.getLocalizedString("i18n.wealth.dayOrder") ? "GTD" :"GTC",
            limitPrice: (this.orderType === this.ORDER_TYPE.LIMIT || this.orderType === this.ORDER_TYPE.STOPLIMIT) ?this.view.lblLimitPriceField.text.replace(/,/g,"") : 0,
            portfolioId : portId? portId :scope_WealthPresentationController.portfolioId,
            customerId : customerId,
            instrumentId : instrumentData.instrumentId,
            stockExchange : instrumentData.stockExchange,
            price :(this.orderType === this.ORDER_TYPE.STOPLIMIT || this.orderType === this.ORDER_TYPE.STOPLOSS) ? this.view.lblStopPriceField.text.replace(/,/g,"") : "" ,
            dealStatus : "TRANSMITTED",	
            validate_only : "true",
            tradeCurrency : instrumentData.instrumentCurrencyId,  
            funcResultCode : "",
            marketPrice : this.marketPrice,
            totalCashBalanceCurrency : instrumentData.instrumentCurrencyId
      }
        if(scope_WealthPresentationController.portfolioId == "")
          orderData.portfolioId = scope_WealthPresentationController.watchlistPortfolioId;
        wealthMod.createMarketOrder(orderData);
        orderData.order = tempMode;
        orderData.orderType = tempType;
        orderData.orderMode = this.view.title;
        orderData.orderTypeLabel = this.view.lblOrderTypeValue.text;
        orderData.validityLabel = this.view.lblValidityValue.text;
        nav.setCustomInfo('frmInstrumentOrder', orderData);
        
      }
        
      
         }catch(err) {
        this.setError(err, "continueOnClick");
      }
    },
    // Toggle keypad and disable Confirm button
    toggleKeypad: function(enableKeypad, inputField = null) {
      try{
      this.view.lblError.setVisibility(false);
      this.view.lblQuantityError.setVisibility(false);
        var formatUtil = applicationManager.getFormatUtilManager();
        if (inputField) {
            let children = inputField.widgets();
            this.activeInput = children[1];
            this.keypadString = this.activeInput.text.replace(/,/g,"");
        }
        this.view.flxKeypad.setVisibility(!!enableKeypad);
        this.view.flxButton.setVisibility(!!!enableKeypad);
        if (this.activeInput.id === 'lblAmount') {
            this.view.imgClear.isVisible = !!enableKeypad;
            this.view.imgClear1.isVisible = false;
            this.view.imgClear2.isVisible = false;
        	if (this.view.imgClear.isVisible === true){
           	  this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px"
            }
           else{
              this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px"
            }
          }
        else if (this.activeInput.id === 'lblLimitPriceField') {
            this.view.imgClear1.isVisible = !!enableKeypad;
            this.view.imgClear.isVisible = false;
            this.view.imgClear2.isVisible = false;
         	if (this.view.imgClear1.isVisible === true){
           	  this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px"
            }
           else{
              this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px"
            }
        } else {
            this.view.imgClear2.isVisible = !!enableKeypad;
            this.view.imgClear1.isVisible = false;
            this.view.imgClear.isVisible = false;
          	if (this.view.imgClear2.isVisible === true){
           	  this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px"
            }
           else{
              this.view.flxQuantityWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxLimitPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px";
              this.view.flxStopPriceWrapper.skin = "sknflxffffffRadiusf6f6f64px"
            }
        }
        this.view.flxMainContainer.height = enableKeypad ? '53%' : '84%';
        if (!!!enableKeypad && this.activeInput.id === 'lblAmount') {
            this.validateQuantity();
            this.activeInput = null;
        } else if (!!!enableKeypad) {
            this.validateQuantity();
            this.activeInput = null;
            this.checkAndEnableConfirm();
        }
         }catch(err) {
        this.setError(err, "toggleKeypad");
      }
    },
    checkAndEnableConfirm: function() {
      try{
        var orderType = this.orderType;
        if (orderType === 'Limit') {
            if ((this.error !== '1') && parseFloat(this.view.lblAmount.text) > 0 && parseFloat(this.view.lblLimitPriceField.text) > 0) {
                this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
                this.view.btnContinue.setEnabled(true);
            } else {
                this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
                this.view.btnContinue.setEnabled(false);
            }
        } else if (orderType === 'Stop Loss') {
            if ((this.error !== '1') && parseFloat(this.view.lblAmount.text) > 0 && parseFloat(this.view.lblStopPriceField.text) > 0) {
                this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
                this.view.btnContinue.setEnabled(true);
            } else {
                this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
                this.view.btnContinue.setEnabled(false);
            }
        } else if (orderType === 'Stop Limit') {
            if ((this.error !== '1') && parseFloat(this.view.lblAmount.text) > 0 && parseFloat(this.view.lblLimitPriceField.text) > 0 && (parseFloat(this.view.lblStopPriceField.text) > 0)) {
                this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
                this.view.btnContinue.setEnabled(true);
            } else {
                this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
                this.view.btnContinue.setEnabled(false);
            }
        } else {
            if ((this.error !== '1') && parseFloat(this.view.lblAmount.text) > 0) {
                this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
                this.view.btnContinue.setEnabled(true);
            } else {
                this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
                this.view.btnContinue.setEnabled(false);
            }
        }
         }catch(err) {
        this.setError(err, "checkAndEnableConfirm");
      }
    },
    // TODO : Get current Cash Balance and replace in line 306
    validateQuantity: function() {
      try{
        let formatUtil = applicationManager.getFormatUtilManager();
        var navman = applicationManager.getNavigationManager();
        var data = navman.getCustomInfo('frmInvestmentAcc');
        var amount;
      if(!kony.sdk.isNullOrUndefined(data)){  
      if(data.finalAmount){
        amount = data.finalAmount;
      }
       else{
        amount = "0.00" 
       }
      }else{
        amount = "0.00" 
      }
        var qty;
        var prVal;
      	var curr;
        if(scope_WealthPresentationController.isFrmOrder === true){
           var data1 = navman.getCustomInfo("frmInstrumentOrder");
           if (this.orderType === "Stop Loss") {
                prVal = formatUtil.deFormatAmount(this.view.lblStopPriceField.text);
                this.priceValue = prVal;
            }
          else if (this.orderType === "Stop Limit" || "Limit") {
                prVal = formatUtil.deFormatAmount(this.view.lblLimitPriceField.text);
                this.priceValue = prVal;
            } 
           qty = data1.quantity;
           curr = data1.instrumentCurrency;
        }
        else{
       		prVal = this.priceValue;
          	qty = this.quantityValue;
            curr = this.currentCurrency;
        } 
        let q = formatUtil.deFormatAmount(qty);
      var estValue;
      if(this.orderType==='Market'){
          estValue = parseFloat(q) * this.marketPrice;
         }else{
           estValue=parseFloat(q) * prVal;
         }
        navman.setCustomInfo("frmOrderType",this.view.lblAmount.text);
        this.estimatedValue = estValue;
        this.view.lblEstimatedValue.text = formatUtil.formatAmountandAppendCurrencySymbol(estValue, curr);
         if (this.orderMode === this.ORDER_MODE.SELL && parseFloat(q) > parseFloat(this.quantity)) {
              // ERROR
              this.setQuantityError(kony.i18n.getLocalizedString("i18n.wealth.invalidSell"));
              this.view.btnContinue.setEnabled(false);
              this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      
            } 
        
//         if ((this.orderMode === this.ORDER_MODE.BUY) && (parseFloat(estValue) > parseFloat(amount))) {
//             this.setQuantityError('Balance is insufficient to buy these quantities');
//             this.view.btnContinue.setEnabled(false);
//             this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
//         } 
      else {
            this.setQuantityError(null);
      }
            if(scope_WealthPresentationController.isFrmOrder === true){
              this.checkAndEnableConfirm();
            }
            else if (this.keypadString === '0') {
                this.view.btnContinue.setEnabled(false);
                this.view.btnContinue.skin = "sknBtnE2E9F0Rounded";
            } else {
                this.checkAndEnableConfirm();
            }
        //}
         }catch(err) {
        this.setError(err, "validateQuantity");
      }
    },
    setQuantityError: function(msg = null) {
      try{
        if (msg) {
            this.error = '1';
            this.view.flxQuantityWrapper.skin = 'sknFlxBgFFFFFFBrF54B5E1pxR3px';
            this.view.lblQuantityError.text = msg;
            this.view.lblQuantityError.setVisibility(true);
        } else {
            this.error = '0';
            this.view.flxQuantityWrapper.skin = 'sknflxffffffRadiusf6f6f64px';
            this.view.lblQuantityError.setVisibility(false);
        }
         }catch(err) {
        this.setError(err, "setQuantityError");
      }
    },
    setKeypadChar: function(char) {
      try{
        if (this.activeInput.id === 'lblAmount') {
            if (char === '.') {
                if (this.isPeriodUsed === false) {
                    this.isPeriodUsed = true;
                } else {
                    return;
                }
            }
            var temp = this.keypadString.split(".")[0];
            if (temp.length < 9) {
                this.keypadString = this.keypadString + char;
                var firstChar = this.keypadString[0];
                this.keypadString = this.keypadString.split("");
                for (var i = 1; i < this.keypadString.length; i++) {
                    if (this.keypadString[i] === '.') {
                        this.keypadString[i - 1] = this.keypadString[i + 1];
                        i++;
                    } else {
                        this.keypadString[i - 1] = this.keypadString[i];
                    }
                }
                this.keypadString = this.keypadString.join("");
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
                if (firstChar !== '0') {
                    this.keypadString = firstChar + this.keypadString;
                }
                this.updateQuantityValue();
            }
        } else {
            this.setLimitKeypadChar(char);
        }
         }catch(err) {
        this.setError(err, "setKeypadChar");
      }
    },
    clearKeypadChar: function() {
      try{
        if (this.activeInput.id === 'lblAmount') {
            if (this.keypadString === '0.00' || this.keypadString === '0') return;
            this.keypadString = this.keypadString.split("");
            for (var i = this.keypadString.length - 2; i >= 0; i--) {
                if (this.keypadString[i] === '.') {
                    this.keypadString[i + 1] = this.keypadString[i - 1];
                    i--;
                } else {
                    this.keypadString[i + 1] = this.keypadString[i];
                }
            }
            this.keypadString = this.keypadString.join("");
            this.keypadString = this.keypadString.substr(1);
            if (this.keypadString === "") {
                this.keypadString = '0';
            }
            this.updateQuantityValue();
        } else {
            this.clearLimitKeypadChar();
        }
         }catch(err) {
        this.setError(err, "clearKeypadChar");
      }
    },
    updateQuantityValue: function() {
      try{
        let label = this.view.lblAmount;
        if (!this.sellAllFlag) {
            var keypadStringCommas = this.keypadString;
            if (keypadStringCommas.length > 3) {
                var withCommas = (keypadStringCommas.length) / 3;
                var withoutCommas = (keypadStringCommas.length) % 3;
                var temp = '';
                if (withoutCommas != 0) {
                    temp = keypadStringCommas.substr(0, withoutCommas) + ',';
                }
                for (var i = withoutCommas; i < keypadStringCommas.length; i += 3) {
                    temp += keypadStringCommas.substr(i, 3) + ',';
                }
                keypadStringCommas = temp.substr(0, temp.length - 1);
            }
          this.quantityValue=this.keypadString;
            label.text = this.view.keypad.formatAmount(keypadStringCommas);
        } else {
           /* var nav = applicationManager.getNavigationManager();
            var data = nav.getCustomInfo('frmInstrumentDetails');
            if(data.response !== undefined){
            label.text = data.response.quantity;
            }
            else{
			var data1 = nav.getCustomInfo('frmInstrumentOrder');
            label.text = data1.quantity;
            }*/
          var quantity=this.view.lblSellQuantity.text          
          label.text=quantity.replace(/[()]/g, '').trim();
            this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
            this.view.btnContinue.setEnabled(true);
        }
         }catch(err) {
        this.setError(err, "updateQuantityValue");
      }
    },
    updateAmountValue: function() {
      try{
        let label = this.view.lblAmount;
        if (this.activeInput) {
            label = this.activeInput;
        }
        if (label.text = 'lblAmount') {
            if (this.keypadString === '0' || this.keypadString === '0.00') {
                this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
                this.view.btnContinue.setEnabled(false);
                label.text = this.view.keypad.formatAmount(this.keypadString);
            } else {
                var keypadStringCommas = '';
                var beforeDecimal = this.keypadString.split('.')[0];
                var afterDecimal = this.keypadString.split('.')[1];
                if (beforeDecimal.length > 3) {
                    var withCommas = (beforeDecimal.length) / 3;
                    var withoutCommas = (beforeDecimal.length) % 3;
                    var temp = '';
                    if (withoutCommas != 0) {
                        temp = beforeDecimal.substr(0, withoutCommas) + ',';
                    }
                    for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
                        temp += beforeDecimal.substr(i, 3) + ',';
                    }
                    beforeDecimal = temp.substr(0, temp.length - 1);
                }
                // keypadStringCommas = beforeDecimal + '.' + afterDecimal;
                keypadStringCommas = beforeDecimal;
                label.text = this.view.keypad.formatAmount(keypadStringCommas);
            }
        } else {
            this.updateLimitValue();
        }
        //     this.calculateAmount();
         }catch(err) {
        this.setError(err, "updateAmountValue");
      }
    },
    setLimitKeypadChar: function(char) {
      try{
        if (char === '.') {
            if (this.isPeriodUsed === false) {
                this.isPeriodUsed = true;
            } else {
                return;
            }
        }
        var temp = this.keypadString.split(".")[0];
        if (temp.length < 9) {
            this.keypadString = this.keypadString + char;
            var firstChar = this.keypadString[0];
            this.keypadString = this.keypadString.split("");
            for (var i = 1; i < this.keypadString.length; i++) {
                if (this.keypadString[i] === '.') {
                    this.keypadString[i - 1] = this.keypadString[i + 1];
                    i++;
                } else {
                    this.keypadString[i - 1] = this.keypadString[i];
                }
            }
            this.keypadString = this.keypadString.join("");
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (firstChar !== '0') {
                this.keypadString = firstChar + this.keypadString;
            }
            this.updateLimitValue();
        }
         }catch(err) {
        this.setError(err, "setLimitKeypadChar");
      }
    },
    clearLimitKeypadChar: function() {
      try{
        if (this.keypadString === '0.00') return;
        this.keypadString = this.keypadString.split("");
        for (var i = this.keypadString.length - 2; i >= 0; i--) {
            if (this.keypadString[i] === '.') {
                this.keypadString[i + 1] = this.keypadString[i - 1];
                i--;
            } else {
                this.keypadString[i + 1] = this.keypadString[i];
            }
        }
        this.keypadString = this.keypadString.join("");
        this.keypadString = this.keypadString.substr(1);
        if (this.keypadString[0] === '.') {
            this.keypadString = '0' + this.keypadString;
        }
        this.updateLimitValue();
         }catch(err) {
        this.setError(err, "clearLimitKeypadChar");
      }
    },
    updateLimitValue: function() {
      try{
        let label = this.view.lblAmount;
        if (this.activeInput) {
            label = this.activeInput;
        }
        if (this.keypadString === '0.00') {
            this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
            this.view.btnContinue.setEnabled(false);
            label.text = this.view.keypad.formatAmount(this.keypadString);
          this.priceValue='0.00';
        } else {
            var keypadStringCommas = '';
            var beforeDecimal = this.keypadString.split('.')[0];
            var afterDecimal = this.keypadString.split('.')[1];
            if (beforeDecimal.length > 3) {
                var withCommas = (beforeDecimal.length) / 3;
                var withoutCommas = (beforeDecimal.length) % 3;
                var temp = '';
                if (withoutCommas != 0) {
                    temp = beforeDecimal.substr(0, withoutCommas) + ',';
                }
                for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
                    temp += beforeDecimal.substr(i, 3) + ',';
                }
                beforeDecimal = temp.substr(0, temp.length - 1);
            }
            afterDecimal=afterDecimal ? afterDecimal : 0;
            keypadStringCommas = beforeDecimal + '.' + afterDecimal;
            this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
            this.view.btnContinue.setEnabled(true);
            label.text = this.view.keypad.formatAmount(keypadStringCommas);
          if(this.orderType==="Stop Loss"){
            this.priceValue=this.view.lblStopPriceField.text.replace(/,/g,"");
          }else{
             this.priceValue=this.view.lblLimitPriceField.text.replace(/,/g,"");
         
          }
          
        }
         }catch(err) {
        this.setError(err, "updateLimitValue");
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