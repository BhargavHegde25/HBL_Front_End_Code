define(['FormControllerUtility'], function(FormControllerUtility) {
  return {
    menuPressed: function(data) {
      var currForm = kony.application.getCurrentForm();

      if (this.view.flxDots.origin) {
        if (kony.application.getCurrentBreakpoint() !== 1024) {
          this.view.flxDots.origin = false;
          return;
        }
      }
      var section = currForm.WatchlistExtended.segWatchlist.selectedRowIndex[0];
      var index = currForm.WatchlistExtended.segWatchlist.selectedRowIndex[1];
      var segmentData = currForm.WatchlistExtended.segWatchlist.data[section][1];

      segmentData[index].onWatchlistActions();

      if (currForm.watchlistActionsMenu.isVisible === true) {
        currForm.watchlistActionsMenu.isVisible = false;
        currForm.forceLayout();
      } else {
        currForm.watchlistActionsMenu.isVisible = true;
        currForm.forceLayout();
      }
    },

    setClickOrigin: function() {
      return;
    },
  };
});