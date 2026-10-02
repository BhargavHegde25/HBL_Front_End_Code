define(["CommonUtilities", "OLBConstants", "FormControllerUtility"], function (CommonUtilities, OLBConstants, FormControllerUtility) {
	return {
		/**
		 * Performs the actions required before rendering component.
		 */
		preShow: function () {
			const scope = this;
			FormControllerUtility.disableTextbox(this.view.tbxCurrency);
			this.view.flxSearch.onClick = this.toggleAccountList;
			this.view.tbxSearch.onKeyUp = CommonUtilities.debounce(scope.showAccounts.bind(scope), OLBConstants.FUNCTION_WAIT, false);
			this.view.segAccountList.onRowClick = () => {
				const selectedAccount = scope.view.segAccountList.selectedRowItems[0];
				scope.view.tbxCurrency.text = selectedAccount.currencyCode;
				scope.view.lblSelectedAccount.text = selectedAccount.lblName;
				scope.toggleAccountList();
				scope.currFormController.enableOrDisableSubmitButton();
			};
			this.view.flxClear.onClick = () => {
				scope.view.tbxSearch.text = "";
				scope.view.flxClear.setVisibility(false);
				scope.showAccounts();
			};
		},
		/**
		 * Sets the context.
		 * @param {object} context - Specifies the context info.
		 */
		setContext: function (context) {
			this.context = context;
			this.currFormController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
			this.view.tbxSearch.setVisibility(false);
			this.view.tbxSearch.setFocus(false);
			this.view.flxClear.setVisibility(false);
			this.view.lblSelectedAccount.setVisibility(true);
			this.view.flxAccountList.setVisibility(false);
		},
		/**
		 * Toggles the account list.
		 */
		toggleAccountList: function () {
			if (this.view.tbxSearch.isVisible) {
				this.view.tbxSearch.text = "";
				this.view.tbxSearch.setVisibility(false);
				this.view.flxClear.setVisibility(false);
				this.view.lblSelectedAccount.setVisibility(true);
				this.view.flxAccountList.setVisibility(false);
			} else {
				this.view.tbxSearch.setVisibility(true);
				this.view.tbxSearch.setFocus(true);
				this.view.lblSelectedAccount.setVisibility(false);
				this.showAccounts();
				this.view.flxAccountList.setVisibility(true);
			}
		},
		/**
		 * Shows the accounts.
		 */
		showAccounts: function () {
			const formatUtilManager = applicationManager.getFormatUtilManager(),
				configurationManager = applicationManager.getConfigurationManager(),
				searchText = this.view.tbxSearch.text.toLowerCase(),
				accounts = this.context.filter(x => x.accountName.toLowerCase().includes(searchText) || x.accountID.includes(searchText));
			let segData = [];
			for (const account of accounts) {
				segData.push({
					'flxAccountRow': {
						'cursorType': 'pointer'
					},
					'lblName': CommonUtilities.getAccountDisplayName(account),
					'lblAmount': `${configurationManager.getCurrency(account.currencyCode)}${formatUtilManager.formatAmount(account.availableBalance)}`,
					'currencyCode': account.currencyCode,
					'accountId': account.accountID
				});
			}
			this.view.segAccountList.setData(segData);
			this.view.flxAccountList.height = (segData.length * 51 > 204) ? '204dp' : `${segData.length * 51}dp`;
			this.view.flxClear.setVisibility(!!searchText);
			this.view.forceLayout();
		}
	};
});