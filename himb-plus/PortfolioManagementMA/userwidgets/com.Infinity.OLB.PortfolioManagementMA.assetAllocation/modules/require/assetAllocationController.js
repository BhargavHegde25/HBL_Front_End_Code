/*eslint-disable*/
define(['./AssetAllocationDAO','./FormatUtils'],function(AssetAllocationDAO,FormatUtils) { 
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.completeResponse = {};
      this.assetParm={};
      this._data = {};
      this.view.btnViewAll.onClick = function() {
        var ntf = new kony.mvc.Navigation
        ("WealthPortfolioUIModule/frmAllocationCarousel");
        ntf.navigate();
      };
      //DAO Object
      this.AssetAllocationDAO = new AssetAllocationDAO();
      //Format util object
      this.FormatUtils = new FormatUtils();
      this.orientationHandler = new OrientationHandler();
      var assetLinechart = new kony.ui.CustomWidget({
        "id": "assetLineChartWealth",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "WealthAssetBarChart",
        "chartData": this._data,
        "OnClickOfPie": function () { }
      });

      this.view.flxChart.add(assetLinechart);
    },
    setServiceParm :function(serviceParm, failureCallback){
      this.assetParm=serviceParm;
      this.makeDaoCall(this.assetParm, failureCallback);
    },
    makeDaoCall: function(serviceParm, failureCallback){
      try{
        let objectServiceName = serviceParm.objectServiceName;
        let operationName = serviceParm.operationName;
        let objectName = serviceParm.objectName;
        let criteria = serviceParm.Criteria;
        this.AssetAllocationDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onServiceSuccess, failureCallback);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onServiceSuccess: function(data,unicode){
      if(data.asset !== undefined){
      this.completeResponse = data;
      this.completeResponse.asset=this.sortData(this.completeResponse.asset,"weightByAssetClass");
      this.assetExecution(this.completeResponse);
      this.setAssetAllocationGraphVisibility(true);
      }else{
        this.setAssetAllocationGraphVisibility(false);
      }
    },
    assetExecution: function(data){
      let filteredData= this.filterChartData(data);
      this.createBarChart(filteredData);   
    },
    filterChartData: function(data){
      let chartData = data.asset;
      let xData = [];
      let yLabels = [];
      let value = [];
      xData= chartData.map(x => x.weightByAssetClass);
      yLabels=chartData.map(y => y.assetClass);
      value=chartData.map(d => d.valueByAssetClass);
      currency=chartData.map(c => c.baseCurrency);
      return {
        data: chartData, xData, yLabels,value,currency
      };
    },
        sortData: function(data, key){
      function sortByKey(a, b) {
        var x = parseFloat(a[key]);
        var y = parseFloat(b[key]);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
   return(data.sort(sortByKey));
    },
    //Logic for getters/setters of custom properties
    createBarChart:function(chartData){    
      var chartColors = ["54D75D","77BC43","008495","23A8B1","7BCCC4",
                         "3BE2B2","E7417A","E8705B","FF8600","F7EA3A",
                         "7E04C4","BF0404","B9SEE8","6753EC","3897D6",
                         "4176A4","3645A7","0273E3","646E83","BDBDBD"];
      var finalData = {};
      var dataArray = [];
      dataArray[0]=chartData.xData;
      finalData.labels =chartData.yLabels;
      finalData.data =dataArray;
      var segData = [];
      var storeData;
      var j=chartData.yLabels.length-1;
      for(var i=0;i<chartData.yLabels.length;i++)
      {
        storeData={
          label:  chartData.yLabels[i],
		  data : "("+this.FormatUtils.
                    formatValueAndAppendPercentageSymbol
                  (chartData.xData[i])+")",
		  value: this.FormatUtils.
                  appendCurrencySymbol(chartData.value[i].trim() === ""? 0.00 :
                  this.FormatUtils.formatAmount(chartData.value[i]),chartData.currency[i]),
          background:{
            backgroundColor: chartColors[j],
            borderColor: '000000'
          }
        };
        segData.push(storeData);
        j--;
      }

      this.view.segAssetDetail.widgetDataMap={
        lblAsset: "label",
        lblWeight: "data",
        lblValue:"value",
        flxDot: "background"
      }; 
      this.view.segAssetDetail.setData(segData); 
      this.view.flxChart.assetLineChartWealth.chartData = finalData;

    },
    


    initGettersSetters: function() {
    }
  };
});