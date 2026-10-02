define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
           // this.view.hideTerms = this.hideTerms.bind(this);
            //this.view.showTerms = this.showTerms.bind(this);
            //this.view.setTerms = this.setTerms.bind(this);
            this.isChecked = false;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
         setTerms:function(lblRichTextMsgtext){
            try{
            var scope = this;   
            this.isChecked = false;     
            scope.view.btnAccept.setEnabled = false;  
			this.view.lblHeaderMsg.text=kony.i18n.getLocalizedString("kony.mb.settings.termsAndConditions");
            //this.view.flxMainContainer.top = "100%"
            //this.view.flxMainContainer.skin = "sknFlxBG"; 
            //this.view.flxHeadermsgContainer.skin= "sknFlxBG";
            scope.view.flxHeaderLbl.skin =  "sknAlertheaderBrd";

            //this.view.lblHeaderMsg.text = lblHeaderText;
            //this.view.imgCross.src = "closeicon2x.png"; 
            scope.view.imgCross.onClick = () => {
              scope.hideTerms();  
            }; 
            scope.view.flxImgCross.onClick = () => {
              scope.hideTerms();  
            };

            scope.view.lblRichTextMsg.text =  lblRichTextMsgtext;
             
			scope.showTerms();
          
			scope.view.flxTermstextContainer.onScrollEnd=function(){
				scope.isChecked=true;
			};
            scope.view.imgCheckboxIcon.src = "activecheckbox.png";
			scope.view.btnAccept.skin = "sknBtnOnBoardingInactive";
            scope.view.flxCheckboxIcon.onClick =function()  {
                
          
                if(scope.view.imgCheckboxIcon.src == "activecheckbox.png"){
                    scope.view.imgCheckboxIcon.src = "inactivecheckbox_2.png";
					scope.view.btnAccept.skin = "sknBtn0095e4RoundedffffffSSP26px";					
                    
                    scope.view.btnAccept.setEnabled = true;
                }else {
                    
                    scope.view.imgCheckboxIcon.src = "activecheckbox.png";
                    scope.view.btnAccept.setEnabled = false;
					scope.view.btnAccept.skin = "sknBtnOnBoardingInactive";
                }        
            };
			this.view.flxCheckBoxContainer.onClick =function()  {
                if(scope.view.imgCheckboxIcon.src == "activecheckbox.png"){
                    scope.view.imgCheckboxIcon.src = "inactivecheckbox_2.png";
					scope.view.btnAccept.skin = "sknBtn0095e4RoundedffffffSSP26px";					
                    scope.view.btnAccept.setEnabled = true;
                }else {
                    scope.view.imgCheckboxIcon.src = "activecheckbox.png";
                    scope.view.btnAccept.setEnabled = false;
					scope.view.btnAccept.skin = "sknBtnOnBoardingInactive";
                }        
            };
            

           // this.view.lblImpMesg.text = lblImpMsgtext;
            //this.view.imgCheckBox.onClick = 
            //this.view.lblImpMesg.text=  lblImpMsgtext;
            //this.view.lblImpMesg.skin = lblImpMsgskin;

            //this.view.btnDecline.text = btnCanceltext;
            scope.view.btnDecline.skin = "sknBtnBrown";
            scope.view.btnDecline.onClick  =  () => {
                scope.hideTerms();
            };
            scope.view.btnAccept.onClick = () => {
                if( scope.view.imgCheckboxIcon.src == "inactivecheckbox_2.png" ){ 
                    scope.hideTerms();
                    scope.showCallback();
                }    
         }; 
           scope.view.forceLayout();

            
            }catch(exp){
                  kony.print("---"+JSON.stringify(exp));  
            }
        },
        showTerms: function() {
        try {
            var animDefinition = {
                "0": { top: "100%" },  // start at bottom
                "100": { top: "25%" }  // end at visible position
            };
            var animDef = kony.ui.createAnimation(animDefinition);
            var animConfig = {
                duration: 0.5,              // half a second
                iterationCount: 1,
                delay: 0,
                fillMode: kony.anim.FILL_MODE_FORWARDS
            };
            
            this.view.isVisible = true;

        this.view.flxMainContainer.animate(animDef, animConfig);
        this.view.isVisible = true;       
        } catch (exp) {
              kony.print("Animation error: " + JSON.stringify(exp));
              alert("Animation error: " + JSON.stringify(exp));
        }
    },

    // Slide down (hide)
    hideTerms: function() {

                try {
                 var animDefinition = {
                        "0": { top: "25%" },    // start at visible position
                        "100": { top: "100%" }  // end below screen
                 };
                var animDef = kony.ui.createAnimation(animDefinition);
                var animConfig = {
                        duration: 0.5,
                        iterationCount: 1,
                        delay: 0,
                        fillMode: kony.anim.FILL_MODE_FORWARDS
                };

                this.view.flxMainContainer.animate(animDef, animConfig);
                this.view.isVisible = false;

            } catch (exp) {
               kony.print("Animation error: " + JSON.stringify(exp));
                //alert("Animation error: " + JSON.stringify(exp));
            }
    }

	};
});