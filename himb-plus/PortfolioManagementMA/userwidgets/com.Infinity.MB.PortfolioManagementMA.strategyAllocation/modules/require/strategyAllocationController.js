//MB
define(['./strategyAllocationDAO'],function(strategyAllocationDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new strategyAllocationDAO();
      this.context = {};
      this.view.preShow = this.preShow;

      this.view.btnTableView.onClick = this.toggleView.bind(this,'table');
      this.view.btnGraphView.onClick = this.toggleView.bind(this,'graph');
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParam', () => {
        return this._serviceParam;
      });
      defineSetter(this, 'serviceParam', value => {
        this._serviceParam = value;
      });
      defineGetter(this, 'configParam', () => {
        return this._configParam;
      });
      defineSetter(this, 'configParam', value => {
        this._configParam = value;
      });
    },

    setPersonalizeStrategyBtn: function(isVisible){
      this.view.btnPersonalize.isVisible = isVisible;
    },
    
    setContext: function(context) {
      this.context = context;
      if(typeof(this._serviceParam) === 'string'){
        this._serviceParam = JSON.parse(this._serviceParam);
      }

      this.businessController.fetchDetails(
        this._serviceParam.ServiceName,
        this._serviceParam.OperationName,
        this._serviceParam.ObjectName,
        this.context,
        this.onServiceSuccess,
        this.onError
      );
    },

    preShow: function(){
      try{
      this.view.btnPersonalize.onClick = this.personalizeForm;

      if(kony.application.getCurrentForm().id === "frmReviewStrategyAlloc"){
        this.view.flxHead.isVisible = false;
        this.view.flxAsset.isVisible = false;
        this.view.lblInfo.isVisible = false;
        this.view.flxPersonalize.isVisible = false;

        this.view.flxToggleButtons.isVisible = true;
        this.view.flxSep.isVisible = true;
        this.view.flxTableContent.isVisible = true;
		
		this.toggleView('table', null);
      }
      else{
        this.view.flxHead.isVisible = true;
        this.view.flxAsset.isVisible = true;
        this.view.lblInfo.isVisible = true;
        this.view.flxPersonalize.isVisible = true;

        this.view.flxToggleButtons.isVisible = false;
        this.view.flxSep.isVisible = false;
        this.view.flxTableContent.isVisible = false;
		
		this.toggleView(this._configParam.defaultView, null);
      }
      this.view.flxReview.onClick = this.navToReviewForm;
	  this.view.flxArrow.onClick = this.navToReviewForm;
        }catch(err) {
        this.setError(err, "preShow");
      }
    },

    navToReviewForm: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo(this._configParam.reviewForm);
    },
    personalizeForm: function(){
      new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmPersonalizeStrategy"}).navigate();
    },


    onServiceSuccess: function(response){
      try{
      response.Assets = response.strategyAlloc;
      this.view.StrategyAllocDrillDown.setData(response, this.setChartData);
      var data = response.Assets;
      var chartData = this.getChartData(data);
        }catch(err) {
        this.setError(err, "onServiceSuccess");
      }
    },
    
    setChartData: function(flatData, currLevel) {
      try{
      var chartData={};
      var labelArray = [];
      var arrIndex=0;
      var seriesArray = [];
      seriesArray[0] = []; //Current Weight
      var colArray =  ["#3AB1D6","#7E04C4","#54D75D","#77BC43","#008495","#23A8B1","#7BCCC4","#3BE2B2","#E7417A","#E8705B","#FF8600","#F7EA3A","#7E04C4","#BF0404","#B9SEE8","#6753EC","#3897D6","#4176A4","#3645A7","#0273E3","#646E83","#BDBDBD"];
      for(var index=0; index<flatData.length; index++){
        
          seriesArray[0][arrIndex] = flatData[index].strategyWeight.replace("%", "");
          if(flatData[index].name.skin !== 'sknlbl003E7536px'){ //IW-3807 - Ayush Raj - fix start
          labelArray[arrIndex] = flatData[index].name;
          }
          else labelArray[arrIndex] = flatData[index].name.text;
          //fix end
          arrIndex++;
      }
      chartData.labelArray = labelArray;
      chartData.seriesArray = seriesArray;
      chartData.colArray = colArray;
      //return chartData;
      var width = (chartData.seriesArray[0].length * 100) + 100;
      this.view.brwStrategyAllocation.height = width + "dp";

      this.view.brwStrategyAllocation.evaluateJavaScript("drawWealthAllocationChart(" 
                                                      + JSON.stringify(chartData.labelArray)
                                                      + " ," 
                                                      + JSON.stringify(chartData.seriesArray)
                                                      +" ,"	
                                                      + JSON.stringify(chartData.colArray)
                                                      +");");
        }catch(err) {
        this.setError(err, "setChartData");
      }
    },


    getChartData: function(flatData){
      try{
      var chartData={};
      var labelArray = [];
      var arrIndex=0;
      var seriesArray = [];
      seriesArray[0] = []; //Current Weight
      // seriesArray[1] = []; //Strategy Weight
     var colArray = ["#E8705B","#BF04C4","#7E04C4","#3AB1D6","#3E75A6", "#2C82BE", "#24BFEC", "#76DDFB", "#C7CCD5", "#3E75A6", "#2C82BE", "#24BFEC"];
      for(var index=0; index<flatData.length; index++){
		  // for TAP.T24,MOCK level must start from 1
        if(parseInt(flatData[index].level)===1){
          //seriesArray[0][arrIndex] = flatData[index].currentWeight;
          seriesArray[0][arrIndex] = flatData[index].strategyWeight;
          labelArray[arrIndex] = flatData[index].name;
          arrIndex++;
        }
      }
      chartData.labelArray = labelArray;
      chartData.seriesArray = seriesArray;
      chartData.colArray = colArray;
//       return chartData;
      var width = (chartData.labelArray[0].length * 50) + 100;
      this.view.brwStrategyAllocation.height = width + "dp";

      this.view.brwStrategyAllocation.evaluateJavaScript("drawWealthAllocationChart(" 
                                                         + JSON.stringify(chartData.labelArray)
                                                         + " ," 
                                                         + JSON.stringify(chartData.seriesArray)
                                                         +" ,"	
                                                         + JSON.stringify(chartData.colArray)
                                                         + ");");
        }catch(err) {
        this.setError(err, "getChartData");
      }
    },

    toggleView: function(btnType, btn){
      try{
      if(btnType==='table'){
        this.view.brwStrategyAllocation.isVisible = false;
        this.view.flxTableContent.isVisible = true;

        this.view.btnTableView.skin='sknbtnBf293276Border1pxFontFFFFFF40PX';
        this.view.btnGraphView.skin='sknIWBtnBgFFFFFFBorder1px29327640px';

      } else if(btnType==='graph') {
        this.view.brwStrategyAllocation.isVisible = true;
        this.view.flxTableContent.isVisible = false;

        this.view.btnTableView.skin='sknIWBtnBgFFFFFFBorder1px29327640px';
        this.view.btnGraphView.skin='sknbtnBf293276Border1pxFontFFFFFF40PX';
      }
        }catch(err) {
        this.setError(err, "getChartData");
      }
    },

    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },
  };
});