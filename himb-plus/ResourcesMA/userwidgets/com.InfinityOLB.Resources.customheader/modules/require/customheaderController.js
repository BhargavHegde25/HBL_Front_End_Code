/*eslint require-jsdoc:0
          complexity:0
*/

define(['CommonUtilities', 'TopbarConfig', 'FormControllerUtility','ViewConstants'], function (CommonUtilities, TopbarConfig, FormControllerUtility,ViewConstants) {
  toggle = 1;
  function getTotalHeight() {
    return kony.os.deviceInfo().screenHeight-70;
    //     var height = 0;
    //     var widgets = kony.application.getCurrentForm().widgets();
    //     for (var i = 0; i < 3; i++) {
    //       var widget = widgets[i];
    //       height += widget.frame.height;
    //     }
    //     height += kony.application.getCurrentForm().flxFooter.frame.y;
    //     return height;
  }
  var orientationHandler = new OrientationHandler();
  var sourceWidget = null;
  var DASHBOARD_SCREEN = "frmFirst";
  return {
    setupLogout: function () {
      this.view.topmenu.imgLogout.src="logout_active.png";
      this.view.topmenu.imgLogout.onTouchEnd = this.showLogout.bind(this, this.view.topmenu.btnLogout);
      this.view.customhamburger.flxLogout.onClick = this.showLogout.bind(this,this.view.topmenu.btnHamburger);
      if (TopbarConfig.config.LOGOUT.excludedForms.indexOf(kony.application.getCurrentForm().id) < 0) {
        this.view.topmenu.btnLogout.text = "";
        this.view.topmenu.btnLogout.setVisibility(false);
        this.view.topmenu.imgLogout.setVisibility(true);
        this.view.topmenu.imgLogout.onTouchEnd = this.showLogout.bind(this, this.view.topmenu.btnLogout);
      }    
    },
    showLogout: function(widgetPath) {
      sourceWidget = widgetPath;
      var currentForm = kony.application.getCurrentForm();
      if ('flxLogout' in currentForm) {
        currentForm.flxLogout.isVisible = true;
        currentForm.flxLogout.isModalContainer=true;
        this.closeHamburgerMenu();
        var children = currentForm.widgets();
        var footerHeight = 0;
        if (!(currentForm.id === "frmLocateUs" && orientationHandler.isMobile)) {
          footerHeight = currentForm.flxFooter ? currentForm.flxFooter.frame.height + (currentForm.flxFooter.frame.y - (children[0].frame.height + children[1].frame.height)) : 0;
        }
        var height = children[0].frame.height + children[1].frame.height + footerHeight;
        //currentForm.flxLogout.setVisibility(true);
        currentForm.flxLogout.height = kony.os.deviceInfo().screenHeight + "dp";
        currentForm.flxLogout.left = "0%";
        currentForm.flxLogout.accessibilityConfig={
          a11yARIA : {
            tabindex : -1,
          }
        }
        var popupComponent = currentForm.flxLogout.widgets()[0];
        popupComponent.lblHeading.text = kony.i18n.getLocalizedString("i18n.common.logout");
        popupComponent.lblHeading.accessibilityConfig = {
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.LogoutMsg");
        popupComponent.lblPopupMessage.accessibilityConfig = {
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.flxSeperator.accessibilityConfig = {
          "a11yHidden":true,
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.flxSeperator2.accessibilityConfig = {
          "a11yHidden":true,
          "a11yARIA": {
            tabindex:-1,
          }
        };
        popupComponent.btnNo.accessibilityConfig = {
          "a11yARIA": {
            tabindex:0,
            role : "button"
          }
        };
        popupComponent.btnYes.accessibilityConfig = {
          "a11yARIA": {
            tabindex:0,
            role : "button"
          }
        };
        popupComponent.flxCross.accessibilityConfig = {
          "a11yLabel" : "close",
          "a11yARIA": {
            tabindex:0,
            role : "button"
          }
        };
        popupComponent.flxCross.isVisible = true;
        popupComponent.flxCross.setFocus(true);
        popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
        popupComponent.btnYes.onClick = function() {
          FormControllerUtility.showProgressBar(kony.application.getCurrentForm());
          TopbarConfig.config.LOGOUT.onClick();
          currentForm.flxLogout.left = "-100%";
          currentForm.flxLogout.isVisible = false;
          currentForm.customheader.topmenu.btnLogout.setFocus(true);
        };
        popupComponent.btnNo.onClick = function() {
          currentForm.flxLogout.left = "-100%";
          currentForm.flxLogout.isVisible = false;
          if(sourceWidget!==null){
            sourceWidget.setActive(true);
            sourceWidget=null;
          }
        }
        popupComponent.flxCross.onClick = function() {
          currentForm.flxLogout.left = "-100%";
          currentForm.flxLogout.isVisible = false;
          if(sourceWidget!==null){
            sourceWidget.setActive(true);
            sourceWidget=null;
          }
        }
      }
    },

    initHeader: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeaderMain"]);
      var configurationManager = applicationManager.getConfigurationManager();
      this.setupContextualActions();
      this.setupHamburger();      
      this.setupLogout();
      this.setupUserActions();
      this.setHoverSkins();
      this.setCustomHeaderLogo();
      this.isAccountsEnabled();
      var scope= this;
      var messageText = this.view.topmenu.imgMessages.text;
      CommonUtilities.setText(this.view.topmenu.imgMessages, kony.i18n.getLocalizedString("i18n.a11y.common.messages"), CommonUtilities.getaccessibilityConfig());
      this.view.topmenu.imgMessages.text = messageText;
      //CommonUtilities.setText(this.view.topmenu.imgUserReset, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), CommonUtilities.getaccessibilityConfig());
      flag = 0;
      //this.view.topmenu.flxPayBills.setVisibility(true);
      // this.view.topmenu.flxMyBills.setVisibility(true);
      this.view.topmenu.flxSeperator4.setVisibility(false);
      if (configurationManager.isFastTransferEnabled == "true") 
      {
        this.view.topmenu.lblTransferAndPay.text = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
        // this.view.topmenu.lblTransferAndPay.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
        // this.view.topmenu.lblMyBills.toolTip = kony.i18n.getLocalizedString("i18n.Pay.MyBills");
        // this.view.topmenu.imgLblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
      }
      if(kony.application.getCurrentForm().id !== "frmEnrollBusiness")
        this.view.topmenu.flxaccounts.onClick = TopbarConfig.config.ACCOUNTS.onClick;
      this.view.topmenu.flxMyBills.onClick = TopbarConfig.config.BILLS.onClick;
      this.view.topmenu.flxResetUserImg.onClick = this.showUserActions.bind(this);
      this.view.topmenu.flxNotifications.onClick = TopbarConfig.config.NOTIFICATIONS.onClick;
      this.view.topmenu.flxMessages.onClick = TopbarConfig.config.MESSAGES.onClick;
      this.view.topmenu.flxHelp.onClick = TopbarConfig.config.HELP.onClick;
      this.view.topmenu.flxHome.onClick = TopbarConfig.config.HOME.onClick;
      this.view.flxImgKony.onClick=TopbarConfig.config.HOME.onClick;
      this.view.topmenu.flxFeedbackimg.onClick = TopbarConfig.config.FEEDBACK.onClick;
      //this.view.flxImgKony.onClick= this.showDashboardScreen;
      //this.view.customhamburger.flxLogo.onClick = this.showDashboardScreen;
      this.view.topmenu.flxCombinedAccessMenu.isVisible = false;
      this.view.topmenu.imgMessages.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message")
      }
      this.view.headermenu.lblNotifications.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts")
      }
      this.view.imgKony.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.common.infinityDB")
        "a11yLabel":"Infinity digital banking",
        a11yARIA:{
          tabindex:-1,
          role : "presentation"
        }

      };
      this.view.topmenu.lblAccounts.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.flxContextualMenu.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
          "aria-live": "off"
        },
      }
      this.view.topmenu.lblTransferAndPay.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.transfers")
      }
      this.view.topmenu.lblMyBills.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.Pay.MyBills")
      }
      this.view.topmenu.Label0dcf00103bdba46.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.hamburger.transfer"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.CopyLabel0bb648d916e554d.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.FastTransfer.TransferActivities"),
        a11yARIA: {
          tabindex: -1,
        },
      }      
      this.view.topmenu.CopyLabel0a8b12f7002084d.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.CopyLabel0h9e71b8a76ad44.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.lblPayMultipleBeneficiaries.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.CopyLabel0f9fab64572024b.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.locateus.view") + " " + kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"),
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.headermenu.lblImageLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.imgKony.accessibilityConfig = {
        a11ylabel : "Infinity Digital Banking",
        a11yARIA: {
          tabindex: -1,
          role : "presentation"
        },
      }
      this.view.flxImgKony.accessibilityConfig = {
        a11yARIA: {
          tabindex : -1
        },
      }
      this.view.flxHamburgerBack.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.lblTransferAndPay.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.btnSkip.accessibilityConfig = {
        "a11yLabel": "Skip to Main Content",
        a11yARIA: {
          role: "button",
        },
      };
      this.view.topmenu.flxUserId.accessibilityConfig={
        a11yLabel : "Profile",
        a11yARIA:{
          tabindex : 0,
          role : "button",
          "aria-expanded" : false
        }
      }
      this.view.topmenu.imgUserReset.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.topmenu.btnLogout.accessibilityConfig = {
        "a11yLabel": this.isPreLoginView? kony.i18n.getLocalizedString("i18n.common.login"):kony.i18n.getLocalizedString("i18n.common.logout"),
        a11yARIA: {
          role: "button"
        },
      };

      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Hamburger Menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      this.view.topmenu.flxaccounts.accessibilityConfig = {
        a11yARIA: {
          role: "button"
        },
      };
      this.view.topmenu.flxMenusMain.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      };
      this.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby":"lblTransferAndPay"
        },
      }
      this.view.topmenu.flxMyBills.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lblMyBills",
        },
      }
      this.view.topmenu.lblAccounts.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.lblMyBills.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.flxMessages.accessibilityConfig = {
        a11yLabel : "Messages",
        a11yARIA : {
          role : "button",
          tabindex:0
        }
      }
      this.view.topmenu.flxNotifications.accessibilityConfig = {
        a11yLabel : "Notifications",
        a11yARIA : {
          role : "button",
          tabindex:0
        }
      }
      this.view.flxUserActions.accessibilityConfig={
        "a11yARIA":{
          "aria-live": "off",
          "tabindex" : -1
        }
      }
      this.onBreakpointChangeComponent();
    },

    showDashboardScreen: function(){
      if(applicationManager.getUserPreferencesManager().isUserLoggedin()) {
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName": "HomepageMA", "moduleName" : "AccountsUIModule"});
        accountsModule.presentationController.showAccountsDashboard();
      }
    },
    setCustomHeaderLogo : function() {   
      CommonUtilities.setText(this.view.imgKony, kony.i18n.getLocalizedString("i18n.a11y.common.logo"), CommonUtilities.getaccessibilityConfig());
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isSMEUser === "true") {
        this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.SME;
        this.setHeaderLogoResponsiveForSMEandMBB();
      }
      else if(configurationManager.isMBBUser === "true"){
        this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.MBB;
        this.setHeaderLogoResponsiveForSMEandMBB();
      }
      else if(configurationManager.isRBUser === "true")this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.RB;
      else this.view.imgKony.src = ViewConstants.INFINITY_LOGOS.GENERIC;
    },
    setHeaderLogoResponsiveForSMEandMBB : function() {
      var width = kony.application.getCurrentBreakpoint();
      var orientationHandler = new OrientationHandler();
      

      if(orientationHandler.isDesktop) {
        if(width === 1366){
          //this.view.flxImgKony.width = "250dp";
          //this.view.flxImgKony.left = "70dp";
        }
        else if(width === 1380 || width === constants.BREAKPOINT_MAX_VALUE){
          //this.view.flxImgKony.width = "250";
          //this.view.flxImgKony.left = "72dp";
        }
      }
      else if(orientationHandler.isTablet){
        if(width === 1024){
         // this.view.flxImgKony.width = "175dp";
          //this.view.flxImgKony.left = "70dp";
        }
        else if(width === 1366){
          //this.view.flxImgKony.width = "175dp";
          //this.view.flxImgKony.left = "72dp";
        }
        else if(width === 1380 || width === constants.BREAKPOINT_MAX_VALUE){
          //this.view.flxImgKony.width = "180dp";
          //this.view.flxImgKony.left = "75dp";
        }
      }
    },
    setupUserActions: function() {
      var scope = this;
      this.view.segUserActions.widgetDataMap = {
        lblSeparator: "lblSeparator",
        lblUsers: "lblUsers",
        btnUsers : "btnUsers",
        flxSegUserActions:"flxSegUserActions"
      };
      var actions = TopbarConfig.config.USER_ACTIONS.filter(function(action){
        return (((action.id == "Alert Settings") && (kony.application.getCurrentForm().id == DASHBOARD_SCREEN))? false : (!action.isVisible || action.isVisible()));
      })
      //actions.splice(1, 1);
      if(actions.length === 0){
        this.view.topmenu.flxResetUserImg.setVisibility(true);
        this.view.topmenu.flxUserId.setVisibility(false);
        this.view.topmenu.imgUserReset.setVisibility(true);
        this.view.topmenu.flxVerticalSeperator2.setVisibility(false);
      }
      this.view.segUserActions.setData(actions.map(function(configItem) {
        return {
          lblSeparator: "L",
          flxSegUserActions:{
            "accessibilityConfig":{
              "a11yARIA":{
                "tabindex":-1,
                "aria-live":"off"
              }
            }
          },
          lblUsers: {
            "text": kony.i18n.getLocalizedString(configItem.text),
            "accessibilityConfig":{
              "a11yHidden":true,
              "a11yARIA":{
                "tabindex":-1
              }
            }
            // "toolTip": kony.i18n.getLocalizedString(configItem.text)
          },
          btnUsers : {
            "isVisible":true,
            "onClick":scope.userActionsOnclick,
            "accessibilityConfig":{
              "a11yARIA":{
                "tabindex":0,
                "role" : "link",
                "aria-labelledby":"lblUsers"
              }
            }
          },
        }
      }));
    },
    userActionsOnclick : function(widgetInfo,rowInfo){
      var actions = TopbarConfig.config.USER_ACTIONS.filter(function (action) {
        return (!action.isVisible || action.isVisible());
      })
      actions[rowInfo.rowIndex].onClick();
    },


    /**
     * Method will set email attribute to  user from  entitlement configuration  
   **/
    setEmailForUserObj : function() {
      var userEntitlementsEmailIds = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
      for(var i = 0; i < userEntitlementsEmailIds.length; i++) {
        if (userEntitlementsEmailIds[i].isPrimary === "true") {
          return userEntitlementsEmailIds[i].Value;
        }
      }
      return "";
    },
    setupUserProfile: function () {
      var userObject = applicationManager.getUserPreferencesManager().getUserObj();
      if(userObject !==null && userObject !==""){
        var fullName = userObject.CoreCustomers[0].contractName;
      }
      var userImageURL = applicationManager.getUserPreferencesManager().getUserImage();
      if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImageURL && userImageURL.trim() != ""){
        this.view.topmenu.imgUserReset.base64 = ""; 
        this.view.topmenu.imgUserReset.base64 = userImageURL ;
      }
      else{
        this.view.topmenu.imgUserReset.base64 = "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";
        this.view.topmenu.imgUserReset.src = "profile_active.png";
      }
      if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImageURL && userImageURL.trim() != "") 
        this.view.CopyimgToolTip0i580d9acc07c42.base64 = userImageURL;
      else
        this.view.CopyimgToolTip0i580d9acc07c42.src =  ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
     // if(fullName !== "" && fullName !== null)
       // this.view.lblName.text = fullName;
      //else
      	this.view.lblName.text = (userObject.userlastname === null) ? userObject.userfirstname : (userObject.userfirstname === null) ? userObject.userlastname : userObject.userfirstname + " " + userObject.userlastname;
      this.view.lblUserEmail.text = this.setEmailForUserObj();
      this.view.flxUserActions.isVisible = false;
    },
    setupContextualActions: function () {
      var scope = this;
      var configurationManager = applicationManager.getConfigurationManager();
      if(!this.isTransfersAndPayEnabled() && !this.isBillPayEnabled() && applicationManager.getUserPreferencesManager().isLoggedIn === true){
        this.view.topmenu.flxTransfersAndPay.setVisibility(false);
        this.view.topmenu.flxSeperator1.setVisibility(false);
        this.view.topmenu.imgLblTransfers.setVisibility(false);
        this.view.topmenu.lblTransferAndPay.setVisibility(false);
      }else{
        this.view.topmenu.flxTransfersAndPay.onClick = this.openContextualMenu.bind(this);
        this.view.topmenu.flxTransfersAndPay.onTouchEnd = function () {
          if (scope.view.topmenu.flxContextualMenu.isVisible) {
            scope.view.topmenu.flxTransfersAndPay.origin = true;
            if(kony.application.getCurrentBreakpoint()==640 || kony.application.getCurrentBreakpoint()==1024){
              scope.view.topmenu.flxContextualMenu.isVisible = false;
              scope.view.topmenu.flxTransfersAndPay.skin="flxHoverSkinPointer";
              scope.view.topmenu.imgLblTransfers.text = "O";
            }
          }
        }
        TopbarConfig.config.getContextualMenu().forEach(function(contextualItem) {
          scope.view.topmenu[contextualItem.widget].setVisibility(!contextualItem.isVisible || contextualItem.isVisible())
          scope.view.topmenu[contextualItem.widget].onClick = contextualItem.onClick;
        });
      }
    },
    setupHamburger: function () {
      var scope = this;
      //this.view.customhamburger.setItemSelectListener(this.closeHamburgerMenu.bind(this));
      this.view.topmenu.btnHamburger.onClick = function(){
        scope.openHamburgerMenu();
      }
      this.view.flxHamburgerBack.onClick = this.closeHamburgerMenu.bind(this);
      this.view.customhamburger.flxClose.onClick = this.closeHamburgerMenu.bind(this);
    },
    openContextualMenu: function() {
      var scope = this;
      if (scope.view.topmenu.flxTransfersAndPay.skin === "sknFlxHeaderTransfersSelected") {
        scope.view.topmenu.flxTransfersAndPay.skin = "flxHoverSkinPointer";
        scope.view.topmenu.flxTransfersAndPay.hoverSkin = "flxHoverSkinPointer000000op10";
        scope.view.topmenu.imgLblTransfers.text = "O";
        scope.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
          a11yARIA: {
            "aria-expanded": false,
            "role": "button",
            "aria-labelledby": "lblTransferAndPay"
          },
        };
      } else {
        scope.view.topmenu.flxTransfersAndPay.skin = "sknFlxHeaderTransfersSelected";
        scope.view.topmenu.imgLblTransfers.text = "P";
        scope.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
          a11yARIA: {
            "aria-expanded": true,
            "role": "button",
            "aria-labelledby": "lblTransferAndPay"
          },
        };
      }
      scope.view.topmenu.showContextualMenu();
    },
    openHamburgerMenu: function () {
      // For Scroll to top.
      this.view.flxHeaderMain.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1,
          "aria-live": "off"
        }
      }
      this.view.customhamburger.flxMenu.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
          "aria-live": "off"
        }
      }
      this.view.customhamburger.flxClose.setFocus(true);
      this.view.imgKony.setFocus(true);
      this.view.flxHamburger.isVisible=true;
      if(kony.application.getCurrentBreakpoint()===640){
        this.view.flxHamburger.top="50dp";
      }
      else{
      this.view.flxHamburger.top="70dp";
      }
      this.view.customhamburger.flxClose.setFocus(true);
      this.showBackFlex();
      var scope = this;
      var animationDefinition = {
        100: {
          "left": 0
        }
      };
      var animationConfiguration = {
        duration: 0.8,
        fillMode: kony.anim.FILL_MODE_FORWARDS
      };
      var callbacks = {
        animationEnd: function () {
          scope.view.customhamburger.forceLayout();
        }
      };
      var animationDef = kony.ui.createAnimation(animationDefinition);
      this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
      this.view.customhamburger.flxClose.setActive(true);
      this.view.flxHamburger.isModalContainer = true;
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Hamburger Menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":true
        },
      };
    },
    closeHamburgerMenu: function () {
      var self = this;
      var animationDefinition = {
        100: {
          "left": "-200.13%"
        }
      };
      var animationConfiguration = {
        duration: 0.8,
        fillMode: kony.anim.FILL_MODE_FORWARDS
      };
      var callbacks = {
        animationEnd: function () {
          self.view.flxHamburger.isVisible=false;
          self.hideBackFlex();
        }
      };
      var animationDef = kony.ui.createAnimation(animationDefinition);
      this.view.flxHamburger.animate(animationDef, animationConfiguration, callbacks);
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Hamburger Menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      this.view.topmenu.btnHamburger.setFocus(true);
    },
    showBackFlex: function () {
      this.view.flxHamburgerBack.height = getTotalHeight() + "px";
      if(kony.application.getCurrentBreakpoint()===640){
        this.view.flxHamburgerBack.top="50dp";
      }
      else{
      this.view.flxHamburgerBack.top="70dp";
      }
      this.view.customhamburger.flxMenuWrapper.top = "0dp";
      this.view.flxHamburger.height = getTotalHeight() + "px";
      this.view.customhamburger.flxMenu.height = getTotalHeight() -2 + "px";
      this.view.customhamburger.flxScroll.height = getTotalHeight()-60 + "px";
      this.view.flxHamburgerBack.isVisible = true;
      this.view.flxHamburger.isVisible = true;
      var width = kony.application.getCurrentBreakpoint();
      if (width === 1366) {
        this.view.flxHamburger.width = "30%";
      }
      else {
        if(width===1024){
        this.view.flxHamburger.width = "35%";
      }
      else if(width===640){
        this.view.flxHamburger.width = "50%";
      }
      else{
        this.view.flxHamburger.width = "30%";
      }
      this.view.forceLayout();
    }
    },
    hideBackFlex: function () {
      this.view.flxHamburgerBack.height = "0px";
      this.view.flxHamburgerBack.isVisible = false;
      this.view.flxHamburger.isVisible = false;
      this.view.forceLayout();
    },
    showUserActions: function () {
      if(this.view.flxUserActions.isVisible === false){
        this.view.topmenu.flxUserId.accessibilityConfig={
          a11yLabel : "Profile",
          a11yARIA:{
            tabindex : 0,
            role : "button",
            "aria-expanded" : true
          }
        }
      }
      else{
        this.view.topmenu.flxUserId.accessibilityConfig={
          a11yLabel : "Profile",
          a11yARIA:{
            tabindex : 0,
            role : "button",
            "aria-expanded" : false
          }
        }
      }
      if(this.view.flxHeaderMain.info.frame.x==0){
        this.view.flxUserActions.left = -410 + this.view.flxHeaderMain.info.frame.width + "dp";
        if(kony.application.getCurrentBreakpoint()==1024|| orientationHandler.isTablet){
          this.view.flxUserActions.left = -365 + this.view.flxHeaderMain.info.frame.width + "dp";
        }
      }else{
        this.view.flxUserActions.left = 945 + this.view.flxHeaderMain.info.frame.x + "dp";
      }
      if (this.view.flxUserActions.isVisible === false) {
        hidePopups();
        this.view.topmenu.imgDropdown.src = "profile_dropdown_uparrow.png";
        this.view.flxUserActions.isVisible = true;
        this.view.topmenu.flxContextualMenu.isVisible = false;
        this.view.topmenu.flxTransfersAndPay.skin="flxHoverSkinPointer";
        this.view.topmenu.imgLblTransfers.text = "O";
        this.view.topmenu.flxUserId.setActive(true);
        //this.view.segUserActions.setActive(0,-1);
      } else {
        this.view.topmenu.imgDropdown.src = "profile_dropdown_arrow.png";
        this.view.flxUserActions.isVisible = false;
        this.view.topmenu.flxUserId.setActive(true);
      }
    },
    forceCloseHamburger: function () {
      this.hideBackFlex();
      this.view.flxHamburger.isVisible=false;
      this.view.flxHamburger.left = "-200%";
      this.view.forceLayout();
    },
    isBillPayEnabled: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isMicroAppPresent("BillPayMA") === true)
        return applicationManager.getConfigurationManager().checkUserFeature("BILL_PAY")
      else
        return false;
    },
    isTransfersAndPayEnabled: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isMicroAppPresent("TransfersMA") === true
         || configurationManager.isMicroAppPresent("BillPayMA") === true || configurationManager.isMicroAppPresent("WireTransferMA") === true) {
        return [
          "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
          "INTER_BANK_ACCOUNT_FUND_TRANSFER",
          "INTRA_BANK_FUND_TRANSFER",
          "TRANSFER_BETWEEN_OWN_ACCOUNT",
          "P2P",
          "TRANSFER_BETWEEN_OWN_ACCOUNT_VIEW"
        ].some(function (permission) {
          return applicationManager.getConfigurationManager().checkUserFeature(permission);
        })
      } else
        return false;
    },
    isAccountsEnabled: function () {
      var configurationManager = applicationManager.getConfigurationManager();
      if(configurationManager.isMicroAppPresent("HomepageMA") === true)
        this.view.topmenu.flxaccounts.setVisibility(true);
      else
        this.view.topmenu.flxaccounts.setVisibility(false);
    },
    updateAlertIcon: function () {
        //this.view.lblNewNotifications.setVisibility(false);
        var unreadCount = applicationManager.getConfigurationManager().getUnreadMessageCount();
        if (unreadCount.count > 0) {
         this.view.topmenu.imgNotifications.src = "notification_active.png";
          this.view.topmenu.lblNewNotifications.setVisibility(true);
        } else {
            this.view.topmenu.imgNotifications.src = "notification_active.png";
          this.view.topmenu.lblNewNotifications.setVisibility(false);
        }
      },
    postShowFunction: function() {
      var scope = this;
       this.updateAlertIcon();
      scope.view.flxUserActions.top="107px";
      scope.view.topmenu.flxVerticalSeperator4.setVisibility(false);
      scope.view.topmenu.flxVerticalSeperator3.setVisibility(false);
      scope.view.topmenu.flxVerticalSeperator2.setVisibility(false);
      scope.view.topmenu.flxVerticalSeperator1.setVisibility(false);    
      scope.view.topmenu.lblHome.toolTip=kony.i18n.getLocalizedString("kony.tab.common.home");
      scope.view.customhamburger.flxHamburgerHeader.accessibilityConfig={
        a11yARIA:{
          tabindex:-1
        }
      }
      // this.view.flxImgKony.onClick =function() {
      //   scope.HblImgServiceCall();
      // };
      this.view.customhamburger.flxLogout.onKeyPress = function(eventObject,eventPayload){
        if(eventPayload.keyCode===9){
          if(eventPayload.shiftKey){
            var widget=scope.view.customhamburger.flxMenuWrapper.widgets()[scope.view.customhamburger.flxMenuWrapper.widgets().length-2];
            var subWidget=scope.view.customhamburger.flxMenuWrapper.widgets()[scope.view.customhamburger.flxMenuWrapper.widgets().length-1];
            if(subWidget.isVisible===false){
              eventPayload.preventDefault();
              widget.setActive(true);
            }
            else{
              var subMenuWidget = subWidget.widgets()[subWidget.widgets().length-1];
              eventPayload.preventDefault();
              subMenuWidget.setActive(true);
            }
          }
          else{
            scope.view.customhamburger.flxHamburgerHeader.setActive(true);
          }
        }
        if(eventPayload.keyCode===27){
          scope.closeHamburgerMenu();
        }
      }
      this.view.flxUserActions.left = 945 + this.view.flxHeaderMain.frame.x + "dp";

      var configurationManager = applicationManager.getConfigurationManager();
      this.setupUserProfile();
      if (configurationManager.isFastTransferEnabled == "true") {
        if (this.isTransfersAndPayEnabled()) {
          if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
            this.view.topmenu.flxSeperator1.setVisibility(false);
            this.view.topmenu.flxTransfersAndPay.setVisibility(false);
          }
          else{
            this.view.topmenu.flxSeperator1.setVisibility(true);
            this.view.topmenu.flxTransfersAndPay.setVisibility(true);
          }
        } else {
          this.view.topmenu.flxSeperator1.setVisibility(false);
          this.view.topmenu.flxTransfersAndPay.setVisibility(false);
        }
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile || !this.isBillPayEnabled())
        {
          this.view.topmenu.flxSeperator4.setVisibility(false);
          this.view.topmenu.flxMyBills.setVisibility(false);
        }
        else
        {
          // this.view.topmenu.flxSeperator4.setVisibility(true);
          // this.view.topmenu.flxMyBills.setVisibility(true);  
        }
      }
      if (!this.isBillPayEnabled() && !this.isTransfersAndPayEnabled()) {
        this.view.topmenu.flxSeperator1.setVisibility(false);
        this.view.topmenu.flxSeperator4.setVisibility(false);
      }
      this.view.flxHamburger.setVisibility(false);
      this.view.forceLayout();
      this.view.topmenu.flxFeedback.setVisibility(false);
      this.view.topmenu.flxHelp.setVisibility(false);
      this.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby": "lblTransferAndPay"
        },
      };

      this.view.customhamburger.flxClose.accessibilityConfig = {
        "a11yLabel": "Close ",
        a11yARIA: {
          "role": "button",
        },
      };
      this.view.customhamburger.lblCollapseAccounts.toolTip = "";
      this.view.customhamburger.lbfonticonlLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1
        }
      };
      this.view.customhamburger.lblLogout.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      };
      this.view.customhamburger.flxLogout.accessibilityConfig = {
        a11yARIA: {
          "role": "button",
          "aria-labelledby": this.view.customhamburger.lblLogout.id,
        },

      };
      this.view.imgKony.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.common.infinityDB")
        "a11yLabel": "Infinity digital banking",
        a11yARIA: {
          tabindex: -1,
          role : "presentation"
        }
      };
      this.view.headermenu.lblImageLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.headermenu.lblImageLogout.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.topmenu.lblTransferAndPay.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.flxHamburgerBack.accessibilityConfig = {
        a11yARIA: {
          tabindex : -1,
        },
      };
      this.view.imgKony.accessibilityConfig = {
        a11yLabel : "Infinity Digital Banking",
        a11yARIA: {
          tabindex: -1,
          role : "presentation"
        },
      };
      this.view.btnSkip.accessibilityConfig = {
        "a11yLabel": "Skip to Main Content",
        a11yARIA: {
          role: "button",
        },
      };
      this.view.topmenu.flxUserId.accessibilityConfig={
        a11yLabel : "Profile",
        a11yARIA:{
          tabindex : 0,
          role : "button",
          "aria-expanded" : false
        }
      }
      this.view.topmenu.imgUserReset.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.topmenu.btnLogout.accessibilityConfig = {
        a11yLabel: this.isPreLoginView? kony.i18n.getLocalizedString("i18n.common.login"):kony.i18n.getLocalizedString("i18n.common.logout"),
        a11yARIA: {
          role: "button"
        },
      };
      this.view.flxImgKony.accessibilityConfig = {
        a11yARIA: {
          tabindex : -1
        },
      };
      this.view.topmenu.btnHamburger.accessibilityConfig = {
        a11yLabel: "Hamburger Menu",
        a11yARIA: {
          "tabindex":0,
          "role": "button",
          "aria-expanded":false
        },
      };
      this.view.topmenu.flxaccounts.accessibilityConfig = {
        a11yARIA: {
          role: "button",
        },
      };
      this.view.topmenu.flxMyBills.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lblMyBills",
        },
      };
      this.view.topmenu.lblMyBills.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        },
      }
      this.view.topmenu.flxMenusMain.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      };
      this.view.topmenu.flxTransfersAndPay.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby":"lblTransferAndPay"
        },
      }
      this.view.topmenu.lblAccounts.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.topmenu.flxResetUserImg.accessibilityConfig={
        a11yHidden : true,
        a11yARIA : {
          tabindex : -1,
        }
      }
      this.view.topmenu.imgMessages.accessibilityConfig={
        a11yHidden : true,
        a11yARIA:{
          tabindex : -1
        }
      }
      this.view.headermenu.lblNotifications.accessibilityConfig ={
        a11yHidden : true,
        a11yARIA:{
          tabindex : -1
        }
      }
      this.view.lblName.accessibilityConfig={
        "a11yARIA":{
          tabindex:-1
        }
      }
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.topmenu.onKeyPress = this.onKeyPressCallBack;
      this.view.segUserActions.onKeyPress = this.onKeyPressCallBack;
      this.view.headermenu.flxLegalEntityDropdown.onKeyPress = this.onKeyPressCallBack;
      this.view.headermenu.flxSegLegalEntity.onKeyPress = this.onKeyPressCallBack;
      this.view.customhamburger.flxLegalEntityDropdownHamburger.onKeyPress = this.onKeyPressCallBack;
      this.view.customhamburger.flxSegLegalEntityHamburger.onKeyPress = this.onKeyPressCallBack;
      this.view.customhamburger.onKeyPress = this.onKeyPressCallBack;
      this.view.customhamburger.flxMenu.onKeyPress = this.onKeyPressCallBack;
      this.view.topmenu.flxUserId.onKeyPress = this.userActionsFocus;
      this.view.topmenu.btnLogout.onKeyPress = this.settingsFocus;
    },
    HblImgServiceCall: function(){
      var config = applicationManager.getConfigurationManager();
      let Url = "https://www.himalayanbank.com/en/";
      kony.application.openURL(Url);
    },
    settingsFocus : function(eventObject, eventPayload){
      var scope = this;
      if(eventPayload.keyCode === 9){
        if(eventPayload.shiftKey){
          if(scope.view.flxUserActions.isVisible){
            eventPayload.preventDefault();
            scope.view.segUserActions.setActive(scope.view.segUserActions.data.length-1,-1,"btnUsers");
          }
          else if(scope.view.topmenu.flxUserId.isVisible){
            eventPayload.preventDefault();
            scope.view.topmenu.flxUserId.setActive(true);
          } else {
            eventPayload.preventDefault();
            scope.view.btnSkip.setActive(true);
          }
        }
      }
      if(eventPayload.keyCode === 27){
        scope.onKeyPressCallBack(eventObject,eventPayload);
      }

    },
    userActionsFocus : function(eventObject,eventPayload){
      var scope = this;
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          eventPayload.preventDefault();
          scope.view.topmenu.flxNotifications.setActive(true);
        }
        else{
          if(scope.view.flxUserActions.isVisible){
            scope.view.segUserActions.setActive(0,-1);
            scope.view.segUserActions.accessibilityConfig={
              "a11yARIA":{
                "tabindex":-1,
                "aria-live":"off"
              }
            }
          }
        }
      }
      if(eventPayload.keyCode === 27){
        if(scope.view.flxUserActions.isVisible===true){
          scope.showUserActions();
          scope.view.topmenu.flxUserId.setActive(true);
        }
      }
    },
    setHoverSkins: function() {
      this.view.imgKony.cursorType="pointer";
      var currForm = kony.application.getCurrentForm().id;
      this.setDefaultHoverSkins();
      this.view.topmenu.flxContextualMenu.isVisible = false;
      this.view.topmenu.flxCombinedAccessMenu.isVisible = false;
      this.view.topmenu.imgLblTransfers.text = "O";
      this.setDefaultSkins();
      if(currForm === 'frmAccountsDetails' || currForm === 'frmAccountsLanding' || currForm === 'frmBBAccountsLanding' || currForm === 'frmDashboard' || currForm === 'frmEnrollBusiness')
        this.view.topmenu.flxaccounts.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
      else if(currForm === 'frmTransfers' || currForm === 'frmPayAPerson' || currForm === 'frmWireTransfer' || currForm === 'frmAcknowledgement' || currForm === 'frmConfirm' || currForm === 'frmVerifyAccount')
        this.view.topmenu.flxTransfersAndPay.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
      else if(currForm === 'frmCustomerFeedback' || currForm === 'frmCustomerFeedbackSurvey'){
        this.view.topmenu.flxFeedbackimg.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.flxFeedbackimg.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.lblFeedback.skin = "sknLblffffff15pxSSP";
      }
      else if(currForm === 'frmOnlineHelp')
        this.view.topmenu.flxHelp.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer"; 
      else if(currForm === 'frmBillPay')
      {
        this.view.topmenu.flxMyBills.skin = "sknFlxFFFFFbrdr3343a8Pointer";
        this.view.topmenu.flxMyBills.hoverSkin = "sknFlxFFFFFbrdr3343a8Pointer"; 
      }
    },

    onKeyPressCallBack: function(eventObject, eventPayload){
      var scope = this;
      if(eventPayload.keyCode === 27){
        if(sourceWidget!==null){ 
          sourceWidget.setActive(true);
          sourceWidget=null;
        }
        else if(scope.view.flxHamburger.isVisible===true){
          if (scope.view.customhamburger.flxSegLegalEntityHamburger.isVisible === true) {
            scope.view.customhamburger.toggleLEDropdown(scope.view.customhamburger.flxSegLegalEntityHamburger, scope.view.customhamburger.lblLegalEntityDropdownIconHamburger);
            scope.view.customhamburger.flxLegalEntityDropdownHamburger.setActive(true);
          }
          else{
            scope.closeHamburgerMenu();
            scope.view.topmenu.btnHamburger.setFocus(true);
          }
        }
        else if(scope.view.topmenu.flxContextualMenu.isVisible === true){
          scope.openContextualMenu();
          scope.view.topmenu.flxTransfersAndPay.setActive(true);
        }
        else if(scope.view.flxUserActions.isVisible===true){
          scope.showUserActions();
          scope.view.topmenu.flxUserId.setActive(true);
        }
        else if (scope.view.headermenu.flxSegLegalEntity.isVisible === true) {
          scope.view.headermenu.toggleLEDropdown(scope.view.headermenu.flxSegLegalEntity, scope.view.headermenu.lblLegalEntityDropdownIcon);
          scope.view.headermenu.flxLegalEntityDropdown.setActive(true);
        }
      }
    },

    setDefaultHoverSkins: function() {
      this.view.topmenu.flxaccounts.hoverSkin = "flxHoverSkinPointer000000op10";
      this.view.topmenu.flxTransfersAndPay.hoverSkin = "flxHoverSkinPointer000000op10";
      this.view.topmenu.flxMyBills.hoverSkin = "flxHoverSkinPointer000000op10";
    }  ,
    setDefaultSkins: function(){
      this.view.topmenu.flxMyBills.skin = "flxHoverSkinPointer";
    },
    onBreakpointChangeComponent: function(width){
      if(width==undefined || width==null){
        width = kony.application.getCurrentBreakpoint();
      }
      var scope = this;
      this.view.flxUserActions.setVisibility(false);
      this.view.lblHeaderMobile.setVisibility(false);

      if(this.isPreLoginView){
        this.showPreLoginView();
      }else{
        this.showPostLoginView();
      }

      if(width === 640 || orientationHandler.isMobile){
        scope.view.flxTopmenu.top="0dp";
        scope.view.customhamburger.width = "100%";
        scope.view.flxImgKony.isVisible = false;
        scope.view.imgKony.isVisible=false;
        scope.view.customhamburger.imgKony.left = "12%";
        scope.view.customhamburger.flxClose.left= "86.5%";
        scope.view.flxHeaderMain.width="100%";
        scope.view.topmenu.btnHamburger.left="13dp";
        this.view.lblHeaderMobile.setVisibility(true);
      }else if(width === 1024 || width === 768 || orientationHandler.isTablet){
        scope.view.flxTopmenu.top="70dp";
        scope.view.customhamburger.flxClose.left= "84%";
        scope.view.customhamburger.width = "100%";
        scope.view.flxImgKony.isVisible = true;
        scope.view.imgKony.isVisible=true;
        //scope.view.flxImgKony.left="20dp";
        scope.view.headermenu.right="15dp";
        scope.view.topmenu.flxCombinedAccess.right="15dp";
        scope.view.topmenu.flxCombinedAccess.right="18dp";
        scope.view.topmenu.flxFeedback.right="-0.5%";
        scope.view.topmenu.flxFeedback.width="130dp";
        scope.view.topmenu.lblFeedback.right = "0px";
        scope.view.topmenu.flxverseperator2.right = "17dp"
        scope.view.topmenu.flxHelp.right = "132dp";
        scope.view.topmenu.flxHelp.width = "50dp";
        scope.view.topmenu.flxCombined.right = "0dp";
        scope.view.topmenu.lblHelp.centerx="50%";
        scope.view.topmenu.lblHelp.centerX = "50%";
        //scope.view.flxImgKony.left = "24dp";
        scope.view.topmenu.btnHamburger.left="24dp";
        scope.view.headermenu.width="100%";
        scope.view.headermenu.right="";
        scope.view.flxHeaderMain.left = "0%";
        scope.view.flxHeaderMain.width="100%";
        scope.view.flxHeaderMain.centerX="";
        scope.view.headermenu.right="28dp";
        scope.view.imgKony.top = "0dp";
        scope.view.customhamburger.flxLegalEntityHamburger.isVisible=false;
      }else if(width===1366){
        scope.view.flxTopmenu.top="70dp";
        scope.view.flxHeaderMain.width="88%"
        scope.view.flxHeaderMain.centerx="50%";
        scope.view.flxHeaderMain.centerX="50%";

        scope.view.headermenu.right="-10dp";
        scope.view.topmenu.flxCombinedAccess.right="-10dp";
        scope.view.topmenu.flxCombined.right="-13dp";

        scope.view.flxTopmenu.width = "100%"
        scope.view.topmenu.width = "100%";
        scope.view.topmenu.flxMenusMain.width = "100%"
        scope.view.topmenu.btnHamburger.left="0dp"
        scope.view.topmenu.btnHamburger.width="45dp";
        //scope.view.topmenu.imgMenu.left= "-2dp";

        scope.view.topmenu.flxFeedback.right="-3.5%";
        scope.view.topmenu.flxFeedback.width="130dp";
        scope.view.topmenu.lblFeedback.right = "0px";
        scope.view.topmenu.flxverseperator2.right = "17dp"
        scope.view.topmenu.flxHelp.right = "102dp";
        scope.view.topmenu.flxHelp.width = "50dp";
        scope.view.topmenu.flxCombined.right = "0dp";
        scope.view.topmenu.lblHelp.centerx="50%";
        scope.view.topmenu.lblHelp.centerX = "50%";
        scope.view.flxImgKony.isVisible=true;
        scope.view.imgKony.isVisible=true;
        //scope.view.flxHamburger.width ="30%";
        //scope.view.flxImgKony.left="83dp";
        //scope.view.flxImgKony.width="100dp";
        scope.view.customhamburger.width = "100%";
        scope.view.customhamburger.flxClose.left= "88%";
        scope.view.customhamburger.flxLegalEntityHamburger.isVisible=false;
      }else{
        scope.view.customhamburger.flxLegalEntityHamburger.isVisible=false;
        if(kony.application.getCurrentForm().id === "frmEnrollBusiness"){
          scope.view.flxHeaderMain.width = "88%";
        }
        else {
          scope.view.flxHeaderMain.width = "1366dp";
        }
        scope.view.flxHeaderMain.centerx="50%";
        scope.view.flxHeaderMain.centerX="50%";

        if(width === 1920 || width >1366) {
          scope.view.flxTopmenu.top="70dp";
          //scope.view.flxImgKony.left="83dp";
          scope.view.headermenu.width="1200dp";
          scope.view.headermenu.centerX="50%";
          //scope.view.topmenu.width="1200dp";
          scope.view.topmenu.btnHamburger.left="110px";
          scope.view.topmenu.centerX="50%";
            scope.view.flxHeaderMain.width="100%";
           scope.view.topmenu.width="100%";
          //scope.view.flxHeaderMain.left = "4.5%";
        }

        //scope.view.headermenu.right="-7dp";
        //scope.view.topmenu.flxCombinedAccess.right="-7dp";
        //scope.view.topmenu.flxCombined.right="-10dp";
        scope.view.flxTopmenu.width = "100%";
        scope.view.topmenu.flxMenusMain.width = "100%"
        //scope.view.topmenu.btnHamburger.left = "0dp";
        scope.view.topmenu.btnHamburger.width="45dp";
        //scope.view.topmenu.imgMenu.left= "-2dp";

        //scope.view.topmenu.flxFeedback.right="-3.5%";
        scope.view.topmenu.flxFeedback.width="130dp";
        //scope.view.topmenu.lblFeedback.right = "0px";
        //scope.view.topmenu.flxverseperator2.right = "15dp"
        //scope.view.topmenu.flxHelp.right = "102dp";
        scope.view.topmenu.flxHelp.width = "50dp";
        //scope.view.topmenu.flxCombined.right = "0dp";
        scope.view.topmenu.lblHelp.centerx="50%";
        scope.view.topmenu.lblHelp.centerX = "50%";
        scope.view.flxImgKony.isVisible=true;
        scope.view.imgKony.isVisible=true;
        //scope.view.flxImgKony.left="0dp";
        //scope.view.flxImgKony.width="100dp";

        scope.view.customhamburger.width = "100%";
        if(kony.os.deviceInfo().screenWidth=="1024"){
           scope.view.customhamburger.flxClose.left= "84%";
        }
        else{
        scope.view.customhamburger.flxClose.left= "88%";
        }
      }
      scope.view.flxHamburger.width = "100%";

      if(width==640 || orientationHandler.isMobile){
        this.view.topmenu.flxTransfersAndPay.onTouchEnd = null;
      }else if(width==1024 || orientationHandler.isTablet){
        this.view.topmenu.flxTransfersAndPay.onTouchEnd = null;
      } 
      if (width === 640) {
        this.view.topmenu.flxaccounts.isVisible = false;
        this.view.topmenu.flxSeperator1.isVisible = false;
        this.view.topmenu.flxTransfersAndPay.isVisible = false;
        this.view.headermenu.isVisible = false;
      } else {
        this.view.headermenu.isVisible = false;
        if (!this.isPreLoginView) {
          this.view.topmenu.flxaccounts.isVisible = true;
          this.view.topmenu.flxSeperator1.isVisible = true;
          this.view.topmenu.flxTransfersAndPay.isVisible = true;
        }else{
          this.view.headermenu.isVisible = true;
        }
      }
      str = kony.i18n.getCurrentLocale();
      if (str === "ar_AE") {
        this.view.headermenu.lblImageLogout.text = "/";
        this.view.topmenu.btnHamburger.skin = "btnHamburgerRtlskn";
      } else {
        this.view.headermenu.lblImageLogout.text = "l";
        this.view.topmenu.btnHamburger.skin = "btnHamburgerskn";
      }

      /* dropdown visibility check for single/multi entity flow */
      let singleEntityValue = "true";
      if (applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity") !== undefined) {
        singleEntityValue = applicationManager.getConfigurationManager().configurations.getItem("isSingleEntity");
      }
      let userLegalEntitesSize = applicationManager.getMultiEntityManager().getUserLegalEntitiesSize();
      if (singleEntityValue === "false") {
        this.view.headermenu.flxLegalEntity.setEnabled(true);
        this.view.customhamburger.flxLegalEntityHamburger.setEnabled(true);
        if (userLegalEntitesSize > 0) {
          if (kony.application.getCurrentBreakpoint() === 640) {
            this.view.customhamburger.flxLegalEntityHamburger.setVisibility(true);
          } else {
            this.view.headermenu.flxLegalEntity.setVisibility(true);
            this.view.headermenu.flxVerticalSeperator4.setVisibility(true);
          }
          if (userLegalEntitesSize === 1) {
            this.view.headermenu.flxLegalEntity.setEnabled(false);
            this.view.customhamburger.flxLegalEntityHamburger.setEnabled(false);
          }
        } else {
          this.view.customhamburger.flxLegalEntityHamburger.setVisibility(false);
          this.view.headermenu.flxLegalEntity.setVisibility(false);
          this.view.headermenu.flxVerticalSeperator4.setVisibility(false);
        }
      } else {
        this.view.customhamburger.flxLegalEntityHamburger.setVisibility(false);
        this.view.headermenu.flxLegalEntity.setVisibility(false);
        this.view.headermenu.flxVerticalSeperator4.setVisibility(false);
      }
      this.view.flxHamburgerBack.height = getTotalHeight() + "px";
      this.view.flxHamburger.height = getTotalHeight() + "px";
      this.view.customhamburger.flxMenuWrapper.top = "0dp";
      this.view.customhamburger.flxMenu.height = getTotalHeight() -2 + "px";
      this.view.customhamburger.flxScroll.height = getTotalHeight()-60 + "px";
      this.view.forceLayout();
    },
    isPreLoginView: false,
    showPreLoginView: function(){
      this.isPreLoginView = true;
      //this.view.flxBottomContainer.setVisibility(false);
      if(orientationHandler.isMobile || kony.application.getCurrentBreakpoint()==640){
        this.view.topmenu.flxMenusMain.setVisibility(false);
        this.view.flxTopmenu.setVisibility(true);
        this.view.flxBottomBlue.setVisibility(true);
      }else{
        this.view.height = "70dp";
                this.view.parent.height = "70dp";
                this.view.flxHeaderMain.height = "70dp";
                this.view.flxTopmenu.setVisibility(false);
                this.view.flxBottomContainer.setVisibility(false);
                this.view.flxBottomContainer.top = "0px";
                this.view.flxBottomContainer.height = "70dp";
                this.view.flxBottomBlue.setVisibility(true);
                this.view.flxSeperatorHor2.top = "70dp";
                this.view.headermenu.setVisibility(true);
                // this.view.topmenu.flxNotifications.isVisible = false;
                // this.view.topmenu.flxMessages.isVisible = false;
                // this.view.topmenu.flxVerticalSeperator1.isVisible = false;
                // this.view.topmenu.flxVerticalSeperator3.isVisible = false;
                // this.view.topmenu.flxResetUserImg.isVisible = false;
                // this.view.topmenu.flxUserId.isVisible = false;
                // // this.view.topmenu.btnLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.login");
                // this.view.topmenu.btnLogout.setVisibility(true);
                 //this.view.headermenu.imgLogout.src = "logout.png";
                 this.view.headermenu.imgLogout.setVisibility(true);
                 this.view.headermenu.imgLogout.width="36px";
                 this.view.headermenu.imgLogout.height="36px";
                 this.view.headermenu.imgLogout.src="logout_active.png";
                // //this.view.topmenu.imgLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.login");
                // this.view.topmenu.flxWarning.right = "40dp";
                this.view.headermenu.flxNotifications.isVisible = false;
                this.view.headermenu.flxMessages.isVisible = false;
                this.view.headermenu.flxVerticalSeperator1.isVisible = false;
                this.view.headermenu.flxVerticalSeperator3.isVisible = false;
                this.view.headermenu.flxResetUserImg.isVisible = false;
                this.view.headermenu.flxUserId.isVisible = false;
                this.view.headermenu.flxVerticalSeperator2.setVisibility(false);
                this.view.headermenu.flxWarning.right="0px";
                //this.view.headermenu.btnLogout.setVisibility(true);
                //this.view.headermenu.imgLogout.src = "login_icon_locateus.png";
                this.view.headermenu.flxWarning.right = "40dp";
                this.view.headermenu.flxWarning.setVisibility(true);
      }
    },
     messageonHoverEventCallback: function(widget, context) {
      var scope=this;
  // Check the event type (MOUSE_ENTER, MOUSE_LEAVE)
  if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
    // On mouse enter, change the image source to the hover image
   scope.view.topmenu.imgMessage.src="messages_hover.png";
  } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
    // On mouse leave, change it back to the default image
    scope.view.topmenu.imgMessage.src="messages_active.png";
  }
},
UseronHoverEventCallback: function(widget, context) {
            var scope = this;
            if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
                // On mouse enter, change the image source to the hover image
                if (scope.view.topmenu.imgUserReset.src == "profile_active.png" && (scope.view.topmenu.imgUserReset.base64 == "" || scope.view.topmenu.imgUserReset.base64 == undefined ||scope.view.topmenu.imgUserReset.base64=="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")) {
                    scope.view.topmenu.imgUserReset.src = "profile_hover.png";
                }
            } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE && (scope.view.topmenu.imgUserReset.base64 == "" || scope.view.topmenu.imgUserReset.base64 == undefined||scope.view.topmenu.imgUserReset.base64=="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")) {
                // On mouse leave, change it back to the default image
                if (scope.view.topmenu.imgUserReset.src == "profile_hover.png") {
                    scope.view.topmenu.imgUserReset.src = "profile_active.png";
                }
            }
        },
notificationonHoverEventCallback:function(widget, context){
  var scope = this;
  if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
    // On mouse enter, change the image source to the hover image
   scope.view.topmenu.imgNotifications.src="notification_hover.png";
  } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
    // On mouse leave, change it back to the default image
    scope.view.topmenu.imgNotifications.src="notification_active.png";
  }
},
logoutonHoverEventCallback:function(widget, context){
  var scope = this;
  if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
    // On mouse enter, change the image source to the hover image
   scope.view.topmenu.imgLogout.src="logout_hover.png";
  } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
    // On mouse leave, change it back to the default image
    scope.view.topmenu.imgLogout.src="logout_active.png";
  }
},
    showPostLoginView: function(){
      this.view.headermenu.setVisibility(false);
      var scope=this;
      //this.view.FlexContainer01.onHover = onHoverEventCallback
      scope.view.topmenu.flxMessages.onHover=this.messageonHoverEventCallback;
      // scope.view.topmenu.flxMessages.onHover=function(){
      //   scope.view.topmenu.imgMessage.src="messages_hover.png";
      // }
      scope.view.topmenu.flxResetUserImg.onHover=this.UseronHoverEventCallback;
      //   scope.view.topmenu.imgUserReset.src="profile_hover.png";
      // }
     scope.view.topmenu.flxNotifications.onHover=this.notificationonHoverEventCallback;
      //   scope.view.topmenu.imgNotifications.src="notification_hover.png";
      // }
       scope.view.topmenu.flxLogoutMain.onHover=this.logoutonHoverEventCallback;
      //   scope.view.topmenu.imgLogout.src="logout_hover.png";
      // }
      var configurationManager = applicationManager.getConfigurationManager();
      var isRetailUser = applicationManager.getConfigurationManager().getConfigurationValue('isRBUser') === "true";
      this.isPreLoginView = false;

      if(orientationHandler.isMobile || kony.application.getCurrentBreakpoint()==640){
        this.view.topmenu.flxMenusMain.setVisibility(true);
        this.view.flxTopmenu.setVisibility(true);
        this.view.flxBottomBlue.setVisibility(true);
          scope.view.topmenu.flxLogoutMain.setVisibility(false);
          scope.view.topmenu.flxNotifications.setVisibility(false);
          scope.view.topmenu.flxResetUserImg.setVisibility(false);
          scope.view.topmenu.flxMessages.setVisibility(false);
      }else{
        this.view.height = "120dp";
        this.view.parent.height = "120dp";
        this.view.flxHeaderMain.height = "120dp";
        this.view.flxTopmenu.setVisibility(true);
        this.view.flxBottomContainer.setVisibility(true);
        this.view.flxBottomContainer.top="0px";
        this.view.flxBottomContainer.height = "120dp";
        this.view.flxBottomBlue.setVisibility(true);
        this.view.flxSeperatorHor2.top = "120dp";

        this.view.topmenu.flxNotifications.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
        if(isRetailUser){
          this.view.topmenu.flxVerticalSeperator3.isVisible = false;
          this.view.topmenu.flxMessages.isVisible = configurationManager.isMicroAppPresent(configurationManager.microappConstants.SECUREMESSAGE);
        //   if(this.view.topmenu.flxMessages.isVisible) {
        //     this.view.topmenu.flxMessages.right = "210dp";
        //   }
        // if(kony.application.getCurrentForm().id=="frmFirst"){
        //   this.view.topmenu.flxMessages.left = "571dp";
        // }else{
          this.view.topmenu.flxMessages.left = "500dp";
          if(kony.application.getCurrentBreakpoint()==1024){
            this.view.topmenu.flxMessages.left = "300dp";
            if(kony.os.deviceInfo().screenWidth>640 && kony.os.deviceInfo().screenWidth<920){
              this.view.topmenu.flxMessages.left = "200dp";
            }
          }
        // }
           
				// this.view.topmenu.flxMessages.width = "50dp";
				// this.view.topmenu.flxMessages.height = "40dp";
				  
				// this.view.topmenu.flxVerticalSeperator3.right = "190dp";
				// this.view.topmenu.imgMessage.width = "36dp";
				// this.view.topmenu.imgMessage.height = "36dp";

				// this.view.topmenu.flxNotifications.right = "130dp";
				// this.view.topmenu.flxNotifications.width = "50dp";
				// this.view.topmenu.flxNotifications.height = "40dp";
				
				// this.view.topmenu.flxVerticalSeperator1.right = "120dp";
				// this.view.topmenu.imgNotifications.width = "36dp";
				// this.view.topmenu.imgNotifications.height = "36dp";

				// this.view.topmenu.flxResetUserImg.right = "60dp";
				// this.view.topmenu.flxResetUserImg.width = "50dp";
				// this.view.topmenu.flxResetUserImg.height = "40dp";
				// this.view.topmenu.imgUserReset.width = "36dp";
				// this.view.topmenu.imgUserReset.height = "36dp";

				// this.view.topmenu.flxVerticalSeperator2.right = "50dp";
				// this.view.topmenu.imgLogout.right = "5dp";
				// this.view.topmenu.imgLogout.width = "36dp";
				// this.view.topmenu.imgLogout.height = "36dp";
        this.view.topmenu.imgMessage.src="messages_active.png";
        this.view.topmenu.imgNotifications.src="notification_active.png";
        this.view.topmenu.imgUserReset.src="profile_active.png";
        this.view.topmenu.imgLogout.src="logout_active.png";
        }
        this.view.topmenu.flxVerticalSeperator1.isVisible = false;
        this.view.topmenu.flxResetUserImg.cursorType = "pointer";
        this.view.topmenu.flxResetUserImg.isVisible = true;
        //this.view.topmenu.flxUserId.isVisible = true;            
        //this.view.topmenu.btnLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.logout");
        // this.view.topmenu.imgMessages.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message");
        //this.view.headermenu.lblNotifications.toolTip = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Alerts");
        //this.view.topmenu.imgUserReset.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
        //this.view.topmenu.btnLogout.setVisibility(true);
        this.view.topmenu.imgLogout.src = "logout_active.png";
        // this.view.topmenu.imgLogout.toolTip = kony.i18n.getLocalizedString("i18n.common.logout");
        this.view.headermenu.flxWarning.setVisibility(false);
      }
    }
  };
});