define({ 

 init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 
  },
  preShow:function(){
	this.view.flxStopPrice.isVisible = false;
	this.view.flxLimitPrice.isVisible = false;
	this.view.flxPrice.isVisible = false;
    this.view.flxSeparator7.isVisible = false;
    this.view.flxSeparator6.isVisible = false;
    this.view.flxSeparator5.isVisible = false;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement.orderDetails");
      this.view.flxHeader.isVisible = false;
    }
   var navManager = applicationManager.getNavigationManager();
   var OrderHistoryDetail = navManager.getCustomInfo("frmViewOrderHistoryDetails");
   var OrderHistory=OrderHistoryDetail.response;
    this.setDataToOrderHistoryDetail(OrderHistory);
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

setDataToOrderHistoryDetail:function(orderDetail){
  
  var forUtility = applicationManager.getFormatUtilManager();
  var tradeDateObj=forUtility.getDateObjectfromString(orderDetail.tradeDate);
  var formattedTradeDate=forUtility.getFormatedDateString(tradeDateObj, forUtility.getApplicationDateFormat());
  this.view.lblInstrument.text=orderDetail.description;
  this.view.lblTradeDateVal.text=formattedTradeDate;
  this.view.lblTypeVal.text=orderDetail.orderType;
  this.view.lblStatusVal.text=orderDetail.status;
  this.view.lblQuantityVal.text=orderDetail.quantity;
  this.view.lblOrderRefValue.text=orderDetail.orderReference;
  this.view.lblTradeDate.text = kony.i18n.getLocalizedString("i18n.wealth.date")+":";
  this.view.lblOrderRefId.text=kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")+":";
  this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.type");
  this.view.lblQuantity.text=kony.i18n.getLocalizedString("i18n.wealth.quantity");
  this.view.lblStatus.text=kony.i18n.getLocalizedString("kony.mb.achfiledetail.status")+":";
  
  if (orderDetail.status==="Completed" && orderDetail.orderExecutionPrice !== "") {  
   var formattedPriceVal = forUtility.formatAmountandAppendCurrencySymbol(orderDetail.orderExecutionPrice, orderDetail.instrumentCurrency);
  this.view.lblPriceVal.text=formattedPriceVal;
  this.view.lblPrice.text=kony.i18n.getLocalizedString("i18n.wealth.pricemb");
  this.view.flxPrice.isVisible = true;
  this.view.flxSeparator5.isVisible = true;
	}
	 
  if (orderDetail.stopPrice !== "") { 
    if(orderDetail.status === "Cancelled"){
      this.view.flxStopPrice.isVisible = false;
      this.view.flxSeparator7.isVisible = false;
    }else{
    var formattedStopPriceVal = forUtility.formatAmountandAppendCurrencySymbol(orderDetail.stopPrice, orderDetail.instrumentCurrency);
    this.view.lblStopPriceVal.text=formattedStopPriceVal;
    this.view.lblStopPrice.text=kony.i18n.getLocalizedString("i18n.wealth.stopPrice");
    this.view.flxStopPrice.isVisible = true;
    this.view.flxSeparator7.isVisible = true;
    }
  }
	
 if (orderDetail.limitPrice !== "" && Number(orderDetail.limitPrice).toFixed(2) !== "0.00"){  
   if(orderDetail.status === "Cancelled"){
      this.view.flxLimitPrice.isVisible = false;
      this.view.flxSeparator6.isVisible = false;
    }else{
  var formattedLimitPriceVal = forUtility.formatAmountandAppendCurrencySymbol(orderDetail.limitPrice, orderDetail.instrumentCurrency);
  this.view.lblLimitPriceVal.text=formattedLimitPriceVal;
  this.view.lblLimitPrice.text=kony.i18n.getLocalizedString("i18n.wealth.limitPrice");
  this.view.flxLimitPrice.isVisible = true;
  this.view.flxSeparator6.isVisible = true;
    }
  }
}
 });