define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnStrategy.onClick = function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmFirstUserVal", true);
        new kony.mvc.Navigation({
          "appName": "PortfolioManagementMA",
          "friendlyName": "frmIntroRiskAppetite"
        }).navigate();
      }

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});