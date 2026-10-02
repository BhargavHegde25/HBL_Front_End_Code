define(["TradeLendingUtils"], function (TLUtils) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O'
  };
  let scope, presenter, contentScope, popupScope, breakpoint, segDetailsData;
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
      this.showDetails();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setProgressTracker('step4');
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
      contentScope.btnSubmit.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.saveAndSubmit');
      contentScope.btnBackToDashboard.toolTip = kony.i18n.getLocalizedString('i18n.wealth.backtoDashboard');
      contentScope.btnCancel.onClick = () => scope.togglePopup({ 'context': 'cancelRequest' });
      contentScope.btnBack.onClick = () => presenter.showView({ 'form': 'frmDrawdownRequestStep3' });
      contentScope.btnSubmit.onClick = () => scope.togglePopup({ 'context': 'submitRequest' });
      contentScope.btnBackToDashboard.onClick = () => presenter.loadScreenWithContext({ 'context': 'lendingDashboard' });
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
      if (viewModel.drawdownRequestSuccess) {
        this.showAcknowledgement(viewModel.drawdownRequestSuccess);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },

    /**
     * Sets the progress tracker.
     * @param {string} currentKey - Specifies the current key.
     */
    setProgressTracker: function (currentKey) {
      let roadmapData = [];
      for (const [key, value] of Object.entries(presenter.drawdownRequest.roadmap)) {
        roadmapData.push({
          'isCurrentRow': key === 'step4' && currentKey === 'step4',
          'status': currentKey === 'step5' ? 'completed' : key === 'step4' ? 'inprogress' : presenter.drawdownRequest.data[key] || 'incomplete',
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
     * Returns the term value.
     * @param {object} data - specifies the data.
     * @returns {string} - Term value.
     */
    getTermValue: function (data) {
      let term = '';
      data.drawdownTermYears && (term += `${data.drawdownTermYears} ${kony.i18n.getLocalizedString(data.drawdownTermYears === '1' ? 'i18n.TradeLending.year' : 'i18n.TradeLending.years')} `);
      data.drawdownTermMonths && (term += `${data.drawdownTermMonths} ${kony.i18n.getLocalizedString(data.drawdownTermMonths === '1' ? 'i18n.AccountsDetails.month' : 'i18n.savingsPot.months')} `);
      data.drawdownTermDays && (term += `${data.drawdownTermDays} ${kony.i18n.getLocalizedString(data.drawdownTermDays === '1' ? 'i18n.TradeLending.day' : 'i18n.TradeFinance.days')}`);
      return term;
    },

    /**
     * Shows the details.
     */
    showDetails: function () {
      this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString('i18n.TradeLending.drawdownRequestConfirmation');
      const data = presenter.drawdownRequest.data;
      let segData = [];
      segData.push([{
        'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.drawdownRequestDetails')
      }, [{
        'flxMain': {
          'top': '15dp',
          'left': '20dp'
        },
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilityIDWithColon'),
        'lblValue': data.facilityId || ""
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilityAvailableLimitWithColon'),
        'lblValue': data.facilityAvailableLimit
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.facilityMaturityDateWithColon'),
        'lblValue': data.facilityMaturityDate
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.loanProductWithColon'),
        'lblValue': data.loanProduct
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.wealth.currencyColon'),
        'lblValue': data.currency
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.loanAmountWithColon'),
        'lblValue': `${presenter.configurationManager.getCurrency(data.currency)}${presenter.formatUtilManager.formatAmount(data.loanAmount)}`
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.termWithColon'),
        'lblValue': this.getTermValue(data)
      }]]);
      let customerDetails = [], i = 0;
      for (const record of data.customerDetails) {
        i++;
        customerDetails.push({
          'flxMain': {
            'left': '20dp',
            'top': '15dp'
          },
          'lblKey': {
            'text': `${kony.i18n.getLocalizedString('i18n.userManagement.Customer')} ${i}`,
            'skin': 'ICSknLbl42424215PX'
          }
        }, {
          'lblKey': kony.i18n.getLocalizedString('i18n.TradeFinance.customerNameWithColon'),
          'lblValue': record.customerName
        }, {
          'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.customerRoleWithColon'),
          'lblValue': record.customerRole
        });
      }
      segData.push([{
        'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.customerDetails')
      }, customerDetails]);
      let settlementDetails = [{
        'flxMain': {
          'left': '20dp',
          'top': '15dp',
        },
        'lblKey': {
          'text': kony.i18n.getLocalizedString('i18n.TradeLending.payInDetails'),
          'skin': 'sknSSPSemiBold42424215px'
        }
      }, {
        'flxMain': {
          'left': '20dp',
          'top': '15dp'
        },
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.creditAccountWithColon'),
        'lblValue': TLUtils.getAccountDisplayName(data.payInDetails[0].creditAccountId)
      }, {
        'flxMain': {
          'left': '20dp',
          'width': '95%',
          'skin': 'sknflxffffffBottomBorder',
          'height': '40dp'
        },
        'flxKey': {
          'width': '42%'
        },
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.accountCurrencyWithColon'),
        'lblValue': data.payInDetails[0].currency
      }, {
        'flxMain': {
          'left': '20dp',
          'top': '15dp'
        },
        'lblKey': {
          'text': kony.i18n.getLocalizedString('i18n.TradeLending.payOutDetails'),
          'skin': 'sknSSPSemiBold42424215px'
        }
      }, {
      'flxMain': {
          'left': '20dp',
          'top': '15dp'
        },
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.debitAccountWithColon'),
        'lblValue': TLUtils.getAccountDisplayName(data.payOutDetails[0].debitAccountId)
      }, {
        'lblKey': kony.i18n.getLocalizedString('i18n.TradeLending.accountCurrencyWithColon'),
        'lblValue': data.payOutDetails[0].currency
      }];
      segData.push([{
        'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.settlementDetails')
      }, settlementDetails]);
      segData.forEach((section, idx) => {
        section[0]['flxDetailsHeader'] = {
          'skin': 'ICSknFlxF8F7F8'
        };
        section[0]['flxDropdown'] = {
          'isVisible': true
        };
        section[0]['lblDropdownIcon'] = {
          'text': fontIcons.chevronUp
        };
        section[0]['btnAction'] = {
          'isVisible': true,
          'text': kony.i18n.getLocalizedString('i18n.accounts.edit'),
          'toolTip': kony.i18n.getLocalizedString('i18n.accounts.edit'),
          'onClick': function () {
            presenter.showView({
              'form': `frmDrawdownRequestStep${idx + 1}`
            });
          }
        };
        section[1].forEach(row => {
          if (!row.flxMain) {
            row.flxMain = {
              'left': '20dp'
            };
          }
        });
      });
      segDetailsData = segData;
      contentScope.flxDetails.setVisibility(true);
      contentScope.flxAcknowledgement.setVisibility(false);
      contentScope.segDetails.setData(segData);
      contentScope.forceLayout();
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
        case 'submitRequest':
          popupContext = {
            'heading': kony.i18n.getLocalizedString('i18n.wealth.submit'),
            'message': kony.i18n.getLocalizedString('i18n.TradeLending.submitDrawdownRequestMessage'),
            'noText': kony.i18n.getLocalizedString('i18n.common.no'),
            'yesText': kony.i18n.getLocalizedString('i18n.common.yes'),
            'yesClick': () => presenter.submitDrawdownRequest(scope.view.id)
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },
    /**
     * Toggles the section header.
     * @param {object} param - Specifes the params.
     */
    toggleSectionHeader: function ({ sectionIndex, rowIndex, segmentId }) {
      let newSegData = JSON.parse(JSON.stringify(contentScope.segDetails.data));
      if (newSegData[sectionIndex][0]['lblDropdownIcon']['text'] === fontIcons.chevronDown) {
        newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = fontIcons.chevronUp;
        newSegData[sectionIndex][1] = segDetailsData[sectionIndex][1];
      } else {
        newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = fontIcons.chevronDown;
        newSegData[sectionIndex][1] = [];
      }
      for (let i = 0; i < segDetailsData.length; i++) {
        if (newSegData[i][1].length > 0) {
          newSegData[i][1] = segDetailsData[i][1];
        }
      }
      segDetailsData[sectionIndex][0]['lblDropdownIcon']['text'] = newSegData[sectionIndex][0]['lblDropdownIcon']['text'];
      contentScope.segDetails.setData(newSegData);
    },
    /**
     * Shows the acknowledgement.
     * @param {object} response - Specifies the response.
     */
    showAcknowledgement: function (response) {
      this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString('i18n.TradeLending.drawdownRequestAcknowledgement');
      contentScope.flxDetails.setVisibility(false);
      contentScope.flxAcknowledgement.setVisibility(true);
      contentScope.lblReference.text = `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${response.drawdownRequestId}`;
      this.setProgressTracker('step5');
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