define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ForexRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ForexRepository.prototype = Object.create(BaseRepository.prototype);
	ForexRepository.prototype.constructor = ForexRepository;

	//For Operation 'fetchBaseCurrency' with service id 'fetchBaseCurrency7562'
	ForexRepository.prototype.fetchBaseCurrency = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('fetchBaseCurrency', params, onCompletion);
	};

	//For Operation 'updateRecentCurrencies' with service id 'updateRecentCurrencies3716'
	ForexRepository.prototype.updateRecentCurrencies = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('updateRecentCurrencies', params, onCompletion);
	};

	//For Operation 'getServerDate' with service id 'getServerDate4371'
	ForexRepository.prototype.getServerDate = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('getServerDate', params, onCompletion);
	};

	//For Operation 'fetchDashboardCurrencyList' with service id 'fetchDashboardCurrencyList1600'
	ForexRepository.prototype.fetchDashboardCurrencyList = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('fetchDashboardCurrencyList', params, onCompletion);
	};

	//For Operation 'fetchDashboardCurrencyRates' with service id 'fetchDashboardCurrencyRates6320'
	ForexRepository.prototype.fetchDashboardCurrencyRates = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('fetchDashboardCurrencyRates', params, onCompletion);
	};

	//For Operation 'getBaseCurrencyPrelogin' with service id 'getBaseCurrencyPrelogin5625'
	ForexRepository.prototype.getBaseCurrencyPrelogin = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('getBaseCurrencyPrelogin', params, onCompletion);
	};

	//For Operation 'fetchCurrencyRates' with service id 'fetchCurrencyRates3440'
	ForexRepository.prototype.fetchCurrencyRates = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('fetchCurrencyRates', params, onCompletion);
	};

	//For Operation 'getConvertedAmount' with service id 'getConvertedAmount8430'
	ForexRepository.prototype.getConvertedAmount = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('getConvertedAmount', params, onCompletion);
	};

	//For Operation 'getDashboardCurrenciesPrelogin' with service id 'getDashboardCurrencyPrelogin5549'
	ForexRepository.prototype.getDashboardCurrenciesPrelogin = function(params, onCompletion){
		return ForexRepository.prototype.customVerb('getDashboardCurrenciesPrelogin', params, onCompletion);
	};

	return ForexRepository;
})