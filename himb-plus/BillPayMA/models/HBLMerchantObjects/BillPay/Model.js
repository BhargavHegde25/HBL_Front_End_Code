/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "BillPay", "objectService" : "HBLMerchantObjects"};

    var setterFunctions = {
        transactionDetails: function(val, state) {
            context["field"] = "transactionDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDetails"] : null);
            state['transactionDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        appId: function(val, state) {
            context["field"] = "appId";
            context["metadata"] = (objectMetadata ? objectMetadata["appId"] : null);
            state['appId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function BillPay(defaultValues) {
        var privateState = {};
        context["field"] = "transactionDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDetails"] : null);
        privateState.transactionDetails = defaultValues ?
            (defaultValues["transactionDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDetails"], context) :
                null) :
            null;

        context["field"] = "appId";
        context["metadata"] = (objectMetadata ? objectMetadata["appId"] : null);
        privateState.appId = defaultValues ?
            (defaultValues["appId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["appId"], context) :
                null) :
            null;

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "transactionDetails": {
                get: function() {
                    context["field"] = "transactionDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDetails, context);
                },
                set: function(val) {
                    setterFunctions['transactionDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "appId": {
                get: function() {
                    context["field"] = "appId";
                    context["metadata"] = (objectMetadata ? objectMetadata["appId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.appId, context);
                },
                set: function(val) {
                    setterFunctions['appId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "MFAAttributes": {
                get: function() {
                    context["field"] = "MFAAttributes";
                    context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.MFAAttributes, context);
                },
                set: function(val) {
                    setterFunctions['MFAAttributes'].call(this, val, privateState);
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
            privateState.transactionDetails = value ? (value["transactionDetails"] ? value["transactionDetails"] : null) : null;
            privateState.appId = value ? (value["appId"] ? value["appId"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(BillPay);

    //Create new class level validator object
    BaseModel.Validator.call(BillPay);

    var registerValidatorBackup = BillPay.registerValidator;

    BillPay.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(BillPay.isValid(this, propName, val)) {
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
    //For Operation 'getBranchList' with service id 'GetBranchList1604'
     BillPay.getBranchList = function(params, onCompletion){
        return BillPay.customVerb('getBranchList', params, onCompletion);
     };

    //For Operation 'getCustomerBillInfo' with service id 'GetCustomerBillInfo8333'
     BillPay.getCustomerBillInfo = function(params, onCompletion){
        return BillPay.customVerb('getCustomerBillInfo', params, onCompletion);
     };

    //For Operation 'getNPIBillerData' with service id 'getNPIBillerData6369'
     BillPay.getNPIBillerData = function(params, onCompletion){
        return BillPay.customVerb('getNPIBillerData', params, onCompletion);
     };

    //For Operation 'getNPSBillersIntegrationURL' with service id 'GetNPSBillersIntegrationURL4522'
     BillPay.getNPSBillersIntegrationURL = function(params, onCompletion){
        return BillPay.customVerb('getNPSBillersIntegrationURL', params, onCompletion);
     };

    //For Operation 'confirmBillPay' with service id 'ConfirmBillPaid8819'
     BillPay.confirmBillPay = function(params, onCompletion){
        return BillPay.customVerb('confirmBillPay', params, onCompletion);
     };

    var relations = [];

    BillPay.relations = relations;

    BillPay.prototype.isValid = function() {
        return BillPay.isValid(this);
    };

    BillPay.prototype.objModelName = "BillPay";
    BillPay.prototype.objServiceName = "HBLMerchantObjects";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    BillPay.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLMerchantObjects", "BillPay", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    BillPay.clone = function(objectToClone) {
        var clonedObj = new BillPay();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return BillPay;
});