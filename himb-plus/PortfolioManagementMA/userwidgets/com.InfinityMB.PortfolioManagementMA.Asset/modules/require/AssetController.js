
define(['./AssetBusinessController', './FormatUtils'], function (AssetBusinessController, FormatUtils) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.businessController = new AssetBusinessController(this);
      this.FormatUtils = new FormatUtils();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
            /*defineGetter(this, 'tabData', () => {
        return this._tabData;
      });*/
            /*defineSetter(this, 'tabData', value => {
        this._tabData = value;
      });*/
        },
    assetResponse:{},

    setData: function (assetRequestParams, failureCallBack) {
      try{
      //var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      
     // let assetRequestParams = { "portfolioId": wealthModule.portfolioId};
     
      this.failure = failureCallBack;
        
      this.businessController.fetchDetails("PortfolioServicing", "getAllocation", "PortfolioDetails", assetRequestParams, "asset");
      //this.businessController.fetchDetails("PortfolioServicing", "getAssetAllocation", "PortfolioDetails", assetRequestParams, "asset");
      //this.businessController.fetchDetails("PortfolioServicing", "getPortfolioHoldings", "PortfolioDetails", sectorRequestParams, "sector");
      }catch(err) {
        this.setError(err, "setData");
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

    sortData: function(data, key){
      try{
      function sortByKey(a, b) {
        var x = parseFloat(a[key]);
        var y = parseFloat(b[key]);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
   return(data.sort(sortByKey));
      }catch(err) {
        this.setError(err, "sortData");
      }
    },

    setAssetData: function() {
      var scope = this;
      try {
          var configManager = applicationManager.getConfigurationManager();
          let portfolioDetailAssetAllocationPermission = configManager.getPortfolioAssetAllocationViewPermissions().some(configManager.checkUserPermission.bind(configManager));
          var labelArray = [];
          let assetArray = [];
          assetArray[0] = [];
          let chartcolors = ["#54D75D", "#77BC43", "#008495", "#23A8B1", "#7BCCC4", "#3BE2B2", "#E7417A", "#E8705B", "#FF8600", "#F7EA3A", "#7E04C4", "#BF0404", "#B9SEE8", "#6753EC", "#3897D6", "#4176A4", "#3645A7", "#0273E3", "#646E83", "#BDBDBD"];
          let chartColorsSeg = ["54D75D", "77BC43", "008495", "23A8B1", "7BCCC4", "3BE2B2", "E7417A", "E8705B", "FF8600", "F7EA3A", "7E04C4", "BF0404", "B9SEE8", "6753EC", "3897D6", "4176A4", "3645A7", "0273E3", "646E83", "BDBDBD"];
        if(scope.assetResponse.asset !== undefined){
          scope.assetResponse.asset=scope.sortData(scope.assetResponse.asset,"weightByAssetClass");  
          let j = Object.keys(scope.assetResponse.asset).length - 1;
          if (portfolioDetailAssetAllocationPermission) {
              var assets = scope.assetResponse.asset;
              var forUtility = applicationManager.getFormatUtilManager();
              //IW-3291 - Lakshmi - condition added for new user without any asset data
              if(assets.length > 0){
//               if (assets.length > 0) {
//                   //this.view.flxAssetsTab.isVisible = true;
//                   // this.view.flxAssetsSummary.isVisible = true;
//                   var total = 0;
//                   for (var i = 0; i < assets.length; i++) {
//                       total += Math.abs(Number(assets[i].marketValue));
//                   }
//                   for (var list in assets) {
//                       scope.assetResponse.asset[list].background = {
//                           backgroundColor: chartColorsSeg[j]
//                       }
//                       j--;
//                       //var assetPercent = this.calculatePercent(assets[list].marketValue, responseObj.totalMarketValue);
//                      // var assetPercent = this.calculatePercent(assets[list].marketValue, total);
//                      // var marketValue = forUtility.formatAmountandAppendCurrencySymbol(assets[list].marketValue, scope.assetResponse.referenceCurrency);
//                       scope.assetResponse.asset[list].perWithSymbol = '(' + scope.FormatUtils.formatValueAndAppendPercentageSymbol(scope.assetResponse.asset[i].weightByAssetClass) + ')'
//                       //scope.assetResponse.asset[list].perWithSymbol = " (" + assetPercent.toString() + "%)";
//                       //scope.assetResponse.asset[list].amtWithSymbol = marketValue;
//                       scope.assetResponse.asset[list].amtWithSymbol=scope.FormatUtils.appendCurrencySymbol(scope.assetResponse.asset[i].valueByAssetClass, scope.assetResponse.asset[i].baseCurrency);
//                       //labelArray.push( scope.assetResponse.asset[list].assetGroup);
//                       //assetArray[0].push(assetPercent);
//                       labelArray.push(this.assetResponse.asset[i].assetClass);
//                       assetArray[0].push(parseInt(this.assetResponse.asset[i].weightByAssetClass));                   
//                       var navManager = applicationManager.getNavigationManager();
      
//           if(assets[list].assetGroup.toLowerCase() === "cash"){
//               assets[list].weightPercentage=assetPercent;
//             navManager.setCustomInfo("AllocationData",assets[list] );
            
//         }
//                   }
//                   if (assetPercent !== "0") {
//                       // this.view.flxAssetsTab.isVisible = true;
//                       // this.view.flxAssetBarChart.isVisible = true;
//                       /*storeData = {
//     assetClass: assets[list].assetGroup,
//     assetPer: assetPercent,
//     assetVal: assets[list].assetGroup + " (" + assetPercent.toString() + "%)",
//     assetCost: marketValue,
//     flxSpent: {
//       "skin": "",
//       "width": assetPercent.toString() + "%"
//     }
//   };
//   segData.push(storeData);
// } else {
//   continue;
// }
// }
// segData.sort(function(a, b) {
// return parseFloat(b.assetPer) - parseFloat(a.assetPer);
// });
// assignedSkinsArr = this.setSkinBasedOnPercent(segData);
// this.view.segAssetSummary.widgetDataMap = {
// lblAssetDet: "assetVal",
// lblAssetCost: "assetCost",
// flxSpent: "flxSpent"
// };
// this.view.segAssetSummary.setData(assignedSkinsArr);*/
//                   } else {
//                       // this.view.flxAssetsTab.isVisible = false;
//                       // this.view.flxAssetBarChart.isVisible = false;
//                   }
//               }
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
                scope.assetResponse.asset[i].name= scope.assetResponse.asset[i].assetClass+scope.assetResponse.asset[i].perWithSymbol;
              }
              scope.view.chart.brwChart.height = scope.assetResponse.asset.length * 50 < 150 ? 150 : scope.assetResponse.asset.length * 50;
              scope.view.chart.setChartData(labelArray, assetArray, chartcolors);
              let configParam = {
                  "serviceParameters": "",
                  "dataMapping": {
                      "segListDetail": {
                          "segmentMasterData": "${CNTX.asset}",
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
              scope.view.segList.setContext(scope.assetResponse);
              scope.view.segList.updateContext();
                
              scope.setAssetAllocationGraphVisibility(true);
                
                //IW-3291 - Lakshmi - Starts
                this.view.flxChart.setVisibility(true);
                this.view.flxSeg.setVisibility(true);
                this.view.flxError.setVisibility(false);
                
              } else {
                
                this.view.flxChart.setVisibility(false);
                this.view.flxSeg.setVisibility(false);
                this.view.flxError.setVisibility(true);
                //IW-3291 - ends
              }
              
          }
        }else{
          applicationManager.getPresentationUtility().showLoadingScreen();
          scope.setAssetAllocationGraphVisibility(false);
        }
      } catch (err) {
          kony.print(err);
      }
  },
    noAssetsToDisplay: function(){
      try{
      this.view.flxChart.setVisibility(false);
      this.view.flxSeg.setVisibility(false);
      this.view.flxError.setVisibility(true); 
      }catch(err) {
        this.setError(err, "noAssetsToDisplay");
      }
    },
    failureCall: function(){
      try{
      this.failure();
      }catch(err) {
        this.setError(err, "failureCall");
      }
    },
    onError: function(){
      try{
      this.failure();
      }catch(err) {
        this.setError(err, "onError");
      }
    },
    /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      scope.onErrorMain(errorObj);
    },
    onErrorMain:function(err){
      kony.print(JSON.stringify(err));
    }
  // ,

  //   calculatePercent: function (part, total) {
  //     var partAmount = Math.abs(Number(part));
  //     //var totalAmount = Number(total);
  //     //var percent = ((partAmount *100) / totalAmount);
  //     var percent = ((partAmount * 100) / total);
  //     return percent.toFixed(2);
  //   },


  };
}
);
