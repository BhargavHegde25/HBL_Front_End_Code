define(["FormControllerUtility"], function (FormControllerUtility) {
  let scope, presenter, contentScope, popupScope, breakpoint,
    widgetConfig, widgetIndex, currWidgetId;
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
      (presenter.drawdownRequest.data.step2 !== 'completed') && this.resetForm();
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
      [
        contentScope.flxAddMore
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.btnCancel.toolTip = kony.i18n.getLocalizedString('i18n.wealth.cancel');
      contentScope.btnBack.toolTip = kony.i18n.getLocalizedString('i18n.wealth.back');
      contentScope.btnSubmit.toolTip = kony.i18n.getLocalizedString('i18n.TradeFinance.SaveContinue');
      contentScope.flxAddMore.onClick = this.addWidgetInstance;
      contentScope.btnCancel.onClick = () => scope.togglePopup({ 'context': 'cancelRequest' });
      contentScope.btnBack.onClick = () => presenter.showView({ 'form': 'frmDrawdownRequestStep1' });
      contentScope.btnSubmit.onClick = () => {
        const formData = scope.getFormData();
        presenter.storeDrawdownRequestDetails('step2', formData);
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
      widgetIndex = 0;
      const selectedFacility = presenter.facilityRecords.filter(l => l.account === presenter.drawdownRequest.data.facilityId)[0];
      widgetConfig = {
        'customers': (selectedFacility.allowedCustomers || []).reduce((acc, obj) => {
          acc[obj.customerId] = obj.customerName;
          return acc;
        }, {}),
        'roles': presenter.customerRoles
      };
      this.toggleAddMore(false);
      contentScope.flxDetails.removeAll();
      this.addWidgetInstance();
    },
    /**
     * Sets the progress tracker.
     */
    setProgressTracker: function () {
      let roadmapData = [];
      for (const [key, value] of Object.entries(presenter.drawdownRequest.roadmap)) {
        roadmapData.push({
          'isCurrentRow': key === 'step2',
          'status': key === 'step2' ? 'inprogress' : presenter.drawdownRequest.data[key] || 'incomplete',
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
     * Toggles the Add More option.
     * @param {boolean} flag - Specifes whether to enable/disable Add More option.
     */
    toggleAddMore: function (flag) {
      if (flag) {
        contentScope.flxAddMore.skin = 'sknFlxBgFFFFFFBr003e75Rad3px';
        contentScope.lblAddMore.skin = 'sknLbl29327615px';
      } else {
        contentScope.flxAddMore.skin = 'sknFlxfbfbfbBorder1pxe3e3e3Radius4px';
        contentScope.lblAddMore.skin = 'sknSSP72727215Px';
      }
      contentScope.flxAddMore.setEnabled(flag);
    },
    /**
     * Add customer details widget instance.
     */
    addWidgetInstance: function () {
      widgetIndex++;
      currWidgetId = `Customer${widgetIndex}`;
      this.collapseWidgets();
      const customerWidget = new com.InfinityOLB.TradeLending.CustomerDetails({
        'clipBounds': false,
        'id': currWidgetId,
        'isVisible': true,
        'top': '20dp',
        'zIndex': 200 - widgetIndex,
        'appName': 'TradeLendingMA',
        'masterType': constants.MASTER_TYPE_DEFAULT
      }, {}, {});
      const widgets = contentScope.flxDetails.widgets();
      let newWidgetConfig = JSON.parse(JSON.stringify(widgetConfig)), isBorrowerSelected = false;
      for (const widget of widgets) {
        delete newWidgetConfig.customers[widget.CustomerDropdown.getSelectedKey()];
        isBorrowerSelected = widget.RoleDropdown.getSelectedKey() === 'Borrower';
      }
      if (isBorrowerSelected) {
        newWidgetConfig.roles = newWidgetConfig.roles.filter(r => r !== 'Borrower');
      }
      contentScope.flxDetails.add(customerWidget);
      customerWidget.setContext(newWidgetConfig);
      this.toggleAddMore(false);
      this.setWidgetsHeading();
      FormControllerUtility.disableButton(contentScope.btnSubmit);
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      contentScope[currWidgetId].handleDropdownSelection(widgetId, selectedKey);
      if (widgetId === 'CustomerDropdown') {
        this.updateCustomerDropdowns();
      }
      if (widgetId === 'RoleDropdown') {
        this.updateRoleDropdowns();
      }
    },
    /**
     * Collapses the invoice widgets.
     * @param {string} widgetId - Specifies the invoice widget id.
     */
    collapseWidgets: function (widgetId = currWidgetId) {
      const widgets = contentScope.flxDetails.widgets();
      for (const widget of widgets) {
        if (widget.id === widgetId) continue;
        widget.toggleDropdown(true);
      }
    },
    /**
     * Sets the invoice widget instances heading.
     */
    setWidgetsHeading: function () {
      const widgets = contentScope.flxDetails.widgets();
      if (widgets.length === 0) {
        this.toggleAddMore(true);
      }
      const showDelete = widgets.length > 1;
      widgets.forEach((widget, idx) => widget.setHeading(idx + 1, showDelete));
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
        case 'deleteCustomerWidget':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Delete'),
            'message': kony.i18n.getLocalizedString('i18n.TradeFinance.deletePopupMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => {
              contentScope.flxDetails.remove(contentScope[widgetId]);
              this.setWidgetsHeading();
              this.enableOrDisableSubmitButton();
              this.updateCustomerDropdowns();
              this.updateRoleDropdowns();
            }
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Toggles the submit button.
     */
    enableOrDisableSubmitButton: function () {
      const widgets = contentScope.flxDetails.widgets();
      for (const widget of widgets) {
        if (!widget.CustomerDropdown.getSelectedKey() || !widget.RoleDropdown.getSelectedKey()) {
          FormControllerUtility.disableButton(contentScope.btnSubmit);
          return;
        }
      }
      this.toggleAddMore(widgets.length < Object.keys(widgetConfig.customers).length);
      FormControllerUtility.enableButton(contentScope.btnSubmit);
    },
    /**
     * Returns the form data.
     * @returns {object} - Form data.
     */
    getFormData: function () {
      let customers = [];
      const widgets = contentScope.flxDetails.widgets();
      for (const widget of widgets) {
        customers.push({
          'customerId': widget.CustomerDropdown.getSelectedKey(),
          'customerName': widget.CustomerDropdown.getSelectedValue(),
          'customerRole': widget.RoleDropdown.getSelectedKey()
        });
      }
      return {
        'customerDetails': customers
      };
    },
    /**
     * Updates the customer dropdown.
     */
    updateCustomerDropdowns: function () {
      const widgets = contentScope.flxDetails.widgets();
      let unselectedCustomers = JSON.parse(JSON.stringify(widgetConfig.customers));
      for (const widget of widgets) {
        delete unselectedCustomers[widget.CustomerDropdown.getSelectedKey()];
      }
      for (const { CustomerDropdown } of widgets) {
        const id = CustomerDropdown.getSelectedKey();
        if (id) {
          CustomerDropdown.setContext({
            [id]: widgetConfig.customers[id],
            ...unselectedCustomers
          });
          const idx = CustomerDropdown.segList.data.findIndex(r => r.key === id);
          CustomerDropdown.segList.selectedRowIndex = [0, idx];
          CustomerDropdown.lblValue.skin = 'sknLblSSP15pxtrucation';
          CustomerDropdown.lblValue.text = widgetConfig.customers[id];
          CustomerDropdown.lblValue.toolTip = widgetConfig.customers[id];
        } else {
          CustomerDropdown.setContext(unselectedCustomers);
        }
      }
    },
    /**
     * Updates the role dropdowns.
     */
    updateRoleDropdowns: function () {
      const widgets = contentScope.flxDetails.widgets();
      let roleConfig = JSON.parse(JSON.stringify(widgetConfig.roles));
      for (const widget of widgets) {
        if (widget.RoleDropdown.getSelectedKey() === 'Borrower') {
          roleConfig = roleConfig.filter(r => r !== 'Borrower');
        }
      }
      for (const { RoleDropdown } of widgets) {
        const id = RoleDropdown.getSelectedKey();
        if (id !== 'Borrower') {
          RoleDropdown.setContext(roleConfig);
          const idx = RoleDropdown.segList.data.findIndex(r => r.key === id);
          RoleDropdown.segList.selectedRowIndex = [0, idx];
          RoleDropdown.lblValue.skin = 'sknLblSSP15pxtrucation';
          RoleDropdown.lblValue.text = id;
          RoleDropdown.lblValue.toolTip = id;
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
  };
});