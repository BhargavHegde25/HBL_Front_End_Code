/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"sellAmount": "sellAmount",
		"buyAmount": "buyAmount",
		"sellCurrency": "sellCurrency",
		"buyCurrency": "buyCurrency",
		"ISINCode": "ISINCode",
		"marketPrice": "marketPrice",
		"order": "order",
		"quantity": "quantity",
		"orderType": "orderType",
		"stopLoss": "stopLoss",
		"stopPrice": "stopPrice",
		"limitPrice": "limitPrice",
		"validity": "validity",
		"netAmount": "netAmount",
		"portfolioId": "portfolioId",
		"customerId": "customerId",
		"stockExchange": "stockExchange",
		"tradeCurrency": "tradeCurrency",
		"instrumentId": "instrumentId",
		"price": "price",
		"transactionType": "transactionType",
		"orderId": "orderId",
		"validate_only": "validate_only",
		"calculateCharges": "calculateCharges",
		"dealStatus": "dealStatus",
		"caseCode": "caseCode",
		"orderTypeCode": "orderTypeCode",
		"reasonC": "reasonC",
		"targetNatureE": "targetNatureE",
		"assetType": "assetType",
		"funcResultCode": "funcResultCode",
	};

	Object.freeze(mappings);

	var typings = {
		"sellAmount": "string",
		"buyAmount": "string",
		"sellCurrency": "string",
		"buyCurrency": "string",
		"ISINCode": "string",
		"marketPrice": "string",
		"order": "string",
		"quantity": "string",
		"orderType": "string",
		"stopLoss": "string",
		"stopPrice": "string",
		"limitPrice": "string",
		"validity": "string",
		"netAmount": "string",
		"portfolioId": "string",
		"customerId": "string",
		"stockExchange": "string",
		"tradeCurrency": "string",
		"instrumentId": "string",
		"price": "string",
		"transactionType": "string",
		"orderId": "string",
		"validate_only": "string",
		"calculateCharges": "string",
		"dealStatus": "string",
		"caseCode": "string",
		"orderTypeCode": "string",
		"reasonC": "string",
		"targetNatureE": "string",
		"assetType": "string",
		"funcResultCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"ISINCode",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "WealthOrder",
		tableName: "Order"
	};

	Object.freeze(config);

	return config;
})