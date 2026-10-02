define(['./recommendStrategyDAO'],function(recommendStrategyDAO){
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new recommendStrategyDAO();
      this.context = {};
        },
      initGettersSetters: function() {
            defineGetter(this, 'serviceCall', () => {
                return this._serviceCall;
            });
            defineSetter(this, 'serviceCall', value => {
                this._serviceCall = value;
            });
        },
      setData: function (context) {
        this.view.btnRecommended.onClick=this.onClickButton;
      var scope = this;
      try {
        this.context = context;
        this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setData");
      }
    },
      
       setDataOne: function(isPermission){
        
          this.view.btnRecommended.isVisible = isPermission;
       
       
        
      },
      
    onServiceSuccess: function(response) {
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmRecommendStrategyConfirmation", response);
        var length=response.strategyList.length;
        this.view.lblStrategyNameOne.text  =  response.strategyList[0].strategyName;
      
      scope_WealthPresentationController.strategyName=response.recStrategyName;
      
        this.view.lblStrategyNameTwo.text =  response.strategyList[length-1].strategyName;
      this.view.lblStatusMain.text = response.recStrategyName;
      this.view.lblStatus.text = kony.i18n.getLocalizedString("i18n.wealth.labelRecommendedStrategy") + " " + "\"" + response.recStrategyName + "\""  + " " + kony.i18n.getLocalizedString("i18n.wealth.strategyRec");
      var finalarr = {};
      var value = [];
	  var sum=0;
      var total=  response.strategyList[length-1].maxVal;
      //value[0]=((response.strategyList[0].maxVal-response.strategyList[0].minVal)/total)*100;
      for(i=0;i<length;i++)
        {
          //value[i]=((response.strategyList[i].maxVal-response.strategyList[i-1].maxVal)/total)*100;
          value[i] = Math.round(100/length);
        }
      		for (i = 0; i < length; i++) {
                if (response.strategyList[i].strategyName === response.recStrategyName) {
                    sum += value[i] / 2;
                    break;
                } else {
                    sum += value[i];
                }
            }

      finalarr.valueArr = value;
      finalarr.angle=Math.round(sum);
      finalarr.leftLabel = this.view.lblStrategyNameOne.text;
      finalarr.rightLabel = this.view.lblStrategyNameTwo.text;
      
      this.view.AccelerometerChart.setData(finalarr);
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
      resizeComponent: function(absHeight, segLength){
        var scope = this;
        scope.view.flxMain.height = "100%";
        scope.view.flxButton.top="0px";
        scope.view.flxMain.forceLayout();
      }
    };
});