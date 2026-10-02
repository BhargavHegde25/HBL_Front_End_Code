define({

  exchangeRateServerDate : function(presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('Forex');
			cardsModel.customVerb("getServerDate",{},completionCallback);
			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		},

exchangeRateTable :function(param, presentationSuccess, presentationFailure) {
			var cardsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition('Forex');
			cardsModel.customVerb("getDashboardCurrenciesPrelogin",param,completionCallback);
			function completionCallback(status, data, error) {
				var srh = applicationManager.getServiceResponseHandler();
				var obj = srh.manageResponse(status, data, error);
				if (obj["status"] === true) {
					presentationSuccess(obj["data"]);
				} else
					presentationFailure(obj["errmsg"]);
			}
		}
});