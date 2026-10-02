define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerRepository.prototype.constructor = CustomerRepository;

	//For Operation 'getCustomers' with service id 'getCustomers6100'
	CustomerRepository.prototype.getCustomers = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getCustomers', params, onCompletion);
	};

	//For Operation 'updateFavoriteCustomer' with service id 'updateCustomers7319'
	CustomerRepository.prototype.updateFavoriteCustomer = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('updateFavoriteCustomer', params, onCompletion);
	};

	return CustomerRepository;
})