/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Merchants", "objectService" : "HBLMerchantObjects"};

    var setterFunctions = {
        category: function(val, state) {
            context["field"] = "category";
            context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
            state['category'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantName: function(val, state) {
            context["field"] = "merchantName";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantName"] : null);
            state['merchantName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        aggregatorName: function(val, state) {
            context["field"] = "aggregatorName";
            context["metadata"] = (objectMetadata ? objectMetadata["aggregatorName"] : null);
            state['aggregatorName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantCategories: function(val, state) {
            context["field"] = "merchantCategories";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantCategories"] : null);
            state['merchantCategories'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantDetails: function(val, state) {
            context["field"] = "merchantDetails";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantDetails"] : null);
            state['merchantDetails'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantFields: function(val, state) {
            context["field"] = "merchantFields";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantFields"] : null);
            state['merchantFields'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentAggregator: function(val, state) {
            context["field"] = "paymentAggregator";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAggregator"] : null);
            state['paymentAggregator'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastmodifiedts: function(val, state) {
            context["field"] = "lastmodifiedts";
            context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
            state['lastmodifiedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdby: function(val, state) {
            context["field"] = "createdby";
            context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
            state['createdby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        name: function(val, state) {
            context["field"] = "name";
            context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
            state['name'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        modifiedby: function(val, state) {
            context["field"] = "modifiedby";
            context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
            state['modifiedby'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        synctimestamp: function(val, state) {
            context["field"] = "synctimestamp";
            context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
            state['synctimestamp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isActive: function(val, state) {
            context["field"] = "isActive";
            context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
            state['isActive'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdts: function(val, state) {
            context["field"] = "createdts";
            context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
            state['createdts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        softdeleteflag: function(val, state) {
            context["field"] = "softdeleteflag";
            context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
            state['softdeleteflag'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        logourl: function(val, state) {
            context["field"] = "logourl";
            context["metadata"] = (objectMetadata ? objectMetadata["logourl"] : null);
            state['logourl'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        appCode: function(val, state) {
            context["field"] = "appCode";
            context["metadata"] = (objectMetadata ? objectMetadata["appCode"] : null);
            state['appCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        code: function(val, state) {
            context["field"] = "code";
            context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
            state['code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        fromAccountNumber: function(val, state) {
            context["field"] = "fromAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
            state['fromAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billerId: function(val, state) {
            context["field"] = "billerId";
            context["metadata"] = (objectMetadata ? objectMetadata["billerId"] : null);
            state['billerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        payeeId: function(val, state) {
            context["field"] = "payeeId";
            context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
            state['payeeId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        companyId: function(val, state) {
            context["field"] = "companyId";
            context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
            state['companyId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        confirmationNumber: function(val, state) {
            context["field"] = "confirmationNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
            state['confirmationNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        toAccountNumber: function(val, state) {
            context["field"] = "toAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
            state['toAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionId: function(val, state) {
            context["field"] = "transactionId";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
            state['transactionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionType: function(val, state) {
            context["field"] = "transactionType";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
            state['transactionType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amount: function(val, state) {
            context["field"] = "amount";
            context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
            state['amount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentHistory: function(val, state) {
            context["field"] = "paymentHistory";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentHistory"] : null);
            state['paymentHistory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        appId: function(val, state) {
            context["field"] = "appId";
            context["metadata"] = (objectMetadata ? objectMetadata["appId"] : null);
            state['appId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        refId: function(val, state) {
            context["field"] = "refId";
            context["metadata"] = (objectMetadata ? objectMetadata["refId"] : null);
            state['refId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        freeCode1: function(val, state) {
            context["field"] = "freeCode1";
            context["metadata"] = (objectMetadata ? objectMetadata["freeCode1"] : null);
            state['freeCode1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        freeCode2: function(val, state) {
            context["field"] = "freeCode2";
            context["metadata"] = (objectMetadata ? objectMetadata["freeCode2"] : null);
            state['freeCode2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        freeText1: function(val, state) {
            context["field"] = "freeText1";
            context["metadata"] = (objectMetadata ? objectMetadata["freeText1"] : null);
            state['freeText1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        freeText2: function(val, state) {
            context["field"] = "freeText2";
            context["metadata"] = (objectMetadata ? objectMetadata["freeText2"] : null);
            state['freeText2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        particulars: function(val, state) {
            context["field"] = "particulars";
            context["metadata"] = (objectMetadata ? objectMetadata["particulars"] : null);
            state['particulars'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remarks: function(val, state) {
            context["field"] = "remarks";
            context["metadata"] = (objectMetadata ? objectMetadata["remarks"] : null);
            state['remarks'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addenda3: function(val, state) {
            context["field"] = "addenda3";
            context["metadata"] = (objectMetadata ? objectMetadata["addenda3"] : null);
            state['addenda3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        addenda4: function(val, state) {
            context["field"] = "addenda4";
            context["metadata"] = (objectMetadata ? objectMetadata["addenda4"] : null);
            state['addenda4'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Merchants(defaultValues) {
        var privateState = {};
        context["field"] = "category";
        context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
        privateState.category = defaultValues ?
            (defaultValues["category"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["category"], context) :
                null) :
            null;

        context["field"] = "merchantName";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantName"] : null);
        privateState.merchantName = defaultValues ?
            (defaultValues["merchantName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantName"], context) :
                null) :
            null;

        context["field"] = "aggregatorName";
        context["metadata"] = (objectMetadata ? objectMetadata["aggregatorName"] : null);
        privateState.aggregatorName = defaultValues ?
            (defaultValues["aggregatorName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["aggregatorName"], context) :
                null) :
            null;

        context["field"] = "merchantCategories";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantCategories"] : null);
        privateState.merchantCategories = defaultValues ?
            (defaultValues["merchantCategories"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantCategories"], context) :
                null) :
            null;

        context["field"] = "merchantDetails";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantDetails"] : null);
        privateState.merchantDetails = defaultValues ?
            (defaultValues["merchantDetails"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantDetails"], context) :
                null) :
            null;

        context["field"] = "merchantFields";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantFields"] : null);
        privateState.merchantFields = defaultValues ?
            (defaultValues["merchantFields"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantFields"], context) :
                null) :
            null;

        context["field"] = "paymentAggregator";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAggregator"] : null);
        privateState.paymentAggregator = defaultValues ?
            (defaultValues["paymentAggregator"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAggregator"], context) :
                null) :
            null;

        context["field"] = "lastmodifiedts";
        context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
        privateState.lastmodifiedts = defaultValues ?
            (defaultValues["lastmodifiedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastmodifiedts"], context) :
                null) :
            null;

        context["field"] = "createdby";
        context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
        privateState.createdby = defaultValues ?
            (defaultValues["createdby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdby"], context) :
                null) :
            null;

        context["field"] = "name";
        context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
        privateState.name = defaultValues ?
            (defaultValues["name"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["name"], context) :
                null) :
            null;

        context["field"] = "modifiedby";
        context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
        privateState.modifiedby = defaultValues ?
            (defaultValues["modifiedby"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["modifiedby"], context) :
                null) :
            null;

        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "synctimestamp";
        context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
        privateState.synctimestamp = defaultValues ?
            (defaultValues["synctimestamp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["synctimestamp"], context) :
                null) :
            null;

        context["field"] = "isActive";
        context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
        privateState.isActive = defaultValues ?
            (defaultValues["isActive"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isActive"], context) :
                null) :
            null;

        context["field"] = "createdts";
        context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
        privateState.createdts = defaultValues ?
            (defaultValues["createdts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdts"], context) :
                null) :
            null;

        context["field"] = "softdeleteflag";
        context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
        privateState.softdeleteflag = defaultValues ?
            (defaultValues["softdeleteflag"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["softdeleteflag"], context) :
                null) :
            null;

        context["field"] = "logourl";
        context["metadata"] = (objectMetadata ? objectMetadata["logourl"] : null);
        privateState.logourl = defaultValues ?
            (defaultValues["logourl"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["logourl"], context) :
                null) :
            null;

        context["field"] = "appCode";
        context["metadata"] = (objectMetadata ? objectMetadata["appCode"] : null);
        privateState.appCode = defaultValues ?
            (defaultValues["appCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["appCode"], context) :
                null) :
            null;

        context["field"] = "code";
        context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
        privateState.code = defaultValues ?
            (defaultValues["code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["code"], context) :
                null) :
            null;

        context["field"] = "fromAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
        privateState.fromAccountNumber = defaultValues ?
            (defaultValues["fromAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["fromAccountNumber"], context) :
                null) :
            null;

        context["field"] = "billerId";
        context["metadata"] = (objectMetadata ? objectMetadata["billerId"] : null);
        privateState.billerId = defaultValues ?
            (defaultValues["billerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billerId"], context) :
                null) :
            null;

        context["field"] = "payeeId";
        context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
        privateState.payeeId = defaultValues ?
            (defaultValues["payeeId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["payeeId"], context) :
                null) :
            null;

        context["field"] = "companyId";
        context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
        privateState.companyId = defaultValues ?
            (defaultValues["companyId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["companyId"], context) :
                null) :
            null;

        context["field"] = "confirmationNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
        privateState.confirmationNumber = defaultValues ?
            (defaultValues["confirmationNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["confirmationNumber"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "toAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
        privateState.toAccountNumber = defaultValues ?
            (defaultValues["toAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["toAccountNumber"], context) :
                null) :
            null;

        context["field"] = "transactionId";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionId"] : null);
        privateState.transactionId = defaultValues ?
            (defaultValues["transactionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionId"], context) :
                null) :
            null;

        context["field"] = "transactionType";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionType"] : null);
        privateState.transactionType = defaultValues ?
            (defaultValues["transactionType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionType"], context) :
                null) :
            null;

        context["field"] = "amount";
        context["metadata"] = (objectMetadata ? objectMetadata["amount"] : null);
        privateState.amount = defaultValues ?
            (defaultValues["amount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amount"], context) :
                null) :
            null;

        context["field"] = "paymentHistory";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentHistory"] : null);
        privateState.paymentHistory = defaultValues ?
            (defaultValues["paymentHistory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentHistory"], context) :
                null) :
            null;

        context["field"] = "appId";
        context["metadata"] = (objectMetadata ? objectMetadata["appId"] : null);
        privateState.appId = defaultValues ?
            (defaultValues["appId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["appId"], context) :
                null) :
            null;

        context["field"] = "refId";
        context["metadata"] = (objectMetadata ? objectMetadata["refId"] : null);
        privateState.refId = defaultValues ?
            (defaultValues["refId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["refId"], context) :
                null) :
            null;

        context["field"] = "freeCode1";
        context["metadata"] = (objectMetadata ? objectMetadata["freeCode1"] : null);
        privateState.freeCode1 = defaultValues ?
            (defaultValues["freeCode1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["freeCode1"], context) :
                null) :
            null;

        context["field"] = "freeCode2";
        context["metadata"] = (objectMetadata ? objectMetadata["freeCode2"] : null);
        privateState.freeCode2 = defaultValues ?
            (defaultValues["freeCode2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["freeCode2"], context) :
                null) :
            null;

        context["field"] = "freeText1";
        context["metadata"] = (objectMetadata ? objectMetadata["freeText1"] : null);
        privateState.freeText1 = defaultValues ?
            (defaultValues["freeText1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["freeText1"], context) :
                null) :
            null;

        context["field"] = "freeText2";
        context["metadata"] = (objectMetadata ? objectMetadata["freeText2"] : null);
        privateState.freeText2 = defaultValues ?
            (defaultValues["freeText2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["freeText2"], context) :
                null) :
            null;

        context["field"] = "particulars";
        context["metadata"] = (objectMetadata ? objectMetadata["particulars"] : null);
        privateState.particulars = defaultValues ?
            (defaultValues["particulars"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["particulars"], context) :
                null) :
            null;

        context["field"] = "remarks";
        context["metadata"] = (objectMetadata ? objectMetadata["remarks"] : null);
        privateState.remarks = defaultValues ?
            (defaultValues["remarks"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remarks"], context) :
                null) :
            null;

        context["field"] = "addenda3";
        context["metadata"] = (objectMetadata ? objectMetadata["addenda3"] : null);
        privateState.addenda3 = defaultValues ?
            (defaultValues["addenda3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addenda3"], context) :
                null) :
            null;

        context["field"] = "addenda4";
        context["metadata"] = (objectMetadata ? objectMetadata["addenda4"] : null);
        privateState.addenda4 = defaultValues ?
            (defaultValues["addenda4"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["addenda4"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "category": {
                get: function() {
                    context["field"] = "category";
                    context["metadata"] = (objectMetadata ? objectMetadata["category"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.category, context);
                },
                set: function(val) {
                    setterFunctions['category'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantName": {
                get: function() {
                    context["field"] = "merchantName";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantName, context);
                },
                set: function(val) {
                    setterFunctions['merchantName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "aggregatorName": {
                get: function() {
                    context["field"] = "aggregatorName";
                    context["metadata"] = (objectMetadata ? objectMetadata["aggregatorName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.aggregatorName, context);
                },
                set: function(val) {
                    setterFunctions['aggregatorName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantCategories": {
                get: function() {
                    context["field"] = "merchantCategories";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantCategories"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantCategories, context);
                },
                set: function(val) {
                    setterFunctions['merchantCategories'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantDetails": {
                get: function() {
                    context["field"] = "merchantDetails";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantDetails"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantDetails, context);
                },
                set: function(val) {
                    setterFunctions['merchantDetails'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantFields": {
                get: function() {
                    context["field"] = "merchantFields";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantFields"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantFields, context);
                },
                set: function(val) {
                    setterFunctions['merchantFields'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentAggregator": {
                get: function() {
                    context["field"] = "paymentAggregator";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAggregator"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAggregator, context);
                },
                set: function(val) {
                    setterFunctions['paymentAggregator'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastmodifiedts": {
                get: function() {
                    context["field"] = "lastmodifiedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastmodifiedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastmodifiedts, context);
                },
                set: function(val) {
                    setterFunctions['lastmodifiedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdby": {
                get: function() {
                    context["field"] = "createdby";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdby, context);
                },
                set: function(val) {
                    setterFunctions['createdby'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "name": {
                get: function() {
                    context["field"] = "name";
                    context["metadata"] = (objectMetadata ? objectMetadata["name"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.name, context);
                },
                set: function(val) {
                    setterFunctions['name'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "modifiedby": {
                get: function() {
                    context["field"] = "modifiedby";
                    context["metadata"] = (objectMetadata ? objectMetadata["modifiedby"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.modifiedby, context);
                },
                set: function(val) {
                    setterFunctions['modifiedby'].call(this, val, privateState);
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
            "synctimestamp": {
                get: function() {
                    context["field"] = "synctimestamp";
                    context["metadata"] = (objectMetadata ? objectMetadata["synctimestamp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.synctimestamp, context);
                },
                set: function(val) {
                    setterFunctions['synctimestamp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isActive": {
                get: function() {
                    context["field"] = "isActive";
                    context["metadata"] = (objectMetadata ? objectMetadata["isActive"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isActive, context);
                },
                set: function(val) {
                    setterFunctions['isActive'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdts": {
                get: function() {
                    context["field"] = "createdts";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdts, context);
                },
                set: function(val) {
                    setterFunctions['createdts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "softdeleteflag": {
                get: function() {
                    context["field"] = "softdeleteflag";
                    context["metadata"] = (objectMetadata ? objectMetadata["softdeleteflag"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.softdeleteflag, context);
                },
                set: function(val) {
                    setterFunctions['softdeleteflag'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "logourl": {
                get: function() {
                    context["field"] = "logourl";
                    context["metadata"] = (objectMetadata ? objectMetadata["logourl"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.logourl, context);
                },
                set: function(val) {
                    setterFunctions['logourl'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "appCode": {
                get: function() {
                    context["field"] = "appCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["appCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.appCode, context);
                },
                set: function(val) {
                    setterFunctions['appCode'].call(this, val, privateState);
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
            "fromAccountNumber": {
                get: function() {
                    context["field"] = "fromAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["fromAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.fromAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['fromAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "billerId": {
                get: function() {
                    context["field"] = "billerId";
                    context["metadata"] = (objectMetadata ? objectMetadata["billerId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billerId, context);
                },
                set: function(val) {
                    setterFunctions['billerId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "payeeId": {
                get: function() {
                    context["field"] = "payeeId";
                    context["metadata"] = (objectMetadata ? objectMetadata["payeeId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.payeeId, context);
                },
                set: function(val) {
                    setterFunctions['payeeId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "companyId": {
                get: function() {
                    context["field"] = "companyId";
                    context["metadata"] = (objectMetadata ? objectMetadata["companyId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.companyId, context);
                },
                set: function(val) {
                    setterFunctions['companyId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "confirmationNumber": {
                get: function() {
                    context["field"] = "confirmationNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["confirmationNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.confirmationNumber, context);
                },
                set: function(val) {
                    setterFunctions['confirmationNumber'].call(this, val, privateState);
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
            "toAccountNumber": {
                get: function() {
                    context["field"] = "toAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["toAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.toAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['toAccountNumber'].call(this, val, privateState);
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
            "paymentHistory": {
                get: function() {
                    context["field"] = "paymentHistory";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentHistory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentHistory, context);
                },
                set: function(val) {
                    setterFunctions['paymentHistory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "appId": {
                get: function() {
                    context["field"] = "appId";
                    context["metadata"] = (objectMetadata ? objectMetadata["appId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.appId, context);
                },
                set: function(val) {
                    setterFunctions['appId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "refId": {
                get: function() {
                    context["field"] = "refId";
                    context["metadata"] = (objectMetadata ? objectMetadata["refId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.refId, context);
                },
                set: function(val) {
                    setterFunctions['refId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "freeCode1": {
                get: function() {
                    context["field"] = "freeCode1";
                    context["metadata"] = (objectMetadata ? objectMetadata["freeCode1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.freeCode1, context);
                },
                set: function(val) {
                    setterFunctions['freeCode1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "freeCode2": {
                get: function() {
                    context["field"] = "freeCode2";
                    context["metadata"] = (objectMetadata ? objectMetadata["freeCode2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.freeCode2, context);
                },
                set: function(val) {
                    setterFunctions['freeCode2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "freeText1": {
                get: function() {
                    context["field"] = "freeText1";
                    context["metadata"] = (objectMetadata ? objectMetadata["freeText1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.freeText1, context);
                },
                set: function(val) {
                    setterFunctions['freeText1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "freeText2": {
                get: function() {
                    context["field"] = "freeText2";
                    context["metadata"] = (objectMetadata ? objectMetadata["freeText2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.freeText2, context);
                },
                set: function(val) {
                    setterFunctions['freeText2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "particulars": {
                get: function() {
                    context["field"] = "particulars";
                    context["metadata"] = (objectMetadata ? objectMetadata["particulars"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.particulars, context);
                },
                set: function(val) {
                    setterFunctions['particulars'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remarks": {
                get: function() {
                    context["field"] = "remarks";
                    context["metadata"] = (objectMetadata ? objectMetadata["remarks"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remarks, context);
                },
                set: function(val) {
                    setterFunctions['remarks'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addenda3": {
                get: function() {
                    context["field"] = "addenda3";
                    context["metadata"] = (objectMetadata ? objectMetadata["addenda3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addenda3, context);
                },
                set: function(val) {
                    setterFunctions['addenda3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "addenda4": {
                get: function() {
                    context["field"] = "addenda4";
                    context["metadata"] = (objectMetadata ? objectMetadata["addenda4"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.addenda4, context);
                },
                set: function(val) {
                    setterFunctions['addenda4'].call(this, val, privateState);
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
            privateState.category = value ? (value["category"] ? value["category"] : null) : null;
            privateState.merchantName = value ? (value["merchantName"] ? value["merchantName"] : null) : null;
            privateState.aggregatorName = value ? (value["aggregatorName"] ? value["aggregatorName"] : null) : null;
            privateState.merchantCategories = value ? (value["merchantCategories"] ? value["merchantCategories"] : null) : null;
            privateState.merchantDetails = value ? (value["merchantDetails"] ? value["merchantDetails"] : null) : null;
            privateState.merchantFields = value ? (value["merchantFields"] ? value["merchantFields"] : null) : null;
            privateState.paymentAggregator = value ? (value["paymentAggregator"] ? value["paymentAggregator"] : null) : null;
            privateState.lastmodifiedts = value ? (value["lastmodifiedts"] ? value["lastmodifiedts"] : null) : null;
            privateState.createdby = value ? (value["createdby"] ? value["createdby"] : null) : null;
            privateState.name = value ? (value["name"] ? value["name"] : null) : null;
            privateState.modifiedby = value ? (value["modifiedby"] ? value["modifiedby"] : null) : null;
            privateState.id = value ? (value["id"] ? value["id"] : null) : null;
            privateState.synctimestamp = value ? (value["synctimestamp"] ? value["synctimestamp"] : null) : null;
            privateState.isActive = value ? (value["isActive"] ? value["isActive"] : null) : null;
            privateState.createdts = value ? (value["createdts"] ? value["createdts"] : null) : null;
            privateState.softdeleteflag = value ? (value["softdeleteflag"] ? value["softdeleteflag"] : null) : null;
            privateState.logourl = value ? (value["logourl"] ? value["logourl"] : null) : null;
            privateState.appCode = value ? (value["appCode"] ? value["appCode"] : null) : null;
            privateState.code = value ? (value["code"] ? value["code"] : null) : null;
            privateState.fromAccountNumber = value ? (value["fromAccountNumber"] ? value["fromAccountNumber"] : null) : null;
            privateState.billerId = value ? (value["billerId"] ? value["billerId"] : null) : null;
            privateState.payeeId = value ? (value["payeeId"] ? value["payeeId"] : null) : null;
            privateState.companyId = value ? (value["companyId"] ? value["companyId"] : null) : null;
            privateState.confirmationNumber = value ? (value["confirmationNumber"] ? value["confirmationNumber"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.toAccountNumber = value ? (value["toAccountNumber"] ? value["toAccountNumber"] : null) : null;
            privateState.transactionId = value ? (value["transactionId"] ? value["transactionId"] : null) : null;
            privateState.transactionType = value ? (value["transactionType"] ? value["transactionType"] : null) : null;
            privateState.amount = value ? (value["amount"] ? value["amount"] : null) : null;
            privateState.paymentHistory = value ? (value["paymentHistory"] ? value["paymentHistory"] : null) : null;
            privateState.appId = value ? (value["appId"] ? value["appId"] : null) : null;
            privateState.refId = value ? (value["refId"] ? value["refId"] : null) : null;
            privateState.freeCode1 = value ? (value["freeCode1"] ? value["freeCode1"] : null) : null;
            privateState.freeCode2 = value ? (value["freeCode2"] ? value["freeCode2"] : null) : null;
            privateState.freeText1 = value ? (value["freeText1"] ? value["freeText1"] : null) : null;
            privateState.freeText2 = value ? (value["freeText2"] ? value["freeText2"] : null) : null;
            privateState.particulars = value ? (value["particulars"] ? value["particulars"] : null) : null;
            privateState.remarks = value ? (value["remarks"] ? value["remarks"] : null) : null;
            privateState.addenda3 = value ? (value["addenda3"] ? value["addenda3"] : null) : null;
            privateState.addenda4 = value ? (value["addenda4"] ? value["addenda4"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Merchants);

    //Create new class level validator object
    BaseModel.Validator.call(Merchants);

    var registerValidatorBackup = Merchants.registerValidator;

    Merchants.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Merchants.isValid(this, propName, val)) {
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
    //For Operation 'getMerchantFormFields' with service id 'getMerchantFormFields5470'
     Merchants.getMerchantFormFields = function(params, onCompletion){
        return Merchants.customVerb('getMerchantFormFields', params, onCompletion);
     };

    //For Operation 'updateFavoriteMerchant' with service id 'updateFavoriteMerchant8114'
     Merchants.updateFavoriteMerchant = function(params, onCompletion){
        return Merchants.customVerb('updateFavoriteMerchant', params, onCompletion);
     };

    //For Operation 'getMerchantCategories' with service id 'GetMerchantCategories8565'
     Merchants.getMerchantCategories = function(params, onCompletion){
        return Merchants.customVerb('getMerchantCategories', params, onCompletion);
     };

    //For Operation 'getBillPaymentHistory' with service id 'getBillPaymentHistory7423'
     Merchants.getBillPaymentHistory = function(params, onCompletion){
        return Merchants.customVerb('getBillPaymentHistory', params, onCompletion);
     };

    //For Operation 'confirmBillPay' with service id 'ConfirmBillPaid6872'
     Merchants.confirmBillPay = function(params, onCompletion){
        return Merchants.customVerb('confirmBillPay', params, onCompletion);
     };

    //For Operation 'getMerchantFields' with service id 'GetMerchantFields2910'
     Merchants.getMerchantFields = function(params, onCompletion){
        return Merchants.customVerb('getMerchantFields', params, onCompletion);
     };

    //For Operation 'getMerchants' with service id 'GetMerchantsByCategory6012'
     Merchants.getMerchants = function(params, onCompletion){
        return Merchants.customVerb('getMerchants', params, onCompletion);
     };

    //For Operation 'getBranchList' with service id 'GetBranchList3299'
     Merchants.getBranchList = function(params, onCompletion){
        return Merchants.customVerb('getBranchList', params, onCompletion);
     };

    //For Operation 'getMerchantPaymentCharges' with service id 'getMerchantPaymentCharges7673'
     Merchants.getMerchantPaymentCharges = function(params, onCompletion){
        return Merchants.customVerb('getMerchantPaymentCharges', params, onCompletion);
     };

    //For Operation 'lodgeBillPay' with service id 'lodgeBillPay2583'
     Merchants.lodgeBillPay = function(params, onCompletion){
        return Merchants.customVerb('lodgeBillPay', params, onCompletion);
     };

    //For Operation 'getCustomerBillInfo' with service id 'GetCustomerBillInfo1561'
     Merchants.getCustomerBillInfo = function(params, onCompletion){
        return Merchants.customVerb('getCustomerBillInfo', params, onCompletion);
     };

    //For Operation 'getMerchantCategoriesByCode' with service id 'getMerchantCategoriesByCode4258'
     Merchants.getMerchantCategoriesByCode = function(params, onCompletion){
        return Merchants.customVerb('getMerchantCategoriesByCode', params, onCompletion);
     };

    //For Operation 'getFavoriteMerchants' with service id 'getFavoriteMerchants5251'
     Merchants.getFavoriteMerchants = function(params, onCompletion){
        return Merchants.customVerb('getFavoriteMerchants', params, onCompletion);
     };

    //For Operation 'createFavoriteMerchant' with service id 'createFavoriteMerchant5615'
     Merchants.createFavoriteMerchant = function(params, onCompletion){
        return Merchants.customVerb('createFavoriteMerchant', params, onCompletion);
     };

    //For Operation 'generateBill' with service id 'getBillTransactionById5415'
     Merchants.generateBill = function(params, onCompletion){
        return Merchants.customVerb('generateBill', params, onCompletion);
     };

    //For Operation 'deleteFavoriteMerchant' with service id 'deleteFavoriteMerchant7177'
     Merchants.deleteFavoriteMerchant = function(params, onCompletion){
        return Merchants.customVerb('deleteFavoriteMerchant', params, onCompletion);
     };

    var relations = [];

    Merchants.relations = relations;

    Merchants.prototype.isValid = function() {
        return Merchants.isValid(this);
    };

    Merchants.prototype.objModelName = "Merchants";
    Merchants.prototype.objServiceName = "HBLMerchantObjects";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Merchants.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("HBLMerchantObjects", "Merchants", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Merchants.clone = function(objectToClone) {
        var clonedObj = new Merchants();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Merchants;
});