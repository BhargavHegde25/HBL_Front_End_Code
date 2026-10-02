define([], function () {
    
    return {

        downloadEStatement: function (param) {
            applicationManager.getAccountManager().generateTransactionDetails(param, this.downloadEStatementSuccess.bind(this), this.downloadEStatementFailure.bind(this));
        },

        downloadEStatementSuccess: function (successResponse) {
            if ((successResponse.fileId !== null) && (successResponse.fileId !== "") && (successResponse.fileId !== undefined)) {
            successResponse.fileType = "pdf";
            var transactionDownloadFile = applicationManager.getAccountManager().getDownloadTransctionURL(successResponse);
            var formController = applicationManager.getPresentationUtility().getController('frmAccStatements', true);
            formController.downloadStatementFile(transactionDownloadFile);
            } else {
                var formController = applicationManager.getPresentationUtility().getController('frmAccStatements', true);
                formController.checkForToastMessageError();
            }
        },
        
        downloadEStatementFailure: function (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            } else {
                var formController = applicationManager.getPresentationUtility().getController('frmAccStatements', true);
                formController.checkForToastMessageError();
            } 
        },
        paperStatementRequest: function (param) {
            applicationManager.getAccountManager().SendPaperStatementRequest(param, this.paperStatementRequestSuccess.bind(this), this.paperStatementRequestFailure.bind(this));
          },
        paperStatementRequestSuccess: function (successResponse) {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("paperStatementStatus", successResponse);
            var formController = applicationManager.getPresentationUtility().getController('frmAccStatements', true);
            formController.checkForToastMessageSuccess();
          },
        paperStatementRequestFailure: function (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (err["isServerUnreachable"]) {
                applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
            } else {
                var formController = applicationManager.getPresentationUtility().getController('frmAccStatements', true);
                formController.checkForToastMessageError();
            }
        }
    };
});