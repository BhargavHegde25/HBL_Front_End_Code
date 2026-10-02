    define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    init: function () {
    var scope = this;
	this.view.preShow=this.preShow;
	this.view.onDeviceBack=function(){};
	this.setFlowAction();
    
    },
    setFlowAction:function(){
			this.view.btnSecondary.onClick=this.navigateToHistory;
			this.view.btnPrimary.onClick=this.navigateToDashboard;
			this.view.imgDownload.onTouchEnd=this.downloadTransaction;
		},

        preShow: function () {
            try{
				 var scope = this;
				if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        scope.view.flxHeader.isVisible = false;
        this.view.flxMainScroll.top="0dp";
    }
    else {
        scope.view.flxHeader.isVisible = true;
		this.view.flxMainScroll.top="56dp";
    }
				this.setFormData();
			}catch(e){
				applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa preShow*********************************"+e);
			}
        },
		navigateToHistory:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().showLoadingScreen();
		var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule").presentationController;
		transferMod.getEsewaHistory();
		
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa navigateToHistory*********************************"+e);
		}
		},
		navigateToDashboard:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().showLoadingScreen();
		applicationManager.getNavigationManager().navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa navigateToDashboard*********************************"+e);
		}
		},
		
		setFormData:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		var transactionObj = applicationManager.getTransactionsListManager().getTransactionObject();
		var navManager=applicationManager.getNavigationManager();
		navManager.getCustomInfo("resetEsewa",false);
		   var formatUtility = applicationManager.getFormatUtilManager();
		   var currentBankDate=navManager.getCustomInfo("CurrentBankDate");
		   var toAccName=transactionObj.esewaToAccName;
		   var curredate=formatUtility.getFormatedDateString(new Date(currentBankDate),'m/d/y');
		   	var totalAmount=formatUtility.formatAmountandAppendCurrencySymbol(transactionObj.esewaAmount, transactionObj.esewafromAccCurrency);
		var chargeAmt=transactionObj.esewaCharges;
		var esewaId=transactionObj.esewaId;
		var Tp=transactionObj.esewaTP;
		var successRes=navManager.getCustomInfo("esewasuccessRes");
		var amount=parseFloat(transactionObj.esewaAmount)-parseFloat(transactionObj.esewaCharges);
		var segData=[];
		if(successRes.response_code=="ELR000"){
		scope.view.lblCurrency.text=transactionObj.esewafromAccCurrency;
		scope.view.lblWholeAmount.text=totalAmount.split(" ")[1].split(".")[0];
		scope.view.lblDecimal.text="."+totalAmount.split(" ")[1].split(".")[1];
		scope.view.lblFromAccountName.text=transactionObj.esewaFrmAccName;
		scope.view.lblFromAccountNumber.text=transactionObj.esewaFromAccount;
		scope.view.segTransferDetails.widgetDataMap={"lblKey":"lblKey","lblValue":"lblValue"};
		//"i18n.eSewa.OriginatingUniqueId"
		if(successRes.originating_unique_id){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.eSewa.OriginatingUniqueId"),"lblValue":successRes.originating_unique_id});
	}
	if(successRes.transaction_id){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.eSewa.TransactionId"),"lblValue":successRes.transaction_id});
	}
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
		 scope.view.segTransferDetails.rowTemplate="flxSegTransferNew";
		 scope.view.segTransferDetails.setData(segData);
		 
		}
		}
		else if(successRes.response_code=="ELR001"){
			
		}
	
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setFormData*********************************"+e);
		}
		},
		
		downloadTransaction:function(){
		try{
		var scope=this;
		var tncManager=applicationManager.getTermsAndConditionsManager();
		var navManager=applicationManager.getNavigationManager();
		var successRes=navManager.getCustomInfo("esewasuccessRes");
		var param={"transactionId":successRes.originating_unique_id};
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
