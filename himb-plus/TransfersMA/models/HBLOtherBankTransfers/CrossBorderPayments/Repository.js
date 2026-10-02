define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CrossBorderPaymentsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CrossBorderPaymentsRepository.prototype = Object.create(BaseRepository.prototype);
	CrossBorderPaymentsRepository.prototype.constructor = CrossBorderPaymentsRepository;

	//For Operation 'getPurpose' with service id 'getPurpose5931'
	CrossBorderPaymentsRepository.prototype.getPurpose = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('getPurpose', params, onCompletion);
	};

	//For Operation 'getRelationship' with service id 'getRelationship7841'
	CrossBorderPaymentsRepository.prototype.getRelationship = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('getRelationship', params, onCompletion);
	};

	return CrossBorderPaymentsRepository;
})