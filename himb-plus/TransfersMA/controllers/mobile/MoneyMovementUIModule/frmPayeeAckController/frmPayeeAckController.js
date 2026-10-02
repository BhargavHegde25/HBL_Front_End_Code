 define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
    },
    onNavigate: function(uidata){
    if(uidata.sameBank){
    this.getResponseData(uidata.sameBank);
    }
    if(uidata.TransferError){
    this.errorResponse(uidata.TransferError);
    }
    },
     preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
        this.view.flxMainScroll.top = "56dp";
    }
    else {
        this.view.flxHeader.isVisible = false;
        this.view.flxMainScroll.top = "10dp";
    }
    this.view.postShow = this.postShow;
   },
   postShow: function(){
    this.view.btnPrimary.onClick = this.manageBenficiary;
    this.view.btnSecondary.onClick =this.navToAccount;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   },
    getResponseData: function(data){
    try{
    var response = applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
    var segPayload = {
    "Account Number":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.lblAccountNumber.text)?response.lblAccountNumber.text:"NA"),
    "Reference ID":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(data.Id)?data.Id:"NA"),
    "Beneficiary's Name":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.lblAccountHolderName.text)?response.lblAccountHolderName.text:"NA"),
    "Nickname":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.newNick)?response.newNick:"NA"),
    };
    this.setSegmentData(segPayload);
    }catch(err){
    kony.print("getResponseData:"+err);
    }
    },
    setSegmentData: function(data){
    try{
    var scope=this;
    scope.view.segTransferDetails.rowTemplate="flxSegTransferNew";
    scope.view.segTransferDetails.widgetDataMap={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "lblLineSeperator":"lblLineSeperator",
    "flxSegTransferNew":"flxSegTransferNew"
    };
    var payload =[]
    if(Object.keys(data).length > 0){
    for(i=0;i<Object.keys(data).length;i++){
    payload.push({
    "lblKey":{"text":Object.keys(data)[i],"isVisible":true},
    "lblValue":{"text":Object.values(data)[i],"isVisible":true},
    "lblLineSeperator":{"isVisible":true},
    "flxSegTransferNew":{"isVisible":true}
    })
    }
    }
    scope.view.segTransferDetails.setData(payload);
    }catch(err){
    kony.print("setSegmentData:" + err);
    }
    },
    manageBenficiary: function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var transerfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'MoneyMovementUIModule'
        });
        transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
     var navMan = applicationManager.getNavigationManager();
                    navMan.setCustomInfo("removeAttachments", true);
                    var moneyMovementModule = applicationManager.getModulesPresentationController({
                        "moduleName": "MoneyMovementUIModule",
                        "appName": "TransfersMA"
                    });
                    navMan.setEntryPoint("centralmoneymovement", "frmManageRecipientType");
                    moneyMovementModule.clearMMFlowAtributes();
                    moneyMovementModule.enterManageRecipientsFlow();
    },
    navToAccount: function(){
         applicationManager.getPresentationUtility().showLoadingScreen();
         var transerfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'MoneyMovementUIModule'
        });
        transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.onCancelClick(); 
    },
    };
 });