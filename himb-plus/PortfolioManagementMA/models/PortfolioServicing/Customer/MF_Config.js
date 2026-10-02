/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"id": "id",
		"customerId": "customerId",
		"backendId": "backendId",
		"operation": "operation",
		"isFavourite": "isFavourite",
		"isWealthUser": "isWealthUser",
		"Customers": "Customers",
	};

	Object.freeze(mappings);

	var typings = {
		"id": "string",
		"customerId": "string",
		"backendId": "string",
		"operation": "string",
		"isFavourite": "string",
		"isWealthUser": "string",
		"Customers": "string",
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
		serviceName: "PortfolioServicing",
		tableName: "Customer"
	};

	Object.freeze(config);

	return config;
})