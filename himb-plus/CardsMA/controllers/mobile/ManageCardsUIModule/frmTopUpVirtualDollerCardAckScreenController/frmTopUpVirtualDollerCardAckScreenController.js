
define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    init: function () {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm = currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateToDashboard);
      this.view.onNavigate = this.onNavigate;
    },

    preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
       this.view.flxHeader.isVisible = false;
       this.view.flxMainContainer.top ="5dp";
       }else{
         this.view.flxHeader.isVisible = true;
       this.view.flxMainContainer.top ="58dp";
       }
      this.view.postShow = this.postShow;
      this.setTitleBarVisibility();
      this.dataMapping();
    },

    onNavigate: function (uidata) {
      if (uidata.transferSuccess) {
        this.updateAcknowledgementData(uidata.transferSuccess);
      }
    },
    postShow: function () {
      this.view.btnGoToDashboard.onClick = this.navigateToDashboard;
      this.view.btnGoToCards.onClick = this.navigateToCardsDashboard;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
   mapResponseData: function(response){
    var navManager =applicationManager.getNavigationManager();
   this.view.segCardDetails.widgetDataMap ={
    "lblKey":"lblKey",
    "lblValue":"lblValue"
   };
   var cardData = navManager.getCustomInfo("topUpCardPayload");
   var data =[];
   for(i=0;i<Object.keys(cardData).length;i++){
   data.push({
    "lblKey":{
        "text":Object.keys(cardData)[i]
    },
    "lblValue": {
        "text":Object.values(cardData)[i]
        },
   })
   }
   this.view.segCardDetails.setData(data);
   },
    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
        this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
      }
    },

    dataMapping: function () {
         this.view.lblMainHeader.isVisible = false;
    },

    navigateToDashboard: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
    },
    
    navigateToCardsDashboard: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
    },

    updateAcknowledgementData: function (data) {
      try{
        var resultData =[];
        var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpCardAckData");
        var intraReponse = applicationManager.getNavigationManager().getCustomInfo("intraResponse");
        this.view.lblMessage.text= kony.i18n.getLocalizedString("i18n.payments.transactionSubmitted");
        this.view.lblRequestIdValue.text = intraReponse.referenceId;
        //create a json with data u required(ref BRD and notepad++)and push into array and then set into segment
        var requiredData ={
        "fromAcc": ackData.fromAcc,
        "toAcc": ackData.cCardNumber,
        "topupAmount":ackData.topUpAmount,
        "totalAmount" :intraReponse.totalAmount,
        "exchangeRate":ackData.exchangeRate,
        "remainingLimit": ackData.remainingLimit,
        "notes": ackData.notes
        };
        this.view.segCardDetails.widgetDataMap ={
            "lblKey": "lblKey",
            "lblValue": "lblValue"
        };
        var key ="";
        for(var i=0;i<Object.keys(requiredData).length;i++){
        if(Object.keys(requiredData)[i]=="fromAcc"){
        key= kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
         }else if(Object.keys(requiredData)[i]=="toAcc"){
        key= kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
         }else if(Object.keys(requiredData)[i]=="topupAmount"){
        key= kony.i18n.getLocalizedString("i18n.billPayee.review.amount");
         }else if(Object.keys(requiredData)[i]=="exchangeRate"){
        key= kony.i18n.getLocalizedString("i18n.wealth.exchangeRate");
         }else if(Object.keys(requiredData)[i]=="totalAmount"){
        key= kony.i18n.getLocalizedString("i18n.HBL.Cards.Debit Amount");
         }else if(Object.keys(requiredData)[i]=="remainingLimit"){
        key= kony.i18n.getLocalizedString("i18n.HBL.Cards.RemainingLimit1");
         }else if(Object.keys(requiredData)[i]=="notes"){
       key= kony.i18n.getLocalizedString("kony.mb.chequeManagement.notes");
         }
      resultData.push({
        "lblKey": key,
        "lblValue": Object.values(requiredData)[i]
        })
        }
       this.view.segCardDetails.setData(resultData);

       }catch(err){
        kony.print("updateAcknowledgement"+ err);
      }
    },

    addDataIntoSegment: function () {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        this.view.segCardDetails.rowSkin = "sknSegffffff";
        this.view.segCardDetails.rowFocusSkin = "sknSegffffff";
        this.view.segCardDetails.widgetDataMap = {
          lblKey: "lblKey",
          lblValue: "lblValue"
        };
        this.createViewForDedit();
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    
    createViewForDedit: function () {
      var navManager = applicationManager.getNavigationManager();
      var cardData = navManager.getCustomInfo("formattedCardDetailsForacknowledgment");
      var segmentData = [];
      for (var key in cardData) {
        if (cardData.hasOwnProperty(key)) {
          segmentData.push({
            "lblKey": key,
            "lblValue": cardData[key]
          });
        }
      }
      this.view.segCardDetails.setData(segmentData);
    },
  };
});

