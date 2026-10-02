/* eslint-disable */
define(['./chooseStrategyDAO'],function(chooseStrategyDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new chooseStrategyDAO();
      this.context = {};
      this.strName = [];
      this.finalHeight = 0;
      this.widgetRef = [];
      this.clickAsset = [];
      this.clickindex = 0;
      this.landingCardVal = 0;
      this.view.postShow = this.postShow;
      this.data = "";
    },

    initGettersSetters: function() {
      defineGetter(this, 'widgetMapping', () => {
        return this._widgetMapping;
      });
      defineSetter(this, 'widgetMapping', value => {
        this._widgetMapping = value;
      });
      defineGetter(this, 'serviceCall', () => {
        return this._serviceCall;
      });
      defineSetter(this, 'serviceCall', value => {
        this._serviceCall = value;
      });
    },

    setData : function (context, setStrategy)
    {
      var scope = this;
      var navManager = applicationManager.getNavigationManager();
        this.data = navManager.getCustomInfo('frmChangeStrat');
      try {
        this.setStrategy = setStrategy;
        this.context = context;

      } catch (err) {
        scope.setError(err, "setData");
      }
    },

    initActions:function(){
      var scope = this;
      function onScrollEndCallback(eventobject) {

        var currentIndex=0;
        var scrollPosX = eventobject.contentOffsetMeasured.x;
        var deviceWidth=eventobject.frame.width;
        const decimalStr = (scrollPosX / deviceWidth).toString().split('.')[1];
        if(decimalStr && decimalStr.startsWith("0")){
          currentIndex=Math.floor(scrollPosX / deviceWidth);
        } else {
          currentIndex=Math.ceil(scrollPosX / deviceWidth);
        }
        scope.clickindex = currentIndex;
        scope.currIndex = (currentIndex+1);
        //scope.setStrategy(scope.strName[currentIndex].strategyName, scope.strName[currentIndex].strategyId, scope.finHeight);
        scope.setPageBtns();

        return currentIndex;
      }
      //this.view.flxScrollContainer.onScrollTouchReleased=onScrollEndCallback;
      scope.view.flxScrollContainer.onScrollEnd = onScrollEndCallback;

      scope.view.flxLeft.setVisibility(false);
      scope.view.flxRight.setVisibility(true);

      scope.currIndex = 1;
      scope.view.flxLeft.onTouchEnd = scope.moveCardLeft;
      scope.view.flxRight.onTouchEnd = scope.moveCardRight;
      if(kony.theme.getCurrentTheme() == 'default'){
        scope.view.imgLeft.src = "leftarrow.png";
        scope.view.imgRight.src = "rightarrow.png";
        }else{
        scope.view.imgLeft.src = "leftarrowwealth.png";
        scope.view.imgRight.src = "rightarrowwealth.png";
        }
    },

    postShow:function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onServiceSuccess);
    },

    onServiceSuccess:function(response){
      var scope = this;
      var navManager = applicationManager.getNavigationManager();
      if(kony.application.getPreviousForm().id === "frmReviewSuitability"){
        this.data = response.recStrategy[0].strategyName;
      }else if(kony.application.getPreviousForm().id === "frmChangeStrAck"){
        this.data = navManager.getCustomInfo('frmChangeStrategy');
      }
      scope.widgetRef = [];
      scope.view.flxScrollContainer.removeAll();
      
      scope_WealthPresentationController.recStrategyName = response.recStrategy[0].strategyName;

      var countArray = [];
      var colArray =["0475C4","43A2CA","7BCCC4","BAE4BC","6753EC","E3E3E3","424242"];
      countArray = (response.recStrategy).concat(response.alternateStrategy);
      var count = countArray.length;
      var assetArray = [];
      var maxlength = [];
      var dataID = "";
      this.rearrange = [];
      assetArray = (response.recStrategy).concat(response.alternateStrategy);
      this.clickAsset = assetArray;
      scope.strName = assetArray;
      scope.restr = [];
      for(var m = 0;m<assetArray.length;m++){
        if(this.data === this.clickAsset[m].strategyName)
          {
          this.rearrange[0] = this.clickAsset[m];
          scope.restr[0] = scope.strName[m];
          }
        else{
          if(this.rearrange[0] === undefined){
            this.rearrange[m+1] = this.clickAsset[m];
            scope.restr[m+1] = scope.strName[m];
          }
        else{
          this.rearrange[m] = this.clickAsset[m];
          scope.restr[m] = scope.strName[m];
        }
        }
      }
      for(var z = 0;z<assetArray.length;z++){
        maxlength.push(assetArray[z].assetsCompo.length);
        if(this.data === assetArray[z].strategyName)
        {
          dataID = assetArray[z].strategyId;
          this.landingCardVal = z	;
        }
      }
      var maxVal = Math.max(...maxlength);
      var finalHeight = 550 + (maxVal - 4) * 30;
      scope.finHeight = finalHeight;
      scope.view.flxScrollContainer.height = finalHeight + "dp";
      //scope.strName = assetArray;
      scope.finalArr = assetArray.length;
      scope.view.lblCurrPage.text = "1/" + scope.finalArr;


      //Adding this code separately from the below for loop for the default selected
      //card (For the strategy name received in data variable above) so
      //that it can be shown as the first card by default.
      var StrategyCard = new com.InfinityMB.PortfolioManagementMA.StrategyCard({
        "height": finalHeight+"dp",
        "id": "StrategyCard" + 0,
        "isVisible": true,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": false,
        "top": "0dp",
        "width": "100%",
        "appName": "PortfolioManagementMA",
        "viewType": "StrategyCard",
        "overrides": {
          "StrategyCard": {
            "right": "viz.val_cleared",
            "bottom": "viz.val_cleared",
            "minWidth": "viz.val_cleared",
            "minHeight": "viz.val_cleared",
            "maxWidth": "viz.val_cleared",
            "maxHeight": "viz.val_cleared",
            "centerX": "viz.val_cleared",
            "centerY": "viz.val_cleared"
          }
        }
      },{
        "paddingInPixel": false,
        "overrides": {}
      }, {
        "overrides": {}
      });
      scope.view.flxScrollContainer.add(StrategyCard);
      var strategyName = this.data;

      var segData=[];
      var k=0;
      for(k=0;k<assetArray[this.landingCardVal].assetsCompo.length;k++){
        segData.push(
          {
            assetName: assetArray[this.landingCardVal].assetsCompo[k].assetName,
            weight: assetArray[this.landingCardVal].assetsCompo[k].weight+'%',
            background:{
              backgroundColor: colArray[k]
            },
            flxStrategy:{
                skin:"sknflxffffffBg"
            },
            flxMain:{
                skin:"sknflxffffffBg"
            }
          }
        );
      }

      for(;k<maxVal;k++){
        segData.push(
          {
            assetName: "",
            weight: "",
            background:{
              backgroundColor: "",
              visibility : false,
              height: "0dp"
            },
            flxStrategy:{
                skin:"sknflxffffffBg"
            },
            flxMain:{
                skin:"sknflxffffffBg"
            }
          }
        );
      }
      var graphData=[];
      for(var l=0;l<assetArray[this.landingCardVal].assetsCompo.length;l++){
        graphData.push(Number(assetArray[this.landingCardVal].assetsCompo[l].weight));
      }    

      StrategyCard.setData(this.landingCardVal, segData, graphData, this.data, this.onClickMethod);
      this.setStrategy(this.data, dataID, finalHeight);
      StrategyCard.updateSkins();
      scope.widgetRef.push(StrategyCard);
      //Till here


      for(var i=0;i<count;i++)
      {
        var StrategyCard = new com.InfinityMB.PortfolioManagementMA.StrategyCard({
          "height": finalHeight+"dp",
          "id": "StrategyCard" + i+1,
          "isVisible": true,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "top": "0dp",
          "width": "100%",
          "appName": "PortfolioManagementMA",
          "viewType": "StrategyCard",
          "overrides": {
            "StrategyCard": {
              "right": "viz.val_cleared",
              "bottom": "viz.val_cleared",
              "minWidth": "viz.val_cleared",
              "minHeight": "viz.val_cleared",
              "maxWidth": "viz.val_cleared",
              "maxHeight": "viz.val_cleared",
              "centerX": "viz.val_cleared",
              "centerY": "viz.val_cleared"
            }
          }
        },{
          "paddingInPixel": false,
          "overrides": {}
        }, {
          "overrides": {}
        });
        
        var strategyName = assetArray[i].strategyName;  
        //This if condition is added because we do not have to iterate
        //already selected stratedy displayed in the green card, again
        if(this.data === strategyName)
        {
          continue;
        }
        
        scope.view.flxScrollContainer.add(StrategyCard);              
        
        var segData=[];
        var k=0;
        for(k=0;k<assetArray[i].assetsCompo.length;k++){
          segData.push(
            {
              assetName: assetArray[i].assetsCompo[k].assetName,
              weight: assetArray[i].assetsCompo[k].weight+'%',
              background:{
                backgroundColor: colArray[k]
              },
            flxStrategy:{
                skin:"sknflxffffffBg"
            },
            flxMain:{
                skin:"sknflxffffffBg"
            }
            }
          );
        }

        for(;k<maxVal;k++){
          segData.push(
            {
              assetName: "",
              weight: "",
              background:{
                backgroundColor: "",
                visibility : false,
              height: "0dp"
              },
            flxStrategy:{
                skin:"sknflxffffffBg"
            },
            flxMain:{
                skin:"sknflxffffffBg"
            }

            }
          );
        }
        var graphData=[];
        for(var l=0;l<assetArray[i].assetsCompo.length;l++){
          graphData.push(Number(assetArray[i].assetsCompo[l].weight));
        }    

        StrategyCard.setData(i, segData, graphData, strategyName, this.onClickMethod);
        /*if(i===0){
          this.setStrategy(assetArray[0].strategyName, assetArray[0].strategyId, finalHeight);
        }*/

        scope.widgetRef.push(StrategyCard);

        //         if(this.data === strategyName)
        //         {
        //           this.landingCardVal = i;
        //           StrategyCard.updateSkins();
        //         }
        //         if(i===0){
        //             scope.setStrategy(this.data, dataID, finalHeight);
        //         }
      }

      this.initActions();
      //for (var a=0; a<this.landingCardVal; a++)
      //{
      //this.moveCardRight();
      //this.view.flxScrollContainer.scrollToWidget(this.widgetRef[this.landingCardVal]);
      //this.currIndex = this.landingCardVal+1;
      //this.setPageBtns();
      //this.view.forceLayout();
      //}
      //this.view.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    onClickMethod : function(clickedName){
      var scope = this;
      var c=0;
      if(clickedName !== this.data)
        {
          scope.widgetRef[0].updateSkinsNull();
        }
      if(clickedName === this.data)
        {
          scope.widgetRef[0].updateSkins();
          scope.setStrategy(scope.strName[this.landingCardVal].strategyName, scope.strName[this.landingCardVal].strategyId, scope.finHeight);
        }
      for(var c = 0; c< scope.widgetRef.length-1;c++){
       /* if(this.landingCardVal === 0)
        {
          if(this.clickAsset[c+1].strategyName === clickedName){
            //scope.clickCardVal = scope.clickindex;
            scope.widgetRef[c+1].updateSkins();
            scope.setStrategy(scope.strName[scope.currIndex-1].strategyName, scope.strName[scope.currIndex-1].strategyId, scope.finHeight);
          }
          else{
            scope.widgetRef[c+1].updateSkinsNull();
          }
        }
        else
        {
          if(this.clickAsset[c].strategyName === clickedName){
            //scope.clickCardVal = scope.clickindex;
            scope.widgetRef[c+1].updateSkins();
            scope.setStrategy(scope.strName[scope.currIndex-2].strategyName, scope.strName[scope.currIndex-2].strategyId, scope.finHeight);
          }
          else{
            scope.widgetRef[c+1].updateSkinsNull();
          }
        }*/
          if(this.rearrange[c+1].strategyName === clickedName){
            //scope.clickCardVal = scope.clickindex;
            scope.widgetRef[c+1].updateSkins();
            scope.setStrategy(scope.restr[scope.currIndex-1].strategyName, scope.restr[scope.currIndex-1].strategyId, scope.finHeight);
          }
          else{
            scope.widgetRef[c+1].updateSkinsNull();
          }
      }
    },

    moveCardRight: function() {
      this.view.flxScrollContainer.scrollToWidget(this.widgetRef[this.currIndex]);
      this.currIndex = this.currIndex+1;
      this.setPageBtns();
    },

    moveCardLeft: function() {
      this.view.flxScrollContainer.scrollToWidget(this.widgetRef[this.currIndex-2]);
      this.currIndex = this.currIndex-1;
      this.setPageBtns();
    },

    setPageBtns: function(){
      var scope = this;
      scope.view.lblCurrPage.text = scope.currIndex + "/" + scope.finalArr;
      if(scope.currIndex === 1){
        scope.view.flxLeft.setVisibility(false);
      }else if(scope.currIndex === scope.finalArr){
        scope.view.flxRight.setVisibility(false);
        scope.view.flxLeft.setVisibility(true);
      }else{
        scope.view.flxLeft.setVisibility(true);
        scope.view.flxRight.setVisibility(true);
      }
      //scope.setStrategy(scope.strName[scope.currIndex-1].strategyName, scope.strName[scope.currIndex-1].strategyId, scope.finHeight);
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

    onClickBack:function(){
      this.view.flxScrollContainer.removeAll();
    },
  };
});