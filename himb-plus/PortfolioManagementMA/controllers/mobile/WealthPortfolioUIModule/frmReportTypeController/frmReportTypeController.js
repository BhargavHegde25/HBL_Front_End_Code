


define({
sortingData: [],
selectedRow: 0, 
  segData: [],
  //selectedColumnKey: "",
 // selectedColumn: "",
 init: function(){
   this.view.preShow = this.preShow;
   var navManager = applicationManager.getNavigationManager();
   var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
 },
  preShow: function(){
    try{
     var navManager = applicationManager.getNavigationManager();
     let data = navManager.getCustomInfo("frmReportType");
     let currentTheme = kony.theme.getCurrentTheme();
     if(currentTheme === "default"){
        this.activeImage = "radiobtn.png";
        this.inactiveImage = "radiobuttoninactive.png";
     }else{
        this.activeImage = "radioactivewealth.png";
        this.inactiveImage = "radioinactivewealth.png";
     } 
  // this.selectedColumn = data.reportTypeData.selectedOption;
   // this.selectedColumnKey = data.reportTypeData.selectedKey;
    this.setSegmentData(data);
       if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
        }
    this.initActions();
    }catch(err) {
        this.setError(err, "preShow");
      } 
  },
  initActions: function(){
    try{
     this.view.customHeader.flxBack.onTouchEnd = this.onDoneClick;
    this.view.btnDone.onClick = this.onDoneClick;
     this.view.customHeader.btnRight.onClick = this.onDoneClick;//IW-3870 - Bhuvanesh
     this.view.segReportType.onRowClick = this.onValueSelect;
    }catch(err) {
        this.setError(err, "initActions");
      } 
    },
    onValueSelect: function() {
      try{
        var rowIndex = this.view.segReportType.selectedRowIndex[1];
        this.sortingData = this.view.segReportType.data;
        this.selectedRow = rowIndex;
        /*this.sortingData.forEach(function(e) {
            e.isSelected = false;
            e.imageDetails.src = this.inactiveImage;
        });*/
        for(var i = 0;i<this.sortingData.length;i++){
            this.sortingData[i].isSelected = false;
            this.sortingData[i].imageDetails.src = this.inactiveImage;
            }
        this.sortingData[rowIndex].isSelected = true;
        this.sortingData[rowIndex].sortName = {
            "text": this.segData[rowIndex].sortName
        };
        this.sortingData[rowIndex].imageDetails = {
            "src": this.activeImage ,
        };
       // this.selectedColumnKey = this.segData[rowIndex].sortIndex;
      //  this.selectedColumn = this.segData[rowIndex].sortName;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").reportType = this.segData[rowIndex].sortName;
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").reportParams= this.segData[rowIndex].reportParams;
        this.view.segReportType.setData(this.sortingData);
      }catch(err) {
        this.setError(err, "onValueSelect");
      } 
    },
  onDoneClick: function(){
    try{
     var navManager = applicationManager.getNavigationManager();
     navManager.navigateTo("frmReport");
    }catch(err) {
        this.setError(err, "onDoneClick");
      } 
  },
  setSegmentData: function(data){
     // var temp = this.selectedColumnKey;
    try{
      var temp = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").reportType;
      var reportType = [];
    for(var list in data){
    var storeData = {
                    "sortName": data[list].reportType,
                    "reportParams":data[list].downloadParams,
                    "isSelected": false
                };
    reportType.push(storeData);
    }
    this.segData = reportType;
      this.segData.forEach(function(e) {
            if (e.sortName === temp)
                e.isSelected = true;
            else e.isSelected = false;
        });
   this.sortingData = [];
   this.loadSegment();
    }catch(err) {
        this.setError(err, "setSegmentData");
      } 
},
  loadSegment: function() {
    try{
        var data = [];
        data = this.segData;
        for (var list in data) {
            var storeData;
                storeData = {
                    isSelected: true,
                    sortName: {
                        text: data[list].sortName,
                    },
                    imageDetails: {
                        src: (data[list].isSelected)?this.activeImage :this.inactiveImage,
                        isVisible: true
                    }
                  //reportParams: data[list].downloadParams
                   // sortIndex: data[list].sortIndex
                };
            this.sortingData.push(storeData);
        }
        this.view.segReportType.widgetDataMap = {
            lblTypeName: "sortName",
            imgCheck: "imageDetails"
        };
        this.view.segReportType.removeAll();
        this.view.segReportType.setData(this.sortingData);
    }catch(err) {
        this.setError(err, "loadSegment");
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
