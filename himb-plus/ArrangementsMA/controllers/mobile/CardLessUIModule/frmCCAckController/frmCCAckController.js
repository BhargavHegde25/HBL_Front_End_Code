define({ 

 preShow:function(){
	 try{
		  var scope=this;
		  scope.setUpUI();
		  scope.setTransactionData();
		  scope.bindAction();
		  
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in preshow*********************************"+e);
		}
 },
    setTitleBarVisibility: function () {
        try {
            var scope=this;
            // var currentFormObject = kony.application.getCurrentForm();
            // var currentForm = currentFormObject.id;
            // applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm);
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: false,
                    tintColor: "FFFFFF00",
                    metaData: {}
                });

                this.view.flxHeader.isVisible = false;
                this.view.flxSteps.top = "20dp";
                this.view.flxMain.top = "110dp";
                this.view.title = kony.i18n.getLocalizedString("kony.mb.MM.Acknowledgement");
            } else {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.MM.Acknowledgement");
                this.view.customHeader.imgBack.isVisible = false;
                this.view.flxSteps.top = "70dp";
                this.view.flxMain.top = "130dp";
            }
        } catch (err) {
            kony.print("setTitleBarVisibility" + err);
        }
    },
setUpUI: function() {
        try {
            var scope = this;
            this.setTitleBarVisibility();
            scope.view.flxSuccess.setFocus(true);
            var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule").presentationController;
            var forUtility = applicationManager.getFormatUtilManager();
            var transactionObj = cLMod.getTransactionObject();
            scope.view.imgStep1.src = "steps_green_success.png";
            scope.view.imgstep2.src = "steps_green_success.png";
            scope.view.imgStep3.src = "steps_green_success.png";
            scope.view.lblSetup.skin = "sknLblFtSize90C059669GreenSecureCCW"; //green secure
            scope.view.lblSecure.skin = "sknLblFtSize90C059669GreenSecureCCW"; //green secure
            scope.view.lblDone.skin = "sknLblFtSize90C059669GreenSecureCCW"; //green secure
            this.view.lblSuccess.text=kony.i18n.getLocalizedString("i18n.hbl.enroll.RequestSubmitted")+"!!!";
			// this.view.rtxCombineInfo.text = <center>kony.i18n.getLocalizedString("i18n.mb.cc.enteryour") <b>kony.i18n.getLocalizedString("i18n.mb.cc.your4digit")</b> kony.i18n.getLocalizedString("i18n.mb.cc.followedBy") <b>kony.i18n.getLocalizedString("i18n.mb.cc.System6digitcode")</b> kony.i18n.getLocalizedString("i18n.mb.cc.atmcash").</center>
            this.view.rtxCombineInfo.text = kony.i18n.getLocalizedString("i18n.mb.cc.enteryour") + " " +
                                            "<b>" +
                                            kony.i18n.getLocalizedString("i18n.mb.cc.your4digit") +
                                            "</b> " +
                                            kony.i18n.getLocalizedString("i18n.mb.cc.followedBy") + " " +
                                            "<b>" +
                                            kony.i18n.getLocalizedString("i18n.mb.cc.System6digitcode") +
                                            "</b> " +
                                            kony.i18n.getLocalizedString("i18n.mb.cc.atmcash");

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in setUpUI*********************************" + e);
        }
    },
	bindAction: function() {
        try {
            var scope = this;
			this.view.btnContinue.onClick=scope.findNearByATM.bind(scope);
			this.view.btnDone.onClick=scope.btnDoneOnClick.bind(scope);
			this.view.customHeader.btnRight.onClick=scope.navigateToAccountsDashboard.bind(scope);
			this.view.imgPeek.onTouchEnd=scope.handlePeek.bind(this);

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in bindAction*********************************" + e);
        }
    },
	setTransactionData:function(){
	try{
		   var scope = this;
            var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule").presentationController;
            var navMan = applicationManager.getNavigationManager();
            var transObj = cLMod.getTransactionObject();
            var recipientType = navMan.getCustomInfo("recipientFlag");
            var contactType = navMan.getCustomInfo("notifyFlag");
			var navMan=applicationManager.getNavigationManager();
			var cashlessObj=navMan.getCustomInfo("frmCardLessConfWithdraw");
			scope.startCountdown.call(this,cashlessObj.validDate);
    var cashlessMode=cashlessObj.cashlessMode;
            scope.view.segConfirm.widgetDataMap = {
                "lblKey": "lblKey",
                "lblValue": "lblValue"
            };
            var segData = [];
			
			if (transObj.amount) {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),
                    "lblValue": transObj.amount
                })
            }
            if (transObj.fromAccountNumber) {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.cardLess.FromAccount"),
                    "lblValue": transObj.fromAccountNumber
                })
            }
            if (recipientType == "others"||cashlessMode== "others") {
                if (transObj.cashlessPersonName != null) {
                    segData.push({
                        "lblKey": kony.i18n.getLocalizedString("kony.mb.cardLess.forCollectionBy"),
                        "lblValue": transObj.cashlessPersonName
                    });
                }
                if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(transObj.cashlessEmail)){
                    segData.push({
                        "lblKey": kony.i18n.getLocalizedString("i18n.login.CantSignIn.EmailAddress"),
                        "lblValue": transObj.cashlessEmail
                    });
                }
                if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(transObj.cashlessPhone)){
                    segData.push({
                        "lblKey": kony.i18n.getLocalizedString("Kony.mb.userdetail.PhoneNumber"),
                        "lblValue": transObj.cashlessPhone
                    });
                }
	} else if (recipientType == "Self"||cashlessMode== "Self") {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.cardLess.forCollectionBy"),
                    "lblValue": "Self"
                });
            }
			if (cashlessObj.referenceId) {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("kony.i18n.common.transactionID"),
                    "lblValue": cashlessObj.referenceId
                })
            }
			
           /* if (contactType == "Email"&&recipientType == "others") {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("Kony.mb.userdetail.EmailID"),
                    "lblValue": transObj.cashlessEmail
                });
            } else if (contactType == "Phone"&&recipientType == "others") {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("Kony.mb.userdetail.PhoneNumber"),
                    "lblValue": transObj.cashlessPhone
                });
            }*/
            segData.push({
                "lblKey": kony.i18n.getLocalizedString("i18n.mb.cc.ReqDate"),
                "lblValue": applicationManager.getFormatUtilManager().getFormatedDateString(new Date, 'd/m/y')
            });
            scope.view.segConfirm.rowTemplate = "flxSegTransferNew";
            scope.view.segConfirm.setData(segData);
            applicationManager.getPresentationUtility().dismissLoadingScreen();


	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in setTransactionData*********************************"+e);
		}	
	},
/*	updateTimer:function(timedata){
		try{
		  var scope=this;
		  
var totalMinutes = timedata * 60;
    updateLabel();
    kony.timer.schedule(
        "countdownTimer",
        timerTick,
        60,
        true
    );
function timerTick() {

    if (totalMinutes > 0) {
        totalMinutes--;
        updateLabel();
    } else {
        kony.timer.cancel("countdownTimer");
        this.view.lblTime.text = "Time Over";
    }
}
function updateLabel() {

    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    var minText = minutes < 10 ? "0" + minutes : minutes;

    scope.view.lblTime.text = kony.i18n.getLocalizedString("kony.mb.cardLess.ExpiresIn")+" "+hours + "h " + minText + "m";
}
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in updateTimer*********************************"+e);
		}
	},*/

    startCountdown: function (timeString) {
        var scope = this;
        var timerId="";
        const match = timeString.match(/(\d+)h:(\d+)m/);
        if (!match) {
            this.view.lblTime.text = "Invalid Time";
            return;
        }
        let hours = parseInt(match[1], 10);
        let minutes = parseInt(match[2], 10);
        // Total minutes
        let totalMinutes = (hours * 60) + minutes;
        // Initial display
        updateLabel.call(this);
        timerId = "countDownTimer";

        kony.timer.schedule(timerId, function () {
        totalMinutes--;
        if (totalMinutes <= 0) {
            kony.timer.cancel(timerId);
            scope.view.lblTime.text = "Time Over";
            return;
        } updateLabel();
    }, 60, true);

        /*const timer = setInterval(() => {
            totalMinutes--;
            if (totalMinutes <= 0) {
                clearInterval(timer);
                this.view.lblTime.text = "Time Over";
                return;
            }
            updateLabel.call(this);
        }, 60000); // every 1 minute
        */
        function updateLabel() {
            const h = Math.floor(totalMinutes / 60);
            const m = totalMinutes % 60;
            // scope.view.lblTime.text = kony.i18n.getLocalizedString("kony.mb.cardLess.ExpiresIn")+" "+
            //  String(h).padStart(2, '0') + "h:" +
            // String(m).padStart(2, '0') + "m";

            var minText = m < 10 ? "0" + m : m;
            scope.view.lblTime.text = kony.i18n.getLocalizedString("kony.mb.cardLess.ExpiresIn")+" "+ h + "h:" + minText + "m";
            
        }
    },

	findNearByATM:function(){
		try{
    var scope=this;
    var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "LocateUsUIModule",
      "appName": "AboutUsMA"
    });
    locateUsModule.presentationController.presentLocateUsView(true,scope);
		}
		catch(e){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in findNearByATM*********************************"+e);
		}
  },
  btnDoneOnClick:function(){
	  try{
    var scope=this;
		applicationManager.getPresentationUtility().showLoadingScreen();
        kony.timer.cancel("countDownTimer");
		var cardLessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      	cardLessModule.presentationController.getCardlessPendingAndPostedTransactions();
		}
		catch(e){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in btnDoneOnClick*********************************"+e);
		}
    },
    navigateToAccountsDashboard:function(){
		try{
			
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
	  }
		catch(e){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in navigateToAccountsDashboard*********************************"+e);
		}
    },
	handlePeek:function(){
		try{
		  var scope=this;
		  var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule").presentationController;
		  var transactionObj = cLMod.getTransactionObject();
		  var secureCode=transactionObj.cashlessSecurityCode;
		  if (this.view.imgPeek.src == "viewicon.png") {
		  this.view.imgPeek.src = "viewactive.png";
		  this.view.imgStar1.setVisibility(false);
		  this.view.imgStar2.setVisibility(false);
		  this.view.imgStar3.setVisibility(false);
		  this.view.imgStar4.setVisibility(false);
		  this.view.lblSecureCode.setVisibility(true);
		  this.view.lblSecureCode.text=secureCode[0]+" "+secureCode[1]+" "+secureCode[2]+" "+secureCode[3];
		  }else{
		this.view.imgPeek.src = "viewicon.png";	  
		this.view.imgStar1.setVisibility(true);
		  this.view.imgStar2.setVisibility(true);
		  this.view.imgStar3.setVisibility(true);
		  this.view.imgStar4.setVisibility(true);
		  this.view.lblSecureCode.setVisibility(false);
		  this.view.lblSecureCode.text="";
		  }
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in handlePeek*********************************"+e);
		}

	},
 });
 