define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
   var navManager = applicationManager.getNavigationManager();  
    return {
init: function(){
    var currentForm=navManager.getCurrentForm();
   applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  this.view.preShow = this.preShow;
 //  this.view.postShow = this.postShow;
   
},
onNavigate(uidata){
    try{
    if(uidata.selectedAcc){
        this.selectedAcc();
    }
    if(uidata.Activate){
        this.resetUI();
    }
    }catch(err){
   kony.print("onNavigate"+ err);
    }
},

 preShow: function(){
    try{
    var scope = this;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxScrollMain.top = "0dp";
    }
     else{
        this.view.flxHeader.isVisible = true;
       this.view.flxScrollMain.top = "56dp";
     }
    this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
     this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
         var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        var billPayAcccounts = this.segmentData(presenter.getSingelBillPaySupportedAccounts());
    //this.segmentData(billPayAccount);
     /* this.view.flxSegment.onClick = function(){
        scope.view.segDefaultAcc.setVisibility(true); 
        scope.view.imgIcons.src ="arrowup.png";
      }.bind(this);*/
       this.view.flxSegment.onClick = function(){
        scope.fromAccSelect();
      }.bind(this);
       this.view.segDefaultAcc.onRowClick = function(){
      this.selectedAccount();
       }.bind(this);
      this.toggleCheckBox();
      this.view.customHeader.flxBack.onClick= function(){
        scope.onCancelClick();
      }.bind(this);
      this.view.customHeader.btnRight.onClick =function(){
        scope.onCancelClick();
      }.bind(this);
     this.view.btnContinue.onClick = function(){
        this.userPreferencesManager = applicationManager.getUserPreferencesManager();
         var presenter = applicationManager.getModulesPresentationController({
                'appName': 'BillPayMA',
                'moduleName': 'BillPaymentUIModule'
            });
       /* var data = {
                    "code": "ALL"
                };
       presenter.getCategories(data); */
       if((scope.view.imgChkBx.src== "checkbox_ticked.png")&&(scope.view.lblSegAcc.text != kony.i18n.getLocalizedString("i18n.wireTemplate.selectDefaultAccount"))){
      applicationManager.getPresentationUtility().showLoadingScreen();
       const param = {
            "userName": this.userPreferencesManager.getUserObj().userName
        };
        presenter.activateBillPay(param);
       }else{
        var errorMsg;
        scope.resBillInquiry(errorMsg);
       }
      };
       var userObj = applicationManager.getUserPreferencesManager();
            var accountObj = applicationManager.getAccountManager();
        var acctId = userObj.getDefaultAccountforBillPay();  
            var billPayDefaultAcc  = accountObj.getInternalAccountByID(acctId);
        var dashDefault =applicationManager.getDefaultDashboardObj().Accounts[0];
        if(billPayDefaultAcc!=null){
          this.view.lblSegAcc.text = CommonUtilities.truncateStringWithGivenLength(billPayDefaultAcc.accountName + "....", 20)+ billPayDefaultAcc.accountID.slice(1);
         // var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BillPaymentUIModule');
          presenter.selectedAccount =CommonUtilities.truncateStringWithGivenLength(billPayDefaultAcc.accountName + "....", 20)+ billPayDefaultAcc.accountID.slice(1);
          presenter.selectedAccountBalance =billPayDefaultAcc.availableBalance;
           presenter.selectedAccountID =billPayDefaultAcc.account_id;
          presenter.selectedAccountName= billPayDefaultAcc.accountName;
          presenter.selectedAccountAvailableBalance=billPayDefaultAcc.availableBalance;
        }else{
          this.view.lblSegAcc.text =dashDefault.accountName+"......"+dashDefault.account_id;
          presenter.selectedAccount =dashDefault.accountName+"........."+dashDefault.account_id;
          presenter.selectedAccountBalance =dashDefault.availableBalance;
          presenter.selectedAccountID =dashDefault.account_id;
          presenter.selectedAccountName= billPayDefaultAcc.accountName;
          presenter.selectedAccountAvailableBalance=billPayDefaultAcc.availableBalance;
        }
    this.view.btnTandC.onClick= function(){
        scope.getTermsandConditions();
    }.bind(this); 
       }catch(err){
    kony.print("preShowError"+ err);
      }
 },
 resetUI: function(){
    this.view.imgChkBx.src = "hbluncheck.png";
     this .view.btnContinue.setEnabled(false);
     this.view.btnContinue.skin ="sknBtnOnBoardingInactive";
 },
 fromAccSelect: function(){
    try{
        var navManager = applicationManager.getNavigationManager();
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
 resBillInquiry: function(errorMsg){
     var navManager = applicationManager.getNavigationManager();
        var scopeObj = this;
        var timerId = "timerPopupBillPay" + scopeObj.timerCounter;
        var errorMsg = '';
         if (!kony.sdk.isNullOrUndefined(scopeObj.timerCounter)) {
            scopeObj.timerCounter = parseInt(scopeObj.timerCounter) + 1;
        } else {
            scopeObj.timerCounter = 1;
        }
     if(errorMsg){
            var errorMsg=response.errorMessage;
            scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
        scopeObj.view.customPopup.lblPopup.text ="Please" + kony.i18n.getLocalizedString("i18n.wireTemplate.selectDefaultAccount");
        scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
        scopeObj.view.flxPopup.setVisibility(true);
         } kony.timer.schedule(timerId, function () {
            scopeObj.view.flxPopup.setVisibility(false);
            scopeObj.view.forceLayout();
        }, 1.5, false);
         this.view.forceLayout();
 },
 onCancelClick :function(){
    applicationManager.setBillPayFlow ="onCancel";
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
 segmentData: function(accounts){
    try{
   var scope = this;
   var billPayAcc = navManager.setCustomInfo("billPayAcc",accounts);
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
                data.push(this.createSegmentData(accounts[i]))
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
                "lblAvailableBalance":{"text":accounts.currencyCode +accounts.availableBalance},
                "lblAccountType":{"text":accounts.accountType,
                                  "info":accounts.currencyCode},
                "lblHeader":{"text":accounts.accountType},
                "imgArrow":{"src":"arrowdown.png"},
                
 }
 applicationManager.getNavigationManager().setCustomInfo("BillfrmAccount",dataObject);
 return dataObject;
 },
selectedAccount: function(){
    var scope = this;
    var segData = this.view.segDefaultAcc.selectedRowItems[0];
    applicationManager.setDefaultBillPayAcc(segData);
    scope.view.lblSegAcc.text = segData.lblAccount.text;
    scope.view.segDefaultAcc.setVisibility(false);
    scope.view.imgIcons.src="arrowdown.png";
},
toggleCheckBox: function(){
    try{
    var scope = this;
     this.view.flxCheck.onClick = function(){
    if(scope.view.imgChkBx.src === "hbluncheck.png"){
        scope.view.imgChkBx.src= "checkbox_ticked.png";
        scope.view.btnContinue.setEnabled(true);
        scope.view.btnContinue.skin ="sknBtn004B9526pxFocus";
      }else{
        scope.view.imgChkBx.src = "hbluncheck.png";
       scope.view.btnContinue.setEnabled(false);
         scope.view.btnContinue.skin ="sknBtnOnBoardingInactive";
      }
    };
    }catch(err){
    kony.print("toggleCheckBox"+ err);
    }
 },
billpayDashboardNav: function(){
    //navigation need to right
},
getTermsandConditions: function() {
    try{
            var config = applicationManager.getConfigurationManager();
            var locale = config.getLocale();
            var termsAndConditions = config.getTermsAndConditions();
            var param = {
                "languageCode": termsAndConditions[locale],
                "termsAndConditionsCode": "BillPay_Activation_TnC"
            };
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.fetchTermsAndConditionsPostLogin(param, this.getTermsandConditionsSuccessCallBack, this.getTermsandConditionsErrorCallback);
    }catch(err){
        kony.print("getTermsandConditions"+ err);
    }
        },
  getTermsandConditionsSuccessCallBack: function(data){
    try{
     var config = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("getTandC", {
            "richTextData": "<font face='SourceSansPro-Regular' >" + data.termsAndConditionsContent,
            "flowType": "AccountAggregation",
            "contentTypeID": data.contentTypeId,
            "header": config.constants.TERMS
        });
      //navManager.setCustomInfo("getTandC", data);
     var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            navManager.navigateTo({"appName": "SelfServiceEnrolmentMA",
              "friendlyName": "frmEnrollSupport"});
      //  enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSupport");
    }catch(err){
        kony.print("getTermsandConditionsSuccessCallBack"+ err);
    }
  },
  getTermsandConditionsErrorCallback: function(){},


 };
});