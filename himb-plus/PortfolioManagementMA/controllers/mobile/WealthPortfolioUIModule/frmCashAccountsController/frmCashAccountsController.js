define(['CommonUtilities'], function(CommonUtilities) {
  return {
    sortByCustomData: "",
    dateRange: [],
    sortingData: [],
    selectedRow: "",
    customAccountData: "",
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
        this.sortByCustomData = navManager.getCustomInfo("frmSortBy");
        this.dateRange =applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
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
            e.accountName.skin = "sknlbl727272SSP17px";
            e.imageDetails.isVisible = false
        });
        this.sortingData[rowIndex].isSelected = true;
        this.sortingData[rowIndex].accountName = {
            "skin": "sknLbl4176A4SSPReg26px",
            "text": this.sortingData[rowIndex].accountName.text
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
      var data;
      if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").navPage === "frmWatchlist") {
        this.customAccountData = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").watchlistCashAccountsList;
        data = this.customAccountData.response;
      } else {
        this.customAccountData = navManager.getCustomInfo("frmCashAccounts");
        data = this.customAccountData.cashData;
      }
      //this.customAccountData = navManager.getCustomInfo("frmCashAccounts");
        //var data = this.customAccountData.cashData || this.customAccountData.response;
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
        var accountName;
        for (var list in data) {
          if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").navPage === "frmWatchlist") {
            accountName = CommonUtilities.truncateStringWithGivenLength(data[list].accountName + "....", 26) + CommonUtilities.getLastFourDigit(data[list].accountNumber);
          } else {
            accountName = (data[list].refCurrency || data[list].referenceCurrency) + " " + data[list].accountName;
          }
            if (this.customAccountData.accountName == accountName) {
                storeData = {
                    isSelected: true,
                    accountNumber: data[list].accountNumber,
                    accountName: {
                        text: accountName,
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
                    accountNumber: data[list].accountNumber,
                    accountName: {
                        text: accountName,
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
            lblSortFactor: "accountName",
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
      if (!this.sortingData || !this.sortingData[this.selectedRow]) {
        navManager.goBack();
        return;
      }else{
      
        var isSelected = this.sortingData[this.selectedRow].isSelected;
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber = this.sortingData[this.selectedRow].accountNumber;
        var accountData = "";
        if (isSelected) {
            var account = this.sortingData[this.selectedRow].accountName.text;
            accountData = account.split(" ")[0] + "-" + account.slice(-4);
        }
        var data = {};
        data.response = accountData;
        data.cashAccountName = account;
        data.cashData = this.customAccountData.cashData; 
		var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
		if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").navPage === "frmWatchlist") {
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").watchlistAccountName = this.sortingData[this.selectedRow].accountName.text;
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").watchlistPortfolioId = this.sortingData[this.selectedRow].accountNumber;
			this.view.customHeader.lblLocateUs.text = "Investment Accounts";
            wealthModule.getWatchlist();
        } else {
            navManager.setCustomInfo("frmCashAccounts", data); 
            var today = new Date();
            var endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + ('0' + (previousDate.getMonth() + 1)).slice(-2) + ('0' + previousDate.getDate()).slice(-2);
            var sortVal = "bookingDate";
          if (this.sortByCustomData.response == undefined && this.dateRange.startDate == undefined) {
              this.dateRange.startDate = startDate;
              this.dateRange.endDate = endDate;
          } else if (this.sortByCustomData.response == undefined || this.dateRange.startDate == undefined) {
              if (this.dateRange.startDate) {
                  startDate = this.dateRange.startDate.replace(/-/g, '');
                  endDate = this.dateRange.endDate.replace(/-/g, '');
              } else {
                  sortVal = this.sortByCustomData.response;
              }
          } else {
              startDate = this.dateRange.startDate.replace(/-/g, '');
              endDate = this.dateRange.endDate.replace(/-/g, '');
              sortVal = this.sortByCustomData.response;
          }
          var params = {
            "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
            "dateFrom":this.dateRange.startDate,
            "dateTo":this.dateRange.endDate,
            "listType":"SEARCH",
            "sortBy":sortVal,
            "searchByInstrumentName":this.customAccountData.searchText
          };
          wealthModule.getAccountActivity(params);
        }
    }
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
};
});