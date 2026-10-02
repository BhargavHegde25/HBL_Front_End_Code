define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ProductDetailsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ProductDetailsRepository.prototype = Object.create(BaseRepository.prototype);
	ProductDetailsRepository.prototype.constructor = ProductDetailsRepository;

	//For Operation 'getProductDetailsFromId' with service id 'getProductDetailsFromId2247'
	ProductDetailsRepository.prototype.getProductDetailsFromId = function(params, onCompletion){
		return ProductDetailsRepository.prototype.customVerb('getProductDetailsFromId', params, onCompletion);
	};

	//For Operation 'getProductDetails' with service id 'getProductDetails2822'
	ProductDetailsRepository.prototype.getProductDetails = function(params, onCompletion){
		return ProductDetailsRepository.prototype.customVerb('getProductDetails', params, onCompletion);
	};

	return ProductDetailsRepository;
})