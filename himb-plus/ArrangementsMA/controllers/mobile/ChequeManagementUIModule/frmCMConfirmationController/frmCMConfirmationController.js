define({
  initActions: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    this.view.btnDashboard.onClick=scope.navigateToChequeManagement;
    this.view.btnView.onClick=scope.navigateToCheckbookRequests;
    scope.view.btnToAccount.onClick=function(){
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountUIModule"});
      accountMod.presentationController.showDashboard();
    };
  },
  navigateCustomBack: function() {
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
  preShow:function(){
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    var transferObject=applicationManager.getTransactionManager().getTransactionObject();
    var forUtility = applicationManager.getFormatUtilManager();
    if (!kony.sdk.isNullOrUndefined(transferObject.errmsg)){
      this.view.flxConfirmationMain.isVisible = false;
      this.view.flxFailure.isVisible = true;
      this.view.flxButtons.isVisible = false;
      this.view.lblError.text = transferObject.errmsg;
    }
    else{
      this.view.flxConfirmationMain.isVisible = true;
      this.view.flxFailure.isVisible = false;
      this.view.flxButtons.isVisible = true;
      var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
      var navMan = applicationManager.getNavigationManager();
      var response = navMan.getCustomInfo("frmCMConfirmation");
      if(response){
      if(response.status == "Pending Signatory Approval"){
        this.view.lblSuccessMessage.skin = "sknLblSuccessCheque";
        this.view.lblSuccessMessage.text =  kony.i18n.getLocalizedString("i18n.ChequeBook.Success"); 
      }   
      else if(response.status ==  "Initiated" || response.status == "Request Processed" || response.status ==  "Request Placed" || response.chequeIssueId !== null || response.chequeIssueId !== ""){    
        this.view.lblSuccessMessage.skin = "sknlbl000000SSPSemiBold24px";
        this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString("kony.mb.CM.acknowledgementText");  
      } 
      }
      this.view.flxConfirmationMain = "sknHBLFlxffffffBr1ShadowPxebe6ebRadius16Px";          
      this.view.lblReferenceValue.text=presentation.uniqueChequeIssueIdResponse;
      this.view.lblAccountValue.text=presentation.processedName;
      var today = new Date().toISOString().slice(0,10);
      var chequeleavesCount=applicationManager.getConfigurationManager().NO_OF_CHEQUE_LEAVES;
      var chequeDeliveryType=applicationManager.getNavigationManager().getCustomInfo("DeliveryType");
      var delType;
      if(chequeDeliveryType=="MailingAddress"||!chequeDeliveryType){
        delType="Mailing Address";
      }
      else{
        delType="Self PickUp"
      }
      var trandateobj = forUtility.getDateObjectfromString(today, "YYYY-MM-DD");
      var transactionDate = forUtility.getFormatedDateString(trandateobj, forUtility.getApplicationDateFormat());
      this.view.lblDate.text = transactionDate;
      //this.view.lblNoofCheques.text= kony.i18n.getLocalizedString("kony.mb.CM.book(s)") + " " + "(" + (presentation.leavesCount) + " " + kony.i18n.getLocalizedString("kony.mb.CM.Leaves") + ")";
      this.view.lblNoofCheques.text="1 Book"+ " (" + chequeleavesCount + " " + kony.i18n.getLocalizedString("kony.mb.CM.Leaves") + ")";
      this.view.lblFeeAmount.text=forUtility.formatAmountandAppendCurrencySymbol(presentation.fees,presentation.currencyCode);
      this.view.flxFee.setVisibility(false);
      this.view.lblDeliveryTypeValue.text=delType;
      if(chequeDeliveryType==="SelfPickUp"){
        this.view.flxAddress.isVisible=false;
      }
      else{
        this.view.flxAddress.isVisible=true;
        this.view.lblAddressDetails.text=presentation.address;
      }
	  this.view.flxAddress.setVisibility(false);
      this.view.lblDescription.text = kony.i18n.getLocalizedString("kony.mb.transaction.notes");
      var transactionNotes = presentation.getTransObject().transactionsNotes;
        if (transactionNotes && transactionNotes.trim() !== "") {
            this.view.lblDescriptionValue.text = transactionNotes;
        } else {
            this.view.lblDescriptionValue.text = "-";
        }
      //this.view.lblDescriptionValue.text=presentation.getTransObject().transactionsNotes;
    }
    kony.application.dismissLoadingScreen();
  },
  postShow:function(){

  },
  navigateToChequeManagement:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
   // presentation.commonCancel();
   var transMan = applicationManager.getTransactionManager();
   presentation.deliveryType="";
   transMan.setTransactionAttribute("transactionsNotes", "");
   var controller = applicationManager.getPresentationUtility().getController('frmCMReview', true);
    controller.renderTransactionNOtes();
   var transObj=transMan.getTransactionObject();
   
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "ChequeManagementUIModule/frmChequeManagement"});
  },
  navigateToCheckbookRequests: function(){
    var transMan = applicationManager.getTransactionManager();
	   var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
   presentation.deliveryType="";
   transMan.setTransactionAttribute("transactionsNotes", "");
var controller = applicationManager.getPresentationUtility().getController('frmCMReview', true);
    controller.renderTransactionNOtes();
   var transObj=transMan.getTransactionObject();
	
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "ChequeManagementUIModule/frmChequeManagement"});
  }
});