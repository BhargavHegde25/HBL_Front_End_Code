define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function FeeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	FeeRepository.prototype = Object.create(BaseRepository.prototype);
	FeeRepository.prototype.constructor = FeeRepository;

	//For Operation 'fetchOtherbankTransfersFee' with service id 'fetchOtherbankTransfersFee9927'
	FeeRepository.prototype.fetchOtherbankTransfersFee = function(params, onCompletion){
		return FeeRepository.prototype.customVerb('fetchOtherbankTransfersFee', params, onCompletion);
	};

	return FeeRepository;
})