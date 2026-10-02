/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"transactionDetails": "transactionDetails",
		"appId": "appId",
		"MFAAttributes": "MFAAttributes",
	};

	Object.freeze(mappings);

	var typings = {
		"transactionDetails": "string",
		"appId": "string",
		"MFAAttributes": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"appId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "HBLMerchantObjects",
		tableName: "BillPay"
	};

	Object.freeze(config);

	return config;
})