/*eslint-disable*/
define(['./myStrategyDetailsBusinessController'], function (myStrategyDetailsBusinessController) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new myStrategyDetailsBusinessController(this);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
	setParam: function(portfolioID)
	{
      let RequestParams={
        "portfolioId": portfolioID,
        "portfolioServiceType": "Advisory"
      };
      this.infoVisibilityOff();
	  this.view.flxinfo.onTouchEnd=this.infoVisibilityOn;
	  this.view.btnStrategy.onClick=this.navigateToStrategyAllocation;
      this.businessController.fetchDetails("PortfolioServicing","getMyStrategy","Strategies",RequestParams);
	},
    serviceCall: function(graphResponse)
    {
    
      var isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      this.newUser(graphResponse.isNewUser);
      if(graphResponse.hasOwnProperty("strategyList") || graphResponse.strategyList !== undefined){
       
       
       this.view.isVisible = true;
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      this.view.lblStatus.text=graphResponse.myStrategyName;
      this.view.lblStrategyDetail.text=graphResponse.myStrategyName;
      this.view.lblStatusDetail.text = kony.i18n.getLocalizedString("i18n.wealth.strategy.userCurrentStrategy") + " " + graphResponse.myStrategyName;
      var len=graphResponse.strategyList.length;
      var lblLeft=graphResponse.strategyList[0].strategyName;
      var lblRight=graphResponse.strategyList[len-1].strategyName;
      this.view.InfoIconPopup.RichTextMarket.text=kony.i18n.getLocalizedString("i18n.wealth.strategy.popupCurrentStrategy") + " " + graphResponse.myStrategyName;
     var finalData={};
      var value = [];
      var sum=0;
      var data=graphResponse;
      var len=data.strategyList.length;
      for(i=0;i<len;i++)
        {
          value[i]=Math.round(100/len);
        }
         for (i = 0; i < len; i++) {
                if (data.strategyList[i].strategyName === data.myStrategyName || data.strategyList[i].strategyName === data.recStrategyName) {
                    sum += value[i] / 2;
                    break;
                } else {
                    sum += value[i];
                }
            }
            finalData.leftLabel=lblLeft;
            finalData.rightLabel=lblRight;
      finalData.valueArr=value;
      finalData.angle=Math.round(sum);
      this.view.AccelerometerChart.setData(finalData);
      }else{
        this.view.isVisible = false;
      }
    },
    navigateToStrategyAllocation: function () {
        var navManager = applicationManager.getNavigationManager();
        new kony.mvc.Navigation({
            "appName": "PortfolioManagementMA",
            "friendlyName": "frmStrategyAllocation"
        }).navigate();
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },
    infoVisibilityOn: function()
    {
      this.view.imgInfo.src = "bluealert_2.png";
      this.view.flxInfoPopup.setVisibility(true);
      this.view.InfoIconPopup.flxCross.onClick = this.infoVisibilityOff;
    },
    infoVisibilityOff: function()
    {
      this.view.flxInfoPopup.setVisibility(false);
      this.view.imgInfo.src = "group_10_copy_4.png";
    },
  };
});