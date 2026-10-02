define(['./countryCodeControllerNew','ApplicationManager', 'OLBConstants'],function (countryCodeControllerNew,ApplicationManager, OLBConstants) {

  return {

    contructor: function () {
      this.countryCodeControllerNew = new countryCodeControllerNew();
      this.userNameStatusIdMap = new Map();
      this.userNameUserIdMap = new Map();
    },

    sknErrorFlex: "sknborderff0000error",
    sknNormalFlex: "sknBorderE3E3E3",
    sknFocusSkin: "sknFlxBorder4A90E23px",
    sknBlockedBtn: "sknBtnBlockedSSP0273e315px",
    sknNormalBtn: "sknBtnNormalSSPFFFFFF15Px",
    sknHoverBtn: "sknBtnNormalSSPFFFFFFHover15Px",
    sknFocusBtn: "sknBtnNormalSSPFFFFFF15PxFocus",

    preshow: function () {
      this.resetScopeVariables();
      this.setFlowActions();
      this.view.btnProceed.skin= "sknBtnBlockedSSP0273e315px";
      this.view.regenerateCode.fontIconOption.skin = "sknFontIconSignin0273E324Px";
      this.validationUtilManager = ApplicationManager.getApplicationManager().getValidationUtilManager();
      if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SPOTLIGHT_DISABLE_SCA && OLBConstants.CLIENT_PROPERTIES.SPOTLIGHT_DISABLE_SCA.toUpperCase() === "FALSE") {
        this.view.signInNow.setVisibility(false);
        this.view.lostDevice.setVisibility(true);
      } else {
        this.view.signInNow.setVisibility(true);
        this.view.lostDevice.setVisibility(false);
      }
    },
    
    postShow: function () {
      this.onBreakpointChange();
      this.countryCodeDropDown();
      this.setAccessibilityValues();
    },
    countryCodeDropDown: function(){
      var self = this;
      var inputData;
      try {
          this.setCountryCodeList();
          self.view.tbxCountryCode.onTextChange = function() {
              self.view.flxCountryCodeDropdown.setVisibility(true);
              self.view.segCountryCodes.setVisibility(true);
              // self.isSegVisible = false;
              self.onSearchCountryCode("address");
            };
            self.view.segCountryCodes.onRowClick = this.getContextFromSegment.bind(this);
      }
          catch(err){
              var errorObj =
                  {
                    "errorInfo" : "Error in setDefaultAddressDetailsActions method" ,
                    "errorLevel" : "Business",
                    "error": err
                  };
              self.onError(errorObj);
            }
  },
  onSearchCountryCode : function(param) {
      var scope = this;
      var searchString;
      try {
        var tempCountryList = new countryCodeControllerNew();
        if(this.view.tbxCountryCode.text === null && this.view.tbxCountryCode.text === ""){
          if(param === "address")
            this.view.tbxCountryCode.text = "";
        } 
        else {
           kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
          var sectionDataCountryCode = [];
          var recordCountryCode = {};
          if(param === "address")
            searchString = this.view.tbxCountryCode.text;
          else
            searchString = this.view.tbxCountryCode.text;
          searchString = searchString.toLowerCase();
          for(var i=0;i<tempCountryList.countryCodeList.countries.length;i++) {
            tempCountryList.countryCodeList.countries[i].name = tempCountryList.countryCodeList.countries[i].name.toLowerCase();
          }
          for(var i=0;i<tempCountryList.countryCodeList.countries.length;i++) {
          //   if(!this.isEmptyNullUndefined(searchString)) {
          if( searchString !== null && searchString !==''){
              if(tempCountryList.countryCodeList.countries[i].name.includes(searchString) || tempCountryList.countryCodeList.countries[i].code.includes(searchString)){
                recordCountryCode = {"lblCountryCode" : this.countryCodeControllerNew.countryCodeList.countries[i].name + " ("+this.countryCodeControllerNew.countryCodeList.countries[i].code+")",code : this.countryCodeControllerNew.countryCodeList.countries[i].code};
                sectionDataCountryCode.push(recordCountryCode);
              }
            }
            else{
              for(var i=0;i<this.countryCodeControllerNew.countryCodeList.countries.length;i++){
                recordCountryCode = {"lblCountryCode" : this.countryCodeControllerNew.countryCodeList.countries[i].name + " ("+this.countryCodeControllerNew.countryCodeList.countries[i].code+")",code : this.countryCodeControllerNew.countryCodeList.countries[i].code};
                sectionDataCountryCode.push(recordCountryCode);
              }
            }
          }
          if(sectionDataCountryCode.length>0) {
            if(param === "address")
              this.view.segCountryCodes.setData(sectionDataCountryCode);
            else
              this.view.segCountryCodes.setData(sectionDataCountryCode);
          }
          this.view.forceLayout();
          kony.application.dismissLoadingScreen();
        }
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in onSearchCountryCode method" ,
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    getContextFromSegment: function(){
      var scope = this;
      var countryCode;
      try {
      
        let rowindex = Math.floor(scope.view.segCountryCodes.selectedRowIndex[1]);
        let segData = scope.view.segCountryCodes.data[rowindex];
        countryCode = segData['code'];
        this.view.tbxCountryCode.text = countryCode;
      //   this.view.flxCountryCode.setVisibility(false);
        // this.updateContext("tbxCountryCode", countryCode);
        scope.view.flxCountryCodeDropdown.setVisibility(false);
        scope.view.segCountryCodes.setVisibility(false);
        this.view.forceLayout();
      }
     catch(err){
      var errorObj =
          {
            "errorInfo" : "Error in getContextFromSegment method" ,
            "errorLevel" : "Business",
            "error": err
          };
      scope.onError(errorObj);
    }
  },
    setCountryCodeList : function(){
      this.countryCodeControllerNew = new countryCodeControllerNew();
      var self = this;
      try {
        
        // this.view.segCodeNameList.widgetDataMap = this.getCountryCodeWidgetDataMap();
        this.view.segCountryCodes.widgetDataMap = this.getCountryCodeWidgetDataMap();
        var sectionDataCountryCode = [];
        var recordCountryCode = {};
        for(var i=0;i<this.countryCodeControllerNew.countryCodeList.countries.length;i++){
          recordCountryCode = {"lblCountryCode" : this.countryCodeControllerNew.countryCodeList.countries[i].name + " ("+this.countryCodeControllerNew.countryCodeList.countries[i].code+")",code : this.countryCodeControllerNew.countryCodeList.countries[i].code};
          sectionDataCountryCode.push(recordCountryCode);
        }
        // this.view.segCodeNameList.setData(sectionDataCountryCode);
        this.view.segCountryCodes.setData(sectionDataCountryCode);
        this.view.forceLayout();
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setDataList method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    getCountryCodeWidgetDataMap : function(){
      var self = this;
      try {
        return {
          "flxCountryCodeList" : "flxCunCode",
          "lblCountryCode" : "lblCountryCode"
        };
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in getCountryCodeWidgetDataMap method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    setAccessibilityValues: function () {
      this.view.flxClose.accessibilityConfig = {
        a11yLabel: "close",
        a11yARIA: {
          "role": "button",
        },
      };
      this.view.tbxEmailAddress.accessibilityConfig = {
        a11yARIA: {
          "aria-required": true,
          "role": "textbox",
          "aria-labelledby": "lblEmailAddress",
        },
      };
      this.view.tbxCountryCode.accessibilityConfig = {
        a11yLabel: "Country Code",
        a11yARIA: {
          "aria-required": true,
          "role": "textbox",
        },
      };
      this.view.tbxMobileNumber.accessibilityConfig = {
        a11yARIA: {
          "aria-required": true,
          "role": "textbox",
          "aria-labelledby": "lblMobileNumber",
        },
      };
      this.view.DateInput.tbxDateInputKA.accessibilityConfig = {
        a11yLabel: this.view.lblDOB.text,
        a11yARIA: {
          "aria-required": true,
          "role": "textbox",
          "aria-placeholder":this.view.DateInput.lblDatePlaceholderKA.text
        },
      };
      this.view.DateInput.lblEnteredDateKA.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.DateInput.lblDatePlaceholderKA.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.flxRefresh.accessibilityConfig = {
        a11yLabel: "refresh",
        a11yARIA: {
          "role": "button",
        },

      }
      this.view.tbxCaptcha.accessibilityConfig = {
        a11yARIA: {
          "aria-required": true,
          "role": "textbox"
        },
      };
      this.view.btnProceed.accessibilityConfig = {
        a11yARIA: {
          "role": "button",
        },
      };
    },

    resetScopeVariables: function () {
      this.userNameStatusIdMap = new Map();
      this.userNameUserIdMap = new Map();
    },

    setFlowActions: function () {
      let scopeObj = this;
      scopeObj.view.flxContent.onClick =function(){
        scopeObj.view.flxCountryCodeDropdown.setVisibility(false);
    }
      scopeObj.view.tbxEmailAddress.onKeyUp = function () {
        scopeObj.enableContinue();
      };
	  scopeObj.view.tbxMobileNumber.onTextChange = function() {
		  scopeObj.view.tbxMobileNumber.text = scopeObj.view.tbxMobileNumber.text.replace(/\D/g, "");
      if (scopeObj.view.tbxCountryCode.text == "+977" && scopeObj.view.tbxMobileNumber.text.length > 10) {
        str = scopeObj.view.tbxMobileNumber.text;
        scopeObj.view.tbxMobileNumber.text = str.slice(0, -1);
      }else if (scopeObj.view.tbxCountryCode.text == "" && scopeObj.view.tbxMobileNumber.text.length > 10) {
        str = scopeObj.view.tbxMobileNumber.text;
        scopeObj.view.tbxMobileNumber.text = str.slice(0, -1);
      }
      else if (scopeObj.view.tbxMobileNumber.text.length > 30){
        str = scopeObj.view.tbxMobileNumber.text;
        scopeObj.view.tbxMobileNumber.text = str.slice(0, -1);
      }
		  scopeObj.enableContinue();
	  };
	  scopeObj.view.tbxEmailAddress.onTextChange =function(){
		  scopeObj.view.tbxEmailAddress.text =scopeObj.view.tbxEmailAddress.text.replace(/[`~#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/g, "");// removed '_'
      scopeObj.view.tbxEmailAddress.text =scopeObj.view.tbxEmailAddress.text.toLowerCase();
			scopeObj.enableContinue();
	  };
      scopeObj.view.tbxAccountNumber.onTextChange = function() {
		  scopeObj.view.tbxAccountNumber.text=scopeObj.view.tbxAccountNumber.text.replace(/\D/g, "");
      if ( scopeObj.view.tbxAccountNumber.text.length > 30) {
        str = scopeObj.view.tbxAccountNumber.text;
        scopeObj.view.tbxAccountNumber.text = str.slice(0, -1);
    }
		  scopeObj.enableContinue();
	  };
	  scopeObj.view.tbxAccountHolderName.onTextChange = function() {
		  scopeObj.view.tbxAccountHolderName.text=scopeObj.view.tbxAccountHolderName.text.replace(/[!@$%^*_+\=\[\]{};:"|<>?`~]+/g, "");
      if ( scopeObj.view.tbxAccountHolderName.text.length > 65) {
        str = scopeObj.view.tbxAccountHolderName.text;
        scopeObj.view.tbxAccountHolderName.text = str.slice(0, -1);
      }
		  scopeObj.enableContinue();
	  };
      scopeObj.view.tbxEmailAddress.onTouchStart = function () {
        // scopeObj.view.flxEmailAddress.skin = scopeObj.sknFocusSkin;
      };

      scopeObj.view.tbxEmailAddress.onEndEditing = function () {
        // scopeObj.view.flxEmailAddress.skin = scopeObj.sknNormalFlex;
      };

      scopeObj.view.tbxCountryCode.onKeyUp = function () {
        scopeObj.enableContinue();
      };

      scopeObj.view.tbxCountryCode.onTouchStart = function () {
        // scopeObj.view.flxCountryCode.skin = scopeObj.sknFocusSkin;
      };

      scopeObj.view.tbxCountryCode.onEndEditing = function () {
        // scopeObj.view.flxCountryCode.skin = scopeObj.sknNormalFlex;
      };

      scopeObj.view.tbxCountryCode.onTouchStart = function() {
        scopeObj.view.flxCountryCodeDropdown.setVisibility(true);
        scopeObj.view.segCountryCodes.setVisibility(true);
      };

      scopeObj.view.tbxMobileNumber.onKeyUp = function () {
        scopeObj.enableContinue();
      };

      scopeObj.view.tbxMobileNumber.onTouchStart = function () {
        // scopeObj.view.flxMobileNumber.skin = scopeObj.sknFocusSkin;
      };

      scopeObj.view.tbxMobileNumber.onEndEditing = function () {
        // scopeObj.view.flxMobileNumber.skin = scopeObj.sknNormalFlex;
      };

      scopeObj.view.tbxCaptcha.onKeyUp = function () {
        scopeObj.enableContinue();
      };

      scopeObj.view.tbxCaptcha.onTouchStart = function () {
        // scopeObj.view.flxCaptchaText.skin = scopeObj.sknFocusSkin;
      };

      scopeObj.view.tbxCaptcha.onEndEditing = function () {
        // scopeObj.view.flxCaptchaText.skin = scopeObj.sknNormalFlex;
      };
      
      scopeObj.view.lstBoxSelectUsername.onSelection = function () {
        let isNoUser = scopeObj.view.lstBoxSelectUsername.selectedKey === "";
        scopeObj.view.lblUsername.text = isNoUser ? kony.i18n.getLocalizedString("i18n.login.CantSignIn.Selectyourusername") : kony.i18n.getLocalizedString("i18n.login.UserName");
        scopeObj.view.flxInfoIcon.setVisibility(isNoUser);
        scopeObj.onUserNameSelection(scopeObj.view.lstBoxSelectUsername.selectedKey);
      };
    },

    onBreakpointChange: function () {
      let scopeObj = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      let isMobilebreakpoint = (breakpoint === 640 || breakpoint === 768);
      if (isMobilebreakpoint || breakpoint === 1024) {
        // scopeObj.view.flxLetsVerifyCntr.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.flxHeader.height = "120dp";
        scopeObj.view.flxLetsVerifyCntr.height = "100dp";
        scopeObj.view.flxLetsVerifyCntr.top = "20dp";
        // scopeObj.view.flxUserVerify.centerX = "50%";
        scopeObj.view.lblLetsVerify.width = "";
        // scopeObj.view.lblLetsVerify.centerX = "50%";
        scopeObj.view.lblSelectedEntity.setVisibility(false);
        scopeObj.view.lblCallUs.setVisibility(false);
        scopeObj.view.lblLetsVerify.skin = "sknSupportedFileTypesHBL";
        scopeObj.view.lblLetsVerify.top = "0dp";
        scopeObj.view.flxWelcomeBackHeader.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.flxWelcomeBackHeader.height = "100dp";
        scopeObj.view.flxWelcomeBackImg.centerX = "50%";
        scopeObj.view.lblWelcomeBack.centerX = "50%";
        scopeObj.view.lblWelcomeBack.width = "";
        scopeObj.view.flxCaptcha.top = "15dp";
        scopeObj.view.btnProceed.top = "15dp";
        scopeObj.view.lblCallUs.top = "15dp";
      } else {
        scopeObj.view.flxLetsVerifyCntr.layoutType = kony.flex.FLOW_HORIZONTAL;
        scopeObj.view.flxHeader.height = "70dp";
        scopeObj.view.flxHeader.top = "30dp";
        scopeObj.view.flxLetsVerifyCntr.height = "60dp";
        scopeObj.view.flxLetsVerifyCntr.top = "0dp";
        scopeObj.view.flxUserVerify.centerX = "";
        scopeObj.view.lblLetsVerify.skin = "sknSupportedFileTypesHBL";
        scopeObj.view.lblLetsVerify.width = "75%";
        scopeObj.view.lblLetsVerify.centerX = "";
        scopeObj.view.lblLetsVerify.top = "10dp";
        scopeObj.view.flxWelcomeBackHeader.layoutType = kony.flex.FLOW_HORIZONTAL;
        scopeObj.view.flxWelcomeBackHeader.height = "60dp";
        scopeObj.view.flxWelcomeBackImg.centerX = "";
        scopeObj.view.lblWelcomeBack.centerX = "";
        scopeObj.view.lblWelcomeBack.width = "75%";
        scopeObj.view.flxCaptcha.top = "25dp";
        scopeObj.view.btnProceed.top = "30dp";
        scopeObj.view.lblCallUs.top = "30dp";
      }
      scopeObj.setSkins();
    },

    setSkins: function (isMobilebreakpoint) {
      let scopeObj = this;
      scopeObj.sknNormalBtn = isMobilebreakpoint ? "sknBtnNormalSSPFFFFFF13Px" : "sknBtnNormalSSPFFFFFF15Px";
      scopeObj.hoverSkin = isMobilebreakpoint ? "sknBtnNormalSSPFFFFFFHover13Px" : "sknBtnNormalSSPFFFFFFHover15Px";
      scopeObj.focusSkin = isMobilebreakpoint ? "sknBtnNormalSSPFFFFFF13PxFocus" : "sknBtnNormalSSPFFFFFF15PxFocus";
      scopeObj.sknBlockedBtn = isMobilebreakpoint ? "sknBtnBlockedSSP0273e313px" : "sknBtnBlockedSSP0273e315px";
      scopeObj.view.lblLetsVerify.skin = isMobilebreakpoint ? "sknLblSSP42424215px" : "sknSupportedFileTypesHBL";
      scopeObj.view.lblErrorMsg.skin = isMobilebreakpoint ? "sknlblSSPff000013px" : "sknLabelSSPFF000015Px";
      scopeObj.view.lblEmailAddress.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknSSPHBL";
      scopeObj.view.lblMobileNumber.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknSSPHBL";
      scopeObj.view.lblDOB.skin = isMobilebreakpoint ? "sknLblSSP72727213px" : "sknLblSSP72727215px";
      scopeObj.view.lblCallUs.skin = isMobilebreakpoint ? "sknLblSSP42424213px" : "sknSSP42424215Px";
      scopeObj.view.tbxEmailAddress.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "skntbxSSP42424215pxnoborder";
      scopeObj.view.tbxMobileNumber.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "skntbxSSP42424215pxnoborder";
      scopeObj.view.tbxCountryCode.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "skntbxSSP42424215pxnoborder";
      //scopeObj.view.tbxDOB.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "sknTbxSSP42424215PxWithoutBorder";
      scopeObj.view.tbxCaptcha.skin = isMobilebreakpoint ? "sknTbxSSP42424213PxWithoutBorder" : "skntbxSSP42424215pxnoborder";
      scopeObj.view.lblWelcomeBack.skin = isMobilebreakpoint ? "sknLblSSP42424215px" : "sknSupportedFileTypes";
      scopeObj.view.lblUsername.skin = isMobilebreakpoint ? "sknLblSSP42424215px" : "sknSupportedFileTypes";
      scopeObj.view.resetPassword.rtxCVV.skin = isMobilebreakpoint ? "sknSSPLight0273E313Px" : "sknSSPLight0273E315Px";
      scopeObj.view.signInNow.rtxCVV.skin = isMobilebreakpoint ? "sknSSPLight0273E313Px" : "sknSSPLight0273E315Px";
      scopeObj.view.regenerateCode.lblName.skin = isMobilebreakpoint ? "sknSSP4176a413px" : "sknSSP4176a415px";
    },

    resetUI: function () {
      var navManager = applicationManager.getNavigationManager();
      let scopeObj = this;
      scopeObj.view.flxVerify.setVisibility(true);
      scopeObj.view.flxWelcomeBack.setVisibility(false);
      scopeObj.view.lblErrorMsg.setVisibility(false);
      scopeObj.view.flxOptions.setVisibility(true);
      scopeObj.view.flxRegenerateCode.setVisibility(false);
      scopeObj.view.tbxSelectedEntity.text = navManager.getCustomInfo("legalEntityName")?navManager.getCustomInfo("legalEntityName"):"";
      scopeObj.view.tbxSelectedEntity.setEnabled(false);
      scopeObj.view.tbxEmailAddress.text = "";
      scopeObj.view.tbxMobileNumber.text = "";
	  scopeObj.view.tbxAccountHolderName.text ="";
	  scopeObj.view.tbxAccountNumber.text ="";
      scopeObj.view.DateInput.setText("");
      scopeObj.view.tbxCaptcha.text = "";
      scopeObj.view.tbxCountryCode.text = "";
      scopeObj.view.flxEmailAddress.skin = scopeObj.sknNormalFlex;
      scopeObj.view.flxMobileNumber.skin = scopeObj.sknNormalFlex;
      scopeObj.view.flxDOB.skin = scopeObj.sknNormalFlex;
      scopeObj.view.flxCaptchaText.skin = scopeObj.sknNormalFlex;
      scopeObj.enableContinue();
	  scopeObj.view.imgClose.src = "bbcloseicon.png";
    },

    setUsers: function (users) {
      var scopeObj = this;
      let usersList = [];
      users.forEach(function (data) {
        var user = [];
        user.push(data.UserName);
        user.push(data.UserName);
        scopeObj.userNameStatusIdMap.set(data.UserName, data.Status_id);
        scopeObj.userNameUserIdMap.set(data.UserName, data.id);
        usersList.push(user);
      });
      scopeObj.view.lstBoxSelectUsername.masterData = usersList;
      scopeObj.view.lstBoxSelectUsername.selectedKey = this.view.lstBoxSelectUsername.masterData[0][0];
      scopeObj.view.flxVerify.setVisibility(false);
      scopeObj.view.flxWelcomeBack.setVisibility(true);
      scopeObj.onUserNameSelection(scopeObj.view.lstBoxSelectUsername.selectedKey);
    },
    
    setUserFlow : function (isOriginationFlow){
      this.isOriginationFlow=isOriginationFlow;
    },

    onUserNameSelection: function (selectedKey) {
      let scopeObj = this;
      if(this.isOriginationFlow){
        scopeObj.view.flxOptions.setVisibility(true);
        scopeObj.view.flxRegenerateCode.setVisibility(false);
      }else{
        if ('SID_CUS_NEW' === this.userNameStatusIdMap.get(selectedKey)) {
          scopeObj.view.flxOptions.setVisibility(false);
          scopeObj.view.flxRegenerateCode.setVisibility(true);
        }
        else {
          scopeObj.view.flxOptions.setVisibility(true);
          scopeObj.view.flxRegenerateCode.setVisibility(false);
        }
      }

      scopeObj.view.forceLayout();
    },

    enableContinue: function () {
      let scopeObj = this;
      let isValidEmail = (scopeObj.view.tbxEmailAddress.text.trim() !== "") && (scopeObj.validationUtilManager.isValidEmail(scopeObj.view.tbxEmailAddress.text.trim())) ;
      let isValidMobile = (scopeObj.view.tbxMobileNumber.text.trim()) !== "" ;
            if(scopeObj.view.tbxCountryCode.text == "" || scopeObj.view.tbxCountryCode.text == "+977"){
                if(scopeObj.view.tbxMobileNumber.text.length ==10){
                 isValidMobile = true;
                }else{
                    isValidMobile = false;
                }
            }
      //let isValidDOB = (scopeObj.view.DateInput.getText() !== "") && (scopeObj.validationUtilManager.isDOBValid(scopeObj.view.DateInput.getText()));
	  let isValidAccNum = (scopeObj.view.tbxAccountNumber.text.trim() !== "");
      let isValidAccName = (scopeObj.view.tbxAccountHolderName.text.trim() !== "");
	  let isValidCatcha = (scopeObj.view.tbxCaptcha.text.trim() !== "");
      let isValidCountryCode = scopeObj.view.tbxCountryCode.text.trim() !== "" || scopeObj.view.tbxCountryCode.text.trim() == "";
      let isEnabled = isValidEmail && isValidMobile && isValidAccNum && isValidAccName && isValidCatcha && isValidCountryCode;
      scopeObj.view.btnProceed.setEnabled(isEnabled);
      scopeObj.view.btnProceed.skin = isEnabled ? scopeObj.sknNormalBtn : scopeObj.sknBlockedBtn;
      scopeObj.view.btnProceed.hoverSkin = isEnabled ? scopeObj.sknHoverBtn : scopeObj.sknBlockedBtn;
      scopeObj.view.btnProceed.focusSkin = isEnabled ? scopeObj.sknFocusBtn : scopeObj.sknBlockedBtn;
    },

    showError: function (errorMessage , flxCaptchaError) {
      let scopeObj = this;
      // Error msg text changed as suggested in AAC-7518
      scopeObj.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.login.CantSignIn.userDoesntExists");
      if (errorMessage)
        scopeObj.view.lblErrorMsg.text = errorMessage;
      scopeObj.view.lblErrorMsg.setVisibility(true);
      scopeObj.view.flxHeader.height = kony.application.getCurrentBreakpoint() <= 1024? "160dp": "130dp";
      if(flxCaptchaError)
        scopeObj.view.flxCaptchaText.skin = scopeObj.sknErrorFlex;
      else
        scopeObj.view.flxEmailAddress.skin = scopeObj.sknErrorFlex;
      scopeObj.view.forceLayout();
    },

    fetchUserIdOnUserName: function (userName) {
      return this.userNameUserIdMap.get(userName);
    }
  };
});
