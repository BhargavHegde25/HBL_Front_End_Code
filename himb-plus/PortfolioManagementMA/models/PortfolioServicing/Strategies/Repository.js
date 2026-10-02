define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function StrategiesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	StrategiesRepository.prototype = Object.create(BaseRepository.prototype);
	StrategiesRepository.prototype.constructor = StrategiesRepository;

	//For Operation 'getAllStrategies' with service id 'getAllStrategies7673'
	StrategiesRepository.prototype.getAllStrategies = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getAllStrategies', params, onCompletion);
	};

	//For Operation 'confirmChangeStrategy' with service id 'confirmChangeStrat5719'
	StrategiesRepository.prototype.confirmChangeStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('confirmChangeStrategy', params, onCompletion);
	};

	//For Operation 'getStrategyAllocation' with service id 'getStrategyAllocation1027'
	StrategiesRepository.prototype.getStrategyAllocation = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getStrategyAllocation', params, onCompletion);
	};

	//For Operation 'getStrategyQuestions' with service id 'getStrategyQuestions5662'
	StrategiesRepository.prototype.getStrategyQuestions = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getStrategyQuestions', params, onCompletion);
	};

	//For Operation 'revertStrategy' with service id 'revertStrategy1328'
	StrategiesRepository.prototype.revertStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('revertStrategy', params, onCompletion);
	};

	//For Operation 'getSuitabilityProfile' with service id 'getSuitabilityProfile4098'
	StrategiesRepository.prototype.getSuitabilityProfile = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getSuitabilityProfile', params, onCompletion);
	};

	//For Operation 'confirmStrategyQuestionnaire' with service id 'confirmStrategyFromQuestion2937'
	StrategiesRepository.prototype.confirmStrategyQuestionnaire = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('confirmStrategyQuestionnaire', params, onCompletion);
	};

	//For Operation 'submitStrategyQuestionnaire' with service id 'submitStrategyQuestionnaire1394'
	StrategiesRepository.prototype.submitStrategyQuestionnaire = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('submitStrategyQuestionnaire', params, onCompletion);
	};

	//For Operation 'confirmRcmdStrategy' with service id 'confirmRecomStrat3470'
	StrategiesRepository.prototype.confirmRcmdStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('confirmRcmdStrategy', params, onCompletion);
	};

	//For Operation 'computeStrategy' with service id 'computeStrategy1373'
	StrategiesRepository.prototype.computeStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('computeStrategy', params, onCompletion);
	};

	//For Operation 'getRcmdStrategy' with service id 'getRcmdStrategy5362'
	StrategiesRepository.prototype.getRcmdStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getRcmdStrategy', params, onCompletion);
	};

	//For Operation 'getMyStrategy' with service id 'getMyStrategy4815'
	StrategiesRepository.prototype.getMyStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getMyStrategy', params, onCompletion);
	};

	//For Operation 'getPersonalizedStrategy' with service id 'getPersonalizedStrategy4360'
	StrategiesRepository.prototype.getPersonalizedStrategy = function(params, onCompletion){
		return StrategiesRepository.prototype.customVerb('getPersonalizedStrategy', params, onCompletion);
	};

	return StrategiesRepository;
})