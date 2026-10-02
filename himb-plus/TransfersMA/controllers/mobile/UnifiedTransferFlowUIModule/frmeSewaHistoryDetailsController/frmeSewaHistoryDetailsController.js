    define(['CommonUtilities'],function(CommonUtilities){ 
	return{
    init: function () {
    var scope=this;
    this.initActions();
    },
    preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
        this.view.flxDetailsmain.top="10dp";
    }
    else {
        this.view.flxHeader.isVisible = true;
		this.view.flxDetailsmain.top="65dp";
    }
	this.setFomrData();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
    // var transferModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
    var navMan = applicationManager.getNavigationManager();
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
	this.view.button1.onClick=this.repeatTransaction;
	this.view.button2.onClick=this.downloadTransaction;
    
    },
    navigateCustomBack: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
    },
	setFomrData:function(){
		try{
		var scope=this;
		var navManager = applicationManager.getNavigationManager();
		var data=navManager.getCustomInfo("eSewaHistoryDetails");
		var formatUtility = applicationManager.getFormatUtilManager();
		
		scope.view.statusLabel.text=data.Status;
		
		scope.view.lblValue1.text=formatUtility.formatAmountandAppendCurrencySymbol(data.Amount, "NPR");
		if(data.SenderName){
			scope.view.flx2.setVisibility(true);
			scope.view.lblValue2.text=data.SenderName;
		}
		else{
			scope.view.flx2.setVisibility(false);
		}
		if(data.EsewaId){
			scope.view.flx3.setVisibility(true);
			scope.view.lblValue3.text=data.EsewaId;
		}
		else{
			scope.view.flx3.setVisibility(false);
		}
		if(data.TransactionDate){
			scope.view.flx4.setVisibility(true);
			scope.view.lblValue4.text=formatUtility.getFormatedDateString(new Date(data.TransactionDate),'m/d/y');
		}
		else{
			scope.view.flx4.setVisibility(false);
		}
		if(data.OriginatingUniqueId){
			scope.view.flx5.setVisibility(true);
			scope.view.lblValue5.text=data.OriginatingUniqueId;
		}
		else{
			scope.view.flx5.setVisibility(false);
		}
		if(data.Channel){
			scope.view.flx7.setVisibility(true);
			scope.view.lblValue7.text=data.Channel;
		}
		else{
			scope.view.flx7.setVisibility(false);
		}
		if(data.Purpose){
			scope.view.flx8.setVisibility(true);
			scope.view.lblValue8.text=data.Purpose;
		}
		else{
			scope.view.flx8.setVisibility(false);
		}
		if(data.TransactionId){
			scope.view.flx6.setVisibility(true);
			scope.view.lblValue6.text=data.TransactionId;
		}
		else{
			scope.view.flx6.setVisibility(false);
		}
		if(data.Fee){
			scope.view.lblText9.text=kony.i18n.getLocalizedString("i18n.mb.eSewa.Charge");
			scope.view.flx9.setVisibility(true);
			scope.view.lblValue9.text=formatUtility.formatAmountandAppendCurrencySymbol(data.Fee, "NPR");
		}
		else{
			scope.view.flx9.setVisibility(false);
		}
		
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		downloadTransaction:function(){
		try{
		var scope=this;
		var tncManager=applicationManager.getTermsAndConditionsManager();
		var param={"transactionId":scope.view.lblValue5.text};
		tncManager.generateeSewaPdf(param,function(res){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			if(res.fileId != "" ){
                var mfURL = KNYMobileFabric.mainRef.config.services_meta.DocumentManagement.url;
                var pdfurl = mfURL + "/objects/DownloadTransactionReport?fileId=" + res.fileId;
                kony.application.openURL(pdfurl);
            }
		},function(err){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		});
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa downloadTransaction*********************************"+e);
		}
		},
		repeatTransaction:function(){
		try{
		var scope=this;
		var navManager = applicationManager.getNavigationManager();
		navManager.setCustomInfo("isRepeat",true);
		var data=navManager.getCustomInfo("eSewaHistoryDetails");
		 var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "ManageActivitiesUIModule",
      "appName": "TransfersMA"
    });
		  
				transferMod.presentationController.navigateToEsewaLoad();
		
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
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
	};
  });