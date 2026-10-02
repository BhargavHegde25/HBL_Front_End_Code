define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DigitalArrangementsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DigitalArrangementsRepository.prototype = Object.create(BaseRepository.prototype);
	DigitalArrangementsRepository.prototype.constructor = DigitalArrangementsRepository;

	//For Operation 'closeAccount' with service id 'closeAccountAck7336'
	DigitalArrangementsRepository.prototype.closeAccount = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('closeAccount', params, onCompletion);
	};

	//For Operation 'submitAccountClosureServiceRequest' with service id 'SubmitAccountClosureServiceRequestOperation5683'
	DigitalArrangementsRepository.prototype.submitAccountClosureServiceRequest = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('submitAccountClosureServiceRequest', params, onCompletion);
	};

	//For Operation 'getList' with service id 'getAccountsPostLogin6370'
	DigitalArrangementsRepository.prototype.getList = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('getList', params, onCompletion);
	};

	//For Operation 'validateAccountClosure' with service id 'ValidateAccountClosure9638'
	DigitalArrangementsRepository.prototype.validateAccountClosure = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('validateAccountClosure', params, onCompletion);
	};

	//For Operation 'getdefaultAccount' with service id 'getDefaultAccounts3164'
	DigitalArrangementsRepository.prototype.getdefaultAccount = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('getdefaultAccount', params, onCompletion);
	};

	//For Operation 'accountActivity' with service id 'getAccountActivity3333'
	DigitalArrangementsRepository.prototype.accountActivity = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('accountActivity', params, onCompletion);
	};

	//For Operation 'getPrimaryAccount' with service id 'getAccountsPostLogin4994'
	DigitalArrangementsRepository.prototype.getPrimaryAccount = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('getPrimaryAccount', params, onCompletion);
	};

	//For Operation 'getAccountTransactions' with service id 'GetAccountTransactions9518'
	DigitalArrangementsRepository.prototype.getAccountTransactions = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('getAccountTransactions', params, onCompletion);
	};

	//For Operation 'getInfinityAccounts' with service id 'getInfinityAccounts8952'
	DigitalArrangementsRepository.prototype.getInfinityAccounts = function(params, onCompletion){
		return DigitalArrangementsRepository.prototype.customVerb('getInfinityAccounts', params, onCompletion);
	};

	return DigitalArrangementsRepository;
})