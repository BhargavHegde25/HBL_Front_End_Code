define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function KUKL_PaymentsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	KUKL_PaymentsRepository.prototype = Object.create(BaseRepository.prototype);
	KUKL_PaymentsRepository.prototype.constructor = KUKL_PaymentsRepository;

	//For Operation 'getCustomerBillInfo' with service id 'getCustomerBillInfo9770'
	KUKL_PaymentsRepository.prototype.getCustomerBillInfo = function(params, onCompletion){
		return KUKL_PaymentsRepository.prototype.customVerb('getCustomerBillInfo', params, onCompletion);
	};

	//For Operation 'confirmBillPay' with service id 'confirmBillPay6791'
	KUKL_PaymentsRepository.prototype.confirmBillPay = function(params, onCompletion){
		return KUKL_PaymentsRepository.prototype.customVerb('confirmBillPay', params, onCompletion);
	};

	return KUKL_PaymentsRepository;
})