define({

    //Type your controller code here 
    isSecureCode: false,
    isResecureCode: false,
    isCodeMatch: false,
    secureCodeData: "",
    resecureCodeData: '',
    preShow: function() {
        try {
            var scope = this;
            scope.setUpUI();
            scope.setTransactionDetails();
            scope.bindAction();
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in preshow*********************************" + e);
        }

    },
    setTitleBarVisibility: function () {
        try {
            var scope=this;
            // var currentFormObject = kony.application.getCurrentForm();
            // var currentForm = currentFormObject.id;
            // applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: scope.navigateToDashboard,
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: kony.i18n.getLocalizedString("i18n.konybb.common.cancel")
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
                leftBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_IMAGE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: scope.flxBackOnClick,
                    tintColor: "FFFFFF00",
                    metaData: {
                        image: "backbutton.png"
                    }
                });
                this.view.setLeftBarButtonItems({
                    items: [leftBarButtonItem],
                    animated: true
                });
                this.view.flxHeader.isVisible = false;
                this.view.flxSteps.top = "20dp";
                this.view.flxMain.top = "110dp";
                this.view.title = kony.i18n.getLocalizedString("i18n.mb.cc.review");
            } else {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.mb.cc.review");
                this.view.customHeader.imgBack.src = "backbutton.png";
                this.view.customHeader.imgBack.isVisible = true;
                this.view.flxSteps.top = "70dp";
                this.view.flxMain.top = "130dp";
            }
        } catch (err) {
            kony.print("setTitleBarVisibility" + err);
        }
    },
    bindAction: function() {
        try {
            var scope = this;
            scope.view.customHeader.flxBack.onClick = scope.flxBackOnClick.bind(scope);
            scope.view.customHeader.btnRight.onClick = scope.navigateToDashboard.bind(scope);
            scope.view.txtSecureCode1.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode2.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode3.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode4.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode5.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode6.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode7.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.txtSecureCode8.onTextChange = scope.handleSecureCode.bind(scope);
            scope.view.imgPeek.onTouchEnd = scope.peekChange.bind(scope);
            scope.view.imgPeek2.onTouchEnd = scope.peekChange.bind(scope);
            scope.view.btnContinue.onClick = scope.btnContinueOnClick.bind(scope);
            scope.view.txtDescription.onTextChange = scope.noteCharDecrementing.bind(scope);

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in bindAction*********************************" + e);
        }
    },
    noteCharDecrementing: function(){
        var scope = this;
        var notes = scope.view.txtDescription.text;
        scope.view.lblNotesChar.text = notes.length + "/140";
    },

    navigateToDashboard: function() {
        var scope = this;

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
    flxBackOnClick: function() {
        var scope = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    setUpUI: function() {
        try {
            var scope = this;
            this.setTitleBarVisibility();
            scope.view.flxTransactionSummary.setFocus(true);
            var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule").presentationController;
            var forUtility = applicationManager.getFormatUtilManager();
            var transactionObj = cLMod.getTransactionObject();
            scope.view.imgStep1.src = "steps_green_success.png";
            // scope.view.imgStep1.skin = "sknlblSansproFpntCol851A1Csiz90per"; //red secure
            scope.view.lblSetup.skin = "sknLblFtSize90C059669GreenSecureCCW"; //green secure
            scope.view.imgstep2.src = "steps_red_2.png";
            scope.view.imgStep3.src = "steps_gray_3.png";
            scope.view.lblDone.skin = "sknLblFtSize90C737373GreySecureCCW" //grey secure
            scope.view.lblPrefix.text = forUtility.formatAmount(transactionObj.amount).replace(/\.00$/, '');
            for (i = 1; i <= 8; i++) {
                scope.view["txtSecureCode" + i].text = "";
            }
            scope.view.txtDescription.text = '';

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in setUpUI*********************************" + e);
        }
    },
    setTransactionDetails: function() {
        try {
            var scope = this;
            var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule").presentationController;
            var navMan = applicationManager.getNavigationManager();
            var transObj = cLMod.getTransactionObject();
            var recipientType = navMan.getCustomInfo("recipientFlag");
            var contactType = navMan.getCustomInfo("notifyFlag");
            scope.view.segConfirm.widgetDataMap = {
                "lblKey": "lblKey",
                "lblValue": "lblValue"
            };
            var segData = [];

            if (transObj.fromAccountNumber) {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.cardLess.FromAccount"),
                    "lblValue": transObj.fromAccountNumber
                })
            }
            if (recipientType == "others") {
                if (transObj.cashlessPersonName != null) {
                    segData.push({
                        "lblKey": kony.i18n.getLocalizedString("kony.mb.cardLess.forCollectionBy"),
                        "lblValue": transObj.cashlessPersonName
                    });
                }
            } else if (recipientType == "Self") {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("kony.mb.cardLess.forCollectionBy"),
                    "lblValue": "Self"
                });
            }
            if (contactType == "Email"&&recipientType == "others") {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("Kony.mb.userdetail.EmailID"),
                    "lblValue": transObj.cashlessEmail
                });
            } else if (contactType == "Phone"&&recipientType == "others") {
                segData.push({
                    "lblKey": kony.i18n.getLocalizedString("Kony.mb.userdetail.PhoneNumber"),
                    "lblValue": transObj.cashlessPhone
                });
            }
            segData.push({
                "lblKey": kony.i18n.getLocalizedString("i18n.mb.cc.ReqDate"),
                "lblValue": applicationManager.getFormatUtilManager().getFormatedDateString(new Date, 'd/m/Y')
            });
            scope.view.segConfirm.rowTemplate = "flxSegTransferNew";
            scope.view.segConfirm.setData(segData);
            applicationManager.getPresentationUtility().dismissLoadingScreen();


        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in setTransactionDetails*********************************" + e);
        }
    },
    handleSecureCode: function (eventobject) {
        try {
            var scope = this;
            var widgetId = eventobject.id;
            var value = (eventobject.text || "").trim();
            var currentIndex = parseInt(
                widgetId.replace("txtSecureCode", ""),
                10
            );

            if (value.length === 1 && currentIndex < 8) {
                scope.view["txtSecureCode" + (currentIndex + 1)]
                    .setFocus(true);
            } else if (value.length === 0 && currentIndex > 1) {
                scope.view["txtSecureCode" + (currentIndex - 1)]
                    .setFocus(true);
            }
            // var len = scope.view["txtSecureCode" + currentIndex].text;
            // scope.view["txtSecureCode" + currentIndex].setSelection(len, len);
            scope.validateSecureCode();

            var isValid =   scope.isSecureCode === true &&
                            scope.isResecureCode === true &&
                            scope.isCodeMatch === true;
            scope.view.btnContinue.setEnabled(isValid);
            scope.view.btnContinue.skin = isValid ? "sknBtn0095e4RoundedffffffSSP26px" : "sknBtnOnBoardingInactive";
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            kony.print("handleSecureCode error: " + e);
        }
    },
    peekChange: function(eventObject) {
        try {
            var scope = this;
            if (eventObject.id == "imgPeek") {
                if (scope.view[eventObject.id].src == "viewicon.png") {
                    scope.view[eventObject.id].src = "viewactive.png";
                    scope.view.txtSecureCode1.secureTextEntry = false;
                    scope.view.txtSecureCode2.secureTextEntry = false;
                    scope.view.txtSecureCode3.secureTextEntry = false;
                    scope.view.txtSecureCode4.secureTextEntry = false;

                } else {
                    scope.view[eventObject.id].src = "viewicon.png";
                    scope.view.txtSecureCode1.secureTextEntry = true;
                    scope.view.txtSecureCode2.secureTextEntry = true;
                    scope.view.txtSecureCode3.secureTextEntry = true;
                    scope.view.txtSecureCode4.secureTextEntry = true;
                }
            } else if (eventObject.id == "imgPeek2") {
                if (scope.view[eventObject.id].src == "viewicon.png") {
                    scope.view[eventObject.id].src = "viewactive.png";
                    scope.view.txtSecureCode5.secureTextEntry = false;
                    scope.view.txtSecureCode6.secureTextEntry = false;
                    scope.view.txtSecureCode7.secureTextEntry = false;
                    scope.view.txtSecureCode8.secureTextEntry = false;

                } else {
                    scope.view[eventObject.id].src = "viewicon.png";
                    scope.view.txtSecureCode5.secureTextEntry = true;
                    scope.view.txtSecureCode6.secureTextEntry = true;
                    scope.view.txtSecureCode7.secureTextEntry = true;
                    scope.view.txtSecureCode8.secureTextEntry = true;
                }
            }
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in peekChange*********************************" + e);
        }
    },
    btnContinueOnClick: function() {
        try {
            var transactionObject = applicationManager.getTransactionsListManager();
            var scope = this;
            applicationManager.getPresentationUtility().showLoadingScreen();
            transactionObject.setTransactionAttribute("cashlessSecurityCode", scope.secureCodeData);
            var description = scope.view.txtDescription.text;
            var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
            cardlessModule.presentationController.setTransactionsNotes(description);
            cardlessModule.presentationController.setOverDraftFlag("true");
            cardlessModule.presentationController.setScheduledDate(applicationManager.getFormatUtilManager().getFormatedDateString(new Date, 'd/m/Y'));
            cardlessModule.presentationController.createCardlessTransaction();

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in btnContinueOnClick*********************************" + e);
        }
    },
    validateSecureCode: function() {

        try {

            var scope = this;

            var secureCode = "";
            var resecureCode = "";

            scope.isSecureCode = true;
            scope.isResecureCode = true;
            scope.isCodeMatch = false;


            for (var i = 1; i <= 4; i++) {

                var box = scope.view["txtSecureCode" + i];
                var val = (box.text || "").trim();

                if (val === "" || isNaN(val)) {

                    scope.isSecureCode = false;
                    scope.bindGenericError(kony.i18n.getLocalizedString("kony.mb.cardLess.entervalidsecurecode"));

                    //box.setFocus(true);
                    return;
                }

                secureCode += val;
            }


            for (var j = 5; j <= 8; j++) {

                var reBox = scope.view["txtSecureCode" + j];
                var reVal = (reBox.text || "").trim();

                if (reVal === "" || isNaN(reVal)) {

                    scope.isResecureCode = false;
                    scope.bindGenericError(kony.i18n.getLocalizedString("kony.mb.cardLess.reEnterSecureCode"));

                    //reBox.setFocus(true);
                    return;
                }

                resecureCode += reVal;
            }


            if (secureCode === resecureCode) {

                scope.isCodeMatch = true;
				scope.secureCodeData=secureCode;
                kony.print("Secure Code OK: " + secureCode);

            } else {

                scope.isCodeMatch = false;

                scope.bindGenericError(kony.i18n.getLocalizedString("kony.mb.cardLess.securecodematch"));

                return;
            }

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            kony.print("validateSecureCode error: " + e);
        }
    },
    bindGenericError: function(errorMsg) {
        try {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var scopeObj = this;
            applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in bindGenericError*********************************" + e);
        }
    },

});