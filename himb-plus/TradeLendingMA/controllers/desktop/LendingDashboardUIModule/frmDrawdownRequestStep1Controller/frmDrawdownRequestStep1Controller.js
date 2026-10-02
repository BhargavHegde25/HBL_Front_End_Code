define(["FormControllerUtility"], function (FormControllerUtility) {
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
      (presenter.drawdownRequest.data.step1 !== 'completed') && this.resetForm();
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
      FormControllerUtility.disableTextbox(contentScope.tbxFacilityAvailableAmount);
      FormControllerUtility.disableTextbox(contentScope.tbxFacilityMaturityDate);
      contentScope.btnCancel.toolTip = kony.i18n.getLocalizedString('i18n.wealth.cancel');
      contentScope.btnSubmit.toolTip = kony.i18n.getLocalizedString('i18n.TradeFinance.SaveContinue');
      contentScope.tbxAmount.onTextChange = this.onTextChange;
      contentScope.tbxYears.onTextChange = this.onTextChange;
      contentScope.tbxMonths.onTextChange = this.onTextChange;
      contentScope.tbxDays.onTextChange = this.onTextChange;
      contentScope.tbxAmount.onTouchStart = () => contentScope.tbxAmount.skin = skins.textboxNormal;
      contentScope.tbxYears.onTouchStart = () => contentScope.tbxYears.skin = skins.textboxNormal;
      contentScope.tbxMonths.onTouchStart = () => contentScope.tbxMonths.skin = skins.textboxNormal;
      contentScope.tbxDays.onTouchStart = () => contentScope.tbxDays.skin = skins.textboxNormal;
      contentScope.btnCancel.onClick = () => scope.togglePopup({ 'context': 'cancelRequest' });
      contentScope.btnSubmit.onClick = this.validateAndSubmitDetails;
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
      contentScope.flxValidationError.setVisibility(false);
      contentScope.tbxFacilityAvailableAmount.text = "";
      contentScope.tbxFacilityMaturityDate.text = "";
      contentScope.tbxAmount.text = "";
      contentScope.tbxAmount.skin = skins.textboxNormal;
      contentScope.tbxYears.text = "";
      contentScope.tbxYears.skin = skins.textboxNormal;
      contentScope.tbxMonths.text = "";
      contentScope.tbxMonths.skin = skins.textboxNormal;
      contentScope.tbxDays.text = "";
      contentScope.tbxDays.skin = skins.textboxNormal;
      FormControllerUtility.disableButton(contentScope.btnSubmit);
      this.populateFacilityDropdown();
      contentScope.ValidationError.setHeading(kony.i18n.getLocalizedString('i18n.TradeLending.drawdownRequestDetailsValidationErrorMessage'));
    },
    /**
     * Sets the progress tracker.
     */
    setProgressTracker: function () {
      let roadmapData = [];
      for (const [key, value] of Object.entries(presenter.drawdownRequest.roadmap)) {
        roadmapData.push({
          'isCurrentRow': key === 'step1',
          'status': key === 'step1' ? 'inprogress' : presenter.drawdownRequest.data[key] || 'incomplete',
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
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'FacilityDropdown':
          selectedFacility = presenter.facilityRecords.filter(l => l.account === selectedKey)[0];
          contentScope.tbxFacilityAvailableAmount.text = `${presenter.configurationManager.getCurrency(selectedFacility.currency)}${presenter.formatUtilManager.formatAmount(selectedFacility.availableCommitment)}`;
          contentScope.tbxFacilityMaturityDate.text = presenter.formatUtilManager.getFormattedCalendarDate(selectedFacility.maturityDate);
          contentScope.LoanProductDropdown.setContext(selectedFacility.allowedLoanProducts || []);
          contentScope.LoanProductDropdown.setDefaultText();
          contentScope.CurrencyDropdown.setContext(selectedFacility.allowedCurrencies || []);
          contentScope.CurrencyDropdown.setDefaultText();
          delete presenter.drawdownRequest.data['step2'];
        case 'LoanProductDropdown':
        case 'CurrencyDropdown':
          this.enableOrDisableSubmitButton();
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
      contentScope.LoanProductDropdown.setContext([]);
      contentScope.LoanProductDropdown.setDefaultText();
      contentScope.CurrencyDropdown.setContext([]);
      contentScope.CurrencyDropdown.setDefaultText();
    },
    /**
     * Toggles the popup.
     * @param {object} param - Specifies the params.
     */
    togglePopup: function ({ context }) {
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
     * Returns the form data.
     * @returns {object} - Form data.
     */
    getFormData: function () {
      const formData = {
        'facilityId': contentScope.FacilityDropdown.getSelectedKey(),
        'facilityAvailableLimit': contentScope.tbxFacilityAvailableAmount.text,
        'facilityMaturityDate': contentScope.tbxFacilityMaturityDate.text,
        'loanProduct': contentScope.LoanProductDropdown.getSelectedKey(),
        'currency': contentScope.CurrencyDropdown.getSelectedKey(),
        'loanAmount': contentScope.tbxAmount.text,
        'drawdownTermDays': contentScope.tbxDays.text,
        'drawdownTermMonths': contentScope.tbxMonths.text,
        'drawdownTermYears': contentScope.tbxYears.text
      };
      return formData;
    },
    /**
     * Handles textbox text change.
     */
    onTextChange: function () {
      const tbxWidgetId = arguments[0].id;
      switch (tbxWidgetId) {
        case 'tbxAmount':
          contentScope[tbxWidgetId].text = contentScope[tbxWidgetId].text.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1').replace(/^(\d+\.\d{2}).*$/, '$1');
          break;
        case 'tbxDays':
        case 'tbxMonths':
        case 'tbxYears':
          contentScope[tbxWidgetId].text = contentScope[tbxWidgetId].text.replace(/^[^1-9]*|[\D]*$/g, '').substring(0, 4);
          break;
      }
      this.enableOrDisableSubmitButton();
    },
    /**
     * Toggles the submit button.
     */
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      if (!formData['facilityId'] || !formData['loanProduct'] || !formData['currency'] || !formData['loanAmount'] || !(formData['drawdownTermDays'] || formData['drawdownTermMonths'] || formData['drawdownTermYears'])) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
        return;
      }
      FormControllerUtility.enableButton(contentScope.btnSubmit);
    },
    /**
     * Validates and submits the details.
     */
    validateAndSubmitDetails: function () {
      const formData = scope.getFormData();
      let errors = [];
      if (parseFloat(formData['loanAmount']) > parseFloat(selectedFacility.availableCommitment)) {
        contentScope.tbxAmount.skin = skins.textboxError;
        errors.push(kony.i18n.getLocalizedString('i18n.TradeLending.loanFacilityAmountErrorMessage'));
      }
      let term = new Date();
      term.setHours(0, 0, 0, 0);
      formData['drawdownTermDays'] && term.setDate(term.getDate() + parseInt(formData['drawdownTermDays']));
      formData['drawdownTermMonths'] && term.setMonth(term.getMonth() + parseInt(formData['drawdownTermMonths']));
      formData['drawdownTermYears'] && term.setFullYear(term.getFullYear() + parseInt(formData['drawdownTermYears']));
      if (term > new Date(selectedFacility.maturityDate)) {
        formData['drawdownTermDays'] && (contentScope.tbxDays.skin = skins.textboxError);
        formData['drawdownTermMonths'] && (contentScope.tbxMonths.skin = skins.textboxError);
        formData['drawdownTermYears'] && (contentScope.tbxYears.skin = skins.textboxError);
        errors.push(kony.i18n.getLocalizedString('i18n.TradeLending.loanFacilityTermErrorMessage'));
      }
      if (errors.length) {
        contentScope.flxValidationError.setVisibility(true);
        contentScope.ValidationError.setErrors(errors);
      } else {
        contentScope.flxValidationError.setVisibility(false);
        presenter.storeDrawdownRequestDetails('step1', formData);
      }
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
