/* eslint-disable */

define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      /*defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });*/
      /*defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });*/
      /*defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });*/
      /*defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });*/
      /*defineGetter(this, 'rowTemplateConfig', () => {
        return this._rowTemplateConfig;
      });*/
      /*defineSetter(this, 'rowTemplateConfig', value => {
        this._rowTemplateConfig = value;
      });*/
      /*defineGetter(this, 'headerTemplateConfig', () => {
        return this._headerTemplateConfig;
      });*/
      /*defineSetter(this, 'headerTemplateConfig', value => {
        this._headerTemplateConfig = value;
      });*/
    },
    goContext: function(context, labelData){
      this.view.segAsset.rowTemplate = "flxSegMyStrategyOLB";
      this.view.segAsset.widgetDataMap = {
                lblAsset: "assetName",
                lblValue: "weightWithPercent",
                flxDot: "background",
            };
      var assetArray= context.recStrategy[0].assetsCompo;
        var graphData=[];
        for(var i=0;i<assetArray.length;i++){
          graphData.push(Number(assetArray[i].weight));
        }
      
      if ( labelData !== undefined ){
        this.view.img1.src = (labelData === "Active")? labelData+"_one.png" : labelData+".png";
        this.view.lblActive.text = labelData;
        this.view.lblActive.skin="sknSSPSemiBold42424220px";
        this.view.flxActive.setVisibility(true);
        
      }else {
        this.view.flxActive.setVisibility(false);
      }
      
      this.view.wealthDonut.drawDataChart(graphData);
      this.view.segAsset.setData(context.recStrategy[0].assetsCompo);
      this.view.segAsset.setVisibility(true);
      
      //Pulkit, IW-3316 - fix start
	  if(kony.application.getCurrentBreakpoint() === 1024){
      this.view.flxDonut.width = "43%";
      this.view.wealthDonut.top = "-40dp";
      }
	  //IW-3316 ends
    }

  };
});