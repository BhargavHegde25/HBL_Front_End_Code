/* eslint-disable */
define(['./instrumentListDAO','./parserUtilsManager','./FormatUtils'],function(InstrumentListDAO,ParserUtilsManager,FormatUtils) {
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {

      //segment
      this._segObjService = "";
      this._segObjName = "";
      this._segOperation = "";
      this._segIdentifier = "";


      //request params
      this.params = {};
      this.searchText = "";
      this.sortBy = "instrumentName";

      //DAO object
      this.instrumentListDAO = new InstrumentListDAO();
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.FormatUtils = new FormatUtils();

      //global variables
      this.context = {};
      this.criteria = {};
      this.portfolioId="";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'segObjService', function () {
        return this._segObjService;
      });
      defineSetter(this, 'segObjService', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segObjService = val;
        }
      });
      defineGetter(this, 'segObjName', function () {
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
      defineGetter(this, 'segIdentifier', function () {
        return this._segIdentifier;
      });
      defineSetter(this, 'segIdentifier', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._segIdentifier = val;
        }
      });
    },
    /**
     * Component preShow
     */
    preShow: function() {
      try {
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
    /**
     * Method to initialize component actions
     */
    initActions: function () {
      try {
        this.view.txtSearch.onDone = this.onSearch;
        this.view.flxSearchBtn.onTouchEnd = this.onSearch;
        this.view.txtSearch.onTextChange = this.onSearchTextChange;
        this.view.flxClearBtn.onTouchStart = this.onSearchClear;
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
      try{
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
        }  
      catch(err)
      {
        kony.print(err);
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
    onsegInstrumentRowClick: function (event,context) {//Bharath - IW-3778 
      var params = context.widgetInfo.data[context.rowIndex];//Bharath - IW-3778
      this.onSearchClear();
      this.viewInstrumentDetails(params);
    },
    /**
     * Method to set the portfolioID
     */  
    setPortfolioId: function(portfolioId){
      this.portfolioId=portfolioId;
    },
    /**
     * Method to set the requestParams and Make businessCall
     */ 
    refreshSegment: function(){
      this.setRequestParams();
      this.setContext(this.params);
      this.makeDaoCall();
    },
    /**
     * Method to set the requestParams
     */ 
    setRequestParams: function(){
      this.params = {
        "isFavouriteSearch": "true",
        "sortBy":this.sortBy,
        "searchByInstrumentName":this.searchText
      };
    },
    /**
     * Method to set the context
     */ 
    setContext: function(context){
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
     * Method to make a serviceCall
     */ 
    makeDaoCall: function(){
      try{
        let objectServiceName = this.getFieldValue(eval("this._segObjService"));
        let operationName = this.getFieldValue(eval("this._segOperation"));
        let objectName = this.getFieldValue(eval("this._segObjName"));
        let serviceResponseIdentifier = this.getFieldValue(eval("this._segIdentifier"));
        this.instrumentListDAO.fetchDetails(objectServiceName,operationName,objectName,this.context,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
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
     * Method which calls for setting data/ update data in the segment
     */ 
    onServiceSuccess: function(data,unicode){
      try{
        if(data && data.searchfavoriteInstruments){
          this.updateInstrumentSeg(data);
        }
      }catch (err) {
        var errorObj = {
          "errorInfo": "Error in the Response when i getting from service call",
          "errorLevel": "Business",
          "error": err
        };
        self.onError(errorObj);
      }

    },
    /**
     * Method which that performs setting of data/ updating of data in the segment
     */ 
    updateInstrumentSeg: function(uidata){
      try{
      var searchText=this.view.txtSearch.text;
      var searchList = uidata.searchfavoriteInstruments;
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
        if(data.length > 0){
          for (var list in data) {
            if(data[list].hasOwnProperty("description") && data[list].hasOwnProperty("marketPrice") && data[list].hasOwnProperty("secCCy") && data[list].hasOwnProperty("percentageChange") && data[list].hasOwnProperty("isFavorite")){
              var storeData;
              var forUtility = applicationManager.getFormatUtilManager();
              marketPrice =  (data[list].marketPrice && data[list].secCCy)? (forUtility.formatAmountandAppendCurrencySymbol(data[list].marketPrice,data[list].secCCy)):"";
              var percentageChange = (data[list].percentageChange > 0) ?("+"+data[list].percentageChange):data[list].percentageChange;
              var favRes = data[list].isFavorite? kony.i18n.getLocalizedString("i18n.wealth.remove"):kony.i18n.getLocalizedString("i18n.wealth.add");
              storeData = {
                instrumentName: data[list].description?data[list].description:"",
                instrumentId: data[list].instrumentId?data[list].instrumentId:"",
                ISIN: data[list].ISIN?data[list].ISIN:"",
                holdingsType: data[list].holdingsType?data[list].holdingsType:"",
                RICCode: data[list].RICCode?data[list].RICCode:"",
                application: data[list].application?data[list].application:"",
                percentageChange : {

                  "text": percentageChange ? percentageChange + "%" : "",
                  "skin":  percentageChange?(percentageChange.includes("-") ? "sknlblff000015px" : "IWLabelGreenText15Px"):"sknlblff000015px"
                },
                isFavorite:favRes?favRes:"",
                marketPrice:marketPrice?marketPrice:"",
                operation : favRes?data[list].isFavorite?"Remove":"Add":"",
                //Bharath IW-3749 start
                flxValues : {
                  "isVisible": marketPrice === ""?false:true
                },
                flxAddInstrument : {
                  "height":  "60dp"
                },
                flxRight:{
                  "top": "-12px"
                },
               //Bharath IW-3749 end
               //Bharath IW-3756 start 
                flx :{
                  "width": data[list].isFavorite? "50dp":"30dp",
                  "onClick": function(event, context) {  
                    this.onsegInstrumentRowClick(event, context);                        
                  }.bind(this)  
                },  //Bharath IW-3756 end
                flxValues:{
                  "isVisible" : false
                }

              }

              segData.push(storeData);
            }else{
              this.view.flxSegmentFilter.setVisibility(false);
              this.view.flxLable.setVisibility(true);
            }

          }
          //Bharath IW-3750 start
          if(data.length <= 3){
         
            this.view.flxSegmentFilter.height = (data.length*60)+"dp";
            this.view.flxSegmentFilter.enableScrolling = false;

          }else{

            this.view.flxSegmentFilter.height = "180dp";
            this.view.flxSegmentFilter.enableScrolling = true;


          }//Bharath IW-3750 end
          
        }else{
          this.view.flxSegmentFilter.setVisibility(false);
          this.view.flxLable.setVisibility(true);
        }



        this.view.segInstrument.widgetDataMap = {
          lblInstrument: "instrumentName",
          lblPriceValue : "marketPrice",
          lblChangeValue : "percentageChange",
          lblAddRemove:"isFavorite",
           //Bharath IW-3756 start 
          flxValues:"flxValues",
          flxAddInstrument:"flxAddInstrument",
          flxRight:"flxRight",
          flxLable:"flx"
           //Bharath IW-3756 end
        }
        this.view.segInstrument.removeAll();
        this.view.segInstrument.setData(segData);

      }else{
        this.view.flxSegmentFilter.setVisibility(false);
        this.view.flxLable.setVisibility(true);
      }
         }  
      catch(err)
      {
        kony.print(err);
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
     * Method that provides the fieldValue specified in the component
     */
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
    /**
     * Method to pass the text to parser util to obtain the processed value.
     * @param {string} text - value to be processed.
     * @return {string} - processed value.
     */
    getProcessedText: function (text) {
      return this.parserUtilsManager.getParsedValue(text);
    },
    /**
     * Method that return current view(frmcontroller)
     */
    returnCurrComponent: function(){
      return this.view;
    }

  };
});