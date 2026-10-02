define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BillPayRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BillPayRepository.prototype = Object.create(BaseRepository.prototype);
	BillPayRepository.prototype.constructor = BillPayRepository;

	//For Operation 'getBranchList' with service id 'GetBranchList1604'
	BillPayRepository.prototype.getBranchList = function(params, onCompletion){
		return BillPayRepository.prototype.customVerb('getBranchList', params, onCompletion);
	};

	//For Operation 'getCustomerBillInfo' with service id 'GetCustomerBillInfo8333'
	BillPayRepository.prototype.getCustomerBillInfo = function(params, onCompletion){
		return BillPayRepository.prototype.customVerb('getCustomerBillInfo', params, onCompletion);
	};

	//For Operation 'getNPIBillerData' with service id 'getNPIBillerData6369'
	BillPayRepository.prototype.getNPIBillerData = function(params, onCompletion){
		return BillPayRepository.prototype.customVerb('getNPIBillerData', params, onCompletion);
	};

	//For Operation 'getNPSBillersIntegrationURL' with service id 'GetNPSBillersIntegrationURL4522'
	BillPayRepository.prototype.getNPSBillersIntegrationURL = function(params, onCompletion){
		return BillPayRepository.prototype.customVerb('getNPSBillersIntegrationURL', params, onCompletion);
	};

	//For Operation 'confirmBillPay' with service id 'ConfirmBillPaid8819'
	BillPayRepository.prototype.confirmBillPay = function(params, onCompletion){
		return BillPayRepository.prototype.customVerb('confirmBillPay', params, onCompletion);
	};

	return BillPayRepository;
})