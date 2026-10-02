define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CIPSTransfersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CIPSTransfersRepository.prototype = Object.create(BaseRepository.prototype);
	CIPSTransfersRepository.prototype.constructor = CIPSTransfersRepository;

	//For Operation 'createOtherBankTransfer' with service id 'createOtherBankTransfer2654'
	CIPSTransfersRepository.prototype.createOtherBankTransfer = function(params, onCompletion){
		return CIPSTransfersRepository.prototype.customVerb('createOtherBankTransfer', params, onCompletion);
	};

	//For Operation 'validateOtherBankAccount' with service id 'validateOtherBankAccount4813'
	CIPSTransfersRepository.prototype.validateOtherBankAccount = function(params, onCompletion){
		return CIPSTransfersRepository.prototype.customVerb('validateOtherBankAccount', params, onCompletion);
	};

	//For Operation 'getOtherBankDetails' with service id 'getOtherBankDetails5138'
	CIPSTransfersRepository.prototype.getOtherBankDetails = function(params, onCompletion){
		return CIPSTransfersRepository.prototype.customVerb('getOtherBankDetails', params, onCompletion);
	};

	//For Operation 'GetHBLParkingAccounts' with service id 'GetHBLParkingAccounts9956'
	CIPSTransfersRepository.prototype.GetHBLParkingAccounts = function(params, onCompletion){
		return CIPSTransfersRepository.prototype.customVerb('GetHBLParkingAccounts', params, onCompletion);
	};

	return CIPSTransfersRepository;
})