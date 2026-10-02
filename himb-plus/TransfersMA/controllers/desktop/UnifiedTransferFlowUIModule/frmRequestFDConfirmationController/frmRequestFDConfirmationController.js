define(['FormControllerUtility', 'CommonUtilities'], function (FormControllerUtility, CommonUtilities) {
  return {
    init: function() {
        this.view.preShow = this.preShow;
    },
    updateFormUI: function(viewPropertiesMap) {
        if (viewPropertiesMap.PinNotSet) {
            // this.showServerError(kony.i18n.getLocalizedString("i18n.TPSetup"));
            FormControllerUtility.hideProgressBar(this.view);
            applicationManager.getNavigationManager().navigateTo({
                "appName": "ManageProfileMA",
                "friendlyName": "SettingsNewUIModule/frmTransactionPin"
            });
        }
    },
    preShow: function() {
        var scope = this;
        scope.setConfirmationValue();
        kony.application.dismissLoadingScreen();
        scope.view.btnAction1.onClick = function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "AuthenticationMA",
                "moduleName": "AuthUIModule"
            });
            kony.application.showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            var x = navManager.getCustomInfo('AuthParam');
            authModule.presentationController.postLoginCall(x);
        }
        scope.view.btnAction2.onClick = function() {
            var a = "";
            applicationManager.getNavigationManager().navigateTo({
                "appName": "TransfersMA",
                "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFixedDeposit"
            });
            applicationManager.getNavigationManager().updateForm({
                "modify": true
            }, "frmRequestFixedDeposit");
        }
        scope.view.btnAction3.onClick = function() {
            // applicationManager.getNavigationManager().navigateTo({
            //     "appName": "TransfersMA",
            //     "friendlyName": "UnifiedTransferFlowUIModule/frmRequestFDAcknowledgement"
            // });
            var depositeType = applicationManager.getNavigationManager().getCustomInfo("Req_Depositetype")
            var accType = applicationManager.getNavigationManager().getCustomInfo("Req_accountType");
            var account = applicationManager.getNavigationManager().getCustomInfo("AccountIdconsent");
            var productId = applicationManager.getNavigationManager().getCustomInfo("Req_ProductID");
            var amt = applicationManager.getNavigationManager().getCustomInfo("Req_amount").replace(/,/g, "");
            var interest = applicationManager.getNavigationManager().getCustomInfo("Req_interestRate");
            var tenure = applicationManager.getNavigationManager().getCustomInfo("Req_Tenure");
            param = {
                "currency": "NPR",
                "productId": productId,
                "intrestRate": interest.replace(" %", ""),
                "fromAccount": account,
                "amount": amt.replace("NPR ", ""),
                "tenure": tenure.replace(" Months", "")
            }
            if (depositeType == "Himal Remit FD" && accType != "HIMAL.REMIT") {
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.createFixedDepositWithNonSTP(param);
            } else {
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                ManageActivitiesPresenter.createFixedDepositWithSTP(param);
            }
        }
    },
    setConfirmationValue:function(){
        var amt = applicationManager.getNavigationManager().getCustomInfo("Req_amount");
        var interest = applicationManager.getNavigationManager().getCustomInfo("Req_interestRate");
        var acc = applicationManager.getNavigationManager().getCustomInfo("Req_accountname_id");
        var branch = applicationManager.getNavigationManager().getCustomInfo("Req_Branch");
        var tenure = applicationManager.getNavigationManager().getCustomInfo("Req_Tenure");
        var depositeType = applicationManager.getNavigationManager().getCustomInfo("Req_Depositetype");
        this.view.lblValue1.text = acc;
        this.view.lblValue2.text = branch;
        this.view.lblValue3.text = amt;
        this.view.lblValue4.text = depositeType;
        this.view.lblValue5.text = tenure;
        this.view.lblValue6.text = interest;
    }
  };
});