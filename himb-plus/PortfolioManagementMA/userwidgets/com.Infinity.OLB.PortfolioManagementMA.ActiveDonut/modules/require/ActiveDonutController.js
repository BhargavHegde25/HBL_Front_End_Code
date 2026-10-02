/* eslint-disable */

define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'rowTemplateConfig', () => {
        return this._rowTemplateConfig;
      });
      defineSetter(this, 'rowTemplateConfig', value => {
        this._rowTemplateConfig = value;
      });
      defineGetter(this, 'headerTemplateConfig', () => {
        return this._headerTemplateConfig;
      });
      defineSetter(this, 'headerTemplateConfig', value => {
        this._headerTemplateConfig = value;
      });
    },
    goContext: function(context, labelData){
      let configParam = {
                  "serviceParameters": this._serviceParameters,
                  "dataMapping": this._dataMapping,
                  "rowTemplateConfig": this._rowTemplateConfig,
                   "headerTemplateConfig" : this._headerTemplateConfig
              };
      var assetArray= context.assets;
        var graphData=[];
        for(var i=0;i<assetArray.length;i++){
          graphData.push(Number(assetArray[i].weight));
        }
      
      if ( labelData !== undefined ){
        this.view.lblActive.text = labelData;
        this.view.flxActive.setVisibility(true);
        
      }else {
        this.view.flxActive.setVisibility(false);
      }
      
      this.view.segList.setConfigsFromParent(configParam);
      
      this.view.wealthDonut.drawDataChart(graphData);
      this.view.segList.updateContext(context);
    }

  };
});