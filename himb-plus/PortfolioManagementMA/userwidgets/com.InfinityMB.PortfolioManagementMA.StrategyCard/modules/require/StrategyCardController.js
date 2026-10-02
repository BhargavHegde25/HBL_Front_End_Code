/*eslint-disable*/
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.arrname = [];
      this.view.flxButton.onTouchEnd = this.selectedCard;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setData: function(cardNumber,segData, graphData, strategyName, onClickMethod) {
      var widgetMap = {
        "lblName": "assetName",
        "lblPercent": "weight",
        "flxLegend": "background",
        "flxStrategy":"flxStrategy",
        "flxMain":"flxMain"
      };
      this.view.segLegends.widgetDataMap = widgetMap;
      this.view.segLegends.setData(segData);
      this.clickStrategy = onClickMethod;

      if(cardNumber === 0){
        this.view.lblHeader2.text = kony.i18n.getLocalizedString("i18n.wealth.recommended");
        this.view.lblWarning.text = kony.i18n.getLocalizedString("i18n.wealth.changeStrategyStatement");
        this.view.imgWarning.setVisibility(false);
        scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.lblWarning.right = "20dp":this.view.lblWarning.left = "24dp";
      }

      this.view.forceLayout();
      if(strategyName==="Active"){
        this.view.imgDynamic.src = "active_one.png";
      }
      else{
        this.view.imgDynamic.src = strategyName.toLowerCase()+".png";
      }

      this.view.lblHeader1.text = strategyName;
      this.arrname.push(this.view.lblHeader1.text);
      kony.timer.schedule("timer"+cardNumber,this.drawWealthStrategyChart.bind(this, graphData), 2, false);
    },

    updateSkins : function()
    {
	  this.view.lblButton.text = kony.i18n.getLocalizedString("i18n.wealth.selectedStrategy");
      this.view.flxCard.skin = "sknFBox04a615rad10px";
      this.view.flxButton.skin = "sknFBox04a615rad15px";
      this.view.imgButton.src = "selectgoalwealth.png";
      this.view.imgButton.width = "24dp";
      this.view.imgButton.height = "24dp";
      this.view.imgButton.right = "16dp";
    },

    updateSkinsNull: function(){
	  this.view.lblButton.text = kony.i18n.getLocalizedString("i18n.wealth.selectStrategy");
      this.view.flxCard.skin = "sknFlxe3e3e3rad10px";
      this.view.flxButton.skin = "sknFlxa0a0a0rad15px";
      this.view.imgButton.src = "radiobuttoninactive_big.png";
      this.view.imgButton.width = "36dp";
      this.view.imgButton.height = "36dp";
      this.view.imgButton.right = "7dp";
    },

    selectedCard : function ()
    {
      var clickedname = this.arrname[0];            
      this.clickStrategy(clickedname);
    },


    drawWealthStrategyChart: function(graphData){

      this.view.brwChart.evaluateJavaScript("drawStrategyDonutChart("+JSON.stringify(graphData)+");");	         

    },

  };
});