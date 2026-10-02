/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "KUKL_Payments", "objectService" : "HBLMerchantObjects"};

    var setterFunctions = {
    };

    //Create the Model Class
    function KUKL_Payments(defaultValues) {
        var privateState = {};

        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(KUKL_Payments);

    //Create new class level validator object
    BaseModel.Validator.call(KUKL_Payments);

    var registerValidatorBackup = KUKL_Payments.registerValidator;

    KUKL_Payments.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(KUKL_Payments.isValid(this, propName, val)) {
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
    //For Operation 'getCustomerBillInfo' with service id 'getCustomerBillInfo9770'
     KUKL_Payments.getCustomerBillInfo = function(params, onCompletion){
        return KUKL_Payments.customVerb('getCustomerBillInfo', params, onCompletion);
     };

    //For Operation 'confirmBillPay' with service id 'confirmBillPay6791'
     KUKL_Payments.confirmBillPay = function(params, onCompletion){
        return KUKL_Payments.customVerb('confirmBillPay', params, onCompletion);
     };

    var relations = [];

    KUKL_Payments.relations = relations;

    KUKL_Payments.prototype.isValid = function() {
        return KUKL_Payments.isValid(this);
    };

    KUKL_Payments.prototype.objModelName = "KUKL_Payments";
    KUKL_Payments.prototype.objServiceName = "HBLMerchantObjects";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    KUKL_Payments.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLMerchantObjects", "KUKL_Payments", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    KUKL_Payments.clone = function(objectToClone) {
        var clonedObj = new KUKL_Payments();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return KUKL_Payments;
});