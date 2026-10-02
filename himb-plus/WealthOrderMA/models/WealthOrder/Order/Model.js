/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Order", "objectService" : "WealthOrder"};

    var setterFunctions = {
        sellAmount: function(val, state) {
            context["field"] = "sellAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["sellAmount"] : null);
            state['sellAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyAmount: function(val, state) {
            context["field"] = "buyAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["buyAmount"] : null);
            state['buyAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sellCurrency: function(val, state) {
            context["field"] = "sellCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["sellCurrency"] : null);
            state['sellCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        buyCurrency: function(val, state) {
            context["field"] = "buyCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["buyCurrency"] : null);
            state['buyCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ISINCode: function(val, state) {
            context["field"] = "ISINCode";
            context["metadata"] = (objectMetadata ? objectMetadata["ISINCode"] : null);
            state['ISINCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketPrice: function(val, state) {
            context["field"] = "marketPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["marketPrice"] : null);
            state['marketPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        order: function(val, state) {
            context["field"] = "order";
            context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
            state['order'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        quantity: function(val, state) {
            context["field"] = "quantity";
            context["metadata"] = (objectMetadata ? objectMetadata["quantity"] : null);
            state['quantity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderType: function(val, state) {
            context["field"] = "orderType";
            context["metadata"] = (objectMetadata ? objectMetadata["orderType"] : null);
            state['orderType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stopLoss: function(val, state) {
            context["field"] = "stopLoss";
            context["metadata"] = (objectMetadata ? objectMetadata["stopLoss"] : null);
            state['stopLoss'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stopPrice: function(val, state) {
            context["field"] = "stopPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["stopPrice"] : null);
            state['stopPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitPrice: function(val, state) {
            context["field"] = "limitPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["limitPrice"] : null);
            state['limitPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validity: function(val, state) {
            context["field"] = "validity";
            context["metadata"] = (objectMetadata ? objectMetadata["validity"] : null);
            state['validity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        netAmount: function(val, state) {
            context["field"] = "netAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["netAmount"] : null);
            state['netAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stockExchange: function(val, state) {
            context["field"] = "stockExchange";
            context["metadata"] = (objectMetadata ? objectMetadata["stockExchange"] : null);
            state['stockExchange'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tradeCurrency: function(val, state) {
            context["field"] = "tradeCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["tradeCurrency"] : null);
            state['tradeCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentId: function(val, state) {
            context["field"] = "instrumentId";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
            state['instrumentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        price: function(val, state) {
            context["field"] = "price";
            context["metadata"] = (objectMetadata ? objectMetadata["price"] : null);
            state['price'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        validate_only: function(val, state) {
            context["field"] = "validate_only";
            context["metadata"] = (objectMetadata ? objectMetadata["validate_only"] : null);
            state['validate_only'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        calculateCharges: function(val, state) {
            context["field"] = "calculateCharges";
            context["metadata"] = (objectMetadata ? objectMetadata["calculateCharges"] : null);
            state['calculateCharges'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dealStatus: function(val, state) {
            context["field"] = "dealStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["dealStatus"] : null);
            state['dealStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        caseCode: function(val, state) {
            context["field"] = "caseCode";
            context["metadata"] = (objectMetadata ? objectMetadata["caseCode"] : null);
            state['caseCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderTypeCode: function(val, state) {
            context["field"] = "orderTypeCode";
            context["metadata"] = (objectMetadata ? objectMetadata["orderTypeCode"] : null);
            state['orderTypeCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reasonC: function(val, state) {
            context["field"] = "reasonC";
            context["metadata"] = (objectMetadata ? objectMetadata["reasonC"] : null);
            state['reasonC'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        targetNatureE: function(val, state) {
            context["field"] = "targetNatureE";
            context["metadata"] = (objectMetadata ? objectMetadata["targetNatureE"] : null);
            state['targetNatureE'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        assetType: function(val, state) {
            context["field"] = "assetType";
            context["metadata"] = (objectMetadata ? objectMetadata["assetType"] : null);
            state['assetType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        funcResultCode: function(val, state) {
            context["field"] = "funcResultCode";
            context["metadata"] = (objectMetadata ? objectMetadata["funcResultCode"] : null);
            state['funcResultCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Order(defaultValues) {
        var privateState = {};
        context["field"] = "sellAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["sellAmount"] : null);
        privateState.sellAmount = defaultValues ?
            (defaultValues["sellAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sellAmount"], context) :
                null) :
            null;

        context["field"] = "buyAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["buyAmount"] : null);
        privateState.buyAmount = defaultValues ?
            (defaultValues["buyAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyAmount"], context) :
                null) :
            null;

        context["field"] = "sellCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["sellCurrency"] : null);
        privateState.sellCurrency = defaultValues ?
            (defaultValues["sellCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sellCurrency"], context) :
                null) :
            null;

        context["field"] = "buyCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["buyCurrency"] : null);
        privateState.buyCurrency = defaultValues ?
            (defaultValues["buyCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["buyCurrency"], context) :
                null) :
            null;

        context["field"] = "ISINCode";
        context["metadata"] = (objectMetadata ? objectMetadata["ISINCode"] : null);
        privateState.ISINCode = defaultValues ?
            (defaultValues["ISINCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ISINCode"], context) :
                null) :
            null;

        context["field"] = "marketPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["marketPrice"] : null);
        privateState.marketPrice = defaultValues ?
            (defaultValues["marketPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketPrice"], context) :
                null) :
            null;

        context["field"] = "order";
        context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
        privateState.order = defaultValues ?
            (defaultValues["order"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["order"], context) :
                null) :
            null;

        context["field"] = "quantity";
        context["metadata"] = (objectMetadata ? objectMetadata["quantity"] : null);
        privateState.quantity = defaultValues ?
            (defaultValues["quantity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["quantity"], context) :
                null) :
            null;

        context["field"] = "orderType";
        context["metadata"] = (objectMetadata ? objectMetadata["orderType"] : null);
        privateState.orderType = defaultValues ?
            (defaultValues["orderType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderType"], context) :
                null) :
            null;

        context["field"] = "stopLoss";
        context["metadata"] = (objectMetadata ? objectMetadata["stopLoss"] : null);
        privateState.stopLoss = defaultValues ?
            (defaultValues["stopLoss"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stopLoss"], context) :
                null) :
            null;

        context["field"] = "stopPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["stopPrice"] : null);
        privateState.stopPrice = defaultValues ?
            (defaultValues["stopPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stopPrice"], context) :
                null) :
            null;

        context["field"] = "limitPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["limitPrice"] : null);
        privateState.limitPrice = defaultValues ?
            (defaultValues["limitPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitPrice"], context) :
                null) :
            null;

        context["field"] = "validity";
        context["metadata"] = (objectMetadata ? objectMetadata["validity"] : null);
        privateState.validity = defaultValues ?
            (defaultValues["validity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validity"], context) :
                null) :
            null;

        context["field"] = "netAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["netAmount"] : null);
        privateState.netAmount = defaultValues ?
            (defaultValues["netAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["netAmount"], context) :
                null) :
            null;

        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "stockExchange";
        context["metadata"] = (objectMetadata ? objectMetadata["stockExchange"] : null);
        privateState.stockExchange = defaultValues ?
            (defaultValues["stockExchange"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stockExchange"], context) :
                null) :
            null;

        context["field"] = "tradeCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["tradeCurrency"] : null);
        privateState.tradeCurrency = defaultValues ?
            (defaultValues["tradeCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tradeCurrency"], context) :
                null) :
            null;

        context["field"] = "instrumentId";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
        privateState.instrumentId = defaultValues ?
            (defaultValues["instrumentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentId"], context) :
                null) :
            null;

        context["field"] = "price";
        context["metadata"] = (objectMetadata ? objectMetadata["price"] : null);
        privateState.price = defaultValues ?
            (defaultValues["price"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["price"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "validate_only";
        context["metadata"] = (objectMetadata ? objectMetadata["validate_only"] : null);
        privateState.validate_only = defaultValues ?
            (defaultValues["validate_only"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["validate_only"], context) :
                null) :
            null;

        context["field"] = "calculateCharges";
        context["metadata"] = (objectMetadata ? objectMetadata["calculateCharges"] : null);
        privateState.calculateCharges = defaultValues ?
            (defaultValues["calculateCharges"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["calculateCharges"], context) :
                null) :
            null;

        context["field"] = "dealStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["dealStatus"] : null);
        privateState.dealStatus = defaultValues ?
            (defaultValues["dealStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dealStatus"], context) :
                null) :
            null;

        context["field"] = "caseCode";
        context["metadata"] = (objectMetadata ? objectMetadata["caseCode"] : null);
        privateState.caseCode = defaultValues ?
            (defaultValues["caseCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["caseCode"], context) :
                null) :
            null;

        context["field"] = "orderTypeCode";
        context["metadata"] = (objectMetadata ? objectMetadata["orderTypeCode"] : null);
        privateState.orderTypeCode = defaultValues ?
            (defaultValues["orderTypeCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderTypeCode"], context) :
                null) :
            null;

        context["field"] = "reasonC";
        context["metadata"] = (objectMetadata ? objectMetadata["reasonC"] : null);
        privateState.reasonC = defaultValues ?
            (defaultValues["reasonC"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reasonC"], context) :
                null) :
            null;

        context["field"] = "targetNatureE";
        context["metadata"] = (objectMetadata ? objectMetadata["targetNatureE"] : null);
        privateState.targetNatureE = defaultValues ?
            (defaultValues["targetNatureE"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["targetNatureE"], context) :
                null) :
            null;

        context["field"] = "assetType";
        context["metadata"] = (objectMetadata ? objectMetadata["assetType"] : null);
        privateState.assetType = defaultValues ?
            (defaultValues["assetType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["assetType"], context) :
                null) :
            null;

        context["field"] = "funcResultCode";
        context["metadata"] = (objectMetadata ? objectMetadata["funcResultCode"] : null);
        privateState.funcResultCode = defaultValues ?
            (defaultValues["funcResultCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["funcResultCode"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
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
            "ISINCode": {
                get: function() {
                    context["field"] = "ISINCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["ISINCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ISINCode, context);
                },
                set: function(val) {
                    setterFunctions['ISINCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "marketPrice": {
                get: function() {
                    context["field"] = "marketPrice";
                    context["metadata"] = (objectMetadata ? objectMetadata["marketPrice"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.marketPrice, context);
                },
                set: function(val) {
                    setterFunctions['marketPrice'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "order": {
                get: function() {
                    context["field"] = "order";
                    context["metadata"] = (objectMetadata ? objectMetadata["order"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.order, context);
                },
                set: function(val) {
                    setterFunctions['order'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "quantity": {
                get: function() {
                    context["field"] = "quantity";
                    context["metadata"] = (objectMetadata ? objectMetadata["quantity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.quantity, context);
                },
                set: function(val) {
                    setterFunctions['quantity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderType": {
                get: function() {
                    context["field"] = "orderType";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderType, context);
                },
                set: function(val) {
                    setterFunctions['orderType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stopLoss": {
                get: function() {
                    context["field"] = "stopLoss";
                    context["metadata"] = (objectMetadata ? objectMetadata["stopLoss"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stopLoss, context);
                },
                set: function(val) {
                    setterFunctions['stopLoss'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "stopPrice": {
                get: function() {
                    context["field"] = "stopPrice";
                    context["metadata"] = (objectMetadata ? objectMetadata["stopPrice"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stopPrice, context);
                },
                set: function(val) {
                    setterFunctions['stopPrice'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limitPrice": {
                get: function() {
                    context["field"] = "limitPrice";
                    context["metadata"] = (objectMetadata ? objectMetadata["limitPrice"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limitPrice, context);
                },
                set: function(val) {
                    setterFunctions['limitPrice'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "validity": {
                get: function() {
                    context["field"] = "validity";
                    context["metadata"] = (objectMetadata ? objectMetadata["validity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.validity, context);
                },
                set: function(val) {
                    setterFunctions['validity'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "netAmount": {
                get: function() {
                    context["field"] = "netAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["netAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.netAmount, context);
                },
                set: function(val) {
                    setterFunctions['netAmount'].call(this, val, privateState);
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
            "stockExchange": {
                get: function() {
                    context["field"] = "stockExchange";
                    context["metadata"] = (objectMetadata ? objectMetadata["stockExchange"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.stockExchange, context);
                },
                set: function(val) {
                    setterFunctions['stockExchange'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tradeCurrency": {
                get: function() {
                    context["field"] = "tradeCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["tradeCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tradeCurrency, context);
                },
                set: function(val) {
                    setterFunctions['tradeCurrency'].call(this, val, privateState);
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
            "price": {
                get: function() {
                    context["field"] = "price";
                    context["metadata"] = (objectMetadata ? objectMetadata["price"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.price, context);
                },
                set: function(val) {
                    setterFunctions['price'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionType": {
                get: function() {
                    context["field"] = "transactionType";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionType, context);
                },
                set: function(val) {
                    setterFunctions['transactionType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderId": {
                get: function() {
                    context["field"] = "orderId";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderId, context);
                },
                set: function(val) {
                    setterFunctions['orderId'].call(this, val, privateState);
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
            "calculateCharges": {
                get: function() {
                    context["field"] = "calculateCharges";
                    context["metadata"] = (objectMetadata ? objectMetadata["calculateCharges"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.calculateCharges, context);
                },
                set: function(val) {
                    setterFunctions['calculateCharges'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dealStatus": {
                get: function() {
                    context["field"] = "dealStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["dealStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dealStatus, context);
                },
                set: function(val) {
                    setterFunctions['dealStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "caseCode": {
                get: function() {
                    context["field"] = "caseCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["caseCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.caseCode, context);
                },
                set: function(val) {
                    setterFunctions['caseCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "orderTypeCode": {
                get: function() {
                    context["field"] = "orderTypeCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["orderTypeCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.orderTypeCode, context);
                },
                set: function(val) {
                    setterFunctions['orderTypeCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reasonC": {
                get: function() {
                    context["field"] = "reasonC";
                    context["metadata"] = (objectMetadata ? objectMetadata["reasonC"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reasonC, context);
                },
                set: function(val) {
                    setterFunctions['reasonC'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "targetNatureE": {
                get: function() {
                    context["field"] = "targetNatureE";
                    context["metadata"] = (objectMetadata ? objectMetadata["targetNatureE"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.targetNatureE, context);
                },
                set: function(val) {
                    setterFunctions['targetNatureE'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "assetType": {
                get: function() {
                    context["field"] = "assetType";
                    context["metadata"] = (objectMetadata ? objectMetadata["assetType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.assetType, context);
                },
                set: function(val) {
                    setterFunctions['assetType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "funcResultCode": {
                get: function() {
                    context["field"] = "funcResultCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["funcResultCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.funcResultCode, context);
                },
                set: function(val) {
                    setterFunctions['funcResultCode'].call(this, val, privateState);
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
            privateState.sellAmount = value ? (value["sellAmount"] ? value["sellAmount"] : null) : null;
            privateState.buyAmount = value ? (value["buyAmount"] ? value["buyAmount"] : null) : null;
            privateState.sellCurrency = value ? (value["sellCurrency"] ? value["sellCurrency"] : null) : null;
            privateState.buyCurrency = value ? (value["buyCurrency"] ? value["buyCurrency"] : null) : null;
            privateState.ISINCode = value ? (value["ISINCode"] ? value["ISINCode"] : null) : null;
            privateState.marketPrice = value ? (value["marketPrice"] ? value["marketPrice"] : null) : null;
            privateState.order = value ? (value["order"] ? value["order"] : null) : null;
            privateState.quantity = value ? (value["quantity"] ? value["quantity"] : null) : null;
            privateState.orderType = value ? (value["orderType"] ? value["orderType"] : null) : null;
            privateState.stopLoss = value ? (value["stopLoss"] ? value["stopLoss"] : null) : null;
            privateState.stopPrice = value ? (value["stopPrice"] ? value["stopPrice"] : null) : null;
            privateState.limitPrice = value ? (value["limitPrice"] ? value["limitPrice"] : null) : null;
            privateState.validity = value ? (value["validity"] ? value["validity"] : null) : null;
            privateState.netAmount = value ? (value["netAmount"] ? value["netAmount"] : null) : null;
            privateState.portfolioId = value ? (value["portfolioId"] ? value["portfolioId"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.stockExchange = value ? (value["stockExchange"] ? value["stockExchange"] : null) : null;
            privateState.tradeCurrency = value ? (value["tradeCurrency"] ? value["tradeCurrency"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.price = value ? (value["price"] ? value["price"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.validate_only = value ? (value["validate_only"] ? value["validate_only"] : null) : null;
            privateState.calculateCharges = value ? (value["calculateCharges"] ? value["calculateCharges"] : null) : null;
            privateState.dealStatus = value ? (value["dealStatus"] ? value["dealStatus"] : null) : null;
            privateState.caseCode = value ? (value["caseCode"] ? value["caseCode"] : null) : null;
            privateState.orderTypeCode = value ? (value["orderTypeCode"] ? value["orderTypeCode"] : null) : null;
            privateState.reasonC = value ? (value["reasonC"] ? value["reasonC"] : null) : null;
            privateState.targetNatureE = value ? (value["targetNatureE"] ? value["targetNatureE"] : null) : null;
            privateState.assetType = value ? (value["assetType"] ? value["assetType"] : null) : null;
            privateState.funcResultCode = value ? (value["funcResultCode"] ? value["funcResultCode"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Order);

    //Create new class level validator object
    BaseModel.Validator.call(Order);

    var registerValidatorBackup = Order.registerValidator;

    Order.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Order.isValid(this, propName, val)) {
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
    //For Operation 'cancelSecurityOrder' with service id 'cancelSecurityOrder9809'
     Order.cancelSecurityOrder = function(params, onCompletion){
        return Order.customVerb('cancelSecurityOrder', params, onCompletion);
     };

    //For Operation 'createSecurityOrder' with service id 'createSecurityOrder8058'
     Order.createSecurityOrder = function(params, onCompletion){
        return Order.customVerb('createSecurityOrder', params, onCompletion);
     };

    //For Operation 'modifySecurityOrder' with service id 'modifySecurityOrder7519'
     Order.modifySecurityOrder = function(params, onCompletion){
        return Order.customVerb('modifySecurityOrder', params, onCompletion);
     };

    var relations = [];

    Order.relations = relations;

    Order.prototype.isValid = function() {
        return Order.isValid(this);
    };

    Order.prototype.objModelName = "Order";
    Order.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Order.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "Order", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Order.clone = function(objectToClone) {
        var clonedObj = new Order();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Order;
});