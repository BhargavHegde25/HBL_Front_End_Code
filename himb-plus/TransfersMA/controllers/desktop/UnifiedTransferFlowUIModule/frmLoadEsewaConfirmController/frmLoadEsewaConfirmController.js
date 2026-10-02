define(['FormControllerUtility','OLBConstants', 'CommonUtilities'], function (FormControllerUtility, OLBConstants , CommonUtilities){ 
    return{
    updateFormUI: function(viewPropertiesMap) {
            if (viewPropertiesMap.PinNotSet) {
                // this.showServerError(kony.i18n.getLocalizedString("i18n.TPSetup"));
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "ManageProfileMA",
                    "friendlyName": "SettingsNewUIModule/frmTransactionPin"
                });
            }
            if (viewPropertiesMap.validationEsewaIdSuccess) {
                this.setConfirmValue(viewPropertiesMap.validationEsewaIdSuccess);
            }
            if (viewPropertiesMap.intraBankEsewaSuccess) {
                this.setLoadEsevaInput(viewPropertiesMap.intraBankEsewaSuccess);
            }
        },
        preShow: function() {
            kony.application.dismissLoadingScreen();
            var scope = this;
            var navManager = applicationManager.getNavigationManager();
            var res = navManager.getCustomInfo("eSewaValidSuccess");
            scope.setConfirmValue(res);
            scope.view.btnAction1.onClick = function() {
                var navMan = applicationManager.getNavigationManager();
                var configManager = applicationManager.getConfigurationManager();
                var data = applicationManager.getUserPreferencesManager().getUserObj();
                navMan.navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "frmUTFLanding"
                }, false, data);
            }
            scope.view.btnAction2.onClick = function() {
                param ={
                    "amount" : scope.view.lblValue4.text,
                    "eSewaId" : scope.view.lblValue3.text,
                    "purpose" : scope.view.lblValue7.text
                }
                applicationManager.getNavigationManager().navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmLoadEsewa"
                });
                applicationManager.getNavigationManager().updateForm({
                    "modify": param
                }, "frmLoadEsewa");
            }
            scope.view.btnAction3.onClick = function() {
                var param = scope.createIntraBankpayload(res);
                var input = scope.createLoadEsewaPayload(res);
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo("eSewa_LoadPayload", input)
                var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                    "appName": "TransfersMA",
                    "moduleName": "ManageActivitiesUIModule"
                });
                // ManageActivitiesPresenter.loadeSewaAmount(param, input);
                ManageActivitiesPresenter.eSewaIntraBankTransferService(param);
            }
        },
        createLoadEsewaPayload: function(input) {
            param = {
                "frmAccNumber": input.response.fromAccount,
                "frmAccName": input.response.fromAccountHolderName,
                "paymentDesc": input.response.purpose,
                "field1": input.response.receiverName,
                "field2": "",
                "eSewaId": input.response.receiverID,
                "amount": input.response.amount,
                "Fee": input.response.charges
            }
            return param;
        },
        createIntraBankpayload: function(input) {
            var date = input.response.date + "T00:00:00.000Z";
            var params = {
                "ExternalAccountNumber": OLBConstants.CLIENT_PROPERTIES.ESEWA_TOPUP_PAYABLE_ACCOUNT,
                "amount": input.data.totalAmount,
                "beneficiaryAddressLine1": "",
                "beneficiaryAddressLine2": "",
                "beneficiaryCity": "",
                "beneficiarycountry": "",
                "beneficiaryEmail": "",
                "beneficiaryName": input.response.fromAccountHolderName,
                "beneficiaryNickname": "",
                "beneficiaryPhone": "",
                "beneficiaryState": "",
                "beneficiaryZipcode": "",
                "createWithPaymentId": "true",
                "deletedDocuments": "",
                "frequencyEndDate": date,
                "frequencyStartDate": date,
                "frequencyType": "Once",
                "fromAccountCurrency": "NPR",
                "iban": "",
                "isScheduled": "0",
                "numberOfRecurrences": "",
                "paidBy": "",
                "paymentType": "",
                "scheduledDate": date,
                "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
                "swiftCode": "",
                "toAccountCurrency": "NPR",
                "toAccountNumber": OLBConstants.CLIENT_PROPERTIES.ESEWA_TOPUP_PAYABLE_ACCOUNT,
                "transactionCurrency": "NPR",
                "transactionId": input.data.referenceId,
                "transactionType": "ExternalTransfer",
                "transactionsNotes": "",
                "uploadedattachments": "",
                "userId": "",
                "createWithPaymentId": "true",
                "totalAmount": input.data.convertedAmount,
                "transactionAmount": input.data.convertedAmount,
                "fromAccountNumber": input.response.fromAccount
            }
            return params;
        },
        setLoadEsevaInput: function(input) {
            var navManager = applicationManager.getNavigationManager();
            var payload = navManager.getCustomInfo("eSewa_LoadPayload");
            var res = navManager.getCustomInfo("eSewaValidSuccess");
            payload.paymentReferenceId = input.backendReferenceId;
            payload.referenceId = input.referenceId;
            payload.transactionId = input.transactionId;
            var ManageActivitiesPresenter = applicationManager.getModulesPresentationController({
                "appName": "TransfersMA",
                "moduleName": "ManageActivitiesUIModule"
            });
            ManageActivitiesPresenter.loadeSewaAmount(payload,res.response);
        },
        setConfirmValue: function(data) {
            var input = data.response;
            this.view.lblValue1.text = input.fromAccMasked;
            this.view.lblValue2.text = input.receiverName;
            this.view.lblValue3.text = input.receiverID;
            this.view.lblValue4.text = "NPR" + input.amount;
            this.view.lblValue5.text = "NPR" + input.charges;
            this.view.lblValue6.text = input.dateFormat;
            this.view.lblValue7.text = input.purpose;
            this.view.lblValue8.text = input.totalAmount;
        }
}
 });