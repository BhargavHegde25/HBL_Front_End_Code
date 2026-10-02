define(["FormControllerUtility", "TradeLendingUtils"], function (FormControllerUtility, TLUtils) {
  const skins = {
    'textboxNormal': 'ICSknTxtE3E3E3Border1px424242SSPRegular15px',
    'textboxError': 'skntbxSSPFF000015pxnoborder'
  };
  let scope, presenter, contentScope, popupScope, breakpoint, selectedFacility;
  return {
    /**
     * Sets the initial actions for form.
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
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
      TLUtils.subscribeToTouchEnd([
        contentScope.FacilityDropdown,
        contentScope.LoanDropdown
      ]);
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
      presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeLendingMA',
        'moduleName': 'LendingDashboardUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      contentScope.btnCancel.toolTip = kony.i18n.getLocalizedString('i18n.wealth.cancel');
      contentScope.btnSubmit.toolTip = kony.i18n.getLocalizedString('i18n.wealth.submit');
      contentScope.btnBackToDashboard.toolTip = kony.i18n.getLocalizedString('i18n.TradeLending.goToDashboard');
      contentScope.tbxYears.onTextChange = this.onTextChange;
      contentScope.tbxMonths.onTextChange = this.onTextChange;
      contentScope.tbxDays.onTextChange = this.onTextChange;
      contentScope.tbxYears.onTouchStart = () => contentScope.tbxYears.skin = skins.textboxNormal;
      contentScope.tbxMonths.onTouchStart = () => contentScope.tbxMonths.skin = skins.textboxNormal;
      contentScope.tbxDays.onTouchStart = () => contentScope.tbxDays.skin = skins.textboxNormal;
      contentScope.btnCancel.onClick = () => scope.togglePopup('cancelRequest');
      contentScope.btnSubmit.onClick = this.validateDetails;
      contentScope.btnBackToDashboard.onClick = () => presenter.loadScreenWithContext({
        'context': 'lendingDashboard'
      });
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
      if (viewModel.rolloverRequestSuccess) {
        this.showAcknowledgement(viewModel.rolloverRequestSuccess);
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
      contentScope.flxRolloverDetails.setVisibility(true);
      contentScope.flxAcknowledgement.setVisibility(false);
      contentScope.flxLoanDropdown.setVisibility(false);
      contentScope.flxLoanDetails.setVisibility(false);
      contentScope.flxRolloverTerm.setVisibility(false);
      FormControllerUtility.disableButton(contentScope.btnSubmit);
      this.populateFacilityDropdown();
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'FacilityDropdown':
          selectedFacility = presenter.facilityRecords.filter(l => l.account === selectedKey)[0];
          this.popupalteLoans(selectedKey);
          break;
        case 'LoanDropdown':
          this.populateLoanDetails(selectedKey);
          break;
      }
    },
    /**
     * Populates the facility dropdown.
     */
    populateFacilityDropdown: function () {
      const facilityDropdownData = presenter.facilityRecords.reduce((acc, obj) => {
        acc[obj.account] = `${obj.shortTitle} / ${obj.account}`;
        return acc;
      }, {});
      contentScope.FacilityDropdown.setContext(facilityDropdownData);
      contentScope.FacilityDropdown.setDefaultText();
    },
    /**
     * Populates the loan dropdown.
     * @param {string} facilityId - Specifies the selected facility id.
     */
    popupalteLoans: function (facilityId) {
      const loans = presenter.loanRecords.filter(l => l.facilityId === facilityId);
      const loanDropdownData = loans.reduce((acc, obj) => {
        acc[obj.account] = `${obj.shortTitle} / ${obj.account}`;
        return acc;
      }, {});
      contentScope.LoanDropdown.setContext(loanDropdownData);
      contentScope.LoanDropdown.setDefaultText();
      contentScope.flxLoanDropdown.setVisibility(true);
    },
    /**
     * Populates the loan details.
     * @param {string} selectedKey - Specifies the selected loan id.
     */
    populateLoanDetails: function (loanId) {
      const selectedLoan = presenter.loanRecords.find(l => l.account === loanId);
      contentScope.flxLoanDetails.setVisibility(true);
      const currSymbol = presenter.configurationManager.getCurrency(selectedLoan.currency);
      let segLoanData = [{
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.loanAmountWithColon'),
        'lblValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedLoan.totalCommitment)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.mortgageAccount.UtilisedAmount'),
        'lblValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedLoan.utilisedCommitment)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.currentOutstandingAmountWithColon'),
        'lblValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedLoan.availableCommitment)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.wealth.statuswithColon'),
        'lblValue': selectedLoan.status
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
        'lblValue': presenter.formatUtilManager.getFormattedCalendarDate(selectedLoan.maturityDate),
      }];
      contentScope.segLoanDetails.setData(segLoanData);
      contentScope.flxRolloverTerm.setVisibility(true);
      contentScope.tbxYears.text = "";
      contentScope.tbxMonths.text = "";
      contentScope.tbxDays.text = "";
      contentScope.tbxYears.skin = skins.textboxNormal;
      contentScope.tbxMonths.skin = skins.textboxNormal;
      contentScope.tbxDays.skin = skins.textboxNormal;
    },
    /**
     * Handles textbox text change.
     */
    onTextChange: function () {
      const tbxWidgetId = arguments[0].id;
      contentScope[tbxWidgetId].text = contentScope[tbxWidgetId].text.replace(/^[^1-9]*|[\D]*$/g, '').substring(0, 4);
      if (!contentScope.tbxYears.text && !contentScope.tbxMonths.text && !contentScope.tbxDays.text) {
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
      const formData = {
        "facilityId": contentScope.FacilityDropdown.getSelectedKey(),
        "loanId": contentScope.LoanDropdown.getSelectedKey(),
        'rolloverDays': contentScope.tbxDays.text,
        'rolloverMonths': contentScope.tbxMonths.text,
        'rolloverYears': contentScope.tbxYears.text
      };
      return formData;
    },
    /**
     * Validates the details.
     */
    validateDetails: function () {
      const formData = scope.getFormData();
      let term = new Date();
      term.setHours(0, 0, 0, 0);
      formData['rolloverDays'] && term.setDate(term.getDate() + parseInt(formData['rolloverDays']));
      formData['rolloverMonths'] && term.setMonth(term.getMonth() + parseInt(formData['rolloverMonths']));
      formData['rolloverYears'] && term.setFullYear(term.getFullYear() + parseInt(formData['rolloverYears']));
      if (term > new Date(selectedFacility.maturityDate)) {
        formData['rolloverDays'] && (contentScope.tbxDays.skin = skins.textboxError);
        formData['rolloverMonths'] && (contentScope.tbxMonths.skin = skins.textboxError);
        formData['rolloverYears'] && (contentScope.tbxYears.skin = skins.textboxError);
        return;
      }
      this.togglePopup('submitRequest');
    },
    /**
     * Toggles the popup.
     * @param {string} flow - Specifies the flow.
     */
    togglePopup: function (flow) {
      let popupContext = {};
      switch (flow) {
        case 'cancelRequest':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
            'message': kony.i18n.getLocalizedString('i18n.TradeLending.cancelRolloverRequestMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.loadScreenWithContext({ 'context': 'lendingDashboard' })
          };
          break;
        case 'submitRequest':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.wealth.submit'),
            'message': kony.i18n.getLocalizedString('i18n.TradeLending.submitRolloverRequestMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.transfers.Cancel'),
            'yesText': kony.i18n.getLocalizedString('i18n.wealth.submit'),
            'yesClick': () => presenter.submitRolloverRequest(scope.getFormData(), scope.view.id)
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Shows the acknowledgement.
     * @param {object} response - Specifies the response.
     */
    showAcknowledgement: function (response) {
      contentScope.flxRolloverDetails.setVisibility(false);
      contentScope.flxAcknowledgement.setVisibility(true);
      contentScope.lblReferenceValue.text = response.rolloverRequestId || '';
      contentScope.forceLayout();
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
