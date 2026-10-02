define([], function(){
  return{
    getDateForFormatting : function (dob) {
        var locale = kony.i18n.getCurrentLocale();
        var mm, yyyy, dd;
        var dobArray = dob.split('/');
        if (locale == "en_US" || locale == "en" ||locale == "ne_NP") {
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
     
  deFormatAmount : function (amountStr, currencyArray) {
    var scope = this;
    amountStr = "" + amountStr;
    var configurationManager = applicationManager.getConfigurationManager();
    if (amountStr) {
      var  isAlreadyDeformatted  =  (/^(\-|)\d+(?:\.\d{1,2})?$/g).test(amountStr);
      if (!isAlreadyDeformatted) {
        if (currencyArray) {
          var element;
          if (amountStr.split("").some(function(r){
            element = r;
            return currencyArray.indexOf(r) >= 0
          })) {
              amountStr = amountStr.split(element).join("").trim();
          }
        }
        else {
          if (amountStr.indexOf(configurationManager.getCurrencyCode()) !== -1) {
            amountStr = amountStr.split(configurationManager.getCurrencyCode()).join("").trim();
          }
          else{
            var currencySymbol = this.getCurrencySymbol("NPR");
            amountStr = amountStr.split(currencySymbol).join("").trim();
          }
        }
        var locale = applicationManager.getLocale();
        locale= locale.split("_").join("-");
        //var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
        var group = this.defaultValueForGroup(locale);
        var decimal = this.getDecimalSeparator(locale);
//         if (configurationManager.getDeploymentGeography() === "EUROPE") {
//           group = ".";
//           decimal = ",";
//         }
        var reversedVal = amountStr.replace(new RegExp('\\' + group, 'g'), '');
        reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
        return isNaN(reversedVal) ? "" :reversedVal;
      } else {
        return amountStr;
      }
    }
  },
  convertAmountValue : function (amount, currencySymbolCode) {
    var amount = parseFloat(amount).toLocaleString(kony.i18n.getCurrentDeviceLocale().name, {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
      });
      return currencySymbolCode +" "+ amount;
  },
  getDateFormat :function () {
    var configurationManager = applicationManager.getConfigurationManager();
    var dateFormat = (configurationManager.getDateFormat() === null) ? this.APPLICATION_DATE_FORMAT : configurationManager.getDateFormat();
    var result = "";
    function getValue(text) {
      if (text == "m") {
        return "MM";
      } else if (text == "d") {
        return "dd";
      } else if (text == "y") {
        return "yy";
      } else if (text == "Y") {
        return "yyyy";
      }
    };
    if(dateFormat !=null && dateFormat != undefined){
      result = getValue(dateFormat[0]) + dateFormat[1] + getValue(dateFormat[2]) + dateFormat[3] + getValue(dateFormat[4]);
    }
    return result;
  }
    };
});