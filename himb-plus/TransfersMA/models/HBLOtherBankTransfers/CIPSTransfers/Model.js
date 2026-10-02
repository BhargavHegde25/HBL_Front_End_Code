/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CIPSTransfers", "objectService" : "HBLOtherBankTransfers"};

    var setterFunctions = {
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankId: function(val, state) {
            context["field"] = "bankId";
            context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
            state['bankId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        branchId: function(val, state) {
            context["field"] = "branchId";
            context["metadata"] = (objectMetadata ? objectMetadata["branchId"] : null);
            state['branchId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        responseCode: function(val, state) {
            context["field"] = "responseCode";
            context["metadata"] = (objectMetadata ? objectMetadata["responseCode"] : null);
            state['responseCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        responseMessage: function(val, state) {
            context["field"] = "responseMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["responseMessage"] : null);
            state['responseMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        matchPercentate: function(val, state) {
            context["field"] = "matchPercentate";
            context["metadata"] = (objectMetadata ? objectMetadata["matchPercentate"] : null);
            state['matchPercentate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CIPSTransfers(defaultValues) {
        var privateState = {};
        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "bankId";
        context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
        privateState.bankId = defaultValues ?
            (defaultValues["bankId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankId"], context) :
                null) :
            null;

        context["field"] = "branchId";
        context["metadata"] = (objectMetadata ? objectMetadata["branchId"] : null);
        privateState.branchId = defaultValues ?
            (defaultValues["branchId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["branchId"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "responseCode";
        context["metadata"] = (objectMetadata ? objectMetadata["responseCode"] : null);
        privateState.responseCode = defaultValues ?
            (defaultValues["responseCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["responseCode"], context) :
                null) :
            null;

        context["field"] = "responseMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["responseMessage"] : null);
        privateState.responseMessage = defaultValues ?
            (defaultValues["responseMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["responseMessage"], context) :
                null) :
            null;

        context["field"] = "matchPercentate";
        context["metadata"] = (objectMetadata ? objectMetadata["matchPercentate"] : null);
        privateState.matchPercentate = defaultValues ?
            (defaultValues["matchPercentate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["matchPercentate"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankId": {
                get: function() {
                    context["field"] = "bankId";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankId, context);
                },
                set: function(val) {
                    setterFunctions['bankId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "branchId": {
                get: function() {
                    context["field"] = "branchId";
                    context["metadata"] = (objectMetadata ? objectMetadata["branchId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.branchId, context);
                },
                set: function(val) {
                    setterFunctions['branchId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currency": {
                get: function() {
                    context["field"] = "currency";
                    context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currency, context);
                },
                set: function(val) {
                    setterFunctions['currency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "responseCode": {
                get: function() {
                    context["field"] = "responseCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["responseCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.responseCode, context);
                },
                set: function(val) {
                    setterFunctions['responseCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "responseMessage": {
                get: function() {
                    context["field"] = "responseMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["responseMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.responseMessage, context);
                },
                set: function(val) {
                    setterFunctions['responseMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "matchPercentate": {
                get: function() {
                    context["field"] = "matchPercentate";
                    context["metadata"] = (objectMetadata ? objectMetadata["matchPercentate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.matchPercentate, context);
                },
                set: function(val) {
                    setterFunctions['matchPercentate'].call(this, val, privateState);
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
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.bankId = value ? (value["bankId"] ? value["bankId"] : null) : null;
            privateState.branchId = value ? (value["branchId"] ? value["branchId"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.responseCode = value ? (value["responseCode"] ? value["responseCode"] : null) : null;
            privateState.responseMessage = value ? (value["responseMessage"] ? value["responseMessage"] : null) : null;
            privateState.matchPercentate = value ? (value["matchPercentate"] ? value["matchPercentate"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CIPSTransfers);

    //Create new class level validator object
    BaseModel.Validator.call(CIPSTransfers);

    var registerValidatorBackup = CIPSTransfers.registerValidator;

    CIPSTransfers.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CIPSTransfers.isValid(this, propName, val)) {
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
    //For Operation 'createOtherBankTransfer' with service id 'createOtherBankTransfer2654'
     CIPSTransfers.createOtherBankTransfer = function(params, onCompletion){
        return CIPSTransfers.customVerb('createOtherBankTransfer', params, onCompletion);
     };

    //For Operation 'validateOtherBankAccount' with service id 'validateOtherBankAccount4813'
     CIPSTransfers.validateOtherBankAccount = function(params, onCompletion){
        return CIPSTransfers.customVerb('validateOtherBankAccount', params, onCompletion);
     };

    //For Operation 'getOtherBankDetails' with service id 'getOtherBankDetails5138'
     CIPSTransfers.getOtherBankDetails = function(params, onCompletion){
        return CIPSTransfers.customVerb('getOtherBankDetails', params, onCompletion);
     };

    var relations = [];

    CIPSTransfers.relations = relations;

    CIPSTransfers.prototype.isValid = function() {
        return CIPSTransfers.isValid(this);
    };

    CIPSTransfers.prototype.objModelName = "CIPSTransfers";
    CIPSTransfers.prototype.objServiceName = "HBLOtherBankTransfers";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CIPSTransfers.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLOtherBankTransfers", "CIPSTransfers", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CIPSTransfers.clone = function(objectToClone) {
        var clonedObj = new CIPSTransfers();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CIPSTransfers;
});