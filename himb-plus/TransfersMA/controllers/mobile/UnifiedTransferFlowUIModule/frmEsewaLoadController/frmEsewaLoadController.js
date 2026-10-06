		define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
		return {
		esewafeeDetails:"",
		setFirstName:"",
		setLastName:"",
		init:function(){
		this.view.preShow=	this.preshow;
		this.view.onDeviceBack=this.goback;
		this.setFlowAction();
		},
		setFlowAction:function(){
			var scope=this;
		this.view.flxChooseAccount.onClick=this.invokeAccSelection
		this.view.imgContactPucker.onTouchEnd=this.openContactPicker;
		this.view.lblesewaid.onTouchEnd=function(){
			if(scope.view.lblesewaid.length==0){
				scope.view.lblTxtAccNo.setVisibility(true);
				scope.view.lblesewaid.setVisibility(false);
				scope.view.lblTxtAccNo.setFocus(true);
			}
		};
		this.view.flxToaccountinput.onTouchEnd=function(){
			if(scope.view.lblesewaid.length==0){
				scope.view.lblTxtAccNo.setVisibility(true);
				scope.view.lblesewaid.setVisibility(false);
				scope.view.lblTxtAccNo.setFocus(true);
			}
		};
		this.view.customHeader.flxBack.onClick=this.goback;
		this.view.customHeader.btnRight.onClick=this.goback;
		this.view.lblTxtAccNo.onTextChange=this.validateContinueButton;
		this.view.txtAmount.onTextChange=this.validateContinueButton;
		this.view.txtAmount.onEndEditing=scope.formatAmtfield.bind(scope);
		this.view.flxRemarksInput.onClick=this.setTransPurpose;
		this.view.btnContinue.onClick=this.validateesewaId;			
		},

		preshow:function(){
		try{
			var scope=this;
			 if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        scope.view.flxHeader.isVisible = false;
        scope.view.flxMainScroll.top="0dp";
    }
    else {
        scope.view.flxHeader.isVisible = true;
		scope.view.flxMainScroll.top="56dp";
    }
		scope.setFromAccount();
		//this.setTitleBarVisibility();
		var navManager = applicationManager.getNavigationManager();
		var isRepeat=navManager.getCustomInfo("isRepeat");
		var resetEsewa=navManager.getCustomInfo("resetEsewa");
		var EsewafromQR=navManager.getCustomInfo("isEsewafromQr");
		var EsewaQrData=navManager.getCustomInfo("EsewafromQrdata");
		if(resetEsewa){
			scope.resetUI();
		}
		if(isRepeat){
			scope.repeatTransaction();
		}
		if(EsewafromQR&&EsewaQrData){
			scope.invokeQRData(EsewaQrData);
		}
		this.getfeeDetails();
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa preshow*********************************"+e);
		}
		},
		goback:function(){
		//applicationManager.getNavigationManager().goBack();
		applicationManager.getNavigationManager().navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
		applicationManager.getNavigationManager().setCustomInfo("isEsewafromQr",false);
		this.resetUI();
		},
		 formatAmtfield:function(){
	  var scope=this;
	  var amount=this.view.txtAmount.text;
	    if(amount !=""){
    scope.view.txtAmount.text = parseFloat(amount).toFixed(2);
    }
	scope.view.forceLayout();
  },
		setTitleBarVisibility: function () {
		var scope=this;
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {

		scope.view.flxHeader.isVisible = true;
		scope.view.flxMainScroll.top = "56dp";

		} else {

		scope.view.flxHeader.isVisible = false;
		scope.view.flxMainScroll.top = "0dp";
		}
		},
		setFromAccount:function(data){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		var navMan=applicationManager.getNavigationManager();
		var accData=navMan.getCustomInfo("default_account_esewa");
		var formatUtility = applicationManager.getFormatUtilManager();
		var defaultesewaAcc=applicationManager.getUserPreferencesManager().userObj[0].default_account_esewa;
		var casa=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
		if(data){

		scope.view.lblAccountName.text=data.lblAccname.text;
		scope.view.lblBalance.text=data.lblBalance.text;
		scope.view.lblAccountNumber.text=data.lblAccNumber;
		scope.view.lblAccountType.text=data.lblAccType.text;	
		}
		else if(accData){
		scope.view.lblAccountName.text=accData.accountName;
		scope.view.lblBalance.text=formatUtility.formatAmountandAppendCurrencySymbol(accData.availableBalance,accData.currencyCode);
		scope.view.lblAccountNumber.text=accData.accountID;
		scope.view.lblAccountType.text=accData.productId;
		}
		else if(defaultesewaAcc){
			var data=casa.filter(function(acc){
				if(acc.accountID==defaultesewaAcc)
					return acc;
			});
			if(data[0]){
		scope.view.lblAccountName.text=data[0].accountName;
		scope.view.lblBalance.text=data[0].availableBalance;
		scope.view.lblAccountNumber.text=data[0].accountID;
		scope.view.lblAccountType.text=data[0].productId;
			}
		}

		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setFromAccount*********************************"+e);
		}
		},
		invokeAccSelection:function(){
		try{
		var scope=this;
		var CASA=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
		var eligibleAccounts=CASA.filter(function (account) {
		return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& (account.accountType="Checking"||account.accountType=="Current" ||account.accountType=="Savings")&& account.currencyCode=="NPR";
		});

		var PopupObj={
		"accounts":eligibleAccounts,//should br Array of object[{},{},{}...]
		"flowType":"FT",
		"rowClickCallback":scope.onRowSelection.bind(this)
		};
		applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa invokeAccSelection*********************************"+e);
		}
		},
		onRowSelection:function(data){
		try{
		this.setFromAccount(data[0]);
		this.view.flxPopupfrombottom.setVisibility(false);
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa onRowSelection*********************************"+e);
		}
		},
		resetUI:function(){
		try{
		var scope=this;
		scope.view.txtAmount.text="";
		scope.view.lblTxtAccNo.text="";
		scope.view.lblesewaid.text="";
		scope.view.lblTpurpose.text=kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
		scope.view.btnContinue.skin="sknBtnE2E9F0Rounded"
		scope.view.lblesewaid.setVisibility(false);
		scope.view.btnContinue.setEnabled(false);

		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa resetUI*********************************"+e);
		}
		},
		validateContinueButton: function(){
		try{
		var scope=this;

		if ((scope.isValid(scope.view.lblTxtAccNo.text) || scope.isValid(scope.view.lblesewaid.text) )&&
		scope.isValid(scope.view.txtAmount.text) && scope.view.lblTpurpose.text!=kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect")) {
		scope.view.btnContinue.setEnabled(true);
		scope.view.btnContinue.skin="sknBtn0095e4RoundedffffffSSP26px";
		} else {
		scope.view.btnContinue.setEnabled(false);
		scope.view.btnContinue.skin="sknBtnE2E9F0Rounded"; 
		}
		}catch(err){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa validateContinueButton*********************************"+e);
		}
		},
		isValid: function(value) {
		return (!kony.sdk.isNullOrUndefined(value) && value.trim() !== "");
		},

		setTransPurpose:function(){
		try{
		var scope=this;
		var configManager = applicationManager.getConfigurationManager();
		var data=configManager.ESEWA_PURPOSE;
		var fixed = data.replace(/[{}]/g, '').replace(/""/g, '"');  
		var arr = JSON.parse(`[${fixed}]`);

		var segdata = [];
		for(var i=0;i<arr.length;i++){
		segdata.push({"lblTP":arr[i]});
		}
		var obj={"title":"Select Deposit Type","key":"lblTP","Segdata":segdata,"rowClickCallback":scope.tpSelection.bind(scope)}
		applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setTransPurpose*********************************"+e);
		}
		},
		tpSelection:function(res){
		try{
		var scope=this;
		//alert(res);
		var selectedvalue = res[0].lblValue;
		if(selectedvalue){
		scope.view.lblTpurpose.text=selectedvalue;
		this.view.flxPopupfrombottom.setVisibility(false);
		this.validateContinueButton();
		}
		else{
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa tpSelection*********************************"+e);
		}
		},
		getfeeDetails:function(){
		try{
		var scope=this;
		applicationManager.getTermsAndConditionsManager().getEsewaFeesValues({},scope.getfeeDetailssuccess.bind(this),scope.getfeeDetailsfailure.bind(this))
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa getfeeDetails*********************************"+e);
		}
		},
		getfeeDetailssuccess:function(res){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		scope.esewafeeDetails=res.eSewaLoadFee;
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa getfeeDetailssuccess*********************************"+e);
		}
		},
		getfeeDetailsfailure:function(err){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later or contact admin");

		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa getfeeDetailsfailure*********************************"+e);
		}
		},
		openContactPicker:function(){	  
		try{
		var scope=this;
		var options = {isAccessModeAlways:true};
		var result = kony.application.checkPermission(kony.os.RESOURCE_CONTACTS,options);
		if(result.status === kony.application.PERMISSION_DENIED) {
		kony.application.requestPermission(kony.os.RESOURCE_CONTACTS,scope.pickercallback.bind(this));
		}
		else if(result.status === kony.application.PERMISSION_GRANTED ){
		scope.pickContact();
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa navigateToContacts*********************************"+e);
		}
		},
		pickercallback:function(response){
		try{
		var scope=this;
		if(response.status === kony.application.PERMISSION_GRANTED)
		{
		scope.pickContact();
		}
		else if(response.status === kony.application.PERMISSION_DENIED)
		{
		
		var i18nKey="";
		var cntType= "phone";
		var transactionObj = applicationManager.getTransactionsListManager();
		if(cntType==="phone"){

		i18nKey= applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts");
		}
		else{

		i18nKey= applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts");
		}
		applicationManager.getPresentationUtility().Alert(i18nKey);
		}
		
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		pickContact:function(){
		try{
		var scope = this;
		let contactPickerObjectLocal;
		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
		contactPickerObjectLocal = new contactsAPI.ContactPicker();        
		}
		else{
		let contactsAPI = java.import("com.konyffi.contacts.ContactPicker");
		contactPickerObjectLocal = new contactsAPI();
		}
		var cntType= "phone";
		if(cntType==="phone")
		contactPickerObjectLocal.selectSinglePhoneNumber(scope.contactCallBack);
		else
		contactPickerObjectLocal.selectSingleEmail(scope.contactCallBack);
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa pickContact*********************************"+e);
		}
		},
		contactCallBack:function(object){
		try{
		var scope=this;
		var resultContact=(JSON.parse(object));
		var cntType= "phone";
		var transactionObj = applicationManager.getTransactionsListManager();
		if(cntType=="phone"){
		if(resultContact.phone){
		resultContact.phone.replace(/\u00A0/g," ");
		}
		//if(resultContact.phone.indexOf("+977")==0){
		scope.view.lblTxtAccNo.text=resultContact.phone.replace(/^\+977[-\s]?/, '').replace("-","");
		transactionObj.setTransactionAttribute("esewaID",resultContact.phone.replace(/^\+977[-\s]?/, ''));
		scope.view.forceLayout();
		//scope.setFirstName=resultContact.firstName;
		//scope.setLastName=resultContact.lastName;
		//}
		//else{
		//applicationManager.getPresentationUtility().Alert("Please Select Valid Nepal Number");

		//}

		}else{
		resultContact.phone.replace(/\u00A0/g," ");
		scope.view.lblTxtAccNo.text=resultContact.phone.replace(/^\+977[-\s]?/, '').replace("-","");
		transactionObj.setTransactionAttribute("esewaID",resultContact.phone.replace(/^\+977[-\s]?/, ''));
		scope.view.forceLayout();
		}

		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa contactCallBack*********************************"+e);
		}
		},
		validateesewaId:function(){
		try{
		var scope=this;
		applicationManager.getPresentationUtility().showLoadingScreen();
		var accNum=scope.view.lblAccountNumber.text;
		var accName=this.view.lblAccountName.text;
		var tp=this.view.lblTpurpose.text
		var transactionObj = applicationManager.getTransactionsListManager();
		var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
		var amount=scope.getTargetAmount(scope.view.txtAmount.text.trim());
		var esewaId=scope.getEsewaID();
		var accBal;
		var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
		accBal=accounts.filter(function(acc){
			if(acc.accountID==accNum)
				return acc;
		});
		
		if(amount==0){
		applicationManager.getPresentationUtility().Alert("Something went wrong amount formation");
		}
		else if(parseFloat(amount)<parseFloat(accBal[0].availableBalance)){
		// ===== eSewa v2 booking request - DISABLED 2026-09-09 =====
		// v2 /api/auth/load/v2/book takes eSewaId / amount / originatingUniqueId /
		// accountHolderName / initiatorMobile. v1 validate_esewa_id/v1 takes
		// targetedMobile / targetedAmount only.
		// var userObj=applicationManager.getUserPreferencesManager().getUserObj();
		// var accountHolderName=((userObj.userfirstname||"")+" "+(userObj.userlastname||"")).trim();
		// var originatingUniqueId="HBL"+new Date().getTime()+Math.floor(Math.random()*1e6);
		// var param={
		// "eSewaId":esewaId,
		// "amount":amount,
		// "frmAccNumber":accNum,
		// "originatingUniqueId":originatingUniqueId,
		// "accountHolderName":accountHolderName,
		// "initiatorMobile":userObj.phone||""
		// };
		// ===== end eSewa v2 =====
		var param={
		"targetedMobile":esewaId,
		"targetedAmount":amount,
		"frmAccNumber":accNum		
		};
		transactionObj.setTransactionAttribute("esewaFromAccount",accNum);
		transactionObj.setTransactionAttribute("esewaId",esewaId);
		transactionObj.setTransactionAttribute("esewaAmount",amount);
		transactionObj.setTransactionAttribute("esewaEnteredAmount",scope.view.txtAmount.text.trim());
		transactionObj.setTransactionAttribute("esewafromAccCurrency",accBal[0].currencyCode);
		transactionObj.setTransactionAttribute("esewaFrmAccName",accName);
		transactionObj.setTransactionAttribute("esewaTP",tp);
		// ===== eSewa v2 - DISABLED 2026-09-09 (v1 load sends no originatingUniqueId) =====
		// transactionObj.setTransactionAttribute("esewaOriginatingUniqueId",originatingUniqueId);
		// ===== end eSewa v2 =====
		transferMod.presentationController.validateEsewa(param);
		}
		else{
			applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.Accounts.AvailableBalanceError"));	
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		getEsewaID:function(){
		try{
		var scope=this;
		var textboxValue=scope.view.lblTxtAccNo.text;
		var lblValue=scope.view.lblesewaid.text;
		if(textboxValue.length!=0){
		return textboxValue;
		}
		else{
		return lblValue;
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		getTargetAmount:function(amount){
		try{
		var scope=this;
		var rangeData=scope.esewafeeDetails;
		if(rangeData){
		var transactionObj = applicationManager.getTransactionsListManager();
		var range = rangeData.find(item =>
		amount >= parseFloat(item.minRange) && amount <= parseFloat(item.maxRange)
		);
		transactionObj.setTransactionAttribute("esewaCharges",parseFloat(range.feeValue));
		return range ? parseFloat(range.feeValue)+parseFloat(amount) : 0;
		}
		else{
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		}
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		repeatTransaction:function(){
		try{
		var scope=this;
		var navManager = applicationManager.getNavigationManager();
		navManager.setCustomInfo("isRepeat",false);
		var data=navManager.getCustomInfo("eSewaHistoryDetails");
		scope.view.lblTxtAccNo.text=data.EsewaId;
		scope.view.txtAmount.text=data.Amount;
		scope.view.lblTpurpose.text=data.Purpose;
		scope.validateContinueButton();
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
		},
		invokeQRData:function(data){
		try{
		var scope=this;
		scope.view.lblesewaid.setVisibility(true);
		scope.view.lblTxtAccNo.setVisibility(false);
		scope.view.lblesewaid.text=data.eSewa_id;
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
