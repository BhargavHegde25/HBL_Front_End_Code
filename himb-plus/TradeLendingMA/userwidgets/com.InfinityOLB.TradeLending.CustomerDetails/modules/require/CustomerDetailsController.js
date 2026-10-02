define([], function () {
	const fontIcons = {
		'chevronUp': 'P',
		'chevronDown': 'O',
	};
	return {
		/**
		 * Performs the actions required before rendering component.
		 */
		preShow: function () {
			const scope = this;
			scope.view.flxDropdown.cursorType = 'pointer';
			this.view.flxDropdown.onClick = this.toggleDropdown;
			this.view.btnDelete.onClick = () => scope.currFormController.togglePopup({
				'context': 'deleteCustomerWidget',
				'widgetId': scope.view.id
			});
		},
		/**
		 * Sets the context.
		 * @param {object} context - Specifies the context info.
		 */
		setContext: function (context) {
			this.currFormController = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
			this.view.CustomerDropdown.setContext(context.customers);
			this.view.CustomerDropdown.setDefaultText();
			this.view.RoleDropdown.setContext(context.roles);
			this.view.RoleDropdown.setDefaultText();
		},
		/**
		 * Toggles the dropdown.
		 */
		toggleDropdown: function (collapse) {
			if (this.view.flxContainer.isVisible || (collapse && typeof collapse === 'boolean')) {
				this.view.lblDropdownIcon.text = fontIcons.chevronDown;
				this.view.flxContainer.setVisibility(false);
			} else {
				this.view.lblDropdownIcon.text = fontIcons.chevronUp;
				this.view.flxContainer.setVisibility(true);
				this.currFormController.collapseWidgets(this.view.id);
			}
		},
		/**
		 * Sets the heading text.
		 * @param {number} idx - Specifies the index of widget instance.
		 * @param {boolean} showDelete - Specifies whether to show/hide delete action.
		 */
		setHeading: function (idx, showDelete) {
			this.view.lblHeading.text = `${kony.i18n.getLocalizedString('i18n.userManagement.Customer')} ${idx}`;
			this.view.btnDelete.setVisibility(showDelete);
		},
		/**
		 * Handles the dropdown selection.
		 * @param {string} widgetId - Specifies widget id.
		 * @param {string} selectedKey - Specifies selected key.
		 */
		handleDropdownSelection: function (widgetId, selectedKey) {
			switch (widgetId) {
				case 'CustomerDropdown':
				case 'RoleDropdown':
					this.currFormController.enableOrDisableSubmitButton();
					break;
			}
		},
	};
});