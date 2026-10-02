function drawStrategyDonutChart(series){
/* var colors = ["#3E75A6", "#2C82BE", "#24BFEC", "#76DDFB", "#C7CCD5", "#3E75A6", "#2C82BE", "#24BFEC"];
var plotObj = new Array();
var i=0;
for (i in series)
{
var firstLine = colors[i] + "@" +assetClass[i] + "  " + marketValue[i] ;
plotObj.push({meta: firstLine, value: series[i]});
} */
var colArray =["#0475C4","#43A2CA","#7BCCC4","#BAE4BC","#E9FED4","#E55845","#E48444","#E8DD46","#54D75D","#04C477","#6753EC","#E3E3E3","#424242"];

	var donutChart = new Chartist.Pie('#StrategyDonutChart', {
		//labels: labels,
		series: series
		}, {
		  donut: true,
		  donutWidth: 40,
		  startAngle: 0,
		 // showLabel: true,
		  labelOffset: 2,
		  //plugins: [Chartist.plugins.tooltip2()],
		  chartPadding: 8
		}
	);
  donutChart.on('draw', function(data) {
  if(data.type === 'slice') {
    if (colArray[data.index]) {
      data.element._node.setAttribute('style','stroke: ' + colArray[data.index] + '; stroke-width: ' + 40 + 'px');
    }
  }
});

}
  