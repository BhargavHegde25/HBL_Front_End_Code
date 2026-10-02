define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DrawdownRequestsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DrawdownRequestsRepository.prototype = Object.create(BaseRepository.prototype);
	DrawdownRequestsRepository.prototype.constructor = DrawdownRequestsRepository;

	//For Operation 'submit' with service id 'SubmitDrawdownRequestOperation1279'
	DrawdownRequestsRepository.prototype.submit = function(params, onCompletion){
		return DrawdownRequestsRepository.prototype.customVerb('submit', params, onCompletion);
	};

	return DrawdownRequestsRepository;
})