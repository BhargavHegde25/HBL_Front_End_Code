define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function qrValidationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	qrValidationRepository.prototype = Object.create(BaseRepository.prototype);
	qrValidationRepository.prototype.constructor = qrValidationRepository;

	//For Operation 'validateQR' with service id 'qrValidationService6440'
	qrValidationRepository.prototype.validateQR = function(params, onCompletion){
		return qrValidationRepository.prototype.customVerb('validateQR', params, onCompletion);
	};

	return qrValidationRepository;
})