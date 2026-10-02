define({
    keypadString: '',
    timerCounter: 0,
    init: function () {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    showEnterSSN: function () {
       this.view.rtxInfo.setVisibility(true);
        var locale  = kony.i18n.getCurrentLocale();
       var navManager = applicationManager.getNavigationManager();
      var navData = navManager.getCustomInfo("getTandC");
       var populateData = navData.richTextData;
        var headerValue = navData.header;
       var configManager = applicationManager.getConfigurationManager();
     if (headerValue === configManager.constants.TERMS) {
       this.view.rtxInfo.setVisibility(false);
       this.view.title = configManager.constants.HEADERTERMSANDCONDITIONS;
    this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERTERMSANDCONDITIONS;
       this.view.browserContent.htmlString = populateData;
       }
        this.setActions();
        var scope = this;
        this.keypadString = '';
        this.view.lblSSN.text = "";
        this.setButtonPosition({isKeypadOpen: false});
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.flxMainContainer.top = "56dp";
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top = "0dp";
        }
      /*var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        var ssn = enrollMod.presentationController.getEnrollSSN();
        if (!kony.sdk.isNullOrUndefined(ssn)) {
            this.keypadString = ssn;
            this.view.lblSSN.text = this.keypadString;
            this.view.btnVerifySSN.setEnabled(true);
            this.view.btnVerifySSN.skin = "sknBtn0095e4RoundedffffffSSP26px";
        }
        else {
            this.incompleteSSNoView();
        }*/
        this.view.tbxLastName.onTextChange = function(){
            var accountNo = scope.view.tbxLastName.text;
            if(!(kony.sdk.isNullOrUndefined(accountNo)||(accountNo ===""))){
            //if(!(accountNo === "" || accountNo === undefined)){
              if(accountNo.length<2){
            // var numericRegex = /[^0-9]/g;
            // scope.view.tbxLastName.text = accountNo.replace(numericRegex,"");
             //if(accountNo.length < 10){
                scope.view.btnVerifySSN.skin = "sknBtnOnBoardingInactive";
                scope.view.btnVerifySSN.setEnabled(false);
             }else{
                scope.view.tbxLastName.text=accountNo;
                scope.view.btnVerifySSN.setEnabled(true);
                scope.view.btnVerifySSN.skin = "sknBtn0095e4RoundedffffffSSP26px";
             }
            }else{
                scope.view.btnVerifySSN.skin = "sknBtnOnBoardingInactive";
                scope.view.btnVerifySSN.setEnabled(false);
            }
          }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.changePlaceholder();
      
      if(locale==="ar_AE"){
      this.view.customHeader.imgBack.src="backbutton_reverse.png";
      }
      else if(locale == "en_US" || locale == "en"){
        this.view.customHeader.imgBack.src="backbutton.png";
      }
    },
    setActions: function () {
        var scope = this;
      this.view.customHeader.lblLocateUs.text =kony.i18n.getLocalizedString("Kony.mb.enroll.accountTerms");
      this.view.tbxLastName.onTouchEnd = this.setButtonPosition.bind(scope, {isKeypadOpen: true});
        this.view.tbxLastName.onBeginEditing = this.setButtonPosition.bind(scope, {isKeypadOpen: true});
        this.view.tbxLastName.onDone = this.setButtonPosition.bind(scope, {isKeypadOpen: false});
        this.view.btnVerifySSN.onClick = function () {
            scope.verifyAndNavigate();
            //scope.changePlaceholder();
        };
        this.view.customHeader.flxBack.onClick = function () {
            scope.navTandC();
            //scope.changePlaceholder();
        };
        this.view.customHeader.btnRight.onClick = function () {
            scope.onClickCancel();
            //scope.changePlaceholder();
        };
    },
  setButtonPosition: function({isKeypadOpen}){
    this.view.flxButtonContainer.reverseLayoutDirection = !isKeypadOpen;
  },
    verifyAndNavigate: function () {
        var scope = this;
      //  var temp = scope.keypadString;
      //  var SSN = temp.replace(/-/g, "");
      
        var accountName = this.view.tbxLastName.text;
        if(accountName === '' || accountName === null || accountName === undefined){
            scope.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.enterSSN"));
        }
        else {
             var navManager = applicationManager.getNavigationManager();
             var accNumber =  navManager.getCustomInfo("Enrolldata");
             var params ={
                "accountNumber": accNumber.accountNumber,
                "accountName": accountName
             };
             navManager.setCustomInfo("Enrolldata",params);
            applicationManager.getPresentationUtility().showLoadingScreen();
            var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
            enrollModule.presentationController.navigateToFrmEnrollDOB();
        }
    },
    userNotEnrolled: function () {
        var scope = this;
        var temp = scope.keypadString;
        var SSN = temp.replace(/-/g, "");
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollModule.presentationController.validateEnrollSSN(SSN);
    },
    navToSecurityCheck: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSecurityCheck");
    },
    navTandC: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onClickCancel: function () {
       var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
        kony.application.destroyForm({"appName": "SelfServiceEnrolmentMA", "friendlyName":"frmEnrollSupport"});
//         var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
//         enrollMod.presentationController.resetEnrollObj();
    },
    navToAlreadyEnrolled: function () {
        var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
        enrollMod.presentationController.commonFunctionForNavigation("frmAlreadyEnrolled");
    },
    setKeypadChar: function (char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length > 0) {
            this.enterSSNPostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteSSNoView();
        } else if (this.keypadString.length > 11) {
            this.keypadString = this.keypadString.slice(0, 11);
            return;
        }
        this.view.lblSSN.text = this.keypadString;
       // this.changePlaceholder();
    },
    clearKeypadChar: function () {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
        }
        if (this.keypadString.length !== 0) {
            if (this.keypadString[this.keypadString.length - 1] === '-') {
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            }
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (kony.sdk.isNullOrUndefined(this.keypadString) || this.keypadString === "") {
                this.incompleteSSNoView();
            }
        }
        else {
            this.incompleteSSNoView();
        }
        this.view.lblSSN.text = this.keypadString;
        //this.changePlaceholder();
    },
    updateInputBullets: function (inputFlx) {
        var dummyString = '___-__-____';
        if (this.keypadString.length === 3 || this.keypadString.length === 6) {
            this.keypadString = this.keypadString + '-';
        }
        var widgets = this.view[inputFlx].widgets();
        for (var j = 0; j < this.keypadString.length; j++) {
            if (this.keypadString[j] === '-') {
                widgets[j].text = this.keypadString[j];
            } else {
                widgets[j].text = "•";
            }
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            widgets[i].text = dummyString[i];
        }
        this.view.forceLayout();
    },
    enterSSNPostAction: function () {
        this.view.btnVerifySSN.setEnabled(true);
        this.view.btnVerifySSN.skin = "sknBtn0095e426pxEnabled";
        this.view.flxMainContainer.forceLayout();
    },
    incompleteSSNoView: function () {
        this.view.btnVerifySSN.skin = "sknBtna0a0a0SSPReg26px";
        this.view.flxMainContainer.forceLayout();
        this.view.btnVerifySSN.setEnabled(false);
    },
    bindViewError: function (msg) {
        var scope = this;
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, msg);
    },
    clearSSN: function () {
        var widgets = this.view["flxInputSSN"].widgets();
        for (var i = 0; i < 11; i++) {
            if (i === 3 || i === 6) {
                widgets[i].text = '-';
            }
            else {
                widgets[i].text = '_';
            }
        }
        this.view.forceLayout();
    },
    changePlaceholder: function (show) {
        var hide = true;
        var text = this.view.lblSSN.text;
        if (kony.sdk.isNullOrUndefined(show)) {
            if (!kony.sdk.isNullOrUndefined(text)) {
                if (text.trim().length === 0) hide = false;
            }
        }
        else {
            hide = !show;
        }
        this.view.lblSSNPlaceholder.isVisible = !hide;
        this.view.forceLayout();
    },
});