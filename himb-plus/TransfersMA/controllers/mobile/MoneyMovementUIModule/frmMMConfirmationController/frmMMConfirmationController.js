define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    this.setupUI();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    var scope = this;
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    scope.view.btnDashboard.onClick = function (){
      moneyMovementModule.haveLimitsBeenFetched = false;
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName":"AccountsUIModule"});
      accountMod.presentationController.showDashboard();
      
    };
    scope.view.btnNewTransfer.onClick = function () {
      /*var navMan = applicationManager.getNavigationManager();
      //navMan.setEntryPoint("ManageMMFlow","frmMMTransferFromAccount");
      navMan.setEntryPoint("centralmoneymovement","frmDashboardAggregated");
      navMan.setEntryPoint("startFromFlow","frmMMTransferFromAccount");
      moneyMovementModule.clearMMFlowAtributes();
      moneyMovementModule.getFromAndToAccounts();*/
	  try{
	  applicationManager.getPresentationUtility().showLoadingScreen();
	  var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
    var transf = transfMod.transferFlow; 
if(transf =="sameBank"){
        transfMod.transferFlow ="sameBank";
        transfMod.addpayeeFlow ="";
       // transfMod.transferAutoPopulated =true;
        transfMod.getList();
    }else{
transfMod.transferFlow = "domesticBank";
        transfMod.addpayeeFlow ="";
        //transfMod.transferAutoPopulated =false;
        transfMod.getList();
}
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  kony.print("error in navigation"+e);
	  }
    };
    scope.view.btnToAccount.onClick=function(){
     /* moneyMovementModule.haveLimitsBeenFetched = false;
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName":"AccountsUIModule"});
      accountMod.presentationController.showDashboard();*/
	  try{
	  applicationManager.getPresentationUtility().showLoadingScreen();
         var configurationManager = applicationManager.getConfigurationManager();
         const isAccUIModulePresent = configurationManager.isMicroAppPresent('HomepageMA');
            if (isAccUIModulePresent) {
                var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "HomepageMA",
                    moduleName: "AccountsUIModule"
                });
                accMode.presentationController.dashboardService();
                }
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  kony.print("error in navigation"+e);
	  }
    };
  },
  setupUI : function () {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var transactionManager = applicationManager.getTransactionManager();
    var transferObject = transactionManager.getTransactionObject();
    var Ntamount = Number(transferObject.amount).toFixed(2);
    var wamount =  Ntamount.split(".")[0];
    var wdecimal = Ntamount.split(".")[1];
    var maskedFrom = `XXX XXXXXXX ${(transferObject.fromAccountNumber).slice(-4)}`;
    var maskedTo = `XXX XXXXXXX ${(transferObject.toAccountNumber).slice(-4)}`;
    this.view.lblFromAccountName.text =transferObject.fromAccountName;
    this.view.lblFromAccountNumber.text = maskedFrom;
    this.view.lblToAccountName.text =transferObject.toAccountName;
    this.view.lblFromAccountNumber=maskedTo;
    this.view.lblCurrency.text = transferObject.transactionCurrency;
    this.view.lblWholeAmount.text =wamount;
    this.view.lblDecimal.text= "."+wdecimal;
    this.view.lblSuccess1.text = transferObject.message;
    if (!kony.sdk.isNullOrUndefined(transferObject.errmsg)){
      this.view.flxConfirmationMain.isVisible = false;
      this.view.flxMain.isVisible =false;
      this.view.flxFailure.isVisible = true;
      this.view.flxButtons.isVisible = false;
      this.view.lblError.text = transferObject.errmsg;
    }
    else {
      var navigationManager = applicationManager.getNavigationManager();
      var approvalStatus = navigationManager.getCustomInfo("frmMMConfirmation");
      if (approvalStatus && approvalStatus === "Pending") {
        this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ApprovalRequests.TransactionApproval");
      }  
      else {
        if (transferObject.isScheduled === "0")
          this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransferSuccessfully");
        else
          this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransferScheduled");
      }
      this.view.flxConfirmationMain.isVisible = false;
      this.view.flxMain.isVisible =true;
      this.view.flxFailure.isVisible = false;
      this.view.flxButtons.isVisible = true;
      if (moneyMovementModule.isLoansAccountType) {
        this.view.lblSavedRecipient.isVisible = true;
        this.view.lblSavedRecipient.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.AckMessage");
      } else {
        this.view.lblSavedRecipient.isVisible = false;           
      }
      this.setSegmentData();
	  //var navManager = applicationManager.getNavigationManager();
	  //navManager.setEntryPoint("Feedback","frmMMConfirmation");
      //var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeedBackModule");
      //feedbackModule.presentationController.showFeedbackPopup({from : "transaction"});
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setSegmentData : function () {
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var segData = moneyMovementPresentationController.getConfirmationScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    this.view.segDetails.setData(segData);
    this.view.segTransferDetails.rowTemplate="flxSegTransferNew";
    this.view.segTransferDetails.widgetDataMap={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "lblLineSeperator":"lblLineSeperator",
    "flxSegTransferNew":"flxSegTransferNew"
    };
    var payload =[]
    if(segData.length > 0){
    for(i=0;i<segData.length;i++){
    var rowdata={};
    if((segData[i].property ==kony.i18n.getLocalizedString("i18n.transfers.lblTo"))){
	}else if((segData[i].property ==kony.i18n.getLocalizedString("i18n.transfers.lblFrom"))){}
    else{
     payload.push({
    "lblKey":{"text":segData[i].property,"isVisible":true},
    "lblValue":{"text":segData[i].value,"isVisible":true},
    "lblLineSeperator":{"isVisible":true},
    "flxSegTransferNew":{"isVisible":true}
    })
    }
   }
    }
    this.view.segTransferDetails.setData(payload);
  },
  getWidgetDataMap : function () {
    var map = {
      lblTitle:"property",
      lblDetails:"value",
      flxAccountType:"flxAccountType",
      imgAccountType:"imgAccountType"
    }
    return map;
  },
  cancelOnClick : function () {
    var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    moneyMovementModule.cancelCommon();
  },
});