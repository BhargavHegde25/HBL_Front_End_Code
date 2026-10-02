/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"ISINCode": "ISINCode",
		"RICCode": "RICCode",
		"instrumentId": "instrumentId",
		"application": "application",
	};

	Object.freeze(mappings);

	var typings = {
		"ISINCode": "string",
		"RICCode": "string",
		"instrumentId": "string",
		"application": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"ISINCode",
					"RICCode",
					"instrumentId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "WealthOrder",
		tableName: "ProductDetails"
	};

	Object.freeze(config);

	return config;
})