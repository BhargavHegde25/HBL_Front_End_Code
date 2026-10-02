/*eslint-disable*/
define(['./PortfolioStrategyDAO'],function(PortfolioStrategyDAO) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
         //DAO Object
          this.PortfolioStrategyDAO = new PortfolioStrategyDAO();
          this.context={};
          this.response={};
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'serviceParm', () => {
                return this._serviceParm;
            });
            defineSetter(this, 'serviceParm', value => {
                this._serviceParm = value;
            });
            defineGetter(this, 'serviceParm', () => {
                return this._serviceParm;
            });
            defineSetter(this, 'serviceParm', value => {
                this._serviceParm = value;
            });
        },
      preShow:function(){

      },
       /**
    * @api: setStrategyParm
    * Method to set the context value from component consumer and call DAO function.
    * @arg: context {Object} - data sent from consumer of this component
    * @return: NA
    **/
    setStrategyParm:function(context, setAdvisoryCards, showHealthAndProposal){
      try{
      this.context=context;
        this.setAdvisoryCards = setAdvisoryCards;
        this.showHealthAndProposal = showHealthAndProposal;
      this.makeDaoCall();      
      }catch(err) {
        this.setError(err, "setStrategyParm");
      }
    },
    /**
    * @api: makeDaoCall
    * Method to hit the service and receive backend response.
    * @arg: NA
    * @return: NA
    **/
       makeDaoCall: function(){
            try{
              this.PortfolioStrategyDAO.fetchDetails(this._serviceParm.objectServiceName,this._serviceParm.operationName,this._serviceParm.objectName,this.context,this.onServiceSuccess,this.onError);
            }
            catch (err) {
            this.setError(err, "makeDaoCall");
       }
          },
    onServiceSuccess: function(response) {
      try{
      this.response = response;
        
        if(this.response.isNewUser){
          this.strategyExecution();
          this.setAdvisoryCards(true);
        } else {
          this.setAdvisoryCards(false);
        }
        
      }catch(err) {
        this.setError(err, "onServiceSuccess");
      }
    },
      /**
    * @api: setError
    * Gets trigerred when any exception occurs in any method in view controller
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
    * @return: NA
    **/
    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
      this.setAdvisoryCards(false);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },
        /**
    *@method: strategyExecution
    * Gets trigerred after successful service call to perform all the task of component.
    * @arg: NA
    * @return: NA
    **/
    strategyExecution: function(){
      try{
      var data= this.response;
      if(data.isNewUser==="true")
        {
          this.view.flxNonFirstUser.setVisibility(false);
          this.view.flxFirstUser.setVisibility(true);
          this.view.btnStgyNav.text = kony.i18n.getLocalizedString("i18n.wealth.strategy.defineStrategy");
          this.view.flxInfo.setVisibility(false);
          this.view.btnStgyNav.onClick = this.defineStrategyClick;
          this.showHealthAndProposal(false);
        }
      else{
         this.view.flxFirstUser.setVisibility(false);
         this.view.flxNonFirstUser.setVisibility(true);
        this.view.flxInfo.setVisibility(true);
         this.setChartData();
         this.setLabelData(data);
         this.view.btnStgyNav.text=kony.i18n.getLocalizedString("i18n.wealth.strategy.reviewStrategy");
         this.view.btnStgyNav.onClick = this.reviewStrategyClick;
        this.showHealthAndProposal(true);
      }
      }catch(err) {
        this.setError(err, "strategyExecution");
      }
    } ,
          /**
    *@method: setChartData
    * Gets trigerred to set the data to chart and invoke chart function.
    * @arg: service response
    * @return: NA
    **/
    setChartData: function() { 
      try{
       var finalData={};
      var value = [];
      var sum=0;
       var data=this.response;
      var len=data.strategyList.length;
      this.view.lblFirstStrategy.text=data.strategyList[0].strategyName;
      this.view.lblLastStrategy.text=data.strategyList[len-1].strategyName;
      for(i=0;i<len;i++)
        {
          value[i]=Math.round(100/len);
        }
      for (i = 0; i < len; i++) {
        if (data.strategyList[i].strategyName === data.myStrategyName) {
          sum += value[i] / 2;
          break;
        } else {
          sum += value[i];
        }
      }
      finalData.valueArr=value;
      finalData.angle=Math.round(sum);
      this.view.Accelerometer.setChartData(finalData);
      }catch(err) {
        this.setError(err, "setChartData");
      }
    },
          /**
    *@method: setLabelData
    * Gets trigerred to set the value to major labels in the component.
    * @arg: service response
    * @return: NA
    **/
    setLabelData: function(data) {
      try{
         var strategyName=data.myStrategyName;
         this.view.lblStrategyName.text=strategyName;
         this.view.lblStrategyDetail.text= kony.i18n.getLocalizedString("i18n.wealth.strategy.userCurrentStrategy") + " " + strategyName;
      }catch(err) {
        this.setError(err, "setLabelData");
      }
      },
        /**
    *@method: defineStrategyClick
    * Gets trigerred to invoke the onClick event of button for navigation to Define Strategy page.
    * @arg: NA
    * @return: NA
    **/
    defineStrategyClick: function() {
      try{
      this.firstUserClick();
      }catch(err) {
        this.setError(err, "defineStrategyClick");
      }
    },
        /**
    *@method: reviewStrategyClick
    * Gets trigerred to invoke the onClick event of button for navigation to Review Strategy page.
    * @arg: NA
    * @return: NA
    **/
     reviewStrategyClick: function() {
       try{
      this.nonFirstUserClick();
       }catch(err) {
        this.setError(err, "reviewStrategyClick");
      }
    },
    /**
    *@method: onStrategyInfoClick
    * Gets trigerred to invoke the onClick event of info button in component.
    * @arg: NA
    * @return: NA
    **/
    onStrategyInfoClick: function() {
      try{
      var data= this.response;
      let scope = this;
      this.view.imgInfo.src = "group_10_copy_4.png";
      var basicProperties =
          {
            "message": kony.i18n.getLocalizedString("i18n.wealth.strategy.popupCurrentStrategy") + " "+data.myStrategyName ,
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": kony.i18n.getLocalizedString("i18n.wealth.myStrategy"),
            "noLabel": "",
            "yesLabel": kony.i18n.getLocalizedString("kony.mb.common.close"),
            "alertIcon": "",
            "alertHandler": function(response) {
              scope.view.imgInfo.src = "group_10_copy_4.png";
            }
          };
      var pspConfig = {
        "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
      };

      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, pspConfig);
      }catch(err) {
        this.setError(err, "checkPermission");
      }
      },
          postShow: function() {
            try{
           var width = this.view.flxButton.frame.width;
           if(width>0){
                this.view.btnStgyNav.width = (width-84)+"dp";
           }else{
                this.view.btnStgyNav.width = "261dp";
           }

      if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
        this.view.btnStgyNav.right = "42dp";
      }else{
        this.view.btnStgyNav.left = "42dp";
      }
      this.view.flxInfo.onClick = this.onStrategyInfoClick;
            }catch(err) {
        this.setError(err, "onStrategyInfoClick");
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
        "level" : "ComponentController",
        "method" : method,
        "error": errorMsg
      };
      scope.onErrorMain(errorObj);
    },
    onErrorMain:function(err){
      kony.print(JSON.stringify(err));
    }
      
	};
});