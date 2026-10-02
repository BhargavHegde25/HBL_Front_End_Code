define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
     
    return {
		init:function(){
		this.view.preShow=	this.preshow;
		this.view.onDeviceBack=this.goback;
		this.setFlowAction();
		},
		setFlowAction:function(){
			this.view.btnPrimary.onClick=this.invokeConfimEsewa;	
			this.view.customHeader.flxBack.onClick=this.goback;
		this.view.customHeader.btnRight.onClick=this.cancelonClick;
		},
		preshow:function(){
		try{
		var scope=this;
		 if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        scope.view.flxHeader.isVisible = false;
        this.view.flxMainScroll.top="0dp";
    }
    else {
        scope.view.flxHeader.isVisible = true;
		this.view.flxMainScroll.top="56dp";
    }
		scope.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("i18n.eSewa.ConfirmHeading");
		scope.setFormData();
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa preshow*********************************"+e);
		}
		},
		invokeConfimEsewa:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().showLoadingScreen();
		 var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "ManageActivitiesUIModule","appName": "TransfersMA"}).presentationController;
		transferMod.eSewaIntraBankTransfer();
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa invokeConfimEsewa*********************************"+e);
		}
		},
		setFormData:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		var transactionObj = applicationManager.getTransactionsListManager().getTransactionObject();
		var navManager=applicationManager.getNavigationManager();
		   var formatUtility = applicationManager.getFormatUtilManager();
		   var currentBankDate=navManager.getCustomInfo("CurrentBankDate");
		   var toAccName=transactionObj.esewaToAccName;
		   var curredate=formatUtility.getFormatedDateString(new Date(currentBankDate),'m/d/y');
		   	var totalAmount=formatUtility.formatAmountandAppendCurrencySymbol(transactionObj.esewaAmount, transactionObj.esewafromAccCurrency);
			navManager.getCustomInfo("resetEsewa",false);
		var chargeAmt=transactionObj.esewaCharges;
		var esewaId=transactionObj.esewaId;
		var Tp=transactionObj.esewaTP;
		var amount=parseFloat(transactionObj.esewaAmount)-parseFloat(transactionObj.esewaCharges);
		var segData=[];
		scope.view.lblCurrency.text=transactionObj.esewafromAccCurrency;
		this.view.lblWholeNumber.text=totalAmount.split(" ")[1].split(".")[0];
		this.view.lblDecimal.text="."+totalAmount.split(" ")[1].split(".")[1];
		scope.view.lblFromAccountName.text=transactionObj.esewaFrmAccName;
		scope.view.lblFromAccountNumber.text=transactionObj.esewaFromAccount;
		scope.view.segConfirmDetails.widgetDataMap={"lblKey":"lblKey","lblValue":"lblValue"};
		if(toAccName){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.eSewa.ReceiverName"),"lblValue":toAccName});
	}
	if(esewaId){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.eSewa.eSewaID"),"lblValue":esewaId});
	}
	if(amount){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.wealth.amountColon"),"lblValue":formatUtility.formatAmountandAppendCurrencySymbol(amount, transactionObj.esewafromAccCurrency)});
	}
	if(chargeAmt){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.mb.eSewa.Charge"),"lblValue":formatUtility.formatAmountandAppendCurrencySymbol(chargeAmt, transactionObj.esewafromAccCurrency)});
	}
	if(curredate){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:"),"lblValue":curredate});
	}
	if(Tp){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.eSewa.TransactionPurpose"),"lblValue":Tp});
	}
	if(segData){
		 scope.view.segConfirmDetails.rowTemplate="flxSegTransferNew";
		 scope.view.segConfirmDetails.setData(segData);
	}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setFormData*********************************"+e);
		}
		},
		goback:function(){
		try{
		var scope=this;
		var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
		applicationManager.getNavigationManager().getCustomInfo("resetEsewa",false);
		transferMod.presentationController.navigateToEsewaLoad();
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		cancelonClick:function(){
		try{
		var scope=this;
		applicationManager.getNavigationManager().navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		bindError:function(err){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		if(err.response_code=="ELR001"){
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.mb.esewa.topUperror"));
		}else if(err.errorMessage){
			applicationManager.getPresentationUtility().Alert(err.errorMessage);
		}
		else if(err){
			applicationManager.getPresentationUtility().Alert(err);
		}
		else{
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.common.OoopsServerErrormb"));
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
        };
});
