define(['CommonUtilities','ViewConstants','FormControllerUtility'], function(CommonUtilities, ViewConstants,FormControllerUtility) {
  var responsiveUtils = new ResponsiveUtils();

  return {
    chartDefaultValue: "",

    productDetails:{},
    instrumentMinimal:{},
    portfolioDetails:{},
    ricCode:'',
    isRTL:'',
    updateFormUI: function(uiData) {
      var currForm = kony.application.getCurrentForm();
      if (uiData) {   
          currForm.forceLayout();
      }
    },

    init: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
    },
    reqEnd: function(){							
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
      var currForm = kony.application.getCurrentForm();
      currForm.forceLayout();
    },
    preshow: function(){
       this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
      var configManager = applicationManager.getConfigurationManager();
      var features = configManager.getUserFeatures();
      var permissions = configManager.getUserPermissions();
      var entitlement = {
        "features": features,
        "permissions": permissions
      };
            var isEuro = false;
            if (configManager.getBaseCurrency() === 'EUR') {
                isEuro = true;
            }
      //var features=entitlement;
      this.view.instrumentDetails1.requestStart = function() {
             
        FormControllerUtility.showProgressBar(this.view);
      };
      this.view.instrumentDetails1.requestEnd = this.reqEnd;
      this.view.instrumentDetails1.setFeaturesAndPermissions(entitlement);
      
      var paramsProdDetails=applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getProductDetails();
      var data=applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getDetailsOfInstrument();
      if(applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).flow=="Holdings"){
        var portfolioDetails=applicationManager.getNavigationManager().getCustomInfo('frmProductDetails').portfolioDetails;
        this.view.instrumentDetails1.setInstrumentDetails(paramsProdDetails, 0, portfolioDetails,isEuro);
        applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentCurrentPosition(portfolioDetails ? portfolioDetails : {});
      }
     else{
       this.view.instrumentDetails1.setInstrumentDetails(paramsProdDetails, data, 0,isEuro);
     }
		
      this.view.flxBack.onTouchEnd=this.goBack;
      this.view.onTouchEnd = this.onFormTouchEnd;
      this.view.instrumentDetails1.onClickViewTransactions =  this.navToViewTransactions;
      this.view.instrumentDetails1.onClickBuy=this.onBuy;
      this.view.instrumentDetails1.onClickSell=this.onSell;
      this.view.instrumentDetails1.setProductDetailsData=this.setProductDetailsData;
      this.view.instrumentDetails1.setInstrumentDetailsData=this.setInstrumentDetailsData;
      this.view.instrumentDetails1.setInstrumentsData=this.setInstrumentsData;
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

    setProductDetailsData:function(data){
      applicationManager.getModulesPresentationController("WealthOrderUIModule").tradeCurrency = data.instrumentMinimal[0]? data.instrumentMinimal[0].priceCurrency:'';
      var instrumentDetailsData = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');
      if(instrumentDetailsData===undefined){
        instrumentDetailsData={};
      }
      instrumentDetailsData.productDetails=data;
      applicationManager.getNavigationManager().setCustomInfo('frmProductDetails', instrumentDetailsData);
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentPricingData(data.pricingDetails?data.pricingDetails:{});
    },

    setInstrumentsData:function(data){
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentDetails(data);
    },
    
    setInstrumentDetailsData:function(data){
      var navManager = applicationManager.getNavigationManager();		
      var dataCustom = navManager.getCustomInfo('frmProductDetails');
      if(dataCustom === undefined){
        dataCustom={};
      }
      dataCustom.portfolioDetails = data;
      navManager.setCustomInfo('frmProductDetails', dataCustom);
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentCurrentPosition(data?data:{});
    },
    navToViewTransactions: function() {
      var navManager = applicationManager.getNavigationManager();
      var dataCustom;
      var instrumentData = navManager.getCustomInfo('frmPlaceOrder');
      if (instrumentData === undefined) {
        instrumentData = {};
      }
      // adding this check to set instrumentdata for options instruments 
      if(navManager.getCustomInfo('frmProductDetails').portfolioDetails){ // added this bcos its not allowing object check for empty objects
				if(Object.keys(navManager.getCustomInfo('frmProductDetails').portfolioDetails).length === 0 ||
			Object.keys(navManager.getCustomInfo('frmProductDetails').portfolioDetails).length === "undefined"){
				instrumentData=navManager.getCustomInfo('frmProductDetails').productDetails
			}else{
				instrumentData = navManager.getCustomInfo('frmProductDetails').portfolioDetails;
			}
            
			}
      if(instrumentData.instrumentMinimal !== undefined){
        if (instrumentData.instrumentMinimal.length > 0) {
          dataCustom = instrumentData.instrumentMinimal[0];
        } 
      }else {
        dataCustom = instrumentData;
      }
      navManager.setCustomInfo('frmViewTransactions', dataCustom);
      navManager.navigateTo("frmViewTransactions");
    },
    postshow: function() {
      this.setActiveHeaderHamburger();
    },

    onBreakpointChange: function(form, width){
       this.view.instrumentDetails1.onBreakPointChangeComponent(kony.application.getCurrentBreakpoint());
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {
        this.view.instrumentDetails1.onBreakPointChangeComponent(kony.application.getCurrentBreakpoint());
        this.preshow();
      }.bind(this));
    },

    goBack: function(){
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentCurrentPosition({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentPricingData({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentDetails({});
      applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).setProductDetails({});
      applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).setDetailsOfInstrument({});
      applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).flow="";    
      applicationManager.getNavigationManager().setCustomInfo('frmProductDetails',{});
      new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioOverview"}).navigate();
      //let ntf = new kony.mvc.Navigation("frmPortfolioOverview");
      //ntf.navigate();
    },

    onSell: function(){
      var navManager = applicationManager.getNavigationManager();		
      var dataCustom = navManager.getCustomInfo('frmPlaceOrder');
      if(dataCustom === undefined){
        dataCustom={};
      }
      dataCustom = navManager.getCustomInfo('frmProductDetails').portfolioDetails;
      dataCustom.operation = "Sell";
      navManager.setCustomInfo('frmPlaceOrder', dataCustom);
      navManager.navigateTo("frmPlaceOrder");
    },

    onBuy: function(){
      var navManager = applicationManager.getNavigationManager();		
      var dataCustom = navManager.getCustomInfo('frmPlaceOrder');
      if(dataCustom === undefined){
        dataCustom={};
      }	
      dataCustom = navManager.getCustomInfo('frmProductDetails').portfolioDetails;
      dataCustom.operation = "Buy";
      navManager.setCustomInfo('frmPlaceOrder', dataCustom);
      navManager.navigateTo("frmPlaceOrder");
    },

    /**
         *setActiveHeaderHamburger - Method to highlight active header and hamburger
         */
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },

  };
});