define({
  init: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   }catch(err) {
        this.setError(err, "init");
      }
    },
  preShow: function () {
    try{
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.customHeader.setVisibility(true);
    }
    else{
      this.view.customHeader.setVisibility(false);
    }
      this.view.investmentLineChart.currentFilter='1M';
       }catch(err) {
        this.setError(err, "preShow");
      }
  },

  postShow: function () {
    try{
    this.view.btnProceed.onClick = this.onSubmit;

    this.initActions();
       }catch(err) {
        this.setError(err, "postShow");
      }
  },

  initActions:function(){
    try{
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;

    this.view.btnTglConvertNow.onClick = this.onToggleConversionPreference.bind(this, 0);
    this.view.btnTglScheduleLater.onClick = this.onToggleConversionPreference.bind(this, 1);
    this.view.flxScheduleOn.onClick = this.onScheduleLater;
    var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    let data = wealthMod.getWealthObject();

    this.setConversionData(data);
    let filterValues = Object.keys(this.chartFilters).map(key => this.chartFilters[key]);
    this.view.investmentLineChart.setChartFilters(filterValues);
    var formatUtil=applicationManager.getFormatUtilManager();
    this.view.investmentLineChart.currencySymbol = formatUtil.getCurrencySymbol(data.buyCurrency);
    this.onFilterChanged(this.view.investmentLineChart.currentFilter);
     }catch(err) {
        this.setError(err, "initActions");
      }
  },


  // Called when chart filter changed - Mapped in onFilterChange event on CHart Component
  onFilterChanged : function (filter) {
    try{
    //     var wealthMod = applicationManager.getModulesPresentationController("WealthModule");
    //     wealthMod.getHistoricalCurrencyData('USDGBP',filter);
    var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    let data = wealthMod.getWealthObject();
    wealthMod.getHistoricalCurrencyData(data.sellCurrency+''+data.buyCurrency,filter);
   }catch(err) {
        this.setError(err, "onFilterChanged");
      }
    },

  setChartData : function(data) {
    try{
    this.view.investmentLineChart.setChartData(data,null,null,this.chartConfig,"CURRENCY");
  }catch(err) {
        this.setError(err, "setChartData");
      }
    },

  extractChartData : function(data) {
    try{
    let xAxisLabels = [];
    let dataPoints = [];
    data.forEach((h,i) => {
      let key = Object.keys(h)[0];
      xAxisLabels.push(key);
      dataPoints.push(h[key]);
    });

    return {
      dataPoints,
      xAxisLabels
    };
       }catch(err) {
        this.setError(err, "extractChartData");
      }
  },

  setFilterData : function(filter,histData=null) {
    try{
    if(histData!==null) {
      let chartData = this.extractChartData(histData);
      this.view.investmentLineChart.setChartData.call(this,chartData.dataPoints,chartData.xAxisLabels,null,this.chartConfig);
    } else {
      var XaxisArray = [];
      var YaxisArray = [];
      var data = [];
      var maxVal = 0;
      if (filter === this.chartFilters.ONE_MONTH) {
        XaxisArray = ['5', '10', '15', '20', '25', '30'];
        YaxisArray = [0, 10, 20, 50, 60, 100, 120];
        data = [10, 40, 69, 90, 5, 120];
        maxVal = Math.max.apply(null,data)+20;
      }
      else if (filter === this.chartFilters.ONE_YEAR) {
        XaxisArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        YaxisArray = [0, 500, 1000, 1500, 2000, 2500, 5000];
        data = [0, 1000, 500, 2000, 1000, 5000, 2000, 2500, 1500, 2000, 1000, 500];
        maxVal = Math.max.apply(null,data)+200;
      }
      else if (filter === this.chartFilters.FIVE_YEARS) {
      }
      else if (filter === this.chartFilters.YTD) {
      }
      this.view.investmentLineChart.setChartData(data,XaxisArray,null,this.chartConfig);
    }
     }catch(err) {
        this.setError(err, "setFilterData");
      }
  },

  chartFilters: {
    ONE_MONTH:'1M',
    ONE_YEAR:'1Y',
    FIVE_YEARS:'5Y',
    YTD:'YTD',    
  },

  chartConfig : {
    lineColor : '#2F8523',
    areaColor : '#2F8523'
  },

  onToggleConversionPreference: function (option) {
    try{
    let activeSkin = 'sknBtnFFFFFFBdr10px';
    let inactiveSkin = 'sknbtn000000SSPSemiBold15px';
    var wealthMod = applicationManager.getModulesPresentationController("WealthModule");
    if (!option) {
      this.view.btnTglConvertNow.skin = activeSkin;
      this.view.btnTglScheduleLater.skin = inactiveSkin;
      this.view.flxScheduleOn.setVisibility(false);
      wealthMod.setConvertNowFlow(true);
    } else {
      this.view.btnTglConvertNow.skin = inactiveSkin;
      this.view.btnTglScheduleLater.skin = activeSkin;
      this.view.flxScheduleOn.setVisibility(true);
      wealthMod.setConvertNowFlow(false);
    }
       }catch(err) {
        this.setError(err, "onToggleConversionPreference");
      }
  },

  setCurrencyBalances : function(curr1,curr2) {
    try{
    this.view.lblBalance1.text = curr1;
    this.view.lblBalance2.text = curr2;
       }catch(err) {
        this.setError(err, "setCurrencyBalances");
      }
  },

  setConversionData : function(data) {
    try{
    var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    var dataRate = scope_WealthPresentationController.currencyRate.marketRate;
    if (dataRate){
      this.view.flxConvertedCurrency.text = dataRate + ' ' + data.buyCurrency;
    }else {
      this.view.flxConvertedCurrency.text = data.buyCurrency;
    }
    this.view.flxOrigCurrency.text = '1 '+data.sellCurrency+' equals';


    let date = new Date();
    let options = {month: 'short',hour:'numeric',minute:'numeric',timeZone:'UTC',timeZoneName:'short'};
//     let dateString = date.toLocaleDateString('en-US', options);
    let rest = date.toLocaleTimeString('en-US',options);
    var rest1=rest.split(',');
    this.view.flxConversionTimestamp.text = 'As of'+rest1[1]+' '+rest1[0]+' '+date.getUTCDate();
  }catch(err) {
        this.setError(err, "setConversionData");
      }
    },
  onScheduleLater : function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmScheduleDate");
       }catch(err) {
        this.setError(err, "onScheduleLater");
      }
  },

  onSubmit: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmConvertCurrencyVerify");
       }catch(err) {
        this.setError(err, "onSubmit");
      }
  },

  onBack : function(){
    try{
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
       }catch(err) {
        this.setError(err, "onBack");
      }
  },

  onCancel : function() {
    try{
    //var navigationMan = applicationManager.getNavigationManager();
  var nav=  new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioDetails"}).navigate();
   // navigationMan.navigateTo('frmPortfolioDetails');
  }catch(err) {
        this.setError(err, "onCancel");
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