define(['./marketNewsCardDAO', 'CommonUtilities'],function(marketNewsCardDAO, CommonUtilities) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objService="";
      this._objName="";
      this._operation="";
      this.marketNewsCardDAO = new marketNewsCardDAO();
      this._criteria = {};
      this._viewAllBtnStatus = "";
      this._headerLabel = "";
      this._skinHeading = "";
      this._topNewsPerm = false;
      this._newsDetailsPerm = false;

      defineSetter(this, 'objService', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objService = val;
        }
      });
      defineGetter(this, 'objService', function () {
        return this._objService;
      });

      defineSetter(this, 'objName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objName = val;
        }
      });
      defineGetter(this, 'objName', function () {
        return this._objName;
      });
      defineSetter(this, 'operation', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._operation = val;
        }
      });
      defineGetter(this, 'operation', function () {
        return this._operation;
      });
      defineSetter(this, 'viewAllBtnStatus', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._viewAllBtnStatus = val;
        }
      });
      defineGetter(this, 'viewAllBtnStatus', function () {
        return this._viewAllBtnStatus;
      });
      defineSetter(this, 'headerLabel', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._headerLabel = val;
        }
      });
      defineGetter(this, 'headerLabel', function () {
        return this._headerLabel;
      });
       defineSetter(this, 'skinHeading', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._skinHeading = val;
        }
      });
      defineGetter(this, 'skinHeading', function () {
        return this._skinHeading;
      });
      
    },
    getCriteria: function(criteria, marketTopNewsPermission, marketNewsViewDetails, flag){
      this._topNewsPerm = marketTopNewsPermission;
      this._newsDetailsPerm = marketNewsViewDetails;
      this._criteria = criteria;
      if(flag){
        this.preShow();
      }
    },
    makeDaoCallMarketNewsCard: function(){
      try{
        let serviceResponseIdentifier = "S1";
        let objectName = this._objName;
        let objectServiceName = this._objService;
        let operationName = this._operation;
        let params = this._criteria;
        this.marketNewsCardDAO.fetchDetails(objectServiceName,operationName,objectName,params,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onServiceSuccess: function(response){
      this.displayResults(response);
    },
    onError: function(errorObj){
      // error fetch
      this.view.setVisibility(false);
      this.marketNewsPostShow();
    },	
    preShow:function(){  
      var scope = this;
      if(this._topNewsPerm === true) {
         scope.initActions();
      }
    },
    initActions: function(){
      this.setViewAllBtn();
      this.view.lblViewAll.onTouchEnd=this.ViewAllMarketNews;
      this.view.lblHead.text = kony.i18n.getLocalizedString(this._headerLabel);
      this.view.flxSegHeading.skin = this._skinHeading;
      
      var self = this;
      
      try
      {
        this.makeDaoCallMarketNewsCard();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    displayResults: function(response){
      this.loadMarketNews(response);
    },

    loadMarketNews: function(response){
      try{
      let newsList;
      var segStockNewsData = [];

      if(response.status !== "Failure"){

        newsList = (response.GetSummaryByTopic_Response_1!== undefined)?(response.GetSummaryByTopic_Response_1.StoryMLResponse.STORYML.HL):(response.stockNews);
          
      } else {
        newsList = "";
      }

      if(newsList !== undefined && newsList.length > 0) {
		this.view.flxLoadingData.isVisible = false;
        this.view.flxNoResults.setVisibility(false);
        this.view.flxSeg.setVisibility(true);
        if(this._viewAllBtnStatus === "visible") {
          this.view.lblViewAll.setVisibility(true);
        }
        this.view.setVisibility(true);
		newsList.sort();
        newsList.forEach(function (newsItem) {
          var convertDateToString = (response.GetSummaryByTopic_Response_1!== undefined)?(newsItem["LT"].replace(/\D/g,'')):(newsItem["RT"].replace(/\D/g,''));
			if(kony.application.getCurrentBreakpoint()==1024){
              var temp= newsItem["HT"];
              if(65<temp.length){
                temp= temp.substring(0, 65);
                temp = temp+"...";
              }
            segStockNewsData.push({
            "lblName": newsItem["PR"],
            "lblContent":temp,
            "lblTime": {'text':CommonUtilities.getTimeDiferenceOfDate(convertDateToString.substring(0,14)), 'right': "10Dp"}
          });
               }
          else{
            var tempp= newsItem["HT"];
            if(65<tempp.length){
              tempp= tempp.substring(0, 65);
              tempp = tempp+"...";
            }
          segStockNewsData.push({
            "lblName": newsItem["PR"],
            "lblContent": tempp,
            "lblTime":  {'text':CommonUtilities.getTimeDiferenceOfDate(convertDateToString.substring(0,14)), 'right': "0Dp"}
          });
          }
        });
        this.view.segNews.widgetDataMap = {
          "lblName": "lblName",
          "lblContent": "lblContent",
          "lblTime": "lblTime"
        };
        this.view.segNews.setData(segStockNewsData);
      }
      else {
        this.view.flxLoadingData.isVisible = false;
        this.view.flxNoResults.setVisibility(true);
        this.view.flxSeg.setVisibility(false);
        this.view.lblViewAll.setVisibility(false);
        this.view.setVisibility(false);
        this.marketNewsPostShow();
      }
      this.view.forceLayout();
      var currForm = kony.application.getCurrentForm();
      currForm.forceLayout();
        }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    ViewAllMarketNews:function(){      
      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
            wealthModule.fetchNewsDetails();

    },
    setViewAllBtn: function(){
      try{
      if (this._viewAllBtnStatus === "visible" && this._newsDetailsPerm === true) {
        this.view.lblViewAll.setVisibility(true);
		this.view.flxSeparatorHeading.setVisibility(true);
      } else {
        this.view.lblViewAll.setVisibility(false);
		this.view.flxSeparatorHeading.setVisibility(false);
      }
     }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    }
  };
});