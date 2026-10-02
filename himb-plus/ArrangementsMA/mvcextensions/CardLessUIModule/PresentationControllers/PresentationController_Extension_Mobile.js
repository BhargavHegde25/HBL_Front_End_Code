define([], function () {
  return {
    processAccountsData: function (data) {
      var forUtility = applicationManager.getFormatUtilManager();
      var accProcessedData = (JSON.parse(JSON.stringify(data)));
      accProcessedData.fromAccountName = data.fromAccountName;
      accProcessedData.fromAccountBalance = forUtility.formatAmountandAppendCurrencySymbol(data.fromAccountBalance, data.fromAccountCurrency);
      accProcessedData.fromBankName = data.fromBankName;
      accProcessedData.fromAccountCurrency = data.fromAccountCurrency;
      return accProcessedData;
    },
	 fetchAccountsSuccCallBack : function(res){
    var navMan=applicationManager.getNavigationManager();
    var internalAccounts = res.filter(function (el) {if(el.externalIndicator !== "true"&&((el.accountType=="Savings"||el.accountType=="Checking")&&el.currencyCode=="NPR")) return el});
    var customData = {
      "fromaccounts": internalAccounts
    }
    navMan.setCustomInfo("frmCardLessFrom", customData);
	var userObj = applicationManager.getUserPreferencesManager().getUserObj();
	var default_account_cardless = userObj['default_account_cardless']
	if(!default_account_cardless){
		scope_cardlessPresentationController.goToAmountForm();
	}else{
		var preaccdata;
		  for(i =0 ; i < internalAccounts.length;i++)
        {
			if(internalAccounts[i].accountID==default_account_cardless){
				preaccdata=internalAccounts[i];
				break;
			}
		}
		 var cardlessModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
    cardlessModule.presentationController.setFromAccountDetails(preaccdata);
    var txnDetails=cardlessModule.presentationController.getTransactionObject();
	txnDetails=cardlessModule.presentationController.processAccountsData(txnDetails);
    navMan.setCustomInfo("frmCardLessWithdraw",txnDetails);
    cardlessModule.presentationController.commonFunctionForNavigation("frmCardLessWithdraw")
	}
  },
  setTransactionAmount :  function(amount)
  {
	  var MaxLimits= applicationManager.getConfigurationManager().MB_CARDLESS_MAX_LIMIT;
    var transactionObject = applicationManager.getTransactionsListManager();
    var navMan=applicationManager.getNavigationManager();
    var transactionObj=scope_cardlessPresentationController.getTransactionObject();
    var bal=transactionObj.fromAccountBalance;
    var accountData=navMan.getCustomInfo("frmCardLessWithdraw");
    accountData.amount=amount;
    navMan.setCustomInfo("frmCardLessWithdraw",accountData);
    var forUtility=applicationManager.getFormatUtilManager();
    amount= forUtility.deFormatAmount(amount);
    bal= forUtility.deFormatAmount(bal);
      var confManager = applicationManager.getConfigurationManager();
      var denominations = confManager.getDenominationAmountValues();
      var validateAmount = scope_cardlessPresentationController.validateAmount(denominations, amount);
	  if(Number(amount)<500){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.minAmterror"));
	  }
	   else if(Number(MaxLimits)<Number(amount)){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cardlesscash.Maxlimiterrmsg")+" NPR "+MaxLimits); 
	  }
      else if(validateAmount)
      {
        transactionObject.setTransactionAttribute("amount",amount);
        transactionObject.setTransactionAttribute("transactionType","Cardless");
        navMan.setCustomInfo("frmCardLessConfWithdraw",transactionObj);
          scope_cardlessPresentationController.commonFunctionForNavigation("frmCardLessSecureCode");
      }
      else
      {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCardLessWithdraw', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.DenominationError"));
      }
  },
   contactCallBack:function(object){
    var controller=null;
	var navMan=applicationManager.getNavigationManager();
    var resultContact=(JSON.parse(object));
    var cntType= scope_cardlessPresentationController.getCashlessContactType();
    var transactionObj = applicationManager.getTransactionsListManager();
    if(cntType==="phone"){
		controller = applicationManager.getPresentationUtility().getController('frmCardLessPhoneNo', true);
      if(resultContact.phone){
        resultContact.phone.replace(/\u00A0/g," ");
      }
	  if(resultContact.phone.indexOf("+977")==0){
		  resultContact.phonewopre=resultContact.phone.replace('+977',"")
		  controller.enterPostAction();
		  navMan.setCustomInfo("IsValidPhoneNo",true);
	  }
	  else{
		 controller.bindGenericError(kony.i18n.getLocalizedString("i18n.mb.CC.invalidPhone"));
		 controller.incompleteView();
		 navMan.setCustomInfo("IsValidPhoneNo",false);
		 return;
	  }
      transactionObj.setTransactionAttribute("cashlessPhone",resultContact.phone);
	  transactionObj.setTransactionAttribute("cashlessPhonewopre",resultContact.phonewopre)
      scope_cardlessPresentationController.setCashlessFirstName(resultContact.firstName);
      scope_cardlessPresentationController.setCashlessLastName(resultContact.lastName);
    }else{
      transactionObj.setTransactionAttribute("cashlessEmail",resultContact.email);
      scope_cardlessPresentationController.setCashlessFirstName(resultContact.firstName);
      scope_cardlessPresentationController.setCashlessLastName(resultContact.lastName);
      controller = applicationManager.getPresentationUtility().getController('frmCardLessEmail', true);
    }
    controller.bindContactData(resultContact);
  },
    createCardlessTransaction: function () {
      var transactionManager = applicationManager.getTransactionsListManager();
      var cardlessObject = Object.assign({}, transactionManager.getTransactionObject());
      transactionManager.createCardlessTransaction(cardlessObject, scope_cardlessPresentationController.presentationMakeACardlessTransferSuccess, scope_cardlessPresentationController.presentationMakeACardlessTransferError);
    },
    presentationMakeACardlessTransferSuccess: function (createSuccess) {
      var mfaManager = applicationManager.getMFAManager();
      if (createSuccess.MFAAttributes && createSuccess.MFAAttributes.isMFARequired) {
        var mfaJSON = {
          "flowType": "CARDLESS_CASH_TRANSACTION",
          "response": createSuccess,
          "objectServiceDetails": {
            "serviceName": "CardlessCash",
            "dataModel": "CardlessTransaction",
            "operationName": "createCardlessTransaction"
            //https://infinityqa.himalayanbank.com:443/services/data/v1/CardlessCash/operations/CardlessTransaction/createCardlessTransaction
          }
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        createSuccess[0].cashlessMode = scope_cardlessPresentationController.getTransactionObject().cashlessMode;
        var txnDetails = createSuccess[0];
        var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmCardLessConfWithdraw", txnDetails);
        var userPrefObj = applicationManager.getUserPreferencesManager();
        var contact = {};
        contact.email = userPrefObj.getUserEmail();
        contact.phone = userPrefObj.getUserPhone();
        if (createSuccess.length != 0) {
          scope_cardlessPresentationController.setcardlessTransactionId(createSuccess[0].referenceId);
          var customData = {
            "createResponse": createSuccess[0],
            "transnDetails": txnDetails,
            "userDetails": contact
          }
          navMan.setCustomInfo("frmCardLessCWCode", customData);
          navMan.navigateTo({ "appName": "ArrangementsMA", "friendlyName": "CardLessUIModule/frmCCAck" });
        }
        else {
          var controller = applicationManager.getPresentationUtility().getController('frmCCAmount', true);
          controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cc.serviceError"));
        }
      }
    },
    presentationMakeACardlessTransferError: function (createError) {
      kony.print("error in create cardless transaction");
      var controller = applicationManager.getPresentationUtility().getController('frmCCconfirmNew', true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cc.serviceError"));
      if (createError["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", createError);
    },
  setFromAccountDetails:function(fromAccountDetails){
    var transactionObj = applicationManager.getTransactionsListManager();
    transactionObj.setTransactionAttribute("fromAccountName",fromAccountDetails.accountName);
    transactionObj.setTransactionAttribute("fromAccountNumber",fromAccountDetails.accountID);
    transactionObj.setTransactionAttribute("fromAccountType",fromAccountDetails.accountType);
    transactionObj.setTransactionAttribute("fromAccountBalance",fromAccountDetails.amount||fromAccountDetails.availableBalance||fromAccountDetails.currentBalance);
	 transactionObj.setTransactionAttribute("fromBankName",fromAccountDetails.bankName);
    transactionObj.setTransactionAttribute("fromAccountNickName",applicationManager.getPresentationUtility().formatText(fromAccountDetails.accountName, 10, fromAccountDetails.accountID, 4));
    transactionObj.setTransactionAttribute("transactionCurrency",fromAccountDetails.currencyCode);
    transactionObj.setTransactionAttribute("fromAccountCurrency",fromAccountDetails.currencyCode);
    transactionObj.setTransactionAttribute("isBusinessAccount", fromAccountDetails.isBusinessAccount);
    var configManager = applicationManager.getConfigurationManager();
    var bankName = configManager.getBankName();
    scope_cardlessPresentationController.setFromBankName(fromAccountDetails.bankName);
  },
  getActiveDebitCard:function(){
	  try{
		  applicationManager.getPresentationUtility().showLoadingScreen();
	  var transactionManager = applicationManager.getTransactionManager();
    transactionManager.getactiveDebitCardDetails(scope_cardlessPresentationController.getActiveDebitCardSuccess,scope_cardlessPresentationController.getActiveDebitCardError);
	  }
	  catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in getActiveDebitCard function*********************************"+e);
		}
	  },
  
  getActiveDebitCardSuccess:function(res){
	  try{
		  var scope=this;
		  var activeCards;
		  var cardData
		  if(res&&res.respLabel_out&&res.respLabel_out=="SUCCESS"){
		  cardData=res.cardDataInfo_out
		  
		  if(cardData&&cardData.length>0){
			  activeCards=cardData.filter(function(card){
				  return card.cardStatus==2||card.cardStatus=="2";
			  });
			  		  
		  }
		  if(activeCards&&activeCards.length>0){
			  scope.getCardlessPendingAndPostedTransactions()
		  }
		  else{
        var controller = applicationManager.getPresentationUtility().getController("AccountsUIModule/frmHBLUnifiedDashboard", true,{"appName": "HomepageMA"});
        controller.showGenericErrorMsg(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cc.noeligiblecard"));
			  applicationManager.getPresentationUtility().dismissLoadingScreen();			 
		  }
		  }
		  else{
			  applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController("AccountsUIModule/frmHBLUnifiedDashboard", true,{"appName": "HomepageMA"});
        controller.showGenericErrorMsg(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cc.noeligiblecard"));
		  }
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.common.OoopsServerErrormb"));
		kony.print("**********************error in getActiveDebitCardSuccess*********************************"+e);
		}
	  
	  
  },
  getActiveDebitCardError:function(err){
	  try{
		  kony.print("error in fetching card details");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  else
		 applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.common.OoopsServerErrormb"));
		kony.print("**********************error in getActiveDebitCardError*********************************"+e);
		}
	  
	  
  },
  
   getCardlessPendingAndPostedTransactions:function(){
    var navMan=applicationManager.getNavigationManager();
    var navToForm=navMan.getEntryPoint("cardlessEntry");
	var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	var defaultAccNum= applicationManager.getUserPreferencesManager().getUserObj().default_account_cardless;	
	var account;
	if(accounts.length>0){
		account=accounts.filter(function(account) {
                return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom == "1" && account.currencyCode != "USD";
            });
			if(account.length==0){
				applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.mb.cc.noeligibleacc")); 
				return;
			}
		
	}
		
     if(navToForm!=="frmCardLessHome"){
      var navMan=applicationManager.getNavigationManager();
      var accountsManager=applicationManager.getAccountManager();
      if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
      {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountUIModule", "appName": "ArrangementsMA"});
        accountMod.presentationController.fetchAccountDetailsAndTransactions(scope_cardlessPresentationController.getTransactionObject().fromAccountNumber);
      }
      else
        accountsManager.fetchInternalAccounts(scope_cardlessPresentationController.fetchAccountsSuccCallBackNew,scope_cardlessPresentationController.fetchAccountsErrCallBackNew);
    }
    else{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      scope_cardlessPresentationController.asyncManager.initiateAsyncProcess(scope_cardlessPresentationController.numberOfAsyncForCWTransactions);
      var transactionObj = applicationManager.getTransactionsListManager();
      transactionObj.fetchCardlessPendingTransactions(scope_cardlessPresentationController.fetchCardlessPenTranPresSucCallback,scope_cardlessPresentationController.fetchCardlessPenTranPreErrCallback);
      transactionObj.fetchCardlessPostedTransactions(scope_cardlessPresentationController.fetchCardlessPosTranPresSucCallback,scope_cardlessPresentationController.fetchCardlessPosTranErrCallback);
    }
  },
  //cardless cash withdrawal fun
  setCCWTransactionAmount :  function(amount)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    var navMan=applicationManager.getNavigationManager();
    var transactionObj=scope_cardlessPresentationController.getTransactionObject();
    var bal=transactionObj.fromAccountBalance;
    var accountData=navMan.getCustomInfo("frmCardLessWithdraw");
    accountData.amount=amount;
	var recipientType=navMan.getCustomInfo("recipientFlag");
    navMan.setCustomInfo("frmCardLessWithdraw",accountData);
    var forUtility=applicationManager.getFormatUtilManager();
    amount= forUtility.deFormatAmount(amount);
    bal= forUtility.deFormatAmount(bal);
    if(Number(amount)>Number(bal))
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmCCAmount', true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.amountGreaterThanAvailBal"));
    }
    else
    {
      var confManager = applicationManager.getConfigurationManager();
      var denominations = confManager.getDenominationAmountValues();
      var validateAmount = scope_cardlessPresentationController.validateAmount(denominations, amount);
      if(validateAmount)
      {
        transactionObject.setTransactionAttribute("amount",amount);
        transactionObject.setTransactionAttribute("transactionType","Cardless");
        navMan.setCustomInfo("frmCardLessConfWithdraw",transactionObj);
          scope_cardlessPresentationController.commonFunctionForNavigation("frmCCconfirmNew");
      }
      else
      {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCCAmount', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cardless.DenominationError"));
      }
    }
  },
  presentationMakeACardlessQRTransferSuccess : function(createSuccess)
  {
    var transactionObject = applicationManager.getTransactionsListManager();
    var txnDetails = scope_cardlessPresentationController.getTransactionObject();
    var navMan = applicationManager.getNavigationManager();
    var customData = {
      "createResponse":createSuccess,
      "transnDetails":txnDetails
    }
    navMan.setCustomInfo("frmCardLessConfWithdrawQR",customData);
    if(createSuccess.success){
      scope_cardlessPresentationController.setcardlessTransactionId(createSuccess.referenceId);
      navMan.setCustomInfo("frmCardLessQRCode",customData);
      navMan.navigateTo({"appName" : "ArrangementsMA", "friendlyName" : "CardLessUIModule/frmCCAck"});
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmCardlessCashConfirm', true);
        controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.mb.cc.serviceError"));
    }
  },
  };
});