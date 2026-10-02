define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function FixedDepositRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	FixedDepositRepository.prototype = Object.create(BaseRepository.prototype);
	FixedDepositRepository.prototype.constructor = FixedDepositRepository;

	//For Operation 'createFixedDepositNonSTP' with service id 'createFixedDepositNonSTP6216'
	FixedDepositRepository.prototype.createFixedDepositNonSTP = function(params, onCompletion){
		return FixedDepositRepository.prototype.customVerb('createFixedDepositNonSTP', params, onCompletion);
	};

	//For Operation 'getFixedDepositRates' with service id 'getFixedDepositRates1819'
	FixedDepositRepository.prototype.getFixedDepositRates = function(params, onCompletion){
		return FixedDepositRepository.prototype.customVerb('getFixedDepositRates', params, onCompletion);
	};

	//For Operation 'createFixedDepositSTP' with service id 'createFixedDepositSTP2361'
	FixedDepositRepository.prototype.createFixedDepositSTP = function(params, onCompletion){
		return FixedDepositRepository.prototype.customVerb('createFixedDepositSTP', params, onCompletion);
	};

	//For Operation 'getFDTenureAndIntrests' with service id 'getFixedDepositTenureAndRates6021'
	FixedDepositRepository.prototype.getFDTenureAndIntrests = function(params, onCompletion){
		return FixedDepositRepository.prototype.customVerb('getFDTenureAndIntrests', params, onCompletion);
	};

	return FixedDepositRepository;
})