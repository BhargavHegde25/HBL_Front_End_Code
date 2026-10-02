define(function () {
    return {
        constructor: function (baseConfig, layoutConfig, pspConfig) {
			kony.application.dismissLoadingScreen();
            this.view.showInfoPopup = this.showInfoPopup.bind(this);
            this.view.showConfirmationPopup = this.showConfirmationPopup.bind(this);
            this.view.showErrorPopup = this.showErrorPopup.bind(this);
            this.view.showAlertWithSkin = this.showAlertWithSkin.bind(this);
            this.view.showOnlyContinueButtonWithSkin = this.showOnlyContinueButtonWithSkin.bind(this);
            this.view.reset = this.reset.bind(this);
            this.view.flxShowAlert.onClick = this.doNothing.bind(this);
            this.view.flxalertheader.onClick = this.doNothing.bind(this);
            this.view.flxAlertMessage.onClick = this.doNothing.bind(this);
            this.view.flxButtonContainer.onClick = this.doNothing.bind(this);
            this.view.imgCross.onTouchEnd = this.dismiss.bind(this);
            this.view.onClick = this.dismiss.bind(this);
            this.reset();
        },

        initGettersSetters: function () {

        },
        doNothing: function () {

        },
        reset: function () {
            this.view.isVisible = false;
            this.view.btnCancel.isVisible = false;
            this.view.lblHeader.text = "";
            this.view.lblAlertMessage.text = "";
            this.view.btnOk.text = kony.i18n.getLocalizedString("kony.mb.common.OK");;
            this.view.btnOk.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
            this.view.btnOk.focusSkin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
            this.view.btnOk.onClick = this.dismiss.bind(this);
            this.view.btnCancel.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
            this.view.btnCancel.onClick = this.dismiss.bind(this);
            this.view.btnCancel.skin = "sknHBLBtnf3e9e9Rounded8px851a1c100pr";
            this.view.btnCancel.focusSkin = "sknHBLBtn851a1cRounded8pxffffff100pr";
      			this.view.imgCross.isVisible = true;
      			this.view.onClick = this.dismiss.bind(this);
        },
        dismiss: function () {
            this.view.isVisible = false;
        },
        show: function () {
            this.view.isVisible = true;
            this.view.forceLayout();
        },

        showInfoPopup: function (header, msg, yesHandler, yesLabel, noHandler, noLabel, customConfig) {
            try{
            scope = this;
            this.view.lblAlertMessage.text = msg;
            if (header) {
                this.view.lblHeader.text = header;
            } else {
                this.view.lblHeader.text = kony.i18n.getLocalizedString("kony.mb.SupportInfo.Title");
            }

            if (yesLabel) {
                this.view.btnOk.text = yesLabel;
            } else {
                this.view.btnOk.text = kony.i18n.getLocalizedString("kony.mb.common.OK");;
            }
            if (yesHandler){
                this.view.btnOk.onClick = function () {
                    scope.dismiss();
                    yesHandler(true);
                };
            }
            this.view.btnOk.isVisible = true;
            if (noLabel) {
                this.view.btnCancel.isVisible = true;
                this.view.btnCancel.text = noLabel;
            } else {
                this.view.btnCancel.isVisible = false;
            }
            if (noHandler){
                this.view.btnCancel.onClick = function () {
                    scope.dismiss();
                    noHandler(false);
                };
            }
            
          if(customConfig){
      				if(customConfig.hideCloseButton){
      					this.view.imgCross.isVisible = false;
      				}
      				if(customConfig.disableTouchDismiss){
      					this.view.onClick = this.doNothing.bind(this);
      			}
    			}
			
            this.show();
            }
            catch (err) {
                kony.print("Error in showInfoPopup: " + JSON.stringify(err));
            }
        },

        showConfirmationPopup: function (header, msg, yesHandler, yesLabel, noHandler, noLabel, customConfig) {
            try{
            scope = this;
            this.view.lblAlertMessage.text = msg;
            if (header) {
                this.view.lblHeader.text = header;
            } else {
                this.view.lblHeader.text = kony.i18n.getLocalizedString("kony.mb.MM.Confirmation");
            }

            if (yesLabel) {
                this.view.btnOk.text = yesLabel;
            } else {
                this.view.btnOk.text = kony.i18n.getLocalizedString("kony.mb.common.OK");;
            }
            if (yesHandler){
                this.view.btnOk.onClick = function () {
                    scope.dismiss();
                    yesHandler(true);
                };
            }
            this.view.btnOk.isVisible = true;
            if (noLabel) {
                this.view.btnCancel.isVisible = true;
                this.view.btnCancel.text = noLabel;
            } else {
                this.view.btnCancel.isVisible = false;
            }
            if (noHandler){
                this.view.btnCancel.onClick = function () {
                    scope.dismiss();
                    noHandler(false);
                };
            }
			
    			if(customConfig){
    				if(customConfig.hideCloseButton){
    					this.view.imgCross.isVisible = false;
    				}
    				if(customConfig.disableTouchDismiss){
    					this.view.onClick = this.doNothing.bind(this);
    				}
    			}
			
                this.show();
            }
            catch (err) {
                kony.print("Error in showConfirmationPopup: " + JSON.stringify(err));
            }
        },

        showErrorPopup: function (header, msg, yesHandler, yesLabel, noHandler, noLabel, customConfig) {
            try{
            scope = this;
            this.view.lblAlertMessage.text = msg;
            if (header) {
                this.view.lblHeader.text = header;
            } else {
                this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.payments.error");
            }

            if (yesLabel) {
                this.view.btnOk.text = yesLabel;
            } else {
                this.view.btnOk.text = kony.i18n.getLocalizedString("kony.mb.common.OK");;
            }
            if (yesHandler){
                this.view.btnOk.onClick = function () {
                    scope.dismiss();
                    yesHandler(true);
                };
            }
            this.view.btnOk.isVisible = true;
            if (noLabel) {
                this.view.btnCancel.isVisible = true;
                this.view.btnCancel.text = noLabel;
            } else {
                this.view.btnCancel.isVisible = false;
            }
            if (noHandler){
                this.view.btnCancel.onClick = function () {
                    scope.dismiss();
                    noHandler(false);
                };
            }
			
      			if(customConfig){
      				if(customConfig.hideCloseButton){
      					this.view.imgCross.isVisible = false;
      				}
      				if(customConfig.disableTouchDismiss){
      					this.view.onClick = this.doNothing.bind(this);
      				}
      			}
			
            this.show();
        }
            catch (err) {
                kony.print("Error in showErrorPopup: " + JSON.stringify(err));
            }
        },

        showAlertWithSkin: function (header, msg, showCancel, btnOkSkin, btnCancelSkin, btnOkHandler, btnCancelHandler, isIconVisible, iconSrc, iconCrossHandler, lblHeaderskin, lblAlertMessageskin, btnOkText, btnCancelText) {
            this.reset();
            this.view.lblHeader.text = header;
            this.view.lblHeader.skin = lblHeaderskin;
            this.view.lblAlertMessage.text = msg;
            this.view.lblAlertMessage.skin = lblAlertMessageskin;
            this.view.btnCancel.isVisible = showCancel;
            this.view.btnCancel.text = btnCancelText;
            this.view.btnCancel.skin = btnCancelSkin;
            this.view.btnCancel.onClick = btnCancelHandler;
            this.view.btnOk.text = btnOkText;
            this.view.btnOk.skin = btnOkSkin;
            this.view.btnOk.onClick = btnOkHandler;
            this.view.imgCross.isVisible = isIconVisible;
            this.view.imgCross.onTouchEnd = iconCrossHandler;
            if (iconSrc) {
                this.view.imgCross.src = iconSrc;
            }
            this.show();
        },
        showOnlyContinueButtonWithSkin: function (header, msg, btnOkSkin, btnOkHandler, isIconVisible, iconSrc, iconCrossHandler, lblHeaderskin, lblAlertMessageskin) {
            this.reset();
            this.view.lblHeader.text = header;
            this.view.lblHeader.skin = lblHeaderskin;
            this.view.lblAlertMessage.text = msg;
            this.view.lblAlertMessage.skin = lblAlertMessageskin;
            this.view.btnCancel.isVisible = false;
            this.view.btnOk.skin = btnOkSkin;
            this.view.btnOk.onClick = btnOkHandler;
            this.view.imgCross.isVisible = isIconVisible;
            if (iconSrc) {
                this.view.imgCross.src = iconSrc;
            }
            this.view.imgCross.onTouchEnd = iconCrossHandler;
            this.show();
        }
    };
});