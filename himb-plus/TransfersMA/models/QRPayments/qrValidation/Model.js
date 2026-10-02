/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "qrValidation", "objectService" : "QRPayments"};

    var setterFunctions = {
        qrData: function(val, state) {
            context["field"] = "qrData";
            context["metadata"] = (objectMetadata ? objectMetadata["qrData"] : null);
            state['qrData'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        aggSelected: function(val, state) {
            context["field"] = "aggSelected";
            context["metadata"] = (objectMetadata ? objectMetadata["aggSelected"] : null);
            state['aggSelected'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        aggPayload: function(val, state) {
            context["field"] = "aggPayload";
            context["metadata"] = (objectMetadata ? objectMetadata["aggPayload"] : null);
            state['aggPayload'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionFee: function(val, state) {
            context["field"] = "transactionFee";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionFee"] : null);
            state['transactionFee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAmount: function(val, state) {
            context["field"] = "debitAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAmount"] : null);
            state['debitAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        aggregatorType: function(val, state) {
            context["field"] = "aggregatorType";
            context["metadata"] = (objectMetadata ? objectMetadata["aggregatorType"] : null);
            state['aggregatorType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        fromAccountNumber: function(val, state) {
            context["field"] = "fromAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
            state['fromAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function qrValidation(defaultValues) {
        var privateState = {};
        context["field"] = "qrData";
        context["metadata"] = (objectMetadata ? objectMetadata["qrData"] : null);
        privateState.qrData = defaultValues ?
            (defaultValues["qrData"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["qrData"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "aggSelected";
        context["metadata"] = (objectMetadata ? objectMetadata["aggSelected"] : null);
        privateState.aggSelected = defaultValues ?
            (defaultValues["aggSelected"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["aggSelected"], context) :
                null) :
            null;

        context["field"] = "aggPayload";
        context["metadata"] = (objectMetadata ? objectMetadata["aggPayload"] : null);
        privateState.aggPayload = defaultValues ?
            (defaultValues["aggPayload"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["aggPayload"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "transactionFee";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionFee"] : null);
        privateState.transactionFee = defaultValues ?
            (defaultValues["transactionFee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionFee"], context) :
                null) :
            null;

        context["field"] = "debitAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAmount"] : null);
        privateState.debitAmount = defaultValues ?
            (defaultValues["debitAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAmount"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "aggregatorType";
        context["metadata"] = (objectMetadata ? objectMetadata["aggregatorType"] : null);
        privateState.aggregatorType = defaultValues ?
            (defaultValues["aggregatorType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["aggregatorType"], context) :
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

        context["field"] = "fromAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
        privateState.fromAccountNumber = defaultValues ?
            (defaultValues["fromAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountNumber"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "qrData": {
                get: function() {
                    context["field"] = "qrData";
                    context["metadata"] = (objectMetadata ? objectMetadata["qrData"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.qrData, context);
                },
                set: function(val) {
                    setterFunctions['qrData'].call(this, val, privateState);
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
            "aggSelected": {
                get: function() {
                    context["field"] = "aggSelected";
                    context["metadata"] = (objectMetadata ? objectMetadata["aggSelected"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.aggSelected, context);
                },
                set: function(val) {
                    setterFunctions['aggSelected'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "aggPayload": {
                get: function() {
                    context["field"] = "aggPayload";
                    context["metadata"] = (objectMetadata ? objectMetadata["aggPayload"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.aggPayload, context);
                },
                set: function(val) {
                    setterFunctions['aggPayload'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "success": {
                get: function() {
                    context["field"] = "success";
                    context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.success, context);
                },
                set: function(val) {
                    setterFunctions['success'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "message": {
                get: function() {
                    context["field"] = "message";
                    context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.message, context);
                },
                set: function(val) {
                    setterFunctions['message'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionFee": {
                get: function() {
                    context["field"] = "transactionFee";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionFee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionFee, context);
                },
                set: function(val) {
                    setterFunctions['transactionFee'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAmount": {
                get: function() {
                    context["field"] = "debitAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAmount, context);
                },
                set: function(val) {
                    setterFunctions['debitAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionId": {
                get: function() {
                    context["field"] = "transactionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionId, context);
                },
                set: function(val) {
                    setterFunctions['transactionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "aggregatorType": {
                get: function() {
                    context["field"] = "aggregatorType";
                    context["metadata"] = (objectMetadata ? objectMetadata["aggregatorType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.aggregatorType, context);
                },
                set: function(val) {
                    setterFunctions['aggregatorType'].call(this, val, privateState);
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
            "fromAccountNumber": {
                get: function() {
                    context["field"] = "fromAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountNumber'].call(this, val, privateState);
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
            privateState.qrData = value ? (value["qrData"] ? value["qrData"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.aggSelected = value ? (value["aggSelected"] ? value["aggSelected"] : null) : null;
            privateState.aggPayload = value ? (value["aggPayload"] ? value["aggPayload"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.transactionFee = value ? (value["transactionFee"] ? value["transactionFee"] : null) : null;
            privateState.debitAmount = value ? (value["debitAmount"] ? value["debitAmount"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.aggregatorType = value ? (value["aggregatorType"] ? value["aggregatorType"] : null) : null;
            privateState.responseCode = value ? (value["responseCode"] ? value["responseCode"] : null) : null;
            privateState.responseMessage = value ? (value["responseMessage"] ? value["responseMessage"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(qrValidation);

    //Create new class level validator object
    BaseModel.Validator.call(qrValidation);

    var registerValidatorBackup = qrValidation.registerValidator;

    qrValidation.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(qrValidation.isValid(this, propName, val)) {
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
    //For Operation 'validateQR' with service id 'qrValidationService6440'
     qrValidation.validateQR = function(params, onCompletion){
        return qrValidation.customVerb('validateQR', params, onCompletion);
     };

    var relations = [];

    qrValidation.relations = relations;

    qrValidation.prototype.isValid = function() {
        return qrValidation.isValid(this);
    };

    qrValidation.prototype.objModelName = "qrValidation";
    qrValidation.prototype.objServiceName = "QRPayments";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    qrValidation.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("QRPayments", "qrValidation", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    qrValidation.clone = function(objectToClone) {
        var clonedObj = new qrValidation();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return qrValidation;
});