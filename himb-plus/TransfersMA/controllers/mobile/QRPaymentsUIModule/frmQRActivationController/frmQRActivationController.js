define({
  init: function () {
	  try{
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentFormObject);
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
 },
  //invoked everytime when navigated to form
  preShow: function () {
	  try{
    var scope = this;
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler = applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUQRPAYMENT);
    scope.initActions();
	this.view.flxSeperator2.setVisibility(false);
	this.view.flxCheckBox.setVisibility(false);
	this.view.flxAccept.setVisibility(false);
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxFooterMenu.isVisible = true;
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMain.top = "56dp";
      this.view.flxFooterMenu.isVisible = false;
    }
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var navMan=applicationManager.getNavigationManager();
    var defaultAccountData=navMan.getCustomInfo("frmSetDefaultAccount");
    var accData=navMan.getCustomInfo("frmQRFromAccountdata");
    var fromAccountsdata=navMan.getCustomInfo("frmQRFromAccount");
  var res=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
    var accounts=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    })
  if(fromAccountsdata==null||fromAccountsdata==undefined){
    fromAccountsdata={"fromaccounts":accounts};
    navMan.setCustomInfo("frmQRFromAccount",fromAccountsdata);
  }
    accounts=qrPresentationController.processAccountsData(accounts);
    var proccesedData;
    if(defaultAccountData && fromAccountsdata.fromaccounts){
        var defaultAcoountValue;
        for(i=0;i<defaultAccountData.length;i++){
            if(defaultAccountData[i].lblTitle=="QR Payments"){
                defaultAcoountValue=defaultAccountData[i];
            }
        }
        for(i=0;i<fromAccountsdata.fromaccounts.length;i++){
            if(defaultAcoountValue.lblAccId==fromAccountsdata.fromaccounts[i].accountID || defaultAcoountValue.lblAccId==fromAccountsdata.fromaccounts[i].Account_id){
                proccesedData=qrPresentationController.processAccountsData(fromAccountsdata.fromaccounts);
                qrPresentationController.setFromAccountsForTransactions(proccesedData[0]);
            }
        }
        this.view.lblSelect.text= proccesedData[0].processedName;
        //if(this.view.imgTermsAccepted.src === "checkboxtick.png"){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
        //}
    }
    else if(qrPresentationController.getTransObject().fromProcessedName){
      this.view.lblSelect.text = qrPresentationController.getTransObject().fromProcessedName;
      //if(this.view.imgTermsAccepted.src === "checkboxtick.png"){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      //}
    } else  if(accData){
        this.view.lblSelect.text= accData.fromaccounts[0].processedName;
        //if(this.view.imgTermsAccepted.src === "checkboxtick.png"){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
        //}
    }
    else if (qrPresentationController.isEmptyOrNullOrUndefined(qrPresentationController.getTransObject().fromProcessedName)) {
      this.view.lblSelect.text = kony.i18n.getLocalizedString("i18n.ACH.Select");
    }
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  //defined actions
  initActions: function () {
	  try{
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    /*scope.view.btnContinue.onClick = function () {
     // qrPresentationController.activateQRPayment();
    };*/
	scope.view.btnContinue.onClick =  this.termsAndConditions
      scope.view.flxBankAcc.onClick = function () {
      navMan.setEntryPoint("frmQRFromAccount", "frmQRActivation");
      navMan.setCustomInfo("QRNavigationData","frmQRfromAcc")
      //qrPresentationController.getFromAccounts();
      applicationManager.getPresentationUtility().showLoadingScreen();
	  var fromAccount=navMan.getCustomInfo("frmQRFromAccount");
	 var accounts=qrPresentationController.processAccountsData(fromAccount.fromaccounts);
	  var PopupObj={
					"accounts":accounts,//should br Array of object[{},{},{}...]
					"flowType":"QR",
					"rowClickCallback":scope.onRowSelection.bind(this)
				};
				applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
    };
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.flxCheckBox.onClick = this.toggleCheckBox;
    this.view.btnTnC.onClick = this.termsAndConditions;
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  onNavigate: function () {
	  try{
    // Footer Menu
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      var footerMenuUtility = require("FooterMenuUtility");
      this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
      var cm = applicationManager.getConfigurationManager();
      this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
      };
      this.footerMenuUtility.scope = this;
      this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
    }
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  toggleCheckBox: function () {
	  try{
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    if (this.view.imgTermsAccepted.src === "checkbox_normal.png"){
      this.view.imgTermsAccepted.src = "checkboxtick.png";
      if(!qrPresentationController.isEmptyOrNullOrUndefined(qrPresentationController.getTransObject().fromProcessedName)) {   
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
    }else {
      this.view.imgTermsAccepted.src = "checkbox_normal.png";
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "ICSknBtnInactive";
    }
    }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  termsAndConditions: function () {
    try{
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    qrPresentationController.getTermsAndConditions();
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  navigateCustomBack: function () {
	  try{
    var navMan = applicationManager.getNavigationManager();
    //navMan.navigateTo({ "appName": "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
     navMan.goBack();
	 }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  bindGenericError: function (errorMsg) {
	  try{
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  setDefaultAccountData:function(data){
	  try{
    if(data){
    this.view.lblSelect.text=data[0].processedName;
  }
  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
  },
  onRowSelection:function(row){
	  try{
		var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
		var accountNumber=row[0].lblAccNumber;
		this.view.flxPopupfrombottom.setVisibility(false);
		var qraccounts=applicationManager.getNavigationManager().getCustomInfo("frmQRFromAccount").fromaccounts;
		var processedaccounts=qrPresentationController.processAccountsData(qraccounts);
		var acc=processedaccounts.filter(function(account){
			if(accountNumber==account.accountID)
				return account;
		});
		qrPresentationController.setFromAccountsForTransactions(acc[0]);
		this.view.lblSelect.text=acc[0].processedName;
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa sample*********************************"+e);
		}
	},
});
