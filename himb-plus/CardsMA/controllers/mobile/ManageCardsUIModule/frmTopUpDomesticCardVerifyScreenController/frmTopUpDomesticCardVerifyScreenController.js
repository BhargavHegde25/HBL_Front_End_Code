define({ 

preShow: function () {
     if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
       this.view.flxBody.top ="10dp";
       }else{
       this.view.flxBody.top ="58dp";
       this.view.customHeader.flxBack.onClick = this.navBack;
      this.view.customHeader.btnRight.onClick = this.onCancelClick;
       }
       this.view.btnTransfer.onClick = this.flxOnClick;
       applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
postShow: function(){
       var navMan = applicationManager.getNavigationManager();
       var consentDetails = navMan.getCustomInfo("consentDetail");
       this.view.lblAmountValue.text = consentDetails.amountValue;
       this.view.lblCardTypevalues.text = consentDetails.note;
    },
onNavigate: function(uidata){
 try{
        if(uidata.cardData){
        this.setFormFields(uidata.cardData);
        }if(uidata.transferSuccess){
        this.topUpServiceCall(uidata.transferSuccess);
        }if(uidata.serverError){
        this.toastMsg(uidata.serverError);
        }
    }catch(err){
            kony.print("onNavigate"+ err);
        }
    },   
     navBack: function(){
              var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
      
        },        

flxOnClick: function () {
     var navManager = applicationManager.getNavigationManager();
     var data= navManager.getCustomInfo("consentDetail");
     var bankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
     var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
      var currentBankDate = "";
    if (bankDate) {
                currentBankDate = bankDate.currentWorkingDate;
                if (currentBankDate) currentBankDate = currentBankDate + "T00:00:00.000Z";
            }
     var enteredAmount = kony.sdk.isNullOrUndefined(data.amountValue)?0.00:Number(data.amountValue)  
    if(!kony.sdk.isNullOrUndefined(enteredAmount)){
    var roundeAmount = enteredAmount.toFixed(2);
    }
    var fromAcc = presenter.presentationController.accountID;
    var amount = roundeAmount;
    var params ={
                "amount": amount,
                "beneficiaryName": scope_configManager.getCardTopUpPayableAccName(),
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "fromAccountNumber": fromAcc,
                "scheduledDate": currentBankDate,
                "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                "toAccountCurrency": "NPR",
                "toAccountNumber": scope_configManager.getCardTopUpPayableAccNo(),
                "transactionCurrency": "NPR",
                "transactionsNotes": data.note,
                "frequencyEndDate":currentBankDate,
                "frequencyStartDate":currentBankDate,
                "transactionType":"InternalTransfer",
                "validate":"",
                "isScheduled":"0",
                "createWithPaymentId":"true"
    };
    applicationManager.getPresentationUtility().showLoadingScreen();
            presenter.presentationController.intraBankTransferMB(params);

        },
flxBackClick: function () {
             var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmTopUpDomesticCardConsentScreen");
        }, 
  setFormFields: function(cardDatas){
    try{
      var navManager = applicationManager.getNavigationManager();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('ManageCardsUIModule');
     var cardData= navManager.getCustomInfo("consentDetail");
  var cardDetails =navManager.getCustomInfo("cardsDetails");
  this.view.lblAmountInstru.text=cardData.fromAcc;
 this.view.lblPANvalue.text =cardData.toAcc;
 this.view.lblAmountValue.text =cardData.amountValue;
 this.view.lblCardTypevalues.text =cardData.note;
  var fromAcc = presenter.presentationController.accountID;
 var topUpPrepaid ={
    "cCardNumber":cardDetails.pan,
        "mxpAccountNumber":cardDetails.cardId,
         "flow":cardDetails.Card_Category,
         "topUpAmount":this.view.lblAmountValue.text,
         "notes":this.view.lblCardTypevalues.text,
         "fromAcc":fromAcc,
         "transfer":""
 };   
var params ={
        "topupAmou":this.view.lblAmountValue.text,
        "cCardNumber":cardDetails.pan,
        "mxpAccountNumber":cardDetails.cardId,
        "topupCurrency": "NPR"
    };
    navManager.setCustomInfo("topUpCardPayload", params);
      navManager.setCustomInfo("topUpCardAckData",topUpPrepaid);
                
            }catch(err){
                kony.print(""+err);
            }
},
topUpServiceCall: function(response){
try{
     var navManager = applicationManager.getNavigationManager();
        var params = navManager.getCustomInfo("topUpCardPayload");
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.topUpCardMB(params);
            
            }catch(err){
                kony.print(""+err);
            }
},
onCancelClick: function(){
    applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
     var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            manageCardsModule.presentationController.onCancelClick();
},
toastMsg: function(errorMsg){
    var err =errorMsg;
    if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errorMessage.errorMessage);
    }
    else if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errorMessage);
    }else if(!kony.sdk.isNullOrUndefined(err.errmsg)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err.errmsg);
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("kony.mb.10539"));   
    }
    },
 });