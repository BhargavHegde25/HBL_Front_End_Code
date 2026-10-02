define({
  
  isEditLinkedCustomerAvailable : false,
  flowType :"",
  onNavigate: function(uidata) {
    try{
    if(uidata.errorObj){
    //alert("Payment failed. Static data is displayed");
	applicationManager.getPresentationUtility().Alert("Payment failed. Static data is displayed");
   // this.staticData();
    }if(uidata.activation){
        this.flowType ="Activate";
     this.activeFlow();
    }
    if(uidata.mockflow){
      this.flowType ="Manual";
      this.ackPayment();
    }if(uidata.CreateFavMerchantSuccess){
      this.CreateFavMerchantSuccess(uidata.CreateFavMerchantSuccess);
    }
    if(uidata.PaybillAck){
      this.customerBillpaidSuccess(uidata.PaybillAck);
    }
    if(uidata.trasferreversed){
        this.reversalTransaction(uidata.trasferreversed); 
    }
    if(uidata.AutomaticMerchantConfirmBillPayRes){
         this.ConfirmBillPayAutoMerchantSuccess(uidata.AutomaticMerchantConfirmBillPayRes);
    }
//     if (obj === undefined) {
//       return;
//     }
//     if(obj==="view"){
//       this.view.customHeader.btnRight.isVisible = false;
//       this.view.btnPayAPerson.isVisible = false;
//       this.view.btnDeleteRecipient.isVisible = false;
//     }
//     var navMan = applicationManager.getNavigationManager();
//     var payeeData = navMan.getCustomInfo("frmBillPayPayeeDetails");
//     var data = {};
//     data.payeeData = payeeData;
//     var scope = this;
//     var entitlements = {};
//     this.context = data;
//     this.context.hasNavigatedToTNC = false;
//     var userFeatures = applicationManager.getConfigurationManager().getUserFeatures();
//     var userPermission = applicationManager.getConfigurationManager().getUserPermissions();
//     entitlements.features = userFeatures;
//     entitlements.permissions = userPermission;
//     data.entitlement = entitlements;
//     this.view.payeeDetailsNative.setContext(data);
//     this.view.payeeDetailsNative.setParentScope(scope);
//     this.view.payeeDetailsNative.setEntitlements(entitlements);
//     this.view.payeeDetailsNative.onError = this.onError;
//     this.view.quicklinksNative.setParentScopeAndEntitlements(scope, entitlements);
//     this.view.quicklinksNative.onError = this.onError;
//     var cifData = JSON.parse(data.payeeData.cif);
//     if(!kony.sdk.isNullOrUndefined(data.payeeData.cif) && cifData.length === 1){     
//       var coreCustomerIds = cifData[0].coreCustomerId.split(",");
// //       if(coreCustomerIds.length < 2)
// //         this.view.quicklinksNative.setLinkVisibilityToContext("editLinkedIDs");
// //       else
//         this.view.quicklinksNative.setLinkVisibilityToContext("");    
//     } else{
//       this.view.quicklinksNative.setLinkVisibilityToContext("");
//     }
//     if(data.payeeData.eBillStatus === "0"){
//       this.view.quicklinksNative.setContext("Inactive");
//     }else {
//       this.view.quicklinksNative.setContext("Active");
//     } 
    }catch(err){
        kony.print("onNavigate"+ err);
    }   
  },
  
  init : function(){
    try{
    this.view.btnActivateEBill.onClick = this.activateEBilling;
    this.view.btnDeactivateEBill.onClick = this.deactivateEBilling;
    this.view.flxViewAllPayments.onClick = this.viewAllPayments;
    this.view.btnPayBill.onClick = this.payBill;
    this.view.btnViewBill.onClick = this.viewBill;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
   // applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  //this.view.preShow =this.preShow();
    }catch(err){
        kony.print("init"+ err);
    }
  },
  
  preShow: function() {
    try{
    var scope = this;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
//     this.view.flxEditOptions.setVisibility(false);
//     this.setDataToForm();
//     this.setContractDetails();
    this.initActions();
//     this.checkPermissionBasedAccess();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationFormUtility().newDashBoardNavigation(scope);
//     if(this.view.btnDeactivateEBill.isVisible && this.view.btnActivateEBill.isVisible){
//       scope.view.flxMainContainer.bottom = "200dp";
//     }
//     else{
//       scope.view.flxMainContainer.bottom = "140dp";
//     }
    //alert(this.view.flxMainContainer.bottom);
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

    scope.view.flxLinksWrapper.setVisibility(false);
    scope.view.flxHeader.setEnabled(true);
    scope.view.btnBackDashboard.onClick =function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.setBillPayFlow ="onCancel";
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
    }.bind(this);
    scope.view.btnContinue.onClick = function(){
          applicationManager.getPresentationUtility().showLoadingScreen();
                applicationManager.setBillPayFlow = "BillPayFlow";
                var data = {
                    "code": "ALL"
                };
                var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "BillPayMA",
                    "moduleName": "BillPaymentUIModule"
                });
                billPayMod.presentationController.getCategorie(data);
    },
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
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope.view.forceLayout();
    }catch(err){
        kony.print("preShow"+ err);
    }
  },

  activeFlow: function(){
    try{
     this.view.customHeader.flxBack.isVisible=false;
  this.view.flxAck.isVisible =false;
  this.view.flxActivateAck.isVisible =true;

    }catch(err){
        kony.print("activeFlow"+ err);
    } 

  },
  ackPayment: function(){
    try{
    this.view.customHeader.flxBack.isVisible=false;
    this.view.lblTransaction.isVisible = true;
    this.view.flxTransaction.isVisible = true;
    this.view.lblAckHeader.isVisible = true;
    this.view.lblComplete.text = kony.i18n.getLocalizedString("i18n.BillPay.SuccessHeader");
    this.view.lblActiveAck.isVisible = false;
    this.view.flxReference.isVisible = true;
    var presenter = applicationManager.getModulesPresentationController({
      'appName': 'BillPayMA',
      'moduleName': 'BillPaymentUIModule'
  });
  if(presenter.selectedAccountBankDone == true){
    this.view.lblFromAccValue.text= presenter.selectedAccount;
  }




    }catch(err){
      kony.print("ackPayment"+ err);
    }
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
        
        this.view.flxFavourites.setVisibility(true);
      }
  },
  CreateFavMerchantSuccess: function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("i18.addFavSuccess"));
    this.view.btnFavourite.setVisibility(false);
    this.view.btnMakeAnotherPayment.setVisibility(true);
  },
  navBillPayDashboard: function(){
    applicationManager.setBillPayFlow = "onCancel";
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.onCancelClick();
  },
  reversalTransaction: function(res){
    this.view.flxAck.isVisible =true;
  this.view.flxActivateAck.isVisible =false;
  var presenter = applicationManager.getModulesPresentationController({
                            'appName': 'BillPayMA',
                            'moduleName': 'BillPaymentUIModule'
                        });
     this.view.customHeader.flxBack.isVisible =false;
     this.view.lblSuccess.text = kony.i18n.getLocalizedString("i18n.Search.Failed");
     this.view.lblComplete.text = res.dbpErrMsg;
     this.view.imgSuccess.src ="error.png";
  },

  customerBillpaidSuccess: function(res){
    this.view.flxAck.isVisible =true;
  this.view.flxActivateAck.isVisible =false;
    var scope =this;
    var presenter = applicationManager.getModulesPresentationController({
                            'appName': 'BillPayMA',
                            'moduleName': 'BillPaymentUIModule'
                        });
     scope.view.customHeader.flxBack.isVisible =false;
     var notes = applicationManager.getNavigationManager().getCustomInfo("notesBill");
      scope.view.lblSuccess.text = kony.i18n.getLocalizedString("kony.mb.success");
     scope.view.lblComplete.text = kony.i18n.getLocalizedString("kony.mb.loans.PostedTransferMessage"),
     scope.view.imgSuccess.src ="successcup.png";
    var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
    scope.view.lblRefNoValue.text =res.transactionDetails[0].partnerTxnId;
   // scope.view.lblAvailableBalValue ="NPR " + applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
    for (k = 0; k < scope_configManager.userAccounts.length; k++) {
if (presenter.selectedAccountID == scope_configManager.userAccounts[k].account_id) {
          var AvailableBalance = scope_configManager.userAccounts[k].availableBalance;
          var AccDetails =scope_configManager.userAccounts[k];
         scope.view.lblAvailableBalValue.text ="NPR " + AvailableBalance;
          break;
      }
  }
  var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
});
 scope.view.flxTransactionDynamic.removeAll();
  scope.view.lblFromAccValue.text =presenter.selectedAccount;
  scope.view.lblToAccValue.text = merchantInfo.labelText;
  scope.view.lblNotesValue.text =notes;
  if(applicationManager.getNavigationManager().getCustomInfo("totalFee")!="NA"){
  scope.view.lblAmountTopupValue.text ="NPR " +this.convertAmountValue(applicationManager.getNavigationManager().getCustomInfo("totalFee"));
  }else{
    scope.view.lblAmountTopupValue.text ="NA";
  }
   var nofRows;
  var MerchantFieldData = res;
  if (MerchantFieldData) {
    var Info = {};
    Info.paymentAggregator = MerchantFieldData.paymentAggregator;
    if (MerchantFieldData.transactionDetails[0].scno != undefined && MerchantFieldData.transactionDetails[0].scno != "") {
        Info.scNo = MerchantFieldData.transactionDetails[0].scno;
    }
    if (MerchantFieldData.transactionDetails[0].offCode != undefined && MerchantFieldData.transactionDetails[0].offCode != "") {
        Info.counterCode = MerchantFieldData.transactionDetails[0].offCode;
    }
    if (MerchantFieldData.transactionDetails[0].consumerId != undefined && MerchantFieldData.transactionDetails[0].consumerId != "") {
        Info.consumerId = MerchantFieldData.transactionDetails[0].consumerId;
    }
    if (MerchantFieldData.transactionDetails[0].CustomerName != undefined && MerchantFieldData.transactionDetails[0].CustomerName != "") {
        Info.CustomerName = MerchantFieldData.transactionDetails[0].customerName;
    }
    if (MerchantFieldData.transactionDetails[0].paidDate != undefined && MerchantFieldData.transactionDetails[0].paidDate != "") {
        Info.paidDate = MerchantFieldData.transactionDetails[0].paidDate;
    }
  }
  applicationManager.getNavigationManager().setCustomInfo("NEAPrintCode", Info);
  nofRows = Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping)).length;
  for (var i = 0; i < nofRows; i++) {
    for (var j = 0; j < Object.keys(MerchantFieldData.transactionDetails[0]).length; j++) {
        if (Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i] == Object.keys(MerchantFieldData.transactionDetails[0])[j]) {
            // Create a new FlexContainer for each row
            var flexRow = new kony.ui.FlexContainer({
              "id": "flxRowAck" + Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
              "left": "10dp",
              "top": "0dp",
              "width": "100%",
              //         "height": kony.flex.USE_PREFERRED_SIZE,
              //"height": (i==nofRows-1)?"60dp":"20dp",
              "height": "50dp",
              "zIndex": 10,
              "isVisible": true,
              "skin": "slFbox",
              "clipBounds": false,
              "layoutType": kony.flex.FLOW_VERTICAL
          });
          var labelKey = new kony.ui.Label({
            "id": "lblCategoryKeylabeAck" + i,
            "text": Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] + " :",
            "height": kony.flex.USE_PREFERED_SIZE,
            "isVisible": true,
            //"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "width": kony.flex.USE_PREFERED_SIZE,
            "left": "5dp",
            "right": "",
            "top": "10dp",
            "skin": "sknLblHeadingRegular36px",
            "zIndex": 10
        });
        var labelValue = new kony.ui.Label({
          "id": "lblvalueAck" + i,
          "text": Object.values(MerchantFieldData.transactionDetails[0])[j] ? Object.values(MerchantFieldData.transactionDetails[0])[j] : "NA",
          "height": kony.flex.USE_PREFERED_SIZE,
          "isVisible": true,
          "width": kony.flex.USE_PREFERED_SIZE,
          "left": "5dp",
          //"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "right": "",
          "top": "10dp",
          "skin": "sknLblHeadingRegular36px",
          "zIndex": 10  
      });
      flexRow.add(labelKey);
     flexRow.add(labelValue);
      scope.view.flxTransactionDynamic.add(flexRow);
              }
            }
            }
       var flxHeight =this.view.flxTransactionDynamic.widgets().length;
       flxHeight = flxHeight*50;
      flxHeight = flxHeight+20;
      var toHeight = flxHeight.toString();
      var flxTransactionHeight =flxHeight +250;
      var flxToheight = flxTransactionHeight.toString();
      this.view.flxTransactionDynamic.height = toHeight+"dp";
       this.view.flxTransaction.height =flxToheight+"dp";

            },
   
   ConfirmBillPayAutoMerchantSuccess: function(response){
    var scope =this;
   this.view.flxAck.isVisible =true;
  this.view.flxActivateAck.isVisible =false;
    var scope =this;
    var presenter = applicationManager.getModulesPresentationController({
                            'appName': 'BillPayMA',
                            'moduleName': 'BillPaymentUIModule'
                        });
     scope.view.customHeader.flxBack.isVisible =false;
     var notes = applicationManager.getNavigationManager().getCustomInfo("notesBill");
      scope.view.lblSuccess.text = kony.i18n.getLocalizedString("kony.mb.success");
     scope.view.lblComplete.text = kony.i18n.getLocalizedString("kony.mb.loans.PostedTransferMessage"),
     scope.view.imgSuccess.src ="successcup.png";
    var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
    for (k = 0; k < scope_configManager.userAccounts.length; k++) {
if (presenter.selectedAccountID == scope_configManager.userAccounts[k].account_id) {
          var AvailableBalance = scope_configManager.userAccounts[k].availableBalance;
          var AccDetails =scope_configManager.userAccounts[k];
         scope.view.lblAvailableBalValue.text ="NPR " + AvailableBalance;
          break;
      }
  }
   scope.view.lblRefNoValue.text=response.referenceId ? response.referenceId : "NA";
   scope.view.lblFromAccValue.text =presenter.selectedAccount;
  scope.view.lblToAccValue.text = merchantInfo.labelText;
  scope.view.lblNotesValue.text =notes;
  scope.view.lblAvailableBalValue.text =response.currencyCode+" "+scope.convertAmountValue(response.availableBalance);
    var res = applicationManager.getNavigationManager().getCustomInfo("WebViewRes");
    scope.view.flxTransactionDynamic.removeAll();
  var nofRows = JSON.parse(res.npiObjectData).fieldLabelMapping.length;
  for (var i = 0; i < nofRows; i++) {
                for (var j = 0; j < Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length; j++) {
                    if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]) {
    var flexRowAuto = new kony.ui.FlexContainer({
              "id": "flxRowWebView" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
              "left": "10dp",
              "top": "0dp",
              "width": "100%",
              //         "height": kony.flex.USE_PREFERRED_SIZE,
              //"height": (i==nofRows-1)?"60dp":"20dp",
              "height": "58dp",
              "zIndex": 10,
              "isVisible": true,
              "skin": "slFbox",
              "clipBounds": false,
              "layoutType": kony.flex.FLOW_VERTICAL
          });
          var labelKeyAuto = new kony.ui.Label({
            "id": "lblCategoryKey" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
            "text": JSON.parse(res.npiObjectData).fieldLabelMapping[i].fieldLabel + " :",
            "height": kony.flex.USE_PREFERED_SIZE,
            "isVisible": true,
            //"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "width": kony.flex.USE_PREFERED_SIZE,
            "left": "5dp",
            "right": "",
            "top": "10dp",
            "skin": "sknLblHeadingRegular36px",
            "zIndex": 10
        });
         if(JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField=="amount"){
                            var value="NPR " +this.convertAmountValue(Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]);
                        }else{
                        var value=Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j];
                        }
        var labelValueAuto = new kony.ui.Label({
          "id": "lblvalue" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
          "text": value.toString(),
          "height": kony.flex.USE_PREFERED_SIZE,
          "isVisible": true,
          "width": kony.flex.USE_PREFERED_SIZE,
          "left": "5dp",
          //"contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "right": "",
          "top": "5dp",
          "skin": "sknLblHeadingRegular36px",
          "zIndex": 10  
      });
      flexRowAuto.add(labelKeyAuto);
     flexRowAuto.add(labelValueAuto);
      scope.view.flxTransactionDynamic.add(flexRowAuto);
              }
            }
            }
    var flxHeightAuto =this.view.flxTransactionDynamic.widgets().length;
       flxHeightAuto = flxHeightAuto*50;
      flxHeightAuto = flxHeightAuto+20;
      var toHeightAuto = flxHeightAuto.toString();
      var flxTransactionHeightAuto =flxHeightAuto +250;
      var flxToheightAuto = flxTransactionHeightAuto.toString();
      this.view.flxTransactionDynamic.height = toHeightAuto+"dp";
       this.view.flxTransaction.height =flxToheightAuto+"dp";   
var Info=applicationManager.getNavigationManager().getCustomInfo("debitInformation");
if(Info.fee!="NA"){
scope.view.lblAmountTopupValue.text="NPR " +this.convertAmountValue(Info.fee.toString());
}else{
scope.view.lblAmountTopupValue.text="NA"
}

   },
  

   convertAmountValue: function(amount) {
         return applicationManager.getFormatUtilManager().formatAmount(parseFloat(amount),kony.i18n.getCurrentLocale());
        },
  checkPermissionBasedAccess : function(){
    var configManager = applicationManager.getConfigurationManager();
    var self = this;
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var payeeData=billPayMod.presentationController.getPayeeDetails();
    var createPayPermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE");
    var activatePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_ACTIVATE_OR_DEACTIVATE_EBILL");
    var deactivatePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_ACTIVATE_OR_DEACTIVATE_EBILL");
    var deletePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_DELETE_PAYEES");
    var createOrEditPayeePermission = applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE_PAYEES");
    var isRetailBankingUser = applicationManager.getConfigurationManager().isRBUser === "true";

    self.view.btnPayAPerson.isVisible = createPayPermission;
    self.view.btnActivateEBill.isVisible = activatePermission && (payeeData.eBillStatus === "0");
    self.view.btnDeactivateEBill.isVisible = deactivatePermission && (payeeData.eBillStatus === "1");
    self.view.btnDeleteRecipient.isVisible = deletePermission;
    self.view.customHeader.btnRight.isVisible = isRetailBankingUser || createOrEditPayeePermission;
    if(applicationManager.getDeviceUtilManager().isIPhone() && !(isRetailBankingUser || createOrEditPayeePermission)) {
      var rightBarButtonItem = new kony.ui.BarButtonItem({
        type: configManager.constants.BAR_BUTTON_TITLE,
        style: configManager.constants.BAR_ITEM_STYLE_PLAIN,
        enabled: true,
        tintColor: "FFFFFF00",
        metaData: {
          title: " "
        }
      });
      this.view.setRightBarButtonItems({
        items: [rightBarButtonItem],
        animated: true
      });      
    }
  },
  
  viewBill:function(){
    var navMan = applicationManager.getNavigationManager();
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var billPayeeData = navMan.getCustomInfo("frmBillPayPayeeDetails");
    billPayMod.presentationController.viewBill(billPayeeData[0].ebillURL);
  },
  
  payBill:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.navAfterSelectPayee(this.context.payeeData);
  },
  
  initActions: function() {
    var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
      //var navMan=applicationManager.getNavigationManager();
      //navMan.goBack();
    };
    //this.view.customHeader.btnRight.onClick = function() {
      //scope.showQuickLinks();
//       if(scope.isEditLinkedCustomerAvailable){
//         scope.view.btnEditLinkedRecipient.setVisibility(true);
//         scope.view.lblSeperatorPopUpLinkedRecipient.setVisibility(true);
//       }
//       else{
//         scope.view.btnEditLinkedRecipient.setVisibility(false);
//         scope.view.lblSeperatorPopUpLinkedRecipient.setVisibility(false);
//       }
//       scope.view.flxEditOptions.isVisible = true;
    //};
    /*
    this.view.flxEditOptions.onClick = function(){
      scope.view.flxEditOptions.setVisibility(false);
    };
    this.view.btnEditPayeeAddress.onClick = this.editAddress;
    this.view.btnEditNickName.onClick = this.editNickName;
    this.view.btnEditLinkedRecipient.onClick = function(){
      scope.view.flxEditOptions.setVisibility(false);
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("contracts",navManager.getCurrentForm());
      billPayMod.presentationController.setFlowType("editBillPay");
      //billPayMod.presentationController.navToContractDetails();
      billPayMod.presentationController.commonFunctionForNavigation("frmContracts");
    };
    this.view.btnDeleteRecipient.onClick = function(){
      var basicConfig={
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "yesLabel":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
        "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
        "message":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.billpay.deletePayeeMessage","Do you want to delete the payee"),
        "alertHandler": scope.confirmDelete
      };
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
    };
    this.view.btnPayAPerson.onClick = function(){
      scope.view.flxEditOptions.isVisible = false;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      //           var navManager = applicationManager.getNavigationManager();
      //           navManager. setEntryPoint("BillPayPayee","frmBillPayPayeeDetails");
      //         billPayMod.presentationController.setFlowType("editBillPay");
      var navMan=applicationManager.getNavigationManager();
      navMan.setEntryPoint("payBill","frmBillPayPayeeDetails");
      var payeeData=billPayMod.presentationController.getPayeeDetails();
      billPayMod.presentationController.navAfterSelectPayee(payeeData);
    }; */
  },
  
  editNickName: function() {
    var scope = this;
    scope.view.flxEditOptions.setVisibility(false);
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var navManager = applicationManager.getNavigationManager();
    var payeeData = navManager.getCustomInfo("frmBillPayPayeeDetails");
    navManager.setEntryPoint("editBillPayPayee","frmBillPayPayeeDetails");
    billPayMod.presentationController.setFlowType("editBillPay")
    payeeData["flowType"] = "EDIT";
    navManager.navigateTo("frmBillPayEditNickName", false, payeeData);
  },
  
  editLinkedIDs: function() {
    var scope = this;
    scope.view.flxEditOptions.setVisibility(false);
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var navManager = applicationManager.getNavigationManager();
    var payeeData = navManager.getCustomInfo("frmBillPayPayeeDetails");
    navManager.setEntryPoint("editBillPayPayee","frmBillPayPayeeDetails");
    billPayMod.presentationController.setFlowType("editBillPay")
    payeeData["flowType"] = "EDIT";
    navManager.navigateTo("frmBillPayLinkPayee", false, payeeData);
  },
  
  editAddress: function() {
    var scope = this;
    scope.view.flxEditOptions.setVisibility(false);
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var navManager = applicationManager.getNavigationManager();
    var payeeData = navManager.getCustomInfo("frmBillPayPayeeDetails");
    navManager.setEntryPoint("editBillPayPayee","frmBillPayPayeeDetails");
    billPayMod.presentationController.setFlowType("editBillPay");
    payeeData["flowType"] = "EDIT";
    payeeData["isSearchFlow"] = false;
    if(payeeData.hasOwnProperty('addressLine1')){
      payeeData['street'] = payeeData['addressLine1'];
    }
    if(payeeData.hasOwnProperty('country')){
      payeeData['countryName'] = payeeData['country'];
    }
    navManager.navigateTo("frmBillPayEditPayeeAddress", false, payeeData);
  //  billPayMod.presentationController.commonFunctionForNavigation("frmBillPayEditAddress");
  },
  
  onClickEdit: function(){
    if(applicationManager.getDeviceUtilManager().isIPhone()) {
      var actionSheetObject = new kony.ui.ActionSheet(
        {
          "title":null,
          "message":null,
          "showCompletionCallback": null
        }
      );
      applicationManager.actionSheetObject=actionSheetObject;
      var actionEditPayeeAddress = new kony.ui.ActionItem(
        {
          "title":kony.i18n.getLocalizedString("kony.mb.BillPay.EditPayeeAddress"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnEditPayeeAddress.onClick
        }
      );
      var actionEditNickName = new kony.ui.ActionItem(
        {
          "title":kony.i18n.getLocalizedString("kony.mb.BillPay.EditNickName"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnEditNickName.onClick
        }
      );
      var actionEditLinkRecipient = new kony.ui.ActionItem(
        {
          "title":kony.i18n.getLocalizedString("i18n.payments.editLinkRecipient"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnEditLinkedRecipient.onClick
        }
      );
      var actionCancel = new kony.ui.ActionItem(
        {
          "title":kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel"),
          "style":constants.ACTION_ITEM_STYLE_CANCEL,
          "action": null
        }
      );
      actionSheetObject.addAction(actionEditPayeeAddress);
      actionSheetObject.addAction(actionEditNickName);
      if(this.isEditLinkedCustomerAvailable)
        actionSheetObject.addAction(actionEditLinkRecipient);
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }
    else {
      if(this.isEditLinkedCustomerAvailable){
        this.view.btnEditLinkedRecipient.setVisibility(true);
        this.view.lblSeperatorPopUpLinkedRecipient.setVisibility(true);
      }
      else{
        this.view.btnEditLinkedRecipient.setVisibility(false);
        this.view.lblSeperatorPopUpLinkedRecipient.setVisibility(false);
      }
      this.view.flxEditOptions.setVisibility(true);
      this.view.flxMainContainer.setEnabled(false);
    }
  },
  
  activateEBilling:function(){
    var basicConfig={
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Areyousuredoyouwanttoactivatee-bill"),
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      "alertHandler": this.activeBill
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
  },
  
  deactivateEBilling:function(){
    var basicConfig={
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Areyousuredoyouwanttode-activatee-bill"),
      "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      "alertHandler": this.deactiveBill
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
  },
  
  activeBill:function(response){
    if(response===true){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var scope = this;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var payeeData=billPayMod.presentationController.getPayeeDetails();
      payeeData.EBillEnable = "1";
      billPayMod.presentationController.updateEBillStatus(payeeData,true);
    } else{
      kony.print("don't delete");
    }
  },
  
  activeEbillStatus:function(){
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var billPayeeData = navMan.getCustomInfo("frmBillPayPayeeDetails");
    if(billPayeeData && billPayeeData.length !==0)
    {
      scope.view.lblAmount.text=billPayeeData[0].dueAmount;
      scope.view.lblDueDateValue.text=billPayeeData[0].billDueDate;
      scope.view.lblLastPaymentDate.text=billPayeeData[0].paidDate;
      scope.view.lblLastPaymentAmount.text=billPayeeData[0].paidAmount;
      scope.view.flxUpcommingBillDetails.setVisibility(true);
      scope.view.btnPayAPerson.setVisibility(false);
    }
    else{
      scope.view.flxUpcommingBillDetails.setVisibility(false);
      scope.view.btnPayAPerson.setVisibility(true);
    }
    scope.view.imgebill.src = "ebill.png";
    scope.view.lbleBillStatusValue.text = kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE");
    scope.view.btnActivateEBill.setVisibility(false);
    scope.view.btnDeactivateEBill.setVisibility(true);
    // scope.view.flxMainContainer.bottom = "190dp";
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.showEBillToastMessage(true);
  },
  
  deactiveBill:function(response){
    if(response===true){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var scope = this;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var payeeData=billPayMod.presentationController.getPayeeDetails();
      payeeData.EBillEnable = "0";
      billPayMod.presentationController.updateEBillStatus(payeeData,false);
    } else{
      kony.print("don't delete");
    }
  },
  
  deactiveEbillStatus:function(){
    var scope = this;
    scope.view.imgebill.src = "ebillinactive.png";
    scope.view.lbleBillStatusValue.text = kony.i18n.getLocalizedString("i18n.CardManagement.inactive");
    scope.view.btnActivateEBill.setVisibility(true);
    //  scope.view.flxMainContainer.bottom = "190dp";
    scope.view.btnDeactivateEBill.setVisibility(false);
    scope.view.flxUpcommingBillDetails.setVisibility(false);
    scope.view.btnPayAPerson.setVisibility(true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.showEBillToastMessage(false);
  },
  
  showEBillToastMessage : function(res){
    if(res ===true){
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ebill.EBillActivatedSuccessfully"));
    }
    else{
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ebill.EBillDe-activatedSuccessfully"));
    }
  },
  
  setDataToForm:function(){
    var scope=this;
    var configManager = applicationManager.getConfigurationManager();
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var payeeData=billPayMod.presentationController.getPayeeDetails();
    scope.view.lblLinkedWithValue.text = payeeData.noOfCustomersLinked + " " + kony.i18n.getLocalizedString('i18n.payments.customersID');
    if (configManager.isCombinedUser === "true") {
      scope.view.flxAccountType.isVisible = true;
      scope.view.imgAccountType.src = (payeeData.isBusinessPayee === "0" ) ? "personalaccount.png" : "businessaccount.png";
    }
    if(payeeData.payeeName){
      scope.view.lblPayeeFullNameValue.text=payeeData.payeeName;
    }
    if(payeeData.accountNumber){
      var accnum=payeeData.accountNumber;
      scope.view.lblAccountNumberValue.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accnum);
    }
    else if(payeeData.accountNumber==="" || payeeData.accountNumber===null || payeeData.accountNumber===undefined){
      scope.view.lblAccountNumberValue.text= kony.i18n.getLocalizedString("kony.tab.billpay.notAvailable");
    }
    if(payeeData.nameOnBill){
      scope.view.lblNameOnBillValue.text=payeeData.nameOnBill;
    }
    else
    {
      scope.view.lblNameOnBillValue.text = "";
    }
    if(payeeData.payeeNickName){
      scope.view.lblNickNameValue.text=payeeData.payeeNickName;
    }
    if(payeeData.street || payeeData.addressLine2 || payeeData.cityName|| payeeData.zipCode || payeeData.state ){
      var address="";
      if(payeeData.addressLine1){
        address=address+payeeData.addressLine1+",";
      }
      if(payeeData.street){
        address=address+payeeData.street+",";
      }
      if(payeeData.addressLine2){
        address=address+payeeData.addressLine2+",";
      }
      if(payeeData.cityName){
        address=address+payeeData.cityName+",";
      }
      if(payeeData.state){
        address=address+payeeData.state+",";
      }
      if(payeeData.zipCode){
        address=address+payeeData.zipCode;
      }
      scope.view.lblPayeeAddressValue.text=address;
    }
    if(payeeData.eBillSupport === "true"){
      if(payeeData.eBillStatus === "0"){
        scope.view.imgebill.setVisibility(true);
        scope.view.imgebill.src = "ebillinactive.png";
        scope.view.lbleBillStatusValue.text = kony.i18n.getLocalizedString("i18n.CardManagement.inactive");
        scope.view.btnActivateEBill.setVisibility(true);
        // scope.view.flxMainContainer.bottom = "190dp";
        scope.view.btnPayAPerson.setVisibility(true);
        scope.view.flxUpcommingBillDetails.setVisibility(false);
        scope.view.btnDeactivateEBill.setVisibility(false);
      }
      else{
        var navMan = applicationManager.getNavigationManager();
        var billPayeeData = navMan.getCustomInfo("frmBillPayPayeeDetails");
        if(billPayeeData && billPayeeData.length !== 0)
        {
          scope.view.lblAmount.text=billPayeeData[0].dueAmount;
          scope.view.lblDueDateValue.text=billPayeeData[0].billDueDate;
          scope.view.lblLastPaymentDate.text=billPayeeData[0].paidDate;
          scope.view.lblLastPaymentAmount.text=billPayeeData[0].paidAmount;
          scope.view.flxUpcommingBillDetails.setVisibility(true);
          scope.view.btnPayAPerson.setVisibility(false);
        }
        else{
          scope.view.flxUpcommingBillDetails.setVisibility(false);
          scope.view.btnPayAPerson.setVisibility(true);
        }
        scope.view.imgebill.setVisibility(true);
        scope.view.imgebill.src = "ebill.png";
        scope.view.lbleBillStatusValue.text = kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE");
        scope.view.btnActivateEBill.setVisibility(false);
        scope.view.btnDeactivateEBill.setVisibility(true);
        //  scope.view.flxMainContainer.bottom = "190dp";
      }
    }
    else{
      scope.view.imgebill.setVisibility(false);
      scope.view.lbleBillStatusValue.text = kony.i18n.getLocalizedString("kony.tab.billpay.notAvailable");
      scope.view.btnActivateEBill.setVisibility(false);
      scope.view.btnPayAPerson.setVisibility(true);
      scope.view.flxUpcommingBillDetails.setVisibility(false);
      scope.view.btnDeactivateEBill.setVisibility(false);
    }
  },
  
  confirmDelete:function(response){
    if(response===true){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      billPayMod.presentationController.deleteBillPayPayee();
    } else{
      kony.print("don't delete");
    }
  },
  
  bindGenericError : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  
  viewAllPayments:function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var payeeData=billPayMod.presentationController.getPayeeDetails();
    var navMan = applicationManager.getNavigationManager();
    var billPayeeData = navMan.getCustomInfo("frmBillPayPayeeDetails");
	if(payeeData.payeeId !== null && payeeData.payeeId !== undefined){
    billPayeeData.payeeId = payeeData.payeeId;
	}
    navMan.setCustomInfo("frmBillPayAllPayments",billPayeeData);
    billPayMod.presentationController.viewallPayments(billPayeeData);
  },
  
  showErrorPopup: function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  },
  
  setContractDetails:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("contracts","frmBillPayPayeeDetails");
    billPayMod.presentationController.setFlowType("editBillPay");
    billPayMod.presentationController.getContractDetails("BILL_PAY_CREATE_PAYEES");
  },
  
  hideQuickLinks: function(){
    this.view.flxLinksWrapper.setVisibility(false);
    this.view.flxHeader.setEnabled(true);
    this.view.forceLayout();
  },
  
  showQuickLinks: function(){
    this.view.flxLinksWrapper.setVisibility(true);
    this.view.flxHeader.setEnabled(false);
    this.view.quicklinksNative.showContextualActions();
    this.view.forceLayout();
  },
  
  viewActivity: function(data){
   kony.print("viewActivity is clicked");
  },
  
  showDeletePopup: function(responseData,index){
    var scope = this;
    scope.view.flxLinksWrapper.setVisibility(false);
    var basicConfig = {
      message: kony.i18n.getLocalizedString('kony.mb.common.deleteRecipient'),
      alertIcon:null,
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      yesLabel: kony.i18n.getLocalizedString('kony.tab.common.Yes'),
      noLabel: kony.i18n.getLocalizedString('kony.mb.common.No'),
      alertHandler: scope.deletePayee.bind(scope)
    };
    var pspConfig = {};
    //kony.ui.Alert(basicConfig, pspConfig);
	applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig);
  },

  deletePayee: function(response){
    if(response === true){
      var deleteJSON = {};
      deleteJSON["deletePayee"] = this.context.payeeData;
      applicationManager.getNavigationManager().setCustomInfo("frmBillPayAllPayees", deleteJSON);
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
  },

  onError: function(err) {
   kony.print(JSON.stringify(err));
  },

  activateEBill: function() {
    applicationManager.getNavigationManager().setCustomInfo("frmBillPayLiteActivation", this.context);
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.commonFunctionForNavigation("frmBillPayLiteActivation");
  },
    showDeActivatePopup: function(){
    var scope = this;
    scope.view.flxLinksWrapper.setVisibility(false);
    var basicConfig = {
      message: kony.i18n.getLocalizedString('i18n.payments.deactivatePopupMsg'),
      alertIcon:null,
      alertType: constants.ALERT_TYPE_CONFIRMATION,
      yesLabel:kony.i18n.getLocalizedString('kony.tab.common.Yes'),
      noLabel: kony.i18n.getLocalizedString('kony.mb.common.No'),
      alertHandler: scope.deActivateEBill.bind(scope)
    };
    var pspConfig = {};
    //kony.ui.Alert(basicConfig, pspConfig);
	applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig);
  },

  deActivateEBill: function(response){
	 if(response === true){  
    var scope = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var criteria = {
      "payeeId": this.context.payeeData.payeeId,
      "EBillEnable": 0
    }
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.updateEBill(criteria, function(){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope.context["isDeactivateBill"] = true;      
      applicationManager.getNavigationManager().setCustomInfo("frmBillPayAllPayees", scope.context);
      var navMan=applicationManager.getNavigationManager();     
      navMan.goBack();
    }, this.onError);
  }
  }  
});