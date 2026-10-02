/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PortfolioHealth", "objectService" : "PortfolioServicing"};

    var setterFunctions = {
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portfolioServiceType: function(val, state) {
            context["field"] = "portfolioServiceType";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioServiceType"] : null);
            state['portfolioServiceType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        navPage: function(val, state) {
            context["field"] = "navPage";
            context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
            state['navPage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PortfolioHealth(defaultValues) {
        var privateState = {};
        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "portfolioServiceType";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioServiceType"] : null);
        privateState.portfolioServiceType = defaultValues ?
            (defaultValues["portfolioServiceType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioServiceType"], context) :
                null) :
            null;

        context["field"] = "navPage";
        context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
        privateState.navPage = defaultValues ?
            (defaultValues["navPage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["navPage"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "portfolioId": {
                get: function() {
                    context["field"] = "portfolioId";
                    context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portfolioId, context);
                },
                set: function(val) {
                    setterFunctions['portfolioId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "portfolioServiceType": {
                get: function() {
                    context["field"] = "portfolioServiceType";
                    context["metadata"] = (objectMetadata ? objectMetadata["portfolioServiceType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portfolioServiceType, context);
                },
                set: function(val) {
                    setterFunctions['portfolioServiceType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "navPage": {
                get: function() {
                    context["field"] = "navPage";
                    context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.navPage, context);
                },
                set: function(val) {
                    setterFunctions['navPage'].call(this, val, privateState);
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
            privateState.portfolioId = value ? (value["portfolioId"] ? value["portfolioId"] : null) : null;
            privateState.portfolioServiceType = value ? (value["portfolioServiceType"] ? value["portfolioServiceType"] : null) : null;
            privateState.navPage = value ? (value["navPage"] ? value["navPage"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PortfolioHealth);

    //Create new class level validator object
    BaseModel.Validator.call(PortfolioHealth);

    var registerValidatorBackup = PortfolioHealth.registerValidator;

    PortfolioHealth.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PortfolioHealth.isValid(this, propName, val)) {
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
    //For Operation 'getRiskAnalysisHC' with service id 'getRiskAnalysisHC5419'
     PortfolioHealth.getRiskAnalysisHC = function(params, onCompletion){
        return PortfolioHealth.customVerb('getRiskAnalysisHC', params, onCompletion);
     };

    //For Operation 'getRcmdInstrumentHC' with service id 'getRecommendedInstrumentsHC6533'
     PortfolioHealth.getRcmdInstrumentHC = function(params, onCompletion){
        return PortfolioHealth.customVerb('getRcmdInstrumentHC', params, onCompletion);
     };

    //For Operation 'getAllocationHC' with service id 'getAllocationHC7352'
     PortfolioHealth.getAllocationHC = function(params, onCompletion){
        return PortfolioHealth.customVerb('getAllocationHC', params, onCompletion);
     };

    //For Operation 'getRecommendedInstrumentsHC' with service id 'getRecommendedInstrumentsHC3646'
     PortfolioHealth.getRecommendedInstrumentsHC = function(params, onCompletion){
        return PortfolioHealth.customVerb('getRecommendedInstrumentsHC', params, onCompletion);
     };

    //For Operation 'getInvestmentConstraintsHC' with service id 'getInvestmentConstraintsHC7623'
     PortfolioHealth.getInvestmentConstraintsHC = function(params, onCompletion){
        return PortfolioHealth.customVerb('getInvestmentConstraintsHC', params, onCompletion);
     };

    //For Operation 'getPortfolioHealth' with service id 'getPortfolioHealth7181'
     PortfolioHealth.getPortfolioHealth = function(params, onCompletion){
        return PortfolioHealth.customVerb('getPortfolioHealth', params, onCompletion);
     };

    var relations = [];

    PortfolioHealth.relations = relations;

    PortfolioHealth.prototype.isValid = function() {
        return PortfolioHealth.isValid(this);
    };

    PortfolioHealth.prototype.objModelName = "PortfolioHealth";
    PortfolioHealth.prototype.objServiceName = "PortfolioServicing";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PortfolioHealth.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PortfolioServicing", "PortfolioHealth", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PortfolioHealth.clone = function(objectToClone) {
        var clonedObj = new PortfolioHealth();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PortfolioHealth;
});