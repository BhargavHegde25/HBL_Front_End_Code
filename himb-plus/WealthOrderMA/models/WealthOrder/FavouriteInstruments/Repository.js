define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function FavouriteInstrumentsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	FavouriteInstrumentsRepository.prototype = Object.create(BaseRepository.prototype);
	FavouriteInstrumentsRepository.prototype.constructor = FavouriteInstrumentsRepository;

	//For Operation 'getFavoriteInstruments' with service id 'getFavoriteInstruments4297'
	FavouriteInstrumentsRepository.prototype.getFavoriteInstruments = function(params, onCompletion){
		return FavouriteInstrumentsRepository.prototype.customVerb('getFavoriteInstruments', params, onCompletion);
	};

	//For Operation 'getSearchFavoriteInstruments' with service id 'getSearchFavoriteInstruments5252'
	FavouriteInstrumentsRepository.prototype.getSearchFavoriteInstruments = function(params, onCompletion){
		return FavouriteInstrumentsRepository.prototype.customVerb('getSearchFavoriteInstruments', params, onCompletion);
	};

	return FavouriteInstrumentsRepository;
})