/* eslint-disable */
define(['./myRecommendedStrategyNewDAO'],function(myRecommendedStrategyNewDAO) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new myRecommendedStrategyNewDAO();
      this.context = {};
       this.view.preShow = this.preShow;
    },
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'serviceCall', () => {
                return this._serviceCall;
            });
            defineSetter(this, 'serviceCall', value => {
                this._serviceCall = value;
            });
        },
      preShow: function(){
        this.view.flxArrow.onClick = this.ChooseStrategy;
        this.view.flxOptions.onClick = this.ChooseStrategy;
      },
      ChooseStrategy: function(){
       this.onClickChooseStrategy();
      },
      
      hideFlex: function(isVisible){
        this.view.flxRight.isVisible = isVisible;
        },
        
      setData: function (context) {
      var scope = this;
      try {
        this.context = context;
        this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setData");
      }
    },
    onServiceSuccess: function(response) {
		var scope = this;
     try{
    var navManager = applicationManager.getNavigationManager();
	navManager.setCustomInfo("frmRecommendedStrategy",response);
      var finalarr = {};
      var value = [];
	  var sum=0;
	  var len=response.strategyList.length;
      this.view.lblStart.text  =  response.strategyList[0].strategyName;
      this.view.lblEnd.text =  response.strategyList[len-1].strategyName;  
	  this.view.lblStrategyName.text = response.recStrategyName;
      scope_WealthPresentationController.recStrategyName = response.recStrategyName;
      this.view.lblRecommendMain.text = kony.i18n.getLocalizedString("i18n.wealth.labelRecommendedStrategy") + " " + "\"" + response.recStrategyName + "\""  + " " + kony.i18n.getLocalizedString("i18n.wealth.strategyRec");
      var total=  response.strategyList[len-1].maxVal;
      //value[0]=((response.strategyList[0].maxVal-response.strategyList[0].minVal)/total)*100;
      for(i=0;i<len;i++)
        {
          //value[i]=((response.strategyList[i].maxVal-response.strategyList[i-1].maxVal)/total)*100;
		  value[i] = Math.round(100/len);
        }
		for (i = 0; i < len; i++) {
                if (response.strategyList[i].strategyName === response.recStrategyName) {
                    sum += value[i] / 2;
                    break;
                } else {
                    sum += value[i];
                }
            }
      finalarr.valueArr = value;
      finalarr.angle=Math.round(sum);
      this.view.Accelerometer.setChartData(finalarr);
       } catch (err) {
        scope.setError(err, "onServiceSuccess");
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