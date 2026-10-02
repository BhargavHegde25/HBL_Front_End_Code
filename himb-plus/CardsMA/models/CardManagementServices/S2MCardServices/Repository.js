define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function S2MCardServicesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	S2MCardServicesRepository.prototype = Object.create(BaseRepository.prototype);
	S2MCardServicesRepository.prototype.constructor = S2MCardServicesRepository;

	//For Operation 'getStatementEnquery' with service id 'getStatementEnquery3975'
	S2MCardServicesRepository.prototype.getStatementEnquery = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('getStatementEnquery', params, onCompletion);
	};

	//For Operation 'UnlockCard' with service id 'unlockCard4447'
	S2MCardServicesRepository.prototype.UnlockCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('UnlockCard', params, onCompletion);
	};

	//For Operation 'cardEMIRequest' with service id 'EMIRequest9521'
	S2MCardServicesRepository.prototype.cardEMIRequest = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('cardEMIRequest', params, onCompletion);
	};

	//For Operation 'cardChangeClearPIN' with service id 'changeClearPin3015'
	S2MCardServicesRepository.prototype.cardChangeClearPIN = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('cardChangeClearPIN', params, onCompletion);
	};

	//For Operation 'ReportLostCard' with service id 'reportLostCard8875'
	S2MCardServicesRepository.prototype.ReportLostCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('ReportLostCard', params, onCompletion);
	};

	//For Operation 'dollarCardTopup' with service id 'dollarCardTopup1653'
	S2MCardServicesRepository.prototype.dollarCardTopup = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('dollarCardTopup', params, onCompletion);
	};

	//For Operation 'getCardLimits' with service id 'getCardLimit1317'
	S2MCardServicesRepository.prototype.getCardLimits = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('getCardLimits', params, onCompletion);
	};

	//For Operation 'requestPrepaidCard' with service id 'requestPrepaidCard7783'
	S2MCardServicesRepository.prototype.requestPrepaidCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('requestPrepaidCard', params, onCompletion);
	};

	//For Operation 'ActivateCard' with service id 'activateCard9024'
	S2MCardServicesRepository.prototype.ActivateCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('ActivateCard', params, onCompletion);
	};

	//For Operation 'requestNewCard' with service id 'requestNewCard2595'
	S2MCardServicesRepository.prototype.requestNewCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('requestNewCard', params, onCompletion);
	};

	//For Operation 'requestDebitCard' with service id 'requestDebitCard8344'
	S2MCardServicesRepository.prototype.requestDebitCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('requestDebitCard', params, onCompletion);
	};

	//For Operation 'showCVV' with service id 'showCVV6034'
	S2MCardServicesRepository.prototype.showCVV = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('showCVV', params, onCompletion);
	};

	//For Operation 'cardStatusChange' with service id 'getCardStatusChange1156'
	S2MCardServicesRepository.prototype.cardStatusChange = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('cardStatusChange', params, onCompletion);
	};

	//For Operation 'getCards' with service id 'getCards4522'
	S2MCardServicesRepository.prototype.getCards = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('getCards', params, onCompletion);
	};

	//For Operation 'prepaidTopup' with service id 'prepaidTopup7479'
	S2MCardServicesRepository.prototype.prepaidTopup = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('prepaidTopup', params, onCompletion);
	};

	//For Operation 'transactionList' with service id 'transactionList7956'
	S2MCardServicesRepository.prototype.transactionList = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('transactionList', params, onCompletion);
	};

	//For Operation 'requestVirtualDollarCard' with service id 'requestVirtualDollarCard8408'
	S2MCardServicesRepository.prototype.requestVirtualDollarCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('requestVirtualDollarCard', params, onCompletion);
	};

	//For Operation 'LockCard' with service id 'lockCard8201'
	S2MCardServicesRepository.prototype.LockCard = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('LockCard', params, onCompletion);
	};

	//For Operation 'getCardBalance' with service id 'getCardBalance6856'
	S2MCardServicesRepository.prototype.getCardBalance = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('getCardBalance', params, onCompletion);
	};

	//For Operation 'getCardPendingTransactions' with service id 'pendingTransactions5583'
	S2MCardServicesRepository.prototype.getCardPendingTransactions = function(params, onCompletion){
		return S2MCardServicesRepository.prototype.customVerb('getCardPendingTransactions', params, onCompletion);
	};

	return S2MCardServicesRepository;
})