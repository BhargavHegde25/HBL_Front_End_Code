define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
    },
    onNavigate: function(uidata){
    try{
    if(uidata.success){
    this.setSuccessData(uidata.success);
    }
    }catch(err){
    kony.print("onNavigate:"+ err);
    }
    },
    preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMainScroll.top = "70dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "15dp";
            }
    this.view.postShow = this.postShow;
    },
    postShow: function () {
    this.view.btnPrimary.onClick = this.btnPrimaryOnclick;
    this.view.btnSecondary.onClick = this.btnSecondaryOnclick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    setSuccessData: function(res){
    var response =res;
    var refID = response.Id;
    var segData = applicationManager.getNavigationManager().getCustomInfo("segData");
    segData.refID = refID;
    var segPayload ={
    "Reference ID": segData.refID,
    "Transfer Type": segData.transferflow,
    "Payee Name": segData.benefname,
    "Account Number": segData.accNumber,
    "Nick Name": segData.nickname  
    };
    this.segmentSetData(segPayload);
    },
    segmentSetData: function(data){
    try{
    var scope=this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var tranferMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
    });
    var transferType =tranferMod.transferFlow;
    scope.view.segPayeeDetails.rowTemplate="flxSegTransferNew";
    scope.view.segPayeeDetails.widgetDataMap={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "lblLineSeperator":"lblLineSeperator",
    "flxSegTransferNew":"flxSegTransferNew"
    };
    var payload =[]
    if(Object.keys(data).length > 0){
    for(i=0;i<Object.keys(data).length;i++){
    if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(Object.values(data)[i])){
    }else{
    var rowdata={};
    payload.push({
    "lblKey":{"text":Object.keys(data)[i],"isVisible":true},
    "lblValue":{"text":Object.values(data)[i],"isVisible":true},
    "lblLineSeperator":{"isVisible":true},
    "flxSegTransferNew":{"isVisible":true}
    })
    }
    }
    }
    scope.view.segPayeeDetails.setData(payload);
    }catch(err){
    kony.print("setSegmentData:" + err);
    }
    },
    btnSecondaryOnclick: function () {
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.onCancelClick();
    },
    btnPrimaryOnclick: function () {
        var navMan = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();
        navMan.navigateTo({
            "appName": "TransfersMA",
            "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"
        });
    },
    flxBackOnClick: function () {
    //var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    
    },

    };
});
