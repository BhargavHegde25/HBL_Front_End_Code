define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.postShow = this.postShow;
      this.btnId = 0;
      this.sepId = 0;
      this.assets =["0", "Asset"];
      this.selectedBreadCrumb={};
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {},


    postShow: function(){
      this.btnId = 0;
      this.sepId = 0;
      this.assets =["0", "Asset"];
      this.view.flxBreadCrumb.removeAll();
      this.createSep(this.assets);
    },


    loadButtons: function(buttonData){
      this.selectedBreadCrumb=buttonData;
      this.createSep(buttonData);
    },

    resetButton: function(){
      this.btnId = 0;
      this.sepId = 0;
      this.assets =["0", "Asset"];
      this.view.flxBreadCrumb.removeAll();
      this.createSep(this.assets);
    },
    
    
    onClickCallBck: function(x){
      if(x.skin!=='bbSknLbl424242SSP15Px'){
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
        this.view[`btn${this.btnId}`].skin = "bbSknLbl424242SSP15Px";
        this.sendBtn(x,this.selectedBreadCrumb);
      }

    },

    createBtn: function(drillDownData) {
      this.btnId++;
      try {

        var label = {
          id: `btn${this.btnId}`,
          isVisible: true,
          text: `${drillDownData[1]}`,
          width: kony.flex.USE_PREFERED_SIZE, 
          // Ayush Raj, IW-3698 - fix start
          left:this.btnId === 1?"1.5%":"2%",
          //fix end
          height: "100%",
          centerY: "50%",
          autogrowMode: kony.flex.AUTOGROW_HEIGHT,
          info: {
            "key": this.btnId === 1 ? null : drillDownData[0].ID,
          },
          //black Skin
          skin: "bbSknLbl424242SSP15Px",
         onTouchEnd: this.onClickCallBck,
        };
        var newLabel = new kony.ui.Label(label);
        if (drillDownData[1] === 'Asset') {
        // Ayush Raj, IW-3698 - fix start
          newLabel.width = "57dp";
          //fix end
        }
        this.view.flxBreadCrumb.add(newLabel);
        if (this.btnId > 1) {
          for (let i = this.btnId - 1.0; i > 0; i--) {
            //blue Skin
            this.view[`btn${i}`].skin = "bbSknBtn4176a4NoBorder";
          }
        }
      } catch (err) {
        kony.print(JSON.stringify(err));
      }
    },

    createSep: function(drillDownData) {
      this.sepId++;
      try {
        var btnBasic = {
          id: `sep${this.sepId}`,
          isVisible: true,
          // Ayush Raj, IW-3698 - fix start
          left:this.sepId === 2?"0%":"2%",
          height: "17px",
          width: "17px",
          src: "arrow_right_black.png",
          //fix end
          centerY: "50%",
          enable: false,
        };
        var image = new kony.ui.Image2(btnBasic);
        this.view.flxBreadCrumb.add(image);
        this.view.sep1.setVisibility(false);
      } catch (err) {
        kony.print(JSON.stringify(err));
      }
      this.createBtn(drillDownData);
    },

  };
});