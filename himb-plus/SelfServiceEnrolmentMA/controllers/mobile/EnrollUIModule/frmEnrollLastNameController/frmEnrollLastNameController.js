define({
  timerCounter:0,
  myForm :2,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmEnrollLAstNamePreShow : function(){
    this.setFlowAction();
    this.setPreShowData();
    this.view.tbxLastName.setFocus(true);
    this.view.flxButtonContainers.bottom ="0dp";
    this.setButtonPosition({isKeypadOpen: false});
    var navManager = applicationManager.getNavigationManager();
    var flagData = navManager.getCustomInfo("flag");
    if(!(flagData == null || flagData == undefined)){
      if(this.myForm<flagData){
        this.view.tbxLastName.text = "";
        this.view.btnContinues.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinues.setEnabled(false);
    }else if (this.myForm = flagData){
      this.view.tbxLastName.text = "";
    this.view.btnContinues.skin = "sknBtnOnBoardingInactive";
    this.view.btnContinues.setEnabled(false);
    navManager.setCustomInfo("flag",null);
    }
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm=navManager.getCurrentForm();
  },
  setFlowAction  : function(){
    var scopeObj = this;
    this.view.customHeaderNew.lblScreenName.text =kony.i18n.getLocalizedString("Kony.mb.enroll.accountnumbers");
    this.view.customHeaderNew.flxBack.onTouchEnd = function(){
      scopeObj.navBack();
    };
    this.view.customHeaderNew.btnCancel.onClick = function(){
      scopeObj.onClickCancel();
    };
    this.view.tbxLastName.onTouchStart = function(){
        scopeObj.view.flxButtonContainers.bottom ="40%";
    };
    this.view.tbxLastName.onTextChange = function(){ 
         if(applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone"){
        scopeObj.view.flxButtonContainers.bottom ="45%";}
      var accountNo = scopeObj.view.tbxLastName.text;
      if(!(kony.sdk.isNullOrUndefined(accountNo)||(accountNo ===""))){
      //if(!(accountNo === "" || accountNo === undefined)){
        var numericRegex = /\D/g;
       scopeObj.view.tbxLastName.text = accountNo.replace(numericRegex,"");
        if(accountNo.length < 1){
       
       //if(accountNo.length < 10){
        scopeObj.view.btnContinues.skin = "sknBtnOnBoardingInactive";
        scopeObj.view.btnContinues.setEnabled(false);
       }else{
        scopeObj.view.btnContinues.setEnabled(true);
        scopeObj.view.btnContinues.skin = "sknBtn0095e4RoundedffffffSSP26px";
       }
      }else{
        scopeObj.view.btnContinues.skin = "sknBtnOnBoardingInactive";
        scopeObj.view.btnContinues.setEnabled(false);
      }
    };
    this.view.tbxLastName.onTouchEnd = this.setButtonPosition.bind(scopeObj, {isKeypadOpen: true});
    this.view.tbxLastName.onBeginEditing = this.setButtonPosition.bind(scopeObj, {isKeypadOpen: true});
    this.view.tbxLastName.onDone = this.setButtonPosition.bind(scopeObj, {isKeypadOpen: false});
    this.view.btnContinues.onClick = function(){
      scopeObj.validateLastName();
    };
  },
  setPreShowData  : function(){
    var locale  = kony.i18n.getCurrentLocale();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible=false;
      this.view.flxMainContainer.top ="0dp";
    }else{
      this.view.flxHeader.isVisible=true;
      this.view.flxMainContainer.top ="56dp";
    }
    this.view.tbxLastName.skin = "sknTbx424242SSPRegular28px";
 //   this.view.tbxLastName.focusSkin = "tbxBlueFocus";
    this.view.tbxLastName.setFocus(true);
    var scope = this;
    //this.view.customHeaderNew.lblScreenName.text = "Last Name";
    this.view.customHeaderNew.lblScreenName.skin="sknLblffffffSSPReg36pxop100";
   // var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');
   // var userlastname = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController.getEnrollObject().LastName;
    /*if(userlastname !== null && userlastname !== "" && userlastname !== undefined){
      this.view.tbxLastName.text = userlastname;
      this.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
      this.view.btnContinue.setEnabled(true);
    }
    else{
      this.view.tbxLastName.text = "";
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
    }*/
    if (locale == "ar_AE") {
     this.view.customHeaderNew.imgBack.src = "backbutton_reverse.png";
     this.view.lblInfo.top="13px";
    }else if (locale == "en_US" || locale == "en") {
      this.view.customHeaderNew.imgBack.src = "backbutton.png";
      this.view.lblInfo.top="8px";
    }
//     this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
//     this.view.btnContinue.setEnabled(false);
  },
  setButtonPosition: function({isKeypadOpen}){
    this.view.flxButtonContainers.reverseLayoutDirection = !isKeypadOpen;
  },
  navToSecurityCheck : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSecurityCheck");
  },
  onClickCancel : function(){
    var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("flag",this.myForm);
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
  },
  navToDOB : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollDOB");
  },
  navBack : function(){
    var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
  },
  //development
  /**
  * validates Last Name
  */
  validateLastName : function(){
    var accountNumber = this.view.tbxLastName.text;
    if(accountNumber === '' || accountNumber === null || accountNumber === undefined){
      this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.invalidLastName"));
    }
    else{
      var param ={
        "accountNumber":accountNumber
      };
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("Enrolldata",param);
      var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
      enrollMod.presentationController.navigateToFrmEnrollSSN();
    }
  },
  /**
  *Shows Toast Message with red skin
  */
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
});