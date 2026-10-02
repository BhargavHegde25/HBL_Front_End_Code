define({ 
 init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
 
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
  },
  
  initActions: function(){
    this.view.customHeader.flxBack.onClick = this.backOnClick;
  },
  backOnClick:function(){
    /*var navigationMan = applicationManager.getNavigationManager();
		navigationMan.goBack();*/
    new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmTopNews"}).navigate();
  },
  postShow:function(){
    this.initActions();
    var navigationMan = applicationManager.getNavigationManager();
    var stockdata=navigationMan.getCustomInfo('frmTopNewsDetails');
    this.setStockNewsDetails(stockdata); 
    this.setFormTitle(stockdata.fromDashboard);
  },
  
  setStockNewsDetails: function(stockdata){
    if(stockdata.fromDashboard){
      this.view.lblDetails.text = stockdata.detailedNews;
      this.view.lblTime.text = stockdata.Time;
      this.view.lblProvider.text = stockdata.Provider;
      this.view.lblHeader.text = stockdata.Headline;
    }
    else{
     var data = stockdata.response;
      this.view.lblDetails.text = data.stockNewsStory.TE;
      this.view.lblTime.text = stockdata.time;
      this.view.lblProvider.text = data.stockNewsStory.PR;
      this.view.lblHeader.text = data.stockNewsStory.HT;
    }
 },
  
   setFormTitle: function(isFromDashboard){
     if(isFromDashboard){
       this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Wealth.topNews");
       this.view.title = kony.i18n.getLocalizedString("i18n.Wealth.topNews");
     }else{
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.stockNews");
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.stockNews");
     }
   }

 });