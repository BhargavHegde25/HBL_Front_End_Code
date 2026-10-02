define(["FormControllerUtility", "TradeLendingUtils", "CommonUtilities"], function (FormControllerUtility, TLUtils, CommonUtilities) {
  const fontIcons = {
      'radioSelected': 'M',
      'radioUnselected': 'L'
    },
    skins = {
      'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
      'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px',
    };
  let scope, presenter, contentScope, popupScope, breakpoint, paymentRequestDate, selectedToAccount, selectedFromAccount, formatUtilManager;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () {};
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.onTouchEnd = function () {
        kony.timer.schedule("touchEndTimer", TLUtils.hideSubscribedWidgetsIfVisible, 0.1, false);
      };
      this.view.formTemplate12.onError = this.onError;
      this.initFormActions();
    },
    /**
     * Handles breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (formHandle, breakpoint) {
      breakpoint = kony.application.getCurrentBreakpoint();
      this.view.formTemplate12.hideBannerError();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      this.resetForm();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      let segmentData = [];
      presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeLendingMA',
        'moduleName': 'LendingDashboardUIModule'
      });
      formatUtilManager = applicationManager.getFormatUtilManager();
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;

     // contentScope.txtTransferFrom.onTouchEnd = this.populateFromAccounts;
      contentScope.segTransferFrom.onRowClick = () => {
        contentScope.txtTransferFrom.setVisibility(false);
        selectedFromAccount = contentScope.segTransferFrom.selectedRowItems[0];
        contentScope.lblCurrency.text = selectedFromAccount.currencySymbol;
        contentScope.lblSelectedAccount.text = selectedFromAccount.lblName;
        scope.toggleFromAccountList();
        scope.enableOrDisableSubmitButton();
      };

      //contentScope.txtTransferTo.onTouchEnd = this.populateToAccounts;
      contentScope.segTransferTo.onRowClick = () => {
        contentScope.txtTransferTo.setVisibility(false);
        scope.selectedToAccount = contentScope.segTransferTo.selectedRowItems[0];
        contentScope.lblToCurrency.text = scope.selectedToAccount.currencySymbol;
        contentScope.lblToSelectedAccount.text = scope.selectedToAccount.lblName;
        contentScope.lblDueAmountValue.setVisibility(true);
        contentScope.lblDueAmountValue.text = "(Due Amount : " + scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(scope.selectedToAccount.dueAmount) + " )";
        contentScope.txtbxAmount.text = scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(scope.selectedToAccount.dueAmount);
        if(contentScope.lblRadioPayment1Icon.text === fontIcons.radioSelected){
        contentScope.txtbxAmount.setEnabled(false);
        } else {
          contentScope.txtbxAmount.setEnabled(true);
        }

        if (contentScope.lblRadio1Icon.text === fontIcons.radioSelected && contentScope.lblRadioPayment1Icon.text === fontIcons.radioSelected) {
          scope.setDueInfoBasedOnFacilityType();
        }
        if (contentScope.lblRadio2Icon.text === fontIcons.radioSelected && contentScope.lblRadioPayment1Icon.text === fontIcons.radioSelected) {
          scope.setDueInfoForLoan();
        }
        scope.toggleToAccountList();
        scope.enableOrDisableSubmitButton();
      };
      contentScope.btnContinue.onClick = () => scope.showPaymentConfirmationPage();
      contentScope.btnConfirm.onClick = () => scope.confirmPopup();
      contentScope.btnModify.onClick = () => scope.onModify();
      contentScope.flxShowToAccountID.onClick = () => this.toggleToAccountList();
      contentScope.flxShowFromAccountID.onClick = () => this.toggleFromAccountList();

      contentScope.flxFacilityPayment.onClick = this.toggleRepaymentRadioBtns.bind(this, 1);
      contentScope.flxLoanPayment.onClick = this.toggleRepaymentRadioBtns.bind(this, 2);
      contentScope.flxPayDueAmount.onClick = this.togglePaymentTypeRadioBtns.bind(this, 1);
      contentScope.flxPayOtherAmount.onClick = this.togglePaymentTypeRadioBtns.bind(this, 2);

      contentScope.lblRadio1Icon.text = fontIcons.radioSelected;
      contentScope.lblRadio1Icon.skins = fontIcons.radioSelected;
      contentScope.lblRadio2Icon.text = fontIcons.radioUnselected;
      contentScope.lblRadio2Icon.skins = fontIcons.radioUnselected;

      contentScope.lblRadioPayment1Icon.text = fontIcons.radioSelected;
      contentScope.lblRadioPayment1Icon.skins = fontIcons.radioSelected;
      contentScope.lblRadioPayment2Icon.text = fontIcons.radioUnselected;
      contentScope.lblRadioPayment2Icon.skins = fontIcons.radioUnselected;

      contentScope.btnGoToDashboard.onClick = () => presenter.loadScreenWithContext({
        'context': 'lendingDashboard'
      });
      contentScope.txtTransferFrom.onTouchEnd = () => this.toggleFromAccountList();
      contentScope.txtTransferTo.onTouchEnd = () => this.toggleToAccountList();
      contentScope.btnCancel.onClick = this.cancelPopup;
      contentScope.btnCancelConfirmation.onClick = this.cancelPopup;
      var currentDate = new Date();
      paymentRequestDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
      contentScope.lblDownloadImg.onTouchEnd = this.initDownloadTransactionReport;
      contentScope.txtbxAmount.onTextChange = this.validationForOtherAmount;
      contentScope.flxRightContainer.txtAreaPartialPaymentMsg.setEnabled(false);

    },

    setDueInfoBasedOnFacilityType: function () {
      contentScope.flxDueDetailsInfo.setVisibility(true);
      let termFacility = [{
          'lblKey': "Coordination fee",
          'lblValue': scope.selectedToAccount.coordinationFee
        }, {
          'lblKey': "Coordination Fee Tax",
          'lblValue': scope.selectedToAccount.coordinationFeeTax
        }, {
          'lblKey': "Upfront fee",
          'lblValue': scope.selectedToAccount.upfrontFee
        }, {
          'lblKey': "Upfront Fee tax",
          'lblValue': scope.selectedToAccount.upfrontFeeTax
        },
        {
          'lblKey': "Facility Fee tax",
          'lblValue': scope.selectedToAccount.facilityFeeTax
        },
        {
          'lblKey': "Facility Fee",
          'lblValue': scope.selectedToAccount.facilityFee
        },
        {
          'lblKey': "Utilized commitment fee Tax",
          'lblValue': scope.selectedToAccount.utilizedCommitmentFeeTax
        },
        {
          'lblKey': "Overdrawn limit fees Tax",
          'lblValue': scope.selectedToAccount.overdrawnLimitFeesTax
        }
      ];
      let borrowingFacility = [{
          'lblKey': "Coordination fee",
          'lblValue': scope.selectedToAccount.coordinationFee
        }, {
          'lblKey': "Coordination Fee Tax",
          'lblValue': scope.selectedToAccount.coordinationFeeTax
        },
        {
          'lblKey': "Upfront fee",
          'lblValue': scope.selectedToAccount.upfrontFee
        },
        {
          'lblKey': "Upfront Fee Tax",
          'lblValue': scope.selectedToAccount.upfrontFeeTax
        },
        {
          'lblKey': "Facility Fee Tax",
          'lblValue': scope.selectedToAccount.facilityFeeTax
        },
        {
          'lblKey': "Utilized commitment fee Tax",
          'lblValue': scope.selectedToAccount.utilizedCommitmentFeeTax
        },
        {
          'lblKey': "Overdrawn limit fees",
          'lblValue': scope.selectedToAccount.overdrawnLimitFees
        },
        {
          'lblKey': "Overdrawn limit fees Tax",
          'lblValue': scope.selectedToAccount.overdrawnLimitFeesTax
        }
      ];
      let revolvingFacility = [{
          'lblKey': "Coordination fee",
          'lblValue': scope.selectedToAccount.coordinationFee
        }, {
          'lblKey': "Coordination Fee Tax",
          'lblValue': scope.selectedToAccount.coordinationFeeTax
        },
        {
          'lblKey': "Upfront fee",
          'lblValue': scope.selectedToAccount.upfrontFee
        },
        {
          'lblKey': "Upfront Fee Tax",
          'lblValue': scope.selectedToAccount.upfrontFeeTax
        },
        {
          'lblKey': "Facility Fee Tax",
          'lblValue': scope.selectedToAccount.facilityFeeTax
        },
        {
          'lblKey': "Utilized commitment Fee",
          'lblValue': scope.selectedToAccount.utilizedCommitmentFee
        },
        {
          'lblKey': "Utilized commitment fee Tax",
          'lblValue': scope.selectedToAccount.utilizedCommitmentFeeTax
        },
        {
          'lblKey': "Overdrawn limit fees Tax",
          'lblValue': scope.selectedToAccount.overdrawnLimitFeesTax
        }
      ];
      let dueDetailsInfo = [];
      switch (scope.selectedToAccount.facilityType) {
        case 'Term Facility':
          dueDetailsInfo = termFacility;
          break;
        case 'Revolving  Facility':
          dueDetailsInfo = revolvingFacility;
          break;
        case 'Borrowing base Facility':
          dueDetailsInfo = borrowingFacility;
          break;
      }
      contentScope.segDueDetails.setData(dueDetailsInfo);
    },

    setDueInfoForLoan: function () {
      contentScope.flxDueDetailsInfo.setVisibility(true);
      let dueDetailsInfo = [{
          'lblKey': "Principal",
          'lblValue': scope.selectedToAccount.principal
        }, {
          'lblKey': "Principal Interest",
          'lblValue': scope.selectedToAccount.principalInterest
        }, {
          'lblKey': "Principal Interest Tax",
          'lblValue': scope.selectedToAccount.principalInterestTax
        }, {
          'lblKey': "Penalty Interest",
          'lblValue': scope.selectedToAccount.penaltyInterest
        },
        {
          'lblKey': "Penalty Interest Tax",
          'lblValue': scope.selectedToAccount.penaltyInterestTax
        },
        {
          'lblKey': "Commitment Amount",
          'lblValue': scope.selectedToAccount.commitmentAmount
        }
      ];
      contentScope.segDueDetails.setData(dueDetailsInfo);
    },

    /**
     * Toggles the from account list.
     */
    toggleFromAccountList: function () {
      if (contentScope.flxFromSegment.isVisible) {
        contentScope.flxFromSegment.setVisibility(false);
        contentScope.flxShowFromAccountID.setVisibility(true);
        contentScope.flxFromSegment.setVisibility(false);
      } else {
        contentScope.flxFromSegment.setVisibility(true);
        contentScope.flxShowFromAccountID.setVisibility(false);
        contentScope.flxFromSegment.setVisibility(true);
        this.populateFromAccounts();
      }
    },

    resetForm: function () {
      scope.selectedToAccount = [];
      contentScope.flxPaymentsContainer.setVisibility(true);
      contentScope.flxPaymentsConfirmation.setVisibility(false);
      contentScope.flxAcknowledgementContainer.setVisibility(false);
      contentScope.flxGoToDashboard.setVisibility(false);
      contentScope.txtbxAmount.text = "";
      contentScope.txtbxPaymentReferenceMsg.text = "";
      contentScope.flxFromSegment.setVisibility(false);
      contentScope.flxToSegment.setVisibility(false);
      contentScope.flxShowToAccountID.setVisibility(false);
      contentScope.flxShowFromAccountID.setVisibility(false);
      contentScope.txtTransferTo.setVisibility(true);
      contentScope.txtTransferFrom.setVisibility(true);
      FormControllerUtility.disableButton(contentScope.btnContinue);
      contentScope.flxDueDetailsInfo.setVisibility(false);
      contentScope.lblToSelectedAccount.text = "";
      contentScope.lblSelectedAccount.text = "";
    },

    /**
     * Toggles the to account list.
     */
    toggleToAccountList: function() {
      if (contentScope.flxToSegment.isVisible) {
          contentScope.flxShowToAccountID.setVisibility(true);
          contentScope.flxToSegment.setVisibility(false);
      } else {
          contentScope.flxToSegment.setVisibility(true);
          contentScope.flxShowToAccountID.setVisibility(false);
          this.populateToAccounts();
      }
  },

    showPaymentConfirmationPage: function () {
      contentScope.flxPaymentsContainer.setVisibility(false);
      contentScope.flxGoToDashboard.setVisibility(false);
      contentScope.flxAcknowledgementContainer.setVisibility(false);
      contentScope.flxPaymentsConfirmation.setVisibility(true);
      this.populatePaymentDetailsInConfirmation();
      contentScope.flxOtherAmountConfirmationContainer.setVisibility(true);
      if (contentScope.lblRadioPayment1Icon.text === fontIcons.radioSelected) {
        contentScope.flxRightContainer.setVisibility(false);
        contentScope.flxSeperator.setVisibility(false);
      } else if (contentScope.lblRadioPayment2Icon.text === fontIcons.radioSelected) {
        contentScope.flxRightContainer.setVisibility(true);
        contentScope.flxSeperator.setVisibility(true);
        this.populateDueAmountDetails();
      }
    },

    populateDueAmountDetails: function () {
      let balance = scope.selectedToAccount.dueAmount - contentScope.txtbxAmount.text;
      if (parseInt(contentScope.txtbxAmount.text) === parseInt(scope.selectedToAccount.dueAmount)) {
        contentScope.flxRightContainer.flxNoInvoice.setVisibility(false);
      }else {
        contentScope.flxRightContainer.flxNoInvoice.setVisibility(true);
      }
      let dueDetails = [{
        'lblKey': "Current Due",
        'lblValue': scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(scope.selectedToAccount.dueAmount)
      }, {
        'lblKey': "Amount Being Paid",
        'lblValue':  scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(contentScope.txtbxAmount.text) 
      }, {
        'lblKey': "Balance Amount",
        'lblValue': scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(balance)
      }, {
        'lblKey': "Date",
        'lblValue': paymentRequestDate
      }];
      contentScope.segConfirmation.setData(dueDetails);
    },

    showAcknowledgementPage: function (response) {
      contentScope.flxPaymentsContainer.setVisibility(false);
      contentScope.flxAcknowledgementContainer.setVisibility(true);
      contentScope.flxPaymentsConfirmation.setVisibility(false);
      contentScope.flxGoToDashboard.setVisibility(true);
      contentScope.lblReferenceNumber.text = response.paymentRequestId;
      this.populateTransactionDetails();
    },

    onModify: function () {
      contentScope.flxPaymentsContainer.setVisibility(true);
      contentScope.flxAcknowledgementContainer.setVisibility(false);
      contentScope.flxPaymentsConfirmation.setVisibility(false);
      contentScope.flxGoToDashboard.setVisibility(false);
    },

    populateFromAccounts: function () {
      configurationManager = applicationManager.getConfigurationManager();
      let fromAccounts = applicationManager.getAccountManager().getInternalAccounts();
      let segData = [];
      for (const account of fromAccounts) {
        segData.push({
          'flxAccountRow': {
            'cursorType': 'pointer'
          },
          'lblName': CommonUtilities.getAccountDisplayName(account),
          'lblAmount': `${configurationManager.getCurrency(account.currencyCode)}${formatUtilManager.formatAmount(account.availableBalance)}`,
          'currencySymbol': configurationManager.getCurrency(account.currencyCode),
          'currencyCode': account.currencyCode,
          'accountId': account.accountID
        });
      }
      contentScope.segTransferFrom.setData(segData);
      contentScope.flxFromSegment.setVisibility(true);
      this.view.forceLayout();
    },

    populateToAccounts: function () {
      let records = [];
      configurationManager = applicationManager.getConfigurationManager();
      if (contentScope.lblRadio1Icon.text === fontIcons.radioSelected) {
        records = presenter.facilityRecords;
      } else if (contentScope.lblRadio2Icon.text === fontIcons.radioSelected) {
        records = presenter.loanRecords;
      }
      let toAccounts = records;
      let segData = [];
      for (const account of toAccounts) {
        segData.push({
          'flxAccountRow': {
            'cursorType': 'pointer'
          },
          'lblName': account.accountName,
          'lblAmount': `${configurationManager.getCurrency(account.currency)}${formatUtilManager.formatAmount(account.utilisedCommitment)}`,
          'currencySymbol': configurationManager.getCurrency(account.currency),
          'currencyCode': account.currency,
          'accountId': account.account,
          'dueAmount': account.dueAmount,
          'facilityType': account.facilityType,
          'coordinationFee': account.coordinationFee,
          'coordinationFeeTax': account.coordinationFeeTax,
          'upfrontFee': account.upfrontFee,
          'upfrontFeeTax': account.upfrontFeeTax,
          'facilityFee': account.facilityFee,
          'facilityFeeTax': account.facilityFeeTax,
          'utilizedCommitmentFee': account.utilizedCommitmentFee,
          'utilizedCommitmentFeeTax': account.utilizedCommitmentFeeTax,
          'overdrawnLimitFees': account.overdrawnLimitFees,
          'overdrawnLimitFeesTax': account.overdrawnLimitFeesTax,
          'principal': account.principal,
          'principalInterest': account.principalInterest,
          'principalInterestTax': account.principalInterestTax,
          'penaltyInterest': account.penaltyInterest,
          'penaltyInterestTax': account.penaltyInterestTax,
          'commitmentAmount': account.commitmentAmount
        });
      }
      contentScope.segTransferTo.setData(segData);
      contentScope.flxToSegment.setVisibility(true);
      this.view.forceLayout();
    },

    /**
     * Entry point method for the form controller.
     * @param {Object} viewModel - Specifies the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        this.view.formTemplate12.showLoading();
      } else if (viewModel.isLoading === false) {
        this.view.formTemplate12.hideLoading();
      }
      if (viewModel.paymentRequestSuccess) {
        this.showAcknowledgementPage(viewModel.paymentRequestSuccess);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },

    /**
     * Toggles the rollover term radio.
     * @param {string} idx - Specifes the selected radio index.
     */
    toggleRepaymentRadioBtns: function (idx) {
      for (let i = 1; i <= 2; i++) {
        contentScope[`lblRadio${i}Icon`].text = fontIcons.radioUnselected;
        contentScope[`lblRadio${i}Icon`].skin = skins.radioUnselected;
      }
      if (!idx) {
        return;
      }
      contentScope[`lblRadio${idx}Icon`].text = fontIcons.radioSelected;
      contentScope[`lblRadio${idx}Icon`].skin = skins.radioSelected;

      scope.resetForm();
    },

    /**
     * Toggles the rollover term radio.
     * @param {string} idx - Specifes the selected radio index.
     */
    togglePaymentTypeRadioBtns: function (idx) {
      for (let i = 1; i <= 2; i++) {
        contentScope[`lblRadioPayment${i}Icon`].text = fontIcons.radioUnselected;
        contentScope[`lblRadioPayment${i}Icon`].skin = skins.radioUnselected;
      }
      if (!idx) {
        return;
      }
      contentScope[`lblRadioPayment${idx}Icon`].text = fontIcons.radioSelected;
      contentScope[`lblRadioPayment${idx}Icon`].skin = skins.radioSelected;
      if (contentScope.lblRadioPayment2Icon.text === fontIcons.radioSelected) {
        contentScope.flxDueDetailsInfo.setVisibility(false);
        contentScope.txtbxAmount.setEnabled(true);
        contentScope.txtbxAmount.text = "";
        contentScope.lblDueAmountValue.setVisibility(true);
      }
      if (contentScope.lblRadioPayment1Icon.text === fontIcons.radioSelected && Object.keys(scope.selectedToAccount).length !== 0) {
        contentScope.flxDueDetailsInfo.setVisibility(true);
        contentScope.txtbxAmount.setEnabled(false);
        contentScope.lblDueAmountValue.setVisibility(true);
        contentScope.txtbxAmount.text = scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(scope.selectedToAccount.dueAmount);;
        if (contentScope.lblRadio1Icon.text === fontIcons.radioSelected) {
          scope.setDueInfoBasedOnFacilityType();
        }
        if (contentScope.lblRadio2Icon.text === fontIcons.radioSelected) {
          scope.setDueInfoForLoan();
        }
      } 
    },

    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    },

    populatePaymentDetailsInConfirmation: function () {
      let repaymentFor = "";
      if (contentScope.lblRadio1Icon.text === fontIcons.radioSelected) {
        repaymentFor = "Facility Payment";
      } else if (contentScope.lblRadio2Icon.text === fontIcons.radioSelected) {
        repaymentFor = "Loan Payment";
      }
      let paymentDetails = [{
          'lblKey': "Repayment Type",
          'lblValue': repaymentFor
        }, {
          'lblKey': "From Account",
          'lblValue': contentScope.flxFrom.lblSelectedAccount.text
        }, {
          'lblKey': "To Account",
          'lblValue': contentScope.flxTo.lblToSelectedAccount.text
        }, {
          'lblKey': "Currency",
          'lblValue': scope.selectedToAccount.currencyCode
        }, {
          'lblKey': "Due Amount",
          'lblValue': scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(scope.selectedToAccount.dueAmount)
        },
        {
          'lblKey': "Payment Reference",
          'lblValue': contentScope.txtbxPaymentReferenceMsg.text
        }
      ];
      contentScope.segPaymentDetails.setData(paymentDetails);
    },

    submitPaymentRequest: function () {
      let repaymentFor = "";
      let paymentType = "";
      if (contentScope.lblRadio1Icon.text === fontIcons.radioSelected) {
        repaymentFor = "Facility";
      } else if (contentScope.lblRadio2Icon.text === fontIcons.radioSelected) {
        repaymentFor = "Loan";
      }
      if (contentScope.lblRadioPayment2Icon.text === fontIcons.radioSelected) {
        paymentType = "Other";
      } else if (contentScope.lblRadioPayment1Icon.text === fontIcons.radioSelected) {
        paymentType = "Due";
      }
      let paymentDetails = {
        "repaymentFor": repaymentFor,
        "fromAccountNumber": contentScope.flxFrom.lblSelectedAccount.text,
        "toAccountNumber": contentScope.flxTo.lblToSelectedAccount.text,
        "paymentType": paymentType,
        "paymentAmount": contentScope.txtbxAmount.text,
        "paymentCurrency": contentScope.lblToCurrency.text,
        "paymentReferenceMsg": contentScope.txtbxPaymentReferenceMsg.text,
        "paymentRequestDate": paymentRequestDate
      }
      presenter.submitPaymentRequest(paymentDetails, this.view.id);
    },

    cancelPopup: function () {
      let popupContext = {
        'heading': kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
        'message': kony.i18n.getLocalizedString('i18n.serviceRequests.CancelTransaction'),
        'noText': kony.i18n.getLocalizedString('i18n.common.no'),
        'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
        'yesClick': () => presenter.loadScreenWithContext({
          'context': 'lendingDashboard'
        })
      }
      this.view.formTemplate12.setPopup(popupContext);
    },

    /**
     * Initiates transaction report download
     */
    initDownloadTransactionReport: function () {
      presenter.downloadTransactionReport("frmPaymentsLink", contentScope.lblReferenceNumber.text);
    },

    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      if (!formData['fromAccount'] || !formData['toAccount'] || !formData['otherAmount']) {
        FormControllerUtility.disableButton(contentScope.btnContinue);
        return;
      }
      FormControllerUtility.enableButton(contentScope.btnContinue);
    },

    /**
     * Returns the form data.
     * @returns {object} - Form data.
     */
    getFormData: function () {
      const formData = {
        'toAccount': contentScope.lblToSelectedAccount.text,
        'fromAccount': contentScope.lblSelectedAccount.text,
        'otherAmount': contentScope.txtbxAmount.text
      };
      return formData;
    },

    validationForOtherAmount: function () {
      scope.enableOrDisableSubmitButton();
      if (contentScope.lblRadioPayment2Icon.text === fontIcons.radioSelected) {
        contentScope.txtbxAmount.text = contentScope.txtbxAmount.text.replace(/[^\d]/g, '');
        let otherAmount = contentScope.txtbxAmount.text;
        if (parseInt(otherAmount) > parseInt(scope.selectedToAccount.dueAmount)) {
          FormControllerUtility.disableButton(contentScope.btnContinue);
        } else {
           scope.enableOrDisableSubmitButton();
        }
      }
    },

    confirmPopup: function () {
      let popupContext = {
        'heading': kony.i18n.getLocalizedString('i18n.wealth.submit'),
        'message': kony.i18n.getLocalizedString('i18n.TradeLending.submitPayment') ? kony.i18n.getLocalizedString('i18n.TradeLending.submitPayment') : "Are you sure you want to submit the Payment?",
        'noText': kony.i18n.getLocalizedString('i18n.common.no'),
        'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
        'yesClick': () => scope.submitPaymentRequest()
      }
      this.view.formTemplate12.setPopup(popupContext);
    },

    populateTransactionDetails: function () {
      let transactionDetails = [{
          'lblKey': "From Account",
          'lblValue': contentScope.flxFrom.lblSelectedAccount.text
        }, {
          'lblKey': "To Account",
          'lblValue': contentScope.flxTo.lblToSelectedAccount.text
        }, {
          'lblKey': "Amount",
          'lblValue': scope.selectedToAccount.currencySymbol + formatUtilManager.formatAmount(contentScope.txtbxAmount.text) 
        }, {
          'lblKey': "Date",
          'lblValue': paymentRequestDate
        },
        {
          'lblKey': "Payment Reference",
          'lblValue': contentScope.txtbxPaymentReferenceMsg.text
        }
      ];
      contentScope.segTransactionDetails.setData(transactionDetails);
    },
  };
});
