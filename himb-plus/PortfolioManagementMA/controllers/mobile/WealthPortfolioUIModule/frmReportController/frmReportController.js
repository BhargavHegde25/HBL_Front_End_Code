define({
  init: function(){
    this.view.preShow = this.preShow;
  },
  /**
	* @api : preShow
     Invoked while the form is loading
  */
  preShow: function(){ 
    try{
      var scope= this;
      var navMan = applicationManager.getNavigationManager();
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
      this.view.Reports.preshow();
      this.view.Reports.onOptionSelect = function(id, dataSet) {
        if(id === "flxPreviousDays") {
          navMan.setCustomInfo('frmReport', dataSet);
          navMan.navigateTo("frmDateRange");
        }
        else if(id === "flxAccountSummary") {
          navMan.setCustomInfo("frmReportType",dataSet);
          navMan.navigateTo("frmReportType");
        }
        else if(id === "segDownload") {
          scope_WealthPresentationController.downloadParams={};
          scope_WealthPresentationController.downloadParams.navPage="Reports";
          scope_WealthPresentationController.downloadParams.downloadFormat="pdf";
          var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
          wealthModule.getDownloadList(dataSet);
        }
        else {
          scope_WealthPresentationController.downloadParams.downloadFormat = dataSet;
          navMan.navigateTo("frmDownload");
        }
      };
      this.view.Reports.btnVisibility = function(visibility) {
        scope.view.flxBtn.setVisibility(visibility);
      };
      this.initActions();
    }catch(err) {
      this.setError(err, "preShow");
    } 
  },
  /**
	* @api : initActions
     Reponsible to initialize actions
  */
  initActions: function(){
    try{
      this.view.customHeader.btnRight.onClick = this.goBack;
      this.view.customHeader.flxBack.onClick = this.goBack;
      this.view.flxBtn.setVisibility(true);
      this.view.btnGetReport.onClick = this.downloadStatement;
    }
    catch(err){
      this.setError(err, "initActions");
    }
  },
  /**
	* @api : goBack
     goBack is invoked on Back and cancel selection
  */
  goBack: function(){
    try{
      var params = {
        "portfolioId": scope_WealthPresentationController.portfolioId,
        "navPage": "Portfolio",
        "graphDuration": ""
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getPortfolioAndGraphDetails(params);
    }catch(err){
      this.setError(err, "goBack");
    }
  },

  /**
	* @api : downloadStatement
     Invoked on click of Get report button
  */
  downloadStatement: function(){
    try{
      let downloadParams=scope_WealthPresentationController.reportParams;
      downloadParams.accountId = scope_WealthPresentationController.accountNumber;
      if(scope_WealthPresentationController.downloadParams.downloadFormat === undefined) {
        scope_WealthPresentationController.downloadParams.downloadFormat = "pdf";
      }
      downloadParams.downloadFormat=scope_WealthPresentationController.downloadParams.downloadFormat;
      downloadParams.dateFrom = scope_WealthPresentationController.selectedDateRangeDetails.startDate.replaceAll("-","");
      downloadParams.dateTo = scope_WealthPresentationController.selectedDateRangeDetails.endDate.replaceAll("-","");
      scope_WealthPresentationController.downloadParams.navPage="Reports";
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getDownloadList(downloadParams);
    }catch(err){
      this.setError(err, "downloadStatement");
    }

  },
  /**
	* @api : onClickDownloadMessage
     Invoked for downloading the report
  */
  onClickDownloadMessage: function(base64String,filename){
    try 
    {  
      this.view.Reports.generateReport(base64String,filename);
    }catch(error){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  /**
	* @api : checkPermissions
     Invoked to check permission
  */
  checkPermissions: function(){
    try{
      let generateReportPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_REPORT_MANAGEMENT_REPORT_CREATE");
      this.view.flxBtn.setVisibility(generateReportPermission);
    }catch(err){
      this.setError(err, "checkPermissions");
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
});