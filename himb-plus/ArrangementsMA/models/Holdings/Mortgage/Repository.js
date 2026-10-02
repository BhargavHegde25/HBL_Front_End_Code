define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MortgageRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MortgageRepository.prototype = Object.create(BaseRepository.prototype);
	MortgageRepository.prototype.constructor = MortgageRepository;

	//For Operation 'submitChangeRepaymentAccountServiceRequest' with service id 'submitChangeRepaymentAccountServiceRequestOperation5312'
	MortgageRepository.prototype.submitChangeRepaymentAccountServiceRequest = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('submitChangeRepaymentAccountServiceRequest', params, onCompletion);
	};

	//For Operation 'getMortgageDrawings' with service id 'getMortgageDrawings6421'
	MortgageRepository.prototype.getMortgageDrawings = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageDrawings', params, onCompletion);
	};

	//For Operation 'submitChangeRepaymentDayServiceRequest' with service id 'submitChangeRepaymentDayServiceRequestOperation1161'
	MortgageRepository.prototype.submitChangeRepaymentDayServiceRequest = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('submitChangeRepaymentDayServiceRequest', params, onCompletion);
	};

	//For Operation 'getMortgageFacilityDetails' with service id 'getMortgageFacilities9005'
	MortgageRepository.prototype.getMortgageFacilityDetails = function(params, onCompletion){
		return MortgageRepository.prototype.customVerb('getMortgageFacilityDetails', params, onCompletion);
	};

	return MortgageRepository;
})