define(['./ParserUtilsManager', './FormatUtils', './WealthDetailsListDAO'],function(ParserUtilsManager, FormatUtils, WealthDetailsListDAO) {

    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
   //declaration for Fields keys & values in the group:Row Data
  
          
			this.cancelOrderIds="";
			this.refCurrency = "";
 			this.response = [];
          this.fullResponse = {};
          this.portfolioDetailsPLs = {};
          this.unformattedTotalValue = "";
          this.formatSkins = {};
          this.formattingJSON = {};
            this._fieldOneKey = "";
			this._fieldTwoKey = "";
            this._fieldThreeKey = "";
            this._fieldFourKey = "";
            this._fieldFiveKey = "";
			this.criteriaObjectValue = {};
            this._fieldOneValue = "";
            this._fieldTwoValue = "";   
            this._fieldThreeValue = "";
            this._fieldFourValue = "";  
            this._fieldFiveValue = "";    
          
            this._fieldOneType = "";
            this._fieldTwoType = "";   
            this._fieldThreeType = "";
            this._fieldFourType = "";  
            this._fieldFiveType = "";  
          //field One is set as fieldID , as there is no "key" for it.
            this._fieldIdOne = "";
         	 this._fieldIdTwo = "";
            this._fieldName = "";
            //declaration for skins of all the field Values in the group: Skins
            this._fieldOneValueSkin = "";
            this._fieldTwoValueSkin = "";
            this._fieldThreeValueSkin = "";
            this._fieldFourValueSkin = "";
            this._fieldFiveValueSkin = "";
          //declaration for error handling Text under group: Error Handling
          this._noRecordsFoundText = "";
          this._placeholderSearchText = "";
          //image sources
          this._actionImgSrc = "";
          this._logoImgSrc = "";
          this._logoIsVisible = "";
          this._actionImgIsVisible = "";
          this._rowSeperatorSkin = "";
          this._currencyCode = "";

          this._serviceName = "";
          this._operationName = "";
          this._objectName = "";
          this._requestParam = "";
          this._serviceResponseKey = "";
          this._topFlex = "";
          this._totalValueKey = "";
          this._totalValue = "";
          this._unrealizedPLKey = "";
          this._unrealizedPLValue = "";
          this._todaysPLKey = "";
          this._todaysPLValue = "";
          this._unrealizedPL = "";
          this._todayPL = "";
          this._unrealizedPLPercentage = "";
          this._todayPLPercentage = "";
		  this._referenceCurrency = "";
          this._orderToggleIsVisible = "";
          this._orderStatusIsVisible = "";
          this._statusImgSrc = "";
          this._statusText = "";
          this._featuresAndPermission ="";
          this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.formatUtils = new FormatUtils();
      this.wealthDetailsListDao = new WealthDetailsListDAO();
      
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
          defineSetter(this, "fieldIdOne", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldIdOne = val;
                }
            });
            //getter method for fieldIdOne in the group:Row Data
            defineGetter(this, "fieldIdOne", function() {
                return this._fieldIdOne;
            });
           defineSetter(this, "fieldIdTwo", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldIdTwo = val;
                }
            });
            //getter method for fieldIdTwo in the group:Row Data
            defineGetter(this, "fieldIdTwo", function() {
                return this._fieldIdTwo;
            });
                    defineSetter(this, "fieldName", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldName = val;
                }
            });
            //getter method for fieldId in the group:Row Data
            defineGetter(this, "fieldName", function() {
                return this._fieldName;
            });
          defineSetter(this, "fieldOneKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldOneKey = val;
                }
            });
           //getter method for fieldOneKey in the group:Row Data
            defineGetter(this, "fieldOneKey", function() {
                return this._fieldOneKey;
            });
          
            defineSetter(this, "fieldTwoKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldTwoKey = val;
                }
            });
           //getter method for fieldTwoKey in the group:Row Data
            defineGetter(this, "fieldTwoKey", function() {
                return this._fieldTwoKey;
            });
          
                      defineSetter(this, "fieldThreeKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldThreeKey = val;
                }
            });
            //getter method for fieldFourKey in the group:Row Data
            defineGetter(this, "fieldThreeKey", function() {
                return this._fieldThreeKey;
            });
                     defineSetter(this, "fieldFourKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFourKey = val;
                }
            });
            //getter method for fieldFourKey in the group:Row Data
            defineGetter(this, "fieldFourKey", function() {
                return this._fieldFourKey;
            });
                               defineSetter(this, "fieldFiveKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFiveKey = val;
                }
            });
            //getter method for fieldFiveKey in the group:Row Data
            defineGetter(this, "fieldFiveKey", function() {
                return this._fieldFiveKey;
            });         
           
          defineSetter(this, "fieldOneValue", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldOneValue = val;
                }
            });
           //getter method for fieldOneValue in the group:Row Data
            defineGetter(this, "fieldOneValue", function() {
                return this._fieldOneValue;
            });
          
            defineSetter(this, "fieldTwoValue", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldTwoValue = val;
                }
            });
           //getter method for fieldTwoValue in the group:Row Data
            defineGetter(this, "fieldTwoValue", function() {
                return this._fieldTwoValue;
            });
          
             defineSetter(this, "fieldThreeValue", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldThreeValue = val;
                }
            });
            //getter method for fieldThreeValue in the group:Row Data
            defineGetter(this, "fieldThreeValue", function() {
                return this._fieldThreeValue;
            });
                     defineSetter(this, "fieldFourValue", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFourValue = val;
                }
            });
            //getter method for fieldFourValue in the group:Row Data
            defineGetter(this, "fieldFourValue", function() {
                return this._fieldFourValue;
            });
              defineSetter(this, "fieldFiveValue", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFiveValue = val;
                }
            });
            //getter method for fieldFiveValue in the group:Row Data
            defineGetter(this, "fieldFiveValue", function() {
                return this._fieldFiveValue;
            });
            defineSetter(this, "fieldOneValueSkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldOneValueSKin = val;
                }
            });
           //getter method for fieldTwoValueSkin in the group:Row Data
            defineGetter(this, "fieldOneValueSkin", function() {
                return this._fieldOneValueSkin;
            });
          
                    defineSetter(this, "fieldTwoValueSkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldTwoValueSKin = val;
                }
            });
           //getter method for fieldTwoValueSkin in the group:Row Data
            defineGetter(this, "fieldTwoValueSkin", function() {
                return this._fieldTwoValueSkin;
            });
          
            defineSetter(this, "fieldThreeValueSkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldThreeValueSkin = val;
                }
            });
           //getter method for fieldThreeValueSkin in the group:Row Data
            defineGetter(this, "fieldThreeValueSkin", function() {
                return this._fieldThreeValueSkin;
            });
          
             defineSetter(this, "fieldFourValueSkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFourValueSkin = val;
                }
            });
            //getter method for fieldFourValueSkin in the group:Row Data
            defineGetter(this, "fieldFourValueSkin", function() {
                return this._fieldFourValueSkin;
            });
                     defineSetter(this, "fieldFiveValueSkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFiveValueSkin = val;
                }
            });
            //getter method for fieldFiveValueSkin in the group:Row Data
            defineGetter(this, "fieldFiveValueSkin", function() {
                return this._fieldFiveValueSkin;
            });
              defineSetter(this, "rowSeperatorSkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._rowSeperatorSkin = val;
                }
            });
            //getter method for fieldSixValueSkin in the group:Row Data
            defineGetter(this, "rowSeperatorSkin", function() {
                return this._rowSeperatorSkin;
            });
          //allFieldKeySkin
                        defineSetter(this, "allFieldKeySkin", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._allFieldKeySkin = val;
                }
            });
            //getter method for fieldSixValueSkin in the group:Row Data
            defineGetter(this, "allFieldKeySkin", function() {
                return this._allFieldKeySkin;
            });
          //noRecordsFoundText
          defineSetter(this, "noRecordsFoundText", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._noRecordsFoundText = val;
                }
            });
            //getter method for fieldSixValueSkin in the group:Row Data
            defineGetter(this, "noRecordsFoundText", function() {
                return this._noRecordsFoundText;
            });
          //imgSources
                    defineSetter(this, "actionImgSrc", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._actionImgSrc = val;
                }
            });
            //getter method for actionImgSrc in the group:Row Data
            defineGetter(this, "actionImgSrc", function() {
                return this._actionImgSrc;
            });
          
              defineSetter(this, "logoImgSrc", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._logoImgSrc = val;
                }
            });
            //getter method for actionImgSrc in the group:Row Data
            defineGetter(this, "logoImgSrc", function() {
                return this._actionImgSrc;
            });
          
            defineSetter(this, "currencyCode", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._currencyCode = val;
                }
            });
            //getter method for currencyCode in the group:Row Data
            defineGetter(this, "currencyCode", function() {
                return this._currencyCode;
            });
          
                      defineSetter(this, "fieldOneType", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldOneType = val;
                }
            });
           //getter method for fieldTwoValueSkin in the group:Row Data
            defineGetter(this, "fieldOneType", function() {
                return this._fieldOneType;
            });
          
                    defineSetter(this, "fieldTwoType", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldTwoType = val;
                }
            });
           //getter method for fieldTwoValueSkin in the group:Row Data
            defineGetter(this, "fieldTwoType", function() {
                return this._fieldTwoType;
            });
          
            defineSetter(this, "fieldThreeType", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldThreeType = val;
                }
            });
           //getter method for fieldThreeValueSkin in the group:Row Data
            defineGetter(this, "fieldThreeType", function() {
                return this._fieldThreeType;
            });
          
             defineSetter(this, "fieldFourType", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFourType = val;
                }
            });
            //getter method for fieldFourValueSkin in the group:Row Data
            defineGetter(this, "fieldFourType", function() {
                return this._fieldFourType;
            });
                     defineSetter(this, "fieldFiveType", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._fieldFiveType = val;
                }
            });
            //getter method for fieldFiveValueSkin in the group:Row Data
            defineGetter(this, "fieldFiveType", function() {
                return this._fieldFiveType;
            });
          
                        defineSetter(this, "amountFormat", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._amountFormat = val;
                }
            });
            //getter method for amount Format in the group:Data format
            defineGetter(this, "amountFormat", function() {
                return this._amountFormat;
            });
               defineSetter(this, "dateFormat", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._dateFormat = val;
                }
            });
            //getter method for backend date format in the group:Data format
            defineGetter(this, "backendDateFormat", function() {
                return this._backendDateFormat;
            });
           
                         defineSetter(this, "backendDateFormat", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._backendDateFormat = val;
                }
            });
            //getter method for backend date format in the group:Data format
            defineGetter(this, "backendDateFormat", function() {
                return this._backendDateFormat;
            });
          //logoIsVisible
                    defineSetter(this, "logoIsVisible", function(val) {
                 if ((typeof val == 'string') && (val != "")) {
                    this._logoIsVisible = val;
                }
            });
            //getter method for logoIsVisible in the group:RowData
            defineGetter(this, "logoIsVisible", function() {
                return this._logoIsVisible;
            });
                    //actionImgIsVisible
                    defineSetter(this, "actionImgIsVisible", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._actionImgIsVisible = val;
                }
            });
            //getter method for actionImgIsVisible in the group:RowData
            defineGetter(this, "actionImgIsVisible", function() {
                return this._actionImgIsVisible;
            });
          //service Name
               //getter method for service Name in the group:Service Handler
            defineGetter(this, "serviceName", function() {
                return this._serviceName;
            });
               defineSetter(this, "serviceName", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._serviceName = val;
                }
            });
             //object Name
               //getter method for object Name in the group:Service Handler
            defineGetter(this, "objectName", function() {
                return this._objectName;
            });
               defineSetter(this, "objectName", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._objectName = val;
                }
            });
               //service Identifer
               //getter method for service Identifier in the group:Service Handler
            defineGetter(this, "serviceIdentifier", function() {
                return this._serviceIdentifier;
            });
               defineSetter(this, "serviceIdentifier", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._serviceIdentifier = val;
                }
            });
          //getter method for operation Name in the group:Service Handler
            defineGetter(this, "operationName", function() {
                return this._operationName;
            });
               defineSetter(this, "operationName", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._operationName = val;
                }
            });
          
                    //getter method for request Params in the group:Service Handler
            defineGetter(this, "requestParam", function() {
                return this._requestParam;
            });
               defineSetter(this, "requestParam", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._requestParam = val;
                }
            });
          
                              //getter method for serviceResponseKey in the group:Service Handler
            defineGetter(this, "serviceResponseKey", function() {
                return this._serviceResponseKey;
            });
               defineSetter(this, "serviceResponseKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._serviceResponseKey = val;
                }
            });
          
                 //getter method for serviceResponseKey in the group:Service Handler
            defineGetter(this, "topFlex", function() {
                return this._topFlex;
            });
               defineSetter(this, "topFlex", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._topFlex = val;
                }
            });
          
                    //getter method for serviceResponseKey in the group:Service Handler
            defineGetter(this, "placeholderSearchText", function() {
                return this._placeholderSearchText;
            });
               defineSetter(this, "placeholderSearchText", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._placeholderSearchText = val;
                }
            });
              //getter method for totalValueKey in the group:Portfolio Values
            defineGetter(this, "totalValueKey", function() {
                return this._totalValueKey;
            });
               defineSetter(this, "totalValueKey", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._totalValueKey = val;
                }
            });
          
                        //getter method for totalValue in the group:Portfolio Values
            defineGetter(this, "totalValue", function() {
                return this._totalValue;
            });
               defineSetter(this, "totalValue", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._totalValue = val;
                }
            });    //getter method for unrealizedPLKey in the group:Portfolio Values
            //getter method for reference Currency in the group:General
            defineGetter(this, 'referenceCurrency', function () {
                return this._referenceCurrency;
            });
               defineSetter(this, "referenceCurrency", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._referenceCurrency = val;
                }
            });
                                  //getter method for orderStatus visibility in the group:Row Data
            defineGetter(this, "orderStatusIsVisible", function() {
                return this._orderStatusIsVisible;
            });
               defineSetter(this, "orderStatusIsVisible", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._orderStatusIsVisible = val;
                }
            });
                                  //getter method for order toggle visibility in the group:UI Properties
            defineGetter(this, "orderToggleIsVisible", function() {
                return this._orderToggleIsVisible;
            });
               defineSetter(this, "orderToggleIsVisible", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._orderToggleIsVisible = val;
                }
            });
            
                   //getter method for status Img Src in the group:Row Data
            defineGetter(this, "statusImgSrc", function() {
                return this._statusImgSrc;
            });
               defineSetter(this, "statusImgSrc", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._statusImgSrc = val;
                }
            });
           //getter method for status Text in the group:Row Data
            defineGetter(this, "statusText", function() {
                return this._statusText;
            });
               defineSetter(this, "statusText", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._statusText = val;
        }
      });
      defineGetter(this, 'featuresAndPermission', () => {
        return this._featuresAndPermission;
      });
      defineSetter(this, 'featuresAndPermission', function (val) {
          if (typeof val == 'string' && val != '') {
        this._featuresAndPermission = val;
                }
            });
            defineGetter(this, 'fieldZeroValueSkin', () => {
                return this._fieldZeroValueSkin;
            });
            defineSetter(this, 'fieldZeroValueSkin', value => {
                this._fieldZeroValueSkin = value;
            });
            defineGetter(this, 'fieldZeroKey', () => {
                return this._fieldZeroKey;
            });
            defineSetter(this, 'fieldZeroKey', value => {
                this._fieldZeroKey = value;
            });
            defineGetter(this, 'fieldZeroValue', () => {
                return this._fieldZeroValue;
            });
            defineSetter(this, 'fieldZeroValue', value => {
                this._fieldZeroValue = value;
            });
            defineGetter(this, 'fieldZeroType', () => {
                return this._fieldZeroType;
            });
            defineSetter(this, 'fieldZeroType', value => {
                this._fieldZeroType = value;
            });
        },
      setEuroFlow(isEuroFlow){
        this.formatUtils.setEuropeFlow(isEuroFlow);
      },
      getPreviousDaysText: function(){
        return this.view.lblPreviousDays.text;
      },
             preShow: function() {
            var scope = this;
               this.view.flxPreviousDays.onClick =  this.onNavigateToNext;
               this.view.flxCashAccounts.onClick =  this.onNavigateToCashAccounts;
               this.view.segList.onRowClick = this.onSegRowClick;
               this.view.btnTglHistory.onClick = this.toggleHistory;
               this.view.btnTglOpen.onClick = this.toggleOpenOrder;
               this.view.SearchAndFilterWealth.placeholderText = this.getFieldValue(this._placeholderSearchText);
               this.view.SearchAndFilterWealth.onSearchTextChange = this.onSearchChangeCall;
               this.view.SearchAndFilterWealth.hideVisibleSearchWatch = this.hideVisibleBox;
			  
			   var criteriaParams = JSON.parse(this._requestParam);
			   if("type" in criteriaParams)
			   {
			   criteriaParams["orderId"]= this.cancelOrderIds;
			  this._requestParam=JSON.stringify(criteriaParams);
			   }
               this.setCriteriaList(this._requestParam);
               this.formattingJSON = {
                    "amountFormat": JSON.parse(this._amountFormat),
                    "dateFormat": this._dateFormat,
                   "backenddateformat": this._backendDateFormat
				 };
 				 
                this.formatSkins = {
                    TEXT_SKIN: "sknLbl424242SSPRegular26px",
                  	TEXT_HIDDEN: "sknHidden",
                    POSITIVE_PERCENTAGE_SKIN: "sknIbl2f8523SSPsb45px",
                    NEGATIVE_PERCENTAGE_SKIN: "sknIblEE0005SSPsb45px",
                    DATE_SKIN: "sknLbl424242SSPRegular26px",
                    AMOUNT_SKIN: "sknLbl424242SSPRegular26px",
                };
               this.getWealthList();
			         let toggleVisible = (this._orderToggleIsVisible == "true")?true:false;
               this.view.flxOrderToggle.setVisibility(toggleVisible);
               if(this._topFlex == "Transactions"){
				 this.view.flxTimePeriod.setVisibility(true);
                 this.view.flxPortfolioValues.setVisibility(false);
                 this.view.flxOrderToggle.setVisibility(false);
                 this.view.flxCashAccounts.setVisibility(false);
                 this.view.SearchAndFilterWealth.setVisibility(true);
               } else if(this._topFlex == "InstrumentTransactions"){
                 this.view.flxTimePeriod.setVisibility(true);
                 this.view.flxPortfolioValues.setVisibility(false);
                 this.view.flxOrderToggle.setVisibility(false);
                 this.view.flxCashAccounts.setVisibility(false);
                 this.view.SearchAndFilterWealth.setVisibility(false);
               }else if(this._topFlex == "Watchlist"){
                 this.view.flxTimePeriod.setVisibility(false);
                 this.view.flxPortfolioValues.setVisibility(false);
                 this.view.flxOrderToggle.setVisibility(false);
                 this.view.flxCashAccounts.setVisibility(false);
                 this.view.SearchAndFilterWealth.setVisibility(true);
               } else if(this._topFlex == "Holdings"){
                  this.view.flxTimePeriod.setVisibility(false);
                 this.view.flxPortfolioValues.setVisibility(true);
                  this.view.flxOrderToggle.setVisibility(false);
                 this.view.flxCashAccounts.setVisibility(false);
                 this.view.SearchAndFilterWealth.setVisibility(true);
               }
               else if(this._topFlex == "Accounts"){
                  this.view.flxTimePeriod.setVisibility(true);
                 this.view.flxCashAccounts.setVisibility(true);
                 this.view.SearchAndFilterWealth.setVisibility(true);
                 this.view.flxPortfolioValues.setVisibility(false);
                 this.view.flxOrderToggle.setVisibility(false);
               }
               else if(this._topFlex == "Orders"){
                 var ordersPermissionsString= this.onOrdersComponentLoad("componentUI");
                 let openOrderPermission=ordersPermissionsString.split("|")[0];
                 let historyOrderPermission=ordersPermissionsString.split("|")[1];
                 if(openOrderPermission==="true" && historyOrderPermission==="true"){
                   this.view.flxOrderToggle.setVisibility(true);
                   this.view.flxOrder.setVisibility(true);
                   this.view.lblCommon.setVisibility(false);
                   let activeSkin = 'sknBtnFFFFFFBdr10px';
                   let inactiveSkin = 'sknbtn000000SSPSemiBold15px';
                   var existingparam = this.criteriaObjectValue;
                   if( existingparam !== "" && existingparam !== 'undefined' && existingparam.type=="history"){
                     this.view.btnTglHistory.skin = activeSkin;
                     this.view.btnTglOpen.skin = inactiveSkin;
                     this.view.flxTimePeriod.setVisibility(true);
                     this._actionImgIsVisible = "false";
                     this._orderStatusIsVisible = "true"; 
                   }
                   else
                   {
                     this.view.btnTglOpen.skin = activeSkin;
                     this.view.btnTglHistory.skin = inactiveSkin;
                     this._orderStatusIsVisible = "false";
                     this.view.flxTimePeriod.setVisibility(false);
                   }
                 }else if(openOrderPermission==="true"){
                   this.view.flxOrderToggle.setVisibility(true);
                   this._orderStatusIsVisible = "false";
                   this.view.flxTimePeriod.setVisibility(false);	
                   this.view.flxOrder.setVisibility(false);
                   this.view.lblCommon.setVisibility(true);
                   this.view.lblCommon.text = "Open Orders";	
				   this.view.lblCommon.skin='sknBtnFFFFFFBdr10px';				   
                 }else if(historyOrderPermission==="true"){
                   this.view.flxOrderToggle.setVisibility(true);
                   this.view.flxTimePeriod.setVisibility(true);
                   this._actionImgIsVisible = "false";
                   this._orderStatusIsVisible = "true"; 
                   this.view.flxOrder.setVisibility(false);
                   this.view.lblCommon.setVisibility(true);
                   this.view.lblCommon.text = "History";
				   this.view.lblCommon.skin='sknBtnFFFFFFBdr10px';
                 }
                 this.view.SearchAndFilterWealth.setVisibility(true);
                 this.view.flxCashAccounts.setVisibility(false);
                 this.view.flxPortfolioValues.setVisibility(false);
               }
               else{
               	 this.view.flxTimePeriod.setVisibility(false);
                 this.view.flxCashAccounts.setVisibility(false);
                 this.view.SearchAndFilterWealth.setVisibility(true);
                 this.view.flxPortfolioValues.setVisibility(false);
                 this.view.flxOrderToggle.setVisibility(false);
               }
             try {
               
                
                //this.view.segList.isVisible = false;
              //call to get the list
              //scope.getList();
                }
            catch (err) {
                var errorObj = {
                    "errorInfo": "Error in preShow",
                    "errorLevel": "Configuration",
                    "error": err
                };
            }
        },
      
      hideVisibleBox: function() {
           	this.hideHeaderWatch();    
        },
      
      onSearchChangeCall: function(params){
		var existingparam = this.criteriaObjectValue;
            if(params !== "" || params  !== undefined){
              existingparam.searchByInstrumentName = params;
              this.criteriaObjectValue = existingparam;
            }
         this.setContext(existingparam);   
        this.getWealthList();
      },
      getCriteriaObjValue : function(){
        return this.criteriaObjectValue;
      },
      getRefCurrency: function(){
        return this.refCurrency;
      },
        setCriteriaList: function(criteria) {
            var self = this;
            try {
                var criteriaObject = JSON.parse(this._requestParam);
                for (var key in criteriaObject) {
                    criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
                }
                var criteriaJSON = criteria;
                if (typeof(criteria) == "string") {
                    criteriaJSON = JSON.parse(criteria);
                }
                for (var key in criteriaJSON) {
                    criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
                }
//                 if (self._months) {
//                     var mappedKey = this.getFieldValue(self._months, "mapping");
//                     criteriaObject[mappedKey] = this.getFieldValue(self._months, mappedKey);
//                 }
//                 if (self._maxRecords) {
//                     var mappedKey = this.getFieldValue(self._maxRecords, "mapping");
//                     criteriaObject[mappedKey] = this.getFieldValue(self._maxRecords, mappedKey);
//                 }
                this.criteriaObjectValue = criteriaObject;
               if ((this.criteriaObjectValue["type"] == "open") && ((this.criteriaObjectValue["startDate"] == "startDate") || (this.criteriaObjectValue["endDate"] == "endDate") || (this.criteriaObjectValue["searchByInstrumentName"] == "searchByInstrumentName"))) {
    this.criteriaObjectValue["startDate"] = "";
    this.criteriaObjectValue["endDate"] = "";
    this.criteriaObjectValue["searchByInstrumentName"] = "";
} else if ((this.criteriaObjectValue["type"] == "history") && (this.criteriaObjectValue["searchByInstrumentName"] == "searchByInstrumentName")) {
    this.criteriaObjectValue["searchByInstrumentName"] = "";
}else if ((this.criteriaObjectValue["type"] == "Watchlist") && (this.criteriaObjectValue["searchByInstrumentName"] == " ")) {
this.criteriaObjectValue["searchByInstrumentName"] ="";
}
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the criteria",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
     getCriteriaList: function() {
            var self = this;
            try {
                return this.criteriaObjectValue;
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in returning criteria",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
            return "";
        },
      setCashAccounts: function(accountData){
        if (this._topFlex == "Watchlist"){
          this.view.lblCashAccount.setVisibility(false);
          this.view.flxCash.width = "100%";
          this.view.flxCash.left = "0%";
          this.view.lblCash.left = "20dp";
          this.view.lblCash.text = scope_WealthPresentationController.watchlistAccountName;
        } else {
          this.view.lblCashAccount.setVisibility(true);
          this.view.flxCash.width = "50%";
          this.view.flxCash.left = "50%";
          this.view.lblCash.text = accountData.response;
        }
    },
      setLblPreviousDays: function(dateRange){
        if(dateRange.selectedPeriod){
          if(dateRange.selectedPeriod=="previous30DaysSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.previous30Days");
          }else if(dateRange.selectedPeriod=="3MonthsSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.threeMonths");
          }else if(dateRange.selectedPeriod=="6MonthsSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.sixMonths");
          }else if(dateRange.selectedPeriod=="lastYearSelected"){
            this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.lastYear");
          }else{
            var startDateObj=dateRange.startDate.split("-");
            var formattedstartDate=startDateObj[1] +"/"+ startDateObj[2] +"/"+ startDateObj[0];
            var endDateObj=dateRange.endDate.split("-");
            var formattedendDate=endDateObj[1] +"/"+ endDateObj[2] +"/"+ endDateObj[0];
            this.view.lblPreviousDays.text=formattedstartDate + " - " + formattedendDate;
          }
        }else{

          this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.previous30Days"); 
        }
      },
        getWealthList: function(serviceResponse) {
            var self = this;
           this.onRequestStart();
            try {
                this.wealthDetailsListDao.fetchHoldingsList(this._serviceName, this._operationName, this._objectName, this.getCriteriaList(), this.processResponse, this.onError);
            } catch (err) {
                this.onRequestEnd();
                var errorObj = {
                    "errorInfo": "Error in doing service call to fetch transactions",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
	onError: function(errorObj){
      this.view.segList.setVisibility(false);
    if (this._topFlex == "Orders")
	 { 
		 var obj = JSON.parse(this._noRecordsFoundText);
    	 this.view.lblError.text = obj["error"];
     }
	else{
		 //this.view.lblError.text = this._noRecordsFoundText;
         this.view.lblError.text = kony.i18n.getLocalizedString(this._noRecordsFoundText);
	 }
      this.view.lblError.setVisibility(true);
	  this.onRequestEnd();
    },
        /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
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
         * Component fetchFieldData
         * Returns the actual value at the given index from the response for the key provided 
         * value {object/String} - The key or object of keys for which the value needs to be returned from the array of records
         * data {array} - The array of records which will be queried
         * index {number} - The index in the array of records at which the value will be retrieved
         * @return : {String/Object} - The value retrieved from the array of records for a key at a particular index 
         */
        fetchFieldData: function(value, data, index) {
            if (typeof value === "string") {
                return data[index][value];
            } else if (typeof value === "object") {
                for (var property in value) {
                    if (value.hasOwnProperty(property)) {
                        value[property] = data[index][value[property]];
                    }
                }
                return value;
            }
        },
      
 
              /**
         * Component isEmptyNullUndefined
         * Verifies if the value is empty, null or undefined
         * data {string} - value to be verified
         * @return : {boolean} - validity of the value passed
         */
        isEmptyNullUndefined: function(data) {
            if (data === null || data === undefined || data === "")
                return true;

            return false;
        },
       getWidgetDataMap: function() {
            return {
                "lblName": "lblName",
                "imgLogo": "imgLogo",
                "imgChevron": "imgChevron",
                "lblId": "lblId",
                "lblZeroValue": "lblZeroValue",
                "lblZeroKey": "lblZeroKey",
                "lblOneValue": "lblOneValue",
                "lblOneKey": "lblOneKey",
                "lblTwoValue": "lblTwoValue",
                "lblTwoKey": "lblTwoKey",
                "lblThreeValue": "lblThreeValue",
                "lblThreeKey": "lblThreeKey",
                "lblFourValue": "lblFourValue",
                "lblFourKey": "lblFourKey",
                "lblFiveValue": "lblFiveValue",
                "lblFiveKey": "lblFiveKey",
                "flxBottomBorder": "flxBottomBorder",
              	"flxClick": "flxClick",
                "flxRowOne": "flxRowOne",
                "flxRowTwo": "flxRowTwo",
                "flxRowThree": "flxRowThree",
                "flxRowFour": "flxRowFour",
				"lblStatus":"lblStatus",
				"flxStatus": "flxStatus",
				"imgStatus":"imgStatus"
            };
        },
            onSegRowClick: function(event,context) {
            var rowindex;
             var scope = this;
           var selectedrowdata = {};
            rowindex = Math.floor(this.view.segList.selectedRowIndex[1]);
            selectedrowdata.row = this.response[rowindex];
            selectedrowdata.referenceCurrency = this.fullResponse[scope._referenceCurrency];
			
			//this.onRowClickEvent(selectedrowdata);
			 var existingparam = this.criteriaObjectValue;
			 if(existingparam !== "" && existingparam  !== undefined){
			if (typeof existingparam.type === 'undefined' || existingparam.type === "history" ||existingparam.type === "Transactions") {
				this.onRowClickEvent(selectedrowdata);
				}
			}
            },
         //getList: function(){
          // this.getWealthList();
           //service call goes here
          
//            this.response = [
//   {
//         "orderType":"Buy Limit",
//         "fees":"2.46",
//         "quantity":"5",
//         "limitPrice":"492.38",
//         "netAmount":"2981.88",
//         "description":"L.V.M.H.",
//         "instrumentAmount":"2461.90",
//         "tradeDate":"2020-09-02",
//         "valueDate":"2020-09-02",
//         "ISIN":"FR0000121014",
//         "transactionId":"4",
//         "total":"2464.36",
//         "exchangeRate":"1.21",
//         "RICCode":"LVMH.PA",
//         "instrumentCurrency":"EUR",
//         "holdingsType":"PAR",
//         "pl":"-40.54",
//     },
//     {
//         "orderType":"Sell Limit",
//         "fees":"2.46",
//         "quantity":"5",
//         "limitPrice":"492.38",
//         "netAmount":"2981.88",
//         "description":"ALPHABET INC A",
//         "instrumentAmount":"2461.90",
//         "tradeDate":"2020-09-02",
//         "valueDate":"2020-09-02",
//         "ISIN":"FR0000121014",
//         "transactionId":"4",
//         "total":"2464.36",
//         "exchangeRate":"1.21",
//         "RICCode":"LVMH.PA",
//         "instrumentCurrency":"EUR",
//         "holdingsType":"PAR",
//      	"pl":"55.54",
//     }
// ];
         //},
      processResponse: function(listResponse){
       if(this._topFlex == "Watchlist"){
        applicationManager.getPresentationUtility().showLoadingScreen();
       }
        var responseKey = this._serviceResponseKey;
        var arr = [];
        arr = responseKey.split(".");
        var temp ;
        if(arr.length>1){
          temp = listResponse[arr[0]];
          this.response = temp[arr[1]];
        }
        else{
        this.response = listResponse[this._serviceResponseKey]; }
        this.fullResponse = listResponse;
        
        // ADP-6682(MB) - Set Alert Price
        if(this.fullResponse && this.fullResponse.favoriteInstruments)
          {
            var fullWatchlistResponse = this.fullResponse;
            if(scope_WealthPresentationController.instruList.length === 0)                            //processResponse
            {
                for(let i in fullWatchlistResponse.favoriteInstruments)
                {
                  fullWatchlistResponse.favoriteInstruments[i].alertValue = "";
                  fullWatchlistResponse.favoriteInstruments[i].condition = "";
                }

                for(let i=0; i<fullWatchlistResponse.favoriteInstruments.length; i++){
                      scope_WealthPresentationController.instruList[i] = fullWatchlistResponse.favoriteInstruments[i];
                }
            }
            
            var navManager = applicationManager.getNavigationManager();
			navManager.setCustomInfo('segDet', fullWatchlistResponse);
          }
        // ADP-6682(MB) - Set Alert Price
        
        
//         this.setContext(this.response);
           var scope = this;
        if(this._topFlex == "Holdings"){
          var unrealizedPLPercentage="";
          this.unformattedTotalValue = this.portfolioDetailsPLs.marketValue;
          var formattedAmt = this.formatUtils.formatText(this.portfolioDetailsPLs.marketValue, "Amount", this.formatSkins, this.formattingJSON, listResponse[scope._referenceCurrency]);
          this.refCurrency = listResponse[scope._referenceCurrency];
          this.view.lblTotalVal.text = formattedAmt.text;
          this.view.lblTotalValue.text = this.getFieldValue(scope._totalValueKey);
          var unrealizedPL = this.formatUtils.formatText(this.portfolioDetailsPLs.unRealizedPLAmount, "Amount", this.formatSkins, this.formattingJSON, listResponse[scope._referenceCurrency]);
          if(this.portfolioDetailsPLs.unRealizedPLPercentage !== undefined && this.portfolioDetailsPLs.unRealizedPLPercentage!==""){
           unrealizedPLPercentage = (this.formatUtils.formatAmount(this.portfolioDetailsPLs.unRealizedPLPercentage)).replace(",", ".");  
          }
          
          //forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
           if (this.portfolioDetailsPLs.todayPLAmount !== undefined && this.portfolioDetailsPLs.todayPLAmount !== ""){
          var todaysPL = this.formatUtils.formatText(this.portfolioDetailsPLs.todayPLAmount, "Amount", this.formatSkins, this.formattingJSON, listResponse[scope._referenceCurrency]);
          var todaysPLPercentage = (this.formatUtils.formatAmount(this.portfolioDetailsPLs.todayPLPercentage)).replace(",", ".");
           }
             //forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
          if (this.portfolioDetailsPLs.unRealizedPL == "P") {
            this.view.lblUnrealizedPLValue.skin = "sknIWlbl2F8523SemiBold15px";
            this.view.lblUnrealizedPLValue.text = unrealizedPLPercentage!==""?("+" + unrealizedPL.text + " (+" + unrealizedPLPercentage + "%)"):"+" + unrealizedPL.text;
          } else {
            this.view.lblUnrealizedPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblUnrealizedPLValue.text = unrealizedPLPercentage!==""?("-" + unrealizedPL.text + " (-" + unrealizedPLPercentage + "%)"):"-" + unrealizedPL.text;
          }
          if(this.portfolioDetailsPLs.todayPLAmount!==undefined && this.portfolioDetailsPLs.todayPLAmount!=="")
            {
            	if (this.portfolioDetailsPLs.todayPL == "P") {
            this.view.lblTodayPLValue.skin = "sknIWlbl2F8523SemiBold15px";
            this.view.lblTodayPLValue.text = "+" + todaysPL.text + " (+" + todaysPLPercentage + "%)";
          } else {
            this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblTodayPLValue.text = "-" + todaysPL.text + " (-" + todaysPLPercentage + "%)";
          }  
            }
          else
            {
          		this.view.flxTodayPL.setVisibility(false);    
            }
          
            
          /*if (listResponse[scope._unrealizedPL] == "P") {
            this.view.lblUnrealizedPLValue.skin = "sknIWlbl2F8523SemiBold15px";
            this.view.lblUnrealizedPLValue.text = "+" + unrealizedPL.text + " (+" + unrealizedPLPercentage + "%)";
          } else {
            this.view.lblUnrealizedPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblUnrealizedPLValue.text = "-" + unrealizedPL.text + " (-" + unrealizedPLPercentage + "%)";
          }
            if (listResponse[scope._todayPL] == "P") {
            this.view.lblTodayPLValue.skin = "sknIWlbl2F8523SemiBold15px";
            this.view.lblTodayPLValue.text = "+" + todaysPL.text + " (+" + todaysPLPercentage + "%)";
          } else {
            this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblTodayPLValue.text = "-" + todaysPL.text + " (-" + todaysPLPercentage + "%)";
          }*/
        }
		   this.refCurrency = listResponse[scope._referenceCurrency];
           this.modifySegmentData();
        if (this._topFlex == "Orders" && listResponse.totalCount == 0) {
		  var obj = JSON.parse(this._noRecordsFoundText);
          this.view.segList.setVisibility(false);
          this.view.lblError.setVisibility(true);
          var existingparam = this.criteriaObjectValue;
          if( existingparam !== "" && existingparam !== 'undefined' && existingparam.type=="history")
          { 			
            this.view.lblError.text = this.getFieldValue(obj["history"]);
          }
          else{
            this.view.lblError.text = this.getFieldValue(obj["open"]);
          }
        }
        else if(this._topFlex == "InstrumentTransactions" && listResponse.totalCount == 0){
          this.view.segList.setVisibility(false);
          this.view.lblError.setVisibility(true);
          //this.view.lblError.text =this.getFieldValue(this._noRecordsFoundText);
          this.view.lblError.text =kony.i18n.getLocalizedString(this._noRecordsFoundText);
        }
        else if(this._topFlex != "Orders" && listResponse.totalCount == 0){
          this.view.segList.setVisibility(false);
          this.view.lblError.setVisibility(true);
          this.view.lblError.text =this.getFieldValue(this._noRecordsFoundText);
          //this.view.lblError.text =kony.i18n.getLocalizedString(this._noRecordsFoundText);
        }
		   this.onRequestEnd();
         },
             getFieldValue: function(Value, type) {
            try {
                var value = Value;
                if (typeof(Value) == "string") {
                    value = JSON.parse(Value);
                }
              if(Value === ""){
                return "";
              }
                if (!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)) {
                    value = value[key];
                }
                if (value !== null && value !== "" && value !== undefined) {
                    if (typeof(value) == "string")
                        return this.getProcessedText(value);
                    else {
                        //var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
                        return this.getProcessedText(value);
                    }
                } else return "";
            } catch (err) {
               this.onRequestEnd();
                kony.print(err);
            }
            return this.getProcessedText(Value);
        },

        /**
         * Component getProcessedText
         * Pass the text to format util to obtained the processed value.
         * text {string} - value to be processed
         * @return : {string} - processed value
         */
        getProcessedText: function(text) {
            return this.parserUtilsManager.getParsedValue(text);
        },
      
      splitValueField: function(valueToSplit, resObj){
        let temp = [];
        temp = valueToSplit.split(",");
        var result = {};
        var curr = "";
        if(temp.length == 1){
          curr = resObj[this._currencyCode];
          if(curr == undefined){
            curr = this.refCurrency;
          }
          result = {value:temp[0],currency:curr};
        }
        else{
          curr = this.fullResponse[temp[1]];
          if(curr == undefined){
            curr = resObj[temp[1]];
          }
          result = {value:temp[0],currency:curr};
        }
        return result;
      },
        modifySegmentData: function() {
          this.view.lblError.setVisibility(false);
          var segData = [];
          var formUtilityMan = applicationManager.getFormatUtilManager(); 
             var scopeObj = this;  
            for (var i in this.response) {
                var record = {};
                var resObj = this.response[i];
                var skinId = "";
                let valueObj;
              if(scopeObj._fieldName!== "" && scopeObj._fieldName!== undefined){
                var truncatedText = this.formatUtils.truncateStringWithGivenLength(resObj[scopeObj._fieldName], 38);
                record["lblName"] = {
                  "text": truncatedText
                };
              }
			  else if (scopeObj._fieldName === "" || scopeObj._fieldName === undefined){
				   record["lblName"] = {
                  "text": ""
                };
			  }
              if(this._topFlex == "InstrumentTransactions")
                {
			      record["lblId"] = {isVisible: false};
                  record["lblZeroKey"] = {isVisible: true};
                  record["lblZeroValue"] = {isVisible: true};
                  record["lblZeroKey"] = {
                    "text": this.getFieldValue(scopeObj.fieldZeroKey),
                    "skin": scopeObj._allFieldKeySkin,
                    "isVisible": (scopeObj.fieldZeroKey !== "") ? true : false
                };
                  valueObj = this.splitValueField(scopeObj._fieldZeroValue, resObj);
                  record["lblZeroValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldZeroType, this.formatSkins, this.formattingJSON, valueObj.currency);
                  record["lblZeroValue"].isVisible = (valueObj.value !== "") ? true : false
                  skinId = record["lblZeroValue"].skin;
                  record["lblZeroValue"].skin = (scopeObj._fieldZeroValueSkin !== "") ? scopeObj._fieldZeroValueSkin : skinId;
                }
              else{
                record["lblId"] = {isVisible: true};
                record["lblZeroKey"] = {isVisible: false};
                record["lblZeroValue"] = {isVisible: false};
              var ISIN=(resObj[scopeObj._fieldIdOne] !== undefined && resObj[scopeObj._fieldIdOne] !== "")? (resObj[scopeObj._fieldIdOne]):"";
              var holdingsType=(resObj[scopeObj._fieldIdTwo] !== undefined && resObj[scopeObj._fieldIdTwo] !== "")?(resObj[scopeObj._fieldIdTwo]):"";
              var ISINText=(ISIN !== "")?ISIN:"";
              if(holdingsType !== ""){
                if (ISINText !== ""){
                  ISINText=ISINText + "|" + holdingsType;
                }
                else{
                  ISINText = holdingsType;
                }
              }
              var isISINTextVisible=(ISINText!=="")?true:false;
              record["lblId"] = {
                "text": ISINText,
                "isVisible": isISINTextVisible
              };
              if((record["lblId"].text == undefined || record["lblId"].text == "") ||(scopeObj._fieldIdOne == "" && scopeObj._fieldIdTwo == "")){	
						record["flxRowTwo"] = {
                        isVisible: false
                    };
				}
              }
                record["lblOneKey"] = {
                    "text": this.getFieldValue(scopeObj._fieldOneKey),
                    "skin": scopeObj._allFieldKeySkin,
                    "isVisible": (scopeObj._fieldOneKey !== "") ? true : false
                };
                valueObj = this.splitValueField(scopeObj._fieldOneValue, resObj);
                //record["lblOneValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldOneValue], scopeObj._fieldOneType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
                record["lblOneValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldOneType, this.formatSkins, this.formattingJSON, valueObj.currency);
                //record["lblOneValue"].isVisible = (scopeObj._fieldOneValue !== "") ? true : false
                record["lblOneValue"].isVisible = (valueObj.value !== "") ? true : false
                skinId = record["lblOneValue"].skin;
                record["lblOneValue"].skin = (scopeObj._fieldOneValueSkin !== "") ? scopeObj._fieldOneValueSkin : skinId;
                record["lblTwoKey"] = {
                    "text": this.getFieldValue(scopeObj._fieldTwoKey),
                    "skin": scopeObj._allFieldKeySkin,
                    "isVisible": (scopeObj._fieldTwoKey !== "") ? true : false
                };
               valueObj = this.splitValueField(scopeObj._fieldTwoValue, resObj);
               // record["lblTwoValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldTwoValue], scopeObj._fieldTwoType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
                record["lblTwoValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldTwoType, this.formatSkins, this.formattingJSON, valueObj.currency);
                //record["lblOneValue"].isVisible = (scopeObj._fieldTwoValue !== "") ? true : false
                record["lblTwoValue"].isVisible = (valueObj.value !== "") ? true : false;
                skinId = record["lblTwoValue"].skin;
                record["lblTwoValue"].skin = (scopeObj._fieldTwoValueSkin !== "") ? scopeObj._fieldTwoValueSkin : skinId;
                record["lblTwoValue"].left = (record["lblTwoKey"].isVisible == false) ? (record["lblTwoValue"].left = "20dp") : (record["lblTwoValue"].left = "80dp");
                record["lblThreeKey"] = {
                    "text": this.getFieldValue(scopeObj._fieldThreeKey),
                    "skin": scopeObj._allFieldKeySkin,
                  "isVisible": (scopeObj._fieldThreeKey !== "") ? true : false
                };
               valueObj = this.splitValueField(scopeObj._fieldThreeValue, resObj);
              if (scopeObj._fieldThreeValue === "orderType"){
               //record["lblThreeValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldThreeValue], scopeObj._fieldThreeType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
               record["lblThreeValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldThreeType, this.formatSkins, this.formattingJSON,valueObj.currency);
              } 
              else if (scopeObj._fieldThreeValue === "lastRate"){            

               // record["lblThreeValue"] = formUtilityMan.formatAmountandAppendCurrencySymbol(resObj[scopeObj._fieldThreeValue], resObj[scopeObj._currencyCode]);
                record["lblThreeValue"] = 
				{
					"text": formUtilityMan.formatAmountandAppendCurrencySymbol(resObj[valueObj.value], valueObj.currency)
				}
              }
              else{
                //record["lblThreeValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldThreeValue], scopeObj._fieldThreeType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
                record["lblThreeValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldThreeType, this.formatSkins, this.formattingJSON,valueObj.currency);
              }
              //record["lblThreeValue"].isVisible = (scopeObj._fieldThreeValue !== "") ? true : false;
              record["lblThreeValue"].isVisible = (valueObj.value !== "") ? true : false;
                skinId = record["lblThreeValue"].skin;
                record["lblThreeValue"].skin = (scopeObj._fieldThreeValueSkin !== "") ? scopeObj._fieldThreeValueSkin : skinId;

              valueObj = this.splitValueField(scopeObj._fieldFourValue, resObj);
              
              if(this._topFlex == "Watchlist"){
				  if(record["lblThreeValue"].length >= 9)
				  {
					  var a = 7*(record["lblThreeValue"].length) + 25;
					  record["lblThreeKey"].right = a + "dp";
				  }
				  else if(record["lblThreeValue"].length <9)
				  {
					  var a = 7.5*(record["lblThreeValue"].length) + 25;
					  record["lblThreeKey"].right = a + "dp";
				  }
                
                if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
                  record["lblThreeKey"].left = record["lblThreeKey"].right;
                  record["lblThreeKey"].right = "";
                }
                  
                record["lblThreeKey"].text = kony.i18n.getLocalizedString("i18n.wealth.Latest");
                record["lblTwoKey"].text = kony.i18n.getLocalizedString("i18n.Wealth.Change");
              }
              
              if("orderReference" in resObj) {
				record["lblThreeKey"].right= "32%";
                if(resObj[scopeObj._statusText] !== "Open" && (resObj[scopeObj._statusText] !== "Completed" || resObj["orderExecutionPrice"] ==="")) {
                  record["lblFourKey"] = {
                    "isVisible": false
                  };
                 
                  record["lblFourValue"]= {
                    "isVisible": false
                  };
                } else if(resObj[scopeObj._statusText] === "Completed") {
                  var orderExecutionPriceKey = "";
                  var orderExecutionPriceValue = "";
                  orderExecutionPriceKey = this.getFieldValue(scopeObj._fieldFourKey.split("|")[1]);
                  record["lblFourKey"] = {
                    "text": orderExecutionPriceKey,
                    "skin": scopeObj._allFieldKeySkin,
                    "isVisible": (scopeObj._fieldFourKey !== "") ? true : false
                  };
                  
                 // orderExecutionPriceValue = scopeObj._fieldFourValue.split("|")[1];
                  orderExecutionPriceValue = valueObj.value.split("|")[1];
                  //record["lblFourValue"] = this.formatUtils.formatText(resObj[orderExecutionPriceValue], scopeObj._fieldFourType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
                  record["lblFourValue"] = this.formatUtils.formatText(resObj[orderExecutionPriceValue], scopeObj._fieldFourType, this.formatSkins, this.formattingJSON, valueObj.currency);
                  //record["lblFourValue"].isVisible = (scopeObj._fieldFourValue !== "") ? true : false;
                  record["lblFourValue"].isVisible = (valueObj.value !== "") ? true : false;
				  record["lblFourValue"].left = (record["lblFourKey"].isVisible == false) ? (record["lblFourValue"].left = "20dp") : (record["lblFourValue"].left = "18%");
                  if(record["lblOneKey"].isVisible == true)
                    record["lblOneKey"].right = (record["lblOneValue"].text.length < 11) ? record["lblOneKey"].right = "25%" : record["lblOneKey"].right = "33%";
                  if(record["lblThreeKey"].isVisible == true){
//                   if(this._topFlex == "Watchlist")
//                   record["lblThreeKey"].right = (record["lblThreeValue"].length < 11) ? record["lblThreeKey"].right = "25%" : record["lblThreeKey"].right = "30%";
//                   else
//                     record["lblThreeKey"].right = (record["lblThreeValue"].text.length < 11) ? record["lblThreeKey"].right = "25%" : record["lblThreeKey"].right = "30%";
                  }
                    //if(record["lblFiveKey"].isVisible == true)
                 // record["lblFiveKey"].right = (record["lblFiveValue"].text.length < 11) ? record["lblFiveKey"].right = "23%" : record["lblFiveKey"].right = "27%";
                  if(this._topFlex == "InstrumentTransactions")
                  record["lblFourValue"].left = "110dp";
                  if(record["lblFourValue"].text==="")
                  {
                    record["lblFourKey"] = {
                      "isVisible": false
                    };
                    record["lblFourValue"]= {
                      "isVisible": false
                   };
                  }
                }
                else{
                  var limitPriceKey = "";
                  var limitPriceValue = "";
                  limitPriceKey = this.getFieldValue(scopeObj._fieldFourKey.split("|")[0]);
                  limitPriceValue = valueObj.value.split("|")[0];
                  record["lblFourKey"] = {
                    "text": limitPriceKey,
                    "skin": scopeObj._allFieldKeySkin,
                    "isVisible": (scopeObj._fieldFourKey !== "") ? true : false
                  };
                  record["lblFourValue"] = this.formatUtils.formatText(resObj[limitPriceValue], scopeObj._fieldFourType, this.formatSkins, this.formattingJSON, valueObj.currency);
                  record["lblFourValue"].isVisible = (valueObj.value !== "") ? true : false;
				  record["lblFourValue"].left = (record["lblFourKey"].isVisible == false) ? (record["lblFourValue"].left = "20dp") : (record["lblFourValue"].left = "26%");
                  if(record["lblOneKey"].isVisible == true)
                    record["lblOneKey"].right = (record["lblOneValue"].text.length < 11) ? record["lblOneKey"].right = "25%" : record["lblOneKey"].right = "33%";
                  if(record["lblThreeKey"].isVisible == true){
//                     if(this._topFlex == "Watchlist")
//                   record["lblThreeKey"].right = (record["lblThreeValue"].length < 11) ? record["lblThreeKey"].right = "25%" : record["lblThreeKey"].right = "30%";
//                   else
//                     record["lblThreeKey"].right = (record["lblThreeValue"].text.length < 11) ? record["lblThreeKey"].right = "25%" : record["lblThreeKey"].right = "30%";
                  }
                  if(this._topFlex == "InstrumentTransactions")
                  record["lblFourValue"].left = "110dp";
                  if(record["lblFourValue"].text==="")
                  {
                    record["lblFourKey"] = {
                      "isVisible": false
                    };
                    record["lblFourValue"]= {
                      "isVisible": false
                    };

                  }

                }
                skinId = record["lblFourValue"].skin;
                record["lblFourValue"].skin = (scopeObj._fieldFourValueSkin !== "") ? scopeObj._fieldFourValueSkin : skinId;
                 valueObj = this.splitValueField(scopeObj._fieldFiveValue, resObj);
                if(resObj[scopeObj._statusText] === "Open") {
                  record["lblFiveKey"] = {
                    "text": this.getFieldValue(scopeObj._fieldFiveKey),
                    "skin": scopeObj._allFieldKeySkin,
                    "isVisible": (scopeObj._fieldFiveKey !== "") ? true : false,
					"right":"22%"
                  };
                  
                  //record["lblFiveValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldFiveValue], scopeObj._fieldFiveType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
                  record["lblFiveValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldFiveType, this.formatSkins, this.formattingJSON, valueObj.currency);
                  //record["lblFiveValue"].isVisible = (scopeObj._fieldFiveValue !== "") ? true : false;
                  record["lblFiveValue"].isVisible = (valueObj.value !== "") ? true : false;
                  if(record["lblFiveValue"].text==="")
                  {
                    record["lblFiveKey"] = {
                      "isVisible": false
                    };
                    record["lblFiveValue"]= {
                      "isVisible": false
                    };

                  }
                  skinId = record["lblFiveValue"].skin;
                  record["lblFiveValue"].skin = (scopeObj._fieldFiveValueSkin !== "") ? scopeObj._fieldFiveValueSkin : skinId;
                  if(record["lblFiveKey"].isVisible == true)
                  record["lblFiveKey"].right = (record["lblFiveValue"].text.length < 11) ? record["lblFiveKey"].right = "33%" : record["lblFiveKey"].right = "38%";
                }else{
                  record["lblStatus"] = {
                    "text": resObj[scopeObj._statusText]
                  };
                  var obj = JSON.parse(this._statusImgSrc);
                  record["imgStatus"] = {
                    "src": obj[resObj[scopeObj._statusText]],
                    "isVisible": true,
					"right":"22%"
                  };
                  record["lblFiveKey"] = {
                    "isVisible": false
                  };
                  record["lblFiveValue"]= {
                    "isVisible": false
                  };

                }               
              }else {
                record["lblFourKey"] = {
                  "text": this.getFieldValue(scopeObj._fieldFourKey),
                  "skin": scopeObj._allFieldKeySkin,
                  "isVisible": (scopeObj._fieldFourKey !== "") ? true : false
                };
                valueObj = this.splitValueField(scopeObj._fieldFourValue, resObj);
                //record["lblFourValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldFourValue], scopeObj._fieldFourType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
                record["lblFourValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldFourType, this.formatSkins, this.formattingJSON, valueObj.currency);
                //record["lblFourValue"].isVisible = (scopeObj._fieldFourValue !== "") ? true : false;
                 record["lblFourValue"].isVisible = (valueObj.value !== "") ? true : false;
                skinId = record["lblFourValue"].skin;
                 if(this._topFlex == "Holdings"){
                    record["lblFourValue"].skin = skinId;
                 }else{
                   record["lblFourValue"].skin = (scopeObj._fieldFourValueSkin !== "") ? scopeObj._fieldFourValueSkin : skinId;
                 }
                 record["lblFourValue"].left = (record["lblFourKey"].isVisible == false) ? (record["lblFourValue"].left = "20dp") : (record["lblFourValue"].left = "80dp");
                record["lblOneKey"].right = (record["lblFourKey"].isVisible == false) ? (record["lblFourValue"].left = "20dp") : (record["lblFourValue"].left = "80dp");
                if(record["lblOneKey"].isVisible == true)
                  record["lblOneKey"].right = (record["lblOneValue"].text.length < 11) ? record["lblOneKey"].right = "25%" : record["lblOneKey"].right = "33%";
                 if(record["lblThreeKey"].isVisible == true){
//                 if(this._topFlex == "Watchlist")
//                   record["lblThreeKey"].right = (record["lblThreeValue"].length < 11) ? record["lblThreeKey"].right = "25%" : record["lblThreeKey"].right = "30%";
//                   else
//                     record["lblThreeKey"].right = (record["lblThreeValue"].text.length < 11) ? record["lblThreeKey"].right = "25%" : record["lblThreeKey"].right = "30%";
                 }
                if(this._topFlex == "InstrumentTransactions")
                record["lblFourValue"].left = "110dp";
                record["lblFiveKey"] = {
                  "text": this.getFieldValue(scopeObj._fieldFiveKey),
                  "skin": scopeObj._allFieldKeySkin,
                  "isVisible": (scopeObj._fieldFiveKey !== "") ? true : false
                };
                valueObj = this.splitValueField(scopeObj._fieldFiveValue, resObj);
                //record["lblFiveValue"] = this.formatUtils.formatText(resObj[scopeObj._fieldFiveValue], scopeObj._fieldFiveType, this.formatSkins, this.formattingJSON, resObj[scopeObj._currencyCode]);
               if(this._topFlex == "InstrumentTransactions"){
                 record["lblFiveValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldFiveType, this.formatSkins, this.formattingJSON, resObj.referenceCurrency);
               }else{
                record["lblFiveValue"] = this.formatUtils.formatText(resObj[valueObj.value], scopeObj._fieldFiveType, this.formatSkins, this.formattingJSON, valueObj.currency); 
               }
                
				//record["lblFiveValue"].isVisible = (scopeObj._fieldFiveValue !== "") ? true : false;
                record["lblFiveValue"].isVisible = (valueObj.value !== "") ? true : false;
                skinId = record["lblFiveValue"].skin;
                record["lblFiveValue"].skin = (scopeObj._fieldFiveValueSkin !== "") ? scopeObj._fieldFiveValueSkin : skinId;
              } 
               if(record["lblFiveKey"].isVisible == true)
               record["lblFiveKey"].right = (record["lblFiveValue"].text.length < 11) ? record["lblFiveKey"].right = "33%" : record["lblFiveKey"].right = "38%";
                record["imgChevron"] = {
                    "src": scopeObj._actionImgSrc,
                    "isVisible": (scopeObj._actionImgIsVisible === "true") ? true : false
                };
                record["imgLogo"] = {
                    "src": scopeObj._imgLogoSrc,
                    "isVisible": (scopeObj._logoIsVisible === "true") ? true : false
                };
                record["flxClick"] = {
                    "text": "",
                    "isVisible": (scopeObj._actionImgIsVisible === "true") ? true : false,
                };
                record["flxStatus"] = {
                    "isVisible": (scopeObj._orderStatusIsVisible === "true") ? true : false,
                };
                if (record["lblName"].text == undefined || record["lblName"].text == "") {
                    record["flxRowOne"] = {
                        isVisible: false
                    };
				}
				if ((record["lblFourValue"] == undefined || record["lblFourValue"].text == undefined || record["lblFourValue"].text == "") && (record["lblFiveValue"] == undefined || record["lblFiveValue"].text == undefined || record["lblFiveValue"].text == "")) {
                    record["flxRowFour"] = {
                        "isVisible": false
                    };
                }
                if ((record["lblTwoValue"].text == undefined || record["lblTwoValue"].text == "") && (record["lblThreeValue"].text == undefined || record["lblThreeValue"].text == "")) {
                    record["flxRowFour"] = {
                        "isVisible": false
                    };
                } 
              record["lblTwoValue"].maxWidth = "100dp";
			  record["lblFiveValue"].maxWidth = "120dp";
              if(this._topFlex == "Accounts"){
                record["lblTwoValue"].skin = "sknLbl424242SSPReg30px";
                record["lblTwoValue"].maxWidth = "200dp";
                record["lblThreeValue"].skin = "sknLbl424242SSPReg30px";
                record["lblFourValue"].skin = "sknlbl727272SSPR43px";
                record["lblFiveValue"].skin = "sknlbl727272SSPR43px";
              }
              if(this._topFlex != "Watchlist"){
              if(record["lblZeroKey"].isVisible == true){
                record["lblZeroValue"].left = (record["lblZeroKey"].text.length < 7) ? "58dp" : ((record["lblZeroKey"].text.length >=10) ? "110dp" : "68dp");
              }
              if(record["lblTwoKey"].isVisible == true){
                record["lblTwoValue"].left = (record["lblTwoKey"].text.length < 7) ? "58dp" : ((record["lblTwoKey"].text.length >=10) ? "110dp" : "68dp");
              }
              if(record["lblFourKey"].isVisible == true){
                record["lblFourValue"].left = (record["lblFourKey"].text.length < 7) ? "58dp" : ((record["lblFourKey"].text.length >=10) ? "110dp" : "68dp");
              }
               if(record["lblOneKey"].isVisible == true)
                  record["lblOneKey"].right = (record["lblOneValue"].text.length < 11) ? "25%" : "33%";
              if(record["lblThreeKey"].isVisible == true){
//                 if(this._topFlex == "Watchlist")
//                   record["lblThreeKey"].right = (record["lblThreeValue"].length < 11) ? "25%" : "30%";
//                   else
//                   record["lblThreeKey"].right = (record["lblThreeValue"].text.length < 11) ? "25%" : "30%";
              }
                 if(record["lblFiveKey"].isVisible == true)
                  record["lblFiveKey"].right = (record["lblFiveValue"].text.length < 11) ? "33%" : "38%";
              }
				else{
				}
              
               if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
                  record["lblTwoValue"].right = record["lblTwoValue"].left;
                  record["lblTwoValue"].left = "";
                 if(this._topFlex == "Watchlist")
              {
                 record["imgChevron"].left = "-15dp";
              }
                }
              
                segData.push(record);
            };
			this.view.segList.setVisibility(true);
            this.view.segList.widgetDataMap = scopeObj.getWidgetDataMap();
            this.view.segList.data = segData;				
             applicationManager.getPresentationUtility().dismissLoadingScreen();
			
        },
        onActionSelect: function(context) {
            var rowindex = context.row;
            var details = {};
            details.rowdetails = this.response[rowindex];
            details.totalValue = this.unformattedTotalValue;
            this.onActionButtonClicked(context, details);
            //alert("param" +param);
        },
        onNavigateToNext: function(event, context) {
            this.onMoveToDateRange();
        },
        onNavigateToCashAccounts: function(event, context) {
            this.onMoveToCashAccounts();
        },
        toggleHistory: function(event, context) {
            this.view.SearchAndFilterWealth.clearSearchOnToggle();
            this.view.SearchAndFilterWealth.placeholderText = this.getFieldValue(this._placeholderSearchText);
            let activeSkin = 'sknBtnFFFFFFBdr10px';
            let inactiveSkin = 'sknbtn000000SSPSemiBold15px';
            this.view.btnTglHistory.skin = activeSkin;
            this.view.btnTglOpen.skin = inactiveSkin;
            this.view.flxTimePeriod.setVisibility(true);
            this._actionImgIsVisible = "false";
            this._orderStatusIsVisible = "true";
            this.onClickOrderHistory();
            var existingparam = this.criteriaObjectValue;
            if (existingparam !== "" || existingparam !== undefined) {
                existingparam.type = "history";
                this.setContext(existingparam);
            }
        },
        toggleOpenOrder: function(event, context) {
            this.view.SearchAndFilterWealth.clearSearchOnToggle();
            this.view.SearchAndFilterWealth.placeholderText = this.getFieldValue(this._placeholderSearchText);
            let activeSkin = 'sknBtnFFFFFFBdr10px';
            let inactiveSkin = 'sknbtn000000SSPSemiBold15px';
            this.view.flxTimePeriod.setVisibility(false);
            this.view.btnTglOpen.skin = activeSkin;
            this.view.btnTglHistory.skin = inactiveSkin;
            this._orderStatusIsVisible = "false";
            this.onClickOpenOrders();
            var existingparam = this.criteriaObjectValue;
            if (existingparam !== "" || existingparam !== undefined) {
                existingparam.type = "open";
                existingparam.startDate = "";
                existingparam.endDate = "";
                existingparam.searchByInstrumentName = "";
                existingparam.sortBy = "tradeDate";
                existingparam.orderId = this.cancelOrderIds;
                this.setContext(existingparam);
                this.getWealthList();
            }
          this.onCancelPopup(event);
        },
        cancelOrder: function(params, cancelOrderIds) {
            this.cancelOrderIds = cancelOrderIds;
            var self = this;
            this.onRequestStart();
            try {
				this.wealthDetailsListDao.fetchHoldingsList("WealthObjects", "cancelSecurityOrder", "OrdersDetails",params,this.toggleOpenOrder, this.toggleOpenOrder);
		  	  } catch (err) {
                this.onRequestEnd();
                var errorObj = {
                    "errorInfo": "Error in doing service call to cancelOrder",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
		  
	  },
	  callOrderHistory: function(params,cancelOrderIds){
		   this.cancelOrderIds=cancelOrderIds;
		   var self = this;
           this.onRequestStart();
            try {
				
				 var existingparam = this.criteriaObjectValue;
				if(existingparam !== "" || existingparam  !== undefined){
				existingparam.type="history";
				existingparam.startDate=params["startDate"];
				existingparam.endDate=params["endDate"];
				this.setContext(existingparam); 
				}
				this.wealthDetailsListDao.fetchHoldingsList("WealthObjects", "getOrdersDetails", "OrdersDetails", params, this.processResponse, this.onError);
				
            } catch (err) {
                this.onRequestEnd();
                var errorObj = {
                    "errorInfo": "Error in doing service call to cancelOrder",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
		  
	  },
      getFeaturesAndPermissions:function(){
       var scope=this;
       return scope._featuresAndPermission;
    },
      setVisibleActionImage:function(isVisible){
        if(isVisible)
          {
            this._actionImgIsVisible = "true"; 
                  
          }
        else{
          this._actionImgIsVisible = "false"; 
           
        }
      },
	setCriteriaObjectValue: function(criteriaObjectValue) {
            this.criteriaObjectValue = criteriaObjectValue;
        },	 
      getHoldingsTopDetails:function(portfolioDetails)
      {
        this.portfolioDetailsPLs=portfolioDetails;
      },
    };
});