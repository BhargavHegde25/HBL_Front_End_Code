/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"portfolioId": "portfolioId",
		"portfolioName": "portfolioName",
		"referenceCurrency": "referenceCurrency",
		"marketValue": "marketValue",
		"unRealizedPL": "unRealizedPL",
		"unRealizedPLAmount": "unRealizedPLAmount",
		"unRealizedPLPercentage": "unRealizedPLPercentage",
		"todayPL": "todayPL",
		"todayPLAmount": "todayPLAmount",
		"todayPLPercentage": "todayPLPercentage",
		"assetGroup": "assetGroup",
		"graphDuration": "graphDuration",
		"navPage": "navPage",
		"totalCashBalance": "totalCashBalance",
		"currency": "currency",
		"balance": "balance",
		"accountName": "accountName",
		"totalCashBalanceCurrency": "totalCashBalanceCurrency",
		"totalMarketValue": "totalMarketValue",
		"TIMESTAMP": "TIMESTAMP",
		"AMOUNT": "AMOUNT",
		"PERCENTAGE": "PERCENTAGE",
		"currencyName": "currencyName",
		"accountNumber": "accountNumber",
		"investmentType": "investmentType",
		"customerId": "customerId",
		"referenceCurrencyValue": "referenceCurrencyValue",
		"ricCodes": "ricCodes",
		"searchByInstrumentName": "searchByInstrumentName",
		"sortBy": "sortBy",
		"sortOrder": "sortOrder",
		"pageSize": "pageSize",
		"pageOffset": "pageOffset",
		"userId": "userId",
		"totalCount": "totalCount",
		"instrumentId": "instrumentId",
		"startDate": "startDate",
		"endDate": "endDate",
		"RICCode": "RICCode",
		"StoryId": "StoryId",
		"application": "application",
		"RE": "RE",
		"TN": "TN",
		"UR": "UR",
	};

	Object.freeze(mappings);

	var typings = {
		"portfolioId": "string",
		"portfolioName": "string",
		"referenceCurrency": "string",
		"marketValue": "string",
		"unRealizedPL": "string",
		"unRealizedPLAmount": "string",
		"unRealizedPLPercentage": "string",
		"todayPL": "string",
		"todayPLAmount": "string",
		"todayPLPercentage": "string",
		"assetGroup": "string",
		"graphDuration": "string",
		"navPage": "string",
		"totalCashBalance": "string",
		"currency": "string",
		"balance": "string",
		"accountName": "string",
		"totalCashBalanceCurrency": "string",
		"totalMarketValue": "string",
		"TIMESTAMP": "string",
		"AMOUNT": "string",
		"PERCENTAGE": "string",
		"currencyName": "string",
		"accountNumber": "string",
		"investmentType": "string",
		"customerId": "string",
		"referenceCurrencyValue": "string",
		"ricCodes": "string",
		"searchByInstrumentName": "string",
		"sortBy": "string",
		"sortOrder": "string",
		"pageSize": "string",
		"pageOffset": "string",
		"userId": "string",
		"totalCount": "number",
		"instrumentId": "string",
		"startDate": "string",
		"endDate": "string",
		"RICCode": "string",
		"StoryId": "string",
		"application": "string",
		"RE": "number",
		"TN": "number",
		"UR": "number",
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
		tableName: "InstrumentDetails"
	};

	Object.freeze(config);

	return config;
})