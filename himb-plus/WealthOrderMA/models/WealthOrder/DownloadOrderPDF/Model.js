/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DownloadOrderPDF", "objectService" : "WealthOrder"};

    var setterFunctions = {
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        navPage: function(val, state) {
            context["field"] = "navPage";
            context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
            state['navPage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchByInstrumentName: function(val, state) {
            context["field"] = "searchByInstrumentName";
            context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
            state['searchByInstrumentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endDate: function(val, state) {
            context["field"] = "endDate";
            context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
            state['endDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateFrom: function(val, state) {
            context["field"] = "dateFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
            state['dateFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateTo: function(val, state) {
            context["field"] = "dateTo";
            context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
            state['dateTo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        listType: function(val, state) {
            context["field"] = "listType";
            context["metadata"] = (objectMetadata ? objectMetadata["listType"] : null);
            state['listType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyId: function(val, state) {
            context["field"] = "currencyId";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
            state['currencyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        benchMarkIndex: function(val, state) {
            context["field"] = "benchMarkIndex";
            context["metadata"] = (objectMetadata ? objectMetadata["benchMarkIndex"] : null);
            state['benchMarkIndex'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        duration: function(val, state) {
            context["field"] = "duration";
            context["metadata"] = (objectMetadata ? objectMetadata["duration"] : null);
            state['duration'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isEuro: function(val, state) {
            context["field"] = "isEuro";
            context["metadata"] = (objectMetadata ? objectMetadata["isEuro"] : null);
            state['isEuro'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentId: function(val, state) {
            context["field"] = "instrumentId";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
            state['instrumentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        downloadFormat: function(val, state) {
            context["field"] = "downloadFormat";
            context["metadata"] = (objectMetadata ? objectMetadata["downloadFormat"] : null);
            state['downloadFormat'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DownloadOrderPDF(defaultValues) {
        var privateState = {};
        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "navPage";
        context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
        privateState.navPage = defaultValues ?
            (defaultValues["navPage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["navPage"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "searchByInstrumentName";
        context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
        privateState.searchByInstrumentName = defaultValues ?
            (defaultValues["searchByInstrumentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchByInstrumentName"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "endDate";
        context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
        privateState.endDate = defaultValues ?
            (defaultValues["endDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endDate"], context) :
                null) :
            null;

        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "dateFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
        privateState.dateFrom = defaultValues ?
            (defaultValues["dateFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateFrom"], context) :
                null) :
            null;

        context["field"] = "dateTo";
        context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
        privateState.dateTo = defaultValues ?
            (defaultValues["dateTo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateTo"], context) :
                null) :
            null;

        context["field"] = "listType";
        context["metadata"] = (objectMetadata ? objectMetadata["listType"] : null);
        privateState.listType = defaultValues ?
            (defaultValues["listType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["listType"], context) :
                null) :
            null;

        context["field"] = "currencyId";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
        privateState.currencyId = defaultValues ?
            (defaultValues["currencyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyId"], context) :
                null) :
            null;

        context["field"] = "benchMarkIndex";
        context["metadata"] = (objectMetadata ? objectMetadata["benchMarkIndex"] : null);
        privateState.benchMarkIndex = defaultValues ?
            (defaultValues["benchMarkIndex"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["benchMarkIndex"], context) :
                null) :
            null;

        context["field"] = "duration";
        context["metadata"] = (objectMetadata ? objectMetadata["duration"] : null);
        privateState.duration = defaultValues ?
            (defaultValues["duration"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["duration"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "isEuro";
        context["metadata"] = (objectMetadata ? objectMetadata["isEuro"] : null);
        privateState.isEuro = defaultValues ?
            (defaultValues["isEuro"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isEuro"], context) :
                null) :
            null;

        context["field"] = "instrumentId";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
        privateState.instrumentId = defaultValues ?
            (defaultValues["instrumentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentId"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "downloadFormat";
        context["metadata"] = (objectMetadata ? objectMetadata["downloadFormat"] : null);
        privateState.downloadFormat = defaultValues ?
            (defaultValues["downloadFormat"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["downloadFormat"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "portfolioId": {
                get: function() {
                    context["field"] = "portfolioId";
                    context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portfolioId, context);
                },
                set: function(val) {
                    setterFunctions['portfolioId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "navPage": {
                get: function() {
                    context["field"] = "navPage";
                    context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.navPage, context);
                },
                set: function(val) {
                    setterFunctions['navPage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortBy": {
                get: function() {
                    context["field"] = "sortBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortBy, context);
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchByInstrumentName": {
                get: function() {
                    context["field"] = "searchByInstrumentName";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchByInstrumentName, context);
                },
                set: function(val) {
                    setterFunctions['searchByInstrumentName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startDate": {
                get: function() {
                    context["field"] = "startDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startDate, context);
                },
                set: function(val) {
                    setterFunctions['startDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endDate": {
                get: function() {
                    context["field"] = "endDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endDate, context);
                },
                set: function(val) {
                    setterFunctions['endDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountId": {
                get: function() {
                    context["field"] = "accountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountId, context);
                },
                set: function(val) {
                    setterFunctions['accountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateFrom": {
                get: function() {
                    context["field"] = "dateFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateFrom, context);
                },
                set: function(val) {
                    setterFunctions['dateFrom'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateTo": {
                get: function() {
                    context["field"] = "dateTo";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateTo, context);
                },
                set: function(val) {
                    setterFunctions['dateTo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "listType": {
                get: function() {
                    context["field"] = "listType";
                    context["metadata"] = (objectMetadata ? objectMetadata["listType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.listType, context);
                },
                set: function(val) {
                    setterFunctions['listType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currencyId": {
                get: function() {
                    context["field"] = "currencyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyId, context);
                },
                set: function(val) {
                    setterFunctions['currencyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "benchMarkIndex": {
                get: function() {
                    context["field"] = "benchMarkIndex";
                    context["metadata"] = (objectMetadata ? objectMetadata["benchMarkIndex"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.benchMarkIndex, context);
                },
                set: function(val) {
                    setterFunctions['benchMarkIndex'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "duration": {
                get: function() {
                    context["field"] = "duration";
                    context["metadata"] = (objectMetadata ? objectMetadata["duration"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.duration, context);
                },
                set: function(val) {
                    setterFunctions['duration'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "type": {
                get: function() {
                    context["field"] = "type";
                    context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.type, context);
                },
                set: function(val) {
                    setterFunctions['type'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderId": {
                get: function() {
                    context["field"] = "orderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderId, context);
                },
                set: function(val) {
                    setterFunctions['orderId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isEuro": {
                get: function() {
                    context["field"] = "isEuro";
                    context["metadata"] = (objectMetadata ? objectMetadata["isEuro"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isEuro, context);
                },
                set: function(val) {
                    setterFunctions['isEuro'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "instrumentId": {
                get: function() {
                    context["field"] = "instrumentId";
                    context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instrumentId, context);
                },
                set: function(val) {
                    setterFunctions['instrumentId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortOrder": {
                get: function() {
                    context["field"] = "sortOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortOrder, context);
                },
                set: function(val) {
                    setterFunctions['sortOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "downloadFormat": {
                get: function() {
                    context["field"] = "downloadFormat";
                    context["metadata"] = (objectMetadata ? objectMetadata["downloadFormat"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.downloadFormat, context);
                },
                set: function(val) {
                    setterFunctions['downloadFormat'].call(this, val, privateState);
                },
                enumerable: true,
            },
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.portfolioId = value ? (value["portfolioId"] ? value["portfolioId"] : null) : null;
            privateState.navPage = value ? (value["navPage"] ? value["navPage"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.searchByInstrumentName = value ? (value["searchByInstrumentName"] ? value["searchByInstrumentName"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.endDate = value ? (value["endDate"] ? value["endDate"] : null) : null;
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.dateFrom = value ? (value["dateFrom"] ? value["dateFrom"] : null) : null;
            privateState.dateTo = value ? (value["dateTo"] ? value["dateTo"] : null) : null;
            privateState.listType = value ? (value["listType"] ? value["listType"] : null) : null;
            privateState.currencyId = value ? (value["currencyId"] ? value["currencyId"] : null) : null;
            privateState.benchMarkIndex = value ? (value["benchMarkIndex"] ? value["benchMarkIndex"] : null) : null;
            privateState.duration = value ? (value["duration"] ? value["duration"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.isEuro = value ? (value["isEuro"] ? value["isEuro"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.downloadFormat = value ? (value["downloadFormat"] ? value["downloadFormat"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DownloadOrderPDF);

    //Create new class level validator object
    BaseModel.Validator.call(DownloadOrderPDF);

    var registerValidatorBackup = DownloadOrderPDF.registerValidator;

    DownloadOrderPDF.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DownloadOrderPDF.isValid(this, propName, val)) {
                    return setterBackup.apply(null, arguments);
                } else {
                    throw Error("Validation failed for " + propName + " : " + val);
                }
            }
            setterFunctions[arguments[0]].changed = true;
        }
        return registerValidatorBackup.apply(null, arguments);
    }

    //Extending Model for custom operations
    //For Operation 'generatePDF' with service id 'generatePDF1504'
     DownloadOrderPDF.generatePDF = function(params, onCompletion){
        return DownloadOrderPDF.customVerb('generatePDF', params, onCompletion);
     };

    var relations = [];

    DownloadOrderPDF.relations = relations;

    DownloadOrderPDF.prototype.isValid = function() {
        return DownloadOrderPDF.isValid(this);
    };

    DownloadOrderPDF.prototype.objModelName = "DownloadOrderPDF";
    DownloadOrderPDF.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DownloadOrderPDF.registerProcessors = function(options, successCallback, failureCallback) {

        if(!options) {
            options = {};
        }

        if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
            preProcessorCallback = options["preProcessor"];
        }

        if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])) {
            postProcessorCallback = options["postProcessor"];
        }

        function metaDataSuccess(res) {
            objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
            successCallback();
        }

        function metaDataFailure(err) {
            failureCallback(err);
        }

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "DownloadOrderPDF", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DownloadOrderPDF.clone = function(objectToClone) {
        var clonedObj = new DownloadOrderPDF();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DownloadOrderPDF;
});