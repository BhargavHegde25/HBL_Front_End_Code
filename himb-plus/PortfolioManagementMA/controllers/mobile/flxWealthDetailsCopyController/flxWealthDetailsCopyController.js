define({ 
  onViewCreated: function(eObj) {
     try {
          this.view.flxClick.onClick = this.onActionSelect;
        } catch (exc) {
            alert("Click Exception" + JSON.stringify(exc));
        }
    },
    onActionSelect: function(widgetInfo, context) {
        var rowIndex = context["rowIndex"];
        var myInfo = {
            row: rowIndex
        };
        var currentFormObject = kony.application.getCurrentForm();
        currentFormObject.segmentDetailsWealth.onActionSelect(myInfo);
      }

});