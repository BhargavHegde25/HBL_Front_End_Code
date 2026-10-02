define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function PortfolioHealthRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	PortfolioHealthRepository.prototype = Object.create(BaseRepository.prototype);
	PortfolioHealthRepository.prototype.constructor = PortfolioHealthRepository;

	//For Operation 'getRiskAnalysisHC' with service id 'getRiskAnalysisHC5419'
	PortfolioHealthRepository.prototype.getRiskAnalysisHC = function(params, onCompletion){
		return PortfolioHealthRepository.prototype.customVerb('getRiskAnalysisHC', params, onCompletion);
	};

	//For Operation 'getRcmdInstrumentHC' with service id 'getRecommendedInstrumentsHC6533'
	PortfolioHealthRepository.prototype.getRcmdInstrumentHC = function(params, onCompletion){
		return PortfolioHealthRepository.prototype.customVerb('getRcmdInstrumentHC', params, onCompletion);
	};

	//For Operation 'getAllocationHC' with service id 'getAllocationHC7352'
	PortfolioHealthRepository.prototype.getAllocationHC = function(params, onCompletion){
		return PortfolioHealthRepository.prototype.customVerb('getAllocationHC', params, onCompletion);
	};

	//For Operation 'getRecommendedInstrumentsHC' with service id 'getRecommendedInstrumentsHC3646'
	PortfolioHealthRepository.prototype.getRecommendedInstrumentsHC = function(params, onCompletion){
		return PortfolioHealthRepository.prototype.customVerb('getRecommendedInstrumentsHC', params, onCompletion);
	};

	//For Operation 'getInvestmentConstraintsHC' with service id 'getInvestmentConstraintsHC7623'
	PortfolioHealthRepository.prototype.getInvestmentConstraintsHC = function(params, onCompletion){
		return PortfolioHealthRepository.prototype.customVerb('getInvestmentConstraintsHC', params, onCompletion);
	};

	//For Operation 'getPortfolioHealth' with service id 'getPortfolioHealth7181'
	PortfolioHealthRepository.prototype.getPortfolioHealth = function(params, onCompletion){
		return PortfolioHealthRepository.prototype.customVerb('getPortfolioHealth', params, onCompletion);
	};

	return PortfolioHealthRepository;
})