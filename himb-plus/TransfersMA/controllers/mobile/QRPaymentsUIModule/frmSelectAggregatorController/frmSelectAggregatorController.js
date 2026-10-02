define({ 
 preshow:function(){
	 this.setSegmentData();
	 this.view.customHeader.flxBack.onClick=this.BackNavigate;
	 this.view.customHeader.btnRight.onClick=this.onCancel;
	 this.view.segSelectAggType.onRowClick=this.segRowclick;
 },
 setSegmentData:function(){
	  var data = [
              {
                "lblFrequency": "Nepal Pay"
              },
              {
                "lblFrequency": "Smart QR"
              },
			  ]
			  this.view.segSelectAggType.setData(data);
 },
 segRowclick:function(){
	  var navManager = applicationManager.getNavigationManager();
	 var data=this.view.segSelectAggType.selectedRowItems[0];
	 var controller= applicationManager.getPresentationUtility().getController('frmQRAmount', true);
	 var selectedvalue = data.lblFrequency;
	 navManager.setCustomInfo("selectedAggType", selectedvalue);
	 navManager.navigateTo("frmQRAmount");
	 controller.setAggregator(selectedvalue);
 },
 BackNavigate:function(){
	 applicationManager.getNavigationManager().navigateTo("frmQRAmount");
 },
 onCancel:function(){
	 applicationManager.getNavigationManager().navigateTo("frmQRAmount");
 },
 });