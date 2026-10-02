/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"facilityId": "facilityId",
		"loanProduct": "loanProduct",
		"currency": "currency",
		"loanAmount": "loanAmount",
		"customerId": "customerId",
		"customerName": "customerName",
		"customerRole": "customerRole",
		"amount": "amount",
		"creditAccountId": "creditAccountId",
		"debitAccountId": "debitAccountId",
		"drawdownRequestId": "drawdownRequestId",
		"createdBy": "createdBy",
		"updatedBy": "updatedBy",
		"createdDate": "createdDate",
		"updatedDate": "updatedDate",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"drawdownTermDays": "drawdownTermDays",
		"drawdownTermMonths": "drawdownTermMonths",
		"drawdownTermYears": "drawdownTermYears",
	};

	Object.freeze(mappings);

	var typings = {
		"facilityId": "string",
		"loanProduct": "string",
		"currency": "string",
		"loanAmount": "string",
		"customerId": "string",
		"customerName": "string",
		"customerRole": "string",
		"amount": "string",
		"creditAccountId": "string",
		"debitAccountId": "string",
		"drawdownRequestId": "string",
		"createdBy": "string",
		"updatedBy": "string",
		"createdDate": "string",
		"updatedDate": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"drawdownTermDays": "string",
		"drawdownTermMonths": "string",
		"drawdownTermYears": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"drawdownRequestId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeLending",
		tableName: "DrawdownRequests"
	};

	Object.freeze(config);

	return config;
})