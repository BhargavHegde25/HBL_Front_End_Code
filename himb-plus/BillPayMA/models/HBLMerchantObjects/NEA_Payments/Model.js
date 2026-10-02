/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "NEA_Payments", "objectService" : "HBLMerchantObjects"};

    var setterFunctions = {
    };

    //Create the Model Class
    function NEA_Payments(defaultValues) {
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
    BaseModel.isParentOf(NEA_Payments);

    //Create new class level validator object
    BaseModel.Validator.call(NEA_Payments);

    var registerValidatorBackup = NEA_Payments.registerValidator;

    NEA_Payments.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(NEA_Payments.isValid(this, propName, val)) {
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
    //For Operation 'getBranchList' with service id 'GetBranchList5422'
     NEA_Payments.getBranchList = function(params, onCompletion){
        return NEA_Payments.customVerb('getBranchList', params, onCompletion);
     };

    //For Operation 'getCustomerBillInfo' with service id 'GetCustomerBillInfo1719'
     NEA_Payments.getCustomerBillInfo = function(params, onCompletion){
        return NEA_Payments.customVerb('getCustomerBillInfo', params, onCompletion);
     };

    //For Operation 'confirmBillPay' with service id 'ConfirmBillPaid5688'
     NEA_Payments.confirmBillPay = function(params, onCompletion){
        return NEA_Payments.customVerb('confirmBillPay', params, onCompletion);
     };

    var relations = [];

    NEA_Payments.relations = relations;

    NEA_Payments.prototype.isValid = function() {
        return NEA_Payments.isValid(this);
    };

    NEA_Payments.prototype.objModelName = "NEA_Payments";
    NEA_Payments.prototype.objServiceName = "HBLMerchantObjects";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    NEA_Payments.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLMerchantObjects", "NEA_Payments", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    NEA_Payments.clone = function(objectToClone) {
        var clonedObj = new NEA_Payments();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return NEA_Payments;
});