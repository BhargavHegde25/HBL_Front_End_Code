/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"accountId": "accountId",
		"accountName": "accountName",
		"bankId": "bankId",
		"branchId": "branchId",
		"currency": "currency",
		"responseCode": "responseCode",
		"responseMessage": "responseMessage",
		"matchPercentate": "matchPercentate",
	};

	Object.freeze(mappings);

	var typings = {
		"accountId": "string",
		"accountName": "string",
		"bankId": "string",
		"branchId": "string",
		"currency": "string",
		"responseCode": "string",
		"responseMessage": "string",
		"matchPercentate": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"accountId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "HBLOtherBankTransfers",
		tableName: "CIPSTransfers"
	};

	Object.freeze(config);

	return config;
})