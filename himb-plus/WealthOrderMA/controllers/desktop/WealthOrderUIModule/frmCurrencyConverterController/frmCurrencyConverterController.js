define(['CommonUtilities','ViewConstants'], function(CommonUtilities, ViewConstants) {
  var responsiveUtils = new ResponsiveUtils();
  var orientationHandler = new OrientationHandler();

  //Type your controller code here 
  return {
    modalSegmentData:[],
    currencyNew:"",
    currencyPairs:"",
    convertCheckbox: {
      now:true,
      later:false
    },
    checkOpenPopup: false,
    decimalSeparator:"",

    updateFormUI: function(uiData) {
      if (uiData) {
        if(uiData.instrumentError){
          this.showErrorProductDetails(uiData.instrumentError);
        }
        if(uiData.historicalData){
          this.lineChartData(uiData.historicalData);
        } 
        if(uiData.cashCurrencyList){
          var currForm = kony.application.getCurrentForm();
          this.portfolioAssetsCash(uiData.cashCurrencyList);
        }
      }
    },

    init: function(){
      var navManager = applicationManager.getNavigationManager();
      var portfolioId = navManager.getCustomInfo('frmCurrencyConverter');
      var params = {
        "portfolioId":  portfolioId,
        "navPage":"",
        "graphDuration":""
      };
      let configurationManager = applicationManager.getConfigurationManager();
      if (configurationManager.getBaseCurrency() === "EUR"){
        this.decimalSeparator = ",";
      } else {
        this.decimalSeparator = ".";
      }
      var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"});
      wealthModule.getCashBalanceDetails(params);
      CommonUtilities.disableButton(this.view.btnConvert);
      this.view.btnSwitch.enable = false;
      this.view.btnConvert.onClick = this.navigateToConfirm;
      this.view.txtLeftAmountValue.enable = false;
      this.view.flxMainCCContent.onTouchStart = this.formatValueDecimal;
      this.view.flxMainCCContent.onTouchEnd = this.checkDropdown;
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.onTouchEnd = this.onFormTouchEnd;
    },

    onFormTouchEnd:function(){
      var currFormObj = kony.application.getCurrentForm();
      if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
        setTimeout(function() {
          currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
          currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
          currFormObj.customheadernew.imgLblTransfers.text = "O";
        }, "17ms")
      }
    },

    preShow: function(){
      this.view.lblRateDate.text = "12 Jun, 7:19 am " +  kony.i18n.getLocalizedString("i18n.wealth.utcDisclaimer"); 
      if(this.convertCheckbox.now){
        this.view.imgConvertNow.src = "radioactivebb.png";
        this.view.imgConvertDate.src = "radioinactivebb.png";
      }
      if(this.view.lblRightAmountValue.text){
        this.view.flxFromBalance.setVisibility(true);
        this.view.flxToBalance.setVisibility(true);
      }
      this.checkSkin();
      this.view.flxDropdownFrom.onClick = this.toggleFromDropdown;
      this.view.lblAddCurrency.onTouchEnd = this.showAddCurrencyModal;
      this.view.btnModalClose.onClick = this.hideAddCurrencyModal;
      this.view.btnCloseCCModal.onTouchEnd = this.hideAddCurrencyModal;
	  var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"});
      this.view.imgConvertNow.onTouchEnd = this.checkConvertNow;
      this.view.imgConvertDate.onTouchEnd = this.checkConvertLater;
      //       this.view.flxMainCCContent.onClick = this.checkDropdown(e);
      wealthModule.getCurrencyList();
    },

    postShow: function(){
      applicationManager.getNavigationManager().applyUpdates(this);
      this.resetForm();
      this.setActiveHeaderHamburger();
    },
    resetForm: function(){
      var previousForm = kony.application.getPreviousForm().id;
      if (previousForm === "frmCurrencyConverterConfirm"){
         if(this.view.txtLeftAmountValue.text === kony.i18n.getLocalizedString("i18n.wealth.amount")){
            this.view.txtLeftAmountValue.text = applicationManager.getNavigationManager().getCustomInfo('frmCurrencyConverterLeftAmount');
            }
        }
      if(previousForm !== "frmCurrencyConverterConfirm"){
        this.view.btnSwitch.enable = false;
        this.view.txtLeftAmountValue.enable = false;
        CommonUtilities.disableButton(this.view.btnConvert);
        this.view.flxFromBalance.setVisibility(false);
        this.view.flxToBalance.setVisibility(false);
        this.view.flxDummyChart.setVisibility(true);
        this.view.flxVerticalDash.height = "160Dp";
        this.view.flxRate.setVisibility(false);
        this.view.lblListBoxFromValue.text = kony.i18n.getLocalizedString("i18n.wealth.select");
        this.view.lblListBoxToValue.text = kony.i18n.getLocalizedString("i18n.wealth.select");
        this.checkSkin();
        this.view.txtLeftAmountValue.text = "";
        this.view.lblRightAmountValue.text = "";
        this.view.flxDropdown.onClick = null;
      }
    },
    checkSkin: function(){
      if(this.view.lblListBoxFromValue.text === kony.i18n.getLocalizedString("i18n.wealth.select")){
        this.view.lblListBoxFromValue.skin = "bbSknLbl424242SSP15Pxfc";
        CommonUtilities.disableButton(this.view.btnConvert);
      } else {
        this.view.lblListBoxFromValue.skin = "bbSknLbl424242SSP15Px";
      }
      if(this.view.lblListBoxToValue.text === kony.i18n.getLocalizedString("i18n.wealth.select")){
        this.view.lblListBoxToValue.skin = "bbSknLbl424242SSP15Pxfc";
        CommonUtilities.disableButton(this.view.btnConvert);
      } else {
        this.view.lblListBoxToValue.skin = "bbSknLbl424242SSP15Px";
      }
    },
    checkSameCurrency: function(){
      if (this.view.lblListBoxFromValue.text === this.view.lblListBoxToValue.text){
        CommonUtilities.disableButton(this.view.btnConvert);
      } else {
        if(this.view.lblListBoxToValue.text !== kony.i18n.getLocalizedString("i18n.wealth.select") && this.view.txtLeftAmountValue.text !== ""){
          CommonUtilities.enableButton(this.view.btnConvert);
        }
      }
      this.view.forceLayout();
    },
    checkConvertNow: function() {
      this.convertCheckbox.now = true;
      this.convertCheckbox.later = false;
      this.view.imgConvertNow.src = "radioactivebb.png";
      this.view.imgConvertDate.src = "radioinactivebb.png";
      this.view.flxScheduleDate.setVisibility(false);
    },
    checkConvertLater: function(){
      this.convertCheckbox.now = false;
      this.convertCheckbox.later = true;
      this.view.imgConvertNow.src = "radioinactivebb.png";
      this.view.imgConvertDate.src = "radioactivebb.png";
      this.view.flxScheduleDate.setVisibility(true);
    },
    setCurrencyList: function(data){
      let separator = " - ";
      if(!data){
        this.view.flxAddCurrency.setVisibility(false);
      }
      for (item in data) {
        if (item) {
          this.modalSegmentData.push({
            name: data[item].CurrencyCode + separator + data[item].CurrencyValue
          });
        }
      }
      this.view.segAddCC.widgetDataMap = {lblAddCurrencyCode:"name"};
      this.view.segAddCC.setData(this.modalSegmentData);
    },
    setValueTo: function(){
      let selectedAdd = this.view.segAddCC.selectedRowItems[0];
      if(selectedAdd){
        this.currencyNew = selectedAdd.name.split(" - ");
        this.view.lblListBoxToValue.text = this.currencyNew[0];
        this.getRateValue(this.currencyNew[0]);
        var wealthModule =kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "WealthPortfolioUIModule",
                        "appName": "PortfolioManagementMA"
                    }).presentationController;
        let newCurrencyAdd = {
          "accountName": "NewJohn Bailey A/c 1",
          "accountNumber": "11098",
          "balance": "0",
          "currency": this.currencyNew[0],
          "currencyName": this.currencyNew[1],
          "referenceCurrencyValue": "0"
        };
		let existInList;
		if(wealthModule.selectedCurrencies!=null){
			existInList = wealthModule.selectedCurrencies.find( ({ currency }) => currency === this.currencyNew[0] );
		}
        if(!existInList){
          wealthModule.selectedCurrencies.push(newCurrencyAdd);
        }
        this.view.lblToBalance.text = kony.i18n.getLocalizedString("i18n.wealth.current") + " " +this.currencyNew[0] + " "+ kony.i18n.getLocalizedString("i18n.wealth.balance");
        this.view.lblToBalanceValue.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol("0",this.currencyNew[0]);
        this.hideAddCurrencyModal();
      }
    },
    searchInModal: function () {
      let newSegmentData = [];
      let data = this.modalSegmentData;
      for (item in data) {
        if (item) {
          let newString = data[item].name;
          if(newString.toLowerCase().indexOf(this.view.textSearchInput.text.toLowerCase())!== -1)
            newSegmentData.push({
              name: data[item].name
            });
        }
      }
      this.view.segAddCC.widgetDataMap={lblAddCurrencyCode:"name"};
      this.view.segAddCC.setData(newSegmentData);
    },
    toggleFromDropdown: function () {
      if(this.view.lblIconFrom.text === "O"){
        this.view.lblIconFrom.text="P";
        this.view.flxFromDropdownContent.setVisibility(true);
        this.view.flxToDropdownContent.setVisibility(false);
        this.view.lblIconTo.text="O";
        this.checkOpenPopup = true;
      } else {
        this.view.lblIconFrom.text="O";
        this.view.flxFromDropdownContent.setVisibility(false);
        this.checkOpenPopup = false;
      }
    },

    toggleToDropdown: function () {
      if(this.view.lblIconTo.text === "O"){
        this.view.lblIconTo.text="P";
        this.view.flxToDropdownContent.setVisibility(true);
        this.view.flxFromDropdownContent.setVisibility(false);
        this.view.lblIconFrom.text="O";
        this.checkOpenPopup = true;
      } else {
        this.view.lblIconTo.text="O";
        this.view.flxToDropdownContent.setVisibility(false);
        this.checkOpenPopup = false;
      }
    },

    showAddCurrencyModal: function () {
      this.view.flxAddCurrencyModal.setVisibility(true);
      this.view.textSearchInput.text = "";
      this.view.segAddCC.removeAll();
      this.view.segAddCC.setData(this.modalSegmentData);
    },

    hideAddCurrencyModal: function () {
      this.view.flxAddCurrencyModal.setVisibility(false);
      this.closeAllDropdowns();
    },

    closeAllDropdowns: function(){
      this.view.flxFromDropdownContent.setVisibility(false);
      this.view.lblIconFrom.text="O";
      this.view.flxToDropdownContent.setVisibility(false);
      this.view.lblIconTo.text="O";
      this.checkOpenPopup = false;
    },

    portfolioAssetsCash: function (data) {
      this.view.segFromDropdown.widgetDataMap={lblToCurrencyCode:"currency", lblToCurrencyName:"currencyName"};
      this.view.segFromDropdown.setData(data.cashAccounts);
      this.view.segFromDropdown.onRowClick = this.setFromBalance;
    },
    setFromBalance: function(){
      let fromBalance = this.view.segFromDropdown.selectedRowItems[0];
      let tempSegData = this.view.segFromDropdown.data;
      let toSegData = tempSegData.filter((item) => item.currency !== fromBalance.currency);
      this.view.segToDropdown.widgetDataMap={lblToCurrencyCode:"currency", lblToCurrencyName:"currencyName"};
      this.view.segToDropdown.setData(toSegData);
      this.view.lblFromBalance.text = kony.i18n.getLocalizedString("i18n.wealth.current") + " " + fromBalance.currency + " "+kony.i18n.getLocalizedString("i18n.wealth.balance");
      this.view.lblListBoxFromValue.text = fromBalance.currency;
      this.view.lblFromBalanceValue.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(fromBalance.balance, fromBalance.currency);
      this.view.lblIconFrom.text="O";

      this.view.flxFromDropdownContent.setVisibility(false);
      this.view.segToDropdown.onRowClick = this.setToBalance.bind(this);
      this.view.flxDropdown.onClick = this.toggleToDropdown;
      if(this.currencyNew[0]){
        this.getRateValue(this.currencyNew[0]);
        this.convertCurrency();
      }
      this.checkSkin();
      this.checkSameCurrency();
    },

    setToBalance: function(){
      let toBalance = this.view.segToDropdown.selectedRowItems[0];
      this.view.lblToBalance.text = kony.i18n.getLocalizedString("i18n.wealth.current") + " " + toBalance.currency + " " +kony.i18n.getLocalizedString("i18n.wealth.balance");
      this.view.lblToBalanceValue.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(toBalance.balance, toBalance.currency);
      this.view.lblListBoxToValue.text = toBalance.currency;
      this.view.lblIconTo.text="O";
      this.view.flxToDropdownContent.setVisibility(false);
      this.currencyNew="";
      this.checkSkin();
      this.checkSameCurrency();
      this.getRateValue();
      this.view.btnSwitch.enable = true;
    },

    getRateValue: function(currencyCode){
      this.view.flxErrorInfo.setVisibility(false);
      let fromBalance = this.view.lblListBoxFromValue.text;
      let toBalance = currencyCode?currencyCode:this.view.lblListBoxToValue.text;
	  var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"});
      this.currencyPairs = fromBalance + toBalance;
	  var navManager = applicationManager.getNavigationManager();
      var portfolioId = navManager.getCustomInfo('frmCurrencyConverter');
      let params = {
        "currencyPairs": this.currencyPairs,
		"portfolioId" : portfolioId
      };
      wealthModule.getCurrencyRate(params);
      this.chartService("1M");
      this.view.txtLeftAmountValue.enable = true;
    },

    setRate: function(data){
      let formatValue = applicationManager.getFormatUtilManager();
      this.view.lblRateFromCurrency.text = this.view.lblListBoxFromValue.text;
      this.view.lblRateToValue.text = formatValue.formatAmount(data.marketRate);
      this.view.lblRateToCurrency.text = this.view.lblListBoxToValue.text;
      this.view.flxFromBalance.setVisibility(true);
      this.view.flxToBalance.setVisibility(true);
      this.view.flxVerticalDash.height = "230Dp";
      this.view.flxRate.setVisibility(true);
      this.view.flxDummyChart.setVisibility(false);
      if(this.view.txtLeftAmountValue.text){
        this.convertCurrency();
      }
    },

    convertCurrency: function(){
      let formatValue = applicationManager.getFormatUtilManager();
      let oldVal = this.view.txtLeftAmountValue.text;
      let firstPart = new RegExp("[^0-9" + this.decimalSeparator + "]", "g");
      let secondPart = new RegExp("(\\" + this.decimalSeparator + this.decimalSeparator + "*?)\\" + this.decimalSeparator + this.decimalSeparator + "*", "g");
      this.view.txtLeftAmountValue.text = oldVal.replace(firstPart, '').replace(secondPart, '$1');
      let marketRate = formatValue.deFormatAmount(this.view.lblRateToValue.text);
      let convertedAmount = (parseFloat(this.view.txtLeftAmountValue.text) * parseFloat(marketRate)).toFixed(2);

      if(!isNaN(convertedAmount) && (parseFloat(this.view.txtLeftAmountValue.text) > 0) && (this.view.txtLeftAmountValue.text !== "")){
        this.view.lblRightAmountValue.text = formatValue.formatAmount(String(convertedAmount));
        CommonUtilities.enableButton(this.view.btnConvert);
        this.view.flxErrorInfo.setVisibility(false);
      } else {
        this.view.lblRightAmountValue.text = "";
        CommonUtilities.disableButton(this.view.btnConvert);
        this.view.flxErrorInfo.setVisibility(false);
      }
    },

    switchCurrency: function(){
      let lblListBoxFromValue = this.view.lblListBoxFromValue.text;
      let lblFromBalance = this.view.lblFromBalance.text;
      let lblFromBalanceValue = this.view.lblFromBalanceValue.text;

      this.view.lblListBoxFromValue.text = this.view.lblListBoxToValue.text;
      this.view.lblListBoxToValue.text = lblListBoxFromValue;
      this.view.txtLeftAmountValue.text = "";
      this.view.lblRightAmountValue.text = "";

      this.view.lblFromBalance.text = this.view.lblToBalance.text;
      this.view.lblFromBalanceValue.text = this.view.lblToBalanceValue.text;

      this.view.lblToBalance.text = lblFromBalance;
      this.view.lblToBalanceValue.text = lblFromBalanceValue;

      this.getRateValue();
    },
    checkDropdown: function(){
      let scopeObj = this;
      if ((this.view.flxFromDropdownContent.isVisible && (this.checkOpenPopup = true)) || (this.view.flxToDropdownContent.isVisible && (this.checkOpenPopup = true))) {
        setTimeout(function() {
          scopeObj.closeAllDropdowns();
        }, "17ms");
      }
    },
    formatValueDecimal: function(){
      this.checkDropdown;
      let formatValue = applicationManager.getFormatUtilManager();
      if(this.view.txtLeftAmountValue.text){
        this.view.txtLeftAmountValue.text = formatValue.formatAmount(formatValue.deFormatAmount(this.view.txtLeftAmountValue.text));
      }
    },
    // to be used in the future
    
//     validateConvertNow: function(amount, balance){
//       let formatValue = applicationManager.getFormatUtilManager();
//       if((parseFloat(formatValue.deFormatAmount(amount)) > formatValue.deFormatAmount(balance)) || (parseFloat(formatValue.deFormatAmount(amount)) === 0)){
//         this.view.flxErrorInfo.setVisibility(true);
//         this.view.txtErrorInfo.text = "Inadequate cash balance in the account!";
//         return false;
//       } else {
//         this.view.flxErrorInfo.setVisibility(false);
//         this.view.txtErrorInfo.text = "";
//         return true;
//       }
//     },
    navigateToConfirm: function(){
      let formatValue = applicationManager.getFormatUtilManager();
      let params = {
        buyCurrency: this.view.lblRateFromCurrency.text,
        sellCurrency: this.view.lblRateToCurrency.text,
        buyAmount: this.view.txtLeftAmountValue.text,
        sellAmount: this.view.lblRightAmountValue.text
      };
      let amount = this.view.txtLeftAmountValue.text;
      let balanceOld = this.view.lblFromBalanceValue.text;
      let deFormatBalance = balanceOld.replace(/[^0-9.,]/g, '');
      let balance = deFormatBalance?deFormatBalance:0;

      if(this.convertCheckbox.later){
        params.convertTime = this.view.calendarDate.formattedDate;
      }
      if(params.sellAmount){
        var navManager =  applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        navManager.setCustomInfo("frmCurrencyConverterLeftAmount", params.buyAmount);
        navManager.navigateTo("frmCurrencyConverterConfirm");
        navManager.updateForm({
          currencyConfirmData: params
        }, 'frmCurrencyConverterConfirm');
      }
    },

    chartService: function(filter) {
      var params = {
        "currencyPairs": this.currencyPairs,
        "dateOrPeriod": filter,
      };
      var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"});
      wealthModule.getHistoricalCurrencyRate(params);
    },

    lineChartData: function(responseObj) {
      let chartStyle = {
        lineColor : '#2F8523',
        areaColor : '#2f8523'
      };
      var graphData = responseObj.response.historicalData;
      if(graphData){
        this.view.investmentLineChart.setChartData(graphData, chartStyle);
      }else{
        this.view.flxDummyChart.setVisibility(true);
      }
    },

    chartFilters: {
      ONE_MONTH: '1M',
      ONE_YEAR: '1Y',
      FIVE_YEAR: '5Y',
      YTD: 'YTD',
    },

    onFilterChanged: function(filter) {
      var filterMap = "";
      if (filter === this.chartFilters.ONE_MONTH) {
        filterMap = "1M";
        this.chartService(filterMap);
      } else if (filter === this.chartFilters.ONE_YEAR) {
        filterMap = "1Y";
        this.chartService(filterMap);
      } else if (filter === this.chartFilters.FIVE_YEAR) {
        filterMap = "5Y";
        this.chartService(filterMap);
      } else {
        filterMap = "YTD";
        this.chartService(filterMap);
      }
    },
    /**
         *setActiveHeaderHamburger - Method to highlight active header and hamburger
         */
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    onBreakpointChange: function(form, width) {
      //       responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {

      //       }.bind(this));
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      //       this.view.customfooter.onBreakpointChangeComponent(width);
    },
    setError: function(obj){
      this.view.txtErrorInfo.text = obj.errorMessage;
      this.view.flxErrorInfo.setVisibility(true);
      this.view.txtLeftAmountValue.enable = false;
      CommonUtilities.disableButton(this.view.btnConvert);
    }
  };
});