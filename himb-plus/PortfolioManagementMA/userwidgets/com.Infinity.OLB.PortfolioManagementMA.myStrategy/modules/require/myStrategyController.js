/* eslint-disable */
define(['./myStrategyDAO'],function(myStrategyDAO) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.businessController = new myStrategyDAO();
          this.context = {};
          
          this._data = {};
      var StrategyDonutChart = new kony.ui.CustomWidget({
        "id": "StrategyDonutChart",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "StrategyDonutChart",
        "chartData": this._data,
        "OnClickOfPie": function() {}
      });
          this.view.btnChangeStrategy.onTouchEnd=function(){
            new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmChangeStrategy"}).navigate();
          };

      this.view.flxChart.add(StrategyDonutChart);
    
          
          

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'serviceCall', () => {
                return this._serviceCall;
            });
            defineSetter(this, 'serviceCall', value => {
                this._serviceCall = value;
            });
            
        },
      setBtn: function(isPermission){
        
          this.view.btnChangeStrategy.isVisible = isPermission;
         if(!isPermission){
           this.view.flxBodyMain.height = "467px";
         }
       
        
      },
       setContext: function(context){
      var scope = this;
      try {
        this.context = context;
        this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
       
      } catch (err) {
        scope.setError(err, "setContext");
      }
        
        
      
       },
      onServiceSuccess: function(response){
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmChooseStrategy", response);
       this.view.lblStatus.text = response.myStrategyName;
      if(response.myStrategyName==="Active"){
        this.view.imgStatus.src = "active_one.png";
	  }
      else{
        this.view.imgStatus.src = response.myStrategyName.toLowerCase()+".png";
      }
      var assetArray=response.assets;
      var segLength = assetArray.length;
      this.sendData(segLength);
      var graphData=[];
      for(var i=0;i<assetArray.length;i++){
        graphData.push(Number(assetArray[i].weight));
      }
      this.view.flxChart.StrategyDonutChart.chartData = graphData;
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
      this.view.segStrategy.widgetDataMap = {
        lblAsset: "assetName",
        lblValue: "weight",
        flxDot: "background"
      };
        this.view.segStrategy.setData(segData);

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