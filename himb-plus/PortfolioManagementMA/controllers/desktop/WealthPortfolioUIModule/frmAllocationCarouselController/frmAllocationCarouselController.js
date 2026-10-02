var portfolioId = "";
define(['ViewConstants'], function(ViewConstants) {
  return {
    isRTL:'',
    
 //Type your controller code here
  preShow: function(){
    this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
	this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
    this.view.onTouchEnd = this.onFormTouchEnd;
    var wealthModule = applicationManager.getModulesPresentationController
    ("WealthPortfolioUIModule");
    this.portfolioId=wealthModule.getPortfolioId();
    var userId = applicationManager.getUserPreferencesManager().getUserId();
    var labels=['Dec', 'Jan', 'Feb', 'March','April'];
    var data=[[-50, 25, 35,-28,42]];
    var orientationHandler = new OrientationHandler();
   //this.view.allocationCarousel.createBarChart(labels,data);
        var parm ={
          "objectServiceName": "PortfolioServicing",
          "operationName": "getAllocation",
          "objectName": "PortfolioDetails",
          "Criteria": { "portfolioId": this.portfolioId},                    
    };
      var sectorParm ={
        "objectServiceName": "PortfolioServicing",
        "operationName": "getPortfolioHoldings",
        "objectName": "PortfolioDetails",
        "Criteria" : { "portfolioId" : this.portfolioId,
                     "userId":userId,
                     "fieldOrder":"fieldOrder",
                     "navPage":"Holdings",
                     "sortBy":"description",
                     "pageSize":1000,
                     "pageOffset":0,
                     "sortOrder":"ASC",
                     "isEuro":"isEuro"}   
      
    };
   if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
    this.view.flxAllocation.height = "750dp";
   }else{
     this.view.flxAllocation.height = "550dp";
   }
    this.view.allocationCarousel.setServiceParm(parm,sectorParm);
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
     }
  };
 });
