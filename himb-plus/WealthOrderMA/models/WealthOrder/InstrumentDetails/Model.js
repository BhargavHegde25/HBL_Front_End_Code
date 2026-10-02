/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "InstrumentDetails", "objectService" : "WealthOrder"};

    var setterFunctions = {
        portfolioId: function(val, state) {
            context["field"] = "portfolioId";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
            state['portfolioId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        portfolioName: function(val, state) {
            context["field"] = "portfolioName";
            context["metadata"] = (objectMetadata ? objectMetadata["portfolioName"] : null);
            state['portfolioName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceCurrency: function(val, state) {
            context["field"] = "referenceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrency"] : null);
            state['referenceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        marketValue: function(val, state) {
            context["field"] = "marketValue";
            context["metadata"] = (objectMetadata ? objectMetadata["marketValue"] : null);
            state['marketValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unRealizedPL: function(val, state) {
            context["field"] = "unRealizedPL";
            context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPL"] : null);
            state['unRealizedPL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unRealizedPLAmount: function(val, state) {
            context["field"] = "unRealizedPLAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLAmount"] : null);
            state['unRealizedPLAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unRealizedPLPercentage: function(val, state) {
            context["field"] = "unRealizedPLPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLPercentage"] : null);
            state['unRealizedPLPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        todayPL: function(val, state) {
            context["field"] = "todayPL";
            context["metadata"] = (objectMetadata ? objectMetadata["todayPL"] : null);
            state['todayPL'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        todayPLAmount: function(val, state) {
            context["field"] = "todayPLAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["todayPLAmount"] : null);
            state['todayPLAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        todayPLPercentage: function(val, state) {
            context["field"] = "todayPLPercentage";
            context["metadata"] = (objectMetadata ? objectMetadata["todayPLPercentage"] : null);
            state['todayPLPercentage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        assetGroup: function(val, state) {
            context["field"] = "assetGroup";
            context["metadata"] = (objectMetadata ? objectMetadata["assetGroup"] : null);
            state['assetGroup'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        graphDuration: function(val, state) {
            context["field"] = "graphDuration";
            context["metadata"] = (objectMetadata ? objectMetadata["graphDuration"] : null);
            state['graphDuration'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        navPage: function(val, state) {
            context["field"] = "navPage";
            context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
            state['navPage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCashBalance: function(val, state) {
            context["field"] = "totalCashBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalance"] : null);
            state['totalCashBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency: function(val, state) {
            context["field"] = "currency";
            context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
            state['currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balance: function(val, state) {
            context["field"] = "balance";
            context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
            state['balance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCashBalanceCurrency: function(val, state) {
            context["field"] = "totalCashBalanceCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalanceCurrency"] : null);
            state['totalCashBalanceCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalMarketValue: function(val, state) {
            context["field"] = "totalMarketValue";
            context["metadata"] = (objectMetadata ? objectMetadata["totalMarketValue"] : null);
            state['totalMarketValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TIMESTAMP: function(val, state) {
            context["field"] = "TIMESTAMP";
            context["metadata"] = (objectMetadata ? objectMetadata["TIMESTAMP"] : null);
            state['TIMESTAMP'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AMOUNT: function(val, state) {
            context["field"] = "AMOUNT";
            context["metadata"] = (objectMetadata ? objectMetadata["AMOUNT"] : null);
            state['AMOUNT'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PERCENTAGE: function(val, state) {
            context["field"] = "PERCENTAGE";
            context["metadata"] = (objectMetadata ? objectMetadata["PERCENTAGE"] : null);
            state['PERCENTAGE'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyName: function(val, state) {
            context["field"] = "currencyName";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyName"] : null);
            state['currencyName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        investmentType: function(val, state) {
            context["field"] = "investmentType";
            context["metadata"] = (objectMetadata ? objectMetadata["investmentType"] : null);
            state['investmentType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceCurrencyValue: function(val, state) {
            context["field"] = "referenceCurrencyValue";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrencyValue"] : null);
            state['referenceCurrencyValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ricCodes: function(val, state) {
            context["field"] = "ricCodes";
            context["metadata"] = (objectMetadata ? objectMetadata["ricCodes"] : null);
            state['ricCodes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        searchByInstrumentName: function(val, state) {
            context["field"] = "searchByInstrumentName";
            context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
            state['searchByInstrumentName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sortBy: function(val, state) {
            context["field"] = "sortBy";
            context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
            state['sortBy'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totalCount: function(val, state) {
            context["field"] = "totalCount";
            context["metadata"] = (objectMetadata ? objectMetadata["totalCount"] : null);
            state['totalCount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        instrumentId: function(val, state) {
            context["field"] = "instrumentId";
            context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
            state['instrumentId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        RICCode: function(val, state) {
            context["field"] = "RICCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
            state['RICCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StoryId: function(val, state) {
            context["field"] = "StoryId";
            context["metadata"] = (objectMetadata ? objectMetadata["StoryId"] : null);
            state['StoryId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        application: function(val, state) {
            context["field"] = "application";
            context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
            state['application'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RE: function(val, state) {
            context["field"] = "RE";
            context["metadata"] = (objectMetadata ? objectMetadata["RE"] : null);
            state['RE'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        TN: function(val, state) {
            context["field"] = "TN";
            context["metadata"] = (objectMetadata ? objectMetadata["TN"] : null);
            state['TN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        UR: function(val, state) {
            context["field"] = "UR";
            context["metadata"] = (objectMetadata ? objectMetadata["UR"] : null);
            state['UR'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function InstrumentDetails(defaultValues) {
        var privateState = {};
        context["field"] = "portfolioId";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioId"] : null);
        privateState.portfolioId = defaultValues ?
            (defaultValues["portfolioId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioId"], context) :
                null) :
            null;

        context["field"] = "portfolioName";
        context["metadata"] = (objectMetadata ? objectMetadata["portfolioName"] : null);
        privateState.portfolioName = defaultValues ?
            (defaultValues["portfolioName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["portfolioName"], context) :
                null) :
            null;

        context["field"] = "referenceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrency"] : null);
        privateState.referenceCurrency = defaultValues ?
            (defaultValues["referenceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceCurrency"], context) :
                null) :
            null;

        context["field"] = "marketValue";
        context["metadata"] = (objectMetadata ? objectMetadata["marketValue"] : null);
        privateState.marketValue = defaultValues ?
            (defaultValues["marketValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["marketValue"], context) :
                null) :
            null;

        context["field"] = "unRealizedPL";
        context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPL"] : null);
        privateState.unRealizedPL = defaultValues ?
            (defaultValues["unRealizedPL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unRealizedPL"], context) :
                null) :
            null;

        context["field"] = "unRealizedPLAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLAmount"] : null);
        privateState.unRealizedPLAmount = defaultValues ?
            (defaultValues["unRealizedPLAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unRealizedPLAmount"], context) :
                null) :
            null;

        context["field"] = "unRealizedPLPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPLPercentage"] : null);
        privateState.unRealizedPLPercentage = defaultValues ?
            (defaultValues["unRealizedPLPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unRealizedPLPercentage"], context) :
                null) :
            null;

        context["field"] = "todayPL";
        context["metadata"] = (objectMetadata ? objectMetadata["todayPL"] : null);
        privateState.todayPL = defaultValues ?
            (defaultValues["todayPL"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["todayPL"], context) :
                null) :
            null;

        context["field"] = "todayPLAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["todayPLAmount"] : null);
        privateState.todayPLAmount = defaultValues ?
            (defaultValues["todayPLAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["todayPLAmount"], context) :
                null) :
            null;

        context["field"] = "todayPLPercentage";
        context["metadata"] = (objectMetadata ? objectMetadata["todayPLPercentage"] : null);
        privateState.todayPLPercentage = defaultValues ?
            (defaultValues["todayPLPercentage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["todayPLPercentage"], context) :
                null) :
            null;

        context["field"] = "assetGroup";
        context["metadata"] = (objectMetadata ? objectMetadata["assetGroup"] : null);
        privateState.assetGroup = defaultValues ?
            (defaultValues["assetGroup"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["assetGroup"], context) :
                null) :
            null;

        context["field"] = "graphDuration";
        context["metadata"] = (objectMetadata ? objectMetadata["graphDuration"] : null);
        privateState.graphDuration = defaultValues ?
            (defaultValues["graphDuration"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["graphDuration"], context) :
                null) :
            null;

        context["field"] = "navPage";
        context["metadata"] = (objectMetadata ? objectMetadata["navPage"] : null);
        privateState.navPage = defaultValues ?
            (defaultValues["navPage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["navPage"], context) :
                null) :
            null;

        context["field"] = "totalCashBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalance"] : null);
        privateState.totalCashBalance = defaultValues ?
            (defaultValues["totalCashBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCashBalance"], context) :
                null) :
            null;

        context["field"] = "currency";
        context["metadata"] = (objectMetadata ? objectMetadata["currency"] : null);
        privateState.currency = defaultValues ?
            (defaultValues["currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency"], context) :
                null) :
            null;

        context["field"] = "balance";
        context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
        privateState.balance = defaultValues ?
            (defaultValues["balance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balance"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "totalCashBalanceCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCashBalanceCurrency"] : null);
        privateState.totalCashBalanceCurrency = defaultValues ?
            (defaultValues["totalCashBalanceCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCashBalanceCurrency"], context) :
                null) :
            null;

        context["field"] = "totalMarketValue";
        context["metadata"] = (objectMetadata ? objectMetadata["totalMarketValue"] : null);
        privateState.totalMarketValue = defaultValues ?
            (defaultValues["totalMarketValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalMarketValue"], context) :
                null) :
            null;

        context["field"] = "TIMESTAMP";
        context["metadata"] = (objectMetadata ? objectMetadata["TIMESTAMP"] : null);
        privateState.TIMESTAMP = defaultValues ?
            (defaultValues["TIMESTAMP"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TIMESTAMP"], context) :
                null) :
            null;

        context["field"] = "AMOUNT";
        context["metadata"] = (objectMetadata ? objectMetadata["AMOUNT"] : null);
        privateState.AMOUNT = defaultValues ?
            (defaultValues["AMOUNT"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AMOUNT"], context) :
                null) :
            null;

        context["field"] = "PERCENTAGE";
        context["metadata"] = (objectMetadata ? objectMetadata["PERCENTAGE"] : null);
        privateState.PERCENTAGE = defaultValues ?
            (defaultValues["PERCENTAGE"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PERCENTAGE"], context) :
                null) :
            null;

        context["field"] = "currencyName";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyName"] : null);
        privateState.currencyName = defaultValues ?
            (defaultValues["currencyName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyName"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "investmentType";
        context["metadata"] = (objectMetadata ? objectMetadata["investmentType"] : null);
        privateState.investmentType = defaultValues ?
            (defaultValues["investmentType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["investmentType"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "referenceCurrencyValue";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceCurrencyValue"] : null);
        privateState.referenceCurrencyValue = defaultValues ?
            (defaultValues["referenceCurrencyValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceCurrencyValue"], context) :
                null) :
            null;

        context["field"] = "ricCodes";
        context["metadata"] = (objectMetadata ? objectMetadata["ricCodes"] : null);
        privateState.ricCodes = defaultValues ?
            (defaultValues["ricCodes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ricCodes"], context) :
                null) :
            null;

        context["field"] = "searchByInstrumentName";
        context["metadata"] = (objectMetadata ? objectMetadata["searchByInstrumentName"] : null);
        privateState.searchByInstrumentName = defaultValues ?
            (defaultValues["searchByInstrumentName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["searchByInstrumentName"], context) :
                null) :
            null;

        context["field"] = "sortBy";
        context["metadata"] = (objectMetadata ? objectMetadata["sortBy"] : null);
        privateState.sortBy = defaultValues ?
            (defaultValues["sortBy"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sortBy"], context) :
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

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "totalCount";
        context["metadata"] = (objectMetadata ? objectMetadata["totalCount"] : null);
        privateState.totalCount = defaultValues ?
            (defaultValues["totalCount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totalCount"], context) :
                null) :
            null;

        context["field"] = "instrumentId";
        context["metadata"] = (objectMetadata ? objectMetadata["instrumentId"] : null);
        privateState.instrumentId = defaultValues ?
            (defaultValues["instrumentId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["instrumentId"], context) :
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

        context["field"] = "RICCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RICCode"] : null);
        privateState.RICCode = defaultValues ?
            (defaultValues["RICCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RICCode"], context) :
                null) :
            null;

        context["field"] = "StoryId";
        context["metadata"] = (objectMetadata ? objectMetadata["StoryId"] : null);
        privateState.StoryId = defaultValues ?
            (defaultValues["StoryId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StoryId"], context) :
                null) :
            null;

        context["field"] = "application";
        context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
        privateState.application = defaultValues ?
            (defaultValues["application"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["application"], context) :
                null) :
            null;

        context["field"] = "RE";
        context["metadata"] = (objectMetadata ? objectMetadata["RE"] : null);
        privateState.RE = defaultValues ?
            (defaultValues["RE"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RE"], context) :
                null) :
            null;

        context["field"] = "TN";
        context["metadata"] = (objectMetadata ? objectMetadata["TN"] : null);
        privateState.TN = defaultValues ?
            (defaultValues["TN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["TN"], context) :
                null) :
            null;

        context["field"] = "UR";
        context["metadata"] = (objectMetadata ? objectMetadata["UR"] : null);
        privateState.UR = defaultValues ?
            (defaultValues["UR"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["UR"], context) :
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
            "portfolioName": {
                get: function() {
                    context["field"] = "portfolioName";
                    context["metadata"] = (objectMetadata ? objectMetadata["portfolioName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.portfolioName, context);
                },
                set: function(val) {
                    setterFunctions['portfolioName'].call(this, val, privateState);
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
            "unRealizedPL": {
                get: function() {
                    context["field"] = "unRealizedPL";
                    context["metadata"] = (objectMetadata ? objectMetadata["unRealizedPL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unRealizedPL, context);
                },
                set: function(val) {
                    setterFunctions['unRealizedPL'].call(this, val, privateState);
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
            "todayPL": {
                get: function() {
                    context["field"] = "todayPL";
                    context["metadata"] = (objectMetadata ? objectMetadata["todayPL"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.todayPL, context);
                },
                set: function(val) {
                    setterFunctions['todayPL'].call(this, val, privateState);
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
            "assetGroup": {
                get: function() {
                    context["field"] = "assetGroup";
                    context["metadata"] = (objectMetadata ? objectMetadata["assetGroup"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.assetGroup, context);
                },
                set: function(val) {
                    setterFunctions['assetGroup'].call(this, val, privateState);
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
            "accountName": {
                get: function() {
                    context["field"] = "accountName";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountName, context);
                },
                set: function(val) {
                    setterFunctions['accountName'].call(this, val, privateState);
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
            "totalMarketValue": {
                get: function() {
                    context["field"] = "totalMarketValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalMarketValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalMarketValue, context);
                },
                set: function(val) {
                    setterFunctions['totalMarketValue'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TIMESTAMP": {
                get: function() {
                    context["field"] = "TIMESTAMP";
                    context["metadata"] = (objectMetadata ? objectMetadata["TIMESTAMP"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TIMESTAMP, context);
                },
                set: function(val) {
                    setterFunctions['TIMESTAMP'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "AMOUNT": {
                get: function() {
                    context["field"] = "AMOUNT";
                    context["metadata"] = (objectMetadata ? objectMetadata["AMOUNT"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AMOUNT, context);
                },
                set: function(val) {
                    setterFunctions['AMOUNT'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PERCENTAGE": {
                get: function() {
                    context["field"] = "PERCENTAGE";
                    context["metadata"] = (objectMetadata ? objectMetadata["PERCENTAGE"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PERCENTAGE, context);
                },
                set: function(val) {
                    setterFunctions['PERCENTAGE'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currencyName": {
                get: function() {
                    context["field"] = "currencyName";
                    context["metadata"] = (objectMetadata ? objectMetadata["currencyName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currencyName, context);
                },
                set: function(val) {
                    setterFunctions['currencyName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountNumber": {
                get: function() {
                    context["field"] = "accountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountNumber, context);
                },
                set: function(val) {
                    setterFunctions['accountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "investmentType": {
                get: function() {
                    context["field"] = "investmentType";
                    context["metadata"] = (objectMetadata ? objectMetadata["investmentType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.investmentType, context);
                },
                set: function(val) {
                    setterFunctions['investmentType'].call(this, val, privateState);
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
            "ricCodes": {
                get: function() {
                    context["field"] = "ricCodes";
                    context["metadata"] = (objectMetadata ? objectMetadata["ricCodes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ricCodes, context);
                },
                set: function(val) {
                    setterFunctions['ricCodes'].call(this, val, privateState);
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
            "totalCount": {
                get: function() {
                    context["field"] = "totalCount";
                    context["metadata"] = (objectMetadata ? objectMetadata["totalCount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totalCount, context);
                },
                set: function(val) {
                    setterFunctions['totalCount'].call(this, val, privateState);
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
            "StoryId": {
                get: function() {
                    context["field"] = "StoryId";
                    context["metadata"] = (objectMetadata ? objectMetadata["StoryId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StoryId, context);
                },
                set: function(val) {
                    setterFunctions['StoryId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "application": {
                get: function() {
                    context["field"] = "application";
                    context["metadata"] = (objectMetadata ? objectMetadata["application"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.application, context);
                },
                set: function(val) {
                    setterFunctions['application'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RE": {
                get: function() {
                    context["field"] = "RE";
                    context["metadata"] = (objectMetadata ? objectMetadata["RE"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RE, context);
                },
                set: function(val) {
                    setterFunctions['RE'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "TN": {
                get: function() {
                    context["field"] = "TN";
                    context["metadata"] = (objectMetadata ? objectMetadata["TN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.TN, context);
                },
                set: function(val) {
                    setterFunctions['TN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "UR": {
                get: function() {
                    context["field"] = "UR";
                    context["metadata"] = (objectMetadata ? objectMetadata["UR"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.UR, context);
                },
                set: function(val) {
                    setterFunctions['UR'].call(this, val, privateState);
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
            privateState.portfolioName = value ? (value["portfolioName"] ? value["portfolioName"] : null) : null;
            privateState.referenceCurrency = value ? (value["referenceCurrency"] ? value["referenceCurrency"] : null) : null;
            privateState.marketValue = value ? (value["marketValue"] ? value["marketValue"] : null) : null;
            privateState.unRealizedPL = value ? (value["unRealizedPL"] ? value["unRealizedPL"] : null) : null;
            privateState.unRealizedPLAmount = value ? (value["unRealizedPLAmount"] ? value["unRealizedPLAmount"] : null) : null;
            privateState.unRealizedPLPercentage = value ? (value["unRealizedPLPercentage"] ? value["unRealizedPLPercentage"] : null) : null;
            privateState.todayPL = value ? (value["todayPL"] ? value["todayPL"] : null) : null;
            privateState.todayPLAmount = value ? (value["todayPLAmount"] ? value["todayPLAmount"] : null) : null;
            privateState.todayPLPercentage = value ? (value["todayPLPercentage"] ? value["todayPLPercentage"] : null) : null;
            privateState.assetGroup = value ? (value["assetGroup"] ? value["assetGroup"] : null) : null;
            privateState.graphDuration = value ? (value["graphDuration"] ? value["graphDuration"] : null) : null;
            privateState.navPage = value ? (value["navPage"] ? value["navPage"] : null) : null;
            privateState.totalCashBalance = value ? (value["totalCashBalance"] ? value["totalCashBalance"] : null) : null;
            privateState.currency = value ? (value["currency"] ? value["currency"] : null) : null;
            privateState.balance = value ? (value["balance"] ? value["balance"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.totalCashBalanceCurrency = value ? (value["totalCashBalanceCurrency"] ? value["totalCashBalanceCurrency"] : null) : null;
            privateState.totalMarketValue = value ? (value["totalMarketValue"] ? value["totalMarketValue"] : null) : null;
            privateState.TIMESTAMP = value ? (value["TIMESTAMP"] ? value["TIMESTAMP"] : null) : null;
            privateState.AMOUNT = value ? (value["AMOUNT"] ? value["AMOUNT"] : null) : null;
            privateState.PERCENTAGE = value ? (value["PERCENTAGE"] ? value["PERCENTAGE"] : null) : null;
            privateState.currencyName = value ? (value["currencyName"] ? value["currencyName"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.investmentType = value ? (value["investmentType"] ? value["investmentType"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.referenceCurrencyValue = value ? (value["referenceCurrencyValue"] ? value["referenceCurrencyValue"] : null) : null;
            privateState.ricCodes = value ? (value["ricCodes"] ? value["ricCodes"] : null) : null;
            privateState.searchByInstrumentName = value ? (value["searchByInstrumentName"] ? value["searchByInstrumentName"] : null) : null;
            privateState.sortBy = value ? (value["sortBy"] ? value["sortBy"] : null) : null;
            privateState.sortOrder = value ? (value["sortOrder"] ? value["sortOrder"] : null) : null;
            privateState.pageSize = value ? (value["pageSize"] ? value["pageSize"] : null) : null;
            privateState.pageOffset = value ? (value["pageOffset"] ? value["pageOffset"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.totalCount = value ? (value["totalCount"] ? value["totalCount"] : null) : null;
            privateState.instrumentId = value ? (value["instrumentId"] ? value["instrumentId"] : null) : null;
            privateState.startDate = value ? (value["startDate"] ? value["startDate"] : null) : null;
            privateState.endDate = value ? (value["endDate"] ? value["endDate"] : null) : null;
            privateState.RICCode = value ? (value["RICCode"] ? value["RICCode"] : null) : null;
            privateState.StoryId = value ? (value["StoryId"] ? value["StoryId"] : null) : null;
            privateState.application = value ? (value["application"] ? value["application"] : null) : null;
            privateState.RE = value ? (value["RE"] ? value["RE"] : null) : null;
            privateState.TN = value ? (value["TN"] ? value["TN"] : null) : null;
            privateState.UR = value ? (value["UR"] ? value["UR"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(InstrumentDetails);

    //Create new class level validator object
    BaseModel.Validator.call(InstrumentDetails);

    var registerValidatorBackup = InstrumentDetails.registerValidator;

    InstrumentDetails.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(InstrumentDetails.isValid(this, propName, val)) {
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
    //For Operation 'getNewsDetails' with service id 'getNewsDetails1387'
     InstrumentDetails.getNewsDetails = function(params, onCompletion){
        return InstrumentDetails.customVerb('getNewsDetails', params, onCompletion);
     };

    //For Operation 'getInstrumentDetails' with service id 'getInstrumentDetails4118'
     InstrumentDetails.getInstrumentDetails = function(params, onCompletion){
        return InstrumentDetails.customVerb('getInstrumentDetails', params, onCompletion);
     };

    //For Operation 'getPricingData' with service id 'getPricingData1063'
     InstrumentDetails.getPricingData = function(params, onCompletion){
        return InstrumentDetails.customVerb('getPricingData', params, onCompletion);
     };

    //For Operation 'getInstrumentMinimal' with service id 'getInstrumentMinimal6469'
     InstrumentDetails.getInstrumentMinimal = function(params, onCompletion){
        return InstrumentDetails.customVerb('getInstrumentMinimal', params, onCompletion);
     };

    //For Operation 'getNewsStory' with service id 'getNewsStory8529'
     InstrumentDetails.getNewsStory = function(params, onCompletion){
        return InstrumentDetails.customVerb('getNewsStory', params, onCompletion);
     };

    //For Operation 'getStockNews' with service id 'getStockNews9939'
     InstrumentDetails.getStockNews = function(params, onCompletion){
        return InstrumentDetails.customVerb('getStockNews', params, onCompletion);
     };

    //For Operation 'getInstrumentList' with service id 'getInstrumentList5111'
     InstrumentDetails.getInstrumentList = function(params, onCompletion){
        return InstrumentDetails.customVerb('getInstrumentList', params, onCompletion);
     };

    //For Operation 'getInstrumentTransactions' with service id 'getInstrumentTransactions2442'
     InstrumentDetails.getInstrumentTransactions = function(params, onCompletion){
        return InstrumentDetails.customVerb('getInstrumentTransactions', params, onCompletion);
     };

    var relations = [];

    InstrumentDetails.relations = relations;

    InstrumentDetails.prototype.isValid = function() {
        return InstrumentDetails.isValid(this);
    };

    InstrumentDetails.prototype.objModelName = "InstrumentDetails";
    InstrumentDetails.prototype.objServiceName = "WealthOrder";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    InstrumentDetails.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("WealthOrder", "InstrumentDetails", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    InstrumentDetails.clone = function(objectToClone) {
        var clonedObj = new InstrumentDetails();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return InstrumentDetails;
});