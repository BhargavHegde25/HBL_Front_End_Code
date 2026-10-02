/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CrossBorderPayments", "objectService" : "HBLOtherBankTransfers"};

    var setterFunctions = {
        consent: function(val, state) {
            context["field"] = "consent";
            context["metadata"] = (objectMetadata ? objectMetadata["consent"] : null);
            state['consent'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        responseData: function(val, state) {
            context["field"] = "responseData";
            context["metadata"] = (objectMetadata ? objectMetadata["responseData"] : null);
            state['responseData'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vpaId: function(val, state) {
            context["field"] = "vpaId";
            context["metadata"] = (objectMetadata ? objectMetadata["vpaId"] : null);
            state['vpaId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endToEndTxnId: function(val, state) {
            context["field"] = "endToEndTxnId";
            context["metadata"] = (objectMetadata ? objectMetadata["endToEndTxnId"] : null);
            state['endToEndTxnId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orgRequestUniqueId: function(val, state) {
            context["field"] = "orgRequestUniqueId";
            context["metadata"] = (objectMetadata ? objectMetadata["orgRequestUniqueId"] : null);
            state['orgRequestUniqueId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        countryCode: function(val, state) {
            context["field"] = "countryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["countryCode"] : null);
            state['countryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CrossBorderPayments(defaultValues) {
        var privateState = {};
        context["field"] = "consent";
        context["metadata"] = (objectMetadata ? objectMetadata["consent"] : null);
        privateState.consent = defaultValues ?
            (defaultValues["consent"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["consent"], context) :
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

        context["field"] = "responseData";
        context["metadata"] = (objectMetadata ? objectMetadata["responseData"] : null);
        privateState.responseData = defaultValues ?
            (defaultValues["responseData"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["responseData"], context) :
                null) :
            null;

        context["field"] = "vpaId";
        context["metadata"] = (objectMetadata ? objectMetadata["vpaId"] : null);
        privateState.vpaId = defaultValues ?
            (defaultValues["vpaId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vpaId"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "endToEndTxnId";
        context["metadata"] = (objectMetadata ? objectMetadata["endToEndTxnId"] : null);
        privateState.endToEndTxnId = defaultValues ?
            (defaultValues["endToEndTxnId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endToEndTxnId"], context) :
                null) :
            null;

        context["field"] = "orgRequestUniqueId";
        context["metadata"] = (objectMetadata ? objectMetadata["orgRequestUniqueId"] : null);
        privateState.orgRequestUniqueId = defaultValues ?
            (defaultValues["orgRequestUniqueId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orgRequestUniqueId"], context) :
                null) :
            null;

        context["field"] = "countryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["countryCode"] : null);
        privateState.countryCode = defaultValues ?
            (defaultValues["countryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["countryCode"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "consent": {
                get: function() {
                    context["field"] = "consent";
                    context["metadata"] = (objectMetadata ? objectMetadata["consent"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.consent, context);
                },
                set: function(val) {
                    setterFunctions['consent'].call(this, val, privateState);
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
            "responseData": {
                get: function() {
                    context["field"] = "responseData";
                    context["metadata"] = (objectMetadata ? objectMetadata["responseData"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.responseData, context);
                },
                set: function(val) {
                    setterFunctions['responseData'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vpaId": {
                get: function() {
                    context["field"] = "vpaId";
                    context["metadata"] = (objectMetadata ? objectMetadata["vpaId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vpaId, context);
                },
                set: function(val) {
                    setterFunctions['vpaId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userName": {
                get: function() {
                    context["field"] = "userName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userName, context);
                },
                set: function(val) {
                    setterFunctions['userName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amount": {
                get: function() {
                    context["field"] = "amount";
                    context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amount, context);
                },
                set: function(val) {
                    setterFunctions['amount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endToEndTxnId": {
                get: function() {
                    context["field"] = "endToEndTxnId";
                    context["metadata"] = (objectMetadata ? objectMetadata["endToEndTxnId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endToEndTxnId, context);
                },
                set: function(val) {
                    setterFunctions['endToEndTxnId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orgRequestUniqueId": {
                get: function() {
                    context["field"] = "orgRequestUniqueId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orgRequestUniqueId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orgRequestUniqueId, context);
                },
                set: function(val) {
                    setterFunctions['orgRequestUniqueId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "countryCode": {
                get: function() {
                    context["field"] = "countryCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["countryCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.countryCode, context);
                },
                set: function(val) {
                    setterFunctions['countryCode'].call(this, val, privateState);
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
            privateState.consent = value ? (value["consent"] ? value["consent"] : null) : null;
            privateState.responseCode = value ? (value["responseCode"] ? value["responseCode"] : null) : null;
            privateState.responseMessage = value ? (value["responseMessage"] ? value["responseMessage"] : null) : null;
            privateState.responseData = value ? (value["responseData"] ? value["responseData"] : null) : null;
            privateState.vpaId = value ? (value["vpaId"] ? value["vpaId"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.endToEndTxnId = value ? (value["endToEndTxnId"] ? value["endToEndTxnId"] : null) : null;
            privateState.orgRequestUniqueId = value ? (value["orgRequestUniqueId"] ? value["orgRequestUniqueId"] : null) : null;
            privateState.countryCode = value ? (value["countryCode"] ? value["countryCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CrossBorderPayments);

    //Create new class level validator object
    BaseModel.Validator.call(CrossBorderPayments);

    var registerValidatorBackup = CrossBorderPayments.registerValidator;

    CrossBorderPayments.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CrossBorderPayments.isValid(this, propName, val)) {
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
    //For Operation 'getPurpose' with service id 'getPurpose5931'
     CrossBorderPayments.getPurpose = function(params, onCompletion){
        return CrossBorderPayments.customVerb('getPurpose', params, onCompletion);
     };

    //For Operation 'getCheckLimit' with service id 'getCheckLimit6976'
     CrossBorderPayments.getCheckLimit = function(params, onCompletion){
        return CrossBorderPayments.customVerb('getCheckLimit', params, onCompletion);
     };

    //For Operation 'createConsent' with service id 'createConsent5906'
     CrossBorderPayments.createConsent = function(params, onCompletion){
        return CrossBorderPayments.customVerb('createConsent', params, onCompletion);
     };

    //For Operation 'getRelationship' with service id 'getRelationship7841'
     CrossBorderPayments.getRelationship = function(params, onCompletion){
        return CrossBorderPayments.customVerb('getRelationship', params, onCompletion);
     };

    //For Operation 'validateCustomer' with service id 'customerValidate7177'
     CrossBorderPayments.validateCustomer = function(params, onCompletion){
        return CrossBorderPayments.customVerb('validateCustomer', params, onCompletion);
     };

    //For Operation 'createPayment' with service id 'createPayment7764'
     CrossBorderPayments.createPayment = function(params, onCompletion){
        return CrossBorderPayments.customVerb('createPayment', params, onCompletion);
     };

    //For Operation 'updateConsent' with service id 'updateConsent9220'
     CrossBorderPayments.updateConsent = function(params, onCompletion){
        return CrossBorderPayments.customVerb('updateConsent', params, onCompletion);
     };

    var relations = [];

    CrossBorderPayments.relations = relations;

    CrossBorderPayments.prototype.isValid = function() {
        return CrossBorderPayments.isValid(this);
    };

    CrossBorderPayments.prototype.objModelName = "CrossBorderPayments";
    CrossBorderPayments.prototype.objServiceName = "HBLOtherBankTransfers";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CrossBorderPayments.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLOtherBankTransfers", "CrossBorderPayments", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CrossBorderPayments.clone = function(objectToClone) {
        var clonedObj = new CrossBorderPayments();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CrossBorderPayments;
});