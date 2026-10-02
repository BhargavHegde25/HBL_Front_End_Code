/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "PortfolioDetails", "objectService" : "PortfolioServicing"};

    var setterFunctions = {
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        description: function(val, state) {
            context["field"] = "description";
            context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
            state['description'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        holdingsType: function(val, state) {
            context["field"] = "holdingsType";
            context["metadata"] = (objectMetadata ? objectMetadata["holdingsType"] : null);
            state['holdingsType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        quantity: function(val, state) {
            context["field"] = "quantity";
            context["metadata"] = (objectMetadata ? objectMetadata["quantity"] : null);
            state['quantity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketPrice: function(val, state) {
            context["field"] = "marketPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["marketPrice"] : null);
            state['marketPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        costPrice: function(val, state) {
            context["field"] = "costPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["costPrice"] : null);
            state['costPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketValue: function(val, state) {
            context["field"] = "marketValue";
            context["metadata"] = (objectMetadata ? objectMetadata["marketValue"] : null);
            state['marketValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unrealPLMkt: function(val, state) {
            context["field"] = "unrealPLMkt";
            context["metadata"] = (objectMetadata ? objectMetadata["unrealPLMkt"] : null);
            state['unrealPLMkt'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secCCy: function(val, state) {
            context["field"] = "secCCy";
            context["metadata"] = (objectMetadata ? objectMetadata["secCCy"] : null);
            state['secCCy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        navPage: function(val, state) {
            context["field"] = "navPage";
            context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
            state['navPage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ISIN: function(val, state) {
            context["field"] = "ISIN";
            context["metadata"] = (objectMetadata ? objectMetadata["ISIN"] : null);
            state['ISIN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchByInstrumentName: function(val, state) {
            context["field"] = "searchByInstrumentName";
            context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
            state['searchByInstrumentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        holdingsId: function(val, state) {
            context["field"] = "holdingsId";
            context["metadata"] = (objectMetadata ? objectMetadata["holdingsId"] : null);
            state['holdingsId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderType: function(val, state) {
            context["field"] = "orderType";
            context["metadata"] = (objectMetadata ? objectMetadata["orderType"] : null);
            state['orderType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        exchangeRate: function(val, state) {
            context["field"] = "exchangeRate";
            context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
            state['exchangeRate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limitPrice: function(val, state) {
            context["field"] = "limitPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["limitPrice"] : null);
            state['limitPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        netAmount: function(val, state) {
            context["field"] = "netAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["netAmount"] : null);
            state['netAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tradeDate: function(val, state) {
            context["field"] = "tradeDate";
            context["metadata"] = (objectMetadata ? objectMetadata["tradeDate"] : null);
            state['tradeDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fees: function(val, state) {
            context["field"] = "fees";
            context["metadata"] = (objectMetadata ? objectMetadata["fees"] : null);
            state['fees'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        valueDate: function(val, state) {
            context["field"] = "valueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["valueDate"] : null);
            state['valueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceCurrency: function(val, state) {
            context["field"] = "referenceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrency"] : null);
            state['referenceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        startDate: function(val, state) {
            context["field"] = "startDate";
            context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
            state['startDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        endDate: function(val, state) {
            context["field"] = "endDate";
            context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
            state['endDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentId: function(val, state) {
            context["field"] = "instrumentId";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
            state['instrumentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RICCode: function(val, state) {
            context["field"] = "RICCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
            state['RICCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentCurrency: function(val, state) {
            context["field"] = "instrumentCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentCurrency"] : null);
            state['instrumentCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentAmount: function(val, state) {
            context["field"] = "instrumentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentAmount"] : null);
            state['instrumentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        total: function(val, state) {
            context["field"] = "total";
            context["metadata"] = (objectMetadata ? objectMetadata["total"] : null);
            state['total'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortType: function(val, state) {
            context["field"] = "sortType";
            context["metadata"] = (objectMetadata ? objectMetadata["sortType"] : null);
            state['sortType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fieldOrder: function(val, state) {
            context["field"] = "fieldOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["fieldOrder"] : null);
            state['fieldOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        limit: function(val, state) {
            context["field"] = "limit";
            context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
            state['limit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        offset: function(val, state) {
            context["field"] = "offset";
            context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
            state['offset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortOrder: function(val, state) {
            context["field"] = "sortOrder";
            context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
            state['sortOrder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageSize: function(val, state) {
            context["field"] = "pageSize";
            context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
            state['pageSize'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pageOffset: function(val, state) {
            context["field"] = "pageOffset";
            context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
            state['pageOffset'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountIds: function(val, state) {
            context["field"] = "accountIds";
            context["metadata"] = (objectMetadata ? objectMetadata["accountIds"] : null);
            state['accountIds'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentType: function(val, state) {
            context["field"] = "instrumentType";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentType"] : null);
            state['instrumentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        graphDuration: function(val, state) {
            context["field"] = "graphDuration";
            context["metadata"] = (objectMetadata ? objectMetadata["graphDuration"] : null);
            state['graphDuration'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unRealizedPLAmount: function(val, state) {
            context["field"] = "unRealizedPLAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLAmount"] : null);
            state['unRealizedPLAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        todayPLAmount: function(val, state) {
            context["field"] = "todayPLAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["todayPLAmount"] : null);
            state['todayPLAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        stopPrice: function(val, state) {
            context["field"] = "stopPrice";
            context["metadata"] = (objectMetadata ? objectMetadata["stopPrice"] : null);
            state['stopPrice'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unRealizedPLPercentage: function(val, state) {
            context["field"] = "unRealizedPLPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLPercentage"] : null);
            state['unRealizedPLPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        todayPLPercentage: function(val, state) {
            context["field"] = "todayPLPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["todayPLPercentage"] : null);
            state['todayPLPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        weightPercentage: function(val, state) {
            context["field"] = "weightPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["weightPercentage"] : null);
            state['weightPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balance: function(val, state) {
            context["field"] = "balance";
            context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
            state['balance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCashBalanceCurrency: function(val, state) {
            context["field"] = "totalCashBalanceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalanceCurrency"] : null);
            state['totalCashBalanceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCashBalance: function(val, state) {
            context["field"] = "totalCashBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalance"] : null);
            state['totalCashBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketValPOS: function(val, state) {
            context["field"] = "marketValPOS";
            context["metadata"] = (objectMetadata ? objectMetadata["marketValPOS"] : null);
            state['marketValPOS'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unrealizedProfitLossSecCcy: function(val, state) {
            context["field"] = "unrealizedProfitLossSecCcy";
            context["metadata"] = (objectMetadata ? objectMetadata["unrealizedProfitLossSecCcy"] : null);
            state['unrealizedProfitLossSecCcy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceCurrencyValue: function(val, state) {
            context["field"] = "referenceCurrencyValue";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrencyValue"] : null);
            state['referenceCurrencyValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketValueinsecCCy: function(val, state) {
            context["field"] = "marketValueinsecCCy";
            context["metadata"] = (objectMetadata ? objectMetadata["marketValueinsecCCy"] : null);
            state['marketValueinsecCCy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        price: function(val, state) {
            context["field"] = "price";
            context["metadata"] = (objectMetadata ? objectMetadata["price"] : null);
            state['price'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        feesCurrency: function(val, state) {
            context["field"] = "feesCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["feesCurrency"] : null);
            state['feesCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        quantityWithoutComma: function(val, state) {
            context["field"] = "quantityWithoutComma";
            context["metadata"] = (objectMetadata ? objectMetadata["quantityWithoutComma"] : null);
            state['quantityWithoutComma'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portfolioServiceType: function(val, state) {
            context["field"] = "portfolioServiceType";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioServiceType"] : null);
            state['portfolioServiceType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        healthStatus: function(val, state) {
            context["field"] = "healthStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["healthStatus"] : null);
            state['healthStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        healthParameter: function(val, state) {
            context["field"] = "healthParameter";
            context["metadata"] = (objectMetadata ? objectMetadata["healthParameter"] : null);
            state['healthParameter'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function PortfolioDetails(defaultValues) {
        var privateState = {};
        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "description";
        context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
        privateState.description = defaultValues ?
            (defaultValues["description"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["description"], context) :
                null) :
            null;

        context["field"] = "holdingsType";
        context["metadata"] = (objectMetadata ? objectMetadata["holdingsType"] : null);
        privateState.holdingsType = defaultValues ?
            (defaultValues["holdingsType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["holdingsType"], context) :
                null) :
            null;

        context["field"] = "quantity";
        context["metadata"] = (objectMetadata ? objectMetadata["quantity"] : null);
        privateState.quantity = defaultValues ?
            (defaultValues["quantity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["quantity"], context) :
                null) :
            null;

        context["field"] = "marketPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["marketPrice"] : null);
        privateState.marketPrice = defaultValues ?
            (defaultValues["marketPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketPrice"], context) :
                null) :
            null;

        context["field"] = "costPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["costPrice"] : null);
        privateState.costPrice = defaultValues ?
            (defaultValues["costPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["costPrice"], context) :
                null) :
            null;

        context["field"] = "marketValue";
        context["metadata"] = (objectMetadata ? objectMetadata["marketValue"] : null);
        privateState.marketValue = defaultValues ?
            (defaultValues["marketValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketValue"], context) :
                null) :
            null;

        context["field"] = "unrealPLMkt";
        context["metadata"] = (objectMetadata ? objectMetadata["unrealPLMkt"] : null);
        privateState.unrealPLMkt = defaultValues ?
            (defaultValues["unrealPLMkt"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unrealPLMkt"], context) :
                null) :
            null;

        context["field"] = "secCCy";
        context["metadata"] = (objectMetadata ? objectMetadata["secCCy"] : null);
        privateState.secCCy = defaultValues ?
            (defaultValues["secCCy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secCCy"], context) :
                null) :
            null;

        context["field"] = "navPage";
        context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
        privateState.navPage = defaultValues ?
            (defaultValues["navPage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["navPage"], context) :
                null) :
            null;

        context["field"] = "ISIN";
        context["metadata"] = (objectMetadata ? objectMetadata["ISIN"] : null);
        privateState.ISIN = defaultValues ?
            (defaultValues["ISIN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ISIN"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
                null) :
            null;

        context["field"] = "searchByInstrumentName";
        context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
        privateState.searchByInstrumentName = defaultValues ?
            (defaultValues["searchByInstrumentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchByInstrumentName"], context) :
                null) :
            null;

        context["field"] = "holdingsId";
        context["metadata"] = (objectMetadata ? objectMetadata["holdingsId"] : null);
        privateState.holdingsId = defaultValues ?
            (defaultValues["holdingsId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["holdingsId"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "orderType";
        context["metadata"] = (objectMetadata ? objectMetadata["orderType"] : null);
        privateState.orderType = defaultValues ?
            (defaultValues["orderType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderType"], context) :
                null) :
            null;

        context["field"] = "exchangeRate";
        context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
        privateState.exchangeRate = defaultValues ?
            (defaultValues["exchangeRate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["exchangeRate"], context) :
                null) :
            null;

        context["field"] = "limitPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["limitPrice"] : null);
        privateState.limitPrice = defaultValues ?
            (defaultValues["limitPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limitPrice"], context) :
                null) :
            null;

        context["field"] = "netAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["netAmount"] : null);
        privateState.netAmount = defaultValues ?
            (defaultValues["netAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["netAmount"], context) :
                null) :
            null;

        context["field"] = "tradeDate";
        context["metadata"] = (objectMetadata ? objectMetadata["tradeDate"] : null);
        privateState.tradeDate = defaultValues ?
            (defaultValues["tradeDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tradeDate"], context) :
                null) :
            null;

        context["field"] = "fees";
        context["metadata"] = (objectMetadata ? objectMetadata["fees"] : null);
        privateState.fees = defaultValues ?
            (defaultValues["fees"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fees"], context) :
                null) :
            null;

        context["field"] = "valueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["valueDate"] : null);
        privateState.valueDate = defaultValues ?
            (defaultValues["valueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["valueDate"], context) :
                null) :
            null;

        context["field"] = "referenceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrency"] : null);
        privateState.referenceCurrency = defaultValues ?
            (defaultValues["referenceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceCurrency"], context) :
                null) :
            null;

        context["field"] = "startDate";
        context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
        privateState.startDate = defaultValues ?
            (defaultValues["startDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["startDate"], context) :
                null) :
            null;

        context["field"] = "endDate";
        context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
        privateState.endDate = defaultValues ?
            (defaultValues["endDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["endDate"], context) :
                null) :
            null;

        context["field"] = "instrumentId";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
        privateState.instrumentId = defaultValues ?
            (defaultValues["instrumentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentId"], context) :
                null) :
            null;

        context["field"] = "RICCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
        privateState.RICCode = defaultValues ?
            (defaultValues["RICCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RICCode"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "instrumentCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentCurrency"] : null);
        privateState.instrumentCurrency = defaultValues ?
            (defaultValues["instrumentCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentCurrency"], context) :
                null) :
            null;

        context["field"] = "instrumentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentAmount"] : null);
        privateState.instrumentAmount = defaultValues ?
            (defaultValues["instrumentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentAmount"], context) :
                null) :
            null;

        context["field"] = "total";
        context["metadata"] = (objectMetadata ? objectMetadata["total"] : null);
        privateState.total = defaultValues ?
            (defaultValues["total"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["total"], context) :
                null) :
            null;

        context["field"] = "sortType";
        context["metadata"] = (objectMetadata ? objectMetadata["sortType"] : null);
        privateState.sortType = defaultValues ?
            (defaultValues["sortType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortType"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "fieldOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["fieldOrder"] : null);
        privateState.fieldOrder = defaultValues ?
            (defaultValues["fieldOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fieldOrder"], context) :
                null) :
            null;

        context["field"] = "limit";
        context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
        privateState.limit = defaultValues ?
            (defaultValues["limit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["limit"], context) :
                null) :
            null;

        context["field"] = "offset";
        context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
        privateState.offset = defaultValues ?
            (defaultValues["offset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["offset"], context) :
                null) :
            null;

        context["field"] = "sortOrder";
        context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
        privateState.sortOrder = defaultValues ?
            (defaultValues["sortOrder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortOrder"], context) :
                null) :
            null;

        context["field"] = "pageSize";
        context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
        privateState.pageSize = defaultValues ?
            (defaultValues["pageSize"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageSize"], context) :
                null) :
            null;

        context["field"] = "pageOffset";
        context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
        privateState.pageOffset = defaultValues ?
            (defaultValues["pageOffset"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pageOffset"], context) :
                null) :
            null;

        context["field"] = "accountIds";
        context["metadata"] = (objectMetadata ? objectMetadata["accountIds"] : null);
        privateState.accountIds = defaultValues ?
            (defaultValues["accountIds"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountIds"], context) :
                null) :
            null;

        context["field"] = "instrumentType";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentType"] : null);
        privateState.instrumentType = defaultValues ?
            (defaultValues["instrumentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentType"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "graphDuration";
        context["metadata"] = (objectMetadata ? objectMetadata["graphDuration"] : null);
        privateState.graphDuration = defaultValues ?
            (defaultValues["graphDuration"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["graphDuration"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "unRealizedPLAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLAmount"] : null);
        privateState.unRealizedPLAmount = defaultValues ?
            (defaultValues["unRealizedPLAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unRealizedPLAmount"], context) :
                null) :
            null;

        context["field"] = "todayPLAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["todayPLAmount"] : null);
        privateState.todayPLAmount = defaultValues ?
            (defaultValues["todayPLAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["todayPLAmount"], context) :
                null) :
            null;

        context["field"] = "stopPrice";
        context["metadata"] = (objectMetadata ? objectMetadata["stopPrice"] : null);
        privateState.stopPrice = defaultValues ?
            (defaultValues["stopPrice"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["stopPrice"], context) :
                null) :
            null;

        context["field"] = "unRealizedPLPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLPercentage"] : null);
        privateState.unRealizedPLPercentage = defaultValues ?
            (defaultValues["unRealizedPLPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unRealizedPLPercentage"], context) :
                null) :
            null;

        context["field"] = "todayPLPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["todayPLPercentage"] : null);
        privateState.todayPLPercentage = defaultValues ?
            (defaultValues["todayPLPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["todayPLPercentage"], context) :
                null) :
            null;

        context["field"] = "weightPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["weightPercentage"] : null);
        privateState.weightPercentage = defaultValues ?
            (defaultValues["weightPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["weightPercentage"], context) :
                null) :
            null;

        context["field"] = "balance";
        context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
        privateState.balance = defaultValues ?
            (defaultValues["balance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balance"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "totalCashBalanceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalanceCurrency"] : null);
        privateState.totalCashBalanceCurrency = defaultValues ?
            (defaultValues["totalCashBalanceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCashBalanceCurrency"], context) :
                null) :
            null;

        context["field"] = "totalCashBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalance"] : null);
        privateState.totalCashBalance = defaultValues ?
            (defaultValues["totalCashBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCashBalance"], context) :
                null) :
            null;

        context["field"] = "marketValPOS";
        context["metadata"] = (objectMetadata ? objectMetadata["marketValPOS"] : null);
        privateState.marketValPOS = defaultValues ?
            (defaultValues["marketValPOS"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketValPOS"], context) :
                null) :
            null;

        context["field"] = "unrealizedProfitLossSecCcy";
        context["metadata"] = (objectMetadata ? objectMetadata["unrealizedProfitLossSecCcy"] : null);
        privateState.unrealizedProfitLossSecCcy = defaultValues ?
            (defaultValues["unrealizedProfitLossSecCcy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unrealizedProfitLossSecCcy"], context) :
                null) :
            null;

        context["field"] = "referenceCurrencyValue";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrencyValue"] : null);
        privateState.referenceCurrencyValue = defaultValues ?
            (defaultValues["referenceCurrencyValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceCurrencyValue"], context) :
                null) :
            null;

        context["field"] = "marketValueinsecCCy";
        context["metadata"] = (objectMetadata ? objectMetadata["marketValueinsecCCy"] : null);
        privateState.marketValueinsecCCy = defaultValues ?
            (defaultValues["marketValueinsecCCy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketValueinsecCCy"], context) :
                null) :
            null;

        context["field"] = "price";
        context["metadata"] = (objectMetadata ? objectMetadata["price"] : null);
        privateState.price = defaultValues ?
            (defaultValues["price"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["price"], context) :
                null) :
            null;

        context["field"] = "feesCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["feesCurrency"] : null);
        privateState.feesCurrency = defaultValues ?
            (defaultValues["feesCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["feesCurrency"], context) :
                null) :
            null;

        context["field"] = "quantityWithoutComma";
        context["metadata"] = (objectMetadata ? objectMetadata["quantityWithoutComma"] : null);
        privateState.quantityWithoutComma = defaultValues ?
            (defaultValues["quantityWithoutComma"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["quantityWithoutComma"], context) :
                null) :
            null;

        context["field"] = "portfolioServiceType";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioServiceType"] : null);
        privateState.portfolioServiceType = defaultValues ?
            (defaultValues["portfolioServiceType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioServiceType"], context) :
                null) :
            null;

        context["field"] = "healthStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["healthStatus"] : null);
        privateState.healthStatus = defaultValues ?
            (defaultValues["healthStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["healthStatus"], context) :
                null) :
            null;

        context["field"] = "healthParameter";
        context["metadata"] = (objectMetadata ? objectMetadata["healthParameter"] : null);
        privateState.healthParameter = defaultValues ?
            (defaultValues["healthParameter"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["healthParameter"], context) :
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
            "description": {
                get: function() {
                    context["field"] = "description";
                    context["metadata"] = (objectMetadata ? objectMetadata["description"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.description, context);
                },
                set: function(val) {
                    setterFunctions['description'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "holdingsType": {
                get: function() {
                    context["field"] = "holdingsType";
                    context["metadata"] = (objectMetadata ? objectMetadata["holdingsType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.holdingsType, context);
                },
                set: function(val) {
                    setterFunctions['holdingsType'].call(this, val, privateState);
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
            "costPrice": {
                get: function() {
                    context["field"] = "costPrice";
                    context["metadata"] = (objectMetadata ? objectMetadata["costPrice"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.costPrice, context);
                },
                set: function(val) {
                    setterFunctions['costPrice'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "marketValue": {
                get: function() {
                    context["field"] = "marketValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["marketValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.marketValue, context);
                },
                set: function(val) {
                    setterFunctions['marketValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unrealPLMkt": {
                get: function() {
                    context["field"] = "unrealPLMkt";
                    context["metadata"] = (objectMetadata ? objectMetadata["unrealPLMkt"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unrealPLMkt, context);
                },
                set: function(val) {
                    setterFunctions['unrealPLMkt'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secCCy": {
                get: function() {
                    context["field"] = "secCCy";
                    context["metadata"] = (objectMetadata ? objectMetadata["secCCy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secCCy, context);
                },
                set: function(val) {
                    setterFunctions['secCCy'].call(this, val, privateState);
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
            "ISIN": {
                get: function() {
                    context["field"] = "ISIN";
                    context["metadata"] = (objectMetadata ? objectMetadata["ISIN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ISIN, context);
                },
                set: function(val) {
                    setterFunctions['ISIN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortBy": {
                get: function() {
                    context["field"] = "sortBy";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortBy, context);
                },
                set: function(val) {
                    setterFunctions['sortBy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "searchByInstrumentName": {
                get: function() {
                    context["field"] = "searchByInstrumentName";
                    context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.searchByInstrumentName, context);
                },
                set: function(val) {
                    setterFunctions['searchByInstrumentName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "holdingsId": {
                get: function() {
                    context["field"] = "holdingsId";
                    context["metadata"] = (objectMetadata ? objectMetadata["holdingsId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.holdingsId, context);
                },
                set: function(val) {
                    setterFunctions['holdingsId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionId": {
                get: function() {
                    context["field"] = "transactionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionId, context);
                },
                set: function(val) {
                    setterFunctions['transactionId'].call(this, val, privateState);
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
            "exchangeRate": {
                get: function() {
                    context["field"] = "exchangeRate";
                    context["metadata"] = (objectMetadata ? objectMetadata["exchangeRate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.exchangeRate, context);
                },
                set: function(val) {
                    setterFunctions['exchangeRate'].call(this, val, privateState);
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
            "tradeDate": {
                get: function() {
                    context["field"] = "tradeDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["tradeDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tradeDate, context);
                },
                set: function(val) {
                    setterFunctions['tradeDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fees": {
                get: function() {
                    context["field"] = "fees";
                    context["metadata"] = (objectMetadata ? objectMetadata["fees"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fees, context);
                },
                set: function(val) {
                    setterFunctions['fees'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "valueDate": {
                get: function() {
                    context["field"] = "valueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["valueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.valueDate, context);
                },
                set: function(val) {
                    setterFunctions['valueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceCurrency": {
                get: function() {
                    context["field"] = "referenceCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceCurrency, context);
                },
                set: function(val) {
                    setterFunctions['referenceCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "startDate": {
                get: function() {
                    context["field"] = "startDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["startDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.startDate, context);
                },
                set: function(val) {
                    setterFunctions['startDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "endDate": {
                get: function() {
                    context["field"] = "endDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["endDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.endDate, context);
                },
                set: function(val) {
                    setterFunctions['endDate'].call(this, val, privateState);
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
            "instrumentCurrency": {
                get: function() {
                    context["field"] = "instrumentCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["instrumentCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instrumentCurrency, context);
                },
                set: function(val) {
                    setterFunctions['instrumentCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "instrumentAmount": {
                get: function() {
                    context["field"] = "instrumentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["instrumentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instrumentAmount, context);
                },
                set: function(val) {
                    setterFunctions['instrumentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "total": {
                get: function() {
                    context["field"] = "total";
                    context["metadata"] = (objectMetadata ? objectMetadata["total"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.total, context);
                },
                set: function(val) {
                    setterFunctions['total'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortType": {
                get: function() {
                    context["field"] = "sortType";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortType, context);
                },
                set: function(val) {
                    setterFunctions['sortType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "userId": {
                get: function() {
                    context["field"] = "userId";
                    context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userId, context);
                },
                set: function(val) {
                    setterFunctions['userId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "fieldOrder": {
                get: function() {
                    context["field"] = "fieldOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["fieldOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fieldOrder, context);
                },
                set: function(val) {
                    setterFunctions['fieldOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "limit": {
                get: function() {
                    context["field"] = "limit";
                    context["metadata"] = (objectMetadata ? objectMetadata["limit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.limit, context);
                },
                set: function(val) {
                    setterFunctions['limit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "offset": {
                get: function() {
                    context["field"] = "offset";
                    context["metadata"] = (objectMetadata ? objectMetadata["offset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.offset, context);
                },
                set: function(val) {
                    setterFunctions['offset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sortOrder": {
                get: function() {
                    context["field"] = "sortOrder";
                    context["metadata"] = (objectMetadata ? objectMetadata["sortOrder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sortOrder, context);
                },
                set: function(val) {
                    setterFunctions['sortOrder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageSize": {
                get: function() {
                    context["field"] = "pageSize";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageSize"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageSize, context);
                },
                set: function(val) {
                    setterFunctions['pageSize'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pageOffset": {
                get: function() {
                    context["field"] = "pageOffset";
                    context["metadata"] = (objectMetadata ? objectMetadata["pageOffset"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pageOffset, context);
                },
                set: function(val) {
                    setterFunctions['pageOffset'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountIds": {
                get: function() {
                    context["field"] = "accountIds";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountIds"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountIds, context);
                },
                set: function(val) {
                    setterFunctions['accountIds'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "instrumentType": {
                get: function() {
                    context["field"] = "instrumentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["instrumentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.instrumentType, context);
                },
                set: function(val) {
                    setterFunctions['instrumentType'].call(this, val, privateState);
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
            "graphDuration": {
                get: function() {
                    context["field"] = "graphDuration";
                    context["metadata"] = (objectMetadata ? objectMetadata["graphDuration"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.graphDuration, context);
                },
                set: function(val) {
                    setterFunctions['graphDuration'].call(this, val, privateState);
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
            "unRealizedPLAmount": {
                get: function() {
                    context["field"] = "unRealizedPLAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unRealizedPLAmount, context);
                },
                set: function(val) {
                    setterFunctions['unRealizedPLAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "todayPLAmount": {
                get: function() {
                    context["field"] = "todayPLAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["todayPLAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.todayPLAmount, context);
                },
                set: function(val) {
                    setterFunctions['todayPLAmount'].call(this, val, privateState);
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
            "unRealizedPLPercentage": {
                get: function() {
                    context["field"] = "unRealizedPLPercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLPercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unRealizedPLPercentage, context);
                },
                set: function(val) {
                    setterFunctions['unRealizedPLPercentage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "todayPLPercentage": {
                get: function() {
                    context["field"] = "todayPLPercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["todayPLPercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.todayPLPercentage, context);
                },
                set: function(val) {
                    setterFunctions['todayPLPercentage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "weightPercentage": {
                get: function() {
                    context["field"] = "weightPercentage";
                    context["metadata"] = (objectMetadata ? objectMetadata["weightPercentage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.weightPercentage, context);
                },
                set: function(val) {
                    setterFunctions['weightPercentage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "balance": {
                get: function() {
                    context["field"] = "balance";
                    context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.balance, context);
                },
                set: function(val) {
                    setterFunctions['balance'].call(this, val, privateState);
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
            "totalCashBalanceCurrency": {
                get: function() {
                    context["field"] = "totalCashBalanceCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalanceCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCashBalanceCurrency, context);
                },
                set: function(val) {
                    setterFunctions['totalCashBalanceCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "totalCashBalance": {
                get: function() {
                    context["field"] = "totalCashBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCashBalance, context);
                },
                set: function(val) {
                    setterFunctions['totalCashBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "marketValPOS": {
                get: function() {
                    context["field"] = "marketValPOS";
                    context["metadata"] = (objectMetadata ? objectMetadata["marketValPOS"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.marketValPOS, context);
                },
                set: function(val) {
                    setterFunctions['marketValPOS'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unrealizedProfitLossSecCcy": {
                get: function() {
                    context["field"] = "unrealizedProfitLossSecCcy";
                    context["metadata"] = (objectMetadata ? objectMetadata["unrealizedProfitLossSecCcy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unrealizedProfitLossSecCcy, context);
                },
                set: function(val) {
                    setterFunctions['unrealizedProfitLossSecCcy'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceCurrencyValue": {
                get: function() {
                    context["field"] = "referenceCurrencyValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrencyValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceCurrencyValue, context);
                },
                set: function(val) {
                    setterFunctions['referenceCurrencyValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "marketValueinsecCCy": {
                get: function() {
                    context["field"] = "marketValueinsecCCy";
                    context["metadata"] = (objectMetadata ? objectMetadata["marketValueinsecCCy"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.marketValueinsecCCy, context);
                },
                set: function(val) {
                    setterFunctions['marketValueinsecCCy'].call(this, val, privateState);
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
            "feesCurrency": {
                get: function() {
                    context["field"] = "feesCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["feesCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.feesCurrency, context);
                },
                set: function(val) {
                    setterFunctions['feesCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "quantityWithoutComma": {
                get: function() {
                    context["field"] = "quantityWithoutComma";
                    context["metadata"] = (objectMetadata ? objectMetadata["quantityWithoutComma"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.quantityWithoutComma, context);
                },
                set: function(val) {
                    setterFunctions['quantityWithoutComma'].call(this, val, privateState);
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
            "healthStatus": {
                get: function() {
                    context["field"] = "healthStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["healthStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.healthStatus, context);
                },
                set: function(val) {
                    setterFunctions['healthStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "healthParameter": {
                get: function() {
                    context["field"] = "healthParameter";
                    context["metadata"] = (objectMetadata ? objectMetadata["healthParameter"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.healthParameter, context);
                },
                set: function(val) {
                    setterFunctions['healthParameter'].call(this, val, privateState);
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
            privateState.description = value ? (value["description"] ? value["description"] : null) : null;
            privateState.holdingsType = value ? (value["holdingsType"] ? value["holdingsType"] : null) : null;
            privateState.quantity = value ? (value["quantity"] ? value["quantity"] : null) : null;
            privateState.marketPrice = value ? (value["marketPrice"] ? value["marketPrice"] : null) : null;
            privateState.costPrice = value ? (value["costPrice"] ? value["costPrice"] : null) : null;
            privateState.marketValue = value ? (value["marketValue"] ? value["marketValue"] : null) : null;
            privateState.unrealPLMkt = value ? (value["unrealPLMkt"] ? value["unrealPLMkt"] : null) : null;
            privateState.secCCy = value ? (value["secCCy"] ? value["secCCy"] : null) : null;
            privateState.navPage = value ? (value["navPage"] ? value["navPage"] : null) : null;
            privateState.ISIN = value ? (value["ISIN"] ? value["ISIN"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.searchByInstrumentName = value ? (value["searchByInstrumentName"] ? value["searchByInstrumentName"] : null) : null;
            privateState.holdingsId = value ? (value["holdingsId"] ? value["holdingsId"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.orderType = value ? (value["orderType"] ? value["orderType"] : null) : null;
            privateState.exchangeRate = value ? (value["exchangeRate"] ? value["exchangeRate"] : null) : null;
            privateState.limitPrice = value ? (value["limitPrice"] ? value["limitPrice"] : null) : null;
            privateState.netAmount = value ? (value["netAmount"] ? value["netAmount"] : null) : null;
            privateState.tradeDate = value ? (value["tradeDate"] ? value["tradeDate"] : null) : null;
            privateState.fees = value ? (value["fees"] ? value["fees"] : null) : null;
            privateState.valueDate = value ? (value["valueDate"] ? value["valueDate"] : null) : null;
            privateState.referenceCurrency = value ? (value["referenceCurrency"] ? value["referenceCurrency"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.endDate = value ? (value["endDate"] ? value["endDate"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.RICCode = value ? (value["RICCode"] ? value["RICCode"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.instrumentCurrency = value ? (value["instrumentCurrency"] ? value["instrumentCurrency"] : null) : null;
            privateState.instrumentAmount = value ? (value["instrumentAmount"] ? value["instrumentAmount"] : null) : null;
            privateState.total = value ? (value["total"] ? value["total"] : null) : null;
            privateState.sortType = value ? (value["sortType"] ? value["sortType"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.fieldOrder = value ? (value["fieldOrder"] ? value["fieldOrder"] : null) : null;
            privateState.limit = value ? (value["limit"] ? value["limit"] : null) : null;
            privateState.offset = value ? (value["offset"] ? value["offset"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.accountIds = value ? (value["accountIds"] ? value["accountIds"] : null) : null;
            privateState.instrumentType = value ? (value["instrumentType"] ? value["instrumentType"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.graphDuration = value ? (value["graphDuration"] ? value["graphDuration"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.unRealizedPLAmount = value ? (value["unRealizedPLAmount"] ? value["unRealizedPLAmount"] : null) : null;
            privateState.todayPLAmount = value ? (value["todayPLAmount"] ? value["todayPLAmount"] : null) : null;
            privateState.stopPrice = value ? (value["stopPrice"] ? value["stopPrice"] : null) : null;
            privateState.unRealizedPLPercentage = value ? (value["unRealizedPLPercentage"] ? value["unRealizedPLPercentage"] : null) : null;
            privateState.todayPLPercentage = value ? (value["todayPLPercentage"] ? value["todayPLPercentage"] : null) : null;
            privateState.weightPercentage = value ? (value["weightPercentage"] ? value["weightPercentage"] : null) : null;
            privateState.balance = value ? (value["balance"] ? value["balance"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.totalCashBalanceCurrency = value ? (value["totalCashBalanceCurrency"] ? value["totalCashBalanceCurrency"] : null) : null;
            privateState.totalCashBalance = value ? (value["totalCashBalance"] ? value["totalCashBalance"] : null) : null;
            privateState.marketValPOS = value ? (value["marketValPOS"] ? value["marketValPOS"] : null) : null;
            privateState.unrealizedProfitLossSecCcy = value ? (value["unrealizedProfitLossSecCcy"] ? value["unrealizedProfitLossSecCcy"] : null) : null;
            privateState.referenceCurrencyValue = value ? (value["referenceCurrencyValue"] ? value["referenceCurrencyValue"] : null) : null;
            privateState.marketValueinsecCCy = value ? (value["marketValueinsecCCy"] ? value["marketValueinsecCCy"] : null) : null;
            privateState.price = value ? (value["price"] ? value["price"] : null) : null;
            privateState.feesCurrency = value ? (value["feesCurrency"] ? value["feesCurrency"] : null) : null;
            privateState.quantityWithoutComma = value ? (value["quantityWithoutComma"] ? value["quantityWithoutComma"] : null) : null;
            privateState.portfolioServiceType = value ? (value["portfolioServiceType"] ? value["portfolioServiceType"] : null) : null;
            privateState.healthStatus = value ? (value["healthStatus"] ? value["healthStatus"] : null) : null;
            privateState.healthParameter = value ? (value["healthParameter"] ? value["healthParameter"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(PortfolioDetails);

    //Create new class level validator object
    BaseModel.Validator.call(PortfolioDetails);

    var registerValidatorBackup = PortfolioDetails.registerValidator;

    PortfolioDetails.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(PortfolioDetails.isValid(this, propName, val)) {
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
    //For Operation 'getPortfolioHoldings' with service id 'getPortfolioHoldings9388'
     PortfolioDetails.getPortfolioHoldings = function(params, onCompletion){
        return PortfolioDetails.customVerb('getPortfolioHoldings', params, onCompletion);
     };

    //For Operation 'getFieldsOrder' with service id 'getFieldsOrder6327'
     PortfolioDetails.getFieldsOrder = function(params, onCompletion){
        return PortfolioDetails.customVerb('getFieldsOrder', params, onCompletion);
     };

    //For Operation 'getPortfolioDetails' with service id 'getPortfolioDetails1958'
     PortfolioDetails.getPortfolioDetails = function(params, onCompletion){
        return PortfolioDetails.customVerb('getPortfolioDetails', params, onCompletion);
     };

    //For Operation 'getPortfolioPerformance' with service id 'getPerformance4068'
     PortfolioDetails.getPortfolioPerformance = function(params, onCompletion){
        return PortfolioDetails.customVerb('getPortfolioPerformance', params, onCompletion);
     };

    //For Operation 'updateFieldsOrder' with service id 'updateFieldsOrder6938'
     PortfolioDetails.updateFieldsOrder = function(params, onCompletion){
        return PortfolioDetails.customVerb('updateFieldsOrder', params, onCompletion);
     };

    //For Operation 'getAllocation' with service id 'getAllocation7701'
     PortfolioDetails.getAllocation = function(params, onCompletion){
        return PortfolioDetails.customVerb('getAllocation', params, onCompletion);
     };

    //For Operation 'getAssetAllocation' with service id 'getAssetAllocation8568'
     PortfolioDetails.getAssetAllocation = function(params, onCompletion){
        return PortfolioDetails.customVerb('getAssetAllocation', params, onCompletion);
     };

    //For Operation 'getInstrumentTotal' with service id 'getInstrumentTotal3517'
     PortfolioDetails.getInstrumentTotal = function(params, onCompletion){
        return PortfolioDetails.customVerb('getInstrumentTotal', params, onCompletion);
     };

    //For Operation 'getTransactionDetails' with service id 'getTransactionDetails5041'
     PortfolioDetails.getTransactionDetails = function(params, onCompletion){
        return PortfolioDetails.customVerb('getTransactionDetails', params, onCompletion);
     };

    //For Operation 'getOrdersDetails' with service id 'getOrdersDetails9911'
     PortfolioDetails.getOrdersDetails = function(params, onCompletion){
        return PortfolioDetails.customVerb('getOrdersDetails', params, onCompletion);
     };

    //For Operation 'getCashAccounts' with service id 'getCashAccounts8448'
     PortfolioDetails.getCashAccounts = function(params, onCompletion){
        return PortfolioDetails.customVerb('getCashAccounts', params, onCompletion);
     };

    //For Operation 'getAccountActivity' with service id 'getAccountActivity6968'
     PortfolioDetails.getAccountActivity = function(params, onCompletion){
        return PortfolioDetails.customVerb('getAccountActivity', params, onCompletion);
     };

    var relations = [];

    PortfolioDetails.relations = relations;

    PortfolioDetails.prototype.isValid = function() {
        return PortfolioDetails.isValid(this);
    };

    PortfolioDetails.prototype.objModelName = "PortfolioDetails";
    PortfolioDetails.prototype.objServiceName = "PortfolioServicing";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    PortfolioDetails.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("PortfolioServicing", "PortfolioDetails", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    PortfolioDetails.clone = function(objectToClone) {
        var clonedObj = new PortfolioDetails();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return PortfolioDetails;
});