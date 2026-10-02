/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"Topic": "Topic",
		"HL": "HL",
		"ID": "ID",
		"PR": "PR",
		"LT": "LT",
		"HT": "HT",
		"TE": "TE",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
	};

	Object.freeze(mappings);

	var typings = {
		"Topic": "string",
		"HL": "string",
		"ID": "string",
		"PR": "string",
		"LT": "string",
		"HT": "string",
		"TE": "string",
		"pageSize": "string",
		"pageOffset": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"Topic",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "PortfolioServicing",
		tableName: "MarketData"
	};

	Object.freeze(config);

	return config;
})