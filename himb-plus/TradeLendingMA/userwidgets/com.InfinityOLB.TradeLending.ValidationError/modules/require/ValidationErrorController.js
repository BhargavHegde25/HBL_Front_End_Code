define(function () {
	return {
		/**
		 * Sets the heading.
		 * @param {string} heading - Specifies the heading.
		 */
		setHeading: function (heading) {
			this.view.lblErrorHeading.text = heading;
		},
		/**
		 * Sets the error messages.
		 * @param {object} errors - Specifies the errors.
		 */
		setErrors: function (errors) {
			if (errors.length === 1) {
				this.view.lblErrorHeading.setVisibility(false);
				this.view.lblErrorMessage.text = errors[0];
			} else {
				this.view.lblErrorHeading.setVisibility(true);
				this.view.lblErrorMessage.text = errors.map(e => ('•  ' + e)).join('\n');
			}
		}
	};
});