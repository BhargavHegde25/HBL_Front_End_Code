/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"qrData": "qrData",
		"amount": "amount",
		"aggSelected": "aggSelected",
		"aggPayload": "aggPayload",
		"success": "success",
		"message": "message",
		"transactionFee": "transactionFee",
		"debitAmount": "debitAmount",
		"transactionId": "transactionId",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"aggregatorType": "aggregatorType",
		"responseCode": "responseCode",
		"responseMessage": "responseMessage",
		"fromAccountNumber": "fromAccountNumber",
	};

	Object.freeze(mappings);

	var typings = {
		"qrData": "string",
		"amount": "string",
		"aggSelected": "string",
		"aggPayload": "string",
		"success": "string",
		"message": "string",
		"transactionFee": "string",
		"debitAmount": "string",
		"transactionId": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"aggregatorType": "string",
		"responseCode": "string",
		"responseMessage": "string",
		"fromAccountNumber": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"transactionId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "QRPayments",
		tableName: "qrValidation"
	};

	Object.freeze(config);

	return config;
})