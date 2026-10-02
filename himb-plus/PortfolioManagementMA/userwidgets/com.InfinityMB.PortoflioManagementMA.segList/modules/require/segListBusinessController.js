define(function () {

   function InvokeService(compViewCtrlScope) {
     this.compViewCtrlScope=compViewCtrlScope;
    this.store = {};
    this.objectMetadata = {};
    this.context = {};
    this.serviceParameters = {};
    this.rowDataMapping = {};
    this.contextDataToBeStored = "";
  }
  /**
     * component fetchTransactionList
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post recevinf response
     * @param : unicode        {string}  - unique code to identify service reposne in case of multiple service calls
     */
  InvokeService.prototype.fetchDetails = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError) {
    var scope=this;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(this.serviceParameters[Object.keys(scope.serviceParameters)[0]].objectServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Object);
    for(var key in this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Criteria){
      dataObject.addField(key,this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Criteria[key]);
    }
    var options = {
      "dataObject": dataObject
    };    
    objSvc.customVerb(this.serviceParameters[Object.keys(scope.serviceParameters)[0]].operationName, options,
                      function(response) {
      scope.setResponseDataInCollection(scope.serviceParameters[Object.keys(scope.serviceParameters)[0]].Object,response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Fetch transacation list service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to fetch Instrument Details:" + JSON.stringify(error));
    });
  };
  
 

  /**
  * @api : setPropertiesFromComponent
  * Sets properties from component controller
  * @arg1: serviceParameters {Object} - service paramters configured in contracts
  **/
  InvokeService.prototype.setProperties = function (contextDataToBeStored,serviceParameters, customDataFormat, contextData, rowDataMapping) {
    var scope = this;
    try {
      scope.contextDataToBeStored = contextDataToBeStored;
      this.context = contextData;
      this.serviceParameters = serviceParameters;
      this.rowDataMapping = rowDataMapping;
    } catch (err) {
      scope.setError(err, "setProperties");
    }
  };

  /**
  * @api : getMetaData
  * Gets meta data info from the models
  * @return : NA
  */
  InvokeService.prototype.getMetaData = function () {
    var scope = this;
    function getMetaDataSuccess(response) {
      let objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(response);
      scope.objectMetadata[scope.serviceParameters[Object.keys(scope.serviceParameters)[0]].Object] = objectMetadata;
      scope.fetchDetails();
    }
    function getMetaDataFailure(err) {
      scope.setError(err, "getMetaDataFromModel");
    }
    try {
      let options = { "getFromServer": true };
      kony.mvc.util.ProcessorUtils.getMetadataForObject(this.serviceParameters[Object.keys(scope.serviceParameters)[0]].objectServiceName, this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Object, options, getMetaDataSuccess, getMetaDataFailure);
    } catch (err) {
      scope.setError(err, "getMetaData");
    }
  };

  /**
  * @api : invokeService
  * Invokes service call with configs provided in contracts
  * @return : NA
  */
  InvokeService.prototype.invokeService = function () {
    var scope = this;
    try {
      kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
      let criteria = this.getCriteria(this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Criteria);
      scope.invokeServiceUtils.makeAServiceCall(this.serviceParameters[Object.keys(scope.serviceParameters)[0]].ServiceType, this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Object, criteria, this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Verb)
        .then(this.setResponseDataInCollection.bind(this, this.serviceParameters[Object.keys(scope.serviceParameters)[0]].Object))
        .catch(scope.setError.bind(this, "invokeService"));
    } catch (err) {
      scope.setError(err, "invokeService");
    }
  };

  /**
  * @api : setResponseDataInCollection
  * Formats and stores service response in collection
    * @arg1: object {String} - object name of the service
    * @arg2: dataFetched {Object} - data fetched as service response
  * @return : NA
  */
  InvokeService.prototype.setResponseDataInCollection = function (object, dataFetched) {
    var scope = this;
    try {
      if (typeof dataFetched === "object" && !Array.isArray(dataFetched)) {
        for (let responseKey in dataFetched) {
          if (Array.isArray(dataFetched[responseKey])) {
            dataFetched = dataFetched[responseKey];
          }
        }
      }
      //let collectionData = this.getFormattedData(object, dataFetched);
      let serviceKeyIdentifier = Object.keys(scope.serviceParameters)[0];
      kony.application.dismissLoadingScreen();
//       this.store.dispatch({
//         type: "UPDATE_COLLECTION",
//         data: collectionData,
//         key: serviceKeyIdentifier
//       }, scope.compViewCtrlScope);
      this.compViewCtrlScope.collectionData[serviceKeyIdentifier]=dataFetched;
      this.compViewCtrlScope.setDataInSegment(dataFetched);
    } catch (err) {
      scope.setError(err, "setResponseDataInCollection");
    }
  };

  /**
  * @api : getFormattedData
  * Loops through the response so that formatting can be done
    * @arg1: object {String} - object name of the service
    * @arg2: data {Object} - data to be formatted
  * @return : formatted data
  */
  InvokeService.prototype.getFormattedData = function (object, data) {
    var scope = this;
    try {
      let objectMetadata = this.objectMetadata[object];
      let formattedData = JSON.parse(JSON.stringify(data));
      formattedData.map(function (record) {
        let keys = Object.keys(record);
        keys.forEach((key) => {
          if (typeof key === "string") {
            record[key] = scope.formatData(objectMetadata, key, record);
          }
          else if (typeof key === "object") {
            key.forEach((nestedData) => {
              record[key] = scope.formatData(objectMetadata, nestedData, record);
            });
          }
        });
      });
      return formattedData;
    } catch (err) {
      scope.setError(err, "getFormattedData");
    }
  };

  /**
  * @api : formatData
  * Formats the service response data based on meta data info
    * @arg1: objectMetadata {String} - meta data info fetched from service response
    * @arg2: key {String} - key for which data to be formatted
    * @arg3: record {Object} - entire record
  * @return : formatted key
  */
  InvokeService.prototype.formatData = function (objectMetadata, key, record) {
    var scope = this;
    try {
      if (objectMetadata.hasOwnProperty(key)) {
        let metaData = objectMetadata[key];
        if (metaData.format !== undefined) {
          let dependentData;
          if (metaData.formatting_dependency) {
            dependentData = record[metaData.formatting_dependency];
          }
          let formattedValue = scope.formatUtils.formatData(metaData.format, record[key], dependentData);
          return formattedValue;
        }
      }
      return record[key];
    } catch (err) {
      scope.setError(err, "formatData");
    }
  };

  /**
  * @api : getCriteria
  * Return the criteria with context value
    * @arg: criteriaJSON - criteria configured in service parameters
  * @return : {JSON}
  */
  InvokeService.prototype.getCriteria = function (criteriaJSON) {
    var scope = this;
    try {
      let criteria = JSON.parse(JSON.stringify(criteriaJSON));
      for (let key in criteria) {
        let value = criteria[key];
        if (typeof value === "string") {
          if (value.indexOf("$") !== -1) {
            let token = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
            if (token.indexOf("CNTX.") !== -1) {
              token = token.split(".");
              let tokenObject = token[token.length - 2];
              token = token[token.length - 1].replace("}", "");
              criteria[key] = this.context[tokenObject][token];
            }
          }
        }
      }
      return criteria;
    } catch (err) {
      scope.setError(err, "getCriteria");
    }
  };

  /**
  * @api : setContextInCollection
  * Sets the context data in collection
    * @arg: collectionData - data to be set in collection
  * @return : NA
  */
  InvokeService.prototype.setContextInCollection = function (collectionData) {
    var scope = this;
    try {
//       this.store.dispatch({
//         type: "UPDATE_COLLECTION",
//         data: collectionData,
//         key: scope.contextDataToBeStored
//       }, scope.compViewCtrlScope);
      this.compViewCtrlScope.collectionData[scope.contextDataToBeStored]=collectionData;
      this.compViewCtrlScope.setDataInSegment(collectionData);
    } catch (err) {
      scope.setError(err, "setContextInCollection");
    }
  };

  /**
     * @api: convertTokensInDataMapping
     * Processes the tokens in data mapping to text
     * @arg1: fieldMapping - data from collection
     * @arg2: record - corresponding record
     * @return: display text
     */
  InvokeService.prototype.convertTokensInDataMapping = function (fieldMapping, record) {
    var scope = this;
    try {
      if (typeof fieldMapping === "string") {
        if (fieldMapping.indexOf("$") !== -1) {
          if (fieldMapping.indexOf("${i18n") !== -1) {
            return this.geti18nText(fieldMapping);
          }
          else if (fieldMapping.indexOf("${CNTX") !== -1) {
            fieldMapping = fieldMapping.split(".");
            fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
            return record[fieldMapping];
          }
          else {
            fieldMapping = fieldMapping.split(".");
            fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
            return record[fieldMapping];
          }
        }
        else {
          return fieldMapping;
        }
      }
    } catch (err) {
      scope.setError(err, "convertTokensInDataMapping");
    }
  };

  /**
    * @api: geti18nText
    * This method is used get the i18n text
    * @arg: token - token to be converted to a text
    * return: string associated to corresponding i18n key 
    */
  InvokeService.prototype.geti18nText = function (token) {
    var scope = this;
    try {
      let i18ntext = token.substring(token.indexOf("${i18n") + 7, token.length - 2);
      return kony.i18n.getLocalizedString(i18ntext);
    } catch (err) {
      scope.setError(err, "geti18nText");
    }
  };

  /**
  * @api : setError
  * triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
  * @return : NA
  */
  InvokeService.prototype.setError = function (errorMsg, method) {
    var errorObj = {
      "level": "ComponentBusinessController",
      "method": method,
      "error": errorMsg
    };
    this.compViewCtrlScope.onError(errorObj);
  };

  
  return InvokeService;
});