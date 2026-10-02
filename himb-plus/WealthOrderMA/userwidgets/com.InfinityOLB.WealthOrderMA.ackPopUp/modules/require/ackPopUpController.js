define(function() {
  return {
    preShow : function()
    {
     // this.view.setFocus(true);
      this.view.lblHeading.accessibilityConfig={
        a11yARIA : {
          tabindex : -1,
        }
      }
      this.view.lblPopupMessage.accessibilityConfig={
        a11yARIA : {
          tabindex : -1,
        }
      }
      this.view.flxCross.accessibilityConfig={
        a11yLabel : "close",
        a11yARIA : {
          tabindex : 0,
          role : "button"
        }
      }
      this.view.flxSeperator.accessibilityConfig={
        a11yHidden : true,
      }
      this.view.flxSeperator2.accessibilityConfig={
        a11yHidden : true,
      }
      
    },
    onBreakpointChangeComponent : function(eventObj,width){
      
    }
  };
});