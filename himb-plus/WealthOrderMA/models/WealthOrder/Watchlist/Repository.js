define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function WatchlistRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	WatchlistRepository.prototype = Object.create(BaseRepository.prototype);
	WatchlistRepository.prototype.constructor = WatchlistRepository;

	//For Operation 'getWatchlistDB' with service id 'getWatchlistDB6864'
	WatchlistRepository.prototype.getWatchlistDB = function(params, onCompletion){
		return WatchlistRepository.prototype.customVerb('getWatchlistDB', params, onCompletion);
	};

	//For Operation 'updateWatchlistDB' with service id 'updateWatchlistDB6456'
	WatchlistRepository.prototype.updateWatchlistDB = function(params, onCompletion){
		return WatchlistRepository.prototype.customVerb('updateWatchlistDB', params, onCompletion);
	};

	return WatchlistRepository;
})