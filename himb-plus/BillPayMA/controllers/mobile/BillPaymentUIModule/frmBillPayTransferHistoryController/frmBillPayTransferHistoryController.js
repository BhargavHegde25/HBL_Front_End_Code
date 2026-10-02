define(function(){ 
    return{
     TransactionHistory:null,
     flag:"",
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShow;
    },
  onNavigate: function(obj) {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
  },
preShow(){
  applicationManager.getPresentationUtility().dismissLoadingScreen();
  if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
    this.view.flxHeader.isVisible = false;
} else {
    this.view.flxHeader.isVisible = true;
}
this.view.tbxSearch.text ="";
    this.segTranHistory(this.flag);
    this.view.segTranHistory.onRowClick = this.segTransactionsOnRowClick.bind(this);
    this.view.customHeader.flxBack.onClick =this.onCancelClick.bind(this);
    this.view.tbxSearch.onTextChange = this.setSearchCategory.bind(this);
},
segTranHistory: function(transactionData){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan=applicationManager.getNavigationManager();
    var forUtility=applicationManager.getFormatUtilManager();
    var TransactionHistory ="";
    if(this.flag==1){
      TransactionHistory=transactionData;
      this.flag =0;
    }else{
    var bills=navMan.getCustomInfo("frmBillPay");
     TransactionHistory = bills.paymentHistory;
    }
    ptHistory=[];
    var dataHistory= [];
    if(TransactionHistory.length>0){
      dataHistory.push([{"lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("Kony.mb.EBill.TransactionHistory")},TransactionHistory]);
      this.TransactionHistory = TransactionHistory;
      this.view.flxNoTransaction.isVisible=false;
      this.view.flxMain.isVisible= true;

    }else{
      dataHistory.push([{"lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("Kony.mb.EBill.TransactionHistory")},TransactionHistory]); 
      this.view.flxNoTransaction.isVisible=true;
      this.view.flxMain.isVisible= false;
    }
    this.segmentdata = dataHistory;
    this.view.segTranHistory.widgetDataMap={
      "lblAccountName":"lblAccountName",
      "lblBankName":"lblBankName",
      "lblAccountBalValue":"lblAccountBalValue",
      "lblAccountBal":"lblAccountBal",
      "lblHeader":"lblHeader",
      "transactionId":"transactionId",
      "imgebill":"image",
      "flxViewBill":"flxViewBill",
      "flxBillPay":"flxBillPay",
      "lblBillPay" : "lblBillPay",
      "imgDelete":"imgDelete",
      "lblDelete":"lblDelete",
      "imgBillPay":"imgBillPay",
      "lblAccountNumber":"",
      "flxPayBill":"flxPayBill",
      "flxAccountType": "flxAccountType",
      "imgAccountType": "imgAccountType"
    };
    
    for(i=0;i<TransactionHistory.length;i++){
      ptHistory.push({
      lblAccountName:kony.sdk.isNullOrUndefined(TransactionHistory[i].toAccountNumber)?"":TransactionHistory[i].toAccountNumber,
      lblBankName:kony.sdk.isNullOrUndefined(TransactionHistory[i].fromAccountNumber)?"":TransactionHistory[i].fromAccountNumber,
      lblAccountBalValue:kony.sdk.isNullOrUndefined(TransactionHistory[i].amount)?"":  TransactionHistory[i].transactionCurrency +" "+ TransactionHistory[i].amount,
      lblAccountBal:kony.sdk.isNullOrUndefined(TransactionHistory[i].transactionts)?"":applicationManager.getFormatUtilManager().getFormatedDateString(new Date(TransactionHistory[i].transactionts.split(" ")[0]),"d/m/Y"),
      lblHeader:"lblHeader",
      transactionId:"transactionId",
      imgebill:"image",
      flxViewBill:"flxViewBill",
      flxBillPay:"flxBillPay",
      lblBillPay : {"info":{"merchantID":TransactionHistory[i].merchantId,
      "currency":TransactionHistory[i].transactionCurrency,
      "status":TransactionHistory[i].status,
      "transactionId":TransactionHistory[i].transactionId,
      "notes":TransactionHistory[i].notes,
      "externalServicePayload":TransactionHistory[i].externalServicePayload,
      "externalServiceResponse":TransactionHistory[i].externalServiceResponse
      },
      },
      imgDelete:"imgDelete",
      lblDelete:"lblDelete",
      imgBillPay:"imgBillPay",
      lblAccountNumber:"",
      flxPayBill:"flxPayBill",
      flxAccountType: "flxAccountType",
      imgAccountType: "imgAccountType"
    }),
    ptHistory[i].flxPayBill.onClick=this.payBill;
 }
 this.view.segTranHistory.setData(ptHistory);
// this.view.flxNoTransactions.isVisible=false;
 this.view.segTranHistory.isVisible= true;

    },
     payBill:function(widget,context)
  {
    applicationManager.getPresentationUtility().showLoadingScreen();
   var segSelectedAcc= this.view.segTranHistory.selectedRowItems[0];
   
   //var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    //billPayMod.presentationController.navAfterSelectPayee(segSelectedAcc);

   /* var selectedSectionIndex=context.sectionIndex;
    var selectedRowIndex=context.rowIndex;
    var transactionData=this.view.segTranHistory.data[selectedSectionIndex][1][selectedRowIndex];
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.navAfterSelectPayee(transactionData);*/
  },

segTransactionsOnRowClick:function(){
  applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
     var segSelectedAcc= this.view.segTranHistory.selectedRowItems[0];
      //navMan.setCustomInfo("frmTransactionDetail",transactionData);
       navMan.setCustomInfo("frmTransactionDetails",segSelectedAcc);
    navMan.navigateTo({"appName": "BillPayMA","friendlyName": "frmBillPayTransferDetails"},false,{"repeat":true});
    /*var selectedSectionIndex=Math.floor(this.view.segTranHistory.selectedRowIndex[0]);
    var selectedRowIndex=Math.floor(this.view.segTranHistory.selectedRowIndex[1]);
    var transactionData=this.view.segTranHistory.data[selectedSectionIndex][1][selectedRowIndex];
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    if(!transactionData.referenceId)
    {
      transactionData.dueAmount = Number(transactionData.dueAmount).toFixed(2);
      navMan.setCustomInfo("frmBillPayDetails",transactionData);
      billPayMod.presentationController.commonFunctionForNavigation("frmBillPayDetails");
    }
    else
    {
    navMan.setEntryPoint("payBill","frmBillPay");
    navMan.setCustomInfo("frmTransactionDetails",transactionData);
    navMan.setEntryPoint("frmTransactionDetails","BillPay");
    
      }*/
  },
  onCancelClick: function(){
    applicationManager.setBillPayFlow ="onCancel";
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
   billPayMod.presentationController.onCancelClick();
},
setSearchCategory: function(){
  try{
var navManager = applicationManager.getNavigationManager();
var categories = navManager.getCustomInfo("frmBillPay");
var TransactionHistory = categories.paymentHistory;
var searchTerm = this.view.tbxSearch.text;
this.flag =1;
if(searchTerm.length>= 3){
  var results = [];
  var lowercaseSearchTerm = searchTerm.toLowerCase();
  for (var i = 0; i < TransactionHistory.length; i++) {
    var category = TransactionHistory[i].toAccountNumber.toLowerCase();
    var amount = TransactionHistory[i].amount.toLowerCase();
    var frmAcc = TransactionHistory[i].fromAccountNumber.toLowerCase();
    var lowercaseLabelText ="";
    /*if(lowercaseSearchTerm ==category){
       lowercaseLabelText = category;
    }else if(lowercaseSearchTerm==amount){
        lowercaseLabelText =amount;
    }else if(lowercaseSearchTerm==frmAcc){
        lowercaseLabelText = frmAcc;
    }*/
    if (category.includes(lowercaseSearchTerm) || amount.includes(lowercaseSearchTerm) || frmAcc.includes(lowercaseSearchTerm)) {
        results.push(TransactionHistory[i]);
    }

   // if (lowercaseLabelText.includes(lowercaseSearchTerm)){
     // results.push(TransactionHistory[i]);
   // }
  }
  this.segTranHistory(results);
}else{
  if(searchTerm.length==0){
    var TransactionHistory = categories.paymentHistory;;
    this.segTranHistory(TransactionHistory);
  }
}
 }catch(err){
      kony.print("setSearchCategory"+ err);
  }
},

    };
 });