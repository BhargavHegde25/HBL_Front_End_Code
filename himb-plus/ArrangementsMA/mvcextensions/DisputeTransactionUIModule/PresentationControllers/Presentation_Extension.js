define(["CommonUtilities", "OLBConstants"], function (CommonUtilities, OLBConstants) {
  return {
    createDisputeTransaction : function(params, input) {
      var self = this;
      this.showProgressBar();
      kony.application.showLoadingScreen();
      var dataParams = {
          "transactionId": params.transactionId,
          "disputeReason": (input.reason),
          "disputeDescription": (input.description),
          "transactionType": params.transactionType,
          'transactionsNotes': params.transactionsNotes !== null ? params.transactionsNotes : "",
          'amount': params.amount,
          'description': params.description,
          'fromAccountName': params.fromAccountName,
          'fromAccountNumber': params.fromAccountNumber,
          'fromAccountType': params.fromAccountType,
          'toAccountType': params.toAccountType !== null ? params.toAccountType : "",
          'toAccountName': params.toAccountName || params.toAccount || params.payeeName || params.payeeNickName || "",
          'toAccountNumber': params.toAccountNumber || params.ExternalAccountNumber || params.payeeId || "",
          'transactionDate': input.date,
          'secureMessageId': '',
          'merchantCity': '',
          'merchantAddressName': ''
      };
      applicationManager.getTransactionsListManager().createDisputedTransaction(dataParams, self.createDisputedTransactionSuccessCallBack.bind(self, input),
          self.createDisputedTransactionFailureCallBack.bind(self));
  },
  createDisputedTransactionSuccessCallBack : function(input, response) {
    var self = this;
    this.hideProgressBar(); 
    kony.application.dismissLoadingScreen();
    self.presentStopPayments({
        "disputeTransactionResponse": {
            response: response,
            referenceId:response.referenceId,
            data: input
        }
    }, "frmDisputeTransactionAcknowledgement");

  },
  createDisputedTransactionFailureCallBack: function(response) {
    var self = this;
        self.showServerError(response, "frmConfirmDisputeTransaction");
    },
    getdisputeTransactionReasonsListViewModel : function() {
        var scopeObj = this;
        var config = applicationManager.getConfigurationManager();
        var disputeTransactionRequestReasons = config.DisputeReason;
        return disputeTransactionRequestReasons.map(function(reason) {
            return {
                id: reason,
                name: reason
            };
        });
      }
  };
});