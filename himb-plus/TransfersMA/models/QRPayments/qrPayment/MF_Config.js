/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"transactionId": "transactionId",
		"narration": "narration",
		"MFAAttributes": "MFAAttributes",
	};

	Object.freeze(mappings);

	var typings = {
		"transactionId": "string",
		"narration": "string",
		"MFAAttributes": "string",
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
		tableName: "qrPayment"
	};

	Object.freeze(config);

	return config;
})