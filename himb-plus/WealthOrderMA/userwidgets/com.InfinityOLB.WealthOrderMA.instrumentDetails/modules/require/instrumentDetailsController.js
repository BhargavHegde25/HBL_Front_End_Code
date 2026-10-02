define(['./InstrumentDetailsDAO','./ParserUtilsManager','./FormatUtils','./EntitlementUtils'],function(InstrumentDetailsDAO,ParserUtilsManager,FormatUtils,EntitlementUtils) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
	//DAO object
      this.InstrumentDetailsDAO = new InstrumentDetailsDAO();
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Format util object
      this.FormatUtils = new FormatUtils();
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
          this.reload=false;
          this.operation="";
          this.chartDefaultValue = this.view.investmentLineChart.currentFilter;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'instrumentObjectService', () => {
                return this._instrumentObjectService;
            });
            defineSetter(this, 'instrumentObjectService', value => {
                this._instrumentObjectService = value;
            });
            defineGetter(this, 'instrumentObjectName', () => {
                return this._instrumentObjectName;
            });
            defineSetter(this, 'instrumentObjectName', value => {
                this._instrumentObjectName = value;
            });
            defineGetter(this, 'instrumentOperation', () => {
                return this._instrumentOperation;
            });
            defineSetter(this, 'instrumentOperation', value => {
                this._instrumentOperation = value;
            });
            defineGetter(this, 'instrumentCriteria', () => {
                return this._instrumentCriteria;
            });
            defineSetter(this, 'instrumentCriteria', value => {
                this._instrumentCriteria = value;
            });
            defineGetter(this, 'instrumentIdentifier', () => {
                return this._instrumentIdentifier;
            });
            defineSetter(this, 'instrumentIdentifier', value => {
                this._instrumentIdentifier = value;
            });
            defineGetter(this, 'instrumentResponseArray', () => {
                return this._instrumentResponseArray;
            });
            defineSetter(this, 'instrumentResponseArray', value => {
                this._instrumentResponseArray = value;
            });
            defineGetter(this, 'instrumentResponseId', () => {
                return this._instrumentResponseId;
            });
            defineSetter(this, 'instrumentResponseId', value => {
                this._instrumentResponseId = value;
            });
            defineGetter(this, 'holdingsObjectService', () => {
                return this._holdingsObjectService;
            });
            defineSetter(this, 'holdingsObjectService', value => {
                this._holdingsObjectService = value;
            });
            defineGetter(this, 'holdingsObjectName', () => {
                return this._holdingsObjectName;
            });
            defineSetter(this, 'holdingsObjectName', value => {
                this._holdingsObjectName = value;
            });
            defineGetter(this, 'holdingsOperation', () => {
                return this._holdingsOperation;
            });
            defineSetter(this, 'holdingsOperation', value => {
                this._holdingsOperation = value;
            });
            defineGetter(this, 'holdingsCriteria', () => {
                return this._holdingsCriteria;
            });
            defineSetter(this, 'holdingsCriteria', value => {
                this._holdingsCriteria = value;
            });
            defineGetter(this, 'holdingsIdentifier', () => {
                return this._holdingsIdentifier;
            });
            defineSetter(this, 'holdingsIdentifier', value => {
                this._holdingsIdentifier = value;
            });
            defineGetter(this, 'holdingsResponseArray', () => {
                return this._holdingsResponseArray;
            });
            defineSetter(this, 'holdingsResponseArray', value => {
                this._holdingsResponseArray = value;
            });
            defineGetter(this, 'holdingsResponseId', () => {
                return this._holdingsResponseId;
            });
            defineSetter(this, 'holdingsResponseId', value => {
                this._holdingsResponseId = value;
            });
            defineGetter(this, 'instrumentMinimalResponseArray', () => {
                return this._instrumentMinimalResponseArray;
            });
            defineSetter(this, 'instrumentMinimalResponseArray', value => {
                this._instrumentMinimalResponseArray = value;
            });
            defineGetter(this, 'instrumentPricingDataResponseArray', () => {
                return this._instrumentPricingDataResponseArray;
            });
            defineSetter(this, 'instrumentPricingDataResponseArray', value => {
                this._instrumentPricingDataResponseArray = value;
            });
            defineGetter(this, 'instrumentDocumentsResponseArray', () => {
                return this._instrumentDocumentsResponseArray;
            });
            defineSetter(this, 'instrumentDocumentsResponseArray', value => {
                this._instrumentDocumentsResponseArray = value;
            });
			defineGetter(this, 'holdingsField7', () => {
                return this._holdingsField7;
            });
            defineSetter(this, 'holdingsField7', value => {
                this._holdingsField7 = value;
            });
            defineGetter(this, 'holdingsField8', () => {
                return this._holdingsField8;
            });
            defineSetter(this, 'holdingsField8', value => {
                this._holdingsField8 = value;
            });
            defineGetter(this, 'holdingsField9', () => {
                return this._holdingsField9;
            });
            defineSetter(this, 'holdingsField9', value => {
                this._holdingsField9= value;
            });
            defineGetter(this, 'holdingsField10', () => {
                return this._holdingsField10;
            });
            defineSetter(this, 'holdingsField10', value => {
                this._holdingsField10 = value;
            });
            defineGetter(this, 'holdingsField11', () => {
                return this._holdingsField11;
            });
            defineSetter(this, 'holdingsField11', value => {
                this._holdingsField11 = value;
            });
            defineGetter(this, 'holdingsField12', () => {
                return this._holdingsField12;
            });
            defineSetter(this, 'holdingsField12', value => {
                this._holdingsField12 = value;
            });
                      defineGetter(this, 'holdingsField13', () => {
                return this._holdingsField13;
            });
            defineSetter(this, 'holdingsField13', value => {
                this._holdingsField13 = value;
            });
                      defineGetter(this, 'holdingsField14', () => {
                return this._holdingsField14;
            });
            defineSetter(this, 'holdingsField14', value => {
                this._holdingsField14 = value;
            });
                      defineGetter(this, 'holdingsField15', () => {
                return this._holdingsField15;
            });
            defineSetter(this, 'holdingsField15', value => {
                this._holdingsField15 = value;
            });
                      defineGetter(this, 'holdingsField16', () => {
                return this._holdingsField16;
            });
            defineSetter(this, 'holdingsField16', value => {
                this._holdingsField16 = value;
            });
                      defineGetter(this, 'holdingsField17', () => {
                return this._holdingsField17;
            });
            defineSetter(this, 'holdingsField17', value => {
                this._holdingsField17 = value;
            });
                      defineGetter(this, 'holdingsField18', () => {
                return this._holdingsField18;
            });
            defineSetter(this, 'holdingsField18', value => {
                this._holdingsField18 = value;
            });
           defineGetter(this, 'instrumentField21', () => {
                return this._instrumentField21;
            });
            defineSetter(this, 'instrumentField21', value => {
                this._instrumentField21 = value;
            });
                      defineGetter(this, 'instrumentField22', () => {
                return this._instrumentField22;
            });
            defineSetter(this, 'instrumentField22', value => {
                this._instrumentField22 = value;
            });
                      defineGetter(this, 'instrumentField23', () => {
                return this._instrumentField23;
            });
            defineSetter(this, 'instrumentField23', value => {
                this._instrumentField23 = value;
            });
                      defineGetter(this, 'instrumentField24', () => {
                return this._instrumentField24;
            });
            defineSetter(this, 'instrumentField24', value => {
                this._instrumentField24 = value;
            });
                      defineGetter(this, 'instrumentField25', () => {
                return this._instrumentField25;
            });
            defineSetter(this, 'instrumentField25', value => {
                this._instrumentField25 = value;
            });
                      defineGetter(this, 'instrumentField26', () => {
                return this._instrumentField26;
            });
            defineSetter(this, 'instrumentField26', value => {
                this._instrumentField26 = value;
            });
                      defineGetter(this, 'instrumentField27', () => {
                return this._instrumentField27;
            });
            defineSetter(this, 'instrumentField27', value => {
                this._instrumentField27 = value;
            });
                      defineGetter(this, 'instrumentField28', () => {
                return this._instrumentField28;
            });
            defineSetter(this, 'instrumentField28', value => {
                this._instrumentField28 = value;
            });
                      defineGetter(this, 'instrumentField29', () => {
                return this._instrumentField29;
            });
            defineSetter(this, 'instrumentField29', value => {
                this._instrumentField29 = value;
            });
                      defineGetter(this, 'instrumentField30', () => {
                return this._instrumentField30;
            });
            defineSetter(this, 'instrumentField30', value => {
                this._instrumentField30 = value;
            });
          
          
          //update favouite instruments
          defineGetter(this, 'updateFavObjectService', () => {
            return this._updateFavObjectService;
          });
            defineSetter(this, 'updateFavObjectService', value => {
                this._updateFavObjectService = value;
            });
            defineGetter(this, 'updateFavObjectName', () => {
                return this._updateFavObjectName;
            });
            defineSetter(this, 'updateFavObjectName', value => {
                this._updateFavObjectName = value;
            });
            defineGetter(this, 'updateFavOperation', () => {
                return this._updateFavOperation;
            });
            defineSetter(this, 'updateFavOperation', value => {
                this._updateFavOperation = value;
            });
            defineGetter(this, 'updateFavCriteria', () => {
                return this._updateFavCriteria;
            });
            defineSetter(this, 'updateFavCriteria', value => {
                this._updateFavCriteria = value;
            });
            defineGetter(this, 'updateFavIdentifier', () => {
                return this._updateFavIdentifier;
            });
            defineSetter(this, 'updateFavIdentifier', value => {
                this._updateFavIdentifier = value;
            });
            defineGetter(this, 'updateFavResponseArray', () => {
                return this._updateFavResponseArray;
            });
            defineSetter(this, 'updateFavResponseArray', value => {
                this._updateFavResponseArray = value;
            });
            defineGetter(this, 'updateFavResponseId', () => {
                return this._updateFavResponseId;
            });
            defineSetter(this, 'updateFavResponseId', value => {
                this._updateaResponseId = value;
            });
          //get favouite instrument
            defineGetter(this, 'getFavObjectService', () => {
            return this._getFavObjectService;
          });
            defineSetter(this, 'getFavObjectService', value => {
                this._getFavObjectService = value;
            });
            defineGetter(this, 'getFavObjectName', () => {
                return this._getFavObjectName;
            });
            defineSetter(this, 'getFavObjectName', value => {
                this._getFavObjectName = value;
            });
            defineGetter(this, 'getFavOperation', () => {
                return this._getFavOperation;
            });
            defineSetter(this, 'getFavOperation', value => {
                this._getFavOperation = value;
            });
            defineGetter(this, 'getFavCriteria', () => {
                return this._getFavCriteria;
            });
            defineSetter(this, 'getFavCriteria', value => {
                this._getFavCriteria = value;
            });
            defineGetter(this, 'getFavIdentifier', () => {
                return this._getFavIdentifier;
            });
            defineSetter(this, 'getFavIdentifier', value => {
                this._getFavIdentifier = value;
            });
            defineGetter(this, 'getFavCodesResponseArray', () => {
                return this._getFavCodesResponseArray;
            });
            defineSetter(this, 'getFavCodesResponseArray', value => {
                this._getFavCodesResponseArray = value;
            });
           defineGetter(this, 'getFavIdsResponseArray', () => {
                return this._getFavIdsResponseArray;
            });
            defineSetter(this, 'getFavIdsResponseArray', value => {
                this._getFavIdsResponseArray = value;
            });
            defineGetter(this, 'getFavResponseId', () => {
                return this._getFavResponseId;
            });
            defineSetter(this, 'getFavResponseId', value => {
                this._getResponseId = value;
            });
        
          
          defineGetter(this, 'historyDataObjectService', () => {
            return this._historyDataObjectService;
          });
            defineSetter(this, 'historyDataObjectService', value => {
                this._historyDataObjectService = value;
            });
            defineGetter(this, 'historyDataObjectName', () => {
                return this._historyDataObjectName;
            });
            defineSetter(this, 'historyDataObjectName', value => {
                this._historyDataObjectName = value;
            });
            defineGetter(this, 'historyDataOperation', () => {
                return this._historyDataOperation;
            });
            defineSetter(this, 'historyDataOperation', value => {
                this._historyDataOperation = value;
            });
            defineGetter(this, 'historyDataCriteria', () => {
                return this._historyDataCriteria;
            });
            defineSetter(this, 'historyDataCriteria', value => {
                this._historyDataCriteria = value;
            });
            defineGetter(this, 'historyDataIdentifier', () => {
                return this._historyDataIdentifier;
            });
            defineSetter(this, 'historyDataIdentifier', value => {
                this._historyDataIdentifier = value;
            });
            defineGetter(this, 'historyDataResponseArray', () => {
                return this._historyDataResponseArray;
            });
            defineSetter(this, 'historyDataResponseArray', value => {
                this._historyDataResponseArray = value;
            });
            defineGetter(this, 'historyDataResponseId', () => {
                return this._historyDataResponseId;
            });
            defineSetter(this, 'historyDataResponseId', value => {
                this._historyDataResponseId = value;
            });
                      defineGetter(this, 'instrumentEntitlement', () => {
                return this._instrumentEntitlement;
            });
            defineSetter(this, 'instrumentEntitlement', value => {
                this._instrumentEntitlement = value;
            });
                      defineGetter(this, 'currentPositionEntitlement', () => {
                return this._currentPositionEntitlement;
            });
            defineSetter(this, 'currentPositionEntitlement', value => {
                this._currentPositionEntitlement = value;
            });
                      defineGetter(this, 'pricingDataEntitlement', () => {
                return this._pricingDataEntitlement;
            });
            defineSetter(this, 'pricingDataEntitlement', value => {
                this._pricingDataEntitlement = value;
            });
                      defineGetter(this, 'documentsEntitlement', () => {
                return this._documentsEntitlement;
            });
            defineSetter(this, 'documentsEntitlement', value => {
                this._documentsEntitlement = value;
            });
                      defineGetter(this, 'stockNewsEntitlement', () => {
                return this._stockNewsEntitlement;
            });
            defineSetter(this, 'stockNewsEntitlement', value => {
                this._stockNewsEntitlement = value;
            });
                      defineGetter(this, 'favouriteEntitlement', () => {
                return this._favouriteEntitlement;
            });
            defineSetter(this, 'favouriteEntitlement', value => {
                this._favouriteEntitlement = value;
            });
                      defineGetter(this, 'buyEntitlement', () => {
                return this._buyEntitlement;
            });
            defineSetter(this, 'buyEntitlement', value => {
                this._buyEntitlement = value;
            });
                      defineGetter(this, 'sellEntitlement', () => {
                return this._sellEntitlement;
            });
            defineSetter(this, 'sellEntitlement', value => {
                this._sellEntitlement = value;
            });
                                          defineGetter(this, 'assetTypeResponse', () => {
                return this._assetTypeResponse;
            });
            defineSetter(this, 'assetTypeResponse', value => {
                this._assetTypeResponse = value;
            });
                                defineGetter(this, 'assetTypeField1', () => {
                return this._assetTypeField1;
            });
            defineSetter(this, 'assetTypeField1', value => {
                this._assetTypeField1 = value;
            });
                                defineGetter(this, 'assetTypeField2', () => {
                return this._assetTypeField2;
            });
            defineSetter(this, 'assetTypeField2', value => {
                this._assetTypeField2 = value;
            });
                                defineGetter(this, 'assetTypeField3', () => {
                return this._assetTypeField3;
            });
            defineSetter(this, 'assetTypeField3', value => {
                this._assetTypeField3 = value;
            });
                                defineGetter(this, 'assetTypeField4', () => {
                return this._assetTypeField4;
            });
            defineSetter(this, 'assetTypeField4', value => {
                this._assetTypeField4 = value;
            });
                                defineGetter(this, 'assetTypeField5', () => {
                return this._assetTypeField5;
            });
            defineSetter(this, 'assetTypeField5', value => {
                this._assetTypeField5 = value;
            });
                                defineGetter(this, 'assetTypeField6', () => {
                return this._assetTypeField6;
            });
            defineSetter(this, 'assetTypeField6', value => {
                this._assetTypeField6 = value;
            });
                                defineGetter(this, 'assetTypeField7', () => {
                return this._assetTypeField7;
            });
            defineSetter(this, 'assetTypeField7', value => {
                this._assetTypeField7 = value;
            });
                                defineGetter(this, 'assetTypeField8', () => {
                return this._assetTypeField8;
            });
            defineSetter(this, 'assetTypeField8', value => {
                this._assetTypeField8 = value;
            });
                                defineGetter(this, 'assetTypeField9', () => {
                return this._assetTypeField9;
            });
            defineSetter(this, 'assetTypeField9', value => {
                this._assetTypeField9 = value;
            });
                                defineGetter(this, 'assetTypeField10', () => {
                return this._assetTypeField10;
            });
            defineSetter(this, 'assetTypeField10', value => {
                this._assetTypeField10 = value;
            });
                                defineGetter(this, 'assetTypeField11', () => {
                return this._assetTypeField11;
            });
            defineSetter(this, 'assetTypeField11', value => {
                this._assetTypeField11 = value;
            });
                                defineGetter(this, 'assetTypeField12', () => {
                return this._assetTypeField12;
            });
            defineSetter(this, 'assetTypeField12', value => {
                this._assetTypeField12 = value;
            });
                                defineGetter(this, 'assetTypeField13', () => {
                return this._assetTypeField13;
            });
            defineSetter(this, 'assetTypeField13', value => {
                this._assetTypeField13 = value;
            });
                                defineGetter(this, 'assetTypeField14', () => {
                return this._assetTypeField14;
            });
            defineSetter(this, 'assetTypeField14', value => {
                this._assetTypeField14 = value;
            });
                                defineGetter(this, 'assetTypeField15', () => {
                return this._assetTypeField15;
            });
            defineSetter(this, 'assetTypeField15', value => {
                this._assetTypeField15 = value;
            });
                                defineGetter(this, 'assetTypeField16', () => {
                return this._assetTypeField16;
            });
            defineSetter(this, 'assetTypeField16', value => {
                this._assetTypeField16 = value;
            });
                                defineGetter(this, 'assetTypeField17', () => {
                return this._assetTypeField17;
            });
            defineSetter(this, 'assetTypeField17', value => {
                this._assetTypeField17 = value;
            });
                                defineGetter(this, 'assetTypeField18', () => {
                return this._assetTypeField18;
            });
            defineSetter(this, 'assetTypeField18', value => {
                this._assetTypeField18 = value;
            });
          defineGetter(this, 'assetTypeField19', () => {
                return this._assetTypeField19;
            });
            defineSetter(this, 'assetTypeField19', value => {
                this._assetTypeField19 = value;
            });
                                          defineGetter(this, 'instrumentAssetsResponseArray', () => {
                return this._instrumentAssetsResponseArray;
            });
            defineSetter(this, 'instrumentAssetsResponseArray', value => {
                this._instrumentAssetsResponseArray = value;
            });
                                          defineGetter(this, 'positiveSkin', () => {
                return this._positiveSkin;
            });
            defineSetter(this, 'positiveSkin', value => {
                this._positiveSkin = value;
            });
                                          defineGetter(this, 'negativeSkin', () => {
                return this._negativeSkin;
            });
            defineSetter(this, 'negativeSkin', value => {
                this._negativeSkin = value;
            });
                                          defineGetter(this, 'neutralSkin', () => {
                return this._neutralSkin;
            });
            defineSetter(this, 'neutralSkin', value => {
                this._neutralSkin = value;
            });
        },
      
        preshow: function(){
          try{
          this.view.btnViewTransactions.onClick = this.raiseEventToViewTransactions;
          this.view.investmentLineChart.currentFilter = this.chartDefaultValue;
          this.view.imgRefresh.onTouchEnd=this.onReload;
          this.view.btnBuy.onClick=this.onBuy;
          this.view.btnSell.onClick=this.onSell;
             } catch (err) {
        var errObj = {
          "errorInfo": "Error in preShow",
          "error": err
        };
        this.onError(errObj);
      }
        },
      raiseEventToViewTransactions: function(){
        this.onClickViewTransactions();
      },
      
      setFeaturesAndPermissions:function(features){
        try{
        this.features={"entitlement":features};
        this.EntitlementUtils.setEntitlements(this.features);
        this.view.InstrumentDetail.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._instrumentEntitlement, "entitlement_keys")));
        var a= (this.EntitlementUtils.isEntitled(this.getFieldValue(this._instrumentEntitlement, "entitlement_keys")));
        if(a){
          this.view.flxInstrumentLineChart.height = "350Dp";
          this.view.flxInstrumentLineChart.top="20Dp";
        }
        else{
          this.view.flxInstrumentLineChart.height="0Dp";
           this.view.flxInstrumentLineChart.top="0Dp";
        }
        this.view.CurrentPosition.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._currentPositionEntitlement, "entitlement_keys")));
        this.view.flxPriceData.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._pricingDataEntitlement, "entitlement_keys")));
        this.view.btnBuy.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._buyEntitlement, "entitlement_keys")));
        this.view.btnSell.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._sellEntitlement, "entitlement_keys")));
        this.view.flxRight.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._favouriteEntitlement, "entitlement_keys")));
        var temp=this.view.btnBuy.isVisible || this.view.btnSell.isVisible;
		this.view.flxButtons.setVisibility(temp);
        this.view.flxDocuments.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._documentsEntitlement, "entitlement_keys")));
        this.view.flxStocks.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._stockNewsEntitlement, "entitlement_keys")));
        this.view.flxAssetType.setVisibility(this.EntitlementUtils.isEntitled(this.getFieldValue(this._instrumentEntitlement, "entitlement_keys")));
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in setFeaturesAndPermissions",
          "error": err
        };
        this.onError(errObj);
      }
        },
      
      setInstrumentDetails: function(paramsProdDetails,data, datum,isEuro){
        try{
              this.isEuro=isEuro;
      if(this.isEuro){
        this.FormatUtils.setEuropeFormat();
      }
        this.datum=datum;
        this.setDefaultParams(paramsProdDetails,data);
       this.setRequestParams();
       this.setContext(this.params);
        if(this.view.InstrumentDetail.isVisible)
          {
        this.makeDaoCallInstrument();
          }
        if(data && this.view.CurrentPosition.isVisible){
        this.makeDaoCallHoldings();
        }
        if(this.view.imgStar.isVisible){
        this.updateFavList('get');
        this.view.imgStar.onTouchEnd = this.updateFavList.bind();
        }
        if(paramsProdDetails.isAdvisory || scope_WealthPresentationController.isInvestmentAccount === false || scope_WealthPresentationController.isJointAccount){
          this.view.flxButtons.setVisibility(false);
        }
      this.view.marketNewsCardComp.marketNewsPostShow = this.postShowWealthComp;
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in setInstrumentDetails",
          "error": err
        };
        this.onError(errObj);
      }
        },
      chartService: function(filter) {
        this.dateOrPeriod=filter;
        this.setRequestParams();
        this.setContext(this.params);
       // if(this.RICCode){
        this.getHistoricalDataInstrument();
        //}
    },
      
      postShowWealthComp: function(){
        
      },
      onBreakPointChangeComponent: function(formWidth) {
      this.width=formWidth;
      },
      
      setDefaultParams: function(paramsProdDetails,data){
        this.instrumentId=paramsProdDetails.instrumentId;
        this.RICCode=paramsProdDetails.RICCode;
        this.ISINCode=paramsProdDetails.ISINCode;
        scope_WealthPresentationController.application = paramsProdDetails.application;
        if(data){
        this.searchByInstrumentName=data.searchByInstrumentName;
        this.portfolioId=data.portfolioId;
        this.sortBy=data.sortBy;
        this.navPage=data.navPage;
        }
        else{
        this.searchByInstrumentName="";
        this.portfolioId="";
        this.sortBy="";
        this.navPage="";
        }
      },
      
      setRequestParams: function(){

       this.params = {
         "instrumentId":this.instrumentId,
          "RICCode":this.RICCode,
          "ISINCode":this.ISINCode,
         "searchByInstrumentName":this.searchByInstrumentName,
         "portfolioId":this.portfolioId,
         "sortBy":this.sortBy,
         "navPage":this.navPage,
         "dateOrPeriod":this.dateOrPeriod,
         "operation":this.operation,
         "application":scope_WealthPresentationController.application
       };
      },
      
      makeDaoCallInstrument: function(){
      try{
      let objectName = this.getFieldValue(this._instrumentObjectName);
      let objectServiceName = this.getFieldValue(this._instrumentObjectService);
      let operationName = this.getFieldValue(this._instrumentOperation);
      let serviceResponseIdentifier = this.getFieldValue(this._instrumentIdentifier);
      var criterion = this.getFieldValue(this._instrumentCriteria);
      this.setCriteria(criterion);
      this.requestStart();
      this.typeofAsset="";
      this.view.flxContent12.setVisibility(false);
      this.InstrumentDetailsDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceSuccess,this.onError);
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
     
      makeDaoCallHoldings: function(){
      try{
      let objectName = this.getFieldValue(this._holdingsObjectName);
      let objectServiceName = this.getFieldValue(this._holdingsObjectService);
      let operationName = this.getFieldValue(this._holdingsOperation);
      let serviceResponseIdentifier = this.getFieldValue(this._holdingsIdentifier);
      var criterion = this.getFieldValue(this._holdingsCriteria);
      this.setCriteria(criterion);
      //this.requestStart();
        this.noPosition=0;
      //this.refcurrency =applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getPortfolioCurrency();
      this.refcurrency =applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getPortfolioCurrency() ? applicationManager.getModulesPresentationController({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).getPortfolioCurrency(): this.lblCurrency;
      this.InstrumentDetailsDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceSuccessHoldings,this.onError);
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
     onServiceSuccess: function(response,unicode){
       try{
      this.processResponse(response,unicode);
      var instrumentDetails = this.getFieldValue(this._instrumentResponseArray);
      var instrumentMinimalDetails = this.getFieldValue(this._instrumentMinimalResponseArray);
      var priceData = this.getFieldValue(this._instrumentPricingDataResponseArray);
      var DocumentsData = this.getFieldValue(this._instrumentDocumentsResponseArray);
      var instrumentAssets=this.getFieldValue(this._instrumentAssetsResponseArray);
	  var productDetails= response.productDetails;
       if(productDetails){
         this.typeofAsset=productDetails.assetType;
		 this.getProductDetails(productDetails);
       }          
       this.setAssetType(instrumentAssets);
       var stock=response.stockNews;
       if(instrumentAssets.isSecurityAsset == false || instrumentAssets.isSecurityAsset == "false"){
		this.view.flxButtons.setVisibility(false);
       }
       if((Array.isArray(stock) && stock.length > 0) || (DocumentsData.length > 0 && Array.isArray(DocumentsData))|| (instrumentAssets.assetTypes)){
         this.view.flxRightContainerr.setVisibility(true);
       }
       else{
         this.view.flxRightContainerr.setVisibility(false);
       }
       if((Array.isArray(stock) && stock.length > 0)){
       this.view.flxStocks.setVisibility(true);
       }
       else{
         this.view.flxStocks.setVisibility(false);
       }
       if(priceData && priceData!="pricingDetails" && this.view.flxPriceData.isVisible){
         this.getPricingDetails(priceData);}
       else{
         this.view.flxPriceData.setVisibility(false);
       }
      this.getDocuments(DocumentsData);
       if(this.datum){
        this.currentPosition(this.datum);
       }
       this.setProductDetailsData(response);
         this.requestEnd();
       this.view.forceLayout();
       var currForm = kony.application.getCurrentForm();
       currForm.forceLayout();
          } catch (err) {
        var errObj = {
          "errorInfo": "Error in onServiceSuccess",
          "error": err
        };
        this.onError(errObj);
      }
    },
   onServiceSuccessHoldings: function(response,unicode){
     try{
      this.processResponse(response,unicode);
      var holdingsData = this.getFieldValue(this._holdingsResponseArray);
      this.currentPosition(holdingsData[0]);
		if (response.portfolioHoldings.length>0){
          this.setInstrumentDetailsData(holdingsData[0]);
        } else {
           this.setInstrumentDetailsData({});
        }
            this.view.forceLayout();
       var currForm = kony.application.getCurrentForm();
       currForm.forceLayout();
        } catch (err) {
        var errObj = {
          "errorInfo": "Error in onServiceSuccessHoldings",
          "error": err
        };
        this.onError(errObj);
      }
    },
	onError: function(errorObj){
       var a=10;
    },
      updateFavList: function(operation){
        try{
      if (operation === "get") {
         this.setRequestParams();
        this.setContext(this.params);
       this.makeDaoCallGetFavouriteInstrument();
      } else {

        if (this.view.imgStar.src === "activestar.png"){
          this.view.imgStar.src = "feedback_icon_grey.png";
          this.operation = 'Remove';
        } else {
          this.view.imgStar.src="activestar.png";
          this.operation = 'Add';
        }

       this.setRequestParams();
        this.setContext(this.params);
        this.makeDaoCallUpdateFavouriteInstrument();
      }
           } catch (err) {
        var errObj = {
          "errorInfo": "Error in updateFavList",
          "error": err
        };
        this.onError(errObj);
      }
    },
makeDaoCallGetFavouriteInstrument:function(){
  var self=this;
      try{
      let objectName = this.getFieldValue(this._getFavObjectName);
      let objectServiceName = this.getFieldValue(this._getFavObjectService);
      let operationName = this.getFieldValue(this._getFavOperation);
      let serviceResponseIdentifier = this.getFieldValue(this._getFavIdentifier);
      var criterion = this.getFieldValue(this._getFavCriteria);
      this.setCriteria(criterion);
      //this.requestStart();
      this.InstrumentDetailsDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceSuccessGetFavourite,this.onError);
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
      onServiceSuccessGetFavourite:function(response,unicode){
        try{
         this.processResponse(response,unicode);
      var favInstrumentCodes = this.getFieldValue(this._getFavCodesResponseArray);
      var favInstrumentIds = this.getFieldValue(this._getFavIdsResponseArray);
    
          var favorite = false;
     if (favInstrumentIds){ 
        if(favInstrumentIds.split('@').find(element=>element===this.instrumentId)){     
          favorite = true;
        }
      }
     else if (favInstrumentCodes){ 
        if(favInstrumentCodes.split('@').find(element=>element===this.RICCode)){     
          favorite = true;
        }
      }   

      if(favorite)  
        this.view.imgStar.src = "activestar.png";  
      else
        this.view.imgStar.src = "feedback_icon_grey.png";

   } catch (err) {
        var errObj = {
          "errorInfo": "Error in onServiceSuccessGetFavourite",
          "error": err
        };
        this.onError(errObj);
      }
      },
  makeDaoCallUpdateFavouriteInstrument:function(){
    var self=this;
      try{
      let objectName = this.getFieldValue(this._updateFavObjectName);
      let objectServiceName = this.getFieldValue(this._updateFavObjectService);
      let operationName = this.getFieldValue(this._updateFavOperation);
      let serviceResponseIdentifier = this.getFieldValue(this._updateFavIdentifier);
      var criterion = this.getFieldValue(this._updateFavCriteria);
      this.setCriteria(criterion);
      //this.requestStart();
      this.InstrumentDetailsDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceSuccessUpdateFavourite,this.onError);
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
  
  } ,   
      onServiceSuccessUpdateFavourite:function(){
        
      },
      
  getProductDetails: function(productDetails) {
    try{
    if (productDetails.instrumentCurrencyId) {
        this.refcurrency = productDetails.instrumentCurrencyId;
    } else {
        this.refcurrency = applicationManager.getModulesPresentationController({
            "moduleName": "WealthPortfolioUIModule",
            "appName": "PortfolioManagementMA"
        }).getPortfolioCurrency();
    }
    if (productDetails && productDetails != "productDetails" && (Object.entries(productDetails).length) > 0) {
        this.getInstrumentDetails(productDetails);
    } else {
        this.view.InstrumentDetail.setVisibility(false);
    }
    
    if (productDetails.RICCode) {
        this.RICCode = productDetails.RICCode;
    }
    
    this.setRequestParams();
    this.setContext(this.params);
    var a = (this.EntitlementUtils.isEntitled(this.getFieldValue(this._instrumentEntitlement, "entitlement_keys")));
    if (a) {
        this.view.flxInstrumentLineChart.height = "350Dp";
        this.view.flxInstrumentLineChart.top = "20Dp";
    } else {
        this.view.flxInstrumentLineChart.height = "0Dp";
        this.view.flxInstrumentLineChart.top = "0Dp";
    }
    this.getHistoricalDataInstrument();
    if (this.view.flxStocks.isVisible) {
        var stockNewsParam = {
            "RICCode": this.RICCode,
            "pageSize": 4,
            "pageOffset": 0
        };
        this.view.marketNewsCardComp.getCriteria(stockNewsParam, this.view.flxStocks.isVisible, this.view.flxStocks.isVisible, true);
    }
       } catch (err) {
        var errObj = {
          "errorInfo": "Error in getProductDetails",
          "error": err
        };
        this.onError(errObj);
      }
},
    getInstrumentDetails: function(productDetails) {
    try{
    this.view.lbl1.text = productDetails.instrumentName;
    this.view.lbl2.text = productDetails.isinExchange;

    /*if (productDetails.assetType == "Money Market" || productDetails.assetType == "Forward") {
        this.view.flxRight.setVisibility(false);
    } else {
        this.view.flxRight.setVisibility(true);
    }*/

    this.view.lbl5.text = productDetails.formatted_netperChange; 
	if (parseFloat(productDetails.percentageChange) >= 0) {
		this.view.lbl5.skin = this._positiveSkin;
	}else if (parseFloat(productDetails.percentageChange) < 0) {
        this.view.lbl5.skin = this._negativeSkin;
    } else {
        this.view.lbl5.skin = this._neutralSkin;
    }	
    this.view.lbl4.text="";
    if (productDetails.marketPrice !== "") {
		this.mktPrice = applicationManager.getFormatUtilManager().formatAmount(productDetails.marketPrice);
		this.lblCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(productDetails.instrumentCurrencyId.toUpperCase());
        this.view.lbl4.text = this.lblCurrency+this.mktPrice;
    }
	if((this.datum && this.datum.isAdvisory && this.datum.isAdvisory== true) || scope_WealthPresentationController.isJointAccount ) {
		this.view.btnSell.setVisibility(false);
        this.view.btnBuy.setVisibility(false);
	} else if(productDetails.isSecurityAsset== true||(productDetails.application!==undefined && productDetails.application==='SC')) { 
		  this.view.btnSell.setVisibility(true);
          this.view.btnBuy.setVisibility(true);
	} else {
		  this.view.btnSell.setVisibility(false);
          this.view.btnBuy.setVisibility(false);
	}
	
    var instrumentDetailsDate = {
        "timeReceived": ((productDetails.timeReceived) ? productDetails.timeReceived : "00:00:00"),
        "dateReceived": ((productDetails.dateReceived) ? productDetails.dateReceived : "")
    };

    if (productDetails.dateReceived && productDetails.dateReceived !== "") {
        this.view.lbl6.text = kony.i18n.getLocalizedString("i18n.accounts.AsOf") + " " + this.setInstrumentDate(instrumentDetailsDate);
    } else {
        this.view.lbl6.text = "";
    }

    let instrumentParams = {};
    instrumentParams.instrumentName = productDetails.instrumentName;
    instrumentParams.ISINCode = productDetails.ISINCode;
    instrumentParams.stockExchange = productDetails.stockExchange;
    instrumentParams.marketPrice = productDetails.marketPrice;
    instrumentParams.netchange = productDetails.netchange;
    instrumentParams.percentageChange = productDetails.percentageChange;
    instrumentParams.asOfdateTime = this.view.lbl6.text;
    instrumentParams.referenceCurrency = productDetails.instrumentCurrencyId.toUpperCase();
	instrumentParams.instrumentId = productDetails.instrumentId;
	instrumentParams.RICCode = productDetails.RICCode;
	instrumentParams.isinExchange = productDetails.isinExchange;
	instrumentParams.instrumentCurrencyId = productDetails.instrumentCurrencyId.toUpperCase();
	instrumentParams.formatted_netperChange = productDetails.formatted_netperChange; 
    this.referenceCurrency = productDetails.referenceCurrency.toUpperCase();
    this.setInstrumentsData(instrumentParams);
       } catch (err) {
        var errObj = {
          "errorInfo": "Error in getInstrumentDetails",
          "error": err
        };
        this.onError(errObj);
      }
},   
	   
   setInstrumentDate: function(instrumentDate) {
      try{
      let month = instrumentDate.dateReceived.substring(3,6);
      let day = instrumentDate.dateReceived.substring(0,2);
      let year = instrumentDate.dateReceived.substring(7,12);
      var dateFormat = "";
      let hour = instrumentDate.timeReceived.substring(0,2);
      let min = instrumentDate.timeReceived.substring(3,5);
      
      let firstPart = applicationManager.getFormatUtilManager().getTwelveHourTimeString(hour+': '+min);          
      let trdPart = month + ' ' + day;

      return firstPart + ' ' + "UTC" + ' ' + trdPart;
     } catch (err) {
        var errObj = {
          "errorInfo": "Error in setInstrumentDate",
          "error": err
        };
        this.onError(errObj);
      }
    },
      
      onReload:function(){
       this.reload=true;
        this.makeDaoCallInstrument();
      },
      onBuy:function(){
        this.onClickBuy();
      },
      onSell:function(){
        this.onClickSell();
      },
  getDocuments:function(documentDetails){
    try{
        if (this.view.flxDocuments.isVisible && documentDetails.length > 0 && Array.isArray(documentDetails)) {
      var segDocumentsData = [];
      var file_mime_type = {
        "application/x-msword": "doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "application/pdf": "pdf",
        "application/x-pdf": "pdf",
        "application/rtf": "rtf",
        "text/rtf": "rtf",
        "text/plain": "txt",
      };
          this.view.segValue.onRowClick = function() {
            var scopeObj = this;
            var fileUrl = scopeObj.selectedRowItems[0]["lblFactsheetURL"];
            kony.application.openURL(fileUrl);
          };   
      documentDetails.forEach(function (documentItem) {
        segDocumentsData.push({
          "lblFactsheet": documentItem.type + "." + file_mime_type[documentItem.mediaType],
          "lblFactsheetURL": documentItem.link
        });
      });

      this.view.segValue.widgetDataMap = {
        "lblFactsheet": "lblFactsheet",
        "lblFactsheetURL": "lblFactsheetURL"
      };
      this.view.segValue.setData(segDocumentsData);
          
          if ((this.width === 1024 || this.width === 768) && this.counter){
            var assetSize=this.counter*50+80;
            this.view.flxDocuments.top=assetSize+"Dp";
          }
          else{
            this.view.flxDocuments.top="0Dp";
          }
         
        } 
        else {
          this.view.flxDocuments.setVisibility(false);
        }
       } catch (err) {
        var errObj = {
          "errorInfo": "Error in getDocuments",
          "error": err
        };
        this.onError(errObj);
      }
      },  
    getPricingDetails: function(prices) {
      try{
              for (var i = 21; i <= 30; i++) {
              var temp=this.getFieldValue(eval("this._instrumentField"+i));
              var fieldDetails=(temp);
              var display=kony.i18n.getLocalizedString(fieldDetails.displayName);
              var field=fieldDetails.fieldName;
              var type=fieldDetails.type;
              var currency="";
                this.view["lblDisplay"+i].text=display;
              if(type=="Amount"){
                currency=fieldDetails.currency;
                var a=((prices[field])?(prices[field]):"0");
                this.view["lbl"+i].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(a, (prices[currency]).toUpperCase());
              }
                else{
                  this.view["lbl"+i].text=((prices[field])?(prices[field]):"0").toString();
                }
                }
         } catch (err) {
        var errObj = {
          "errorInfo": "Error in getPricingDetails",
          "error": err
        };
        this.onError(errObj);
      }
      },
      
    // Function to check if all values except 'assetType' are empty - WIW2111 defect fix
	isAllEmptyExceptAssetType: function(obj) {
		for (let key in obj) {
			if (key !== "assetType" && obj[key] !== "") {
				return false;
			}
		}
		return true;
	},

      setAssetType: function(instrumentDetails) {
        try{
      var assetsDetails=instrumentDetails.assetTypes;
      //[IW-3297], Ayush Raj - fix start
      var navManager = applicationManager.getNavigationManager();
	  var testResponse = navManager.getCustomInfo('frmDashboard');
        //fix end
        //var currencySymbol = assetsDetails.referenceCurrency;
        var formUtilityMan = applicationManager.getFormatUtilManager();
        if(assetsDetails && (Object.entries(assetsDetails).length)>0 && !this.isAllEmptyExceptAssetType(assetsDetails)){
          this.view.flxAssetType.setVisibility(true);
          this.view.lblHead.text=assetsDetails.assetType+ " Details";
          var counter=0;
          var assetTypeI18nkeys = {
            "sector": "i18n.wealth.sectorOlb",
            "region": "i18n.wealth.regionOlb",
            "country": "i18n.wealth.countryOlb",
            "interestRate": "i18n.wealth.interestRateOlb",
            "contractType": "i18n.wealth.contractTypeOlb",
            "nxtCoupnDate": "i18n.wealth.nextCouponDateOlb",
            "maturityDate": "i18n.Wealth.maturityDate",
            "duration": "i18n.wealth.durationOlb",
            "modifiedDuration": "i18n.wealth.modifiedDurationOlb",
            "rating": "i18n.wealth.ratingOlb",
            "issuer": "i18n.wealth.issuerOlb",
            "type": "i18n.wealth.typesOlb",
            "underlying": "i18n.wealth.underlyingOlb",
            "contractSize": "i18n.wealth.contractSizeOlb",
            "strikePrice": "i18n.wealth.strikePriceOlb",
            "expiryDate": "i18n.wealth.expiryDateOlb",
            "optionClass": "i18n.wealth.optionClassOlb",
            "optionStyle": "i18n.Wealth.optionStyleOlb"
      }
          
               for (var i = 1, j=41; i <= 18; i++) {
              var temp=this.getFieldValue(eval("this._assetTypeField"+i));
              var fieldDetails=(temp);
              var field=fieldDetails.fieldName;
              var display=kony.i18n.getLocalizedString(assetTypeI18nkeys[field]);
              var type=fieldDetails.type;
              var currency="";
                 
                 if(assetsDetails[field]){
                   this.view["flx"+j].isVisible=true;
                   this.view["sep"+(j)].isVisible=true;
                   this.view["lblDisp"+j].text=display;
                   if(type=="Amount"){
                     currency=(fieldDetails.currency && fieldDetails.currency!=="") ? fieldDetails.currency :this.lblCurrency; 
                     //this.view["lbl"+j].text=formUtilityMan.formatAmountandAppendCurrencySymbol(assetsDetails[field], currencySymbol);
                     this.view["lbl"+j].text=formUtilityMan.formatAmount(assetsDetails[field]);
                   }
                   else if(type=="Percent"){
                     this.view["lbl"+j].text = (assetsDetails[field]).replace(/%/g,'') + "%";
                   }
                   else{
                     this.view["lbl"+j].text=assetsDetails[field];
                   }
                   j++;
                   counter++;
                 }
                 if(i==18){
                   this.view["sep"+(j-1)].isVisible=false;
					for(j;j<47;j++){
                        this.view["flx"+j].isVisible=false;
                    }
                 }
               }
               if(this.view.lbl41.text.length > 30){
                            this.view.lbl41.height = "40px";
                            this.view.lbl41.width = "200px";
                            this.view.lbl41.right = "-4px";
               }else{
                            this.view.lbl41.height = kony.flex.USE_PREFERED_SIZE;
                            this.view.lbl41.width = kony.flex.USE_PREFERED_SIZE;
                            this.view.lbl41.right = "20px";
               }
          if(assetsDetails.yield && (assetsDetails.assetType == "Bond" || assetsDetails.assetType == "Fixed Income")) {
                   this.view.flx47.isVisible=true;
                   this.view.sep47.isVisible = true;
                   this.view.lblDisp47.text=kony.i18n.getLocalizedString("i18n.wealth.yeildToMaturity");
            	   this.view.lbl47.text = assetsDetails.yield + "%";
                   }
                   else {
                     this.view.flx47.isVisible=false;
                   }
          this.counter=counter;
          if(assetsDetails.assetType== "Money Market"){
            this.view.flxContent12.setVisibility(true);
            this.view.lblContent12.text=(assetsDetails.interestRate).replace(/%/g,'') + "% Interest Rate";
          }
        }
        else{
          this.view.flxAssetType.setVisibility(false);
        }
        if(this.noPosition){
            let refCurrency =  this.refcurrency.toUpperCase();
            for (var k = 7,l=7; k <= 12; k++) {
              var tempp=this.getFieldValue(eval("this._holdingsField"+k));
              var fieldDetail=(tempp);
              var displayy=kony.i18n.getLocalizedString(fieldDetail.displayName);
              var types=fieldDetail.type;
              if(displayy!= kony.i18n.getLocalizedString("i18n.wealth.balanceWithColon")){
                // if(l==8 && this.typeofAsset== "Money Market"){ // WIW-2294
                //   this.view["flx"+l].isVisible=false;
                //   l++;
                // }
                // else{
                  if(displayy==kony.i18n.getLocalizedString("i18n.wealth.nominal")){
                    if(this.typeofAsset){
                      if(this.typeofAsset== "Fund" || this.typeofAsset== "Stock" || this.typeofAsset== "Fund Share"){
                        displayy=kony.i18n.getLocalizedString("i18n.wealth.Quantity");
                      }}
                    else{
                      displayy=kony.i18n.getLocalizedString("i18n.wealth.Quantity");
                    }
                  }
                  this.view["flx"+l].isVisible=true;
                  this.view["lblDisplay"+l].text=displayy;
                  if(types=="Amount"){
                    this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                  }
                  else if(types=="ColourAmount"){
                    //[IW-3297], Ayush Raj - fix start
                    if(testResponse.response.hasOwnProperty('isTapIntegration')){
                      this.view["lbl"+l].text= "        -"
                    }
                    else
                      //fix end
                    this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                  }
                  else if(types=="Percentage"){
                    this.view["lbl"+l].text = ("0.00") + "%";
                  }
                  else{
                    this.view["lbl"+l].text="0";
                  }
                  this.view["lbl"+l].skin= this._neutralSkin;
                  l++;
                //}
                }
              if(k==12){
                var cc=0;
                k++;
                for(l;l<15;l++){
                  if(this.typeofAsset){
                    if((this.typeofAsset==="Bond" || this.typeofAsset === "Fixed Income")&& cc==0){
                      var t=this.getFieldValue(eval("this._holdingsField"+k));
                      this.view["flx"+l].isVisible=true;
                      this.view["lblDisplay"+l].text=kony.i18n.getLocalizedString(t.displayName);
                      this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                      this.view["lbl"+l].skin= this._neutralSkin;
                      cc=1;
                    }
                    else if(this.typeofAsset=="Forward"&& cc==0){
                      l=9;
                      var ttt=this.getFieldValue(eval("this._holdingsField11"));
                      this.view["flx"+l].isVisible=true;
                      this.view["lblDisplay"+l].text=kony.i18n.getLocalizedString(ttt.displayName);
                      this.view["lbl"+l].text=("0.00") + "%";
                      this.view["lbl"+l].skin= this._neutralSkin;
                      l++
                      for(++k;k<=18;k++){
                        var tt=this.getFieldValue(eval("this._holdingsField"+k));
                        this.view["flx"+l].isVisible=true;
                        this.view["lblDisplay"+l].text=kony.i18n.getLocalizedString(tt.displayName);
                        this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                        this.view["lbl"+l].skin= this._neutralSkin;
                        l++;
                      }
                      cc=1;
                    }
                    else if(this.typeofAsset=="Money Market"&& cc==0){
                    //   l=l-1;
                    //   var s = this.getFieldValue(eval("this._holdingsField" + k));
                    //   this.view["flx" + l].isVisible = true;
                    //   this.view["lblDisplay" + l].text = kony.i18n.getLocalizedString(s.displayName);
                    //   this.view["lbl" + l].text = this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                    //   this.view["lbl"+l].skin= this._neutralSkin;
                    //   cc = 1;
                    //   this.view["lblDisplay7"].text = kony.i18n.getLocalizedString("i18n.wealth.balanceWithColon");
                     for(--k;k<=13;k++){
                          var s = this.getFieldValue(eval("this._holdingsField" + k));
                          this.view["flx" + l].isVisible = true;
                          this.view["lblDisplay" + l].text = kony.i18n.getLocalizedString(s.displayName);
                          this.view["lbl" + l].text = this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                          this.view["lbl"+l].skin= this._neutralSkin;
                          l++;
                        }
                        if((this.view["lblDisplay" + 11].text)==="Average Cost:"){
                          this.view.flx11.isVisible = false;
                          this.view.flx14.isVisible = false;
                        }
                        cc = 1;
                    }
                    else{
                      this.view["flx"+l].isVisible=false;
                    }
                  }
                  else{
                    this.view["flx"+l].isVisible=false;
                  }
                }
              }
            }
        if(this.view.flx12.isVisible){
          this.view.flx1314.isVisible=true;
        }
        else{
          this.view.flx1314.isVisible=false;
        }

            this.noPosition=1;
          }
           } catch (err) {
        var errObj = {
          "errorInfo": "Error in setAssetType",
          "error": err
        };
        this.onError(errObj);
      }
      },
      
      currentPosition: function(currentPosition) {
        try{
        //[IW-3297], Ayush Raj - fix start
        var navManager = applicationManager.getNavigationManager();
		var testResponse = navManager.getCustomInfo('frmDashboard');
        //fix end
        
     if (!currentPosition || currentPosition=="p"){
        let refCurrency =  this.refcurrency.toUpperCase();
              for (var k = 7,l=7; k <= 12; k++) {
              var tempp=this.getFieldValue(eval("this._holdingsField"+k));
              var fieldDetail=(tempp);
              var displayy=kony.i18n.getLocalizedString(fieldDetail.displayName);
              var types=fieldDetail.type;
                if(displayy!=kony.i18n.getLocalizedString("i18n.wealth.balanceWithColon")){
                //   if(l==8 && this.typeofAsset== "Money Market" && displayy!="Unrealized P&L:"){ //WIW-2294
                //     this.view["flx"+l].isVisible=false;
                //     l++;
                //   }
                //   else{
                    if(displayy==kony.i18n.getLocalizedString("i18n.wealth.nominal")){
                      if(this.typeofAsset){
                        if(this.typeofAsset== "Fund" || this.typeofAsset== "Stock" || this.typeofAsset== "Fund Share"){
                          displayy=kony.i18n.getLocalizedString("i18n.wealth.Quantity");
                        }
                      else{
                        displayy==kony.i18n.getLocalizedString("i18n.wealth.nominal");
                      }}
                      else{
                        displayy=kony.i18n.getLocalizedString("i18n.wealth.Quantity");
                      }
                    }
                    this.view["flx"+l].isVisible=true;
                this.view["lblDisplay"+l].text=displayy;
              if(types=="Amount"){
                this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
              }
                else if(types=="ColourAmount"){
                  //[IW-3297], Ayush Raj - fix start
                  if(testResponse.response.hasOwnProperty('isTapIntegration')){
                      this.view["lbl"+l].text= "        -"
                    }
                    else
                      //fix end
                	this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                }
          else if(types=="Percentage"){
             this.view["lbl"+l].text = ("0.00") + "%";
          }
           else{
                  this.view["lbl"+l].text="0";
                }
                 this.view["lbl"+l].skin= this._neutralSkin;
                  l++;
                //}
                }
                if(k==12){
                  var cc=0;
                  k++;
                  for(l;l<15;l++){
                    if(this.typeofAsset){
                      if ((this.typeofAsset === "Bond" || this.typeofAsset === "Fixed Income" ) && cc == 0) {
                        var t=this.getFieldValue(eval("this._holdingsField"+k));
                        this.view["flx"+l].isVisible=true;
                        this.view["lblDisplay"+l].text=kony.i18n.getLocalizedString(t.displayName);
                        this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                        this.view["lbl"+l].skin= this._neutralSkin;
                        cc=1;
                      }
                      else if(this.typeofAsset=="Forward"&& cc==0){
                        l=9;
                        var ttt=this.getFieldValue(eval("this._holdingsField11"));
                        this.view["flx"+l].isVisible=true;
                        this.view["lblDisplay"+l].text=kony.i18n.getLocalizedString(ttt.displayName);
                        this.view["lbl"+l].text=("0.00") + "%";
                        this.view["lbl"+l].skin= this._neutralSkin;
                        l++
                        for(++k;k<=18;k++){
                        var tt=this.getFieldValue(eval("this._holdingsField"+k));
                        this.view["flx"+l].isVisible=true;
                        this.view["lblDisplay"+l].text=kony.i18n.getLocalizedString(tt.displayName);
                        this.view["lbl"+l].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                        this.view["lbl"+l].skin= this._neutralSkin;
                        l++;
                        }
                       cc=1;
                      }
                      else if(this.typeofAsset=="Money Market"&& cc==0){
                       /* l=l-1;
                        var s = this.getFieldValue(eval("this._holdingsField" + k));
                        this.view["flx" + l].isVisible = true;
                        this.view["lblDisplay" + l].text = s.displayName;
                        this.view["lbl" + l].text = this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                        this.view["lbl"+l].skin= this._neutralSkin;
                        cc = 1;
                        this.view["lblDisplay7"].text = "Balance:";*/
                        for(--k;k<=13;k++){
                          var s = this.getFieldValue(eval("this._holdingsField" + k));
                          this.view["flx" + l].isVisible = true;
                          this.view["lblDisplay" + l].text = kony.i18n.getLocalizedString(s.displayName);
                          this.view["lbl" + l].text = this.FormatUtils.formatAmountAndAddCurrencySymbol(0, refCurrency);
                          this.view["lbl"+l].skin= this._neutralSkin;
                          l++;
                        }
                        if((this.view["lblDisplay" + 11].text)==="Average Cost:"){
                          this.view.flx11.isVisible = false;
                          this.view.flx14.isVisible = false;
                        }
                        cc = 1;
                      }
                      else{
                        this.view["flx"+l].isVisible=false;
                      }
                    }
                    else{
                      this.view["flx"+l].isVisible=false;
                    }
                  }
                }
              }
				this.noPosition=1;
     }
 
      else {
        this.noPosition=0;
        for (var i = 7,j=7; i <= 18; i++) {
              var temp=this.getFieldValue(eval("this._holdingsField"+i));
              var fieldDetails=(temp);
              var display=kony.i18n.getLocalizedString(fieldDetails.displayName);
              var field=fieldDetails.fieldName;
              var type=fieldDetails.type;
              var currency="";
          if(j==8 && currentPosition.assetClass== "Money Market"){
            this.view["flx"+j].isVisible=false;
           // j++; // IW-3818 Bharath
          }
		  // IW-3818 Bharath start
		  if(currentPosition.assetClass === "Forward"){
            if(currentPosition.costPrice)
            {
              currentPosition.costPrice = "";
            }
			if(currentPosition.quantity){
              currentPosition.quantity="";
            }
          }// IW-3818 Bharath ends
		  
       
		  
		  
		  // IW-3299 Vivek Singh
          if ((j == 12 && currentPosition.assetClass !== "Bonds") && currentPosition.assetClass !== "Bond")
			  //IW-3299 
			  {
            this.view["flx" + j].isVisible = false;
            currentPosition.accruedInterest = "";
           // j++;  // IW-3818 Bharath
          }
          if (display == kony.i18n.getLocalizedString("i18n.wealth.nominal")) {
            if (this.typeofAsset) {
              if (this.typeofAsset == "Fund" || this.typeofAsset == "Stock" || this.typeofAsset== "Fund Share") {
                display = kony.i18n.getLocalizedString("i18n.wealth.Quantity");
              }
              else{
                display == kony.i18n.getLocalizedString("i18n.wealth.nominal");
              }
            } else {
              display = kony.i18n.getLocalizedString("i18n.wealth.Quantity");
            }
          }
          if(currentPosition[field]){
            if(j==12)
              this.view["flx"+j].isVisible=true;
		  // IW-3299 Vivek Singh
            else
              this.view["flx"+j].isVisible=true;
		  // IW-3299
                this.view["lblDisplay"+j].text=display;
				if(currentPosition[field].accruedInterest !== "") this.view["flx" + j].isVisible = true;
              if(type=="Amount"){
                currency=(fieldDetails.currency && fieldDetails.currency!=="") ? fieldDetails.currency :this.lblCurrency; 
                var s1=currentPosition[field];
                this.view["lbl"+j].text=this.FormatUtils.formatAmountAndAddCurrencySymbol(s1.replace(/,/g,''), (currentPosition[currency]).toUpperCase());
                this.view["lbl"+j].skin= this._neutralSkin;
              }
                else if(type=="ColourAmount"){
                currency=(fieldDetails.currency && fieldDetails.currency!=="") ? fieldDetails.currency :this.lblCurrency; 
                  var s2=currentPosition[field];
                this.view["lbl"+j].text= (s2 !== "-")?this.FormatUtils.formatAmountAndAddCurrencySymbol(s2.replace(/,/g,''), (currentPosition[currency]).toUpperCase()):"        -";
             if(s2>0){
                this.view["lbl"+j].skin= this._positiveSkin;
             }
              else if(s2<0){
                 this.view["lbl"+j].skin= this._negativeSkin;
              }  
                  else{
                     this.view["lbl"+j].skin= this._neutralSkin;
                  }
                }
          else if(type=="Percentage"){
             this.view["lbl"+j].text = (currentPosition[field]) + "%";
              this.view["lbl"+j].skin= this._neutralSkin;
          }
           else{
                  this.view["lbl"+j].text=((currentPosition[field])?(currentPosition[field]):"").toString();
               	  this.view["lbl"+j].skin= this._neutralSkin;
                }
            j++;
                }
                                   if(i==18){
					for(j;j<15;j++){
                        this.view["flx"+j].isVisible=false;
                    }
                 }
        }

      }      
        if(this.view.flx12.isVisible){
          this.view.flx1314.isVisible=true;
        }
        else{
          this.view.flx1314.isVisible=false;
        }
           } catch (err) {
        var errObj = {
          "errorInfo": "Error in currentPosition",
          "error": err
        };
        this.onError(errObj);
      }
    },
      
     
      onServiceChartSuccess: function(response,unicode){
        try{
         this.processResponse(response,unicode);
      var graphData = this.getFieldValue(this._historyDataResponseArray);
        //For the issue IW-3294 made the following riccode condition
      if (graphData && this.criteria.RICCode && this.criteria.RICCode!=="" && this.criteria.RICCode !== "RICCode" && (this.view.flxInstrumentLineChart.height!="0dp")) {
        this.view.investmentLineChart.setVisibility(true);
        var forUtility = applicationManager.getFormatUtilManager();
        scope_WealthPresentationController.investmentChartCurrency = forUtility.getCurrencySymbol(this.refcurrency);
        this.view.investmentLineChart.setChartData(graphData, null);
        this.view.flxInstrumentLineChart.height = "350Dp";
        this.view.flxInstrumentLineChart.top="20Dp";
      } 
      else {
        this.view.investmentLineChart.setVisibility(false);
        this.view.flxInstrumentLineChart.height = "0Dp";
        this.view.flxInstrumentLineChart.top="0Dp";
      }
           } catch (err) {
        var errObj = {
          "errorInfo": "Error in onServiceChartSuccess",
          "error": err
        };
        this.onError(errObj);
      }
    },
      getHistoricalDataInstrument: function(){
      try{
      let objectName = this.getFieldValue(this._historyDataObjectName);
      let objectServiceName = this.getFieldValue(this._historyDataObjectService);
      let operationName = this.getFieldValue(this._historyDataOperation);
      let serviceResponseIdentifier = this.getFieldValue(this._historyDataIdentifier);
      var criterion = this.getFieldValue(this._historyDataCriteria);
      this.setCriteria(criterion);
      //this.requestStart();
      this.InstrumentDetailsDAO.fetchDetails(objectServiceName,operationName,objectName,this.getCriteria(),serviceResponseIdentifier,this.onServiceChartSuccess,this.onError);
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
     * Component processResponse
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    processResponse:function(backendResponse,unicode){
      var self = this;
      try
      {
        this.response = backendResponse;
        if(backendResponse.historicalData) {
            this.response.historicalData = JSON.parse(backendResponse.historicalData);
        }
        this.map = {};
        this.readObject(backendResponse);
        this.parserUtilsManager.setResponseData(unicode,this.map);
        //this.updateTransactions();
        //this.requestEnd();
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in processing the service responce",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
      
      
          /**
     * Component readObject
     * Helper method to parse the backend response
     * obj{JSONArray} - object containing any value
     * jsonPath{String} - jsonPath traversed till the search field is reachable
     */
    readObject: function(obj, jsonPath) {
      var self = this;
      try
      {
        var keysItr = Object.keys(obj);
        var parentPath = jsonPath;
        for (var i = 0; i < keysItr.length; i++) {
          var key = keysItr[i];
          var value = obj[key]
          if(parentPath)
            jsonPath = parentPath + "." + key;
          else
            jsonPath = key;
          if (value instanceof Array) {
            this.map[key] = value;
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.map[key] = value;
            this.readObject(value, jsonPath);
          } else { // is a value
            if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
              value=eval('('+value+')');
            if (value instanceof Array) {
              this.readArray(value, jsonPath);
            } else if (value instanceof Object) {
              this.readObject(value, jsonPath);
            }else{
              this.map[jsonPath] = value;
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in reading the Object.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
      
       /**
     * Component readArray
     * Helper method to parse the backend response
     * array{JSONArray} - array of records
     * jsonPath{String} - jsonPath traversed till the search field is reachable
     */
    readArray: function(array, jsonPath) {
      var self = this;
      try
      {
        var parentPath = jsonPath;
        for (var i = 0; i < array.length; i++) {
          var value = array[i];
          jsonPath = parentPath + "[" + i + "]";
          if (value instanceof Array) {
            this.readArray(value, jsonPath);
          } else if (value instanceof Object) {
            this.readObject(value, jsonPath);
          } else { // is a value
            if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
              value=eval('('+value+')');
            if (value instanceof Array) {
              this.readArray(value, jsonPath);
            } else if (value instanceof Object) {
              this.readObject(value, jsonPath);
            }else{
              this.map[jsonPath] = value;
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in reading the array.",
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
      if(criteria==undefined){
        return;
      }
      var self = this;
      try
      {
		var criteriaObject;	
        criteriaObject = JSON.parse(this._instrumentCriteria);
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
        if(this.criteria["sortBy"] ==  "sortBy"){
          this.criteria["sortBy"] = "";
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
              "errorInfo" : "Error in the setContext of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
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
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(value[this.accountType]){
          value = value[this.accountType];
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
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
              "errorInfo" : "Error in breakPointParser",
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
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    }, 
      
     chartFilters: {
      ONE_DAY: '1D',
      ONE_MONTH: '1M',
      ONE_YEAR: '1Y',
      YTD: 'YTD',
    },

    onFilterChanged: function(filter) {
      var filterMap = "";
      if (filter === this.chartFilters.ONE_DAY) {
        filterMap = "1D";
        this.chartService(filterMap);
      } else if (filter === this.chartFilters.ONE_MONTH) {
        filterMap = "1M";
        this.chartService(filterMap);
      } else if (filter === this.chartFilters.ONE_YEAR) {
        filterMap = "1Y";
        this.chartService(filterMap);
      } else {
        filterMap = "YTD";
        this.chartService(filterMap);
      }
    },
      
	};
});
