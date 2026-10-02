/*eslint-disable*/
define(['./viewTransactionsDAO','./ParserUtilsManager','./FormatUtils','CommonUtilities', './CacheUtils','./ViewConstants'],function(viewTransactionsDAO,ParserUtilsManager,FormatUtils,CommonUtilities,CacheUtils,ViewConstants) {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //scope variables
        this.orientationHandler = new OrientationHandler();
       this.numberMapping = {
              "1" : "One",
              "2" : "Two",
              "3" : "Three",
              "4" : "Four",
              "5" : "Five",
              "6" : "Six",
              "7" : "Seven",
              "8" : "Eight",
              "9" : "Nine",
              "10" : "Ten",            
      };
      this.instrumentId = "";
      this.downloadFormat ="pdf";
      this.sortColumnValues = [];
      this.dateLabelArr = [];
      this.dateKeyArr = [];
      this.dateText = "";
      this.dateKey = "";
      this.dateLabel = "";
      this.dateKeys = "";
      this.width = "";
      this.isEuro = false;  
      this.currCode = "";
      this.criteria = "";
      this.params = {};
      this.sortBy = "";
      this.sorting= "";
      this.startDate = "";
      this.endDate = "";
      this.sortNone=ViewConstants.IMAGES.SORTING;
      this.sortAsc=ViewConstants.IMAGES.SORTING_PREVIOUS;
      this.sortDesc=ViewConstants.IMAGES.SORTING_NEXT;
      this.portfolioId = "",
      this.instrumentData = {};
      this.offset = "0";
      this.noOfRecords = "10";
      this.skins = {};
      this.formatSkins = {};
      this.context = {};
      this.formattingJSON = {};
      //utils
      this.parserUtilsManager = new ParserUtilsManager();
      this.viewTransactionsDAO = new viewTransactionsDAO();
      this.FormatUtils = new FormatUtils();
      //custom properties
      this._objService="";
      this._objName="";
      this._operationName="";
      this._objCriteria = {};
      this._GAobjectServiceName="";
      this._GAobjectName="";
      this._GAoperationName="";
      this._GAcriteria="";
      this._fieldsData= "";
      this._referenceCurrency = "";
      this._amountFormat ="";
      this._dateFilterKeys = "";
      this._dateFormat = "";
      this._dateFilterLabels ="";
      this._defaultDateFilterKey = "";
      this._backendDateFormat = "";
      this._serviceResponseKey = "";
      this._errorText = "";
      this._rowSeperatorSkin = "";
      this._tableHeaderLabelSkin = "";
      this._tableFieldLabelSkin = "";
      this._calendarSkin = "";
      
      this.view.imgSort1.onTouchEnd = this.onClickSort.bind(this, 0, this.view.imgSort1);
      this.view.imgSort2.onTouchEnd = this.onClickSort.bind(this, 1, this.view.imgSort2);
      this.view.imgSort3.onTouchEnd = this.onClickSort.bind(this, 2, this.view.imgSort3);
      this.view.imgSort4.onTouchEnd = this.onClickSort.bind(this, 3, this.view.imgSort4);
      this.view.imgSort5.onTouchEnd = this.onClickSort.bind(this, 4, this.view.imgSort5);
      this.view.imgSort6.onTouchEnd = this.onClickSort.bind(this, 5, this.view.imgSort6);
      this.view.imgSort7.onTouchEnd = this.onClickSort.bind(this, 6, this.view.imgSort7);
      this.view.imgSort8.onTouchEnd = this.onClickSort.bind(this, 7, this.view.imgSort8);
      this.view.imgSort9.onTouchEnd = this.onClickSort.bind(this, 8, this.view.imgSort9);
      this.view.imgSort10.onTouchEnd = this.onClickSort.bind(this, 9, this.view.imgSort10);
      // for tablet
      this.view.imgSort1Tab.onTouchEnd = this.onClickSort.bind(this, 0, this.view.imgSort1Tab);
      this.view.imgSort2Tab.onTouchEnd = this.onClickSort.bind(this, 1, this.view.imgSort2Tab);
      this.view.imgSort3Tab.onTouchEnd = this.onClickSort.bind(this, 2, this.view.imgSort3Tab);
      this.view.imgSort4Tab.onTouchEnd = this.onClickSort.bind(this, 3, this.view.imgSort4Tab);
      this.view.imgSort5Tab.onTouchEnd = this.onClickSort.bind(this, 4, this.view.imgSort5Tab);
      this.view.imgSort6Tab.onTouchEnd = this.onClickSort.bind(this, 5, this.view.imgSort6Tab);
      this.view.imgSort7Tab.onTouchEnd = this.onClickSort.bind(this, 6, this.view.imgSort7Tab);
      this.view.imgSort8Tab.onTouchEnd = this.onClickSort.bind(this, 7, this.view.imgSort8Tab);
      this.view.imgSort9Tab.onTouchEnd = this.onClickSort.bind(this, 8, this.view.imgSort9Tab);
      this.view.imgSort10Tab.onTouchEnd = this.onClickSort.bind(this, 9, this.view.imgSort10Tab);

      defineSetter(this, 'objService', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objService = val;
        }
      });      
      defineGetter(this, 'objService', function () {
        return this._objService;
      });
      //defaultDateFilterKey
      defineSetter(this, 'defaultDateFilterKey', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._defaultDateFilterKey= val;
        }
      });      
      defineGetter(this, 'defaultDateFilterKey', function () {
        return this._defaultDateFilterKey;
      });
      defineSetter(this, 'objName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objName = val;
        }
      });
      defineGetter(this, 'objName', function () {
        return this._objName;
      });
      defineSetter(this, 'operationName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._operationName = val;
        }
      });
      defineGetter(this, 'operationName', function () {
        return this._operationName;
      });
      defineSetter(this, 'objCriteria', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objCriteria = val;
        }
      });
      defineGetter(this, 'objCriteria', function () {
        return this._objCriteria;
      });
      defineSetter(this, 'GAobjectServiceName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._GAobjectServiceName = val;
        }
      });
      defineGetter(this, 'GAobjectServiceName', function () {
        return this._GAobjectServiceName;
      });
      defineSetter(this, 'GAobjectName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._GAobjectName = val;
        }
      });
      defineGetter(this, 'GAobjectName', function () {
        return this._GAobjectName;
      });
      defineSetter(this, 'GAoperationName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._GAoperationName = val;
        }
      });
       defineGetter(this, 'GAoperationName', function () {
        return this._GAoperationName;
      });
      defineSetter(this, 'fieldsData', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._fieldsData = val;
        }
      });
      defineGetter(this, 'fieldsData', function () {
        return this._fieldsData;
      });
       defineSetter(this, 'referenceCurrency', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._referenceCurrency = val;
        }
      });
      defineGetter(this, 'referenceCurrency', function () {
        return this._referenceCurrency;
      });
        defineSetter(this, 'dateFilterKeys', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._dateFilterKeys = val;
        }
      });
      defineGetter(this, 'dateFilterKeys', function () {
        return this._dateFilterKeys;
      });
        defineSetter(this, 'dateFilterLabels', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._dateFilterLabels = val;
        }
      });
      defineGetter(this, 'dateFilterLabels', function () {
        return this._dateFilterLabels;
      });
        defineSetter(this, 'amountFormat', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._amountFormat = val;
        }
      });
      defineGetter(this, 'amountFormat', function () {
        return this._amountFormat;
      });
       defineSetter(this, 'dateFormat', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._dateFormat = val;
        }
      });
      defineGetter(this, 'dateFormat', function () {
        return this._dateFormat;
      });
       defineSetter(this, 'backendDateFormat', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._backendDateFormat = val;
        }
      });
      defineGetter(this, 'backendDateFormat', function () {
        return this._backendDateFormat;
      });
       defineSetter(this, 'serviceResponseKey', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._serviceResponseKey = val;
        }
      });
      defineGetter(this, 'serviceResponseKey', function () {
        return this._serviceResponseKey;
      });
             defineSetter(this, 'errorText', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._errorText = val;
        }
      });
      defineGetter(this, 'errorText', function () {
        return this._errorText;
      });
      
        defineSetter(this, 'rowSeperatorSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._rowSeperatorSkin = val;
        }
      });
      defineGetter(this, 'rowSeperatorSkin', function () {
        return this._rowSeperatorSkin;
      });
       defineSetter(this, 'tableHeaderLabelSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._tableHeaderLabelSkin = val;
        }
      });
      defineGetter(this, 'tableHeaderLabelSkin', function () {
        return this._tableHeaderLabelSkin;
      });
        defineSetter(this, 'tableFieldLabelSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._tableFieldLabelSkin  = val;
        }
      });
      defineGetter(this, 'tableFieldLabelSkin', function () {
        return this._tableFieldLabelSkin;
      });
       defineSetter(this, 'calendarSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._calendarSkin  = val;
        }
      });
      defineGetter(this, 'calendarSkin', function () {
        return this._calendarSkin;
      });
    },

    makeDaoCallToViewTransactions: function(){
      try{
        let objectName = this.getFieldValue(this._objName);
        let objectServiceName = this.getFieldValue(this._objService);
        let operationName = this.getFieldValue(this._operationName);
        let criterion = this.getFieldValue(this._objCriteria);
        this.setCriteria(criterion);
        this.viewTransactionsDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),"",this.onServiceSuccess,this.onError);
        this.requestStart();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    setPortfolio: function(obj){
      this.portfolioId = obj.portfolioId;
      this.isEuro = obj.isEuro;
      this.mapInstrumentData(obj.instrumentDetails);
    },
    onServiceSuccess: function(response){
      this.currCode = response.referenceCurrency;
      this.view.flxPag.setVisibility(true);
      this.view.flxNoResults.setVisibility(false);
      let responseKey =  this.getFieldValue(this._serviceResponseKey);
      var data = response[responseKey];
      this.bindTrasactionsToSegment(data);
      this.view.paginationFooter.updatePaginationBar(Number(this.offset),Number(response.totalCount));
      this.requestEnd();
      this.clearCSS();
    },
    clearCSS: function() {
	 this.view.flxContent.height = kony.flex.USE_PREFERED_SIZE;
     this.view.forceLayout();
     var tempDom = document.querySelectorAll("[kwp='frmViewTransactions_viewTransactions_flxSeparatorSearch']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
     tempDom = document.querySelectorAll("[kwp='frmViewTransactions_viewTransactions_segTransactions']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
	 tempDom = document.querySelectorAll("[kwp='frmViewTransactions_viewTransactions_flxSeg']")
      if (tempDom && tempDom[0]) {
         tempDom[0].style.removeProperty("align-self");
      }
      tempDom = document.querySelectorAll("[kwp='frmViewTransactions_viewTransactions_flxSeparatorHeadings']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
	  tempDom = document.querySelectorAll("[kwp='frmViewTransactions_viewTransactions_flxHeadings']")
      if (tempDom && tempDom[0]) {
        tempDom[0].style.removeProperty("align-self");
      }
      if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
         tempDom = document.querySelectorAll("[kwp='frmViewTransactions_viewTransactions_flxTransactionsWrapper']")
      if (tempDom && tempDom[0]) {
        tempDom[0].scrollLeft = tempDom[0].scrollWidth;
        }
      }
      
    },
    mapInstrumentData: function(dataObj) {
            this.instrumentId = dataObj.holdingsId || dataObj.instrumentId;
            this.view.lblCorp.text = dataObj.description || dataObj.instrumentName;
            if ((dataObj.ISIN || dataObj.ISINCode) && (dataObj.holdingsType || dataObj.stockExchange)) {
                this.view.lblCode.text = (dataObj.ISIN || dataObj.ISINCode)+ " | " + (dataObj.holdingsType || dataObj.stockExchange);
            } else {
                this.view.lblCode.text = (dataObj.ISIN || dataObj.ISINCode) || dataObj.holdingsType
            }
        },
     onBreakPointChangeComponent: function(form, formWidth,portfolioId,isEuro) {
      var scope = this;
      this.width=formWidth;
      this.portfolioId=portfolioId;
      this.isEuro=isEuro;
      if(this.isEuro){
        this.FormatUtils.setEuropeFormat();
      }
        this.preShow();
      //  this.view.segRemaining.
    },
    preShow:function(){  
      this.view.flxPag.setVisibility(true);
       var scope = this;
      this.formattingJSON = {
          "amountFormat" : JSON.parse(this._amountFormat),
          "dateFormat" : this._dateFormat,
          "backenddateformat" : this._backendDateFormat,
      };
      this.skins = {
        ROW_SEPERATOR_SKIN: scope._rowSeperatorSkin ,
        HEADER_LABEL_SKIN: scope._tableHeaderLabelSkin ,
        CALENDAR_SKIN: scope._calendarSkin
      };
        this.formatSkins = {
          TEXT_SKIN : scope._tableFieldLabelSkin,
          DATE_SKIN : scope._tableFieldLabelSkin,
          PERCENTAGE_SKIN : scope._tableFieldLabelSkin
        };
      this.criteria = {};    
      this.view.paginationFooter.resetStartIndex();
      this.view.paginationFooter.collapseDropDown();
      this.dateLabel=this.getFieldValue(this._dateFilterLabels);
      this.dateKeys =this.getFieldValue(this._dateFilterKeys);
      this.dateKey = this._defaultDateFilterKey;
      if((this.dateLabel !== "") && (this.dateKeys !== "")){
      this.dateLabelArr = this.dateLabel.split(",");
      this.dateKeyArr = this.dateKeys.split(",");
      }
      this.view.datePicker.setUpDateFilter(this.dateLabel,this.dateKeys,'');
	  this.setDefaultParams();
      this.setRequestParams();
      this.setContext(this.params);
      this.view.flxCalImg.onClick = this.showCalendars;
      this.initActions();
      this.view.flxCalWhole.isVisible=false;
      this.view.paginationFooter.setPaginationLabelText({
        "default": "{$.t.currentPage}  " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " {$.t.totalPages} " + kony.i18n.getLocalizedString("i18n.konybb.Common.Pages"),
        "$.BREAKPTS.BP1": "{$.t.currentPage}  " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + "  {$.t.totalPages} " + kony.i18n.getLocalizedString("i18n.konybb.Common.Pages")
      });
      this.clearCSS();
    },
    postShow:function(){  
      this.view.paginationFooter.height = 100;
      if (kony.i18n.getCurrentLocale() === "ar_AE")
      this.view.lblHeading1.left = "30dp"
    },
   
    makeDaoCallForPrintDownload: function(params){
      var self =this;
      try{
        let objectName = this.getFieldValue(this._GAobjectName);
        let objectServiceName = this.getFieldValue(this._GAobjectServiceName);
        let operationName = this.getFieldValue(this._GAoperationName);
		var criteria = {
                    "navPage": "InstrumentTransactions",
                    "sortBy": this.sortBy,
                    "portfolioId": this.portfolioId,
					"instrumentId": this.instrumentId,
					"startDate": this.startDate,
					"endDate": this.endDate,
					"sortOrder": this.sorting,
		            "isEuro": this.isEuro,
                    "downloadFormat":"pdf"
                };
        if(params==="Print")
        {
          this.viewTransactionsDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,"",this.onSuccessPrint,this.onError);
        }
        else{
          this.viewTransactionsDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,"",this.onSuccessDownloadWl,this.onError);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },  
    setContext:function(context){
      var self = this;
      try
      {
        this.context=context;
        this.parserUtilsManager.setContext(this.context);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component getCriteria
     * Parse the criteria from configuration
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria:function(){
      var self = this;
      try{
        return this.criteria;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
      return "";
    },
    //onSuccessDownloadWl
    onSuccessDownloadWl: function(response,unicode){
      const linkSource = `data:application/pdf;base64,${response.base64}`;
      const downloadLink = document.createElement("a");
      const fileName = "InstrumentTransactions.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },
    // method which converts base64 to Blob
    b64toBlob:function(content,contentType){
      contentType = contentType || '';
      const sliceSize = 512;
      // method which converts base64 to binary
      const byteCharacters = window.atob(content); 
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {
        type: contentType
      }); // statement which creates the blob
      return blob;
    },
     //PrintPreview
    printPreview:function(data,type){
      var scope = this;
      let blob = null;
      applicationManager.getPresentationUtility().showLoadingScreen();
      blob = this.b64toBlob(data, type);
      const blobURL = URL.createObjectURL(blob);
      // Create a hidden iframe
      var iframe = document.getElementById("printIframe");
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.id = 'printIframe';
      }
      // Set the iframe source to the Blob URL
      iframe.src = blobURL;
      document.body.appendChild(iframe);
      // Wait for the iframe to load, then print the content
      iframe.onload = function() {
        setTimeout(scope.printPDFPreview(iframe), 1000);
      };
    },

     printPDFPreview: function(iframe) {
      iframe.contentWindow.print();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    //OnSuccessprint
    onSuccessPrint: function(response,unicode) {	
      this.printPreview(response.base64,'application/pdf');
    }, 
	
    setDefaultParams: function(){
      this.resetWidgetsrc();
      var today = new Date();
      var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
      this.sortBy = "tradeDate";
      this.sorting= "desc";
      this.startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
      this.endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
       this.view.imgSort1.src =this.sortDesc;
      this.view.imgSort1Tab.src =this.sortDesc;
       this.view.datePicker.setDefaultDateFilter(this.dateKey);
       let ind = this.dateKeyArr.indexOf(this.dateKey);
       this.dateText = this.getFieldValue(this.dateLabelArr[ind]);
       this.view.lblAutoDays.text = this.dateText;
    },
     setRequestParams: function(){
       this.params = {
         "endDate": this.endDate,
         "pageOffset": this.offset,
         "pageSize": this.noOfRecords,
         "portfolioId": this.portfolioId,
         "instrumentId": this.instrumentId,
         "sortBy": this.sortBy,
         "sortOrder": this.sorting,
         "startDate": this.startDate,
         "downloadFormat":"pdf"
       };

     },
    initActions: function(){
      var self = this;
      try
      {
        this.view.imgDownload.onTouchEnd=this.transactionsDownload;
        this.view.imgPrint.onTouchEnd=this.transactionsPrint;
        this.makeDaoCallToViewTransactions();
        this.view.paginationFooter.fetchPaginatedRecords=this.footerPage;
       this.view.datePicker.updateDates = function (dateObj){  
         self.offset = "0";
         self.view.paginationFooter.resetStartIndex();
         self.view.paginationFooter.collapseDropDown();
           self.startDate =dateObj.startDate;
           self.endDate = dateObj.endDate;        
           self.view.lblAutoDays.text = dateObj.dateText;
          self.view.flxCalWhole.setVisibility(false);
         self.changeDateFormat();
          self.manualClear();
          self.dateText = dateObj.dateText;
          self.dateKey = dateObj.dateKey;
        }

      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
   
    //txnDownload
    transactionsDownload: function(){
      this.makeDaoCallForPrintDownload("Download");
    },

    //txnPrint
    transactionsPrint: function(){
      this.makeDaoCallForPrintDownload("Print");
    },

    getAttachments: function() {
      var self =this;
      try
      {
        this.requestStart();
        var criteriaObject = JSON.parse(this._GAcriteria);
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        if(this._GAobjectServiceName && this._GAobjectName && this._GAoperationName){
          this.transactionListDAO.fetchAttachments(this._GAobjectServiceName,this._GAoperationName,this._GAobjectName,criteriaObject,this.setRowData,this.setRowData);
        }
        else{
          this.setRowData();
        }    
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in doing service call to  Get attachments",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
     * Component setCriteria
     * Update the criteria based on accountType ans filter
     * criteria {string} - value collected from exposed contract
     */
    setCriteria:function(criteria){
      var self = this;
      try
      {
        var criteriaObject = criteria;
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        var criteriaJSON = criteria;
        if(typeof(criteria) == "string"){
          criteriaJSON = JSON.parse(criteria);
        }
        for(var key in  criteriaJSON){
          criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
        }
        this.criteria = criteriaObject;

  		if(this.criteria["pageOffset"] ==  "pageOffset"){
					this.criteria["pageOffset"] = "0";
				}
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        this.onError(errorObj);
      }
    },
    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) === "string"){
          value = JSON.parse(Value);
        }
        
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)==="string")
            return this.getProcessedText(value);
          else{
            var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(text);
          }
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },

    /**
     * Component breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint
     * inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
    breakPointParser:function(inputJSON,lookUpKey){
      var self = this;
      try
      {
        if(inputJSON.hasOwnProperty(lookUpKey)){
          return inputJSON[lookUpKey];
        }
        else if(inputJSON.hasOwnProperty("default")){
          return inputJSON["default"];
        }
        return inputJSON;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in parsing th break point",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * Component getProcessedText
     * Pass the text to format util to obtained the processed value.
     * text {string} - value to be processed
     * @return : {string} - processed value
     */
    getProcessedText:function(text){
      return this.parserUtilsManager.getParsedValue(text);
    },
    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },
       changeDateFormat : function(){
	  var st  = new Date(this.startDate);
	  var e  = new Date(this.endDate);
	    this.startDate = st.getFullYear() + '-' + ('0' + (st.getMonth() + 1)).slice(-2) + '-' + ('0' + st.getDate()).slice(-2);
	    this.endDate = e.getFullYear() + '-' + ('0' + (e.getMonth() + 1)).slice(-2) + '-' + ('0' + e.getDate()).slice(-2);
    },
    onError: function(errorObj){
      this.requestEnd();
      this.view.flxPag.setVisibility(false);
       this.view.segTransactions.removeAll();
        this.view.segTransactionsColumn1Tab.removeAll();
        this.view.segTransactionsTabletRemaining.removeAll();
        this.view.flxSeg.setVisibility(false);
        this.view.flxSegmentTablet.setVisibility(false);
        if (this.view.flxCalendar.isVisible) {
        if (this.dateText.includes("-")) {
          this.view.rtxNoPaymentMessage.text = this.getFieldValue(this._errorText) + " " + kony.i18n.getLocalizedString("i18n.between") + " " + this.dateText.toLowerCase();
        } else {
          this.view.rtxNoPaymentMessage.text = this.getFieldValue(this._errorText) + " " + kony.i18n.getLocalizedString("i18n.wealth.forThe") + " " + this.dateText.toLowerCase();
        }
      }
        this.view.flxNoResults.setVisibility(true);
    },
  	setWidgetMapping: function(){
      var scopeObj = this;
          var widgetDataMapTrans = {
            "lbl1": "lbl1",
            "lbl2": "lbl2",
            "lbl3": "lbl3",
            "lbl4": "lbl4",
            "lbl5": "lbl5",
            "lbl6": "lbl6",
            "lbl7": "lbl7",
            "lbl8": "lbl8",
            "lbl9": "lbl9",
            "lbl10": "lbl10",
            "flx1": "flx1",
            "flx2": "flx2",
            "flx3": "flx3",
            "flx4": "flx4",
            "flx5": "flx5",
            "flx6": "flx6",
            "flx7": "flx7",
            "flx8": "flx8",
            "flx9": "flx9",
            "flx10": "flx10"
          };
       var widgetDataMapTabTrans = {
            "lbl2": "lbl2",
            "lbl3": "lbl3",
            "lbl4": "lbl4",
            "lbl5": "lbl5",
            "lbl6": "lbl6",
            "lbl7": "lbl7",
            "lbl8": "lbl8",
            "lbl9": "lbl9",
            "lbl10": "lbl10",
            "flx2": "flx2",
            "flx3": "flx3",
            "flx4": "flx4",
            "flx5": "flx5",
            "flx6": "flx6",
            "flx7": "flx7",
            "flx8": "flx8",
            "flx9": "flx9",
            "flx10": "flx10"
          };
      var widgetDataMapColumnOne = {
        "lbl1":"lbl1"
      }
         this.view.segTransactions.widgetDataMap = widgetDataMapTrans;
        this.view.segTransactionsColumn1Tab.widgetDataMap = widgetDataMapColumnOne;
        this.view.segTransactionsTabletRemaining.widgetDataMap = widgetDataMapTabTrans; 
         
    },
    setUpFirstFixedColumnForTablet: function(dispName, colVal, typeVal, currVal, allData){
      this.view.lblHeading1Tab.text = dispName;
      var segTabColOneData = [];
      var tabData;
      for(var g in allData){
        var rowData = allData[g];
		if(colVal[g] == "fees"){
          tabData = {
          "lbl1": this.FormatUtils.formatText(rowData[colVal], typeVal, this.formatSkins, this.formattingJSON, rowData.feesCurrency),
        };
        }	
        else if(colVal[g] == "limitPrice" || colVal[g] == "netAmount"){
          tabData = {
          "lbl1": this.FormatUtils.formatText(rowData[colVal], typeVal, this.formatSkins, this.formattingJSON, rowData.instrumentCurrency),
        };
        }
        else{
        tabData = {
          //"lbl1": this.FormatUtils.formatText(rowData[colVal], typeVal, this.formatSkins, this.formattingJSON, this.currCode),
          "lbl1": this.FormatUtils.formatText(rowData[colVal], typeVal, this.formatSkins, this.formattingJSON, rowData.referenceCurrency),
        };
        }
        segTabColOneData.push(tabData);
      }
      this.view.segTransactionsColumn1Tab.setData(segTabColOneData);
    },
    bindTrasactionsToSegment: function(data) {
      this.sortColumnValues = [];
      let displayNames = [];
      let columnValues = [];
      let currencies = [];
      var transactionSegmentData = [];
      let types = [];
      if (Object.keys(data).length === 0 || data === undefined) {
		this.onError();
      } else {
        if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
          this.view.flxSegmentTablet.setVisibility(true);
          this.view.flxSeg.setVisibility(false);
          this.setWidgetMapping();
          let fieldsObjTab =  this.getFieldValue(this._fieldsData);
          let objectLengthTab = Object.keys(fieldsObjTab).length;
          let headerOneDisplayName = this.getFieldValue(fieldsObjTab["One"].displayName);
          let headerOneColumn =  this.getFieldValue(fieldsObjTab["One"].value);
          let headerOneType = this.getFieldValue(fieldsObjTab["One"].type);
          let headerOneCurr = this.getFieldValue(fieldsObjTab["One"].currency);
          this.setUpFirstFixedColumnForTablet(headerOneDisplayName,headerOneColumn,headerOneType, headerOneCurr, data);
          for (var num = 2; num <= objectLengthTab; num++) {
            var tabTemp = this.numberMapping[String(num)];
            displayNames.push(this.getFieldValue(fieldsObjTab[tabTemp].displayName));
            columnValues.push(fieldsObjTab[tabTemp].value);
            types.push(fieldsObjTab[tabTemp].type);
            if ((fieldsObjTab[tabTemp].currency !== undefined) || (fieldsObjTab[tabTemp].currency !== "")) {
              currencies.push(fieldsObjTab[tabTemp].currency);
            } else {
              currencies.push("");
            }
          }

			this.setUpHeadersTab(displayNames);
            for (var n in data) {
            var storeTabData = this.getSegmentRowDataTab(columnValues, displayNames,currencies, types, data[n]);
            transactionSegmentData.push(storeTabData);
          }
          columnValues.splice(0, 0, headerOneColumn);
		  this.sortColumnValues = columnValues;
          this.view.segTransactionsTabletRemaining.setData(transactionSegmentData);
          
        }
        else{
          this.view.flxSegmentTablet.setVisibility(false);
          this.view.flxSeg.setVisibility(true);
          let fieldsObj =  this.getFieldValue(this._fieldsData);
          let objectLength = Object.keys(fieldsObj).length;
          for (var i = 1; i <= objectLength; i++) {
            var temp = this.numberMapping[String(i)];
            displayNames.push(this.getFieldValue(fieldsObj[temp].displayName));
            columnValues.push(fieldsObj[temp].value);
            types.push(fieldsObj[temp].type);
            if ((fieldsObj[temp].currency !== undefined) || (fieldsObj[temp].currency !== "")) {
              currencies.push(fieldsObj[temp].currency);
            } else {
              currencies.push("");
            }
          }
          this.setWidgetMapping();
          this.setUpHeaders(displayNames);
          for (var num1 in data) {
            var storeData = this.getSegmentRowData(columnValues, displayNames,currencies, types, data[num1]);
            transactionSegmentData.push(storeData);
          }
          this.sortColumnValues = columnValues;
          this.view.segTransactions.setData(transactionSegmentData);
        }
        this.view.forceLayout();
        this.clearCSS();
      } 
    },
   getSegmentRowDataTab: function(colTabArr, headerNamesTabArr, currTabArr, typesTabArr, rowTabData){
      let lblIndex = 0;
      let storeData = {};
      let columnArrLen =  colTabArr.length;
      if(columnArrLen <= 9){
        let segWidthTab = parseInt(100/columnArrLen);
      for (var i = 0; i < columnArrLen; i++) {
        var val = {};
        var flxVal = {};
		if(colTabArr[i] == "fees")	{
		val = this.FormatUtils.formatText(rowTabData[colTabArr[i]], typesTabArr[i], this.formatSkins, this.formattingJSON, rowTabData.feesCurrency);
		}	
        else if(colTabArr[i] == "limitPrice" || colTabArr[i] == "netAmount")
        val = this.FormatUtils.formatText(rowTabData[colTabArr[i]], typesTabArr[i], this.formatSkins, this.formattingJSON, rowTabData.instrumentCurrency);
        //val = this.FormatUtils.formatText(rowTabData[colTabArr[i]], typesTabArr[i], this.formatSkins, this.formattingJSON, this.currCode);
        else
       val = this.FormatUtils.formatText(rowTabData[colTabArr[i]], typesTabArr[i], this.formatSkins, this.formattingJSON, rowTabData.referenceCurrency);
        lblIndex = Number(i) + 2;
        storeData["lbl" + lblIndex] = val;
          if(columnArrLen < 9){
          if(i < columnArrLen){
              flxVal["width"] =  segWidthTab + "%";
               flxVal["isVisible"] =  true;
            }
          else{
             flxVal["isVisible"] =  false;
          }
        }
        else{
          flxVal["width"]  =this.getWidthBasedonText(headerNamesTabArr[i],Number(i)+2) ;
        }
        storeData["flx" + lblIndex] = flxVal;
      }
    }
      return storeData;
   },
    getSegmentRowData: function(colArr, headerNamesArr, currArr, typesArr, rowData) {
      let lblIndex = 0;
      let storeData = {};
      let columnArrLen =  colArr.length;
      if(columnArrLen <= 10){
      for (var i = 0; i < columnArrLen; i++) {
        var val = {};
        var flxVal = {};
		if(colArr[i] == "fees")	{
		val = this.FormatUtils.formatText(rowData[colArr[i]], typesArr[i], this.formatSkins, this.formattingJSON, rowData.feesCurrency);
        }	
        else if(colArr[i] == "limitPrice" || colArr[i] == "netAmount" )
        val = this.FormatUtils.formatText(rowData[colArr[i]], typesArr[i], this.formatSkins, this.formattingJSON, rowData.instrumentCurrency);
       //val = this.FormatUtils.formatText(rowData[colArr[i]], typesArr[i], this.formatSkins, this.formattingJSON, this.currCode);
        else
        val = this.FormatUtils.formatText(rowData[colArr[i]], typesArr[i], this.formatSkins, this.formattingJSON, rowData.referenceCurrency);
        lblIndex = Number(i) + 1;
        storeData["lbl" + lblIndex] = val;
        if(columnArrLen < 10){
          let segWidth = parseInt(100/columnArrLen);
          if(i < columnArrLen){
              flxVal["width"] =  segWidth + "%";
               flxVal["isVisible"] =  true;
            }
          else{
             flxVal["isVisible"] =  false;
          }
        }
        else{
          flxVal["width"]  = this.getWidthBasedonText(headerNamesArr[i],i) ;
        }
        storeData["flx" + lblIndex] = flxVal;
      }
    }
      return storeData;
    },
    getWidthBasedonText: function(displayName, num){
      var isTab = false;
       if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
         isTab = true;
       }
      if(num!== 0){
        if(displayName.length === 5){
          if(isTab) return "10.5%";
          else 
           // return "9%";
	   return "10.75%"
        }
        else if(displayName.length < 5){
            if(isTab) return "9.7%";
         // else
           // {
           //if( displayName.startsWith("Qty.") ) 
		   //return "8.5%";
			else 
			//return "8.5%";
		return "10%"
        
		}
        else if(displayName.length > 8){
          if(isTab) return "12.9%";
          else
          //return "11.7%";
	  return "10%";
        }
        else{
           if(isTab) return "10.9%";
          else
          //return "9.8%";
	  return "10%";
        }
      }
      else{
         if(isTab) return "12.6%";
          else
        //return "10.5%";
		return "8.5%";
      }
    },
    setUpHeadersTab: function(dispNamesTab){
      let headingTabId ;
      let headerTabLabel;
      let noOfRemColumns = dispNamesTab.length;
      var self = this;
      try{
        if(noOfRemColumns <= 9){
          for(var i=0;i<noOfRemColumns;i++){
            headingTabId = i;
            headerTabLabel = this.view.flxHeadingTabletRemaining.widgets()[headingTabId].widgets()[0];
             if(noOfRemColumns < 9){
              let flxWidth = parseInt(100/noOfRemColumns);
              if(i < noOfRemColumns){
                this.view.flxHeadingTabletRemaining.widgets()[headingTabId].width = flxWidth + "%";
                this.view.flxHeadingTabletRemaining.widgets()[headingTabId].isVisible =  true;
              }
              else{
                this.view.flxHeadingTabletRemaining.widgets()[headingTabId].isVisible =  false;
              }
            }
            else{
               this.view.flxHeadingTabletRemaining.widgets()[headingTabId].width = this.getWidthBasedonText(dispNamesTab[i],i+2); 
              
            }
            headerTabLabel.text = dispNamesTab[i];          
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting up header",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    setUpHeaders: function(headerNamesArr){
      let headingId ;
      let headerLabel;
      let noOfColumns = headerNamesArr.length;
      var self = this;
      try{
        if(noOfColumns <= 10){
          for(var i=0;i<noOfColumns;i++){
            headingId = i;
            headerLabel = this.view.flxHeadings.widgets()[headingId].widgets()[0];
            if(noOfColumns < 10){
              let flxWidth = parseInt(100/noOfColumns);
              if(i < noOfColumns){
                this.view.flxHeadings.widgets()[headingId].width = flxWidth + "%";
                this.view.flxHeadings.widgets()[headingId].isVisible =  true;
              }
              else{
                this.view.flxHeadings.widgets()[headingId].isVisible =  false;
              }
            }
            else{
               this.view.flxHeadings.widgets()[headingId].width = this.getWidthBasedonText(headerNamesArr[i],i) ;
            }
            headerLabel.text = headerNamesArr[i];          
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting up header",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onClickSort: function(option, widget) {
      if(this.sortColumnValues[option]!== "" || this.sortColumnValues[option]!== undefined){
        this.sortBy = this.sortColumnValues[option];
      }
      else{
        this.sortBy = "tradeDate";
      }
      this.setImage(option, widget);
      this.refreshSegment();
    },
    setImage: function(option, widget) {
      var tempSrc;
      if (widget.src === this.sortNone) {
        tempSrc =  this.sortAsc;
        this.sorting = "asc";
      } else if (widget.src === this.sortAsc) {
        tempSrc = this.sortDesc;
        this.sorting = "desc";
      } else {
        tempSrc = this.sortAsc;
        this.sorting = "asc";
      }
      this.resetWidgetsrc();
      widget.src = tempSrc;
    },
    resetWidgetsrc: function(){
      this.view.imgSort1.src = this.sortNone;
      this.view.imgSort2.src = this.sortNone;
      this.view.imgSort3.src = this.sortNone;
      this.view.imgSort4.src = this.sortNone;
      this.view.imgSort5.src = this.sortNone;
      this.view.imgSort6.src = this.sortNone;
      this.view.imgSort7.src = this.sortNone;
      this.view.imgSort8.src = this.sortNone;
      this.view.imgSort9.src = this.sortNone;
      this.view.imgSort10.src = this.sortNone;
      // tablet  
      this.view.imgSort1Tab.src = this.sortNone;
      this.view.imgSort2Tab.src = this.sortNone;
      this.view.imgSort3Tab.src = this.sortNone;
      this.view.imgSort4Tab.src = this.sortNone;
      this.view.imgSort5Tab.src = this.sortNone;
      this.view.imgSort6Tab.src = this.sortNone;
      this.view.imgSort7Tab.src = this.sortNone;
      this.view.imgSort8Tab.src = this.sortNone;
      this.view.imgSort9Tab.src = this.sortNone;
      this.view.imgSort10Tab.src = this.sortNone;
    },//
    refreshSegment: function(){
      this.setRequestParams();
      this.setContext(this.params);
      this.makeDaoCallToViewTransactions();
      this.clearCSS();
    },
    footerPage:function(offset,limit){
      this.offset = offset;
      this.noOfRecords=limit;
      this.refreshSegment();
    },
//datePickerMethods
      returnCurrComponent: function(){
      return this.view;
    },
    
    showCalendars:function(){
       this.view.datePicker.resetCalendar();
      if(this.view.flxCalWhole.isVisible) {
          this.view.flxCalWhole.left = "2%";
        if((this.dateText !== "") && (this.dateKey !== "")){
         
            this.view.flxInsideCalendar.skin = "skne3e3e3br3pxradius";
            this.view.lblAutoDays.text =  this.dateText;
          
          this.view.datePicker.setDefaultDateFilter(this.dateKey);
          
           this.view.flxCalWhole.isVisible = false;
        }
        else{
          
             this.view.flxInsideCalendar.skin = "skne3e3e3br3pxradius";
            this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
         
         
        }
      }
      else{
        
            this.view.flxInsideCalendar.skin = "ICSknFlxffffffBorder003e751pxRadius3px";
            this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
         
       // this.showCalendarWithPrevDates(this.view.lblAutoDays.text);
        this.view.flxCalWhole.setVisibility(true);
        }
      kony.application.getCurrentForm().forceLayout();
    },
   
//     call this function to set the date when user comes back to calender without previously setting any date, i.e. w/o clicking on apply.
    showCalendarWithPrevDates:function(combinedDate){
    var fromDateVal="";
	var toDate="";
	
      fromDateVal= this.dateToStringWithHipehens(this.startDate);
      toDate= this.dateToStringWithHipehens(this.endDate);
	
      var month = fromDateVal.split("/")[0];
      var fromDate = fromDateVal.split("/")[1];
      var year = fromDateVal.split("/")[2];
     // this.fromDateCalcOnBtnSelection(this.dateToString(fromDateVal)); //not necessary though
      this.view.datePicker.setSelectedDate(fromDateVal);
      this.view.datePicker.setMonthLabelText();
      // for toDate
      this.view.datePicker.setSelectedDateTo(toDate);
      this.view.datePicker.setMonthLabelTextTo();
     // this.enableButton(this.view.btnApply);
      
      if(combinedDate.includes("-")){ //if textbox previously contained Previous labels
       
          this.view.lblAutoDays.text = fromDateVal+"-"+toDate;
        
        
      }else{
        
          this.view.lblAutoDays.text = combinedDate;
        
      }
      this.view.flxCalWhole.isVisible = false;
    },
    
     dateToStringYearFirst: function (dateObj) {
          return ((dateObj.split("/")[2]) + "-" + (dateObj.split("/")[0]) + "-" + (dateObj.split("/")[1]));
    },
    dateToString: function (dateObj) {
      if (dateObj instanceof Date) {
        if (!isNaN(dateObj.getTime())) {
          return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());
        }
      }
      return "";
    },

     dateToStringWithHipehens: function (dateObj) {
          return ((dateObj.split("-")[1]) + "/" + (dateObj.split("-")[2]) + "/" + (dateObj.split("-")[0]));
    },
      manualClear: function(){
//       this.resetSortValues();
//       this.resetPagination();
      this.refreshSegment();
    },

  };
});