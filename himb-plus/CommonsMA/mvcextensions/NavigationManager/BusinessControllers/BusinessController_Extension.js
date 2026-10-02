define([], function () {
  return {
    /**
      * destroyForms is used to destroy all the existing form in that current application
      */
    destroyForms: function () {
      var scope = this;
      try {
        for (var i = 0; i < this.formStack.length; i++) {
          var item = this.formStack[i];
          var isLoginForm = item === "frmLogin" || (typeof item === "object" && item.hasOwnProperty("friendlyName") &&
            typeof item.friendlyName === "string" &&
            item.friendlyName.trim().endsWith("/frmLogin")
          );

          if (!isLoginForm)
            kony.application.destroyForm(this.formStack[i]);
        }
        this.formStack = [];
        this.formStack.push({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmLogin" });
      }
      catch (e) {
        kony.print("exception in destroyForms " + e + "-->###" + scope.formStack);
      }
    }
  };
});