/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "S2MCardServices", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        bankId: function(val, state) {
            context["field"] = "bankId";
            context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
            state['bankId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ebankingUser: function(val, state) {
            context["field"] = "ebankingUser";
            context["metadata"] = (objectMetadata ? objectMetadata["ebankingUser"] : null);
            state['ebankingUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ebankingPassword: function(val, state) {
            context["field"] = "ebankingPassword";
            context["metadata"] = (objectMetadata ? objectMetadata["ebankingPassword"] : null);
            state['ebankingPassword'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardNumber: function(val, state) {
            context["field"] = "cardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
            state['cardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardRefNbr: function(val, state) {
            context["field"] = "cardRefNbr";
            context["metadata"] = (objectMetadata ? objectMetadata["cardRefNbr"] : null);
            state['cardRefNbr'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cvv2_out: function(val, state) {
            context["field"] = "cvv2_out";
            context["metadata"] = (objectMetadata ? objectMetadata["cvv2_out"] : null);
            state['cvv2_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        p4dbc_out: function(val, state) {
            context["field"] = "p4dbc_out";
            context["metadata"] = (objectMetadata ? objectMetadata["p4dbc_out"] : null);
            state['p4dbc_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate_out: function(val, state) {
            context["field"] = "expiryDate_out";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate_out"] : null);
            state['expiryDate_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        respCode_out: function(val, state) {
            context["field"] = "respCode_out";
            context["metadata"] = (objectMetadata ? objectMetadata["respCode_out"] : null);
            state['respCode_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        respLabel_out: function(val, state) {
            context["field"] = "respLabel_out";
            context["metadata"] = (objectMetadata ? objectMetadata["respLabel_out"] : null);
            state['respLabel_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        result: function(val, state) {
            context["field"] = "result";
            context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
            state['result'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balance_out: function(val, state) {
            context["field"] = "balance_out";
            context["metadata"] = (objectMetadata ? objectMetadata["balance_out"] : null);
            state['balance_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerId: function(val, state) {
            context["field"] = "customerId";
            context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
            state['customerId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardLevel: function(val, state) {
            context["field"] = "cardLevel";
            context["metadata"] = (objectMetadata ? objectMetadata["cardLevel"] : null);
            state['cardLevel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maskPan: function(val, state) {
            context["field"] = "maskPan";
            context["metadata"] = (objectMetadata ? objectMetadata["maskPan"] : null);
            state['maskPan'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardIssueDate: function(val, state) {
            context["field"] = "cardIssueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["cardIssueDate"] : null);
            state['cardIssueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardType: function(val, state) {
            context["field"] = "cardType";
            context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
            state['cardType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentInstructions: function(val, state) {
            context["field"] = "paymentInstructions";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentInstructions"] : null);
            state['paymentInstructions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardExpDate: function(val, state) {
            context["field"] = "cardExpDate";
            context["metadata"] = (objectMetadata ? objectMetadata["cardExpDate"] : null);
            state['cardExpDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        statementDate: function(val, state) {
            context["field"] = "statementDate";
            context["metadata"] = (objectMetadata ? objectMetadata["statementDate"] : null);
            state['statementDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        amountOverLimit: function(val, state) {
            context["field"] = "amountOverLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["amountOverLimit"] : null);
            state['amountOverLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accCurr: function(val, state) {
            context["field"] = "accCurr";
            context["metadata"] = (objectMetadata ? objectMetadata["accCurr"] : null);
            state['accCurr'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDueDate: function(val, state) {
            context["field"] = "paymentDueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
            state['paymentDueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAccNum: function(val, state) {
            context["field"] = "bankAccNum";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAccNum"] : null);
            state['bankAccNum'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardClassification: function(val, state) {
            context["field"] = "cardClassification";
            context["metadata"] = (objectMetadata ? objectMetadata["cardClassification"] : null);
            state['cardClassification'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        balance: function(val, state) {
            context["field"] = "balance";
            context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
            state['balance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        minPaymentAmount: function(val, state) {
            context["field"] = "minPaymentAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["minPaymentAmount"] : null);
            state['minPaymentAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardProgLabel: function(val, state) {
            context["field"] = "cardProgLabel";
            context["metadata"] = (objectMetadata ? objectMetadata["cardProgLabel"] : null);
            state['cardProgLabel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditLimit: function(val, state) {
            context["field"] = "creditLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
            state['creditLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mxpAccNum: function(val, state) {
            context["field"] = "mxpAccNum";
            context["metadata"] = (objectMetadata ? objectMetadata["mxpAccNum"] : null);
            state['mxpAccNum'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pan: function(val, state) {
            context["field"] = "pan";
            context["metadata"] = (objectMetadata ? objectMetadata["pan"] : null);
            state['pan'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardStatus: function(val, state) {
            context["field"] = "cardStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
            state['cardStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        chName: function(val, state) {
            context["field"] = "chName";
            context["metadata"] = (objectMetadata ? objectMetadata["chName"] : null);
            state['chName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outstdBalance: function(val, state) {
            context["field"] = "outstdBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["outstdBalance"] : null);
            state['outstdBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateFrom: function(val, state) {
            context["field"] = "dateFrom";
            context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
            state['dateFrom'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dateTo: function(val, state) {
            context["field"] = "dateTo";
            context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
            state['dateTo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tranDate: function(val, state) {
            context["field"] = "tranDate";
            context["metadata"] = (objectMetadata ? objectMetadata["tranDate"] : null);
            state['tranDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tranCode: function(val, state) {
            context["field"] = "tranCode";
            context["metadata"] = (objectMetadata ? objectMetadata["tranCode"] : null);
            state['tranCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tranBillAmou: function(val, state) {
            context["field"] = "tranBillAmou";
            context["metadata"] = (objectMetadata ? objectMetadata["tranBillAmou"] : null);
            state['tranBillAmou'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tranCurr: function(val, state) {
            context["field"] = "tranCurr";
            context["metadata"] = (objectMetadata ? objectMetadata["tranCurr"] : null);
            state['tranCurr'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tranAmou: function(val, state) {
            context["field"] = "tranAmou";
            context["metadata"] = (objectMetadata ? objectMetadata["tranAmou"] : null);
            state['tranAmou'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        tranBillCurr: function(val, state) {
            context["field"] = "tranBillCurr";
            context["metadata"] = (objectMetadata ? objectMetadata["tranBillCurr"] : null);
            state['tranBillCurr'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        latePaymentStatus_out: function(val, state) {
            context["field"] = "latePaymentStatus_out";
            context["metadata"] = (objectMetadata ? objectMetadata["latePaymentStatus_out"] : null);
            state['latePaymentStatus_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        closingBalance_out: function(val, state) {
            context["field"] = "closingBalance_out";
            context["metadata"] = (objectMetadata ? objectMetadata["closingBalance_out"] : null);
            state['closingBalance_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cycleDate_out: function(val, state) {
            context["field"] = "cycleDate_out";
            context["metadata"] = (objectMetadata ? objectMetadata["cycleDate_out"] : null);
            state['cycleDate_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        openingBalance_out: function(val, state) {
            context["field"] = "openingBalance_out";
            context["metadata"] = (objectMetadata ? objectMetadata["openingBalance_out"] : null);
            state['openingBalance_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        authorizedCumul_out: function(val, state) {
            context["field"] = "authorizedCumul_out";
            context["metadata"] = (objectMetadata ? objectMetadata["authorizedCumul_out"] : null);
            state['authorizedCumul_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status_out: function(val, state) {
            context["field"] = "status_out";
            context["metadata"] = (objectMetadata ? objectMetadata["status_out"] : null);
            state['status_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currency_out: function(val, state) {
            context["field"] = "currency_out";
            context["metadata"] = (objectMetadata ? objectMetadata["currency_out"] : null);
            state['currency_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        minimumDue_out: function(val, state) {
            context["field"] = "minimumDue_out";
            context["metadata"] = (objectMetadata ? objectMetadata["minimumDue_out"] : null);
            state['minimumDue_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lateDate_out: function(val, state) {
            context["field"] = "lateDate_out";
            context["metadata"] = (objectMetadata ? objectMetadata["lateDate_out"] : null);
            state['lateDate_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cmsAccountNumber_out: function(val, state) {
            context["field"] = "cmsAccountNumber_out";
            context["metadata"] = (objectMetadata ? objectMetadata["cmsAccountNumber_out"] : null);
            state['cmsAccountNumber_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        branch_out: function(val, state) {
            context["field"] = "branch_out";
            context["metadata"] = (objectMetadata ? objectMetadata["branch_out"] : null);
            state['branch_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unpaidDate_out: function(val, state) {
            context["field"] = "unpaidDate_out";
            context["metadata"] = (objectMetadata ? objectMetadata["unpaidDate_out"] : null);
            state['unpaidDate_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        usedCumul_out: function(val, state) {
            context["field"] = "usedCumul_out";
            context["metadata"] = (objectMetadata ? objectMetadata["usedCumul_out"] : null);
            state['usedCumul_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        outstandingBalance_out: function(val, state) {
            context["field"] = "outstandingBalance_out";
            context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance_out"] : null);
            state['outstandingBalance_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankAccountNumber_out: function(val, state) {
            context["field"] = "bankAccountNumber_out";
            context["metadata"] = (objectMetadata ? objectMetadata["bankAccountNumber_out"] : null);
            state['bankAccountNumber_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        minDuePaymentStatus_out: function(val, state) {
            context["field"] = "minDuePaymentStatus_out";
            context["metadata"] = (objectMetadata ? objectMetadata["minDuePaymentStatus_out"] : null);
            state['minDuePaymentStatus_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentNumber_out: function(val, state) {
            context["field"] = "paymentNumber_out";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentNumber_out"] : null);
            state['paymentNumber_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastCycleDate_out: function(val, state) {
            context["field"] = "lastCycleDate_out";
            context["metadata"] = (objectMetadata ? objectMetadata["lastCycleDate_out"] : null);
            state['lastCycleDate_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        overLimitAmount_out: function(val, state) {
            context["field"] = "overLimitAmount_out";
            context["metadata"] = (objectMetadata ? objectMetadata["overLimitAmount_out"] : null);
            state['overLimitAmount_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentCumul_out: function(val, state) {
            context["field"] = "paymentCumul_out";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentCumul_out"] : null);
            state['paymentCumul_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dueDate_out: function(val, state) {
            context["field"] = "dueDate_out";
            context["metadata"] = (objectMetadata ? objectMetadata["dueDate_out"] : null);
            state['dueDate_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        available_out: function(val, state) {
            context["field"] = "available_out";
            context["metadata"] = (objectMetadata ? objectMetadata["available_out"] : null);
            state['available_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        overLimitStatus_out: function(val, state) {
            context["field"] = "overLimitStatus_out";
            context["metadata"] = (objectMetadata ? objectMetadata["overLimitStatus_out"] : null);
            state['overLimitStatus_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unpaidStatus_out: function(val, state) {
            context["field"] = "unpaidStatus_out";
            context["metadata"] = (objectMetadata ? objectMetadata["unpaidStatus_out"] : null);
            state['unpaidStatus_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dueBalance_out: function(val, state) {
            context["field"] = "dueBalance_out";
            context["metadata"] = (objectMetadata ? objectMetadata["dueBalance_out"] : null);
            state['dueBalance_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        action: function(val, state) {
            context["field"] = "action";
            context["metadata"] = (objectMetadata ? objectMetadata["action"] : null);
            state['action'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reason: function(val, state) {
            context["field"] = "reason";
            context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
            state['reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        getPendingAuthorizationsResponse: function(val, state) {
            context["field"] = "getPendingAuthorizationsResponse";
            context["metadata"] = (objectMetadata ? objectMetadata["getPendingAuthorizationsResponse"] : null);
            state['getPendingAuthorizationsResponse'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pendingAuthInfo_out: function(val, state) {
            context["field"] = "pendingAuthInfo_out";
            context["metadata"] = (objectMetadata ? objectMetadata["pendingAuthInfo_out"] : null);
            state['pendingAuthInfo_out'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        postingDate: function(val, state) {
            context["field"] = "postingDate";
            context["metadata"] = (objectMetadata ? objectMetadata["postingDate"] : null);
            state['postingDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        authCode: function(val, state) {
            context["field"] = "authCode";
            context["metadata"] = (objectMetadata ? objectMetadata["authCode"] : null);
            state['authCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionAmount: function(val, state) {
            context["field"] = "transactionAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
            state['transactionAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved10: function(val, state) {
            context["field"] = "reserved10";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved10"] : null);
            state['reserved10'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCode: function(val, state) {
            context["field"] = "transactionCode";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCode"] : null);
            state['transactionCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved9: function(val, state) {
            context["field"] = "reserved9";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved9"] : null);
            state['reserved9'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved8: function(val, state) {
            context["field"] = "reserved8";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved8"] : null);
            state['reserved8'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceNumber: function(val, state) {
            context["field"] = "referenceNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceNumber"] : null);
            state['referenceNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionDate: function(val, state) {
            context["field"] = "transactionDate";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
            state['transactionDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billingAmount: function(val, state) {
            context["field"] = "billingAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["billingAmount"] : null);
            state['billingAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved6: function(val, state) {
            context["field"] = "reserved6";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved6"] : null);
            state['reserved6'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved7: function(val, state) {
            context["field"] = "reserved7";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved7"] : null);
            state['reserved7'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantCategoryCode: function(val, state) {
            context["field"] = "merchantCategoryCode";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantCategoryCode"] : null);
            state['merchantCategoryCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved4: function(val, state) {
            context["field"] = "reserved4";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved4"] : null);
            state['reserved4'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantNameLocation: function(val, state) {
            context["field"] = "merchantNameLocation";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantNameLocation"] : null);
            state['merchantNameLocation'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved5: function(val, state) {
            context["field"] = "reserved5";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved5"] : null);
            state['reserved5'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved2: function(val, state) {
            context["field"] = "reserved2";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved2"] : null);
            state['reserved2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankActNum: function(val, state) {
            context["field"] = "bankActNum";
            context["metadata"] = (objectMetadata ? objectMetadata["bankActNum"] : null);
            state['bankActNum'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved3: function(val, state) {
            context["field"] = "reserved3";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved3"] : null);
            state['reserved3'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        reserved1: function(val, state) {
            context["field"] = "reserved1";
            context["metadata"] = (objectMetadata ? objectMetadata["reserved1"] : null);
            state['reserved1'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mxpActNum: function(val, state) {
            context["field"] = "mxpActNum";
            context["metadata"] = (objectMetadata ? objectMetadata["mxpActNum"] : null);
            state['mxpActNum'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        referenceType: function(val, state) {
            context["field"] = "referenceType";
            context["metadata"] = (objectMetadata ? objectMetadata["referenceType"] : null);
            state['referenceType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardPin: function(val, state) {
            context["field"] = "cardPin";
            context["metadata"] = (objectMetadata ? objectMetadata["cardPin"] : null);
            state['cardPin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardFee: function(val, state) {
            context["field"] = "cardFee";
            context["metadata"] = (objectMetadata ? objectMetadata["cardFee"] : null);
            state['cardFee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        p_err_code: function(val, state) {
            context["field"] = "p_err_code";
            context["metadata"] = (objectMetadata ? objectMetadata["p_err_code"] : null);
            state['p_err_code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        debitAccount: function(val, state) {
            context["field"] = "debitAccount";
            context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
            state['debitAccount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceProvider: function(val, state) {
            context["field"] = "serviceProvider";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
            state['serviceProvider'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardDescription: function(val, state) {
            context["field"] = "cardDescription";
            context["metadata"] = (objectMetadata ? objectMetadata["cardDescription"] : null);
            state['cardDescription'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dailyWithdrawLimit: function(val, state) {
            context["field"] = "dailyWithdrawLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["dailyWithdrawLimit"] : null);
            state['dailyWithdrawLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dailyPurchaseLimit: function(val, state) {
            context["field"] = "dailyPurchaseLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["dailyPurchaseLimit"] : null);
            state['dailyPurchaseLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        annualFee: function(val, state) {
            context["field"] = "annualFee";
            context["metadata"] = (objectMetadata ? objectMetadata["annualFee"] : null);
            state['annualFee'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nameOnTheCard: function(val, state) {
            context["field"] = "nameOnTheCard";
            context["metadata"] = (objectMetadata ? objectMetadata["nameOnTheCard"] : null);
            state['nameOnTheCard'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardCategory: function(val, state) {
            context["field"] = "cardCategory";
            context["metadata"] = (objectMetadata ? objectMetadata["cardCategory"] : null);
            state['cardCategory'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        panNo: function(val, state) {
            context["field"] = "panNo";
            context["metadata"] = (objectMetadata ? objectMetadata["panNo"] : null);
            state['panNo'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        topupAmount: function(val, state) {
            context["field"] = "topupAmount";
            context["metadata"] = (objectMetadata ? objectMetadata["topupAmount"] : null);
            state['topupAmount'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cCardRefNumber: function(val, state) {
            context["field"] = "cCardRefNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cCardRefNumber"] : null);
            state['cCardRefNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cCardNumber: function(val, state) {
            context["field"] = "cCardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cCardNumber"] : null);
            state['cCardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        mxpAccountNumber: function(val, state) {
            context["field"] = "mxpAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["mxpAccountNumber"] : null);
            state['mxpAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        topupFees: function(val, state) {
            context["field"] = "topupFees";
            context["metadata"] = (objectMetadata ? objectMetadata["topupFees"] : null);
            state['topupFees'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        topupCurrency: function(val, state) {
            context["field"] = "topupCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["topupCurrency"] : null);
            state['topupCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        topupAmou: function(val, state) {
            context["field"] = "topupAmou";
            context["metadata"] = (objectMetadata ? objectMetadata["topupAmou"] : null);
            state['topupAmou'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantCity: function(val, state) {
            context["field"] = "merchantCity";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantCity"] : null);
            state['merchantCity'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        merchantName: function(val, state) {
            context["field"] = "merchantName";
            context["metadata"] = (objectMetadata ? objectMetadata["merchantName"] : null);
            state['merchantName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isDisputed: function(val, state) {
            context["field"] = "isDisputed";
            context["metadata"] = (objectMetadata ? objectMetadata["isDisputed"] : null);
            state['isDisputed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function S2MCardServices(defaultValues) {
        var privateState = {};
        context["field"] = "bankId";
        context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
        privateState.bankId = defaultValues ?
            (defaultValues["bankId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankId"], context) :
                null) :
            null;

        context["field"] = "ebankingUser";
        context["metadata"] = (objectMetadata ? objectMetadata["ebankingUser"] : null);
        privateState.ebankingUser = defaultValues ?
            (defaultValues["ebankingUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ebankingUser"], context) :
                null) :
            null;

        context["field"] = "ebankingPassword";
        context["metadata"] = (objectMetadata ? objectMetadata["ebankingPassword"] : null);
        privateState.ebankingPassword = defaultValues ?
            (defaultValues["ebankingPassword"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ebankingPassword"], context) :
                null) :
            null;

        context["field"] = "cardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
        privateState.cardNumber = defaultValues ?
            (defaultValues["cardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardNumber"], context) :
                null) :
            null;

        context["field"] = "cardRefNbr";
        context["metadata"] = (objectMetadata ? objectMetadata["cardRefNbr"] : null);
        privateState.cardRefNbr = defaultValues ?
            (defaultValues["cardRefNbr"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardRefNbr"], context) :
                null) :
            null;

        context["field"] = "cvv2_out";
        context["metadata"] = (objectMetadata ? objectMetadata["cvv2_out"] : null);
        privateState.cvv2_out = defaultValues ?
            (defaultValues["cvv2_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cvv2_out"], context) :
                null) :
            null;

        context["field"] = "p4dbc_out";
        context["metadata"] = (objectMetadata ? objectMetadata["p4dbc_out"] : null);
        privateState.p4dbc_out = defaultValues ?
            (defaultValues["p4dbc_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["p4dbc_out"], context) :
                null) :
            null;

        context["field"] = "expiryDate_out";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate_out"] : null);
        privateState.expiryDate_out = defaultValues ?
            (defaultValues["expiryDate_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate_out"], context) :
                null) :
            null;

        context["field"] = "respCode_out";
        context["metadata"] = (objectMetadata ? objectMetadata["respCode_out"] : null);
        privateState.respCode_out = defaultValues ?
            (defaultValues["respCode_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["respCode_out"], context) :
                null) :
            null;

        context["field"] = "respLabel_out";
        context["metadata"] = (objectMetadata ? objectMetadata["respLabel_out"] : null);
        privateState.respLabel_out = defaultValues ?
            (defaultValues["respLabel_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["respLabel_out"], context) :
                null) :
            null;

        context["field"] = "result";
        context["metadata"] = (objectMetadata ? objectMetadata["result"] : null);
        privateState.result = defaultValues ?
            (defaultValues["result"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["result"], context) :
                null) :
            null;

        context["field"] = "balance_out";
        context["metadata"] = (objectMetadata ? objectMetadata["balance_out"] : null);
        privateState.balance_out = defaultValues ?
            (defaultValues["balance_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balance_out"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "customerId";
        context["metadata"] = (objectMetadata ? objectMetadata["customerId"] : null);
        privateState.customerId = defaultValues ?
            (defaultValues["customerId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerId"], context) :
                null) :
            null;

        context["field"] = "cardLevel";
        context["metadata"] = (objectMetadata ? objectMetadata["cardLevel"] : null);
        privateState.cardLevel = defaultValues ?
            (defaultValues["cardLevel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardLevel"], context) :
                null) :
            null;

        context["field"] = "maskPan";
        context["metadata"] = (objectMetadata ? objectMetadata["maskPan"] : null);
        privateState.maskPan = defaultValues ?
            (defaultValues["maskPan"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maskPan"], context) :
                null) :
            null;

        context["field"] = "cardIssueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["cardIssueDate"] : null);
        privateState.cardIssueDate = defaultValues ?
            (defaultValues["cardIssueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardIssueDate"], context) :
                null) :
            null;

        context["field"] = "cardType";
        context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
        privateState.cardType = defaultValues ?
            (defaultValues["cardType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardType"], context) :
                null) :
            null;

        context["field"] = "paymentInstructions";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentInstructions"] : null);
        privateState.paymentInstructions = defaultValues ?
            (defaultValues["paymentInstructions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentInstructions"], context) :
                null) :
            null;

        context["field"] = "cardExpDate";
        context["metadata"] = (objectMetadata ? objectMetadata["cardExpDate"] : null);
        privateState.cardExpDate = defaultValues ?
            (defaultValues["cardExpDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardExpDate"], context) :
                null) :
            null;

        context["field"] = "statementDate";
        context["metadata"] = (objectMetadata ? objectMetadata["statementDate"] : null);
        privateState.statementDate = defaultValues ?
            (defaultValues["statementDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["statementDate"], context) :
                null) :
            null;

        context["field"] = "amountOverLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["amountOverLimit"] : null);
        privateState.amountOverLimit = defaultValues ?
            (defaultValues["amountOverLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["amountOverLimit"], context) :
                null) :
            null;

        context["field"] = "accCurr";
        context["metadata"] = (objectMetadata ? objectMetadata["accCurr"] : null);
        privateState.accCurr = defaultValues ?
            (defaultValues["accCurr"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accCurr"], context) :
                null) :
            null;

        context["field"] = "paymentDueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
        privateState.paymentDueDate = defaultValues ?
            (defaultValues["paymentDueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDueDate"], context) :
                null) :
            null;

        context["field"] = "bankAccNum";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAccNum"] : null);
        privateState.bankAccNum = defaultValues ?
            (defaultValues["bankAccNum"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAccNum"], context) :
                null) :
            null;

        context["field"] = "cardClassification";
        context["metadata"] = (objectMetadata ? objectMetadata["cardClassification"] : null);
        privateState.cardClassification = defaultValues ?
            (defaultValues["cardClassification"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardClassification"], context) :
                null) :
            null;

        context["field"] = "balance";
        context["metadata"] = (objectMetadata ? objectMetadata["balance"] : null);
        privateState.balance = defaultValues ?
            (defaultValues["balance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["balance"], context) :
                null) :
            null;

        context["field"] = "minPaymentAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["minPaymentAmount"] : null);
        privateState.minPaymentAmount = defaultValues ?
            (defaultValues["minPaymentAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["minPaymentAmount"], context) :
                null) :
            null;

        context["field"] = "cardProgLabel";
        context["metadata"] = (objectMetadata ? objectMetadata["cardProgLabel"] : null);
        privateState.cardProgLabel = defaultValues ?
            (defaultValues["cardProgLabel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardProgLabel"], context) :
                null) :
            null;

        context["field"] = "creditLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
        privateState.creditLimit = defaultValues ?
            (defaultValues["creditLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditLimit"], context) :
                null) :
            null;

        context["field"] = "mxpAccNum";
        context["metadata"] = (objectMetadata ? objectMetadata["mxpAccNum"] : null);
        privateState.mxpAccNum = defaultValues ?
            (defaultValues["mxpAccNum"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mxpAccNum"], context) :
                null) :
            null;

        context["field"] = "pan";
        context["metadata"] = (objectMetadata ? objectMetadata["pan"] : null);
        privateState.pan = defaultValues ?
            (defaultValues["pan"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pan"], context) :
                null) :
            null;

        context["field"] = "cardStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
        privateState.cardStatus = defaultValues ?
            (defaultValues["cardStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardStatus"], context) :
                null) :
            null;

        context["field"] = "chName";
        context["metadata"] = (objectMetadata ? objectMetadata["chName"] : null);
        privateState.chName = defaultValues ?
            (defaultValues["chName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["chName"], context) :
                null) :
            null;

        context["field"] = "outstdBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["outstdBalance"] : null);
        privateState.outstdBalance = defaultValues ?
            (defaultValues["outstdBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outstdBalance"], context) :
                null) :
            null;

        context["field"] = "dateFrom";
        context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
        privateState.dateFrom = defaultValues ?
            (defaultValues["dateFrom"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateFrom"], context) :
                null) :
            null;

        context["field"] = "dateTo";
        context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
        privateState.dateTo = defaultValues ?
            (defaultValues["dateTo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dateTo"], context) :
                null) :
            null;

        context["field"] = "tranDate";
        context["metadata"] = (objectMetadata ? objectMetadata["tranDate"] : null);
        privateState.tranDate = defaultValues ?
            (defaultValues["tranDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tranDate"], context) :
                null) :
            null;

        context["field"] = "tranCode";
        context["metadata"] = (objectMetadata ? objectMetadata["tranCode"] : null);
        privateState.tranCode = defaultValues ?
            (defaultValues["tranCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tranCode"], context) :
                null) :
            null;

        context["field"] = "tranBillAmou";
        context["metadata"] = (objectMetadata ? objectMetadata["tranBillAmou"] : null);
        privateState.tranBillAmou = defaultValues ?
            (defaultValues["tranBillAmou"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tranBillAmou"], context) :
                null) :
            null;

        context["field"] = "tranCurr";
        context["metadata"] = (objectMetadata ? objectMetadata["tranCurr"] : null);
        privateState.tranCurr = defaultValues ?
            (defaultValues["tranCurr"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tranCurr"], context) :
                null) :
            null;

        context["field"] = "tranAmou";
        context["metadata"] = (objectMetadata ? objectMetadata["tranAmou"] : null);
        privateState.tranAmou = defaultValues ?
            (defaultValues["tranAmou"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tranAmou"], context) :
                null) :
            null;

        context["field"] = "tranBillCurr";
        context["metadata"] = (objectMetadata ? objectMetadata["tranBillCurr"] : null);
        privateState.tranBillCurr = defaultValues ?
            (defaultValues["tranBillCurr"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["tranBillCurr"], context) :
                null) :
            null;

        context["field"] = "latePaymentStatus_out";
        context["metadata"] = (objectMetadata ? objectMetadata["latePaymentStatus_out"] : null);
        privateState.latePaymentStatus_out = defaultValues ?
            (defaultValues["latePaymentStatus_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["latePaymentStatus_out"], context) :
                null) :
            null;

        context["field"] = "closingBalance_out";
        context["metadata"] = (objectMetadata ? objectMetadata["closingBalance_out"] : null);
        privateState.closingBalance_out = defaultValues ?
            (defaultValues["closingBalance_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["closingBalance_out"], context) :
                null) :
            null;

        context["field"] = "cycleDate_out";
        context["metadata"] = (objectMetadata ? objectMetadata["cycleDate_out"] : null);
        privateState.cycleDate_out = defaultValues ?
            (defaultValues["cycleDate_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cycleDate_out"], context) :
                null) :
            null;

        context["field"] = "openingBalance_out";
        context["metadata"] = (objectMetadata ? objectMetadata["openingBalance_out"] : null);
        privateState.openingBalance_out = defaultValues ?
            (defaultValues["openingBalance_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["openingBalance_out"], context) :
                null) :
            null;

        context["field"] = "authorizedCumul_out";
        context["metadata"] = (objectMetadata ? objectMetadata["authorizedCumul_out"] : null);
        privateState.authorizedCumul_out = defaultValues ?
            (defaultValues["authorizedCumul_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authorizedCumul_out"], context) :
                null) :
            null;

        context["field"] = "status_out";
        context["metadata"] = (objectMetadata ? objectMetadata["status_out"] : null);
        privateState.status_out = defaultValues ?
            (defaultValues["status_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status_out"], context) :
                null) :
            null;

        context["field"] = "currency_out";
        context["metadata"] = (objectMetadata ? objectMetadata["currency_out"] : null);
        privateState.currency_out = defaultValues ?
            (defaultValues["currency_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currency_out"], context) :
                null) :
            null;

        context["field"] = "minimumDue_out";
        context["metadata"] = (objectMetadata ? objectMetadata["minimumDue_out"] : null);
        privateState.minimumDue_out = defaultValues ?
            (defaultValues["minimumDue_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["minimumDue_out"], context) :
                null) :
            null;

        context["field"] = "lateDate_out";
        context["metadata"] = (objectMetadata ? objectMetadata["lateDate_out"] : null);
        privateState.lateDate_out = defaultValues ?
            (defaultValues["lateDate_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lateDate_out"], context) :
                null) :
            null;

        context["field"] = "cmsAccountNumber_out";
        context["metadata"] = (objectMetadata ? objectMetadata["cmsAccountNumber_out"] : null);
        privateState.cmsAccountNumber_out = defaultValues ?
            (defaultValues["cmsAccountNumber_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cmsAccountNumber_out"], context) :
                null) :
            null;

        context["field"] = "branch_out";
        context["metadata"] = (objectMetadata ? objectMetadata["branch_out"] : null);
        privateState.branch_out = defaultValues ?
            (defaultValues["branch_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["branch_out"], context) :
                null) :
            null;

        context["field"] = "unpaidDate_out";
        context["metadata"] = (objectMetadata ? objectMetadata["unpaidDate_out"] : null);
        privateState.unpaidDate_out = defaultValues ?
            (defaultValues["unpaidDate_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unpaidDate_out"], context) :
                null) :
            null;

        context["field"] = "usedCumul_out";
        context["metadata"] = (objectMetadata ? objectMetadata["usedCumul_out"] : null);
        privateState.usedCumul_out = defaultValues ?
            (defaultValues["usedCumul_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["usedCumul_out"], context) :
                null) :
            null;

        context["field"] = "outstandingBalance_out";
        context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance_out"] : null);
        privateState.outstandingBalance_out = defaultValues ?
            (defaultValues["outstandingBalance_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["outstandingBalance_out"], context) :
                null) :
            null;

        context["field"] = "bankAccountNumber_out";
        context["metadata"] = (objectMetadata ? objectMetadata["bankAccountNumber_out"] : null);
        privateState.bankAccountNumber_out = defaultValues ?
            (defaultValues["bankAccountNumber_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankAccountNumber_out"], context) :
                null) :
            null;

        context["field"] = "minDuePaymentStatus_out";
        context["metadata"] = (objectMetadata ? objectMetadata["minDuePaymentStatus_out"] : null);
        privateState.minDuePaymentStatus_out = defaultValues ?
            (defaultValues["minDuePaymentStatus_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["minDuePaymentStatus_out"], context) :
                null) :
            null;

        context["field"] = "paymentNumber_out";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentNumber_out"] : null);
        privateState.paymentNumber_out = defaultValues ?
            (defaultValues["paymentNumber_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentNumber_out"], context) :
                null) :
            null;

        context["field"] = "lastCycleDate_out";
        context["metadata"] = (objectMetadata ? objectMetadata["lastCycleDate_out"] : null);
        privateState.lastCycleDate_out = defaultValues ?
            (defaultValues["lastCycleDate_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastCycleDate_out"], context) :
                null) :
            null;

        context["field"] = "overLimitAmount_out";
        context["metadata"] = (objectMetadata ? objectMetadata["overLimitAmount_out"] : null);
        privateState.overLimitAmount_out = defaultValues ?
            (defaultValues["overLimitAmount_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overLimitAmount_out"], context) :
                null) :
            null;

        context["field"] = "paymentCumul_out";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentCumul_out"] : null);
        privateState.paymentCumul_out = defaultValues ?
            (defaultValues["paymentCumul_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentCumul_out"], context) :
                null) :
            null;

        context["field"] = "dueDate_out";
        context["metadata"] = (objectMetadata ? objectMetadata["dueDate_out"] : null);
        privateState.dueDate_out = defaultValues ?
            (defaultValues["dueDate_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dueDate_out"], context) :
                null) :
            null;

        context["field"] = "available_out";
        context["metadata"] = (objectMetadata ? objectMetadata["available_out"] : null);
        privateState.available_out = defaultValues ?
            (defaultValues["available_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["available_out"], context) :
                null) :
            null;

        context["field"] = "overLimitStatus_out";
        context["metadata"] = (objectMetadata ? objectMetadata["overLimitStatus_out"] : null);
        privateState.overLimitStatus_out = defaultValues ?
            (defaultValues["overLimitStatus_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["overLimitStatus_out"], context) :
                null) :
            null;

        context["field"] = "unpaidStatus_out";
        context["metadata"] = (objectMetadata ? objectMetadata["unpaidStatus_out"] : null);
        privateState.unpaidStatus_out = defaultValues ?
            (defaultValues["unpaidStatus_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unpaidStatus_out"], context) :
                null) :
            null;

        context["field"] = "dueBalance_out";
        context["metadata"] = (objectMetadata ? objectMetadata["dueBalance_out"] : null);
        privateState.dueBalance_out = defaultValues ?
            (defaultValues["dueBalance_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dueBalance_out"], context) :
                null) :
            null;

        context["field"] = "action";
        context["metadata"] = (objectMetadata ? objectMetadata["action"] : null);
        privateState.action = defaultValues ?
            (defaultValues["action"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["action"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "reason";
        context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
        privateState.reason = defaultValues ?
            (defaultValues["reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reason"], context) :
                null) :
            null;

        context["field"] = "getPendingAuthorizationsResponse";
        context["metadata"] = (objectMetadata ? objectMetadata["getPendingAuthorizationsResponse"] : null);
        privateState.getPendingAuthorizationsResponse = defaultValues ?
            (defaultValues["getPendingAuthorizationsResponse"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["getPendingAuthorizationsResponse"], context) :
                null) :
            null;

        context["field"] = "pendingAuthInfo_out";
        context["metadata"] = (objectMetadata ? objectMetadata["pendingAuthInfo_out"] : null);
        privateState.pendingAuthInfo_out = defaultValues ?
            (defaultValues["pendingAuthInfo_out"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pendingAuthInfo_out"], context) :
                null) :
            null;

        context["field"] = "postingDate";
        context["metadata"] = (objectMetadata ? objectMetadata["postingDate"] : null);
        privateState.postingDate = defaultValues ?
            (defaultValues["postingDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["postingDate"], context) :
                null) :
            null;

        context["field"] = "authCode";
        context["metadata"] = (objectMetadata ? objectMetadata["authCode"] : null);
        privateState.authCode = defaultValues ?
            (defaultValues["authCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["authCode"], context) :
                null) :
            null;

        context["field"] = "transactionAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
        privateState.transactionAmount = defaultValues ?
            (defaultValues["transactionAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionAmount"], context) :
                null) :
            null;

        context["field"] = "reserved10";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved10"] : null);
        privateState.reserved10 = defaultValues ?
            (defaultValues["reserved10"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved10"], context) :
                null) :
            null;

        context["field"] = "transactionCode";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCode"] : null);
        privateState.transactionCode = defaultValues ?
            (defaultValues["transactionCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCode"], context) :
                null) :
            null;

        context["field"] = "reserved9";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved9"] : null);
        privateState.reserved9 = defaultValues ?
            (defaultValues["reserved9"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved9"], context) :
                null) :
            null;

        context["field"] = "reserved8";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved8"] : null);
        privateState.reserved8 = defaultValues ?
            (defaultValues["reserved8"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved8"], context) :
                null) :
            null;

        context["field"] = "referenceNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceNumber"] : null);
        privateState.referenceNumber = defaultValues ?
            (defaultValues["referenceNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceNumber"], context) :
                null) :
            null;

        context["field"] = "transactionDate";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
        privateState.transactionDate = defaultValues ?
            (defaultValues["transactionDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionDate"], context) :
                null) :
            null;

        context["field"] = "billingAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["billingAmount"] : null);
        privateState.billingAmount = defaultValues ?
            (defaultValues["billingAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billingAmount"], context) :
                null) :
            null;

        context["field"] = "reserved6";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved6"] : null);
        privateState.reserved6 = defaultValues ?
            (defaultValues["reserved6"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved6"], context) :
                null) :
            null;

        context["field"] = "reserved7";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved7"] : null);
        privateState.reserved7 = defaultValues ?
            (defaultValues["reserved7"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved7"], context) :
                null) :
            null;

        context["field"] = "merchantCategoryCode";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantCategoryCode"] : null);
        privateState.merchantCategoryCode = defaultValues ?
            (defaultValues["merchantCategoryCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantCategoryCode"], context) :
                null) :
            null;

        context["field"] = "reserved4";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved4"] : null);
        privateState.reserved4 = defaultValues ?
            (defaultValues["reserved4"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved4"], context) :
                null) :
            null;

        context["field"] = "merchantNameLocation";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantNameLocation"] : null);
        privateState.merchantNameLocation = defaultValues ?
            (defaultValues["merchantNameLocation"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantNameLocation"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "reserved5";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved5"] : null);
        privateState.reserved5 = defaultValues ?
            (defaultValues["reserved5"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved5"], context) :
                null) :
            null;

        context["field"] = "reserved2";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved2"] : null);
        privateState.reserved2 = defaultValues ?
            (defaultValues["reserved2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved2"], context) :
                null) :
            null;

        context["field"] = "bankActNum";
        context["metadata"] = (objectMetadata ? objectMetadata["bankActNum"] : null);
        privateState.bankActNum = defaultValues ?
            (defaultValues["bankActNum"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankActNum"], context) :
                null) :
            null;

        context["field"] = "reserved3";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved3"] : null);
        privateState.reserved3 = defaultValues ?
            (defaultValues["reserved3"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved3"], context) :
                null) :
            null;

        context["field"] = "reserved1";
        context["metadata"] = (objectMetadata ? objectMetadata["reserved1"] : null);
        privateState.reserved1 = defaultValues ?
            (defaultValues["reserved1"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["reserved1"], context) :
                null) :
            null;

        context["field"] = "mxpActNum";
        context["metadata"] = (objectMetadata ? objectMetadata["mxpActNum"] : null);
        privateState.mxpActNum = defaultValues ?
            (defaultValues["mxpActNum"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mxpActNum"], context) :
                null) :
            null;

        context["field"] = "referenceType";
        context["metadata"] = (objectMetadata ? objectMetadata["referenceType"] : null);
        privateState.referenceType = defaultValues ?
            (defaultValues["referenceType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["referenceType"], context) :
                null) :
            null;

        context["field"] = "cardPin";
        context["metadata"] = (objectMetadata ? objectMetadata["cardPin"] : null);
        privateState.cardPin = defaultValues ?
            (defaultValues["cardPin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardPin"], context) :
                null) :
            null;

        context["field"] = "cardFee";
        context["metadata"] = (objectMetadata ? objectMetadata["cardFee"] : null);
        privateState.cardFee = defaultValues ?
            (defaultValues["cardFee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardFee"], context) :
                null) :
            null;

        context["field"] = "p_err_code";
        context["metadata"] = (objectMetadata ? objectMetadata["p_err_code"] : null);
        privateState.p_err_code = defaultValues ?
            (defaultValues["p_err_code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["p_err_code"], context) :
                null) :
            null;

        context["field"] = "debitAccount";
        context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
        privateState.debitAccount = defaultValues ?
            (defaultValues["debitAccount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["debitAccount"], context) :
                null) :
            null;

        context["field"] = "serviceProvider";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
        privateState.serviceProvider = defaultValues ?
            (defaultValues["serviceProvider"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceProvider"], context) :
                null) :
            null;

        context["field"] = "cardDescription";
        context["metadata"] = (objectMetadata ? objectMetadata["cardDescription"] : null);
        privateState.cardDescription = defaultValues ?
            (defaultValues["cardDescription"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardDescription"], context) :
                null) :
            null;

        context["field"] = "dailyWithdrawLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["dailyWithdrawLimit"] : null);
        privateState.dailyWithdrawLimit = defaultValues ?
            (defaultValues["dailyWithdrawLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dailyWithdrawLimit"], context) :
                null) :
            null;

        context["field"] = "dailyPurchaseLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["dailyPurchaseLimit"] : null);
        privateState.dailyPurchaseLimit = defaultValues ?
            (defaultValues["dailyPurchaseLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dailyPurchaseLimit"], context) :
                null) :
            null;

        context["field"] = "annualFee";
        context["metadata"] = (objectMetadata ? objectMetadata["annualFee"] : null);
        privateState.annualFee = defaultValues ?
            (defaultValues["annualFee"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["annualFee"], context) :
                null) :
            null;

        context["field"] = "nameOnTheCard";
        context["metadata"] = (objectMetadata ? objectMetadata["nameOnTheCard"] : null);
        privateState.nameOnTheCard = defaultValues ?
            (defaultValues["nameOnTheCard"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nameOnTheCard"], context) :
                null) :
            null;

        context["field"] = "cardCategory";
        context["metadata"] = (objectMetadata ? objectMetadata["cardCategory"] : null);
        privateState.cardCategory = defaultValues ?
            (defaultValues["cardCategory"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardCategory"], context) :
                null) :
            null;

        context["field"] = "panNo";
        context["metadata"] = (objectMetadata ? objectMetadata["panNo"] : null);
        privateState.panNo = defaultValues ?
            (defaultValues["panNo"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["panNo"], context) :
                null) :
            null;

        context["field"] = "topupAmount";
        context["metadata"] = (objectMetadata ? objectMetadata["topupAmount"] : null);
        privateState.topupAmount = defaultValues ?
            (defaultValues["topupAmount"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["topupAmount"], context) :
                null) :
            null;

        context["field"] = "cCardRefNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cCardRefNumber"] : null);
        privateState.cCardRefNumber = defaultValues ?
            (defaultValues["cCardRefNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cCardRefNumber"], context) :
                null) :
            null;

        context["field"] = "cCardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cCardNumber"] : null);
        privateState.cCardNumber = defaultValues ?
            (defaultValues["cCardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cCardNumber"], context) :
                null) :
            null;

        context["field"] = "mxpAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["mxpAccountNumber"] : null);
        privateState.mxpAccountNumber = defaultValues ?
            (defaultValues["mxpAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["mxpAccountNumber"], context) :
                null) :
            null;

        context["field"] = "topupFees";
        context["metadata"] = (objectMetadata ? objectMetadata["topupFees"] : null);
        privateState.topupFees = defaultValues ?
            (defaultValues["topupFees"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["topupFees"], context) :
                null) :
            null;

        context["field"] = "topupCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["topupCurrency"] : null);
        privateState.topupCurrency = defaultValues ?
            (defaultValues["topupCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["topupCurrency"], context) :
                null) :
            null;

        context["field"] = "topupAmou";
        context["metadata"] = (objectMetadata ? objectMetadata["topupAmou"] : null);
        privateState.topupAmou = defaultValues ?
            (defaultValues["topupAmou"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["topupAmou"], context) :
                null) :
            null;

        context["field"] = "merchantCity";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantCity"] : null);
        privateState.merchantCity = defaultValues ?
            (defaultValues["merchantCity"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantCity"], context) :
                null) :
            null;

        context["field"] = "merchantName";
        context["metadata"] = (objectMetadata ? objectMetadata["merchantName"] : null);
        privateState.merchantName = defaultValues ?
            (defaultValues["merchantName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["merchantName"], context) :
                null) :
            null;

        context["field"] = "isDisputed";
        context["metadata"] = (objectMetadata ? objectMetadata["isDisputed"] : null);
        privateState.isDisputed = defaultValues ?
            (defaultValues["isDisputed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isDisputed"], context) :
                null) :
            null;

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "bankId": {
                get: function() {
                    context["field"] = "bankId";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankId, context);
                },
                set: function(val) {
                    setterFunctions['bankId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ebankingUser": {
                get: function() {
                    context["field"] = "ebankingUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["ebankingUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ebankingUser, context);
                },
                set: function(val) {
                    setterFunctions['ebankingUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ebankingPassword": {
                get: function() {
                    context["field"] = "ebankingPassword";
                    context["metadata"] = (objectMetadata ? objectMetadata["ebankingPassword"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ebankingPassword, context);
                },
                set: function(val) {
                    setterFunctions['ebankingPassword'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardNumber": {
                get: function() {
                    context["field"] = "cardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardNumber, context);
                },
                set: function(val) {
                    setterFunctions['cardNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardRefNbr": {
                get: function() {
                    context["field"] = "cardRefNbr";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardRefNbr"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardRefNbr, context);
                },
                set: function(val) {
                    setterFunctions['cardRefNbr'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cvv2_out": {
                get: function() {
                    context["field"] = "cvv2_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["cvv2_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cvv2_out, context);
                },
                set: function(val) {
                    setterFunctions['cvv2_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "p4dbc_out": {
                get: function() {
                    context["field"] = "p4dbc_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["p4dbc_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.p4dbc_out, context);
                },
                set: function(val) {
                    setterFunctions['p4dbc_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryDate_out": {
                get: function() {
                    context["field"] = "expiryDate_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryDate_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryDate_out, context);
                },
                set: function(val) {
                    setterFunctions['expiryDate_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "respCode_out": {
                get: function() {
                    context["field"] = "respCode_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["respCode_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.respCode_out, context);
                },
                set: function(val) {
                    setterFunctions['respCode_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "respLabel_out": {
                get: function() {
                    context["field"] = "respLabel_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["respLabel_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.respLabel_out, context);
                },
                set: function(val) {
                    setterFunctions['respLabel_out'].call(this, val, privateState);
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
            "balance_out": {
                get: function() {
                    context["field"] = "balance_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["balance_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.balance_out, context);
                },
                set: function(val) {
                    setterFunctions['balance_out'].call(this, val, privateState);
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
            "cardLevel": {
                get: function() {
                    context["field"] = "cardLevel";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardLevel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardLevel, context);
                },
                set: function(val) {
                    setterFunctions['cardLevel'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maskPan": {
                get: function() {
                    context["field"] = "maskPan";
                    context["metadata"] = (objectMetadata ? objectMetadata["maskPan"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maskPan, context);
                },
                set: function(val) {
                    setterFunctions['maskPan'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardIssueDate": {
                get: function() {
                    context["field"] = "cardIssueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardIssueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardIssueDate, context);
                },
                set: function(val) {
                    setterFunctions['cardIssueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardType": {
                get: function() {
                    context["field"] = "cardType";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardType, context);
                },
                set: function(val) {
                    setterFunctions['cardType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentInstructions": {
                get: function() {
                    context["field"] = "paymentInstructions";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentInstructions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentInstructions, context);
                },
                set: function(val) {
                    setterFunctions['paymentInstructions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardExpDate": {
                get: function() {
                    context["field"] = "cardExpDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardExpDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardExpDate, context);
                },
                set: function(val) {
                    setterFunctions['cardExpDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "statementDate": {
                get: function() {
                    context["field"] = "statementDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["statementDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.statementDate, context);
                },
                set: function(val) {
                    setterFunctions['statementDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "amountOverLimit": {
                get: function() {
                    context["field"] = "amountOverLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["amountOverLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.amountOverLimit, context);
                },
                set: function(val) {
                    setterFunctions['amountOverLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accCurr": {
                get: function() {
                    context["field"] = "accCurr";
                    context["metadata"] = (objectMetadata ? objectMetadata["accCurr"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accCurr, context);
                },
                set: function(val) {
                    setterFunctions['accCurr'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentDueDate": {
                get: function() {
                    context["field"] = "paymentDueDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentDueDate, context);
                },
                set: function(val) {
                    setterFunctions['paymentDueDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankAccNum": {
                get: function() {
                    context["field"] = "bankAccNum";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAccNum"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAccNum, context);
                },
                set: function(val) {
                    setterFunctions['bankAccNum'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardClassification": {
                get: function() {
                    context["field"] = "cardClassification";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardClassification"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardClassification, context);
                },
                set: function(val) {
                    setterFunctions['cardClassification'].call(this, val, privateState);
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
            "minPaymentAmount": {
                get: function() {
                    context["field"] = "minPaymentAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["minPaymentAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.minPaymentAmount, context);
                },
                set: function(val) {
                    setterFunctions['minPaymentAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardProgLabel": {
                get: function() {
                    context["field"] = "cardProgLabel";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardProgLabel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardProgLabel, context);
                },
                set: function(val) {
                    setterFunctions['cardProgLabel'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "creditLimit": {
                get: function() {
                    context["field"] = "creditLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditLimit, context);
                },
                set: function(val) {
                    setterFunctions['creditLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mxpAccNum": {
                get: function() {
                    context["field"] = "mxpAccNum";
                    context["metadata"] = (objectMetadata ? objectMetadata["mxpAccNum"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mxpAccNum, context);
                },
                set: function(val) {
                    setterFunctions['mxpAccNum'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pan": {
                get: function() {
                    context["field"] = "pan";
                    context["metadata"] = (objectMetadata ? objectMetadata["pan"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pan, context);
                },
                set: function(val) {
                    setterFunctions['pan'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardStatus": {
                get: function() {
                    context["field"] = "cardStatus";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardStatus, context);
                },
                set: function(val) {
                    setterFunctions['cardStatus'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "chName": {
                get: function() {
                    context["field"] = "chName";
                    context["metadata"] = (objectMetadata ? objectMetadata["chName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.chName, context);
                },
                set: function(val) {
                    setterFunctions['chName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "outstdBalance": {
                get: function() {
                    context["field"] = "outstdBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["outstdBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.outstdBalance, context);
                },
                set: function(val) {
                    setterFunctions['outstdBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateFrom": {
                get: function() {
                    context["field"] = "dateFrom";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateFrom"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateFrom, context);
                },
                set: function(val) {
                    setterFunctions['dateFrom'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dateTo": {
                get: function() {
                    context["field"] = "dateTo";
                    context["metadata"] = (objectMetadata ? objectMetadata["dateTo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dateTo, context);
                },
                set: function(val) {
                    setterFunctions['dateTo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tranDate": {
                get: function() {
                    context["field"] = "tranDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["tranDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tranDate, context);
                },
                set: function(val) {
                    setterFunctions['tranDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tranCode": {
                get: function() {
                    context["field"] = "tranCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["tranCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tranCode, context);
                },
                set: function(val) {
                    setterFunctions['tranCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tranBillAmou": {
                get: function() {
                    context["field"] = "tranBillAmou";
                    context["metadata"] = (objectMetadata ? objectMetadata["tranBillAmou"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tranBillAmou, context);
                },
                set: function(val) {
                    setterFunctions['tranBillAmou'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tranCurr": {
                get: function() {
                    context["field"] = "tranCurr";
                    context["metadata"] = (objectMetadata ? objectMetadata["tranCurr"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tranCurr, context);
                },
                set: function(val) {
                    setterFunctions['tranCurr'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tranAmou": {
                get: function() {
                    context["field"] = "tranAmou";
                    context["metadata"] = (objectMetadata ? objectMetadata["tranAmou"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tranAmou, context);
                },
                set: function(val) {
                    setterFunctions['tranAmou'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "tranBillCurr": {
                get: function() {
                    context["field"] = "tranBillCurr";
                    context["metadata"] = (objectMetadata ? objectMetadata["tranBillCurr"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.tranBillCurr, context);
                },
                set: function(val) {
                    setterFunctions['tranBillCurr'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "latePaymentStatus_out": {
                get: function() {
                    context["field"] = "latePaymentStatus_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["latePaymentStatus_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.latePaymentStatus_out, context);
                },
                set: function(val) {
                    setterFunctions['latePaymentStatus_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "closingBalance_out": {
                get: function() {
                    context["field"] = "closingBalance_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["closingBalance_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.closingBalance_out, context);
                },
                set: function(val) {
                    setterFunctions['closingBalance_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cycleDate_out": {
                get: function() {
                    context["field"] = "cycleDate_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["cycleDate_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cycleDate_out, context);
                },
                set: function(val) {
                    setterFunctions['cycleDate_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "openingBalance_out": {
                get: function() {
                    context["field"] = "openingBalance_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["openingBalance_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.openingBalance_out, context);
                },
                set: function(val) {
                    setterFunctions['openingBalance_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "authorizedCumul_out": {
                get: function() {
                    context["field"] = "authorizedCumul_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["authorizedCumul_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authorizedCumul_out, context);
                },
                set: function(val) {
                    setterFunctions['authorizedCumul_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "status_out": {
                get: function() {
                    context["field"] = "status_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["status_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.status_out, context);
                },
                set: function(val) {
                    setterFunctions['status_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currency_out": {
                get: function() {
                    context["field"] = "currency_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["currency_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currency_out, context);
                },
                set: function(val) {
                    setterFunctions['currency_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "minimumDue_out": {
                get: function() {
                    context["field"] = "minimumDue_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["minimumDue_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.minimumDue_out, context);
                },
                set: function(val) {
                    setterFunctions['minimumDue_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lateDate_out": {
                get: function() {
                    context["field"] = "lateDate_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["lateDate_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lateDate_out, context);
                },
                set: function(val) {
                    setterFunctions['lateDate_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cmsAccountNumber_out": {
                get: function() {
                    context["field"] = "cmsAccountNumber_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["cmsAccountNumber_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cmsAccountNumber_out, context);
                },
                set: function(val) {
                    setterFunctions['cmsAccountNumber_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "branch_out": {
                get: function() {
                    context["field"] = "branch_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["branch_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.branch_out, context);
                },
                set: function(val) {
                    setterFunctions['branch_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unpaidDate_out": {
                get: function() {
                    context["field"] = "unpaidDate_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["unpaidDate_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unpaidDate_out, context);
                },
                set: function(val) {
                    setterFunctions['unpaidDate_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "usedCumul_out": {
                get: function() {
                    context["field"] = "usedCumul_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["usedCumul_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.usedCumul_out, context);
                },
                set: function(val) {
                    setterFunctions['usedCumul_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "outstandingBalance_out": {
                get: function() {
                    context["field"] = "outstandingBalance_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["outstandingBalance_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.outstandingBalance_out, context);
                },
                set: function(val) {
                    setterFunctions['outstandingBalance_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankAccountNumber_out": {
                get: function() {
                    context["field"] = "bankAccountNumber_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankAccountNumber_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankAccountNumber_out, context);
                },
                set: function(val) {
                    setterFunctions['bankAccountNumber_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "minDuePaymentStatus_out": {
                get: function() {
                    context["field"] = "minDuePaymentStatus_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["minDuePaymentStatus_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.minDuePaymentStatus_out, context);
                },
                set: function(val) {
                    setterFunctions['minDuePaymentStatus_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentNumber_out": {
                get: function() {
                    context["field"] = "paymentNumber_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentNumber_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentNumber_out, context);
                },
                set: function(val) {
                    setterFunctions['paymentNumber_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastCycleDate_out": {
                get: function() {
                    context["field"] = "lastCycleDate_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastCycleDate_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastCycleDate_out, context);
                },
                set: function(val) {
                    setterFunctions['lastCycleDate_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "overLimitAmount_out": {
                get: function() {
                    context["field"] = "overLimitAmount_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["overLimitAmount_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overLimitAmount_out, context);
                },
                set: function(val) {
                    setterFunctions['overLimitAmount_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentCumul_out": {
                get: function() {
                    context["field"] = "paymentCumul_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentCumul_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentCumul_out, context);
                },
                set: function(val) {
                    setterFunctions['paymentCumul_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dueDate_out": {
                get: function() {
                    context["field"] = "dueDate_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["dueDate_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dueDate_out, context);
                },
                set: function(val) {
                    setterFunctions['dueDate_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "available_out": {
                get: function() {
                    context["field"] = "available_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["available_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.available_out, context);
                },
                set: function(val) {
                    setterFunctions['available_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "overLimitStatus_out": {
                get: function() {
                    context["field"] = "overLimitStatus_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["overLimitStatus_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.overLimitStatus_out, context);
                },
                set: function(val) {
                    setterFunctions['overLimitStatus_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unpaidStatus_out": {
                get: function() {
                    context["field"] = "unpaidStatus_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["unpaidStatus_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unpaidStatus_out, context);
                },
                set: function(val) {
                    setterFunctions['unpaidStatus_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dueBalance_out": {
                get: function() {
                    context["field"] = "dueBalance_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["dueBalance_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dueBalance_out, context);
                },
                set: function(val) {
                    setterFunctions['dueBalance_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "action": {
                get: function() {
                    context["field"] = "action";
                    context["metadata"] = (objectMetadata ? objectMetadata["action"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.action, context);
                },
                set: function(val) {
                    setterFunctions['action'].call(this, val, privateState);
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
            "reason": {
                get: function() {
                    context["field"] = "reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reason, context);
                },
                set: function(val) {
                    setterFunctions['reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "getPendingAuthorizationsResponse": {
                get: function() {
                    context["field"] = "getPendingAuthorizationsResponse";
                    context["metadata"] = (objectMetadata ? objectMetadata["getPendingAuthorizationsResponse"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.getPendingAuthorizationsResponse, context);
                },
                set: function(val) {
                    setterFunctions['getPendingAuthorizationsResponse'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pendingAuthInfo_out": {
                get: function() {
                    context["field"] = "pendingAuthInfo_out";
                    context["metadata"] = (objectMetadata ? objectMetadata["pendingAuthInfo_out"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pendingAuthInfo_out, context);
                },
                set: function(val) {
                    setterFunctions['pendingAuthInfo_out'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "postingDate": {
                get: function() {
                    context["field"] = "postingDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["postingDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.postingDate, context);
                },
                set: function(val) {
                    setterFunctions['postingDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "authCode": {
                get: function() {
                    context["field"] = "authCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["authCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.authCode, context);
                },
                set: function(val) {
                    setterFunctions['authCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionAmount": {
                get: function() {
                    context["field"] = "transactionAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionAmount, context);
                },
                set: function(val) {
                    setterFunctions['transactionAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved10": {
                get: function() {
                    context["field"] = "reserved10";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved10"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved10, context);
                },
                set: function(val) {
                    setterFunctions['reserved10'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionCode": {
                get: function() {
                    context["field"] = "transactionCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCode, context);
                },
                set: function(val) {
                    setterFunctions['transactionCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved9": {
                get: function() {
                    context["field"] = "reserved9";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved9"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved9, context);
                },
                set: function(val) {
                    setterFunctions['reserved9'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved8": {
                get: function() {
                    context["field"] = "reserved8";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved8"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved8, context);
                },
                set: function(val) {
                    setterFunctions['reserved8'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceNumber": {
                get: function() {
                    context["field"] = "referenceNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceNumber, context);
                },
                set: function(val) {
                    setterFunctions['referenceNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionDate": {
                get: function() {
                    context["field"] = "transactionDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionDate, context);
                },
                set: function(val) {
                    setterFunctions['transactionDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "billingAmount": {
                get: function() {
                    context["field"] = "billingAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["billingAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billingAmount, context);
                },
                set: function(val) {
                    setterFunctions['billingAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved6": {
                get: function() {
                    context["field"] = "reserved6";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved6"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved6, context);
                },
                set: function(val) {
                    setterFunctions['reserved6'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved7": {
                get: function() {
                    context["field"] = "reserved7";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved7"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved7, context);
                },
                set: function(val) {
                    setterFunctions['reserved7'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantCategoryCode": {
                get: function() {
                    context["field"] = "merchantCategoryCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantCategoryCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantCategoryCode, context);
                },
                set: function(val) {
                    setterFunctions['merchantCategoryCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved4": {
                get: function() {
                    context["field"] = "reserved4";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved4"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved4, context);
                },
                set: function(val) {
                    setterFunctions['reserved4'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantNameLocation": {
                get: function() {
                    context["field"] = "merchantNameLocation";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantNameLocation"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantNameLocation, context);
                },
                set: function(val) {
                    setterFunctions['merchantNameLocation'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "transactionCurrency": {
                get: function() {
                    context["field"] = "transactionCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.transactionCurrency, context);
                },
                set: function(val) {
                    setterFunctions['transactionCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved5": {
                get: function() {
                    context["field"] = "reserved5";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved5"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved5, context);
                },
                set: function(val) {
                    setterFunctions['reserved5'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved2": {
                get: function() {
                    context["field"] = "reserved2";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved2, context);
                },
                set: function(val) {
                    setterFunctions['reserved2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankActNum": {
                get: function() {
                    context["field"] = "bankActNum";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankActNum"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankActNum, context);
                },
                set: function(val) {
                    setterFunctions['bankActNum'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved3": {
                get: function() {
                    context["field"] = "reserved3";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved3"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved3, context);
                },
                set: function(val) {
                    setterFunctions['reserved3'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "reserved1": {
                get: function() {
                    context["field"] = "reserved1";
                    context["metadata"] = (objectMetadata ? objectMetadata["reserved1"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.reserved1, context);
                },
                set: function(val) {
                    setterFunctions['reserved1'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mxpActNum": {
                get: function() {
                    context["field"] = "mxpActNum";
                    context["metadata"] = (objectMetadata ? objectMetadata["mxpActNum"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mxpActNum, context);
                },
                set: function(val) {
                    setterFunctions['mxpActNum'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "referenceType": {
                get: function() {
                    context["field"] = "referenceType";
                    context["metadata"] = (objectMetadata ? objectMetadata["referenceType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.referenceType, context);
                },
                set: function(val) {
                    setterFunctions['referenceType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardPin": {
                get: function() {
                    context["field"] = "cardPin";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardPin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardPin, context);
                },
                set: function(val) {
                    setterFunctions['cardPin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardFee": {
                get: function() {
                    context["field"] = "cardFee";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardFee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardFee, context);
                },
                set: function(val) {
                    setterFunctions['cardFee'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "p_err_code": {
                get: function() {
                    context["field"] = "p_err_code";
                    context["metadata"] = (objectMetadata ? objectMetadata["p_err_code"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.p_err_code, context);
                },
                set: function(val) {
                    setterFunctions['p_err_code'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "debitAccount": {
                get: function() {
                    context["field"] = "debitAccount";
                    context["metadata"] = (objectMetadata ? objectMetadata["debitAccount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.debitAccount, context);
                },
                set: function(val) {
                    setterFunctions['debitAccount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceProvider": {
                get: function() {
                    context["field"] = "serviceProvider";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceProvider, context);
                },
                set: function(val) {
                    setterFunctions['serviceProvider'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardDescription": {
                get: function() {
                    context["field"] = "cardDescription";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardDescription"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardDescription, context);
                },
                set: function(val) {
                    setterFunctions['cardDescription'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dailyWithdrawLimit": {
                get: function() {
                    context["field"] = "dailyWithdrawLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["dailyWithdrawLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dailyWithdrawLimit, context);
                },
                set: function(val) {
                    setterFunctions['dailyWithdrawLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dailyPurchaseLimit": {
                get: function() {
                    context["field"] = "dailyPurchaseLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["dailyPurchaseLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dailyPurchaseLimit, context);
                },
                set: function(val) {
                    setterFunctions['dailyPurchaseLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "annualFee": {
                get: function() {
                    context["field"] = "annualFee";
                    context["metadata"] = (objectMetadata ? objectMetadata["annualFee"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.annualFee, context);
                },
                set: function(val) {
                    setterFunctions['annualFee'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nameOnTheCard": {
                get: function() {
                    context["field"] = "nameOnTheCard";
                    context["metadata"] = (objectMetadata ? objectMetadata["nameOnTheCard"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nameOnTheCard, context);
                },
                set: function(val) {
                    setterFunctions['nameOnTheCard'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardCategory": {
                get: function() {
                    context["field"] = "cardCategory";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardCategory"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardCategory, context);
                },
                set: function(val) {
                    setterFunctions['cardCategory'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "panNo": {
                get: function() {
                    context["field"] = "panNo";
                    context["metadata"] = (objectMetadata ? objectMetadata["panNo"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.panNo, context);
                },
                set: function(val) {
                    setterFunctions['panNo'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "topupAmount": {
                get: function() {
                    context["field"] = "topupAmount";
                    context["metadata"] = (objectMetadata ? objectMetadata["topupAmount"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.topupAmount, context);
                },
                set: function(val) {
                    setterFunctions['topupAmount'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cCardRefNumber": {
                get: function() {
                    context["field"] = "cCardRefNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["cCardRefNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cCardRefNumber, context);
                },
                set: function(val) {
                    setterFunctions['cCardRefNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cCardNumber": {
                get: function() {
                    context["field"] = "cCardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["cCardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cCardNumber, context);
                },
                set: function(val) {
                    setterFunctions['cCardNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "mxpAccountNumber": {
                get: function() {
                    context["field"] = "mxpAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["mxpAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.mxpAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['mxpAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "topupFees": {
                get: function() {
                    context["field"] = "topupFees";
                    context["metadata"] = (objectMetadata ? objectMetadata["topupFees"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.topupFees, context);
                },
                set: function(val) {
                    setterFunctions['topupFees'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "topupCurrency": {
                get: function() {
                    context["field"] = "topupCurrency";
                    context["metadata"] = (objectMetadata ? objectMetadata["topupCurrency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.topupCurrency, context);
                },
                set: function(val) {
                    setterFunctions['topupCurrency'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "topupAmou": {
                get: function() {
                    context["field"] = "topupAmou";
                    context["metadata"] = (objectMetadata ? objectMetadata["topupAmou"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.topupAmou, context);
                },
                set: function(val) {
                    setterFunctions['topupAmou'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "merchantCity": {
                get: function() {
                    context["field"] = "merchantCity";
                    context["metadata"] = (objectMetadata ? objectMetadata["merchantCity"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.merchantCity, context);
                },
                set: function(val) {
                    setterFunctions['merchantCity'].call(this, val, privateState);
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
            "isDisputed": {
                get: function() {
                    context["field"] = "isDisputed";
                    context["metadata"] = (objectMetadata ? objectMetadata["isDisputed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isDisputed, context);
                },
                set: function(val) {
                    setterFunctions['isDisputed'].call(this, val, privateState);
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
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
            privateState.bankId = value ? (value["bankId"] ? value["bankId"] : null) : null;
            privateState.ebankingUser = value ? (value["ebankingUser"] ? value["ebankingUser"] : null) : null;
            privateState.ebankingPassword = value ? (value["ebankingPassword"] ? value["ebankingPassword"] : null) : null;
            privateState.cardNumber = value ? (value["cardNumber"] ? value["cardNumber"] : null) : null;
            privateState.cardRefNbr = value ? (value["cardRefNbr"] ? value["cardRefNbr"] : null) : null;
            privateState.cvv2_out = value ? (value["cvv2_out"] ? value["cvv2_out"] : null) : null;
            privateState.p4dbc_out = value ? (value["p4dbc_out"] ? value["p4dbc_out"] : null) : null;
            privateState.expiryDate_out = value ? (value["expiryDate_out"] ? value["expiryDate_out"] : null) : null;
            privateState.respCode_out = value ? (value["respCode_out"] ? value["respCode_out"] : null) : null;
            privateState.respLabel_out = value ? (value["respLabel_out"] ? value["respLabel_out"] : null) : null;
            privateState.result = value ? (value["result"] ? value["result"] : null) : null;
            privateState.balance_out = value ? (value["balance_out"] ? value["balance_out"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.customerId = value ? (value["customerId"] ? value["customerId"] : null) : null;
            privateState.cardLevel = value ? (value["cardLevel"] ? value["cardLevel"] : null) : null;
            privateState.maskPan = value ? (value["maskPan"] ? value["maskPan"] : null) : null;
            privateState.cardIssueDate = value ? (value["cardIssueDate"] ? value["cardIssueDate"] : null) : null;
            privateState.cardType = value ? (value["cardType"] ? value["cardType"] : null) : null;
            privateState.paymentInstructions = value ? (value["paymentInstructions"] ? value["paymentInstructions"] : null) : null;
            privateState.cardExpDate = value ? (value["cardExpDate"] ? value["cardExpDate"] : null) : null;
            privateState.statementDate = value ? (value["statementDate"] ? value["statementDate"] : null) : null;
            privateState.amountOverLimit = value ? (value["amountOverLimit"] ? value["amountOverLimit"] : null) : null;
            privateState.accCurr = value ? (value["accCurr"] ? value["accCurr"] : null) : null;
            privateState.paymentDueDate = value ? (value["paymentDueDate"] ? value["paymentDueDate"] : null) : null;
            privateState.bankAccNum = value ? (value["bankAccNum"] ? value["bankAccNum"] : null) : null;
            privateState.cardClassification = value ? (value["cardClassification"] ? value["cardClassification"] : null) : null;
            privateState.balance = value ? (value["balance"] ? value["balance"] : null) : null;
            privateState.minPaymentAmount = value ? (value["minPaymentAmount"] ? value["minPaymentAmount"] : null) : null;
            privateState.cardProgLabel = value ? (value["cardProgLabel"] ? value["cardProgLabel"] : null) : null;
            privateState.creditLimit = value ? (value["creditLimit"] ? value["creditLimit"] : null) : null;
            privateState.mxpAccNum = value ? (value["mxpAccNum"] ? value["mxpAccNum"] : null) : null;
            privateState.pan = value ? (value["pan"] ? value["pan"] : null) : null;
            privateState.cardStatus = value ? (value["cardStatus"] ? value["cardStatus"] : null) : null;
            privateState.chName = value ? (value["chName"] ? value["chName"] : null) : null;
            privateState.outstdBalance = value ? (value["outstdBalance"] ? value["outstdBalance"] : null) : null;
            privateState.dateFrom = value ? (value["dateFrom"] ? value["dateFrom"] : null) : null;
            privateState.dateTo = value ? (value["dateTo"] ? value["dateTo"] : null) : null;
            privateState.tranDate = value ? (value["tranDate"] ? value["tranDate"] : null) : null;
            privateState.tranCode = value ? (value["tranCode"] ? value["tranCode"] : null) : null;
            privateState.tranBillAmou = value ? (value["tranBillAmou"] ? value["tranBillAmou"] : null) : null;
            privateState.tranCurr = value ? (value["tranCurr"] ? value["tranCurr"] : null) : null;
            privateState.tranAmou = value ? (value["tranAmou"] ? value["tranAmou"] : null) : null;
            privateState.tranBillCurr = value ? (value["tranBillCurr"] ? value["tranBillCurr"] : null) : null;
            privateState.latePaymentStatus_out = value ? (value["latePaymentStatus_out"] ? value["latePaymentStatus_out"] : null) : null;
            privateState.closingBalance_out = value ? (value["closingBalance_out"] ? value["closingBalance_out"] : null) : null;
            privateState.cycleDate_out = value ? (value["cycleDate_out"] ? value["cycleDate_out"] : null) : null;
            privateState.openingBalance_out = value ? (value["openingBalance_out"] ? value["openingBalance_out"] : null) : null;
            privateState.authorizedCumul_out = value ? (value["authorizedCumul_out"] ? value["authorizedCumul_out"] : null) : null;
            privateState.status_out = value ? (value["status_out"] ? value["status_out"] : null) : null;
            privateState.currency_out = value ? (value["currency_out"] ? value["currency_out"] : null) : null;
            privateState.minimumDue_out = value ? (value["minimumDue_out"] ? value["minimumDue_out"] : null) : null;
            privateState.lateDate_out = value ? (value["lateDate_out"] ? value["lateDate_out"] : null) : null;
            privateState.cmsAccountNumber_out = value ? (value["cmsAccountNumber_out"] ? value["cmsAccountNumber_out"] : null) : null;
            privateState.branch_out = value ? (value["branch_out"] ? value["branch_out"] : null) : null;
            privateState.unpaidDate_out = value ? (value["unpaidDate_out"] ? value["unpaidDate_out"] : null) : null;
            privateState.usedCumul_out = value ? (value["usedCumul_out"] ? value["usedCumul_out"] : null) : null;
            privateState.outstandingBalance_out = value ? (value["outstandingBalance_out"] ? value["outstandingBalance_out"] : null) : null;
            privateState.bankAccountNumber_out = value ? (value["bankAccountNumber_out"] ? value["bankAccountNumber_out"] : null) : null;
            privateState.minDuePaymentStatus_out = value ? (value["minDuePaymentStatus_out"] ? value["minDuePaymentStatus_out"] : null) : null;
            privateState.paymentNumber_out = value ? (value["paymentNumber_out"] ? value["paymentNumber_out"] : null) : null;
            privateState.lastCycleDate_out = value ? (value["lastCycleDate_out"] ? value["lastCycleDate_out"] : null) : null;
            privateState.overLimitAmount_out = value ? (value["overLimitAmount_out"] ? value["overLimitAmount_out"] : null) : null;
            privateState.paymentCumul_out = value ? (value["paymentCumul_out"] ? value["paymentCumul_out"] : null) : null;
            privateState.dueDate_out = value ? (value["dueDate_out"] ? value["dueDate_out"] : null) : null;
            privateState.available_out = value ? (value["available_out"] ? value["available_out"] : null) : null;
            privateState.overLimitStatus_out = value ? (value["overLimitStatus_out"] ? value["overLimitStatus_out"] : null) : null;
            privateState.unpaidStatus_out = value ? (value["unpaidStatus_out"] ? value["unpaidStatus_out"] : null) : null;
            privateState.dueBalance_out = value ? (value["dueBalance_out"] ? value["dueBalance_out"] : null) : null;
            privateState.action = value ? (value["action"] ? value["action"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.reason = value ? (value["reason"] ? value["reason"] : null) : null;
            privateState.getPendingAuthorizationsResponse = value ? (value["getPendingAuthorizationsResponse"] ? value["getPendingAuthorizationsResponse"] : null) : null;
            privateState.pendingAuthInfo_out = value ? (value["pendingAuthInfo_out"] ? value["pendingAuthInfo_out"] : null) : null;
            privateState.postingDate = value ? (value["postingDate"] ? value["postingDate"] : null) : null;
            privateState.authCode = value ? (value["authCode"] ? value["authCode"] : null) : null;
            privateState.transactionAmount = value ? (value["transactionAmount"] ? value["transactionAmount"] : null) : null;
            privateState.reserved10 = value ? (value["reserved10"] ? value["reserved10"] : null) : null;
            privateState.transactionCode = value ? (value["transactionCode"] ? value["transactionCode"] : null) : null;
            privateState.reserved9 = value ? (value["reserved9"] ? value["reserved9"] : null) : null;
            privateState.reserved8 = value ? (value["reserved8"] ? value["reserved8"] : null) : null;
            privateState.referenceNumber = value ? (value["referenceNumber"] ? value["referenceNumber"] : null) : null;
            privateState.transactionDate = value ? (value["transactionDate"] ? value["transactionDate"] : null) : null;
            privateState.billingAmount = value ? (value["billingAmount"] ? value["billingAmount"] : null) : null;
            privateState.reserved6 = value ? (value["reserved6"] ? value["reserved6"] : null) : null;
            privateState.reserved7 = value ? (value["reserved7"] ? value["reserved7"] : null) : null;
            privateState.merchantCategoryCode = value ? (value["merchantCategoryCode"] ? value["merchantCategoryCode"] : null) : null;
            privateState.reserved4 = value ? (value["reserved4"] ? value["reserved4"] : null) : null;
            privateState.merchantNameLocation = value ? (value["merchantNameLocation"] ? value["merchantNameLocation"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.reserved5 = value ? (value["reserved5"] ? value["reserved5"] : null) : null;
            privateState.reserved2 = value ? (value["reserved2"] ? value["reserved2"] : null) : null;
            privateState.bankActNum = value ? (value["bankActNum"] ? value["bankActNum"] : null) : null;
            privateState.reserved3 = value ? (value["reserved3"] ? value["reserved3"] : null) : null;
            privateState.reserved1 = value ? (value["reserved1"] ? value["reserved1"] : null) : null;
            privateState.mxpActNum = value ? (value["mxpActNum"] ? value["mxpActNum"] : null) : null;
            privateState.referenceType = value ? (value["referenceType"] ? value["referenceType"] : null) : null;
            privateState.cardPin = value ? (value["cardPin"] ? value["cardPin"] : null) : null;
            privateState.cardFee = value ? (value["cardFee"] ? value["cardFee"] : null) : null;
            privateState.p_err_code = value ? (value["p_err_code"] ? value["p_err_code"] : null) : null;
            privateState.debitAccount = value ? (value["debitAccount"] ? value["debitAccount"] : null) : null;
            privateState.serviceProvider = value ? (value["serviceProvider"] ? value["serviceProvider"] : null) : null;
            privateState.cardDescription = value ? (value["cardDescription"] ? value["cardDescription"] : null) : null;
            privateState.dailyWithdrawLimit = value ? (value["dailyWithdrawLimit"] ? value["dailyWithdrawLimit"] : null) : null;
            privateState.dailyPurchaseLimit = value ? (value["dailyPurchaseLimit"] ? value["dailyPurchaseLimit"] : null) : null;
            privateState.annualFee = value ? (value["annualFee"] ? value["annualFee"] : null) : null;
            privateState.nameOnTheCard = value ? (value["nameOnTheCard"] ? value["nameOnTheCard"] : null) : null;
            privateState.cardCategory = value ? (value["cardCategory"] ? value["cardCategory"] : null) : null;
            privateState.panNo = value ? (value["panNo"] ? value["panNo"] : null) : null;
            privateState.topupAmount = value ? (value["topupAmount"] ? value["topupAmount"] : null) : null;
            privateState.cCardRefNumber = value ? (value["cCardRefNumber"] ? value["cCardRefNumber"] : null) : null;
            privateState.cCardNumber = value ? (value["cCardNumber"] ? value["cCardNumber"] : null) : null;
            privateState.mxpAccountNumber = value ? (value["mxpAccountNumber"] ? value["mxpAccountNumber"] : null) : null;
            privateState.topupFees = value ? (value["topupFees"] ? value["topupFees"] : null) : null;
            privateState.topupCurrency = value ? (value["topupCurrency"] ? value["topupCurrency"] : null) : null;
            privateState.topupAmou = value ? (value["topupAmou"] ? value["topupAmou"] : null) : null;
            privateState.merchantCity = value ? (value["merchantCity"] ? value["merchantCity"] : null) : null;
            privateState.merchantName = value ? (value["merchantName"] ? value["merchantName"] : null) : null;
            privateState.isDisputed = value ? (value["isDisputed"] ? value["isDisputed"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(S2MCardServices);

    //Create new class level validator object
    BaseModel.Validator.call(S2MCardServices);

    var registerValidatorBackup = S2MCardServices.registerValidator;

    S2MCardServices.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(S2MCardServices.isValid(this, propName, val)) {
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
    //For Operation 'getStatementEnquery' with service id 'getStatementEnquery3975'
     S2MCardServices.getStatementEnquery = function(params, onCompletion){
        return S2MCardServices.customVerb('getStatementEnquery', params, onCompletion);
     };

    //For Operation 'UnlockCard' with service id 'unlockCard4447'
     S2MCardServices.UnlockCard = function(params, onCompletion){
        return S2MCardServices.customVerb('UnlockCard', params, onCompletion);
     };

    //For Operation 'cardEMIRequest' with service id 'EMIRequest9521'
     S2MCardServices.cardEMIRequest = function(params, onCompletion){
        return S2MCardServices.customVerb('cardEMIRequest', params, onCompletion);
     };

    //For Operation 'cardChangeClearPIN' with service id 'changeClearPin3015'
     S2MCardServices.cardChangeClearPIN = function(params, onCompletion){
        return S2MCardServices.customVerb('cardChangeClearPIN', params, onCompletion);
     };

    //For Operation 'ReportLostCard' with service id 'reportLostCard8875'
     S2MCardServices.ReportLostCard = function(params, onCompletion){
        return S2MCardServices.customVerb('ReportLostCard', params, onCompletion);
     };

    //For Operation 'dollarCardTopup' with service id 'dollarCardTopup1653'
     S2MCardServices.dollarCardTopup = function(params, onCompletion){
        return S2MCardServices.customVerb('dollarCardTopup', params, onCompletion);
     };

    //For Operation 'getCardLimits' with service id 'getCardLimit1317'
     S2MCardServices.getCardLimits = function(params, onCompletion){
        return S2MCardServices.customVerb('getCardLimits', params, onCompletion);
     };

    //For Operation 'requestPrepaidCard' with service id 'requestPrepaidCard7783'
     S2MCardServices.requestPrepaidCard = function(params, onCompletion){
        return S2MCardServices.customVerb('requestPrepaidCard', params, onCompletion);
     };

    //For Operation 'ActivateCard' with service id 'activateCard9024'
     S2MCardServices.ActivateCard = function(params, onCompletion){
        return S2MCardServices.customVerb('ActivateCard', params, onCompletion);
     };

    //For Operation 'requestNewCard' with service id 'requestNewCard2595'
     S2MCardServices.requestNewCard = function(params, onCompletion){
        return S2MCardServices.customVerb('requestNewCard', params, onCompletion);
     };

    //For Operation 'requestDebitCard' with service id 'requestDebitCard8344'
     S2MCardServices.requestDebitCard = function(params, onCompletion){
        return S2MCardServices.customVerb('requestDebitCard', params, onCompletion);
     };

    //For Operation 'showCVV' with service id 'showCVV6034'
     S2MCardServices.showCVV = function(params, onCompletion){
        return S2MCardServices.customVerb('showCVV', params, onCompletion);
     };

    //For Operation 'cardStatusChange' with service id 'getCardStatusChange1156'
     S2MCardServices.cardStatusChange = function(params, onCompletion){
        return S2MCardServices.customVerb('cardStatusChange', params, onCompletion);
     };

    //For Operation 'getCards' with service id 'getCards4522'
     S2MCardServices.getCards = function(params, onCompletion){
        return S2MCardServices.customVerb('getCards', params, onCompletion);
     };

    //For Operation 'prepaidTopup' with service id 'prepaidTopup7479'
     S2MCardServices.prepaidTopup = function(params, onCompletion){
        return S2MCardServices.customVerb('prepaidTopup', params, onCompletion);
     };

    //For Operation 'transactionList' with service id 'transactionList7956'
     S2MCardServices.transactionList = function(params, onCompletion){
        return S2MCardServices.customVerb('transactionList', params, onCompletion);
     };

    //For Operation 'requestVirtualDollarCard' with service id 'requestVirtualDollarCard8408'
     S2MCardServices.requestVirtualDollarCard = function(params, onCompletion){
        return S2MCardServices.customVerb('requestVirtualDollarCard', params, onCompletion);
     };

    //For Operation 'LockCard' with service id 'lockCard8201'
     S2MCardServices.LockCard = function(params, onCompletion){
        return S2MCardServices.customVerb('LockCard', params, onCompletion);
     };

    //For Operation 'getCardBalance' with service id 'getCardBalance6856'
     S2MCardServices.getCardBalance = function(params, onCompletion){
        return S2MCardServices.customVerb('getCardBalance', params, onCompletion);
     };

    //For Operation 'getCardPendingTransactions' with service id 'pendingTransactions5583'
     S2MCardServices.getCardPendingTransactions = function(params, onCompletion){
        return S2MCardServices.customVerb('getCardPendingTransactions', params, onCompletion);
     };

    var relations = [];

    S2MCardServices.relations = relations;

    S2MCardServices.prototype.isValid = function() {
        return S2MCardServices.isValid(this);
    };

    S2MCardServices.prototype.objModelName = "S2MCardServices";
    S2MCardServices.prototype.objServiceName = "CardManagementServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    S2MCardServices.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "S2MCardServices", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    S2MCardServices.clone = function(objectToClone) {
        var clonedObj = new S2MCardServices();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return S2MCardServices;
});