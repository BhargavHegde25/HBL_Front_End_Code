define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    init: function() {
        var scope = this;
        scope.view.imgPrint.onTouchStart = scope.onClickPrint.bind(this);
        scope.view.preShow = scope.preShow;
    },
    preShow: function() {

        this.view.button2.onClick = function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "AuthenticationMA",
                "moduleName": "AuthUIModule"
            });
            kony.application.showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var x = navManager.getCustomInfo('AuthParam');
            authModule.presentationController.postLoginCall(x);
        }
        this.view.button1.onClick = function() {
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
            });
        }
        this.ackScreen();
    },
    updateFormUI: function(context) {
        if (context.successresponse) {
            this.ackScreen(context.successresponse);
        }
    },
    ackScreen: function(data) {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        data = navManager.getCustomInfo("FDResponse");
        if (data != null && data != undefined) {
            scope.view.lblReferenceNumberValue.text = (data.referenceId != undefined) ? data.referenceId : data.arrangementId;
            scope.view.lblReferenceNumber.text = "Reference ID :";
            scope.view.lblSection2Message.setVisibility(false);
            // scope.view.CopylblReferenceNumberValue0caefba5c6fd441.text = data.currencyCode + " " + data.availableBalance;
            scope.view.CopylblReferenceNumberValue0caefba5c6fd441.text = applicationManager.getFormatUtilManager().convertAmountValue(data.availableBalance, data.currencyCode)
            if (data.status == "success" && data.transactionStatus == "Unapproved") {
                scope.view.lblSection1Message.text = kony.i18n.getLocalizedString("i18n.HBL.FDSuccess2");
            } else {
                scope.view.lblSection1Message.text = kony.i18n.getLocalizedString("i18n.HBL.FDSuccess1");
            }
            var amt = applicationManager.getNavigationManager().getCustomInfo("Req_amount");
            var interest = applicationManager.getNavigationManager().getCustomInfo("Req_interestRate");
            var acc = applicationManager.getNavigationManager().getCustomInfo("Req_accountname_id");
            var branch = applicationManager.getNavigationManager().getCustomInfo("Req_Branch");
            var depositeType = applicationManager.getNavigationManager().getCustomInfo("Req_Depositetype");
            var tenure = applicationManager.getNavigationManager().getCustomInfo("Req_Tenure");
            scope.view.lblField1Value.text = acc;
            scope.view.lblField2Value.text = branch;
            scope.view.lblField3Value.text = depositeType;
            scope.view.lblField4Value.text = amt;
            scope.view.lblField5Value.text = tenure;
            scope.view.lblField6Value.text = interest;
        }
    },
    onClickPrint: function() {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var accountname_id = navManager.getCustomInfo("Req_accountname_id");
        var seg = [];
        seg[0] = {
            "Account": accountname_id,
            "Branch": scope.view.lblField2Value.text,
            "DepositType": scope.view.lblField3Value.text,
            "Amount": scope.view.lblField4Value.text,
            "ApplicableInterestRate": scope.view.lblField5Value.text
        }
        var t = {
            module: "Request Fixed Deposit - Acknowledgement",
            details: seg,
            printCallback: function() {
                applicationManager.getNavigationManager().navigateTo({
                    appName: "TransfersMA",
                    friendlyName: "frmRequestFDAcknowledgement"
                })
            }
        };
        var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
            "appName": "TransfersMA",
            "moduleName": "ManageActivitiesUIModule"
        });
        ManageActivitiesPresenter.showPrintPages({
            FDSuccess: t
        })
    }
  };
});