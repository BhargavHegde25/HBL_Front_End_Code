/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "CurrencyDetails", "objectService" : "WealthOrder"};

    var setterFunctions = {
        currencyPairs: function(val, state) {
            context["field"] = "currencyPairs";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyPairs"] : null);
            state['currencyPairs'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketRate: function(val, state) {
            context["field"] = "marketRate";
            context["metadata"] = (objectMetadata ? objectMetadata["marketRate"] : null);
            state['marketRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateOrPeriod: function(val, state) {
            context["field"] = "dateOrPeriod";
            context["metadata"] = (objectMetadata ? objectMetadata["dateOrPeriod"] : null);
            state['dateOrPeriod'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RICCode: function(val, state) {
            context["field"] = "RICCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
            state['RICCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentId: function(val, state) {
            context["field"] = "instrumentId";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
            state['instrumentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyCurrency: function(val, state) {
            context["field"] = "buyCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["buyCurrency"] : null);
            state['buyCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sellCurrency: function(val, state) {
            context["field"] = "sellCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["sellCurrency"] : null);
            state['sellCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyAmount: function(val, state) {
            context["field"] = "buyAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["buyAmount"] : null);
            state['buyAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sellAmount: function(val, state) {
            context["field"] = "sellAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["sellAmount"] : null);
            state['sellAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyAccount: function(val, state) {
            context["field"] = "buyAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["buyAccount"] : null);
            state['buyAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sellAccount: function(val, state) {
            context["field"] = "sellAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["sellAccount"] : null);
            state['sellAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validate_only: function(val, state) {
            context["field"] = "validate_only";
            context["metadata"] = (objectMetadata ? objectMetadata["validate_only"] : null);
            state['validate_only'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function CurrencyDetails(defaultValues) {
        var privateState = {};
        context["field"] = "currencyPairs";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyPairs"] : null);
        privateState.currencyPairs = defaultValues ?
            (defaultValues["currencyPairs"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyPairs"], context) :
                null) :
            null;

        context["field"] = "marketRate";
        context["metadata"] = (objectMetadata ? objectMetadata["marketRate"] : null);
        privateState.marketRate = defaultValues ?
            (defaultValues["marketRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketRate"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "dateOrPeriod";
        context["metadata"] = (objectMetadata ? objectMetadata["dateOrPeriod"] : null);
        privateState.dateOrPeriod = defaultValues ?
            (defaultValues["dateOrPeriod"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateOrPeriod"], context) :
                null) :
            null;

        context["field"] = "RICCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
        privateState.RICCode = defaultValues ?
            (defaultValues["RICCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RICCode"], context) :
                null) :
            null;

        context["field"] = "instrumentId";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
        privateState.instrumentId = defaultValues ?
            (defaultValues["instrumentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentId"], context) :
                null) :
            null;

        context["field"] = "buyCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["buyCurrency"] : null);
        privateState.buyCurrency = defaultValues ?
            (defaultValues["buyCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyCurrency"], context) :
                null) :
            null;

        context["field"] = "sellCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["sellCurrency"] : null);
        privateState.sellCurrency = defaultValues ?
            (defaultValues["sellCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sellCurrency"], context) :
                null) :
            null;

        context["field"] = "buyAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["buyAmount"] : null);
        privateState.buyAmount = defaultValues ?
            (defaultValues["buyAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyAmount"], context) :
                null) :
            null;

        context["field"] = "sellAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["sellAmount"] : null);
        privateState.sellAmount = defaultValues ?
            (defaultValues["sellAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sellAmount"], context) :
                null) :
            null;

        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "buyAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["buyAccount"] : null);
        privateState.buyAccount = defaultValues ?
            (defaultValues["buyAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyAccount"], context) :
                null) :
            null;

        context["field"] = "sellAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["sellAccount"] : null);
        privateState.sellAccount = defaultValues ?
            (defaultValues["sellAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sellAccount"], context) :
                null) :
            null;

        context["field"] = "validate_only";
        context["metadata"] = (objectMetadata ? objectMetadata["validate_only"] : null);
        privateState.validate_only = defaultValues ?
            (defaultValues["validate_only"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validate_only"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "currencyPairs": {
                get: function() {
                    context["field"] = "currencyPairs";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyPairs"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyPairs, context);
                },
                set: function(val) {
                    setterFunctions['currencyPairs'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "marketRate": {
                get: function() {
                    context["field"] = "marketRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["marketRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.marketRate, context);
                },
                set: function(val) {
                    setterFunctions['marketRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "id": {
                get: function() {
                    context["field"] = "id";
                    context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.id, context);
                },
                set: function(val) {
                    setterFunctions['id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateOrPeriod": {
                get: function() {
                    context["field"] = "dateOrPeriod";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateOrPeriod"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateOrPeriod, context);
                },
                set: function(val) {
                    setterFunctions['dateOrPeriod'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RICCode": {
                get: function() {
                    context["field"] = "RICCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RICCode, context);
                },
                set: function(val) {
                    setterFunctions['RICCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "instrumentId": {
                get: function() {
                    context["field"] = "instrumentId";
                    context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instrumentId, context);
                },
                set: function(val) {
                    setterFunctions['instrumentId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "buyCurrency": {
                get: function() {
                    context["field"] = "buyCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["buyCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.buyCurrency, context);
                },
                set: function(val) {
                    setterFunctions['buyCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sellCurrency": {
                get: function() {
                    context["field"] = "sellCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["sellCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sellCurrency, context);
                },
                set: function(val) {
                    setterFunctions['sellCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "buyAmount": {
                get: function() {
                    context["field"] = "buyAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["buyAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.buyAmount, context);
                },
                set: function(val) {
                    setterFunctions['buyAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sellAmount": {
                get: function() {
                    context["field"] = "sellAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["sellAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sellAmount, context);
                },
                set: function(val) {
                    setterFunctions['sellAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
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
            "buyAccount": {
                get: function() {
                    context["field"] = "buyAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["buyAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.buyAccount, context);
                },
                set: function(val) {
                    setterFunctions['buyAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sellAccount": {
                get: function() {
                    context["field"] = "sellAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["sellAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sellAccount, context);
                },
                set: function(val) {
                    setterFunctions['sellAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "validate_only": {
                get: function() {
                    context["field"] = "validate_only";
                    context["metadata"] = (objectMetadata ? objectMetadata["validate_only"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.validate_only, context);
                },
                set: function(val) {
                    setterFunctions['validate_only'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.currencyPairs = value ? (value["currencyPairs"] ? value["currencyPairs"] : null) : null;
            privateState.marketRate = value ? (value["marketRate"] ? value["marketRate"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.dateOrPeriod = value ? (value["dateOrPeriod"] ? value["dateOrPeriod"] : null) : null;
            privateState.RICCode = value ? (value["RICCode"] ? value["RICCode"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.buyCurrency = value ? (value["buyCurrency"] ? value["buyCurrency"] : null) : null;
            privateState.sellCurrency = value ? (value["sellCurrency"] ? value["sellCurrency"] : null) : null;
            privateState.buyAmount = value ? (value["buyAmount"] ? value["buyAmount"] : null) : null;
            privateState.sellAmount = value ? (value["sellAmount"] ? value["sellAmount"] : null) : null;
            privateState.portfolioId = value ? (value["portfolioId"] ? value["portfolioId"] : null) : null;
            privateState.buyAccount = value ? (value["buyAccount"] ? value["buyAccount"] : null) : null;
            privateState.sellAccount = value ? (value["sellAccount"] ? value["sellAccount"] : null) : null;
            privateState.validate_only = value ? (value["validate_only"] ? value["validate_only"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(CurrencyDetails);

    //Create new class level validator object
    BaseModel.Validator.call(CurrencyDetails);

    var registerValidatorBackup = CurrencyDetails.registerValidator;

    CurrencyDetails.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(CurrencyDetails.isValid(this, propName, val)) {
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
    //For Operation 'createCurrencyOrder' with service id 'createCurrencyOrder6660'
     CurrencyDetails.createCurrencyOrder = function(params, onCompletion){
        return CurrencyDetails.customVerb('createCurrencyOrder', params, onCompletion);
     };

    //For Operation 'getMarketRates' with service id 'getMarketRates8160'
     CurrencyDetails.getMarketRates = function(params, onCompletion){
        return CurrencyDetails.customVerb('getMarketRates', params, onCompletion);
     };

    //For Operation 'getCurrencyGraph' with service id 'getCurrencyGraph1845'
     CurrencyDetails.getCurrencyGraph = function(params, onCompletion){
        return CurrencyDetails.customVerb('getCurrencyGraph', params, onCompletion);
     };

    //For Operation 'getCurrencyList' with service id 'getCurrencyList8765'
     CurrencyDetails.getCurrencyList = function(params, onCompletion){
        return CurrencyDetails.customVerb('getCurrencyList', params, onCompletion);
     };

    var relations = [];

    CurrencyDetails.relations = relations;

    CurrencyDetails.prototype.isValid = function() {
        return CurrencyDetails.isValid(this);
    };

    CurrencyDetails.prototype.objModelName = "CurrencyDetails";
    CurrencyDetails.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    CurrencyDetails.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "CurrencyDetails", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    CurrencyDetails.clone = function(objectToClone) {
        var clonedObj = new CurrencyDetails();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return CurrencyDetails;
});