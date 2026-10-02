/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Customer", "objectService" : "PortfolioServicing"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        backendId: function(val, state) {
            context["field"] = "backendId";
            context["metadata"] = (objectMetadata ? objectMetadata["backendId"] : null);
            state['backendId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        operation: function(val, state) {
            context["field"] = "operation";
            context["metadata"] = (objectMetadata ? objectMetadata["operation"] : null);
            state['operation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isFavourite: function(val, state) {
            context["field"] = "isFavourite";
            context["metadata"] = (objectMetadata ? objectMetadata["isFavourite"] : null);
            state['isFavourite'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isWealthUser: function(val, state) {
            context["field"] = "isWealthUser";
            context["metadata"] = (objectMetadata ? objectMetadata["isWealthUser"] : null);
            state['isWealthUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Customers: function(val, state) {
            context["field"] = "Customers";
            context["metadata"] = (objectMetadata ? objectMetadata["Customers"] : null);
            state['Customers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Customer(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "backendId";
        context["metadata"] = (objectMetadata ? objectMetadata["backendId"] : null);
        privateState.backendId = defaultValues ?
            (defaultValues["backendId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["backendId"], context) :
                null) :
            null;

        context["field"] = "operation";
        context["metadata"] = (objectMetadata ? objectMetadata["operation"] : null);
        privateState.operation = defaultValues ?
            (defaultValues["operation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["operation"], context) :
                null) :
            null;

        context["field"] = "isFavourite";
        context["metadata"] = (objectMetadata ? objectMetadata["isFavourite"] : null);
        privateState.isFavourite = defaultValues ?
            (defaultValues["isFavourite"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isFavourite"], context) :
                null) :
            null;

        context["field"] = "isWealthUser";
        context["metadata"] = (objectMetadata ? objectMetadata["isWealthUser"] : null);
        privateState.isWealthUser = defaultValues ?
            (defaultValues["isWealthUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isWealthUser"], context) :
                null) :
            null;

        context["field"] = "Customers";
        context["metadata"] = (objectMetadata ? objectMetadata["Customers"] : null);
        privateState.Customers = defaultValues ?
            (defaultValues["Customers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Customers"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "backendId": {
                get: function() {
                    context["field"] = "backendId";
                    context["metadata"] = (objectMetadata ? objectMetadata["backendId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.backendId, context);
                },
                set: function(val) {
                    setterFunctions['backendId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "operation": {
                get: function() {
                    context["field"] = "operation";
                    context["metadata"] = (objectMetadata ? objectMetadata["operation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.operation, context);
                },
                set: function(val) {
                    setterFunctions['operation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isFavourite": {
                get: function() {
                    context["field"] = "isFavourite";
                    context["metadata"] = (objectMetadata ? objectMetadata["isFavourite"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isFavourite, context);
                },
                set: function(val) {
                    setterFunctions['isFavourite'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isWealthUser": {
                get: function() {
                    context["field"] = "isWealthUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["isWealthUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isWealthUser, context);
                },
                set: function(val) {
                    setterFunctions['isWealthUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Customers": {
                get: function() {
                    context["field"] = "Customers";
                    context["metadata"] = (objectMetadata ? objectMetadata["Customers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Customers, context);
                },
                set: function(val) {
                    setterFunctions['Customers'].call(this, val, privateState);
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
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.backendId = value ? (value["backendId"] ? value["backendId"] : null) : null;
            privateState.operation = value ? (value["operation"] ? value["operation"] : null) : null;
            privateState.isFavourite = value ? (value["isFavourite"] ? value["isFavourite"] : null) : null;
            privateState.isWealthUser = value ? (value["isWealthUser"] ? value["isWealthUser"] : null) : null;
            privateState.Customers = value ? (value["Customers"] ? value["Customers"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Customer);

    //Create new class level validator object
    BaseModel.Validator.call(Customer);

    var registerValidatorBackup = Customer.registerValidator;

    Customer.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Customer.isValid(this, propName, val)) {
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
    //For Operation 'getCustomers' with service id 'getCustomers6100'
     Customer.getCustomers = function(params, onCompletion){
        return Customer.customVerb('getCustomers', params, onCompletion);
     };

    //For Operation 'updateFavoriteCustomer' with service id 'updateCustomers7319'
     Customer.updateFavoriteCustomer = function(params, onCompletion){
        return Customer.customVerb('updateFavoriteCustomer', params, onCompletion);
     };

    var relations = [];

    Customer.relations = relations;

    Customer.prototype.isValid = function() {
        return Customer.isValid(this);
    };

    Customer.prototype.objModelName = "Customer";
    Customer.prototype.objServiceName = "PortfolioServicing";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Customer.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PortfolioServicing", "Customer", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Customer.clone = function(objectToClone) {
        var clonedObj = new Customer();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Customer;
});