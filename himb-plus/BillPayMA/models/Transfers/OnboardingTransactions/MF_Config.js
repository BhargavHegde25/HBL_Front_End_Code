/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"debitAccountId": "debitAccountId",
		"creditAccountId": "creditAccountId",
		"paymentCurrencyId": "paymentCurrencyId",
		"amount": "amount",
		"customerId": "customerId",
		"userName": "userName",
		"coreCustomerId": "coreCustomerId",
		"companyId": "companyId",
	};

	Object.freeze(mappings);

	var typings = {
		"debitAccountId": "string",
		"creditAccountId": "string",
		"paymentCurrencyId": "string",
		"amount": "string",
		"customerId": "string",
		"userName": "string",
		"coreCustomerId": "string",
		"companyId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"debitAccountId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "Transfers",
		tableName: "OnboardingTransactions"
	};

	Object.freeze(config);

	return config;
})