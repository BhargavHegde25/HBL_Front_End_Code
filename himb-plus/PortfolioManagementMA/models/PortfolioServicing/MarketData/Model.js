/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "MarketData", "objectService" : "PortfolioServicing"};

    var setterFunctions = {
        Topic: function(val, state) {
            context["field"] = "Topic";
            context["metadata"] = (objectMetadata ? objectMetadata["Topic"] : null);
            state['Topic'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        HL: function(val, state) {
            context["field"] = "HL";
            context["metadata"] = (objectMetadata ? objectMetadata["HL"] : null);
            state['HL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ID: function(val, state) {
            context["field"] = "ID";
            context["metadata"] = (objectMetadata ? objectMetadata["ID"] : null);
            state['ID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PR: function(val, state) {
            context["field"] = "PR";
            context["metadata"] = (objectMetadata ? objectMetadata["PR"] : null);
            state['PR'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        LT: function(val, state) {
            context["field"] = "LT";
            context["metadata"] = (objectMetadata ? objectMetadata["LT"] : null);
            state['LT'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        HT: function(val, state) {
            context["field"] = "HT";
            context["metadata"] = (objectMetadata ? objectMetadata["HT"] : null);
            state['HT'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TE: function(val, state) {
            context["field"] = "TE";
            context["metadata"] = (objectMetadata ? objectMetadata["TE"] : null);
            state['TE'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageOffset: function(val, state) {
            context["field"] = "pageOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
            state['pageOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function MarketData(defaultValues) {
        var privateState = {};
        context["field"] = "Topic";
        context["metadata"] = (objectMetadata ? objectMetadata["Topic"] : null);
        privateState.Topic = defaultValues ?
            (defaultValues["Topic"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Topic"], context) :
                null) :
            null;

        context["field"] = "HL";
        context["metadata"] = (objectMetadata ? objectMetadata["HL"] : null);
        privateState.HL = defaultValues ?
            (defaultValues["HL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["HL"], context) :
                null) :
            null;

        context["field"] = "ID";
        context["metadata"] = (objectMetadata ? objectMetadata["ID"] : null);
        privateState.ID = defaultValues ?
            (defaultValues["ID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ID"], context) :
                null) :
            null;

        context["field"] = "PR";
        context["metadata"] = (objectMetadata ? objectMetadata["PR"] : null);
        privateState.PR = defaultValues ?
            (defaultValues["PR"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PR"], context) :
                null) :
            null;

        context["field"] = "LT";
        context["metadata"] = (objectMetadata ? objectMetadata["LT"] : null);
        privateState.LT = defaultValues ?
            (defaultValues["LT"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["LT"], context) :
                null) :
            null;

        context["field"] = "HT";
        context["metadata"] = (objectMetadata ? objectMetadata["HT"] : null);
        privateState.HT = defaultValues ?
            (defaultValues["HT"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["HT"], context) :
                null) :
            null;

        context["field"] = "TE";
        context["metadata"] = (objectMetadata ? objectMetadata["TE"] : null);
        privateState.TE = defaultValues ?
            (defaultValues["TE"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TE"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
        privateState.pageOffset = defaultValues ?
            (defaultValues["pageOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageOffset"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "Topic": {
                get: function() {
                    context["field"] = "Topic";
                    context["metadata"] = (objectMetadata ? objectMetadata["Topic"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Topic, context);
                },
                set: function(val) {
                    setterFunctions['Topic'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "HL": {
                get: function() {
                    context["field"] = "HL";
                    context["metadata"] = (objectMetadata ? objectMetadata["HL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.HL, context);
                },
                set: function(val) {
                    setterFunctions['HL'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ID": {
                get: function() {
                    context["field"] = "ID";
                    context["metadata"] = (objectMetadata ? objectMetadata["ID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ID, context);
                },
                set: function(val) {
                    setterFunctions['ID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PR": {
                get: function() {
                    context["field"] = "PR";
                    context["metadata"] = (objectMetadata ? objectMetadata["PR"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PR, context);
                },
                set: function(val) {
                    setterFunctions['PR'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "LT": {
                get: function() {
                    context["field"] = "LT";
                    context["metadata"] = (objectMetadata ? objectMetadata["LT"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.LT, context);
                },
                set: function(val) {
                    setterFunctions['LT'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "HT": {
                get: function() {
                    context["field"] = "HT";
                    context["metadata"] = (objectMetadata ? objectMetadata["HT"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.HT, context);
                },
                set: function(val) {
                    setterFunctions['HT'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TE": {
                get: function() {
                    context["field"] = "TE";
                    context["metadata"] = (objectMetadata ? objectMetadata["TE"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TE, context);
                },
                set: function(val) {
                    setterFunctions['TE'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageSize": {
                get: function() {
                    context["field"] = "pageSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageSize, context);
                },
                set: function(val) {
                    setterFunctions['pageSize'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageOffset": {
                get: function() {
                    context["field"] = "pageOffset";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageOffset, context);
                },
                set: function(val) {
                    setterFunctions['pageOffset'].call(this, val, privateState);
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
            privateState.Topic = value ? (value["Topic"] ? value["Topic"] : null) : null;
            privateState.HL = value ? (value["HL"] ? value["HL"] : null) : null;
            privateState.ID = value ? (value["ID"] ? value["ID"] : null) : null;
            privateState.PR = value ? (value["PR"] ? value["PR"] : null) : null;
            privateState.LT = value ? (value["LT"] ? value["LT"] : null) : null;
            privateState.HT = value ? (value["HT"] ? value["HT"] : null) : null;
            privateState.TE = value ? (value["TE"] ? value["TE"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(MarketData);

    //Create new class level validator object
    BaseModel.Validator.call(MarketData);

    var registerValidatorBackup = MarketData.registerValidator;

    MarketData.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(MarketData.isValid(this, propName, val)) {
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
    //For Operation 'getTopMarketNews' with service id 'getTopMarketNews6773'
     MarketData.getTopMarketNews = function(params, onCompletion){
        return MarketData.customVerb('getTopMarketNews', params, onCompletion);
     };

    //For Operation 'getDailyMarket' with service id 'getDailyMarket6184'
     MarketData.getDailyMarket = function(params, onCompletion){
        return MarketData.customVerb('getDailyMarket', params, onCompletion);
     };

    var relations = [];

    MarketData.relations = relations;

    MarketData.prototype.isValid = function() {
        return MarketData.isValid(this);
    };

    MarketData.prototype.objModelName = "MarketData";
    MarketData.prototype.objServiceName = "PortfolioServicing";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    MarketData.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PortfolioServicing", "MarketData", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    MarketData.clone = function(objectToClone) {
        var clonedObj = new MarketData();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return MarketData;
});