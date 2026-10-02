/*eslint-disable*/
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._data = {};
      var WealthAllocationCheckChart = new kony.ui.CustomWidget({
        "id": "WealthAllocationCheckChart",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "WealthAllocationCheckChart",
        "chartData": this._data,
        "OnClickOfPie": function() {}
      });

      this.view.flxAllocationGraph.add(WealthAllocationCheckChart);

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    checkVisibility : function(isVisible){
      this.view.flxAllocationLegend.isVisible = isVisible;   
    },
    setLegendHeight : function(requiredHeight){
      this.view.flxAllocationLegend.top = requiredHeight+"px";
	  if (scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())) {
        this.view.flxLegendWrapper.left = "150px";
      } else {
        this.view.flxAllocationLegend.left = "140px";
      }
    },
    setData: function(response,legendwrapper){
      
      if(response.labelArray){
        var requiredHeight = response.labelArray.length * 80;
        this.view.flxAllocationGraph.height = (requiredHeight)+"px";
      }
      if(legendwrapper){
        this.view.lblCurrentWeight.text = legendwrapper.lbl1;
        this.view.lblStrategyWeight.text = legendwrapper.lbl2;
         this.view.lblCurrentWeight.skin = "bbSknLbl424242SSP15Px";
        this.view.lblStrategyWeight.skin = "bbSknLbl424242SSP15Px";
        this.view.flxAllocationLegend.centerX = "70%";
        this.view.flx7E04C4.skin = "sknCircle3AB1D6";
        this.view.flx3AB1D6.skin = "sknCircle7E04C4";
        
      }else{
        if(scope_WealthPresentationController.ishealthcheck || scope_WealthPresentationController.isStrategyAllocation){
        		this.view.lblCurrentWeight.text = kony.i18n.getLocalizedString("i18n.wealth.currentWeightOLB");
        		this.view.lblStrategyWeight.text = kony.i18n.getLocalizedString("i18n.wealth.strategyWeight");
      	}else{
                this.view.lblCurrentWeight.text = kony.i18n.getLocalizedString("i18n.wealth.expectedWeight");
                this.view.lblStrategyWeight.text = kony.i18n.getLocalizedString("i18n.wealth.strategyWeight");
         }
    
        this.view.lblCurrentWeight.skin = "sknlbl727272SSP17px";
        this.view.lblStrategyWeight.skin = "sknlbl727272SSP17px";
        this.view.flxAllocationLegend.centerX = "64%";
        this.view.flx7E04C4.skin = "sknCircle7E04C4";
        this.view.flx3AB1D6.skin = "sknCircle3AB1D6";
        
      }
      
      this.view.flxAllocationGraph.WealthAllocationCheckChart.chartData = response;
    }
  };
});