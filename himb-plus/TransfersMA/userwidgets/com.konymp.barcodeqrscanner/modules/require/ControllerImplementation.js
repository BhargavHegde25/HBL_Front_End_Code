define([], function() {
  
    var ControllerImplementation = function(componentInstance, componentName) {
        this.componentInstance = componentInstance;
      this.componentName='barcodeqrscanner';
      this.getNativeController = function() {
            try {
                if (this.nativeControllerInstance === undefined) {
                    var deviceInfo = kony.os.deviceInfo();
                    var platformName = null;
                      if (deviceInfo.name.toLowerCase() === 'android') {
                        platformName = 'Android';
                    }else if (deviceInfo.name.toLowerCase() === 'iphone' || deviceInfo.name.toLowerCase() === 'ipad') {
            				platformName = 'IOS';
                    }else {
                        platformName = deviceInfo.name.charAt(0).toUpperCase() + deviceInfo.name.slice(1);
                    }
                    var nativeControllerPath = "com/konymp/"+this.componentName+"/NativeController" + platformName + ".js";
                    var nativeController = require(nativeControllerPath);
                    this.nativeControllerInstance = new nativeController(this.componentInstance);
                }
                return this.nativeControllerInstance;
            } catch (exception) {
               throw new Error(exception);
            }

        };
      /**
     * @function scan
     * @private
     * @description: scan the code
     */
        ControllerImplementation.prototype.scan = function(eventobject,cameraFacing) {
			try{
           this.getNativeController().scan(eventobject,cameraFacing);
			}
			catch(e){
				kony.print("Exception in Scanning the code  :" + e);
			}
        };
       /**
     * @function resumeScan
     * @private
     * @description: API to resume the scan after 1 successful scan
     */
        ControllerImplementation.prototype.resumeScan = function() {
			try{
           this.getNativeController().resumeScan();
			}
			catch(e){
				kony.print("Exception in resuming the code  :" + e);
			}
   			
        };
      /**
     * @function flashControl
     * @private
     * @description: API to let user control the flash of the camera
     */
        ControllerImplementation.prototype.flashControl = function() {
   			this.getNativeController().flashControl();
        };
       /**
     * @function release
     * @private
     * @description: release the view of native container
     */
      ControllerImplementation.prototype.release = function(eventobject) {
		  try{
           this.getNativeController().release(eventobject);
			}
			catch(e){
				kony.print("Exception in release the code  :" + e);
            }
      };
    };
    return ControllerImplementation;
});