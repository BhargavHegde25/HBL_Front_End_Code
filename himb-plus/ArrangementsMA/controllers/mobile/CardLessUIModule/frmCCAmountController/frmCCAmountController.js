define({

    //Type your controller code here
    notifyFlag: "",
    recipientFlag: "",
	init:function(){
		//this.view.preShow=this.preshow.bind(this);
        this.preShow();
	},
    preShow: function() {
        try {
            var scope = this;
            if(!kony.sdk.isNullOrUndefined(scope.recipientFlag)){
                if(scope.recipientFlag =="others"){}else{
                scope.recipientFlag = "Self";
                }
            }else{
                scope.recipientFlag = "Self";
            }
    
        var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        var txnDetails = cardlessModule.presentationController.getTransactionObject();
        if(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(txnDetails.formFlag)){

        }else{
            scope.setUpUI();
        }
       scope.view.lblCashRecip.setFocus(true);
            scope.setUpFromAccountData();
            scope.bindAction();
			scope.notifyFlag="Phone";
			 scope.verifyOneOrMoreEligibleAcc();
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in preshow*********************************" + e);
        }

    },
    verifyOneOrMoreEligibleAcc: function () {
        try {
            var scope = this;
            applicationManager.getPresentationUtility().showLoadingScreen();
            var qrPresController = applicationManager.getModulesPresentationController({
                "moduleName": "QRPaymentsUIModule",
                "appName": "TransfersMA"
            });
            var res = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
            var accounts = res.filter(function (account) {
                return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom == "1" && account.currencyCode != "USD";
            });
            accounts = qrPresController.processAccountsData(accounts);
            scope.view.imgChevron.isVisible = accounts.length > 0 ?
                (accounts.length === 1 &&
                    accounts[0].hasOwnProperty("accountID") &&
                    accounts[0].accountID === scope.view.lblAccountNumber.text
                    ? false : true)
                : false;
            if (scope.view.imgChevron.isVisible) {
                scope.view.flxChooseAccount.onClick = scope.invokeAccSelection.bind(scope);
            } else {
                scope.view.flxChooseAccount.onClick = function () { };
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        } catch (e) {
            kony.print("verifyOneOrMoreEligibleAcc" + e);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    },
    bindAction: function() {
        try {
            var scope = this;
            scope.view.flxMyself.onClick = scope.showRecipient.bind(scope);
            scope.view.flxOthers.onClick = scope.showRecipient.bind(scope);
            scope.view.flxPhone.onClick = scope.selectNotify.bind(scope);
            scope.view.flxMail.onClick = scope.selectNotify.bind(scope);
            scope.view.customHeader.flxBack.onClick = scope.flxBackOnClick.bind(scope);
            scope.view.customHeader.btnRight.onClick = scope.navigateToDashboard.bind(scope);
            scope.view.imgContactPicker.onTouchEnd = scope.openContactPicker.bind(scope);
            scope.view.txtAmount.onTextChange = scope.formValidation.bind(scope);
			// scope.view.txtAmount.onEndEditing = scope.addDenomination.bind(scope);
			// scope.view.txtAmount.onDone=scope.addDenomination.bind(scope);
            scope.view.txtFirstName.onTextChange = scope.formValidation.bind(scope);
            scope.view.txtLastname.onTextChange = scope.formValidation.bind(scope);
            scope.view.txtPhoneNumber.onTextChange = scope.formValidation.bind(scope);
            scope.view.txtEmail.onTextChange = scope.formValidation.bind(scope);
            scope.view.btnContinue.onClick = scope.contineOnlick.bind(scope);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in bindAction*********************************" + e);
        }
    },
    navigateToDashboard: function() {
		var scope=this;
		scope.resetUI()
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
		var scope=this;
        var navMan = applicationManager.getNavigationManager();
		scope.resetUI()
        navMan.goBack();
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
                this.view.flxMainParent.top = "110dp";
                this.view.title = kony.i18n.getLocalizedString("kony.mb.CardLessWithdraw.Title");
            } else {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.CardLessWithdraw.Title");
                this.view.customHeader.imgBack.src = "backbutton.png";
                this.view.customHeader.imgBack.isVisible = true;
                this.view.flxSteps.top = "70dp";
                this.view.flxMainParent.top = "130dp";
            }
        } catch (err) {
            kony.print("setTitleBarVisibility" + err);
        }
    },
    setUpUI: function () {
        try {
            var scope = this;
            this.setTitleBarVisibility();
            var navMan = applicationManager.getNavigationManager();
            var recipient = "Self";//navMan.getCustomInfo("recipientFlag");
            var notify = "Phone";//navMan.getCustomInfo("notifyFlag");
            scope.view.imgStep1.src = "steps_red_1.png";
            scope.view.imgstep2.src = "steps_gray_2.png";
            scope.view.imgStep3.src = "steps_gray_3.png";
            scope.view.lblSecure.skin = "sknLblFtSize90C737373GreySecureCCW" //grey secure
            scope.view.lblDone.skin = "sknLblFtSize90C737373GreySecureCCW" //grey secure
            scope.view.txtAmount.text = "";
            var denominationValue = scope.getDenominationString();
            scope.view.lblDenomination.text = "Enter multiples of 500 (" + denominationValue + "..)";
            this.view.imgChevron.isVisible = true;
            if (recipient == "Self") {
                scope.recipientFlag = "Self";
                scope.view.flxOthersDetails.setVisibility(false);
                scope.view.txtFirstName.text = "";
                scope.view.txtLastname.text = "";
                scope.view.txtPhoneNumber.text = "";
                scope.view.txtEmail.text = "";
                // scope.view.btnContinue.bottom = "";
                // scope.view.btnContinue.top = (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") ? "140dp":"180dp";
                navMan.setCustomInfo("recipientFlag", scope.recipientFlag);
            }
            else if (recipient == "others") {
                scope.recipientFlag = "others";
                scope.view.flxOthersDetails.setVisibility(true);
                // scope.view.btnContinue.top = "50dp";
                // scope.view.btnContinue.bottom = "30dp";
                navMan.setCustomInfo("recipientFlag", scope.recipientFlag);
            }
            else {
                scope.recipientFlag = "Self";
                scope.view.flxOthersDetails.setVisibility(false);
                scope.view.txtAmount.text = "";
                scope.view.txtFirstName.text = "";
                scope.view.txtLastname.text = "";
                scope.view.txtPhoneNumber.text = "";
                scope.view.txtEmail.text = "";
                navMan.setCustomInfo("recipientFlag", scope.recipientFlag);
            }
            if (notify == "Phone") {
                scope.notifyFlag = "Phone";
                scope.view.txtEmail.text = "";
                navMan.setCustomInfo("notifyFlag", scope.notifyFlag);
            }
            else if (notify == "Email") {
                scope.view.txtPhoneNumber.text = "";
                scope.notifyFlag = "Email";
                navMan.setCustomInfo("notifyFlag", scope.notifyFlag);
            }
            else {
                scope.notifyFlag = "Phone";
                navMan.setCustomInfo("notifyFlag", "Phone");
            }
            scope.view.flxOthers.skin = "sknFlxbgA3A3A3OP0Bor1";
            scope.view.flxMyself.skin = "sknFlxbg851A1COP10Bor1";
            scope.formValidation();
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in setUpUI*********************************" + e);
        }

    },
    getDenominationString: function() {
        try {
            var scope = this;
            var str = '';
            var denominations = applicationManager.getConfigurationManager().getDenominationAmountValues();
            for (var i in denominations) {
                if (i == denominations.length - 1)
                    str += (" " + denominations[i] + ".");
                else
                    str += (" " + denominations[i] + ",");
            }
            return str;
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in getDenominationString*********************************" + e);
        }


    },
    setUpFromAccountData: function(fromAccount) {
        try {
            var scope = this;
            if (!fromAccount) {
                var defaultcardlessacc = applicationManager.getUserPreferencesManager().getUserObj().default_account_cardless;
                var accounts = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
                var navMan = applicationManager.getNavigationManager();
                var CardlessFrmAccount;
                var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
                if (defaultcardlessacc) {
                    CardlessFrmAccount = accounts.filter(function(acc) {
                        if (acc.accountID == defaultcardlessacc)
                            return acc;
                    });
                } else {
                    CardlessFrmAccount = accounts.filter(function(account) {
                        return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom == "1" && account.currencyCode != "USD";
                    });
                }
                cardlessModule.presentationController.setFromAccountDetails(CardlessFrmAccount[0]);
                var txnDetails = cardlessModule.presentationController.getTransactionObject();
                txnDetails = cardlessModule.presentationController.processAccountsData(txnDetails);
                navMan.setCustomInfo("frmCardLessWithdraw", txnDetails);
                scope.view.lblName.text = CardlessFrmAccount[0].accountName;
                scope.view.lblBalance.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(CardlessFrmAccount[0].availableBalance, CardlessFrmAccount[0].currencyCode);
                scope.view.lblAccountNumber.text = CardlessFrmAccount[0].accountID;
                scope.view.lblAccountType.text = CardlessFrmAccount[0].productId;
            } else {
                var accounts = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
                var navMan = applicationManager.getNavigationManager();
                var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
                var CardlessFrmAccount = accounts.filter(function(acc) {
                    if (acc.accountID == fromAccount)
                        return acc;
                });
                cardlessModule.presentationController.setFromAccountDetails(CardlessFrmAccount[0]);
                var txnDetails = cardlessModule.presentationController.getTransactionObject();
                txnDetails = cardlessModule.presentationController.processAccountsData(txnDetails);
                navMan.setCustomInfo("frmCardLessWithdraw", txnDetails);
                scope.view.lblName.text = CardlessFrmAccount[0].accountName;
                scope.view.lblBalance.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(CardlessFrmAccount[0].availableBalance, CardlessFrmAccount[0].currencyCode);
                scope.view.lblAccountNumber.text = CardlessFrmAccount[0].accountID;
                scope.view.lblAccountType.text = CardlessFrmAccount[0].productId;
            }
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in setUpFromAccountData*********************************" + e);
        }

    },
    showRecipient: function(eventObject) {
        try {
            var scope = this;
			var navMan=applicationManager.getNavigationManager();
			var transactionObj = applicationManager.getTransactionsListManager();
            if (eventObject.id == "flxOthers") {
                scope.view.flxOthers.skin = "sknFlxbg851A1COP10Bor1";
                scope.view.flxMyself.skin = "sknFlxbgA3A3A3OP0Bor1";
                scope.view.flxOthersDetails.setVisibility(true);
                scope.recipientFlag = "others";
				navMan.setCustomInfo("recipientFlag",scope.recipientFlag);
				transactionObj.setTransactionAttribute("cashlessMode",scope.recipientFlag);

            } else {
                scope.view.flxOthers.skin = "sknFlxbgA3A3A3OP0Bor1";
                scope.view.flxMyself.skin = "sknFlxbg851A1COP10Bor1";
                scope.view.flxOthersDetails.setVisibility(false);
                scope.recipientFlag = "Self";
				navMan.setCustomInfo("recipientFlag",scope.recipientFlag);
				transactionObj.setTransactionAttribute("cashlessMode",scope.recipientFlag);
            }
            scope.view.flxSelectRecipient.forceLayout();
			scope.formValidation();

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in showRecipient*********************************" + e);
        }

    },
    selectNotify: function(eventObject) {
        try {
            var scope = this;
			var navMan=applicationManager.getNavigationManager();
            if (eventObject.id == "flxPhone") {
                scope.view.flxPhone.skin = "sknFlxbg851A1COP10Bor1";
                scope.view.flxMail.skin = "sknFlxbgA3A3A3OP0Bor1";
                scope.view.lblPhone.skin = "sknHBLLblSemiBold112pr851A1C";
                scope.view.lblEmail.skin = "sknHBLLblSemiBold112pr000000";
                scope.notifyFlag = "Phone";
				navMan.setCustomInfo("notifyFlag",scope.notifyFlag);
                //scope.view.flxOthersDetails.setVisibility(true);

            } else {
                scope.view.flxPhone.skin = "sknFlxbgA3A3A3OP0Bor1";
                scope.view.flxMail.skin = "sknFlxbg851A1COP10Bor1";
                scope.notifyFlag = "Email";
                scope.view.lblPhone.skin = "sknHBLLblSemiBold112pr000000";
                scope.view.lblEmail.skin = "sknHBLLblSemiBold112pr851A1C";
				navMan.setCustomInfo("notifyFlag",scope.notifyFlag);
                //scope.view.flxOthersDetails.setVisibility(false);
            }
            scope.view.flxOthersDetails.forceLayout();
            scope.changeNotify();
			scope.formValidation();
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in selectNotify*********************************" + e);
        }

    },
    changeNotify: function() {
        try {
            var scope = this;
            if (scope.notifyFlag == "Phone") {
                scope.view.lblPhoneNumber.text = applicationManager.getPresentationUtility().getStringFromi18n("Kony.mb.userdetail.PhoneNumber");
                scope.view.imgContactPicker.setVisibility(true);
                scope.view.txtEmail.setVisibility(false);
                scope.view.txtPhoneNumber.text = "";
                scope.view.lblcCode.setVisibility(true);


            } else {
                scope.view.lblPhoneNumber.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.login.CantSignIn.EmailAddress");
                scope.view.imgContactPicker.setVisibility(false);
                scope.view.txtEmail.setVisibility(true);
                scope.view.txtEmail.text = "";
                //scope.view.txtPhoneNumber.padding=[3,1,1,3];
                scope.view.lblcCode.setVisibility(false);

            }
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in changeNotify*********************************" + e);
        }
    },
    invokeAccSelection: function() {
        try {
            var scope = this;
            var qrPresentationController = applicationManager.getModulesPresentationController({
                "moduleName": "QRPaymentsUIModule",
                "appName": "TransfersMA"
            });
            var res = applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
            var accounts = res.filter(function(account) {
                return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom == "1" && account.currencyCode != "USD";
            });
            accounts = qrPresentationController.processAccountsData(accounts);
            var PopupObj = {
                "accounts": accounts, //should br Array of object[{},{},{}...]
                "flowType": "QR",
                "rowClickCallback": scope.onRowSelection.bind(this)
            };
            applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope, PopupObj);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in load esewa invokeAccSelection*********************************" + e);
        }
    },
    onRowSelection: function(row) {
        try {
            var scope = this;
            scope.view.flxPopupfrombottom.setVisibility(false);
            scope.setUpFromAccountData(row[0].lblAccNumber);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in onRowSelection*********************************" + e);
        }

    },
    openContactPicker: function() {
        try {
            var scope = this;
            var options = {
                isAccessModeAlways: true
            };
            var result = kony.application.checkPermission(kony.os.RESOURCE_CONTACTS, options);
            if (result.status === kony.application.PERMISSION_DENIED) {
                kony.application.requestPermission(kony.os.RESOURCE_CONTACTS, scope.pickercallback.bind(this));
            } else if (result.status === kony.application.PERMISSION_GRANTED) {
                scope.pickContact();
            }
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in  navigateToContacts*********************************" + e);
        }
    },
    pickercallback: function(response) {
        try {
            var scope = this;
            if (response.status === kony.application.PERMISSION_GRANTED) {
                scope.pickContact();
            } else if (response.status === kony.application.PERMISSION_DENIED) {

                var i18nKey = "";
                var cntType = "phone";
                var transactionObj = applicationManager.getTransactionsListManager();
                if (cntType === "phone") {

                    i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts");
                } else {

                    i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardLess.permissionContacts");
                }
                applicationManager.getPresentationUtility().Alert(i18nKey);
            }

        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in sample*********************************" + e);
        }
    },
    pickContact: function() {
        try {
            var scope = this;
            let contactPickerObjectLocal;
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                contactPickerObjectLocal = new contactsAPI.ContactPicker();
            } else {
                let contactsAPI = java.import("com.konyffi.contacts.ContactPicker");
                contactPickerObjectLocal = new contactsAPI();
            }
            var cntType = "phone";
            if (cntType === "phone")
                contactPickerObjectLocal.selectSinglePhoneNumber(scope.contactCallBack);
            else
                contactPickerObjectLocal.selectSingleEmail(scope.contactCallBack);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in  pickContact*********************************" + e);
        }
    },
    contactCallBack: function(object) {
        try {
            var scope = this;
            var resultContact = (JSON.parse(object));
            var cntType = "phone";
            var transactionObj = applicationManager.getTransactionsListManager();

            if (resultContact.phone) {
                resultContact.phone.replace(/\u00A0/g, " ");
            }
            //if(resultContact.phone.indexOf("+977")==0){
            scope.view.txtPhoneNumber.text = resultContact.phone.replace(/\D/g, '').slice(-10);
            scope.formValidation();
            //}
            //transactionObj.setTransactionAttribute("esewaID",resultContact.phone.replace(/^\+977[-\s]?/, ''));
            scope.view.forceLayout();
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in  contactCallBack*********************************" + e);
        }
    },

    formValidation: function () {
        try {
            var scope = this;
            var amount = scope.view.txtAmount.text;
            var fName = scope.view.txtFirstName.text;
            var lName = scope.view.txtLastname.text;
            var PhoneNumber = scope.view.txtPhoneNumber.text;
            var email = scope.view.txtEmail.text;
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var nameRegex = /^(?!.* {2,})(?!.*-{2,})[A-Za-z0-9](?:[A-Za-z0-9 -]*[A-Za-z0-9])?$/;
            var allSpecialChar = "!@#$%^&*()_+=~`{}[]|\:<,>?;',./'";
            scope.view.txtFirstName.restrictCharactersSet = allSpecialChar;//without hyphen
            scope.view.txtLastname.restrictCharactersSet = allSpecialChar;//without hyphen
            scope.view.txtFirstName.text = scope.view.txtFirstName.text === " " ? "" : scope.view.txtFirstName.text;
            scope.view.txtLastname.text = scope.view.txtLastname.text === " " ? "" : scope.view.txtLastname.text;
            // /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\u0100-\uFFFF ]+$/;
            amount = amount.replace(/,/g, '');
            var num = parseFloat(amount);
            if (scope.recipientFlag == "Self") {
                if (amount && amount.length != 0) {
                    scope.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
                    scope.view.btnContinue.setEnabled(true);

                } else {
                    scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
                    scope.view.btnContinue.setEnabled(false);
                }
                // scope.view.btnContinue.bottom = "";
                // scope.view.btnContinue.top = (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") ? "140dp":"180dp";
            } else {
                if (amount && amount.length != 0 && nameRegex.test(fName.trim()) && ((scope.notifyFlag == "Phone" && PhoneNumber.length == 10) || (scope.notifyFlag == "Email" && emailRegex.test(email.trim())))) {
                    scope.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
                    scope.view.btnContinue.setEnabled(true);
                } else {
                    scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
                    scope.view.btnContinue.setEnabled(false);
                }
                // scope.view.btnContinue.top = "50dp";
                // scope.view.btnContinue.bottom = "30dp";
            }
            this.formatAmountAndDenomination(amount);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in formValidation*********************************" + e);
        }
    },
    formatAmountAndDenomination: function (amount) {
        try {
            //format amount and denomination
            var scope = this;
            var num, splitDot, result = "";
            if (Number(amount) != 0 && !kony.sdk.isNullOrUndefined(amount)) {
                if (Number(amount) >= 500) {
                    if (amount.includes(".")) {
                        splitDot = amount.split('.');
                        if (splitDot[1].length >= 3 && splitDot[1].length - 1 === 0) {
                            amount = amount.slice(0, -2) + "." + amount.slice(-2);
                        } else if (splitDot[1].length >= 3) {
                            amount = amount.replace(/\D/g, '');
                            num = parseInt(amount, 10) / 100;
                            num.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                            amount = num;
                        } else if (splitDot[1].length === 1) {
                            num = (parseFloat(amount) / 10).toString();
                            num.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                            amount = num;
                        }
                        num = parseFloat(amount);
                        if (!isNaN(num)) {
                            scope.view.txtAmount.text = num.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                        }
                    } else {
                        num = parseFloat(amount);
                        if (!isNaN(num)) {
                            scope.view.txtAmount.text = num.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            });
                        }
                    }
                }else {scope.view.txtAmount.text = String(parseInt(amount, 10));}
            }
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            kony.print("error in formatAmountAndDenomination" + e);
        }
    },
    bindGenericError: function(errorMsg) {
		try{
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var scopeObj = this;
        applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
		}
		catch(e){
			applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in bindGenericError*********************************" + e);
		}
    },
    contineOnlick: function () {
        try {
            var scope = this;
            var firstName = scope.view.txtFirstName.text;
            var lastName = scope.view.txtLastname.text;
            var transactionObj = applicationManager.getTransactionsListManager();
            var phoneNumber = scope.view.txtPhoneNumber.text;
            var email = scope.view.txtEmail.text;
            var person = firstName;
            var amount = scope.view.txtAmount.text;
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var nameRegex = /^(?!.* {2,})(?!.*-{2,})[A-Za-z0-9](?:[A-Za-z0-9 -]*[A-Za-z0-9])?$/;
            amount = amount.replace(/,/g, '');
            var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule").presentationController;
            var MaxLimits = applicationManager.getConfigurationManager().MB_CARDLESS_MAX_LIMIT;

            if (Number(MaxLimits) < Number(amount)) {
                scope.bindGenericError(kony.i18n.getLocalizedString("i18n.mb.cardlesscash.Maxlimiterrmsg") + " " + MaxLimits)
            } else {
                if (scope.recipientFlag == "others") {

                    cLMod.setCashlessFirstName(firstName);
                    cLMod.setCashlessLastName(lastName);
                    if (lastName === null || lastName === "") {
                        lastName = "";
                    }
                    person = person + " " + lastName;

                    transactionObj.setTransactionAttribute("cashlessPersonName", person);
                    if (scope.notifyFlag == "Phone") {
                        transactionObj.setTransactionAttribute("cashlessPhone", phoneNumber.trim());
                    } else {
                        transactionObj.setTransactionAttribute("cashlessEmail", email.trim());
                    }
                }
                transactionObj.setTransactionAttribute("cashlessMode", scope.recipientFlag);

                if (phoneNumber && scope.notifyFlag == "Phone" && phoneNumber.length != 10) {
                    scope.bindGenericError(kony.i18n.getLocalizedString("Kony.mb.enroll.accountMobile"))
                } else if (firstName && !nameRegex.test(firstName.trim())) {
                    scope.bindGenericError(kony.i18n.getLocalizedString("i18n.NAO.FirstName"))
                } else if (lastName && !nameRegex.test(lastName.trim())) {
                    scope.bindGenericError(kony.i18n.getLocalizedString("i18n.NAO.LastName"))
                } else if (email && scope.notifyFlag == "Email" && !emailRegex.test(email.trim())) {
                    scope.bindGenericError(kony.i18n.getLocalizedString("Kony.mb.enroll.accountemail"))
                } else if (amount && Number(amount) < 500) {
                    scope.bindGenericError(kony.i18n.getLocalizedString("i18n.mb.carless.minimumerrormsg") + "00")
                } else if (amount && Number(amount) % 500 != 0 && Number(amount) > 500) {
                    scope.bindGenericError(kony.i18n.getLocalizedString("i18n.mb.cardless.multipleerrmsg") + "00")
                } else cLMod.setCCWTransactionAmount(amount);
            }
             transactionObj.setTransactionAttribute("formFlag",true);
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in contineOnlick*********************************" + e);
        }
    },
	resetUI:function(){
		try{
		  var scope=this;
		  var navMan=applicationManager.getNavigationManager();
          var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
          var txnDetails = cardlessModule.presentationController.getTransactionObject();
          txnDetails.formFlag =null;
          scope.recipientFlag =null;
		  navMan.setCustomInfo("recipientFlag","");
		  navMan.setCustomInfo("notifyFlag","");
		   scope.view.imgStep1.src = "steps_red_1.png";
            scope.view.imgstep2.src = "steps_gray_2.png";
            scope.view.imgStep3.src = "steps_gray_3.png";
            scope.view.lblSecure.skin = "sknLblFtSize90C737373GreySecureCCW" //grey secure
            scope.view.lblDone.skin = "sknLblFtSize90C737373GreySecureCCW" //grey secure
            var denominationValue = scope.getDenominationString();
            scope.view.lblDenomination.text = "Enter multiples of 500 (" + denominationValue + "..)";
            scope.view.flxOthersDetails.setVisibility(false);
            scope.view.btnContinue.skin = "sknBtnOnBoardingInactive";
            scope.view.btnContinue.setEnabled(false);
			scope.view.txtAmount.text="";
			scope.view.txtFirstName.text="";
			scope.view.txtLastname.text="";
			scope.view.txtPhoneNumber.text="";
			scope.view.txtEmail.text="";
		  
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in resetUI*********************************"+e);
		}
	},
    addDenomination: function () {
        try {
            var scope = this;
            var amount = scope.view.txtAmount.text;
            scope.view.txtAmount.text=Number(amount).toFixed(2);
            //   var textBox = scope.view.txtAmount;
            //   var pos = textBox.text.length - 3;
            //   textBox.setSelection(pos, pos);
            //   amount = amount.replace(/\.00$/, '');
        } catch (e) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
            kony.print("**********************error in addDenomination*********************************" + e);
        }
    }
});