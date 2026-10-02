define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function OnboardingTransactionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	OnboardingTransactionsRepository.prototype = Object.create(BaseRepository.prototype);
	OnboardingTransactionsRepository.prototype.constructor = OnboardingTransactionsRepository;

	//For Operation 'createOnboardingTransfer' with service id 'OnboardingTransfer3577'
	OnboardingTransactionsRepository.prototype.createOnboardingTransfer = function(params, onCompletion){
		return OnboardingTransactionsRepository.prototype.customVerb('createOnboardingTransfer', params, onCompletion);
	};

	return OnboardingTransactionsRepository;
})