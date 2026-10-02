define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function TopUpNepalRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	TopUpNepalRepository.prototype = Object.create(BaseRepository.prototype);
	TopUpNepalRepository.prototype.constructor = TopUpNepalRepository;

	//For Operation 'confirmBillPay' with service id 'TopUpNeapl-PaymentJavaService2990'
	TopUpNepalRepository.prototype.confirmBillPay = function(params, onCompletion){
		return TopUpNepalRepository.prototype.customVerb('confirmBillPay', params, onCompletion);
	};

	return TopUpNepalRepository;
})