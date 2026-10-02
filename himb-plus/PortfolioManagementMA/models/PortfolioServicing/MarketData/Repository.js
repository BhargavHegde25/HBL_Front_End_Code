define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MarketDataRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MarketDataRepository.prototype = Object.create(BaseRepository.prototype);
	MarketDataRepository.prototype.constructor = MarketDataRepository;

	//For Operation 'getTopMarketNews' with service id 'getTopMarketNews6773'
	MarketDataRepository.prototype.getTopMarketNews = function(params, onCompletion){
		return MarketDataRepository.prototype.customVerb('getTopMarketNews', params, onCompletion);
	};

	//For Operation 'getDailyMarket' with service id 'getDailyMarket6184'
	MarketDataRepository.prototype.getDailyMarket = function(params, onCompletion){
		return MarketDataRepository.prototype.customVerb('getDailyMarket', params, onCompletion);
	};

	return MarketDataRepository;
})