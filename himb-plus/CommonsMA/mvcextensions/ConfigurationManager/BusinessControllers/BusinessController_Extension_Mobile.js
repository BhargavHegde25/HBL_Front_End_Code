define(['CommonUtilities'],function(CommonUtilities){
    return{
    denominationAmountValues: ['500', '1000', '1500'],
    locale : {
      'English': 'en_US',
      'UK-English': 'en_GB',
      'Spanish': 'es_ES',
      'German': 'de_DE',
      'French': 'fr_FR',
      'Arabic': 'ar_AE',
      'Nepalese': 'ne_NP',
      'US-English': 'en_US'
    },
    frontendDateFormat : {
      en_US: 'm/d/Y',
      en_GB: 'd/m/Y',
      es_ES: 'd/m/Y',
      de_DE: 'd.m.Y',
      fr_FR: 'd/m/Y',
      sv_SE: 'Y-m-d',
      ar_AE: 'd/m/Y',
      ne_NP: 'm/d/Y'
    },
    termsAndConditions : {
      "Login" : 'Login_TnC',
      "Enroll" : 'Enroll_TnC',
      "EStatements":"Estatements_TnC",
      "Hamburger" : "Common_TnC",
      "Footer" : "Common_TnC",
      "BillPayment" : "BillPay_TnC",
      "QRPayment":"QRPayment_Activation_TnC",
      "NAO" : "Origination_TnC",
      "CardLock" : "LockCard_TnC",
      "CardCancel" : "CancelCard_TnC",
      "SEPA_TnC":"SEPA_TnC",
      "OnlineBankingAccess" : "OnlineBanking_Access_TnC",
      "AccountAggregation" : "AccountAggregation_TnC",
      "OpenNewAccount":"Origination_TnC",
      "de_DE":"de-DE",
      "en_GB":"en-GB",
      "en_US":"en-US",
      "es_ES":"es-ES",
      "fr_FR":"fr-FR",
      "it_IT":"it-IT",
      "sv_SE":"sv-SE",
      "ar_AE":"ar-AE",
      "ne_NP":"ne_NP"
    },
    setExchangerateURL : function (ExchangerateURL) {
      scope_configManager.ExchangerateURL = ExchangerateURL;
    },
    getExchangerateURL : function () {
      return this.ExchangerateURL;
    },
    setDepositRateURL : function (DepositRateURL) {
      scope_configManager.DepositRateURL = DepositRateURL;
    },
    getDepositrateURL : function () {
      return this.DepositRateURL;
    },
    setLoanrateURL : function (LoanrateURL) {
      scope_configManager.LoanrateURL = LoanrateURL;
    },
    getLoanrateURL : function () {
      return this.LoanrateURL;
    },
    setBranchReference: function(BranchIdReference){
      scope_configManager.BranchIdReference=BranchIdReference;
    },
    getBranchReference: function(){
      return this.BranchIdReference;
    },
    setCorporateOffice : function (CorporateOffice) {
      scope_configManager.CorporateOffice = CorporateOffice;
    },
    getCorporateOffice : function () {
      return this.CorporateOffice;
    },
    setCustomerSupport1phone : function (CustomerSupport1phone) {
      scope_configManager.CustomerSupport1phone = CustomerSupport1phone;
    },
    getCustomerSupport1phone : function () {
      return this.CustomerSupport1phone;
    },
    setCustomerSupport2phone : function (CustomerSupport2phone) {
      scope_configManager.CustomerSupport2phone = CustomerSupport2phone;
    },
    getCustomerSupport2phone : function () {
      return this.CustomerSupport2phone;
    },
    setCustomerSupport3phone : function (CustomerSupport3phone) {
      scope_configManager.CustomerSupport3phone = CustomerSupport3phone;
    },
    getCustomerSupport3phone : function () {
      return this.CustomerSupport3phone;
    },
    setCustomerSupport1Email : function (CustomerSupport1Email) {
      scope_configManager.CustomerSupport1Email = CustomerSupport1Email;
    },
    getCustomerSupport1Email : function () {
      return this.CustomerSupport1Email;
    },
    setCustomerSupport2Email : function (CustomerSupport2Email) {
      scope_configManager.CustomerSupport2Email = CustomerSupport2Email;
    },
    getCustomerSupport2Email : function () {
      return this.CustomerSupport2Email;
    },
    setCustomerSupport3Email : function (CustomerSupport3Email) {
      scope_configManager.CustomerSupport3Email = CustomerSupport3Email;
    },
    getCustomerSupport3Email : function () {
      return this.CustomerSupport3Email;
    },
    setContactUsBanner : function (ContactUsBanner) {
      scope_configManager.ContactUsBanner = ContactUsBanner;
    },
    getContactUsBanner : function () {
      return this.ContactUsBanner;
    },
    setCustomerSupportMbCallUs : function (CustomerSupportMbCallUs) {
      scope_configManager.CustomerSupportMbCallUs = CustomerSupportMbCallUs;
    },
    getCustomerSupportMbCallUs : function () {
      return this.CustomerSupportMbCallUs;
    },
    setMbUiMockSuccess : function (MbUiMockSuccess) { 
      scope_configManager.MbUiMockSuccess = MbUiMockSuccess;
    },
    getMbUiMockSuccess : function () {
      return this.MbUiMockSuccess;
    },
    setDebtorAgentBankId : function (DebtorAgentBankId) {
      scope_configManager.DebtorAgentBankId = DebtorAgentBankId;
    },
    getDebtorAgentBankId : function () {
      return this.setDebtorAgentBankId;
    },
    customConstants : {
      CONTACTUS: kony.i18n.getLocalizedString('i18n.footer.contactUs'),
      EXCHANGERATES: kony.i18n.getLocalizedString('i18n.prelogin.ExchangeRates'),
      DEPOSITINTEREST: kony.i18n.getLocalizedString('i18n.prelogin.DepositIntrestrates'),
      LOANINTEREST: kony.i18n.getLocalizedString('i18n.prelogin.LoanIntrestrates')
    },
	  reloadCustomConstants : function (){
      this.customConstants.CONTACTUS = kony.i18n.getLocalizedString('i18n.footer.contactUs');
      this.customConstants.EXCHANGERATES = kony.i18n.getLocalizedString('i18n.prelogin.ExchangeRates');
      this.customConstants.DEPOSITINTEREST = kony.i18n.getLocalizedString('i18n.prelogin.DepositIntrestrates');
      this.customConstants.LOANINTEREST = kony.i18n.getLocalizedString('i18n.prelogin.LoanIntrestrates');
    },
    setStartupLocaleAndDateFormat : function(res) {
      var config = applicationManager.getConfigurationManager();
      var sm = applicationManager.getStorageManager();
      var langObjFromStorage = sm.getStoredItem('langObj');
      if (!kony.sdk.isNullOrUndefined(langObjFromStorage)) {
        config.configurations.setItem(
          'LOCALE',
          config.locale[langObjFromStorage.language]
        );
      } else {
        config.configurations.setItem('LOCALE', 'en_US'); //Sarghuru OOTB Crash
      }
      if (config.getLocale() !== null) {
        config.configurations.setItem(
          'DATEFORMAT',
          config.frontendDateFormat[config.getLocale()]
        );
      } else {
        config.configurations.setItem('DATEFORMAT', null);
      }
    },
      getDenominationAmountValues: function () {
        return this.denominationAmountValues;
      },
  };
});