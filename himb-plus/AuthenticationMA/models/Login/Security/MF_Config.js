/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"riskScore": "riskScore",
		"deviceId": "deviceId",
		"operatingSystem": "operatingSystem",
		"serviceKey": "serviceKey",
		"encodedImage": "encodedImage",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"captchaValue": "captchaValue",
		"userName": "userName",
		"totp": "totp",
		"password": "password",
		"Pin": "Pin",
		"defaultACC": "defaultACC",
		"OldPin": "OldPin",
		"FlowType": "FlowType",
		"accountID": "accountID",
		"nickName": "nickName",
		"temporaryPIN": "temporaryPIN",
		"newPIN": "newPIN",
		"customerid": "customerid",
		"securityKey": "securityKey",
		"OTP": "OTP",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"riskScore": "string",
		"deviceId": "string",
		"operatingSystem": "string",
		"serviceKey": "string",
		"encodedImage": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"captchaValue": "string",
		"userName": "string",
		"totp": "string",
		"password": "string",
		"Pin": "string",
		"defaultACC": "string",
		"OldPin": "string",
		"FlowType": "string",
		"accountID": "string",
		"nickName": "string",
		"temporaryPIN": "string",
		"newPIN": "string",
		"customerid": "string",
		"securityKey": "string",
		"OTP": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"id",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Login",
		tableName: "Security"
	};

	Object.freeze(config);

	return config;
})