define({ 

 init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 
  },
  preShow:function(){
	this.view.flxStopPrice.isVisible = false;
	this.view.flxLimitPrice.isVisible = false;
    this.view.flxSeparator7.isVisible= false;
    this.view.flxSeparator6.isVisible= false;
    
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement.orderDetails");
    }
   var navManager = applicationManager.getNavigationManager();
   var openOrderDetail = navManager.getCustomInfo("frmViewOpenOrderDetails");
   var openOrder=openOrderDetail.response;
    this.setDataToOpenOrderDetail(openOrder);
    this.initActions();
  },
  initActions:function(){
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
  },
   postShow:function(){
  
},
   onBack : function () {
    var navMan=applicationManager.getNavigationManager();
    navMan.navigateTo("frmOrders");
  },

setDataToOpenOrderDetail:function(openOrderDetail){
  
  var forUtility = applicationManager.getFormatUtilManager();
  var tradeDateObj=forUtility.getDateObjectfromString(openOrderDetail.tradeDate);
  var formattedTradeDate=forUtility.getFormatedDateString(tradeDateObj, forUtility.getApplicationDateFormat());
  this.view.lblInstrument.text=openOrderDetail.description;
  this.view.lblOrderRefValue.text=openOrderDetail.orderReference;
  this.view.lblTradeDateVal.text=formattedTradeDate;
  this.view.lblTypeVal.text=openOrderDetail.orderType;
  this.view.lblQuantityVal.text=openOrderDetail.quantity;
  this.view.lblOrderRefId.text=kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")+":";
  this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.type");
  this.view.lblTradeDate.text = kony.i18n.getLocalizedString("i18n.wealth.date")+":";
  this.view.lblQuantity.text=kony.i18n.getLocalizedString("i18n.wealth.quantity");
  if (openOrderDetail.stopPrice !== "") {  
  var formattedStopPriceVal = forUtility.formatAmountandAppendCurrencySymbol(openOrderDetail.stopPrice, openOrderDetail.instrumentCurrency);
  this.view.lblStopPriceVal.text=formattedStopPriceVal;
  this.view.lblStopPrice.text=kony.i18n.getLocalizedString("i18n.wealth.stopPrice");
  this.view.flxStopPrice.isVisible = true;
  this.view.flxSeparator7.isVisible= true;
   }
if (openOrderDetail.limitPrice !== "" && Number(openOrderDetail.limitPrice).toFixed(2) !== "0.00"){
  var formattedLimitPriceVal = forUtility.formatAmountandAppendCurrencySymbol(openOrderDetail.limitPrice, openOrderDetail.instrumentCurrency);
  this.view.lblLimitPriceVal.text=formattedLimitPriceVal;
  this.view.lblLimitPrice.text=kony.i18n.getLocalizedString("i18n.wealth.limitPrice");
  this.view.flxLimitPrice.isVisible = true;
  this.view.flxSeparator6.isVisible= true;
  }
  
  

  
   
}
 });