define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MerchantsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MerchantsRepository.prototype = Object.create(BaseRepository.prototype);
	MerchantsRepository.prototype.constructor = MerchantsRepository;

	//For Operation 'getMerchantFormFields' with service id 'getMerchantFormFields5470'
	MerchantsRepository.prototype.getMerchantFormFields = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getMerchantFormFields', params, onCompletion);
	};

	//For Operation 'updateFavoriteMerchant' with service id 'updateFavoriteMerchant8114'
	MerchantsRepository.prototype.updateFavoriteMerchant = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('updateFavoriteMerchant', params, onCompletion);
	};

	//For Operation 'getMerchantCategories' with service id 'GetMerchantCategories8565'
	MerchantsRepository.prototype.getMerchantCategories = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getMerchantCategories', params, onCompletion);
	};

	//For Operation 'getBillPaymentHistory' with service id 'getBillPaymentHistory7423'
	MerchantsRepository.prototype.getBillPaymentHistory = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getBillPaymentHistory', params, onCompletion);
	};

	//For Operation 'confirmBillPay' with service id 'ConfirmBillPaid6872'
	MerchantsRepository.prototype.confirmBillPay = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('confirmBillPay', params, onCompletion);
	};

	//For Operation 'getMerchantFields' with service id 'GetMerchantFields2910'
	MerchantsRepository.prototype.getMerchantFields = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getMerchantFields', params, onCompletion);
	};

	//For Operation 'getMerchants' with service id 'GetMerchantsByCategory6012'
	MerchantsRepository.prototype.getMerchants = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getMerchants', params, onCompletion);
	};

	//For Operation 'getBranchList' with service id 'GetBranchList3299'
	MerchantsRepository.prototype.getBranchList = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getBranchList', params, onCompletion);
	};

	//For Operation 'getMerchantPaymentCharges' with service id 'getMerchantPaymentCharges7673'
	MerchantsRepository.prototype.getMerchantPaymentCharges = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getMerchantPaymentCharges', params, onCompletion);
	};

	//For Operation 'lodgeBillPay' with service id 'lodgeBillPay2583'
	MerchantsRepository.prototype.lodgeBillPay = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('lodgeBillPay', params, onCompletion);
	};

	//For Operation 'getCustomerBillInfo' with service id 'GetCustomerBillInfo1561'
	MerchantsRepository.prototype.getCustomerBillInfo = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getCustomerBillInfo', params, onCompletion);
	};

	//For Operation 'getMerchantCategoriesByCode' with service id 'getMerchantCategoriesByCode4258'
	MerchantsRepository.prototype.getMerchantCategoriesByCode = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getMerchantCategoriesByCode', params, onCompletion);
	};

	//For Operation 'getFavoriteMerchants' with service id 'getFavoriteMerchants5251'
	MerchantsRepository.prototype.getFavoriteMerchants = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('getFavoriteMerchants', params, onCompletion);
	};

	//For Operation 'createFavoriteMerchant' with service id 'createFavoriteMerchant5615'
	MerchantsRepository.prototype.createFavoriteMerchant = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('createFavoriteMerchant', params, onCompletion);
	};

	//For Operation 'generateBill' with service id 'getBillTransactionById5415'
	MerchantsRepository.prototype.generateBill = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('generateBill', params, onCompletion);
	};

	//For Operation 'deleteFavoriteMerchant' with service id 'deleteFavoriteMerchant7177'
	MerchantsRepository.prototype.deleteFavoriteMerchant = function(params, onCompletion){
		return MerchantsRepository.prototype.customVerb('deleteFavoriteMerchant', params, onCompletion);
	};

	return MerchantsRepository;
})