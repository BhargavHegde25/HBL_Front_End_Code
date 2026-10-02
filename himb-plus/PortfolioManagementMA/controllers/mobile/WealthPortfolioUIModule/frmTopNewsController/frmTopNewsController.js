define(['CommonUtilities'], function(CommonUtilities) {

  return{
  fromDashboard: false,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
 
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
  },//Typevar data=navManager.getCustomInfo('frmInstrumentDetails');
  
  initActions: function(){
    this.view.segNews.onRowClick = this.onRowClick;
    this.view.customHeader.flxBack.onClick =this.backOnClick; 
  },
  backOnClick:function(){
    try{
    // var navigationMan = applicationManager.getNavigationManager();
	//navigationMan.goBack();
    if(this.fromDashboard === false){
          new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmInstrumentDetails"}).navigate();

    } else{
          new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "frmUnifiedDashboard"}).navigate();
}
    }catch(err){
       this.setError(err, "backOnClick"); 
    }
  },
  
  postShow: function() {
    try{
        this.initActions();
        var navigationMan = applicationManager.getNavigationManager();
        var prevForm = navigationMan.getPreviousForm();
        var data = {};
        var dataFromRes = navigationMan.getCustomInfo('frmTopNews');
        if(dataFromRes === undefined){
            this.fromDashboard = false;
        }
        else{
        if (dataFromRes.fromDashboard && prevForm !== "frmInstrumentDetails") {
            this.fromDashboard = dataFromRes.fromDashboard;
        } else {
            this.fromDashboard = false;
        }
        }
        if (this.fromDashboard) {
            this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Wealth.topNews");
            this.view.title = kony.i18n.getLocalizedString("i18n.Wealth.topNews");
            var temp = dataFromRes.response.GetSummaryByTopic_Response_1.StoryMLResponse.STORYML;
            this.setStockNews(temp);
        } else {
              this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.stockNews");
        this.view.title = kony.i18n.getLocalizedString("i18n.wealth.stockNews");
            data = navigationMan.getCustomInfo('frmInstrumentDetails');
            this.setStockNews(data.instrumentDetails);
        }
    }catch(err){
       this.setError(err, "postShow"); 
    }
    },
  
  setStockNews:function(data){
    try{
    var news;
    if(this.fromDashboard){
      news = data.HL;
    }
    else{
    news=data.stockNews;
      }
    var results=[];
    for(var num in news){
      var storeData;
      var dateToString;
      var data=news[num];
      var time;
      if(this.fromDashboard){
            time = data.LT.split('T');
           dateToString = data["LT"].replace(/\D/g,'');
            }
            else{
            time = data.RT.split('T');
            dateToString = data["RT"].replace(/\D/g,'');
       }
      
      // var dateToString = data["RT"].replace(/\D/g,'');
       RT = CommonUtilities.getTimeDiferenceOfDate(dateToString.substring(0,14)); 
                    var temp= data.HT;
              if(65<temp.length){
                temp= temp.substring(0, 65);
                temp = temp+"...";
              }
       if(this.fromDashboard){
          storeData={
        Headline:temp,
        Time: RT,
        Provider: data.PR,
        ID: data.ID,
        detailedNews: data.TE
      };
       }
      else{
     storeData={
        Headline:temp,
        Time: RT,
        Provider: data.PR,
        ID: data.ID
      };
      }
      results.push(storeData);
    }
    this.view.segNews.widgetDataMap={
      lblTitle:"Provider",
      lblTime:"Time",
      lblNews:"Headline",
      dummyData:"ID"
    };
    this.view.segNews.setData(results);
    }
    catch(err){
       this.setError(err, "setStockNews"); 
    }
  },
  onRowClick:function(){
    try{
     var rowindex=this.view.segNews.selectedRowIndex[1];
   if(this.fromDashboard){
     var newsData ={};
     newsData =this.view.segNews.data[rowindex];
     newsData.fromDashboard = true;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmTopNewsDetails", newsData);
     var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    wealthModule.commonFunctionForNavigation("frmTopNewsDetails");
   }
    else{
    var selnewsdata=[];
    //var news=data.stockNews;
    var frmnewsdata=this.view.segNews.data[rowindex];
    var navMan = applicationManager.getNavigationManager();
     var currencyData = navMan.getCustomInfo("frmTopNewsDetails");
    if(kony.sdk.isNullOrUndefined(currencyData)){
      var currencyData={};
      currencyData.time=frmnewsdata.Time;
    }else{
      currencyData.time=frmnewsdata.Time;
    }
    currencyData.fromDashboard = false;
    navMan.setCustomInfo("frmTopNewsDetails", currencyData);
    var wealthMod = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    //var news=data.stockNews;
      var param={
        "StoryId":frmnewsdata.ID
      }
    wealthMod.getStockNewsStory(param);
    //  }
  }
  }catch(err){
       this.setError(err, "onRowClick"); 
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
  }
});
