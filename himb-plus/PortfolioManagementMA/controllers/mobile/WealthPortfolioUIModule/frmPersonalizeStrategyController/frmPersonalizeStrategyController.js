/* eslint-disable */
define( function() {
  return {
    selectedItem:{},
    isParent:false,
    jsonPath :[],
    currentIndex:1,
    totaltargetWeight:0,
    chartSegData: [],
    updatedValue:{},
    updateCount:"",
    isComputed : false,

    onNavigate: function() {
      this.view.postShow = this.postShow;
      this.initActions();
    },
    initActions: function() {
      try{
      this.view.btnRevert.onClick = this.revertPopup;
      this.view.btnCancel.onClick = this.closePopupRevert;
      this.view.btnOk.onClick = this.revertStrategy;
      this.view.btnReset.onClick = this.resetTargetValue;
      this.view.btnDone.onClick = this.navAcknowledgeForm;
      this.view.btnDone.setEnabled(false);
      this.view.btnDone.skin = "sknlblEAEBF1SSPSemiBold72727215px";
      this.view.btnCompute.setEnabled(false);
      this.view.btnCompute.skin = "sknlblEAEBF1SSPSemiBold72727215px";
      this.view.flxRevert.isVisible = false;
	  this.view.btnReset.setVisibility(false);
      this.view.flxContent.enableScrolling = true;
      this.view.flxMain.setEnabled(true);
      this.view.flxWarning.isVisible = false;
      this.view.imgCheckBox.src = "checkbox_normal.png"; //IW-3696 - Bharath
      this.view.flxCheckBox.setEnabled(false); //iw-3777 - Yash
      this.view.rtxConfirmation.text = kony.i18n.getLocalizedString("i18n.wealth.acceptStrategy") + "<b>Individual</b>"

	  this.toggleView('table',null);
      this.view.customHeader.flxBack.onClick =this.navBackToStrategyAllocation;
    }catch(err) {
        this.setError(err, "initActions");
      }
      },
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnTableView.onClick = this.toggleView.bind(this,'table');
      this.view.btnGraphView.onClick = this.toggleView.bind(this,'graph');

    },



    postShow: function() {
      try{
if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.setVisibility(false);
        this.view.flxContent.top = "0dp";
      }
      scope_WealthPresentationController.computedStrategyValue = {};
      var scope = this;
      this.view.btnTableView.onClick = this.toggleView.bind(this,'table');
      this.view.btnGraphView.onClick = this.toggleView.bind(this,'graph');
      this.view.imgCheckBox.onTouchEnd = this.setConfirmation;
      this.view.btnCompute.onClick = this.getComputeStrategy;

        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        let params;
        var portfolioId = wealthModule.portfolioId;
        params={
          "portfolioId":portfolioId,
          "portfolioServiceType":"Advisory"
        }
        wealthModule.getPersonalizedStrategy(params);

      this.jsonPath.push(
        {
          "selectedRowItems": [
            {
              ID: "1",
              Name: "Assets"
            }
          ]
        }
      );
        }catch(err) {
        this.setError(err, "postShow");
      }
    },
    
    // revert onclick 
    revertStrategy: function(){
      try{
      let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        let params;
        var portfolioId = wealthModule.portfolioId;
        params={
          "portfolioId":portfolioId,
          "portfolioServiceType":"Advisory",
          "portfolioCode": scope_WealthPresentationController.contextId[portfolioId]
        }
      wealthModule.revertStrategy(params);
        }catch(err) {
        this.setError(err, "revertStrategy");
      }
    },

    setResponse: function(response){
      try{
        if(response){
          if(response.personalizedStrategy){
            this.updateCount = response.updateCount;
            this.view.flxWarning.isVisible = false;

            this.getInitialSegmentData(response.personalizedStrategy);
            var scope=this;
            this.view.slider.setBtnValues = function(btnValues,selectedJson,totalTarget){
              scope.totaltargetWeight = totalTarget;
              scope.selectedItem = selectedJson;
              scope.parenttargetWeight=selectedJson.targetWeight;

              scope.view.breadCrumb.loadButtons(btnValues);
              scope.view.breadCrumb.sendBtn=function(btnObj,selectedBreadCrumb){

                var btn=btnObj;
                if(btnObj.id=="btn1"){
                  scope.getInitialSegmentData(response.personalizedStrategy,100);
                }
                else{
                  scope.getChildSegmentData(btnObj.info.key,response.personalizedStrategy);
                }
              };
              var id=scope.selectedItem.ID;

              scope.getChildSegmentData(id,response.personalizedStrategy);
            };
            this.view.slider.sendUpdatedTarget = function(newTarget,isCompute){
          if(!isCompute && (JSON.parse(newTarget.originalTargetWeight).toFixed(1) != JSON.parse(newTarget.targetWeight).toFixed(1))){
        		scope.view.lblWarning.text = kony.i18n.getLocalizedString("i18n.wealth.percentagenotequalto100");
                scope.view.flxWarning.setVisibility(true);
                scope.view.btnReset.setVisibility(false);
                scope.view.btnCompute.setEnabled(false);
                scope.view.btnCompute.skin = "sknlblEAEBF1SSPSemiBold72727215px"; 
                scope.setConfirmation();
              }else{
                scope.view.flxWarning.setVisibility(false);
                scope.view.btnReset.setVisibility(true);
                scope.view.btnCompute.setEnabled(true);
                scope.view.btnCompute.skin = "sknbtnBf293276Border1pxFontFFFFFF40PX";
              }

              //scope.view.btnCompute.skin = "sknBtn0095e4RoundedffffffSSP26px";
              scope.updatedValue = newTarget;

              var charData = scope.getChartData(scope.chartSegData);

              scope.view.brwPersonalizeStrategyChart.onPageFinished = scope.drawpersonalizedStrategyChart(charData); 
            }
          } else {
            this.view.flxWarning.isVisible = true;
            this.view.lblWarning.text = (response && response.dbpErrMsg)?response.dbpErrMsg:kony.i18n.getLocalizedString("i18n.wealth.errorOccured");
          }

        }
      }catch(err) {
        this.setError(err, "setResponse");
      }
    },
    onComputeError: function(errorObj) {
      try{
        this.view.flxWarning.isVisible = true;
        this.view.lblWarning.text = kony.i18n.getLocalizedString("i18n.wealth.percentagenotequalto100");
        this.setConfirmation();
      }catch(err) {
        this.setError(err, "onComputeError");
      }
    },
    
    getChartData: function(flatData){
      try{
      var chartData={};
      chartData.offSet = true;
//       if(parseInt(flatData['0'].level) === 3){
//         chartData.offSet = true;  
//       }
      var labelArray = [];
      var arrIndex=0;
      var seriesArray = [];
      seriesArray[0] = []; //Current Weight
      seriesArray[1] = []; //Strategy Weight
      var colArray =  ["#7E04C4","#3AB1D6"];

      for(var index=0; index<flatData.length; index++){
        //if(parseInt(flatData[index].level)===0){
        seriesArray[0][arrIndex] = flatData[index].recommendedWeight;
        seriesArray[1][arrIndex] = flatData[index].targetWeight;
        labelArray[arrIndex] = flatData[index].Name;
        arrIndex++;
        //}
      }
      chartData.labelArray = labelArray;
      chartData.seriesArray = seriesArray;
      chartData.colArray = colArray;
      chartData.strokewidth = true;
      return chartData;
        }catch(err) {
        this.setError(err, "getChartData");
      }
    },




    getChildSegmentData:function(selectedItem,data){
      try{
      var targetWeight=this.totaltargetWeight !== 0 ? this.totaltargetWeight : this.selectedItem.targetWeight;
      //var targetWeight=this.totaltargetWeight !== 0 ? this.totaltargetWeight : this.selectedItem.strategyWeight;
      var segData=[];
      for(let i=0;i<data.length;i++){
        var childData = data.filter(e => e.parentId === data[i].ID);
        this.isParent = childData.length > 0 ? true : false;
        data[i].isParent = this.isParent;
        if(data[i].parentId == selectedItem){
          segData.push(data[i]);
        }
      }
      this.chartSegData = segData;
      var charData = this.getChartData(segData);
      this.view.brwPersonalizeStrategyChart.onPageFinished = this.drawpersonalizedStrategyChart(charData);
      this.view.slider.setContext(segData,targetWeight,data);
        }catch(err) {
        this.setError(err, "getChildSegmentData");
      }
    },

    getInitialSegmentData:function(data){
      try{
      var segData=[];
      for(let i=0;i<data.length;i++){
        var childData = data.filter(e => e.parentId === data[i].ID);
        this.isParent = childData.length > 0 ? true : false;
        data[i].isParent = this.isParent;
        //Need to change the condition based on the service response
        if(data[i].level == "1"){
          segData.push(data[i]);
        }
      }
      this.chartSegData = segData;
      var charData = this.getChartData(segData);
      this.view.brwPersonalizeStrategyChart.onPageFinished = this.drawpersonalizedStrategyChart(charData);
      this.view.slider.setContext(segData,100,data);
        }catch(err) {
        this.setError(err, "getInitialSegmentData");
      }
    },


    toggleView: function(btnType, btn){
      try{
      if(btnType==='table'){
        
        //WIW-655 - Showing Message and separator in table view alone
        this.view.flxSeperatorFour.setVisibility(true);
        this.view.flxMessage.setVisibility(true);
        
        
        this.view.brwPersonalizeStrategyChart.isVisible = false;
        this.view.flxColorTitleBar.isVisible = false;
        //this.view.flxTableContent.isVisible = true;
        this.view.flxSlider.isVisible = true;
        this.view.flxBreadCrumb.isVisible = true;
        this.view.flxFooter.isVisible = true;
        this.view.flxApply.isVisible = true;
        this.view.flxSeperatorThree.isVisible = true;
        this.view.flxSeperatorSecond.isVisible = true;

        this.view.btnTableView.skin='sknbtnBf293276Border1pxFontFFFFFF40PX';
        this.view.btnGraphView.skin='sknIWBtnBgFFFFFFBorder1px29327640px';

      } else if(btnType==='graph') {
        
        //WIW-655 - Hiding Message and separator in Graph as per Invision
        this.view.flxSeperatorFour.setVisibility(false);
        this.view.flxMessage.setVisibility(false);
        
        this.view.flxBreadCrumb.isVisible = true;
        this.view.brwPersonalizeStrategyChart.isVisible = true;
        this.view.flxColorTitleBar.isVisible = true;
        this.view.flxSlider.isVisible = false;
        this.view.flxFooter.isVisible = false;
        this.view.flxApply.isVisible = false;
        this.view.flxSeperatorThree.isVisible = false;
        this.view.flxSeperatorSecond.isVisible = true;
        this.view.btnTableView.skin='sknIWBtnBgFFFFFFBorder1px29327640px';
        this.view.btnGraphView.skin='sknbtnBf293276Border1pxFontFFFFFF40PX';
      }
        }catch(err) {
        this.setError(err, "toggleView");
      }
    },

    drawpersonalizedStrategyChart: function(charData){
      try{
      this.view.brwPersonalizeStrategyChart.evaluateJavaScript("drawWealthAllocationChart(" + JSON.stringify(charData.labelArray)
                                                               + " ," 
                                                               + JSON.stringify(charData.seriesArray)
                                                               +" ,"	
                                                               + JSON.stringify(charData.colArray)
                                                               + " ," + JSON.stringify(charData.strokewidth) + " ,"
                                                               + JSON.stringify(charData.offSet) +");");


	//IW-3815 FIX START
      if(charData.offSet === true){
 if(charData.hasOwnProperty("seriesArray")){
		if(charData.seriesArray.length === 2){
 if(charData.seriesArray[0].length >=0){
                  var height = ((charData.seriesArray[0].length * 40) + 100);
                 this.view.brwPersonalizeStrategyChart.height = height + "dp";
 }
              else{
 this.view.brwPersonalizeStrategyChart.height = "100%";
                 
 }
 }
 }
 }
      this.view.flxMain.forceLayout();
      this.view.flxContent.forceLayout();
    // FIX END
        }catch(err) {
        this.setError(err, "drawpersonalizedStrategyChart");
      }
    },

    revertPopup: function(){
      try{
      this.view.flxRevert.isVisible = true;
      this.view.flxContent.enableScrolling = false;
      this.view.flxMain.setEnabled(false);
        }catch(err) {
        this.setError(err, "revertPopup");
      }
    },
    navBackToStrategyAllocation: function(){
      try{
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmStrategyAllocation"); 
	  scope_WealthPresentationController.computedStrategyValue = ""; //IW-3851 Bharath
    }catch(err) {
        this.setError(err, "navBackToStrategyAllocation");
      }
      },

    setConfirmation: function(){
      try{
        if(!this.view.flxWarning.isVisible) {
          if(this.view.imgCheckBox.src === "checkbox_ticked.png") //IW-3696 - Bharath
          {
            this.view.imgCheckBox.src = "checkbox_normal.png";//IW-3777 - Yash
            this.view.btnDone.setEnabled(false);
            this.view.btnDone.skin = "sknlblEAEBF1SSPSemiBold72727215px";
          }
          else if(this.view.imgCheckBox.src === "checkbox_normal.png")//IW-3777 - Yash
          {
            this.view.imgCheckBox.src = "checkbox_ticked.png";//IW-3696 - Bharath
            this.view.btnDone.setEnabled(true);
            this.view.btnDone.skin = "sknbtnBf293276Border1pxFontFFFFFF40PX";
          }
        } else {
          this.view.imgCheckBox.src = "checkbox_normal.png";//IW-3777 - Yash
          this.view.btnDone.setEnabled(false);
          this.view.btnDone.skin = "sknlblEAEBF1SSPSemiBold72727215px";
        }

      }catch(err) {
        this.setError(err, "setConfirmation");
      }
    },

    getComputeStrategy: function(){
      
      try{
        let reqParam;
        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        var portfolioId = wealthModule.portfolioId;
        var scope = this;
        reqParam={
          "portfolioId": portfolioId,
          "ID": this.updatedValue.ID?this.updatedValue.ID:"",
          "Name": this.updatedValue.Name?this.updatedValue.Name:"",
          "targetWeight": ((parseFloat(this.updatedValue.targetWeight)).toFixed(2)).toString(),
          "recommendedWeight": ((parseFloat(this.updatedValue.recommendedWeight)).toFixed(2)).toString(),
          "UpdateCount": this.updateCount?this.updateCount:"0",
          "portfolioServiceType":"Advisory",
          "marketSegmentId":this.updatedValue.marketSegmentId,
          "portfolioCode":scope_WealthPresentationController.contextId[portfolioId],
          "isCustomized" : this.updatedValue.isCustomized,
          "modelConstrElement" : this.updatedValue.modelConstrElement
          
        }
        this.isComputed = true;
        wealthModule.getcomputeStrategy(reqParam);
      this.view.breadCrumb.resetButton();
      this.view.btnCompute.setEnabled(false);
      this.view.btnCompute.skin = "sknlblEAEBF1SSPSemiBold72727215px";
      this.view.btnReset.setVisibility(false);

      this.view.imgCheckBox.src = "checkbox_normal.png"; //iw-3777 - Yash
      this.view.flxCheckBox.setEnabled(true); //iw-3777 - Yash
        }catch(err) {
        this.setError(err, "getComputeStrategy");
      }
    },

    closePopupRevert: function(){
      try{
      this.view.flxRevert.isVisible =false;
      this.view.flxContent.enableScrolling = true;
      this.view.flxMain.setEnabled(true);
        }catch(err) {
        this.setError(err, "closePopupRevert");
      }
    },

    resetTargetValue: function(){
      try{
     var preValue = JSON.parse(JSON.stringify(scope_WealthPresentationController.computedStrategyValue));
      if(Object.keys(preValue).length !== 0){
        this.setResponse(preValue);
      }
      else{
        this.getPersonalizedStrategy();
      }
	  this.view.btnCompute.setEnabled(false);
      this.view.btnCompute.skin = "sknlblEAEBF1SSPSemiBold72727215px";
      this.view.btnReset.setVisibility(false);
      this.view.breadCrumb.resetButton();
	this.view.flxWarning.isVisible = false;
        }catch(err) {
        this.setError(err, "resetTargetValue");
      }
    },
    
    getPersonalizedStrategy: function(){
      try{
        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        let params;
        var portfolioId = wealthModule.portfolioId;
        params={
          "portfolioId":portfolioId,
          "portfolioServiceType":"Advisory"
        }
        wealthModule.getPersonalizedStrategy(params);
      this.view.btnReset.setVisibility(false);
      this.view.breadCrumb.resetButton();
        }catch(err) {
        this.setError(err, "getPersonalizedStrategy");
      }
    },
    navAcknowledgeForm: function(){
      try{
      var navManager = applicationManager.getNavigationManager();
      new kony.mvc.Navigation({
        "appName": "PortfolioManagementMA",
        "friendlyName": "frmPersonalizeStrategyAck"
      }).navigate();
        }catch(err) {
        this.setError(err, "navAcknowledgeForm");
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
