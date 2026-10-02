/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "ProductDetails", "objectService" : "WealthOrder"};

    var setterFunctions = {
        ISINCode: function(val, state) {
            context["field"] = "ISINCode";
            context["metadata"] = (objectMetadata ? objectMetadata["ISINCode"] : null);
            state['ISINCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RICCode: function(val, state) {
            context["field"] = "RICCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
            state['RICCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
    function ProductDetails(defaultValues) {
        var privateState = {};
        context["field"] = "ISINCode";
        context["metadata"] = (objectMetadata ? objectMetadata["ISINCode"] : null);
        privateState.ISINCode = defaultValues ?
            (defaultValues["ISINCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ISINCode"], context) :
                null) :
            null;

        context["field"] = "RICCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
        privateState.RICCode = defaultValues ?
            (defaultValues["RICCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RICCode"], context) :
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
            "ISINCode": {
                get: function() {
                    context["field"] = "ISINCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["ISINCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ISINCode, context);
                },
                set: function(val) {
                    setterFunctions['ISINCode'].call(this, val, privateState);
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
            privateState.ISINCode = value ? (value["ISINCode"] ? value["ISINCode"] : null) : null;
            privateState.RICCode = value ? (value["RICCode"] ? value["RICCode"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.application = value ? (value["application"] ? value["application"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(ProductDetails);

    //Create new class level validator object
    BaseModel.Validator.call(ProductDetails);

    var registerValidatorBackup = ProductDetails.registerValidator;

    ProductDetails.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(ProductDetails.isValid(this, propName, val)) {
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
    //For Operation 'getProductDetailsFromId' with service id 'getProductDetailsFromId2247'
     ProductDetails.getProductDetailsFromId = function(params, onCompletion){
        return ProductDetails.customVerb('getProductDetailsFromId', params, onCompletion);
     };

    //For Operation 'getProductDetails' with service id 'getProductDetails2822'
     ProductDetails.getProductDetails = function(params, onCompletion){
        return ProductDetails.customVerb('getProductDetails', params, onCompletion);
     };

    var relations = [];

    ProductDetails.relations = relations;

    ProductDetails.prototype.isValid = function() {
        return ProductDetails.isValid(this);
    };

    ProductDetails.prototype.objModelName = "ProductDetails";
    ProductDetails.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    ProductDetails.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "ProductDetails", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    ProductDetails.clone = function(objectToClone) {
        var clonedObj = new ProductDetails();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return ProductDetails;
});