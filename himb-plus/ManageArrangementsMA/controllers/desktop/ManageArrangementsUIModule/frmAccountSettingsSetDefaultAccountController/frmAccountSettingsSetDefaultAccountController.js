define("ManageArrangementsMA/ManageArrangementsUIModule/userfrmAccountSettingsSetDefaultAccountController", ["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  var defaultPrimaryAccId;
  return {
    defaultNames: {},
    enableSeparateContact: false,
    selectedFlowRowClick : "",
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.isLoading !== undefined) {
            this.changeProgressBarState(viewModel.isLoading);
          }
          if (viewModel.getAccountsList) {
            this.showAccountsList(viewModel.getAccountsList);
          }
        }
      }
      this.view.lblDefaultTransactionAccounttHeading.setActive(true);
    },
    init: function() {
      this.view.preShow = this.preshow;
      this.view.postShow = this.postshow;
      this.setFlowActions();
    },
    preshow: function() {
      var self = this;
      this.view.flxRight.setVisibility(true);
      self.view.flxLoanPayment.setVisibility(false);
      this.view.lblBillPayKey.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BillPay");
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.flxBillPaySelectedValue.onKeyPress = this.onKeyPressCallBack;
      // this.view.flxCheckDepositSelectedValue.onKeyPress = this.onKeyPressCallBack;
      this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Set Default Account");
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
      this.view.lblCollapseMobile.text = "O";
	  this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
         "a11yARIA": {
           "tabindex": 0,
           "role": "button",
           "aria-expanded": false,
           "aria-labelledby": "lblAccountSettingsMobile"
         }
       };
      this.view.customheadernew.activateMenu("Settings", "Account Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("ACCOUNTSETTINGS", "Set Default Account");
      this.setSelectedValue("i18n.ProfileManagement.SetDefaultAccount");
      this.setAccessibility();
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
	  this.view.lblDefaultTransactionAccountWarning.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.PleaseChooseTheDefaultAccounts");
      this.view.lblTransfersKey.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Transfers");
      this.view.lblBillPayKey.text = kony.i18n.getLocalizedString("kony.olb.settings.BillPayment");
      this.view.lblOpenFixedDepositKey.text = kony.i18n.getLocalizedString("kony.olb.settings.OpenFixedDeposit");
      this.view.lblLoanPaymentKey.text = kony.i18n.getLocalizedString("kony.olb.settings.loanPayment");
      this.view.lblCardPaymentKey.text = kony.i18n.getLocalizedString("kony.olb.settings.cardPayment");
      this.view.lblCheckManagementKey.text = kony.i18n.getLocalizedString("kony.olb.settings.checkManagement");
      this.view.lblPrimaryAccountKey.text = kony.i18n.getLocalizedString("kony.olb.settings.accountsDashboard");
      this.view.lblLoadeSewaKey.text ="Load eSewa:";
      /*this.view.imgDefaultTransactionAccountWarning.accessibilityConfig = {
                  "a11yARIA": 
                  {
                      "tabindex" : -1
                  }
              };  */
        this.view.customheadernew.btnSkipNav.onClick = function(){
          self.view.lblContentHeader.setActive(true);
        };   
        this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
      this.view.forceLayout();
    },
 
     onKeyPressCallBack: function(eventObject, eventPayload) {
       var self = this;
       if (eventPayload.keyCode === 27) {
           if (self.view.flxLogout.isVisible === true) {
               self.view.flxLogout.isVisible = false;
               self.view.flxDialogs.setVisibility(false);
               self.view.customheadernew.btnLogout.setFocus(true); 
           }
           if (self.view.flxBillPayAccounts.isVisible === true) {
               self.closeBillPayDropdown();
               self.view.flxBillPaySelectedValue.setActive(true);
           }
           if (self.view.flxCheckDepositAccounts.isVisible === true) {
               self.closeCheckDepositDropdown();
               self.view.flxCheckDepositSelectedValue.setActive(true);
           }
 
       }
       if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
         if (self.view.flxCheckDepositAccounts.isVisible === true || self.view.flxBillPayAccounts.isVisible === true) {
           self.closeBillPayDropdown();
           self.closeCheckDepositDropdown();
         }
       }
 
   },
   
    postshow : function(){
      this.view.flxbtnSeperator.setVisibility(false);
      this.view.flxPrimaryAccount.height="40px";
      this.view.flxContainer.skin="slFbox";
      this.view.flxDefaultPrimaryAccountsContainer.height="125px";
      this.view.flxRight.height="700px";
      this.view.flxLoadeSewaSelectedValue.skin="slFbox";
      this.view.flxLoadeSewa.zIndex=1;
      this.view.flxLoadeSewaAccountInfo.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.flxLoadeSewaAccounts.skin="sknFlxffffffBorderRounded";
      this.view.flxPrimaryAccountInfo.skin = "sknFlxBgHeaderbackgroundwhite";
      this.view.flxPrimaryAccountSelectedValue.skin = "slFbox";
      this.view.flxPrimaryAccounts.skin = "sknFlxffffffBorderRounded";
      this.view.flxTransfersAccountInfo.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.flxTransfersSelectedValue.skin="slFbox";
      this.view.flxTransfersAccounts.skin="sknFlxffffffBorderRounded";
      this.view.flxBillPayAccountInfo.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.flxBillPaySelectedValue.skin="slFbox";
      this.view.flxBillPayAccounts.skin="sknFlxffffffBorderRounded";
      this.view.flxOpenFixedDepositAccountInfo.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.flxOpenFixedDepositSelectedValue.skin="slFbox";
      this.view.flxOpenFixedDepositAccounts.skin="sknFlxffffffBorderRounded";
      this.view.flxCardPaymentAccountInfo.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.flxCardPaymentSelectedValue.skin="slFbox";
      this.view.flxCardPaymentAccounts.skin="sknFlxffffffBorderRounded";
      this.view.flxCheckManagementAccountInfo.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.flxCheckManagementSelectedValue.skin="slFbox";
      this.view.flxCheckManagementAccounts.skin="sknFlxffffffBorderRounded";
      //this.view.flxPrimaryAccountSelectedValue.hoverSkin="sknSegAccountHover";
      this.view.flxMain.skin="flxWhite";
      this.view.lblContentHeader.skin="sknLbl851a1cPx20";
      this.view.lblDefaultPrimaryAccounttHeading.skin="sknSSPSemiBold42424215px";
      this.view.lblDefaultTransactionAccounttHeading.skin="sknSSPSemiBold42424215px";
      this.view.flxSettingsContainer.skin="sknFlxffffffBorderRounded";
      this.view.btnDefaultTransactionAccountSave.skin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnDefaultTransactionAccountSave.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnDefaultTransactionAccountSave.focusSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnDefaultTransactionAccountCancel.skin="sknBtnBorderPx2eaebf1";
      this.view.btnDefaultTransactionAccountCancel.hoverSkin="SknbtnroundcornerA51C306pxradius";
      this.view.btnDefaultTransactionAccountCancel.focusSkin="sknBtnBorderPx2eaebf1";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.lblDefaultTransactionAccounttHeading.setActive(true);
      this.view.lblLoadeSewaKey.text ="Load eSewa:";
    },
    showServerError: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.lblDefaultTransactionAccountWarning.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
    },
    /**
         *  Method to set the Accessibility configurations
         */
    setAccessibility: function() {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.customheadernew.lblHeaderMobile.text =  kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateSettingAndPreferences");
      //CommonUtilities.setText(this.view.lblDefaultTransactionAccounttHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.DefaultTransactionAccounts"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblDefaultTransactionAccountWarning, kony.i18n.getLocalizedString("i18n.ProfileManagement.PleaseChooseTheDefaultAccounts"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblTransfersKey, kony.i18n.getLocalizedString("i18n.profilemanagement.Transfers"), accessibilityConfig);
      CommonUtilities.setText(this.view.lblBillPayKey, kony.i18n.getLocalizedString("kony.olb.settings.BillPayment"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblPayAPersonKey, kony.i18n.getLocalizedString("i18n.profilemanagement.Payaperson"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblCheckDepositKey, kony.i18n.getLocalizedString("i18n.profilemanagement.CheckDeposit"), accessibilityConfig); 
      CommonUtilities.setText(this.view.btnDefaultTransactionAccountSave, kony.i18n.getLocalizedString("i18n.ProfileManagement.Save"), CommonUtilities.getaccessibilityConfig());
      CommonUtilities.setText(this.view.btnDefaultTransactionAccountCancel, kony.i18n.getLocalizedString('i18n.transfers.Cancel'), CommonUtilities.getaccessibilityConfig());
	  this.view.lblContentHeader.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblDefaultTransactionAccounttHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.lblBillPayAccountsDropdown.accessibilityConfig = {
             "a11yLabel":kony.i18n.getLocalizedString("i18n.profilemanagement.viewMyAccounts"),
             "a11yHidden": true          
      };
      this.view.lblOpenFixedDepositAccountsDropdown.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.profilemanagement.viewMyAccounts"),
             "a11yHidden": true          
      };
      this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yHidden": true
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "role":"button",
        "aria-expanded": false,
        "aria-labelledby": "lblAccountSettingsMobile"
      };
      this.view.imgDefaultTransactionAccountWarning.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.lblDefaultTransactionAccounttHeading.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblDefaultTransactionAccountWarning.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblDefaultPrimaryAccounttHeading.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblDefaultPrimaryAccountWarning.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblTransfersKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblTransfersValue.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblBillPayKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblBillPayValue.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblOpenFixedDepositKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblOpenFixedDepositValue.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblLoanPaymentKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblLoanPaymentValue.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblCardPaymentKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblCardPaymentValue.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblCheckManagementKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblCheckManagementValue.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblPrimaryAccountKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblPrimaryAccountValue.accessibilityConfig = {
        "a11yLabel": ""
      };
    },
    /* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
    setSelectedValue: function(text) {
      var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text), CommonUtilities.getaccessibilityConfig());
	},
    /**
         * Method to show the list of accounts
         * @param {Object} viewModel Model containing list of accounts related to transactions
         */
    showAccountsList: function(viewModel) {
      this.defaultPrimaryAccId = viewModel.defaultPrimaryAccounts;
      this.defaultNames = viewModel.defaultNames;
      this.view.flxTransfersSelectedValue.setVisibility(true);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.flxTransfersSelectedValue.onClick = this.onTransfersClick.bind(this);
      this.setTransfersAccountsData(viewModel.TransfersAccounts, viewModel.defaultTransfersAccounts);
      this.view.flxBillPaySelectedValue.setVisibility(true);
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.flxBillPaySelectedValue.onClick = this.onBillPayClick.bind(this);
      this.setBillPayAccountsData(viewModel.BillPayAccounts, viewModel.defaultBillPayAccounts);
      this.view.flxOpenFixedDepositSelectedValue.setVisibility(true);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.flxOpenFixedDepositSelectedValue.onClick = this.onOpenFixedDepositClick.bind(this);
      this.setOpenFixedDepositAccountsData(viewModel.OpenFixedDepositAccounts, viewModel.defaultOpenFixedDepositAccounts);
      this.view.flxLoanPaymentSelectedValue.setVisibility(true);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.flxLoanPaymentSelectedValue.onClick = this.onLoanPaymentClick.bind(this);
      this.setLoanPaymentAccountsData(viewModel.LoanPaymentAccounts, viewModel.defaultLoanPaymentAccounts);
      this.view.flxCardPaymentSelectedValue.setVisibility(true);
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
      this.view.flxCardPaymentSelectedValue.onClick = this.onCardPaymentClick.bind(this);
      this.setCardPaymentAccountsData(viewModel.CardPaymentAccounts, viewModel.defaultCardPaymentAccounts);
      this.view.flxCheckManagementSelectedValue.setVisibility(true);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
      this.view.flxCheckManagementSelectedValue.onClick = this.onCheckManagementClick.bind(this);
      this.setCheckManagementAccountsData(viewModel.CheckManagementAccounts, viewModel.defaultCheckManagementAccounts);
       this.view.flxLoadeSewaSelectedValue.setVisibility(true);
            this.view.lblLoadeSewaAccountsDropdown.text = "O";
            this.view.flxLoadeSewaAccounts.setVisibility(false);
            this.view.flxLoadeSewaSelectedValue.onClick = this.onLoadeSewaClick.bind(this);
            this.setLoadeSewaAccountsData(viewModel.LoadeSewaAccounts, viewModel.defaultLoadeSewaAccounts);
      this.view.flxPrimaryAccountSelectedValue.setVisibility(true);
      //this.view.flxPrimaryAccountSelectedValue.skin="sknFlxBgHeaderbackgroundwhite";
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
      this.view.flxPrimaryAccountSelectedValue.onClick = this.onPrimaryClick.bind(this);
      this.setPrimaryAccountsData(viewModel.PrimaryAccounts, viewModel.defaultPrimaryAccounts);
      this.defaultTransfersAccounts = viewModel.defaultTransfersAccounts;
      this.defaultBillPayAccounts = viewModel.defaultBillPayAccounts;
      this.defaultOpenFixedDepositAccounts = viewModel.defaultOpenFixedDepositAccounts;
      this.defaultLoanPaymentAccounts = viewModel.defaultLoanPaymentAccounts;
      this.defaultCardPaymentAccounts = viewModel.defaultCardPaymentAccounts;
      this.defaultCheckManagementAccounts = viewModel.defaultCheckManagementAccounts;
      this.defaultPrimaryAccounts = viewModel.defaultPrimaryAccounts;
      if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultTransferAccount)) 
		  this.view.lblTransfersAccountName.text = viewModel.defaultNames.defaultTransferAccount + '-XXXX' + viewModel.defaultTransfersAccounts.slice(-4);
      else {
		  if(!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount))
			  this.view.lblTransfersAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		  else
			  this.view.lblTransfersAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
	  }
      
	  if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultBillPayAccount)) 
		  this.view.lblBillPayAccountName.text = viewModel.defaultNames.defaultBillPayAccount + '-XXXX' + viewModel.defaultBillPayAccounts.slice(-4);
      else {
		  if(!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount))
			  this.view.lblBillPayAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		  else
			  this.view.lblBillPayAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
	  }
      
	  if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultOpenFixedDepositAccount)) 
		  this.view.lblOpenFixedDepositAccountName.text = viewModel.defaultNames.defaultOpenFixedDepositAccount + '-XXXX' + viewModel.defaultOpenFixedDepositAccounts.slice(-4);
      else  {
		  if(!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount))
			  this.view.lblOpenFixedDepositAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		  else
			  this.view.lblOpenFixedDepositAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
	  }
      
	  if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultCardPaymentAccount)) 
		  this.view.lblCardPaymentAccountName.text = viewModel.defaultNames.defaultCardPaymentAccount + '-XXXX' + viewModel.defaultCardPaymentAccounts.slice(-4);
      else {
		  if(!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount))
			  this.view.lblCardPaymentAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		  else
			  this.view.lblCardPaymentAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
	  }
      
	  if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultLoanPaymentAccount)) 
		  this.view.lblLoanPaymentAccountName.text = viewModel.defaultNames.defaultLoanPaymentAccount + '-XXXX' + viewModel.defaultLoanPaymentAccounts.slice(-4);
      else {
		  if(!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount))
			  this.view.lblLoanPaymentAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		  else
			  this.view.lblLoanPaymentAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
	  }
      
	  if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultCheckManagementAccount)) 
		  this.view.lblCheckManagementAccountName.text = viewModel.defaultNames.defaultCheckManagementAccount + '-XXXX' + viewModel.defaultCheckManagementAccounts.slice(-4);
      else {
		  if(!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount))
			  this.view.lblCheckManagementAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		  else
			  this.view.lblCheckManagementAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
	  }

    if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultLoadeSewaAccount)) this.view.lblLoadeSewaAccountName.text = viewModel.defaultNames.defaultLoadeSewaAccount + '-XXXX' + viewModel.defaultLoadeSewaAccounts.slice(-4);
            else {
                if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount)) this.view.lblLoadeSewaAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
                else this.view.lblLoadeSewaAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
            }
      
	    var navManager = applicationManager.getNavigationManager();
		var latestPrimary = navManager.getCustomInfo("latestDefaultPrimary");
		if (latestPrimary && latestPrimary.accountID && latestPrimary.accountName) {
			this.view.lblPrimaryAccountName.text = latestPrimary.accountName;
		} else if (!this.isEmptyNullOrUndefined(viewModel.defaultNames.defaultPrimaryAccount)) {
			this.view.lblPrimaryAccountName.text = viewModel.defaultNames.defaultPrimaryAccount + '-XXXX' + viewModel.defaultPrimaryAccounts.slice(-4);
		} else {
			this.view.lblPrimaryAccountName.text = kony.i18n.getLocalizedString("i18n.common.none");
		}
      
	  this.view.lblTransfersAccountIcon.text = this.view.lblTransfersIcon.text;
      this.view.lblBillPayAccountIcon.text = this.view.lblBillPayIcon.text;
      this.view.lblOpenFixedDepositAccountIcon.text = this.view.lblOpenFixedDepositIcon.text; 
      this.view.lblLoanPaymentAccountIcon.text = this.view.lblLoanPaymentIcon.text;
      this.view.lblCardPaymentAccountIcon.text = this.view.lblCardPaymentIcon.text;
      this.view.lblCheckManagementAccountIcon.text = this.view.lblCheckManagementIcon.text;
      this.view.lblPrimaryAccountIcon.text = this.view.lblPrimaryIcon.text;			
      this.closeBillPayDropdown();
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
         * Method to get account in Format AccountName-XXXX1234
         * @param {JSON} fromAccount Account information
         * @returns Array with account id and display name in format AccountName-XXXX1234
         */
    generateFromAccounts: function(fromAccount) {
      var getAccountDisplayName = function(fromAccount) {
        return fromAccount.accountName + '-XXXX' + fromAccount.accountID.slice(-4);
      };
      return [fromAccount.accountID, getAccountDisplayName(fromAccount)];
    },
    onTransfersClick: function() {
      var self = this;
      if (self.view.lblTransfersAccountsDropdown.text === "P") {
        self.view.lblTransfersAccountsDropdown.text = "O";
      } else {
        self.view.lblTransfersAccountsDropdown.text = "P"
      }
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.flxTransfersAccounts.setVisibility(!this.view.flxTransfersAccounts.isVisible);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
    },
    onBillPayClick: function() {
      var self = this;
      if (self.view.lblBillPayAccountsDropdown.text === "P") {
        self.view.lblBillPayAccountsDropdown.text = "O";
        // self.closeBillPayDropdown();
      } else {
        self.view.lblBillPayAccountsDropdown.text = "P"
        self.view.flxBillPaySelectedValue.accessibilityConfig = {
          "a11yARIA": {
              "tabindex": 0,
                        "role": "combobox",
                        "aria-expanded": true,
                        "aria-label": self.view.lblBillPayKey.text,
                        "aria-haspopup": true,
                        "aria-controls": "flxBillPayAccounts"
      }
                };
            }
      this.view.flxBillPayAccounts.setVisibility(!this.view.flxBillPayAccounts.isVisible);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
      //self.closeOpenFixedDepositAccountsDropdown();
    },
    onOpenFixedDepositClick: function() {
      var self = this;
      if (self.view.lblOpenFixedDepositAccountsDropdown.text === "P") {
        self.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      } else {
        self.view.lblOpenFixedDepositAccountsDropdown.text = "P"
        self.view.flxOpenFixedDepositSelectedValue.accessibilityConfig = {
          "a11yARIA": {
              "tabindex": 0,
                        "role": "combobox",
                        "aria-expanded": true,
                        "aria-label": self.view.lblOpenFixedDepositKey.text,
                        "aria-haspopup": true,
                        "aria-controls": "flxCheckDepositAccounts"
      }
		} 
  };
      this.view.flxOpenFixedDepositAccounts.setVisibility(!this.view.flxOpenFixedDepositAccounts.isVisible);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
	  },
      
    onCardPaymentClick: function() {
      var self = this;
      if (self.view.lblCardPaymentAccountsDropdown.text === "P") {
        self.view.lblCardPaymentAccountsDropdown.text = "O";
      } else {
        self.view.lblCardPaymentAccountsDropdown.text = "P"
      }
      this.view.flxCardPaymentAccounts.setVisibility(!this.view.flxCardPaymentAccounts.isVisible);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
    },
    onLoanPaymentClick: function() {
      var self = this;
      if (self.view.lblLoanPaymentAccountsDropdown.text === "P") {
        self.view.lblLoanPaymentAccountsDropdown.text = "O";
      } else {
        self.view.lblLoanPaymentAccountsDropdown.text = "P"
      }
      this.view.flxLoanPaymentAccounts.setVisibility(!this.view.flxLoanPaymentAccounts.isVisible);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
    },
    onCheckManagementClick: function() {
      var self = this;
      if (self.view.lblCheckManagementAccountsDropdown.text === "P") {
        self.view.lblCheckManagementAccountsDropdown.text = "O";
      } else {
        self.view.lblCheckManagementAccountsDropdown.text = "P"
      }
      this.view.flxCheckManagementAccounts.setVisibility(!this.view.flxCheckManagementAccounts.isVisible);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
    },
    onLoadeSewaClick: function() {
            var self = this;
            if (self.view.lblLoadeSewaAccountsDropdown.text === "P") {
                self.view.lblLoadeSewaAccountsDropdown.text = "O";
            } else {
                self.view.lblLoadeSewaAccountsDropdown.text = "P"
            }
            this.view.flxLoadeSewaAccounts.setVisibility(!this.view.flxLoadeSewaAccounts.isVisible);
            this.view.lblTransfersAccountsDropdown.text = "O";
            this.view.flxTransfersAccounts.setVisibility(false);
            this.view.lblBillPayAccountsDropdown.text = "O";
            this.view.flxBillPayAccounts.setVisibility(false);
            this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
            this.view.flxOpenFixedDepositAccounts.setVisibility(false);
            this.view.lblCardPaymentAccountsDropdown.text = "O";
            this.view.flxCardPaymentAccounts.setVisibility(false);
            this.view.lblLoanPaymentAccountsDropdown.text = "O";
            this.view.flxLoanPaymentAccounts.setVisibility(false);
            this.view.lblPrimaryAccountsDropdown.text = "O";
            this.view.flxPrimaryAccounts.setVisibility(false);
            this.view.lblCheckManagementAccountsDropdown.text = "O";
            this.view.flxCheckManagementAccounts.setVisibility(false);
        },
    onPrimaryClick: function() {
      var self = this;
      if (self.view.lblPrimaryAccountsDropdown.text === "P") {
        self.view.lblPrimaryAccountsDropdown.text = "O";
        this.view.flxPrimaryAccount.height="40px";
        this.view.flxDefaultPrimaryAccountsContainer.height="125px";
        this.view.flxRight.height="700px";
      } else {
        self.view.lblPrimaryAccountsDropdown.text = "P"
        this.view.flxPrimaryAccount.height="140px";
        this.view.flxDefaultPrimaryAccountsContainer.height="225px";
        this.view.flxRight.height="795px";
      }
      this.view.flxPrimaryAccounts.setVisibility(!this.view.flxPrimaryAccounts.isVisible);
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
    },
	isEmptyNullOrUndefined : function(val){
		if(val !== undefined && val !== "" && val !== null && val !== "None")
			return false
		else
			return true;
	},
    setTransfersAccountsData: function(accountsInp, defaultTransfersAccountNum) {
      var filterList = function(input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      }; 
		  
      var accounts = filterList(accountsInp);
      var self = this;
      var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      let isViewOnlyUser = applicationManager.getConfigurationManager().checkUserFeature("VIEW_ONLY_ROLE");
      var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
      };
      this.transfersAccounts = accounts;
      var transfersAccountswithPermission = [];
      if (accounts != "") {
        accounts.forEach(function(account) {
          // if(account.actions.indexOf("\"BILL_PAY_CREATE\"")>0){
            if(account.supportTransferFrom == "1" ){
                transfersAccountswithPermission.push(account);
            }
          //  }
        });
      } else {
        transfersAccountswithPermission = accounts;
      }
      this.view.segTransfersAccounts.widgetDataMap = dataMap;
      //this.view.lblTransfersAccountIcon.isVisible = isCombinedUser?true:false;
      if (isViewOnlyUser) {
        this.view.flxDefaultTransactionAccountHeader.isVisible = false;
        this.view.flxDefaultTransctionAccountContainer.isVisible = false;
        this.view.flxDefaultTransactionAccountsContainer.height = "50dp";
      }else{
        this.view.flxDefaultTransactionAccountHeader.isVisible = true;
        this.view.flxDefaultTransctionAccountContainer.isVisible = true;
        this.view.flxDefaultTransactionAccountsContainer.height = "465dp";
      }
      if (transfersAccountswithPermission.length !== 0 && transfersAccountswithPermission.length > 1) {
        var data = this.getDropdownDataWithSections(transfersAccountswithPermission);
        this.view.segTransfersAccounts.setData(data);
        this.view.segTransfersAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segTransfersAccounts.onRowClick = this.onTransfersAccountSelect.bind(this);
      } else {
        this.view.flxTransfersValue.setVisibility(true);
        if (this.defaultNames.defaultTransferAccount !== "None" && this.defaultNames.defaultTransferAccount != undefined) this.view.lblTransfersValue.text = this.defaultNames.defaultTransferAccount + '-XXXX' + defaultTransfersAccountNum.slice(-4);
        else {
			if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblTransfersValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
        else this.view.lblTransfersValue.text = kony.i18n.getLocalizedString("i18n.common.none");
		}
        this.view.flxTransfersSelectedValue.setVisibility(false);
      }
      CommonUtilities.setText(self.view.lblTransfersValue, self.view.lblTransfersValue.text, CommonUtilities.getaccessibilityConfig());
      this.view.lblTransfersAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.forceLayout();
    },
    setBillPayAccountsData: function(accountsInp, defaultBillPayAccountNum) {
    var filterList = function(input) {
        try {
            let accountData = JSON.parse(JSON.stringify(input));
            let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
            return filteredAccountData;
        } catch (err) {
            return input;
        }
    };
    var accounts = filterList(accountsInp);
    var self = this;
    var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
    var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader",
		"flxRowDefaultAccounts": "flxRowDefaultAccounts"
    };
    this.billPayAccounts = accounts;
    var billPayAccountswithPermission = [];
    if (accounts != "") {
        accounts.forEach(function(account) {
            // if(account.actions.indexOf("\"BILL_PAY_CREATE\"")>0){
            if(account.supportBillPay=="1" && account.supportTransferFrom=="1" && scope_configManager.checkAccountAction(account.accountID, "BILL_PAY_CREATE")){
            billPayAccountswithPermission.push(account);
            //  }
            }
        });
    } else {
        billPayAccountswithPermission = accounts;
    }
    this.view.segBillPayAccounts.widgetDataMap = dataMap;
    //this.view.lblBillPayAccountIcon.isVisible = isCombinedUser?true:false;
    if (billPayAccountswithPermission.length !== 0 && billPayAccountswithPermission.length > 1) {
	selectedFlowRowClick = this.onBillPayAccountSelect;
        var data = this.getDropdownDataWithSections(billPayAccountswithPermission);
        this.view.segBillPayAccounts.setData(data);
		 var billPayAccountsLength = 0;

         let segData = this.view.segBillPayAccounts.data;
		 for (let i = 0; i < segData.length; i++) {

             billPayAccountsLength += segData[i][1].length;

         }
		        this.view.segBillPayAccounts.accessibilityConfig = {

             "a11yARIA": {

                 "tabindex": -1,

                 "aria-label": "List of " + billPayAccountsLength + " items"

             }

         };
        this.view.segBillPayAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segBillPayAccounts.onRowClick = this.onBillPayAccountSelect.bind(this);
    } else {
        this.view.flxBillPayValue.setVisibility(true);
        if (this.defaultNames.defaultBillPayAccount !== "None" && this.defaultNames.defaultBillPayAccount != undefined) this.view.lblBillPayValue.text = this.defaultNames.defaultBillPayAccount + '-XXXX' + defaultBillPayAccountNum.slice(-4);
        else {
            if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblBillPayValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
            else this.view.lblBillPayValue.text = kony.i18n.getLocalizedString("i18n.common.none");
        }
        this.view.flxBillPaySelectedValue.setVisibility(false);
    }
    CommonUtilities.setText(self.view.lblBillPayValue, self.view.lblBillPayValue.text, CommonUtilities.getaccessibilityConfig());
    this.view.lblBillPayAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
    this.view.forceLayout();
},
    setOpenFixedDepositAccountsData: function(accountsInp, defaultOpenFixedDepositAccountNum) {
      var filterList = function(input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      var accounts = filterList(accountsInp);
      var self = this;
      //var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var data;
      var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
      };
      this.openFixedDepositAccounts = accounts;
      var openFixedDepositAccountswithPermission = [];
      if (accounts != "") {
        accounts.forEach(function(account) {
          if(account.supportTransferFrom == "1" && account.currencyCode == "NPR"){
            openFixedDepositAccountswithPermission.push(account);
          }
        });
      } else {
        openFixedDepositAccountswithPermission = accounts;
      }
      this.view.segOpenFixedDepositAccounts.widgetDataMap = dataMap;
      if (openFixedDepositAccountswithPermission.length !== 0 && openFixedDepositAccountswithPermission.length > 1) {
        data = this.getDropdownDataWithSections(openFixedDepositAccountswithPermission);
        this.view.segOpenFixedDepositAccounts.setData(data);
        this.view.segOpenFixedDepositAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segOpenFixedDepositAccounts.onRowClick = this.onOpenFixedDepositAccountSelect.bind(this);
      } else {
        this.view.flxOpenFixedDepositValue.setVisibility(true);
        if (this.defaultNames.defaultOpenFixedDepositAccount !== "None" && this.defaultNames.defaultOpenFixedDepositAccount != undefined) this.view.lblOpenFixedDepositValue.text = this.defaultNames.defaultOpenFixedDepositAccount + '-XXXX' + defaultOpenFixedDepositAccountNum.slice(-4);
        else  {
			if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblOpenFixedDepositValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
        else this.view.lblOpenFixedDepositValue.text = kony.i18n.getLocalizedString("i18n.common.none");
		}
        this.view.flxOpenFixedDepositSelectedValue.setVisibility(false);
        CommonUtilities.setText(self.view.lblOpenFixedDepositValue, self.view.lblOpenFixedDepositValue.text, CommonUtilities.getaccessibilityConfig());
      }
      //this.view.lblCheckDepositAccountIcon.isVisible = isCombinedUser?true:false;
      this.view.lblOpenFixedDepositAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.forceLayout();
    },
    setLoanPaymentAccountsData: function(accountsInp, defaultLoanPaymentAccountNum) {
      var filterList = function(input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      var accounts = filterList(accountsInp);
      var self = this;
      var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
      };
      this.loanPaymentAccounts = accounts;
      var loanPaymentAccountswithPermission = [];
      if (accounts != "") {
        accounts.forEach(function(account) {
          loanPaymentAccountswithPermission.push(account);
        });
      } else {
        loanPaymentAccountswithPermission = accounts;
      }
      this.view.segLoanPaymentAccounts.widgetDataMap = dataMap;
      //this.view.lblLoanPaymentAccountIcon.isVisible = isCombinedUser?true:false;
      if (loanPaymentAccountswithPermission.length !== 0 && loanPaymentAccountswithPermission.length > 1) {
        var data = this.getDropdownDataWithSections(loanPaymentAccountswithPermission);
        this.view.segLoanPaymentAccounts.setData(data);
        this.view.segLoanPaymentAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segLoanPaymentAccounts.onRowClick = this.onLoanPaymentAccountSelect.bind(this);
      } else {
        this.view.flxLoanPaymentValue.setVisibility(true);
        if (this.defaultNames.defaultLoanPaymentAccount !== "None" && this.defaultNames.defaultLoanPaymentAccount != undefined) this.view.lblLoanPaymentValue.text = this.defaultNames.defaultLoanPaymentAccount + '-XXXX' + defaultLoanPaymentAccountNum.slice(-4);
        else  {
			if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblLoanPaymentValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
        else this.view.lblLoanPaymentValue.text = kony.i18n.getLocalizedString("i18n.common.none");
		}
        this.view.flxLoanPaymentSelectedValue.setVisibility(false);
      }
      CommonUtilities.setText(self.view.lblLoanPaymentValue, self.view.lblLoanPaymentValue.text, CommonUtilities.getaccessibilityConfig());
      this.view.lblLoanPaymentAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.forceLayout();
    },
    setCardPaymentAccountsData: function(accountsInp, defaultCardPaymentAccountNum) {
      var filterList = function(input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      var accounts = filterList(accountsInp);
      var self = this;
      var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
      };
      this.cardPaymentAccounts = accounts;
      var cardPaymentAccountswithPermission = [];
      if (accounts != "") {
        accounts.forEach(function(account) {
          if(account.supportTransferFrom == "1" ){
            cardPaymentAccountswithPermission.push(account);
          }
        });
      } else {
        cardPaymentAccountswithPermission = accounts;
      }
      this.view.segCardPaymentAccounts.widgetDataMap = dataMap;
      //this.view.lblCardPaymentAccountIcon.isVisible = isCombinedUser?true:false;
      if (cardPaymentAccountswithPermission.length !== 0 && cardPaymentAccountswithPermission.length > 1) {
        var data = this.getDropdownDataWithSections(cardPaymentAccountswithPermission);
        this.view.segCardPaymentAccounts.setData(data);
        this.view.segCardPaymentAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segCardPaymentAccounts.onRowClick = this.onCardPaymentAccountSelect.bind(this);
      } else {
        this.view.flxCardPaymentValue.setVisibility(true);
        if (this.defaultNames.defaultCardPaymentAccount !== "None" && this.defaultNames.defaultCardPaymentAccount != undefined) this.view.lblCardPaymentValue.text = this.defaultNames.defaultCardPaymentAccount + '-XXXX' + defaultCardPaymentAccountNum.slice(-4);
        else  {
			if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblCardPaymentValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
        else this.view.lblCardPaymentValue.text = kony.i18n.getLocalizedString("i18n.common.none");
		}
        this.view.flxCardPaymentSelectedValue.setVisibility(false);
      }
      CommonUtilities.setText(self.view.lblCardPaymentValue, self.view.lblCardPaymentValue.text, CommonUtilities.getaccessibilityConfig());
      this.view.lblCardPaymentAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.forceLayout();
    },
    setCheckManagementAccountsData: function(accountsInp, defaultCheckManagementAccountNum) {
      var filterList = function(input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      var accounts = filterList(accountsInp);
      var self = this;
      var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
      };
      this.checkManagementAccounts = accounts;
      var checkManagementAccountswithPermission = [];
      if (accounts != "") {
        accounts.forEach(function(account) {
          if(account.supportTransferFrom == "1" ){
          checkManagementAccountswithPermission.push(account);
          }
        });
      } else {
        checkManagementAccountswithPermission = accounts;
      }
      this.view.segCheckManagementAccounts.widgetDataMap = dataMap;
      //this.view.lblCheckManagementAccountIcon.isVisible = isCombinedUser?true:false;
      if (checkManagementAccountswithPermission.length !== 0 && checkManagementAccountswithPermission.length > 1) {
        var data = this.getDropdownDataWithSections(checkManagementAccountswithPermission);
        this.view.segCheckManagementAccounts.setData(data);
        this.view.segCheckManagementAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segCheckManagementAccounts.onRowClick = this.onCheckManagementAccountSelect.bind(this);
      } else {
        this.view.flxCheckManagementValue.setVisibility(true);
        if (this.defaultNames.defaultCheckManagementAccount !== "None" && this.defaultNames.defaultCheckManagementAccount != undefined) this.view.lblCheckManagementValue.text = this.defaultNames.defaultCheckManagementAccount + '-XXXX' + defaultCheckManagementAccountNum.slice(-4);
        else {
			if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblCheckManagementValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
        else this.view.lblCheckManagementValue.text = kony.i18n.getLocalizedString("i18n.common.none");
		}
        this.view.flxCheckManagementSelectedValue.setVisibility(false);
      }
      CommonUtilities.setText(self.view.lblCheckManagementValue, self.view.lblCheckManagementValue.text, CommonUtilities.getaccessibilityConfig());
      this.view.lblCheckManagementAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.forceLayout();
    },
    setLoadeSewaAccountsData: function(accountsInp, defaultLoadeSewaAccountNum) {
            var filterList = function(input) {
                try {
                    let accountData = JSON.parse(JSON.stringify(input));
                    let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
                    return filteredAccountData;
                } catch (err) {
                    return input;
                }
            };
            var accounts = filterList(accountsInp);
            var self = this;
            var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var dataMap = {
                "lblDefaultAccountIcon": "lblDefaultAccountIcon",
                "lblDefaultAccountName": "lblDefaultAccountName",
                "accountId": "accountId",
                "flxAccountRoleType": "flxAccountRoleType",
                "lblAccountRoleType": "lblAccountRoleType",
                "lblAccountTypeHeader": "lblAccountTypeHeader",
                "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
            };
            this.LoadeSewaAccounts = accounts;
            var loadeSewaAccountswithPermission = [];
            if (accounts != "") {
                accounts.forEach(function(account) {
                    if (account.supportTransferFrom == "1" && account.currencyCode == "NPR") {
                        loadeSewaAccountswithPermission.push(account);
                    }
                });
            } else {
                loadeSewaAccountswithPermission = accounts;
            }
            this.view.segLoadeSewaAccounts.widgetDataMap = dataMap;
            //this.view.lblCheckManagementAccountIcon.isVisible = isCombinedUser?true:false;
            if (loadeSewaAccountswithPermission.length !== 0 && loadeSewaAccountswithPermission.length > 1) {
                var data = this.getDropdownDataWithSections(loadeSewaAccountswithPermission);
                this.view.segLoadeSewaAccounts.setData(data);
                this.view.segLoadeSewaAccounts.rowTemplate = "flxRowDefaultAccounts";
                this.view.segLoadeSewaAccounts.onRowClick = this.onLoadeSewaAccountSelect.bind(this);
            } else {
                this.view.flxLoadeSewaValue.setVisibility(true);
                if (this.defaultNames.defaultLoadeSewaAccount !== "None" && this.defaultNames.defaultLoadeSewaAccount != undefined) this.view.lblLoadeSewaValue.text = this.defaultNames.defaultLoadeSewaAccount + '-XXXX' + defaultLoadeSewaAccountNum.slice(-4);
                else {
                    if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblLoadeSewaValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + this.defaultPrimaryAccId.slice(-4);
                    else this.view.lblLoadeSewaValue.text = kony.i18n.getLocalizedString("i18n.common.none");
                }
                this.view.flxLoadeSewaSelectedValue.setVisibility(false);
            }
            CommonUtilities.setText(self.view.lblLoadeSewaValue, self.view.lblLoadeSewaValue.text, CommonUtilities.getaccessibilityConfig());
            this.view.lblLoadeSewaAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
            this.view.forceLayout();
        },
    setPrimaryAccountsData: function(accountsInp, defaultPrimaryAccountNum) {
      var filterList = function(input) {
        try {
          let accountData = JSON.parse(JSON.stringify(input));
          let filteredAccountData = accountData.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
          return filteredAccountData;
        } catch (err) {
          return input;
        }
      };
      var accounts = filterList(accountsInp);
      var self = this;
      var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var isViewOnlyUser = applicationManager.getConfigurationManager().checkUserFeature("VIEW_ONLY_ROLE");
      var dataMap = {
        "lblDefaultAccountIcon": "lblDefaultAccountIcon",
        "lblDefaultAccountName": "lblDefaultAccountName",
        "accountId": "accountId",
        "flxAccountRoleType": "flxAccountRoleType",
        "lblAccountRoleType": "lblAccountRoleType",
        "lblAccountTypeHeader": "lblAccountTypeHeader",
        "flxDefaultAccountsHeader": "flxDefaultAccountsHeader"
      };
      this.primaryAccounts = accounts;
      var primaryAccountswithPermission = [];
      if (accounts != "") {
        accounts.forEach(function(account) {
          if(account.supportTransferFrom == "1" ){
            primaryAccountswithPermission.push(account);
          }
        });
      } else {
        primaryAccountswithPermission = accounts;
      }
      this.view.segPrimaryAccounts.widgetDataMap = dataMap;
      //this.view.lblPrimaryAccountIcon.isVisible = isCombinedUser?true:false;
      if (primaryAccountswithPermission.length !== 0 && primaryAccountswithPermission.length > 1) {
        var data = this.getDropdownDataWithSections(primaryAccountswithPermission);
        this.view.segPrimaryAccounts.setData(data);
        this.view.segPrimaryAccounts.rowTemplate = "flxRowDefaultAccounts";
        this.view.segPrimaryAccounts.onRowClick = this.onPrimaryAccountSelect.bind(this);
      } else {
        this.view.flxPrimaryAccountValue.setVisibility(true);
        if (this.defaultNames.defaultPrimaryAccount !== "None" && this.defaultNames.defaultPrimaryAccount != undefined) this.view.lblPrimaryAccountValue.text = this.defaultNames.defaultPrimaryAccount + '-XXXX' + defaultPrimaryAccountNum.slice(-4);
        else this.view.lblPrimaryAccountValue.text = kony.i18n.getLocalizedString("i18n.common.none");
        this.view.flxPrimaryAccountSelectedValue.setVisibility(false);
      }
      CommonUtilities.setText(self.view.lblPrimaryAccountValue, self.view.lblPrimaryAccountValue.text, CommonUtilities.getaccessibilityConfig());
      this.view.lblPrimaryAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.forceLayout();
    },
    onTransfersAccountSelect: function() {
      //var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser==="true";
      //var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var account = this.view.segTransfersAccounts.selectedRowItems[0];
      this.view.lblTransfersAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblTransfersAccountName.text = account.lblDefaultAccountName;
      //this.view.lblTransfersAccountIcon.isVisible = isCombinedUser?true:false;
      this.view.lblTransfersAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblTransfersAccountsDropdown.text = "O";
      this.view.flxTransfersAccounts.setVisibility(false);
	  this.closeBillPayDropdown();
      this.view.flxBillPaySelectedValue.setActive(true);
    },
    onBillPayAccountSelect: function() {
		var self = this;
      //var isCombinedUser = applicationManager.getConfigurationManager().isCombinedUser==="true";
      //var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var account = this.view.segBillPayAccounts.selectedRowItems[0];
      this.view.lblBillPayAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblBillPayAccountName.text = account.lblDefaultAccountName;
      //this.view.lblBillPayAccountIcon.isVisible = isCombinedUser?true:false;
      this.view.lblBillPayAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblBillPayAccountsDropdown.text = "O";
      this.view.flxBillPayAccounts.setVisibility(false);
    },
    onOpenFixedDepositAccountSelect: function() {
      var account = this.view.segOpenFixedDepositAccounts.selectedRowItems[0];
      this.view.lblOpenFixedDepositAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblOpenFixedDepositAccountName.text = account.lblDefaultAccountName;
      this.view.lblOpenFixedDepositAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
      this.view.flxOpenFixedDepositAccounts.setVisibility(false);
    },
    onLoanPaymentAccountSelect: function() {
      var account = this.view.segLoanPaymentAccounts.selectedRowItems[0];
      this.view.lblLoanPaymentAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblLoanPaymentAccountName.text = account.lblDefaultAccountName;
      this.view.lblLoanPaymentAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblLoanPaymentAccountsDropdown.text = "O";
      this.view.flxLoanPaymentAccounts.setVisibility(false);
    },
    onCardPaymentAccountSelect: function() {
      var account = this.view.segCardPaymentAccounts.selectedRowItems[0];
      this.view.lblCardPaymentAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblCardPaymentAccountName.text = account.lblDefaultAccountName;
      this.view.lblCardPaymentAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblCardPaymentAccountsDropdown.text = "O";
      this.view.flxCardPaymentAccounts.setVisibility(false);
    },
    onCheckManagementAccountSelect: function() {
      var account = this.view.segCheckManagementAccounts.selectedRowItems[0];
      this.view.lblCheckManagementAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblCheckManagementAccountName.text = account.lblDefaultAccountName;
      this.view.lblCheckManagementAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblCheckManagementAccountsDropdown.text = "O";
      this.view.flxCheckManagementAccounts.setVisibility(false);
    },
    onLoadeSewaAccountSelect: function() {
            var account = this.view.segLoadeSewaAccounts.selectedRowItems[0];
            this.view.lblLoadeSewaAccountIcon.text = account.lblDefaultAccountIcon.text;
            this.view.lblLoadeSewaAccountName.text = account.lblDefaultAccountName;
            this.view.lblLoadeSewaAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
            this.view.lblLoadeSewaAccountsDropdown.text = "O";
            this.view.flxLoadeSewaAccounts.setVisibility(false);
        },
    onPrimaryAccountSelect: function() {
      var account = this.view.segPrimaryAccounts.selectedRowItems[0];
      this.view.lblPrimaryAccountIcon.text = account.lblDefaultAccountIcon.text;
      this.view.lblPrimaryAccountName.text = account.lblDefaultAccountName;
      this.view.lblPrimaryAccountIcon.isVisible = this.profileAccess === "both" ? true : false;
      this.view.lblPrimaryAccountsDropdown.text = "O";
      this.view.flxPrimaryAccounts.setVisibility(false);
    },
    getDropdownDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = [];
            var business = kony.i18n.getLocalizedString("i18n.accounts.Business");
            var personal = kony.i18n.getLocalizedString("i18n.accounts.Personal");
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            accounts.forEach(function(account) {
                if (isSingleCustomerProfile) {
                    var accountType = applicationManager.getTypeManager().getAccountTypeDisplayValue(account.accountType);
                    if (finalData.hasOwnProperty(accountType)) {
                        finalData[accountType][1].push(scopeObj.createSegmentData(account));
                    } else {
                        finalData[accountType] = [{
                                flxAccountRoleType: {
                                    "isVisible": false
                                },
                                lblAccountTypeHeader: {
                                    "text": accountType, //=== "Personal Accounts" ? accountType : account.MembershipName,
                                    "left": "10px"
                                },
                                template: "flxDefaultAccountsHeader"
                            },
                            [scopeObj.createSegmentData(account)]
                        ];
                    }
                    this.sectionData = [];
                    var data = [];
                    for (var key in prioritizeAccountTypes) {
                        var accountType = prioritizeAccountTypes[key];
                        if (finalData.hasOwnProperty(accountType)) {
                            data.push(finalData[accountType]);
                            this.sectionData.push(accountType);
                        }
                    }
                    for (i = 0; i < data.length; i++) {
                        var sortedData = data[i][1];
                        if (!this.isFavAccAvailable) this.isFavAccAvailable = sortedData.filter(this.isFavourite).length > 0;
                        if (!this.isExtAccAvailable) this.isExtAccAvailable = sortedData.filter(this.isExternal).length > 0;
                    }
                } else {
                    var accountType = personal;
                    var accountTypeIcon = "";
                    if (account.isBusinessAccount === "false") {
                        if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                            accountType = "Personal Accounts";
                            accountTypeIcon = "s";
                        } else {
                            accountType = account.Membership_id;
                            accountTypeIcon = "s";
                        }
                    } else {
                        accountType = account.Membership_id;
                        accountTypeIcon = "r";
                    }
                    if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                        if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                            finalData[accountType][1].pop();
                        }
                        finalData[accountType][1].push(scopeObj.createSegmentData(account));
                    } else {
                        prioritizeAccountTypes.push(accountType);
                        finalData[accountType] = [{
                                flxAccountRoleType: {
                                    "isVisible": false
                                },
                                //lblAccountRoleType: accountType === personal ? "s" : "r",
                                flxAccountRoleType: {isVisible : false},
                                lblAccountTypeHeader: {
                                    "text": accountType === "Personal Accounts" ? accountType : account.MembershipName,
                                    "left": "20px"
                                },
                                membershipId: account.Membership_id,
                                template: "flxDefaultAccountsHeader"
                            },
                            [scopeObj.createSegmentData(account)]
                        ];
                    }
                }
            });

            return this.sortAccountData(finalData);
        },

    createSegmentData: function(account) {
      var processedAccountName = this.generateFromAccounts(account);
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var businessUser = applicationManager.getConfigurationManager().isSMEUser === "true"
      var dataObject = {
        "lblDefaultAccountName": processedAccountName[1],
        "accountID": account.Account_id || account.accountID || account.accountNumber,
        "lblDefaultAccountIcon": {
          isVisible: !isSingleCustomerProfile && this.profileAccess === "both" ? true : false,
          left: !isSingleCustomerProfile && this.profileAccess === "both" ? "20px" : "10px",
          text: account.isBusinessAccount === "true" ? "r" : "s",
                },
              "flxRowDefaultAccounts": {
                "accessibilityConfig": {
                  "a11yARIA": {
                    "tabindex":0,
                    "role": "button",
                    "aria-labelledby": "lblDefaultAccountName"
                  }
                },
                "onKeyPress": this.segmentOnKeyPress,
                // "onClick": selectedFlowRowClick
              }

            };
            return dataObject;
        },

         segmentOnKeyPress: function(eventobject, eventPayload, context) {
           if (context.sectionIndex === context.widgetInfo.data.length - 1) {
             if (context.rowIndex === context.widgetInfo.data[context.sectionIndex][1].length - 1) {
               if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                 eventPayload.preventDefault();
                 this.closeBillPayDropdown();
                 this.closeCheckDepositDropdown();
                 if (context.widgetInfo.id === "segBillPayAccounts") {
                   this.view.flxCheckDepositSelectedValue.setActive(true);
                 } else {
                   this.view.btnDefaultTransactionAccountSave.setActive(true);
                 }
               }
             }
           }
           if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
             if (context.rowIndex === 0 && context.sectionIndex === 0) {
               eventPayload.preventDefault();
               if (context.widgetInfo.id === "segBillPayAccounts") {
                 this.closeBillPayDropdown();
                 this.view.flxBillPaySelectedValue.setActive(true);
               } else {
                 this.closeCheckDepositDropdown();
                 this.view.flxCheckDepositSelectedValue.setActive(true);
               }
             }
           }
           if (eventPayload.keyCode === 27) {
             eventPayload.preventDefault();
             if (context.widgetInfo.id === "segBillPayAccounts") {
               this.closeBillPayDropdown();
               this.view.flxBillPaySelectedValue.setActive(true);
             } else {
               this.closeCheckDepositDropdown();
               this.view.flxCheckDepositSelectedValue.setActive(true);
             }
           }
           },
 
       closeBillPayDropdown: function(){
         var self = this;
           this.view.lblBillPayAccountsDropdown.text = "O";
           this.view.flxBillPaySelectedValue.accessibilityConfig = {
               "a11yARIA": {
                   "tabindex": 0,
                     "role": "combobox",
                     "aria-expanded": false,
                     "aria-label": self.view.lblBillPayKey.text || kony.i18n.getLocalizedString("i18n.ProfileManagement.BillPay"),
                     "aria-haspopup": true,
                     "aria-controls": "flxBillPayAccounts"
               }
           };
           this.view.flxBillPayAccounts.setVisibility(false);   
 
       },
       closeCheckDepositDropdown: function(){
         var self = this;
           this.view.lblCheckDepositAccountsDropdown.text = "O";
           this.view.flxCheckDepositSelectedValue.accessibilityConfig = {
               "a11yARIA": {
                   "tabindex": 0,
                     "role": "combobox",
                     "aria-expanded": false,
                     "aria-label": self.view.lblCheckDepositKey.text,
                     "aria-haspopup": true,
                     "aria-controls": "flxCheckDepositAccounts"
               }
           };
           this.view.flxCheckDepositAccounts.setVisibility(false);
       },
 
     sortAccountData: function(finalData) {
            var data = [];
            var prioritizeAccountRoleTypes = [];
            var viewType = applicationManager.getConfigurationManager().getConfigurationValue('combinedDashboardView');

            var sections = Object.keys(finalData);
            var index = sections.indexOf(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            if (index > -1) {
                sections.splice(index, 1);
            }

            prioritizeAccountRoleTypes.push(kony.i18n.getLocalizedString("i18n.accounts.personalAccounts"));
            prioritizeAccountRoleTypes = prioritizeAccountRoleTypes.concat(sections);

            this.sectionData = [];

            for (var i = 0; i < prioritizeAccountRoleTypes.length; i++) {
                var accountType = prioritizeAccountRoleTypes[i];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }


            for (var i = 0; i < data.length; i++) {
                var accoountTypeOrder = applicationManager.getTypeManager().getAccountTypesByPriority();
                var sortedData = data[i][1];
                sortedData.sort(function(a, b) {
                    return accoountTypeOrder.indexOf(a.lblAccountType) - accoountTypeOrder.indexOf(b.lblAccountType);
                });
                data[i][1] = sortedData;

            }

            return data;
        },
    /**
         * *@param {Boolean} isLoading- True or false to show/hide the progess bar
         *  Method to set show/hide the progess bar
         */
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    /**
         *  Method to set ui for the component in mobile breakpoint
         */
    toggleMenuMobile: function() {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text = "O";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": 0,
            "role": "button",
            "aria-expanded": false,
            "aria-labelledby": "lblAccountSettingsMobile"
          }
        };
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    },
    setFlowActions: function() {
      var scopeObj = this;
      // if (CommonUtilities.isCSRMode()) {
      // scopeObj.view.btnDefaultTransactionAccountSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
      //scopeObj.view.btnDefaultTransactionAccountSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
      //} else {
      scopeObj.view.btnDefaultTransactionAccountSave.onClick = scopeObj.onSaveDefaultAccounts;
      //}
      this.view.btnDefaultTransactionAccountCancel.onClick = this.onCancelDefaultAccounts;
      this.view.flxMain.onClick = this.onRightFlexClick;
	  this.view.flxMain.accessibilityConfig = {
       "a11yARIA": {
         "tabindex": -1,
         "role":"main"
      }
     };
    },
    onRightFlexClick: function() {
      if (this.view.flxTransfersAccounts.isVisible) {
        this.view.lblTransfersAccountsDropdown.text = "O";
        this.view.flxTransfersAccounts.setVisibility(false);
      }
      if (this.view.flxBillPayAccounts.isVisible) {
        this.view.lblBillPayAccountsDropdown.text = "O";
        this.view.flxBillPayAccounts.setVisibility(false);
		    this.closeBillPayDropdown();
      }
      if (this.view.flxOpenFixedDepositAccounts.isVisible) {
        this.view.lblOpenFixedDepositAccountsDropdown.text = "O";
        this.view.flxOpenFixedDepositAccounts.setVisibility(false);
      }
      if (this.view.flxLoanPaymentAccounts.isVisible) {
        this.view.lblLoanPaymentAccountsDropdown.text = "O";
        this.view.flxLoanPaymentAccounts.setVisibility(false);
      }
      if (this.view.flxCardPaymentAccounts.isVisible) {
        this.view.lblCardPaymentAccountsDropdown.text = "O";
        this.view.flxCardPaymentAccounts.setVisibility(false);
      }
      if (this.view.flxCheckManagementAccounts.isVisible) {
        this.view.lblCheckManagementAccountsDropdown.text = "O";
        this.view.flxCheckManagementAccounts.setVisibility(false);
      }
      if (this.view.flxPrimaryAccounts.isVisible) {
        this.view.lblPrimaryAccountsDropdown.text = "O";
        this.view.flxPrimaryAccounts.setVisibility(false);
      }
    },
    /**
         * Method that gets called on click of cancel default accounts
         */
    onCancelDefaultAccounts: function() {
      applicationManager.getNavigationManager().navigateTo("frmAccountSettingsDefaultAccount");
    },
    /**
         * Method that gets called on click of save default accounts
         */
    onSaveDefaultAccounts: function() {
      var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
      var scopeObj = this;
      FormControllerUtility.showProgressBar(scopeObj.view);
      var defaultAccounts = {
        default_account_transfers: (scopeObj.view.segTransfersAccounts.selectedRowItems.length > 0) ? scopeObj.view.segTransfersAccounts.selectedRowItems[0].accountID : (this.defaultTransfersAccounts != "undefined" ? this.defaultTransfersAccounts : ''),
        default_account_billPay: (scopeObj.view.segBillPayAccounts.selectedRowItems.length > 0) ? scopeObj.view.segBillPayAccounts.selectedRowItems[0].accountID : (this.defaultBillPayAccounts != "undefined" ? this.defaultBillPayAccounts : ''),
        default_account_deposit: (scopeObj.view.segOpenFixedDepositAccounts.selectedRowItems.length > 0) ? scopeObj.view.segOpenFixedDepositAccounts.selectedRowItems[0].accountID : (this.defaultOpenFixedDepositAccounts != "undefined" ? this.defaultOpenFixedDepositAccounts : ''),
        default_account_loanpayment: (scopeObj.view.segLoanPaymentAccounts.selectedRowItems.length > 0) ? scopeObj.view.segLoanPaymentAccounts.selectedRowItems[0].accountID : (this.defaultLoanPaymentAccounts != "undefined" ? this.defaultLoanPaymentAccounts : ''),
        default_account_cardpayment: (scopeObj.view.segCardPaymentAccounts.selectedRowItems.length > 0) ? scopeObj.view.segCardPaymentAccounts.selectedRowItems[0].accountID : (this.defaultCardPaymentAccounts != "undefined" ? this.defaultCardPaymentAccounts : ''),
        default_account_checkmanagement: (scopeObj.view.segCheckManagementAccounts.selectedRowItems.length > 0) ? scopeObj.view.segCheckManagementAccounts.selectedRowItems[0].accountID : (this.defaultCheckManagementAccounts != "undefined" ? this.defaultCheckManagementAccounts : ''),
        default_account_esewa: (scopeObj.view.segLoadeSewaAccounts.selectedRowItems.length > 0) ? scopeObj.view.segLoadeSewaAccounts.selectedRowItems[0].accountID : (this.defaultLoadeSewaAccounts != "undefined" ? this.defaultLoadeSewaAccounts : '')
      };
      var defaultPrimaryAccount =  (scopeObj.view.segPrimaryAccounts.selectedRowItems.length > 0) ? scopeObj.view.segPrimaryAccounts.selectedRowItems[0].accountID : (this.defaultPrimaryAccounts != "undefined" ? this.defaultPrimaryAccounts : '');
      if (scopeObj.view.segPrimaryAccounts.selectedRowItems.length > 0) {
        var selectedPrimary = scopeObj.view.segPrimaryAccounts.selectedRowItems[0];
        applicationManager.getNavigationManager().setCustomInfo("latestDefaultPrimary", {
            accountName: selectedPrimary.lblDefaultAccountName || "",
            accountID: selectedPrimary.accountID
        });
		}
	  if ((scopeObj.view.flxTransfers.isVisible && defaultAccounts.default_account_transfers === "undefined") || (scopeObj.view.flxBillPay.isVisible && defaultAccounts.default_account_billPay === "undefined") || (scopeObj.view.flxOpenFixedDeposit.isVisible && defaultAccounts.default_account_openfixeddeposit === "undefined") || (scopeObj.view.flxLoanPayment.isVisible && defaultAccounts.default_account_loanpayment === "undefined") || (scopeObj.view.flxCardPayment.isVisible && defaultAccounts.default_account_billPay === "undefined") || (scopeObj.view.flxCheckManagement.isVisible && defaultAccounts.default_account_billPay === "undefined") || (scopeObj.view.flxPrimaryAccount.isVisible && defaultAccounts.defaultPrimayAccount === "undefined")) {
        scopeObj.view.lblDefaultTransactionAccountWarning.text = kony.i18n.getLocalizedString("i18n.profile.defaultAccountToBlank");
        scopeObj.view.lblDefaultPrimaryAccountWarning.text = kony.i18n.getLocalizedString("i18n.profile.defaultAccountToBlank");
        scopeObj.view.forceLayout();
        FormControllerUtility.hideProgressBar(scopeObj.view);
      } else {
        var configManager = applicationManager.getConfigurationManager();
        var userName = kony.sdk.getCurrentInstance().tokens[configManager.constants.IDENTITYSERVICENAME].provider_token.params.user_attributes.UserName;
        var params = {
          "userName": userName,
          "defaultACC": defaultPrimaryAccount
        };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "ManageArrangementsUIModule",
          "appName": "ManageArrangementsMA"
        }).presentationController.saveDefaultAccounts(defaultAccounts, params);
      }
    },
    /**
         * onBreakpointChange : Handles ui changes on .
         *�@member�of�{frmCreateSavingsGoalController}
         *�@param�{integer} width - current browser width
         *�@return�{}
         *�@throws�{}
         */
    onBreakpointChange: function(width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.updateSettingAndPreferences");
        this.view.flxDefaultTransactionAccountWarning.height = "100px";
        this.view.lblDefaultTransactionAccountWarning.left = "50px";
		this.view.flxDefaultTransctionAccounts.height="150px";
        this.view.flxFooter.height ="300px";
      }else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
        this.view.customfooternew.flxFooterMenu.left ="0dp";
    }
      this.view.forceLayout();
    },
  };
});
define("ManageArrangementsMA/ManageArrangementsUIModule/frmAccountSettingsSetDefaultAccountControllerActions", {
  /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
  /** init defined for frmAccountSettingsSetDefaultAccount **/
  AS_Form_bf90157018804a299a3f0436556b45d1: function AS_Form_bf90157018804a299a3f0436556b45d1(eventobject) {
    var self = this;
    this.init()
  }
});
define("ManageArrangementsMA/ManageArrangementsUIModule/frmAccountSettingsSetDefaultAccountController", ["ManageArrangementsMA/ManageArrangementsUIModule/userfrmAccountSettingsSetDefaultAccountController", "ManageArrangementsMA/ManageArrangementsUIModule/frmAccountSettingsSetDefaultAccountControllerActions"], function() {
  var controller = require("ManageArrangementsMA/ManageArrangementsUIModule/userfrmAccountSettingsSetDefaultAccountController");
  var controllerActions = ["ManageArrangementsMA/ManageArrangementsUIModule/frmAccountSettingsSetDefaultAccountControllerActions"];
  return kony.visualizer.mixinControllerActions(controller, controllerActions);
});
