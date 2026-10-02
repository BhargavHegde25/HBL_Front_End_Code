
define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
  return {
    response:"",
    init: function () {
      var scope = this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm = currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateToDashboard);
      this.view.onNavigate = this.onNavigate;
    },

    preShow: function () {
      this.view.postShow = this.postShow;
      this.setTitleBarVisibility();
      this.view.btnGoToDashboard.onClick = this.navigateToDashboard;
      this.view.btnGoToCards.onClick = this.navigateToCardsDashboard;
      this.view.btnGoToCardss.onClick = this.navigateToTransferActivity;
      this.view.btnGoToDashboards.onClick = this.navigateToCardsDashboard;
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      //this.dataMapping();
    },

    onNavigate: function (uidata) {
      try{
      if (uidata.hasOwnProperty("applyCards") && !kony.sdk.isNullOrUndefined(uidata.applyCards)) {
        this.response = uidata.applyCards;
        this.updateAcknowledgementData(uidata.applyCards);
      }else if (uidata.hasOwnProperty("transferSuccess") && uidata.transferSuccess) {
        this.updateAcknowledgementDatas(uidata.transferSuccess);
      }else if (uidata.hasOwnProperty("emiSuccess") && uidata.emiSuccess) {
        this.updateEmiAckData(uidata.emiSuccess);
      }
      }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("onNavigate"+ err);
      }
    },
    postShow: function () {
      this.view.btnGoToDashboard.onClick = this.navigateToDashboard;
      this.view.btnGoToCards.onClick = this.navigateToCardsDashboard;
      this.view.btnGoToCardss.onClick = this.navigateToTransferActivity;
      this.view.btnGoToDashboards.onClick = this.navigateToCardsDashboard;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    setTitleBarVisibility : function () {
      try {
      var navMan = applicationManager.getNavigationManager();
      var flow = navMan.getCustomInfo("cardSelectionType");
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        if (flow === "debitCard") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
        } else if (flow === "physicalPrepaidCard") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
        }  else if (flow === "virtualPrepaidCard") {
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
        }else if(flow == "TopUpCards"){
           this.view.customHeader.lblLocateUs.text =  kony.i18n.getLocalizedString("i18n.hamburger.transfer");
        }
        this.view.flxHeader.isVisible = true;
      } else {
        if (flow === "debitCard") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestDebitCard");
        } else if (flow === "physicalPrepaidCard") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.RequestPrepaidCard");
        } else if (flow === "virtualPrepaidCard") {
            this.view.title = kony.i18n.getLocalizedString("18n.HBL.Cards.RequestVirtualCard");
        }else if(flow == "TopUpCards"){
           this.view.title =  kony.i18n.getLocalizedString("i18n.hamburger.transfer");
        }
          //this.view.flxHeader.isVisible = false;
          this.view.flxMainContainer.top = "0dp";
        }
      } catch (err) {
        kony.print(err)
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
        applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({ "appName": "CardsMA", "friendlyName": "ManageCardsUIModule/frmCardManageHome"}); 
    },
    navigateToTransferActivity: function(){
        try{
            applicationManager.getNavigationManager().setCustomInfo("fromAccFlag", null);
         var navMan = applicationManager.getNavigationManager();
        var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
          moneyMovementModule.clearMMFlowAtributes();
          navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "MoneyMovementUIModule/frmTransferActivitiesTransfers"});
        }catch(err){
        kony.print("navigateToTransferActivity"+err)
        }
    },
   updateAcknowledgementData: function (data) {
        this.view.flxBtnCards.isVisible =true;
        this.view.flxBtnCardss.isVisible = false;
      if ((data !== null) && (data !== "") && (data !== undefined)) {
        var response = data;
        this.view.lblRequestIdValue.text = response.ReferenceNumber;
        this.view.rtxSuccessMsg.text= kony.i18n.getLocalizedString("i18n.HBL.Cards.Ack2");
      }
      this.addDataIntoSegment();
    },

    updateEmiAckData: function () {
      try{
      var navManager = applicationManager.getNavigationManager();
      var cardData = navManager.getCustomInfo("cardConvertEmiDataAck");
      var emiFlow = navManager.getCustomInfo("emiFLow");
      var emiData = navManager.getCustomInfo("updatedEmiData");
      navManager.setCustomInfo("cardConvertEmiDataAck", "");
      navManager.setCustomInfo("emiFLow", "");
      navManager.setCustomInfo("updatedEmiData", "");
        
      this.view.flxBtnCards.isVisible = true;
      this.view.flxBtnCardss.isVisible = false;

      this.view.lblRequestIdValue.text = emiData.referenceNumber;
      this.view.rtxSuccessMsg.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.Ack2");


      this.view.segCardDetails.rowSkin = "sknSegffffff";
      this.view.segCardDetails.rowFocusSkin = "sknSegffffff";
      this.view.segCardDetails.widgetDataMap = {
        lblKey: "lblKey",
        lblValue: "lblValue"
      };
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        if (emiFlow === "isConvertEmiFlow") {
          this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
        }
      } else {
        if (emiFlow === "isConvertEmiFlow") {
          this.view.title = kony.i18n.getLocalizedString("i18n.HBL.Cards.ConvertToEMI");
        }
      }

      if (emiFlow === "isConvertEmiFlow") {
        this.view.lblMessage.text = kony.i18n.getLocalizedString("kony.i18n.convertToEmiAck1")
          + emiData.formattedAmount + " on "
          + emiData.formattedPostingDate + kony.i18n.getLocalizedString("kony.i18n.convertToEmiAck2");
      }

      this.view.lblAccountName.text = emiData.cardHolderName;
      this.view.lblAccNo.text = emiData.maskedCardNumber;

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
    }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("updateEmiAckData"+ err);
      }
    },
   updateAcknowledgementDatas: function (data) {
      try{
        this.view.flxBtnCards.isVisible =false;
        this.view.flxBtnCardss.isVisible = true;
        var resultData =[];
        var ackData =applicationManager.getNavigationManager().getCustomInfo("topUpCardAckData");
        var intraReponse = applicationManager.getNavigationManager().getCustomInfo("intraResponse");
        this.view.rtxSuccessMsg.text= kony.i18n.getLocalizedString("i18n.BillPay.SuccessHeader");
        this.view.lblRequestIdValue.text = intraReponse.referenceId;
        //create a json with data u required(ref BRD and notepad++)and push into array and then set into segment
        var requiredData ={
        "fromAcc": ackData.fromAcc,
        "toAcc": ackData.cCardNumber,
        "topupAmount":ackData.topUpAmount,
        "totalAmount" :intraReponse.debitAmount,
        "exchangeRate":(kony.sdk.isNullOrUndefined(ackData.exchangeRate)?"NA":ackData.exchangeRate),
        "remainingLimit": (kony.sdk.isNullOrUndefined(ackData.remainingLimit)?"NA":ackData.remainingLimit),
        "notes": ackData.notes
        };
        this.view.segCardDetails.rowSkin = "sknSegffffff";
        this.view.segCardDetails.rowFocusSkin = "sknSegffffff";
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
         if(Object.values(requiredData)[i]!="NA"){
      resultData.push({
        "lblKey": key,
        "lblValue": Object.values(requiredData)[i]
        })
         }
        }
       this.view.segCardDetails.setData(resultData);

       }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("updateAcknowledgementDatas"+ err);
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
      try{
      var navManager = applicationManager.getNavigationManager();
      let clientProperties = CommonUtilities.CLIENT_PROPERTIES;
      if (Object.keys(clientProperties).length > 0) {
        if (!kony.sdk.isNullOrUndefined(clientProperties)) {
          var cardEstimatedTime = clientProperties.CARD_ESTIMATED_TIME;
          if (!kony.sdk.isNullOrUndefined(cardEstimatedTime)) {
            var estimatedTime = cardEstimatedTime;
          }
        }
      }
      var cardData = navManager.getCustomInfo("formattedCardDetailsForacknowledgment");
      let flow = navManager.getCustomInfo("cardSelectionType");
        if (flow === "debitCard") {
        if (!kony.sdk.isNullOrUndefined(estimatedTime)) {
          this.view.rtxSuccessMsg.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage").replace("X", estimatedTime);
        }
      } else if (flow === "physicalPrepaidCard") {
        if (!kony.sdk.isNullOrUndefined(estimatedTime)) {
          this.view.rtxSuccessMsg.text = kony.i18n.getLocalizedString("i18n.CardManagement.receivemessage").replace("X", estimatedTime);
        }
      } else if (flow === "virtualPrepaidCard") {
        this.view.rtxSuccessMsg.text = kony.i18n.getLocalizedString("i18n.HBL.Cards.virtualCardAcknowledgment");
      }
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
     }catch(err){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.enroll.SomethingWrong"));
        kony.print("onNavigate"+ err);
      }
    },
  };
});

