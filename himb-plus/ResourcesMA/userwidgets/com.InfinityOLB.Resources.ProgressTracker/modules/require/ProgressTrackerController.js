define(function () {
	return {
		/**
		 * Performs actions before rendering component.
		 */
		preShow: function () {
			this.view.flxDropdown.onClick = this.toggleDropdown;
			this.view.segSections.widgetDataMap = {
				'flxHorizontalLine': 'flxHorizontalLine',
				'flxNumber': 'flxNumber',
				'flxProgressTracker': 'flxProgressTracker',
				'flxRow': 'flxRow',
				'lblNumber': 'lblNumber',
				'lblStatus': 'lblStatus',
				'lblTitle': 'lblTitle'
			};
		},
		/**
		 * Sets the progress tracker data.
		 * @param {object} param Specifies the context.
		 */
		setData: function ({ heading, subheading, data }) {
			this.view.lblHeading.text = heading || '';
			this.view.lblSubheading.text = subheading || '';
			let segData = [], idx = 0;
			for (const record of data) {
				idx++;
				const segRowData = this.getRowData(record, idx);
				if (record.isCurrentRow) {
					segRowData['flxRow'] = {
						'skin': 'sknFlxInProgressRowRoadmap',
						'height': '40dp'
					};
				}
				segData.push(segRowData);
			}
			segData[data.length - 1]['flxHorizontalLine'] = {
				'isVisible': false
			};
			this.view.segSections.setData(segData);
		},
		/**
		 * Gets the row data.
		 * @param {object} rowData - Specifies the row data.
		 * @param {number} rowNumber - Specifies the current row number.
		 */
		getRowData: function (rowData, rowNumber) {
			switch (rowData.status) {
				case 'completed':
					return this._getCompletedRow(rowData);
				case 'inprogress':
					return this._getInProgressRow(rowData, rowNumber);
				default:
					return this._getIncompleteRow(rowData, rowNumber);
			}
		},
		/**
		 * Get completed row data.
		 * @param {object} data - Specifies completed row data.
		 */
		_getCompletedRow: function (data) {
			return {
				'flxRow': {
					'skin': 'slFbox',
					'height': '30dp'
				},
				'lblTitle': {
					'text': data.title || '',
					'skin': 'sknlbl3B74A615px'
				},
				'lblNumber': {
					'text': '\uE93C',
					'skin': 'sknLbl04A615InfinityIcons30px'
				},
				'flxNumber': {
					'skin': 'slFbox'
				}
			};
		},
		/**
		 * Get inprogress row data.
		 * @param {object} data - Specifies inprogress row data.
		 * @param {number} rowNumber - Specifies the current row number.
		 */
		_getInProgressRow: function (data, rowNumber) {
			return {
				'flxRow': {
					'skin': 'slFbox',
					'height': '30dp'
				},
				'lblTitle': {
					'text': data.title || '',
					'skin': 'ICSknSSP42424215Px'
				},
				'lblNumber': {
					'text': String(rowNumber),
					'skin': 'ICSknLblFFFFFF15PX'
				},
				'flxNumber': {
					'skin': 'sknFlxInProgressCircleRoadmap'
				},
				'lblStatus': kony.i18n.getLocalizedString('i18n.statements.inProgress')
			};
		},
		/**
		 * Get incomplete row data.
		 * @param {object} data - Specifiesdata for incomplete row
		 * @param {number} rowNumber - Specifies the current row number.
		 */
		_getIncompleteRow: function (data, rowNumber) {
			return {
				'flxRow': {
					'skin': 'slFbox',
					'height': '30dp'
				},
				'lblTitle': {
					'text': data.title || '',
					'skin': 'ICSknLbl949494SSPR15px'
				},
				'lblNumber': {
					'text': String(rowNumber),
					'skin': 'ICSknLabelSSPRegular42424215px'
				},
				'flxNumber': {
					'skin': 'sknFlxInactiveCircleRoadmap'
				}
			};
		},
		/**
		 * Toggle the dropdown.
		 */
		toggleDropdown: function () {
			if (this.view.flxSections.isVisible) {
				this.view.flxSections.setVisibility(false);
				this.view.lblDropdown.text = 'O';
			} else {
				this.view.flxSections.setVisibility(true);
				this.view.lblDropdown.text = 'P';
			}
		}
	};
});