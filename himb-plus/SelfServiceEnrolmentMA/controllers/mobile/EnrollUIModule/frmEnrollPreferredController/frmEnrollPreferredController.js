define(["CommonUtilities","OLBConstants"], function (CommonUtilities,OLBConstants){
var contractId ="";
var imgFlx ="";
var legalEntityId ="";
var currentChannel ="";
var consentProvide ="";
var flag=0;
return{
init: function () {
        var scope = this;
        var currentFormObject = kony.application.getCurrentForm();
        var currentForm = currentFormObject.id;
        applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },
        preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMain.top = "70dp";
                this.view.flxSucessMain.top ="70dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMain.top = "10dp";
                this.view.flxSucessMain.top ="10dp";
            }
            this.view.customHeaderNew.btnCancel.onClick = this.flxBackOnClick;
            this.view.customHeaderNew.flxBack.onClick -this.goBack;
            this.view.btnContinue.onClick =this.navContinue;
            this.view.imgEnable1.onTouchStart = this.toggleSection;
            this.view.imgEnable2.onTouchStart =this.toggleSection;
            this.view.imgEnable3.onTouchStart =this.toggleSection;
            this.view.btnSecondary.onClick = this.alertPop;
            this.view.btnSecond.onClick =this.alertPop;
            this.view.btnPrimary.onClick = this.activationFlow;
            this.view.richtextpopup.imgCross.onTouchStart = this.closePop;
            this.view.richtextpopup.btnOk.onClick = this.navAck;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        //this.view.postShow = this.postShow;
        },
        onNavigate: function(uidata){
            try{
            if(uidata.screen1){
            this.contractId = uidata.screen1.userDetails.contractId;
            this.currentChannel = uidata.screen1.userDetails.channelAccess;
            this.legalEntityId = uidata.screen1.legalEntityId;
            this.consentProvide = uidata.screen1.userDetails.isConsentProvided;
            this.flag =0;
            this.screen1(uidata.screen1);
            }if(uidata.screen2){
                this.contractId =  uidata.screen2.userDetails.contractId;
                this.currentChannel = uidata.screen2.userDetails.channelAccess;
                this.legalEntityId = uidata.screen2.legalEntityId;
                 this.consentProvide = uidata.screen2.userDetails.isConsentProvided;
                 this.flag =0;
            this.screen2(uidata.screen2);
            } if(uidata.screen3){
                this.contractId =  uidata.screen3.userDetails.contractId;
                this.currentChannel = uidata.screen3.userDetails.channelAccess;
                this.legalEntityId = uidata.screen3.legalEntityId;
                 this.consentProvide = uidata.screen3.userDetails.isConsentProvided;
                 this.flag =0;
             this.screen3(uidata.screen3);
            }if(uidata.screen4){
                this.contractId =  uidata.screen4.userDetails.contractId;
                this.currentChannel = uidata.screen4.userDetails.channelAccess;
                this.legalEntityId = uidata.screen4.legalEntityId;
                 this.consentProvide = uidata.screen4.userDetails.isConsentProvided;
                 this.flag =1;
             this.screen4(uidata.screen4);
            }if(uidata.screen5){
                this.contractId =  uidata.screen5.userDetails.contractId;
                this.currentChannel = uidata.screen5.userDetails.channelAccess;
                this.legalEntityId = uidata.screen5.legalEntityId;
                 this.consentProvide = uidata.screen5.userDetails.isConsentProvided;
                 this.flag =1;
             this.screen5(uidata.screen5);
            }
            }catch(err){
            kony.print("onNavigate:"+err);
            }
        },
        screen1:function(screen){
        try{
			
            this.view.flxMain.setVisibility(true);
            this.view.flxFrom.setVisibility(true);
            this.view.flxSucessMain.setVisibility(false);
            this.view.flxMobile.setVisibility(true);
            this.view.flxOnline.setVisibility(true);  
            this.view.flxFull.setVisibility(false); 
            this.view.customHeaderNew.flxBack.setVisibility(true);
            this.clientPropertiesAmount();
        }catch(err){
        kony.print("screen1:"+err);
        }
        },
        screen2:function(screen){
        try{
			var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
			if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
				this.view.flxMain.setVisibility(false);
            this.view.flxSucessMain.setVisibility(true);
            this.view.flxOnlineRecords.setVisibility(false);
            this.view.flxRxttx.setVisibility(true);
            this.view.rxtxContent.text = kony.i18n.getLocalizedString("i18n.enroll.enrollMbSuccess");
            this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
            this.view.btnSecondary.setVisibility(true);
            this.view.btnSecond.setVisibility(false);
            this.view.flxMobileRecords.setVisibility(false);  
            this.view.flxFull.setVisibility(false);
            this.view.customHeaderNew.flxBack.setVisibility(false); 
			applicationManager.getNavigationManager().setCustomInfo("LegacyUserEnrolldetails","");
			}
			else{
            this.view.flxMain.setVisibility(false);
            this.view.flxSucessMain.setVisibility(true);
            this.view.flxOnlineRecords.setVisibility(false);
            this.view.flxRxttx.setVisibility(true);
            this.view.rxtxContent.text = kony.i18n.getLocalizedString("i18n.enroll.enrollMbSuccess");
            this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.enrollnew.lbltext6");
            this.view.btnSecondary.setVisibility(true);
            this.view.btnSecond.setVisibility(false);
            this.view.flxMobileRecords.setVisibility(false);  
            this.view.flxFull.setVisibility(false);
            this.view.customHeaderNew.flxBack.setVisibility(false); 
			}
        }catch(err){
            kony.print("screen2:"+err);
            }
        },
        screen3:function(screen){
            try{
				var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
			if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
				this.view.flxMain.setVisibility(false);
                this.view.flxSucessMain.setVisibility(true);
                this.view.flxOnlineRecords.setVisibility(false);
                this.view.flxMobileRecords.setVisibility(false); 
                this.view.flxRxttx.setVisibility(true);
                this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
				this.view.rxtxContent.text =kony.i18n.getLocalizedString("i18n.enroll.enrollOlbSuccess");
                this.view.btnSecondary.setVisibility(false);
                this.view.btnSecond.setVisibility(true);
                 this.view.flxFull.setVisibility(false);
                 this.view.customHeaderNew.flxBack.setVisibility(false); 
				 applicationManager.getNavigationManager().setCustomInfo("LegacyUserEnrolldetails","");
			}
			else{
                this.view.flxMain.setVisibility(false);
                this.view.flxSucessMain.setVisibility(true);
                this.view.flxOnlineRecords.setVisibility(false);
                this.view.flxMobileRecords.setVisibility(false); 
                this.view.flxRxttx.setVisibility(true);
                this.view.rxtxContent.text =kony.i18n.getLocalizedString("i18n.enroll.enrollOlbSuccess");
                this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.enrollnew.lbltext7");
                this.view.btnSecondary.setVisibility(false);
                this.view.btnSecond.setVisibility(true);
                 this.view.flxFull.setVisibility(false);
                 this.view.customHeaderNew.flxBack.setVisibility(false); 
			}
            }catch(err){
            kony.print("screen3:"+err);
            }
        },
        screen4:function(screen){
            try{
                var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
                if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
                    this.view.flxMain.setVisibility(false);
                this.view.flxSucessMain.setVisibility(true);
                this.view.flxOnlineRecords.setVisibility(false);
                this.view.flxRxttx.setVisibility(true);
                this.view.rxtxContent.text = kony.i18n.getLocalizedString("i18n.enroll.enrollMbSuccess");
                this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("kony.i18n.mb.migrationSuccess");
                this.view.btnSecondary.setVisibility(true);
                this.view.btnSecond.setVisibility(false);
                this.view.flxMobileRecords.setVisibility(false);  
                this.view.flxFull.setVisibility(false);
                this.view.customHeaderNew.flxBack.setVisibility(false); 
                applicationManager.getNavigationManager().setCustomInfo("LegacyUserEnrolldetails","");
                }
                else{
                this.view.flxMain.setVisibility(false);
                this.view.flxSucessMain.setVisibility(true);
                this.view.flxOnlineRecords.setVisibility(false);
                this.view.flxRxttx.setVisibility(true);
                this.view.rxtxContent.text = kony.i18n.getLocalizedString("18n.enroll.enrollOlbFinalSuccess3");
                this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.enroll.enrollMbSuccessHeading1");
                this.view.btnSecondary.setVisibility(true);
                this.view.btnSecond.setVisibility(false);
                this.view.flxMobileRecords.setVisibility(false);  
                this.view.flxFull.setVisibility(false);
                this.view.customHeaderNew.flxBack.setVisibility(false); 
                }
            }catch(err){
                kony.print("screen2:"+err);
                }
            },
            screen5:function(screen){
                try{
                    var legacyUserdetails=applicationManager.getNavigationManager().getCustomInfo("LegacyUserEnrolldetails");
                    if(legacyUserdetails&&legacyUserdetails.IsLegacyUser){
                        this.view.flxMain.setVisibility(false);
                    this.view.flxSucessMain.setVisibility(true);
                    this.view.flxOnlineRecords.setVisibility(false);
                    this.view.flxRxttx.setVisibility(true);
                    this.view.rxtxContent.text = kony.i18n.getLocalizedString("18n.enroll.enrollMbFinalSuccess3");
                    this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.enroll.enrollOlbSuccessHeading1");
                    this.view.btnSecondary.setVisibility(true);
                    this.view.btnSecond.setVisibility(false);
                    this.view.flxMobileRecords.setVisibility(false);  
                    this.view.flxFull.setVisibility(false);
                    this.view.customHeaderNew.flxBack.setVisibility(false); 
                    applicationManager.getNavigationManager().setCustomInfo("LegacyUserEnrolldetails","");
                    }
                    else{
                    this.view.flxMain.setVisibility(false);
                    this.view.flxSucessMain.setVisibility(true);
                    this.view.flxOnlineRecords.setVisibility(false);
                    this.view.flxRxttx.setVisibility(true);
                    this.view.rxtxContent.text = kony.i18n.getLocalizedString("18n.enroll.enrollMbFinalSuccess3");
                    this.view.lblUserWelcome.text = kony.i18n.getLocalizedString("i18n.enroll.enrollMbSuccessHeading1");
                    this.view.btnSecondary.setVisibility(true);
                    this.view.btnSecond.setVisibility(false);
                    this.view.flxMobileRecords.setVisibility(false);  
                    this.view.flxFull.setVisibility(false);
                    this.view.customHeaderNew.flxBack.setVisibility(false); 
                    }
                }catch(err){
                    kony.print("screen2:"+err);
                    }
                },
        flxBackOnClick: function () {
            const navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "SelfServiceEnrolmentMA", "friendlyName": "EnrollUIModule/frmEnrollActivateProfile" });
        },
        goBack: function(){
            const navManager = applicationManager.getNavigationManager();
            navManager.goBack();
        },
        toggleSection: function(selectedImageId){
        try{
         var imageIds = ["imgEnable1", "imgEnable2", "imgEnable3"];
         var selectID =selectedImageId.id;
            for (var i = 0; i < imageIds.length; i++) {
                var imgId = imageIds[i];
                if (imgId === selectID) {
                    this.view[imgId].src = "radiobtnactive.png";
                    this.imgFlx = this.view[imgId];
                } else {
                    this.view[imgId].src = "radiobtninactive.png";
                }
            }
        }catch(err){
        kony.print("toggleSection:"+ err);
        }
        },
        clientPropertiesAmount: function(){
         var CommonUtilities = require('CommonUtilities');
        var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
        var mobileAmount = clientProperties.MOBILE_BANKING_CHARGES;
        var bothChannelAmount = clientProperties.BOTH_CHANNEL_BANKING_CHARGES;
        var onlineAmount = clientProperties.ONLINE_BANKING_CHARGES;
        this.view.lblFromBankName.text = onlineAmount;
        this.view.lblMobileOnlyenroll.text =mobileAmount;
        this.view.lblOnlineAcc.text = bothChannelAmount;
        this.imgFlx =this.view.imgEnable3;
        },
        navContinue:function(){
            if(this.view.imgEnable1.src =="radiobtnactive.png" || this.view.imgEnable2.src =="radiobtnactive.png" || this.view.imgEnable3.src =="radiobtnactive.png"){
                var reqChannel ="";
                if(this.imgFlx.src == this.view.imgEnable1.src){
                    reqChannel ="ONLINE_BANKING";
                }else if(this.imgFlx.src == this.view.imgEnable2.src){
                    reqChannel ="MOBILE_BANKING";
                }else if(this.imgFlx.src == this.view.imgEnable3.src){
                    reqChannel ="BOTH";
                }
                var Payload= {
                    "contractId": this.contractId,
                    "requestedFor":reqChannel,
                    "legalEntityId":this.legalEntityId,
                    "currentChannel":this.currentChannel,
                    "isConsentProvided":this.consentProvide
                    };
            var params ={
                "requestedFor":reqChannel,
                "flag":this.flag
            }
            applicationManager.getNavigationManager().setCustomInfo("screens",params);
            applicationManager.getPresentationUtility().showLoadingScreen();
            var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            enrollMod.presentationController.setChannelRequest(Payload);
            }
        },
        alertPop: function(){
        //this.view.flxSucessMain.setVisibility(false);
        this.view.flxFull.setVisibility(true);  
          var headertext = (this.view.flxMobileRecords.isVisible)?"Mobile Banking Subscription":"Online Banking Subscription";
         var CommonUtilities = require('CommonUtilities');
        var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
        var channelAcc = clientProperties.CHANNEL_OFFER;
        var chargesChannel = clientProperties.BOTH_CHANNEL_BANKING_CHARGES;
        this.view.richtextpopup.rxtxAlertmessage.text = channelAcc;
        this.view.richtextpopup.rxtxAlertmessage.skin ="sknLbl727272SSPLight26pxSSPTab";
        this.view.richtextpopup.lblHeader.text =headertext;
        this.view.richtextpopup.lblHeader.skin = "sknHBLLblBold112pr000000";
 },
        activationFlow: function(){
            var navManager = applicationManager.getNavigationManager();    
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    newUserManager.resetEnrollObj();
    navManager.setCustomInfo("profileActivation", "profileActivation");
     navManager.navigateTo({"appName":"SelfServiceEnrolmentMA","friendlyName":"frmEnrollActivateProfile"},false,{"appservice":true});
        },
        navAck: function(){
            applicationManager.getPresentationUtility().showLoadingScreen();
            var scope =this;
            var reqChannel = (scope.view.flxMobileRecords.isVisible)?"MOBILE_BANKING":"ONLINE_BANKING";
             var Payload= {
                    "contractId": this.contractId,
                    "requestedFor":reqChannel,
                    "legalEntityId":this.legalEntityId,
                    "currentChannel":this.currentChannel,
					"isConsentProvided":this.consentProvide
                    };
                    var params ={
                "requestedFor":reqChannel,
                "flag":this.flag
            }
             applicationManager.getNavigationManager().setCustomInfo("screens", params);
            var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
            enrollMod.presentationController.setChannelRequest(Payload);
            
        this.view.flxFull.setVisibility(false);

        },
        closePop: function(){
         this.view.flxFull.setVisibility(false);   
        },
};
 });