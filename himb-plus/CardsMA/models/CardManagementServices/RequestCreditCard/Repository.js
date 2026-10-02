define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function RequestCreditCardRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	RequestCreditCardRepository.prototype = Object.create(BaseRepository.prototype);
	RequestCreditCardRepository.prototype.constructor = RequestCreditCardRepository;

	//For Operation 'applyForCreditCard' with service id 'applyForCreditCard5324'
	RequestCreditCardRepository.prototype.applyForCreditCard = function(params, onCompletion){
		return RequestCreditCardRepository.prototype.customVerb('applyForCreditCard', params, onCompletion);
	};

	return RequestCreditCardRepository;
})