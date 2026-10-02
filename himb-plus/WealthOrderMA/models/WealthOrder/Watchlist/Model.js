/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Watchlist", "objectService" : "WealthOrder"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Watchlist(defaultValues) {
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
    BaseModel.isParentOf(Watchlist);

    //Create new class level validator object
    BaseModel.Validator.call(Watchlist);

    var registerValidatorBackup = Watchlist.registerValidator;

    Watchlist.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Watchlist.isValid(this, propName, val)) {
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
    //For Operation 'getWatchlistDB' with service id 'getWatchlistDB6864'
     Watchlist.getWatchlistDB = function(params, onCompletion){
        return Watchlist.customVerb('getWatchlistDB', params, onCompletion);
     };

    //For Operation 'updateWatchlistDB' with service id 'updateWatchlistDB6456'
     Watchlist.updateWatchlistDB = function(params, onCompletion){
        return Watchlist.customVerb('updateWatchlistDB', params, onCompletion);
     };

    var relations = [];

    Watchlist.relations = relations;

    Watchlist.prototype.isValid = function() {
        return Watchlist.isValid(this);
    };

    Watchlist.prototype.objModelName = "Watchlist";
    Watchlist.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Watchlist.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "Watchlist", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Watchlist.clone = function(objectToClone) {
        var clonedObj = new Watchlist();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Watchlist;
});