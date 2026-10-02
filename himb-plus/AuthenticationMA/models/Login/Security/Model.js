/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Security", "objectService" : "Login"};

    var setterFunctions = {
        id: function(val, state) {
            context["field"] = "id";
            context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
            state['id'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        riskScore: function(val, state) {
            context["field"] = "riskScore";
            context["metadata"] = (objectMetadata ? objectMetadata["riskScore"] : null);
            state['riskScore'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        deviceId: function(val, state) {
            context["field"] = "deviceId";
            context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
            state['deviceId'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        operatingSystem: function(val, state) {
            context["field"] = "operatingSystem";
            context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
            state['operatingSystem'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        serviceKey: function(val, state) {
            context["field"] = "serviceKey";
            context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
            state['serviceKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        encodedImage: function(val, state) {
            context["field"] = "encodedImage";
            context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
            state['encodedImage'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
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
        captchaValue: function(val, state) {
            context["field"] = "captchaValue";
            context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
            state['captchaValue'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        userName: function(val, state) {
            context["field"] = "userName";
            context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
            state['userName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        totp: function(val, state) {
            context["field"] = "totp";
            context["metadata"] = (objectMetadata ? objectMetadata["totp"] : null);
            state['totp'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        password: function(val, state) {
            context["field"] = "password";
            context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
            state['password'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        Pin: function(val, state) {
            context["field"] = "Pin";
            context["metadata"] = (objectMetadata ? objectMetadata["Pin"] : null);
            state['Pin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        defaultACC: function(val, state) {
            context["field"] = "defaultACC";
            context["metadata"] = (objectMetadata ? objectMetadata["defaultACC"] : null);
            state['defaultACC'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OldPin: function(val, state) {
            context["field"] = "OldPin";
            context["metadata"] = (objectMetadata ? objectMetadata["OldPin"] : null);
            state['OldPin'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        FlowType: function(val, state) {
            context["field"] = "FlowType";
            context["metadata"] = (objectMetadata ? objectMetadata["FlowType"] : null);
            state['FlowType'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        accountID: function(val, state) {
            context["field"] = "accountID";
            context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
            state['accountID'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        nickName: function(val, state) {
            context["field"] = "nickName";
            context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
            state['nickName'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        temporaryPIN: function(val, state) {
            context["field"] = "temporaryPIN";
            context["metadata"] = (objectMetadata ? objectMetadata["temporaryPIN"] : null);
            state['temporaryPIN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        newPIN: function(val, state) {
            context["field"] = "newPIN";
            context["metadata"] = (objectMetadata ? objectMetadata["newPIN"] : null);
            state['newPIN'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        customerid: function(val, state) {
            context["field"] = "customerid";
            context["metadata"] = (objectMetadata ? objectMetadata["customerid"] : null);
            state['customerid'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        securityKey: function(val, state) {
            context["field"] = "securityKey";
            context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
            state['securityKey'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
        OTP: function(val, state) {
            context["field"] = "OTP";
            context["metadata"] = (objectMetadata ? objectMetadata["OTP"] : null);
            state['OTP'] = kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, val, context);
        },
    };

    //Create the Model Class
    function Security(defaultValues) {
        var privateState = {};
        context["field"] = "id";
        context["metadata"] = (objectMetadata ? objectMetadata["id"] : null);
        privateState.id = defaultValues ?
            (defaultValues["id"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["id"], context) :
                null) :
            null;

        context["field"] = "riskScore";
        context["metadata"] = (objectMetadata ? objectMetadata["riskScore"] : null);
        privateState.riskScore = defaultValues ?
            (defaultValues["riskScore"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["riskScore"], context) :
                null) :
            null;

        context["field"] = "deviceId";
        context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
        privateState.deviceId = defaultValues ?
            (defaultValues["deviceId"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["deviceId"], context) :
                null) :
            null;

        context["field"] = "operatingSystem";
        context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
        privateState.operatingSystem = defaultValues ?
            (defaultValues["operatingSystem"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["operatingSystem"], context) :
                null) :
            null;

        context["field"] = "serviceKey";
        context["metadata"] = (objectMetadata ? objectMetadata["serviceKey"] : null);
        privateState.serviceKey = defaultValues ?
            (defaultValues["serviceKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["serviceKey"], context) :
                null) :
            null;

        context["field"] = "encodedImage";
        context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
        privateState.encodedImage = defaultValues ?
            (defaultValues["encodedImage"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["encodedImage"], context) :
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

        context["field"] = "captchaValue";
        context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
        privateState.captchaValue = defaultValues ?
            (defaultValues["captchaValue"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["captchaValue"], context) :
                null) :
            null;

        context["field"] = "userName";
        context["metadata"] = (objectMetadata ? objectMetadata["userName"] : null);
        privateState.userName = defaultValues ?
            (defaultValues["userName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["userName"], context) :
                null) :
            null;

        context["field"] = "totp";
        context["metadata"] = (objectMetadata ? objectMetadata["totp"] : null);
        privateState.totp = defaultValues ?
            (defaultValues["totp"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["totp"], context) :
                null) :
            null;

        context["field"] = "password";
        context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
        privateState.password = defaultValues ?
            (defaultValues["password"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["password"], context) :
                null) :
            null;

        context["field"] = "Pin";
        context["metadata"] = (objectMetadata ? objectMetadata["Pin"] : null);
        privateState.Pin = defaultValues ?
            (defaultValues["Pin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["Pin"], context) :
                null) :
            null;

        context["field"] = "defaultACC";
        context["metadata"] = (objectMetadata ? objectMetadata["defaultACC"] : null);
        privateState.defaultACC = defaultValues ?
            (defaultValues["defaultACC"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["defaultACC"], context) :
                null) :
            null;

        context["field"] = "OldPin";
        context["metadata"] = (objectMetadata ? objectMetadata["OldPin"] : null);
        privateState.OldPin = defaultValues ?
            (defaultValues["OldPin"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OldPin"], context) :
                null) :
            null;

        context["field"] = "FlowType";
        context["metadata"] = (objectMetadata ? objectMetadata["FlowType"] : null);
        privateState.FlowType = defaultValues ?
            (defaultValues["FlowType"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["FlowType"], context) :
                null) :
            null;

        context["field"] = "accountID";
        context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
        privateState.accountID = defaultValues ?
            (defaultValues["accountID"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["accountID"], context) :
                null) :
            null;

        context["field"] = "nickName";
        context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
        privateState.nickName = defaultValues ?
            (defaultValues["nickName"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["nickName"], context) :
                null) :
            null;

        context["field"] = "temporaryPIN";
        context["metadata"] = (objectMetadata ? objectMetadata["temporaryPIN"] : null);
        privateState.temporaryPIN = defaultValues ?
            (defaultValues["temporaryPIN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["temporaryPIN"], context) :
                null) :
            null;

        context["field"] = "newPIN";
        context["metadata"] = (objectMetadata ? objectMetadata["newPIN"] : null);
        privateState.newPIN = defaultValues ?
            (defaultValues["newPIN"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["newPIN"], context) :
                null) :
            null;

        context["field"] = "customerid";
        context["metadata"] = (objectMetadata ? objectMetadata["customerid"] : null);
        privateState.customerid = defaultValues ?
            (defaultValues["customerid"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["customerid"], context) :
                null) :
            null;

        context["field"] = "securityKey";
        context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
        privateState.securityKey = defaultValues ?
            (defaultValues["securityKey"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["securityKey"], context) :
                null) :
            null;

        context["field"] = "OTP";
        context["metadata"] = (objectMetadata ? objectMetadata["OTP"] : null);
        privateState.OTP = defaultValues ?
            (defaultValues["OTP"] ?
                kony.mvc.util.ProcessorUtils.applyFunction(preProcessorCallback, defaultValues["OTP"], context) :
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
            "riskScore": {
                get: function() {
                    context["field"] = "riskScore";
                    context["metadata"] = (objectMetadata ? objectMetadata["riskScore"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.riskScore, context);
                },
                set: function(val) {
                    setterFunctions['riskScore'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "deviceId": {
                get: function() {
                    context["field"] = "deviceId";
                    context["metadata"] = (objectMetadata ? objectMetadata["deviceId"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.deviceId, context);
                },
                set: function(val) {
                    setterFunctions['deviceId'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "operatingSystem": {
                get: function() {
                    context["field"] = "operatingSystem";
                    context["metadata"] = (objectMetadata ? objectMetadata["operatingSystem"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.operatingSystem, context);
                },
                set: function(val) {
                    setterFunctions['operatingSystem'].call(this, val, privateState);
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
            "encodedImage": {
                get: function() {
                    context["field"] = "encodedImage";
                    context["metadata"] = (objectMetadata ? objectMetadata["encodedImage"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.encodedImage, context);
                },
                set: function(val) {
                    setterFunctions['encodedImage'].call(this, val, privateState);
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
            "captchaValue": {
                get: function() {
                    context["field"] = "captchaValue";
                    context["metadata"] = (objectMetadata ? objectMetadata["captchaValue"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.captchaValue, context);
                },
                set: function(val) {
                    setterFunctions['captchaValue'].call(this, val, privateState);
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
            "totp": {
                get: function() {
                    context["field"] = "totp";
                    context["metadata"] = (objectMetadata ? objectMetadata["totp"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.totp, context);
                },
                set: function(val) {
                    setterFunctions['totp'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "password": {
                get: function() {
                    context["field"] = "password";
                    context["metadata"] = (objectMetadata ? objectMetadata["password"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.password, context);
                },
                set: function(val) {
                    setterFunctions['password'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "Pin": {
                get: function() {
                    context["field"] = "Pin";
                    context["metadata"] = (objectMetadata ? objectMetadata["Pin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.Pin, context);
                },
                set: function(val) {
                    setterFunctions['Pin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "defaultACC": {
                get: function() {
                    context["field"] = "defaultACC";
                    context["metadata"] = (objectMetadata ? objectMetadata["defaultACC"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.defaultACC, context);
                },
                set: function(val) {
                    setterFunctions['defaultACC'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OldPin": {
                get: function() {
                    context["field"] = "OldPin";
                    context["metadata"] = (objectMetadata ? objectMetadata["OldPin"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OldPin, context);
                },
                set: function(val) {
                    setterFunctions['OldPin'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "FlowType": {
                get: function() {
                    context["field"] = "FlowType";
                    context["metadata"] = (objectMetadata ? objectMetadata["FlowType"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.FlowType, context);
                },
                set: function(val) {
                    setterFunctions['FlowType'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "accountID": {
                get: function() {
                    context["field"] = "accountID";
                    context["metadata"] = (objectMetadata ? objectMetadata["accountID"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.accountID, context);
                },
                set: function(val) {
                    setterFunctions['accountID'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "nickName": {
                get: function() {
                    context["field"] = "nickName";
                    context["metadata"] = (objectMetadata ? objectMetadata["nickName"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.nickName, context);
                },
                set: function(val) {
                    setterFunctions['nickName'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "temporaryPIN": {
                get: function() {
                    context["field"] = "temporaryPIN";
                    context["metadata"] = (objectMetadata ? objectMetadata["temporaryPIN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.temporaryPIN, context);
                },
                set: function(val) {
                    setterFunctions['temporaryPIN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "newPIN": {
                get: function() {
                    context["field"] = "newPIN";
                    context["metadata"] = (objectMetadata ? objectMetadata["newPIN"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.newPIN, context);
                },
                set: function(val) {
                    setterFunctions['newPIN'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "customerid": {
                get: function() {
                    context["field"] = "customerid";
                    context["metadata"] = (objectMetadata ? objectMetadata["customerid"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.customerid, context);
                },
                set: function(val) {
                    setterFunctions['customerid'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "securityKey": {
                get: function() {
                    context["field"] = "securityKey";
                    context["metadata"] = (objectMetadata ? objectMetadata["securityKey"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.securityKey, context);
                },
                set: function(val) {
                    setterFunctions['securityKey'].call(this, val, privateState);
                },
                enumerable: true,
            },
            "OTP": {
                get: function() {
                    context["field"] = "OTP";
                    context["metadata"] = (objectMetadata ? objectMetadata["OTP"] : null);
                    return kony.mvc.util.ProcessorUtils.applyFunction(postProcessorCallback, privateState.OTP, context);
                },
                set: function(val) {
                    setterFunctions['OTP'].call(this, val, privateState);
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
            privateState.riskScore = value ? (value["riskScore"] ? value["riskScore"] : null) : null;
            privateState.deviceId = value ? (value["deviceId"] ? value["deviceId"] : null) : null;
            privateState.operatingSystem = value ? (value["operatingSystem"] ? value["operatingSystem"] : null) : null;
            privateState.serviceKey = value ? (value["serviceKey"] ? value["serviceKey"] : null) : null;
            privateState.encodedImage = value ? (value["encodedImage"] ? value["encodedImage"] : null) : null;
            privateState.dbpErrCode = value ? (value["dbpErrCode"] ? value["dbpErrCode"] : null) : null;
            privateState.dbpErrMsg = value ? (value["dbpErrMsg"] ? value["dbpErrMsg"] : null) : null;
            privateState.captchaValue = value ? (value["captchaValue"] ? value["captchaValue"] : null) : null;
            privateState.userName = value ? (value["userName"] ? value["userName"] : null) : null;
            privateState.totp = value ? (value["totp"] ? value["totp"] : null) : null;
            privateState.password = value ? (value["password"] ? value["password"] : null) : null;
            privateState.Pin = value ? (value["Pin"] ? value["Pin"] : null) : null;
            privateState.defaultACC = value ? (value["defaultACC"] ? value["defaultACC"] : null) : null;
            privateState.OldPin = value ? (value["OldPin"] ? value["OldPin"] : null) : null;
            privateState.FlowType = value ? (value["FlowType"] ? value["FlowType"] : null) : null;
            privateState.accountID = value ? (value["accountID"] ? value["accountID"] : null) : null;
            privateState.nickName = value ? (value["nickName"] ? value["nickName"] : null) : null;
            privateState.temporaryPIN = value ? (value["temporaryPIN"] ? value["temporaryPIN"] : null) : null;
            privateState.newPIN = value ? (value["newPIN"] ? value["newPIN"] : null) : null;
            privateState.customerid = value ? (value["customerid"] ? value["customerid"] : null) : null;
            privateState.securityKey = value ? (value["securityKey"] ? value["securityKey"] : null) : null;
            privateState.OTP = value ? (value["OTP"] ? value["OTP"] : null) : null;
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Security);

    //Create new class level validator object
    BaseModel.Validator.call(Security);

    var registerValidatorBackup = Security.registerValidator;

    Security.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Security.isValid(this, propName, val)) {
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
    //For Operation 'ThirdpartyAuthUserValidation' with service id 'EnableThirdpartyAuth1852'
     Security.ThirdpartyAuthUserValidation = function(params, onCompletion){
        return Security.customVerb('ThirdpartyAuthUserValidation', params, onCompletion);
     };

    //For Operation 'getCantSignInMFAcheck' with service id 'getCantSiginInMFAConfig1257'
     Security.getCantSignInMFAcheck = function(params, onCompletion){
        return Security.customVerb('getCantSignInMFAcheck', params, onCompletion);
     };

    //For Operation 'getTransactionPINStatus' with service id 'getTransactionPINStatus9182'
     Security.getTransactionPINStatus = function(params, onCompletion){
        return Security.customVerb('getTransactionPINStatus', params, onCompletion);
     };

    //For Operation 'updateTransactionPIN' with service id 'updateTransactionPINStatus1176'
     Security.updateTransactionPIN = function(params, onCompletion){
        return Security.customVerb('updateTransactionPIN', params, onCompletion);
     };

    //For Operation 'validateCantsigninOTP' with service id 'validateCantsigninOTP3952'
     Security.validateCantsigninOTP = function(params, onCompletion){
        return Security.customVerb('validateCantsigninOTP', params, onCompletion);
     };

    //For Operation 'resetCustomerDefaultAcc' with service id 'resetCustomerDefaultAccount7844'
     Security.resetCustomerDefaultAcc = function(params, onCompletion){
        return Security.customVerb('resetCustomerDefaultAcc', params, onCompletion);
     };

    //For Operation 'validateTransactionPin' with service id 'validateTransactionPin1912'
     Security.validateTransactionPin = function(params, onCompletion){
        return Security.customVerb('validateTransactionPin', params, onCompletion);
     };

    //For Operation 'verifyCaptcha' with service id 'VerifyCaptcha1364'
     Security.verifyCaptcha = function(params, onCompletion){
        return Security.customVerb('verifyCaptcha', params, onCompletion);
     };

    //For Operation 'GoogleTOTPValidation' with service id 'GoogleTokenValidation8742'
     Security.GoogleTOTPValidation = function(params, onCompletion){
        return Security.customVerb('GoogleTOTPValidation', params, onCompletion);
     };

    //For Operation 'TransactionPINResetValidation' with service id 'TransactionPINResetValidation2189'
     Security.TransactionPINResetValidation = function(params, onCompletion){
        return Security.customVerb('TransactionPINResetValidation', params, onCompletion);
     };

    //For Operation 'getResetThirdPartyStatus' with service id 'getResetThirdPartyStatus2594'
     Security.getResetThirdPartyStatus = function(params, onCompletion){
        return Security.customVerb('getResetThirdPartyStatus', params, onCompletion);
     };

    //For Operation 'generateCaptcha' with service id 'GenerateCaptcha7112'
     Security.generateCaptcha = function(params, onCompletion){
        return Security.customVerb('generateCaptcha', params, onCompletion);
     };

    //For Operation 'GoogleAuthPair' with service id 'GoogleAuthPair1006'
     Security.GoogleAuthPair = function(params, onCompletion){
        return Security.customVerb('GoogleAuthPair', params, onCompletion);
     };

    //For Operation 'thirdParthAuthStatusCheck' with service id 'ThirdParthAuthCheckWithAccNo5650'
     Security.thirdParthAuthStatusCheck = function(params, onCompletion){
        return Security.customVerb('thirdParthAuthStatusCheck', params, onCompletion);
     };

    //For Operation 'transactionPINResetRequest' with service id 'transactionPINResetRequest8029'
     Security.transactionPINResetRequest = function(params, onCompletion){
        return Security.customVerb('transactionPINResetRequest', params, onCompletion);
     };

    //For Operation 'updateAccNickName' with service id 'updateAccNickName1933'
     Security.updateAccNickName = function(params, onCompletion){
        return Security.customVerb('updateAccNickName', params, onCompletion);
     };

    var relations = [];

    Security.relations = relations;

    Security.prototype.isValid = function() {
        return Security.isValid(this);
    };

    Security.prototype.objModelName = "Security";
    Security.prototype.objServiceName = "Login";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Security.registerProcessors = function(options, successCallback, failureCallback) {

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

        kony.mvc.util.ProcessorUtils.getMetadataForObject("Login", "Security", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Security.clone = function(objectToClone) {
        var clonedObj = new Security();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Security;
});