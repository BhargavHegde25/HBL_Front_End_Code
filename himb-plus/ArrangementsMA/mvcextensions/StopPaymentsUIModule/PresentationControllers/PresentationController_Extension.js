define(["CommonUtilities", "OLBConstants"], function (CommonUtilities, OLBConstants) {
    return {
        showDisputeTransactionRequests : function(dataInputs) {
            var scopeObj = this;
            dataInputs = dataInputs || {};
            scopeObj.paginationManager.resetValues();
            scopeObj.paginationManager.getValues(scopeObj.disputedTransactionRequestsConfig, dataInputs);
            var transMan = applicationManager.getTransactionsListManager();
            var transObj = transMan.getTransactionObject();
            var accountsList = this.getAccounts();
            var AccountId=this.CheckDefaultAccount();
            if(accountsList && accountsList.length>0){
            var criteria = {
                "offset": 0,
                "limit": "",
                "sortBy": "transactionDate",
                "order": "desc",
                "paginationRowLimit": 10,
                "transactionType": "StopCheckPaymentRequest",
                "accountID": AccountId
            };
            transMan.getStopCheckPaymentRequestTransactions(criteria, scope_StopChequeRequestsPresentationController.getStopChequeRequestSuccess, scope_StopChequeRequestsPresentationController.getTransactionsError);
            } else{
                applicationManager.getNavigationManager().updateForm({
                    emptyAccounts:accountsList
                },"frmStopPayments");
            }
        },
        CheckDefaultAccount : function() {
            var DefaultChequeAcc = applicationManager.getUserPreferencesManager().getDefaultAccountforChequeManagement();
            if (DefaultChequeAcc == "" || DefaultChequeAcc == undefined || DefaultChequeAcc == null) {
                var navManager = applicationManager.getNavigationManager();
                var defaultPrimaryAccount = navManager.getCustomInfo("defaultAcc").Accounts[0];
                return defaultPrimaryAccount.accountID;
            } else return DefaultChequeAcc;
        },

        getStopChequeRequestSuccess : function(response) {
            var formattedResponse = [];
            for (var i = 0; i < response.length; i++) {
                var data = {};
                data.lblReferenceNo = "-";
                data.lblTransactionTypeValue = "-";
                data.lblDate = "-";
                data.lblChequeDate = {
                    "isVisible": false
                };
                data.lblFromAccountData = {
                    "isVisible": false
                };
                data.lblExpiresOnKey0 = {
                    "isVisible": false
                };
                data.lblExpiresOnData0 = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionKey = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionValue = {
                    "isVisible": false
                };
                data.lblChequeManagementNotes = {
                    "isVisible": false
                };
                data.lblTransactionTypeValue = {
                    "isVisible": false
                };
                data.lblChequeManagementFee = {
                    "isVisible": false
                };
                data.lblReasonKey = {
                    "isVisible": false
                };
                data.lblDescription = "-";
                data.lblToAccountData = "-";
                data.lblDateOfDescriptionValue = "-";
                data.lblStatus = "Completed";
                if (response[i].statusDescription) {
                    data.lblStatus = response[i].statusDescription;
                }
                if (response[i].checkReason) {
                    data.lblReferenceNo = response[i].checkReason;
                }
                if (response[i].checkDateOfIssue) {
                    data.lblToAccountData = response[i].checkDateOfIssue;
                    if (response[i].checkDateOfIssue.indexOf("-") > -1) {
                        var yyyy = response[i].checkDateOfIssue.substring(0, 4);
                        var mon = response[i].checkDateOfIssue.substring(5, 7);
                        var dd = response[i].checkDateOfIssue.substring(8, 10);
                        data.lblToAccountData = mon + "/" + dd + "/" + yyyy;
                    }
                }
                if (response[i].transactionsNotes) {
                    data.lblTransactionTypeValue = response[i].transactionsNotes;
                }
                if (response[i].transactionDate) {
                    data.lblDate = response[i].transactionDate;
                    if (response[i].transactionDate.indexOf("-") > -1) {
                        var yyyy = response[i].transactionDate.substring(0, 4);
                        var mon = response[i].transactionDate.substring(5, 7);
                        var dd = response[i].transactionDate.substring(8, 10);
                        data.lblDate = mon + "/" + dd + "/" + yyyy;
                    }
                }
                // data.lblAccount=response[i].transactionId;
                if (response[i].checkNumber1) {
                    data.lblDescription = response[i].checkNumber1;
                    data.lblDateOfDescriptionValue="1";
                }
                if (response[i].checkNumber2) {
                    data.lblDescription = data.lblDescription + "-" + response[i].checkNumber2;
                    var checks = response[i].checkNumber2 - response[i].checkNumber1 + 1;
                    data.lblDateOfDescriptionValue = checks.toString();
                }
                data.lblSeparator12 = "-";
                data.lblPayeeName = kony.i18n.getLocalizedString("i18n.ChequeManagement.ChequeManagement");
                data.imgDropDown = {
                    "src": "arrow_down.png",
                    "isVisible": true
                };
                data.lblAmount = "-";
                if (response[i].transactionId) {
                    data.lblAmount = response[i].transactionId;
                }
                //data.lblCurrency=kony.i18n.getLocalizedString("i18n.common.currencySymbol");
                data.lblReason = kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason:");
                data.lblDateVertical = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
                data.lblExpiresOnKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.PayeeNames");
                data.lblExpiresOnKey0 = kony.i18n.getLocalizedString("i18n.StopCheckPayments.Amount");
                data.lblChequeManagementFee = kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee");
                data.lblChequeManagementNotes = kony.i18n.getLocalizedString("i18n.ChequeManagement.Notes");
                data.lblDateOfDescriptionKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.Cheques");
                data.lblExpiresOnData = "-";
                data.lblExpiresOnData0 = "-";
                data.lblReasonKey = "-";
                if (response[i].payeeName) {
                    data.lblExpiresOnData = response[i].payeeName;
                }
                if (response[i].amount) {
                    data.lblExpiresOnData0 = scope_ChequePresentationController.currencySymbol + " " + CommonUtilities.formatCurrencyWithCommas(response[i].amount, true);
                }
                if (response[i].fees) {
                    data.lblReasonKey = scope_ChequePresentationController.currencySymbol + " " + CommonUtilities.formatCurrencyWithCommas(response[i].fees, true);
                }
    
                //   if(response[i].notes.length>0)
                //  data.notes=response[i].notes[0].note;
                formattedResponse.push(data);
            }
            // }
            var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
            controller.bindTransactions(formattedResponse);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
    showMyRequests : function(dataInputs) {
        var scopeObj = this;
        var configManager = applicationManager.getConfigurationManager();
        dataInputs = dataInputs || {};
        var selectTab = dataInputs.selectTab || OLBConstants.DISPUTED_TRANSACTIONS;
        var accountID = dataInputs.accountID || "";
        scopeObj.presentStopPayments({
            "myRequests": {
                selectTab: selectTab,
                accountID: accountID,
                addNewStopCheckRequestAction: {
                    displayName: kony.i18n.getLocalizedString("i18n.ChequeManagement.NewStopChequeRequest"),
                    action: function() {
                        scopeObj.showStopChecksForm({
                            onCancel: function() {
                                scopeObj.presentStopPayments({
                                    "myRequests": {
                                        selectTab: OLBConstants.DISPUTED_TRANSACTIONS
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });
        switch (selectTab) {
            case OLBConstants.DISPUTED_TRANSACTIONS:
                applicationManager.getPresentationUtility().showLoadingScreen();
                if (configManager.checkUserFeature("STOP_PAYMENT_REQUEST"))
                    scopeObj.showDisputeTransactionRequests({
                        resetSorting: true
                    });
                else {
                    scopeObj.showDisputeCheckRequests({
                        resetSorting: true
                    });
                    scopeObj.fetchMyCheques(dataInputs);
                }
                break;
            case OLBConstants.DISPUTED_CHECKS:
                applicationManager.getPresentationUtility().showLoadingScreen();
                if (configManager.checkUserFeature("CHEQUE_BOOK_REQUEST")){}
                    //scopeObj.showDisputeCheckRequests({
                      //  resetSorting: true
                    //});
                else {
                    scopeObj.showDisputeTransactionRequests({
                        resetSorting: true
                    });
                    scopeObj.fetchMyCheques(dataInputs);
                }
                break;

            case OLBConstants.MY_CHEQUES:
                applicationManager.getPresentationUtility().showLoadingScreen();
                if (configManager.checkUserFeature("VIEW_CHEQUES"))
                    scopeObj.fetchMyCheques(dataInputs);
                else {
                    scopeObj.showDisputeTransactionRequests({
                        resetSorting: true
                    });
                    scopeObj.showDisputeCheckRequests({
                        resetSorting: true
                    });
                }
                break;
        }
    },
    showStopPayments : function(dataInputs) {
        var scopeObj = this;
        scopeObj.activeForm = scopeObj.viewFormsList.frmStopPayments;
        scopeObj.navManager.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": scopeObj.viewFormsList.frmStopPayments
        });
        if (dataInputs && dataInputs.show) {
            switch (dataInputs.show) {
                case OLBConstants.ACTION.SHOW_STOPCHECKS_FORM:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showStopChecksForm(dataInputs);
                    break;
                case OLBConstants.ACTION.REQUEST_CHEQUE_BOOK:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showRequestChequeBookForm(dataInputs);
                    break;
                case OLBConstants.ACTION.REQUEST_CHEQUE_BOOK_FORM:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showRequestChequeBookForm(dataInputs);
                    break;
                case OLBConstants.ACTION.SHOW_DISPUTE_TRANSACTION_FORM:
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showDisputeTransaction(dataInputs.data);
                    break;
                case OLBConstants.DISPUTED_CHECKS:
                    dataInputs.selectTab = OLBConstants.DISPUTED_CHECKS
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                case OLBConstants.MY_CHEQUES:
                    dataInputs.selectTab = OLBConstants.MY_CHEQUES
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                case OLBConstants.ACTION.VIEW_MYCHEQUES_FORM:
                    dataInputs.selectTab = OLBConstants.MY_CHEQUES
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                case OLBConstants.DISPUTED_TRANSACTIONS:
                    dataInputs.selectTab = OLBConstants.DISPUTED_TRANSACTIONS
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
                    break;
                default: //Default form view
                    dataInputs.selectTab = OLBConstants.DISPUTED_TRANSACTIONS
                    dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
            }
        } else {
            dataInputs = dataInputs || {};
            dataInputs.selectTab = OLBConstants.DISPUTED_CHECKS
            dataInputs.bankDate = scopeObj.getBankDate(scopeObj.updateView.bind(this, scopeObj.activeForm));
                    scopeObj.showMyRequests(dataInputs);
        }
    },
    validateandfetchfee : function() {
        var transMan = applicationManager.getTransactionsListManager();
        var transObj = transMan.getTransactionObject();
        scope_ChequePresentationController.accountNumber = transObj.fromAccountNumber;
        var navMan = applicationManager.getNavigationManager();
        var deliveryTyp=navMan.getCustomInfo("deliveryType");
        var deliveryType=deliveryTyp.replaceAll(" ", "");
        var criteria = {
            "chequeIssueId": scope_ChequePresentationController.chequeId + "." + transObj.fromAccountNumber,
            "validate": "true",
            "note": "",
            "accountID": transObj.fromAccountNumber,
            "deliveryType" : deliveryType,
            "numberOfLeaves":scope_configManager.getNoOfChequeLeaves()
        };
        transMan.createChequeBookRequests(criteria, scope_ChequePresentationController.validateAndFetchFeeDetailsSuccess.bind(this,transObj.fromAccountNumber), scope_ChequePresentationController.validateAndFetchFeeDetailsError);
    },
    showDisputeCheckRequests :function(dataInputs) {
        var scopeObj = this;
        scopeObj.paginationManager.resetValues();
        dataInputs = dataInputs || {};
        scopeObj.paginationManager.getValues(scopeObj.stopChekRequestsConfig, dataInputs);
        //scopeObj.getStopCheckRequests(scopeObj.onStopCheckRequestsSuccess.bind(scopeObj), scopeObj.onServerError.bind(scopeObj));
    },
    getTransactionsSuccess : function(response) {
        var formattedResponse = [];
        response = response.ChequeBookRequests;
        if (Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
                var data = {};
                data.lblDescription = "Book";
                if (response[i].numberIssued) {
                    data.lblDescription = "Book" + " " + "(" + response[i].numberIssued + " " + "Leaves)";
                }
                data.lblDate = "-";
                data.lblStatus = "-";
                data.lblAmount = "-";
                data.lblReferenceNo = response[i].deliveryType=="MailingAddress" ? "Mailing Address" : "Self Pick Up";
                data.lblExpiresOnData0 = "-";
                data.lblFromAccountData = "-";
                data.lblPayeeName = {
                    "isVisible": false
                };
                data.lblCurrency = {
                    "isVisible": false
                };
                data.lblToAccountData = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionKey = {
                    "isVisible": false
                };
                data.lblDateOfDescriptionValue = {
                    "isVisible": false
                };
                data.lblChequeManagementNotes = {
                    "isVisible": false
                };
                data.lblChequeManagementFee = {
                    "isVisible": false
                };
                data.lblReasonKey = {
                    "isVisible": false
                };
                //data.lblFromAccountData="-";
                //data.lblTransactionTypeValue="-";
                /*if(Array.isArray(response[i].notes)){
			if(response[i].notes.length>0){
				data.lblExpiresOnData0=response[i].notes[0].note;
			}
		}*/
                //if(response[i].issueDate && "-"==response[i].issueDate)
                if(response[i].issueDate) {// changing for HIPP1-1046
                    response[i].issueDate=response[i].requestDate;
                //if (response[i].issueDate) {
                    data.lblDate = response[i].issueDate;
                    var yyyy = response[i].issueDate.substring(0, 4);
                    var mon = response[i].issueDate.substring(4, 6);
                    var dd = response[i].issueDate.substring(6, 8);
                    data.lblDate = mon + "/" + dd + "/" + yyyy;
                }
                if (response[i].chequeStatus) {
                    data.lblStatus = response[i].chequeStatus;
                    if (response[i].chequeStatus === "REQUEST RECIEVED") {
                        data.lblStatus = "Requested";
                    }
                    if (response[i].chequeStatus === "ISSUED") {
                        data.lblStatus = "Issued";
                    }
                }
                if (response[i].chequeIssueId) {
                    data.lblAmount = response[i].chequeIssueId;
                }
                /*if(response[i].note){
			data.lblTransactionTypeValue=response[i].note;
		}*/               
                data.lblExpiresOnKey = kony.i18n.getLocalizedString("i18n.ChequeManagement.Fee");
                data.lblExpiresOnKey0 = kony.i18n.getLocalizedString("i18n.ChequeManagement.Notes");
                data.lblChequeDate = kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address");
                data.lblReferenceDataVertical = kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:");
                data.lblReason = kony.i18n.getLocalizedString("i18n.ChequeManagement.Reason");
                data.lblSeparator12 = "-";
                data.lblRefNo = kony.i18n.getLocalizedString("i18n.ChequeManagement.ReferenceNumber:");
                data.lblExpiresOnData = "-";
				if (response[i].note) {
                    data.lblExpiresOnData0 = response[i].note;
                }
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "appName": "ArrangementsMA",
                    "moduleName": "StopPaymentsUIModule"
                }).presentationController.getUserAddress();
                var presentation = applicationManager.getModulesPresentationController({
                    "appName": "ArrangementsMA",
                    "moduleName": "StopPaymentsUIModule"
                });
				if(response[i].address){
                	//data.lblFromAccountData = response[i].address;  
                    if(response[i].deliveryType=="MailingAddress"){
                    data.lblFromAccountData = presentation.address;
                    }
                    else{
                        data.lblFromAccountData = "-";
                    }
                }    
                //data.lblReasonKey="-"; 
                if (response[i].fees) {
                    data.lblExpiresOnData = CommonUtilities.formatCurrencyWithCommas(response[i].fees, true);
                }
                /*if(response[i].fee){
			data.lblReasonKey=scope_ChequePresentationController.currencySymbol +" "+ response[i].fee;
		}*/
                data.imgDropDown = {
                    "src": "arrow_down.png",
                    "isVisible": true
                };
                // if(response[i].notes.length>0)
                //  data.lblExpiresOnData=response[i].notes[0].note;
                formattedResponse.push(data);
            }
        }
        var controller = applicationManager.getPresentationUtility().getController('frmStopPayments', true);
        controller.bindChequeBookRequests(formattedResponse);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
};
});