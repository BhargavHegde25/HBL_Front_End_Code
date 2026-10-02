define(function() {

	return {
        SegmentData:"",
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
		initActions:function(){
			var scope=this;
			scope.view.segFrmAccount.onRowClick=scope.SegRowclick;
            scope.view.tbxSearch.onTextChange=scope.invokeSearch;
			scope.view.tbxSearch.onTouchEnd=function(){
				scope.view.flxContainier.height="80%";
				scope.view.forceLayout();
			};
			
		},
		initComponent:function(obj){
			try{
				var scope=this;
				this.initActions();
				this.view.lblSelectAcc.text=obj.title;
				var Segmentdata;
				var segData;
				if(obj.Segdata){
					Segmentdata=obj.Segdata;
					
    scope.view.segFrmAccount.widgetDataMap={
				"lblValue":"lblValue"
			};
        if(obj.size){
        this.view.flxContainier.height ="70%";    
        }else{
            this.view.flxContainier.height ="50%";    
        }
							segData=scope.formatSegData(Segmentdata,obj.key);
							this.SegmentData=segData;
							if(segData.length>3){
								scope.view.flxSegment.top="105dp";
								scope.view.flxSearch.setVisibility(true);
							}
							else{
								scope.view.flxSegment.top="50dp";
								scope.view.flxSearch.setVisibility(false);
							}
							
				
			
				}
			
			if(segData){
			scope.view.segFrmAccount.rowtemplate="flxDropDownSelector";
			scope.view.segFrmAccount.setData(segData);
			scope.view.segFrmAccount.setVisibility(true);
			scope.view.lblNoaccounts.setVisibility(false);
			scope.animateFlex(true);
			
			}
		else{
			//applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....with seg data");
			scope.view.segFrmAccount.setVisibility(false);
			scope.view.lblNoaccounts.setVisibility(true);
			scope.animateFlex(true);
		}
			scope.view.forceLayout();
			kony.application.dismissLoadingScreen();

			}catch(e){
				kony.print("****************Erron in initComponent**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....initComponent");
			}
			
			
		},
		formatSegData:function(data,key){
			try{
				var scope=this;
				
					if(data.length){
				
				var segData=[];
			for(i=0;i<data.length;i++){
				var rowdata={};
				rowdata.lblValue=data[i][key];
				
				segData.push(rowdata)
			}
			return segData;
				}
				else{
					applicationManager.getPresentationUtility().Alert("Something went wrong.... accounts length");
				}	
			}catch(e){
				kony.print("****************Erron in formatSegData**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....formatSegData");
			}
			
		},
		SegRowclick:function(){
			try{
				var scope=this;
				//alert("row items"+scope.view.segFrmAccount.selectedRowItems);
				scope.animateFlex(false);
				scope.ondropsownSelections(scope.view.segFrmAccount.selectedRowItems);
				
			}catch(e){
				kony.print("****************Erron in SegRowclick**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....SegRowclick");
			}
		},
		invokeSearch:function(){
			try{
				var scope=this;
				var searchTxt=scope.view.tbxSearch.text.toLowerCase();
				var result = [];
			if(scope.SegmentData.length){
				if(searchTxt){
					for(var i=0;i<scope.SegmentData.length;i++){
						if(scope.SegmentData[i].lblValue.toLowerCase().indexOf(searchTxt) !== -1){
							result.push(scope.SegmentData[i])
						}
					}
					if(result.length){
					
			scope.view.segFrmAccount.setData(result);
			scope.view.segFrmAccount.setVisibility(true);
			scope.view.lblNoaccounts.setVisibility(false);
			}
		else{
			
			//applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....with seg data");
			scope.view.segFrmAccount.setVisibility(false);
			scope.view.lblNoaccounts.setVisibility(true);
		}
				}
				else{
					scope.view.segFrmAccount.setData(scope.SegmentData);
				}
				
			}
			}catch(e){
				kony.print("****************Erron in invokeSearch**************"+e);
				applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....invokeSearch");
			}
			
		},
		animateFlex:function(show){
		try{
			
    var self = this;
	function callback() {}
if(show){
	  
    self.view.flxContainier.animate(
    kony.ui.createAnimation({
        "100": {
            "bottom": "-5%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": callback
    });
}
else{
	  
    self.view.flxContainier.animate(
    kony.ui.createAnimation({
        "100": {
            "bottom": "-100%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": callback
    });
}
  

		}catch(e){
			
		}
	}
		
	};
});