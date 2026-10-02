define([], function(){
  return{
    getDateForFormatting : function (dob) {
        var locale = kony.i18n.getCurrentLocale();
        var mm, yyyy, dd;
        var dobArray = dob.split('/');
        if (locale == "en_US" || locale == "en" || locale == "ne_NP") {
          mm = dobArray[0]
          dd = dobArray[1];
          yyyy = dobArray[2];
        } else if (locale == "en_GB" || locale === "fr_FR" || locale === "es_ES" || locale === "ar_AE") {
          mm = dobArray[1]
          dd = dobArray[0];
          yyyy = dobArray[2];
        } else if (locale == "de_DE") {
          mm = dobArray[1]
          dd = dobArray[0];
          yyyy = dobArray[2];
        } else if (locale == "sv_SE") {
          mm = dobArray[2]
          dd = dobArray[1];
          yyyy = dobArray[0];
        }
        else if (locale == "ar_AE") {
          mm = dobArray[1]
          dd = dobArray[0];
          yyyy = dobArray[2];
          if(kony.os.deviceInfo().name==="iphone"){
            mm = dobArray[0]
            dd = dobArray[1];
            yyyy = dobArray[2];
            return dd + '/' + mm + '/' + yyyy; 
          }
        }
        return mm + '/' + dd + '/' + yyyy;
      },

        /**
    * Formats and appends currency symbol to given amount
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    * @returns {String} - formated and currency symbol appended
    */
  formatAmountandAppendCurrencySymbol : function (amount, currencySymbolCode) {
	  try{
    if (kony.sdk.isNullOrUndefined(amount)) {
      amount = "0.00";
    }
    var device = kony.os.deviceInfo().name;
	//Removing Comma(,)
	if(typeof amount=='string'){
	if(amount.indexOf(',')!=-1){
		amount=amount.replace(',','');
  }
  }
  else{
	 if(amount.toString().indexOf(',')!=-1){
		amount=amount.toString().replace(',',''); 
  }
  }
    var formatedAmount = this.formatAmount(amount);
    var currencySymbol = this.getCurrencySymbol(currencySymbolCode)+" ";
    if (device==="android"|| device==="iPhone") {
      currencySymbol =  currencySymbolCode === undefined?"NPR ":currencySymbolCode+" ";
    }
    return formatedAmount[0] === '-' ? (currencySymbol + '-' +  formatedAmount.split('-')[1]) : currencySymbol + formatedAmount;
	  }catch(e){
		  kony.print("error in format amount"+e);
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
	  }
  },

    accountNumberMaskExceptLastFourDigit: function (accountNumber) {
      var mask = accountNumber.slice(-4);
      var remainingData = accountNumber.slice(0, -4);
      var masked = "X".repeat(remainingData.length) + mask;
      return masked;
    },

    accountNumberMaskExceptFirstFourLastFour: function (accountNumber) {
      // var mask = accountNumber.slice(-4);
      //       var remainingData = accountNumber.slice(0,-4);
      //       var masked = "X".repeat(remainingData.length) + mask;
      //       return masked

      var firstFourDigit = accountNumber.slice(0, 4);
      var lastFourDigit = accountNumber.slice(-4);
      var remainingData = accountNumber.length - 8;
      var masked = "X".repeat(remainingData);
      return firstFourDigit + masked + lastFourDigit;
    },
    };
});