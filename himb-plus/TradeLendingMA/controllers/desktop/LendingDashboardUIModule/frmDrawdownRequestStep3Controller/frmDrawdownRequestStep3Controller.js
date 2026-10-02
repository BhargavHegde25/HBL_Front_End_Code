define(["OLBConstants", "FormControllerUtility"], function (OLBConstants, FormControllerUtility) {
  let scope, presenter, contentScope, popupScope, breakpoint, accountConfig;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
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
      (presenter.drawdownRequest.data.step3 !== 'completed') && this.resetForm();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setProgressTracker();
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeLendingMA',
        'moduleName': 'LendingDashboardUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      contentScope.btnCancel.toolTip = kony.i18n.getLocalizedString('i18n.wealth.cancel');
      contentScope.btnBack.toolTip = kony.i18n.getLocalizedString('i18n.wealth.back');
      contentScope.btnSubmit.toolTip = kony.i18n.getLocalizedString('i18n.TradeFinance.SaveContinue');
      contentScope.btnCancel.onClick = () => scope.togglePopup({ 'context': 'cancelRequest' });
      contentScope.btnBack.onClick = () => presenter.showView({ 'form': 'frmDrawdownRequestStep2' });
      contentScope.btnSubmit.onClick = () => {
        const formData = scope.getFormData();
        presenter.storeDrawdownRequestDetails('step3', formData);
      };
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
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },
    /**
     * Resets the form.
     */
    resetForm: function () {
      accountConfig = (applicationManager.getAccountManager().getInternalAccounts() || []).filter(acc => [OLBConstants.ACCOUNT_TYPE.SAVING, OLBConstants.ACCOUNT_TYPE.CHECKING, OLBConstants.ACCOUNT_TYPE.CURRENT].includes(acc.accountType));
      contentScope.flxPayInDetails.removeAll();
      contentScope.flxPayOutDetails.removeAll();
      this.addPayinWidgetInstance();
      this.addPayoutWidgetInstance();
    },
    /**
     * Sets the progress tracker.
     */
    setProgressTracker: function () {
      let roadmapData = [];
      for (const [key, value] of Object.entries(presenter.drawdownRequest.roadmap)) {
        roadmapData.push({
          'isCurrentRow': key === 'step3',
          'status': key === 'step3' ? 'inprogress' : presenter.drawdownRequest.data[key] || 'incomplete',
          'title': value
        });
      }
      contentScope.ProgressTracker.setData({
        'heading': kony.i18n.getLocalizedString('i18n.TradeLending.drawdownRequest'),
        'subheading': `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${presenter.drawdownRequest.data.drawdownRequestId || '-'}`,
        'data': roadmapData
      });
    },
    /**
     * Adds payin account widget instance.
     */
    addPayinWidgetInstance: function () {
      const accountWidget = new com.InfinityOLB.TradeLending.SettlementAccount({
        'clipBounds': false,
        'id': 'PayinAccount',
        'isVisible': true,
        'top': '20dp',
        'zIndex': 10,
        'appName': 'TradeLendingMA',
        'masterType': constants.MASTER_TYPE_DEFAULT
      }, {}, {});
      contentScope.flxPayInDetails.add(accountWidget);
      accountWidget.setContext(accountConfig);
    },
    /**
     * Adds payout account widget instance.
     */
    addPayoutWidgetInstance: function () {
      const accountWidget = new com.InfinityOLB.TradeLending.SettlementAccount({
        'clipBounds': false,
        'id': 'PayoutAccount',
        'isVisible': true,
        'top': '20dp',
        'zIndex': 5,
        'appName': 'TradeLendingMA',
        'masterType': constants.MASTER_TYPE_DEFAULT
      }, {}, {});
      accountWidget.lblAccount.text = kony.i18n.getLocalizedString('i18n.konybb.Common.DebitAccount');
      accountWidget.lblSelectedAccount.text = kony.i18n.getLocalizedString('i18n.TradeLending.loanDebitAccountPlaceholderMessage');
      contentScope.flxPayOutDetails.add(accountWidget);
      accountWidget.setContext(accountConfig);
    },
    /**
     * Toggles the popup.
     * @param {object} param - Specifies the params.
     */
    togglePopup: function ({ context, widgetId }) {
      let popupContext = {};
      switch (context) {
        case 'cancelRequest':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
            'message': kony.i18n.getLocalizedString('i18n.TradeLending.cancelDrawdownRequestMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.loadScreenWithContext({ 'context': 'lendingDashboard' })
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Toggles the submit button.
     */
    enableOrDisableSubmitButton: function () {
      if (!contentScope.PayinAccount.segAccountList.selectedRowIndex) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
        return;
      }
      if (!contentScope.PayoutAccount.segAccountList.selectedRowIndex) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
        return;
      }
      FormControllerUtility.enableButton(contentScope.btnSubmit);
    },
    /**
     * Returns the form data.
     * @returns {object} - Form data.
     */
    getFormData: function () {
      const selectedPayinAcc = contentScope.PayinAccount.segAccountList.selectedRowItems[0],
        selectedPayoutAcc = contentScope.PayoutAccount.segAccountList.selectedRowItems[0];
      return {
        'payInDetails': [{
          'creditAccountId': selectedPayinAcc.accountId,
          'currency': selectedPayinAcc.currencyCode
        }],
        'payOutDetails': [{
          'debitAccountId': selectedPayoutAcc.accountId,
          'currency': selectedPayoutAcc.currencyCode
        }]
      };
    },
    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    },
  };
});