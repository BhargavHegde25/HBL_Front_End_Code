define(["CommonUtilities","OLBConstants"], function (CommonUtilities,OLBConstants){

 //Type your controller code here 
 var myForm =7;
  return {
	  phoneData:"",
    onInit : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      //navManager.setCustomInfo("flag",null);
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShowfunc;  
      this.view.postShow= this.postShow;
    },
    preShowfunc:function() {
      var scope = this;
       try {   
        var CommonUtilities =require('CommonUtilities');
        this.phoneData = CommonUtilities.CLIENT_PROPERTIES.CUSTOMER_SUPPORT_MB_CALLUS;
		this.bindevents();
       }catch(error){
         kony.print("frmEnrollInfo preShowfunc-->"+error);
       }
       this.view.customHeader.btnRight.onClick = function(){
         //scope.navToEnroll();
         var navManager = applicationManager.getNavigationManager();
         navManager.setCustomInfo("flag",scope.myForm);
         var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
    };
      this.view.customHeader.flxBack.onClick = function(){
         scope.navToEnroll();
    };

    },
    postShow: function(){
         applicationManager.getPresentationUtility().dismissLoadingScreen();
         return;
    },
    bindevents:function(){

         this.view.btnActivateProfile.onClick = this.activateProfileOnClick;
         this.view.btnContactUs.onClick = this.contactUsOnClick;
         this.view.btnLoginNow.onClick = this.loginNowOnClick;
         this.view.btnCallSupport.onClick = this.callSupportOnClick;
         
         var navManager = applicationManager.getNavigationManager();
         var checkEnrollStat = navManager.getCustomInfo("checkEnrollStat");
		 if(!kony.sdk.isNullOrUndefined(checkEnrollStat)){
           if(checkEnrollStat === "EnrolledAndActivated"){
             this.loginNow();
           }else if(checkEnrollStat === "activateProfileNow"){
             this.activateYourprofile();
           }else if(checkEnrollStat === "onlyEnrolled"){
             var userFname = " ";
             var userLname = " ";
             if(!kony.sdk.isNullOrUndefined(navManager.getCustomInfo("userFname"))){
               userFname = navManager.getCustomInfo("userFname");
               navManager.setCustomInfo("userFname", " ");
             }
             if(!kony.sdk.isNullOrUndefined(navManager.getCustomInfo("userLname"))){
               userLname = navManager.getCustomInfo("userLname");
               navManager.setCustomInfo("userLname", " ");
             }
             this.enrollSuccess(userFname+" "+userLname);
           }else if(checkEnrollStat === "cantEnroll"){
             this.enrollFailure();
           }
         }

       },
    
    navToEnroll : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },

    activateProfileOnClick: function () {
    try {
    var navManager = applicationManager.getNavigationManager();    
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    newUserManager.resetEnrollObj();
    navManager.setCustomInfo("profileActivation", "profileActivation");
    if (CommonUtilities.getSCAType() == 1) {
        navManager.navigateTo("EnrollHIDUIModule/frmEnrollActivateProfileHID");
    } else if (CommonUtilities.getSCAType() == 2) {
        navManager.navigateTo("EnrollUnikenUIModule/frmEnrollActivateProfileUniken");
    } else
        navManager.navigateTo({"appName":"SelfServiceEnrolmentMA","friendlyName":"frmEnrollActivateProfile"},false,{"appservice":true});
    } catch (er) {
        kony.print(er);
    }
    },
     callSupportOnClick:function(){
      try{
        
      }catch(er){
        
      }
    },
    contactUsOnClick:function(){
      try{
		  var scope =this;
          kony.phone.dial(scope.phoneData); 
      }catch(er){
        
      }
    },
    loginNowOnClick:function(){
      try{
        if(this.view.btnLoginNow.text === kony.i18n.getLocalizedString("kony.mb.enrollment.loginNow")){
          var navManager = applicationManager.getNavigationManager();
         // navManager.navigateTo("frmLogin");
          navManager.navigateTo({"appName" : "AuthenticationMA", "friendlyName" : "AuthUIModule/frmLogin"});
  
        }else if(this.view.btnLoginNow.text === kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile")){
          this.activateProfileOnClick();
        }
      }catch(er){
        
      }
    },
    
     
    enrollSuccess:function(userName){
      try{
		  var scope=this;
        scope.view.flxMainHeader.isVisible = true;
        scope.view.imgTick.isVisible = true;
         if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          scope.view.flxHeader.isVisible = false;
          scope.showTitleBarAttributesiOS(true);
        }else{
          scope.view.flxHeader.isVisible = false;
        }
		
		
        scope.view.imgTick.src = "success_hbl.png";
        scope.view.lblSuccessMsg.isVisible = true;
        scope.view.lblInfo.isVisible = true;
        scope.view.btnActivateProfile.isVisible = true;
        scope.view.btnContactUs.isVisible = false;
        scope.view.lblUserName.text = userName.toUpperCase();
        scope.view.btnActivateProfile.centerY = "92%";
        scope.view.btnCallSupport.isVisible = false;
        scope.view.btnLoginNow.isVisible = false;
        scope.view.flxWelcomeBack.isVisible = false;
        scope.view.btnActivateProfile.text = kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");
        scope.view.lblSuccessMsg.text = kony.i18n.getLocalizedString("kony.mb.Enrollment.successInfo");
        scope.view.lblInfo.text = kony.i18n.getLocalizedString("kony.mb.enrollment.activationCode");
			
      }catch(e){
         kony.print("frmEnrollInfo enrollSuccess-->"+e);
      }
    },
    
    enrollFailure:function(){
      try{
		  var scope =this;
        this.view.flxMainHeader.isVisible = false;
        
        this.view.imgTick.src = "error.png";
        this.view.lblSuccessMsg.isVisible = true;
        var errFlag=applicationManager.getNavigationManager().getCustomInfo("screen");
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
          this.showTitleBarAttributesiOS(true);
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.customHeader.flxBack.isVisible = false;
        }
        this.view.customHeader.lblLocateUs.left = "5%";
         this.view.customHeader.btnRight.isVisible =true;
        this.view.lblSuccessMsg.text = kony.i18n.getLocalizedString("kony.mb.enrollment.cantEnroll");
        this.view.lblInfo.isVisible = true;
        if(errFlag==3|| errFlag=="3"){
			this.view.lblSuccessMsg.setVisibility(false);
			this.view.imgTick.isVisible = false;
			this.view.lblInfo.top="150dp";
            this.view.lblInfo.text = kony.i18n.getLocalizedString("i18n.mb.enroll.userenrolledandactive");
        }else{
			this.view.lblSuccessMsg.setVisibility(true);
			this.view.imgTick.isVisible = true;
			this.view.lblInfo.top="20dp";
        this.view.lblInfo.text = kony.i18n.getLocalizedString("kony.mb.enrollment.infoCantEnroll");
        }
       // this.view.btnCallSupport.isVisible = true;
        this.view.btnLoginNow.isVisible = false;
        this.view.btnCallSupport.text = "CALL SUPPORT--"+this.phoneData;
        this.view.btnCallSupport.isVisible =true;
        this.view.customHeader.btnRight.onClick = function(){
           var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({   
      "appName": "SelfServiceEnrolmentMA",
        "friendlyName": "frmEnrollActivateProfile",
             },true);
        };
        this.view.btnCallSupport.onClick = function(){
          kony.phone.dial(scope.phoneData);
        };
        this.view.btnContactUs.isVisible = false;
        this.view.flxWelcomeBack.isVisible = false;
        this.view.btnContactUs.text = kony.i18n.getLocalizedString("i18n.accountDetail.contactUs");
        this.view.btnActivateProfile.centerY = "80%"
        this.view.btnActivateProfile.isVisible = false;
        
      }catch(e){
         kony.print("frmEnrollInfo enrollSuccess-->"+e);
      }
    },
    
    loginNow:function(){
      try{
		  var scope=this;
		  var navManager = applicationManager.getNavigationManager();
		  var flagChk = navManager.getCustomInfo("screen");
		this.view.flxWelcomeBack.isVisible = true;
		if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible = false;
          this.view.flxWelcomeBack.top = "50dp";
          this.showTitleBarAttributesiOS(true);
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.flxWelcomeBack.top = "90dp";   

        }
        //this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.mb.resetPassword.WelcomeBack");
		this.view.flxMainHeader.isVisible = false;
		this.view.imgTick.src = "success_hbl.png";
        this.view.imgTick.isVisible = false;
		this.view.imgUserWelcome.src = "success_hbl.png";
        this.view.lblSuccessMsg.isVisible = false;
        this.view.lblInfo.isVisible = false;
        this.view.btnActivateProfile.isVisible = false;
        this.view.btnCallSupport.isVisible = false;
        //this.view.btnContactUs.isVisible = false;
        this.view.btnLoginNow.isVisible = false;
		this.view.customHeader.flxBack.isVisible = false;
		var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
		 if(flagChk ===1){
			if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
				this.view.lblUserWelcome.text =kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
				scope.view.lblUserRecords.text=kony.i18n.getLocalizedString("i18n.enroll.enrollPending");
		 this.view.imgUserWelcome.src = "error.png"; //warninground
        this.view.lblUserRecords.isVisible = false;
        this.view.btnContactUs.isVisible = true;
			}
			else{
		 this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.enroll.enrollPending");
		 this.view.imgUserWelcome.src = "error.png"; //warninground
        this.view.lblUserRecords.isVisible = false;
        this.view.btnContactUs.isVisible = true;
			}
		}else if(flagChk ===2){
			if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
				  this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
        this.view.lblUserRecords.text = kony.i18n.getLocalizedString("i18n.enroll.enrollpass");
        this.view.btnContactUs.isVisible = false;
			}
			else{
	    this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.enroll.enrollpass1");
        this.view.lblUserRecords.text = kony.i18n.getLocalizedString("i18n.enroll.enrollpass");
        this.view.btnContactUs.isVisible = false;
			}
		}
		else if(flagChk ===3){
			if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
				this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
        this.view.lblUserRecords.text = kony.i18n.getLocalizedString("i18n.enroll.activateYourProfile");	
		 this.view.btnLoginNow.isVisible = true;
         this.view.btnContactUs.isVisible = false;
		 this.view.btnLoginNow.text =  kony.i18n.getLocalizedString("kony.mb.enrollment.loginNow");
			}
			else{
		 this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.login.CantSignIn.WelcomeBack");
        this.view.lblUserRecords.text = kony.i18n.getLocalizedString("i18n.enroll.activateYourProfile");	
		 this.view.btnLoginNow.isVisible = true;
         this.view.btnContactUs.isVisible = false;
		 this.view.btnLoginNow.text =  kony.i18n.getLocalizedString("kony.mb.enrollment.loginNow");
			}
		}else if(flagChk ===4){
			if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
				this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
        this.view.lblUserRecords.text = kony.i18n.getLocalizedString("i18n.enroll.activateInstruct");
         this.view.btnLoginNow.isVisible = true;
         this.view.btnContactUs.isVisible = false;
       this.view.btnLoginNow.text = kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");	
			}
			else{
			this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.enroll.enrollSuccess");
        this.view.lblUserRecords.text = kony.i18n.getLocalizedString("i18n.enroll.activateInstruct");
         this.view.btnLoginNow.isVisible = true;
         this.view.btnContactUs.isVisible = false;
       this.view.btnLoginNow.text = kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");	
			}	   
		}
		applicationManager.getNavigationManager().setCustomInfo("LegacyUserEnrolldetails","");
      }catch(er){
        kony.print("error inloginNow"+e);
      }
    },
    
    activateYourprofile:function(){
      try{
        this.view.flxWelcomeBack.isVisible = true;
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
           this.view.flxHeader.isVisible = false;
           this.view.flxWelcomeBack.top = "0dp";
           this.showTitleBarAttributesiOS(true);
        }else{
          this.view.flxHeader.isVisible = true;
          this.view.flxWelcomeBack.top = "56dp";
          this.showTitleBarAttributesiOS(false);
        }
        this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.mb.resetPassword.WelcomeBack");
        this.view.lblUserRecords.text = "";
        this.view.btnLoginNow.text =  kony.i18n.getLocalizedString("i18n.LoginActivation.ActivateYourProfile");
        this.view.flxMainHeader.isVisible = false;
        this.view.imgTick.isVisible = false;
        this.view.lblSuccessMsg.isVisible = false;
        this.view.lblInfo.isVisible = false;
        this.view.btnActivateProfile.isVisible = false;
        this.view.btnContactUs.isVisible = false;
        this.view.btnCallSupport.isVisible = false;
        this.view.btnLoginNow.isVisible = true;
        
      }catch(er){

      }
    },
    
    showTitleBarAttributesiOS : function (param) {
      try {
        if(kony.sdk.isNullOrUndefined(param)) return;
        var titleBarAttributes = this.view.titleBarAttributes;
        titleBarAttributes["navigationBarHidden"] = !param;
        this.view.titleBarAttributes = titleBarAttributes;
        if(param)
          this.view.lblTitle.isVisible = false;
      }
      catch(err) {
        kony.print("Exception in titleBarAttributes" + JSON.stringify(err, null, 4));
      }
    }



  }});
