define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CurrencyDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CurrencyDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	CurrencyDetailsRepository.prototype.constructor = CurrencyDetailsRepository;

	//For Operation 'createCurrencyOrder' with service id 'createCurrencyOrder6660'
	CurrencyDetailsRepository.prototype.createCurrencyOrder = function(params, onCompletion){
		return CurrencyDetailsRepository.prototype.customVerb('createCurrencyOrder', params, onCompletion);
	};

	//For Operation 'getMarketRates' with service id 'getMarketRates8160'
	CurrencyDetailsRepository.prototype.getMarketRates = function(params, onCompletion){
		return CurrencyDetailsRepository.prototype.customVerb('getMarketRates', params, onCompletion);
	};

	//For Operation 'getCurrencyGraph' with service id 'getCurrencyGraph1845'
	CurrencyDetailsRepository.prototype.getCurrencyGraph = function(params, onCompletion){
		return CurrencyDetailsRepository.prototype.customVerb('getCurrencyGraph', params, onCompletion);
	};

	//For Operation 'getCurrencyList' with service id 'getCurrencyList8765'
	CurrencyDetailsRepository.prototype.getCurrencyList = function(params, onCompletion){
		return CurrencyDetailsRepository.prototype.customVerb('getCurrencyList', params, onCompletion);
	};

	return CurrencyDetailsRepository;
})