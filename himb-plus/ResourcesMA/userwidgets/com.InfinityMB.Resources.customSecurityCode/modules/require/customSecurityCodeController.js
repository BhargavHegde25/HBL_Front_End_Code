define({
  maxNoOfChars : 8,
  keypadString : [],
  placeholder : "•",
  validateFun : null,
  peekValue:false,
  preShow : function(){
    this.setSecurityCode();
  },
  setMaxNoOfChars : function(newMaxNoOfChars){
    this.maxNoOfChars = newMaxNoOfChars;
    
    let lang = kony.i18n.getCurrentLocale();
    if(lang === "ar_AE") {
      this.view["flxDash0"].right=((8-this.maxNoOfChars)*12.5)/2 + "%";
      this.view["lblText0"].right=((8-this.maxNoOfChars)*12.5)/2 + "%";
    }
    else {
      this.view["flxDash0"].left=((8-this.maxNoOfChars)*12.5)/2 + "%";
      this.view["lblText0"].left=((8-this.maxNoOfChars)*12.5)/2 + "%";
    }
    for(i=0;i<this.maxNoOfChars;i++){
      this.view["lblText"+i].setVisibility(true);
      this.view["flxDash"+i].setVisibility(true);
    }
    for(i=this.maxNoOfChars;i<8;i++){
      this.view["lblText"+i].setVisibility(false);
      this.view["flxDash"+i].setVisibility(false);
    }
  },
  setSecurityCode : function(keypadString){
    if(keypadString != null || keypadString != undefined){
      this.keypadString = keypadString;
    }
    for(i=0;i<this.keypadString.length;i++){
      this.setSecurityCodeChar(i,this.keypadString[i]);
    }
    for(i;i<this.maxNoOfChars;i++){
      this.setPlaceholder(i);
    }
    if (this.validateFun!=null) {
      this.validateFun();
    }
  },
  setSecurityCodeChar: function (pos, char, togglevalue) {
    try{
      if (!kony.sdk.isNullOrUndefined(pos) && pos <= 7) {
        if (!togglevalue && !this.peekValue) {
          this.view["lblText"+pos].text="•";
          this.view["lblText"+pos].skin="sknLbl979797SSP60px";
        }
        else {
          this.view["lblText"+pos].text=char;
          this.view["lblText"+pos].skin="sknLbl979797SSP60px";
        }
        if(this.keypadString.length<7){
        this.keypadString.push(char);
        }
      }
    }catch(e){
      kony.print("setSecurityCodeChar"+e);
    }
  },
  setPlaceholder : function(pos){
    if(pos === -1) return
    this.view["lblText"+pos].text=this.placeholder;
    this.view["lblText"+pos].skin="lblWhiteDot";
  },
  getSecurityCode : function(){
    return this.keypadString;
  },
  setSecurityChar:function(pos,char,togglevalue){
    try{
    if (!kony.sdk.isNullOrUndefined(pos) && pos <= 7) {
      if(!togglevalue&&!this.peekValue){
        this.view["lblText"+pos].text="•";
        this.view["lblText"+pos].skin="sknLbl979797SSP60px";
      }
      else{
        this.view["lblText"+pos].text=char;
        this.view["lblText"+pos].skin="sknLbl979797SSP60px";
      }
    }
    }catch(e){
      kony.print("setSecurityChar"+e);
    }
  },
  toggleHandler:function(togglevalue){
    var self=this;
 if(this.keypadString.length>0){   
 this.peekValue= togglevalue;
for(i=0;i<this.keypadString.length;i++){
self.setSecurityChar(i,this.keypadString[i],togglevalue);
}
 }
 else{
	this.peekValue= togglevalue;
 }

  },
  setKeypadString:function(keyString){
	  if(keyString){
		  this.keypadString=[];
		  for(i=0;i<keyString.length;i++){
				this.keypadString.push(keyString[i]);
		  }
	  }
	  else if(keyString==''){
		  this.keypadString=[];
	  }
  }
  
});