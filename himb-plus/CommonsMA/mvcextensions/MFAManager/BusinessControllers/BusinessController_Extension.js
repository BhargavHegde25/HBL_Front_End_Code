define(['CommonUtilities','OLBConstants','SCAConfiguration'], function (CommonUtilities,OLBConstants,SCAConfiguration) {
    return{
        verifyOTPSuccess : function (response) {
            var navManager = applicationManager.getNavigationManager();
            var PinFlow=navManager.getCustomInfo("PinFlow");
            if(PinFlow!="PinFlow"){
            if (response.MFAAttributes) {
              if (response.MFAAttributes.securityKey) {
                this.MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                this.MFAResponse.MFAAttributes.securityKey = response.MFAAttributes.securityKey;
                this.MFAResponse.MFAAttributes.communicationType = this.getCommunicationType();
                this.MFAResponse.MFAAttributes.isOTPExpired = false;
              } else if (response.MFAAttributes.isOTPExpired) {
                this.MFAResponse.MFAAttributes.remainingResendAttempts = response.MFAAttributes.remainingResendAttempts;
                this.MFAResponse.MFAAttributes.isOTPExpired = response.MFAAttributes.isOTPExpired;
                this.MFAResponse.MFAAttributes.communicationType = this.getCommunicationType();
              }
              applicationManager.getPresentationUtility().MFA.setSecureCodeScreen(response);
            } else {
              applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
            }
        }
        else{
            if (response.MFAAttributes) {
                applicationManager.getNavigationManager().updateForm({
                    IncorrectPin: response
                  }, "frmMFATransactions");
                  var navManager = applicationManager.getNavigationManager();
                  var PinFlow="notPinflow";
                  navManager.setCustomInfo("PinFlow",PinFlow);
        }
        else{
        var navManager = applicationManager.getNavigationManager();
                  var PinFlow="notPinflow";
                  navManager.setCustomInfo("PinFlow",PinFlow);
        applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
        }
          }
        },
        verifyOTPFailure :function (error) {
            if (this.isTransactionalError(error)) {
              applicationManager.getPresentationUtility().MFA.navigateToTransactionScreen(error);
            } else {
              applicationManager.getPresentationUtility().MFA.enteredIncorrectOTP(error.serverErrorRes);
            }
          },
          requestOTP :function (params) {
            var transactionManager = applicationManager.getTransactionManager();
            //var ACHManager = applicationManager.getACHManager();
            const userPreferencesManager = applicationManager.getUserPreferencesManager();
            if (this.flowType == "LoginMFA") {
              this.requestLoginMFAOtp(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_USERNAME") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserName(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_PASSWORD") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserPassword(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERCREATE") {
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createConsent(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERUPDATE") {
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.fetchConsent(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
              }
            else if(this.flowType == "FIXEDDEPOSITWITHNONSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithNonSTP(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if(this.flowType == "FIXEDDEPOSITWITHSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithSTP(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if(this.flowType == "LOAD_ESEWA"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.eSewaIntraBankTransfers(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if(this.flowType == "INTERNATIONALTRANSFER"){
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.createPayment(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
          else if (this.flowType === "PSD2_TPP_CONSENT_REVOKED") {
            applicationManager.getSettingsManager().updatePSD2ConsentData(params,this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
          }
		  // else if (this.flowType === "INTERBANKDOMESTICTRANSFER") {
      //         kony.application.showLoadingScreen();
      //         transactionManager.createDomesticTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
      //       } 
            else if (this.flowType === "BULK_BILL_PAY") {
              applicationManager.getTransactionManager().createBulkBillPayPayement(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "SECURITYQUESTION_RESET") {
              this.requestUpdateSecurityQuestionsOTP(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "LOCK_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().lockCard(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "UNLOCK_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().unLockCard(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_DEBIT") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().changePin(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "REPORT_LOST") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().reportLost(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "CANCEL_CARD") {
              applicationManager.getCardsManager().updateCardStatus(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "REPLACE_CARD") {
              applicationManager.getCardsManager().replaceCard(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_CREDIT") {
              applicationManager.getCardsManager().createCardRequest(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "ACTIVATE_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().activateCards(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "CARD_BILLPAYMENT"){
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().makeCardPayment(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
            else if (this.flowType == "INTERBANKDOMESTICTRANSFER") {
                kony.application.showLoadingScreen();
                var userObj = applicationManager.getUserPreferencesManager();
                userObj.interBankDomesticTransfer(params, this.requestOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "EMI_TRANSACTION") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().getConvertEMIRequestDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CARDLESS_CASH_TRANSACTION") {
              kony.application.showLoadingScreen();
              applicationManager.getTransactionsListManager().createCardlessTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "BULK_BILL_PAYMENT") {
              transactionManager.createBulkBillPayTransaction(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "SINGLE_BILL_PAYMENT") {
              transactionManager.createBillPayTransaction(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "BILL_PAY") {
              transactionManager.getconfirmBillpayNEA(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_TOP_UP_NEPAL") {
              transactionManager.getconfirmBillPayCallTopupNepal(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "BILL_PAY_KUKL") {
              transactionManager.getconfirmBillpayKUKL(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_NCHL") {
              transactionManager.getconfirmBillpay(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "UPDATE_BILL_PAYMENT") {
              transactionManager.updateBillPayTransaction(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "P2P_CREATE") {
              transactionManager.createP2PTransaction(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "P2P_EDIT") {
              transactionManager.updateP2PTransaction(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "DOMESTIC_WIRE_TRANSFER") {
              transactionManager.createDomesticWireTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_WIRE_TRANSFER") {
              transactionManager.createInternationalWireTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE") {
              transactionManager.editTransferToOwnAccounts(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_UPDATE") {
              transactionManager.editIntraBankAccFundTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInterBankAccFundTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInternationalAccFundTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
              transactionManager.createTransferToOwnAccounts(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_CREATE") {
              transactionManager.createIntraBankAccFundTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInterBankAccFundTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInternationalAccFundTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER") {
              transactionManager.createBulkWireTransaction(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER_TEMPLATE") {
              transactionManager.createBulkWireTransferOperation(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if (this.flowType === "APPLY_FOR_DEBIT_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewDebitCard(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if (this.flowType === "APPLY_FOR_PHYSICAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewPrepaidCard(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_VIRTUAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewVirtualDollarCard(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "TOPUP_DOMESTIC_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "TOPUP_VIRTUAL_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferDollar(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === BBConstants.CREATE_TRANSACTION_SUCCESS){
              ACHManager.createACHTranscation(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if(this.flowType === BBConstants.EXECUTE_TEMPLATE_SUCCESS){
              ACHManager.executeTemplate(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }else if(this.flowType === BBConstants.FETCH_UPLOADED_ACH_FILE){
              ACHManager.uploadNewACHFile(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if (this.flowType === "PAY_MULTIPLE_BENEFICIARIES") {
              applicationManager.getTransactionManager().createBulkTransfer(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "ADD_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "UPDATE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "REMOVE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "ADD_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "UPDATE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "REMOVE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            } else if(this.flowType === "SUSPEND_USER") {
              userPreferencesManager.updateUserStatus(params, this.requestOTPSuccess.bind(this), this.requestOTPFailure.bind(this));
            }
          },
          verifyOTP : function (params) {
            var transactionManager = applicationManager.getTransactionManager();
            var  billManager = applicationManager.getBillManager();
            //var ACHManager = applicationManager.getACHManager();
            const userPreferencesManager = applicationManager.getUserPreferencesManager();
            if (this.flowType == "LoginMFA") {
              this.verifyLoginMFAOtp(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_USERNAME") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserName(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_PASSWORD") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserPassword(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERCREATE") {
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createConsent(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERUPDATE") {
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.fetchConsent(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
              }
            else if(this.flowType == "FIXEDDEPOSITWITHNONSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithNonSTP(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if(this.flowType == "FIXEDDEPOSITWITHSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithSTP(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if(this.flowType == "LOAD_ESEWA"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.eSewaIntraBankTransfers(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
          else if(this.flowType == "INTERNATIONALTRANSFER"){
            kony.application.showLoadingScreen();
            var userObj = applicationManager.getUserPreferencesManager();
            userObj.createPayment(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
          else if(this.flowType == "INTRABANKTRANSFER"){
            kony.application.showLoadingScreen();
            var userObj = applicationManager.getUserPreferencesManager();
            userObj.intraBankAccTrasfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
          else if(this.flowType == "INTRABANKDOMESTICTRANSFER"){
            kony.application.showLoadingScreen();
            var userObj = applicationManager.getUserPreferencesManager();
            userObj.intraDomesticBankAccTrasfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
          else if(this.flowType == "CreateOneTimeTransfer"){
            kony.application.showLoadingScreen();
            var userObj = applicationManager.getUserPreferencesManager();
            userObj.intraBankNewAccTrasfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
          else if(this.flowType == "WITHINSAMEBANK"){
            kony.application.showLoadingScreen();
            var userObj = applicationManager.getUserPreferencesManager();
            userObj.transferToOwnAccount(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
          else if (this.flowType == "INTERBANKDOMESTICTRANSFER") {
                kony.application.showLoadingScreen();
                var userObj = applicationManager.getUserPreferencesManager();
                userObj.interBankDomesticTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
          else if (this.flowType === "PSD2_TPP_CONSENT_REVOKED") {
            applicationManager.getSettingsManager().updatePSD2ConsentData(params,this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
		  //  else if (this.flowType === "INTERBANKDOMESTICTRANSFER") {
      //         kony.application.showLoadingScreen();
      //        transactionManager.createDomesticTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
      //       } 
            else if (this.flowType === "BULK_BILL_PAY") {
              transactionManager.createBulkBillPayPayement(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType === "SECURITYQUESTION_RESET") {
              this.verifyUpdateSecurityQuestionsOTP(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "LOCK_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().lockCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "UNLOCK_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().unLockCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_DEBIT") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().changePin(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "REPORT_LOST") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().reportLost(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CANCEL_CARD") {
              applicationManager.getCardsManager().updateCardStatus(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "REPLACE_CARD") {
              applicationManager.getCardsManager().replaceCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_CREDIT") {
              applicationManager.getCardsManager().createCardRequest(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "ACTIVATE_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().activateCards(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "CARD_BILLPAYMENT"){
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().makeCardPayment(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "EMI_TRANSACTION") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().getConvertEMIRequestDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CARDLESS_CASH_TRANSACTION") {
              kony.application.showLoadingScreen();
              applicationManager.getTransactionsListManager().createCardlessTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "BULK_BILL_PAYMENT") {
              transactionManager.createBulkBillPayTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "SINGLE_BILL_PAYMENT") {
              transactionManager.createBillPayTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "BILL_PAY") {
              kony.application.showLoadingScreen();
              billManager.getconfirmBillpayNEA(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_KUKL") {
              kony.application.showLoadingScreen();
              billManager.getconfirmBillpayKUKL(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_TOP_UP_NEPAL") {
              kony.application.showLoadingScreen();
              billManager.getconfirmBillPayCallTopupNepal(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_NCHL") {
              kony.application.showLoadingScreen();
              billManager.getconfirmBillpay(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "UPDATE_BILL_PAYMENT") {
              transactionManager.updateBillPayTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "P2P_CREATE") {
              transactionManager.createP2PTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "P2P_EDIT") {
              transactionManager.updateP2PTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "DOMESTIC_WIRE_TRANSFER") {
              transactionManager.createDomesticWireTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_WIRE_TRANSFER") {
              transactionManager.createInternationalWireTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE") {
              transactionManager.editTransferToOwnAccounts(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_UPDATE") {
              transactionManager.editIntraBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInterBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInternationalAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
              transactionManager.createTransferToOwnAccounts(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_CREATE") {
              transactionManager.createIntraBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInterBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInternationalAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER") {
              transactionManager.createBulkWireTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER_TEMPLATE") {
              transactionManager.createBulkWireTransferOperation(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_DEBIT_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewDebitCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_PHYSICAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewPrepaidCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_VIRTUAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewVirtualDollarCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TOPUP_DOMESTIC_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TOPUP_VIRTUAL_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferDollar(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === BBConstants.CREATE_TRANSACTION_SUCCESS){
              ACHManager.createACHTranscation(params, this.verifyOTPSuccess.bind(this), this.verifyACHOTPFailure.bind(this));
            }else if(this.flowType === BBConstants.EXECUTE_TEMPLATE_SUCCESS){
              ACHManager.executeTemplate(params, this.verifyOTPSuccess.bind(this), this.verifyACHOTPFailure.bind(this));
            }else if(this.flowType === BBConstants.FETCH_UPLOADED_ACH_FILE){
              ACHManager.uploadNewACHFile(params, this.verifyOTPSuccess.bind(this), this.verifyACHOTPFailure.bind(this));
            } else if (this.flowType === "PAY_MULTIPLE_BENEFICIARIES") {
              applicationManager.getTransactionManager().createBulkTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "ADD_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "UPDATE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "REMOVE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "ADD_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "UPDATE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "REMOVE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "SUSPEND_USER") {
              userPreferencesManager.updateUserStatus(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
          },
          resendOTP : function (params) {
            var  billManager = applicationManager.getBillManager();
            var transactionManager = applicationManager.getTransactionManager();
            //var ACHManager = applicationManager.getACHManager();
            const userPreferencesManager = applicationManager.getUserPreferencesManager();
            if (this.flowType == "LoginMFA") {
              this.requestLoginMFAOtp(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_USERNAME") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserName(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_PASSWORD") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserPassword(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERCREATE") {
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createConsent(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERUPDATE") {
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.fetchConsent(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
              }
            else if(this.flowType == "FIXEDDEPOSITWITHNONSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithNonSTP(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if(this.flowType == "FIXEDDEPOSITWITHSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithSTP(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if(this.flowType == "LOAD_ESEWA"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.eSewaIntraBankTransfers(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
          else if (this.flowType === "PSD2_TPP_CONSENT_REVOKED") {
            applicationManager.getSettingsManager().updatePSD2ConsentData(params,this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
          }
          else if (this.flowType == "INTERBANKDOMESTICTRANSFER") {
                kony.application.showLoadingScreen();
                var userObj = applicationManager.getUserPreferencesManager();
                userObj.interBankDomesticTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
		  // else if (this.flowType === "INTERBANKDOMESTICTRANSFER") {
      //        transactionManager.createDomesticTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
      //       } 
            else if (this.flowType === "BULK_BILL_PAY") {
              transactionManager.createBulkBillPayPayement(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
            else if (this.flowType === "SECURITYQUESTION_RESET") {
              this.requestUpdateSecurityQuestionsOTP(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "LOCK_CARD") {
              applicationManager.getCardsManager().lockCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "UNLOCK_CARD") {
              applicationManager.getCardsManager().unLockCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_DEBIT") {
              applicationManager.getCardsManager().changePin(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "REPORT_LOST") {
              applicationManager.getCardsManager().reportLost(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CANCEL_CARD") {
              applicationManager.getCardsManager().updateCardStatus(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "REPLACE_CARD") {
              applicationManager.getCardsManager().replaceCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_CREDIT") {
              applicationManager.getCardsManager().createCardRequest(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "ACTIVATE_CARD") {
              applicationManager.getCardsManager().activateCards(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "CARD_BILLPAYMENT"){
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().makeCardPayment(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "EMI_TRANSACTION") {
              applicationManager.getCardsManager().getConvertEMIRequestDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "CARDLESS_CASH_TRANSACTION") {
              applicationManager.getTransactionsListManager().createCardlessTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "BULK_BILL_PAYMENT") {
              transactionManager.createBulkBillPayTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "SINGLE_BILL_PAYMENT") {
              transactionManager.createBillPayTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "BILL_PAY") {
              billManager.getconfirmBillpayNEA(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_KUKL") {
              billManager.getconfirmBillpayKUKL(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_TOP_UP_NEPAL") {
              billManager.getconfirmBillPayCallTopupNepal(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "BILL_PAY_NCHL") {
              billManager.getconfirmBillpay(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "UPDATE_BILL_PAYMENT") {
              transactionManager.updateBillPayTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "P2P_CREATE") {
              transactionManager.createP2PTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "P2P_EDIT") {
              transactionManager.updateP2PTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "DOMESTIC_WIRE_TRANSFER") {
              transactionManager.createDomesticWireTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_WIRE_TRANSFER") {
              transactionManager.createInternationalWireTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE") {
              transactionManager.editTransferToOwnAccounts(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_UPDATE") {
              transactionManager.editIntraBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInterBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInternationalAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
              transactionManager.createTransferToOwnAccounts(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_CREATE") {
              transactionManager.createIntraBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInterBankAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInternationalAccFundTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER") {
              transactionManager.createBulkWireTransaction(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER_TEMPLATE") {
              transactionManager.createBulkWireTransferOperation(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_DEBIT_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewDebitCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_PHYSICAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewPrepaidCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_VIRTUAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewVirtualDollarCard(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TOPUP_DOMESTIC_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if (this.flowType === "TOPUP_VIRTUAL_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferDollar(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === BBConstants.CREATE_TRANSACTION_SUCCESS){
              ACHManager.createACHTranscation(params, this.verifyOTPSuccess.bind(this), this.verifyACHOTPFailure.bind(this));
            }else if(this.flowType === BBConstants.EXECUTE_TEMPLATE_SUCCESS){
              ACHManager.executeTemplate(params, this.verifyOTPSuccess.bind(this), this.verifyACHOTPFailure.bind(this));
            }else if(this.flowType === BBConstants.FETCH_UPLOADED_ACH_FILE){
              ACHManager.uploadNewACHFile(params, this.verifyOTPSuccess.bind(this), this.verifyACHOTPFailure.bind(this));
            } else if (this.flowType === "PAY_MULTIPLE_BENEFICIARIES") {
              applicationManager.getTransactionManager().createBulkTransfer(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "ADD_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "UPDATE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "REMOVE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "ADD_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "UPDATE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "REMOVE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            } else if(this.flowType === "SUSPEND_USER") {
              userPreferencesManager.updateUserStatus(params, this.verifyOTPSuccess.bind(this), this.verifyOTPFailure.bind(this));
            }
          },
          verifySecurityQuestions : function (params) {
            var  billManager = applicationManager.getBillManager();
            var transactionManager = applicationManager.getTransactionManager();
            //var ACHManager = applicationManager.getACHManager();
            const userPreferencesManager = applicationManager.getUserPreferencesManager();
            if (this.flowType == "LoginMFA") {
              this.verifyLoginMFASecurityQuestions(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_USERNAME") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserName(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
            else if (this.flowType == "UPDATE_PASSWORD") {
              var userObj = applicationManager.getUserPreferencesManager();
              userObj.updateUserPassword(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERCREATE") {
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.createConsent(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
            else if (this.flowType == "CROSSBORDERUPDATE") {
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
                termsAndConditions.fetchConsent(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
              }
            else if(this.flowType == "FIXEDDEPOSITWITHNONSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithNonSTP(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
            else if(this.flowType == "FIXEDDEPOSITWITHSTP"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.createFixedDepositeWithSTP(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
            else if(this.flowType == "LOAD_ESEWA"){
              kony.application.showLoadingScreen();
              var termsAndConditions = applicationManager.getTermsAndConditionsManager();
              termsAndConditions.eSewaIntraBankTransfers(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
          else if (this.flowType === "PSD2_TPP_CONSENT_REVOKED") {
            applicationManager.getSettingsManager().updatePSD2ConsentData(params,this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
          }
          else if (this.flowType == "INTERBANKDOMESTICTRANSFER") {
                kony.application.showLoadingScreen();
                var userObj = applicationManager.getUserPreferencesManager();
                userObj.interBankDomesticTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
		  // else if (this.flowType === "INTERBANKDOMESTICTRANSFER") {
      //         kony.application.showLoadingScreen();
      //        // applicationManager.getCardsManager().lockCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
      //       } 
            else if (this.flowType === "BULK_BILL_PAY") {
              applicationManager.getTransactionManager().createBulkBillPayPayement(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "LOCK_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().lockCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "UNLOCK_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().unLockCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_DEBIT") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().changePin(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "REPORT_LOST") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().reportLost(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "CANCEL_CARD") {
              applicationManager.getCardsManager().updateCardStatus(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "REPLACE_CARD") {
              applicationManager.getCardsManager().replaceCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "CHANGE_PIN_CREDIT") {
              applicationManager.getCardsManager().createCardRequest(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "ACTIVATE_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().activateCards(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "CARD_BILLPAYMENT"){
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().makeCardPayment(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "EMI_TRANSACTION") {
              applicationManager.getCardsManager().getConvertEMIRequestDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "CARDLESS_CASH_TRANSACTION") {
              applicationManager.getTransactionsListManager().createCardlessTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "BULK_BILL_PAYMENT") {
              transactionManager.createBulkBillPayTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "SINGLE_BILL_PAYMENT") {
              transactionManager.createBillPayTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if (this.flowType === "BILL_PAY") {
              billManager.getconfirmBillpayNEA(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_KUKL") {
               billManager.getconfirmBillpayKUKL(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_TOP_UP_NEPAL") {
              billManager.getconfirmBillPayCallTopupNepal(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if (this.flowType === "BILL_PAY_NCHL") {
              billManager.getconfirmBillpay(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "UPDATE_BILL_PAYMENT") {
              transactionManager.updateBillPayTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "P2P_CREATE") {
              transactionManager.createP2PTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "P2P_EDIT") {
              transactionManager.updateP2PTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "DOMESTIC_WIRE_TRANSFER") {
              transactionManager.createDomesticWireTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_WIRE_TRANSFER") {
              transactionManager.createInternationalWireTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_UPDATE") {
              transactionManager.editTransferToOwnAccounts(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_UPDATE") {
              transactionManager.editIntraBankAccFundTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInterBankAccFundTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_UPDATE") {
              transactionManager.editInternationalAccFundTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") {
              transactionManager.createTransferToOwnAccounts(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTRA_BANK_FUND_TRANSFER_CREATE") {
              transactionManager.createIntraBankAccFundTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInterBankAccFundTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE") {
              transactionManager.createInternationalAccFundTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER") {
              transactionManager.createBulkWireTransaction(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if (this.flowType === "CREATE_BULKWIRE_TRANSFER_TEMPLATE") {
              transactionManager.createBulkWireTransferOperation(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if(this.flowType === BBConstants.CREATE_TRANSACTION_SUCCESS){
              ACHManager.createACHTranscation(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if(this.flowType === BBConstants.EXECUTE_TEMPLATE_SUCCESS){
              ACHManager.executeTemplate(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }else if(this.flowType === BBConstants.FETCH_UPLOADED_ACH_FILE){
              ACHManager.uploadNewACHFile(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "PAY_MULTIPLE_BENEFICIARIES") {
              applicationManager.getTransactionManager().createBulkTransfer(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_DEBIT_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewDebitCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_PHYSICAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewPrepaidCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "APPLY_FOR_VIRTUAL_PREPAID_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().applyNewVirtualDollarCard(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "TOPUP_DOMESTIC_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferPrepaid(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if (this.flowType === "TOPUP_VIRTUAL_CARD") {
              kony.application.showLoadingScreen();
              applicationManager.getCardsManager().intraBankTransferDollar(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "ADD_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "UPDATE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "REMOVE_PHONE_NUMBER") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "ADD_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "UPDATE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "REMOVE_EMAIL") {
              userPreferencesManager.updateUserProfileDetails(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            } else if(this.flowType === "SUSPEND_USER") {
              userPreferencesManager.updateUserStatus(params, this.verifyAnswersSuccess.bind(this), this.verifyAnswersFailure.bind(this));
            }
          },
    };
});