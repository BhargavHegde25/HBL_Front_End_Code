define(['CampaignUtility', 'CommonUtilities','FooterMenuUtility'], function(CampaignUtility, CommonUtilities,FooterMenuUtility) {
  var count = "";
  this.masked="";
  this.maskedAmount="";
  this.unmaskedAmount="";
  this.accNumber="";
  var navManager = applicationManager.getNavigationManager();
  var loggerManager = applicationManager.getLoggerManager();
  return {
    init: function(){
     kony.print("PERF|D_INIT_S|" + Date.now()); // PERF-TEMP
     try{
	var currentForm = kony.application.getCurrentForm().id;
     //applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
     var configManager = applicationManager.getConfigurationManager();
      var MenuHandler = applicationManager.getMenuHandler();
       MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUACCOUNTS);
       this.view.onDeviceBack = this.deviceBack;
	  this.view.onNavigate = this.onNavigate;
    this.view.postShow= this.postShow;
     }catch(e){
kony.print("***************Error in HBL Dashboard init function**********"+e);
     }
     kony.print("PERF|D_INIT_E|" + Date.now()); // PERF-TEMP
    },
    onNavigate: function(response){
	try{
	if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        var footerMenuUtility = require("FooterMenuUtility");
            if(count === ""){
        this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
              count = 1;
            }else {
              this.footerMenuUtility =
        footerMenuUtility.footerInstanceWhenlanguageChange();
            }
        var cm = applicationManager.getConfigurationManager();
        this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
        };
        this.footerMenuUtility.scope = this;
      }
	  if(response.hasOwnProperty("noCategory") && (!kony.sdk.isNullOrUndefined(response.noCategory))){
    this.closeAllCategory();
  }
	}catch(err){
	kony.print("err"+err);
	}
     /*if(response.defaultAccount) {
                var data = response.defaultAccount;
                this.mapCardData(data);
            }*/
    },
	setCardIMage:function(){
		var navMan=applicationManager.getNavigationManager();
		res = navMan.getCustomInfo("DashboardCardImg");
		this.view.imgCards.src=res;
	},
    preShow: function(){
      kony.print("PERF|D_PRESHOW_S|" + Date.now()); // PERF-TEMP
      var scope = this;
	  var navManager = applicationManager.getNavigationManager();
	  var presentationUtility=applicationManager.getPresentationUtility();
	  var showPop = navManager.getCustomInfo("showPopup");
	  var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "AuthenticationMA","moduleName":"AuthUIModule"});
         authMode.presentationController.firstTimeLoginDone();
	  if(showPop){
		  var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("kony.mb.SupportInfo.Title"),
      "message": kony.i18n.getLocalizedString("18n.HBL.Cards.ResetPinError"),
      "alertHandler": scope.alertCallbacks.bind(scope),
      "yesLabel": kony.i18n.getLocalizedString("i18n.enrollNow.proceed"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
	presentationUtility.Alert(basicConfig, pspConfig, {});   
	  }
	  this.view.imgCards.imageWhileDownloading= "loadfull.gif";
	  this.view.imgCards.imagewhenfailed= "card_red.jpg";
      //this.view.imgSettings.src ="https://www.connectips.com/cdn/CONNECTIPS/connectipsweb/images/dashboard/nea.png";
	  scope.setCardIMage();
     // alert("controller invoke");
     var navManager = applicationManager.getNavigationManager();
      if (applicationManager.getPresentationFormUtility().getDeviceName() !==	"iPhone") {
			scope.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
			//scope.view.customHeader.flxBack.isVisible = false;
            scope.view.flxTitle.isVisible = true;
          scope.view.flxMenu.isVisible = false;
		}else if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
          //scope.view.flxDashboardHeader.top ="45dp";
          scope.view.flxTitle.isVisible = true;
          scope.view.flxMenu.isVisible = true;
          scope.view.flxMenu.bottom ="-1%";
          scope.view.flxHamburger.height ="100%";
        }
      const configManager = applicationManager.getConfigurationManager();
      const isCampaignMAPresent = configManager.isMicroAppPresent('CampaignMA');      
      if(isCampaignMAPresent){
        this.view.campaignCarousel.setVisibility(true);
      } else {
        this.view.campaignCarousel.setVisibility(true);
      }
      var flag=navManager.getCustomInfo("getAccountList");
      (flag===true)?this.view.flxSwitchAcc.setVisibility(true):this.view.flxSwitchAcc.setVisibility(false)
     scope.accountNavigation();
      kony.print("PERF|D_FLOWACTION_S|" + Date.now()); // PERF-TEMP
      scope.setFlowAction();
	  
      scope.setQuicklinksAndServices();
      kony.print("PERF|D_QUICKLINKS_E|" + Date.now()); // PERF-TEMP
      /*let accounts = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
        appName: "ArrangementsMA",
        moduleName: "AccountUIModule"
      });
      accounts.presentationController.accountActivity();*/
       scope.view.flxHamburger.isVisible = false;
		 var scope=this;
       var defaultAccForDashboard = applicationManager.getDefaultDashboardObj();
     // var data = defaultAccForDashboard.Accounts;
	  var data = defaultAccForDashboard.Accounts;
	  var res=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	   var QrDefaultAcc=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode=="NPR";
    });
	var esewaDefaultAcc=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& (account.accountType=="Checking"||account.accountType=="Current" ||account.accountType=="Savings")&& account.currencyCode=="NPR";
    });
	  var FDDefaultAcc=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && (account.accountType!="Checking"||account.accountType!="Current" )&& account.currencyCode=="NPR";
    });
	 var defaultDashboardAcc = {"DashboardDefaultAcc":data[0].account_id};
	  if(QrDefaultAcc.length!=0){
		  defaultDashboardAcc.QrDefaultAcc=QrDefaultAcc[0].accountID;
	  }
	  else{
		  defaultDashboardAcc.QrDefaultAcc="";
	  }
	   if(esewaDefaultAcc.length!=0){
		  defaultDashboardAcc.esewaDefaultAcc=esewaDefaultAcc[0].accountID;
	  }
	  else{
		  defaultDashboardAcc.esewaDefaultAcc="";
	  }
	  if(FDDefaultAcc.length!=0){
		  defaultDashboardAcc.FDDefaultAcc=FDDefaultAcc[0].accountID;
	  }
	  else{
		  defaultDashboardAcc.FDDefaultAcc="";
	  }
      this.mapCardData(data);
      kony.print("PERF|D_MAPCARD_E|" + Date.now()); // PERF-TEMP
     
      this.validateDefaultAccounts(defaultDashboardAcc);
      kony.print("PERF|D_VALIDATEDEF_E|" + Date.now()); // PERF-TEMP
      //applicationManager.getPresentationFormUtility().logFormName(currentForm);
     /* scope.view.HeaderHbl.flxBack.onClick = function(){
         let MenuHandler = applicationManager.getMenuHandler();
        MenuHandler.setProfilePic(scope);
        MenuHandler.setLastLoginTime(scope);
        MenuHandler.setUserName(scope);
        MenuHandler.setEntityName(scope);
        let selectedForm = kony.application.getCurrentForm().id;
        MenuHandler.setMenuData(scope, selectedForm);
        MenuHandler.showOrHideHamburgerUI(false, scope)
      };*/
      navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
      navManager.setCustomInfo("filterFlag",null);
      var isAppPresent = configManager.isMicroAppPresent("AuthenticationMA");
      if (isAppPresent === true) {
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        authMode.presentationController.firstTimeLoginDone();
      }
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       kony.print("PERF|D_PRESHOW_E|" + Date.now()); // PERF-TEMP
     },
     accountNavigation: function(){
      this.view.flxViewHeader.onClick = function(){
		  applicationManager.getPresentationUtility().showLoadingScreen();
		  var navMan=applicationManager.getNavigationManager();
       /* const configManager = applicationManager.getConfigurationManager();
          const isAuthUIModulePresent = configManager.isMicroAppPresent('AuthenticationMA');
          if (isAuthUIModulePresent) {
          var authMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ appName: "AuthenticationMA", moduleName: "AuthUIModule"});
        authMode.presentationController.navigationAfterLogin();
          }
          ////new code
    var frmName = "";
	var customercsod=navMan.getCustomInfo("frmCustomerDashboard");
	customercsod.reDesignFlow="true";
	navMan.setCustomInfo("frmCustomerDashboard",customercsod);
    frmName = {"appName": "HomepageMA","friendlyName": "AccountsUIModule/frmUnifiedDashboard"}; */
    //navManager.navigateTo(frmName);
	var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName": "AccountsUIModule"});
    accountMod.presentationController.oldDashboard();
    //applicationManager.getPresentationUtility().dismissLoadingScreen();
       }.bind(this);
     },
     postShow: function () {
		 kony.print("PERF|D_POSTSHOW|" + Date.now()); // PERF-TEMP
		 try{
		 var scope=this;
      scope.view.flxRequestDeposit.onClick = scope.setFixedDepositVisibility.bind(this);
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageCardsUIModule", "appName": "CardsMA" });
      manageCardsModule.presentationController.getBankDateMB();
	  applicationManager.getTransfersManager().getList("", scope.getListSuccess.bind(scope),scope.getListError.bind(scope));
      applicationManager.getPresentationUtility().dismissLoadingScreen();
		 }catch(e){
			 kony.print("error"+e);
		 }
    }, 	
	getListSuccess:function(res){applicationManager.getPresentationUtility().dismissLoadingScreen();},
	getListError:function(err){applicationManager.getPresentationUtility().dismissLoadingScreen();},
    onHide: function(){
      kony.application.destroyForm({
                "appName": "HomepageMA",
                "friendlyName": "frmHBLUnifiedDashboard",
            });
    },
    setFlowAction: function(){
		try{
		 var scope = this;
      var configManager = applicationManager.getConfigurationManager();
        const isRegionalTransferMAPresent = configManager.isMicroAppPresent(configManager.microappConstants.REGIONALTRANSFER);
		this.view.flxAccInfoPopupContainer.onClick=function(){
			scope.view.flxAccInfoPopupContainer.setVisibility(false);
		};
		this.view.imgclose.onTouchEnd=function(){
			scope.view.flxAccInfoPopupContainer.setVisibility(false);
		};
		this.view.flxAccinfo.onClick=function(){
			applicationManager.getPresentationUtility().showLoadingScreen();
			var data={"accountID":scope.accNumber};
			 applicationManager.getAccountManager().fetchAccountDetails(data, scope.successAccInfo.bind(scope), scope.failureAccInfo.bind(scope));
		};
        this.view.flxTransfers.onClick = function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "TransfersMA",
                    moduleName: "ManageActivitiesUIModule"
                });
        accMode.presentationController.transferFlow = "sameBank";
        accMode.presentationController.addpayeeFlow = "";
        accMode.presentationController.getList();
      /*  var navMan = applicationManager.getNavigationManager();
           var transferTypeDetails = {
                    "transferType": "Within Same Bank",
                    "id": "MakeTransfer"
                };
               navMan.setCustomInfo("UTFFlow", "UTFNew");
                if (transferTypeDetails["transferType"] === "Within Same Bank") {
                    //       var ntf = new kony.mvc.Navigation("frmSameBank");
                    navMan.setCustomInfo("frmSameBank", transferTypeDetails);
                    navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmSameBankNew"
                    });
                }*/
      };
      this.view.flxBillPayment.onClick = function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
         var accMode = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({
                    appName: "TransfersMA",
                    moduleName: "ManageActivitiesUIModule"
                });
          accMode.presentationController.transferFlow = "domesticBank";
          accMode.presentationController.addpayeeFlow = "";
         // accMode.presentationController.getList();
		 var sana=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
		 sana.Accounts=sana; 
		  accMode.presentationController.getListSuccess(sana);
       /* var navMan = applicationManager.getNavigationManager();
        var transferTypeDetails = {
                    "transferType": "Domestic Transfer",
                    "id": "MakeTransfer"
                };
            navMan.setCustomInfo("UTFFlow", "UTFNew");
            if(transferTypeDetails["transferType"] === "Domestic Transfer") {
                navMan.setCustomInfo("frmDomesticTransferNew", transferTypeDetails);
                navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmDomesticTransferNew"});
      };*/
      },
    this.view.flxCheque.onClick = function(){
     /* var chequeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA","moduleName":"ChequeManagementUIModule"});
          chequeMod.presentationController.clearFlowValues();
          chequeMod.presentationController.navigateToChequeLandingScreen();*/
		  var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "ManageActivitiesUIModule",
      "appName": "TransfersMA"
    });
				transferMod.presentationController.navigateToEsewaLoad();
    };
      this.view.flxSettings.onClick = function(){
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
         settingsModule.presentationController.showSettings();
        // applicationManager.getPresentationUtility().showLoadingScreen();
          //kony.timer.schedule("timer4",scope.generateAlert, 3, true);
      };
       
      this.view.flxCardManage.onClick = function(){
         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "ManageCardsUIModule",
                    "appName": "CardsMA"
                });
                manageCardsModule.presentationController.isFirstTime = true;
                manageCardsModule.presentationController.showCardsHome();
      };
     this.view.flxManage.onClick = function(){
		 applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan = applicationManager.getNavigationManager();
          navMan.setCustomInfo("removeAttachments",true);
          var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
          navMan.setEntryPoint("centralmoneymovement","frmManageRecipientType");
          moneyMovementModule.clearMMFlowAtributes();
          moneyMovementModule.enterManageRecipientsFlow();
          };
        
        this.view.flxSwitchAcc.onClick= function(){
        applicationManager.getNavigationManager().setCustomInfo("navigation", "HBLDashboard");
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
         settingsModule.presentationController.setDataDefaultLogin(1);
        };

        this.view.flxCrossBorder.onClick = function(){
            applicationManager.getPresentationUtility().showLoadingScreen();
              var navMan = applicationManager.getNavigationManager();
                    navMan.setCustomInfo("removeAttachments", true);
                    //var transMod = applicationManager.getModulesPresentationController("TransactionModule");
                    var moneyMovementModule = applicationManager.getModulesPresentationController({
                        "moduleName": "MoneyMovementUIModule",
                        "appName": "TransfersMA"
                    });
                    moneyMovementModule.clearMMFlowAtributes();
                    navMan.setEntryPoint("centralmoneymovement", "frmTransferActivitiesTransfers");
                    navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "MoneyMovementUIModule/frmTransferActivitiesTransfers"
                    });

        };
		this.view.flxAccdetailsContainer.onClick=this.NavigateToaccDetails;
		}catch(err){
		kony.print("err"+err);	
		}
    },
   /* generateAlert:function(){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.timer.cancel("timer4");
    },*/
    mapCardData: function(data){
      try {
      var formatUtility = applicationManager.getFormatUtilManager();
      if(!(data === ""|| null || undefined)){
		  if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(data[0].nickName)){	
		  this.view.lblCustomerName.text = data[0].accountName;
		  }else{
			this.view.lblCustomerName.text = data[0].nickName;  
		  }
		  /*if(data[0].IBAN !== "NA"){
         var mask = data[0].IBAN.slice(-4);
         var remainingData =data[0].IBAN.slice(0,-4);
      this.masked = "X".repeat(remainingData.length) + mask;
	  
      this.view.lblAccountNumber.text =this.masked;
      this.accNumber= data[0].IBAN;
         }else{*/
          var mask = data[0].Account_id.slice(-4);
          var remainingData =data[0].Account_id.slice(0,-4);
          this.masked = "X".repeat(remainingData.length) + mask;
          this.view.lblAccountNumber.text =this.masked;
          this.accNumber=data[0].Account_id;
        // }
          var mask = data[0].Account_id.slice(-4);
          var remainingData =data[0].Account_id.slice(0,-4);
          this.masked = "X".repeat(remainingData.length) + mask;
          this.view.lblAccountNumber.text =this.masked;
          this.accNumber=data[0].Account_id;
         }
		 this.view.imgIcon.src ="eyeopen.png";
         this.view.imgIcon.onTouchStart=this.peekiconVisible;
         this.view.lblAccountType.text = data[0].description;
         //this.view.lblAvailableBalanceValue.text = data[0].currencyCode+" "+data[0].availableBalance;
		 this.unmaskedAmount=formatUtility.formatAmountandAppendCurrencySymbol(data[0].availableBalance, data[0].currencyCode);
		 this.maskedAmount=data[0].currencyCode+" XXX.XX";
         //this.view.lblAvailableBalanceValue.text = formatUtility.formatAmountandAppendCurrencySymbol(data[0].availableBalance, data[0].currencyCode)
		 this.view.lblAvailableBalanceValue.text = this.maskedAmount;
      
       } catch (err) {
         loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
       }
    },

    peekiconVisible: function(){
        try{
         if(this.view.imgIcon.src == "eyeclose.png"){
            this.view.lblAccountNumber.text =this.masked;
			 this.view.lblAvailableBalanceValue.text =this.maskedAmount;
            this.view.imgIcon.src ="eyeopen.png";
         }else{
            this.view.lblAccountNumber.text =this.accNumber;
			this.view.lblAvailableBalanceValue.text =this.unmaskedAmount;
            this.view.imgIcon.src ="eyeclose.png";
         } 
            }catch(err){
                kony.print("peekiconVisible"+err);
            }
    },

    validateDefaultAccounts: function (defaultDashboardAcc){
      try {
         var serviceCallReq = false;
         var userObj = applicationManager.getUserPreferencesManager().getUserObj();
         if (userObj['default_account_loanpayment'] === null) {
             userObj['default_account_loanpayment'] = defaultDashboardAcc.DashboardDefaultAcc;
             serviceCallReq = true;
         }
         if (userObj['default_account_cardpayment'] === null) {
             userObj['default_account_cardpayment'] = defaultDashboardAcc.DashboardDefaultAcc;
             serviceCallReq = true;
         }
         if (userObj['default_account_checkmanagement'] === null) {
             userObj['default_account_checkmanagement'] = defaultDashboardAcc.DashboardDefaultAcc;
             serviceCallReq = true;
         }
         if (userObj['default_account_checkdeposit'] === null) {
             userObj['default_account_checkdeposit'] = defaultDashboardAcc.DashboardDefaultAcc;
             serviceCallReq = true;
         }
         if (userObj['default_account_transfers'] === null) {
             userObj['default_account_transfers'] = defaultDashboardAcc.DashboardDefaultAcc;
             serviceCallReq = true;
         }
         if (userObj['default_account_billPay'] === null) {
             userObj['default_account_billPay'] = defaultDashboardAcc.DashboardDefaultAcc;
             serviceCallReq = true;
         }
		 if (userObj['default_account_esewa'] == null||userObj['default_account_esewa'] == undefined) {
             userObj['default_account_esewa'] = defaultDashboardAcc.esewaDefaultAcc;
             serviceCallReq = true;
         }
        var accountObj = applicationManager.getAccountManager();
        var acctInfo = accountObj.getSavingsAndCheckingsAccounts();
        var filterList = function (input) {
          try {
            let accountData = JSON.parse(JSON.stringify(input));
            let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
            return filteredAccountData;
          } catch (err) {
            return input;
         }
        };
        var filterListBasedOnCurrency = function (input) {
          try {
            let accountData = JSON.parse(JSON.stringify(input));
            //let filteredAccountData = accountData.filter(item => ((["NPR"].includes(item["currencyCode"].toUpperCase()))));
            let filteredAccountData = accountData.filter(item =>
            item.currencyCode === "NPR" &&
            item.supportTransferFrom === "1"
          );
            return filteredAccountData;
          } catch (err) {
            return input;
         }
        };
        var acctInfoInp = filterList(acctInfo);
        var acctInfoBasedOnCurrency = filterListBasedOnCurrency(acctInfoInp);
        /*
        if (acctInfoBasedOnCurrency.length === 0) {
          var userObj = applicationManager.getUserPreferencesManager().getUserObj();
          userObj['default_account_deposit'] = null;
          userObj['default_account_cardless'] = null;
          userObj['default_from_account_qr'] = null;
          serviceCallReq = true;
         }
        */
        if (acctInfoBasedOnCurrency.length === 0) {
          var userObj = applicationManager.getUserPreferencesManager().getUserObj();
          userObj['default_account_deposit'] = null;
          userObj['default_account_cardless'] = null;
          userObj['default_from_account_qr'] = null;
          serviceCallReq = true;
        } else {
          if ((acctInfoInp !== null) && (acctInfoInp !== "") && (acctInfoInp !== undefined)) {
            for (i = 0; i < acctInfoInp.length; i++) {
              if (acctInfoInp[i].Account_id === defaultDashboardAcc) {
                var currencyCode = acctInfoInp[i].currencyCode;
              }
            }
          }
          if (currencyCode === "NPR") {
            if (kony.sdk.isNullOrUndefined(userObj['default_account_deposit'])) {
              userObj['default_account_deposit'] = defaultDashboardAcc.FDDefaultAcc;
              serviceCallReq = true;
            }
            if (kony.sdk.isNullOrUndefined(userObj['default_from_account_qr'])) {
              userObj['default_from_account_qr'] = defaultDashboardAcc.QrDefaultAcc;
              serviceCallReq = true;
            }
            if (kony.sdk.isNullOrUndefined(userObj['default_account_cardless'])) {
              userObj['default_account_cardless'] = defaultDashboardAcc.DashboardDefaultAcc;
              serviceCallReq = true;
            }
          } else {
            var data = acctInfoBasedOnCurrency[0];
            var acctId = data.accountID;
            if (kony.sdk.isNullOrUndefined(userObj['default_account_deposit'])) {
              userObj['default_account_deposit'] = defaultDashboardAcc.FDDefaultAcc;;
              serviceCallReq = true;
            }
            if (kony.sdk.isNullOrUndefined(userObj['default_from_account_qr'])) {
              userObj['default_from_account_qr'] = defaultDashboardAcc.QrDefaultAcc;
              serviceCallReq = true;
            }
            if (kony.sdk.isNullOrUndefined(userObj['default_account_cardless'])) {
              userObj['default_account_cardless'] = defaultDashboardAcc.DashboardDefaultAcc;
              serviceCallReq = true;
            }
          }
         }

         if (serviceCallReq) {
             var dataJSON = {};
             dataJSON = {
               "default_account_transfers": userObj['default_account_transfers'],
               "default_account_billPay": userObj['default_account_billPay'],
               "default_account_loanpayment": userObj['default_account_loanpayment'],
               "default_account_cardpayment": userObj['default_account_cardpayment'],
            "default_from_account_qr": userObj['default_from_account_qr'],
               "default_account_deposit": userObj['default_account_deposit'],
               "default_account_checkmanagement": userObj['default_account_checkmanagement'],
               "default_account_checkdeposit": userObj['default_account_checkdeposit'],
               "default_account_cardless": userObj['default_account_cardless'],
			   "default_account_esewa":userObj['default_account_esewa']
           }
           var infoCall = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ManageArrangementsUIModule", "appName": "ManageArrangementsMA" });
           infoCall.presentationController.verifyDefaultAccounts(dataJSON);
         }
       } catch (err) {
         loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
       }
  },
  setQuicklinksAndServices:function(){
	  var scope=this;
var configManager = applicationManager.getConfigurationManager();
     var userPermission=configManager.getUserPermissions();
     var userFeatures=configManager.getUserFeatures();
     var userFeatures=configManager.getUserFeatures();
	 if(!configManager.checkUserFeature("VIEW_ONLY_ROLE")){
		  scope.view.flxQuicks.setVisibility(true);
		 scope.view.flxServices.setVisibility(true);
		 if(userPermission.indexOf("INTRA_BANK_FUND_TRANSFER")!=-1||userFeatures.indexOf("INTRA_BANK_FUND_TRANSFER")!=-1){
        scope.view.flxTransfers.setVisibility(true);
     }
     else{
         scope.view.flxTransfers.setVisibility(false);
     }
     if(userPermission.indexOf("INTER_BANK_ACCOUNT_FUND_TRANSFER")!=-1||userFeatures.indexOf("INTER_BANK_ACCOUNT_FUND_TRANSFER")!=-1){
        scope.view.flxBillPayment.setVisibility(true);
     }
     else{
         scope.view.flxBillPayment.setVisibility(false);
     }
     if(userPermission.indexOf("ESEWA_TOPUP")!=-1||userFeatures.indexOf("ESEWA_TOPUP")!=-1){
        scope.view.flxCheque.setVisibility(true);
     }
     else{
         scope.view.flxCheque.setVisibility(false);
     }
      if(userPermission.indexOf("CARD_MANAGEMENT")!=-1||userFeatures.indexOf("CARD_MANAGEMENT")!=-1){
        scope.view.flxCardManage.setVisibility(true);
     }
     else{
         scope.view.flxCardManage.setVisibility(false);
     }
     if((userPermission.indexOf("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW")!=-1||userFeatures.indexOf("INTER_BANK_ACCOUNT_FUND_TRANSFER_VIEW")!=-1) &&
      (userPermission.indexOf("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW")!=-1||userFeatures.indexOf("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW")!=-1)){
        scope.view.flxCrossBorder.setVisibility(true);
     }
     else{
         scope.view.flxCrossBorder.setVisibility(false);
     }
     if(configManager.checkUserPermission("TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW_RECEPIENT")){
        scope.view.flxManage.setVisibility(true);
     }
     else{
        scope.view.flxManage.setVisibility(false);
     }
	 if(!configManager.checkUserPermission("FIXED_DEPOSIT")&&!configManager.checkUserFeature("FIXED_DEPOSIT")){
		 scope.view.flxRequestDeposit.setVisibility(false);
	 }
	 else{
		 scope.view.flxRequestDeposit.setVisibility(true); 
	 }
	 if(scope.view.flxRequestDeposit.isVisible||scope.view.flxManage.isVisible||scope.view.flxCrossBorder.isVisible||scope.view.flxCardManage.isVisible){
		 scope.view.flxServices.setVisibility(true);
	 }
	 else{
		 scope.view.flxServices.setVisibility(false);
	 }
	 if(scope.view.flxTransfers.isVisible||scope.view.flxBillPayment.isVisible||scope.view.flxCheque.isVisible){
		 scope.view.flxQuicks.setVisibility(true);
	 }
	 else{
		 scope.view.flxQuicks.setVisibility(false);
     }
	 }
	 else{
		 scope.view.flxQuicks.setVisibility(false);
		 scope.view.flxServices.setVisibility(false);
	 }
     
  },
    showErrorPopup: function () {
     // kony.ui.Alert({
       // "alertType": constants.ALERT_TYPE_INFO,
       // "alertTitle": "",
       // "message": kony.i18n.getLocalizedString("i18n.HBL.RequestFDError"),
      //  "alertHandler": this.alertCallback,
        //"yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      //},
      applicationManager.getPresentationUtility().Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.HBL.RequestFDError"),
        "alertHandler": this.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      }, {});
    },
    alertCallback: function () {
    },
    setFixedDepositVisibility: function () {
      var accountObj = applicationManager.getAccountManager();
      var acctInfo = accountObj.getSavingsAndCheckingsAccounts();
	  var navMan = applicationManager.getNavigationManager();
      var filterList = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          //let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          let filteredAccountData = accountData.filter(item => {
            return (item["accountType"].toUpperCase() === "SAVINGS" && !(["CLOSED"].includes(item["accountStatus"].toUpperCase())));
          });
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
	  navMan.setCustomInfo("fixedDepositFromDashboard", true);
      var filterListBasedOnCurrency = function (input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => ((["NPR"].includes(item["currencyCode"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      if (!kony.sdk.isNullOrUndefined(acctInfo)) {
        var acctInfoInp = filterList(acctInfo);
        var acctInfoBasedOnCurrency = filterListBasedOnCurrency(acctInfoInp);
        if (acctInfoBasedOnCurrency.length === 0) {
          this.showErrorPopup();
        } else {
          
          navMan.setCustomInfo("fixedDepositFromDashboard", true);
          navMan.setCustomInfo("fixedDepositEligibleAccounts", acctInfoBasedOnCurrency);
          applicationManager.getPresentationUtility().showLoadingScreen();
          navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmFixedDeposit" });
        }
      }
    },
	 NavigateToaccDetails: function() {
     var defaultDashboardAcc = this.accNumber;
		var allAccounts=applicationManager.getAccountManager().getAllAccounts().internalAccounts;
		var accData=allAccounts.filter(function(acc){
			if(acc.accountID==defaultDashboardAcc)
				return acc;
		});
		accData=accData[0];
      applicationManager.getPresentationUtility().showLoadingScreen();
      var selectedAccountId = accData["accountID"];
      var contextData = {
        "accountID": accData["accountID"],
        "accountType": accData["accountType"],
        "currencyCode": accData["currencyCode"],
        "isBusinessAccount": accData["isBusinessAccount"],
        "accountName": (accData["accountName"]) ? accData["accountName"] : "",
        "nickName": (accData["nickName"]) ? accData["nickName"] : "",
      }
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountUIModule", "appName": "ArrangementsMA" });
      var navManager = applicationManager.getNavigationManager();
      contextData.accountType = this.getDefaultKey(contextData.accountType);
      navManager.setCustomInfo("frmAccountDetails", contextData);
      navManager.setCustomInfo("currencyDetails", contextData);
      navManager.setCustomInfo("accountMembershipId", accData.Membership_id);
      var closeAccount={
        "accountID":contextData.accountID,
        "accountName":contextData.accountName
      };
      var selectedAc=applicationManager.getAccountManager().getInternalAccounts().filter(function(ac){return ac.accountID === contextData.accountID})
      navManager.setCustomInfo("CloseAccountPopup", closeAccount);
      navManager.setCustomInfo("selectedAccount", selectedAc[0]);
      navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
    },
	getDefaultKey : function(key) {
      var customKey = "";
      switch(key) {
        case kony.i18n.getLocalizedString("i18n.Accounts.displaySavingsmb"): customKey = "Savings"; break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayCheckingmb"): customKey = "Checking" ;break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayLoanmb"): customKey = "Loan";break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayDepositmb"): customKey = "Deposit";break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayDepositmb"): customKey = "CreditCard";break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayMortgagemb"): customKey = "Mortgage"; break;
        default: customKey = key;
      }
      return customKey;
    },
	failureAccInfo:function(err){
	try{
		applicationManager.getPresentationUtility().dismissLoadingScreen();
			applicationManager.getPresentationUtility().Alert(err.errorMessage);
		}catch(err){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
		}	
	},
	successAccInfo:function(res){
		try{
			var scope=this;
			var data=res[0];
			var formatUtility = applicationManager.getFormatUtilManager();
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			kony.print("Response"+res);
			scope.view.segAccINfo.rowTemplate="flxacclistData";
			scope.view.segAccINfo.widgetDataMap={"lblKey":"lblKey","lblValue":"lblValue"};
			var segData=[];
			if(JSON.parse(data.accountHolder).fullname){
				segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.TradeFinance.customerNameWithColon"),"lblValue":JSON.parse(data.accountHolder).fullname});
            }
			if(data.currentBalance){
				segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.common.currentBalanceWithColon"),"lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.currentBalance, data.currencyCode)});
			}
			if(data.availableBalance){
				segData.push({"lblKey":kony.i18n.getLocalizedString("kony.i18n.verifyDetails.availableBalance"),"lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.availableBalance, data.currencyCode)});
			}
			
			if(data.pendingWithdrawal){
				segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.HBL.DebitUnderProcess")+" :","lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.pendingWithdrawal, data.currencyCode)});
			}
			if(data.blockedAmount){
				segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.blockedAmout")+" :","lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.blockedAmount, data.currencyCode)});
			}
			if(data.dividendLastPaidAmount){
				segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.lastPaidInterest")+" :","lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.dividendLastPaidAmount, data.currencyCode)});
			}
			if(data.dividendPaidYTD){
				segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.accountDetail.paidInterestYTD")+" :","lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.dividendPaidYTD, data.currencyCode)});
			}
			if(data.lastPaymentDate){
				segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.accountDetail.paidOnDate")+" :","lblValue":applicationManager.getFormatUtilManager().getFormatedDateString(new Date(data.lastPaymentDate),'m/d/y')});
			}
			if(data.dividendRate){
				segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.accountDetail.crdrInterestRate")+" :","lblValue":data.dividendRate+"%"});
			}
			if(data.accruedInterest){
				segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.interestAccrued")+" :","lblValue":formatUtility.formatAmountandAppendCurrencySymbol(data.accruedInterest, data.currencyCode)});
			}
			scope.view.segAccINfo.setData(segData);			
			scope.view.flxAccInfoPopupContainer.setVisibility(true);
		}catch(err){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
		}
	},
	closeAllCategory: function(){
    var scope =this;
    var basicProperties = {
    "message": kony.i18n.getLocalizedString("i18n.olb.billpay.NoMerchatFound"),
    "alertType": constants.ALERT_TYPE_CONFIRMATION,
    "alertTitle": "",
    "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("i18n.savingsPot.ok"),
    "noLabel": "",
    "alertIcon": "",
    "alertHandler": "",
};
applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
},
alertCallbacks:function(res){
	if(res){
	  var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "SettingsUIModule",
                    "appName": "ManageProfileMA"
                });
                settingsMode.presentationController.navigateToSetOrResetTransactionPin();
	}
	else{}
},
    showGenericErrorMsg: function (error) {
      try {
        var scope = this;
        if (!kony.sdk.isNullOrUndefined(error)) {
          applicationManager.getDataProcessorUtility().showToastMessageError(scope, error);
        } else {
          kony.timer.schedule("waitforpopup", this.waitforpopup, 7);
          applicationManager.getDataProcessorUtility().showToastMessageError(scope, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
        }
      } catch (err) {
        kony.print("err" + err);
      }
    },
waitforpopup: function(){
	try{
	kony.timer.cancel("waiforpopup");
	applicationManager.getPresentationUtility().dismissLoadingScreen();
	}catch(err){
	kony.print("err"+err);
	}
},
deviceBack: function(){
  try{
    let signOutStr = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
    var basicConf = {
        message: signOutStr,
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        yesLabel: "Yes",
        noLabel: "No",
        alertHandler: function(res) {
            if (res === true) {
                applicationManager.getPresentationFormUtility().logoutUser(true);
            }
        }
    };
    var pspConf = {
        contentAlignment: constants.ALERT_CONTENT_ALIGN_LEFT,
        iconPosition: constants.ALERT_ICON_POSITION_LEFT
    };
    applicationManager.getPresentationUtility().Alert(basicConf, pspConf);
  }catch(err){
    kony.print("deviceBack"+err);
  }
},
  };
});