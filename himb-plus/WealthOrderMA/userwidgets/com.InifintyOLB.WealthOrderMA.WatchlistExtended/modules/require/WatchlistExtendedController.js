define(['./watchlistDAO','./ParserUtilsManager','./FormatUtils','CommonUtilities', './CacheUtils','./ViewConstants'],function(watchlistDAO,ParserUtilsManager,FormatUtils,CommonUtilities,CacheUtils,ViewConstants) {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.orientationHandler = new OrientationHandler();
      //custom properties
      this.downloadFormat="pdf",
      this.accountsListObj = {},
      this.portFolioId = "",
      this.instruData = {};
      this.offset = "0";
      this.noOfRecords = "10";
      this._objService="";
      this._objName="";
      this._operation="";
      this._GAcriteria="";
      this.parserUtilsManager = new ParserUtilsManager();
      this.watchlistDAO = new watchlistDAO();
      this.FormatUtils = new FormatUtils();
      this.selectedRadioOptionText = "";
      this.selectedRadioOption = "";
      this.prefix = "";
      this._criteria = {};
      this._GAobjectServiceName="";
      this._GAobjectName="";
      this._GAoperationName="";
      this.sortData="instrumentName";
      this.sortBy = "instrumentName";
      this.sorting= "asc";
      this.decimelValue = 0;
      this.value =0;
      this.sortType="asc";
      this.width = "";
      this.clickdata = [];
      this.enableFlag =  false;
	  this.prevClick = 0;
      this.prev = 0;
      this.curr = 0;
      this.previousIndex = 0;
	  this.objectData = {};
      this.flag = true;
	  this.contextualFlag = true; //IW-3973 
      this.contextualFlagTab = true; //IW-3973
      this.sortNone=ViewConstants.IMAGES.SORTING;
      this.sortAsc=ViewConstants.IMAGES.SORTING_PREVIOUS;
      this.sortDesc=ViewConstants.IMAGES.SORTING_NEXT;
      this.view.imgSortInstrument.onTouchEnd = this.onClickSort.bind(this, 0, this.view.imgSortInstrument);
      this.view.imgSortCurrency.onTouchEnd = this.onClickSort.bind(this, 1, this.view.imgSortCurrency);
      this.view.imgSortLatest.onTouchEnd = this.onClickSort.bind(this, 2, this.view.imgSortLatest);
      this.view.imgSortChange.onTouchEnd = this.onClickSort.bind(this, 3, this.view.imgSortChange);
      this.view.imgSortDateTime.onTouchEnd = this.onClickSort.bind(this, 4, this.view.imgSortDateTime);
      this.view.imgSortBid.onTouchEnd = this.onClickSort.bind(this, 5, this.view.imgSortBid);
      this.view.imgSortAsk.onTouchEnd = this.onClickSort.bind(this, 6, this.view.imgSortAsk);
      this.view.imgSortVolume.onTouchEnd = this.onClickSort.bind(this, 7, this.view.imgSortVolume);
      // for tablet
      this.view.imgSortTabletInstrument.onTouchEnd = this.onClickSort.bind(this, 0, this.view.imgSortTabletInstrument);
      this.view.imgSortTabletCurrency.onTouchEnd = this.onClickSort.bind(this, 1, this.view.imgSortTabletCurrency);
      this.view.imgSortTabletLatest.onTouchEnd = this.onClickSort.bind(this, 2, this.view.imgSortTabletLatest);
      this.view.imgSortTabletChange.onTouchEnd = this.onClickSort.bind(this, 3, this.view.imgSortTabletChange);
      this.view.imgSortTabletDateTime.onTouchEnd = this.onClickSort.bind(this, 4, this.view.imgSortTabletDateTime);
      this.view.imgSortTabletBid.onTouchEnd = this.onClickSort.bind(this, 5, this.view.imgSortTabletBid);
      this.view.imgSortTabletAsk.onTouchEnd = this.onClickSort.bind(this, 6, this.view.imgSortTabletAsk);
      this.view.imgSortTabletVolume.onTouchEnd = this.onClickSort.bind(this, 7, this.view.imgSortTabletVolume);

      defineSetter(this, 'objService', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objService = val;
        }
      });
      defineGetter(this, 'objService', function () {
        return this._objService;
      });
      defineSetter(this, 'objName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objName = val;
        }
      });
      defineGetter(this, 'objName', function () {
        return this._objName;
      });
      defineSetter(this, 'operation', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._operation = val;
        }
      });
      defineGetter(this, 'operation', function () {
        return this._operation;
      });
      defineSetter(this, 'criteria', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._criteria = val;
        }
      });
      defineGetter(this, 'criteria', function () {
        return this._criteria;
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
    },
    makeDaoDeleteWatchlist: function(){
      try{
        let objectName = "Watchlist";
        let objectServiceName = "WealthOrder";
        let operationName = "updateWatchlistDB";
        let serviceResponseIdentifier = "S1";
        var criteria = {
          "RICCode": this.instruData.RICCode,
          "instrumentId": this.instruData.instrumentId,
          "operation": "Remove",
		  "application": this.instruData.application
        };

        this.watchlistDAO.updateUserFavouriteInstruments(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onDeleteServiceSuccess,this.onError);
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

    makeDaoCallWatchList: function(){
      try{
        let objectName = this.getFieldValue(eval("this._objName"));
        let objectServiceName = this.getFieldValue(eval("this._objService"));
        let operationName = this.getFieldValue(eval("this._operation"));
        let serviceResponseIdentifier = "S1";
        var criteria = {
          "sortBy" : this.sortData,
          "sortOrder" : this.sorting,
          "pageOffset": this.offset,
          "pageSize": this.noOfRecords,
          "portfolioId": this.portFolioId
        };

        this.watchlistDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
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
    onDeleteServiceSuccess: function(response){
      var data = response.favoriteInstruments;
      this.makeDaoCallWatchList();
      this.view.watchlistActionsMenu.setVisibility(false);
    },
    onServiceSuccess: function(response){
      try{
      var data = response.favoriteInstruments;
      //       // WatchListDummy - Kindly remove this after the service call is provided
      //             data = applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy')!= undefined ? applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy') : data;
      //             if(applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy')=== undefined){
      //             for (let i in data) {
      //                 data[i].setPrice = "100";
      //                 data[i].priceCondition = "0";
      //                 data[i].btnText = kony.i18n.getLocalizedString("i18n.wealth.watchlist.setAlert");
      //                 data[i].removeVisibility = false;
      //             }
      //         }
      //             applicationManager.getNavigationManager().setCustomInfo('flxWatchListDummy', data);
      let tempFlag = false;
      this.previousIndex = -1;
      // WatchListDummy - Kindly remove this after the service call is provided
      let temp = [];
      let tempData = applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy') != undefined ? applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy') : data;
      for (let i = 0; i < data.length; i++) {
        tempFlag = false;
        for (let j in tempData) {
          if (data[i] !== undefined) {
            if (data[i].instrumentId === tempData[j].instrumentId) {
              temp.push(tempData[j])
              tempFlag = true;
              break;
            }
          }
        }
        if (!tempFlag) {
          temp.push(data[i]);
        }
      }
      data = temp;
      // if (applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy') === undefined) {
      for (let i in data) {
        if (data[i].setPrice === undefined) {
          data[i].setPrice = "";
          data[i].priceCondition = kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition");
          data[i].btnText = kony.i18n.getLocalizedString("i18n.wealth.watchlist.setAlert");
          data[i].removeVisibility = false;
        }
      }
      // }
      applicationManager.getNavigationManager().setCustomInfo('flxWatchListDummy', data);
      this.bindWatchlistInstruments(data);
      this.view.txtSear.onDone = this.onSearchBtnClick.bind(this, data);
      this.view.imgSear.onTouchEnd = this.onSearchBtnClick.bind(this, data);
      this.view.watchlistActionsComparativeMenu.segWatchlistActionsMenu.onRowClick= this.onRowclickWatchlistComparativeActions
      this.view.watchlistActionsMenu.segWatchlistActionsMenu.onRowClick = this.onRowclickWatchlistActions;
      this.view.watchlistActionsComparativeMenuTablet.segWatchlistActionsMenu.onRowClick= this.onRowclickWatchlistComparativeActions;
      this.view.watchlistActionsMenuTablet.segWatchlistActionsMenu.onRowClick = this.onRowclickWatchlistActions;
      this.view.paginationFooter.updatePaginationBar(Number(this.offset),Number(response.totalCount));
      this.requestEnd();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onServiceSuccess",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    
    clearRTL: function() {
      try{
			this.view.forceLayout();
      if (kony.application.getCurrentBreakpoint() === 1024) {


        if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
          var tempDom = document.querySelectorAll("[kwp='frmWatchlist_WatchlistExtended_flxHeadingTabletRemaining']")
          if (tempDom && tempDom[0]) {
            tempDom[0].style.removeProperty("align-self");
          }
          tempDom = document.querySelectorAll("[kwp='frmWatchlist_WatchlistExtended_flxSeparatorTabletHeadingsRemaining']")
          if (tempDom && tempDom[0]) {
            tempDom[0].style.removeProperty("align-self");
          }
          tempDom = document.querySelectorAll("[kwp='frmWatchlist_WatchlistExtended_segWatchlistTabletRemaining']")
          if (tempDom && tempDom[0]) {
            tempDom[0].style.removeProperty("align-self");
          }


          tempDom = document.querySelectorAll("[kwp='frmWatchlist_WatchlistExtended_flxRemaining']")
          if (tempDom && tempDom[0]) {
            tempDom[0].scrollLeft = tempDom[0].scrollWidth;
          }


        }
      }
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in clearRTL",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    
    preShow:function(){  
      try{
      this.criteria = {};
      var scope = this;
     // scope.view.onTouchEnd = this.hideContextualMenu;
      this.resetWidgetsrc();
      this.sortData="instrumentName";
      this.sortBy = "instrumentName";
      this.sorting= "asc";
      this.sortType="asc";
      this.view.imgSortInstrument.src= this.sortAsc;
      this.view.imgSortTabletInstrument.src= this.sortAsc;
	  this.view.txtSear.text="";
      this.view.paginationFooter.resetStartIndex();
      this.view.paginationFooter.collapseDropDown();
      /*var criteria = this.getFieldValue(eval("this._criteria"));
      if(criteria){
        this.noOfRecords =  criteria.pageSize?criteria.pageSize:20;
      }*/
      
      
      scope.initActions();
      this.accessibilityFocusSetup();
      this.view.watchlistActionsMenu.setVisibility(false);
      this.view.watchlistActionsComparativeMenu.isVisible=false;
      this.view.watchlistActionsMenuTablet.setVisibility(false);
      this.view.addRemoveInstrumentSearch.setPortfolioId(scope_WealthPresentationController.portofId);
      this.view.addRemoveInstrumentSearch.viewInstrumentDetails=this.viewInstrumentDetails;
      this.view.paginationFooter.setPaginationLabelText({
        "default": "{$.t.currentPage}  " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " {$.t.totalPages} " + kony.i18n.getLocalizedString("i18n.konybb.Common.Pages"),
        "$.BREAKPTS.BP1": "{$.t.currentPage}  " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + "  {$.t.totalPages} " + kony.i18n.getLocalizedString("i18n.konybb.Common.Pages")
      });
     }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in preShow",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    postShow:function(){  
      this.checkPermission();
      this.view.paginationFooter.height = 100;  
      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      this.accountsListObj = wealthModule.getAccountsListObj();
      for(var i=0; i<this.accountsListObj.length;i++) {
        if(this.accountsListObj[i].investmentType !== 'Advisory') {
           var portoId = this.accountsListObj[i].portfolioId;
          break;
        }
      }
      if(wealthModule.getPortfolioId() && scope_WealthPresentationController.watchlistFromPortfolio){
        this.portFolioId = wealthModule.getPortfolioId();
      }else{
        wealthModule.setPortfolioId(portoId);
        wealthModule.setPortfolioCurrency(this.accountsListObj[0].referenceCurrency);
        this.portFolioId = portoId;
      }
    },
    /*hideContextualMenu: function(){
      this.view.watchlistActionsMenu.setVisibility(false);
      this.view.watchlistActionsMenuTablet.setVisibility(false);
    },*/
    getTabServiceIdentifier: function(){
      var serIdentifier;
      if(this.prefix === "Three"){
        if(this.selectedRadioOption !== ""){
          serIdentifier = this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"Identifier"));
        }
      }
      else{
        serIdentifier = this.getFieldValue(eval("this._tab"+this.prefix+"Identifier"));
      }
      return serIdentifier;
    },

    setCriteriaBasedOnTab: function(){

      var criterion; var pref ;
      if(this.prefix == "Three"){
        if(this.selectedRadioOption !== ""){
          criterion = this.getFieldValue(eval("this._tab"+this.prefix+this.selectedRadioOption+"Criteria"));
          pref = this.prefix+this.selectedRadioOption;
        }
      }
      else{
        criterion = this.getFieldValue(eval("this._tab"+this.prefix+"Criteria"));
        pref = this.prefix;
      }
      this.setCriteria(criterion,pref);
    },

    makeDaoCallForPrintDownload: function(params){
      var self =this;
      try{
        let objectName = this.getFieldValue(eval("this._GAobjectName"));
        let objectServiceName = this.getFieldValue(eval("this._GAobjectServiceName"));
        let operationName = this.getFieldValue(eval("this._GAoperationName"));
        let serviceResponseIdentifier = this.getTabServiceIdentifier() || "S1";
        var criteria = {
          "navPage": "Watchlist",
          "sortBy": this.sortData,
          "sortOrder": this.sorting,
          "pageOffset": this.offset,
          "pageSize": this.noOfRecords,
          "portfolioId": this.portFolioId,
          "downloadFormat":"pdf"
        };
        if(params==="Print")
        {
          this.watchlistDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onSuccessPrint,this.onError);
        }
        else{
          this.watchlistDAO.fetchDetails(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onSuccessDownloadWl,this.onError);
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
              "errorInfo" : "Error in getCriteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
      return "";
    },
    //onSuccessDownloadWl
    onSuccessDownloadWl: function(response,unicode){
      // Create a Blob from the Base64 data
      
      const downloadLink = document.createElement("a");
      const byteCharacters = atob(response.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: 'application/octet-stream'
      });

      // Create a data URL from the Blob
      const dataUrl = URL.createObjectURL(blob);
      // Set the data URL as the href attribute and trigger download
      downloadLink.href = dataUrl;
      downloadLink.download = "Watchlist.pdf";
      downloadLink.target = "_blank"
      downloadLink.click();
    },
    // method which converts base64 to Blob
    b64toBlob:function(content,contentType){
      try{
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
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in b64toBlob",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    //PrintPreview
    printPreview:function(data,type){
      var scope = this;
      let blob = null;
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
	//ClearSearch
    closeIndicator: function(){
      if(this.view.txtSear.text){
        this.view.txtSear.skin="ICSknTbxSSP42424215px";
       // this.view.flxWithBorder.skin = "ICSknFlx003E75Border"; //skin active textbox
        this.view.flxClose.setVisibility(true);
      }
      else{
        //this.view.flxWithBorder.skin = "CopybbSknFlxBordere"; //skin textbox
          this.view.txtSear.skin="ICSknTbxPlaceholderSSP72727215px";
          this.view.flxClose.setVisibility(false);
      }
    },
    
        accessibilityFocusSetup: function() {
      let widgets = [
        [this.view.txtSear, this.view.flxWithBorder]
      ]
      for (let i = 0; i < widgets.length; i++) {
        this.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
      }
    },
          setA11yFoucsHandlers: function(textbox, flex, scopeObj){
            var oldOnBenginEditing = textbox.onBeginEditing;
            textbox.onBeginEditing = function(){
                if(oldOnBenginEditing)
                    oldOnBenginEditing();
                flex.skin = "sknFlxBorder003e751px";
            }
            var oldOnEndEditing = textbox.onEndEditing;
            textbox.onEndEditing = function(){
                if(oldOnEndEditing)
                    oldOnEndEditing();
                flex.skin = "sknFlxffffff2pxe3e3e3border";
            }
        },
    
    initActions: function(){
      var self = this;
      try
      {
        this.view.flxClose.setVisibility(false);
        this.view.imgDownload.onTouchEnd=this.watchlistDownload;
        this.view.imgPrint.onTouchEnd=this.watchlistPrint;
        this.makeDaoCallWatchList();
        this.view.paginationFooter.fetchPaginatedRecords=this.footerPage;
        this.view.flxClose.onTouchEnd=this.manualClear;
        this.view.txtSear.onKeyUp=this.closeIndicator;
        this.view.imgAdd.onTouchEnd = this.onPopup;
        this.view.lblAdd.onTouchEnd = this.onPopup;
        this.view.flxAddNewInstrument.onTouchEnd = this.onPopup;
        this.view.flxAddOrRemoveInstrument.onTouchEnd = this.onPopup;
        this.view.flxExtra.onTouchEnd = this.onPopup;
        this.view.addRemoveInstrumentSearch.onTouchEnd = this.onPopup;
        this.view.imgClosePopup.onTouchEnd = this.closePopup;


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
    closePopUp : function(){
      //this.view.AlertPopup.setVisibility(false);
    },
    onSearchBtnClick: function(dataList) {
      var scopeObj = this;
      this.previousIndex = -1;
      var data1 = scopeObj.getSearchData(dataList);
      this.bindWatchlistInstruments(data1);
      scopeObj.view.forceLayout();
    },
     manualClear: function(){
      this.view.txtSear.text="";
      this.searchText=this.view.txtSear.text;
      this.view.flxClose.setVisibility(false);
      this.view.txtSear.setFocus(false);
      //this.view.flxWithBorder.skin = "CopybbSknFlxBordere"; //skin textBox
      this.refreshSegment();
    },
    //watchlistDownload
    watchlistDownload: function(){
      this.makeDaoCallForPrintDownload("Download");
    },
    closePopup : function(){
      this.view.flxAddIstrumentMain.isVisible=false;
      this.view.flxAddNewInstrument.skin = "sknBorderE3E3E3";
      this.view.addRemoveInstrumentSearch.onSearchClear();
    },
    onPopup :function(){
      this.flag = true;
      this.view.flxAddIstrumentMain.isVisible=true;
      this.view.flxAddNewInstrument.skin = "sknFlxBorder003e751px";
    },
    viewInstrumentDetails : function(data){
      try{
        let objectName = "Watchlist";
        let objectServiceName = "WealthOrder";
        let operationName = "updateWatchlistDB";
        let serviceResponseIdentifier = "S1";
        var criteria = {
          "RICCode": data.RICCode,
          "instrumentId": data.instrumentId,
          "operation": data.operation,
          "application": data.application
        };

        this.watchlistDAO.updateUserFavouriteInstruments(objectServiceName,operationName,objectName,criteria,serviceResponseIdentifier,this.onDeleteServiceSuccess,this.onError);
        this.closePopup();
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

    //watchlistPrint
    watchlistPrint: function(){
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
    setCriteria:function(criteria, pref){
      var self = this;
      try
      {
        var criteriaObject = JSON.parse(eval("this._tab"+pref+"Criteria"));
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

        if(this.criteria["searchByInstrumentName"] ==  "searchByInstrumentName"){
          delete this.criteria["searchByInstrumentName"];
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
        if(value[this.accountType]){
          value = value[this.accountType];
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
    onError: function(errorObj){
      // error fetch
    },
    getSearchData: function(dataList1) {
      try{
      var scopeObj = this; 
      var searchQuery = scopeObj.view.txtSear.text.trim();
      if (searchQuery !== "") {
        var data2 = dataList1;
        var searchresults = [];
        if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {
          var j = 0;
          for (var i = 0; i < data2.length; i++) {
            var rowdata = null;
            if ((data2[i].instrumentName && data2[i].instrumentName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                (data2[i].ISINCode && data2[i].ISINCode.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1))
            {
              rowdata = data2[i];
            }
            if (kony.sdk.isNullOrUndefined(rowdata)) {
              data2[i].isNoRecords = true;
              data2[i].lblNoResultsFound = {
                "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
              };
              var noRecordsData = data2[i];
              if (data2[i].isNoRecords === false) {
                searchresults[j].push(noRecordsData);
                j++;
              }
            } else {
              searchresults[j] = rowdata;
              j++;
            }
          }
        }
        return searchresults;
      } else {
        return dataList1;
      }
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getSearchData",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
     onBreakPointChangeComponent: function(form, formWidth) {
      var scope = this;
      this.width=formWidth;
        this.preShow();
    },
    onTextRowClick: function(event, context) {
      try{
            let text = event.text;
            let dataTab = scopeObj.view.segWatchlistTabletRemaining.data;
            if (dataTab[scopeObj.curr].btnSetAlertTab.text === kony.i18n.getLocalizedString("i18n.wealth.watchlist.modifyAlert")) {
                dataTab[scopeObj.curr].btnSetAlertTab.skin = "sknBtnNormalSSPFFFFFF15Px"
                dataTab[scopeObj.curr].btnSetAlertTab.enable = true;
            }else  if(dataTab[scopeObj.previousIndex].btnSetAlertTab.text === kony.i18n.getLocalizedString("i18n.wealth.watchlist.setAlert")){
             dataTab[scopeObj.previousIndex].btnSetAlertTab.enable = (dataTab[scopeObj.previousIndex].lblAlertPriceValueTab !== "" && dataTab[scopeObj.previousIndex].txtNumber.text !== "" && parseFloat(dataTab[scopeObj.previousIndex].txtNumber.text) !== 0) ? true:false;
            dataTab[scopeObj.previousIndex].btnSetAlertTab.skin = dataTab[scopeObj.previousIndex].btnSetAlertTab.enable ? "sknBtnNormalSSPFFFFFF15Px":"sknBtnNormalSSPE2E9F015PX";
            }
            if(!this.enableFlag && dataTab[scopeObj.curr].btnSetAlertTab.enable){
                this.enableFlag = true;
                scopeObj.view.segWatchlistTabletRemaining.setData(dataTab);
              }
        
        if(text === "" || parseFloat(text) === 0){
          this.enableFlag = false;
          dataTab[scopeObj.curr].btnSetAlertTab.skin = "sknBtnNormalSSPE2E9F015PX"
          dataTab[scopeObj.curr].btnSetAlertTab.enable = false;
          scopeObj.view.segWatchlistTabletRemaining.setData(dataTab);
        }
              let val=0;
            if(text.includes(".")){
                let index = text.indexOf(".");
                let decimelLength = text.substring(index+1).length;
                let valueLength = text.substring(0,index).length;
                if(decimelLength === 2){
                    this.decimelValue = text.substring(index+1);
                }
                if(valueLength <= 5){
                    this.value = text.substring(0,index);
                }
                if(decimelLength>2 || valueLength > 5){
                    val = this.value + "." +this.decimelValue;
                    dataTab[scopeObj.curr].txtNumber.text= val;
                    scopeObj.view.segWatchlistTabletRemaining.setData(dataTab);
                }
            }
            else
            {
                let valueLength = text.length;
                if(valueLength === 5){
                    this.value = text.substring(0,5);
                }
                if(valueLength > 5 ){
                    val = this.value;
                    dataTab[scopeObj.curr].txtNumber.text= val;
                    scopeObj.view.segWatchlistTabletRemaining.setData(dataTab);
                }
            }
            }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onTextRowClick",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
        },
    onRowclickWatchlistComparativeActions: function(event){
      try{
      var rowIndex = event.selectedRowIndex[1];
      if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
       let dataTab = scopeObj.view.segWatchlistTabletRemaining.data;
            dataTab[scopeObj.previousIndex].imgExpandTab.src = dataTab[scopeObj.previousIndex].imgExpandTab.src ==="listboxuparrow.png" ? "listboxdownarrow.png":"listboxuparrow.png";
            
            dataTab[scopeObj.previousIndex].lblAlertPriceValueTab = rowIndex === 0 ? kony.i18n.getLocalizedString("i18n.wealth.watchlist.lessThan") : kony.i18n.getLocalizedString("i18n.wealth.watchlist.greaterThan")
            if  (dataTab[scopeObj.previousIndex].btnSetAlertTab.text === kony.i18n.getLocalizedString("i18n.wealth.watchlist.setAlert")){
             dataTab[scopeObj.previousIndex].btnSetAlertTab.enable = (dataTab[scopeObj.previousIndex].lblAlertPriceValueTab !== "" && dataTab[scopeObj.previousIndex].txtNumber.text !== "" && parseFloat(dataTab[scopeObj.previousIndex].txtNumber.text) !== 0) ? true:false;
            dataTab[scopeObj.previousIndex].btnSetAlertTab.skin = dataTab[scopeObj.previousIndex].btnSetAlertTab.enable ? "sknBtnNormalSSPFFFFFF15Px":"sknBtnNormalSSPE2E9F015PX";
              this.enableFlag = dataTab[scopeObj.previousIndex].btnSetAlertTab.enable;
            }
            else if(dataTab[scopeObj.previousIndex].btnSetAlertTab.text === kony.i18n.getLocalizedString("i18n.wealth.watchlist.modifyAlert")){
              dataTab[scopeObj.previousIndex].btnSetAlertTab.skin = "sknBtnNormalSSPFFFFFF15Px"
              dataTab[scopeObj.previousIndex].btnSetAlertTab.enable = true;
              this.enableFlag = dataTab[scopeObj.previousIndex].btnSetAlertTab.enable;
            }
              
        scopeObj.view.segWatchlistTabletRemaining.setData(dataTab);
            this.view.watchlistActionsComparativeMenuTablet.isVisible = false; 
      }
      else{
           
      let data = scopeObj.view.segWatchlist.data;
      data[scopeObj.previousIndex].flxExpand.info.conditionPriceFlag = true;
      data[scopeObj.previousIndex].imgExpand.src = data[scopeObj.previousIndex].imgExpand.src === "listboxuparrow.png" ? "listboxdownarrow.png" : "listboxuparrow.png";
      if(data[scopeObj.previousIndex].btnSetAlert.info.setAlertFlag){
        data[scopeObj.previousIndex].btnSetAlert.enable = data[scopeObj.previousIndex].txtInputPriceValue.info.setPriceFlag && data[scopeObj.previousIndex].flxExpand.info.conditionPriceFlag;
        this.enableFlag= data[scopeObj.previousIndex].btnSetAlert.enable;
      }
      else{
        data[scopeObj.previousIndex].btnSetAlert.enable = data[scopeObj.previousIndex].txtInputPriceValue.info.setPriceFlag || data[scopeObj.previousIndex].flxExpand.info.conditionPriceFlag;
      	this.enableFlag= data[scopeObj.previousIndex].btnSetAlert.enable;
      }
      data[scopeObj.previousIndex].btnSetAlert.skin = data[scopeObj.previousIndex].btnSetAlert.enable ? "sknBtnNormalSSPFFFFFF15Px" : "sknBtnNormalSSPE2E9F015PX";
      data[scopeObj.previousIndex].lblAlertPriceValue = rowIndex === 0 ? kony.i18n.getLocalizedString("i18n.wealth.watchlist.lessThan") : kony.i18n.getLocalizedString("i18n.wealth.watchlist.greaterThan")
      scopeObj.view.segWatchlist.setData(data);
      this.view.watchlistActionsComparativeMenu.isVisible = false;
      }
      this.clearRTL();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onRowclickWatchlistComparativeActions",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onRowclickWatchlistActions: function() {
      try{
      var scopeObj = this;
      var data = {
        "searchByInstrumentName": this.instruData.lblInstruName,
        "portfolioId": this.portFolioId,
        "sortBy": "",
        "navPage": "Watchlist",
        "ISINCode": this.instruData.ISINCode?this.instruData.ISINCode:'',
        "RICCode":this.instruData.RICCode?this.instruData.RICCode:'',
        "instrumentId": this.instruData.instrumentId?this.instruData.instrumentId:'',
        "application": scope_WealthPresentationController.application,
		"secCCy" : this.instruData.secCCy?this.instruData.secCCy:'',
      };
      scope_WealthPresentationController.instrumentId = data.instrumentId;
      if (kony.application.getCurrentBreakpoint() > 1024) {
        this.view.watchlistActionsComparativeMenu.isVisible=false;
        var action = scopeObj.view.watchlistActionsMenu.segWatchlistActionsMenu.selectedRowItems[0];
        if (action.lblAction === kony.i18n.getLocalizedString("i18n.wealth.view")) {
             scope_WealthPresentationController.instrumentAction = 'Watchlist';
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController.setProductDetails(data);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController.setDetailsOfInstrument(data);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController.flow="";
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmProductDetails");
          this.view.watchlistActionsMenu.setVisibility(false);
        } else if (action.lblAction === kony.i18n.getLocalizedString("kony.mb.common.Delete")) {
          this.makeDaoDeleteWatchlist();
          this.view.forceLayout();
        } else if (action.lblAction === kony.i18n.getLocalizedString("i18n.wealth.buy")) {
          data.operation = "Buy";
          applicationManager.getNavigationManager().setCustomInfo('frmPlaceOrder', data);
          applicationManager.getNavigationManager().navigateTo('frmPlaceOrder');
          this.view.watchlistActionsMenu.setVisibility(false);
        } else if (action.lblAction === kony.i18n.getLocalizedString("i18n.wealth.sell")) {
          data.operation = "Sell";
          applicationManager.getNavigationManager().setCustomInfo('frmPlaceOrder', data);
          applicationManager.getNavigationManager().navigateTo('frmPlaceOrder');
          this.view.watchlistActionsMenu.setVisibility(false);          
        }
      } else {
        var actionTablet = scopeObj.view.watchlistActionsMenuTablet.segWatchlistActionsMenu.selectedRowItems[0];
        if (actionTablet.lblAction === kony.i18n.getLocalizedString("i18n.wealth.view")) {
          scope_WealthPresentationController.instrumentAction = 'Watchlist';
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController.setProductDetails(data);
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController.setDetailsOfInstrument(data);
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController.flow = "";
          var navManagerr = applicationManager.getNavigationManager();
          navManagerr.navigateTo("frmProductDetails");
          this.view.watchlistActionsMenuTablet.setVisibility(false);
        } else if (actionTablet.lblAction === kony.i18n.getLocalizedString("kony.mb.common.Delete")) {
          this.makeDaoDeleteWatchlist();
          this.view.watchlistActionsMenuTablet.setVisibility(false);
          this.view.forceLayout();
        } else if (actionTablet.lblAction === kony.i18n.getLocalizedString("i18n.wealth.buy")) {
          data.operation = "Buy";
          applicationManager.getNavigationManager().setCustomInfo('frmPlaceOrder', data);
          applicationManager.getNavigationManager().navigateTo('frmPlaceOrder');
          this.view.watchlistActionsMenuTablet.setVisibility(false);
        } else if (actionTablet.lblAction === kony.i18n.getLocalizedString("i18n.wealth.sell")) {
          data.operation = "Sell";
          applicationManager.getNavigationManager().setCustomInfo('frmPlaceOrder', data);
          applicationManager.getNavigationManager().navigateTo('frmPlaceOrder');
          this.view.watchlistActionsMenuTablet.setVisibility(false);
        }
      }
      this.closePopup();
      this.clearRTL();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onRowclickWatchlistActions",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    bindWatchlistInstruments: function(data) {
      try{
      if (data === 0 || data === undefined || data.length == 0) {
        this.view.segWatchlist.removeAll();
        this.view.segWatchlistTabletInstrument.removeAll();
        this.view.segWatchlistTabletRemaining.removeAll();
        this.view.segDot.removeAll();
        this.view.flxHeadings.setVisibility(false);
        this.view.flxSeparatorHeadings.setVisibility(false);
        this.view.flxExtendedWatchlistWrapperTablet.setVisibility(false);
        this.view.flxNoResults.setVisibility(true);
      } else {
		//IW-3268; Atharva Vadnere   
		this.view.flxHeadings.setVisibility(true);  
		//IW-3268
        this.view.flxNoResults.setVisibility(false);
        scopeObj = this;
        var widgetDataMap = {
          "flxSpace":"flxSpace",
          "flxAlert":"flxAlert",
          "flxExtra":"flxExtra",
          "imgDroper":"imgDroper",
          "flxDroper":"flxDroper",
          "lblInstruName": "lblInstruName",
          "lblRICCode": "lblRICCode",
          "lblInstrumentId": "lblInstrumentId",
          "lblISIN": "lblISIN",
          "lblCurrency": "lblCurrency",
          "lblLatest": "lblLatest",
          "lblChange": "lblChange",
          "lblDateTime": "lblDateTime",
          "lblBid": "lblBid",
          "lblAsk": "lblAsk",
          "flxInstrument": "flxInstrument",
          "flxQuantity" : "flxQuantity",
          "lblVolume": "lblVolume",
          "flxDots": "flxDots",
          "img3Dot": "img3Dot",
          "flxExpand": "flxExpand",
          "imgDropDown" : "imgDropDown",
          "flxWatchlistExtended": "flxWatchlistExtended",
          "lblSecurityAsset":"lblSecurityAsset",
          "flxDropDown":"flxDropDown",
          "flxSetPrice": "flxSetPrice",
          "flxIndicator": "flxIndicator",
          "txtInputPriceValue":"txtInputPriceValue",
          "lblAlertPriceValue":"lblAlertPriceValue",
          "imgExpand" : "imgExpand",
          "btnSetAlert":"btnSetAlert",
          "lblRemove":"lblRemove",
          "lblSymbol":"lblSymbol",
          "lblDollar":"lblDollar",   //IW-3569 --- Atharva Vadnere 
          "txtNumber" : "txtNumber",
          "flxExpandTab":"flxExpandTab",
          "lblAlertPriceValueTab":"lblAlertPriceValueTab",
          "imgExpandTab" : "imgExpandTab",
          "lblRemoveTab":"lblRemoveTab",
          "btnSetAlertTab":"btnSetAlertTab",
        };
        var formUtilityMan = applicationManager.getFormatUtilManager();
        var navManager = applicationManager.getNavigationManager();
        var testResponse = navManager.getCustomInfo('frmDashboard');
        var watchlistSegmentData = data.map(function(itemData,index) {
          var amnLatest = formUtilityMan.formatAmountandAppendCurrencySymbol(itemData.lastRate,itemData.referenceCurrency);
          var amnBid = "";
          if (itemData.bidRate !== ""){   
             amnBid = formUtilityMan.formatAmountandAppendCurrencySymbol(itemData.bidRate,itemData.referenceCurrency);
          }
          var amnAsk = "";
          if (itemData.askRate !== "") {
             amnAsk = formUtilityMan.formatAmountandAppendCurrencySymbol(itemData.askRate,itemData.referenceCurrency);
          }
          var percentChange = itemData.percentageChange;
//           if (percentChange === "") {
//             percentChange = "0.00";
//           }
          var truncated="";
          var truncatedv="";
          if(itemData.instrumentName!=""){
            if(kony.application.getCurrentBreakpoint() > 1024)
              truncated=scopeObj.truncateStringWithGivenLength(itemData.instrumentName, 25);
            else{
              if(itemData.instrumentName.length >18)
                truncated = itemData.instrumentName.substr(0, 18) + '...';
              else
                truncated = itemData.instrumentName;
            }
          }
          if(itemData.volume.toString()!=""){
            if(kony.application.getCurrentBreakpoint() > 1024){
              if(itemData.volume.toString() >5)
                truncatedv = itemData.volume.toString().substr(0, 5) + '...';
              else
                truncatedv = itemData.volume.toString();
            }
            else
                truncatedv = itemData.volume.toString();
          }

          var objectData = {
            "imgDroper": {
              "src":"listboxuparrow.png"},
            "flxDroper":{
              "isVisible" : scope_WealthPresentationController.isMockIntegration? true:false ,
            "onClick": function(event, context) {
             scopeObj.onImageRowClick(event, context);
             scopeObj.view.watchlistActionsComparativeMenuTablet.setVisibility(false);
              
            }.bind(this)
          },
            "flxSpace":{"isVisible": false},
            "flxAlert":{"isVisible": false},
            "flxExtra":{"isVisible": false},
            "flxDropDown":{"isVisible": false},
            "lblInstruName": truncated,
            "lblRICCode": itemData.RIC,
            "lblInstrumentId": itemData.instrumentId,
            "lblSecurityAsset":itemData.isSecurityAsset,
            "lblISIN": itemData.ISINCode + " | " + itemData.exchange,
            "lblCurrency": itemData.referenceCurrency,
            "lblLatest": amnLatest,
            "lblDateTime": itemData.dateReceived + (itemData.timeReceived !== "0:00:00" ? ' at: ' + itemData.timeReceived : ""),
            "lblBid": amnBid,
            "lblAsk": amnAsk,
            "txtNumber":{"text":itemData.setPrice,
            "restrictCharactersSet" : " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}:<>?|_+~`-=[];'\,/'` \" ",
            "onTextChange": function(event, context) {
                                scopeObj.onTextRowClick(event, context);
                            }.bind(this)
          },
           
            "lblVolume": {"text" :truncatedv,
                          "toolTip" : itemData.volume.toString()},
            "lblSymbol":formUtilityMan.getCurrencySymbol(itemData.referenceCurrency),
            "lblDollar":formUtilityMan.getCurrencySymbol(itemData.referenceCurrency),   //IW-3569 --- Atharva Vadnere 
            "img3Dot": {
              "text": ViewConstants.FONT_ICONS.THREE_DOTS_ACCOUNTS,
              "skin": ViewConstants.SKINS.THREE_DOTS_IMAGE,
              "isVisible": true,
            },
            "flxWatchlistExtended": "flxWatchlistExtended",
            "flxDots": {
              "onClick": function() {
                scopeObj.toggleWatchlistActions(itemData);
              }
            },
            "btnSetAlert":{
              "text": itemData.btnText,
              "enable": false,
              "onClick": function(event) {
                scopeObj.onClickofSetPrice(event);
              },
              "skin":"sknBtnNormalSSPE2E9F015PX",
              "info":{
                "setAlertFlag": true,
              }
            },
            "imgDropDown":{
              "src" : "listboxuparrow.png"
            },
            "imgExpand":{
              "src" : "listboxuparrow.png"
            },
            "flxIndicator":{
              "isVisible" : false
            },
            "flxSetPrice":{
              "isVisible" : false
            },
            "lblRemove":{
              "isVisible" : itemData.removeVisibility,
              "onTouchEnd" : function(event){
                scopeObj.removeAlert(event); 
              }
            },
            "flxInstrument":{
				"left" : testResponse.response.hasOwnProperty('isMockIntegration')?"0dp":"30dp" 
			},
            "flxQuantity":{
				"left" : testResponse.response.hasOwnProperty('isMockIntegration')?"0dp":"40dp" 
            },
            "flxExpand": {
              "onTouchEnd": function(event) {
                scopeObj.showComparativeDropDown(event);
              },
              "info": {
                "key": index.toString(),
                "conditionPriceFlag" :  itemData.priceCondition === 'Select Condition'? false:true,
              }
            },
            "txtInputPriceValue": {
              "text":itemData.setPrice,
              "onTextChange" : function(event){
                scopeObj.onTextChange(event);
              },
              "info":{
                "setPriceFlag" : false
              },
              "restrictCharactersSet" : " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}:<>?|_+~`-=[];'\,/'` \""
            },
            "flxDropDown" : {
              
              
               
              "isVisible" : testResponse.response.hasOwnProperty('isMockIntegration'),
               
              "onClick": function(widgetRef,context){

				this.enableFlag = false;
                scopeObj.view.watchlistActionsComparativeMenu.setVisibility(false);
                debugger;
                if(scopeObj.view.segWatchlist.data[context.rowIndex].imgDropDown.src === "listboxdownarrow.png"){
                  scopeObj.view.segWatchlist.data[context.rowIndex].imgDropDown={"src" : "listboxuparrow.png"};
                  scopeObj.view.segWatchlist.data[context.rowIndex].flxSetPrice={"isVisible" : false};
                  scopeObj.view.segWatchlist.data[context.rowIndex].flxIndicator={"isVisible" : false};
                  scopeObj.view.segWatchlist.setData(scopeObj.view.segWatchlist.data);
                }
                else{
                  scopeObj.view.segWatchlist.data[context.rowIndex].imgDropDown = {
                    "src": "listboxdownarrow.png"
                  };
                  scopeObj.view.segWatchlist.data[context.rowIndex].flxSetPrice = {
                    "isVisible": true
                  };
                  scopeObj.view.segWatchlist.data[context.rowIndex].flxIndicator = {
                    "isVisible": true
                  };
                  if(scopeObj.previousIndex>=0 && scopeObj.previousIndex != context.rowIndex){
                    scopeObj.view.segWatchlist.data[scopeObj.previousIndex].imgDropDown = {
                      "src": "listboxuparrow.png"
                    };
                    scopeObj.view.segWatchlist.data[scopeObj.previousIndex].flxSetPrice = {
                      "isVisible": false
                    };
                    scopeObj.view.segWatchlist.data[scopeObj.previousIndex].flxIndicator = {
                      "isVisible": false
                    };
                  }
                  scopeObj.view.segWatchlist.setData(scopeObj.view.segWatchlist.data);
                  scopeObj.previousIndex=context.rowIndex;
                }
                //scope.onToggle();
              }
            },
            "lblAlertPriceValue": itemData.priceCondition,
            "btnSetAlertTab":{
              "text": itemData.btnText,
              "enable": false,
              "skin": "sknBtnNormalSSPE2E9F015PX",
              "onClick": function(event) {
                scopeObj.onClickofSetPrice(event);
              },
            "info":{
                "setAlertFlag": true,
              }
            },
			"imgDropDown":{
			"src" : "listboxuparrow.png"
			},
            "imgExpandTab":{
			"src" : "listboxuparrow.png"
			},
            "flxIndicator":{
              "isVisible" : false
},
		    "flxSetPrice":{
				"isVisible" : false
			},
            "lblRemoveTab":{
				"isVisible" : false,
                "onTouchEnd" : function(event){
            scopeObj.removeAlert(event); 
          }
			},
          "flxExpandTab":{
                            "onClick": function(event){
                                scopeObj.showComparativeDropDown(event);
                                 },
                            "info":{"key":index.toString()}
                        },
            
   
            //"lblAlertPriceValueTab": itemData.priceCondition,


            "lblAlertPriceValueTab": itemData.priceCondition
          };
		  if(itemData.percentageChange.includes("-")) {
            objectData["lblChange"] = {
              "text": percentChange + "%",
              "skin": "sknIblEE0005SSPsb45px" //sknlblff000015px sknIblEE0005SSPsb45px
            }
          } else if(itemData.percentageChange !== "") {
            objectData["lblChange"] = {
              "text": "+" + percentChange + "%",
              "skin": "IWLabelGreenText15Px"
            }
          } else { 
			objectData["lblChange"] = {
              "text": percentChange,
              "skin": "IWLabelGreenText15Px"
            }
		  }
          this.clickdata = objectData;
          return objectData;
        });
        scopeObj.view.segWatchlist.widgetDataMap = widgetDataMap;
        scopeObj.view.segDot.widgetDataMap = widgetDataMap;
        
        if (data.length > 0) {
          if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
            //tablet breakpoint
            this.view.flxExtendedWatchlistWrapper.setVisibility(false);
            this.view.flxHeadings.setVisibility(false);
            this.view.flxSeparatorHeadings.setVisibility(false);
            this.view.flxWatchlistSegmentTablet.setVisibility(true);
            this.view.flxExtendedWatchlistWrapperTablet.setVisibility(true);
            scopeObj.clickdata.push(watchlistSegmentData);
            this.view.segWatchlistTabletInstrument.setData(watchlistSegmentData);
            this.view.segWatchlistTabletRemaining.setData(watchlistSegmentData);
            this.view.segDot.setData(watchlistSegmentData);
          }
          else{
           //desktop breakpoint 
            this.view.flxWatchlistSegmentTablet.setVisibility(false);
            this.view.flxExtendedWatchlistWrapperTablet.setVisibility(false);
            this.view.flxExtendedWatchlistWrapper.setVisibility(true);
            scopeObj.view.segWatchlist.setData(watchlistSegmentData);    
          }
        }
        scopeObj.view.forceLayout();
      }
      this.clearRTL();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in bindWatchlistInstruments",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    onTextChange: function(event){
      try{
      debugger;
      let text = event.text;
      let data = scopeObj.view.segWatchlist.data;
      data[scopeObj.previousIndex].txtInputPriceValue.info.setPriceFlag = ((text === "" || parseFloat(text) === 0)?false:true);
      data[scopeObj.previousIndex].btnSetAlert.enable = data[scopeObj.previousIndex].txtInputPriceValue.info.setPriceFlag && data[scopeObj.previousIndex].flxExpand.info.conditionPriceFlag;
      data[scopeObj.previousIndex].btnSetAlert.skin = data[scopeObj.previousIndex].btnSetAlert.enable ? "sknBtnNormalSSPFFFFFF15Px" : "sknBtnNormalSSPE2E9F015PX";
      if(!this.enableFlag && data[scopeObj.previousIndex].btnSetAlert.enable){
        this.enableFlag = true;
        scopeObj.view.segWatchlist.setData(data);
      }
        if(text === "" || parseFloat(text) === 0){
          this.enableFlag = false;
          data[scopeObj.previousIndex].btnSetAlert.enable = false;
          data[scopeObj.previousIndex].btnSetAlert.skin = "sknBtnNormalSSPE2E9F015PX";
          scopeObj.view.segWatchlist.setData(data);
        }
      let val=0;
            if(text.includes(".")){
                let index = text.indexOf(".");
                let decimelLength = text.substring(index+1).length;
                let valueLength = text.substring(0,index).length;
                if(decimelLength === 2){
                    this.decimelValue = text.substring(index+1);
                }
                if(valueLength <= 5){
                    this.value = text.substring(0,index);
                }
                if(decimelLength>2 || valueLength > 5){
                    val = this.value + "." +this.decimelValue;
                    data[scopeObj.previousIndex].txtInputPriceValue.text= val;
                    scopeObj.view.segWatchlist.setData(data);
                }
            }
            else
            {
                let valueLength = text.length;
                if(valueLength === 5){
                    this.value = text.substring(0,5);
                }
                if(valueLength > 5 ){
                    val = this.value;
                    data[scopeObj.previousIndex].txtInputPriceValue.text= val;
                    scopeObj.view.segWatchlist.setData(data);
                }
            }
      //if()
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onTextChange",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onRemoveAlert : function(event){
      try{
      if (event) {
        debugger;
        var data = applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy');
        data[scopeObj.previousIndex].setPrice = "0";
        data[scopeObj.previousIndex].priceCondition = kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition");
        this.enableFlag= false;
        if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
          let segDataTab = scopeObj.view.segWatchlistTabletRemaining.data;
          segDataTab[scopeObj.previousIndex].btnSetAlertTab.text = kony.i18n.getLocalizedString("i18n.wealth.watchlist.setAlert");
          segDataTab[scopeObj.previousIndex].lblAlertPriceValueTab = kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition")
          segDataTab[scopeObj.previousIndex].txtNumber.text = "0";
          segDataTab[scopeObj.previousIndex].lblRemoveTab.isVisible = false;
          segDataTab[scopeObj.previousIndex].btnSetAlertTab.info.setAlertFlag = true;
          scopeObj.view.segWatchlistTabletRemaining.setData(segDataTab);
          data[scopeObj.previousIndex].btnText = scopeObj.view.segWatchlistTabletRemaining.data[scopeObj.previousIndex].btnSetAlertTab.text;
        } else {
          let segData = scopeObj.view.segWatchlist.data;
        segData[scopeObj.previousIndex].txtInputPriceValue.info.setPriceFlag = false;
        segData[scopeObj.previousIndex].flxExpand.info.conditionPriceFlag = false;
        segData[scopeObj.previousIndex].btnSetAlert.text = kony.i18n.getLocalizedString("i18n.wealth.watchlist.setAlert");
        segData[scopeObj.previousIndex].btnSetAlert.enable= false;
        segData[scopeObj.previousIndex].btnSetAlert.skin =  "sknBtnNormalSSPE2E9F015PX";
        segData[scopeObj.previousIndex].lblAlertPriceValue =kony.i18n.getLocalizedString("i18n.wealth.watchlist.selectCondition")
        segData[scopeObj.previousIndex].txtInputPriceValue.text="0";
        segData[scopeObj.previousIndex].lblRemove.isVisible =false;
        segData[scopeObj.previousIndex].btnSetAlert.info.setAlertFlag = true;
        scopeObj.view.segWatchlist.setData(segData);
        data[scopeObj.previousIndex].btnText=  scopeObj.view.segWatchlist.data[scopeObj.previousIndex].btnSetAlert.text;
          
      }
        applicationManager.getNavigationManager().setCustomInfo('flxWatchListDummy', data);
      }
      this.clearRTL();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onRemoveAlert",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    removeAlert : function(event){
      this.cancelPopUp();
      this.clearRTL();
    },
    onClickofSetPrice : function(event){
      try{
             debugger;
     
            this.enableFlag= false;
            var data = applicationManager.getNavigationManager().getCustomInfo('flxWatchListDummy');
             if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
             let segDataTab = scopeObj.view.segWatchlistTabletRemaining.data;
             if (segDataTab[scopeObj.previousIndex].btnSetAlertTab.skin !== "sknBtnNormalSSPE2E9F015PX"){
               
             
             data[scopeObj.previousIndex].setPrice = scopeObj.view.segWatchlistTabletRemaining.data[scopeObj.previousIndex].txtNumber.text;
            data[scopeObj.previousIndex].priceCondition = scopeObj.view.segWatchlistTabletRemaining.data[scopeObj.previousIndex].lblAlertPriceValueTab;
            
            segDataTab[scopeObj.previousIndex].btnSetAlertTab.text = kony.i18n.getLocalizedString("i18n.wealth.watchlist.modifyAlert");
            segDataTab[scopeObj.previousIndex].lblRemoveTab.isVisible =false;
            segDataTab[scopeObj.previousIndex].lblRemoveTab.isVisible =true;
            segDataTab[scopeObj.previousIndex].btnSetAlertTab.skin = "sknBtnNormalSSPE2E9F015PX";
            segDataTab[scopeObj.previousIndex].btnSetAlertTab.enable = false;
               
            
            let text = segDataTab[scopeObj.previousIndex].btnSetAlertTab.info.setAlertFlag ? kony.i18n.getLocalizedString("i18n.wealth.watchlist.alertSuccess") : kony.i18n.getLocalizedString("i18n.wealth.watchlist.alertModified");
            this.ackPopUp(text);
            segDataTab[scopeObj.previousIndex].btnSetAlertTab.info.setAlertFlag = false;
            scopeObj.view.segWatchlistTabletRemaining.setData(segDataTab);
            data[scopeObj.previousIndex].btnText=  scopeObj.view.segWatchlistTabletRemaining.data[scopeObj.previousIndex].btnSetAlertTab.text;
            applicationManager.getNavigationManager().setCustomInfo('flxWatchListDummy',data); 
             }
             }
            else{
             data[scopeObj.previousIndex].setPrice = scopeObj.view.segWatchlist.data[scopeObj.previousIndex].txtInputPriceValue.text;
      data[scopeObj.previousIndex].priceCondition = scopeObj.view.segWatchlist.data[scopeObj.previousIndex].lblAlertPriceValue;
      let segData = scopeObj.view.segWatchlist.data;
      segData[scopeObj.previousIndex].btnSetAlert.text = kony.i18n.getLocalizedString("i18n.wealth.watchlist.modifyAlert"); 
      segData[scopeObj.previousIndex].lblRemove.isVisible =true;
      segData[scopeObj.previousIndex].btnSetAlert.enable = false;
      segData[scopeObj.previousIndex].btnSetAlert.skin = "sknBtnNormalSSPE2E9F015PX";
      segData[scopeObj.previousIndex].txtInputPriceValue.info.setPriceFlag=false;
      let text = segData[scopeObj.previousIndex].btnSetAlert.info.setAlertFlag ? kony.i18n.getLocalizedString("i18n.wealth.watchlist.alertSuccess") : kony.i18n.getLocalizedString("i18n.wealth.watchlist.alertModified");
      this.ackPopUp(text);
      segData[scopeObj.previousIndex].btnSetAlert.info.setAlertFlag = false;  
      scopeObj.view.segWatchlist.setData(segData);
      data[scopeObj.previousIndex].btnText=  scopeObj.view.segWatchlist.data[scopeObj.previousIndex].btnSetAlert.text;
      data[scopeObj.previousIndex].removeVisibility= true;
            }
			applicationManager.getNavigationManager().setCustomInfo('flxWatchListDummy',data); 
      this.clearRTL();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onClickofSetPrice",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
        },
    
    
    showComparativeDropDown: function(event){
      try{
      let data = [{
                "lblAction": kony.i18n.getLocalizedString("i18n.wealth.watchlist.lessThan"),
                "lblSeparator": "Separator"
            }, {
                "lblAction": kony.i18n.getLocalizedString("i18n.wealth.watchlist.greaterThan"),
                "lblSeparator": "Separator"
            }, ];
            var row = event.info.key;
       if (this.width === 1024 || this.width === 768 || this.orientationHandler.isTablet) {
         let watchlistSegmentDataTab = this.view.segWatchlistTabletRemaining.data;
            watchlistSegmentDataTab[row].imgExpandTab.src = watchlistSegmentDataTab[row].imgExpandTab.src ==="listboxuparrow.png" ? "listboxdownarrow.png":"listboxuparrow.png";
            this.view.watchlistActionsComparativeMenuTablet.top = 355 + row * 67 + "dp";
            this.view.watchlistActionsComparativeMenuTablet.left = "222dp";
            this.view.watchlistActionsComparativeMenuTablet.width = 190+  "dp";
         
            scopeObj.view.segWatchlistTabletRemaining.setData(watchlistSegmentDataTab);
            this.view.watchlistActionsComparativeMenuTablet.segWatchlistActionsMenu.setData(JSON.parse(JSON.stringify(data)));
            this.view.watchlistActionsComparativeMenuTablet.isVisible = !this.view.watchlistActionsComparativeMenuTablet.isVisible;
       }
      else{
            let watchlistSegmentData = this.view.segWatchlist.data;
            watchlistSegmentData[row].imgExpand.src = watchlistSegmentData[row].imgExpand.src ==="listboxuparrow.png" ? "listboxdownarrow.png":"listboxuparrow.png";
            this.view.watchlistActionsComparativeMenu.top = 329 + row * 62 + "dp";
            scopeObj.view.segWatchlist.setData(watchlistSegmentData);
            this.view.watchlistActionsComparativeMenu.segWatchlistActionsMenu.setData(JSON.parse(JSON.stringify(data)));
            this.view.watchlistActionsComparativeMenu.isVisible = !this.view.watchlistActionsComparativeMenu.isVisible;
      }
      
      this.view.forceLayout();

      if (this.width === 1024 || this.width === 768) {
        if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
          tempDom = document.querySelectorAll("[kwp='frmWatchlist_WatchlistExtended_watchlistActionsComparativeMenuTablet']")
          if (tempDom && tempDom[0]) {
            tempDom[0].style.right = "222px"
            tempDom[0].style.removeProperty("left");
          }
        }
      }

      this.clearRTL();
    }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showComparativeDropDown",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
   onImageRowClick: function(event, context) {
     try{
            var rowindex = context.rowIndex;
     		this.enableFlag=false;
            this.curr = rowindex;
                if (this.clickdata[0][rowindex].imgDroper.src === "listboxuparrow.png") {
                    this.clickdata[0][rowindex].flxSpace.isVisible = true,
                        this.clickdata[0][rowindex].flxAlert.isVisible = true,
                        this.clickdata[0][rowindex].flxExtra.isVisible = true,
                        this.clickdata[0][rowindex].imgDroper.src = "listboxdownarrow.png"
                } else {
                    this.clickdata[0][rowindex].imgDroper.src = "listboxuparrow.png"
                    this.clickdata[0][rowindex].flxSpace.isVisible = false,
                        this.clickdata[0][rowindex].flxAlert.isVisible = false,
                        this.clickdata[0][rowindex].flxExtra.isVisible = false
                }
                if(this.clickdata[0][this.prev].imgDroper.src === "listboxdownarrow.png" && this.prev !== rowindex){
                this.clickdata[0][this.prev].flxSpace.isVisible = false,
                this.clickdata[0][this.prev].flxAlert.isVisible = false,
                this.clickdata[0][this.prev].flxExtra.isVisible = false,
                this.clickdata[0][this.prev].imgDroper.src = "listboxuparrow.png"
                }
            this.prev = rowindex;
            this.previousIndex = rowindex;
            this.view.segWatchlistTabletInstrument.removeAll();
            this.view.segWatchlistTabletRemaining.removeAll();
            this.view.segDot.removeAll();
            this.view.segWatchlistTabletInstrument.setData(this.clickdata[0]);
            this.view.segWatchlistTabletRemaining.setData(this.clickdata[0]);
            this.view.segDot.setData(this.clickdata[0]);
     
     this.clearRTL();
       }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onImageRowClick",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
        },
    toggleWatchlistActions: function(itemData) {
      try{
      if(itemData.application)
        scope_WealthPresentationController.application = itemData.application;      
      this.view.watchlistActionsMenu.segWatchlistActionsMenu.setData(JSON.parse(JSON.stringify(this.totalActions)));
      this.view.watchlistActionsMenuTablet.segWatchlistActionsMenu.setData(JSON.parse(JSON.stringify(this.totalActions)));
      var first=this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[0];
      var second=this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[1];
      var third=this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[2];
      if (kony.application.getCurrentBreakpoint() > 1024) {
        var rowSeg = scopeObj.view.segWatchlist.selectedRowItems[0];
        var formUtilityMan = applicationManager.getFormatUtilManager();
        rowSeg.latestPrice = Number(formUtilityMan.deFormatAmount(rowSeg.lblLatest));
        scope_WealthPresentationController.selectedInstrDetails = rowSeg;        
        this.instruData = {
          "ISINCode": rowSeg.lblISIN,
          "lblInstruName": itemData.instrumentName,
          "RICCode": rowSeg.lblRICCode,
          "instrumentId": rowSeg.lblInstrumentId,
		  "secCCy":rowSeg.lblCurrency,
      "application": scope_WealthPresentationController.application
        };
          if(second){
            if(second.lblAction==kony.i18n.getLocalizedString("i18n.wealth.buy") || second.lblAction==kony.i18n.getLocalizedString("i18n.wealth.sell")){
              if((this.instruData.hasOwnProperty("application")) && (this.instruData.application!=="") && (this.instruData.application !== "SC")){
                this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(1);
              }
            }
          }
          if(third){
            if(third.lblAction==kony.i18n.getLocalizedString("i18n.wealth.buy") || third.lblAction==kony.i18n.getLocalizedString("i18n.wealth.sell")){
              if((this.instruData.hasOwnProperty("application")) && (this.instruData.application!=="") && (this.instruData.application !== "SC")){
                this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(1);
              }
            }
          }
      if(first){
        //if(first.lblAction=="Buy" || first.lblAction=="Sell"){
          if(rowSeg.lblSecurityAsset==false){
            this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(0);
          }
        //}
      }
        var row = this.view.segWatchlist.selectedRowIndex[1];
        this.view.watchlistActionsMenu.top = 231 + row * 62 + "dp";
        var toggleActions = this.contextualFlag ? true : false; //IW-3973 -bharath
        this.view.watchlistActionsMenu.setVisibility(toggleActions);
      } else {
        var rowSegTablet = scopeObj.view.segDot.selectedRowItems[0];
        this.formUtilityMan = applicationManager.getFormatUtilManager();
        rowSegTablet.latestPrice = Number(this.formUtilityMan.deFormatAmount(rowSegTablet.lblLatest));
        scope_WealthPresentationController.selectedInstrDetails = rowSegTablet;
        this.instruData = {
          "ISINCode": rowSegTablet.lblISIN,
          "lblInstruName": itemData.instrumentName,
          "RICCode": rowSegTablet.lblRICCode,
          "instrumentId": rowSegTablet.lblInstrumentId,
          "application": scope_WealthPresentationController.application
        };
              if(second){
        if(second.lblAction==kony.i18n.getLocalizedString("i18n.wealth.buy") || second.lblAction==kony.i18n.getLocalizedString("i18n.wealth.sell")){
          if((this.instruData.hasOwnProperty("application")) && (this.instruData.application!=="") && (this.instruData.application !== "SC")){
            this.view.watchlistActionsMenuTablet.segWatchlistActionsMenu.removeAt(1);
          }
        }
      }
      if(third){
        if(third.lblAction==kony.i18n.getLocalizedString("i18n.wealth.buy") || third.lblAction==kony.i18n.getLocalizedString("i18n.wealth.sell")){
          if((this.instruData.hasOwnProperty("application")) && (this.instruData.application!=="") && (this.instruData.application !== "SC")){
            this.view.watchlistActionsMenuTablet.segWatchlistActionsMenu.removeAt(1);
          }
        }
      }
      if(first){
        //if(first.lblAction=="Buy" || first.lblAction=="Sell"){
          if(rowSegTablet.lblSecurityAsset==false){
            this.view.watchlistActionsMenuTablet.segWatchlistActionsMenu.removeAt(0);
          }
        //}
      }
        var rowTablet = this.view.segDot.selectedRowIndex[1];
        this.view.watchlistActionsMenuTablet.top = 231 + rowTablet * 50 + "dp";
        var toggleActionsTablet = this.contextualFlagTab ? true : false; //IW-3973 -bharath
        this.view.watchlistActionsMenuTablet.setVisibility(toggleActionsTablet);
      }
      this.clearRTL();
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in toggleWatchlistActions",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onClickSort: function(option, widget) {
      switch(option) {
        case 0:
          this.sortData = "instrumentName";
          break;
        case 1:
          this.sortData = "referenceCurrency";
          break;
        case 2:
          this.sortData = "lastRate";
          break;
        case 3:
          this.sortData = "percentageChange";
          break;
        case 4:
          this.sortData = "dateTime";
          break;
        case 5:
          this.sortData = "bidRate"; 
          break;          
        case 6:
          this.sortData = "askRate";
          break;
        case 7:
          this.sortData = "volume";
          break;          
        default:
      }
      this.setImage(option, widget);
      this.sorting = this.sortType;
      this.refreshSegment(this.sorting);
      this.clearRTL();
    },
    setImage: function(option, widget) {
      var tempSrc;
      if (widget.src === this.sortNone) {
        tempSrc =  this.sortAsc;
        this.sortType = "asc";
      } else if (widget.src === this.sortAsc) {
        tempSrc = this.sortDesc;
        this.sortType = "desc";
      } else {
        tempSrc = this.sortAsc;
        this.sortType = "asc";
      }
      this.resetWidgetsrc();
      widget.src = tempSrc;
      this.clearRTL();
    },
    resetWidgetsrc: function(){
      this.view.imgSortInstrument.src = this.sortNone;
      this.view.imgSortCurrency.src = this.sortNone;
      this.view.imgSortLatest.src = this.sortNone;
      this.view.imgSortChange.src = this.sortNone;
      this.view.imgSortDateTime.src = this.sortNone;
      this.view.imgSortBid.src = this.sortNone;
      this.view.imgSortAsk.src = this.sortNone;
      this.view.imgSortVolume.src = this.sortNone;
      // tablet  
      this.view.imgSortTabletInstrument.src = this.sortNone;
      this.view.imgSortTabletCurrency.src = this.sortNone;
      this.view.imgSortTabletLatest.src = this.sortNone;
      this.view.imgSortTabletChange.src = this.sortNone;
      this.view.imgSortTabletDateTime.src = this.sortNone;
      this.view.imgSortTabletBid.src = this.sortNone;
      this.view.imgSortTabletAsk.src = this.sortNone;
      this.view.imgSortTabletVolume.src = this.sortNone;
    },//
    refreshSegment: function(){
      this.makeDaoCallWatchList();
      this.clearRTL();
    },
    footerPage:function(offset,limit){
      this.offset = offset;
      this.noOfRecords=limit;
      this.refreshSegment();
    },
    truncateStringWithGivenLength: function(str, maxLength) {
            str = str || "N/A";
            if (kony.sdk.isNullOrUndefined(maxLength)) {
                return str;
            }
            if (!kony.sdk.isNullOrUndefined(maxLength) && maxLength > str.length) {
                return str;
            }
            var result = str.substring(0, maxLength - 3);
            result = result + "...";
            return result;
        },
    onRefresh:function(){
		//IW-3973 -start- bharath 
      if(this.view.watchlistActionsMenu.isVisible){
        this.view.watchlistActionsMenu.isVisible=false;
        this.contextualFlag = false;
      }
      else{
        this.contextualFlag = true;
      }//IW-3973 -end- bharath 
      if(this.flag){
				this.flag = false;
			}else{
				this.closePopup();
			}
    },
    
    onRefreshTablet: function(){
		//IW-3973 -start- bharath 
      if(this.view.watchlistActionsMenuTablet.isVisible){
        this.view.watchlistActionsMenuTablet.isVisible=false;
        this.contextualFlagTab = false;
      }else{
        this.contextualFlagTab = true;
      }//IW-3973 -start- bharath 
        
    },
    checkPermission: function() {
      try{
      var configManager =  applicationManager.getConfigurationManager();
      var checkUserPermission = function (permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }; 
      let watchListSellPermission = configManager.sellOrderPermissions().some(checkUserPermission);
      let watchListBuyPermission = configManager.buyOrderPermissions().some(checkUserPermission);
      let watchListViewPermission = configManager.watchlistViewInstrumentPermissions().some(checkUserPermission);
      let watchListDeletePermission = configManager.addToWatchlistPermissions().some(checkUserPermission);

      var dataBuy =this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[1];
      this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(1);
      var dataSell =this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[1];
      this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(1); 
      var dataDel =this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[1];
      this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(1); 
      var dataView =this.view.watchlistActionsMenu.segWatchlistActionsMenu.data[0];
      this.view.watchlistActionsMenu.segWatchlistActionsMenu.removeAt(0); 
      var posMenu = 0;
      if (watchListViewPermission === true) {
        dataView.lblAction = kony.i18n.getLocalizedString("i18n.wealth.view");
        this.view.watchlistActionsMenu.segWatchlistActionsMenu.addDataAt(dataView, posMenu);
        posMenu++;
      }
      if (watchListBuyPermission === true && scope_WealthPresentationController.isInvestmentAccount) {
        dataBuy.lblAction = kony.i18n.getLocalizedString("i18n.wealth.buy");
        this.view.watchlistActionsMenu.segWatchlistActionsMenu.addDataAt(dataBuy, posMenu);
        posMenu++;
      } 	  
      if (watchListSellPermission === true && scope_WealthPresentationController.isInvestmentAccount) {
        dataSell.lblAction = kony.i18n.getLocalizedString("i18n.wealth.sell");
        this.view.watchlistActionsMenu.segWatchlistActionsMenu.addDataAt(dataSell, posMenu);
        posMenu++;
      }
      if (watchListDeletePermission === true) {
        dataDel.lblAction = kony.i18n.getLocalizedString("kony.mb.common.Delete");
        this.view.watchlistActionsMenu.segWatchlistActionsMenu.addDataAt(dataDel, posMenu);
      } 
      var temp=this.view.watchlistActionsMenu.segWatchlistActionsMenu.data;
      this.totalActions=JSON.parse(JSON.stringify(temp));
        }catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in checkPermission",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    }
  };
});