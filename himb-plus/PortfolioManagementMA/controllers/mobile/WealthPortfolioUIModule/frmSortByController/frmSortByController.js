
define({
    sortingData: [],
    segData: [],
    dateRange: [],
    selectedRow: "",
    customData: "",
    init: function() {
        this.view.preShow = this.preShow;
		this.view.postShow = this.postShow;
        var scope = this;
		var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
        //var navManager = applicationManager.getNavigationManager();
        //var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    initActions: function() {
      try{
        this.view.btnApply.onClick = this.onApplyClick;
        this.view.btnReset.onClick = this.onResetClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.segSortingValues.onRowClick = this.onValueSelect;
      }catch(err) {
        this.setError(err, "initActions");
      } 
    },
    onValueSelect: function() {
      try{
        var rowIndex = this.view.segSortingValues.selectedRowIndex[1];
        this.sortingData = this.view.segSortingValues.data;
        this.selectedRow = rowIndex;
        this.sortingData.forEach(function(e) {
            e.isSelected = false;
            e.sortName.skin = "sknlbl727272SSP17px";
            e.imageDetails.isVisible = false
        });
        this.sortingData[rowIndex].isSelected = true;
        this.sortingData[rowIndex].sortName = {
            "skin": "sknLbl4176A4SSPReg26px",
            "text": this.segData[rowIndex].sortName
        };
        this.sortingData[rowIndex].imageDetails = {
            "src": "correct.png",
            "isVisible": true
        };
        this.view.segSortingValues.setData(this.sortingData);
      }catch(err) {
        this.setError(err, "onValueSelect");
      } 
    },
	postShow : function(){
	  try{
     var width = this.view.flxBtn.frame.width;
        this.view.btnReset.width = ((width-55)/2)+"dp";
        this.view.btnApply.width = ((width-55)/2)+"dp";
	  }catch(err) {
        this.setError(err, "postShow");
      }
   },
    flxBackOnClick: function() {
      try{
      var previousForm = kony.application.getPreviousForm().id;
      var navManager = applicationManager.getNavigationManager();     
      if(previousForm === "frmWatchlist")
      	new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : previousForm}).navigate();
      else
        navManager.goBack();
      } catch(err) {
        this.setError(err, "flxBackOnClick");
      } 
    },
    preShow: function() {
      try{
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
        }
        var navManager = applicationManager.getNavigationManager();
        //var prevForm = navManager.getPreviousForm();
        var prevForm = kony.application.getPreviousForm().id;
        if (prevForm === "frmWatchlist") {
            this.customData = navManager.getCustomInfo("frmWatchlist");
        } else if (prevForm === "frmHoldings") {
            this.customData = navManager.getCustomInfo("frmHoldings");
        } else if (prevForm === "frmTransactions") {
            this.customData = navManager.getCustomInfo("frmTransactions");
        }
      else if(prevForm === "frmAccounts") {
            this.customData = navManager.getCustomInfo("frmAccounts");
        }
      else if(prevForm === "frmOrder") {
            this.customData = navManager.getCustomInfo("frmOrder");
        }
		else if(prevForm === "frmOrders") {
            this.customData = navManager.getCustomInfo("frmOrders");
        }
      else if(prevForm === "frmInstrumentTransactions") {
            this.customData = navManager.getCustomInfo("frmInstrumentTransactions");
        }
		this.dateRange =applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
        this.initializeData();
        this.setUpData();
        this.initActions();
        } catch(err) {
        this.setError(err, "preShow");
      } 
    },
    initializeData: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
       // var prevForm = navManager.getPreviousForm();
        var prevForm = kony.application.getPreviousForm().id;
        if (prevForm === "frmWatchlist") {
            this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.instrumentAlphabetically"),
					"sortIndex": "instrumentName",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.common.change"),
					"sortIndex": "percentageChange",
                    "isSelected": false

                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortLatestPrice"),
					"sortIndex": "lastRate",
                    "isSelected": false

                }
            ];

          } else if (prevForm === "frmHoldings") {
            this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.instrumentAlphabetically"),
                    "sortIndex": "description",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortQuantity"),
                    "sortIndex": "quantity",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortPrice"),
                    "sortIndex": "marketPrice",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortAverageCost"),
                    "sortIndex": "costPrice",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortMarketValue"),
                    "sortIndex": "marketValue",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortUnrealizedPL"),
                    "sortIndex": "unrealPLMkt",
                    "isSelected": false
                }
            ];

          } else if ((prevForm === "frmOrder" || prevForm === "frmOrders") &&((applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isHistory === true)||(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isHistory === false))) {
			  if( applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType ==="open")
			  {
            this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.instrumentAlphabetically"),
                    "sortIndex": "description",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transfers.Date"),
                    "sortIndex": "tradeDate",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transaction.Type"),
                    "sortIndex": "orderType",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortQuantity"),
                    "sortIndex": "quantity",
                    "isSelected": false
                },
                {
                    "sortName" : kony.i18n.getLocalizedString("i18n.wealth.orders.limitPrice"),
                    "sortIndex" : "limitPrice",
                    "isSelected": false
                },
                {
                    "sortName" : kony.i18n.getLocalizedString("i18n.wealth.orders.stopPrice"),
                    "sortIndex" : "stopPrice",
                    "isSelected": false
                }
            ];
			}
		  else {
			  this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.instrumentAlphabetically"),
                    "sortIndex": "description",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transfers.Date"),
                    "sortIndex": "tradeDate",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transaction.Type"),
                    "sortIndex": "orderType",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortQuantity"),
                    "sortIndex": "quantity",
                    "isSelected": false
                },
                {
                    "sortName" : kony.i18n.getLocalizedString("i18n.wealth.sortPrice"),
                    "sortIndex" : "orderExecutionPrice",
                    "isSelected": false
                },
                {
                    "sortName":  kony.i18n.getLocalizedString("kony.mb.achfiledetail.status"),
                    "sortIndex": "status",
                    "isSelected": false
                }
            ];
			}
            

        } else if (prevForm === "frmAccounts") {
            this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortBookingDate"),
                    "sortIndex": "bookingDate",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transaction.Type"),
                    "sortIndex": "displayName",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.instrumentAlphabetically"),
                    "sortIndex": "shortName",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.common.change"),
                    "sortIndex": "amount",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.i18n.common.valueDate"),
                    "sortIndex": "valueDate",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortAccountBalance"),
                    "sortIndex": "balance",
                    "isSelected": false
                }
            ];
        }else if (prevForm === "frmInstrumentTransactions") {
            this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortTotal"),
                    "sortIndex": "total",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortTradeDate"),
                    "sortIndex": "tradeDate",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.i18n.common.valueDate"),
                    "sortIndex": "valueDate",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transaction.Type"),
                    "sortIndex": "orderType",
                    "isSelected": false
                },
                { 
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortQuantity"),
                    "sortIndex": "quantity",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortPrice"),
                    "sortIndex": "limitPrice",
                    "isSelected": false
                }
            ];
        } else {
            this.segData = [{
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.instrumentAlphabetically"),
                    "sortIndex": "description",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("kony.mb.transaction.Type"),
                    "sortIndex": "orderType",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortQuantity"),
                    "sortIndex": "quantity",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortPrice"),
                    "sortIndex": "limitPrice",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortNetAmount"),
                    "sortIndex": "total",
                    "isSelected": false
                },
                {
                    "sortName": kony.i18n.getLocalizedString("i18n.wealth.sortTradeDate"),
                    "sortIndex": "tradeDate",
                    "isSelected": false
                }
            ];
        }
        } catch(err) {
        this.setError(err, "initializeData");
      } 
    },
    setUpData: function() {
      try{
        var selectedColumn = "";
        if (this.customData.sortByValue == undefined || this.customData.sortByValue == "") {
            var navManager = applicationManager.getNavigationManager();
           // var prevForm = navManager.getPreviousForm();
           var prevForm = kony.application.getPreviousForm().id;
            if (prevForm == "frmWatchlist") {
                //selectedColumn = "description";
                selectedColumn = "instrumentName";              
                this.selectedRow = 0;
            } else if (prevForm == "frmHoldings") {
                selectedColumn = "description";
                this.selectedRow = 0;
            } else if (prevForm == "frmTransactions" || prevForm == "frmOrder") {
                selectedColumn = "tradeDate";
                this.selectedRow = 5;
            } 
			 else if (prevForm == "frmOrders") {
                selectedColumn = "tradeDate";
                this.selectedRow = 1;
            } else if (prevForm == "frmInstrumentTransactions") {
                selectedColumn = "tradeDate";
                this.selectedRow = 1;
            } else {
                selectedColumn = "bookingDate";
                this.selectedRow = 0;
            }
        } else {
            selectedColumn = this.customData.sortByValue;
        }
        this.segData.forEach(function(e) {
            if (e.sortIndex === selectedColumn)
                e.isSelected = true;
            else e.isSelected = false;
        });
        this.sortingData = [];
        this.loadSegment();
        } catch(err) {
        this.setError(err, "setUpData");
      } 
    },
    loadSegment: function() {
      try{
        var data = [];
        data = this.segData;
        for (var list in data) {
            var storeData;
            if (data[list].isSelected) {
                storeData = {
                    isSelected: true,
                    sortName: {
                        text: data[list].sortName,
                        skin: "sknLbl4176A4SSPReg26px"
                    },
                    imageDetails: {
                        src: "correct.png",
                        isVisible: true
                    },
                    sortIndex: data[list].sortIndex
                }
            } else {
                storeData = {
                    isSelected: false,
                    sortName: {
                        text: data[list].sortName,
                        skin: "sknlbl727272SSP17px"
                    },
                    imageDetails: {
                        isVisible: false
                    },
                    sortIndex: data[list].sortIndex
                }
            }
            this.sortingData.push(storeData);
        }
        this.view.segSortingValues.widgetDataMap = {
            lblSortFactor: "sortName",
            imgTick: "imageDetails"
        }
        this.view.segSortingValues.removeAll();
        this.view.segSortingValues.setData(this.sortingData);
        } catch(err) {
        this.setError(err, "loadSegment");
      } 
    },
    onApplyClick: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
        //var prevForm = navManager.getPreviousForm();
        var prevForm = kony.application.getPreviousForm().id;
        if (prevForm === "frmWatchlist") {
          var sortByDataWatchlist = "";
          if(this.sortingData[this.selectedRow] !== undefined){
             var isSelected = this.sortingData[this.selectedRow].isSelected;
            if (isSelected) {
                sortByDataWatchlist = this.sortingData[this.selectedRow].sortIndex;
              applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueWatchlist = sortByDataWatchlist;
            }
          }
            var params = {
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                "navPage": "Watchlist",
                "sortBy": sortByDataWatchlist,
                "searchByInstrumentName": this.customData.searchText
            }
            var data = {};
            data.response = sortByDataWatchlist;
            data.searchText = this.customData.searchText;
            navManager.setCustomInfo("frmSortBy", data);
           
//             var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
//             wealthModule.getWatchlist(params);
                    new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmWatchlist"}).navigate();

          //navManager.navigateTo("frmWatchlist");
        } else if (prevForm === "frmHoldings") {
          var sortByDataHoldings = "";
          if(this.sortingData[this.selectedRow] !== undefined){
             var isSelected = this.sortingData[this.selectedRow].isSelected;
             if (isSelected) {
                sortByDataHoldings = this.sortingData[this.selectedRow].sortIndex;
                if(scope_WealthPresentationController.isOpenOrdersIncluded){
                  applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsIncludeOrders = sortByDataHoldings;
                }else{
                applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsExcludeOrders = sortByDataHoldings;
                }
            }
          }
            var params = {
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                "navPage": "Holdings",
                "sortBy": sortByDataHoldings,
                "searchByInstrumentName": this.customData.searchText
            }
            var data = {};
            data.response = sortByDataHoldings;
            data.searchText = this.customData.searchText;
            navManager.setCustomInfo("frmSortBy", data);
           
//             var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
//             wealthModule.getHoldings(params);
          navManager.navigateTo("frmHoldings");
        } else if(prevForm === "frmOrder") {
           var sortByData = "";
          if(this.sortingData[this.selectedRow] !== undefined){
            var isSelected = this.sortingData[this.selectedRow].isSelected;
            if (isSelected) {
                sortByData = this.sortingData[this.selectedRow].sortIndex;
            }
          }
            var orderId; 
            if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").orderList.length === 0){
                orderId = null;
            }
            else{
                orderId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").orderList.toString();
            }
            var today = new Date();
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType === "open") {
                var params = {
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                        //"navPage": "Orders",
                        "sortBy": sortByData,
                        "searchByInstrumentName": this.customData.searchText,
                        "orderId": orderId,
                        "type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                        "startDate": "2018-12-06",
                        "endDate": endDate
                    }
                    // 			} else {
                    // 				if (this.dateRange.startDate == undefined) {
                    // 					if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").dateBetween !== undefined) {
                    // 						//alert("datebetween params");
                    // 						var params = {
                    // 							"portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                    // 							//"navPage": "Orders",
                    // 							"sortBy": sortByData,
                    // 							"searchByInstrumentName": this.customData.searchText,
                    // 							"orderId": orderId,
                    // 							"type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                    // 							"startDate": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").dateBetween.startDate,
                    // 							"endDate": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").dateBetween.endDate,
                    // 						}
            } else {
                if (this.dateRange.startDate == undefined) {
                    var params = {
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                        //"navPage": "Orders",
                        "sortBy": sortByData,
                        "searchByInstrumentName": this.customData.searchText,
                        "orderId": orderId,
                        "type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                        "startDate": startDate,
                        "endDate": endDate,
                    }
                } else {
                    //alert("elsedaaterge");
                    var params = {
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                        //"navPage": "Orders",
                        "sortBy": sortByData,
                        "searchByInstrumentName": this.customData.searchText,
                        "orderId": orderId,
                        "type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                        "startDate": this.dateRange.startDate,
                        "endDate": this.dateRange.endDate
                    }
                }
            }
            var data = {};
            data.response = sortByData;
            data.searchText = this.customData.searchText;
            navManager.setCustomInfo("frmSortBy", data);
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getOrdersDetails(params);
            wealthModule.commonFunctionForNavigation("frmOrder");
        } else if (prevForm === "frmOrders") {
          var sortByData = "";
          if(this.sortingData[this.selectedRow] !== undefined){
             var isSelected = this.sortingData[this.selectedRow].isSelected;
            if (isSelected) {
                sortByData = this.sortingData[this.selectedRow].sortIndex;
            }
          }
            var orderId;
            if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").orderList.length === 0) {
                orderId = null;
            } else {
                orderId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").orderList.toString();
            }
            var today = new Date();
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType === "open") {
                var params = {
                    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                    //"navPage": "Orders",
                    "sortBy": sortByData,
                    "searchByInstrumentName": this.customData.searchText,
                    "orderId": orderId,
                    "type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                    "startDate": startDate,
                    "endDate": endDate
                }
            } else {
                if (this.dateRange.startDate == undefined) {
                    var params = {
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                        //"navPage": "Orders",
                        "sortBy": sortByData,
                        "searchByInstrumentName": this.customData.searchText,
                        "orderId": orderId,
                        "type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                        "startDate": startDate,
                        "endDate": endDate
                    }
                } else {
                    var params = {
                        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                        //"navPage": "Orders",
                        "sortBy": sortByData,
                        "searchByInstrumentName": this.customData.searchText,
                        "orderId": orderId,
                        "type": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType,
                        "startDate": this.dateRange.startDate,
                        "endDate": this.dateRange.endDate
                    }
                }
            }
            var data = {};
            data.response = sortByData;
            data.searchText = this.customData.searchText;
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = sortByData;
            navManager.setCustomInfo("frmSortBy", data);
            navManager.navigateTo("frmOrders");
        } else if (prevForm === "frmAccounts") {
            var today = new Date();
            var endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + ('0' + (previousDate.getMonth() + 1)).slice(-2) + ('0' + previousDate.getDate()).slice(-2);
            var sortByData = "";
          if(this.sortingData[this.selectedRow] !== undefined){
            var isSelected = this.sortingData[this.selectedRow].isSelected;
            if (isSelected) {
                sortByData = this.sortingData[this.selectedRow].sortIndex;
              applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts = sortByData;
            }
            }
            if (this.dateRange.startDate == undefined) {
              var params = {
				"portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
				"accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
				"dateFrom":startDate,
				"dateTo":endDate,
				"listType":"SEARCH",
				"sortBy":sortByData,
				"searchByInstrumentName":this.customData.searchText
                }
            } else {
                var params = {
                "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
				"accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
				"dateFrom":this.dateRange.startDate.replace(/-/g, ''),
				"dateTo":this.dateRange.endDate.replace(/-/g, ''),
				"listType":"SEARCH",
				"sortBy":sortByData,
				"searchByInstrumentName":this.customData.searchText
                }
            }
            var data = {};
            data.response = sortByData;
            data.searchText = this.customData.searchText;
            navManager.setCustomInfo("frmSortBy", data);
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getAccountActivity(params);
        } else if(prevForm === "frmInstrumentTransactions"){
            var today = new Date();
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var sortByData = "";  
          if(this.sortingData[this.selectedRow] !== undefined){
              var isSelected = this.sortingData[this.selectedRow].isSelected;
              if (isSelected) {
                sortByData = this.sortingData[this.selectedRow].sortIndex;
              }
            }
            if (this.dateRange.startDate == undefined) {
                var params = {
                    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                    "startDate": startDate,
                    "endDate": endDate,
                //    "searchByInstrumentName": this.customData.searchText,
                    "sortBy": sortByData
                }
            } else {
                var params = {
                    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                    "startDate": this.dateRange.startDate,
                    "endDate": this.dateRange.endDate,
                 //   "searchByInstrumentName": this.customData.searchText,
                    "sortBy": sortByData
                }
            }
            var data = {};
            data.response = sortByData;
        //    data.searchText = this.customData.searchText;
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueInstrumentTrans = sortByData; 
            navManager.setCustomInfo("frmSortBy", data);
//             var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
//             wealthModule.getTransactions(params);
          navManager.navigateTo("frmInstrumentTransactions");
        }else {
            var today = new Date();
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var sortByData = "";
          if(this.sortingData[this.selectedRow] !== undefined){
            var isSelected = this.sortingData[this.selectedRow].isSelected;
            if (isSelected) {
                sortByData = this.sortingData[this.selectedRow].sortIndex;
            }
          }  
            if (this.dateRange.startDate == undefined) {
                var params = {
                    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                    "startDate": startDate,
                    "endDate": endDate,
                    "searchByInstrumentName": this.customData.searchText,
                    "sortBy": sortByData
                }
            } else {
                var params = {
                    "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                    "startDate": this.dateRange.startDate,
                    "endDate": this.dateRange.endDate,
                    "searchByInstrumentName": this.customData.searchText,
                    "sortBy": sortByData
                }
            }
            var data = {};
            data.response = sortByData;
            data.searchText = this.customData.searchText;
          applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans = sortByData; 
            navManager.setCustomInfo("frmSortBy", data);
//             var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
//             wealthModule.getTransactions(params);
          navManager.navigateTo("frmTransactions");
        }
         } catch(err) {
        this.setError(err, "onApplyClick");
      } 
    },
    onResetClick: function() {
      try{
        this.customData.sortByValue = "";
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueWatchlist =  "";
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsExcludeOrders =  "";
       applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsIncludeOrders = ""; 
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans =  "";
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueInstrumentTrans = "";
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts = "";
	   applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = "";
        this.setUpData();
        } catch(err) {
        this.setError(err, "onResetClick");
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
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }
});
