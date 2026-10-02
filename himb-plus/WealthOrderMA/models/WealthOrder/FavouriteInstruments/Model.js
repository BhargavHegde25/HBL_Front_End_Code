/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "FavouriteInstruments", "objectService" : "WealthOrder"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        favInstrumentCodes: function(val, state) {
            context["field"] = "favInstrumentCodes";
            context["metadata"] = (objectMetadata ? objectMetadata["favInstrumentCodes"] : null);
            state['favInstrumentCodes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RICCode: function(val, state) {
            context["field"] = "RICCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
            state['RICCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        operation: function(val, state) {
            context["field"] = "operation";
            context["metadata"] = (objectMetadata ? objectMetadata["operation"] : null);
            state['operation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        favInstrumentIds: function(val, state) {
            context["field"] = "favInstrumentIds";
            context["metadata"] = (objectMetadata ? objectMetadata["favInstrumentIds"] : null);
            state['favInstrumentIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentId: function(val, state) {
            context["field"] = "instrumentId";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
            state['instrumentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        application: function(val, state) {
            context["field"] = "application";
            context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
            state['application'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function FavouriteInstruments(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "favInstrumentCodes";
        context["metadata"] = (objectMetadata ? objectMetadata["favInstrumentCodes"] : null);
        privateState.favInstrumentCodes = defaultValues ?
            (defaultValues["favInstrumentCodes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["favInstrumentCodes"], context) :
                null) :
            null;

        context["field"] = "RICCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
        privateState.RICCode = defaultValues ?
            (defaultValues["RICCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RICCode"], context) :
                null) :
            null;

        context["field"] = "operation";
        context["metadata"] = (objectMetadata ? objectMetadata["operation"] : null);
        privateState.operation = defaultValues ?
            (defaultValues["operation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["operation"], context) :
                null) :
            null;

        context["field"] = "favInstrumentIds";
        context["metadata"] = (objectMetadata ? objectMetadata["favInstrumentIds"] : null);
        privateState.favInstrumentIds = defaultValues ?
            (defaultValues["favInstrumentIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["favInstrumentIds"], context) :
                null) :
            null;

        context["field"] = "instrumentId";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
        privateState.instrumentId = defaultValues ?
            (defaultValues["instrumentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentId"], context) :
                null) :
            null;

        context["field"] = "application";
        context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
        privateState.application = defaultValues ?
            (defaultValues["application"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["application"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerId": {
                get: function() {
                    context["field"] = "customerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerId, context);
                },
                set: function(val) {
                    setterFunctions['customerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "favInstrumentCodes": {
                get: function() {
                    context["field"] = "favInstrumentCodes";
                    context["metadata"] = (objectMetadata ? objectMetadata["favInstrumentCodes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.favInstrumentCodes, context);
                },
                set: function(val) {
                    setterFunctions['favInstrumentCodes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RICCode": {
                get: function() {
                    context["field"] = "RICCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RICCode, context);
                },
                set: function(val) {
                    setterFunctions['RICCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "operation": {
                get: function() {
                    context["field"] = "operation";
                    context["metadata"] = (objectMetadata ? objectMetadata["operation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.operation, context);
                },
                set: function(val) {
                    setterFunctions['operation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "favInstrumentIds": {
                get: function() {
                    context["field"] = "favInstrumentIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["favInstrumentIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.favInstrumentIds, context);
                },
                set: function(val) {
                    setterFunctions['favInstrumentIds'].call(this, val, privateState);
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
            "application": {
                get: function() {
                    context["field"] = "application";
                    context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.application, context);
                },
                set: function(val) {
                    setterFunctions['application'].call(this, val, privateState);
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
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.favInstrumentCodes = value ? (value["favInstrumentCodes"] ? value["favInstrumentCodes"] : null) : null;
            privateState.RICCode = value ? (value["RICCode"] ? value["RICCode"] : null) : null;
            privateState.operation = value ? (value["operation"] ? value["operation"] : null) : null;
            privateState.favInstrumentIds = value ? (value["favInstrumentIds"] ? value["favInstrumentIds"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.application = value ? (value["application"] ? value["application"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(FavouriteInstruments);

    //Create new class level validator object
    BaseModel.Validator.call(FavouriteInstruments);

    var registerValidatorBackup = FavouriteInstruments.registerValidator;

    FavouriteInstruments.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(FavouriteInstruments.isValid(this, propName, val)) {
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
    //For Operation 'getFavoriteInstruments' with service id 'getFavoriteInstruments4297'
     FavouriteInstruments.getFavoriteInstruments = function(params, onCompletion){
        return FavouriteInstruments.customVerb('getFavoriteInstruments', params, onCompletion);
     };

    //For Operation 'getSearchFavoriteInstruments' with service id 'getSearchFavoriteInstruments5252'
     FavouriteInstruments.getSearchFavoriteInstruments = function(params, onCompletion){
        return FavouriteInstruments.customVerb('getSearchFavoriteInstruments', params, onCompletion);
     };

    var relations = [];

    FavouriteInstruments.relations = relations;

    FavouriteInstruments.prototype.isValid = function() {
        return FavouriteInstruments.isValid(this);
    };

    FavouriteInstruments.prototype.objModelName = "FavouriteInstruments";
    FavouriteInstruments.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    FavouriteInstruments.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "FavouriteInstruments", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    FavouriteInstruments.clone = function(objectToClone) {
        var clonedObj = new FavouriteInstruments();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return FavouriteInstruments;
});