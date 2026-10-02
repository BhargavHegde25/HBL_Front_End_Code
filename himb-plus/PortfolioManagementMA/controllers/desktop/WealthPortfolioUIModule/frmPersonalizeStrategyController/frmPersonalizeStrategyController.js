define (['CommonUtilities'], function(CommonUtilities) {
  var orientationHandler = new OrientationHandler();
  var flxContentNewPath;
  var frmTemplatePath;
  //Type your controller code here 
  return {
    //global variables
    selectedItem: {},
    isParent: false,
    isComputed : false,
    tempAckresponse: {},
    updatedValue: {},
    updateCount:"",
	isRTL:'',
    
    legendwrapper: {
      "lbl1": kony.i18n.getLocalizedString("i18n.wealth.recommended"),
      "lbl2": kony.i18n.getLocalizedString("kony.mb.PFM.Target")
    },
    chartSegData: [],
    
    
    initActions: function() {
      flxContentNewPath =  this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxContentnew;
      flxContentNewPath.flxConfirmation.imgActive.src = "inactivecheckbox_2.png";
      flxContentNewPath.flxConfirmation.imgActive.onTouchEnd = this.onClickSelect;
      flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnReset.onClick = this.onResetClick;
      flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.setEnabled(false);
	    flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.skin = "sknBtnBlockedSSPFFFFFF15Px";
      frmTemplatePath = this.view.formTemplate12;
      flxContentNewPath.flxButton.btnRevert.onClick = this.onClickRevert;
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxSubmitBtnWrapper.btnNo.onClick = this.onClickCross;
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxSubmitBtnWrapper.btnYes.onClick = this.onClickOk;
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxPopup.flxCross.imgCross.onTouchEnd = this.onClickCross;
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.wealth.personalizedPopupmsg");
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxPopup.flxHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.wealth.modifystrategy");
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxPopup.flxSubmitBtnWrapper.btnYes.text = kony.i18n.getLocalizedString("i18n.wealth.ok");
      frmTemplatePath.flxContentPopup.flxPopup.ConfirmationPopup.flxPopup.flxSubmitBtnWrapper.btnNo.text = kony.i18n.getLocalizedString("i18n.wealth.cancel");
      flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = false;
     frmTemplatePath.flxContentTCCenter.flxMainContent.flxGoBack.onTouchEnd = this.goBackToportfolio;
    },
    goBackToportfolio: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmStrategyAllocation");
      scope_WealthPresentationController.computedStrategy = ""; //iw-3641- Yash
    },
    
    onClickCompute: function(){
      //service call
      flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = false;
      try{
        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        let params;
        var portfolioId = wealthModule.getPortfolioId();
        var targetWeight = this.updatedValue.targetWeight;
        var recommendedWeight = this.updatedValue.recommendedWeight;
        params={

          "portfolioId": portfolioId,
          "ID": this.updatedValue.ID,
          "Name": this.updatedValue.Name,
          "targetWeight":((parseFloat(targetWeight)).toFixed(2)).toString(),
          "recommendedWeight": ((parseFloat(recommendedWeight)).toFixed(2)).toString(),
          "UpdateCount": this.updateCount?this.updateCount:"0",
          "portfolioServiceType":"Advisory",
          "marketSegmentId":this.updatedValue.marketSegmentId,
          "portfolioCode":scope_WealthPresentationController.contextId[portfolioId],
          "isCustomized" : this.updatedValue.isCustomized,
          "modelConstrElement" : this.updatedValue.modelConstrElement
        }
        this.isComputed = true;
        flxContentNewPath.flxConfirmation.imgActive.enable = true;
        wealthModule.computePersonalizedStrategy(params);
        flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnReset.isVisible = false;
        flxContentNewPath.flxComponent.flxSlider.flxBreadcrumb.breadCrumb.resetButton();
      }
      catch(err){
        kony.print(err)
      }
    flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.setEnabled(false);
	  flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.skin = "sknBtnBlockedSSPFFFFFF15Px";
    },

    onClickCross:function(){
      this.view.formTemplate12.flxContentPopup.isVisible = false;
    },

    onClickRevert:function(){
      this.view.formTemplate12.flxContentPopup.isVisible = true;
    },
    //navigation to strategyAllocation form
    onClickOk: function() {
      var navManager = applicationManager.getNavigationManager();
      try{
        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        let params;
        var portfolioId = wealthModule.getPortfolioId();
        params={
          "portfolioId": portfolioId,
          "portfolioServiceType": "Advisory",
          "portfolioCode": scope_WealthPresentationController.contextId[portfolioId]
        }
        wealthModule.revertStrategy(params);
        scope_WealthPresentationController.computedStrategy = ""; //IW-3851 Bharath
      }
      catch(err){
        kony.print(err)
      }

    },
    // Checkbox click event
    onClickSelect: function() {
      
      //WIW-885 - LN : On error display, confirm checkbox and button should not get displayed
      if(this.isComputed && !flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible){
      if (flxContentNewPath.flxConfirmation.imgActive.src === "inactivecheckbox_2.png") {
        flxContentNewPath.flxConfirmation.imgActive.src = "checkbox.png";
        CommonUtilities.enableButton(flxContentNewPath.flxButton.btnConfirm);
      } else if (flxContentNewPath.flxConfirmation.imgActive.src === "checkbox.png") {
        flxContentNewPath.flxConfirmation.imgActive.src = "inactivecheckbox_2.png";
        CommonUtilities.disableButton(flxContentNewPath.flxButton.btnConfirm);
      }
      }
    },
    // Checkbox click event
    onSliderError: function() {
        flxContentNewPath.flxConfirmation.imgActive.src = "inactivecheckbox_2.png";
        CommonUtilities.disableButton(flxContentNewPath.flxButton.btnConfirm);
    },
    
    
    // getPersonalizedStrategy service call
    getPersonalizedStrategy: function(){
      try{
        let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        let params;
        var portfolioId = wealthModule.getPortfolioId();
        params={

          "portfolioId":portfolioId,
          "portfolioServiceType":"Advisory"
        }
        wealthModule.getPersonalizedStrategy(params);
        flxContentNewPath.flxComponent.flxSlider.flxBreadcrumb.breadCrumb.resetButton();
      }
      catch(err){
        kony.print(err)
      }
    },

    // form preshow event
    frmPreShow: function() {
	  this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      this.initActions();
	  this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxGoBack.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
      flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.onClick = this.onClickCompute;
      frmTemplatePath.flxContentPopup.isVisible =  false;
      flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnReset.isVisible = false;
      flxContentNewPath.flxConfirmation.imgActive.src === "inactivecheckbox_2.png";
      flxContentNewPath.flxConfirmation.imgActive.enable = false;
      flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.top = "15dp";
      this.view.formTemplate12.onError = function(errorObject) {};
      this.view.formTemplate12.flxPageFooter.isVisible = false;
      var scope = this;
      CommonUtilities.disableButton(flxContentNewPath.flxButton.btnConfirm);
      //service call
      this.getPersonalizedStrategy();

    },

    // setting response to segment data
    setResponse:function(response){
      //loading initial segment data
      if(response){
      if(response.personalizedStrategy){
        this.updateCount = response.updateCount;
        this.getInitialSegmentData(response.personalizedStrategy);

        var scope = this;
        var sliderPath = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxContentnew.flxComponent.flxSlider.flxSliderComponent;

        // event from slider component to get updated target
        sliderPath.slider.sendUpdatedTarget=function(updatedVal,isCompute){
          if(!isCompute && (JSON.parse(updatedVal.originalTargetWeight).toFixed(1) != JSON.parse(updatedVal.targetWeight).toFixed(1))){
            flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = true;
            flxContentNewPath.flxComponent.flxSlider.flxAlert.lblAlert.text = kony.i18n.getLocalizedString("i18n.wealth.percentagenotequalto100");
            flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.setEnabled(false);
            flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.skin = "sknBtnBlockedSSPFFFFFF15Px";
            flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnReset.isVisible = false;
            scope.onSliderError();
          }else{
            flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.setEnabled(true);
            flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
            flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnReset.isVisible = true;
            flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = false;
          }
          
          //var val = updatedVal;
          scope.updatedValue = updatedVal;         
          var chartData = scope.getChartData(scope.chartSegData);
          flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setData(chartData, scope.legendwrapper);
          flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.checkVisibility(true);          
          //flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(35); //iw-3858 - Yash
        }

        // event from slider component to set button values in the breadcrumb component
        flxContentNewPath.flxComponent.flxSlider.flxSliderComponent.slider.setButtonValues = function(btnValues, selectedJson) {
          scope.selectedItem = selectedJson;
          flxContentNewPath.flxComponent.flxSlider.flxBreadcrumb.breadCrumb.loadButtons(btnValues);

          // method to send button values to the breadcrumb component
          flxContentNewPath.flxComponent.flxSlider.flxBreadcrumb.breadCrumb.sendBtn = function(btnObj, selectedBreadCrumb) {
            var btn = btnObj;
            if (btnObj.id == "btn1") {
              scope.getInitialSegmentData(response.personalizedStrategy);
            } else {
              scope.getChildSegmentData(btnObj.info.key, response.personalizedStrategy);
            }
          };
          var id = scope.selectedItem.ID;
          scope.getChildSegmentData(id, response.personalizedStrategy);
        };
        var assetArray = response;
        var chartData = this.getChartData(assetArray);
        if (orientationHandler.isTablet) {
          flxContentNewPath.flxComponent.flxChart.width = "70%";
          flxContentNewPath.flxComponent.flxChart.left = "10%";
          flxContentNewPath.flxComponent.flxChart.top = "15dp";
          flxContentNewPath.flxConfirmation.lblLine2.width = "70%";
          
        }
        if(kony.application.getCurrentBreakpoint() === 1024){
          flxContentNewPath.flxComponent.flxChart.width = "70%";
          flxContentNewPath.flxComponent.flxChart.left = "10%";
          flxContentNewPath.flxComponent.flxChart.top = "15dp";
          flxContentNewPath.flxConfirmation.lblLine2.width = "70%";

        }
      }else{
        flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = true;
        flxContentNewPath.flxComponent.flxSlider.flxAlert.lblAlert.text = response.dbpErrMsg?response.dbpErrMsg:kony.i18n.getLocalizedString("i18n.wealth.errorOccured");
      }
      }
    },	

    onComputeError: function(errorObj) {
        flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = true;
        flxContentNewPath.flxComponent.flxSlider.flxAlert.lblAlert.text = kony.i18n.getLocalizedString("i18n.wealth.percentagenotequalto100");

    },
    // loading child segment data - sending data to the component
    getChildSegmentData: function(selectedItem, data) {
      var segData = [];
      for (let i = 0; i < data.length; i++) {
        var childData = data.filter(e => e.parentId === data[i].ID);
        this.isParent = childData.length > 0 ? true : false;
        data[i].isParent = this.isParent;
        if (data[i].parentId == selectedItem) {
          segData.push(data[i]);
        }
      }
      // storing this value to update the chart data
      this.chartSegData = segData;
      var chartData = this.getChartData(segData);
      //chartData.offSetVal = "100";
      //Bharath IW-3748 start
      if(kony.application.getCurrentBreakpoint() === 1024){
       if(chartData.seriesArray[0].length >=6){
        flxContentNewPath.flxComponent.flxChart.height = (285+((chartData.seriesArray[0].length*20)+20))+"dp";
        var requiredHeight = 135+(chartData.seriesArray[0].length - 6)*44;
        flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(requiredHeight);
         flxContentNewPath.flxConfirmation.top = "70dp";
       }else{
         flxContentNewPath.flxComponent.flxChart.height = "285dp";
         flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(35);
          flxContentNewPath.flxConfirmation.top = "30dp";
       }
      }else{
      flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.checkVisibility(true);
      if(chartData.seriesArray[0].length >=6){
        var reqHeight = 135+(chartData.seriesArray[0].length - 6)*44;
        flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(reqHeight);
        
      }else{
      flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(35);
      }
      }
      flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setData(chartData, this.legendwrapper);
      flxContentNewPath.flxComponent.flxSlider.flxSliderComponent.slider.setContext(segData,data);
      //Bharath IW-3748 end
    },

    // loading initial segment data - sending data to the component
    getInitialSegmentData: function(data) {
      var segData = [];
            var customizedData = {};
			customizedData['segData'] = [];
      for (let i = 0; i < data.length; i++) {
        var childData = data.filter(e => e.parentId === data[i].ID);
        this.isParent = childData.length > 0 ? true : false;
        data[i].isParent = this.isParent;
        //Need to change the condition based on the service response
        if (data[i].level == "1") {
          segData.push(data[i]);	
          listValue = {
            assetName: data[i].Name,
            weight1: data[i].recommendedWeight + '%',
            weight2: data[i].targetWeight + '%',
          };
          customizedData.segData.push(listValue);
        }
      }
      // storing this value to update the chart data
      this.chartSegData = segData;
      //temporary response filtered array passing to acknowledgement
      data['segData'] = segData;
      
      //WIW-855 - LN : Acknowledgement requires only the top level data so fixing it
      applicationManager.getNavigationManager().setCustomInfo('personalizedStrategyData', JSON.parse(JSON.stringify(customizedData)));
      
      this.tempAckresponse = data;
      var chartData = this.getChartData(segData);
      //Bharath IW-3748 start
       if(kony.application.getCurrentBreakpoint() === 1024){
       if(chartData.seriesArray[0].length >=6){
        flxContentNewPath.flxComponent.flxChart.height = (285+((chartData.seriesArray[0].length*20)+20))+"dp";
         var requiredHeight = 135+(chartData.seriesArray[0].length - 6)*44;
        flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(requiredHeight);
        flxContentNewPath.flxConfirmation.top = "70dp";
       }else{
         flxContentNewPath.flxComponent.flxChart.height = "285dp";
         flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(35);
         flxContentNewPath.flxConfirmation.top = "30dp";
       }
      }else{
      flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.checkVisibility(true);
       if(chartData.seriesArray[0].length >=6){
        var reqHeight = 135+(chartData.seriesArray[0].length - 6)*44;
        flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(reqHeight);
        
      }else{
      flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setLegendHeight(35);
      }
      }
      flxContentNewPath.flxComponent.flxChart.flxBarChart.AllocationGraph.setData(chartData, this.legendwrapper);
      flxContentNewPath.flxComponent.flxSlider.flxSliderComponent.slider.setContext(segData,data);
    },//Bharath IW-3748 end
    
    onResetClick: function(){
     var previousVal =JSON.parse(JSON.stringify(scope_WealthPresentationController.computedStrategy));
            if (Object.keys(previousVal).length !==0) {
               this.setResponse(previousVal);	
           } else {
               this.getPersonalizedStrategy();
           }
	   flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnReset.isVisible = false;
       flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.setEnabled(false);
       flxContentNewPath.flxComponent.flxSlider.flxSliderButtons.btnCompute.skin = "sknBtnBlockedSSPFFFFFF15Px";
       flxContentNewPath.flxComponent.flxSlider.flxAlert.isVisible = false;
       scope_WealthPresentationController.computedStrategy = "";
    },

    //For the Graph getchartData function
    getChartData: function(assetArray) {
      var chartData = {};
      var labelArray = [];
      var arrIndex = 0;
      //var seriesArray = [];
      var seriesArray = [
        [],
        []
      ];
      seriesArray[0] = []; //recommended Weight
      seriesArray[1] = []; //target Weight
      const colArray = ["#7E04C4", "#3AB1D6"];
      for (var index = 0; index < assetArray.length; index++) {

        seriesArray[0][arrIndex] = assetArray[index].recommendedWeight;
        seriesArray[1][arrIndex] = assetArray[index].targetWeight;
        labelArray[arrIndex] = assetArray[index].Name;
        arrIndex++;

      }
      chartData.offSetVal = true;
     // chartData.strokeWidth = true;
      chartData.labelArray = labelArray;
      chartData.seriesArray = seriesArray;
      chartData.colArray = colArray;
      return chartData;
    }
  };
});
