function AddDonutChart(labels, series){
	var donutChart = new Chartist.Pie('#donutchart', {
		labels: labels,
		series: series
		}, {
		  donut: true,
		  donutWidth: 17,
		  donutSolid: true,
		  startAngle: 0,
		  showLabel: true,
		  labelOffset: 5,
		  labelPosition: 'outside',
		  labelDirection: 'explode',
      	  width: "100%",
          height: "100%",
      	  chartPadding: 10
		}
	);
}