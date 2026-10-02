/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "RequestCreditCard", "objectService" : "CardManagementServices"};

    var setterFunctions = {
        accountId: function(val, state) {
            context["field"] = "accountId";
            context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
            state['accountId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Action: function(val, state) {
            context["field"] = "Action";
            context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
            state['Action'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardHolderName: function(val, state) {
            context["field"] = "cardHolderName";
            context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
            state['cardHolderName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardId: function(val, state) {
            context["field"] = "cardId";
            context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
            state['cardId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardNumber: function(val, state) {
            context["field"] = "cardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
            state['cardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardStatus: function(val, state) {
            context["field"] = "cardStatus";
            context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
            state['cardStatus'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardType: function(val, state) {
            context["field"] = "cardType";
            context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
            state['cardType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errmsg: function(val, state) {
            context["field"] = "errmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
            state['errmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryDate: function(val, state) {
            context["field"] = "expiryDate";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
            state['expiryDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Reason: function(val, state) {
            context["field"] = "Reason";
            context["metadata"] = (objectMetadata ? objectMetadata["Reason"] : null);
            state['Reason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        success: function(val, state) {
            context["field"] = "success";
            context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
            state['success'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userId: function(val, state) {
            context["field"] = "userId";
            context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
            state['userId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditLimit: function(val, state) {
            context["field"] = "creditLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
            state['creditLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableCredit: function(val, state) {
            context["field"] = "availableCredit";
            context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
            state['availableCredit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceProvider: function(val, state) {
            context["field"] = "serviceProvider";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
            state['serviceProvider'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        billingAddress: function(val, state) {
            context["field"] = "billingAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
            state['billingAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cardProductName: function(val, state) {
            context["field"] = "cardProductName";
            context["metadata"] = (objectMetadata ? objectMetadata["cardProductName"] : null);
            state['cardProductName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        secondaryCardHolder: function(val, state) {
            context["field"] = "secondaryCardHolder";
            context["metadata"] = (objectMetadata ? objectMetadata["secondaryCardHolder"] : null);
            state['secondaryCardHolder'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawlLimit: function(val, state) {
            context["field"] = "withdrawlLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
            state['withdrawlLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawalMinLimit: function(val, state) {
            context["field"] = "withdrawalMinLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMinLimit"] : null);
            state['withdrawalMinLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawalMaxLimit: function(val, state) {
            context["field"] = "withdrawalMaxLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMaxLimit"] : null);
            state['withdrawalMaxLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        withdrawalStepLimit: function(val, state) {
            context["field"] = "withdrawalStepLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["withdrawalStepLimit"] : null);
            state['withdrawalStepLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseLimit: function(val, state) {
            context["field"] = "purchaseLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
            state['purchaseLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseMinLimit: function(val, state) {
            context["field"] = "purchaseMinLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseMinLimit"] : null);
            state['purchaseMinLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseMaxLimit: function(val, state) {
            context["field"] = "purchaseMaxLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseMaxLimit"] : null);
            state['purchaseMaxLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        purchaseStepLimit: function(val, state) {
            context["field"] = "purchaseStepLimit";
            context["metadata"] = (objectMetadata ? objectMetadata["purchaseStepLimit"] : null);
            state['purchaseStepLimit'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountNumber: function(val, state) {
            context["field"] = "accountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
            state['accountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountName: function(val, state) {
            context["field"] = "accountName";
            context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
            state['accountName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maskedAccountNumber: function(val, state) {
            context["field"] = "maskedAccountNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["maskedAccountNumber"] : null);
            state['maskedAccountNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maskedCardNumber: function(val, state) {
            context["field"] = "maskedCardNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["maskedCardNumber"] : null);
            state['maskedCardNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isInternational: function(val, state) {
            context["field"] = "isInternational";
            context["metadata"] = (objectMetadata ? objectMetadata["isInternational"] : null);
            state['isInternational'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ids: function(val, state) {
            context["field"] = "ids";
            context["metadata"] = (objectMetadata ? objectMetadata["ids"] : null);
            state['ids'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Destinations: function(val, state) {
            context["field"] = "Destinations";
            context["metadata"] = (objectMetadata ? objectMetadata["Destinations"] : null);
            state['Destinations'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Cards: function(val, state) {
            context["field"] = "Cards";
            context["metadata"] = (objectMetadata ? objectMetadata["Cards"] : null);
            state['Cards'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Channel_id: function(val, state) {
            context["field"] = "Channel_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
            state['Channel_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        StartDate: function(val, state) {
            context["field"] = "StartDate";
            context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
            state['StartDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        EndDate: function(val, state) {
            context["field"] = "EndDate";
            context["metadata"] = (objectMetadata ? objectMetadata["EndDate"] : null);
            state['EndDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        additionNotes: function(val, state) {
            context["field"] = "additionNotes";
            context["metadata"] = (objectMetadata ? objectMetadata["additionNotes"] : null);
            state['additionNotes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        phonenumber: function(val, state) {
            context["field"] = "phonenumber";
            context["metadata"] = (objectMetadata ? objectMetadata["phonenumber"] : null);
            state['phonenumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        request_id: function(val, state) {
            context["field"] = "request_id";
            context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
            state['request_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        bankName: function(val, state) {
            context["field"] = "bankName";
            context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
            state['bankName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        AccountType: function(val, state) {
            context["field"] = "AccountType";
            context["metadata"] = (objectMetadata ? objectMetadata["AccountType"] : null);
            state['AccountType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestCode: function(val, state) {
            context["field"] = "RequestCode";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestCode"] : null);
            state['RequestCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        RequestReason: function(val, state) {
            context["field"] = "RequestReason";
            context["metadata"] = (objectMetadata ? objectMetadata["RequestReason"] : null);
            state['RequestReason'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Channel: function(val, state) {
            context["field"] = "Channel";
            context["metadata"] = (objectMetadata ? objectMetadata["Channel"] : null);
            state['Channel'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Address_id: function(val, state) {
            context["field"] = "Address_id";
            context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
            state['Address_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        communication_id: function(val, state) {
            context["field"] = "communication_id";
            context["metadata"] = (objectMetadata ? objectMetadata["communication_id"] : null);
            state['communication_id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        CardNumbers: function(val, state) {
            context["field"] = "CardNumbers";
            context["metadata"] = (objectMetadata ? objectMetadata["CardNumbers"] : null);
            state['CardNumbers'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lastNinetyDays: function(val, state) {
            context["field"] = "lastNinetyDays";
            context["metadata"] = (objectMetadata ? objectMetadata["lastNinetyDays"] : null);
            state['lastNinetyDays'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        errorMessage: function(val, state) {
            context["field"] = "errorMessage";
            context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
            state['errorMessage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrCode: function(val, state) {
            context["field"] = "dbpErrCode";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
            state['dbpErrCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        dbpErrMsg: function(val, state) {
            context["field"] = "dbpErrMsg";
            context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
            state['dbpErrMsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newPin: function(val, state) {
            context["field"] = "newPin";
            context["metadata"] = (objectMetadata ? objectMetadata["newPin"] : null);
            state['newPin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        MFAAttributes: function(val, state) {
            context["field"] = "MFAAttributes";
            context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
            state['MFAAttributes'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceName: function(val, state) {
            context["field"] = "serviceName";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
            state['serviceName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Otp: function(val, state) {
            context["field"] = "Otp";
            context["metadata"] = (objectMetadata ? objectMetadata["Otp"] : null);
            state['Otp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OtpGenaratedts: function(val, state) {
            context["field"] = "OtpGenaratedts";
            context["metadata"] = (objectMetadata ? objectMetadata["OtpGenaratedts"] : null);
            state['OtpGenaratedts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        securityQuestions: function(val, state) {
            context["field"] = "securityQuestions";
            context["metadata"] = (objectMetadata ? objectMetadata["securityQuestions"] : null);
            state['securityQuestions'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerAnswer: function(val, state) {
            context["field"] = "customerAnswer";
            context["metadata"] = (objectMetadata ? objectMetadata["customerAnswer"] : null);
            state['customerAnswer'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        questionId: function(val, state) {
            context["field"] = "questionId";
            context["metadata"] = (objectMetadata ? objectMetadata["questionId"] : null);
            state['questionId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        maxFailedAttemptsAllowed: function(val, state) {
            context["field"] = "maxFailedAttemptsAllowed";
            context["metadata"] = (objectMetadata ? objectMetadata["maxFailedAttemptsAllowed"] : null);
            state['maxFailedAttemptsAllowed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ValidDate: function(val, state) {
            context["field"] = "ValidDate";
            context["metadata"] = (objectMetadata ? objectMetadata["ValidDate"] : null);
            state['ValidDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        unsuccessfulLoginAttempts: function(val, state) {
            context["field"] = "unsuccessfulLoginAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["unsuccessfulLoginAttempts"] : null);
            state['unsuccessfulLoginAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isUserAccountLocked: function(val, state) {
            context["field"] = "isUserAccountLocked";
            context["metadata"] = (objectMetadata ? objectMetadata["isUserAccountLocked"] : null);
            state['isUserAccountLocked'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Phone: function(val, state) {
            context["field"] = "Phone";
            context["metadata"] = (objectMetadata ? objectMetadata["Phone"] : null);
            state['Phone'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Email: function(val, state) {
            context["field"] = "Email";
            context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
            state['Email'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        sacMaxResendRequestsAllowed: function(val, state) {
            context["field"] = "sacMaxResendRequestsAllowed";
            context["metadata"] = (objectMetadata ? objectMetadata["sacMaxResendRequestsAllowed"] : null);
            state['sacMaxResendRequestsAllowed'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remainingResendAttempts: function(val, state) {
            context["field"] = "remainingResendAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["remainingResendAttempts"] : null);
            state['remainingResendAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        remainingFailedAttempts: function(val, state) {
            context["field"] = "remainingFailedAttempts";
            context["metadata"] = (objectMetadata ? objectMetadata["remainingFailedAttempts"] : null);
            state['remainingFailedAttempts'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isOtpVerified: function(val, state) {
            context["field"] = "isOtpVerified";
            context["metadata"] = (objectMetadata ? objectMetadata["isOtpVerified"] : null);
            state['isOtpVerified'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockUser: function(val, state) {
            context["field"] = "lockUser";
            context["metadata"] = (objectMetadata ? objectMetadata["lockUser"] : null);
            state['lockUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        logoutUser: function(val, state) {
            context["field"] = "logoutUser";
            context["metadata"] = (objectMetadata ? objectMetadata["logoutUser"] : null);
            state['logoutUser'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        lockoutTime: function(val, state) {
            context["field"] = "lockoutTime";
            context["metadata"] = (objectMetadata ? objectMetadata["lockoutTime"] : null);
            state['lockoutTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isOTPExpired: function(val, state) {
            context["field"] = "isOTPExpired";
            context["metadata"] = (objectMetadata ? objectMetadata["isOTPExpired"] : null);
            state['isOTPExpired'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        transactionCurrency: function(val, state) {
            context["field"] = "transactionCurrency";
            context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
            state['transactionCurrency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Currency: function(val, state) {
            context["field"] = "Currency";
            context["metadata"] = (objectMetadata ? objectMetadata["Currency"] : null);
            state['Currency'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currencyCode: function(val, state) {
            context["field"] = "currencyCode";
            context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
            state['currencyCode'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cvv: function(val, state) {
            context["field"] = "cvv";
            context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
            state['cvv'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldcvv: function(val, state) {
            context["field"] = "oldcvv";
            context["metadata"] = (objectMetadata ? objectMetadata["oldcvv"] : null);
            state['oldcvv'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        oldCardId: function(val, state) {
            context["field"] = "oldCardId";
            context["metadata"] = (objectMetadata ? objectMetadata["oldCardId"] : null);
            state['oldCardId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        successmsg: function(val, state) {
            context["field"] = "successmsg";
            context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
            state['successmsg'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        currentBalance: function(val, state) {
            context["field"] = "currentBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
            state['currentBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        rewardsPoint: function(val, state) {
            context["field"] = "rewardsPoint";
            context["metadata"] = (objectMetadata ? objectMetadata["rewardsPoint"] : null);
            state['rewardsPoint'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentDueDate: function(val, state) {
            context["field"] = "paymentDueDate";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
            state['paymentDueDate'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        availableBalance: function(val, state) {
            context["field"] = "availableBalance";
            context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
            state['availableBalance'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isTypeBusiness: function(val, state) {
            context["field"] = "isTypeBusiness";
            context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
            state['isTypeBusiness'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        isExpiring: function(val, state) {
            context["field"] = "isExpiring";
            context["metadata"] = (objectMetadata ? objectMetadata["isExpiring"] : null);
            state['isExpiring'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        pinNumber: function(val, state) {
            context["field"] = "pinNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["pinNumber"] : null);
            state['pinNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        requestBody: function(val, state) {
            context["field"] = "requestBody";
            context["metadata"] = (objectMetadata ? objectMetadata["requestBody"] : null);
            state['requestBody'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        type: function(val, state) {
            context["field"] = "type";
            context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
            state['type'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        subtype: function(val, state) {
            context["field"] = "subtype";
            context["metadata"] = (objectMetadata ? objectMetadata["subtype"] : null);
            state['subtype'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        orderId: function(val, state) {
            context["field"] = "orderId";
            context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
            state['orderId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        message: function(val, state) {
            context["field"] = "message";
            context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
            state['message'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        status: function(val, state) {
            context["field"] = "status";
            context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
            state['status'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        code: function(val, state) {
            context["field"] = "code";
            context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
            state['code'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        creditCardProtection: function(val, state) {
            context["field"] = "creditCardProtection";
            context["metadata"] = (objectMetadata ? objectMetadata["creditCardProtection"] : null);
            state['creditCardProtection'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vCardID: function(val, state) {
            context["field"] = "vCardID";
            context["metadata"] = (objectMetadata ? objectMetadata["vCardID"] : null);
            state['vCardID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentAccountReference: function(val, state) {
            context["field"] = "paymentAccountReference";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentAccountReference"] : null);
            state['paymentAccountReference'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceID: function(val, state) {
            context["field"] = "deviceID";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
            state['deviceID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        clientCustomerID: function(val, state) {
            context["field"] = "clientCustomerID";
            context["metadata"] = (objectMetadata ? objectMetadata["clientCustomerID"] : null);
            state['clientCustomerID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceCert: function(val, state) {
            context["field"] = "deviceCert";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceCert"] : null);
            state['deviceCert'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nonceSignature: function(val, state) {
            context["field"] = "nonceSignature";
            context["metadata"] = (objectMetadata ? objectMetadata["nonceSignature"] : null);
            state['nonceSignature'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nonce: function(val, state) {
            context["field"] = "nonce";
            context["metadata"] = (objectMetadata ? objectMetadata["nonce"] : null);
            state['nonce'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        encryptedPassData: function(val, state) {
            context["field"] = "encryptedPassData";
            context["metadata"] = (objectMetadata ? objectMetadata["encryptedPassData"] : null);
            state['encryptedPassData'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        activationData: function(val, state) {
            context["field"] = "activationData";
            context["metadata"] = (objectMetadata ? objectMetadata["activationData"] : null);
            state['activationData'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        ephemeralPublicKey: function(val, state) {
            context["field"] = "ephemeralPublicKey";
            context["metadata"] = (objectMetadata ? objectMetadata["ephemeralPublicKey"] : null);
            state['ephemeralPublicKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        last4: function(val, state) {
            context["field"] = "last4";
            context["metadata"] = (objectMetadata ? objectMetadata["last4"] : null);
            state['last4'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        encMobileNumber: function(val, state) {
            context["field"] = "encMobileNumber";
            context["metadata"] = (objectMetadata ? objectMetadata["encMobileNumber"] : null);
            state['encMobileNumber'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        opaquePaymentCard: function(val, state) {
            context["field"] = "opaquePaymentCard";
            context["metadata"] = (objectMetadata ? objectMetadata["opaquePaymentCard"] : null);
            state['opaquePaymentCard'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        encAddress: function(val, state) {
            context["field"] = "encAddress";
            context["metadata"] = (objectMetadata ? objectMetadata["encAddress"] : null);
            state['encAddress'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        paymentService: function(val, state) {
            context["field"] = "paymentService";
            context["metadata"] = (objectMetadata ? objectMetadata["paymentService"] : null);
            state['paymentService'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        PAN: function(val, state) {
            context["field"] = "PAN";
            context["metadata"] = (objectMetadata ? objectMetadata["PAN"] : null);
            state['PAN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nameOnCard: function(val, state) {
            context["field"] = "nameOnCard";
            context["metadata"] = (objectMetadata ? objectMetadata["nameOnCard"] : null);
            state['nameOnCard'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryMonth: function(val, state) {
            context["field"] = "expiryMonth";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryMonth"] : null);
            state['expiryMonth'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        expiryYear: function(val, state) {
            context["field"] = "expiryYear";
            context["metadata"] = (objectMetadata ? objectMetadata["expiryYear"] : null);
            state['expiryYear'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        cvv2: function(val, state) {
            context["field"] = "cvv2";
            context["metadata"] = (objectMetadata ? objectMetadata["cvv2"] : null);
            state['cvv2'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vClientIDForPartner: function(val, state) {
            context["field"] = "vClientIDForPartner";
            context["metadata"] = (objectMetadata ? objectMetadata["vClientIDForPartner"] : null);
            state['vClientIDForPartner'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        vCustomerIDForPartner: function(val, state) {
            context["field"] = "vCustomerIDForPartner";
            context["metadata"] = (objectMetadata ? objectMetadata["vCustomerIDForPartner"] : null);
            state['vCustomerIDForPartner'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        updatedDateTime: function(val, state) {
            context["field"] = "updatedDateTime";
            context["metadata"] = (objectMetadata ? objectMetadata["updatedDateTime"] : null);
            state['updatedDateTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        createdDateTime: function(val, state) {
            context["field"] = "createdDateTime";
            context["metadata"] = (objectMetadata ? objectMetadata["createdDateTime"] : null);
            state['createdDateTime'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function RequestCreditCard(defaultValues) {
        var privateState = {};
        context["field"] = "accountId";
        context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
        privateState.accountId = defaultValues ?
            (defaultValues["accountId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountId"], context) :
                null) :
            null;

        context["field"] = "Action";
        context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
        privateState.Action = defaultValues ?
            (defaultValues["Action"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Action"], context) :
                null) :
            null;

        context["field"] = "cardHolderName";
        context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
        privateState.cardHolderName = defaultValues ?
            (defaultValues["cardHolderName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardHolderName"], context) :
                null) :
            null;

        context["field"] = "cardId";
        context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
        privateState.cardId = defaultValues ?
            (defaultValues["cardId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardId"], context) :
                null) :
            null;

        context["field"] = "cardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["cardNumber"] : null);
        privateState.cardNumber = defaultValues ?
            (defaultValues["cardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardNumber"], context) :
                null) :
            null;

        context["field"] = "cardStatus";
        context["metadata"] = (objectMetadata ? objectMetadata["cardStatus"] : null);
        privateState.cardStatus = defaultValues ?
            (defaultValues["cardStatus"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardStatus"], context) :
                null) :
            null;

        context["field"] = "cardType";
        context["metadata"] = (objectMetadata ? objectMetadata["cardType"] : null);
        privateState.cardType = defaultValues ?
            (defaultValues["cardType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardType"], context) :
                null) :
            null;

        context["field"] = "errmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
        privateState.errmsg = defaultValues ?
            (defaultValues["errmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errmsg"], context) :
                null) :
            null;

        context["field"] = "expiryDate";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
        privateState.expiryDate = defaultValues ?
            (defaultValues["expiryDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryDate"], context) :
                null) :
            null;

        context["field"] = "Reason";
        context["metadata"] = (objectMetadata ? objectMetadata["Reason"] : null);
        privateState.Reason = defaultValues ?
            (defaultValues["Reason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Reason"], context) :
                null) :
            null;

        context["field"] = "success";
        context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
        privateState.success = defaultValues ?
            (defaultValues["success"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["success"], context) :
                null) :
            null;

        context["field"] = "userId";
        context["metadata"] = (objectMetadata ? objectMetadata["userId"] : null);
        privateState.userId = defaultValues ?
            (defaultValues["userId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userId"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "creditLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["creditLimit"] : null);
        privateState.creditLimit = defaultValues ?
            (defaultValues["creditLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditLimit"], context) :
                null) :
            null;

        context["field"] = "availableCredit";
        context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
        privateState.availableCredit = defaultValues ?
            (defaultValues["availableCredit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableCredit"], context) :
                null) :
            null;

        context["field"] = "serviceProvider";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceProvider"] : null);
        privateState.serviceProvider = defaultValues ?
            (defaultValues["serviceProvider"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceProvider"], context) :
                null) :
            null;

        context["field"] = "billingAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
        privateState.billingAddress = defaultValues ?
            (defaultValues["billingAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["billingAddress"], context) :
                null) :
            null;

        context["field"] = "cardProductName";
        context["metadata"] = (objectMetadata ? objectMetadata["cardProductName"] : null);
        privateState.cardProductName = defaultValues ?
            (defaultValues["cardProductName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cardProductName"], context) :
                null) :
            null;

        context["field"] = "secondaryCardHolder";
        context["metadata"] = (objectMetadata ? objectMetadata["secondaryCardHolder"] : null);
        privateState.secondaryCardHolder = defaultValues ?
            (defaultValues["secondaryCardHolder"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["secondaryCardHolder"], context) :
                null) :
            null;

        context["field"] = "withdrawlLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
        privateState.withdrawlLimit = defaultValues ?
            (defaultValues["withdrawlLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawlLimit"], context) :
                null) :
            null;

        context["field"] = "withdrawalMinLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMinLimit"] : null);
        privateState.withdrawalMinLimit = defaultValues ?
            (defaultValues["withdrawalMinLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawalMinLimit"], context) :
                null) :
            null;

        context["field"] = "withdrawalMaxLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMaxLimit"] : null);
        privateState.withdrawalMaxLimit = defaultValues ?
            (defaultValues["withdrawalMaxLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawalMaxLimit"], context) :
                null) :
            null;

        context["field"] = "withdrawalStepLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["withdrawalStepLimit"] : null);
        privateState.withdrawalStepLimit = defaultValues ?
            (defaultValues["withdrawalStepLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["withdrawalStepLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
        privateState.purchaseLimit = defaultValues ?
            (defaultValues["purchaseLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseMinLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseMinLimit"] : null);
        privateState.purchaseMinLimit = defaultValues ?
            (defaultValues["purchaseMinLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseMinLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseMaxLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseMaxLimit"] : null);
        privateState.purchaseMaxLimit = defaultValues ?
            (defaultValues["purchaseMaxLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseMaxLimit"], context) :
                null) :
            null;

        context["field"] = "purchaseStepLimit";
        context["metadata"] = (objectMetadata ? objectMetadata["purchaseStepLimit"] : null);
        privateState.purchaseStepLimit = defaultValues ?
            (defaultValues["purchaseStepLimit"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["purchaseStepLimit"], context) :
                null) :
            null;

        context["field"] = "accountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["accountNumber"] : null);
        privateState.accountNumber = defaultValues ?
            (defaultValues["accountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountNumber"], context) :
                null) :
            null;

        context["field"] = "accountName";
        context["metadata"] = (objectMetadata ? objectMetadata["accountName"] : null);
        privateState.accountName = defaultValues ?
            (defaultValues["accountName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountName"], context) :
                null) :
            null;

        context["field"] = "maskedAccountNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["maskedAccountNumber"] : null);
        privateState.maskedAccountNumber = defaultValues ?
            (defaultValues["maskedAccountNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maskedAccountNumber"], context) :
                null) :
            null;

        context["field"] = "maskedCardNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["maskedCardNumber"] : null);
        privateState.maskedCardNumber = defaultValues ?
            (defaultValues["maskedCardNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maskedCardNumber"], context) :
                null) :
            null;

        context["field"] = "isInternational";
        context["metadata"] = (objectMetadata ? objectMetadata["isInternational"] : null);
        privateState.isInternational = defaultValues ?
            (defaultValues["isInternational"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isInternational"], context) :
                null) :
            null;

        context["field"] = "ids";
        context["metadata"] = (objectMetadata ? objectMetadata["ids"] : null);
        privateState.ids = defaultValues ?
            (defaultValues["ids"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ids"], context) :
                null) :
            null;

        context["field"] = "Destinations";
        context["metadata"] = (objectMetadata ? objectMetadata["Destinations"] : null);
        privateState.Destinations = defaultValues ?
            (defaultValues["Destinations"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Destinations"], context) :
                null) :
            null;

        context["field"] = "Cards";
        context["metadata"] = (objectMetadata ? objectMetadata["Cards"] : null);
        privateState.Cards = defaultValues ?
            (defaultValues["Cards"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Cards"], context) :
                null) :
            null;

        context["field"] = "Channel_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
        privateState.Channel_id = defaultValues ?
            (defaultValues["Channel_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Channel_id"], context) :
                null) :
            null;

        context["field"] = "StartDate";
        context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
        privateState.StartDate = defaultValues ?
            (defaultValues["StartDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["StartDate"], context) :
                null) :
            null;

        context["field"] = "EndDate";
        context["metadata"] = (objectMetadata ? objectMetadata["EndDate"] : null);
        privateState.EndDate = defaultValues ?
            (defaultValues["EndDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["EndDate"], context) :
                null) :
            null;

        context["field"] = "additionNotes";
        context["metadata"] = (objectMetadata ? objectMetadata["additionNotes"] : null);
        privateState.additionNotes = defaultValues ?
            (defaultValues["additionNotes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["additionNotes"], context) :
                null) :
            null;

        context["field"] = "phonenumber";
        context["metadata"] = (objectMetadata ? objectMetadata["phonenumber"] : null);
        privateState.phonenumber = defaultValues ?
            (defaultValues["phonenumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["phonenumber"], context) :
                null) :
            null;

        context["field"] = "request_id";
        context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
        privateState.request_id = defaultValues ?
            (defaultValues["request_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["request_id"], context) :
                null) :
            null;

        context["field"] = "bankName";
        context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
        privateState.bankName = defaultValues ?
            (defaultValues["bankName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["bankName"], context) :
                null) :
            null;

        context["field"] = "AccountType";
        context["metadata"] = (objectMetadata ? objectMetadata["AccountType"] : null);
        privateState.AccountType = defaultValues ?
            (defaultValues["AccountType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["AccountType"], context) :
                null) :
            null;

        context["field"] = "RequestCode";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestCode"] : null);
        privateState.RequestCode = defaultValues ?
            (defaultValues["RequestCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestCode"], context) :
                null) :
            null;

        context["field"] = "RequestReason";
        context["metadata"] = (objectMetadata ? objectMetadata["RequestReason"] : null);
        privateState.RequestReason = defaultValues ?
            (defaultValues["RequestReason"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["RequestReason"], context) :
                null) :
            null;

        context["field"] = "Channel";
        context["metadata"] = (objectMetadata ? objectMetadata["Channel"] : null);
        privateState.Channel = defaultValues ?
            (defaultValues["Channel"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Channel"], context) :
                null) :
            null;

        context["field"] = "Address_id";
        context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
        privateState.Address_id = defaultValues ?
            (defaultValues["Address_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Address_id"], context) :
                null) :
            null;

        context["field"] = "communication_id";
        context["metadata"] = (objectMetadata ? objectMetadata["communication_id"] : null);
        privateState.communication_id = defaultValues ?
            (defaultValues["communication_id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["communication_id"], context) :
                null) :
            null;

        context["field"] = "CardNumbers";
        context["metadata"] = (objectMetadata ? objectMetadata["CardNumbers"] : null);
        privateState.CardNumbers = defaultValues ?
            (defaultValues["CardNumbers"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["CardNumbers"], context) :
                null) :
            null;

        context["field"] = "lastNinetyDays";
        context["metadata"] = (objectMetadata ? objectMetadata["lastNinetyDays"] : null);
        privateState.lastNinetyDays = defaultValues ?
            (defaultValues["lastNinetyDays"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lastNinetyDays"], context) :
                null) :
            null;

        context["field"] = "errorMessage";
        context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
        privateState.errorMessage = defaultValues ?
            (defaultValues["errorMessage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["errorMessage"], context) :
                null) :
            null;

        context["field"] = "dbpErrCode";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
        privateState.dbpErrCode = defaultValues ?
            (defaultValues["dbpErrCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrCode"], context) :
                null) :
            null;

        context["field"] = "dbpErrMsg";
        context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
        privateState.dbpErrMsg = defaultValues ?
            (defaultValues["dbpErrMsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["dbpErrMsg"], context) :
                null) :
            null;

        context["field"] = "newPin";
        context["metadata"] = (objectMetadata ? objectMetadata["newPin"] : null);
        privateState.newPin = defaultValues ?
            (defaultValues["newPin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newPin"], context) :
                null) :
            null;

        context["field"] = "MFAAttributes";
        context["metadata"] = (objectMetadata ? objectMetadata["MFAAttributes"] : null);
        privateState.MFAAttributes = defaultValues ?
            (defaultValues["MFAAttributes"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["MFAAttributes"], context) :
                null) :
            null;

        context["field"] = "serviceName";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
        privateState.serviceName = defaultValues ?
            (defaultValues["serviceName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceName"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "Otp";
        context["metadata"] = (objectMetadata ? objectMetadata["Otp"] : null);
        privateState.Otp = defaultValues ?
            (defaultValues["Otp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Otp"], context) :
                null) :
            null;

        context["field"] = "OtpGenaratedts";
        context["metadata"] = (objectMetadata ? objectMetadata["OtpGenaratedts"] : null);
        privateState.OtpGenaratedts = defaultValues ?
            (defaultValues["OtpGenaratedts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OtpGenaratedts"], context) :
                null) :
            null;

        context["field"] = "securityQuestions";
        context["metadata"] = (objectMetadata ? objectMetadata["securityQuestions"] : null);
        privateState.securityQuestions = defaultValues ?
            (defaultValues["securityQuestions"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["securityQuestions"], context) :
                null) :
            null;

        context["field"] = "customerAnswer";
        context["metadata"] = (objectMetadata ? objectMetadata["customerAnswer"] : null);
        privateState.customerAnswer = defaultValues ?
            (defaultValues["customerAnswer"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerAnswer"], context) :
                null) :
            null;

        context["field"] = "questionId";
        context["metadata"] = (objectMetadata ? objectMetadata["questionId"] : null);
        privateState.questionId = defaultValues ?
            (defaultValues["questionId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["questionId"], context) :
                null) :
            null;

        context["field"] = "maxFailedAttemptsAllowed";
        context["metadata"] = (objectMetadata ? objectMetadata["maxFailedAttemptsAllowed"] : null);
        privateState.maxFailedAttemptsAllowed = defaultValues ?
            (defaultValues["maxFailedAttemptsAllowed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["maxFailedAttemptsAllowed"], context) :
                null) :
            null;

        context["field"] = "ValidDate";
        context["metadata"] = (objectMetadata ? objectMetadata["ValidDate"] : null);
        privateState.ValidDate = defaultValues ?
            (defaultValues["ValidDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ValidDate"], context) :
                null) :
            null;

        context["field"] = "unsuccessfulLoginAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["unsuccessfulLoginAttempts"] : null);
        privateState.unsuccessfulLoginAttempts = defaultValues ?
            (defaultValues["unsuccessfulLoginAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["unsuccessfulLoginAttempts"], context) :
                null) :
            null;

        context["field"] = "isUserAccountLocked";
        context["metadata"] = (objectMetadata ? objectMetadata["isUserAccountLocked"] : null);
        privateState.isUserAccountLocked = defaultValues ?
            (defaultValues["isUserAccountLocked"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isUserAccountLocked"], context) :
                null) :
            null;

        context["field"] = "Phone";
        context["metadata"] = (objectMetadata ? objectMetadata["Phone"] : null);
        privateState.Phone = defaultValues ?
            (defaultValues["Phone"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Phone"], context) :
                null) :
            null;

        context["field"] = "Email";
        context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
        privateState.Email = defaultValues ?
            (defaultValues["Email"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Email"], context) :
                null) :
            null;

        context["field"] = "sacMaxResendRequestsAllowed";
        context["metadata"] = (objectMetadata ? objectMetadata["sacMaxResendRequestsAllowed"] : null);
        privateState.sacMaxResendRequestsAllowed = defaultValues ?
            (defaultValues["sacMaxResendRequestsAllowed"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["sacMaxResendRequestsAllowed"], context) :
                null) :
            null;

        context["field"] = "remainingResendAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["remainingResendAttempts"] : null);
        privateState.remainingResendAttempts = defaultValues ?
            (defaultValues["remainingResendAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remainingResendAttempts"], context) :
                null) :
            null;

        context["field"] = "remainingFailedAttempts";
        context["metadata"] = (objectMetadata ? objectMetadata["remainingFailedAttempts"] : null);
        privateState.remainingFailedAttempts = defaultValues ?
            (defaultValues["remainingFailedAttempts"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["remainingFailedAttempts"], context) :
                null) :
            null;

        context["field"] = "isOtpVerified";
        context["metadata"] = (objectMetadata ? objectMetadata["isOtpVerified"] : null);
        privateState.isOtpVerified = defaultValues ?
            (defaultValues["isOtpVerified"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOtpVerified"], context) :
                null) :
            null;

        context["field"] = "lockUser";
        context["metadata"] = (objectMetadata ? objectMetadata["lockUser"] : null);
        privateState.lockUser = defaultValues ?
            (defaultValues["lockUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockUser"], context) :
                null) :
            null;

        context["field"] = "logoutUser";
        context["metadata"] = (objectMetadata ? objectMetadata["logoutUser"] : null);
        privateState.logoutUser = defaultValues ?
            (defaultValues["logoutUser"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["logoutUser"], context) :
                null) :
            null;

        context["field"] = "lockoutTime";
        context["metadata"] = (objectMetadata ? objectMetadata["lockoutTime"] : null);
        privateState.lockoutTime = defaultValues ?
            (defaultValues["lockoutTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["lockoutTime"], context) :
                null) :
            null;

        context["field"] = "isOTPExpired";
        context["metadata"] = (objectMetadata ? objectMetadata["isOTPExpired"] : null);
        privateState.isOTPExpired = defaultValues ?
            (defaultValues["isOTPExpired"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isOTPExpired"], context) :
                null) :
            null;

        context["field"] = "transactionCurrency";
        context["metadata"] = (objectMetadata ? objectMetadata["transactionCurrency"] : null);
        privateState.transactionCurrency = defaultValues ?
            (defaultValues["transactionCurrency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["transactionCurrency"], context) :
                null) :
            null;

        context["field"] = "Currency";
        context["metadata"] = (objectMetadata ? objectMetadata["Currency"] : null);
        privateState.Currency = defaultValues ?
            (defaultValues["Currency"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Currency"], context) :
                null) :
            null;

        context["field"] = "currencyCode";
        context["metadata"] = (objectMetadata ? objectMetadata["currencyCode"] : null);
        privateState.currencyCode = defaultValues ?
            (defaultValues["currencyCode"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currencyCode"], context) :
                null) :
            null;

        context["field"] = "cvv";
        context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
        privateState.cvv = defaultValues ?
            (defaultValues["cvv"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cvv"], context) :
                null) :
            null;

        context["field"] = "oldcvv";
        context["metadata"] = (objectMetadata ? objectMetadata["oldcvv"] : null);
        privateState.oldcvv = defaultValues ?
            (defaultValues["oldcvv"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldcvv"], context) :
                null) :
            null;

        context["field"] = "oldCardId";
        context["metadata"] = (objectMetadata ? objectMetadata["oldCardId"] : null);
        privateState.oldCardId = defaultValues ?
            (defaultValues["oldCardId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["oldCardId"], context) :
                null) :
            null;

        context["field"] = "successmsg";
        context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
        privateState.successmsg = defaultValues ?
            (defaultValues["successmsg"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["successmsg"], context) :
                null) :
            null;

        context["field"] = "currentBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
        privateState.currentBalance = defaultValues ?
            (defaultValues["currentBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["currentBalance"], context) :
                null) :
            null;

        context["field"] = "rewardsPoint";
        context["metadata"] = (objectMetadata ? objectMetadata["rewardsPoint"] : null);
        privateState.rewardsPoint = defaultValues ?
            (defaultValues["rewardsPoint"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["rewardsPoint"], context) :
                null) :
            null;

        context["field"] = "paymentDueDate";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentDueDate"] : null);
        privateState.paymentDueDate = defaultValues ?
            (defaultValues["paymentDueDate"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentDueDate"], context) :
                null) :
            null;

        context["field"] = "availableBalance";
        context["metadata"] = (objectMetadata ? objectMetadata["availableBalance"] : null);
        privateState.availableBalance = defaultValues ?
            (defaultValues["availableBalance"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["availableBalance"], context) :
                null) :
            null;

        context["field"] = "isTypeBusiness";
        context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
        privateState.isTypeBusiness = defaultValues ?
            (defaultValues["isTypeBusiness"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isTypeBusiness"], context) :
                null) :
            null;

        context["field"] = "isExpiring";
        context["metadata"] = (objectMetadata ? objectMetadata["isExpiring"] : null);
        privateState.isExpiring = defaultValues ?
            (defaultValues["isExpiring"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["isExpiring"], context) :
                null) :
            null;

        context["field"] = "pinNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["pinNumber"] : null);
        privateState.pinNumber = defaultValues ?
            (defaultValues["pinNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["pinNumber"], context) :
                null) :
            null;

        context["field"] = "requestBody";
        context["metadata"] = (objectMetadata ? objectMetadata["requestBody"] : null);
        privateState.requestBody = defaultValues ?
            (defaultValues["requestBody"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["requestBody"], context) :
                null) :
            null;

        context["field"] = "type";
        context["metadata"] = (objectMetadata ? objectMetadata["type"] : null);
        privateState.type = defaultValues ?
            (defaultValues["type"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["type"], context) :
                null) :
            null;

        context["field"] = "subtype";
        context["metadata"] = (objectMetadata ? objectMetadata["subtype"] : null);
        privateState.subtype = defaultValues ?
            (defaultValues["subtype"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["subtype"], context) :
                null) :
            null;

        context["field"] = "orderId";
        context["metadata"] = (objectMetadata ? objectMetadata["orderId"] : null);
        privateState.orderId = defaultValues ?
            (defaultValues["orderId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["orderId"], context) :
                null) :
            null;

        context["field"] = "message";
        context["metadata"] = (objectMetadata ? objectMetadata["message"] : null);
        privateState.message = defaultValues ?
            (defaultValues["message"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["message"], context) :
                null) :
            null;

        context["field"] = "status";
        context["metadata"] = (objectMetadata ? objectMetadata["status"] : null);
        privateState.status = defaultValues ?
            (defaultValues["status"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["status"], context) :
                null) :
            null;

        context["field"] = "code";
        context["metadata"] = (objectMetadata ? objectMetadata["code"] : null);
        privateState.code = defaultValues ?
            (defaultValues["code"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["code"], context) :
                null) :
            null;

        context["field"] = "creditCardProtection";
        context["metadata"] = (objectMetadata ? objectMetadata["creditCardProtection"] : null);
        privateState.creditCardProtection = defaultValues ?
            (defaultValues["creditCardProtection"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["creditCardProtection"], context) :
                null) :
            null;

        context["field"] = "vCardID";
        context["metadata"] = (objectMetadata ? objectMetadata["vCardID"] : null);
        privateState.vCardID = defaultValues ?
            (defaultValues["vCardID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vCardID"], context) :
                null) :
            null;

        context["field"] = "paymentAccountReference";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentAccountReference"] : null);
        privateState.paymentAccountReference = defaultValues ?
            (defaultValues["paymentAccountReference"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentAccountReference"], context) :
                null) :
            null;

        context["field"] = "deviceID";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
        privateState.deviceID = defaultValues ?
            (defaultValues["deviceID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceID"], context) :
                null) :
            null;

        context["field"] = "clientCustomerID";
        context["metadata"] = (objectMetadata ? objectMetadata["clientCustomerID"] : null);
        privateState.clientCustomerID = defaultValues ?
            (defaultValues["clientCustomerID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["clientCustomerID"], context) :
                null) :
            null;

        context["field"] = "deviceCert";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceCert"] : null);
        privateState.deviceCert = defaultValues ?
            (defaultValues["deviceCert"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceCert"], context) :
                null) :
            null;

        context["field"] = "nonceSignature";
        context["metadata"] = (objectMetadata ? objectMetadata["nonceSignature"] : null);
        privateState.nonceSignature = defaultValues ?
            (defaultValues["nonceSignature"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nonceSignature"], context) :
                null) :
            null;

        context["field"] = "nonce";
        context["metadata"] = (objectMetadata ? objectMetadata["nonce"] : null);
        privateState.nonce = defaultValues ?
            (defaultValues["nonce"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nonce"], context) :
                null) :
            null;

        context["field"] = "encryptedPassData";
        context["metadata"] = (objectMetadata ? objectMetadata["encryptedPassData"] : null);
        privateState.encryptedPassData = defaultValues ?
            (defaultValues["encryptedPassData"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["encryptedPassData"], context) :
                null) :
            null;

        context["field"] = "activationData";
        context["metadata"] = (objectMetadata ? objectMetadata["activationData"] : null);
        privateState.activationData = defaultValues ?
            (defaultValues["activationData"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["activationData"], context) :
                null) :
            null;

        context["field"] = "ephemeralPublicKey";
        context["metadata"] = (objectMetadata ? objectMetadata["ephemeralPublicKey"] : null);
        privateState.ephemeralPublicKey = defaultValues ?
            (defaultValues["ephemeralPublicKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["ephemeralPublicKey"], context) :
                null) :
            null;

        context["field"] = "last4";
        context["metadata"] = (objectMetadata ? objectMetadata["last4"] : null);
        privateState.last4 = defaultValues ?
            (defaultValues["last4"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["last4"], context) :
                null) :
            null;

        context["field"] = "encMobileNumber";
        context["metadata"] = (objectMetadata ? objectMetadata["encMobileNumber"] : null);
        privateState.encMobileNumber = defaultValues ?
            (defaultValues["encMobileNumber"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["encMobileNumber"], context) :
                null) :
            null;

        context["field"] = "opaquePaymentCard";
        context["metadata"] = (objectMetadata ? objectMetadata["opaquePaymentCard"] : null);
        privateState.opaquePaymentCard = defaultValues ?
            (defaultValues["opaquePaymentCard"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["opaquePaymentCard"], context) :
                null) :
            null;

        context["field"] = "encAddress";
        context["metadata"] = (objectMetadata ? objectMetadata["encAddress"] : null);
        privateState.encAddress = defaultValues ?
            (defaultValues["encAddress"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["encAddress"], context) :
                null) :
            null;

        context["field"] = "paymentService";
        context["metadata"] = (objectMetadata ? objectMetadata["paymentService"] : null);
        privateState.paymentService = defaultValues ?
            (defaultValues["paymentService"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["paymentService"], context) :
                null) :
            null;

        context["field"] = "PAN";
        context["metadata"] = (objectMetadata ? objectMetadata["PAN"] : null);
        privateState.PAN = defaultValues ?
            (defaultValues["PAN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["PAN"], context) :
                null) :
            null;

        context["field"] = "nameOnCard";
        context["metadata"] = (objectMetadata ? objectMetadata["nameOnCard"] : null);
        privateState.nameOnCard = defaultValues ?
            (defaultValues["nameOnCard"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nameOnCard"], context) :
                null) :
            null;

        context["field"] = "expiryMonth";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryMonth"] : null);
        privateState.expiryMonth = defaultValues ?
            (defaultValues["expiryMonth"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryMonth"], context) :
                null) :
            null;

        context["field"] = "expiryYear";
        context["metadata"] = (objectMetadata ? objectMetadata["expiryYear"] : null);
        privateState.expiryYear = defaultValues ?
            (defaultValues["expiryYear"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["expiryYear"], context) :
                null) :
            null;

        context["field"] = "cvv2";
        context["metadata"] = (objectMetadata ? objectMetadata["cvv2"] : null);
        privateState.cvv2 = defaultValues ?
            (defaultValues["cvv2"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["cvv2"], context) :
                null) :
            null;

        context["field"] = "vClientIDForPartner";
        context["metadata"] = (objectMetadata ? objectMetadata["vClientIDForPartner"] : null);
        privateState.vClientIDForPartner = defaultValues ?
            (defaultValues["vClientIDForPartner"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vClientIDForPartner"], context) :
                null) :
            null;

        context["field"] = "vCustomerIDForPartner";
        context["metadata"] = (objectMetadata ? objectMetadata["vCustomerIDForPartner"] : null);
        privateState.vCustomerIDForPartner = defaultValues ?
            (defaultValues["vCustomerIDForPartner"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["vCustomerIDForPartner"], context) :
                null) :
            null;

        context["field"] = "updatedDateTime";
        context["metadata"] = (objectMetadata ? objectMetadata["updatedDateTime"] : null);
        privateState.updatedDateTime = defaultValues ?
            (defaultValues["updatedDateTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["updatedDateTime"], context) :
                null) :
            null;

        context["field"] = "createdDateTime";
        context["metadata"] = (objectMetadata ? objectMetadata["createdDateTime"] : null);
        privateState.createdDateTime = defaultValues ?
            (defaultValues["createdDateTime"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["createdDateTime"], context) :
                null) :
            null;


        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
            "accountId": {
                get: function() {
                    context["field"] = "accountId";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountId, context);
                },
                set: function(val) {
                    setterFunctions['accountId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Action": {
                get: function() {
                    context["field"] = "Action";
                    context["metadata"] = (objectMetadata ? objectMetadata["Action"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Action, context);
                },
                set: function(val) {
                    setterFunctions['Action'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardHolderName": {
                get: function() {
                    context["field"] = "cardHolderName";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardHolderName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardHolderName, context);
                },
                set: function(val) {
                    setterFunctions['cardHolderName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardId": {
                get: function() {
                    context["field"] = "cardId";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardId, context);
                },
                set: function(val) {
                    setterFunctions['cardId'].call(this, val, privateState);
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
            "errmsg": {
                get: function() {
                    context["field"] = "errmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["errmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errmsg, context);
                },
                set: function(val) {
                    setterFunctions['errmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryDate": {
                get: function() {
                    context["field"] = "expiryDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryDate, context);
                },
                set: function(val) {
                    setterFunctions['expiryDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Reason": {
                get: function() {
                    context["field"] = "Reason";
                    context["metadata"] = (objectMetadata ? objectMetadata["Reason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Reason, context);
                },
                set: function(val) {
                    setterFunctions['Reason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "success": {
                get: function() {
                    context["field"] = "success";
                    context["metadata"] = (objectMetadata ? objectMetadata["success"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.success, context);
                },
                set: function(val) {
                    setterFunctions['success'].call(this, val, privateState);
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
            "userName": {
                get: function() {
                    context["field"] = "userName";
                    context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.userName, context);
                },
                set: function(val) {
                    setterFunctions['userName'].call(this, val, privateState);
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
            "availableCredit": {
                get: function() {
                    context["field"] = "availableCredit";
                    context["metadata"] = (objectMetadata ? objectMetadata["availableCredit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.availableCredit, context);
                },
                set: function(val) {
                    setterFunctions['availableCredit'].call(this, val, privateState);
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
            "billingAddress": {
                get: function() {
                    context["field"] = "billingAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["billingAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.billingAddress, context);
                },
                set: function(val) {
                    setterFunctions['billingAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cardProductName": {
                get: function() {
                    context["field"] = "cardProductName";
                    context["metadata"] = (objectMetadata ? objectMetadata["cardProductName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cardProductName, context);
                },
                set: function(val) {
                    setterFunctions['cardProductName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "secondaryCardHolder": {
                get: function() {
                    context["field"] = "secondaryCardHolder";
                    context["metadata"] = (objectMetadata ? objectMetadata["secondaryCardHolder"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.secondaryCardHolder, context);
                },
                set: function(val) {
                    setterFunctions['secondaryCardHolder'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawlLimit": {
                get: function() {
                    context["field"] = "withdrawlLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawlLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawlLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawlLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawalMinLimit": {
                get: function() {
                    context["field"] = "withdrawalMinLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMinLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawalMinLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawalMinLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawalMaxLimit": {
                get: function() {
                    context["field"] = "withdrawalMaxLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawalMaxLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawalMaxLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawalMaxLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "withdrawalStepLimit": {
                get: function() {
                    context["field"] = "withdrawalStepLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["withdrawalStepLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.withdrawalStepLimit, context);
                },
                set: function(val) {
                    setterFunctions['withdrawalStepLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseLimit": {
                get: function() {
                    context["field"] = "purchaseLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseMinLimit": {
                get: function() {
                    context["field"] = "purchaseMinLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseMinLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseMinLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseMinLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseMaxLimit": {
                get: function() {
                    context["field"] = "purchaseMaxLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseMaxLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseMaxLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseMaxLimit'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "purchaseStepLimit": {
                get: function() {
                    context["field"] = "purchaseStepLimit";
                    context["metadata"] = (objectMetadata ? objectMetadata["purchaseStepLimit"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.purchaseStepLimit, context);
                },
                set: function(val) {
                    setterFunctions['purchaseStepLimit'].call(this, val, privateState);
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
            "maskedAccountNumber": {
                get: function() {
                    context["field"] = "maskedAccountNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["maskedAccountNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maskedAccountNumber, context);
                },
                set: function(val) {
                    setterFunctions['maskedAccountNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maskedCardNumber": {
                get: function() {
                    context["field"] = "maskedCardNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["maskedCardNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maskedCardNumber, context);
                },
                set: function(val) {
                    setterFunctions['maskedCardNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isInternational": {
                get: function() {
                    context["field"] = "isInternational";
                    context["metadata"] = (objectMetadata ? objectMetadata["isInternational"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isInternational, context);
                },
                set: function(val) {
                    setterFunctions['isInternational'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ids": {
                get: function() {
                    context["field"] = "ids";
                    context["metadata"] = (objectMetadata ? objectMetadata["ids"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ids, context);
                },
                set: function(val) {
                    setterFunctions['ids'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Destinations": {
                get: function() {
                    context["field"] = "Destinations";
                    context["metadata"] = (objectMetadata ? objectMetadata["Destinations"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Destinations, context);
                },
                set: function(val) {
                    setterFunctions['Destinations'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Cards": {
                get: function() {
                    context["field"] = "Cards";
                    context["metadata"] = (objectMetadata ? objectMetadata["Cards"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Cards, context);
                },
                set: function(val) {
                    setterFunctions['Cards'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Channel_id": {
                get: function() {
                    context["field"] = "Channel_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Channel_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Channel_id, context);
                },
                set: function(val) {
                    setterFunctions['Channel_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "StartDate": {
                get: function() {
                    context["field"] = "StartDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["StartDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.StartDate, context);
                },
                set: function(val) {
                    setterFunctions['StartDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "EndDate": {
                get: function() {
                    context["field"] = "EndDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["EndDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.EndDate, context);
                },
                set: function(val) {
                    setterFunctions['EndDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "additionNotes": {
                get: function() {
                    context["field"] = "additionNotes";
                    context["metadata"] = (objectMetadata ? objectMetadata["additionNotes"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.additionNotes, context);
                },
                set: function(val) {
                    setterFunctions['additionNotes'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "phonenumber": {
                get: function() {
                    context["field"] = "phonenumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["phonenumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.phonenumber, context);
                },
                set: function(val) {
                    setterFunctions['phonenumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "request_id": {
                get: function() {
                    context["field"] = "request_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["request_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.request_id, context);
                },
                set: function(val) {
                    setterFunctions['request_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "bankName": {
                get: function() {
                    context["field"] = "bankName";
                    context["metadata"] = (objectMetadata ? objectMetadata["bankName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.bankName, context);
                },
                set: function(val) {
                    setterFunctions['bankName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "AccountType": {
                get: function() {
                    context["field"] = "AccountType";
                    context["metadata"] = (objectMetadata ? objectMetadata["AccountType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.AccountType, context);
                },
                set: function(val) {
                    setterFunctions['AccountType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RequestCode": {
                get: function() {
                    context["field"] = "RequestCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["RequestCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RequestCode, context);
                },
                set: function(val) {
                    setterFunctions['RequestCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "RequestReason": {
                get: function() {
                    context["field"] = "RequestReason";
                    context["metadata"] = (objectMetadata ? objectMetadata["RequestReason"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.RequestReason, context);
                },
                set: function(val) {
                    setterFunctions['RequestReason'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Channel": {
                get: function() {
                    context["field"] = "Channel";
                    context["metadata"] = (objectMetadata ? objectMetadata["Channel"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Channel, context);
                },
                set: function(val) {
                    setterFunctions['Channel'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Address_id": {
                get: function() {
                    context["field"] = "Address_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["Address_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Address_id, context);
                },
                set: function(val) {
                    setterFunctions['Address_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "communication_id": {
                get: function() {
                    context["field"] = "communication_id";
                    context["metadata"] = (objectMetadata ? objectMetadata["communication_id"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.communication_id, context);
                },
                set: function(val) {
                    setterFunctions['communication_id'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "CardNumbers": {
                get: function() {
                    context["field"] = "CardNumbers";
                    context["metadata"] = (objectMetadata ? objectMetadata["CardNumbers"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.CardNumbers, context);
                },
                set: function(val) {
                    setterFunctions['CardNumbers'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lastNinetyDays": {
                get: function() {
                    context["field"] = "lastNinetyDays";
                    context["metadata"] = (objectMetadata ? objectMetadata["lastNinetyDays"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lastNinetyDays, context);
                },
                set: function(val) {
                    setterFunctions['lastNinetyDays'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "errorMessage": {
                get: function() {
                    context["field"] = "errorMessage";
                    context["metadata"] = (objectMetadata ? objectMetadata["errorMessage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.errorMessage, context);
                },
                set: function(val) {
                    setterFunctions['errorMessage'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrCode": {
                get: function() {
                    context["field"] = "dbpErrCode";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrCode"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrCode, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrCode'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "dbpErrMsg": {
                get: function() {
                    context["field"] = "dbpErrMsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["dbpErrMsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.dbpErrMsg, context);
                },
                set: function(val) {
                    setterFunctions['dbpErrMsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newPin": {
                get: function() {
                    context["field"] = "newPin";
                    context["metadata"] = (objectMetadata ? objectMetadata["newPin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newPin, context);
                },
                set: function(val) {
                    setterFunctions['newPin'].call(this, val, privateState);
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
            "serviceName": {
                get: function() {
                    context["field"] = "serviceName";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceName, context);
                },
                set: function(val) {
                    setterFunctions['serviceName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "serviceKey": {
                get: function() {
                    context["field"] = "serviceKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.serviceKey, context);
                },
                set: function(val) {
                    setterFunctions['serviceKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Otp": {
                get: function() {
                    context["field"] = "Otp";
                    context["metadata"] = (objectMetadata ? objectMetadata["Otp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Otp, context);
                },
                set: function(val) {
                    setterFunctions['Otp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OtpGenaratedts": {
                get: function() {
                    context["field"] = "OtpGenaratedts";
                    context["metadata"] = (objectMetadata ? objectMetadata["OtpGenaratedts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OtpGenaratedts, context);
                },
                set: function(val) {
                    setterFunctions['OtpGenaratedts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "securityQuestions": {
                get: function() {
                    context["field"] = "securityQuestions";
                    context["metadata"] = (objectMetadata ? objectMetadata["securityQuestions"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.securityQuestions, context);
                },
                set: function(val) {
                    setterFunctions['securityQuestions'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerAnswer": {
                get: function() {
                    context["field"] = "customerAnswer";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerAnswer"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerAnswer, context);
                },
                set: function(val) {
                    setterFunctions['customerAnswer'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "questionId": {
                get: function() {
                    context["field"] = "questionId";
                    context["metadata"] = (objectMetadata ? objectMetadata["questionId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.questionId, context);
                },
                set: function(val) {
                    setterFunctions['questionId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "maxFailedAttemptsAllowed": {
                get: function() {
                    context["field"] = "maxFailedAttemptsAllowed";
                    context["metadata"] = (objectMetadata ? objectMetadata["maxFailedAttemptsAllowed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.maxFailedAttemptsAllowed, context);
                },
                set: function(val) {
                    setterFunctions['maxFailedAttemptsAllowed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ValidDate": {
                get: function() {
                    context["field"] = "ValidDate";
                    context["metadata"] = (objectMetadata ? objectMetadata["ValidDate"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ValidDate, context);
                },
                set: function(val) {
                    setterFunctions['ValidDate'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "unsuccessfulLoginAttempts": {
                get: function() {
                    context["field"] = "unsuccessfulLoginAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["unsuccessfulLoginAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.unsuccessfulLoginAttempts, context);
                },
                set: function(val) {
                    setterFunctions['unsuccessfulLoginAttempts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isUserAccountLocked": {
                get: function() {
                    context["field"] = "isUserAccountLocked";
                    context["metadata"] = (objectMetadata ? objectMetadata["isUserAccountLocked"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isUserAccountLocked, context);
                },
                set: function(val) {
                    setterFunctions['isUserAccountLocked'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Phone": {
                get: function() {
                    context["field"] = "Phone";
                    context["metadata"] = (objectMetadata ? objectMetadata["Phone"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Phone, context);
                },
                set: function(val) {
                    setterFunctions['Phone'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Email": {
                get: function() {
                    context["field"] = "Email";
                    context["metadata"] = (objectMetadata ? objectMetadata["Email"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Email, context);
                },
                set: function(val) {
                    setterFunctions['Email'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "sacMaxResendRequestsAllowed": {
                get: function() {
                    context["field"] = "sacMaxResendRequestsAllowed";
                    context["metadata"] = (objectMetadata ? objectMetadata["sacMaxResendRequestsAllowed"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.sacMaxResendRequestsAllowed, context);
                },
                set: function(val) {
                    setterFunctions['sacMaxResendRequestsAllowed'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remainingResendAttempts": {
                get: function() {
                    context["field"] = "remainingResendAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["remainingResendAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remainingResendAttempts, context);
                },
                set: function(val) {
                    setterFunctions['remainingResendAttempts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "remainingFailedAttempts": {
                get: function() {
                    context["field"] = "remainingFailedAttempts";
                    context["metadata"] = (objectMetadata ? objectMetadata["remainingFailedAttempts"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.remainingFailedAttempts, context);
                },
                set: function(val) {
                    setterFunctions['remainingFailedAttempts'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isOtpVerified": {
                get: function() {
                    context["field"] = "isOtpVerified";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOtpVerified"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOtpVerified, context);
                },
                set: function(val) {
                    setterFunctions['isOtpVerified'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockUser": {
                get: function() {
                    context["field"] = "lockUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockUser, context);
                },
                set: function(val) {
                    setterFunctions['lockUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "logoutUser": {
                get: function() {
                    context["field"] = "logoutUser";
                    context["metadata"] = (objectMetadata ? objectMetadata["logoutUser"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.logoutUser, context);
                },
                set: function(val) {
                    setterFunctions['logoutUser'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "lockoutTime": {
                get: function() {
                    context["field"] = "lockoutTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["lockoutTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.lockoutTime, context);
                },
                set: function(val) {
                    setterFunctions['lockoutTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isOTPExpired": {
                get: function() {
                    context["field"] = "isOTPExpired";
                    context["metadata"] = (objectMetadata ? objectMetadata["isOTPExpired"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isOTPExpired, context);
                },
                set: function(val) {
                    setterFunctions['isOTPExpired'].call(this, val, privateState);
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
            "Currency": {
                get: function() {
                    context["field"] = "Currency";
                    context["metadata"] = (objectMetadata ? objectMetadata["Currency"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Currency, context);
                },
                set: function(val) {
                    setterFunctions['Currency'].call(this, val, privateState);
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
            "cvv": {
                get: function() {
                    context["field"] = "cvv";
                    context["metadata"] = (objectMetadata ? objectMetadata["cvv"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cvv, context);
                },
                set: function(val) {
                    setterFunctions['cvv'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "oldcvv": {
                get: function() {
                    context["field"] = "oldcvv";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldcvv"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldcvv, context);
                },
                set: function(val) {
                    setterFunctions['oldcvv'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "oldCardId": {
                get: function() {
                    context["field"] = "oldCardId";
                    context["metadata"] = (objectMetadata ? objectMetadata["oldCardId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.oldCardId, context);
                },
                set: function(val) {
                    setterFunctions['oldCardId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "successmsg": {
                get: function() {
                    context["field"] = "successmsg";
                    context["metadata"] = (objectMetadata ? objectMetadata["successmsg"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.successmsg, context);
                },
                set: function(val) {
                    setterFunctions['successmsg'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "currentBalance": {
                get: function() {
                    context["field"] = "currentBalance";
                    context["metadata"] = (objectMetadata ? objectMetadata["currentBalance"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.currentBalance, context);
                },
                set: function(val) {
                    setterFunctions['currentBalance'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "rewardsPoint": {
                get: function() {
                    context["field"] = "rewardsPoint";
                    context["metadata"] = (objectMetadata ? objectMetadata["rewardsPoint"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.rewardsPoint, context);
                },
                set: function(val) {
                    setterFunctions['rewardsPoint'].call(this, val, privateState);
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
            "isTypeBusiness": {
                get: function() {
                    context["field"] = "isTypeBusiness";
                    context["metadata"] = (objectMetadata ? objectMetadata["isTypeBusiness"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isTypeBusiness, context);
                },
                set: function(val) {
                    setterFunctions['isTypeBusiness'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "isExpiring": {
                get: function() {
                    context["field"] = "isExpiring";
                    context["metadata"] = (objectMetadata ? objectMetadata["isExpiring"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.isExpiring, context);
                },
                set: function(val) {
                    setterFunctions['isExpiring'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "pinNumber": {
                get: function() {
                    context["field"] = "pinNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["pinNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.pinNumber, context);
                },
                set: function(val) {
                    setterFunctions['pinNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "requestBody": {
                get: function() {
                    context["field"] = "requestBody";
                    context["metadata"] = (objectMetadata ? objectMetadata["requestBody"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.requestBody, context);
                },
                set: function(val) {
                    setterFunctions['requestBody'].call(this, val, privateState);
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
            "subtype": {
                get: function() {
                    context["field"] = "subtype";
                    context["metadata"] = (objectMetadata ? objectMetadata["subtype"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.subtype, context);
                },
                set: function(val) {
                    setterFunctions['subtype'].call(this, val, privateState);
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
            "creditCardProtection": {
                get: function() {
                    context["field"] = "creditCardProtection";
                    context["metadata"] = (objectMetadata ? objectMetadata["creditCardProtection"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.creditCardProtection, context);
                },
                set: function(val) {
                    setterFunctions['creditCardProtection'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vCardID": {
                get: function() {
                    context["field"] = "vCardID";
                    context["metadata"] = (objectMetadata ? objectMetadata["vCardID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vCardID, context);
                },
                set: function(val) {
                    setterFunctions['vCardID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentAccountReference": {
                get: function() {
                    context["field"] = "paymentAccountReference";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentAccountReference"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentAccountReference, context);
                },
                set: function(val) {
                    setterFunctions['paymentAccountReference'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceID": {
                get: function() {
                    context["field"] = "deviceID";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceID, context);
                },
                set: function(val) {
                    setterFunctions['deviceID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "clientCustomerID": {
                get: function() {
                    context["field"] = "clientCustomerID";
                    context["metadata"] = (objectMetadata ? objectMetadata["clientCustomerID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.clientCustomerID, context);
                },
                set: function(val) {
                    setterFunctions['clientCustomerID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceCert": {
                get: function() {
                    context["field"] = "deviceCert";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceCert"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceCert, context);
                },
                set: function(val) {
                    setterFunctions['deviceCert'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nonceSignature": {
                get: function() {
                    context["field"] = "nonceSignature";
                    context["metadata"] = (objectMetadata ? objectMetadata["nonceSignature"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nonceSignature, context);
                },
                set: function(val) {
                    setterFunctions['nonceSignature'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nonce": {
                get: function() {
                    context["field"] = "nonce";
                    context["metadata"] = (objectMetadata ? objectMetadata["nonce"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nonce, context);
                },
                set: function(val) {
                    setterFunctions['nonce'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "encryptedPassData": {
                get: function() {
                    context["field"] = "encryptedPassData";
                    context["metadata"] = (objectMetadata ? objectMetadata["encryptedPassData"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.encryptedPassData, context);
                },
                set: function(val) {
                    setterFunctions['encryptedPassData'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "activationData": {
                get: function() {
                    context["field"] = "activationData";
                    context["metadata"] = (objectMetadata ? objectMetadata["activationData"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.activationData, context);
                },
                set: function(val) {
                    setterFunctions['activationData'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "ephemeralPublicKey": {
                get: function() {
                    context["field"] = "ephemeralPublicKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["ephemeralPublicKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.ephemeralPublicKey, context);
                },
                set: function(val) {
                    setterFunctions['ephemeralPublicKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "last4": {
                get: function() {
                    context["field"] = "last4";
                    context["metadata"] = (objectMetadata ? objectMetadata["last4"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.last4, context);
                },
                set: function(val) {
                    setterFunctions['last4'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "encMobileNumber": {
                get: function() {
                    context["field"] = "encMobileNumber";
                    context["metadata"] = (objectMetadata ? objectMetadata["encMobileNumber"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.encMobileNumber, context);
                },
                set: function(val) {
                    setterFunctions['encMobileNumber'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "opaquePaymentCard": {
                get: function() {
                    context["field"] = "opaquePaymentCard";
                    context["metadata"] = (objectMetadata ? objectMetadata["opaquePaymentCard"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.opaquePaymentCard, context);
                },
                set: function(val) {
                    setterFunctions['opaquePaymentCard'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "encAddress": {
                get: function() {
                    context["field"] = "encAddress";
                    context["metadata"] = (objectMetadata ? objectMetadata["encAddress"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.encAddress, context);
                },
                set: function(val) {
                    setterFunctions['encAddress'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "paymentService": {
                get: function() {
                    context["field"] = "paymentService";
                    context["metadata"] = (objectMetadata ? objectMetadata["paymentService"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.paymentService, context);
                },
                set: function(val) {
                    setterFunctions['paymentService'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "PAN": {
                get: function() {
                    context["field"] = "PAN";
                    context["metadata"] = (objectMetadata ? objectMetadata["PAN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.PAN, context);
                },
                set: function(val) {
                    setterFunctions['PAN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nameOnCard": {
                get: function() {
                    context["field"] = "nameOnCard";
                    context["metadata"] = (objectMetadata ? objectMetadata["nameOnCard"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nameOnCard, context);
                },
                set: function(val) {
                    setterFunctions['nameOnCard'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryMonth": {
                get: function() {
                    context["field"] = "expiryMonth";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryMonth"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryMonth, context);
                },
                set: function(val) {
                    setterFunctions['expiryMonth'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "expiryYear": {
                get: function() {
                    context["field"] = "expiryYear";
                    context["metadata"] = (objectMetadata ? objectMetadata["expiryYear"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.expiryYear, context);
                },
                set: function(val) {
                    setterFunctions['expiryYear'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "cvv2": {
                get: function() {
                    context["field"] = "cvv2";
                    context["metadata"] = (objectMetadata ? objectMetadata["cvv2"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.cvv2, context);
                },
                set: function(val) {
                    setterFunctions['cvv2'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vClientIDForPartner": {
                get: function() {
                    context["field"] = "vClientIDForPartner";
                    context["metadata"] = (objectMetadata ? objectMetadata["vClientIDForPartner"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vClientIDForPartner, context);
                },
                set: function(val) {
                    setterFunctions['vClientIDForPartner'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "vCustomerIDForPartner": {
                get: function() {
                    context["field"] = "vCustomerIDForPartner";
                    context["metadata"] = (objectMetadata ? objectMetadata["vCustomerIDForPartner"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.vCustomerIDForPartner, context);
                },
                set: function(val) {
                    setterFunctions['vCustomerIDForPartner'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "updatedDateTime": {
                get: function() {
                    context["field"] = "updatedDateTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["updatedDateTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.updatedDateTime, context);
                },
                set: function(val) {
                    setterFunctions['updatedDateTime'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "createdDateTime": {
                get: function() {
                    context["field"] = "createdDateTime";
                    context["metadata"] = (objectMetadata ? objectMetadata["createdDateTime"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.createdDateTime, context);
                },
                set: function(val) {
                    setterFunctions['createdDateTime'].call(this, val, privateState);
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
            privateState.accountId = value ? (value["accountId"] ? value["accountId"] : null) : null;
            privateState.Action = value ? (value["Action"] ? value["Action"] : null) : null;
            privateState.cardHolderName = value ? (value["cardHolderName"] ? value["cardHolderName"] : null) : null;
            privateState.cardId = value ? (value["cardId"] ? value["cardId"] : null) : null;
            privateState.cardNumber = value ? (value["cardNumber"] ? value["cardNumber"] : null) : null;
            privateState.cardStatus = value ? (value["cardStatus"] ? value["cardStatus"] : null) : null;
            privateState.cardType = value ? (value["cardType"] ? value["cardType"] : null) : null;
            privateState.errmsg = value ? (value["errmsg"] ? value["errmsg"] : null) : null;
            privateState.expiryDate = value ? (value["expiryDate"] ? value["expiryDate"] : null) : null;
            privateState.Reason = value ? (value["Reason"] ? value["Reason"] : null) : null;
            privateState.success = value ? (value["success"] ? value["success"] : null) : null;
            privateState.userId = value ? (value["userId"] ? value["userId"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.creditLimit = value ? (value["creditLimit"] ? value["creditLimit"] : null) : null;
            privateState.availableCredit = value ? (value["availableCredit"] ? value["availableCredit"] : null) : null;
            privateState.serviceProvider = value ? (value["serviceProvider"] ? value["serviceProvider"] : null) : null;
            privateState.billingAddress = value ? (value["billingAddress"] ? value["billingAddress"] : null) : null;
            privateState.cardProductName = value ? (value["cardProductName"] ? value["cardProductName"] : null) : null;
            privateState.secondaryCardHolder = value ? (value["secondaryCardHolder"] ? value["secondaryCardHolder"] : null) : null;
            privateState.withdrawlLimit = value ? (value["withdrawlLimit"] ? value["withdrawlLimit"] : null) : null;
            privateState.withdrawalMinLimit = value ? (value["withdrawalMinLimit"] ? value["withdrawalMinLimit"] : null) : null;
            privateState.withdrawalMaxLimit = value ? (value["withdrawalMaxLimit"] ? value["withdrawalMaxLimit"] : null) : null;
            privateState.withdrawalStepLimit = value ? (value["withdrawalStepLimit"] ? value["withdrawalStepLimit"] : null) : null;
            privateState.purchaseLimit = value ? (value["purchaseLimit"] ? value["purchaseLimit"] : null) : null;
            privateState.purchaseMinLimit = value ? (value["purchaseMinLimit"] ? value["purchaseMinLimit"] : null) : null;
            privateState.purchaseMaxLimit = value ? (value["purchaseMaxLimit"] ? value["purchaseMaxLimit"] : null) : null;
            privateState.purchaseStepLimit = value ? (value["purchaseStepLimit"] ? value["purchaseStepLimit"] : null) : null;
            privateState.accountNumber = value ? (value["accountNumber"] ? value["accountNumber"] : null) : null;
            privateState.accountName = value ? (value["accountName"] ? value["accountName"] : null) : null;
            privateState.maskedAccountNumber = value ? (value["maskedAccountNumber"] ? value["maskedAccountNumber"] : null) : null;
            privateState.maskedCardNumber = value ? (value["maskedCardNumber"] ? value["maskedCardNumber"] : null) : null;
            privateState.isInternational = value ? (value["isInternational"] ? value["isInternational"] : null) : null;
            privateState.ids = value ? (value["ids"] ? value["ids"] : null) : null;
            privateState.Destinations = value ? (value["Destinations"] ? value["Destinations"] : null) : null;
            privateState.Cards = value ? (value["Cards"] ? value["Cards"] : null) : null;
            privateState.Channel_id = value ? (value["Channel_id"] ? value["Channel_id"] : null) : null;
            privateState.StartDate = value ? (value["StartDate"] ? value["StartDate"] : null) : null;
            privateState.EndDate = value ? (value["EndDate"] ? value["EndDate"] : null) : null;
            privateState.additionNotes = value ? (value["additionNotes"] ? value["additionNotes"] : null) : null;
            privateState.phonenumber = value ? (value["phonenumber"] ? value["phonenumber"] : null) : null;
            privateState.request_id = value ? (value["request_id"] ? value["request_id"] : null) : null;
            privateState.bankName = value ? (value["bankName"] ? value["bankName"] : null) : null;
            privateState.AccountType = value ? (value["AccountType"] ? value["AccountType"] : null) : null;
            privateState.RequestCode = value ? (value["RequestCode"] ? value["RequestCode"] : null) : null;
            privateState.RequestReason = value ? (value["RequestReason"] ? value["RequestReason"] : null) : null;
            privateState.Channel = value ? (value["Channel"] ? value["Channel"] : null) : null;
            privateState.Address_id = value ? (value["Address_id"] ? value["Address_id"] : null) : null;
            privateState.communication_id = value ? (value["communication_id"] ? value["communication_id"] : null) : null;
            privateState.CardNumbers = value ? (value["CardNumbers"] ? value["CardNumbers"] : null) : null;
            privateState.lastNinetyDays = value ? (value["lastNinetyDays"] ? value["lastNinetyDays"] : null) : null;
            privateState.errorMessage = value ? (value["errorMessage"] ? value["errorMessage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.newPin = value ? (value["newPin"] ? value["newPin"] : null) : null;
            privateState.MFAAttributes = value ? (value["MFAAttributes"] ? value["MFAAttributes"] : null) : null;
            privateState.serviceName = value ? (value["serviceName"] ? value["serviceName"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.Otp = value ? (value["Otp"] ? value["Otp"] : null) : null;
            privateState.OtpGenaratedts = value ? (value["OtpGenaratedts"] ? value["OtpGenaratedts"] : null) : null;
            privateState.securityQuestions = value ? (value["securityQuestions"] ? value["securityQuestions"] : null) : null;
            privateState.customerAnswer = value ? (value["customerAnswer"] ? value["customerAnswer"] : null) : null;
            privateState.questionId = value ? (value["questionId"] ? value["questionId"] : null) : null;
            privateState.maxFailedAttemptsAllowed = value ? (value["maxFailedAttemptsAllowed"] ? value["maxFailedAttemptsAllowed"] : null) : null;
            privateState.ValidDate = value ? (value["ValidDate"] ? value["ValidDate"] : null) : null;
            privateState.unsuccessfulLoginAttempts = value ? (value["unsuccessfulLoginAttempts"] ? value["unsuccessfulLoginAttempts"] : null) : null;
            privateState.isUserAccountLocked = value ? (value["isUserAccountLocked"] ? value["isUserAccountLocked"] : null) : null;
            privateState.Phone = value ? (value["Phone"] ? value["Phone"] : null) : null;
            privateState.Email = value ? (value["Email"] ? value["Email"] : null) : null;
            privateState.sacMaxResendRequestsAllowed = value ? (value["sacMaxResendRequestsAllowed"] ? value["sacMaxResendRequestsAllowed"] : null) : null;
            privateState.remainingResendAttempts = value ? (value["remainingResendAttempts"] ? value["remainingResendAttempts"] : null) : null;
            privateState.remainingFailedAttempts = value ? (value["remainingFailedAttempts"] ? value["remainingFailedAttempts"] : null) : null;
            privateState.isOtpVerified = value ? (value["isOtpVerified"] ? value["isOtpVerified"] : null) : null;
            privateState.lockUser = value ? (value["lockUser"] ? value["lockUser"] : null) : null;
            privateState.logoutUser = value ? (value["logoutUser"] ? value["logoutUser"] : null) : null;
            privateState.lockoutTime = value ? (value["lockoutTime"] ? value["lockoutTime"] : null) : null;
            privateState.isOTPExpired = value ? (value["isOTPExpired"] ? value["isOTPExpired"] : null) : null;
            privateState.transactionCurrency = value ? (value["transactionCurrency"] ? value["transactionCurrency"] : null) : null;
            privateState.Currency = value ? (value["Currency"] ? value["Currency"] : null) : null;
            privateState.currencyCode = value ? (value["currencyCode"] ? value["currencyCode"] : null) : null;
            privateState.cvv = value ? (value["cvv"] ? value["cvv"] : null) : null;
            privateState.oldcvv = value ? (value["oldcvv"] ? value["oldcvv"] : null) : null;
            privateState.oldCardId = value ? (value["oldCardId"] ? value["oldCardId"] : null) : null;
            privateState.successmsg = value ? (value["successmsg"] ? value["successmsg"] : null) : null;
            privateState.currentBalance = value ? (value["currentBalance"] ? value["currentBalance"] : null) : null;
            privateState.rewardsPoint = value ? (value["rewardsPoint"] ? value["rewardsPoint"] : null) : null;
            privateState.paymentDueDate = value ? (value["paymentDueDate"] ? value["paymentDueDate"] : null) : null;
            privateState.availableBalance = value ? (value["availableBalance"] ? value["availableBalance"] : null) : null;
            privateState.isTypeBusiness = value ? (value["isTypeBusiness"] ? value["isTypeBusiness"] : null) : null;
            privateState.isExpiring = value ? (value["isExpiring"] ? value["isExpiring"] : null) : null;
            privateState.pinNumber = value ? (value["pinNumber"] ? value["pinNumber"] : null) : null;
            privateState.requestBody = value ? (value["requestBody"] ? value["requestBody"] : null) : null;
            privateState.type = value ? (value["type"] ? value["type"] : null) : null;
            privateState.subtype = value ? (value["subtype"] ? value["subtype"] : null) : null;
            privateState.orderId = value ? (value["orderId"] ? value["orderId"] : null) : null;
            privateState.message = value ? (value["message"] ? value["message"] : null) : null;
            privateState.status = value ? (value["status"] ? value["status"] : null) : null;
            privateState.code = value ? (value["code"] ? value["code"] : null) : null;
            privateState.creditCardProtection = value ? (value["creditCardProtection"] ? value["creditCardProtection"] : null) : null;
            privateState.vCardID = value ? (value["vCardID"] ? value["vCardID"] : null) : null;
            privateState.paymentAccountReference = value ? (value["paymentAccountReference"] ? value["paymentAccountReference"] : null) : null;
            privateState.deviceID = value ? (value["deviceID"] ? value["deviceID"] : null) : null;
            privateState.clientCustomerID = value ? (value["clientCustomerID"] ? value["clientCustomerID"] : null) : null;
            privateState.deviceCert = value ? (value["deviceCert"] ? value["deviceCert"] : null) : null;
            privateState.nonceSignature = value ? (value["nonceSignature"] ? value["nonceSignature"] : null) : null;
            privateState.nonce = value ? (value["nonce"] ? value["nonce"] : null) : null;
            privateState.encryptedPassData = value ? (value["encryptedPassData"] ? value["encryptedPassData"] : null) : null;
            privateState.activationData = value ? (value["activationData"] ? value["activationData"] : null) : null;
            privateState.ephemeralPublicKey = value ? (value["ephemeralPublicKey"] ? value["ephemeralPublicKey"] : null) : null;
            privateState.last4 = value ? (value["last4"] ? value["last4"] : null) : null;
            privateState.encMobileNumber = value ? (value["encMobileNumber"] ? value["encMobileNumber"] : null) : null;
            privateState.opaquePaymentCard = value ? (value["opaquePaymentCard"] ? value["opaquePaymentCard"] : null) : null;
            privateState.encAddress = value ? (value["encAddress"] ? value["encAddress"] : null) : null;
            privateState.paymentService = value ? (value["paymentService"] ? value["paymentService"] : null) : null;
            privateState.PAN = value ? (value["PAN"] ? value["PAN"] : null) : null;
            privateState.nameOnCard = value ? (value["nameOnCard"] ? value["nameOnCard"] : null) : null;
            privateState.expiryMonth = value ? (value["expiryMonth"] ? value["expiryMonth"] : null) : null;
            privateState.expiryYear = value ? (value["expiryYear"] ? value["expiryYear"] : null) : null;
            privateState.cvv2 = value ? (value["cvv2"] ? value["cvv2"] : null) : null;
            privateState.vClientIDForPartner = value ? (value["vClientIDForPartner"] ? value["vClientIDForPartner"] : null) : null;
            privateState.vCustomerIDForPartner = value ? (value["vCustomerIDForPartner"] ? value["vCustomerIDForPartner"] : null) : null;
            privateState.updatedDateTime = value ? (value["updatedDateTime"] ? value["updatedDateTime"] : null) : null;
            privateState.createdDateTime = value ? (value["createdDateTime"] ? value["createdDateTime"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(RequestCreditCard);

    //Create new class level validator object
    BaseModel.Validator.call(RequestCreditCard);

    var registerValidatorBackup = RequestCreditCard.registerValidator;

    RequestCreditCard.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(RequestCreditCard.isValid(this, propName, val)) {
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
    //For Operation 'applyForCreditCard' with service id 'applyForCreditCard5324'
     RequestCreditCard.applyForCreditCard = function(params, onCompletion){
        return RequestCreditCard.customVerb('applyForCreditCard', params, onCompletion);
     };

    var relations = [];

    RequestCreditCard.relations = relations;

    RequestCreditCard.prototype.isValid = function() {
        return RequestCreditCard.isValid(this);
    };

    RequestCreditCard.prototype.objModelName = "RequestCreditCard";
    RequestCreditCard.prototype.objServiceName = "CardManagementServices";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    RequestCreditCard.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CardManagementServices", "RequestCreditCard", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    RequestCreditCard.clone = function(objectToClone) {
        var clonedObj = new RequestCreditCard();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return RequestCreditCard;
});