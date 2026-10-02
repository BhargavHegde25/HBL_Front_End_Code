/* eslint-disable */
define(['./addRemoveSearchDAO','./FormatUtils'],function(addRemoveSearchDAO,FormatUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow =  this.preShow;
      this.params = {};
      this.searchText = "";
      this.context = {};
      //Format util object
      this.FormatUtils = new FormatUtils();
      this.businessController = new addRemoveSearchDAO();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'servicecall', () => {
        return this._servicecall;
      });
      defineSetter(this, 'servicecall', value => {
        this._servicecall = value;
      });
    },

    
    preShow: function() {

      try {
        
        if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
          this.view.tbxSearch.contentAlignment = constants.CONTENT_ALIGN_TOP_RIGHT;
        }
        
        
        this.view.tbxSearch.text = "";
        //IW-3611 Vivek Singh
        this.view.tbxSearch.focusSkin="sknTbxPlaceholderDefault";
        //IW-3611
        this.view.imgClose.setVisibility(false);
        this.view.segInstrument.setVisibility(false);
        this.view.flxError.setVisibility(false);
        this.initActions();
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in preshow method of the component.",
          "error": err
        };
        this.onError(errObj);
      }    
    },

    initActions: function () {
      this.view.tbxSearch.onTextChange = this.onSearch;
      this.view.btnCancel.onClick = this.showSearch;
      this.view.imgClose.onTouchEnd = this.clearText;
     
    },

    onSearch: function(){  
      this.view.imgClose.isVisible =  true;
      this.view.segInstrument.removeAll();
      
      //IW-3611 Vivek Singh
      if(this.view.tbxSearch.text === "" || this.view.tbxSearch.text === null || this.view.tbxSearch.text.length === 0){
        this.view.tbxSearch.focusSkin="sknTbxPlaceholderDefault";
      }
      else{
        this.view.tbxSearch.focusSkin="sknTbxSSPf1f1f1B";
      }
      //IW-3611
      if(this.view.tbxSearch.text === "" || this.view.tbxSearch.text === null || this.view.tbxSearch.text.length<3){
        this.view.segInstrument.setVisibility(false);
        this.view.imgClose.isVisible =  false;
      }
      else{
        this.searchText = this.view.tbxSearch.text;
        this.refreshSegment();
      }  


    },


    /**
     * Method used to call the search service with the entered search text
     */
    refreshSegment: function(){
      this.setRequestParams();
      this.setContext(this.params);
      this.makeDaoCall();
    },

    setRequestParams: function(){
      this.params = {
         "isFavouriteSearch": "true",
    	   "sortBy": "instrumentName",
         "searchByInstrumentName":this.searchText,
      };
    },

    setContext: function(context){
      var self = this;
      try
      {
        this.context=context;
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
        this.businessController.fetchDetails(this._servicecall.ServiceName,this._servicecall.OperationName,this._servicecall.ObjectName,this.context,this.onServiceSuccess,this.onError);
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


    onServiceSuccess: function(response) {          
      try
      {
        if(response && response.searchfavoriteInstruments){
          this.updateInstrumentSeg(response);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the Response when i getting from service call",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }    
    },
    

    updateInstrumentSeg:function(uidata){
      try{
      var searchText = this.view.tbxSearch.text;
      var searchList = uidata.searchfavoriteInstruments;
     
      if(searchList.length>0){
        this.view.segInstrument.setVisibility(true);
        this.view.flxError.setVisibility(false);
        this.view.segInstrument.zIndex = 100;
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
        if(data.length === 0){
          this.view.flxError.setVisibility(true);
          this.view.imgClose.setVisibility(false);
          this.view.segInstrument.setVisibility(false);
        }
        else{
          var segData = [];
          for(var list in data) {
            if(data[list].hasOwnProperty("description") && data[list].hasOwnProperty("marketPrice") && data[list].hasOwnProperty("secCCy") && data[list].hasOwnProperty("percentageChange") && data[list].hasOwnProperty("isFavorite")){
              var storeData;
              var favRes = data[list].isFavorite? kony.i18n.getLocalizedString("i18n.wealth.remove"):kony.i18n.getLocalizedString("i18n.wealth.add");
              var forUtility = applicationManager.getFormatUtilManager();
              marketPrice = (data[list].marketPrice && data[list].secCCy)? (forUtility.formatAmountandAppendCurrencySymbol(data[list].marketPrice,data[list].secCCy)):"";             
              var excRate = (data[list].percentageChange > 0) ?("+"+data[list].percentageChange):data[list].percentageChange;
              storeData = {
                instrumentName: data[list].description?data[list].description:"",
                marketPrice: marketPrice?marketPrice:"",               
                exchangeRate : {
                  "text": excRate ? excRate + "%" : "",
                  "skin":  excRate?(excRate.includes("-") ? "sknIblEE0005SSPsb45px" : "sknIbl2f8523SSPsb45px"):"sknIblEE0005SSPsb45px"
                },
                RICCode: data[list].RICCode?data[list].RICCode:"",
                instrumentId: data[list].instrumentId?data[list].instrumentId:"",
                isFavorite: favRes?favRes:"",
                application: data[list].application?data[list].application:"",
                operation : favRes?data[list].isFavorite?"Remove":"Add":"",
                //Vivek - IW-3749 start
                flxRowTwo : {
                  "isVisible": false
                },
                flxRowOne : {
                  "top": "22dp"
                },
                //Vivek - IW-3749 ends
                // IW-3756 Vivek Singh
                flx :{
                  "onClick": function(event, context) {  
                    this.onsegInstrumentRowClick(event, context);                        
                  }.bind(this)  
                }
                // IW-3756
                //Vivek - IW-3749 ends
              };
              segData.push(storeData);
            }
            else{
              this.view.segInstrument.setVisibility(false);
              this.view.flxError.setVisibility(true);
            }

            this.view.segInstrument.widgetDataMap = {
              lblName: "instrumentName",
              lblTwoValueNext: "marketPrice",
              lblThreeValueNext: "exchangeRate",
              lblOption: "isFavorite",
              flxRowTwo:"flxRowTwo",  //Vivek - IW-3749 
              flxRowOne:"flxRowOne",   //Vivek - IW-3749 
              flxOption:"flx"  // Vivek - IW - 3756
            }         
            this.view.segInstrument.removeAll();
            this.view.segInstrument.setData(segData);
          }
        }
      }
      else{
        this.view.segInstrument.setVisibility(false);
        this.view.flxError.setVisibility(true);
		
      }
        } catch (err) {
        var errObj = {
          "errorInfo": "Error in updateInstrumentSeg",
          "error": err
        };
        this.onError(errObj);
      }
    },
   
    
     showSearch: function(){
      this.showVisibleSearchWatch();
    },
    
    
    clearText: function(){
      try{
      this.view.tbxSearch.text = "";
      //IW-3611 Vivek Singh
      this.view.tbxSearch.focusSkin="sknTbxPlaceholderDefault";
      //IW-3611
      this.view.imgClose.isVisible =  false;
      this.view.flxError.isVisible = false;
      this.view.segInstrument.removeAll();
        } catch (err) {
        var errObj = {
          "errorInfo": "Error in clearText",
          "error": err
        };
        this.onError(errObj);
      }
    },

      /**
     * Method to set selected & unselected row in filter segment when a row is clicked
     */
    onsegInstrumentRowClick: function (event, context) {  // IW-3756 Vivek
      try{
      var params = this.view.segInstrument.selectedRowItems[0];
      this.onSearchClear();
      this.viewInstrumentDetails(params);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while clear Search text from Search textbox.",
          "error": err
        };
        this.onError(errObj);
      }
    }, 
   
    onSearchClear: function () {
      try {
        this.view.tbxSearch.text = "";
        this.view.btnCancel.setVisibility(true);
        this.view.segInstrument.setVisibility(false);
        this.view.flxError.setVisibility(false);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while clear Search text from Search textbox.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    onError: function(err) {
      kony.print(JSON.stringify(err));
    },
  };
});