function AddPerformanceLineChart(labels, data1, data2, filter) {
    var jsonStr = [{ meta: labels[0], value: data1[0] }];
    var plotObj1 = new Array();
    var i = 0;
    var combinedArray = [].concat(data1, data2);
    
    for (i in data1) {
        var firstLine = labels[i] + "\n";
        plotObj1.push({ meta: firstLine, value: data1[i] });
    }
    if (data2.length != 0) {
        var jsonStr = [{ meta: labels[0], value: data2[0] }];
        var plotObj2 = new Array();
        var i = 0;
        for (i in data2) {
            var firstLine = labels[i] + "\n";
            plotObj2.push({ meta: firstLine, value: data2[i] });
        }
    }

	//Converting into the form of "MMM YYYY" from MM/DD/YYYY - Eg: "Jan 2022" 
    var x_lables = [];
    try {
        labels.forEach(function (label) {
            const date = new Date(label);
            let x_label = date.toLocaleString('en-us', { month: 'short' }) + " " + date.getFullYear();
            x_lables.push(x_label);
        });
    } catch (error) {

    }
	//Adding the unique months
    var expectedMonth = showOnlyFewMonth(x_lables, filter);
    
    var interpolationFunc = (value, index, x_lables) => index === x_lables.findIndex(l => l === x_lables) ? x_lables : null;
    let dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    switch (filter) {
        case 'OneY':
            dateOptions = { year: 'numeric', month: 'short' };
            interpolationFunc = (value, index, x_lables) => {
                try {
                    const d = new Date();
                    let currentmonth = months[d.getMonth()];
                    const date = new Date(value);
                    let value1 = date.toLocaleString('en-us', { month: 'short' }) + " " + date.getFullYear();
                    if (index === x_lables.findIndex(l => l === value) && expectedMonth.includes(value1.slice(0, 3)) &&
                        (value1.slice(0, 3) !== currentmonth && value1.slice(0, 3) != "Jan")) {
                        expectedMonth.shift();
                        return value1.slice(0, 4);
                    } else if (index === x_lables.findIndex(l => l === value)
                        && (value1.slice(0, 3) == currentmonth && value1.slice(4, 8) == d.getFullYear() && value1.slice(0, 3) != "Jan")) {
                        expectedMonth.shift();
                        return value1.slice(0, 4);
                    } else if (index === x_lables.findIndex(l => l === value) && expectedMonth.includes(value1.slice(4, 8)) &&
                        (value1.slice(4, 8) == d.getFullYear() && value1.slice(0, 3) === "Jan")) {
                        return value1.slice(4, 8);
                    } else {
                        return null;
                    }
                } catch (e) {
                    return 'e' + e;
                }
            };
            break;

        case 'Inception':
            dateOptions = { year: 'numeric', month: 'short' };
            interpolationFunc = (value, index, x_lables) => {
                try {
					//Making dividend index from Array Length
					let initialdiv;
                    if (x_lables.length <= 6) {
                        initialdiv = 1;
                    } else if (x_lables.length > 6 && x_lables.length <= 12) {
                        initialdiv = 2;
                    } else if (x_lables.length > 12 && x_lables.length <= 16) {
                        initialdiv = 3;
                    } else if (x_lables.length > 16 && x_lables.length <= 22) {
                        initialdiv = 4;
                    } else if (x_lables.length > 22 && x_lables.length <= 29) {
                        initialdiv = 5;
                    } else {
                        initialdiv = Math.floor(x_lables.length / 5);
                    }
					//Adding the X-Axis Values maximum of 12
					let div = initialdiv;
                    let xcount = 1;
                    let returnList = [];
					for (let i = 0; i < x_lables.length; i++) {
                        if (i == 0) {
                            returnList.push(x_lables[i]);
                        } else if (i != div) {
                            returnList.push(null);
                        } else if (i == div) {
                            if (xcount >= 5) {
                                returnList.push(null);
                            } else {
                                returnList.push(x_lables[i]);
                                div = div + initialdiv;
                                xcount++;
                            }
                        }
                    }
					//Returning the Time Period as per index
					let x = returnList[index];
					if (x !== null) {
                        return (new Date(returnList[index]).toLocaleString('en-us', { month: 'short' }) + "'" + returnList[index].slice(-2));
                    } else {
                        return null;
                    }

                } catch (e) {
                    return 'e' + e;
                }
            };
            break;

        case 'YTD':
            dateOptions = { year: 'numeric', month: 'short' };
            interpolationFunc = (value, index, x_lables) => {
                try {
                    const d = new Date();
                    let currentmonth = months[d.getMonth()];
                    const date = new Date(value);
                    let value1 = date.toLocaleString('en-us', { month: 'short' }) + " " + date.getFullYear();
                    if (index === x_lables.findIndex(l => l === value) && expectedMonth.includes(value1.slice(0, 3)) &&
                        (value1.slice(0, 3) !== currentmonth && value1.slice(0, 3) != "Jan")) {
                        expectedMonth.shift();
                        return value1.slice(0, 4);
                    } else if (index === x_lables.findIndex(l => l === value)
                        && (value1.slice(0, 3) == currentmonth && value1.slice(4, 8) == d.getFullYear() && value1.slice(0, 3) != "Jan")) {
                        expectedMonth.shift();
                        return value1.slice(0, 4);
                    } else if (index === x_lables.findIndex(l => l === value) && expectedMonth.includes(value1.slice(4, 8)) &&
                        (value1.slice(4, 8) == d.getFullYear() && value1.slice(0, 3) === "Jan")) {
                        return value1.slice(4, 8);
                    } else {
                        return null;
                    }
                } catch (e) {
                    return 'e' + e;
                }
            };
            break;

        default:
            dateOptions = { year: 'numeric', month: 'short' };
            interpolationFunc = (value, index, x_lables) => {
                try {
					//Making dividend index from Array Length
					let initialdiv;
                    if (x_lables.length <= 6) {
                        initialdiv = 1;
                    } else if (x_lables.length > 6 && x_lables.length <= 12) {
                        initialdiv = 2;
                    } else if (x_lables.length > 12 && x_lables.length <= 16) {
                        initialdiv = 3;
                    } else if (x_lables.length > 16 && x_lables.length <= 22) {
                        initialdiv = 4;
                    } else if (x_lables.length > 22 && x_lables.length <= 29) {
                        initialdiv = 5;
                    } else {
                        initialdiv = Math.floor(x_lables.length / 5);
                    }
					//Adding the X-Axis Values maximum of 12
					let div = initialdiv;
                    let xcount = 1;
                    let returnList = [];
					for (let i = 0; i < x_lables.length; i++) {
                        if (i == 0) {
                            returnList.push(x_lables[i]);
                        } else if (i != div) {
                            returnList.push(null);
                        } else if (i == div) {
                            if (xcount >= 5) {
                                returnList.push(null);
                            } else {
                                returnList.push(x_lables[i]);
                                div = div + initialdiv;
                                xcount++;
                            }
                        }
                    }
					//Returning the Time Period as per index
					let x = returnList[index];
					if (x !== null) {
                        return (new Date(returnList[index]).toLocaleString('en-us', { month: 'short' }) + "'" + returnList[index].slice(-2));
                    } else {
                        return null;
                    }

                } catch (e) {
                    return 'e' + e;
                }
            };
            break;
    }
    var options = {
        showArea: true,
        showPoint: true,
        lineSmooth: false,
        width: "100%",
        height: "100%",
        fullWidth: true,
        chartPadding: {
            right: 50
        },
        axisX: {
            showGrid: true,
            showLabel: true,
            labelInterpolationFnc: interpolationFunc
        },
        axisY: {
            showGrid: true,
            showLabel: true,
            low: Math.min.apply(null, combinedArray),
            high: Math.max.apply(null, combinedArray),
            divisor: 20,
            ticks: null,
            labelInterpolationFnc: function (value) {
                return value + "%";
            }
        },
    };
    var chart = new Chartist.Line('.ct-chart', {
        labels: labels,
        series: [plotObj1, plotObj2]
    }, options);









    chart.on('draw', function (context) {
        if (context.type === 'label' && context.axis.units.pos === 'y') {
            context.element.attr({
                x: context.axis.chartRect.width() + parseInt("100")
            });
        }
        if (context.type === 'bar') {
            context.element.attr({
                x1: context.x1 + 0.001
            });
        }
    });


    chart.on('draw', function (context) {
        if (context.type === 'label' && context.axis.units.pos === 'y') {
            context.element.attr({
                x: context.axis.chartRect.width() + parseInt("60")
            });
        }
        if (context.type === 'point' && context.index == labels.length - 2) {

            var triangle = new Chartist.Svg('path', {
                d: ['M',
                    context.x + 10,
                    context.y + 10,
                    'L',
                    context.x + 100,
                    context.y + 10,
                    'L',
                    context.x + 100,
                    context.y - 10,
                    'L',
                    context.x + 10,
                    context.y - 10,
                    'L',
                    context.x,
                    context.y,
                    'z'].join(' '),
                style: 'fill-opacity: 1'
            }, 'ct-area');

            // With data.element we get the Chartist SVG wrapper and we can replace the original point drawn by Chartist with our newly created triangle
            //  context.element.replace(triangle);
        }
    });


    // To Apply Chart Area Color
    chart.on('created', function (ctx) {
        var defs = ctx.svg.elem('defs');
        defs.elem('linearGradient', {
            id: 'gradient',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
        }).elem('stop', {
            offset: 0,
            'stop-color': '#3E75A6'
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': '#3E75A6'
        });
    });

}
function showOnlyFewMonth(xLabels, filter) {
    let finalMonthArray = [];
    let monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentYear = (new Date()).getFullYear();
    if (xLabels.length > 0) {
        let temArray = [];
        for (let i = 0; i <= xLabels.length - 1; i++) {
            const x=xLabels[i].split(" ");
            const d = new Date(parseInt(x[1]),monthlist.indexOf(x[0])+1,0);
            if (temArray.indexOf(monthlist[d.getMonth()]) === -1) {
                temArray.push(monthlist[d.getMonth()]);
            }
            if ((xLabels.length - 1) === i) {
                temArray.push(monthlist[d.getMonth()]);
            }
        }
        for (let j = 0; j <= temArray.length - 1; j++) {
            if (temArray.length > 0 && finalMonthArray.indexOf(temArray[j]) === -1) {
                temArray[j] === "Jan" ? finalMonthArray.push(currentYear.toString()) : finalMonthArray.push(temArray[j]);
            }
        }
    }
    if (filter === 'YTD' && finalMonthArray.length === 5) {
        finalMonthArray.pop();
    }
    if (finalMonthArray.length > 6) {
        let tempArray = [];
        for (let i = 0; i < finalMonthArray.length; i++) {
            if (i % 2 === 0) {
                tempArray.push(finalMonthArray[i]);
            }
            if (finalMonthArray[i] === currentYear.toString()) {
                tempArray.push(finalMonthArray[i]);
                i++;
            }
        }
        return tempArray;
    }
    return finalMonthArray;
}