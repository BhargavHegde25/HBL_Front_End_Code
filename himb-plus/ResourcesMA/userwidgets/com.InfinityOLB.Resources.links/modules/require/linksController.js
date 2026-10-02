define([], function () {

	return {
		onNavigate: function () {
			var scope = this;
			try {
				scope.view.postShow = scope.postShow;
			} catch (err) {
				var errorObj = {
					"method": "onNavigate",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		postShow: function () {
			var scope = this;
			try {
				scope.view.flxLink.cursorType = 'pointer';
				scope.view.flxLink.skin = 'sknFlx851a1cInfo';
				scope.view.flxLink.hoverSkin = 'sknFlx293276roundedHover';
			} catch (err) {
				var errorObj = {
					"method": "postShow",
					"error": err
				};
				scope.onError(errorObj);
			}
		},

		onError: function (err) {
			var errMsg = JSON.stringify(err);
			errMsg.level = "linksController";
			// kony.ui.Alert(errMsg);
		},

	};
});