define({
  timerCounter: 0,
  keypadString: '',
  locale : kony.i18n.getCurrentLocale(),
  myForm : 4,
 // locale : "sv",
  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    this.view.customHeaderPersonalInfo.lblLocateUs.text = kony.i18n.getLocalizedString("Kony.mb.enroll.accountMobile");
    this.view.tbxCode.text = "+977";
    var navManager = applicationManager.getNavigationManager();
    var flagData = navManager.getCustomInfo("flag");
     if(!(flagData == null || flagData == undefined)){
      if(this.myForm<flagData){
        this.view.tbxCode.text = "+977"
    this.view.tbxMobileNumber.text = "";
    this.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
    this.view.btnVerifyDOB.setEnabled(false);
    }else if (this.myForm = flagData){
      this.view.tbxCode.text = "+977"
      this.view.tbxMobileNumber.text = "";
      this.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
      this.view.btnVerifyDOB.setEnabled(false);
      navManager.setCustomInfo("flag",null);
    }
    }
    //this.view.customHeaderPersonalInfo.lblLocateUs.text = "Mobile Number";
    //this.view.customHeaderPersonalInfo.btnRight.text = "Cancel";
	this.locale = kony.i18n.getCurrentLocale();
    if(this.locale=="ar_AE"){
      this.view.lblMonthOne.text="D";
      this.view.lblMonthTwo.text="D";
      this.view.lblDayOne.text="M";
      this.view.lblDayTwo.text="M";
    }
    //this.setDummyText();
	//var dateOfBirthInLocaleFormat = "";
    //var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    //dateOfBirthInBackendFormat = enrollMod.presentationController.getEnrollDOB();
   /* if (dateOfBirthInBackendFormat){
        dateOfBirthInLocaleFormat = enrollMod.presentationController.getLocaleDOB(dateOfBirthInBackendFormat);
	}
    else {
        dateOfBirthInLocaleFormat = "";
    }
    if(dateOfBirthInLocaleFormat !== null && dateOfBirthInLocaleFormat !== "" && dateOfBirthInLocaleFormat !== undefined){
      this.view.btnVerifyDOB.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnVerifyDOB.setEnabled(true);
      this.keypadString = dateOfBirthInLocaleFormat;
      this.updateInputBullets();
    }
    else{
      this.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
      this.view.btnVerifyDOB.setEnabled(false);
      this.keypadString = '';
      this.updateInputBullets();
    }*/
    this.setFlowActions();
    this.resetUI();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeaderPersonalInfo.isVisible = true;
    }
    else{
      this.view.flxHeaderPersonalInfo.isVisible = false;
    }
    //this.fv.submissionView(this.view.btnVerifyDOB);
   // this.fv.checkDOBLength(this.keypadString);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    this.view.tbxCode.onTextChange = function(){
      this.showCountriesList();
    }.bind(this);
    this.view.flxButtonContainers.bottom ="5dp";
    this.view.tbxCode.skin ="sknTbx424242SSPRegular28px";
    this.view.tbxCode.setFocus(false);
     this.view.tbxMobileNumber.setFocus(true);
    this.view.tbxMobileNumber.skin = "sknTbx424242SSPRegular28px";
    //this.view.tbxMobileNumber.setFocus(false);
    //applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },    
  resetUI: function(){ 
    const navManager = applicationManager.getNavigationManager();
    let previousData = navManager.getCustomInfo("frmForgot");
    if(previousData){
        this.view.tbxCode.text = previousData.code;
  }
},
   setDummyText : function(){
    var configManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ConfigurationManager","appName":"CommonsMA"}).businessController;
    var dummy = 'MM/DD/YYYY';//configManager.getCalendarDateFormat();
    var widgets = this.view["flxDOB"].widgets();
    for (var i = 0; i < this.keypadString.length; i++) {
      widgets[i].skin = "sknLbl979797SSP60px";
      widgets[i].text = dummy[i];
    }
  },
  setFlowActions : function(){
    var scope = this;
    this.view.tbxMobileNumber.onTouchStart = function(){
        scope.view.flxButtonContainers.bottom ="35%";
    };
    this.view.tbxMobileNumber.onTextChange = function(){
         if(applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone"){
            scope.view.flxButtonContainers.bottom ="45%"
        }
      var mobileNo = scope.view.tbxMobileNumber.text;
      if(!(kony.sdk.isNullOrUndefined(mobileNo)||(mobileNo ===""))){
     var mobileRegex= /[^0-9]/g;
     scope.view.tbxMobileNumber.text = mobileNo.replace(mobileRegex,"");
    // scopeObj.view.tbxMobileNumber.text = mobileNo;
    if((scope.view.tbxCode.text===("+977" || "977"))&& (scope.view.tbxMobileNumber.text.length>9)){
      scope.view.tbxMobileNumber.maxTextLength = 10;
       scope.view.btnVerifyDOB.setEnabled(true);
    scope.view.btnVerifyDOB.skin = "sknBtn0095e4RoundedffffffSSP26px";
    } else if((scope.view.tbxMobileNumber.text.length>2) && (scope.view.tbxCode.text!= "+977")&&(scope.view.tbxCode.text.length>1)){
      scope.view.btnVerifyDOB.setEnabled(true);
    scope.view.btnVerifyDOB.skin = "sknBtn0095e4RoundedffffffSSP26px";
    } 
   }else{
        scope.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
        scope.view.btnVerifyDOB.setEnabled(false);
      }
    };
    this.view.btnVerifyDOB.onClick = function(){
      scope.validateDOB();
    };
    this.view.customHeaderPersonalInfo.flxBack.onClick = function(){
      scope.navToLastName();
    };
    this.view.customHeaderPersonalInfo.btnRight.onClick = function(){
      scope.onClickCancel();
    };
  },
  showCountriesList : function(){
    // TO DO : Get countries list here
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({   
      "appName": "AuthenticationMA",
        "friendlyName": "frmForgotSelectCountry",
             },true);
  },
  navToSSN : function(){
      var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
      enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSSn");
  },
  navToLastName : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  onClickCancel : function(){
    var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("flag",this.myForm);
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
   },
  setKeypadChar: function (char) {
    this.char = char.toString();
    if (this.keypadString.length === 10) return;
    this.keypadString = this.keypadString + char;
     if(this.locale=="en_US" || this.locale=="en" || this.locale=="en_GB" || this.locale === "fr_FR" || this.locale === "es_ES" || this.locale === "ar_AE" || this.locale === "ne_NP"){
        if (this.keypadString.length === 2 || this.keypadString.length === 5) {
          //this.keypadString = this.keypadString + '/';
        }
      }
      else if(this.locale=="de_DE"){
        if (this.keypadString.length === 2 || this.keypadString.length === 5) {
          //this.keypadString = this.keypadString + '.';
        }
      }
       else if(this.locale=="sv_SE"){
        if (this.keypadString.length === 4 || this.keypadString.length === 7) {
          //this.keypadString = this.keypadString + '-';
        }
      }
    this.updateInputBullets();
    //this.fv.checkDOBLength(this.keypadString);
    //     if(this.view.lblYearFour.text !== "" && this.view.lblYearFour.text !== "_")
    //       this.view.btnVerifyDOB.skin = "sknBtn0095e4RoundedffffffSSP26px";
    //    else
    //     this.view.btnVerifyDOB.skin = "sknBtnOnBoardingInactive";
  },
  clearKeypadChar: function () {
    this.char = "";
    if (this.keypadString.length === 1) {
      this.keypadString = '';
      this.updateInputBullets();
    }
    if (this.keypadString.length !== 0) {
      if (this.keypadString[this.keypadString.length - 1] === '/' || this.keypadString[this.keypadString.length - 1] === '.' ) {
        this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      }
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      this.updateInputBullets();
    }
    this.fv.checkDOBLength(this.keypadString);
  },
  updateInputBullets: function () {
    var scope = this;
  if(this.keypadString.length <=3)
        {
      scope.view.tbxCode.text = this.char;
    //scope.view.tbxMobileNumber.text = this.char;
    scope.view.tbxMobileNumber.setFocus(false);
    }else{
          scope.view.tbxMobileNumber.setFocus(true);
          scope.view.tbxMobileNumber.text = this.char;
           scope.view.btnVerifyDOB.setEnabled(true);
       scope.view.btnVerifyDOB.skin ="sknBtn0095e4RoundedffffffSSP26px";
          this.view.forceLayout();
        }
    //this.view.forceLayout();
		},
  validateAndNavigate : function(){
    var  date = this.keypadString;
    if(date.length === 10)
    {
      var NUOMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NewUserModule");
      //to be replaced 4315
      NUOMod.presentationController.validateDOBAndNavigate(date);
    }
    else
    {
      this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
    }
  },
  assignDataToForm : function(newUserJSON){
    var scope = this;
    var dob = (newUserJSON.dateOfBirth && newUserJSON.dateOfBirth !== "" && newUserJSON.dateOfBirth !== null)?newUserJSON.dateOfBirth:"";
    if(dob!==""){
      dob = dob.substr(0,10);
      dob = dob.split("-");
      var dobText = dob[1]+dob[2]+dob[0];
      for(var i=0;i<dobText.length;i++)
      {
        this.setKeypadChar(dobText.charAt(i));
      }
    }
    else
    {
      this.keypadString = "";
      this.updateInputBullets();
    }
    this.view.forceLayout();
  },
  //Development
  /**
  * validates Date of Birth
  */
  validateDOB: function() {
       // var dob = this.keypadString;
    //	var forUtility = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"FormatUtilManager","appName":"CommonsMA"}).businessController;
       /* if(dob.indexOf(".")!= -1){
            dob = dob.replace(".", "/").replace(".","/");
        }
        else if(dob.indexOf("-")!=-1){
            dob = dob.replace(/-/g, "/");
        }
        if (dob.length < 10) {
            this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
        } else {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            var userDOB = forUtility.getDateForFormatting(dob);
      		var dateOfBirth = forUtility.getFormatedDateString(new Date(userDOB),forUtility.getBackendDateFormat());
          	var params = {
                  "dateOfBirth":dateOfBirth,
                  "ssn":enrollMod.presentationController.getEnrollSSN(),
                  "userlastname":enrollMod.presentationController.getEnrollLastName(),
                };
          if ( enrollMod.presentationController.validateDOB(dob))
               enrollMod.presentationController.commonFunctionForNavigation("frmEnroll");
              //enrollMod.presentationController.checkUserEnrolled(params);
      	}*/
        var mobileNumber = this.view.tbxMobileNumber.text;
    var countryCode = this.view.tbxCode.text;
        if((mobileNumber === '' || mobileNumber === null || mobileNumber === undefined)&&(countryCode === '' || countryCode === null || countryCode === undefined)){
          this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
        }
        else {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
           var data=  navManager.getCustomInfo("Enrolldata"); 
           var params ={
            "accountNumber": data.accountNumber,
            "accountName": data.accountName,
            "mobileNumber": countryCode+"-"+mobileNumber
         };
         navManager.setCustomInfo("Enrolldata",params);
             var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "EnrollUIModule", "appName": "SelfServiceEnrolmentMA" });
            enrollModule.presentationController.navigateToemail();
        }
    },
  /**
  * Shows Toast Message with red skin
  */
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
});