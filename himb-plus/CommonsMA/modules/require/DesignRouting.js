/**
 * DesignRouting - Modern-design extension point.
 *
 * Wraps NavigationManager.navigateTo and NavigationManager.updateForm so that
 * every caller reaches the Modern form when UI_DESIGN=MODERN, without editing a
 * single existing call site.
 *
 * Why wrapping rather than BusinessController_Extension.js: the _Extension
 * files in this project return a plain object of methods that REPLACE prototype
 * methods outright - destroyForms in the NavigationManager extension is a full
 * reimplementation, not a call-through. Overriding navigateTo that way would
 * mean copying ~40 lines of Infinity product code into the extension and
 * maintaining it across product upgrades. Capturing the original and delegating
 * keeps the product code untouched and makes deletion of this file a complete
 * removal of the behaviour.
 *
 * Both wrapped methods live on the same singleton: getNavigationManager()
 * returns getModuleManager().getModule({...}).businessController, the same
 * registered instance every time, so assigning own properties on it persists.
 *
 * updateForm is wrapped as well as navigateTo, and that half is not optional.
 * HomepageMA's Accounts presentation controller delivers view models through
 * applicationManager.getNavigationManager().updateForm({...}) in a dozen places.
 * Wrapping only navigateTo would yield a Modern form that navigates correctly
 * and then renders with no balances - a data bug that looks like a layout bug.
 *
 * REMOVAL: see the header of DesignResolver.js.
 *
 * @module DesignRouting
 */
define(["DesignResolver"], function (DesignResolver) {

  var installed = false;

  return {

    /**
     * Idempotent. Safe to call before Fabric has answered, because the theme is
     * resolved per call rather than captured here.
     * @returns {boolean} true when the wrappers are in place
     */
    install: function () {
      if (installed) {
        return true;
      }
      try {
        var navigationManager = applicationManager.getNavigationManager();
        if (!navigationManager ||
            typeof navigationManager.navigateTo !== "function" ||
            typeof navigationManager.updateForm !== "function") {
          kony.print("DesignRouting.install: NavigationManager not ready, skipped");
          return false;
        }

        var originalNavigateTo = navigationManager.navigateTo;
        navigationManager.navigateTo = function (formname, ignoreExistence, params) {
          return originalNavigateTo.call(this,
            DesignResolver.resolveForm(formname), ignoreExistence, params);
        };

        var originalUpdateForm = navigationManager.updateForm;
        navigationManager.updateForm = function (uiDataMap, formName, appName) {
          return originalUpdateForm.call(this,
            uiDataMap, DesignResolver.resolveForm(formName), appName);
        };

        installed = true;
        return true;
      } catch (e) {
        kony.print("DesignRouting.install skipped: " + e);
        return false;
      }
    }
  };
});
