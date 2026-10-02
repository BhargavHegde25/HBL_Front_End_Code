/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
	var mappings = {
		"repaymentFor": "repaymentFor",
		"fromAccountNumber": "fromAccountNumber",
		"toAccountNumber": "toAccountNumber",
		"paymentType": "paymentType",
		"paymentAmount": "paymentAmount",
		"paymentCurrency": "paymentCurrency",
		"paymentReferenceMsg": "paymentReferenceMsg",
		"paymentRequestDate": "paymentRequestDate",
		"createdBy": "createdBy",
		"updatedBy": "updatedBy",
		"createdDate": "createdDate",
		"updatedDate": "updatedDate",
		"dbpErrCode": "dbpErrCode",
		"dbpErrMsg": "dbpErrMsg",
		"paymentRequestId": "paymentRequestId",
	};

	Object.freeze(mappings);

	var typings = {
		"repaymentFor": "string",
		"fromAccountNumber": "string",
		"toAccountNumber": "string",
		"paymentType": "string",
		"paymentAmount": "string",
		"paymentCurrency": "string",
		"paymentReferenceMsg": "string",
		"paymentRequestDate": "string",
		"createdBy": "string",
		"updatedBy": "string",
		"createdDate": "string",
		"updatedDate": "string",
		"dbpErrCode": "string",
		"dbpErrMsg": "string",
		"paymentRequestId": "string",
	}

	Object.freeze(typings);

	var primaryKeys = [
					"paymentRequestId",
	];

	Object.freeze(primaryKeys);

	var config = {
		mappings: mappings,
		typings: typings,
		primaryKeys: primaryKeys,
		serviceName: "TradeLending",
		tableName: "LendingPaymentRequest"
	};

	Object.freeze(config);

	return config;
})