define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LendingPaymentRequestRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LendingPaymentRequestRepository.prototype = Object.create(BaseRepository.prototype);
	LendingPaymentRequestRepository.prototype.constructor = LendingPaymentRequestRepository;

	//For Operation 'submit' with service id 'SubmitPaymentRequest1912'
	LendingPaymentRequestRepository.prototype.submit = function(params, onCompletion){
		return LendingPaymentRequestRepository.prototype.customVerb('submit', params, onCompletion);
	};

	return LendingPaymentRequestRepository;
})