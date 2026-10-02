define({ 
	index:"",
    selecdata:{},
  initialData:[],
  //Type your controller code here
  init: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    }catch(err) {
        this.setError(err, "init");
      }
    },


  preShow: function () {
    try{
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.setVisibility(false);
      this.view.flxMainContainer.top = "0dp";
       // this.view.tbxSearch.setFocus(false);
   
    } else {
      this.view.flxHeader.setVisibility(true);
    }
    }catch(err) {
        this.setError(err, "preShow");
      }
    
  },

  postShow: function () {
    try{
    this.initActions();
    var data = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").jointAccountDetails;
    this.setUiData(data);
    this.view.imgUnMask.src = "view.png";
    }catch(err) {
        this.setError(err, "postShow");
      }
   },
  
  initActions: function () {
    try{
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    this.view.btnContactUs.onClick = this.OnClickContact;
    this.view.flxUnMask.onTouchEnd =this.OnClickUnMask; 
    }catch(err) {
        this.setError(err, "initActions");
      }
  }, 

  OnClickUnMask: function () {
    try{
      var navManager = applicationManager.getNavigationManager();
      var data = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").jointAccountDetails;
      if (this.view.imgUnMask.src === "viewinactive.png") {
        this.view.lblAccountVal.text = applicationManager.getDataProcessorUtility().mskAccNumber(data.accountNumber);
        this.view.imgUnMask.src = "view.png";
      } else {
        this.view.lblAccountVal.text = data.accountNumber;
        this.view.imgUnMask.src = "viewinactive.png";
      }
    }catch(err) {
        this.setError(err, "OnClickUnMask");
      }
  }, 

  setUiData: function (data) {
    try{
    this.view.lblAccountVal.text = applicationManager.getDataProcessorUtility().mskAccNumber(data.accountNumber);
    this.view.lblCustomerNameVal.text = data.primaryHolder;
    if (data.jointHolders !== ""){
      this.view.segCurrency.setVisibility(true);
      var jointData = data.jointHolders;
      this.formSegmentData(jointData);
    }
    else{
      this.view.segCurrency.setVisibility(false);
    }
    }catch(err) {
        this.setError(err, "setUiData");
      }
  },
  
  formSegmentData: function (jointData) {
    try{
  var scope = this;
        var currForm = kony.application.getCurrentForm();
        var data = jointData.split(',');
        var segData = [];
        var count = 1;
        for (var list in data) {
            var storeData;
            storeData = {
                jointHolder: kony.i18n.getLocalizedString("i18n.wealth.jointHolder") + " " + count+":",
                jointHolderName: data[list],
            }
            count++;
            segData.push(storeData);
        }
        this.view.segCurrency.widgetDataMap = {
            lblJointHolder: "jointHolder",
            lblJointHolderVal: "jointHolderName",
        }
        this.view.segCurrency.setData(segData);
        currForm.forceLayout();
    }catch(err) {
        this.setError(err, "formSegmentData");
      }
 },
  
  onBack: function () {
	        new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmPortfolioDetails"}).navigate();
  },

  OnClickContact: function () {
   
  },

  /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }
 
});
