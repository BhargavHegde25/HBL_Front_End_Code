/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"consent": "consent",
		"responseCode": "responseCode",
		"responseMessage": "responseMessage",
		"responseData": "responseData",
		"vpaId": "vpaId",
		"userName": "userName",
		"amount": "amount",
		"endToEndTxnId": "endToEndTxnId",
		"orgRequestUniqueId": "orgRequestUniqueId",
		"countryCode": "countryCode",
	};

	Object.freeze(mappings);

	var typings = {
		"consent": "string",
		"responseCode": "string",
		"responseMessage": "string",
		"responseData": "string",
		"vpaId": "string",
		"userName": "string",
		"amount": "string",
		"endToEndTxnId": "string",
		"orgRequestUniqueId": "string",
		"countryCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"consent",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "HBLOtherBankTransfers",
		tableName: "CrossBorderPayments"
	};

	Object.freeze(config);

	return config;
})