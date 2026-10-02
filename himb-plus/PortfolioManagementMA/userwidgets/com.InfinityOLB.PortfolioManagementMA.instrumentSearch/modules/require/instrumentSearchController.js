define(['./instrumentListDAO','./parserUtilsManager','./FormatUtils'],function(InstrumentListDAO,ParserUtilsManager,FormatUtils) {
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      //General Properties
      this._isComponentEnabled = "";
      this._isSearchEnabled = "";
      this._isSegmentEnabled = "";

      //Search Properties
      this._searchPlaceholder = "";

      //Skins
      this._sknSearchTextBoxNormal = "";
      this._sknSearchPlaceHolder = "";
      this._sknSearchText = "";
      this._sknSearchTextBoxFocus = "";
      this._sknSearchBackground = "";

      //Icons
      this._iconSearch = "";
      this._iconClear = "";

      //segment
      this._segObjService = "";
      this._segObjName = "";
      this._segOperation = "";
      this._segCriteria = "";
      this._segIdentifier = "";
      this._segResponseArray = "";
      this._segResponseId ="";
      this._segFields = "";

      //request params
      this.params = {};
      this.searchText = "";
      this.sortBy = "description";
      this.completeResponse = {};
      //this.data = {};
      //DAO object
      this.instrumentListDAO = new InstrumentListDAO();
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.FormatUtils = new FormatUtils();

      //global variables
      this.skins = {};
      this.formatSkins = {};
      this.context = {};
      this.formattingJSON = {};
      this.criteria = {};
      this.portfolioId="";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      //setter and getter method for Component Enabled in the group:General
      defineSetter(this, "isComponentEnabled", function (val) {
        if ((typeof val === 'boolean') && (val !== "")) {
          this._isComponentEnabled = val;
        }
      });
      defineGetter(this, "isComponentEnabled", function () {
        return this._isComponentEnabled;
      });

      defineSetter(this, "isSegmentEnabled", function (val) {
        if ((typeof val === 'boolean') && (val !== "")) {
          this._isSegmentEnabled = val;
        }
      });
      defineGetter(this, "isSegmentEnabled", function () {
        return this._isSegmentEnabled;
      });

      //setter and getter method for Search Placeholder in the group:Search
      defineSetter(this, "searchPlaceholder", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._searchPlaceholder = val;
        }
      });
      defineGetter(this, "searchPlaceholder", function () {
        return this._searchPlaceholder;
      });

      //setter and getter method for Search TextBox Normal Skin in the group:Skins
      defineSetter(this, "sknSearchTextBoxNormal", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchTextBoxNormal = val;
        }
      });
      defineGetter(this, "sknSearchTextBoxNormal", function () {
        return this._sknSearchTextBoxNormal;
      });

      //setter and getter method for Search Enabled in the group:General
      defineSetter(this, "isSearchEnabled", function (val) {
        if ((typeof val == 'boolean') && (val != "")) {
          this._isSearchEnabled = val;
        }
      });
      defineGetter(this, "isSearchEnabled", function () {
        return this._isSearchEnabled;
      });

      //setter and getter method for Search Placeholder Skin in the group:Skins
      defineSetter(this, "sknSearchPlaceHolder", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchPlaceHolder = val;
        }
      });
      defineGetter(this, "sknSearchPlaceHolder", function () {
        return this._sknSearchPlaceHolder;
      });

      //setter and getter method for Search Text Skin in the group:Skins
      defineSetter(this, "sknSearchText", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchText = val;
        }
      });
      defineGetter(this, "sknSearchText", function () {
        return this._sknSearchText;
      });

      //setter and getter method for Search TextBox Focus Skin in the group:Skins
      defineSetter(this, "sknSearchTextBoxFocus", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchTextBoxFocus = val;
        }
      });
      defineGetter(this, "sknSearchTextBoxFocus", function () {
        return this._sknSearchTextBoxFocus;
      });

      //setter and getter method for Search Icon in the group:Icons
      defineSetter(this, "iconSearch", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconSearch = val;
        }
      });
      defineGetter(this, "iconSearch", function () {
        return this._iconSearch;
      });

      //setter and getter method for Clear Icon in the group:Icons
      defineSetter(this, "iconClear", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconClear = val;
        }
      });
      defineGetter(this, "iconClear", function () {
        return this._iconClear;
      });

      //setter and getter method for Search and Filter Background Skin in the group:Skins
      defineSetter(this, "sknSearchBackground", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchBackground = val;
        }
      });
      defineGetter(this, "sknSearchBackground", function () {
        return this._sknSearchBackground;
      });

      //segment
      defineGetter(this, 'segObjService', function () {
        return this._segObjService;
      });
      defineSetter(this, 'segObjService', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segObjService = val;
        }
      });
      defineGetter(this, 'segObjName', function (){
        this._segObjName = value;
      });
      defineSetter(this, 'segObjName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segObjName = val;
        }
      });
      //segOperation
      defineGetter(this, 'segOperation', function () {
        this._segOperation = value;
      });
      defineSetter(this, 'segOperation', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segOperation = val;
        }
      });
      defineGetter(this, 'segCriteria', function () {
        return this._segCriteria;
      });
      defineSetter(this, 'segCriteria', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segCriteria = val;
        }
      });
      defineGetter(this, 'segIdentifier', function () {
        return this._segIdentifier;
      });
      defineSetter(this, 'segIdentifier', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segIdentifier = val;
        }
      });
      defineGetter(this, 'segResponseArray', function () {
        return this._segResponseArray;
      });
      defineSetter(this, 'segResponseArray', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segResponseArray = val;
        }
      });
      defineGetter(this, 'segResponseId', function () {
        return this._segResponseId;
      });
      defineSetter(this, 'segResponseId', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segResponseId = val;
        }
      });
      defineGetter(this, 'segFields', function () {
        return this._segFields;
      });
      defineSetter(this, 'segFields', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segFields = val;
        }
      });
    },
    /**
     * Component preShow
     */
    preShow: function() {
      try {
        //this.view.onBreakpointChange = this.onBreakpointChange;
        // this.setComponentConfig();
        this.view.txtSearch.text = "";
        this.view.flxClearBtn.setVisibility(false);
        this.view.flxSegmentFilter.setVisibility(false);
        this.view.flxLable.setVisibility(false);
        this.initActions();
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in preshow method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    setPortfolioId:function(portfolioId){
      this.portfolioId=portfolioId;
    },
    /**
     * Function is triggered everytime when the breakpoint is changed.
     */
    /* onBreakpointChange: function (eventObj, width) {
      if (this._isComponentEnabled) {
        this.view.flxMain.setVisibility(true);
      } else {
        this.view.flxMain.setVisibility(false);
        return;
      }
      if (this._isSearchEnabled) {
        this.view.flxSearch.setVisibility(true);
        this.setSearchField();
        this.searchFocusSetup();
      } else {
        this.view.flxSearch.setVisibility(false);
      }
    },*/

    refreshSegment: function(){
      this.setRequestParams();
      this.setContext(this.params);
      this.makeDaoCall();
    },

    setRequestParams: function(){
      this.params = {
        "portfolioId":this.portfolioId,
        "sortBy":this.sortBy,
        "searchByInstrumentName":this.searchText,
      };
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

    makeDaoCall: function(){
      try{
        let objectServiceName = this.getFieldValue(eval("this._segObjService"));
        let operationName = this.getFieldValue(eval("this._segOperation"));
        let objectName = this.getFieldValue(eval("this._segObjName"));
        let serviceResponseIdentifier = this.getFieldValue(eval("this._segIdentifier"));
        this.setCriteriaBasedonSearch();
        this.instrumentListDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceSuccess,this.onError);
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

    onServiceSuccess: function(data,unicode){
      this.completeResponse = data;
      this.instrumentListArray = this.getFieldValue(eval("this._segResponseArray"));
      this.updateInstrumentSeg(data);
    },

    updateInstrumentSeg:function(uidata){
      var searchText=this.view.txtSearch.text;
      //var res= uidata.response;
      var searchList = uidata.instrumentList;
      if(searchList.length>0){
        this.view.flxSegmentFilter.setVisibility(true);
        this.view.flxLable.setVisibility(false);
        this.view.flxSegmentFilter.zIndex = 100;
        var searchData = [];
        searchData = searchList;
        var data=[];
        for (l in searchData){
          var s=searchData[l].description;
          var te=s.toLowerCase();
          if(te.includes(searchText.toLowerCase())){
            data.push(searchData[l]);
          }
        }	
        var segData = [];
        for (var list in data) {
          var storeData;
          var exchange;
          if(data[list].ISIN && data[list].holdingsType )
        {
          exchange = data[list].ISIN + ' | ' + data[list].holdingsType;
        }
        else if(data[list].ISIN)
        {
          exchange = data[list].ISIN;
        }
        else if(data[list].holdingsType )
        {
          exchange = data[list].holdingsType;
        }
        else
        {
          exchange={"isVisible": false};
        }
          storeData = {
            instrumentName: data[list].description,
            marketName: exchange,
            instrumentId: data[list].instrumentId,
            description: data[list].description,
            ISIN: data[list].ISIN,
            holdingsType: data[list].holdingsType,
            RICCode: data[list].RICCode,
            application: data[list].application
          };
         
          segData.push(storeData);
        }


        this.view.segInstrument.widgetDataMap = {
          lblInstrument: "instrumentName",
          lblISIN: "marketName"
        }
        this.view.segInstrument.removeAll();
        this.view.segInstrument.setData(segData);

      }else{
        this.view.flxSegmentFilter.setVisibility(false);
        this.view.flxLable.setVisibility(true);

      }
    },

    setCriteriaBasedonSearch: function(){
      let criterion = this.getFieldValue(eval("this._segCriteria"));
      this.setCriteria(criterion);
    },

    setCriteria:function(criteria){
      var self = this;
      try
      {
        var criteriaObject = JSON.parse(eval("this._segCriteria"));
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

    /**
     * Method to set the Component Config properties in ParserUtilsManager.
     */
    /* setComponentConfig: function () {
      this.ParserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
    },/
    /**
     * Method responsible for getting the breakpoint specific value.
     * @param {JSONObject or String} value - Value that needs to be processed.
     * @return {string} - Processed value
     */
    /* getBreakPointTypeBasedValue: function (value) {
      try {
        var valueJson = JSON.parse(value);
        if (typeof (valueJson) === 'string') {
          value = valueJson;
        } else {
          value = this.ParserUtilsManager.getcomponentConfigValue(valueJson, kony.application.getCurrentBreakpoint());
        }
      } catch (e) {
        kony.print(e);
      }
      if (typeof (value) === 'string') {
        return this.getProcessedText(value);
      } else {
        return this.getProcessedText(JSON.stringify(value));
      }
    },*/
    /**
     * Method to pass the text to parser util to obtain the processed value.
     * @param {string} text - value to be processed.
     * @return {string} - processed value.
     */
    getProcessedText: function (text) {
      return this.parserUtilsManager.getParsedValue(text);
    },
    /**
     * Method to initialize Search Field
     */
    /* setSearchField: function () {
      try {
        if (kony.application.getCurrentBreakpoint() === 640) {
          this.view.flxSearch.width = "93.74%";
          this.view.flxMain.height = this._isFilterEnabled ? "110dp" : "60dp";
        } else {
          this.view.flxSearch.width = this._isFilterEnabled ? "64%" : "95.6%";
          this.view.flxMain.height = "91dp";
        }
       // this.view.flxContainer.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchBackground)));
       // this.view.flxSearch.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchTextBoxNormal)));
        //this.view.txtSearch.placeholder = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._searchPlaceholder)));
        //this.view.txtSearch.placeholderSkin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchPlaceHolder)));
        //this.view.txtSearch.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchText)));
        this.view.lblSearchIcon.text = JSON.parse(this._iconSearch)["vizIcon"];
        this.view.lblSearchIcon.skin = JSON.parse(this._iconSearch)["skin"];
        this.view.lblClearIcon.text = JSON.parse(this._iconClear)["vizIcon"];
        this.view.lblClearIcon.skin = JSON.parse(this._iconClear)["skin"];
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while setting Search field in the UI.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Method to clear search text and hide clear icon
     */
    clearSearchText: function () {
      this.view.txtSearch.text = "";
      this.view.flxClearBtn.setVisibility(false);
      this.view.flxSegmentFilter.setVisibility(false);
      this.view.flxLable.setVisibility(false);
    },
    /**
     * Method to initialize component actions
     */
    initActions: function () {
      try {
        this.view.txtSearch.onDone = this.onSearch;
        this.view.flxSearchBtn.onTouchEnd = this.onSearch;
        this.view.txtSearch.onTextChange = this.onSearchTextChange;
        this.view.flxClearBtn.onTouchStart = this.onSearchClear;
        this.view.segInstrument.onRowClick = this.onsegInstrumentRowClick;
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while initialising Component Actions.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Method used to call the search service with the entered search text 
     */
    onSearch: function () {
      this.searchText=this.view.txtSearch.text;
      this.view.flxClearBtn.setVisibility(true);
      this.refreshSegment();
    },

    /**
     * Method to change the visibility of clear icon
     */
    onSearchTextChange: function () {
      var searchText = this.view.txtSearch.text;
      if (searchText.length >= 3) {
        this.searchText=this.view.txtSearch.text;
        this.view.flxClearBtn.setVisibility(true);
        this.refreshSegment();
      } else {
        this.view.flxClearBtn.setVisibility(false);
        this.view.flxSegmentFilter.setVisibility(false);
        this.view.flxLable.setVisibility(false);
      }
      if(searchText.length >0){
        this.view.txtSearch.skin="ICSknTbxSSP42424215px";
      }
      else{
        this.view.txtSearch.skin="ICSknTbxPlaceholderSSP72727215px";
      }
    },
    /**
     * Method used to clear the search text from search textbox
     */
    onSearchClear: function () {
      try {
        this.view.txtSearch.text = "";
        this.view.flxClearBtn.setVisibility(false);
        this.view.flxSegmentFilter.setVisibility(false);
        this.view.flxLable.setVisibility(false);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while clear Search text from Search textbox.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Method to set selected & unselected row in filter segment when a row is clicked
     */
    onsegInstrumentRowClick: function () {
      var params = this.view.segInstrument.selectedRowItems[0];
      scope_WealthPresentationController.instrumentId = params.instrumentId;
      scope_WealthPresentationController.holdingsType = params.holdingsType;

      var data = {
        "searchByInstrumentName": params.description,
        "portfolioId": this.portfolioId,
        "sortBy": "",
        "navPage": "Holdings",
        "instrumentId":params.instrumentId,
        "ISINCode": params.ISIN,
        "RICCode": params.RICCode
      };
       if(params.application){
      scope_WealthPresentationController.application = params.application;
         data.application = params.application;
       }

      /*  var dataCustom = applicationManager.getNavigationManager().getCustomInfo('frmInstrumentDetails');

       if(dataCustom === undefined){
         dataCustom={};
       }
       dataCustom.currentInstrumentName = params.description;
       applicationManager.getNavigationManager().setCustomInfo('frmInstrumentDetails', dataCustom);*/

      this.viewInstrumentDetails(data);
    },

    getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
            return this.getProcessedText(value);
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },

    returnCurrComponent: function(){
      return this.view;
    }
  };
});