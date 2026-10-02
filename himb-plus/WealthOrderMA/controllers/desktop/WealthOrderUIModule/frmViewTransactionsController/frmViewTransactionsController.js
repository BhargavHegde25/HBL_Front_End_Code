var portId = "";
define(['CommonUtilities','ViewConstants','FormControllerUtility'], function(CommonUtilities, ViewConstants,FormControllerUtility) {
  var responsiveUtils = new ResponsiveUtils();
      var orientationHandler = new OrientationHandler();

  return {
	 isRTL:'',
    updateFormUI: function(uiData) {
      var currForm = kony.application.getCurrentForm();
      if (uiData) {

      }
    },

    init: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.preShow = this.preshow;
      this.view.postShow = this.postshow;
      this.view.onTouchEnd = this.onFormTouchEnd;
    },

    onFormTouchEnd:function(){
      var currFormObj = kony.application.getCurrentForm();
      if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
        setTimeout(function() {
          currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
          currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
          currFormObj.customheadernew.imgLblTransfers.text = "O";
        }, "17ms")
      }
    },

    preshow: function(){
	  this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
	  this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
	  this.view.imgBack.onTouchEnd = this.navToInstrumentDetails;
      this.view.btnBack.onClick = this.navToInstrumentDetails;
            let wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"});
            this.portId = wealthModule.getPortfolioId();
      		var isEuro = false;
            var configManager = applicationManager.getConfigurationManager();
            if (configManager.getBaseCurrency() === 'EUR') {
                isEuro = true;
            }
      		else if(kony.i18n.getCurrentLocale() === 'es_ES'){
				isEuro = true;
			}
          var navManager = applicationManager.getNavigationManager();	
         var instrumentData = navManager.getCustomInfo('frmViewTransactions');   
      var dataObj = {
        "portfolioId": this.portId,
        "isEuro": isEuro,
        "instrumentDetails": instrumentData
      };
      			this.view.viewTransactions.requestStart = function() {
                FormControllerUtility.showProgressBar(this.view);
            };
           this.view.viewTransactions.requestEnd = function() {
                FormControllerUtility.hideProgressBar(this.view); 
            };
     this.view.viewTransactions.setPortfolio(dataObj);
    },
    navToInstrumentDetails: function(){
        var navManager = applicationManager.getNavigationManager();	
        navManager.navigateTo("frmProductDetails");
    },
    postshow: function() {

    },
 
        onBreakpointChange: function(form, width) {
           var isEuro = false;
            var configManager = applicationManager.getConfigurationManager();
            if (configManager.getBaseCurrency() === 'EUR') {
                isEuro = true;
            }
          else if(kony.i18n.getCurrentLocale() === 'es_ES'){
				isEuro = true;
			}
           responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {
                 if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
   
            this.view.viewTransactions.onBreakPointChangeComponent(kony.application.getCurrentForm(), kony.application.getCurrentBreakpoint(),this.portId, isEuro);
            }
      }.bind(this));
            this.view.customheadernew.onBreakpointChangeComponent(width);
            //this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
              this.view.flxWrapper.width = "95%";
            }           
            this.view.viewTransactions.onBreakPointChangeComponent(kony.application.getCurrentForm(), kony.application.getCurrentBreakpoint(),this.portId, isEuro);
           
        },
  };
});