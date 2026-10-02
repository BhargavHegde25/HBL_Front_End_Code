/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "FixedDeposit", "objectService" : "HBLOtherBankTransfers"};

    var setterFunctions = {
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        productId: function(val, state) {
            context["field"] = "productId";
            context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
            state['productId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        intrestRate: function(val, state) {
            context["field"] = "intrestRate";
            context["metadata"] = (objectMetadata ? objectMetadata["intrestRate"] : null);
            state['intrestRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccount: function(val, state) {
            context["field"] = "fromAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccount"] : null);
            state['fromAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceId: function(val, state) {
            context["field"] = "referenceId";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
            state['referenceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        arrangementId: function(val, state) {
            context["field"] = "arrangementId";
            context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
            state['arrangementId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionStatus: function(val, state) {
            context["field"] = "transactionStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionStatus"] : null);
            state['transactionStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        depositInterestRate: function(val, state) {
            context["field"] = "depositInterestRate";
            context["metadata"] = (objectMetadata ? objectMetadata["depositInterestRate"] : null);
            state['depositInterestRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        code: function(val, state) {
            context["field"] = "code";
            context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
            state['code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        depositType: function(val, state) {
            context["field"] = "depositType";
            context["metadata"] = (objectMetadata ? objectMetadata["depositType"] : null);
            state['depositType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        result: function(val, state) {
            context["field"] = "result";
            context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
            state['result'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rate: function(val, state) {
            context["field"] = "rate";
            context["metadata"] = (objectMetadata ? objectMetadata["rate"] : null);
            state['rate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        aaProductId: function(val, state) {
            context["field"] = "aaProductId";
            context["metadata"] = (objectMetadata ? objectMetadata["aaProductId"] : null);
            state['aaProductId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        term: function(val, state) {
            context["field"] = "term";
            context["metadata"] = (objectMetadata ? objectMetadata["term"] : null);
            state['term'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        minEligibilityAmt: function(val, state) {
            context["field"] = "minEligibilityAmt";
            context["metadata"] = (objectMetadata ? objectMetadata["minEligibilityAmt"] : null);
            state['minEligibilityAmt'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tenure: function(val, state) {
            context["field"] = "tenure";
            context["metadata"] = (objectMetadata ? objectMetadata["tenure"] : null);
            state['tenure'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function FixedDeposit(defaultValues) {
        var privateState = {};
        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "productId";
        context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
        privateState.productId = defaultValues ?
            (defaultValues["productId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["productId"], context) :
                null) :
            null;

        context["field"] = "intrestRate";
        context["metadata"] = (objectMetadata ? objectMetadata["intrestRate"] : null);
        privateState.intrestRate = defaultValues ?
            (defaultValues["intrestRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["intrestRate"], context) :
                null) :
            null;

        context["field"] = "fromAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccount"] : null);
        privateState.fromAccount = defaultValues ?
            (defaultValues["fromAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccount"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "referenceId";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
        privateState.referenceId = defaultValues ?
            (defaultValues["referenceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceId"], context) :
                null) :
            null;

        context["field"] = "arrangementId";
        context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
        privateState.arrangementId = defaultValues ?
            (defaultValues["arrangementId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["arrangementId"], context) :
                null) :
            null;

        context["field"] = "transactionStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionStatus"] : null);
        privateState.transactionStatus = defaultValues ?
            (defaultValues["transactionStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionStatus"], context) :
                null) :
            null;

        context["field"] = "depositInterestRate";
        context["metadata"] = (objectMetadata ? objectMetadata["depositInterestRate"] : null);
        privateState.depositInterestRate = defaultValues ?
            (defaultValues["depositInterestRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["depositInterestRate"], context) :
                null) :
            null;

        context["field"] = "code";
        context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
        privateState.code = defaultValues ?
            (defaultValues["code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["code"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;

        context["field"] = "depositType";
        context["metadata"] = (objectMetadata ? objectMetadata["depositType"] : null);
        privateState.depositType = defaultValues ?
            (defaultValues["depositType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["depositType"], context) :
                null) :
            null;

        context["field"] = "result";
        context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
        privateState.result = defaultValues ?
            (defaultValues["result"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["result"], context) :
                null) :
            null;

        context["field"] = "rate";
        context["metadata"] = (objectMetadata ? objectMetadata["rate"] : null);
        privateState.rate = defaultValues ?
            (defaultValues["rate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rate"], context) :
                null) :
            null;

        context["field"] = "aaProductId";
        context["metadata"] = (objectMetadata ? objectMetadata["aaProductId"] : null);
        privateState.aaProductId = defaultValues ?
            (defaultValues["aaProductId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["aaProductId"], context) :
                null) :
            null;

        context["field"] = "term";
        context["metadata"] = (objectMetadata ? objectMetadata["term"] : null);
        privateState.term = defaultValues ?
            (defaultValues["term"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["term"], context) :
                null) :
            null;

        context["field"] = "minEligibilityAmt";
        context["metadata"] = (objectMetadata ? objectMetadata["minEligibilityAmt"] : null);
        privateState.minEligibilityAmt = defaultValues ?
            (defaultValues["minEligibilityAmt"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["minEligibilityAmt"], context) :
                null) :
            null;

        context["field"] = "tenure";
        context["metadata"] = (objectMetadata ? objectMetadata["tenure"] : null);
        privateState.tenure = defaultValues ?
            (defaultValues["tenure"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tenure"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "productId": {
                get: function() {
                    context["field"] = "productId";
                    context["metadata"] = (objectMetadata ? objectMetadata["productId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.productId, context);
                },
                set: function(val) {
                    setterFunctions['productId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "intrestRate": {
                get: function() {
                    context["field"] = "intrestRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["intrestRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.intrestRate, context);
                },
                set: function(val) {
                    setterFunctions['intrestRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fromAccount": {
                get: function() {
                    context["field"] = "fromAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccount, context);
                },
                set: function(val) {
                    setterFunctions['fromAccount'].call(this, val, privateState);
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
            "status": {
                get: function() {
                    context["field"] = "status";
                    context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status, context);
                },
                set: function(val) {
                    setterFunctions['status'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceId": {
                get: function() {
                    context["field"] = "referenceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceId, context);
                },
                set: function(val) {
                    setterFunctions['referenceId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "arrangementId": {
                get: function() {
                    context["field"] = "arrangementId";
                    context["metadata"] = (objectMetadata ? objectMetadata["arrangementId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.arrangementId, context);
                },
                set: function(val) {
                    setterFunctions['arrangementId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionStatus": {
                get: function() {
                    context["field"] = "transactionStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionStatus, context);
                },
                set: function(val) {
                    setterFunctions['transactionStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "depositInterestRate": {
                get: function() {
                    context["field"] = "depositInterestRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["depositInterestRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.depositInterestRate, context);
                },
                set: function(val) {
                    setterFunctions['depositInterestRate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "code": {
                get: function() {
                    context["field"] = "code";
                    context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.code, context);
                },
                set: function(val) {
                    setterFunctions['code'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "message": {
                get: function() {
                    context["field"] = "message";
                    context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.message, context);
                },
                set: function(val) {
                    setterFunctions['message'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "type": {
                get: function() {
                    context["field"] = "type";
                    context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.type, context);
                },
                set: function(val) {
                    setterFunctions['type'].call(this, val, privateState);
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
            "depositType": {
                get: function() {
                    context["field"] = "depositType";
                    context["metadata"] = (objectMetadata ? objectMetadata["depositType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.depositType, context);
                },
                set: function(val) {
                    setterFunctions['depositType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "result": {
                get: function() {
                    context["field"] = "result";
                    context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.result, context);
                },
                set: function(val) {
                    setterFunctions['result'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rate": {
                get: function() {
                    context["field"] = "rate";
                    context["metadata"] = (objectMetadata ? objectMetadata["rate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rate, context);
                },
                set: function(val) {
                    setterFunctions['rate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "aaProductId": {
                get: function() {
                    context["field"] = "aaProductId";
                    context["metadata"] = (objectMetadata ? objectMetadata["aaProductId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.aaProductId, context);
                },
                set: function(val) {
                    setterFunctions['aaProductId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "term": {
                get: function() {
                    context["field"] = "term";
                    context["metadata"] = (objectMetadata ? objectMetadata["term"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.term, context);
                },
                set: function(val) {
                    setterFunctions['term'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "minEligibilityAmt": {
                get: function() {
                    context["field"] = "minEligibilityAmt";
                    context["metadata"] = (objectMetadata ? objectMetadata["minEligibilityAmt"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.minEligibilityAmt, context);
                },
                set: function(val) {
                    setterFunctions['minEligibilityAmt'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tenure": {
                get: function() {
                    context["field"] = "tenure";
                    context["metadata"] = (objectMetadata ? objectMetadata["tenure"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tenure, context);
                },
                set: function(val) {
                    setterFunctions['tenure'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "availableBalance": {
                get: function() {
                    context["field"] = "availableBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableBalance, context);
                },
                set: function(val) {
                    setterFunctions['availableBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currencyCode": {
                get: function() {
                    context["field"] = "currencyCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyCode, context);
                },
                set: function(val) {
                    setterFunctions['currencyCode'].call(this, val, privateState);
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
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.productId = value ? (value["productId"] ? value["productId"] : null) : null;
            privateState.intrestRate = value ? (value["intrestRate"] ? value["intrestRate"] : null) : null;
            privateState.fromAccount = value ? (value["fromAccount"] ? value["fromAccount"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.referenceId = value ? (value["referenceId"] ? value["referenceId"] : null) : null;
            privateState.arrangementId = value ? (value["arrangementId"] ? value["arrangementId"] : null) : null;
            privateState.transactionStatus = value ? (value["transactionStatus"] ? value["transactionStatus"] : null) : null;
            privateState.depositInterestRate = value ? (value["depositInterestRate"] ? value["depositInterestRate"] : null) : null;
            privateState.code = value ? (value["code"] ? value["code"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.depositType = value ? (value["depositType"] ? value["depositType"] : null) : null;
            privateState.result = value ? (value["result"] ? value["result"] : null) : null;
            privateState.rate = value ? (value["rate"] ? value["rate"] : null) : null;
            privateState.aaProductId = value ? (value["aaProductId"] ? value["aaProductId"] : null) : null;
            privateState.term = value ? (value["term"] ? value["term"] : null) : null;
            privateState.minEligibilityAmt = value ? (value["minEligibilityAmt"] ? value["minEligibilityAmt"] : null) : null;
            privateState.tenure = value ? (value["tenure"] ? value["tenure"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(FixedDeposit);

    //Create new class level validator object
    BaseModel.Validator.call(FixedDeposit);

    var registerValidatorBackup = FixedDeposit.registerValidator;

    FixedDeposit.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(FixedDeposit.isValid(this, propName, val)) {
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
    //For Operation 'createFixedDepositNonSTP' with service id 'createFixedDepositNonSTP6216'
     FixedDeposit.createFixedDepositNonSTP = function(params, onCompletion){
        return FixedDeposit.customVerb('createFixedDepositNonSTP', params, onCompletion);
     };

    //For Operation 'getFixedDepositRates' with service id 'getFixedDepositRates1819'
     FixedDeposit.getFixedDepositRates = function(params, onCompletion){
        return FixedDeposit.customVerb('getFixedDepositRates', params, onCompletion);
     };

    //For Operation 'createFixedDepositSTP' with service id 'createFixedDepositSTP2361'
     FixedDeposit.createFixedDepositSTP = function(params, onCompletion){
        return FixedDeposit.customVerb('createFixedDepositSTP', params, onCompletion);
     };

    //For Operation 'getFDTenureAndIntrests' with service id 'getFixedDepositTenureAndRates6021'
     FixedDeposit.getFDTenureAndIntrests = function(params, onCompletion){
        return FixedDeposit.customVerb('getFDTenureAndIntrests', params, onCompletion);
     };

    var relations = [];

    FixedDeposit.relations = relations;

    FixedDeposit.prototype.isValid = function() {
        return FixedDeposit.isValid(this);
    };

    FixedDeposit.prototype.objModelName = "FixedDeposit";
    FixedDeposit.prototype.objServiceName = "HBLOtherBankTransfers";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    FixedDeposit.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLOtherBankTransfers", "FixedDeposit", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    FixedDeposit.clone = function(objectToClone) {
        var clonedObj = new FixedDeposit();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return FixedDeposit;
});