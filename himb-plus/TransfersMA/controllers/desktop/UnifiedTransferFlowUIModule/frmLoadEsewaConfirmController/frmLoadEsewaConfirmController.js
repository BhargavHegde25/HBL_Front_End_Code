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
            // ===== eSewa v2 (load API) - DISABLED 2026-09-09 =====
            // v2 initiator_details: frmAccName = initiator full name, field1 = initiator mobile.
            // v1 keeps the legacy meaning: frmAccName = from-account holder, field1 = receiver name.
            // var userObj = applicationManager.getUserPreferencesManager().getUserObj() || {};
            // var initiatorFullName = ((userObj.userfirstname || "") + " " + (userObj.userlastname || "")).trim();
            // param = {
            //     "frmAccNumber": input.response.fromAccount,
            //     "frmAccName": initiatorFullName || input.response.fromAccountHolderName,
            //     "paymentDesc": input.response.purpose,
            //     "field1": userObj.phone || "",
            //     "field2": "",
            //     "eSewaId": input.response.receiverID,
            //     "amount": String(input.response.amount || "").trim(),
            //     "Fee": String(input.response.charges || "").trim()
            // }
            // return param;
            // ===== end eSewa v2 =====
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
                // ===== eSewa v2 variant of the T24 beneficiary block - DISABLED 2026-09-09 =====
                // "beneficiaryAddressLine1": input.response.receiverID,
                // "beneficiaryAddressLine2": input.response.receiverID,
                // "beneficiaryCity": "eSewa wallet topup",
                // "beneficiarycountry": input.response.purpose,
                // "beneficiaryPhone": input.response.receiverName,
                // ===== end eSewa v2 =====
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
            // ===== eSewa v2 booking expiry gate - DISABLED 2026-09-09 =====
            // v1 has no booking step, so there is no expiryTime / bookingId to honour.
            // var expiryRaw = navManager.getCustomInfo("eSewaExpiryTime");
            // if (expiryRaw) {
            //     var expiry = new Date(expiryRaw);
            //     if (expiry && expiry < new Date()) {
            //         kony.application.dismissLoadingScreen();
            //         applicationManager.getNavigationManager().navigateTo({
            //             "appName": "TransfersMA",
            //             "friendlyName": "frmLoadEsewa"
            //         });
            //         return;
            //     }
            // }
            // ===== end eSewa v2 =====
            payload.paymentReferenceId = input.backendReferenceId;
            payload.referenceId = input.referenceId;
            payload.transactionId = input.transactionId;
            // ===== eSewa v2 load fields - DISABLED 2026-09-09 (v1 load takes neither) =====
            // payload.bookingId = navManager.getCustomInfo("eSewaBookingId");
            // payload.originatingUniqueId = navManager.getCustomInfo("eSewaOriginatingUniqueId");
            // ===== end eSewa v2 =====
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