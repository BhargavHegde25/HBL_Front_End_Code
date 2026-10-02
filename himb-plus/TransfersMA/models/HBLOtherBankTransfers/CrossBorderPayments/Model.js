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
    };

    //Create the Model Class
    function CrossBorderPayments(defaultValues) {
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

    //For Operation 'getRelationship' with service id 'getRelationship7841'
     CrossBorderPayments.getRelationship = function(params, onCompletion){
        return CrossBorderPayments.customVerb('getRelationship', params, onCompletion);
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