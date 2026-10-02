define(['./AllocationCarousalBusinessController', './FormatUtils'], function (AllocationCarousalBusinessController, FormatUtils) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.businessController = new AllocationCarousalBusinessController(this);
      this.FormatUtils = new FormatUtils();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      this.preShow();
      defineGetter(this, 'tabData', () => {
        return this._tabData;
      });
      defineSetter(this, 'tabData', value => {
        this._tabData = value;
      });
    },
assetResponse:{},
    sectorData:{},
    

    
    preShow: function(){
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      this.businessController = new AllocationCarousalBusinessController(this);
      this.FormatUtils = new FormatUtils();
      let assetRequestParams={"portfolioId":wealthModule.portfolioId};
      let sectorRequestParams= { "portfolioId":wealthModule.portfolioId,
      "sortBy":"description",
      "sortOrder":"ASC",
      "navPage":"Holdings"
      }
      this.businessController.fetchDetails("PortfolioServicing","getAllocation","PortfolioDetails",assetRequestParams,"asset");
      this.businessController.fetchDetails("PortfolioServicing","getPortfolioHoldings","PortfolioDetails",sectorRequestParams,"sector");
      this.view.flxTab.isVisible=false;
      this.view.flxSeg.isVisible=false;
      this.view.flxChart.isVisible=false;
      this.view.flxDetails.isVisible=false;
      
    },
    
    
    setTabData: function () {
      var scope = this;
      try {
        this.view.btnAssest1.onClick=this.setAssetData;
        this.view.btnSector1.onClick=this.setSectorData;
        this.view.btnRegion1.onClick=this.setRegionData;
        this.view.btnCurrency1.onClick=this.setCurrencyData;
        let param = [{
          key: "asset",
          label: kony.i18n.getLocalizedString("i18n.wealth.asset"),
          onClick: this.tabSelection,
          selected: true
        },
        {
          key: "sector",
          label: kony.i18n.getLocalizedString("i18n.wealth.sector"),
          onClick: this.tabSelection
        },
        {
          key: "region",
          label: kony.i18n.getLocalizedString("i18n.wealth.region"),
          onClick: this.tabSelection
        },
        {
          key: "currency",
          label: kony.i18n.getLocalizedString("i18n.wealth.currency"),
          onClick: this.tabSelection
        }];
        scope.view.Tabs.setData(param,false);
      }
      catch (err) {
        kony.print(err);
      }
    },

    goBack: function(){
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmPortfolioDetails");
    },

    tabSelection: function (key) {
      try {
        if (key === "asset") {
          this.setAssetData();
        }
        else if (key === "sector") {
          this.setSectorData();
        }
        else if (key === "region") {
          this.setRegionData();
        }
        else if (key === "currency") {
          this.setCurrencyData();
        }
      }
      catch (err) {
        kony.print(err);
      }
    },


    setConfigsFromParent: function (configParams) {
      var scope = this;
      try {
        if (!scope.isEmptyNullUndefined(configParams)) {
          for (let config in configParams) {
            if (!kony.sdk.isNullOrUndefined(configParams[config])) {
              this["_" + config] = configParams[config];
            }
          }
        }
      } catch (err) {
        scope.setError(err, "setConfigsFromParent");
      }
    },

    
    setAssetData: function () {
      var scope = this;
      try {
        this.view.btnAssest1.skin='ICSknBtn003E7535PX';
        this.view.btnSector1.skin='ICSknBtn003E75Bffffff34pxBord0px';
        this.view.btnRegion1.skin='ICSknBtn003E75Bffffff34pxBord0px';
        this.view.btnCurrency1.skin='ICSknBtn003E75Bffffff34px';
        var navManager = applicationManager.getNavigationManager();
        let totalValue= navManager.getCustomInfo("AllocationTotalValue")
        scope.view.lblValue.text=totalValue
        scope.view.chart.brwChart.enableJsInterface = true;
        let assetArray = [];
        assetArray[0] = [];
        let labelArray = [];
        let chartcolors = ["#54D75D", "#77BC43", "#008495", "#23A8B1", "#7BCCC4", "#3BE2B2", "#E7417A", "#E8705B",
          "#FF8600", "#F7EA3A", "#7E04C4", "#BF0404", "#B9SEE8", "#6753EC", "#3897D6", "#4176A4",
          "#3645A7", "#0273E3", "#646E83", "#BDBDBD"];

        let chartColorsSeg = ["54D75D", "77BC43", "008495", "23A8B1", "7BCCC4", "3BE2B2", "E7417A", "E8705B",
          "FF8600", "F7EA3A", "7E04C4", "BF0404", "B9SEE8", "6753EC", "3897D6", "4176A4",
          "3645A7", "0273E3", "646E83", "BDBDBD"];
        scope.assetResponse.asset=scope.sortData(scope.assetResponse.asset,"weightByAssetClass");
        let j = Object.keys(scope.assetResponse.asset).length - 1;
        for (let i in scope.assetResponse.asset) {
          //scope.view.lblValue.text= scope.FormatUtils.appendCurrencySymbol(scope.assetResponse.asset[i].totalValue,scope.assetResponse.asset[i].baseCurrency);
          labelArray.push(this.assetResponse.asset[i].assetClass);
          assetArray[0].push(parseInt(this.assetResponse.asset[i].weightByAssetClass));
          scope.assetResponse.asset[i].background = {
            backgroundColor: chartColorsSeg[j]
          }
          j--;
          scope.assetResponse.asset[i].amtWithSymbol = scope.FormatUtils.formatAmountAndAddCurrencySymbol(scope.assetResponse.asset[i].valueByAssetClass, scope.assetResponse.asset[i].baseCurrency);
          scope.assetResponse.asset[i].perWithSymbol = ' (' + scope.FormatUtils.formatValueAndAppendPercentageSymbol(scope.assetResponse.asset[i].weightByAssetClass) + ')';
          scope.assetResponse.asset[i].name = scope.assetResponse.asset[i].assetClass + scope.assetResponse.asset[i].perWithSymbol;
        }
        scope.view.chart.brwChart.height = scope.assetResponse.asset.length * 50 <150 ? 150 : scope.assetResponse.asset.length * 50;
        scope.view.chart.setChartData(labelArray, assetArray, chartcolors);
        let configParam = {
          "serviceParameters": "",
          "dataMapping": {
            "segListDetail": {
              "segmentMasterData": "${CNTX.asset}",
              "segmentUI": {
                "headerTemplate": {

                },
                "rowTemplate": {
                  "flxLegend": "${segmentMasterData.background}",
                  "lblName": "${segmentMasterData.name}",
                  "lblPercent": "${segmentMasterData.perWithSymbol}",
                  "lblAmount": "${segmentMasterData.amtWithSymbol}"
                }
              }
            }
          },
          "dataFormatting": "",
        };
        scope.view.segList.setConfigsFromParent(configParam);
        scope.view.segList.setContext(scope.assetResponse);
        scope.view.segList.updateContext();
        this.view.flxTab.isVisible=true;
        this.view.flxSeg.isVisible=true;
        this.view.flxChart.isVisible=true;
        this.view.flxDetails.isVisible=true;
      }
      catch (err) {
        kony.print(err);
      }
    },
sortData: function(data, key){
  function sortByKey(a, b) {
    var x = parseFloat(a[key]);
    var y = parseFloat(b[key]);
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  }
	return(data.sort(sortByKey));
},

    setRegionData: function () {
      var scope = this;
      try {
        this.view.btnAssest1.skin='ICSknBtn003E75Bffffff34px';
        this.view.btnSector1.skin='ICSknBtn003E75Bffffff34pxBord0px';
        this.view.btnRegion1.skin='ICSknBtn003E7535PXBord0px';
        this.view.btnCurrency1.skin='ICSknBtn003E75Bffffff34px';
        scope.view.chart.brwChart.enableJsInterface = true;
        let assetArray = [];
        assetArray[0] = [];
        let labelArray = [];
        let chartcolors = ["#54D75D", "#77BC43", "#008495", "#23A8B1", "#7BCCC4", "#3BE2B2", "#E7417A", "#E8705B",
          "#FF8600", "#F7EA3A", "#7E04C4", "#BF0404", "#B9SEE8", "#6753EC", "#3897D6", "#4176A4",
          "#3645A7", "#0273E3", "#646E83", "#BDBDBD"];

        let chartColorsSeg = ["54D75D", "77BC43", "008495", "23A8B1", "7BCCC4", "3BE2B2", "E7417A", "E8705B",
          "FF8600", "F7EA3A", "7E04C4", "BF0404", "B9SEE8", "6753EC", "3897D6", "4176A4",
          "3645A7", "0273E3", "646E83", "BDBDBD"];
        let j = Object.keys(scope.assetResponse.region).length - 1;
        scope.assetResponse.region=scope.sortData(scope.assetResponse.region,"weightByRegion");
        for (let i in this.assetResponse.region) {
          labelArray.push(this.assetResponse.region[i].region);
          assetArray[0].push(parseInt(this.assetResponse.region[i].weightByRegion));
          scope.assetResponse.region[i].background = {
            backgroundColor: chartColorsSeg[j]
          }
          j--;
         
          //var formatedamt = scope.FormatUtils.formatAmount(scope.assetResponse.region[i].valueByRegion, scope.assetResponse.region[i].baseCurrency);
         // scope.assetResponse.region[i].amtWithSymbol = scope.FormatUtils.appendCurrencySymbol(formatedamt,scope.assetResponse.region[i].baseCurrency);


          
          scope.assetResponse.region[i].amtWithSymbol = scope.FormatUtils.formatAmountAndAddCurrencySymbol(scope.assetResponse.region[i].valueByRegion, scope.assetResponse.region[i].baseCurrency);
          scope.assetResponse.region[i].perWithSymbol = ' (' + scope.FormatUtils.formatValueAndAppendPercentageSymbol(scope.assetResponse.region[i].weightByRegion) + ')';
           scope.assetResponse.region[i].name = scope.assetResponse.region[i].region + scope.assetResponse.region[i].perWithSymbol;
        }
        scope.view.chart.brwChart.height = scope.assetResponse.region.length * 50 < 150 ? 150 : scope.assetResponse.region.length * 50;
        scope.view.chart.setChartData(labelArray, assetArray, chartcolors);
        let configParam = {
          "serviceParameters": "",
          "dataMapping": {
            "segListDetail": {
              "segmentMasterData": "${CNTX.region}",
              "segmentUI": {
                "headerTemplate": {

                },
                "rowTemplate": {
                  "flxLegend": "${segmentMasterData.background}",
                  "lblName": "${segmentMasterData.name}",
                  "lblPercent": "${segmentMasterData.perWithSymbol}",
                  "lblAmount": "${segmentMasterData.amtWithSymbol}"
                }
              }
            }
          },
          "dataFormatting": "",
        };
        scope.view.segList.setConfigsFromParent(configParam);
        scope.view.segList.setContext(scope.assetResponse);
        scope.view.segList.updateContext();
      }
      catch (err) {
        kony.print(err);
      }
    },

    setCurrencyData: function () {
      var scope = this;
      try {
        scope.view.chart.brwChart.enableJsInterface = true;
        this.view.btnAssest1.skin='ICSknBtn003E75Bffffff34px';
        this.view.btnSector1.skin='ICSknBtn003E75Bffffff34pxBord0px';
        this.view.btnRegion1.skin='ICSknBtn003E75Bffffff34pxBord0px';
        this.view.btnCurrency1.skin='ICSknBtn003E7535PX';
        let assetArray = [];
        assetArray[0] = [];
        let labelArray = [];
        let chartcolors = ["#54D75D", "#77BC43", "#008495", "#23A8B1", "#7BCCC4", "#3BE2B2", "#E7417A", "#E8705B",
          "#FF8600", "#F7EA3A", "#7E04C4", "#BF0404", "#B9SEE8", "#6753EC", "#3897D6", "#4176A4",
          "#3645A7", "#0273E3", "#646E83", "#BDBDBD"];

        let chartColorsSeg = ["54D75D", "77BC43", "008495", "23A8B1", "7BCCC4", "3BE2B2", "E7417A", "E8705B",
          "FF8600", "F7EA3A", "7E04C4", "BF0404", "B9SEE8", "6753EC", "3897D6", "4176A4",
          "3645A7", "0273E3", "646E83", "BDBDBD"];
        scope.assetResponse.currency=scope.sortData(scope.assetResponse.currency,"weightByCurrency");
        let j = Object.keys(scope.assetResponse.currency).length - 1;
        for (let i in this.assetResponse.currency) {
          labelArray.push(this.assetResponse.currency[i].sectorCurrency);
          assetArray[0].push(parseInt(this.assetResponse.currency[i].weightByCurrency));
          scope.assetResponse.currency[i].background = {
            backgroundColor: chartColorsSeg[j]
          }
          j--;
          scope.assetResponse.currency[i].amtWithSymbol = scope.FormatUtils.formatAmountAndAddCurrencySymbol(scope.assetResponse.currency[i].valueByCurrency, scope.assetResponse.currency[i].baseCurrency);
          scope.assetResponse.currency[i].perWithSymbol = ' (' + scope.FormatUtils.formatValueAndAppendPercentageSymbol(scope.assetResponse.currency[i].weightByCurrency) + ')';
          scope.assetResponse.currency[i].name= scope.assetResponse.currency[i].sectorCurrency+scope.assetResponse.currency[i].perWithSymbol;
        }
        scope.view.chart.brwChart.height = scope.assetResponse.currency.length * 50 < 150 ? 150:scope.assetResponse.currency.length * 50;
        scope.view.chart.setChartData(labelArray, assetArray, chartcolors);
        let configParam = {
          "serviceParameters": "",
          "dataMapping": {
            "segListDetail": {
              "segmentMasterData": "${CNTX.currency}",
              "segmentUI": {
                "headerTemplate": {

                },
                "rowTemplate": {
                  "flxLegend": "${segmentMasterData.background}",
                  "lblName": "${segmentMasterData.name}",
                  "lblPercent": "${segmentMasterData.perWithSymbol}",
                  "lblAmount": "${segmentMasterData.amtWithSymbol}"
                }
              }
            }
          },
          "dataFormatting": "",
        };
        scope.view.segList.setConfigsFromParent(configParam);
        scope.view.segList.setContext(scope.assetResponse);
        scope.view.segList.updateContext();
      }
      catch (err) {
        kony.print(err);
      }
    },

    setSectorData: function () {
      var scope = this;
            try {
                  this.view.btnAssest1.skin='ICSknBtn003E75Bffffff34px';
                  this.view.btnSector1.skin='ICSknBtn003E7535PXBord0px';
                  this.view.btnRegion1.skin='ICSknBtn003E75Bffffff34pxBord0px';
                  this.view.btnCurrency1.skin='ICSknBtn003E75Bffffff34px';
                let result = {};
                scope.view.chart.brwChart.enableJsInterface = true;
                let navManager = applicationManager.getNavigationManager();
                let cashData = navManager.getCustomInfo("AllocationData");
                let flag = false;
                let totalMarket=0;
                for (let i = 0; i < scope.sectorData.portfolioHoldings.length; i++) {
                    totalMarket+= (parseFloat(scope.sectorData.portfolioHoldings[i].marketValue));
                    if (scope.sectorData.portfolioHoldings[i].sector.toLowerCase() === "cash") {
                        flag = true;                       
                    }
                }
                /*if (cashData !== undefined && !flag) {
                    scope.sectorData.portfolioHoldings.push(cashData);
                    cashData.sector = cashData.assetGroup;
                  	totalMarket+=parseInt(cashData.marketValue);
                }*/
              
              const [cash] = scope.assetResponse.asset.filter(asset => asset.assetClass === 'Cash')

             if (cash &&  !flag) {
                    cash.sector = cash.assetClass;
                    cash.marketValue = cash.valueByAssetClass;
                    cash.weightPercentage = cash.weightByAssetClass;
                    scope.sectorData.portfolioHoldings.push(cash);
                    totalMarket += parseFloat(cash.valueByAssetClass);
             }
                let assetArray = [];
                assetArray[0] = [];
                let labelArray = [];
                let chartcolors = ["#54D75D", "#77BC43", "#008495", "#23A8B1", "#7BCCC4", "#3BE2B2", "#E7417A", "#E8705B", "#FF8600", "#F7EA3A", "#7E04C4", "#BF0404", "#B9SEE8", "#6753EC", "#3897D6", "#4176A4", "#3645A7", "#0273E3", "#646E83", "#BDBDBD"];
                let chartColorsSeg = ["54D75D", "77BC43", "008495", "23A8B1", "7BCCC4", "3BE2B2", "E7417A", "E8705B", "FF8600", "F7EA3A", "7E04C4", "BF0404", "B9SEE8", "6753EC", "3897D6", "4176A4", "3645A7", "0273E3", "646E83", "BDBDBD"];
                for (let i in scope.sectorData.portfolioHoldings) {
                    if (!result.hasOwnProperty(scope.sectorData.portfolioHoldings[i].sector)) {
                        //result[scope.sectorData.portfolioHoldings[i].sector] = [];
                        result[scope.sectorData.portfolioHoldings[i].sector] = scope.sectorData.portfolioHoldings[i];
                        result[scope.sectorData.portfolioHoldings[i].sector].sumWeightPercentage = parseFloat(parseFloat(scope.sectorData.portfolioHoldings[i].weightPercentage).toFixed(2));
                        result[scope.sectorData.portfolioHoldings[i].sector].sumMarketValue = parseFloat(parseFloat(scope.sectorData.portfolioHoldings[i].marketValue).toFixed(2));
                    } else {
                        result[scope.sectorData.portfolioHoldings[i].sector].sumWeightPercentage = parseFloat(parseFloat(result[scope.sectorData.portfolioHoldings[i].sector].sumWeightPercentage) + parseFloat(scope.sectorData.portfolioHoldings[i].weightPercentage)).toFixed(2);
                        result[scope.sectorData.portfolioHoldings[i].sector].sumMarketValue = parseFloat(parseFloat(result[scope.sectorData.portfolioHoldings[i].sector].sumMarketValue) + parseFloat(scope.sectorData.portfolioHoldings[i].marketValue)).toFixed(2);
                    }
                }
                let response = {};
                let temp=result;
                result=[];
                let index =0;
                for(i in temp){
                        result[index]=temp[i];
                        index++;
                }
                response.sector = [];
                let j = Object.keys(result).length - 1;
                result = scope.sortData(result, "sumWeightPercentage");
                for (let i in result) {
                  result[i].sumWeightPercentage= (((result[i].sumMarketValue)/totalMarket)*100).toFixed(2);
                 // result[i].sumWeightPercentage= ((parseInt(result[i].sumMarketValue) / totalMarket) * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];  
                  labelArray.push(result[i].sector);
                    assetArray[0].push(parseFloat(result[i].sumWeightPercentage));
                    result[i].background = {
                        backgroundColor: chartColorsSeg[j]
                    }
                    j--;
                    result[i].amtWithSymbol = scope.FormatUtils.formatAmountAndAddCurrencySymbol(result[i].sumMarketValue, scope.sectorData.referenceCurrency);
                    result[i].perWithSymbol = ' (' + scope.FormatUtils.formatValueAndAppendPercentageSymbol((result[i].sumWeightPercentage).toString()) + ')';
                    result[i].name=  result[i].sector+result[i].perWithSymbol; 
                  response.sector.push(result[i]);
                }
                scope.view.chart.brwChart.height = response.sector.length * 50 < 150 ? 150 : response.sector.length * 50;
                scope.view.chart.setChartData(labelArray, assetArray, chartcolors);
                let configParam = {
                    "serviceParameters": "",
                    "dataMapping": {
                        "segListDetail": {
                            "segmentMasterData": "${CNTX.sector}",
                            "segmentUI": {
                                "headerTemplate": {},
                                "rowTemplate": {
                                    "flxLegend": "${segmentMasterData.background}",
                                    "lblName": "${segmentMasterData.name}",
                                    "lblPercent": "${segmentMasterData.perWithSymbol}",
                                    "lblAmount": "${segmentMasterData.amtWithSymbol}"
                                }
                            }
                        }
                    },
                    "dataFormatting": "",
                };
                scope.view.segList.setConfigsFromParent(configParam);
                scope.view.segList.setContext(response);
                scope.view.segList.updateContext();
            } catch (err) {
                kony.print(err);
            }
    }

  };
}
);