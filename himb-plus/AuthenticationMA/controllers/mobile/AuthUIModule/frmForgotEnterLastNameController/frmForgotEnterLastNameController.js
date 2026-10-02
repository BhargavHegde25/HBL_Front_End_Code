define({
    timerCounter: 0,
    init: function () {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    preShow: function () {
        this.view.txtNewPassword.setFocus(true);
        this.view.flxPopup.setVisibility(false);
        this.initActions();
        this.renderTitleBar();
        this.handleData();
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.login.CantSignIn.Letsverifyitsyou");
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.title = kony.i18n.getLocalizedString("i18n.login.CantSignIn.Letsverifyitsyou");
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.txtNewPassword.setFocus(true);
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    renderTitleBar: function () {
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        if (!isIphone) {
            this.view.flxHeader.isVisible = true;
            this.view.flxMainContainer.top = "56dp";
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top = "0dp";
        }
    },
    handleData: function () {
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        var navManager = applicationManager.getNavigationManager();
        var forgotObj = navManager.getCustomInfo("frmForgot");
        if (!forgotObj.userlastname) {
            this.view.txtNewPassword.text = "";
            this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
            this.view.btnUpdatePassword.setEnabled(false);
        }
    },
    initActions: function () {
        this.view.btnUpdatePassword.onClick = this.validateUserName;
        this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.customHeader.btnRight.onClick = this.onCancel;
        this.view.txtNewPassword.onTextChange = this.onLastNameTextChange;
        this.view.onDeviceBack = this.goBack;
    },
    onLastNameTextChange: function () {
        if (this.view.txtNewPassword.text === "") {
            this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
            this.view.btnUpdatePassword.setEnabled(false);
        } else {
            this.view.btnUpdatePassword.skin = "sknBtn055BAF26px";
            this.view.btnUpdatePassword.setEnabled(true);
        }
    },
    validateUserName: function () {
        var lastName = this.view.txtNewPassword.text;
        var navManager = applicationManager.getNavigationManager();
        var forgotData = navManager.getCustomInfo("frmForgot");
        forgotData.Name = lastName;
        navManager.setCustomInfo("frmForgot", forgotData)
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authModule.presentationController.navigateToPhone(lastName);
    },
    bindViewError: function (msg) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
    goBack: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmForgotEnterAccNum");
    },
    onCancel: function () {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmLogin");
    }
});