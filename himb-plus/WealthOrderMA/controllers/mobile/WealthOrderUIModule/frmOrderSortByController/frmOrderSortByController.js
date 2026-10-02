define({
    sortingData: [],
    segData: [],
    dateRange: [],
    selectedRow: "",
    customData: "",
    init: function() {
      try{
        this.view.preShow = this.preShow;
		this.view.postShow = this.postShow;
        var scope = this;
		var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
        //var navManager = applicationManager.getNavigationManager();
        //var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    }catch(err) {
        this.setError(err, "init");
      }
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
    flxBackOnClick: function() {
      try{
//         var navMan = applicationManager.getNavigationManager();
//         navMan.goBack();
       var navMan = applicationManager.getNavigationManager();
navMan.navigateTo("frmInstrumentTransactions");
         }catch(err) {
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
        this.customData = navManager.getCustomInfo("frmInstrumentTransactions");
		this.dateRange =scope_WealthPresentationController.selectedDateRangeDetails;
        this.initializeData();
        this.setUpData();
        this.initActions();
         }catch(err) {
        this.setError(err, "preShow");
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
    initializeData: function() {
      try{
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
         }catch(err) {
        this.setError(err, "initializeData");
      }
    },
    setUpData: function() {
      try{
        var selectedColumn = "";
        if (this.customData.sortByValue == undefined || this.customData.sortByValue == "") {
                selectedColumn = "tradeDate";
                this.selectedRow = 1;
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
         }catch(err) {
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
         }catch(err) {
        this.setError(err, "loadSegment");
      }
    },
    onApplyClick: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
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
                    "portfolioId": scope_WealthPresentationController.portfolioId,
                    "startDate": startDate,
                    "endDate": endDate,
                //    "searchByInstrumentName": this.customData.searchText,
                    "sortBy": sortByData
                }
            } else {
                var params = {
                    "portfolioId": scope_WealthPresentationController.portfolioId,
                    "startDate": this.dateRange.startDate,
                    "endDate": this.dateRange.endDate,
                 //   "searchByInstrumentName": this.customData.searchText,
                    "sortBy": sortByData
                }
            }
            var data = {};
            data.response = sortByData;
        //    data.searchText = this.customData.searchText;
            scope_WealthPresentationController.sortByValueInstrumentTrans = sortByData; 
            navManager.setCustomInfo("frmSortBy", data);
//             var wealthModule = applicationManager.getModulesPresentationController("WealthModule");
//             wealthModule.getTransactions(params);
          navManager.navigateTo("frmInstrumentTransactions");
         }catch(err) {
        this.setError(err, "onApplyClick");
      }
    },
    onResetClick: function() {
      try{
        this.customData.sortByValue = "";
        scope_WealthPresentationController.sortByValueInstrumentTrans = "";
        this.setUpData();
         }catch(err) {
        this.setError(err, "onResetClick");
      }
    },
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
