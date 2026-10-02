define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function InvestmentProposalRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	InvestmentProposalRepository.prototype = Object.create(BaseRepository.prototype);
	InvestmentProposalRepository.prototype.constructor = InvestmentProposalRepository;

	//For Operation 'getPortfolioHealthIP' with service id 'getPortfolioHealthIP1903'
	InvestmentProposalRepository.prototype.getPortfolioHealthIP = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('getPortfolioHealthIP', params, onCompletion);
	};

	//For Operation 'getPastProposal' with service id 'getPastProposal7200'
	InvestmentProposalRepository.prototype.getPastProposal = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('getPastProposal', params, onCompletion);
	};

	//For Operation 'rejectProposal' with service id 'rejectProposal6258'
	InvestmentProposalRepository.prototype.rejectProposal = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('rejectProposal', params, onCompletion);
	};

	//For Operation 'getRiskAnalysisIP' with service id 'getRiskAnalysisIP5337'
	InvestmentProposalRepository.prototype.getRiskAnalysisIP = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('getRiskAnalysisIP', params, onCompletion);
	};

	//For Operation 'confirmOrdersIP' with service id 'confirmOrdersIP8133'
	InvestmentProposalRepository.prototype.confirmOrdersIP = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('confirmOrdersIP', params, onCompletion);
	};

	//For Operation 'getRcmdInstrumentIP' with service id 'getRcmdInstrumentIP7179'
	InvestmentProposalRepository.prototype.getRcmdInstrumentIP = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('getRcmdInstrumentIP', params, onCompletion);
	};

	//For Operation 'getOrderProposal' with service id 'getOrderProposal9672'
	InvestmentProposalRepository.prototype.getOrderProposal = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('getOrderProposal', params, onCompletion);
	};

	//For Operation 'getConstraintsIP' with service id 'getConstraintsIP1987'
	InvestmentProposalRepository.prototype.getConstraintsIP = function(params, onCompletion){
		return InvestmentProposalRepository.prototype.customVerb('getConstraintsIP', params, onCompletion);
	};

	return InvestmentProposalRepository;
})