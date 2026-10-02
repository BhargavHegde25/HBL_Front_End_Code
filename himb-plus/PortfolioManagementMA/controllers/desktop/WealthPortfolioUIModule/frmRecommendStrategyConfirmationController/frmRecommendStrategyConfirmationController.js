define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){ 
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  var statusMain="";
  var navManager = applicationManager.getNavigationManager();
  var responseRecStrategy = navManager.getCustomInfo('frmRecommendStrategyConfirmation');
   var orientationHandler = new OrientationHandler();
  return{

    onNavigate: function(){
      // this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.init = this.init;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      },

    init: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.initActions();

    },
    goBackToportfolio: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPortfolioOverview");
    },
    initActions: function(){
      this.view.imgActive.onTouchEnd = this.onClickSelect;
      this.view.btnApply.onClick=this.onClickApply;
      this.view.btnCancel.onClick=this.onClickCancel;
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
    onClickApply:function(){
      let wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      let params;
      var portfolioId = wealthModule.getPortfolioId();
      params={
        "strategyId":responseRecStrategy.strategyId,
        "strategyName":responseRecStrategy.recStrategyName,
        "portfolioId":portfolioId,
        "portfolioServiceType":"Advisory"
      }
      wealthModule.confirmRecommendedStrategy(params);
    },
    onClickCancel:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmStrategyAllocation");
    },
    preShow: function (){
      this.setChartData();
      this.setUi();
      this.checkPermission();
    },
    postShow: function(){
		var scope = this;
        scope.setUi();
		scope.setActiveHeaderHamburger();
    },
	setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    setChartData:function(){
      var navManager = applicationManager.getNavigationManager();
      var response = navManager.getCustomInfo('frmRecommendStrategyConfirmation');
      var data=response;

      var data = JSON.parse(JSON.stringify(response));


      this.view.imgActive.src = "inactivecheckbox_2.png";
      CommonUtilities.disableButton(this.view.btnApply);
      var length=response.strategyList.length;
      var labelLeft=response.strategyList[0].strategyName;
      var labelRight=response.strategyList[length-1].strategyName;
      // this.view.lblStrategyNameOne.text=labelLeft;
      // this.view.lblStrategyNameTwo.text=labelRight;
      this.view.lblStatusMain.text = response.recStrategyName;
      statusMain=response.recStrategyName;
      var finalArr = {};
      var value = [];	
      var sum=0;



      for(i=0;i<length;i++)
      {
        value[i]= Math.round(100/length);

      }
      for (i = 0; i < length; i++) {
        if (response.strategyList[i].strategyName === response.recStrategyName) {
          sum += value[i] / 2;
          break;
        } else {
          sum += value[i];
        }
      }
      finalArr.leftLabel=labelLeft;
      finalArr.rightLabel=labelRight;
      finalArr.valueArr = value;
      finalArr.angle= Math.round(sum);
      this.view.AccelerometerChart.setData(finalArr);
      var assetArray=response.assets;
      var finalAssetArray=[];
      for(var i=0;i<assetArray.length;i++){
        var weight = assetArray[i].weight;
        finalAssetArray.push(Number(weight));
      }

      this.view.wealthDonut.drawDataChart(finalAssetArray);
      var finalSegListArray=[];
      var listValue;
      var colArray =["0475C4","43A2CA","7BCCC4","BAE4BC","6753EC","E3E3E3","424242"];
      var j=0;
      for(var k=0;k<assetArray.length;k++){
        listValue={
          assetName: assetArray[k].assetName,
          weight:assetArray[k].weight + '%',
          backgroundColor:{
            backgroundColor: colArray[j]

          }
        };
        if(listValue.assetName !== "IRS_IP_ACTIVE") {
          finalSegListArray.push(listValue);
        }
        j++;
      }
      data.assets=finalSegListArray;
      this.view.segList.updateContext(data);
    },

    
     checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          }; 
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isRecommendedStrategyConfirmation = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_CONFIRMATION");
          

          
            let self = this;
            //Portfolio Details page Permission
 			
            self.view.flxConfirmation.isVisible = isRecommendedStrategyConfirmation;
       		self.view.flxMessage2.isVisible = isRecommendedStrategyConfirmation;
			self.view.btnApply.isVisible = isRecommendedStrategyConfirmation;

          
          if(!isRecommendedStrategyConfirmation){
            this.view.btnCancel.left = "80%";
          }
     
     },
    
    onClickSelect:function(){
      if(this.view.imgActive.src === "inactivecheckbox_2.png"){
        this.view.imgActive.src = "activecheckbox.png";
        CommonUtilities.enableButton(this.view.btnApply);
      }
      else if(this.view.imgActive.src === "activecheckbox.png"){
        this.view.imgActive.src = "inactivecheckbox_2.png";
        CommonUtilities.disableButton(this.view.btnApply);
      }

    },

    setUi(){
      this.view.lblStatus.text = statusMain;
      this.view.lblConfirmation.text = kony.i18n.getLocalizedString("i18n.wealth.recommendedStrategyConfirmationMsgCheck");
      this.view.lblConfirmMessage.text = kony.i18n.getLocalizedString("i18n.wealth.recommendedStrategyConfirmationMsgCheckBox");
    },

    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    }
  };

});