/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"userId": "userId",
		"customerId": "customerId",
		"favInstrumentCodes": "favInstrumentCodes",
		"RICCode": "RICCode",
		"operation": "operation",
		"favInstrumentIds": "favInstrumentIds",
		"instrumentId": "instrumentId",
		"application": "application",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"userId": "string",
		"customerId": "string",
		"favInstrumentCodes": "string",
		"RICCode": "string",
		"operation": "string",
		"favInstrumentIds": "string",
		"instrumentId": "string",
		"application": "string",
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
		serviceName: "WealthOrder",
		tableName: "FavouriteInstruments"
	};

	Object.freeze(config);

	return config;
})