define({
  maxNoOfChars : 8,
  keypadString : "",
  placeholder : "•",
  validateFun : null,
  preShow : function(){
    this.setSecurityCode();
  },
  setMaxNoOfChars : function(newMaxNoOfChars){
    this.maxNoOfChars = newMaxNoOfChars;
    this.view["lblText0"].left=((8-this.maxNoOfChars)*12.5)/2 + "%";
    this.view["flxDash0"].left=((8-this.maxNoOfChars)*12.5)/2 + "%";
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
  setSecurityCodeChar : function(pos,char){
    try{
      if (!kony.sdk.isNullOrUndefined(pos) && pos <= 7) {
        this.view["lblText"+pos].text="•";
        this.view["lblText"+pos].skin="sknLbl979797SSP60px";
      }
    }catch(e){
      kony.print("setSecurityCodeChar"+e);
    }
  },
  setPlaceholder : function(pos){
    try{
      if(pos === -1) return
      this.view["lblText"+pos].text=this.placeholder;
      this.view["lblText"+pos].skin="lblWhiteDot";
    }catch(e){
      kony.print("setSecurityCodeChar"+e);
    }
  },
  getSecurityCode : function(){
    return this.keypadString;
  },
});