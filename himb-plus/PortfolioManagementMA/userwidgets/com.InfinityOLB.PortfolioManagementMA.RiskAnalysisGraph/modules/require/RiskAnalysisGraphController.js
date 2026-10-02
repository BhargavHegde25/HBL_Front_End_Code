/*eslint-disable*/
define(['./RiskAnalysisGraphDAO'],function(RiskAnalysisGraphDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new RiskAnalysisGraphDAO();
      this.context = {};
      this.view.postShow = this.postShow;


      this._data = {};
      var WealthRiskAnalysisGraph = new kony.ui.CustomWidget({
        "id": "WealthRiskAnalysisGraph",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "WealthRiskAnalysisGraph",
        "chartData": this._data,
        "OnClickOfPie": function() {}
      });

      this.view.flxRiskGraph.add(WealthRiskAnalysisGraph);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParam', () => {
        return this._serviceParam;
      });
      defineSetter(this, 'serviceParam', value => {
        this._serviceParam = value;
      });
    },
    setContext: function(context) {
      kony.application.showLoadingScreen("loadingskin", "Data is still Loading");
      this.context = context;
      this.businessController.fetchDetails(
        this._serviceParam.ServiceName,
        this._serviceParam.OperationName,
        this._serviceParam.ObjectName,
        this.context,
        this.onServiceSuccess,
        this.onError
      );
    },

    postShow: function() {
    },

    onServiceSuccess: function(response) {

      if(response){
        if(response.errmsg){
          this.view.flxHealthStatus.isVisible = false;
          this.view.flxMainContent.isVisible = false;
          this.view.flxDisclaimer.isVisible = false;
          this.view.flxError.isVisible = true;
        }{
        this.view.flxHealthStatus.isVisible = true;
        this.view.flxMainContent.isVisible = true;
        this.view.flxDisclaimer.isVisible = true;
        this.view.flxError.isVisible = false;
        this.view.flxRiskGraph.WealthRiskAnalysisGraph.chartData = response;  
        var riskAnalysisData = response.riskAnalysis;
        var portfolioRisk = parseFloat(riskAnalysisData[0].riskPortMeasureP);
        if(portfolioRisk)
        {
          this.view.isVisible = true;

          this.view.flxMainContent.setVisibility(true);
          this.view.flxDisclaimer.setVisibility(true);

          if(riskAnalysisData && riskAnalysisData[0])
          {
            if(riskAnalysisData[0].riskStatus==='0'){
              this.view.imgHealthStatus.src='selectedtick.png';
              this.view.lblHealthMsg.text = kony.i18n.getLocalizedString("i18n.wealth.noIssues");
            } else {
              this.view.imgHealthStatus.src='info.png';
              this.view.lblHealthMsg.text = kony.i18n.getLocalizedString("i18n.wealth.issuesInPortfolio");
            }
            this.view.lblHealthDetailedMsg.setVisibility(false);
          }
        }else{

          this.view.imgHealthStatus.src='selectedtick.png';
          this.view.lblHealthMsg.text = kony.i18n.getLocalizedString("i18n.wealth.noIssues");
          this.view.flxMainContent.setVisibility(false);
          this.view.flxDisclaimer.setVisibility(false);
        }
        }
      } else {

        this.disableRiskanalysisGraphVisibility();
      }

      if(kony.application.getCurrentForm().id === "frmInvestmentProposal"){
        if(kony.application.getCurrentBreakpoint()> 1024)
        {
          this.view.flxCompHeader.left = "30dp";
          this.view.flxSeperator.left = "30dp";
          this.view.flxHealthStatus.left = "31dp";
          this.view.flxMainContent.left = "31dp";
          this.view.flxDisclaimer.left = "31dp";
        }
      }
      else
      {
        if(kony.application.getCurrentBreakpoint()> 1024)
        {
          this.view.flxCompHeader.left = "26dp";
          this.view.flxSeperator.left = "26dp";
          this.view.flxHealthStatus.left = "30dp";
          this.view.flxMainContent.left = "30dp";
          this.view.flxDisclaimer.left = "30dp";
        }
      }


    kony.application.dismissLoadingScreen();
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
    },
    onError: function(err) {
      kony.application.dismissLoadingScreen();
      this.view.flxHealthStatus.isVisible = false;
      this.view.flxMainContent.isVisible = false;
      this.view.flxDisclaimer.isVisible = false;
      this.view.flxError.isVisible = true;
      kony.print(JSON.stringify(err));
    }
  };
});