define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function SecurityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	SecurityRepository.prototype = Object.create(BaseRepository.prototype);
	SecurityRepository.prototype.constructor = SecurityRepository;

	//For Operation 'ThirdpartyAuthUserValidation' with service id 'EnableThirdpartyAuth1852'
	SecurityRepository.prototype.ThirdpartyAuthUserValidation = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('ThirdpartyAuthUserValidation', params, onCompletion);
	};

	//For Operation 'getCantSignInMFAcheck' with service id 'getCantSiginInMFAConfig1257'
	SecurityRepository.prototype.getCantSignInMFAcheck = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('getCantSignInMFAcheck', params, onCompletion);
	};

	//For Operation 'getTransactionPINStatus' with service id 'getTransactionPINStatus9182'
	SecurityRepository.prototype.getTransactionPINStatus = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('getTransactionPINStatus', params, onCompletion);
	};

	//For Operation 'updateTransactionPIN' with service id 'updateTransactionPINStatus1176'
	SecurityRepository.prototype.updateTransactionPIN = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('updateTransactionPIN', params, onCompletion);
	};

	//For Operation 'validateCantsigninOTP' with service id 'validateCantsigninOTP3952'
	SecurityRepository.prototype.validateCantsigninOTP = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('validateCantsigninOTP', params, onCompletion);
	};

	//For Operation 'resetCustomerDefaultAcc' with service id 'resetCustomerDefaultAccount7844'
	SecurityRepository.prototype.resetCustomerDefaultAcc = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('resetCustomerDefaultAcc', params, onCompletion);
	};

	//For Operation 'validateTransactionPin' with service id 'validateTransactionPin1912'
	SecurityRepository.prototype.validateTransactionPin = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('validateTransactionPin', params, onCompletion);
	};

	//For Operation 'verifyCaptcha' with service id 'VerifyCaptcha1364'
	SecurityRepository.prototype.verifyCaptcha = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('verifyCaptcha', params, onCompletion);
	};

	//For Operation 'GoogleTOTPValidation' with service id 'GoogleTokenValidation8742'
	SecurityRepository.prototype.GoogleTOTPValidation = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('GoogleTOTPValidation', params, onCompletion);
	};

	//For Operation 'TransactionPINResetValidation' with service id 'TransactionPINResetValidation2189'
	SecurityRepository.prototype.TransactionPINResetValidation = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('TransactionPINResetValidation', params, onCompletion);
	};

	//For Operation 'getResetThirdPartyStatus' with service id 'getResetThirdPartyStatus2594'
	SecurityRepository.prototype.getResetThirdPartyStatus = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('getResetThirdPartyStatus', params, onCompletion);
	};

	//For Operation 'generateCaptcha' with service id 'GenerateCaptcha7112'
	SecurityRepository.prototype.generateCaptcha = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('generateCaptcha', params, onCompletion);
	};

	//For Operation 'GoogleAuthPair' with service id 'GoogleAuthPair1006'
	SecurityRepository.prototype.GoogleAuthPair = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('GoogleAuthPair', params, onCompletion);
	};

	//For Operation 'thirdParthAuthStatusCheck' with service id 'ThirdParthAuthCheckWithAccNo5650'
	SecurityRepository.prototype.thirdParthAuthStatusCheck = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('thirdParthAuthStatusCheck', params, onCompletion);
	};

	//For Operation 'transactionPINResetRequest' with service id 'transactionPINResetRequest8029'
	SecurityRepository.prototype.transactionPINResetRequest = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('transactionPINResetRequest', params, onCompletion);
	};

	//For Operation 'updateAccNickName' with service id 'updateAccNickName1933'
	SecurityRepository.prototype.updateAccNickName = function(params, onCompletion){
		return SecurityRepository.prototype.customVerb('updateAccNickName', params, onCompletion);
	};

	return SecurityRepository;
})