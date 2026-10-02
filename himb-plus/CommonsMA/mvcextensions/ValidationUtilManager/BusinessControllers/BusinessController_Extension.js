define([], function(){
  return {
   isDOBValid : function(dob){
        var locale = kony.i18n.getCurrentLocale();
        var mm, yyyy, dd;
        var dobArray = dob.split('/');
        if (locale == "en_US" || locale == "en" || locale == "ne_NP") {
          mm = dobArray[0]
          dd = dobArray[1];
          yyyy = dobArray[2];
        }
        else if (locale == "en_GB" || locale === "fr_FR" || locale === "es_ES"  || locale === "ar_AE"){
          mm = dobArray[1]
          dd = dobArray[0];
          yyyy = dobArray[2];
        }
        else if (locale == "de_DE") {
          mm = dobArray[1]
          dd = dobArray[0];
          yyyy = dobArray[2];
        }
        else if (locale == "sv_SE") {
          mm = dobArray[2]
          dd = dobArray[1];
          yyyy = dobArray[0];
        }else if (locale == "ar_AE") {
          mm = dobArray[0]
          dd = dobArray[1];
          yyyy = dobArray[2];
          }
        var userDOB = new Date(yyyy, mm - 1, dd);
        return (userDOB.getFullYear() == yyyy && (userDOB.getMonth() + 1) == mm && userDOB.getDate() == Number(dd) && this.isDateNotGreaterThanCurrentDate(userDOB));
      }
    };
});