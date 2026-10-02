define({
    dateRange: [],
    sortingData: [],
    selectedRow: "",
    customBenchmarkData: "",
    init: function() {
        this.view.preShow = this.preShow;
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    initActions: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
        this.view.btnDone.onClick = this.onDoneClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.segSortingValues.onRowClick = this.onValueSelect;
        this.dateRange = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
     }catch(err){
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
            e.benchMark.skin = "sknlbl727272SSP17px";
            e.imageDetails.isVisible = false
        });
        this.sortingData[rowIndex].isSelected = true;
        this.sortingData[rowIndex].benchMark = {
            "skin": "sknLbl4176A4SSPReg26px",
            "text": this.sortingData[rowIndex].benchMark.text
        };
        this.sortingData[rowIndex].imageDetails = {
            "src": "correct.png",
            "isVisible": true
        };
        this.view.segSortingValues.setData(this.sortingData);
        }catch(err){
		   this.setError(err, "onValueSelect");
	  }
    },
    flxBackOnClick: function() {
      try{
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
         }catch(err){
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
        this.customBenchmarkData = navManager.getCustomInfo("frmBenchmark");
        var data = this.customBenchmarkData.benchmarkData;
        this.setSegData(data);
        this.initActions();
     }catch(err){
		   this.setError(err, "preShow");
	  }
    },
    setSegData: function(data) {
      try{
        var segData = [];
        var storeData;
        for (var list in data) {
            if (data[list].benchMark == applicationManager.getModulesPresentationController("WealthPortfolioUIModule").benchmark) {
                storeData = {
                    isSelected: true,
                    benchMark: {
                        text: data[list].benchMark,
                        skin: "sknLbl4176A4SSPReg26px"
                    },
                    imageDetails: {
                        src: "correct.png",
                        isVisible: true
                    }
                }
            } else {
                storeData = {
                    isSelected: false,
                    benchMark: {
                        text: data[list].benchMark,
                        skin: "sknlbl727272SSP17px"
                    },
                    imageDetails: {
                        isVisible: false
                    }
                }
            }
            segData.push(storeData);
        }
        this.view.segSortingValues.widgetDataMap = {
            lblSortFactor: "benchMark",
            imgTick: "imageDetails"
        }
        this.view.segSortingValues.removeAll();
        this.view.segSortingValues.setData(segData);
         }catch(err){
		   this.setError(err, "setSegData");
	  }
    },
    onDoneClick: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
      if(this.sortingData[this.selectedRow]){
         var isSelected = this.sortingData[this.selectedRow].isSelected;
       applicationManager.getModulesPresentationController("WealthPortfolioUIModule").benchmark = this.sortingData[this.selectedRow].benchMark.text;
      }
       
        var today = new Date();
        var endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
        var startDate = (today.getFullYear() -1) + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
        var duration = "OneY";
      if (this.dateRange.startDate == undefined) {
            this.dateRange.startDate = startDate;
            this.dateRange.endDate = endDate;
            this.dateRange.duration = duration;
        } 
         else {
            startDate = this.dateRange.startDate.replace(/-/g, '');
            endDate = this.dateRange.endDate.replace(/-/g, '');
            duration = this.dateRange.duration;
        }
       var params ={
  				"portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
  				"dateFrom":startDate,
  				"dateTo":endDate,
  				"benchMarkIndex":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").benchmark,
  				"duration":this.dateRange.duration,
                "currencyId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").refCurrencyId
 }
          var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
          wealthModule.getPerformance(params);
         }catch(err){
		   this.setError(err, "onDoneClick");
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
