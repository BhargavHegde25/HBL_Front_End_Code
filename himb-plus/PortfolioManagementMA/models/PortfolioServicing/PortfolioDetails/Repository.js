define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PortfolioDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PortfolioDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	PortfolioDetailsRepository.prototype.constructor = PortfolioDetailsRepository;

	//For Operation 'getPortfolioHoldings' with service id 'getPortfolioHoldings9388'
	PortfolioDetailsRepository.prototype.getPortfolioHoldings = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getPortfolioHoldings', params, onCompletion);
	};

	//For Operation 'getFieldsOrder' with service id 'getFieldsOrder6327'
	PortfolioDetailsRepository.prototype.getFieldsOrder = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getFieldsOrder', params, onCompletion);
	};

	//For Operation 'getPortfolioDetails' with service id 'getPortfolioDetails1958'
	PortfolioDetailsRepository.prototype.getPortfolioDetails = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getPortfolioDetails', params, onCompletion);
	};

	//For Operation 'getPortfolioPerformance' with service id 'getPerformance4068'
	PortfolioDetailsRepository.prototype.getPortfolioPerformance = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getPortfolioPerformance', params, onCompletion);
	};

	//For Operation 'updateFieldsOrder' with service id 'updateFieldsOrder6938'
	PortfolioDetailsRepository.prototype.updateFieldsOrder = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('updateFieldsOrder', params, onCompletion);
	};

	//For Operation 'getAllocation' with service id 'getAllocation7701'
	PortfolioDetailsRepository.prototype.getAllocation = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getAllocation', params, onCompletion);
	};

	//For Operation 'getAssetAllocation' with service id 'getAssetAllocation8568'
	PortfolioDetailsRepository.prototype.getAssetAllocation = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getAssetAllocation', params, onCompletion);
	};

	//For Operation 'getInstrumentTotal' with service id 'getInstrumentTotal3517'
	PortfolioDetailsRepository.prototype.getInstrumentTotal = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getInstrumentTotal', params, onCompletion);
	};

	//For Operation 'getTransactionDetails' with service id 'getTransactionDetails5041'
	PortfolioDetailsRepository.prototype.getTransactionDetails = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getTransactionDetails', params, onCompletion);
	};

	//For Operation 'getOrdersDetails' with service id 'getOrdersDetails9911'
	PortfolioDetailsRepository.prototype.getOrdersDetails = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getOrdersDetails', params, onCompletion);
	};

	//For Operation 'getCashAccounts' with service id 'getCashAccounts8448'
	PortfolioDetailsRepository.prototype.getCashAccounts = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getCashAccounts', params, onCompletion);
	};

	//For Operation 'getAccountActivity' with service id 'getAccountActivity6968'
	PortfolioDetailsRepository.prototype.getAccountActivity = function(params, onCompletion){
		return PortfolioDetailsRepository.prototype.customVerb('getAccountActivity', params, onCompletion);
	};

	return PortfolioDetailsRepository;
})