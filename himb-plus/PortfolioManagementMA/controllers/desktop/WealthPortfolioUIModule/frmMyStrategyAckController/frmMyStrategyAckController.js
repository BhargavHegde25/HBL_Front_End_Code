/* eslint-disable */
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){
var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();

  return{
    onNavigate: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.initActions();
    },
    initActions: function(){
      this.view.btnReview.onClick = this.navStrategyAllocation;
      this.view.btnChange.onClick = this.navChangeStrategy;
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
    
    preShow: function ()
    {
      this.view.acknowledgmentModify.flxSep.top="54px";
      this.view.acknowledgmentModify.confirmHeaders.lblHeading.left="30px";
      this.view.acknowledgmentModify.confirmHeaders.lblHeading.skin = "sknLabel42424215px" ;
      this.view.acknowledgmentModify.lblTransactionMessage.skin = "sknlbl424242SSPReg24px" ;
      this.view.acknowledgmentModify.lblRefrenceNumberValue.skin = "sknlbl424242SSPReg17px";
      var orientationHandler = new OrientationHandler();

      if(kony.application.getCurrentBreakpoint() > 1024|| !orientationHandler.isTablet){
//         this.view.flxDonut.top="-10px";
        this.view.acknowledgmentModify.ImgAcknowledged.top="150px";
      }
      else if(kony.application.getCurrentBreakpoint() === 1024|| orientationHandler.isTablet){
        this.view.acknowledgmentModify.lblRefrenceNumberValue.top = "250px";
      }

 var navManager = applicationManager.getNavigationManager();
//       let response =  JSON.parse(JSON.stringify(scope_WealthPresentationController.myStrategyDetails));
      let response = navManager.getCustomInfo('frmChangeStrategy');
      var assetArray= response.assetsCompo;
      var labelData=response.strategyName;
      let template=JSON.stringify({"templateID": "flxSegMyStrategyOLB", "microAppName": "PortfolioManagementMA"});

      //Setting data for Donut Chart 
      var graphData=[];
      for(var i=0;i<assetArray.length;i++){
        assetArray[i].weight = assetArray[i].weight.slice(0,-1);       
        graphData.push(Number(assetArray[i].weight));
      }

      //Setting data for Segment 
      var SegListArray=[];
      var listValue;
      var colArray =["0475C4","43A2CA","7BCCC4","BAE4BC","6753EC","E3E3E3","424242"];
      var j=0;
      var weight;
      for(var k=0;k<assetArray.length;k++){
        if(assetArray[k].weightWithPercent) 
          weight = assetArray[k].weightWithPercent;
        else 
          weight = assetArray[k].weight + '%';
        listValue={
          assetName: assetArray[k].assetName,
          weight:weight,
          backgroundColor:{
            backgroundColor: colArray[j]

          }
        };
        SegListArray.push(listValue);
        j++;
      }
      this.view.segStrategyDetails.widgetDataMap={
        lblAsset: "assetName",
        lblValue: "weight",
        flxDot: "backgroundColor"
      };
      this.view.segStrategyDetails.setData(SegListArray);

      if ( labelData !== undefined ){
        this.view.lblStrategyName.text = labelData;    
        this.view.flxStrategyName.setVisibility(true);
        this.view.imgStrategyIcon.src = labelData==="Active"?"active_one.png":labelData.toLowerCase()+".png";
        this.view.acknowledgmentModify.lblRefrenceNumberValue.text=kony.i18n.getLocalizedString("i18n.wealth.strategyMsg") + " "+ labelData ;

      }else {
        this.view.flxStrategyName.setVisibility(false);
      }
      this.view.wealthDonut.drawDataChart(graphData);
      if(scope_WealthPresentationController.isQuestionnaireFlow === true){
        this.view.flxHeading.lblAckHeader.text=kony.i18n.getLocalizedString("i18n.wealth.myStrategyAcknowledgement");
        this.view.acknowledgmentModify.lblRefrenceNumberValue.text=kony.i18n.getLocalizedString("i18n.wealth.newStrategy") + " "+ labelData;
      }
    },

    //Method to navigate to Review Strategy Form
    navStrategyAllocation: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmStrategyAllocation");
    },

    //Method to navigate to Change Strategy Form
    navChangeStrategy: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmChangeStrategy");
    },

    postShow: function(){
      if(scope_WealthPresentationController.isQuestionnaireFlow === false){
        this.view.flxHeading.lblAckHeader.text=kony.i18n.getLocalizedString("i18n.wealth.myStrategyAcknowledgement");
      }
      this.checkPermission();
    },
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    
    checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          }; 
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isChooseStrategyAcknowledgement = applicationManager.getConfigurationManager().checkUserPermission("CHOOSE_STRATEGY_ACKNOWLEDGEMENT");
           var isChooseStrategyAcknowledgementChart = applicationManager.getConfigurationManager().checkUserPermission("CHOOSE_STRATEGY_ACKNOWLEDGEMENT_CHART");


          
            let self = this;
            //Portfolio Details page Permission
 			
      
         self.view.flxAck.setVisibility(isChooseStrategyAcknowledgement);
         self.view.flxStrategy.setVisibility(isChooseStrategyAcknowledgementChart);
            if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
           self.view.flxStrategy.width = "100%";
          }
          else{
          if(!isChooseStrategyAcknowledgement){
            self.view.flxStrategy.width = "100%";
            self.view.segStrategyDetails.width = "50%";
            self.view.flxDonutSeg.width = "50%";
          }
          }
     
       
         if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
           self.view.flxAck.width = "100%";
          }
          else{
          if(!isChooseStrategyAcknowledgementChart){
            self.view.flxAck.width = "100%";
          }
          }
      if(kony.application.getCurrentBreakpoint() >= 1024){
         self.view.flxAck.height = self.view.flxStrategy.minHeight;
         }else{
           self.view.flxAck.height = "410dp";
         }
     
     },
    
    
    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    }
  };
});

