define({ 

 init : function(){
   try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  }catch(err) {
        this.setError(err, "init");
      }
  },
  preShow:function(){
    try{
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
   var navManager = applicationManager.getNavigationManager();
   var transactionDetail = navManager.getCustomInfo("frmViewTransactionDetails");
   var transDetail=transactionDetail.response;
   this.view.flxInstrument.setVisibility(false);
   var forUtility = applicationManager.getFormatUtilManager();
  var tradeDateObj=forUtility.getDateObjectfromString(transDetail.tradeDate);
  var valueDateObj=forUtility.getDateObjectfromString(transDetail.valueDate);
  var formattedTradeDate=forUtility.getFormatedDateString(tradeDateObj, forUtility.getApplicationDateFormat());
  var formattedValueDate=forUtility.getFormatedDateString(valueDateObj, forUtility.getApplicationDateFormat());
  transDetail.instrumentAmount = forUtility.deFormatAmount(transDetail.instrumentAmount);
  var formattedAmount= forUtility.formatAmountandAppendCurrencySymbol(transDetail.instrumentAmount, transDetail.referenceCurrency);
  transDetail.limitPrice = forUtility.deFormatAmount(transDetail.limitPrice);
  var formattedPriceVal = forUtility.formatAmountandAppendCurrencySymbol(transDetail.limitPrice, transDetail.instrumentCurrency);
  transDetail.netAmount = forUtility.deFormatAmount(transDetail.netAmount);
  var formattedNetAmount= forUtility.formatAmountandAppendCurrencySymbol(transDetail.netAmount, transDetail.instrumentCurrency);
  transDetail.fees = forUtility.deFormatAmount(transDetail.fees);
  var formattedfees= forUtility.formatAmountandAppendCurrencySymbol(transDetail.fees, transDetail.feesCurrency);
  transDetail.total = forUtility.deFormatAmount(transDetail.total);
  var formattedTotal= forUtility.formatAmountandAppendCurrencySymbol(transDetail.total, transDetail.referenceCurrency);
  this.view.lblTradeDateVal.text=formattedTradeDate;
  this.view.lblTypeVal.text=formattedValueDate;
  this.view.lblQuantityVal.text=transDetail.orderType;
  this.view.lblPriceVal.text=transDetail.quantity;
  this.view.lblAmountVal.text=formattedPriceVal;
  this.view.lblExcahangeRateVal.text=formattedAmount;
  this.view.lblnstrAmountVal.text=Number(transDetail.exchangeRate).toFixed(2);
  this.view.lblValueDateVal.text=formattedNetAmount;
  this.view.lblFeesVal.text=formattedfees;
  this.view.lblTotalVal.text=formattedTotal;
  this.view.lblTradeDate.text=kony.i18n.getLocalizedString("i18n.wealth.tradeDatemb");
  this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.valueDatemb");
  this.view.lblQuantity.text=kony.i18n.getLocalizedString("i18n.wealth.type");
  this.view.lblPrice.text=kony.i18n.getLocalizedString("i18n.wealth.quantity");
  this.view.lblAmount.text=kony.i18n.getLocalizedString("i18n.wealth.pricemb");
  this.view.lblExchangeRate.text=kony.i18n.getLocalizedString("i18n.wealth.amountmb");
  this.view.lblnstrAmount.text=kony.i18n.getLocalizedString("i18n.wealth.exchangeRate");
  this.view.lblValueDate.text=kony.i18n.getLocalizedString("i18n.wealth.amountInstr");
  this.view.lblFees.text=kony.i18n.getLocalizedString("i18n.wealth.feesmb");
    this.view.lblTotal.text=kony.i18n.getLocalizedString("i18n.wealth.totalWithColon");
  this.initActions();
       }catch(err) {
        this.setError(err, "preShow");
      }
  },
  initActions:function(){
    try{
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
       }catch(err) {
        this.setError(err, "initActions");
      }
  },
   postShow:function(){
  
},
   onBack : function () {
     try{
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.navigateTo("frmInstrumentTransactions");
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
 });