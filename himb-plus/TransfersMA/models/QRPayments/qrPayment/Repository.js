define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function qrPaymentRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	qrPaymentRepository.prototype = Object.create(BaseRepository.prototype);
	qrPaymentRepository.prototype.constructor = qrPaymentRepository;

	//For Operation 'qrPaymentService' with service id 'qrPaymentExecution8165'
	qrPaymentRepository.prototype.qrPaymentService = function(params, onCompletion){
		return qrPaymentRepository.prototype.customVerb('qrPaymentService', params, onCompletion);
	};

	return qrPaymentRepository;
})