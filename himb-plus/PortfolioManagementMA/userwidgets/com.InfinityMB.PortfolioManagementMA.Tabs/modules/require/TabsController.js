define(function() {
  var skins = {
    'selected': 'ICSknBtn003E7535PX',
    'unselected': 'ICSknBtn003E75Bffffff34px'
  }
  return {
    selectedTab: null,
    rendered: false,
    postshow: function(){
      let scopeObj = this;
      this.view.btn0.isVisible = false;
      this.view.flxScrollTabs.doLayout = function(widget){
        widget.info = widget.frame;
      }
    },

    /*
    * set data of the tabs component
    * @param {Array} data: [{key: <str>, label: <str>, onClick: <function>,selected: <bool>// default false}]
    */
    setData: function(data,isScroll){
      let scopeObj = this;
      this.view.flxScrollTabs.removeAll();
      let defaultTab = null;
      for(let i=0; i<data.length; i++){
        let tab = this.view.btn0.clone(`tab${i}`);
        tab.info = {
          'key': data[i]['key']
        };
        tab.doLayout = function(widget){
          let key = tab.info['key'];
          let infoObj = widget.frame;
          infoObj['key'] = key;
          tab.info = infoObj;
        },
          tab.onClick = function() {
          if(data[i].onClick)
            data[i].onClick(tab.info['key']);
          scopeObj.selectTab(tab)();
        }
        tab.isVisible = true;
        tab.skin = skins.unselected;
        tab.focusSkin = skins.unselected;
        tab.text = data[i]['label'];
        if(data[i]['selected'] === true){
          defaultTab = tab;
        }
        this.view.flxScrollTabs.add(tab);
      }
      this.rendered = true;
      if(isScroll === undefined){
        this.scrollFlag=false;
      }
      else{
        this.scrollFlag=isScroll;
      }
      if(defaultTab)
        defaultTab.onClick();
    },

    /*
    * set the selected tab
    * @param {Kony.ui.Button} tab: the tab widget to select
    */
    selectTab: function(tab){
      var scopeObj = this;
      return function(){
        if(scopeObj.selectedTab){
          scopeObj.selectedTab.skin = skins.unselected;
          scopeObj.selectedTab.focusSkin = skins.unselected;
        }
        scopeObj.selectedTab = tab;
        tab.skin = skins.selected;
        tab.focusSkin = skins.selected;
        if(Object.keys(tab.info).length > 1 && scopeObj.rendered && this.scrollFlag){
          scopeObj.view.flxScrollTabs.contentOffset = {
            x: parseInt(tab.info.x - scopeObj.view.flxScrollTabs.info.width/2 + tab.info.width / 2 ) + 'dp',
            y: '0dp'
          }
        }
      }
    }
  };
});