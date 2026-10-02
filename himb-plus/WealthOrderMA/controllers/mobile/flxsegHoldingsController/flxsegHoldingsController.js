define({ 

 //Type your controller code here 

  onViewCreated: function(eObj) {
     try {
          this.view.flxClick.onClick = this.onActionSelect;
        } catch (exc) {
            this.setError(exc, "onViewCreated");
        }
    },
    onActionSelect: function(widgetInfo, context) {
        var rowIndex = context.rowIndex;
        var myInfo = {
            row: rowIndex
        };
        var currentFormObject = kony.application.getCurrentForm();
        currentFormObject.holdings.onActionSelect(myInfo);
        
      },
  setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      scope.onErrorMain(errorObj);
    },
    onErrorMain:function(err){
      kony.print(JSON.stringify(err));
    }

 });