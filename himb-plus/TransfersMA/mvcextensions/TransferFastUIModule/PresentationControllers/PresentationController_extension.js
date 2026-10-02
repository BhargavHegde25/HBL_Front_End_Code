define(['CommonUtilities', 'OLBConstants', 'ViewConstants'], function(CommonUtilities, OLBConstants, ViewConstants){
  frmPastPayments = "frmPastPaymentsEurNew";
  
return {
   
getPastPayments : function(sortingData) {
//       applicationManager.getNavigationManager().navigateTo(frmPastPayments);
      this.showView(frmPastPayments);
      
    },
showTransferScreen : function(context) {
    var initialContext = context || {};
    var isTransferCashWealth = (initialContext.isTransferCashWealth) ? "true" : "false";
    if (initialContext.initialView === undefined) {
      initialContext.initialView = "makeTransfer";
    }
    if (initialContext.initialView === "externalAccounts") {
      this.showProgressBar();
      //this.showExternalAccounts();
      return;
    }
	if (initialContext.initialView === "ScheduledPayments") {
      this.getScheduledPayments();
      return;
    }
    if (initialContext.initialView === "PastPayments") {
      this.getPastPayments();
      return;
    }
     if (initialContext.initialView === "DirectDebits") {
      this.getDirectDebits();
      return;
    }
	if (initialContext.initialView === "Editpayment") {
      this.resetAndShowProgressBar();
      this.showMakeTransferForEditTransaction(initialContext.editTransaction, context.onCancelCreateTransfer);
      return;
    }
     if (initialContext.initialView === "Repeatpayment") {
      this.resetAndShowProgressBar();
      this.repeatTransfer(initialContext.repeatTransaction, context.onCancelCreateTransfer);
      return;
    }
    if (initialContext.initialView === "addDBXAccount") {
      // var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      //       applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
      //           "initialView": true,
      //           "flowType": "ADD",
      //           "beneficiaryType": "Same Bank",
      //           "displayName": "OTHER_INTERNAL_MEMBER",
      //           "isSameBankAccount": "true",
      //           "isInternationalAccount": "false",
      //           "isVerified": "true",
      //           "bankName": "Infinity",
      //           "isCombinedUser": combineduser
      //       });
      // this.showView(frmFastAddDBXAccount);
      // return;
       var params = {
                    "transferType": "Same Bank",
                     "payeeType": "New Payee"
                 };
      applicationManager.getNavigationManager().setCustomInfo("SameBankAddPayee",params);
      this.showView("frmSameBankAddBeneficiary");
    //   var form = "frmSameBankAddBeneficiary";
    //   var params = {
    //                 "transferType": "Same Bank",
    //                 "payeeType": "New Payee"
    //             };
    //             kony.mvc.getNavigationManager().navigate({
    //                 context: this,
    //                 params: params,
    //                 callbackModelConfig: {
    //                     "frm": form,
    //                     "appName": "TransfersMA"
    //                 }

    // });
     return;
  }
    if (initialContext.initialView === "addExternalAccount") {
      // var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      //       applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
      //           "initialView": true,
      //           "flowType": "ADD",
      //           "beneficiaryType": "External",
      //           "displayName": "OTHER_EXTERNAL_ACCOUNT",
      //           "isSameBankAccount": "false",
      //           "isInternationalAccount": "false",
      //           "isVerified": "true",
      //           "bankName": "Infinity",
      //           "isCombinedUser": combineduser
      //       });
      // this.showView(frmFastAddExternalAccount);
      // //this.showDomesticAccounts();
      // return;
      var params = {
                    "transferType": "Domestic Transfer",
                     "payeeType": "New Payee"
                 };
      applicationManager.getNavigationManager().setCustomInfo("DomesticAddPayee",params);
      this.showView("frmDomesticAddBeneficiary");
      //var form = "frmDomesticAddBeneficiary";
    //   var params = {
    //                 "transferType": "Domestic Transfer",
    //                 "payeeType": "New Payee"
    //             };
    //             kony.mvc.getNavigationManager().navigate({
    //                 context: this,
    //                 params: params,
    //                 callbackModelConfig: {
    //                     "frm": form,
    //                     "appName": "TransfersMA"
    //                 }

    // });
     return;
    }
    if (initialContext.initialView === "addInternationalAccount") {
      var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
                "initialView": true,
                "flowType": "ADD",
                "beneficiaryType": "International",
                "displayName": "INTERNATIONAL_ACCOUNT",
                "isSameBankAccount": "false",
                "isInternationalAccount": "true",
                "isVerified": "true",
                "bankName": "Infinity",
                "isCombinedUser": combineduser
            });
      this.showView("frmFastAddInternationalAccount");
      //this.showDomesticAccounts();

      return;

    }
    if (initialContext.initialView === "addRecipient") {
      var payApersonEligibility = applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser();
      if (payApersonEligibility === 'Activated') {
        var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
                applicationManager.getNavigationManager().setCustomInfo('componentP2P', {
                    "initialView": true,
                    "flowType": "ADD",
                    "beneficiaryType": "P2P",
                    "isCombinedUser": combineduser
                });
        this.showView("frmFastAddRecipient");
        return;
      } else {
        initialContext.activateRecipient = true;
      }
    }
    if (initialContext.transactionObject) {
      this.resetAndShowProgressBar();
      this.repeatTransfer(initialContext.transactionObject, initialContext.onCancelCreateTransfer);
      return;
    }
    if (initialContext.editTransactionObject) {
      this.resetAndShowProgressBar();
      this.showMakeTransferForEditTransaction(context.editTransactionObject, context.onCancelCreateTransfer);
      return;
    }
    if (initialContext.accountTo) {
      this.resetAndShowProgressBar();
            if (initialContext.Id != null || initialContext.Id != undefined) {
                this.loadAccounts(initialContext.displayName, {
                    accountTo: initialContext.accountTo,
                    Id: initialContext.Id
                }, null);
            } else {
				this.loadAccounts(initialContext.displayName, initialContext.accountTo, null);
			}
      return;
    }
      if (initialContext.accountFrom) {
        this.resetAndShowProgressBar();
        this.loadAccounts(initialContext.displayName, null, initialContext.accountFrom);
        return;
      }
    if (initialContext.showManageRecipients) {
      this.showView("frmFastManagePayee");
      //applicationManager.getNavigationManager().navigateTo(frmFastManagePayee);
     // this.showView(frmFastManagePayee);
      return;
    }
        if (initialContext.showRecipientGateway) {
      this.showView("frmFastRecipientGateWay");
      return;
    }
        if (initialContext.activateRecipient) {
      this.showView("frmFastActiveRecipient");
      return;
    }
    if (initialContext.deactivateRecipient) {
            this.showView("frmFastDeActiveRecipient", {
                "initialView": kony.application.getCurrentForm().id
            });
      return;
    }
    this.presentTransfers({
      /*gateway: {
          overrideFromAccount: initialContext.accountObject ? initialContext.accountObject.accountID : null
      }*/
      gateway: {
        overrideFromAccount: initialContext.initialView
      }
    })
},
};
});