/**
 * DesignResolver - Modern-design extension point.
 *
 * Maps a Classic form name to its Modern counterpart when the Fabric client app
 * property UI_DESIGN is set to MODERN. Any other value, an empty value, an
 * unreachable Fabric, or an exception anywhere in this module resolves to
 * Classic, so no failure mode can route a customer to an unfinished screen.
 *
 * UI_DESIGN is deliberately not named UI_THEME: kony.theme.setCurrentTheme and
 * the stored "themeDetails" item already mean something else in this app (the
 * defaultTheme / darkTheme skin switch, offered to customers in Settings). That
 * mechanism changes skins only and cannot deliver a different form.
 *
 * REMOVAL - this extension is designed to be deleted:
 *   1. Delete this file and DesignRouting.js
 *   2. Revert the UI_DESIGN field and its mapping in
 *      CommonsMA/mvcextensions/ConfigurationManager/BusinessControllers/
 *      BusinessController_Extension.js
 *   3. Revert the DesignRouting install block in
 *      ApplicationManager.prototype.preappInitCalls
 * Classic then matches its pre-change state exactly.
 *
 * @module DesignResolver
 */
define([], function () {

  /**
   * Leave false until frmHBLUnifiedDashboardModern actually exists in
   * HomepageMA/forms/mobile/AccountsUIModule/. Create it through Visualizer
   * ("duplicate form"), never by copying the folder on disk - every widget
   * carries a kuid and a filesystem copy produces duplicate ids across two
   * forms plus stale .meta registries.
   *
   * Why this guard is not optional: NavigationManager.navigateTo wraps its
   * entire body in try/catch and only kony.print()s the failure
   * (NavigationManager/BusinessControllers/BusinessController.js:125-164).
   * Navigating to a form that does not exist therefore fails silently - the app
   * stays on the current screen showing no error. Routing to a form that has
   * not been built yet would present as a frozen app rather than a crash, which
   * is far harder to diagnose.
   *
   * With this false, the whole extension is inert even if UI_DESIGN=MODERN is
   * already set in Fabric.
   */
  var MODERN_FORM_AVAILABLE = true;

  /** Classic form name -> Modern form name. */
  var MODERN_FORMS = {
    "frmHBLUnifiedDashboard": "frmHBLUnifiedDashboardModern"
  };

  return {

    /**
     * True only when the Modern assets exist and Fabric has opted this app in.
     * @returns {boolean}
     */
    isModern: function () {
      try {
        if (!MODERN_FORM_AVAILABLE) {
          return false;
        }
        var configManager = applicationManager.getConfigurationManager();
        return !!configManager &&
          String(configManager.UI_DESIGN).toUpperCase() === "MODERN";
      } catch (e) {
        return false;
      }
    },

    /**
     * Swaps the last path segment when a Modern counterpart exists. Call sites
     * use both the bare "frmHBLUnifiedDashboard" and the module-qualified
     * "AccountsUIModule/frmHBLUnifiedDashboard", so both are handled.
     * @param {string} friendlyName
     * @returns {string}
     */
    resolveName: function (friendlyName) {
      var parts = String(friendlyName).split("/");
      var form = parts.pop();
      var modern = MODERN_FORMS[form];
      if (!modern) {
        return friendlyName;
      }
      parts.push(modern);
      return parts.join("/");
    },

    /**
     * navigateTo and updateForm are each called with a bare form-name string in
     * some places and an {appName, friendlyName} object in others, so both
     * shapes are accepted. Objects are shallow-copied rather than mutated, and
     * copied field by field rather than through JSON so that keys carrying
     * undefined (navigateToMicroApp passes enrollActivate) survive.
     *
     * Returns the input untouched on Classic and on any failure.
     *
     * @param {(string|object)} target
     * @returns {(string|object)}
     */
    resolveForm: function (target) {
      try {
        if (!this.isModern()) {
          return target;
        }
        if (typeof target === "string") {
          return this.resolveName(target);
        }
        if (target && typeof target === "object" && target.friendlyName) {
          var resolved = {};
          for (var key in target) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
              resolved[key] = target[key];
            }
          }
          resolved.friendlyName = this.resolveName(target.friendlyName);
          return resolved;
        }
        return target;
      } catch (e) {
        return target;
      }
    }
  };
});
