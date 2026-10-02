define({
response: {
    "Downloadformat": [
      {
        "Type": "PDF",
      },
      {
        "Type": "EXCEL (xlsx)",
      },
      {
        "Type": "CSV",
      }
    ],
  },
storedata: [],
format : "PDF",
dateRange : [],
requestParams:{},
rowIndex :0,
init: function(){
    this.view.preShow =  this.preShow;
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
preShow: function(){
try{
    var navManager = applicationManager.getNavigationManager();
    let currentTheme = kony.theme.getCurrentTheme();
     if(currentTheme === "default"){
        this.activeImage = "radiobtn.png";
        this.inactiveImage = "radiobuttoninactive.png";
     }else{
        this.activeImage = "radioactivewealth.png";
        this.inactiveImage = "radioinactivewealth.png";
     } 
    var previousForm=kony.application.getPreviousForm().id;
    this.dateRange=applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
    if(kony.application.getPreviousForm().id==="frmOrders"){
      if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType=="open"){
        this.requestParams = {
          "portfolioId":navManager.getCustomInfo("frmOrders"),
          "navPage":"Open Order",
          // IW-3693 - Bhuvaneshwaran - Starts
          "searchByInstrumentName":scope_WealthPresentationController.searchInst,
          //IW-3693 - ends
          "sortBy":"tradeDate",
          "pageSize":10,
          "orderId":"",
          "pageOffset":0,
          "sortOrder":"DESC",
          "type":"Open",
          "startDate":this.dateRange.startDate,
          "endDate":this.dateRange.endDate,
          "isEuro": "false",
          "downloadFormat": "pdf"
        };
      }else if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType=="history"){
        this.requestParams = {
          "portfolioId":navManager.getCustomInfo("frmOrders"),
          "navPage":"History Order",
          // IW-3693 - Bhuvaneshwaran - Starts
          "searchByInstrumentName":scope_WealthPresentationController.searchInst,
          //IW-3693 - ends
          "sortBy":"tradeDate",
          "pageSize":10,
          "orderId":"",
          "pageOffset":0,
          "sortOrder":"DESC",
          "type":"History",
          "startDate":this.dateRange.startDate,
          "endDate":this.dateRange.endDate,
          "isEuro":"isEuro",
          "downloadFormat":"pdf"
        };
      }
  }
   else{
        if(kony.application.getPreviousForm().id==="frmHoldings"){
          if(scope_WealthPresentationController.isOpenOrdersIncluded){
          this.requestParams = {
            "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "fieldOrder":"0,1,2,3,4,5",
            "navPage":"Holdings",
            "searchByInstrumentName":scope_WealthPresentationController.searchInst,
            "sortBy":(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsIncludeOrders === "")?"description":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsIncludeOrders,
            "pageSize":10,
            "pageOffset":0,
            "sortOrder":"ASC",
            "isEuro":"false",
            "isIncludeOrders":"true",
            "downloadFormat":"pdf"
          };
          }else{
            this.requestParams = {
            "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "fieldOrder":"0,1,2,3,4,5",
            "navPage":"Holdings",
            "searchByInstrumentName":scope_WealthPresentationController.searchInst,
            "sortBy":(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsExcludeOrders === "")?"description":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsExcludeOrders,
            "pageSize":10,
            "pageOffset":0,
            "sortOrder":"ASC",
            "isEuro":"false",
            "isIncludeOrders":"false",
            "downloadFormat":"pdf"
          };
          }
        }else if(kony.application.getPreviousForm().id==="frmTransactions"){
          this.requestParams = {
            "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "navPage": "Transactions",
            // IW-3693 - Bhuvaneshwaran - Starts
            "searchByInstrumentName":scope_WealthPresentationController.searchInst,
            //IW-3693 - ends
            "sortBy": (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans === "")?"tradeDate":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans,
            "pageSize": 10,
            "pageOffset": 0,
            "startDate": this.dateRange.startDate,
            "endDate": this.dateRange.endDate,
            "sortOrder": "DESC",
            "isEuro": "isEuro",
            "downloadFormat": "pdf"
          };
        }
//      else if(kony.application.getPreviousForm().id==="frmPerformance"){
//           this.requestParams = {
//             "portfolioId":scope_WealthPresentationController.portfolioId,
//             "navPage":"Performance",
//             "sortBy":"dateTime",
//             "sortOrder":"DESC",
//             "pageSize":10,
//             "pageOffset":0,
//             "dateFrom":this.dateRange.startDate.replace(/-/g, ''),
//             "dateTo":this.dateRange.endDate.replace(/-/g, ''),
//             "duration":"OneY",
//             "benchMarkIndex":scope_WealthPresentationController.benchmark,
//             "isEuro":"isEuro",
//             "currencyId":scope_WealthPresentationController.refCurrencyId,
//             "downloadFormat":"pdf"
//           };
//         }
     else if(kony.application.getPreviousForm().id==="frmAccounts"){
          this.requestParams = {
            "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "navPage":"Accounts Activity",
            // IW-3693 - Bhuvaneshwaran - Starts
            "searchByInstrumentName":scope_WealthPresentationController.searchInst,
            //IW-3693 - ends
            "sortBy":"bookingDate",
            "accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
            "listType":"SEARCH",
            "pageOffset":0,
            "pageSize":10,
            "sortOrder":(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts === "")?"bookingDate":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts,
            "dateFrom":this.dateRange.startDate.replace(/-/g, ''),
            "dateTo":this.dateRange.endDate.replace(/-/g, ''),
            "isEuro":"false",
            "downloadFormat":"pdf"
          };
        }else if(kony.application.getPreviousForm().id==="frmReport"){
          this.requestParams = {
            "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
            "navPage":"Reports",
            "downloadFormat":"pdf"
          };
        }else if(kony.application.getPreviousForm().id==="frmPerformance"){
          this.requestParams ={
            "portfolioId":scope_WealthPresentationController.portfolioId,
            "navPage":"Performance",
            "sortBy":"dateTime",
            "sortOrder":"DESC",
            "pageSize":10,
            "pageOffset":0,
            "dateFrom":this.dateRange.startDate.replace(/-/g, ''),
            "dateTo":this.dateRange.endDate.replace(/-/g, ''),
            "duration":this.dateRange.duration,
            "benchMarkIndex":scope_WealthPresentationController.benchmark,
            "isEuro":"isEuro",
            "currencyId":scope_WealthPresentationController.refCurrencyId,
			      "downloadFormat":"pdf"
          }
        }
        }
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
      this.view.flxDownload.top="59dp";
    } else {
      kony.application.getCurrentForm().titleBarAttributes.rightBarButtonItems[0].action = this.onCancel; //IW-3960
      this.view.flxHeader.isVisible = false;
      this.view.flxDownload.top="0dp";
    }
    this.view.flxDateRange.isVisible= false;
    this.diaplayContent();
    this.loadSegData(this.response);
    this.view.customHeader.flxBack.onTouchEnd = this.goBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;
	
    this.view.segDownload.onRowClick=this.selectValue;
    this.view.flxDownloadWrapper.onTouchEnd=this.nav;
    }catch(err){
		   this.setError(err, "preShow");
	  }
  },
  nav :function()
  {
  try{
    var navManager = applicationManager.getNavigationManager();
    var previousForm=kony.application.getPreviousForm().id;
    if(previousForm==="frmReport"){
        navManager.setCustomInfo('frmDownload', this.requestParams.downloadFormat);
        navManager.navigateTo("frmReport");
      }
    else{
        this.onClickDownloadTxns();
    }
    }catch(err){
		   this.setError(err, "nav");
	  }
  },
  diaplayContent: function()
  {
  try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    var previousForm=kony.application.getPreviousForm().id;
    var rightBarButtonItem;
    if(previousForm==="frmReport"){
      this.view.flxDescription.isVisible=false;
      //IW-3700 - Padmasri S - Starts
      this.view.customHeader.btnRight.isVisible=false;
      this.view.title="Format";
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") 
      {
        rightBarButtonItem = new kony.ui.BarButtonItem({
                type: constants.BAR_BUTTON_TITLE,
                style: constants.BAR_ITEM_STYLE_PLAIN,
                enabled: true,
                tintColor: "FFFFFF00",
                metaData: {
                  title: " "
                }
              });
              this.view.setRightBarButtonItems({
                items: [rightBarButtonItem],
                animated: true
              });
			  //WIW-263
              kony.application.getCurrentForm().titleBarAttributes.rightBarButtonItems[0].action = this.onCancel; 
      }
      //IW-3700 - ends
      this.view.customHeader.lblLocateUs.text="Format";
      this.view.btnContinue.text="Apply";
    }
    else{
      //IW-3700 - Padmasri S - Starts
      this.view.customHeader.btnRight.isVisible=true;
      this.view.title=kony.i18n.getLocalizedString("i18n.wealth.download");
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") 
      {
        rightBarButtonItem = new kony.ui.BarButtonItem({
                type: constants.BAR_BUTTON_TITLE,
                style: constants.BAR_ITEM_STYLE_PLAIN,
                enabled: true,
                tintColor: "FFFFFF00",
                metaData: {
                  title: kony.i18n.getLocalizedString("i18n.wealth.cancel")
                }
              });
              this.view.setRightBarButtonItems({
                items: [rightBarButtonItem],
                animated: true
              });
			  //WIW-263
              kony.application.getCurrentForm().titleBarAttributes.rightBarButtonItems[0].action = this.onCancel; 
      }
      //IW-3700 - ends
      this.view.flxDescription.isVisible=true;
      this.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("i18n.wealth.download");
      this.view.btnContinue.text=kony.i18n.getLocalizedString("i18n.wealth.download");
      }
    var ordertype = navManager.getCustomInfo("frmOrderType");
    if(previousForm==="frmHoldings"){
          this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.latestMonthholdings");
        }else if(previousForm==="frmOrders"){
          if(ordertype === "open")
            this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.latestMonthorders");
          else if(ordertype === "history")
            this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.ordersSmall");
        }else if(previousForm==="frmTransactions"){
          this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.transactionsSmall");
        }else if(previousForm==="frmPerformance"){
          this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.performanceSmall");
        }else if(previousForm==="frmReport"){
          this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.reportSmall");
        }else if(previousForm==="frmAccounts"){
          this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.accountActivitySmall");
        }else if(previousForm==="frmPerformance"){
          this.view.lblType.text=kony.i18n.getLocalizedString("i18n.wealth.performanceSmall");
        }
	}catch(err){
		   this.setError(err, "diaplayContent");
	  }
  },
  onCancel: function(){
  try{
    var params = {
      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
      "navPage": "Portfolio",
      "graphDuration": ""
    };
    var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    wealthModule.getPortfolioAndGraphDetails(params);
    }catch(err){
		   this.setError(err, "onCancel");
	  }
  },
  goBack: function() {
        try {
        var navigationMan=applicationManager.getNavigationManager();
        var previousForm=kony.application.getPreviousForm().id;
        if(previousForm==="frmHoldings"){
          navigationMan.navigateTo("frmHoldings");
        }else if(previousForm==="frmOrders"){
          navigationMan.navigateTo("frmOrders");
        }else if(previousForm==="frmViewOrderHistoryDetails"){
          navigationMan.navigateTo("frmOrders");
        }else if(previousForm==="frmTransactions"){
          navigationMan.navigateTo("frmTransactions");
        }else if(previousForm==="frmViewTransactionDetails"){
          navigationMan.navigateTo("frmTransactions");
        } else if(previousForm==="frmInstrumentTransactions"){
          navigationMan.navigateTo("frmInstrumentTransactions");
        } else if(previousForm==="frmAccounts"){
            navigationMan.navigateTo("frmAccounts");
        }else if(previousForm==="frmReport"){
          navigationMan.navigateTo("frmReport");
        }
        else{
          navigationMan.goBack();        }
        } catch (e) {
        kony.print("exception onBack" + e);
      }
    },
  loadSegData: function(data)
  {
  try{
    this.storedata=[];
    for(var i=0;i<data.Downloadformat.length;i++)
    {
      var storingdata={};
      storingdata={
        name: {
          text: data.Downloadformat[i].Type,
        },
        img: {
          src : (i===0)?this.activeImage:this.inactiveImage,
          isVisible: true
        }
      };
      this.storedata.push(storingdata);
    }
    this.view.segDownload.widgetDataMap = {
      lblFormat: "name",
      imgRadio : "img"
    };
    this.view.segDownload.removeAll();
    this.view.segDownload.setData(this.storedata);
    }catch(err){
		   this.setError(err, "loadSegData");
	  }
  },
  selectValue: function()
  {
  try{
    this.storedata=this.view.segDownload.data;
    this.rowIndex = this.view.segDownload.selectedRowIndex[1];
    this.format=this.storedata[this.rowIndex].name;
    if(this.rowIndex===1){
      this.requestParams.downloadFormat="xlsx";
    }else if(this.rowIndex===2){
      this.requestParams.downloadFormat="csv";
    }else{
      this.requestParams.downloadFormat="pdf";
    }
    for(var i=0;i<3;i++)
    {
      if (i === this.rowIndex) {
        this.storedata[i].img = {
          "src": this.activeImage,
          isVisible: true
        };
      }
      else {
        this.storedata[i].img = {
          "src": this.inactiveImage,
          isVisible: true
        };
      }

    }
    this.view.segDownload.setData(this.storedata);
   } catch(err){
		   this.setError(err, "selectValue");
	  }
  },
  postShow: function() {

    },
  onClickDownloadTxns: function() {
  try{
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams = this.requestParams; 
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = this.requestParams.navPage;
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.downloadFormat = this.requestParams.downloadFormat;
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getDownloadList(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
      kony.print("test"+applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
    } catch(err){
		   this.setError(err, "onClickDownloadTxns");
	  }
    },
   onClickDownloadMessage:function(base64String,filename)
  {
    try 
    {  
       this.view.flxPopup.setVisibility(false);
       this.view.flxAdditionalOptions.isVisible = false;
       this.view.socialshare.shareWithBase64(base64String,filename);
    }catch(error){
   
      applicationManager.getPresentationUtility().dismissLoadingScreen();
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