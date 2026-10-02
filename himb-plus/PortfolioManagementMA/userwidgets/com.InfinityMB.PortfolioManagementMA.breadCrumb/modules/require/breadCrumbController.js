define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.postShow = this.postShow;
      this.btnId = 0;
      this.sepId = 0;
      this.assets =["0", kony.i18n.getLocalizedString("kony.mb.login.Assets")];
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {},


    postShow: function(){
      
      this.btnId = 0;
      this.sepId = 0;
      this.assets =["0", kony.i18n.getLocalizedString("kony.mb.login.Assets")];
      
      this.view.flxBreadcrumb.removeAll();
      this.createSep(this.assets);
    },

    setContext: function(initialData, tableHandler) {
      this.assets = initialData;
      this.tableHandler = tableHandler;
    },

    loadButtons: function(buttonData){
      this.createSep(buttonData);
    },

    onClickCallBck: function(x){
      if(x.skin!=='sknBtn424242SSPReg30pxTab'){
        let i=Number(x.id[3]) + 1.0;
        let j=Number(x.id[3]) + 1.0;

        for(i; i<=this.btnId; i++){
          this.view[`btn${i}`].setVisibility(false);
          this.view[`btn${i}`].removeFromParent();
        }

        for(j; j<=this.btnId; j++){
          this.view[`sep${j}`].setVisibility(false);
          this.view[`sep${j}`].removeFromParent();
        }

        this.btnId = Number(x.id[3]);
        this.sepId = Number(x.id[3]);
        
        //black skin
        this.view[`btn${this.btnId}`].skin = "sknBtn424242SSPReg30pxTab";
        this.view[`btn${this.btnId}`].focusSkin = "sknBtn424242SSPReg30pxTab";
        this.tableHandler(x);
      }

    },

    createBtn: function(drillDownData){
      this.btnId++;
      try{
        var btnBasic = {
          id: `btn${this.btnId}`,
          isVisible: true,
          text: `${drillDownData[1]}`,
          width: "preferred",
          height: "100%",
          centerY: "50%",
          //black Skin
          skin: "sknBtn424242SSPReg30pxTab",
          focusSkin: "sknBtn424242SSPReg30pxTab",
          //       this.view.btnAssets.onClick = this.handleBrdCrum.bind(this, "Assets");
          onClick: this.onClickCallBck,
        };

        var Onbutton = new kony.ui.Button(btnBasic);
        if(drillDownData[1] === kony.i18n.getLocalizedString("kony.mb.login.Assets")) {
          Onbutton.width = "80dp";
        }
        
        this.view.flxBreadcrumb.add(Onbutton);
        if(this.btnId > 1){
          for(let i=this.btnId - 1.0; i>0; i--){
            //blue Skin
            this.view[`btn${i}`].skin = "sknBtn30Px293276SSP";
            this.view[`btn${i}`].focusSkin = "sknBtn30Px293276SSP";
            //           alert(`in loop ${i}`);
          }
        }
      }catch(err){
        kony.print(JSON.stringify(err));
      }
    },

    createSep: function(drillDownData){
      this.sepId++;
      try{
        var btnBasic = {
          id: `sep${this.sepId}`,
          isVisible: true,
          width: "2dp",
          height: "15dp",
          centerY: "50%",
          skin: "slFboxBg424242",
          enable: false,
        };

        var Onbutton = new kony.ui.Button(btnBasic);
        this.view.flxBreadcrumb.add(Onbutton);
        this.view.sep1.setVisibility(false);
      }catch(err){
        kony.print(JSON.stringify(err));
      }
      this.createBtn(drillDownData);
    },

  };
});