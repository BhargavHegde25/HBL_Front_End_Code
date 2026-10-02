define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
  var navManager = applicationManager.getNavigationManager();
   this.frmAccName;
  return{
    isEditLinkedCustomerAvailable : false,
dataToPush : {},
    arr1:[],
     NEACustomerResponseMapFields: new Map([
            ["customername", "Customer Name:"],
            ["consumerid", "Consumer Id:"],
            ["scno", "SC No:"],
            ["office", "Counter:"],
            ["paybleamount", "Payable Amount"]
        ]),
    KUKLCustomerResponseMapFields : new Map([
		["name","Customer Name:"],
		["customerNo","Customer No:"],
		["connectionNo","Connection No:"],
		["address","Address:"],
		["netamount","Payable Amount"]]),
  onNavigate: function(uidata) {
    try{
     var navManager = applicationManager.getNavigationManager();
    if(uidata.billInfo){
      this.dataToPush={};
      this.arr1=[];
        var merchantFieldResponse =uidata.billInfo[0].transactionDetails[0];
        navManager.setCustomInfo("merchantFieldResponse",merchantFieldResponse);
    var mercantData =  navManager.getCustomInfo("responseFieldMapping");
    this.newShowFields(uidata);
    //this.showFields(merchantFieldResponse,mercantData); 
    }if(uidata.selectedAcc){
        this.selectedAcc();
    }
    else{
//     if (obj === undefined) {
//       return;
//     }
//     if(obj==="view"){
//       this.view.customHeader.btnRight.isVisible = false;
//       this.view.btnPayAPerson.isVisible = false;
//       this.view.btnDeleteRecipient.isVisible = false;
//     }
  /* var navMan = applicationManager.getNavigationManager();
    var payeeData = navMan.getCustomInfo("frmBillPayPayeeDetails");
    var data = {};
    data.payeeData = payeeData;
    var scope = this;
    var entitlements = {};
    this.context = data;
    this.context.hasNavigatedToTNC = false;
    var userFeatures = applicationManager.getConfigurationManager().getUserFeatures();
    var userPermission = applicationManager.getConfigurationManager().getUserPermissions();
    entitlements.features = userFeatures;
    entitlements.permissions = userPermission;
    data.entitlement = entitlements;
    this.view.payeeDetailsNative.setContext(data);
    this.view.payeeDetailsNative.setParentScope(scope);
    this.view.payeeDetailsNative.setEntitlements(entitlements);
    this.view.payeeDetailsNative.onError = this.onError;
    this.view.quicklinksNative.setParentScopeAndEntitlements(scope, entitlements);
    this.view.quicklinksNative.onError = this.onError;
    var cifData = JSON.parse(data.payeeData.cif);
    if(!kony.sdk.isNullOrUndefined(data.payeeData.cif) && cifData.length === 1){     
      var coreCustomerIds = cifData[0].coreCustomerId.split(",");
//       if(coreCustomerIds.length < 2)
//         this.view.quicklinksNative.setLinkVisibilityToContext("editLinkedIDs");
//       else
        this.view.quicklinksNative.setLinkVisibilityToContext("");    
    } else{
      this.view.quicklinksNative.setLinkVisibilityToContext("");
    }
    if(data.payeeData.eBillStatus === "0"){
      this.view.quicklinksNative.setContext("Inactive");
    }else {
      this.view.quicklinksNative.setContext("Active");
    } */ 
    } 
     }catch(err){
            kony.print("onNavigate"+ err);
        } 
  },
  
  init : function(){
    this.view.btnActivateEBill.onClick = this.activateEBilling;
    this.view.btnDeactivateEBill.onClick = this.deactivateEBilling;
    this.view.flxViewAllPayments.onClick = this.viewAllPayments;
    this.view.btnPayBill.onClick = this.payBill;
    this.view.btnViewBill.onClick = this.viewBill;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  
  preShow: function() {
    try{
    var scope = this;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
//     this.view.flxEditOptions.setVisibility(false);
//     this.setDataToForm();
//     this.setContractDetails();
    //this.initActions();
//     this.checkPermissionBasedAccess();
 var merchantField = navManager.getCustomInfo("merchantField");
 if(!kony.sdk.isNullOrUndefined(merchantField)){
     scope.view.lblMerchant.text = merchantField.labelText;
        scope.view.imgMerchant.src = merchantField.logoUrl;
 }
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    // this.view.segDefaultAcc.onRowClick = function(){
    //   this.selectedAccount();
    //    }.bind(this);
     var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        /*var frmAcc= applicationManager.getDefaultBillPayAcc();
        if (!kony.sdk.isNullOrUndefined(frmAcc)){
        scope.view.lblSegAcc.text = frmAcc.lblAccount.text;
        } 
        else{
        this.segmentData(presenter.getSingelBillPaySupportedAccounts());
        }
        this.segmentData(presenter.getSingelBillPaySupportedAccounts());*/
      this.view.customHeader.flxBack.onClick = function(){
        scope.modifyMerchant();
      };
       this.view.flxFromAcc.onClick = function(){
      //this.flxSegclick();
      scope.fromAccSelect();
       }.bind(this);
       this.view.customHeader.btnRight.onClick = function() {
      scope.onCancelClick();
      }.bind(this);
      this.view.btnEnable.onClick = this.makeCompleteSummary;
      var bPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        if(kony.sdk.isNullOrUndefined(bPayModule.presentationController.selectedAccount)){
         this.view.lblSegAcc.text =kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.selectFromAccount");
         }else{
          this.view.lblSegAcc.text=bPayModule.presentationController.selectedAccount;
         }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope.view.forceLayout();
     }catch(err){
            kony.print("preShow"+ err);
        }
  },
 onBackClick:function(){},
  onCancelClick: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
        applicationManager.setBillPayFlow ="onCancel";
         var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.onCancelClick();
    },
    showFields: function(merchantFieldResponse,merchantStoreFields){
        try{
        this.view.flxDynamic.removeAll();
          var storeFields =[];
     merchantStoreFields.forEach(function(fieldObj){
      storeFields.push(fieldObj.fieldName)
    })
   for (var i = 0; i< storeFields.length; i++) {
     var key = storeFields[i];
    if (merchantFieldResponse.hasOwnProperty(key)) {
      this.dataToPush[key] = merchantFieldResponse[key];
    }
   }
   var lblData= this.dataToPush;
   this.arr1.push(lblData);
   this.dynamicParentFlx(this.view.flxDynamic);
 for(i=0;i< this.arr1.length;i++){
    var keys = Object.keys(lblData);
    var j=0;
for (; j < keys.length; j++) {
     var key = keys[j];
        var value = lblData[key];
        this.dynamicLabelSet(this.view.flxDynamic.widgets()[0],key,value);
}
 }
 this.dynamicButton(this.view.flxDynamic.widgets()[0]);
  var mainFlx =this.view.flxDynamic;
  var parentFlx =this.view.flxDynamic.widgets()[0];
  var parentFlxHeight =parentFlx.widgets().length*70;
  parentFlxHeight = parentFlxHeight+(parentFlx.widgets().length*10); //to add flx height with top value
  parentFlx.height =parentFlxHeight+"dp";
  mainFlx.height =parentFlxHeight+20+"dp";
  }catch(err){
            kony.print("showFields"+ err);
        }
 },
     dynamicParentFlx: function(parentFlx){
        try{
    var flexContainer = new kony.ui.FlexContainer({
    "id": "flxLbl",
    "top": "10dp",
    "left": "0dp",
    "width": "100%",
    // "height": kony.flex.USE_PREFERED_SIZE,
    "height":"600dp",
    "zIndex": 10,
    "isVisible": true,
    // "skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,
        
        //"onClick":onClick
});
parentFlx.add(flexContainer);
 }catch(err){
            kony.print("dynamicParentFlx"+ err);
        }
     },
dynamicLabelSet: function(parentFlx,key,value){  
    try{   
 var flexContainersub = new kony.ui.FlexContainer({
    "id": "flxLabel"+key,
    "top": "10dp",
    "left": "0dp",
    "width": "100%",
    // "height": kony.flex.USE_PREFERED_SIZE,
    "height":"70dp",
    "zIndex": 10,
    "isVisible": true,
    // "skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,
        
        //"onClick":onClick
});
var labelkey = new kony.ui.Label({
        "id": "lblKey"+key,
        //"skin": "lblSkn",
       // "skin":"sknLblHeadingRegular36px",
     //"skin":"sknb8b8b8sspBold26px",
    "skin": "sknLbl424242SSP26px",
        "text": key+":",
        "isVisible": true,
        "width":"80%",
        "top":"10dp",
        "left":"5dp",
        "height": "25dp",
        "zIndex":10,
       //"centerY ":"50%",
        "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
    var labelvalue = new kony.ui.Label({
        "id": "lblValue"+key,
        //"skin": "lblSkn",
        "skin":"sknLblHeadingRegular36px",
        "text": kony.sdk.isNullOrUndefined(value)?"NA":value,
        "isVisible": true,
        "width":"80%",
        "top":"10dp",
        "left":"5dp",
        "height": "25dp",
        "zIndex":10,
       //"centerY ":"50%",
        "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
     
     flexContainersub.add(labelkey);
    flexContainersub.add(labelvalue);
   parentFlx.add(flexContainersub);
     }catch(err){
            kony.print("dynamicLabelSet"+ err);
        }
    },
    dynamicButton: function(parentFlx){
        try{
        var button = new kony.ui.Button({
        "id": "btnSummary",
        "top":"10dp",
        "height":"50dp",
        "width":"300dp",
        "isVisible": true,
    "skin": "sknBtn004B9526pxFocus",
   "focusSkin": "sknBtn004B9526pxFocus",
    "centerX":"50%",
    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue"),
    "onClick": this.makeCompleteSummary.bind(this),
         });
         parentFlx.add(button);
          }catch(err){
            kony.print("dynamicButton"+ err);
        }
    },
  modifyMerchant: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
    makeCompleteSummary: function(){
        var test;
        applicationManager.getNavigationManager().setCustomInfo("avaBalance",this.view.tbxRemarks.text);
        applicationManager.getPresentationUtility().showLoadingScreen();
         var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.navigateConfirm();
    },

     segmentData: function(accounts){
    try{
   var scope = this;
   this.view.segDefaultAcc.rowtemplate = "segAccountDetails";
            this.view.segDefaultAcc.widgetDataMap = {
                "segAccountsDetails":"segAccountsDetails",
                "flxTransHeader":"flxTransHeader",
                "lblAccount":"lblAccount",
                "imgArrow":"imgArrow",
                "lblAccountType":"lblAccountType",
                "lblAvailableBalance":"lblAvailableBalance",
                "lblHeader":"lblHeader",
                "flximgUp":"flximgUp"
            };
            var data=[];
           
            for(var i=0;i<accounts.length;i++){
              if(accounts.length>1){
                this.segFromAcc(true);
                data.push(this.createSegmentData(accounts[i]))
              }else{
                this.segFromAcc(false);
                data.push(this.createSegmentData(accounts[i]))
              }
          }
                   this.view.segDefaultAcc.setData(data);
           
      // var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(accounts) : this.getDataWithSections(accounts);
            //segment data need to set once saw the response from [parm - accounts]
            

    }catch(err){
      kony.print("segmentDataError"+ err);  
    }
 },
 createSegmentData: function(accounts){
 var dataObject={
     "lblAccount":{text:accounts.AccountName},
                "lblAvailableBalance":{text:accounts.currencyCode +accounts.availableBalance},
                "lblAccountType":{text:accounts.accountType},
                "lblHeader":{text:accounts.accountType},
                "imgArrow":{"src":"arrowdown.png"}
 }
 return dataObject;
 },
 segFromAcc: function(val){
  var scope =this;
  if(val == true){
   scope.view.flxSegment.skin ="skntbxBGffffBrB67677";
   scope.view.imgIcons.setVisibility(true);
  }else{
     scope.view.flxSegment.skin ="slFbox";
   scope.view.imgIcons.setVisibility(false);
  }

 },
  
 fromAccSelect: function(){
    try{
     var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        presenter.navFromAccountsPage();
     applicationManager.getPresentationUtility().showLoadingScreen();
      }catch(err){
            kony.print("fromAccSelect"+ err);
        }
 },
  selectedAcc: function(){
    try{
    var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        if(presenter.selectedAccountBankDone == true){
         this.view.lblSegAcc.text= presenter.selectedAccount;
        }
         }catch(err){
            kony.print("selectedAcc"+ err);
        }
 },
 flxSegclick: function(){
    try{
  var scope= this;
  if(this.view.imgIcons.setVisibility){
     scope.view.segDefaultAcc.setVisibility(true); 
        scope.view.imgIcons.src ="arrowup.png";
  }else{
    return;
  }
   }catch(err){
            kony.print("flxSegclick"+ err);
        }
 },
selectedAccount: function(){
    try{
    var scope = this;
    var segData = this.view.segDefaultAcc.selectedRowItems[0];
    scope.view.lblSegAcc.text = segData.lblAccount.text;
    scope.view.segDefaultAcc.setVisibility(false);
    scope.view.imgIcons.src="arrowdown.png";
     }catch(err){
            kony.print("selectedAccount"+ err);
        }
},

//old code
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
   
//       if(scope.isEditLinkedCustomerAvailable){
//         scope.view.btnEditLinkedRecipient.setVisibility(true);
//         scope.view.lblSeperatorPopUpLinkedRecipient.setVisibility(true);
//       }
//       else{
//         scope.view.btnEditLinkedRecipient.setVisibility(false);
//         scope.view.lblSeperatorPopUpLinkedRecipient.setVisibility(false);
//       }
//       scope.view.flxEditOptions.isVisible = true;
    
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
  //old code
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
  },
  newShowFields: function(response){
    try{
     var fieldMapping = applicationManager.getNavigationManager().getCustomInfo("responseFieldMapping");
     this.view.segTransaction.widgetDataMap =this.segWidgetDataMap();
     this.view.segBillOfHistory.widgetDataMap = this.segBillOfHistoryWidgetDataMap();
     if(response.paymentAggregator){
		var customerResponseFeilds=response.paymentAggregator=="NEA"?this.NEACustomerResponseMapFields:response.paymentAggregator=="KUKL"?this.KUKLCustomerResponseMapFields: new Map();
        var responseKeys=Object.keys(response.billInfo[0].transactionDetails[0]);
		var responseSize=responseKeys.length;
   
      var segArr =[];
      for (var i = 0; i < responseKeys.length; i++) {
        if(customerResponseFeilds.get(responseKeys[i])){
        var key=responseKeys[i];
		var mappingKey=customerResponseFeilds.get(key);
    var value=response.billInfo[0].transactionDetails[0][key];
        if(key=="paybleamount" || key=="netamount"){
        this.view.lblRemarks.text = mappingKey;
       if (response.paymentAggregator == "NEA") value= response.billInfo[0].totaldueamount?response.billInfo[0].totaldueamount:"";
        this.view.tbxRemarks.text =value;
            //create static textbox and assign the editable txb Vablue theere
        }else{
          segArr.push({
          "lblKey" : mappingKey,
          "lblValue" : value,
          "flxSeperator":{"isVisible":true}
          })
          }
        
        }
        }
        var segInArr =[];
        for(var k=0; k<response.billInfo[0].transactionDetails.length;k++){
      var rowObj ={};
      var txn = response.billInfo[0].transactionDetails[k];
      if(response.paymentAggregator == "NEA"){
      rowObj.lblAccname = txn.billdate;
      rowObj.lblAccNumber = txn.duebillof;
      rowObj.lblAccType = txn.noofdays;
      rowObj.lblBalance = kony.sdk.isNullOrUndefined(txn.paybleamount)? txn.billamt: txn.paybleamount;
      segInArr.push(rowObj);
      }else{
        rowObj.lblAccname = txn.name;
      rowObj.lblAccNumber = txn.areaNo;
      rowObj. lblBalance= txn.customerNo;
      rowObj.lblAccType = kony.sdk.isNullOrUndefined(txn.netamount)? txn.paybleamount: txn.netamount;
      segInArr.push(rowObj);
      }
        }
      }
      this.view.segBillOfHistory.setData(segInArr);
        this.view.segTransaction.setData(segArr);
    }catch(err){
    kony.print("newShowFields"+ err);
    }
  },
  segWidgetDataMap: function(){
    var map={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "flxSeperator":"flxSeperator",
    "flxBillNewHBL":"flxBillPayHBL"
    };
    return map
    },
    segBillOfHistoryWidgetDataMap: function(){
      var map={
          "lblAccname":"lblAccname",
          "lblBalance":"lblBalance",
          "lblAccNumber":"lblAccNumber",
          "lblAccType":"lblAccType",
           "flxRow":"flxRow",
           "flxSeperator":"flxSeperator"
      };
      return map
      },
   //old code ends
  };
});