/*eslint-disable*/
define(['./AllocationDAO','./FormatUtils'],function(AllocationDAO,FormatUtils) {
 
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this.completeResponse = {};
            this.sectorResponse = {};
            this.assetParm={};
            this.sectorParm={};
            //DAO Object
            this.AllocationDAO = new AllocationDAO();
            //Format util object
            this.FormatUtils = new FormatUtils();
            this.orientationHandler = new OrientationHandler();
			var self = this;
			this.view.lblTab1.onTouchEnd = function() {
              self.assetCall();
            };
           this.view.lblTab2.onTouchEnd = function() {
             self.sectorCall();
           };
           this.view.lblTab3.onTouchEnd = function() {
             self.regionCall();
           };
            this.view.lblTab4.onTouchEnd = function() {
              self.currencyCall();  
            };
            var multiLinechart = new kony.ui.CustomWidget({
                "id": "multiLinechartWealth",
                "isVisible": true,
                "width": "100%",
                "height": "100%",
                }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
                }, {
                "widgetName": "WealthBarChart",
                "chartData": this._data,
                "OnClickOfPie": function () { }
              });        
              this.view.flxChart.add(multiLinechart);
        },

      assetCall: function(){
        this.assetExecution("asset",this.completeResponse);
      },
      sectorCall: function(){
        this.sectorExecution("sector",this.sectorResponse);
      },
       regionCall: function(){
        this.regionExecution("region",this.completeResponse);
      },
       currencyCall: function(){
        this.currencyExecution("currency",this.completeResponse);
      },
        setServiceParm: function(serviceParm,sectorParm){
            this.assetParm=serviceParm;
            this.sectorParm=sectorParm;
            this.makeSectorDaoCall(this.sectorParm);
            this.makeDaoCall(this.assetParm);
          },
          makeDaoCall: function(serviceParm){
            try{
              let objectServiceName = serviceParm.objectServiceName;
              let operationName = serviceParm.operationName;
              let objectName = serviceParm.objectName;
              let criteria = serviceParm.Criteria;
              this.AllocationDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onServiceSuccess,this.onError);
              this.makeSectorDaoCall(this.sectorParm); 
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
      
          makeSectorDaoCall: function(sectorParm){
            try{
              let objectServiceName = sectorParm.objectServiceName;
              let operationName = sectorParm.operationName;
              let objectName = sectorParm.objectName;
              let criteria = sectorParm.Criteria;
              this.AllocationDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,this.onSectorServiceSuccess,this.onError);
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
          onSectorServiceSuccess: function(data,unicode){
            this.sectorResponse = data;
          },
          onServiceSuccess: function(data,unicode){
            this.completeResponse = data;
            this.assetExecution("asset",this.completeResponse);
          },
      sortData: function(data, key) {
            function sortByKey(a, b) {
                var x = parseFloat(a[key]);
                var y = parseFloat(b[key]);
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
            return (data.sort(sortByKey));
        },
          assetExecution: function(filter,data){
            data.asset = this.sortData(data.asset, "weightByAssetClass");
            if (kony.application.getCurrentBreakpoint() === 1024||this.orientationHandler.isTablet)
              {this.filterTabletBorderPosition(filter);}
            else
              {
                this.view.flxGraph.height = '220px';
                this.filterBorderPosition(filter);
              }
            let filteredData= this.filterChartData(filter,data);
            this.createBarChart(filteredData, filter);   
          },
      
          sectorExecution: function(filter,data){
            if (kony.application.getCurrentBreakpoint() === 1024||this.orientationHandler.isTablet)
              {this.filterTabletBorderPosition(filter);}
            else
              {
                this.filterBorderPosition(filter);
                this.view.flxGraph.height = '350px';
              }
            let filteredData= this.getSectorData(data);
            this.createBarChart(filteredData, filter);     
          },
      
          regionExecution: function(filter,data){
            data.region = this.sortData(data.region, "weightByRegion");
            if (kony.application.getCurrentBreakpoint() === 1024||this.orientationHandler.isTablet)
              {this.filterTabletBorderPosition(filter);}
            else
              {
                this.filterBorderPosition(filter);
                this.view.flxGraph.height = '220px';
              }
            let filteredData= this.filterChartData(filter,data);
            this.createBarChart(filteredData, filter);    
          },
      
          currencyExecution: function(filter,data){
            data.currency = this.sortData(data.currency, "weightByCurrency");
           if (kony.application.getCurrentBreakpoint() === 1024||this.orientationHandler.isTablet)
              {this.filterTabletBorderPosition(filter);}
            else
              {
                this.filterBorderPosition(filter);
                this.view.flxGraph.height = '220px';
              }
            let filteredData= this.filterChartData(filter,data);
            this.createBarChart(filteredData, filter);   
          },
          filterChartData: function(filter,data){
      
            let chartData = data[filter];
            let xData = [];
            let yLabels = [];
            let value = [];
            switch (filter) {
              case 'asset': 
              xData= chartData.map(x => x.weightByAssetClass);
              yLabels=chartData.map(y => y.assetClass);
              value=chartData.map(d => d.valueByAssetClass);
	      currency=chartData.map(c => c.baseCurrency);
                break;
              case 'currency': 
                xData= chartData.map(x => x.weightByCurrency);
                yLabels=chartData.map(y => y.sectorCurrency);
                value=chartData.map(d => d.valueByCurrency);
		currency=chartData.map(c => c.baseCurrency);
                break;
              case 'region':
                xData= chartData.map(x => x.weightByRegion||'0');
                yLabels=chartData.map(y => y.region);
                value=chartData.map(d => d.valueByRegion);
		currency=chartData.map(c => c.baseCurrency);
                break;
              case 'sector':
                xData= chartData.map(x => x.weight);
                yLabels=chartData.map(y => y.sector);
                value=chartData.map(d => d.value);
		currency=chartData.map(c => this.sectorResponse.referenceCurrency);
                break;
            }
            return {
              data: chartData, xData, yLabels,value, currency
            };
          },
          getSectorData: function(data){
            var resArray=data.portfolioHoldings;
            var sectorGrouping = {};
            var total = 0;
            resArray.forEach(function(holding) {
              if (!(holding.marketValue.trim() === "")) {
                if (sectorGrouping.hasOwnProperty(holding.sector)) {
                  sectorGrouping[holding.sector].value = 
                    parseFloat(parseFloat(sectorGrouping[holding.sector].value)) 
                    + parseFloat(parseFloat(holding.marketValue).toFixed(2));
                } else {
                  sectorGrouping[holding.sector] = {};
                  sectorGrouping[holding.sector].value =
                    parseFloat(parseFloat(holding.marketValue).toFixed(2));
                }
                total += parseFloat(parseFloat(holding.marketValue).toFixed(2));
              } else {
                if (!sectorGrouping.hasOwnProperty(holding.sector)) {
                  sectorGrouping[holding.sector] = {};
                  sectorGrouping[holding.sector].value = 0.00;
                }
              }

            });
            if (!scope_WealthPresentationController.isTAPIntegration) {
              const [cash] = this.completeResponse.asset.filter(
                (asset) => asset.assetClass === 'Cash');
              if (cash && cash.valueByAssetClass.trim() !== '') {
                total += parseFloat(cash.valueByAssetClass);
                sectorGrouping[cash.assetClass] = {};
                sectorGrouping[cash.assetClass].value =
                  parseFloat(cash.valueByAssetClass);
              }
            }
            const datas = Object.keys(sectorGrouping).map(function(sector){
              const weight = (parseFloat(sectorGrouping[sector].value) 
                              / total) * 100;
              return {
                'sector': sector,
                'value': sectorGrouping[sector].value,
                'weight': weight.toString(),
              };
            });
              datas.sort(function (x, y){
               return x.weight - y.weight;
                });
            datas.reverse();
            let filteredData= this.filterChartData('sector', {'sector': datas});
            return filteredData;
          },
		      getTabText: function(filter) {
            switch(filter) {
              case 'asset':
                return kony.i18n.getLocalizedString("i18n.wealth.asset");
              case 'sector':
                return kony.i18n.getLocalizedString("i18n.wealth.sector");
              case 'region':
				  return kony.i18n.getLocalizedString("i18n.wealth.region");
              case 'currency':
                return kony.i18n.getLocalizedString("i18n.wealth.currency");
            }
          },
//           formatAmount: function(amount) {
// 			       //return amount.toFixed(2);
//              return amount.toString().split(".").map((item, index) =>
//             (index === 1 ? item.substring(0, 2) : item)).join(".");
//           },
          createBarChart:function(chartData, filter){    
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
            var storeDataH;
              storeDataH={
                labelH: {
                  text: this.getTabText(filter),
                  left: '-10px'
                },
                label: {
                  text: this.getTabText(filter),
                  left: '-10px',
                  skin : 'sknlbl727272SSPReg15px'
                },
                valueH: kony.i18n.getLocalizedString("i18n.wealth.value"),
                value: {
                  text: kony.i18n.getLocalizedString("i18n.wealth.value"),
                  skin : 'sknlbl727272SSPReg15px'
                },
                weightH: kony.i18n.getLocalizedString("i18n.wealth.weight"),
                data:  {
                  text: kony.i18n.getLocalizedString("i18n.wealth.weight"),
                  skin : 'sknlbl727272SSPReg15px'
                },
                background: { backgroundColor: "ffffff" }
              };
              segData.push(storeDataH);
            var j=chartData.yLabels.length-1;
            for(var i=0;i<chartData.yLabels.length;i++)
            {
//               const formattedValue = chartData.value[i].toString()
//               .trim() === "" ? 0.00 : this.formatAmount(chartData.value[i]);
              const formattedValue = chartData.value[i].toString()
              .trim() === "" ? 0.00 :chartData.value[i];
              storeData={
                label: chartData.yLabels[i],
                data: this.FormatUtils.
                      formatValueAndAppendPercentageSymbol(chartData.xData[i]),
                value:this.FormatUtils.
                      appendCurrencySymbol(this.FormatUtils.formatAmount(formattedValue),
                      chartData.currency[i]),
                background:{
                  backgroundColor: chartColors[j]
                }
              };
              segData.push(storeData);
              j--;
            }

            
            this.view.segClassDetail.widgetDataMap={
              lblClass: "label",
              lblWeight: "data",
              lblValue:"value",
              flxDot: "background",
              lblHClass: "labelH",
              lblHValue: "valueH",
              lblHWeight: "weightH"
              
            };
            
            this.view.segClassDetail.setData(segData);
            //this.view.segClassDetail.data[0][0].lblClass = this.getTabText(filter)
            this.view.flxChart.multiLinechartWealth.chartData = finalData;
          },
          filterBorderPosition: function(filter) {
            this.view.lblTab1.skin = "sknLblSSP72727217px";
            this.view.lblTab2.skin = "sknLblSSP72727217px";
            this.view.lblTab3.skin = "sknLblSSP72727217px";
            this.view.lblTab4.skin = "sknLblSSP72727217px";
			this.view.flxChart.width = '490px';
            this.view.segClassDetail.width = '482px';
            //this.view.flxChart.width = '50%';
            //this.view.segClassDetail.width = '45%';
            this.view.segClassDetail.setVisibility(true);
            if (filter === 'asset') {
              this.view.flxFilterBorder.left = "10px";
              this.view.lblTab1.skin = "ICSknbbSknLbl424242SSP17Px";
            } else if (filter === 'region') {
              this.view.flxFilterBorder.left = "363px";
              this.view.lblTab3.skin = "ICSknbbSknLbl424242SSP17Px";
            } else if (filter === 'currency') {
              this.view.flxFilterBorder.left = "532px";
              this.view.lblTab4.skin = "ICSknbbSknLbl424242SSP17Px";
            } else {
              this.view.flxFilterBorder.left = "190px";
              this.view.lblTab2.skin = "ICSknbbSknLbl424242SSP17Px";
            }
          },
             filterTabletBorderPosition: function(filter) {
	    this.view.lblTab1.left = '0px';
            this.view.flxChart.width = '70%';
            this.view.segClassDetail.width = '75%';
            this.view.lblTab1.skin = "sknLblSSP72727217px";
            this.view.lblTab2.skin = "sknLblSSP72727217px";
            this.view.lblTab3.skin = "sknLblSSP72727217px";
            this.view.lblTab4.skin = "sknLblSSP72727217px";
            this.view.segClassDetail.setVisibility(true);
            if (filter === 'asset') {
              scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxFilterBorder.right = "78%":this.view.flxFilterBorder.left = "1.5%";
              this.view.lblTab1.skin = "ICSknbbSknLbl424242SSP17Px";
            } else if (filter === 'region') {
              scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxFilterBorder.right = "28%":this.view.flxFilterBorder.left = "53%";
              this.view.lblTab3.skin = "ICSknbbSknLbl424242SSP17Px";
            } else if (filter === 'currency') {
              scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxFilterBorder.right = "1.5%":this.view.flxFilterBorder.left = "78%";
              this.view.lblTab4.skin = "ICSknbbSknLbl424242SSP17Px";
            } else {
             scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?this.view.flxFilterBorder.right = "53%":this.view.flxFilterBorder.left = "28%";
              this.view.lblTab2.skin = "ICSknbbSknLbl424242SSP17Px";
            }
          },

        
    };
});
