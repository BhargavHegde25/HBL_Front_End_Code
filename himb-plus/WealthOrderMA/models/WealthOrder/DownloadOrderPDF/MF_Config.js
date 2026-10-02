/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"portfolioId": "portfolioId",
		"navPage": "navPage",
		"sortBy": "sortBy",
		"searchByInstrumentName": "searchByInstrumentName",
		"startDate": "startDate",
		"endDate": "endDate",
		"accountId": "accountId",
		"dateFrom": "dateFrom",
		"dateTo": "dateTo",
		"listType": "listType",
		"currencyId": "currencyId",
		"benchMarkIndex": "benchMarkIndex",
		"duration": "duration",
		"type": "type",
		"orderId": "orderId",
		"isEuro": "isEuro",
		"instrumentId": "instrumentId",
		"sortOrder": "sortOrder",
		"downloadFormat": "downloadFormat",
	};

	Object.freeze(mappings);

	var typings = {
		"portfolioId": "string",
		"navPage": "string",
		"sortBy": "string",
		"searchByInstrumentName": "string",
		"startDate": "string",
		"endDate": "string",
		"accountId": "string",
		"dateFrom": "string",
		"dateTo": "string",
		"listType": "string",
		"currencyId": "string",
		"benchMarkIndex": "string",
		"duration": "string",
		"type": "string",
		"orderId": "string",
		"isEuro": "string",
		"instrumentId": "string",
		"sortOrder": "string",
		"downloadFormat": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"portfolioId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "WealthOrder",
		tableName: "DownloadOrderPDF"
	};

	Object.freeze(config);

	return config;
})