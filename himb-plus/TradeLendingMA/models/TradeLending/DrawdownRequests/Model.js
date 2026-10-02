/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "DrawdownRequests", "objectService" : "TradeLending"};

    var setterFunctions = {
        facilityId: function(val, state) {
            context["field"] = "facilityId";
            context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
            state['facilityId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        loanProduct: function(val, state) {
            context["field"] = "loanProduct";
            context["metadata"] = (objectMetadata ? objectMetadata["loanProduct"] : null);
            state['loanProduct'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        loanAmount: function(val, state) {
            context["field"] = "loanAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["loanAmount"] : null);
            state['loanAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerName: function(val, state) {
            context["field"] = "customerName";
            context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
            state['customerName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerRole: function(val, state) {
            context["field"] = "customerRole";
            context["metadata"] = (objectMetadata ? objectMetadata["customerRole"] : null);
            state['customerRole'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditAccountId: function(val, state) {
            context["field"] = "creditAccountId";
            context["metadata"] = (objectMetadata ? objectMetadata["creditAccountId"] : null);
            state['creditAccountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccountId: function(val, state) {
            context["field"] = "debitAccountId";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccountId"] : null);
            state['debitAccountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawdownRequestId: function(val, state) {
            context["field"] = "drawdownRequestId";
            context["metadata"] = (objectMetadata ? objectMetadata["drawdownRequestId"] : null);
            state['drawdownRequestId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        drawdownTermDays: function(val, state) {
            context["field"] = "drawdownTermDays";
            context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermDays"] : null);
            state['drawdownTermDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawdownTermMonths: function(val, state) {
            context["field"] = "drawdownTermMonths";
            context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermMonths"] : null);
            state['drawdownTermMonths'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        drawdownTermYears: function(val, state) {
            context["field"] = "drawdownTermYears";
            context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermYears"] : null);
            state['drawdownTermYears'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function DrawdownRequests(defaultValues) {
        var privateState = {};
        context["field"] = "facilityId";
        context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
        privateState.facilityId = defaultValues ?
            (defaultValues["facilityId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["facilityId"], context) :
                null) :
            null;

        context["field"] = "loanProduct";
        context["metadata"] = (objectMetadata ? objectMetadata["loanProduct"] : null);
        privateState.loanProduct = defaultValues ?
            (defaultValues["loanProduct"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["loanProduct"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "loanAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["loanAmount"] : null);
        privateState.loanAmount = defaultValues ?
            (defaultValues["loanAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["loanAmount"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "customerName";
        context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
        privateState.customerName = defaultValues ?
            (defaultValues["customerName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerName"], context) :
                null) :
            null;

        context["field"] = "customerRole";
        context["metadata"] = (objectMetadata ? objectMetadata["customerRole"] : null);
        privateState.customerRole = defaultValues ?
            (defaultValues["customerRole"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerRole"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "creditAccountId";
        context["metadata"] = (objectMetadata ? objectMetadata["creditAccountId"] : null);
        privateState.creditAccountId = defaultValues ?
            (defaultValues["creditAccountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditAccountId"], context) :
                null) :
            null;

        context["field"] = "debitAccountId";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccountId"] : null);
        privateState.debitAccountId = defaultValues ?
            (defaultValues["debitAccountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccountId"], context) :
                null) :
            null;

        context["field"] = "drawdownRequestId";
        context["metadata"] = (objectMetadata ? objectMetadata["drawdownRequestId"] : null);
        privateState.drawdownRequestId = defaultValues ?
            (defaultValues["drawdownRequestId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawdownRequestId"], context) :
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

        context["field"] = "drawdownTermDays";
        context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermDays"] : null);
        privateState.drawdownTermDays = defaultValues ?
            (defaultValues["drawdownTermDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawdownTermDays"], context) :
                null) :
            null;

        context["field"] = "drawdownTermMonths";
        context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermMonths"] : null);
        privateState.drawdownTermMonths = defaultValues ?
            (defaultValues["drawdownTermMonths"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawdownTermMonths"], context) :
                null) :
            null;

        context["field"] = "drawdownTermYears";
        context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermYears"] : null);
        privateState.drawdownTermYears = defaultValues ?
            (defaultValues["drawdownTermYears"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["drawdownTermYears"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "facilityId": {
                get: function() {
                    context["field"] = "facilityId";
                    context["metadata"] = (objectMetadata ? objectMetadata["facilityId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.facilityId, context);
                },
                set: function(val) {
                    setterFunctions['facilityId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "loanProduct": {
                get: function() {
                    context["field"] = "loanProduct";
                    context["metadata"] = (objectMetadata ? objectMetadata["loanProduct"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.loanProduct, context);
                },
                set: function(val) {
                    setterFunctions['loanProduct'].call(this, val, privateState);
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
            "loanAmount": {
                get: function() {
                    context["field"] = "loanAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["loanAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.loanAmount, context);
                },
                set: function(val) {
                    setterFunctions['loanAmount'].call(this, val, privateState);
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
            "customerName": {
                get: function() {
                    context["field"] = "customerName";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerName, context);
                },
                set: function(val) {
                    setterFunctions['customerName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerRole": {
                get: function() {
                    context["field"] = "customerRole";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerRole"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerRole, context);
                },
                set: function(val) {
                    setterFunctions['customerRole'].call(this, val, privateState);
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
            "creditAccountId": {
                get: function() {
                    context["field"] = "creditAccountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditAccountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditAccountId, context);
                },
                set: function(val) {
                    setterFunctions['creditAccountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAccountId": {
                get: function() {
                    context["field"] = "debitAccountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccountId, context);
                },
                set: function(val) {
                    setterFunctions['debitAccountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawdownRequestId": {
                get: function() {
                    context["field"] = "drawdownRequestId";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawdownRequestId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawdownRequestId, context);
                },
                set: function(val) {
                    setterFunctions['drawdownRequestId'].call(this, val, privateState);
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
            "drawdownTermDays": {
                get: function() {
                    context["field"] = "drawdownTermDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawdownTermDays, context);
                },
                set: function(val) {
                    setterFunctions['drawdownTermDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawdownTermMonths": {
                get: function() {
                    context["field"] = "drawdownTermMonths";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermMonths"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawdownTermMonths, context);
                },
                set: function(val) {
                    setterFunctions['drawdownTermMonths'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "drawdownTermYears": {
                get: function() {
                    context["field"] = "drawdownTermYears";
                    context["metadata"] = (objectMetadata ? objectMetadata["drawdownTermYears"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.drawdownTermYears, context);
                },
                set: function(val) {
                    setterFunctions['drawdownTermYears'].call(this, val, privateState);
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
            privateState.facilityId = value ? (value["facilityId"] ? value["facilityId"] : null) : null;
            privateState.loanProduct = value ? (value["loanProduct"] ? value["loanProduct"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.loanAmount = value ? (value["loanAmount"] ? value["loanAmount"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.customerName = value ? (value["customerName"] ? value["customerName"] : null) : null;
            privateState.customerRole = value ? (value["customerRole"] ? value["customerRole"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.creditAccountId = value ? (value["creditAccountId"] ? value["creditAccountId"] : null) : null;
            privateState.debitAccountId = value ? (value["debitAccountId"] ? value["debitAccountId"] : null) : null;
            privateState.drawdownRequestId = value ? (value["drawdownRequestId"] ? value["drawdownRequestId"] : null) : null;
            privateState.createdBy = value ? (value["createdBy"] ? value["createdBy"] : null) : null;
            privateState.updatedBy = value ? (value["updatedBy"] ? value["updatedBy"] : null) : null;
            privateState.createdDate = value ? (value["createdDate"] ? value["createdDate"] : null) : null;
            privateState.updatedDate = value ? (value["updatedDate"] ? value["updatedDate"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.drawdownTermDays = value ? (value["drawdownTermDays"] ? value["drawdownTermDays"] : null) : null;
            privateState.drawdownTermMonths = value ? (value["drawdownTermMonths"] ? value["drawdownTermMonths"] : null) : null;
            privateState.drawdownTermYears = value ? (value["drawdownTermYears"] ? value["drawdownTermYears"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(DrawdownRequests);

    //Create new class level validator object
    BaseModel.Validator.call(DrawdownRequests);

    var registerValidatorBackup = DrawdownRequests.registerValidator;

    DrawdownRequests.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(DrawdownRequests.isValid(this, propName, val)) {
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
    //For Operation 'submit' with service id 'SubmitDrawdownRequestOperation1279'
     DrawdownRequests.submit = function(params, onCompletion){
        return DrawdownRequests.customVerb('submit', params, onCompletion);
     };

    var relations = [];

    DrawdownRequests.relations = relations;

    DrawdownRequests.prototype.isValid = function() {
        return DrawdownRequests.isValid(this);
    };

    DrawdownRequests.prototype.objModelName = "DrawdownRequests";
    DrawdownRequests.prototype.objServiceName = "TradeLending";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    DrawdownRequests.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("TradeLending", "DrawdownRequests", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    DrawdownRequests.clone = function(objectToClone) {
        var clonedObj = new DrawdownRequests();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return DrawdownRequests;
});