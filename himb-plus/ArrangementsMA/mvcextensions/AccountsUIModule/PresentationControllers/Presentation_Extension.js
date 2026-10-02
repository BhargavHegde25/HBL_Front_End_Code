define(["CommonUtilities", "OLBConstants"], function (CommonUtilities, OLBConstants) {
  return {
    accountActivity: function (params) {
      applicationManager.getAccountManager().accountActivity(params, this.accountActivitySC.bind(this), this.accountActivityEC.bind(this));
    },
    accountActivitySC: function (response) {
      applicationManager.getNavigationManager().updateForm({
        graphdetails: response
      }, "frmAccountsDetails")
    },
    accountActivityEC: function (error) {
      var err = error;
    },
    downloadestatement: function (param) {
      var requestParam = {};
      requestParam.title = param.title;
      requestParam.fileType = param.fileType;
      this.transactionDetails = requestParam;
      applicationManager.getAccountManager().generateTransactionDetails(param, this.downloadestatementSuccess.bind(this), this.downloadestatementFailure.bind(this));
    },
    downloadestatementSuccess: function (successResponse) {
      successResponse.fileType = "pdf";
      kony.application.dismissLoadingScreen();
      applicationManager.getNavigationManager().updateForm({
        transactionDownloadFile: applicationManager.getAccountManager().getDownloadTransctionURL(successResponse)
      }, "frmViewStatements");
    },
    downloadestatementFailure: function (error) {
      kony.application.dismissLoadingScreen();
      applicationManager.getNavigationManager().updateForm({
        showOnServerError: true,
        showLoadingIndicator: {
          status: false
        }
      }, "frmViewStatements");
    },
    PaperStatementRequest: function (param) {
      applicationManager.getAccountManager().SendPaperStatementRequest(param, this.PaperStatementRequestSuccess.bind(this), this.PaperStatementRequestFailure.bind(this));
    },
    PaperStatementRequestSuccess: function (successResponse) {
      applicationManager.getNavigationManager().updateForm({
        PaperStatementResponse: successResponse
      }, "frmViewStatements");
    },
    PaperStatementRequestFailure: function (error) {
      kony.application.dismissLoadingScreen();
      applicationManager.getNavigationManager().updateForm({
        showOnServerError: true,
        showLoadingIndicator: {
          status: false
        }
      }, "frmViewStatements");
    },
  };
});