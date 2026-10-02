/* eslint-disable */
define(['./myStrategyDAO'],function(myStrategyDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new myStrategyDAO();
      this.view.flxOptions.onTouchEnd = this.navigateToChangeStr;
      this.context = {};
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'widgetMapping', () => {
        return this._widgetMapping;
      });
      defineSetter(this, 'widgetMapping', value => {
        this._widgetMapping = value;
      });
      defineGetter(this, 'serviceCall', () => {
        return this._serviceCall;
      });
      defineSetter(this, 'serviceCall', value => {
        this._serviceCall = value;
      });
    },
hideFlex: function(isVisible){
      this.view.flxRight.isVisible = isVisible;
    },
    setContext: function (context, setChangeStr) {
      var scope = this;
      try {
        this.context = context;
        this.setChangeStrategy = setChangeStr;
         this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    onServiceSuccess: function(response){
      try{
   this.view.lblStrategyName.text = response.myStrategyName;
        
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo('frmChangeStrat', response.myStrategyName);
          
      var assetArray=response.assets;
      var graphData=[];
      for(var i=0;i<assetArray.length;i++){
        graphData.push(Number(assetArray[i].weight));
      }
      
      var segData=[];
      var storeData;
      var colArray =["0475C4","43A2CA","7BCCC4","BAE4BC","E9FED4","E55845","E48444","E8DD46","54D75D","04C477","6753EC","E3E3E3","424242"];
      var j=0;
      for(var k=0;k<assetArray.length;k++){
        storeData={
          assetName: assetArray[k].assetName,
          weight: assetArray[k].weight+'%',
          background:{
            backgroundColor: colArray[j]           
          }
        };
        segData.push(storeData);
        j++;
      }
      this.view.segStrategyCard.widgetDataMap = this._widgetMapping;
      this.view.segStrategyCard.setData(segData);
      this.view.brwStrategyChart.onPageFinished = this.drawWealthStrategyChart(graphData);
    }catch(err) {
        this.setError(err, "onServiceSuccess");
      }
      },
    drawWealthStrategyChart: function(graphData){
      try{
      this.view.brwStrategyChart.evaluateJavaScript("drawStrategyDonutChart("+JSON.stringify(graphData)+");");	         
        }catch(err) {
        this.setError(err, "drawWealthStrategyChart");
      }
    },
    
    navigateToChangeStr:function(){
      this.setChangeStrategy();
    },
    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
    },
    
    onError: function(err) {
      kony.print(JSON.stringify(err));
    }

  };
});