define(function() {

  return {
    dateRange: {},
    reportData:"",
    downloadData:[],
    constructor : function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },

    /**
	* @api : preshow
     Invoked while the component is loading
  */
    preshow: function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        this.reportData = scope_WealthPresentationController.reportData;
        var reportList = this.reportData.response.reportTypeList[0];
        if(scope_WealthPresentationController.reportType === ""){
          scope_WealthPresentationController.reportType = reportList.reportType;
          scope_WealthPresentationController.reportParams=reportList.downloadParams;
        }
        this.view.lblAccSummary.text = scope_WealthPresentationController.reportType;
        if(navManager.getCustomInfo("frmDownload")==="csv"){
          scope_WealthPresentationController.downloadParams.downloadFormat="csv";
          this.view.lblDownFormat.text="CSV";
        }else if(navManager.getCustomInfo("frmDownload")==="xlsx"){
          scope_WealthPresentationController.downloadParams.downloadFormat="xlsx";
          this.view.lblDownFormat.text="EXCEL (xlsx)";
        }else{
          scope_WealthPresentationController.downloadParams.downloadFormat="pdf";
          this.view.lblDownFormat.text="PDF";
        }
        this.dateRange = scope_WealthPresentationController.selectedDateRangeDetails;
        this.setLblPreviousDays();
        this.view.flxTimePeriod.setVisibility(true);
        this.view.flxReportType.setVisibility(true);
        this.view.segDownload.setVisibility(false);
        var data = this.reportData.response.downloadTypeList;
        this.downloadData=[];
        for (var list in data){
          var storeData ={
            docName : data[list].downloadParams.downloadType,
            downloadParams : data[list].downloadParams
          };
          this.downloadData.push(storeData);
        }

        this.view.segDownload.widgetDataMap = {lblType: "docName"};
        this.view.segDownload.removeAll();
        this.view.segDownload.setData(this.downloadData);
        if(kony.application.getPreviousForm().id==='frmPortfolioDetails'){
          this.view.lblDownFormat.text="PDF";
        }
        this.initActions();
        this.checkPermissions();
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
        var scope = this;
        if (kony.i18n.getCurrentLocale() === "ar_AE") {
          this.view.imgPreviousDay.src = "chevron_reverse.png";
          this.view.imgAccSummary.src = "chevron_reverse.png";
          this.view.imgDownFormat.src = "chevron_reverse.png";
        }
        else {
          this.view.imgPreviousDay.src = "chevron_right.png";
          this.view.imgAccSummary.src = "chevron_right.png";
          this.view.imgDownFormat.src = "chevron_right.png";
        }
        this.view.flxPreviousDays.onTouchEnd = this.navigateToDatePicker.bind(this, this.view.flxPreviousDays);
        this.view.flxAccountSummary.onTouchEnd = this.navigateToReportType.bind(this, this.view.flxAccountSummary);
        this.view.segDownload.onRowClick = this.navigateToDownloadStatement.bind(this, this.view.segDownload);
        this.view.flxDownload.onTouchEnd=this.navigateToReportFormat.bind(this, this.view.flxDownload);
        this.view.ToggleButton.btnOneToggle = function() {
          scope.view.flxTimePeriod.setVisibility(true);
          scope.view.flxReportType.setVisibility(true);
          scope.view.segDownload.setVisibility(false);
          scope.view.flxFormatType.setVisibility(true);
          scope.btnVisibility(true);
        };
        scope.view.ToggleButton.btnTwoToggle = function() {
          scope.view.flxTimePeriod.setVisibility(false);
          scope.view.flxReportType.setVisibility(false);
          scope.view.segDownload.setVisibility(true);
          scope.view.flxFormatType.setVisibility(false);
          scope.btnVisibility(false);
        };
      }
      catch(err){
        this.setError(err, "initActions");
      }
    },
    /**
	* @api : navigateToDatePicker
     Invoked while selecting time period
  */
    navigateToDatePicker: function(widgetInfo){
      try{
        var navManager = applicationManager.getNavigationManager();
        var selectedValue = this.view.lblPreviousDays.text;
        var dataSet = {};
        var period;
        if(selectedValue === kony.i18n.getLocalizedString("i18n.wealth.previous30Days")){
          period ="previous30DaysSelected";
        }
        else if(selectedValue === kony.i18n.getLocalizedString("i18n.wealth.threeMonths")){
          period ="3MonthsSelected";
        }
        else if(selectedValue === kony.i18n.getLocalizedString("i18n.wealth.sixMonths")){
          period ="6MonthsSelected";
        }
        else if(selectedValue === kony.i18n.getLocalizedString("i18n.wealth.lastYear")){
          period ="lastYearSelected";
        }
        else{
          period ="freeDateSelected";
        }
        dataSet.selectedDays = period;
        this.onOptionSelect(widgetInfo.id, dataSet);
      }catch(err){
        this.setError(err, "navigateToDatePicker");
      }
    },
    /**
	* @api : navigateToReportType
     Invoked while selecting report type
  */
    navigateToReportType: function(widgetInfo){
      try{
        this.onOptionSelect(widgetInfo.id, this.reportData.response.reportTypeList);
      }catch(err){
        this.setError(err, "navigateToReportType");
      }
    },
    /**
	* @api : navigateToDownloadStatement
     Invoked while selecting download statement segment
  */
    navigateToDownloadStatement: function(widgetInfo){
      try{
        var rowIndex = this.view.segDownload.selectedRowIndex[1];
        let downloadTypeParams = this.downloadData[rowIndex].downloadParams;
        this.onOptionSelect(widgetInfo.id, downloadTypeParams);
      }catch(err){
        this.setError(err, "navigateToDownloadStatement");
      }
    },
    /**
	* @api : navigateToReportFormat
     Invoked for selecting report format
  */
    navigateToReportFormat: function(widgetInfo){
      try{
        this.onOptionSelect(widgetInfo.id, scope_WealthPresentationController.downloadParams.downloadFormat);
      }catch(err){
        this.setError(err,"navigateToReportFormat");
      }
    },
    /**
	* @api : generateReport
     Invoked as a method to generate report
  */
    generateReport: function(base64String,filename) {
      this.view.socialshare.shareWithBase64(base64String,filename);
    },
    /**
	* @api : checkPermissions
     Invoked to check permission
  */
    checkPermissions: function(){
      try{
        let generateReportPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_REPORT_MANAGEMENT_REPORT_CREATE");
        this.view.flxTimePeriod.setVisibility(generateReportPermission);
        this.view.flxReportType.setVisibility(generateReportPermission);
        let downloadStatementPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_REPORT_MANAGEMENT_REPORT_DOWNLOAD");
        this.view.ToggleButton.setContext(generateReportPermission, downloadStatementPermission)
        this.view.segDownload.isVisible = (generateReportPermission && downloadStatementPermission) ? false : true;
      }catch(err){
        this.setError(err, "checkPermissions");
      }
    },
    /**
	* @api : setLblPreviousDays
     Invoked to retain selected period
  */
    setLblPreviousDays: function(){
      try{
        var forUtility = applicationManager.getFormatUtilManager();
        if(this.dateRange){
          if(this.dateRange.selectedPeriod=="previous30DaysSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.previous30Days");
          }else if(this.dateRange.selectedPeriod=="3MonthsSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.threeMonths");
          }else if(this.dateRange.selectedPeriod=="6MonthsSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.sixMonths");
          }else if(this.dateRange.selectedPeriod=="lastYearSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.lastYear");
          }else{
            var startDateObj=this.dateRange.startDate.split("-");
            var formattedstartDate=startDateObj[1] +"/"+ startDateObj[2] +"/"+ startDateObj[0];
            var endDateObj=this.dateRange.endDate.split("-");
            var formattedendDate=endDateObj[1] +"/"+ endDateObj[2] +"/"+ endDateObj[0];
            this.view.lblPreviousDays.text=formattedstartDate + " - " + formattedendDate;
          }
        }else{
          this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.previous30Days"); 
        }
      }catch(err){
        this.setError(err, "setLblPreviousDays");
      }
    },
    /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
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
    }
  };
});