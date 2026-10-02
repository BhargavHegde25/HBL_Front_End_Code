define(['ViewConstants','CommonUtilities'], function(ViewConstants,CommonUtilities) {

	return {
        init: function(){
           this.view.segWatchlistActionsMenu.onRowClick = this.getWatchlistActionLocation.bind(this);
        },
		getWatchlistActionLocation: function() {
            var selectedRow = this.view.segWatchlistActionsMenu.selectedRowItems[0];
          
			var lblTransferCashText = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.TransferCash"));
            var lblConvertCurrencyText = CommonUtilities.changedataCase(kony.i18n.getLocalizedString("i18n.wealth.ConvertCurrency"));

            if (selectedRow.lblAction.toLowerCase() === lblTransferCashText.toLowerCase()) {
				this.navigateToTransfer();
            }
            else if (selectedRow.lblAction.toLowerCase() === lblConvertCurrencyText.toLowerCase()) {
				this.navigateToConvertCurrency();
            }
        },

      isTransfersAndPayEnabled:function(){
        try{
          var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent("TransfersMA") === true
      || configurationManager.isMicroAppPresent("BillPayMA") === true || configurationManager.isMicroAppPresent("WireTransferMA") === true) {
      return [
        "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
        "INTER_BANK_ACCOUNT_FUND_TRANSFER",
        "INTRA_BANK_FUND_TRANSFER",
        "TRANSFER_BETWEEN_OWN_ACCOUNT",
        "P2P"
      ].some(function (permission) {
        return applicationManager.getConfigurationManager().checkUserFeature(permission);
      })
    } else
      return false;
          }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in isTransfersAndPayEnabled",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
        },
      
      isTransfersAndPayEnabledEur:function(){
          var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent("TransfersMA") === true
      || configurationManager.isMicroAppPresent("BillPayMA") === true || configurationManager.isMicroAppPresent("WireTransferMA") === true) {
      return [
        "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
        "INTER_BANK_ACCOUNT_FUND_TRANSFER",
        "INTRA_BANK_FUND_TRANSFER",
      ].some(function (permission) {
        return applicationManager.getConfigurationManager().checkUserFeature(permission);
      })
    } else
      return false;
        },
      
        navigateToTransfer: function() {
          try{
            var scope = this;
            var configurationManager = applicationManager.getConfigurationManager();
          if(scope_WealthPresentationController.isJointAccount === false){
            if (configurationManager.getDeploymentGeography() === "EUROPE" && this.isTransfersAndPayEnabledEur()) {
               kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "TransferEurUIModule", "appName" : "TransfersMA"}).presentationController.showTransferScreen({
                    context: "MakePaymentOwnAccounts",
                    isTransferCashWealth: true
                });
            } else if(configurationManager.getDeploymentGeography() !== "EUROPE" && this.isTransfersAndPayEnabled()){
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "TransferFastUIModule", "appName" : "TransfersMA"}).presentationController.showTransferScreen({
                    isTransferCashWealth: true
                });
            }
          }
            }catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in isTransfersAndPayEnabledEur",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
        },
        navigateToConvertCurrency: function() {
          try{
            scope_WealthPresentationController.instrumentAction = "";
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmCurrencyConverter", portfolioId);
            navManager.navigateTo("frmCurrencyConverter");
             }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in navigateToConvertCurrency",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
        },
   onError: function(err) {
      kony.print(JSON.stringify(err));
    },
	};
});