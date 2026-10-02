define({ 
    init: function() {
        var scope = this;
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
    },
    preShow: function() {
        var scope = this;
        scope.Mapackscreen();
    },
    postShow: function() {
        var scope = this;
        var width = kony.application.getCurrentBreakpoint();
        if (width === 640) {
            scope.view.customheadernew.flxHamburger.width = "90%";
        } else if (width === 1024 || width === 768) {
            scope.view.customheadernew.flxHamburger.width = "60%";
        } else {
            if (width === 1366) {
                scope.view.customheadernew.flxHamburger.width = "500dp";
            } else {
                scope.view.customheadernew.flxHamburger.width = "28%";
            }
        }
        if (kony.application.getCurrentBreakpoint() == 640) {
            this.view.customheadernew.height = "51dp";
        }
    },
    onClickPrint: function() {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var accountname_id = navManager.getCustomInfo("accountname_id");
        var status = navManager.getCustomInfo("ackScreenmappingstatus");
        var field4Value;
        if (status == "YES") {
            field4Value = kony.i18n.getLocalizedString("i18n.HBL.APPROVED");
        } else {
            field4Value = kony.i18n.getLocalizedString("i18n.HBL.DECLINED");
        }
        var seg = [];
        seg[0] = {
            "Account": accountname_id,
            "VPA": responseData.responseData.vpaId,
            "ConsentApplicableFor":responseData.responseData.consent,
            "ConsentStatus": field4Value
        }
        var t = {
            module: kony.i18n.getLocalizedString("i18n.HBL.CBCAck"),
            details: seg,
            printCallback: function() {
                applicationManager.getNavigationManager().navigateTo({
                    appName: "TransfersMA",
                    friendlyName: "frmCBCSuccess"
                })
            }
        };
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
        });
        ManageActivitiesPresenter.showPrintPage({
            CrossBorderSuccess: t
        })
    },
    updateFormUI: function(context) {
        if (context.successresponse) {
            this.Mapackscreen(context.successresponse);
        }
    },
    Mapackscreen: function(data) {
        var navManager = applicationManager.getNavigationManager();
        data = navManager.getCustomInfo("context");
        if (data != null && data != undefined) {
            var response = data;
            var responseData = JSON.parse(response);
            var navManager = applicationManager.getNavigationManager();
            var Account_balance = navManager.getCustomInfo("cbcAccBalance");
            var accountname_id = navManager.getCustomInfo("cbcAccSelection");
            this.view.lblAvailableBalanceValue.text = Account_balance;
            this.view.lblField1Value.text = accountname_id;
            this.view.lblField2Value.text = responseData.responseData.vpaId;
            this.view.lblField3Value.text =navManager.getCustomInfo("cbc_consent");
            this.view.lblField4Value.text = responseData.responseData.consent;
            this.view.lblReferenceNumberValue.text = responseData.responseData.uniqueTransactingId;
            this.view.imgPrint.onTouchStart = scope.onClickPrint;
        }
        kony.application.dismissLoadingScreen();
    },
 });