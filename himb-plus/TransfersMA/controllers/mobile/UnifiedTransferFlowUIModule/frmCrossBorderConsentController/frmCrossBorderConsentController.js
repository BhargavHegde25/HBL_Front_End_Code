define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
            this.view.onNavigate = this.onNavigate;
        },
        onNavigate: function (uidata) {
            try {
                if (!kony.sdk.isNullOrUndefined(uidata)) {
                    if (!kony.sdk.isNullOrUndefined(uidata.crossBorder)){
                        this.resetUI();
                        this.updateVPADetails(uidata);
                        this.setConsentApplicableDataOnNavigate();
                    }

                    if (!kony.sdk.isNullOrUndefined(uidata.crossBorderType)) {
                        this.setConsentApplicableData(uidata.crossBorderType);
                    }
                    if (!kony.sdk.isNullOrUndefined(uidata.crossBorderConsent)) {
                        this.grantUserConsent(uidata.crossBorderConsent);
                    }
                    if (!kony.sdk.isNullOrUndefined(uidata.crossBorderConsentError)) {
                        this.view.lblConsentStatusValue.text = "";
                        this.view.lblSelectStatus.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                        this.view.lblConsentApplicableForValue.text = "";
                        this.view.imgConsentArrow.isVisible = false;
                        this.checkForToastMessageVPAError();
                    }
                }
            } catch (err) {
                kony.print("Error in onNavigate: " + err.message);
            }
        },
        resetUI : function () {
            this.view.lblConsentStatusValue.text = "";
            this.view.lblSelectStatus.text = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
            this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.pleaseSelectConsentType");
        },
        updateVPADetails: function (data) {
            if (!kony.sdk.isNullOrUndefined(data.crossBorder)) {
                var uidata = data.crossBorder;
                var vpaId = uidata.vpaId;
                this.view.lblVpaNo.text = vpaId;
                var domesticInwardConsent = uidata.domesticInwardConsent;
                var domesticOutwardConsent = uidata.domesticOutwardConsent;
                var internationalInwardConsent = uidata.internationalInwardConsent;
                var internationalOutwardConsent = uidata.internationalOutwardConsent;
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("crossBorderInwardOtwardDetails", {
                    "domesticInwardConsent": domesticInwardConsent,
                    "domesticOutwardConsent": domesticOutwardConsent,
                    "internationalInwardConsent": internationalInwardConsent,
                    "internationalOutwardConsent": internationalOutwardConsent
                });
            }
        },
        setConsentApplicableData : function (crossBorderType) {
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            var country = userObj.country;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            var accNo = ManageActivitiesPresenter.crossBorderAccId;
            var navManager = applicationManager.getNavigationManager();
            var response = navManager.getCustomInfo("crossBorderConsentEligibleAccounts");
            if ((response !== null) && (response !== "") && (response !== undefined)) {
                for (i = 0; i < response.length; i++) {
                    if (response[i].Account_id === accNo) {
                        var flagOutward = response[i].supportTransferFrom;
                        var flagInward = response[i].supportTransferTo;
                        var currency = response[i].currencyCode;
                    }
                }
            }
            var eligibilityFlag = "";
            if (country == "IN" && flagOutward == 1 && currency == "NPR") {
                if (country == "IN" && flagOutward == 1 && flagInward == 1) {
                    this.view.lblConsentApplicableForValue.text = crossBorderType;
                    this.view.imgConsentArrow.isVisible = true;
                    this.view.lblConsentApplicableForValue.left = "4%";
                    this.view.lblConsentApplicableForValue.centerY = "50%";
                    this.view.lblConsentApplicableForValue.top = "0%";
                    this.view.flxConsentApplicable.skin = "sknFlxffffffop100BRadius10pxBorderTab";
                    this.view.lblConsentApplicableForValue.height = "100%";
                    eligibilityFlag = "BOTH";
                } else {
                    this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.OutwardwardConsent");
                    this.view.imgConsentArrow.isVisible = false;
                    this.view.lblConsentApplicableForValue.left = "0%";
                    this.view.lblConsentApplicableForValue.top = "10%";
                    this.view.lblConsentApplicableForValue.centerY = null;
                    this.view.flxConsentApplicable.skin = "sknFlxBgWhiteBr6A6A6A";
                    this.view.lblConsentApplicableForValue.height = "preferred";
                    eligibilityFlag = "OUTWARD";
                }
            } else if (flagInward == 1) {
                this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardConsent");
                this.view.imgConsentArrow.isVisible = false;
                eligibilityFlag = "INWARD";
                this.view.lblConsentApplicableForValue.left = "0%";
                this.view.lblConsentApplicableForValue.top = "10%";
                this.view.lblConsentApplicableForValue.centerY = null;
                this.view.lblConsentApplicableForValue.height = "preferred";
                this.view.flxConsentApplicable.skin = "sknFlxBgWhiteBr6A6A6A";
            }
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("crossBorderDropDownEligibility", eligibilityFlag);
        },
        setConsentApplicableDataOnNavigate: function () {
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            var country = userObj.country;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            var accNo = ManageActivitiesPresenter.crossBorderAccId;
            var navManager = applicationManager.getNavigationManager();
            var response = navManager.getCustomInfo("crossBorderConsentEligibleAccounts");
            if ((response !== null) && (response !== "") && (response !== undefined)) {
                for (i = 0; i < response.length; i++) {
                    if (response[i].Account_id === accNo) {
                        var flagOutward = response[i].supportTransferFrom;
                        var flagInward = response[i].supportTransferTo;
                        var currency = response[i].currencyCode;
                    }
                }
            }
            var eligibilityFlag = "";
            if (country == "IN" && flagOutward == 1 && currency == "NPR") {
                if (country == "IN" && flagOutward == 1 && flagInward == 1) {
                    this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.pleaseSelectConsentType");
                    this.view.imgConsentArrow.isVisible = true;
                    this.view.lblConsentApplicableForValue.left = "4%";
                    this.view.lblConsentApplicableForValue.centerY = "50%";
                    this.view.lblConsentApplicableForValue.top = "0%";
                    this.view.flxConsentApplicable.skin = "sknFlxffffffop100BRadius10pxBorderTab";
                    this.view.lblConsentApplicableForValue.height = "100%";
                    eligibilityFlag = "BOTH";
                } else {
                    this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.OutwardwardConsent");
                    this.view.imgConsentArrow.isVisible = false;
                    this.view.lblConsentApplicableForValue.left = "0%";
                    this.view.lblConsentApplicableForValue.top = "10%";
                    this.view.lblConsentApplicableForValue.centerY = null;
                    this.view.flxConsentApplicable.skin = "sknFlxBgWhiteBr6A6A6A";
                    this.view.lblConsentApplicableForValue.height = "preferred";
                    eligibilityFlag = "OUTWARD";
                }
            } else if (flagInward == 1) {
                this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardConsent");
                this.view.imgConsentArrow.isVisible = false;
                this.view.lblConsentApplicableForValue.left = "0%";
                this.view.lblConsentApplicableForValue.top = "10%";
                this.view.lblConsentApplicableForValue.centerY = null;
                this.view.flxConsentApplicable.skin = "sknFlxBgWhiteBr6A6A6A";
                this.view.lblConsentApplicableForValue.height = "preferred";
                eligibilityFlag = "INWARD";
            }
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("crossBorderDropDownEligibility", eligibilityFlag);
        },
        OnchangeConsentApplicationSelection : function () {
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("crossBorderInwardOtwardDetails");
            if (!kony.sdk.isNullOrUndefined(data)) {
                var inward = data.internationalInwardConsent;
                var outward = data.internationalOutwardConsent;
                if (inward === "YES") {
                    var internationalInwardConsentConsent = kony.i18n.getLocalizedString("i18n.HBL.APPROVED");
                } else if (inward === "NO") {
                    var internationalInwardConsentConsent = kony.i18n.getLocalizedString("i18n.HBL.DECLINED");;
                }else {
                    var internationalInwardConsentConsent = inward;
                }
                if (outward === "YES") {
                    var internationalOutwardConsentConsent = kony.i18n.getLocalizedString("i18n.HBL.APPROVED");
                }else if (outward === "NO") {
                    var internationalOutwardConsentConsent = kony.i18n.getLocalizedString("i18n.HBL.DECLINED");;
                }else {
                    var internationalOutwardConsentConsent = outward;
                }
                var inwardFlag = kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardConsent");
                var outwardFlag = kony.i18n.getLocalizedString("i18n.HBL.CBC.OutwardwardConsent");
                if (this.view.lblConsentApplicableForValue.text == inwardFlag) {
                    this.view.lblConsentStatusValue.text = internationalInwardConsentConsent;
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("consentStatus", internationalInwardConsentConsent);
                } else if (this.view.lblConsentApplicableForValue.text == outwardFlag) {
                    this.view.lblConsentStatusValue.text = internationalOutwardConsentConsent;
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("consentStatus", internationalOutwardConsentConsent);
                }
            }
        },
        flxConsentApplicableOnclick : function () {
            var navManager = applicationManager.getNavigationManager();
            var flag = navManager.getCustomInfo("crossBorderDropDownEligibility");
            var status = this.view.lblConsentApplicableForValue.text;
            if ((status !== null) && (status !== "") && (status !== undefined)) {
            if (flag === "BOTH") {
                var navManager = applicationManager.getNavigationManager();
                navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsentType" });
            } else if (flag === "INWARD") {
                //Onclick disabled
            } else if (flag === "OUTWARD") {
                //Onclick disabled
            } else {
                //Onclick disabled
            }
          }
        },
        preShow: function () {
            this.view.postShow = this.postShow;
            this.dataMapping();
            this.setTitleBarVisibility();
            this.OnchangeConsentApplicationSelection();
            this.enableOrDisableBtnContinue();
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var rightBarButtonItem = new kony.ui.BarButtonItem({
                    type: constants.BAR_BUTTON_TITLE,
                    style: constants.BAR_ITEM_STYLE_PLAIN,
                    enabled: true,
                    action: this.flxBackOnClick,
                    tintColor: "FFFFFF00",
                    metaData: {
                        title: kony.i18n.getLocalizedString("i18n.konybb.common.cancel")
                    }
                });
                this.view.setRightBarButtonItems({
                    items: [rightBarButtonItem],
                    animated: true
                });
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            if (kony.sdk.isNullOrUndefined(ManageActivitiesPresenter.crossBorderSelectedAccount)) {
                this.view.lblChooseAccountValue.text = kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.selectFromAccount");
            } else {
                this.view.lblChooseAccountValue.text = ManageActivitiesPresenter.crossBorderSelectedAccount;
                this.view.lblSelectedAccountNumber.text = ManageActivitiesPresenter.crossBorderAccId;
            }
            this.checkForToastMessage();
        },

        dataMapping : function () {
            this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
            this.view.lblChooseAccount.text = kony.i18n.getLocalizedString("i18n.ChequeBookReq.account");
            this.view.lblVpa.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.VPA");
            this.view.lblConsentApplicableFor.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.ConsentApplicableFor");
            //this.view.lblConsentApplicableForValue.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardCBTransaction");
            this.view.lblConsentStatus.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.ConsentStatus");
            this.view.lblChangeConsentStatus.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.ChangeConsentStatus");
            this.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.common.proceed");
        },

        disableButton: function (button) {
            button.setEnabled(false);
            button.skin = "sknBtnE2E9F0Rounded";
            button.focusSkin = "sknBtnE2E9F0Rounded";
        },
        enableButton: function (button) {
            button.setEnabled(true);
            button.skin = "sknBtn0095e4RoundedffffffSSP26px";
            button.focusSkin = "sknBtn0095e4RoundedffffffSSP26px";
        },
        setTitleBarVisibility: function () {
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsentPayment");
                this.view.flxFooter.top = "0%";
                this.view.customHeader.imgBack.src = "backbutton.png";
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.title = kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsentPayment");
                this.view.flxFooter.top = "3%";
            }
        },
        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
            this.view.btnContinue.onClick = this.btnContinue.bind(this);
            this.view.flxSelectConsentStatus.onClick = this.selectConsent;
            this.view.flxChooseAccount.onClick = this.flxChooseAccountOnclick;
            this.view.flxConsentApplicable.onClick = this.flxConsentApplicableOnclick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        flxBackOnClick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "HomepageMA", "friendlyName": "AccountsUIModule/frmHBLUnifiedDashboard" });
            kony.application.destroyForm({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderConsent"
            });
        },

        flxChooseAccountOnclick: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmCrossBorderSelectAccount"
            });
            applicationManager.getPresentationUtility().showLoadingScreen();
        },

        setAccountDetails: function () {
            var presenter = applicationManager.getModulesPresentationController({
                "moduleName": "QRPaymentsUIModule",
                "appName": "TransfersMA"
            });

            if ((presenter.getTransObject().fromProcessedName !== null) && (presenter.getTransObject().fromProcessedName !== "") && (presenter.getTransObject().fromProcessedName !== undefined)) {
                var formattedName = presenter.getTransObject().fromProcessedName;
            }
            var data = applicationManager.getDefaultDashboardObj();
            var acctId = data.Accounts[0].account_id;
            var name = data.Accounts[0].accountName;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("defaultAccId", acctId);
            var formattedAccountName = name + "...." + acctId.slice(-4);
            var previousForm = kony.application.getPreviousForm().id;
            
            var dashboardFlow = navManager.getCustomInfo("crossBorderFromDashboard");
            if ((dashboardFlow === true)) {
                this.view.lblChooseAccountValue.text = formattedAccountName;
                this.view.lblSelectedAccountNumber.text = acctId;
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("crossBorderFromDashboard", null);
            } else if ((presenter.getTransObject().fromAccountNumber !== null) && (presenter.getTransObject().fromAccountNumber !== "") && (presenter.getTransObject().fromAccountNumber !== undefined)) {
                if (previousForm === "frmCrossBorderSelectAccount" || previousForm === "frmChooseCrossBorderConsent") {
                    var accNo = presenter.getTransObject().fromAccountNumber;
                    var navManager = applicationManager.getNavigationManager();
                    navManager.setCustomInfo("selectedAccount", accNo);
                    this.view.lblChooseAccountValue.text = formattedName;
                    this.view.lblSelectedAccountNumber.text = accNo;
                }else{
                    this.view.lblChooseAccountValue.text = formattedAccountName; 
                    this.view.lblSelectedAccountNumber.text = acctId;
                }
                
            }else{
                this.view.lblChooseAccountValue.text = formattedAccountName; 
                this.view.lblSelectedAccountNumber.text = acctId;
            } 
           
            var crossBorderAccountName = this.view.lblChooseAccountValue.text;
            navManager.setCustomInfo("crossBorderAccountName", crossBorderAccountName);
            var crossBorderChoosenAccount =  this.view.lblSelectedAccountNumber.text;
            navManager.setCustomInfo("crossBorderChoosenAccount", crossBorderChoosenAccount);
        },

         grantUserConsent: function (status) {
            if ((status !== null) && (status !== "") && (status !== undefined)) {
                this.view.lblSelectStatus.text = status;
            }
        },

        callFetchService: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var configManager = applicationManager.getConfigurationManager();
            var param = {
                "accountNumber": "",
                "Status": "",
                "type": "fetch",
                "userName": kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.getConsentDetails(param);
        },

        selectConsent: function () {
            var navManager = applicationManager.getNavigationManager();
            var inward = kony.i18n.getLocalizedString("i18n.HBL.CBC.InwardConsent");
            var outward = kony.i18n.getLocalizedString("i18n.HBL.CBC.OutwardwardConsent");
            if (this.view.lblConsentApplicableForValue.text == inward || this.view.lblConsentApplicableForValue.text == outward) {
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmChooseCrossBorderConsent" });
            }
            else {
                /*
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
                */
            }
        },

        enableOrDisableBtnContinue: function () {
            try {
                var defaultConsentTypeText = kony.i18n.getLocalizedString("i18n.pleaseSelectConsentType");
                var defaultStatusText = kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect");
                var isVpaAvailable = this.view.lblVpaNo && this.view.lblVpaNo.text;
                var isConsentApplicableAvailable = this.view.lblConsentApplicableForValue && this.view.lblConsentApplicableForValue.text;
                var isConsentStatusAvailable = this.view.lblConsentStatusValue && this.view.lblConsentStatusValue.text;
                var isSelectStatusAvailable = this.view.lblSelectStatus && this.view.lblSelectStatus.text;
                var isConsentTypeValid = this.view.lblConsentApplicableForValue.text !== defaultConsentTypeText;
                var isStatusValid = this.view.lblSelectStatus.text !== defaultStatusText;
                var isEnableContinue = isVpaAvailable && isConsentApplicableAvailable && isConsentStatusAvailable &&
                    isSelectStatusAvailable && isConsentTypeValid && isStatusValid;
                if (isEnableContinue) {
                    this.enableButton(this.view.btnContinue);
                }else{
                    this.disableButton(this.view.btnContinue); 
                }
            } catch (error) {
                kony.print("Error in enableOrDisableBtnContinue: " + JSON.stringify(error));
            }
        },
        enableOrDisableBtnContinueDummy: function () {
            var status = this.view.lblSelectStatus.text;
            if (status === kony.i18n.getLocalizedString("i18n.HBL.PleaseSelect")) {
                this.disableButton(this.view.btnContinue);
            } else if (status === kony.i18n.getLocalizedString("i18n.HBL.grantaccess")) {
                this.enableButton(this.view.btnContinue);
            } else if (status === kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")) {
                this.enableButton(this.view.btnContinue);
            } else {
                this.disableButton(this.view.btnContinue);
            }
        },
         btnContinue: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var result = this.view.lblSelectStatus.text;
            var status = "";
            if (result === kony.i18n.getLocalizedString("i18n.HBL.grantaccess")) {
                status = "APPROVED";
            }
            if (result === kony.i18n.getLocalizedString("i18n.ProfileManagement.RevokeAccess")) {
                status = "DECLINED";
            }
            var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("crossBorderInwardOtwardDetails");
            var internationalOutWard = data.internationalOutwardConsent;
            var internationalInward = data.internationalInwardConsent;
            var DomenticOutWard = data.domesticInwardConsent;
            var DomenticInWard = data.domesticOutwardConsent;

            var type = this.view.lblConsentApplicableForValue.text;
            if (type == kony.i18n.getLocalizedString("i18n.HBL.CBC.OutwardwardConsent")) {
                direction = "OUTWARD";
                internationalOutWard = status;
                var navManager = applicationManager.getNavigationManager();
                if (internationalInward == "YES") {
                    internationalInward = "APPROVED"
                }
                else if (internationalInward == "NO") {
                    internationalInward = "DECLINED"
                }
            } else {
                direction = "INWARD";
                internationalInward = status;
                var navManager = applicationManager.getNavigationManager();
                if (internationalOutWard == "YES") {
                    internationalOutWard = "APPROVED"
                }
                else if (internationalOutWard == "NO") {
                    internationalOutWard = "DECLINED"
                }
            }
            var configManager = applicationManager.getConfigurationManager();
            var userObj = applicationManager.getUserPreferencesManager().getUserObj();
            if (!kony.sdk.isNullOrUndefined(userObj)) {
                var country = userObj.country;
            }
            //var accId = this.view.lblChooseAccountValue.text;
            var vpaId = this.view.lblVpaNo.text;
            var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
            var fullName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.FullName;
            var IdType = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.IDType_id;
            var IDValue = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.IDValue;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            var accId  = ManageActivitiesPresenter.crossBorderAccId;
            var param = {
                "accountID": accId, 
                "internationalInwardConsent": internationalInward,
                "internationalOutwardConsent": internationalOutWard, 
                "domesticOutwardConsent": DomenticOutWard, 
                "domesticInwardConsent": DomenticInWard, 
                "vpaId": vpaId, 
                "consent": status,
                "userName": userName,  
                "fullname": fullName, 
                "IDType": IdType, 
                "IDValue": IDValue, 
                "nationalityId": country, 
                "direction": direction
            }
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            if (this.view.lblConsentStatusValue.text == "PENDING") {
                ManageActivitiesPresenter.createConsentDetails(param);
            } else {
                ManageActivitiesPresenter.getCrossConsentDetails(param);
            }
        },

        checkForToastMessageVPAError: function () {
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.CBC.CrossBorderConsentVPAError"));
        },
        checkForToastMessage: function () {
            var navManager = applicationManager.getNavigationManager();
            var flag = navManager.getCustomInfo("createConsentError");
            if (!kony.sdk.isNullOrUndefined(flag)) {
                if (flag === "true") {
                applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
                navManager.setCustomInfo('createConsentError', null);
                this.enableOrDisableBtnContinue();
                }
            }
        },

    };
});
