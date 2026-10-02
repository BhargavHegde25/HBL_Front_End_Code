/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"customerId": "customerId",
		"currency": "currency",
		"productId": "productId",
		"intrestRate": "intrestRate",
		"fromAccount": "fromAccount",
		"amount": "amount",
		"status": "status",
		"referenceId": "referenceId",
		"arrangementId": "arrangementId",
		"transactionStatus": "transactionStatus",
		"depositInterestRate": "depositInterestRate",
		"code": "code",
		"message": "message",
		"type": "type",
		"MFAAttributes": "MFAAttributes",
		"depositType": "depositType",
		"result": "result",
		"rate": "rate",
		"aaProductId": "aaProductId",
		"term": "term",
		"minEligibilityAmt": "minEligibilityAmt",
		"tenure": "tenure",
		"availableBalance": "availableBalance",
		"currencyCode": "currencyCode",
	};

	Object.freeze(mappings);

	var typings = {
		"customerId": "string",
		"currency": "string",
		"productId": "string",
		"intrestRate": "string",
		"fromAccount": "string",
		"amount": "string",
		"status": "string",
		"referenceId": "string",
		"arrangementId": "string",
		"transactionStatus": "string",
		"depositInterestRate": "string",
		"code": "string",
		"message": "string",
		"type": "string",
		"MFAAttributes": "string",
		"depositType": "string",
		"result": "string",
		"rate": "string",
		"aaProductId": "string",
		"term": "string",
		"minEligibilityAmt": "string",
		"tenure": "string",
		"availableBalance": "string",
		"currencyCode": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"customerId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "HBLOtherBankTransfers",
		tableName: "FixedDeposit"
	};

	Object.freeze(config);

	return config;
})