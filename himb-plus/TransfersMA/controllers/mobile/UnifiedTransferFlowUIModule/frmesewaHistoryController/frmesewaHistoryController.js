define(['CommonUtilities'],function(CommonUtilities){ 
  return{
  init: function () {
    var scope=this;
   this.initActions();
   this.view.preShow=this.preShow;
  },
  preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
	  this.view.flxTransfersList.top = "0dp"; 
    }
    else {
      this.view.flxHeader.isVisible = true;
	  this.view.flxTransfersList.top = "56dp"; 
    }
	
   this.setFormData();
     
  },
  
  showToastMessage: function(response) {
    var msg = kony.i18n.getLocalizedString('kony.mb.transfers.transferCancelToast') + (response.transactionId || response.referenceId);
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
  },
  
  initActions: function () {
    var scope = this;
    var transferModPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
	this.view.segHistory.onRowClick=this.navigateToDetails;
    
  },
  
  navigateCustomBack: function(){
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
     },
	 
	 navigateToDetails:function(){
		try{
		var scope=this;
		var selectedRow=scope.view.segHistory.selectedRowIndex[1];
		 var navManager = applicationManager.getNavigationManager();
		var historyData=navManager.getCustomInfo("esewaHistoryData");
		navManager.setCustomInfo("eSewaHistoryDetails",historyData.data[selectedRow]);
		navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmeSewaHistoryDetails"});
		
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa navigateToDetails*********************************"+e);
		}
		},
		setFormData:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		 var navManager = applicationManager.getNavigationManager();
		 var formatUtility = applicationManager.getFormatUtilManager();
		 scope.view.segHistory.widgetDataMap={"lblField1":"lblField1","lblField2":"lblField2","lblField3":"lblField3","lblField4":"lblField4"};
		 var historyData=navManager.getCustomInfo("esewaHistoryData");
		 var segData=[];
		 if(historyData.isHistorySuccess){
			 scope.view.flxNoRecords.setVisibility(false);
			 scope.view.segHistory.setVisibility(true);
			 for(var i=0;i<historyData.data.length;i++){
				 segData.push({"lblField1":historyData.data[i].SenderName,
				 "lblField2":formatUtility.formatAmountandAppendCurrencySymbol(historyData.data[i].Amount, "NPR"),
				 "lblField3":historyData.data[i].Status,
				 "lblField4":formatUtility.getFormatedDateString(new Date(historyData.data[i].TransactionDate),'m/d/y')});
			 }
			 if(segData.length!=0){
				scope.view.segHistory.rowTemplate="flxTransfersRowTemplate"; 
				scope.view.segHistory.setData(segData);
			 }
		 }
		 else{
			 scope.view.flxNoRecords.setVisibility(true);
			 scope.view.segHistory.setVisibility(false);
		 }
		 
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setFormData*********************************"+e);
		}
		}
	 
	 /*
		sample:function(){
		try{
		var scope=this;
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		}
		*/
     
  }
});