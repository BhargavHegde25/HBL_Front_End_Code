define(['./KonyLogger'], function (konyLoggerModule) {
  var konymp = konymp || {};

  konymp.logger = (new konyLoggerModule("HID Approve SDK NativeControllerAndroid Component")) || function () { };
  var NativeControllerAndroid = function (componentInstance, viewControllerInstance) {
    konymp.logger.trace("-- Start constructor NativeControllerAndroid --", konymp.logger.FUNCTION_ENTRY);
    this.componentInstance = componentInstance;
    this.viewControllerInstance = viewControllerInstance;
    this.importAllPackages();
    this.connectionConfiguration = null;
    konymp.logger.trace("-- Exit constructor NativeControllerAndroid -- ", konymp.logger.FUNCTION_EXIT);
  };

  /**
     * @api : importAllPackages
     * @description : api to import all required packages
     * @return : void
     */
  NativeControllerAndroid.prototype.importAllPackages = function () {

    this.konyMain = java.import("com.konylabs.android.KonyMain");
    this.konyContext = this.konyMain.getActivityContext();
    this.konyActivity = this.konyMain.getActContext();
    this.sdkWrapper = java.callStaticMethod("com.temenos.hidapprove.SDKWrapper", "getInstance");

  };

  /**
   * @api : doDeviceProvisioning
   * @description : This function creates a service/container.
   * @param : activationObj - The activation object is required.It should contain following keys- pushId,userId,serverURL, inviteCode.
   * @return : true/false - Returns true in case of successful service creation,otherwise false
   */
  NativeControllerAndroid.prototype.doDeviceProvisioning = function (activationObj, provisionCallBack) {
    try {
      if (this.sdkWrapper) {
        activationObj.deviceFriendlyName = kony.os.deviceInfo().name + " " + kony.os.deviceInfo().model;
        this.sdkWrapper.provisionContainer(this.konyContext, activationObj, provisionCallBack);
      }
    } catch (exception) {
      kony.application.dismissLoadingScreen();
    }
  };

  /**
   * @api : setContainerPin
   * @description : This function sets pin/password.
   * @param {string} pin 
   * @param {Function} pincallback 
   */
  NativeControllerAndroid.prototype.setContainerPin = function (pin, pincallback) {
    try {
      if (this.sdkWrapper) {
        this.sdkWrapper.setContainerPin(pin, pincallback);
      }
    } catch (exception) {
      kony.application.dismissLoadingScreen();
    }
  };

  /**
   * @api : updatePin
   * @description : This function used to update pin/password.
   * @param {string} userId 
   * @param {string} oldPin 
   * @param {string} newPin 
   * @param {Function} jsCallBack 
   */
  NativeControllerAndroid.prototype.updatePin = function (userId, oldPin, newPin, jsCallBack) {
    try {
      this.sdkWrapper.updatePin(this.konyContext, userId, oldPin, newPin, jsCallBack);
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  /**
   * @api : renewContainer
   * @description: This function helps to renew the container before expiry.
   * @param {string} noOfdaysBeforeExpiry 
   * @param {JSON} renewalObj 
   * @param {Function} jsCallBack 
   */
  NativeControllerAndroid.prototype.renewContainer = function (noOfdaysBeforeExpiry, renewalObj, jsCallBack) {
    try {
      this.sdkWrapper.renewContainer(this.konyContext, noOfdaysBeforeExpiry, renewalObj, jsCallBack);
    } catch (exception) {
      kony.application.dismissLoadingScreen();
      jsCallBack(0);
    }
  };

  /**
   * @api : generateSynchronousOTP
   * @description : This function used to login by passing userid
   * @param {string} userId 
   * @param {Function} sdkCallBack 
   */
  NativeControllerAndroid.prototype.generateSynchronousOTP = function (userId, sdkCallBack) {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.generateSynchronousOTP(this.konyContext, this.konyActivity, userId, "OATH_time", sdkCallBack);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  /**
   * @api : generateOCRAOTP
   * @description : This function used in transactions
   * @param {string} userId 
   * @param {string} txInput 
   * @param {Function} sdkCallBack 
   */
  NativeControllerAndroid.prototype.generateOCRAOTP = function (userId, txInput, sdkCallBack) {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.generateOCRAOTP(this.konyContext, this.konyActivity, userId, txInput, "OATH_OCRA_time_SIGN", sdkCallBack);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  NativeControllerAndroid.prototype.updatePushRegistrationToken = function (pushId) {
    try {
      if (this.sdkWrapper) {
        this.sdkWrapper.updatePushRegistrationToken(this.konyContext, pushId);
      }
    } catch (exception) {
      kony.application.dismissLoadingScreen();
    }
  };

  /**
     * @api : getAllContainers
     * @description : API to return all containers in a device
     * @return : array of all containers
     */
  NativeControllerAndroid.prototype.getAllContainers = function () {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.getAllContainers(this.konyContext);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };


  NativeControllerAndroid.prototype.retrieveTransactionInfo = function (txId, sdkCallBack) {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.retrieveTransactionInfo(this.konyContext, txId.toString(), sdkCallBack);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };


  /**
     * @api : signTransaction
     * @description :API to sign the transaction on the basis of status{approve.deny}
     * @param : status - {approve / deny}
     * @param : transactionID - {tds from notification response}
     * @param : txInfo - 
     * @return : true/false - Returns true in case of successful transaction signing,otherwise false
     */
  NativeControllerAndroid.prototype.signTransaction = function (status, txInfo, sdkCallBack) {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.signTransaction(this.konyContext, this.konyActivity, status, txInfo, sdkCallBack);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  NativeControllerAndroid.prototype.getUserPendingTransactions = function (userId) {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.getUserPendingTransactions(this.konyContext, userId);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };


  NativeControllerAndroid.prototype.isDeviceBiometricAvailable = function () {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.isDeviceBiometricAvailable(this.konyContext);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  NativeControllerAndroid.prototype.isBiometricEnabled = function (userId) {
    try {
      if (this.sdkWrapper) {
        return this.sdkWrapper.isBiometricEnabled(userId);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  NativeControllerAndroid.prototype.enableBiometricAuthentication = function (userId, password, jsCallBack) {
    try {
      if (this.sdkWrapper) {
        this.sdkWrapper.enableBiometricAuthentication(this.konyContext, userId, password, jsCallBack);
      }
    } catch (exception) {
      //alert(exception);
	  applicationManager.getPresentationUtility().Alert(exception);
    }
  };

  NativeControllerAndroid.prototype.setBiometricPrompt = function (userId, jsCallBack) {
    try {
      if (this.sdkWrapper) {
        this.sdkWrapper.setBiometricPrompt(this.konyContext, userId, jsCallBack);
      }
    } catch (exception) {
      alert(exception);
    }
  };

  NativeControllerAndroid.prototype.resetBiometricPrompt = function (userId) {
    try {
      if (this.sdkWrapper) {
        this.sdkWrapper.resetBiometricPrompt(userId);
      }
    } catch (exception) {
      alert(exception);
    }
  };


  NativeControllerAndroid.prototype.isFaceIDSupport = function () {
    return false;
  };

  return NativeControllerAndroid;
});