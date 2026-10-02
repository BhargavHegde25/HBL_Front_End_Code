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

	//For Operation 'getCheckLimit' with service id 'getCheckLimit6976'
	CrossBorderPaymentsRepository.prototype.getCheckLimit = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('getCheckLimit', params, onCompletion);
	};

	//For Operation 'createConsent' with service id 'createConsent5906'
	CrossBorderPaymentsRepository.prototype.createConsent = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('createConsent', params, onCompletion);
	};

	//For Operation 'getRelationship' with service id 'getRelationship7841'
	CrossBorderPaymentsRepository.prototype.getRelationship = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('getRelationship', params, onCompletion);
	};

	//For Operation 'validateCustomer' with service id 'customerValidate7177'
	CrossBorderPaymentsRepository.prototype.validateCustomer = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('validateCustomer', params, onCompletion);
	};

	//For Operation 'createPayment' with service id 'createPayment7764'
	CrossBorderPaymentsRepository.prototype.createPayment = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('createPayment', params, onCompletion);
	};

	//For Operation 'updateConsent' with service id 'updateConsent9220'
	CrossBorderPaymentsRepository.prototype.updateConsent = function(params, onCompletion){
		return CrossBorderPaymentsRepository.prototype.customVerb('updateConsent', params, onCompletion);
	};

	return CrossBorderPaymentsRepository;
})