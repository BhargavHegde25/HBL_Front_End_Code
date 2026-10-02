define([], function(){

  var responseRecStrategy = "";

  return{

    onNavigate: function() {
      this.view.postShow= this.postShow;
      this.view.preShow= this.preShow;
    },
    
    preShow:function() {
      try{
       if(applicationManager.getPresentationFormUtility().getDeviceName()!=="iPhone"){
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
	  var response = navManager.getCustomInfo('frmRecommendedStrategy');
      this.setAssetAllocationDonut(response);
	   this.setStrategyChart(response);
      this.checkPermissions();
        }catch(err) {
        this.setError(err, "preShow");
      } 
    },
    
    checkPermissions: function(){
       		try{
        var configManager =  applicationManager.getConfigurationManager();
           var checkUserPermission = function (permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
          }
        
             var checkFeature = function (feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
          }

      		var isRecommendedStrategyConfirmation = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_CONFIRMATION");
      
      			self = this;
      		
      		self.view.flxButton.isVisible = isRecommendedStrategyConfirmation;
      		self.view.flxConfirm.isVisible = isRecommendedStrategyConfirmation;
      		self.view.flxAcknowledge.isVisible = isRecommendedStrategyConfirmation;
      
      		if(isRecommendedStrategyConfirmation == false)
              {
                this.view.flxComponent.top = "";
                this.view.flxComponent.bottom = "50px";
              }
              }catch(err) {
        this.setError(err, "checkPermissions");
      } 
    },

    postShow: function() {
      try{
      var i=0;

      var navManager = applicationManager.getNavigationManager();
      var response = navManager.getCustomInfo('frmRecommendedStrategy');

      responseRecStrategy = response;

      this.setAssetAllocationDonut(response);
      this.setAllocationSeg(response);
      this.setStrategyChart(response);

      this.view.lblActiveConfirm.text = response.recStrategyName;
      this.view.txtbox.text = kony.i18n.getLocalizedString("i18n.wealth.recommendedStrategyConfirmationMsgCheck") + " " +"<strong>" +  response.recStrategyName + "</strong>";
      this.view.imgCheckBox.src = "inactivecheckbox.png";
      this.view.btnApply.skin = "sknBtnE2E9F0Rounded";
      this.view.imgCheckBox.onTouchEnd = this.seConfirmation;

      this.initActions();
      }catch(err) {
        this.setError(err, "postShow");
      } 
    },

    setStrategyChart: function(response) {
      try{
      var finalarr = {};
      var value = [];
      var sum=0;
      var i=0;

      var len=response.strategyList.length;
      var total=  response.strategyList[len-1].maxVal;
      //value[0]=((response.strategyList[0].maxVal-response.strategyList[0].minVal) / total ) * 100;

      for(i=0; i<len; i++)
      {
        value[i] = Math.round(100/len);
      }

      for (i=0; i< len; i++) {
        if (response.strategyList[i].strategyName === response.recStrategyName) {
          sum += value[i] / 2;
          break;
        } else {
          sum += value[i];
        }
      }
      finalarr.valueArr = value;
      finalarr.angle=sum;

      kony.timer.schedule(
        "delay1",
        this.setChartData.bind(
          this,
          "setArc( " + JSON.stringify(finalarr)+" );"
        ), 1, false);
 }catch(err) {
        this.setError(err, "setStrategyChart");
      } 
    },

    setChartData: function(content){
      try{
      this.view.brwChart.evaluateJavaScript(content);
         }catch(err) {
        this.setError(err, "setChartData");
      } 
    },

    setAssetAllocationDonut: function(response) {
      try{
      var scope = this;
      var assetArray = response.assets;
      var graphData=[];
      for(var i=0;i<assetArray.length;i++){
        graphData.push(Number(assetArray[i].weight));
      }
      scope.donutChartData = graphData;
        this.setDonutChartData(scope.donutChartData);
        //WIW-278
      // defect-3317 Vivek Singh
       //this.view.brwDonut.onPageFinished = this.drawWealthStrategyChart(scope.donutChartData);
       // defect -3317 Vivek Singh
       }catch(err) {
        this.setError(err, "setAssetAllocationDonut");
      } 
    },
    setDonutChartData: function(donutChartData){
      kony.timer.schedule(
        "delay2",this.view.brwDonut.onPageFinished = this.drawWealthStrategyChart.bind(
          this,donutChartData), 1, false);
    },
 
      drawWealthStrategyChart: function(donutChartData){
           this.view.brwDonut.evaluateJavaScript("drawStrategyDonutChart( " + JSON.stringify(donutChartData)+" );");

    },
 
    
    
    setAllocationSeg: function(response){
      try{
      var assetArray = response.assets;
      var segData=[];
      var storeData;
      var colArray =["0475C4","43A2CA","7BCCC4","BAE4BC","6753EC","E3E3E3","424242"];
      var j=0;
      for(var k=0;k<assetArray.length;k++){
        storeData={
          assetName: assetArray[k].assetName,
          weight: assetArray[k].weight+'%',
          background:{
            backgroundColor: colArray[j]           
          }
        };
        if(storeData.assetName !== "IRS_IP_ACTIVE") {
          segData.push(storeData);
        }
        j++;
      }

      this.view.segRecMyStrategy.widgetDataMap = {  
        "lblName": "assetName",
        "lblPercent" : "weight",
        "flxLegend" : "background"
      };

      this.view.segRecMyStrategy.setData(segData);
        }catch(err) {
        this.setError(err, "setAllocationSeg");
      } 
    },


    initActions: function(){
      this.view.btnApply.onClick = this.onclickApply;
      this.view.customHeader.btnRight.onClick = this.navTostrategyAllocation;
    },


    navTostrategyAllocation: function()
    {
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmStrategyAllocation");
    },


    onclickApply: function(){
      try{
      if(this.view.btnApply.skin === "ICSknBtnF6F6F615px"){
      let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");    
      let params;
      params={
        "strategyId": responseRecStrategy.strategyId,
        "strategyName": responseRecStrategy.recStrategyName,
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,      
        "portfolioServiceType": "Advisory"  
      };
      wealthModule.confirmRecommendedStrategy(params);
      }
        }catch(err) {
        this.setError(err, "onclickApply");
      } 
    },

    seConfirmation: function(){
      try{
      if(this.view.imgCheckBox.src === "activecheckbox.png")
      {
        this.view.imgCheckBox.src = "inactivecheckbox.png";
        this.view.btnApply.skin = "sknBtnE2E9F0Rounded";
      }
      else if(this.view.imgCheckBox.src === "inactivecheckbox.png")
      {
        this.view.imgCheckBox.src = "activecheckbox.png";
        this.view.btnApply.skin = "ICSknBtnF6F6F615px";
      }
        }catch(err) {
        this.setError(err, "seConfirmation");
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