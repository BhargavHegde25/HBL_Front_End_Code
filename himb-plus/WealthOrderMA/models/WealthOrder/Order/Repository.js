define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function OrderRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	OrderRepository.prototype = Object.create(BaseRepository.prototype);
	OrderRepository.prototype.constructor = OrderRepository;

	//For Operation 'cancelSecurityOrder' with service id 'cancelSecurityOrder9809'
	OrderRepository.prototype.cancelSecurityOrder = function(params, onCompletion){
		return OrderRepository.prototype.customVerb('cancelSecurityOrder', params, onCompletion);
	};

	//For Operation 'createSecurityOrder' with service id 'createSecurityOrder8058'
	OrderRepository.prototype.createSecurityOrder = function(params, onCompletion){
		return OrderRepository.prototype.customVerb('createSecurityOrder', params, onCompletion);
	};

	//For Operation 'modifySecurityOrder' with service id 'modifySecurityOrder7519'
	OrderRepository.prototype.modifySecurityOrder = function(params, onCompletion){
		return OrderRepository.prototype.customVerb('modifySecurityOrder', params, onCompletion);
	};

	return OrderRepository;
})