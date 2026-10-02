/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "LendingPaymentRequest", "objectService" : "TradeLending"};

    var setterFunctions = {
        repaymentFor: function(val, state) {
            context["field"] = "repaymentFor";
            context["metadata"] = (objectMetadata ? objectMetadata["repaymentFor"] : null);
            state['repaymentFor'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountNumber: function(val, state) {
            context["field"] = "fromAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
            state['fromAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountNumber: function(val, state) {
            context["field"] = "toAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
            state['toAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentType: function(val, state) {
            context["field"] = "paymentType";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
            state['paymentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentAmount: function(val, state) {
            context["field"] = "paymentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAmount"] : null);
            state['paymentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentCurrency: function(val, state) {
            context["field"] = "paymentCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentCurrency"] : null);
            state['paymentCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentReferenceMsg: function(val, state) {
            context["field"] = "paymentReferenceMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentReferenceMsg"] : null);
            state['paymentReferenceMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentRequestDate: function(val, state) {
            context["field"] = "paymentRequestDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentRequestDate"] : null);
            state['paymentRequestDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdBy: function(val, state) {
            context["field"] = "createdBy";
            context["metadata"] = (objectMetadata ? objectMetadata["createdBy"] : null);
            state['createdBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedBy: function(val, state) {
            context["field"] = "updatedBy";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedBy"] : null);
            state['updatedBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDate: function(val, state) {
            context["field"] = "createdDate";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
            state['createdDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedDate: function(val, state) {
            context["field"] = "updatedDate";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
            state['updatedDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        paymentRequestId: function(val, state) {
            context["field"] = "paymentRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentRequestId"] : null);
            state['paymentRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function LendingPaymentRequest(defaultValues) {
        var privateState = {};
        context["field"] = "repaymentFor";
        context["metadata"] = (objectMetadata ? objectMetadata["repaymentFor"] : null);
        privateState.repaymentFor = defaultValues ?
            (defaultValues["repaymentFor"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["repaymentFor"], context) :
                null) :
            null;

        context["field"] = "fromAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
        privateState.fromAccountNumber = defaultValues ?
            (defaultValues["fromAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountNumber"], context) :
                null) :
            null;

        context["field"] = "toAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
        privateState.toAccountNumber = defaultValues ?
            (defaultValues["toAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountNumber"], context) :
                null) :
            null;

        context["field"] = "paymentType";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
        privateState.paymentType = defaultValues ?
            (defaultValues["paymentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentType"], context) :
                null) :
            null;

        context["field"] = "paymentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAmount"] : null);
        privateState.paymentAmount = defaultValues ?
            (defaultValues["paymentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAmount"], context) :
                null) :
            null;

        context["field"] = "paymentCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentCurrency"] : null);
        privateState.paymentCurrency = defaultValues ?
            (defaultValues["paymentCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentCurrency"], context) :
                null) :
            null;

        context["field"] = "paymentReferenceMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentReferenceMsg"] : null);
        privateState.paymentReferenceMsg = defaultValues ?
            (defaultValues["paymentReferenceMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentReferenceMsg"], context) :
                null) :
            null;

        context["field"] = "paymentRequestDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentRequestDate"] : null);
        privateState.paymentRequestDate = defaultValues ?
            (defaultValues["paymentRequestDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentRequestDate"], context) :
                null) :
            null;

        context["field"] = "createdBy";
        context["metadata"] = (objectMetadata ? objectMetadata["createdBy"] : null);
        privateState.createdBy = defaultValues ?
            (defaultValues["createdBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdBy"], context) :
                null) :
            null;

        context["field"] = "updatedBy";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedBy"] : null);
        privateState.updatedBy = defaultValues ?
            (defaultValues["updatedBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedBy"], context) :
                null) :
            null;

        context["field"] = "createdDate";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
        privateState.createdDate = defaultValues ?
            (defaultValues["createdDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDate"], context) :
                null) :
            null;

        context["field"] = "updatedDate";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
        privateState.updatedDate = defaultValues ?
            (defaultValues["updatedDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedDate"], context) :
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

        context["field"] = "paymentRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentRequestId"] : null);
        privateState.paymentRequestId = defaultValues ?
            (defaultValues["paymentRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentRequestId"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "repaymentFor": {
                get: function() {
                    context["field"] = "repaymentFor";
                    context["metadata"] = (objectMetadata ? objectMetadata["repaymentFor"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.repaymentFor, context);
                },
                set: function(val) {
                    setterFunctions['repaymentFor'].call(this, val, privateState);
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
            "toAccountNumber": {
                get: function() {
                    context["field"] = "toAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['toAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentType": {
                get: function() {
                    context["field"] = "paymentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentType, context);
                },
                set: function(val) {
                    setterFunctions['paymentType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentAmount": {
                get: function() {
                    context["field"] = "paymentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAmount, context);
                },
                set: function(val) {
                    setterFunctions['paymentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentCurrency": {
                get: function() {
                    context["field"] = "paymentCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentCurrency, context);
                },
                set: function(val) {
                    setterFunctions['paymentCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentReferenceMsg": {
                get: function() {
                    context["field"] = "paymentReferenceMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentReferenceMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentReferenceMsg, context);
                },
                set: function(val) {
                    setterFunctions['paymentReferenceMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentRequestDate": {
                get: function() {
                    context["field"] = "paymentRequestDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentRequestDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentRequestDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentRequestDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdBy": {
                get: function() {
                    context["field"] = "createdBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdBy, context);
                },
                set: function(val) {
                    setterFunctions['createdBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedBy": {
                get: function() {
                    context["field"] = "updatedBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedBy, context);
                },
                set: function(val) {
                    setterFunctions['updatedBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdDate": {
                get: function() {
                    context["field"] = "createdDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDate, context);
                },
                set: function(val) {
                    setterFunctions['createdDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedDate": {
                get: function() {
                    context["field"] = "updatedDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedDate, context);
                },
                set: function(val) {
                    setterFunctions['updatedDate'].call(this, val, privateState);
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
            "paymentRequestId": {
                get: function() {
                    context["field"] = "paymentRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentRequestId, context);
                },
                set: function(val) {
                    setterFunctions['paymentRequestId'].call(this, val, privateState);
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
            privateState.repaymentFor = value ? (value["repaymentFor"] ? value["repaymentFor"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.paymentType = value ? (value["paymentType"] ? value["paymentType"] : null) : null;
            privateState.paymentAmount = value ? (value["paymentAmount"] ? value["paymentAmount"] : null) : null;
            privateState.paymentCurrency = value ? (value["paymentCurrency"] ? value["paymentCurrency"] : null) : null;
            privateState.paymentReferenceMsg = value ? (value["paymentReferenceMsg"] ? value["paymentReferenceMsg"] : null) : null;
            privateState.paymentRequestDate = value ? (value["paymentRequestDate"] ? value["paymentRequestDate"] : null) : null;
            privateState.createdBy = value ? (value["createdBy"] ? value["createdBy"] : null) : null;
            privateState.updatedBy = value ? (value["updatedBy"] ? value["updatedBy"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.updatedDate = value ? (value["updatedDate"] ? value["updatedDate"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.paymentRequestId = value ? (value["paymentRequestId"] ? value["paymentRequestId"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(LendingPaymentRequest);

    //Create new class level validator object
    BaseModel.Validator.call(LendingPaymentRequest);

    var registerValidatorBackup = LendingPaymentRequest.registerValidator;

    LendingPaymentRequest.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(LendingPaymentRequest.isValid(this, propName, val)) {
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
    //For Operation 'submit' with service id 'SubmitPaymentRequest1912'
     LendingPaymentRequest.submit = function(params, onCompletion){
        return LendingPaymentRequest.customVerb('submit', params, onCompletion);
     };

    var relations = [];

    LendingPaymentRequest.relations = relations;

    LendingPaymentRequest.prototype.isValid = function() {
        return LendingPaymentRequest.isValid(this);
    };

    LendingPaymentRequest.prototype.objModelName = "LendingPaymentRequest";
    LendingPaymentRequest.prototype.objServiceName = "TradeLending";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    LendingPaymentRequest.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeLending", "LendingPaymentRequest", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    LendingPaymentRequest.clone = function(objectToClone) {
        var clonedObj = new LendingPaymentRequest();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return LendingPaymentRequest;
});