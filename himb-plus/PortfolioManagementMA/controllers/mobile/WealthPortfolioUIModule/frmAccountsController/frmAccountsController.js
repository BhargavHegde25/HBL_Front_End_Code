define({
    selectedData: [],
    accountData: "",
    dateRange: [],
    sortByCustomData: "",
    init: function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);

    },
    preShow: function() {
      try {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
        }
        this.view.flxAdditionalOptions.setVisibility(false);
        var navManager = applicationManager.getNavigationManager();
        var searchFlag = navManager.getCustomInfo("frmPortfolioDetails");
        if (searchFlag == true) {
            this.view.tbxSearch.text = "";
            this.view.imgClose.isVisible = false;
        }
        navManager.setCustomInfo("frmPortfolioDetails", false);
        this.dateRange = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
        this.sortByCustomData = navManager.getCustomInfo("frmSortBy");
        var configManager = applicationManager.getConfigurationManager();
      if(configManager.getBaseCurrency() === 'EUR'){
		this.view.segmentDetailsWealth.setEuroFlow(true);
    }
      else{
         this.view.segmentDetailsWealth.setEuroFlow(false);
      }
        this.initActions();
        this.view.segmentDetailsWealth.setLblPreviousDays(this.dateRange);
            var params ={
"portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
"accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
"dateFrom":this.dateRange.startDate.replace(/-/g, ''),
"dateTo":this.dateRange.endDate.replace(/-/g, ''),
"listType":"SEARCH",
"sortBy":(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts === "")?"bookingDate":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts,
"searchByInstrumentName":" "
};
      this.view.segmentDetailsWealth.setContext(params);
      this.checkPermission();
	  this.view.lblDownloadTransactions.text = kony.i18n.getLocalizedString("i18n.wealth.downloadAccountActivity");
	  this.view.lblSortyBy.text = kony.i18n.getLocalizedString("i18n.wealth.sortBy");
        } catch(err) {
        this.setError(err, "preShow");
      } 
	},
    initActions: function() {
      try{
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").navPage = "";
      this.view.segmentDetailsWealth.onRowClickEvent = this.onAccountSelect;
    this.view.segmentDetailsWealth.onMoveToDateRange   = this.timePeriod;
      this.view.segmentDetailsWealth.onMoveToCashAccounts = this.cashAccounts;
        this.view.customHeader.flxSearch.onTouchEnd = this.moreOptions;
        this.view.flxCancelOption.onTouchEnd = this.onCancel;
        this.view.flxSortBy.onTouchEnd = this.onClickSortBy;
      //this.view.flxDownloadTransactions.onTouchEnd = this.onClickDownloadTxns;
      this.view.flxDownloadTransactions.onTouchEnd =this.nav;
        this.view.customHeader.flxBack.onClick = this.onBack;
      
        var navManager = applicationManager.getNavigationManager();
        this.accountData = navManager.getCustomInfo("frmCashAccounts");
      this.view.segmentDetailsWealth.setCashAccounts(this.accountData);
    
          this.view.segmentDetailsWealth.onRequestEnd = function() {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
	this.view.segmentDetailsWealth.onRequestStart = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
        } catch(err) {
        this.setError(err, "initActions");
      } 
    },
  nav: function()
  {
    try{
    this.view.flxMainContainer.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
    this.view.flxMainContainer.enableScrolling = true; //[IW-3773] - Ayush Raj
    var navMan = applicationManager.getNavigationManager();
    // IW-3693 - Bhuvaneshwaran - Starts
    scope_WealthPresentationController.searchInst=this.view.segmentDetailsWealth.getCriteriaObjValue().searchByInstrumentName;
    //IW-3693 - ends
    navMan.navigateTo("frmDownload");
      } catch(err) {
        this.setError(err, "nav");
      } 
  },
      onSearch: function() {
        try{
        this.view.imgClose.isVisible = true;
        if (this.view.tbxSearch.text == "" || this.view.tbxSearch.text == null) {
            this.view.imgClose.isVisible = false;
        }
          } catch(err) {
        this.setError(err, "onSearch");
      } 
    },
    clearText: function() {
      try{
        this.view.tbxSearch.text = "";
        this.view.imgClose.isVisible = false;
        this.searchData();
        } catch(err) {
        this.setError(err, "onSearch");
      } 
    },
      setLblPreviousDays: function() {
        try{
        var forUtility = applicationManager.getFormatUtilManager();
        if (this.dateRange.selectedPeriod) {
            if (this.dateRange.selectedPeriod == "previous30DaysSelected") {
                this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.previous30Days");
            } else if (this.dateRange.selectedPeriod == "3MonthsSelected") {
                this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.threeMonths");
            } else if (this.dateRange.selectedPeriod == "6MonthsSelected") {
                this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.sixMonths");
            } else if (this.dateRange.selectedPeriod == "lastYearSelected") {
                this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.lastYear");
            } else {
              var startDate = this.dateFormat(this.dateRange.startDate);
              var startDateObj=startDate.split("-");
              var formattedstartDate=startDateObj[1] +"/"+ startDateObj[2] +"/"+ startDateObj[0];
              var endDate = this.dateFormat(this.dateRange.endDate);
              var endDateObj=endDate.split("-");
              var formattedendDate=endDateObj[1] +"/"+ endDateObj[2] +"/"+ endDateObj[0];
              this.view.lblPreviousDays.text = formattedstartDate + " - " + formattedendDate;
            }
        } 
          } catch(err) {
        this.setError(err, "setLblPreviousDays");
      } 
    },
    postShow: function() {

    },
    cashAccounts: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
        var data = {};
       // data.searchText = this.view.tbxSearch.text;
      var selectedValue = this.view.segmentDetailsWealth.setCashAccounts(this.accountData);
        if (this.accountData.cashAccountName == undefined) {
            data.response = this.accountData.response;
            data.accountName = this.accountData.accountName;
            data.cashData = this.accountData.cashData;
            navManager.setCustomInfo("frmCashAccounts", data);
        } else {
            data.response = this.accountData.response;
            data.accountName = this.accountData.cashAccountName;
            data.cashData = this.accountData.cashData;
            navManager.setCustomInfo("frmCashAccounts", data);
        }
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").navPage = "";
        navManager.navigateTo("frmCashAccounts");
        } catch(err) {
        this.setError(err, "cashAccounts");
      } 
    },
    moreOptions: function() {
      try{
       this.view.flxMainContainer.setEnabled(false);
      this.view.flxMainContainer.enableScrolling = false;
    this.view.flxHeader.setEnabled(false);
        this.view.flxAdditionalOptions.setVisibility(true);
         } catch(err) {
        this.setError(err, "moreOptions");
      } 
    },
    onCancel: function() {
      try{
       this.view.flxMainContainer.setEnabled(true);
      this.view.flxMainContainer.enableScrolling = true;
    this.view.flxHeader.setEnabled(true);
        this.view.flxAdditionalOptions.setVisibility(false);
        } catch(err) {
        this.setError(err, "onCancel");
      } 
    },
      searchData: function() {
        try{
        var searchText = this.view.tbxSearch.text;
        this.view.segList.removeAll();
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
                startDate = this.dateRange.startDate;
                endDate = this.dateRange.endDate;
            } else {
                sortVal = this.sortByCustomData.response;
            }
        } else {
            startDate = this.dateRange.startDate;
            endDate = this.dateRange.endDate;
            sortVal = this.sortByCustomData.response;
        }
        var params = {
"portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
"accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
"dateFrom":startDate,
"dateTo":endDate,
"listType":"SEARCH",
"sortBy":sortVal,
"searchByInstrumentName":searchText
                }
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getAccountActivity(params);
        } catch(err) {
        this.setError(err, "searchData");
      } 
    },
    onClickSortBy: function() {
      try{
       this.view.flxMainContainer.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
      this.view.flxMainContainer.enableScrolling = true; //[IW-3773] - Ayush Raj
       var data = {};
        data.searchText = this.view.tbxSearch.text;
        var navManager = applicationManager.getNavigationManager();
        if (this.sortByCustomData.response == undefined) {
            data.sortByValue = "bookingDate";
            navManager.setCustomInfo("frmAccounts", data);
        } else {
            data.sortByValue = this.sortByCustomData.response;
            navManager.setCustomInfo("frmAccounts", data);
        }
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmSortBy");
         } catch(err) {
        this.setError(err, "onClickSortBy");
      } 
    },
    onBack: function() {
        var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmPortfolioDetails");
    },
    timePeriod: function() {
      try{
        var navManager = applicationManager.getNavigationManager();
        var dateFlag = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
    //  var selectedValue = this.view.lblPreviousDays.text;
      var selectedValue = this.view.segmentDetailsWealth.getPreviousDaysText();
      var dataSet = {};
      var period;
      if(selectedValue == "Previous 30 days"){
        period ="previous30DaysSelected";
      }
      else if(selectedValue == "3 Months"){
        period ="3MonthsSelected";
      }
      else if(selectedValue == "6 Months"){
        period ="6MonthsSelected";
      }
      else if(selectedValue == "Last year"){
        period ="lastYearSelected";
      }
      else{
        period ="freeDateSelected";
      }
      //  dataSet.searchValue = this.view.tbxSearch.text;
        dataSet.flag = dateFlag.flag;
        dataSet.selectedDays = period;
        navManager.setCustomInfo('frmAccounts', dataSet);
        navManager.navigateTo("frmDateRange");
        } catch(err) {
        this.setError(err, "timePeriod");
      } 
    },
    setDataToSegment: function(accountsList) {
      try{
        var scope = this;
        var currForm = kony.application.getCurrentForm();
        var segData = [];
        var rowData = [];
      var data = accountsList.response.accountActivityList.body;
      if(data.length == 0){
        this.view.segList.setVisibility(false);
        this.view.flxError.setVisibility(true);
      }
      else{
        this.view.segList.setVisibility(true);
        this.view.flxError.setVisibility(false);
        for (var list in data) {
            var storeData;
            var values;
            var forUtility = applicationManager.getFormatUtilManager();
            var amount = forUtility.formatAmountandAppendCurrencySymbol(data[list].amount, data[list].currencyId);
            var balance = forUtility.formatAmountandAppendCurrencySymbol(data[list].balance, data[list].currencyId);
            var name = data[list].displayName;
            if (data[list].shortName != undefined || data[list].shortName != "") {
                name = data[list].displayName + " " + data[list].shortName;
            }
            if (name.length >= 30) {
                name = name.substr(0, 30) + "...";
            }
            var bookDate = this.dateFormat(data[list].bookingDate);
            var bookingDate = forUtility.getDateObjectfromString(bookDate);
            var valDate = this.dateFormat(data[list].valueDate);
            var valueDate = forUtility.getDateObjectfromString(valDate);
            var formattedBookingDate = forUtility.getFormatedDateString(bookingDate, forUtility.getApplicationDateFormat());
            var formattedValueDate = forUtility.getFormatedDateString(valueDate, forUtility.getApplicationDateFormat())
            storeData = {
                accountName: name,
                amount: amount,
                balance: balance,
                type: data[list].displayName,
                instrument: data[list].shortName,
                quantity: data[list].quantity,
                bookingDate: formattedBookingDate,
                valueDate: formattedValueDate
            }
            if (data[list].quantity != "" && data[list].shortName != "") {
                values = {
                    Change: amount,
                    "Account Balance": balance,
                    Type: data[list].displayName,
                    Instrument: data[list].shortName,
                    Quantity: data[list].quantity,
                    "Booking Date": formattedBookingDate,
                    "Value Date": formattedValueDate
                }
            } else if (data[list].quantity != "" || data[list].shortName != "") {
                if (data[list].quantity) {
                    values = {
                        Change: amount,
                        "Account Balance": balance,
                        Type: data[list].displayName,
                        Quantity: data[list].quantity,
                        "Booking Date": formattedBookingDate,
                        "Value Date": formattedValueDate
                    }
                } else {
                    values = {
                        Change: amount,
                        "Account Balance": balance,
                        Type: data[list].displayName,
                        Instrument: data[list].shortName,
                        "Booking Date": formattedBookingDate,
                        "Value Date": formattedValueDate
                    }
                }
            } else {
                values = {
                    Change: amount,
                    "Account Balance": balance,
                    Type: data[list].displayName,
                    "Booking Date": formattedBookingDate,
                    "Value Date": formattedValueDate
                }
            }
            rowData.push(values);
            segData.push(storeData);
        }
        this.view.segList.widgetDataMap = {
            lblName: "accountName",
            lblValue: "amount",
            lblDate: "bookingDate",
            lblAmountValue: "balance"
        }
        this.view.segList.setData(segData);
        this.selectedData = rowData;
        currForm.forceLayout();
    }
        } catch(err) {
        this.setError(err, "setDataToSegment");
      } 
    },
  dateFormat: function(date){
    //yyyymmdd - yyyy-mm-dd
    var formattedDate = date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);
    return formattedDate;
  },
    accountDetails: function() {
      try{
        var rowIndex = this.view.segList.selectedRowIndex[1];
        var value = this.selectedData[rowIndex];
        var navManager = applicationManager.getNavigationManager();
        var data = {};
        data.details = value;
        navManager.setCustomInfo("frmActivityDetails", data);
        navManager.navigateTo("frmActivityDetails");
        } catch(err) {
        this.setError(err, "accountDetails");
      } 
    },
      onAccountSelect:function(rowData){
        try{
     var navManager=applicationManager.getNavigationManager();
     var data={};
     var value = rowData.row;
        var values;
        var forUtility = applicationManager.getFormatUtilManager();
        var amount = forUtility.formatAmountandAppendCurrencySymbol(value.amount, value.currencyId);
        var balance = forUtility.formatAmountandAppendCurrencySymbol(value.balance, value.currencyId);
        var bookDate = this.dateFormat(value.bookingDate);
            var bookingDate = forUtility.getDateObjectfromString(bookDate);
            var valDate = this.dateFormat(value.valueDate);
            var valueDate = forUtility.getDateObjectfromString(valDate);
            var formattedBookingDate = forUtility.getFormatedDateString(bookingDate, forUtility.getApplicationDateFormat());
            var formattedValueDate = forUtility.getFormatedDateString(valueDate, forUtility.getApplicationDateFormat())
        if (value.quantity != "" && value.shortName != "") {
                values = {
          "i18n.Wealth.Change": amount,
          "i18n.wealth.accountBalanceWithColon": balance,
          "i18n.Wealth.types": value.displayName,
          "i18n.wealth.instrument:": value.shortName,
          "i18n.wealth.quantity": value.quantity,
          "i18n.wealth.bookingDatemb": formattedBookingDate,
          "i18n.wealth.valueDatemb": formattedValueDate
        }
      } else if (value.quantity != "" || value.shortName != "") {
        if (value.quantity) {
          values = {
            "i18n.Wealth.Change": amount,
            "i18n.wealth.accountBalanceWithColon": balance,
            "i18n.Wealth.types": value.displayName,
            "i18n.wealth.quantity": value.quantity,
            "i18n.wealth.bookingDatemb": formattedBookingDate,
            "i18n.wealth.valueDatemb": formattedValueDate
          }
        } else {
          values = {
            "i18n.Wealth.Change": amount,
            "i18n.wealth.accountBalanceWithColon": balance,
            "i18n.Wealth.types": value.displayName,
            "i18n.wealth.instrument:": value.shortName,
            "i18n.wealth.bookingDatemb": formattedBookingDate,
            "i18n.wealth.valueDatemb": formattedValueDate
          }
        }
      } else {
        values = {
          "i18n.Wealth.Change": amount,
          "i18n.wealth.accountBalanceWithColon": balance,
          "i18n.Wealth.types": value.displayName,
          "i18n.wealth.bookingDatemb": formattedBookingDate,
          "i18n.wealth.valueDatemb": formattedValueDate
        }
      }
      data.details=values;
      navManager.setCustomInfo("frmActivityDetails", data);
      navManager.navigateTo("frmActivityDetails");
    } catch(err) {
      this.setError(err, "onAccountSelect");
    } 
  },
  
  onClickDownloadTxns: function() {
    try{
     this.view.flxMainContainer.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
    this.view.flxMainContainer.enableScrolling = true; //[IW-3773] - Ayush Raj
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams = this.view.segmentDetailsWealth.getCriteriaObjValue(); 
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = "Accounts Activity";
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getDownloadList(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
        //kony.print("test"+applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
    
    } catch(err) {
        this.setError(err, "onClickDownloadTxns");
      } 
  },
    onClickDownloadMessage:function(base64String,filename)
  {
    try 
    {  
       //this.view.flxPopup.setVisibility(false);
       this.view.flxAdditionalOptions.isVisible = false;
       this.view.socialshare.shareWithBase64(base64String,filename);
    }catch(error){
   
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  checkPermission: function(){
    try{
    var configManager = applicationManager.getConfigurationManager();
    var getPermissionDetails = JSON.parse(this.view.segmentDetailsWealth.getFeaturesAndPermissions());
    var accountActivityDetailViewPermission=false;
    if(typeof getPermissionDetails !=="undefined")
      {
        if (getPermissionDetails.viewAccountDetails.length > 0) {
        accountActivityDetailViewPermission = configManager.checkAtLeastOnePermission(getPermissionDetails.viewAccountDetails);
        this.view.segmentDetailsWealth.onRowClickEvent= accountActivityDetailViewPermission ? this.onAccountSelect : "";
        }
        
      }
    
    } catch(err) {
        this.setError(err, "checkPermission");
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
