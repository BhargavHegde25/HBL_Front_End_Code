/*eslint-disable*/
define(['./AllocationCheckDAO'],function(AllocationCheckDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new AllocationCheckDAO();
      this.context = {};
      this.view.preShow = this.preShow;
      this.assetAllocHealth = 1;
      this.toggle = true;

      this.view.btnTableView.onClick = this.toggleView.bind(this,'table');
      this.view.btnGraphView.onClick = this.toggleView.bind(this,'graph');
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      this.view.ToggleHeader.flxToggleButton.onTouchEnd = this.toggleHeader;
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
    toggleHeader: function() {
      try{
      if(this.toggle){
        this.view.ToggleHeader.imgDropDown.src = 'chevron_down.png';
        this.view.flxContent.setVisibility(false);
        this.toggle = !this.toggle;
      } else {
        this.view.ToggleHeader.imgDropDown.src = 'chevron_up.png';
        this.view.flxContent.setVisibility(true);
        this.toggle = !this.toggle;
      }
      }catch(err) {
        this.setError(err, "toggleHeader");
      } 
    },
    setContext: function(context,isHealth) {
      try{
        this.context = context;

        if(typeof(this._serviceParam) === 'string'){
          this._serviceParam = JSON.parse(this._serviceParam);
        }
        if(isHealth)
        {
          scope_WealthPresentationController.ishealthcheck = isHealth;
          this.businessController.fetchDetails(
            this._serviceParam.ServiceName,
            this._serviceParam.OperationName,
            this._serviceParam.ObjectName,
            this.context,
            this.onServiceSuccess,
            this.onError
          );
        }
        else{
          scope_WealthPresentationController.ishealthcheck = false;
          this.businessController.fetchDetails(
            this._serviceParam.ServiceName,
            "getPortfolioHealthIP",
            "InvestmentProposal",
            this.context,
            this.onServiceSuccess,
            this.onError);
        }
      }catch(err) {
        this.setError(err, "setContext");
      } 
    },

    preShow: function() {
      try{
      this.view.flxContent.setVisibility(true);
      if(this._configParam.header) {
        this.view.ToggleHeader.isVisible = true;
      } else {
        this.view.ToggleHeader.isVisible = false;
      }

      if(this._configParam.detailButton) {
        this.view.btnDetailedTableView.isVisible = true;
      } else {
        this.view.btnDetailedTableView.isVisible = false;
      }

      if(this._configParam.toggleView) {
        this.view.flxToggleButtons.isVisible = true;
      } else {
        this.view.flxToggleButtons.isVisible = false;
        this.view.flxSep.top = "0dp";
      }
      
      this.toggleView(this._configParam.defaultView, null);


      this.view.btnDetailedTableView.onClick = this.navToDetailedForm;

        }catch(err) {
        this.setError(err, "preShow");
      } 

    },
    navToDetailedForm: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo(this._configParam.detailedForm);
    },

    onServiceSuccess: function(response){
      //Changing Key 'Name' to 'name'
      try{
      response.Assets = response.Assets.map(
        obj => {
          return {
            "currentWeight": obj.currentWeight,
            "level": obj.level,
            "strategyWeight": obj.strategyWeight,
            "parentId": obj.parentId,
            "ID": obj.ID,
            "name": obj.Name,
            "healthStatus": obj.healthStatus
          }
        }
      );

        var filteredData = response.Assets.filter(e=>!((e.currentWeight=="0" && e.strategyWeight == "0") || (e.currentWeight=="0" && e.strategyWeight == "0.0")|| (e.currentWeight=="0.0" && e.strategyWeight == "0.0") || (e.currentWeight=="0.0" && e.strategyWeight == "0")));
        response.Assets = this.sortData(filteredData, "currentWeight");
        var data = response.Assets;
        var chartData = this.getChartData(response.Assets);
        this.view.DrillDown.setData(response);
      }catch(err) {
        this.setError(err, "onServiceSuccess");
      } 
    },
    
    sortData: function(data, key) {
            function sortByKey(a, b) {
                var x = parseFloat(a[key]);
                var y = parseFloat(b[key]);
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
            return (data.sort(sortByKey));
        },
    
    getChartData: function(flatData){
      try{
        var chartData={};
        this.assetAllocHealth = 1;
        var labelArray = [];
        var arrIndex=0;
        var seriesArray = [];
        seriesArray[0] = []; //Current Weight
        seriesArray[1] = []; //Strategy Weight
        var colArray =  ["#3AB1D6","#7E04C4","#54D75D","#77BC43","#008495","#23A8B1","#7BCCC4","#3BE2B2","#E7417A","#E8705B","#FF8600","#F7EA3A","#7E04C4","#BF0404","#B9SEE8","#6753EC","#3897D6","#4176A4","#3645A7","#0273E3","#646E83","#BDBDBD"];
        for(var index=0; index<flatData.length; index++){
          if(parseInt(flatData[index].level)===1){
            //IW-3836 - Parthiban
            if(flatData[index].healthStatus === '1'){
              this.assetAllocHealth = 0;
            }
            //IW-3836 - Parthiban
            //seriesArray[0][arrIndex] = flatData[index].currentWeight;
            seriesArray[0][arrIndex] = flatData[index].currentWeight;
            seriesArray[1][arrIndex] = flatData[index].strategyWeight;
            labelArray[arrIndex] = flatData[index].name;
            arrIndex++;
          }
        }
        //IW-3836 - Parthiban
        if(this.assetAllocHealth===1){ //IW-3865  bharath
          this.view.ToggleHeader.imgStatus.src = 'approval.png';
          this.view.ToggleHeader.lblStatus.text=kony.i18n.getLocalizedString("i18n.wealth.noIssues");
        } else {
          this.view.ToggleHeader.imgStatus.src = 'aa_password_error.png';
          this.view.ToggleHeader.lblStatus.text=kony.i18n.getLocalizedString("i18n.wealth.issuesInPortfolio");
        }
        //IW-3836 - Parthiban

        chartData.labelArray = labelArray;
        chartData.seriesArray = seriesArray;
        chartData.colArray = colArray;
        //       return chartData;
        var width = (chartData.labelArray.length * 100) + 100;   //IW-3865  bharath
        this.view.brwAllocationCheck.height = width + "dp";



        //IW-3865 start bharath
        if(kony.application.getCurrentForm().id === "frmReviewNewProposal"){
          this.view.flxPortfolioHealth.setVisibility(true);
          this.view.ToggleHeader.lblHead.text = kony.i18n.getLocalizedString("i18n.wealth.portfolioHealth");
          this.view.lblCurrentWeight.text = kony.i18n.getLocalizedString("i18n.wealth.expectedWeight");
          this.view.lblStrategyWeight.text =kony.i18n.getLocalizedString("i18n.wealth.strategyWeight");
        }
        else if(kony.application.getCurrentForm().id === "frmDetailedPortfolioHealth"){
          this.view.lblCurrentWeight.text = kony.i18n.getLocalizedString("i18n.wealth.expectedWeight");
          this.view.lblStrategyWeight.text =kony.i18n.getLocalizedString("i18n.wealth.strategyWeight");
        }
        else{
          this.view.ToggleHeader.lblHead.text = kony.i18n.getLocalizedString("i18n.wealth.assetAllocation");
          this.view.lblCurrentWeight.text = kony.i18n.getLocalizedString("i18n.wealth.currentWeightOLB");
          this.view.lblStrategyWeight.text = kony.i18n.getLocalizedString("i18n.wealth.strategyWeight");
        }// IW-3865 end bharath

        this.view.brwAllocationCheck.evaluateJavaScript("drawWealthAllocationChart(" 
                                                        + JSON.stringify(chartData.labelArray)
                                                        + " ," 
                                                        + JSON.stringify(chartData.seriesArray)
                                                        +" ,"	
                                                        + JSON.stringify(chartData.colArray)
                                                        +");");
        if(scope_WealthPresentationController.ishealthcheck){
          this.setHealthStatus(this.assetAllocHealth); 
        }
      }catch(err) {
        this.setError(err, "getChartData");
      } 
    },

    toggleView: function(btnType, btn){
      try{
      if(btnType==='table'){
        this.view.flxGraphContent.isVisible = false;
        this.view.flxTableContent.isVisible = true;

        this.view.btnTableView.skin='sknbtnBf293276Border1pxFontFFFFFF40PX';
        this.view.btnGraphView.skin='sknIWBtnBgFFFFFFBorder1px29327640px';

      } else if(btnType==='graph') {
        this.view.flxGraphContent.isVisible = true;
        this.view.flxTableContent.isVisible = false;

        this.view.btnTableView.skin='sknIWBtnBgFFFFFFBorder1px29327640px';
        this.view.btnGraphView.skin='sknbtnBf293276Border1pxFontFFFFFF40PX';
      }
      }catch(err) {
        this.setError(err, "toggleView");
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
        "level" : "ComponentViewController",
        "method": method,
        "error" : errorMsg
      };
      this.onError(errorObj);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },

  };
});