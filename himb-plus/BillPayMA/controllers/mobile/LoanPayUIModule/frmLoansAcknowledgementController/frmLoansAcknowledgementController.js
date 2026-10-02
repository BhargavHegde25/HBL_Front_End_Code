define({

  init: function() {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
 onNavigate : function(uidata){
   try{
     if(uidata.PaybillAck){
        this.billpaySuccess(uidata.PaybillAck)
     }if(uidata.AutomaticMerchantConfirmBillPayRes){
         this.ConfirmBillPayAutoMerchantSuccess(uidata.AutomaticMerchantConfirmBillPayRes);
    }if(uidata.trasferreversed){
        this.reversalTransaction(uidata.trasferreversed); 
    }if(uidata.CreateFavMerchantSuccess){
      this.CreateFavMerchantSuccess(uidata.CreateFavMerchantSuccess);
    }
            }catch(err){
                kony.print("onNavigate"+err);
            }
 },
  navigateCustomBack: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    loansMod.clearFlowAttributes();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
    accountMod.presentationController.showDashboard();
  },

  preShow: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxScrollSuccessNew.top="5dp";
    }else{
    this.view.flxHeader.isVisible = true;
      this.view.flxSuccessTransaction.top="58dp";
    }
    var scope= this;
    this.initActions();
    var code = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
     if(!kony.sdk.isNullOrUndefined(code)){
      var billerCode = code.code;   
    var favMerchantList = applicationManager.getNavigationManager().getCustomInfo("favMerchantsList")
    for (i = 0; i < favMerchantList.favoriteMerchants.length; i++) {
                if (billerCode == favMerchantList.favoriteMerchants[i].merchantCode) {
                    scope.view.btnFavourite.setVisibility(false);
                    scope.view.btnMakeAnotherPayment.setVisibility(true);
                    break;
                } else {
                    scope.view.btnFavourite.setVisibility(true);
                    scope.view.btnMakeAnotherPayment.setVisibility(false);
                }
            }
     }
     scope.view.btnViewPayment.onClick = function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var data = {
                        "code": "TRANSACTION_HISTORY"
                    };
                     var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
                    billPayMod.presentationController.getBillHistory(data);
    }.bind(this);
    scope.view.btnFavourite.onClick = function(){
         applicationManager.getPresentationUtility().showLoadingScreen();
        scope.setFavorite();
    }.bind(this);
    scope.view.btnMakeAnotherPayment.onClick = function(){
      scope.navBillPayDashboard();
    }.bind(this);
    this.setFromData();
   // this.setupUI();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  initActions: function() {
    var scope = this;
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    scope.view.btnDashboard.onClick = function (){
      loansMod.clearFlowAttributes();
      //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "HomepageMA", "moduleName" : "AccountsUIModule"});
      accountMod.presentationController.showDashboard();
    };
    scope.view.btnTryAgain.onClick = function() {
      loansMod.clearFlowAttributes();
      //var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "HomepageMA", "moduleName" : "AccountsUIModule"});
      accountMod.presentationController.showDashboard();
    };
  },
  setFromData: function(){
    var bPayModule = applicationManager.getModulesPresentationController({
      'appName': 'BillPayMA',
      'moduleName': 'BillPaymentUIModule'
      });
      var fromData = bPayModule.selectedAccounted;
       this.view.lblFromAccountName.text =  fromData.AccountName;
      this.view.lblFromAccountNumber.text =fromData.accountID;
      this.view.lblFromBankName.text = fromData.productId;
  },
  billpaySuccess: function(res){
 try{
     var resultData =[];
     var presenter = applicationManager.getModulesPresentationController({
        'appName': 'BillPayMA',
        'moduleName': 'BillPaymentUIModule'
      });
     var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
     //var notes = applicationManager.getNavigationManager().getCustomInfo("notesBill");
     var notes=applicationManager.getNavigationManager().getCustomInfo("newNotes");
     var feeObj = applicationManager.getNavigationManager().getCustomInfo("totalFee");
     this.view.lblSuccessMessage.text =kony.i18n.getLocalizedString("kony.mb.loans.PostedTransferMessage");
     this.view.lblDetails.text =kony.i18n.getLocalizedString("kony.mb.TransfersEurope.successfulTransfer");
     this.view.lblToMechantCode.text =kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
     this.view.segDetails.widgetDataMap =this.getWidgetDataMap();
     this.view.segSuccess.widgetDataMap =this.segWidgetDataMap();
    var transferAmount =applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
     var amount = Number(transferAmount);
    var convertAmount = amount.toFixed(2);
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1]; 
    this.view.lblWholeNumber.text = wholeAmount;
    this.view.lblDecimal.text = "."+decimalAmount;
     var requiredData ={
    "Reference ID":kony.sdk.isNullOrUndefined(res.paymentId)?"NA":res.paymentId,
     "fee": (feeObj != "NA") ? "NPR " + this.convertAmountValue(feeObj)  : "NA",
     "availableBalance":kony.sdk.isNullOrUndefined(res.availableBalance)?"NA":res.currencyCode+" "+this.convertAmountValue(res.availableBalance),
     "notes":kony.sdk.isNullOrUndefined(notes)?"NA":notes
     };
     var key ="";
     for(var i=0;i<Object.keys(requiredData).length;i++){
    if(Object.keys(requiredData)[i]=="fee"){
     key= kony.i18n.getLocalizedString("i18n.FeewithColon");
     }else if(Object.keys(requiredData)[i]=="notes"){
     key= kony.i18n.getLocalizedString("i18n.ChequeBookReq.Notes");
     }else if(Object.keys(requiredData)[i]=="availableBalance"){
     key= kony.i18n.getLocalizedString("i18n.common.availableBalancewithColon");
     }else if(Object.keys(requiredData)[i]=="Reference ID"){
      key= kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")
      }
     resultData.push({
     "property" : key,
     "value1" : Object.values(requiredData)[i],
     "value2" : {"isVisible":true}
     });     
     }
     var nofRows = Object.keys(JSON.parse(res.responseFieldMapping)).length;
     for (var i = 0; i < nofRows; i++) {
     for (var j = 0; j < Object.keys(res.transactionDetails[0]).length; j++) {
     if (Object.keys(JSON.parse(res.responseFieldMapping))[i] == Object.keys(res.transactionDetails[0])[j]) {
     var requiredData1={ 
     "keyOfObject":Object.values(JSON.parse(res.responseFieldMapping))[i]+" :",
     "valueOfObject":Object.values(res.transactionDetails[0])[j] ? Object.values(res.transactionDetails[0])[j] : "NA"
     };
     resultData.push({
     "property" : requiredData1.keyOfObject,
     "value1" :requiredData1.valueOfObject,
     "value2" : {"isVisible":true}
     });
     }
     }
     }
     this.view.segDetails.setData(resultData);
     this.view.segSuccess.setData(resultData);
    }catch(err){
     kony.print("billpaySucess"+err);
   }
  },
  ConfirmBillPayAutoMerchantSuccess: function(response){
 try{
      var scope =this;
      var resultData=[];
      var presenter = applicationManager.getModulesPresentationController({'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
      var notes = applicationManager.getNavigationManager().getCustomInfo("newNotes");
      var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
      var res = applicationManager.getNavigationManager().getCustomInfo("WebViewRes");
     // var feeObj=applicationManager.getNavigationManager().getCustomInfo("debitInformation");
     var feeObj=applicationManager.getNavigationManager().getCustomInfo("totalFee");
      this.view.lblSuccessMessage.text =kony.i18n.getLocalizedString("kony.mb.loans.PostedTransferMessage");
      this.view.lblDetails.text =kony.i18n.getLocalizedString("kony.mb.TransfersEurope.successfulTransfer");
      this.view.lblToMechantCode.text =kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
      this.view.segDetails.widgetDataMap =this.getWidgetDataMap();
      this.view.segSuccess.widgetDataMap =this.segWidgetDataMap();
      var transferAmount =applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
     var amount = Number(transferAmount);
    var convertAmount = amount.toFixed(2);
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1]; 
    this.view.lblWholeNumber.text = wholeAmount;
    this.view.lblDecimal.text = "."+decimalAmount;
     var requiredData ={
     "Reference ID": kony.sdk.isNullOrUndefined(response.paymentId)?"NA":response.paymentId,
     "availableBalance":kony.sdk.isNullOrUndefined(response.availableBalance)?"NA":response.currencyCode+" "+scope.convertAmountValue(response.availableBalance),
     "fee": (feeObj != "NA") ? "NPR " +(feeObj) : "NA",
     "notes":kony.sdk.isNullOrUndefined(notes)?"NA":notes
     };
        var key ="";
        for(var i=0;i<Object.keys(requiredData).length;i++){
        if(Object.keys(requiredData)[i]=="notes"){
        key= kony.i18n.getLocalizedString("i18n.ChequeBookReq.Notes");
        }else if(Object.keys(requiredData)[i]=="availableBalance"){
        key= kony.i18n.getLocalizedString("i18n.common.availableBalancewithColon");
        }else if(Object.keys(requiredData)[i]=="fee"){
        key= kony.i18n.getLocalizedString("i18n.FeewithColon")
        }else if(Object.keys(requiredData)[i]=="Reference ID"){
          key= kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")
          }
        resultData.push({
        "property" : key,
            "value1" : Object.values(requiredData)[i],
            "value2" : {"isVisible":true}
        });     
        }
     var nofRows = JSON.parse(res.npiObjectData).fieldLabelMapping.length;
     for (var i = 0; i < nofRows; i++) {
     for (var j = 0; j < Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length; j++) {
     if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]) { 
     var parsedData = JSON.parse(res.npiObjectData);
     var value = (parsedData.fieldLabelMapping[i].mapField == "amount")? "NPR " + this.convertAmountValue(Object.values(parsedData.cipsTransactionDetail)[j]) : 
     Object.values(parsedData.cipsTransactionDetail)[j];
            var requiredData1={ 
            "keyOfObject":JSON.parse(res.npiObjectData).fieldLabelMapping[i].fieldLabel + " :",
            "valueOfObject":value.toString()
            };
            resultData.push({
            "property" : requiredData1.keyOfObject,
                "value1" :requiredData1.valueOfObject,
            "value2" : {"isVisible":true}
            });
        }
        }
     }
     this.view.segDetails.setData(resultData);
     this.view.segSuccess.setData(resultData);
    }catch(err){
        kony.print("ConfirmBillPayAutoMerchantSuccess"+err);
    }
   },
  reversalTransaction: function(res){
    try{
        var resultData=[];
        var presenter = applicationManager.getModulesPresentationController({'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule'});
        var amount  = applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
        var fee = applicationManager.getNavigationManager().getCustomInfo("totalFee");
        var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
        var notes =applicationManager.getNavigationManager().getCustomInfo("NotesValue");
        this.view.segDetails.widgetDataMap =this.getWidgetDataMap();
        this.view.segSuccess.widgetDataMap =this.segWidgetDataMap();
        if(!kony.sdk.isNullOrUndefined(res.serverErrorRes)){
        if(res.serverErrorRes.dbpErrCode=="20001"){
        this.view.imgGreenTick.src.src="failed_icon.png";
        this.view.lblSuccessMessage.text=res.serverErrorRes.dbpErrMsg;
        this.view.lblDetails.text =kony.i18n.getLocalizedString("kony.mb.loans.AckMessage");
        this.view.lblToMechantCode.text =kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
                }
             }
            var requiredData ={
            "Reference ID": res.serverErrorRes.referenceId,
            "notes":kony.sdk.isNullOrUndefined(notes)?"NA":notes,
            "fee": (fee != "NA") ? "NPR " + this.convertAmountValue(fee)  : "NA",
            "availableBalance": kony.sdk.isNullOrUndefined(res.serverErrorRes.currencyCode)?"NA":res.serverErrorRes.currencyCode+ " "+this.convertAmountValue(res.serverErrorRes.availableBalance)
            };
            var key ="";
            for(var i=0;i<Object.keys(requiredData).length;i++){
             if(Object.keys(requiredData)[i]=="notes"){
            key= kony.i18n.getLocalizedString("i18n.ChequeBookReq.Notes");
            }else if(Object.keys(requiredData)[i]=="availableBalance"){
            key= kony.i18n.getLocalizedString("i18n.common.availableBalancewithColon");
            }else if(Object.keys(requiredData)[i]=="fee"){
            key= kony.i18n.getLocalizedString("i18n.FeewithColon")
            }else if(Object.keys(requiredData)[i]=="Reference ID"){
              key= kony.i18n.getLocalizedString("i18n.konybb.common.referenceId")
              }
            resultData.push({
            "property" : key,
                "value1" : Object.values(requiredData)[i],
                "value2" : {"isVisible":true}
            });     
            }
        var nofRows = Object.keys(JSON.parse(res.responseFieldMapping)).length;
        for (var i = 0; i < nofRows; i++) {
        for(var j=0;j<Object.keys(res.requestPayload[0]).length;j++){
        if(Object.keys(JSON.parse(res.responseFieldMapping))[i]==Object.keys(res.requestPayload[0])[j]){ 
         var requiredData1={ 
        "keyOfObject":Object.values(JSON.parse(res.responseFieldMapping))[i] + " :",
        "valueOfObject":Object.values(res.requestPayload[0])[j] ? Object.values(res.requestPayload[0])[j] : "NA"
        };
         resultData.push({
            "property" : requiredData1.keyOfObject,
                "value1" :requiredData1.valueOfObject,
            "value2" : {"isVisible":true}
            });

          }
         }
        }
       this.view.segDetails.setData(resultData);
       this.view.segSuccess.setData(resultData);

    }catch(err){
                kony.print("reversalTransaction"+err);
            }
  },
   convertAmountValue: function(amount) {
    return applicationManager.getFormatUtilManager().formatAmount(parseFloat(amount),kony.i18n.getCurrentLocale());
        },
  setupUI: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transferObject = transactionManager.getTransactionObject();
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    if (!kony.sdk.isNullOrUndefined(transferObject.errmsg)){
      this.view.flxConfirmationMain.isVisible = false;
      this.view.flxError.isVisible = true;
      this.view.flxButtons.isVisible = false;
      this.view.lblTitle.text = transferObject.errmsg;
    }
    else {
      if (transferObject.isScheduled === "0")
        this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.PostedTransferMessage");
      else
        this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransferScheduled");
      this.view.flxConfirmationMain.isVisible = true;
      this.view.flxError.isVisible = false;
      this.view.flxButtons.isVisible = true;  
      this.setSegmentData();
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setSegmentData: function() {
    var loansMod = applicationManager.getModulesPresentationController("LoanPayUIModule");
    var segData = loansMod.getAcknowledgementScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    this.view.segDetails.setData(segData);
  },

  getWidgetDataMap: function() {
    var map = {
      lblTitle:"property",
      lblDetails:"value1",
      lblExtras:"value2"
    };
    return map;
  },
  segWidgetDataMap: function(){
    var map={
      lblKey:"property",
      lblValue:"value1",
      flxSeperator:"value2"
    };
    return map;
  },
setFavorite: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var favMerchantList = applicationManager.getNavigationManager().getCustomInfo("favMerchantsList");
    if (favMerchantList.favoriteMerchants.length < 5) {
        var Merchantdata = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
        var billerCode = Merchantdata.code;
        var paymentAggregator = Merchantdata.paymentAggregator;
        Payload = {
            "favoriteMerchant": [{
                "accountNumber": "",
                "payeeNickName": "",
                "companyName": Merchantdata.labelText,
                "isFavoriteMerchant": "true",
                "billerId": billerCode,
                "paymentAggregator": paymentAggregator,
                "logoUrl": Merchantdata.logoUrl
            }]
        }
        var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        presenter.createFavoriteMerchantMB(Payload);
      }else{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        
        //this.view.flxFavourites.setVisibility(true);
      }
  },
  CreateFavMerchantSuccess: function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("i18.addFavSuccess"));
    this.view.btnFavourite.setVisibility(false);
    this.view.btnMakeAnotherPayment.setVisibility(true);
  },
  navBillPayDashboard: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.setBillPayFlow = "onCancel";
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.onCancelClick();
  },
});
