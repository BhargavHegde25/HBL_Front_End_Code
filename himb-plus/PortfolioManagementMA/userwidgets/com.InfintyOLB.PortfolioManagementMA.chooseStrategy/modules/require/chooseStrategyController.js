define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {

    },

    currentIndex: 0,
    i: 0,
    start: 0,
    widgetId: "",
    selectedIndex: 0,
    finalIndex: 0,

    setData: function (responseArray, chartArray, donutRadius, imageArray, dataMapping, selectedIndex, no_of_cards, max, altFlag) {
      var scope = this;
      this.i = 0;
      this._data = {};
      this.selectedIndex = selectedIndex;
      this.currentIndex = parseInt(this.selectedIndex / no_of_cards);
      this.view.flxCard1.removeAll();
      this.view.flxCard1.left = "0%";
      var response = responseArray;
      let leftPercent = (this.currentIndex * -3000);
      this.flag = true;
      this.finalIndex = Math.floor((chartArray.length - 1) / no_of_cards);

      if (this.currentIndex === 0 && this.finalIndex === 0) {
        this.view.imgLeft.isVisible = false;
        this.view.imgRight.isVisible = false;
        this.view.flxLeft.isVisible = false;
        this.view.flxRight.isVisible = false;
      }
      else if (this.currentIndex === 0) {
        this.view.imgLeft.isVisible = false;
        this.view.imgRight.isVisible = true;
        this.view.flxLeft.isVisible = true;
        this.view.flxRight.isVisible = true;
      } else if (this.finalIndex === this.currentIndex) {
        this.view.imgLeft.isVisible = true;
        this.view.flxLeft.isVisible = true;
        this.view.imgRight.isVisible = false;
        this.view.flxRight.isVisible = true;
      } else if (this.currentIndex) {
        this.view.imgRight.isVisible = false;
        this.view.flxRight.isVisible = true;
      }
      else {
        this.view.imgLeft.isVisible = true;
        this.view.imgRight.isVisible = true;
        this.view.flxLeft.isVisible = true;
        this.view.flxRight.isVisible = true;
      }

      for (let j = 0; j < Math.ceil(chartArray.length / no_of_cards); j++) {

        var flexContainer;
        if (j < this.currentIndex) {

          flexContainer = new kony.ui.FlexContainer({
            "id": "flxContent" + j,
            "top": "19dp",
            "left": leftPercent + "%",
            "width": "100%",
            "height": "100%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          }, {
            "padding": [0, 0, 0, 0]
          }, {});

          leftPercent = leftPercent + 3000;
        }
        else if (j > this.currentIndex) {
          flexContainer = new kony.ui.FlexContainer({
            "id": "flxContent" + j,
            "top": "19dp",
            "left": leftPercent + "%",
            "width": "100%",
            "height": "100%",
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
          }, {
            "padding": [0, 0, 0, 0]
          }, {});
          leftPercent = leftPercent + 3000;
        }

        else {
          flexContainer = new kony.ui.FlexContainer({
            "id": "flxContent" + j,
            "top": "19dp",
            "left": (leftPercent) + "%",
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "width": "100%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
          }, {
            "padding": [0, 0, 0, 0]
          }, {});
          leftPercent = leftPercent + 3000;
          this.start = 0;
        }

        flexContainer.setDefaultUnit(kony.flex.DP);
        this.view.flxCard1.add(flexContainer);

        for (; this.i < no_of_cards * (j + 1) && chartArray[this.i] != undefined; this.i++) {
          let id = "WealthStrategyDonut" + this.i;
          if (this.i % no_of_cards === 0) {
            var flxGroup = new kony.ui.FlexContainer({
              "id": "flxGroup" + this.i,
              "top": "10dp",
              "left": "10dp",
              "width": ((100 / no_of_cards) - 2.5) + "%",
              "zIndex": 1,
              "isVisible": true,
              "skin": "SknFlxBgFFFFFFBorderE3E3E3Radius10PX",
              "clipBounds": false,
              //"layoutType": kony.flex.FLOW_VERTICAL,
            }, {}, {});
          } else {
            var flxGroup = new kony.ui.FlexContainer({
              "id": "flxGroup" + this.i,
              "top": "10dp",
              "left": "20dp",
              "width": ((100 / no_of_cards) - 2.5) + "%",
              "zIndex": 1,
              "isVisible": true,
              "skin": "SknFlxBgFFFFFFBorderE3E3E3Radius10PX",
              "clipBounds": false,
              //"layoutType": kony.flex.FLOW_VERTICAL,
            }, {}, {});
          }

          var flxBottom = new kony.ui.FlexContainer({
            "id": "flxBottom" + this.i,
            "bottom": "15dp",
            "width": "100%",
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "centerX": "50%",
            "layoutType": kony.flex.FLOW_HORIZONTAL,
          }, {}, {});


          var flxHeader = new kony.ui.FlexContainer({
            "id": "flxHeader" + this.i,
            "top": "5dp",
            "left": "20dp",
            "width": "30%",
            "height": "10%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
          }, {
            "padding": [0, 0, 0, 0]
          }, {});

            var flxButton = new kony.ui.FlexContainer({
              "id": "flxButton" + this.i,
              "left": scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())?"7.5%":"0%",
              //Pulkit, IW-3316 - fix start
              //"width": "280dp",
              "width": "85%", //% equivalent for 280dp
              "centerX": "50%",
              "height": "52dp",
              //IW-3316 ends
              "zIndex": 1,
              "isVisible": true,
              "skin": "SknFlxBgFFFFFFBorderE3E3E3Radius10PX",
              "clipBounds": false,
              "onTouchEnd": this.onClickofOptions,
            }, {}, {});
   
          var flxBody = new kony.ui.FlexContainer({
            "id": "flxBody" + this.i,
            "top": "10dp",
            "left": "0%",
            "width": "100%",
            "height": "70%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          }, {
            "padding": [0, 0, 0, 0]
          }, {});

          var flxDummy = new kony.ui.FlexContainer({
            "id": "flxDummy" + this.i,
            "left": "35dp",
            "width": "10dp",
            "height": "100%",
            "zIndex": 1,
            "isVisible": true,
            "skin": "slFbox",
            "clipBounds": false,
            "layoutType": kony.flex.FLOW_VERTICAL,
          }, {}, {});

          var image = new kony.ui.Image2({
            id: "image" + this.i,
            isVisible: false,
            src: imageArray[this.i] === "Active" ? imageArray[this.i]+ "_one.png" : imageArray[this.i]+".png",
          }, {
            containerWeight: 100
          }, {});

          var lblStrategyName = new kony.ui.Label({
            id: "lblStrategyName" + this.i,
            skin: "sknSSPSemiBold42424220px",
            text: imageArray[this.i],
            isVisible: true
          }, {
            containerWeight: 100,
            padding: [5, 5, 5, 5],
            margin: [5, 5, 5, 5],
            hExpand: true,
            vExpand: false
          }, {
            renderAsAnchor: true,
            wrapping: constants.WIDGET_TEXT_WORD_WRAP
          });

          var StrategyDonutChart = new kony.ui.CustomWidget({
            "id": id,
            "isVisible": true,
            //Pulkit, IW-3316 - fix start          
            "top": "8dp",
            //"left": "80dp",
            "left": "24%", //% equivalent for 80dp
            "width": "157dp",
            "height": "157dp",
            //IW-3316 ends
          }, {
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
          }, {
            "widgetName": "WealthStrategyDonutChart",
            "chartData": this._data,
            "OnClickOfPie": function () { }
          });

          var segment = new kony.ui.SegmentedUI2({
            id: "segDonut" + this.i,
            //Pulkit, IW-3316 - fix start
            //left: "32dp",
            left: "9%", //% equivalent for 32dp
            width: "75%",
            //IW-3316 ends
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            isVisible: true,
            rowSkin: "seg2Normal",
            rowFocusSkin: "seg2Focus",
            widgetDataMap: dataMapping,
            rowTemplate: "flxSegAssetValue"
          }, {}, {});

          var lblButton = new kony.ui.Label({
            id: "lblButton" + this.i,
            skin: "sknSSPSemiBold42424220px",
            text: kony.i18n.getLocalizedString("i18n.wealth.selectStrategy"),
            isVisible: true,
            left: "20dp",
          }, {
            containerWeight: 100,
            hExpand: true,
            vExpand: false
          }, {
            renderAsAnchor: true,
            wrapping: constants.WIDGET_TEXT_WORD_WRAP
          });

          var imageButton = new kony.ui.Image2({
            id: "imageButton" + this.i,
            isVisible: true,
            right: "15dp",
            src: "radioinactivebb.png",
            centerY: "50%"
          }, {
            containerWeight: 100
          }, {});

          function dolayoutcallback() {
            var segSize = max * this.frame.height;
            setHeight(segSize);
          }

          lblButton.centerY = "50%";

          segment.setData(response[this.i]);

          flxHeader.add(image);
          flxHeader.add(lblStrategyName);

          flxBody.add(flxHeader);
          flxBody.add(StrategyDonutChart);
          flxBody.add(segment);

          flxBottom.add(flxButton);
          flxButton.add(lblButton);
          flxButton.add(imageButton);

          flxGroup.add(flxBody);
          flxGroup.add(flxBottom);
          flxGroup.add(flxDummy);

          this.view["flxContent" + j].add(flxGroup);

          this.view["flxBody" + this.i][id].chartData = chartArray[this.i];
          this.view["flxBody" + this.i][id].chartDonutWidth = donutRadius;

          this.view.segDonut0.doLayout = dolayoutcallback;
        }

      }

      function setHeight(segSize) {
        for (let i = 0; i < chartArray.length; i++) {
          scope.view["flxGroup" + i].height = 320 + ((max - 1) * 30);
          scope.view.forceLayout();
        }
      }

      this.view.imgLeft.onTouchEnd = this.onClickofButtonLeft;
      this.view.imgRight.onTouchEnd = this.onClickofButtonRight;
      if (altFlag) {
        this.view["flxGroup" + this.selectedIndex].skin = "sknflx04A615f";
        this.view["imageButton" + this.selectedIndex].src = "success.png";
        this.view["lblButton" + this.selectedIndex].text = kony.i18n.getLocalizedString("i18n.wealth.selectedStrategy");
        this.widgetId = "flxButton" + this.selectedIndex;
        this.view[this.widgetId].skin = "sknflxGreen0ba407a4468e045";
      }
      else {
      this.widgetId = undefined;
      }
      this.selectedIndex = -1;
    },

    onClickofOptions: function (widgetRef) {
      if (parseInt(widgetRef.id.substring(9)) !== this.selectedIndex && widgetRef.skin !== "sknflxGreen0ba407a4468e045") {
        this.selectedIndex = parseInt(widgetRef.id.substring(9));

        widgetRef.skin = "sknflxGreen0ba407a4468e045";
        this.view["flxGroup" + parseInt(widgetRef.id.substring(9))].skin = "sknflx04A615f";
        this.view["imageButton" + this.selectedIndex].src = "success.png";
        this.view["lblButton" + this.selectedIndex].text = kony.i18n.getLocalizedString("i18n.wealth.selectedStrategy");

        if (this.widgetId != undefined) {
          this.view["flxGroup" + parseInt((this.widgetId).substring(9))].skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
          this.view[this.widgetId].skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
          this.view["imageButton" + parseInt((this.widgetId).substring(9))].src = "radioinactivebb.png";
          this.view["lblButton" + parseInt((this.widgetId).substring(9))].text = kony.i18n.getLocalizedString("i18n.wealth.selectStrategy");
          this.view["lblButton" + parseInt((this.widgetId).substring(9))].skin = "sknSSPSemiBold42424220px";
        }

        this.widgetId = widgetRef.id;
        this.onToggle(this.view["lblStrategyName" + this.selectedIndex].text);
      }
    },

    onToggleToRecommendStrategy: function () {
      this.view[this.widgetId].skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
      this.view["lblButton" + parseInt((this.widgetId).substring(9))].text = kony.i18n.getLocalizedString("i18n.wealth.selectStrategy");
      this.view["lblButton" + parseInt((this.widgetId).substring(9))].skin = "sknSSPSemiBold42424220px";
      this.view["imageButton" + parseInt((this.widgetId).substring(9))].src = "radioinactivebb.png";
      this.view["flxGroup" + parseInt((this.widgetId).substring(9))].skin = "SknFlxBgFFFFFFBorderE3E3E3Radius10PX";
      this.widgetId = undefined;
      this.selectedIndex = -1;
    },

    onClickofButtonLeft: function (widgetRef) {
      var scope = this;
      scope.currentIndex--;

      if (this.flag) {
        const animConfig = {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 0.1,
        };

        this.view.flxCard1.animate(
          kony.ui.createAnimation({
            "0": {
              "stepConfig": {
                "timingFunction": kony.anim.EASE,
              },
              "left": this.start + "%",
            },
            "100": {
              "stepConfig": {
                "timingFunction": kony.anim.EASE,
              },
              "left": (this.start + 3000) + "%",
            },
          }),
          animConfig,
          {
            "animationEnd": function () {
              if (scope.currentIndex === 0) {
                scope.view.imgRight.isVisible = true;
                scope.view.imgLeft.isVisible = false;
                scope.view.flxLeft.isVisible = true;
                scope.view.flxRight.isVisible = true;
              } else {
                scope.view.imgLeft.isVisible = true;
                scope.view.imgRight.isVisible = true;
                scope.view.flxLeft.isVisible = true;
                scope.view.flxRight.isVisible = true;
              }
            },
          }
        );
        this.start = this.start + 3000;
        this.flag = true;
      }
    },

    onClickofButtonRight: function () {
      var scope = this;
      scope.currentIndex++;

      const animConfig = {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.1,
      };

      this.view.flxCard1.animate(
        kony.ui.createAnimation({
          "0": {
            "stepConfig": {
              "timingFunction": kony.anim.EASE,
            },
            "left": this.start + "%",
          },
          "100": {
            "stepConfig": {
              "timingFunction": kony.anim.EASE,
            },
            "left": (this.start - 3000) + "%",
          },
        }),
        animConfig,
        {
          "animationEnd": function () {
            if (scope.currentIndex === scope.finalIndex) {
              scope.view.imgLeft.isVisible = true;
              scope.view.imgRight.isVisible = false;
              scope.view.flxLeft.isVisible = true;
              scope.view.flxRight.isVisible = true;
            } else {
              scope.view.imgLeft.isVisible = true;
              scope.view.imgRight.isVisible = true;
              scope.view.flxLeft.isVisible = true;
              scope.view.flxRight.isVisible = true;
            }
          },
        }
      );
      this.start = this.start - 3000;
      this.flag = true;

    }
  };
});