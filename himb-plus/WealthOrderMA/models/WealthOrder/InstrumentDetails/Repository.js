define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function InstrumentDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	InstrumentDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	InstrumentDetailsRepository.prototype.constructor = InstrumentDetailsRepository;

	//For Operation 'getNewsDetails' with service id 'getNewsDetails1387'
	InstrumentDetailsRepository.prototype.getNewsDetails = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getNewsDetails', params, onCompletion);
	};

	//For Operation 'getInstrumentDetails' with service id 'getInstrumentDetails4118'
	InstrumentDetailsRepository.prototype.getInstrumentDetails = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getInstrumentDetails', params, onCompletion);
	};

	//For Operation 'getPricingData' with service id 'getPricingData1063'
	InstrumentDetailsRepository.prototype.getPricingData = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getPricingData', params, onCompletion);
	};

	//For Operation 'getInstrumentMinimal' with service id 'getInstrumentMinimal6469'
	InstrumentDetailsRepository.prototype.getInstrumentMinimal = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getInstrumentMinimal', params, onCompletion);
	};

	//For Operation 'getNewsStory' with service id 'getNewsStory8529'
	InstrumentDetailsRepository.prototype.getNewsStory = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getNewsStory', params, onCompletion);
	};

	//For Operation 'getStockNews' with service id 'getStockNews9939'
	InstrumentDetailsRepository.prototype.getStockNews = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getStockNews', params, onCompletion);
	};

	//For Operation 'getInstrumentList' with service id 'getInstrumentList5111'
	InstrumentDetailsRepository.prototype.getInstrumentList = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getInstrumentList', params, onCompletion);
	};

	//For Operation 'getInstrumentTransactions' with service id 'getInstrumentTransactions2442'
	InstrumentDetailsRepository.prototype.getInstrumentTransactions = function(params, onCompletion){
		return InstrumentDetailsRepository.prototype.customVerb('getInstrumentTransactions', params, onCompletion);
	};

	return InstrumentDetailsRepository;
})