define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function NEA_PaymentsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	NEA_PaymentsRepository.prototype = Object.create(BaseRepository.prototype);
	NEA_PaymentsRepository.prototype.constructor = NEA_PaymentsRepository;

	//For Operation 'getBranchList' with service id 'GetBranchList5422'
	NEA_PaymentsRepository.prototype.getBranchList = function(params, onCompletion){
		return NEA_PaymentsRepository.prototype.customVerb('getBranchList', params, onCompletion);
	};

	//For Operation 'getCustomerBillInfo' with service id 'GetCustomerBillInfo1719'
	NEA_PaymentsRepository.prototype.getCustomerBillInfo = function(params, onCompletion){
		return NEA_PaymentsRepository.prototype.customVerb('getCustomerBillInfo', params, onCompletion);
	};

	//For Operation 'confirmBillPay' with service id 'ConfirmBillPaid5688'
	NEA_PaymentsRepository.prototype.confirmBillPay = function(params, onCompletion){
		return NEA_PaymentsRepository.prototype.customVerb('confirmBillPay', params, onCompletion);
	};

	return NEA_PaymentsRepository;
})