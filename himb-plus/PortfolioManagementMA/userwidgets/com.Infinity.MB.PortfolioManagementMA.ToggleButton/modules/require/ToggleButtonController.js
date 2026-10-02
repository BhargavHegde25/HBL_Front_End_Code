define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.context = {};
      this.view.preShow = this.preShow;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'btn1Skin', () => {
        return this._btn1Skin;
      });
      defineSetter(this, 'btn1Skin', value => {
        this._btn1Skin = value;
      });
      defineGetter(this, 'btn2Skin', () => {
        return this._btn2Skin;
      });
      defineSetter(this, 'btn2Skin', value => {
        this._btn2Skin = value;
      });
      defineGetter(this, 'btn1Text', () => {
        return this._btn1Text;
      });
      defineSetter(this, 'btn1Text', value => {
        this._btn1Text = value;
      });
      defineGetter(this, 'btn2Text', () => {
        return this._btn2Text;
      });
      defineSetter(this, 'btn2Text', value => {
        this._btn2Text = value;
      });
    },
    /**
	* @api : preShow
     Invoked when the component loads
  */
    preShow: function() {
      try{
        this.view.btnTgl1.onClick = this.toggleView.bind(this, this.view.btnTgl1);
        this.view.btnTgl2.onClick = this.toggleView.bind(this,this.view.btnTgl2);
      }catch(err){
        this.setError(err, "preShow");
      }
    },
    /**
	* @api : setContext
     Invoked for setting context
  */
    setContext: function(permission1, permission2){
      try{
        if(permission1 && permission2){
          this.view.lblCommon.setVisibility(false);
          this.view.btnTgl1.text = kony.i18n.getLocalizedString(this._btn1Text);
          this.view.btnTgl2.text = kony.i18n.getLocalizedString(this._btn2Text);
          this.view.btnTgl1.skin = this._btn1Skin;
          this.view.btnTgl2.skin = this._btn2Skin;
          this.view.flxButton1.setVisibility(permission1);
          this.view.flxButton2.setVisibility(permission2);
        }else{
          this.view.lblCommon.setVisibility(true);
          this.view.flxButton1.setVisibility(false);
          this.view.flxButton2.setVisibility(false);
          this.view.lblCommon.text = permission1 ? kony.i18n.getLocalizedString(this._btn1Text) : kony.i18n.getLocalizedString(this._btn2Text);
        }
      } catch(err){
        this.setError(err, "checkPermissions");
      }
    },
    /**
	* @api : toggleView
     Invoked during onclick of toggle button
  */
    toggleView: function(widgetInfo){
      try{
        if(widgetInfo.id === "btnTgl1"){
          this.view.btnTgl1.skin = this._btn1Skin;
          this.view.btnTgl2.skin = this._btn2Skin;
          this.btnOneToggle();
        }
        else{
          this.view.btnTgl1.skin = this._btn2Skin;
          this.view.btnTgl2.skin = this._btn1Skin;
          this.btnTwoToggle();
        }
      }catch(err){
        this.setError(err, "toggleView");
      }
    },
    /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function (errorMsg, method) {
      let errorObj = {
        "level" : "ComponentViewController",
        "method": method,
        "error" : errorMsg
      };
      this.onError(errorObj);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    }
  };
});