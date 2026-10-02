define({
  /**
   * Triggers when the view is created.
   */
  onViewCreated: function () {
    [
      'lblSortIcon1', 'lblSortIcon2', 'lblSortIcon3', 'lblSortIcon4', 'lblSortIcon5', 'lblSortIcon6', 'lblSortIcon7'
    ].forEach(w => this.view[w].cursorType = 'pointer');
  }
});