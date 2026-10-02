define(['./segListBusinessController'],function(segListBusinessController) {
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
     
      this.businessController = new segListBusinessController(this);
      
    },
    collectionData:{},
    
    microAppConstants : {
      "COMMONS": "CommonsMA",
      "RESOURCES": "ResourcesMA",
      "ABOUTUS": 'AboutUsMA',
      "ALERTSETTINGS": 'AlertSettingsMA',
      "CONSENTMANAGEMENT": 'ConsentMgmtMA',
      "BILLPAY": 'BillPayMA',
      "DIGITALTRANSFER": 'DigitalTransferMA',
      "HOMEPAGE": 'HomepageMA',
      "NOTIFICATIONS": 'NotificationsMA',
      "SECUREMESSAGE": 'SecureMessageMA',
      "PERSONALFINANCEMANAGEMENT": 'PfmMA',
      "PORTFOLIO": 'PortfolioManagementMA' ,
      "REGIONALTRANSFER": 'RegionalTransferMA',
      "UNIFIEDTRANSFER": 'UnifiedTransferMA',
      "WEALTHORDER": 'WealthOrderMA',
      "WIRETRANSFER": 'WireTransferMA',
      "ACCAGGREGATION": 'AccAggregationMA',
      "ARRANGEMENTS": 'ArrangementsMA',
      "APPROVALMATRIX": 'ApprovalMatrixMA',
      "USERMANAGEMENT": 'UserManagementMA',
      "APPROVALREQUEST": 'ApprovalRequestMA',
      "FOREIGNEXCHANGE": 'ForeignExchangeMA',
      "BULKPAYMENTS": 'BulkPaymentsMA',
      "FINANCEMANAGEMENT": 'FinanceManagementMA',
      "CARDS": 'CardsMA',
      "CAMPAIGN": 'CampaignMA',
      "MANAGEARRANGEMENTS": 'ManageArrangementsMA',
      "CBP": 'CBPMA',
      "SELFSERVICEENROLMENT": 'SelfServiceEnrolmentMA',
      "MANAGEPROFILE": 'ManageProfileMA',
      "TRADEFINANCE": 'TradeFinanceMA',
      "AUTHENTICATION": 'AuthenticationMA',
      "SAVINGSPOT": 'SavingsPotMA',
      "ACH":'ACHMA'
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
            defineGetter(this, 'serviceParameters', () => {
                return this._serviceParameters;
            });
            defineSetter(this, 'serviceParameters', value => {
                this._serviceParameters = value;
            });
            defineGetter(this, 'dataMapping', () => {
                return this._dataMapping;
            });
            defineSetter(this, 'dataMapping', value => {
                this._dataMapping = value;
            });
            defineGetter(this, 'rowTemplateConfig', () => {
                return this._rowTemplateConfig;
            });
            defineSetter(this, 'rowTemplateConfig', value => {
                this._rowTemplateConfig = value;
            });
            defineGetter(this, 'headerTemplateConfig', () => {
                return this._headerTemplateConfig;
            });
            defineSetter(this, 'headerTemplateConfig', value => {
                this._headerTemplateConfig = value;
            });
        },
   
    
    /**
     * @api: setContext
     * Method to set the context value from form/parent component 
     * @arg: param - data sent from consumer of Selection component
     * @return: NA
     */
    setContext: function (param) {
      var scope = this;
      try {
        this.context = param;
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },

    /**
    * @api: preShow
    * Performs the actions required before rendering component
    * @return: NA
    */
    preShow: function () {
      var scope = this;
      try {
        //scope.contextKey = scope.fetchContextKey();
        this.businessController.setProperties(scope.contextKey, this._serviceParameters, this._dataFormatting, this.context,
          this._dataMapping.segListDetail.segmentUI.rowTemplate);
       this.businessController. getMetaData();
//         if (this.isServiceInvokationPossible()) {
//           this.businessController.getMetaData();
//         }
      } catch (err) {
        scope.setError(err, "preShow");
      }
    },

    /**
    * @api: postShow
    * Performs the actions required before rendering component
    * @return: NA
    */
    postShow: function () {
      var scope = this;
      try {
        this.setSegmentTemplate();
        if (!kony.sdk.isNullOrUndefined(scope.context) && Object.keys(scope.context).length > 0) {
          this.businessController.setContextInCollection(this.context);
        }
        this.setWidgetDataMap();
      } catch (err) {
        scope.setError(err, "postShow");
      }
    },

//     /**
//   * @api: render
//     * gets invoked when collection gets updated so that UI gets updated
//   * @return: NA
//   */
//     render: function () {
//       var scope = this;
//       try {
//         this.collectionData = SelectionStore.getState();
//         this.append = [];
//         this.setDataInSegment();
//       } catch (err) {
//         scope.setError(err, "render");
//       }
//     },

    /**
    * @api: updateContext
    * updates the context data and loads the segment with the updated data
    * @return: NA
    **/
    updateContext: function (contextData) {
      var scope = this;
      try {
        if (!scope.isEmptyNullUndefined(contextData)) {
          scope.setContext(contextData);
        }
        if (!kony.sdk.isNullOrUndefined(scope.context) && Object.keys(scope.context).length > 0) {
          this.setWidgetDataMap();
          scope.businessController.setContextInCollection(scope.context);
        }
      } catch (err) {
        scope.setError(err, "updateContext");
      }
    },

    /**
     * @api: setConfigsFromParent
     * Method to set the configurations from parent component 
       when Selection Component is consumed as a child component
     * @arg: configParams - input contract configurations from component consumer
     * @return: NA
     */
    setConfigsFromParent: function (configParams) {
      var scope = this;
      try {
        if (!scope.isEmptyNullUndefined(configParams)) {
          for (let config in configParams) {
            if (!kony.sdk.isNullOrUndefined(configParams[config])) {
              this["_" + config] = configParams[config];
            }
          }
        }
      } catch (err) {
        scope.setError(err, "setConfigsFromParent");
      }
    },

    /**
     * @api: isServiceInvokationPossible
     * Checks whether the requirements to make a service call are satisfied
     * @return: boolean value
     */
    isServiceInvokationPossible: function () {
      var scope = this;
      try {
        if (!scope.isEmptyNullUndefined(this._serviceParameters[Object.keys(scope.serviceParameters)[0]])) {
          let serviceParameters = this._serviceParameters[Object.keys(scope.serviceParameters)[0]];
          if ((!scope.isEmptyNullUndefined(serviceParameters.ServiceType))
            && (!scope.isEmptyNullUndefined(serviceParameters.Service))
            && (!scope.isEmptyNullUndefined(serviceParameters.Object))
            && (!scope.isEmptyNullUndefined(serviceParameters.Verb))) {
            return true;
          }
          else {
            return false;
          }
        } else {
          return false;
        }
      } catch (err) {
        scope.setError(err, "isServiceInvokationPossible");
      }
    },

    /**
     * Generates a random key into which context data can be stored into collection
     * @returns {String} Key into which context data can be stored into collection
     */
    fetchContextKey: function () {
      var scope = this;
      try {
        let segMasterData = scope._dataMapping.segListDetail.segmentMasterData;
        let viewId = this.view.id;
        if (segMasterData.indexOf("CNTX.") !== -1) {
          let contextKey = segMasterData.split(".");
          contextKey = contextKey[contextKey.length - 1].replace("}", "");
          contextKey = contextKey + "_" + viewId;
          return contextKey;
        }
      } catch (err) {
        scope.setError(err, "fetchContextKey");
      }
    },
    
     /**
     * @api: setSegmentTemplate
     * Sets the template of segment based on contract property
     * @return: NA
     */
    setSegmentTemplate: function () {
      var scope = this;
      try {
        let rowTemplate = scope.getDynamicTemplateName(scope._rowTemplateConfig);
        let headerTemplate = scope.getDynamicTemplateName(scope._headerTemplateConfig);
        //let selectedRowTemplate = scope.getDynamicTemplateName(scope._selectedRowTemplateConfig);
        if (!scope.isEmptyNullUndefined(rowTemplate)) {
          this.view.segListDetail.setVisibility(true);
          this.view.segListDetail.rowTemplate = rowTemplate;
        }
        else {
          this.view.flxMain.setVisibility(false);
        }
        if (!scope.isEmptyNullUndefined(headerTemplate)) {
          this.headerTemplateId = headerTemplate
          this.view.segListDetail.sectionHeaderTemplate = headerTemplate;
        }
       
      } catch (err) {
        scope.setError(err, "setSegmentTemplate");
      }
    },

    /**
     * @api: setWidgetDataMap
     * Performs widget data map for the widgets specified in data mapping property
     * @return: NA
     */
    setWidgetDataMap: function () {
      var scope = this;
      try {
        let widgetDataMap = {};
        let dataMapping = this._dataMapping.segListDetail.segmentUI;
        for (let templateType in dataMapping) {
          for (let widgetId in dataMapping[templateType]) {
            widgetDataMap[widgetId] = widgetId;
          }
        }
        if (!scope.isEmptyNullUndefined(this._separatorWidget)) {
          let sepActionWidget = this._separatorWidget;
          widgetDataMap[sepActionWidget] = sepActionWidget;
        }
        this.view.segListDetail.widgetDataMap = widgetDataMap;
      } catch (err) {
        scope.setError(err, "setWidgetDataMap");
      }
    },

    /**
     * @api: setDataInSegment
     * Sets the processed data in segment and sets the default value for the segment
     * @return: NA
     */
    setDataInSegment: function () {
      var scope = this;
      try {
        this.segRef = this._dataMapping.segListDetail.segmentUI;
        let rowData = this.setRowDataMapping(this.segRef.rowTemplate);
        //this.selectedRowData = this.setRowDataMapping(this.segRef.selectedRowTemplate);
        this.dataToBeSet = rowData;
        this.isHeaderPresent = this.isEmptyNullUndefined(this.headerTemplateId);
        if (!this.isHeaderPresent) {
          this.header = this.setHeaderDataMapping(this.segRef.headerTemplate, this.collectionData);
          let tempArray = [], segmentData = [];
          tempArray.push(this.header);
          tempArray.push(this.dataToBeSet);
          segmentData.push(tempArray);
          //this.mapData = segmentData;
          if (segmentData[0][1].length > 0) {
            this.view.segListDetail.setVisibility(true);
            this.view.segListDetail.setData(segmentData);
          }
          else {
            this.view.segListDetail.setVisibility(false);
            }
        }
        else {
          if (this.dataToBeSet.length > 0) {
            this.view.segListDetail.setVisibility(true);
            this.view.segListDetail.setData(this.dataToBeSet);
          } else {
            this.view.segListDetail.setVisibility(false);
          }
        }
       
      } catch (err) {
        scope.setError(err, "setDataInSegment");
      }
    },
    
    /**
     * @api: setHeaderDataMapping
     * Maps the tokens related to header with contaxt data
     * @arg: inputJSON - data mapping of header template
     * @return: segment header data
     */
    setHeaderDataMapping: function (inputJSON) {
      var scope = this;
      try {
        let segmentData = [], headerData = {}, recordsCount = 0, token = "";
        let headerLabelDetails = [];
        let dataMappingJSON = JSON.parse(JSON.stringify(inputJSON));
        if (!this.isEmptyNullUndefined(this.collectionData[scope.contextKey])) {
          let responseData = this.collectionData[scope.contextKey];
          for (let key in dataMappingJSON) {
            if (typeof dataMappingJSON[key] === "string") {
              let contextKey = dataMappingJSON[key].split(".");
              contextKey = contextKey[1];
              headerData[key] = scope.businessController.convertTokensInDataMapping(dataMappingJSON[key], responseData[contextKey]);
            }
          }
        }
        return headerData;
      }
      catch (err) {
        scope.setError(err, "setHeaderDataMapping");
      }
    },
    
    /**
     * @api: setRowDataMapping
     * Maps the data into rows either from collection or context data 
     * @arg: inputJSON - data mapping of row template
     * @return: row records
     */
    setRowDataMapping: function (inputJSON) {
      var scope = this;
      try {
        let segmentData = [];
        let dataMappingJSON = JSON.parse(JSON.stringify(inputJSON));
        let segRef = this._dataMapping.segListDetail.segmentUI;
        let dataSource = this._dataMapping.segListDetail.segmentMasterData;
        dataSource = dataSource.split(".");
        let dataTypeSource = dataSource[dataSource.length - 2];
        dataSource = dataSource[dataSource.length - 1].replace("}", "");
        if (!this.isEmptyNullUndefined(this.collectionData[Object.keys(scope.serviceParameters)[0]]) && Object.keys(this.collectionData[Object.keys(scope.serviceParameters)[0]]).length > 0 && dataTypeSource.indexOf("Collection") !== -1) {
          segmentData = this.mapRowData(dataMappingJSON, this.collectionData[Object.keys(scope.serviceParameters)[0]]);
          if (!scope.isEmptyNullUndefined(this._separatorWidget)) {
            segmentData = this.manageVisibilityOfSeparator(segmentData);
          }
        }
        else if (!this.isEmptyNullUndefined(this.collectionData[scope.contextKey]) && Object.keys(this.collectionData[scope.contextKey]).length > 0 && dataTypeSource.indexOf("CNTX") !== -1) {
          dataSource = dataSource.split(".");
          dataSource = dataSource[dataSource.length - 1];
          segmentData = this.mapRowData(dataMappingJSON, this.collectionData[scope.contextKey][dataSource]);
          if (!scope.isEmptyNullUndefined(this._separatorWidget)) {
            segmentData = this.manageVisibilityOfSeparator(segmentData);
          }
        }
        return segmentData;
      } catch (err) {
        scope.setError(err, "setRowDataMapping");
      }
    },

    /**
     * @api: mapRowData
     * Maps the collection data with the tokens specified in data mapping property
     * @arg1: dataMappingJSON - data sent from consumer of Selection component
     * @arg2: responseData - data sent from consumer of Selection component
     * @return: row records
     */
    mapRowData: function (dataMappingJSON, responseData) {
      var scope = this;
      try {
        let segmentData = [];
        responseData.map(function (record) {
          let segRecord = {};
          for (let key in dataMappingJSON) {
            let dataToBeMapped = scope.businessController.convertTokensInDataMapping(dataMappingJSON[key], record);
            if (dataToBeMapped === undefined) {
              segRecord[key] = {
                "isVisible": false
              };
            }
            else {
              segRecord[key] = scope.businessController.convertTokensInDataMapping(dataMappingJSON[key], record);
            }
          }
          segmentData.push(segRecord);
        });
        return segmentData;
      } catch (err) {
        scope.setError(err, "mapRowData");
      }
    },
    
    getDynamicTemplateName :function (templateConfig) {
    var scope = this;
    if (!scope.isEmptyNullUndefined(templateConfig)) {
      if (templateConfig.indexOf("{") !== -1) {
        templateConfig = JSON.parse(templateConfig);
        if (!scope.isEmptyNullUndefined(templateConfig.microAppName) && !scope.isEmptyNullUndefined(templateConfig.templateID)) {
          return kony.mvc.resolveNameFromContext({
            "appName": templateConfig.microAppName,
            "friendlyName": templateConfig.templateID
          });
        }
      } else {
        return templateConfig;
      }
    } else {
      return "";
    }
  },
    
   isEmptyNullUndefined : function (data) {
    if (data === null || data === undefined || data === "") {
      return true;
    } else {
      return false;
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
      var errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      console.log(errorObj);
    }
  };
});