const canvas1 = document.getElementById("myChart1");
const myChart1 = canvas1.getContext("2d");
const canvas2 = document.getElementById("myChart2");
const myChart2 = canvas2.getContext("2d");
const canvas3 = document.getElementById("myChart3");
const myChart3 = canvas3.getContext("2d");
const canvas4 = document.getElementById("myChart4");
const myChart4 = canvas4.getContext("2d");

const stationHeader = document.getElementById("station-header")
const dayHeader = document.getElementById("day-header")

window.addEventListener("message", (event) => {
    let labelsArr = []
    let tempsArr = []
    let subjArr = []
    let humArr = []
    let pritArr = []
    let vetarArr = []
    let pVetraArr = []
    let station = null
    let day = null
    let averageTemp = null
    let averagePVetra = null
    let averageHumidity = null
    let averagePritisak = null
    let averageWindSpeed = null
    if (event.data?.station) {
        station = event.data.station
        stationHeader.innerText = `${station}`
    }
    if (event.data?.labels && event.data?.day) {
        labelsArr = event.data.labels.split(",")
        let labelsArrCopy = [];
        [...labelsArr].forEach(el => {
            labelsArrCopy.push(el.slice(0, 6))
        })
        let tempArr = []
        if (labelsArrCopy.every(v => v === labelsArrCopy[0])) {
            [...labelsArr].forEach(el => {
                tempArr.push(el.slice(-6, -3))
            })
            labelsArr = [...tempArr]
        day = event.data.day
        dayHeader.innerText = `${day}`
        } else {
        dayHeader.innerText = ""
    }
    }
    if (event.data?.temp) {
        tempsArr = event.data.temp.split(",")
        const tempsArrNum = tempsArr.map(str => parseFloat(str, 10))
        averageTemp = tempsArrNum.reduce((a, b) => a + b, 0) / tempsArrNum.length
    }
    if (event.data?.subjTemp) {
        subjArr = event.data.subjTemp.split(",")
    }
    if (event.data?.pVetra) {
        pVetraArr = event.data.pVetra.split(",")
        const pVetraArrNum = pVetraArr.map(str => parseFloat(str, 10))
        averagePVetra = pVetraArrNum.reduce((a, b) => a + b, 0) / pVetraArrNum.length
    }
    if (event.data?.hum) {
        humArr = event.data.hum.split(",")
        const humArrNum = humArr.map(str => parseInt(str, 10))
        averageHumidity = humArrNum.reduce((a, b) => a + b, 0) / humArrNum.length
    }
    if (event.data?.prit) {
        pritArr = event.data.prit.split(",")
        const pritArrNum = pritArr.map(str => parseInt(str, 10))
        averagePritisak = pritArrNum.reduce((a, b) => a + b, 0) / pritArrNum.length
}
    if (event.data?.bVetra) {
        vetarArr = event.data.bVetra.split(",")
        const vetarArrNum = vetarArr.map(str => parseFloat(str, 10))
        averageWindSpeed = vetarArrNum.reduce((a, b) => a + b, 0) / vetarArrNum.length    
    
    const chartAreaBorder = {
        id: "chartAreaBorder",
        beforeDraw(chart, args, options) {
            const {ctx, chartArea: {left, top, width, height}} = chart;
            ctx.save();
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth; 
            ctx.setLineDash(options.borderDash || []);
            ctx.lineDashOffset = options.borderDashOffset;
            ctx.strokeRect(left, top, width, height);
            ctx.restore();
        }
    }

const lineChart1 = new Chart(myChart1, {
    type: "line",
    data: {
        labels: labelsArr,
        datasets: [
            {
            label: "Temperatura(°C)",
            animations: {
                y: {
                duration: 2000,
                delay: 500
                }
            },
            data: tempsArr,
            backgroundColor: "#12356225",
            borderColor: "orange",
            borderWidth: 1,
            fill: true,
            tension: 0,
            pointStyle: true,
            pointRadius: 5,
            pointHoverRadius: 10
        },
            {
            label: "Subj.osećaj(°C)",
            animations: {
                y: {
                duration: 2300,
                delay: 400
                }
            },
            data: subjArr,
            backgroundColor: "#12652225",
            borderColor: "yellow",
            borderWidth: 1,
            fill: true,
            tension: 0,
            pointStyle: true,
            pointRadius: 5,
            pointHoverRadius: 10
        }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                },
                ticks: {
                    color: "#aaa",
                },
                title: {
                    display: false,
                    text: "Vreme",
                    color: "#aaa",
                    font: {
                        family: "Poppins",
                        size: 18,
                        weight: "bold",
                        lineHeight: 1.4,
                    },
                    padding: { top: 5, left: 0, right: 0, bottom: 0 }
                }
            },
            y: {
                display: true,
                suggestedMin: averageTemp * 0.5,
                suggestedMax: averageTemp * 2,
                border: {
                display: true
                },
                grid: {
                    color: "#aaa"
                },
                ticks: {
                    color: "#aaa"
                },
                title: {
                    display: true,
                    text: "Temperatura (°C)",
                    color: "#aaa",
                    font: {
                        family: "Poppins",
                        size: 18,
                        style: "normal",
                        lineHeight: 1.4
                    },
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
                }

            }
        },
        interaction: {
            mode: "index",
            intersect: true,
            },
            stacked: true,
        animations: {
            y: {
                easing: "easeInOutElastic",
                from: (ctx) => {
                    if (ctx.type === "data") {
                        if (ctx.mode === "default" && !ctx.dropped) {
                            ctx.dropped = true;
                            return 0;
                        }
                    }
                }
            },
            radius: {
                duration: 400,
                easing: "linear",
                loop: (context) => context.active
            },
            hoverRadius: 12,
            hoverBackgroundColor: "yellow",
            interaction: {
            mode: "nearest",
            intersect: false,
            axis: "x"
            },
        },
        borderDashOffset: 25,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        tooltips: {
            enabled: true
        },
        plugins: {
            title: {
                display: false,
                text: `${station} - promene temperature`,
                fontSize: 24
            },
            legend: {
                display: false,
                position: "top",
                labels: {
                    fontColor: "#fff"
                }
            },
            chartAreaBorder: {
                borderColor: "#aaa",
                borderWidth: 2,
                borderDash: [2, 5],
                borderDashOffset: 2,
            }
        },
    },
    plugins: [chartAreaBorder]
})

const lineChart2 = new Chart(myChart2, {
    type: "line",
    data: {
    labels: labelsArr,
    datasets: [
        {
        label: "Vlažnost(%)",
        animations: {
            y: {
            duration: 3000,
            delay: 300
            }
        },
        data: humArr,
        backgroundColor: "#3e214150",
        borderColor: "green",
        borderWidth: 1,
        fill: true,
        tension: 0,
        pointStyle: true,
        pointRadius: 5,
        pointHoverRadius: 10
    }
    ]
    },
    options: {
    responsive: true,
    scales: {
        x: {
            display: true,
            grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: true,
            },
            ticks: {
                color: "#aaa",
            },
            title: {
                display: false,
                text: "Vreme",
                color: "#aaa",
                font: {
                    family: "Poppins",
                    size: 18,
                    weight: "bold",
                    lineHeight: 1.4,
                },
                padding: { top: 5, left: 0, right: 0, bottom: 0 }
            }
        },
        y: {
            display: true,
            suggestedMin: averageHumidity * 0.66,
            suggestedMax: Math.min[averageHumidity * 1.33, 100],
            border: {
            display: true
            },
            grid: {
                color: "#aaa"
            },
            ticks: {
                color: "#aaa"
            },
            title: {
                display: true,
                text: "Vlažnost (%)",
                color: "#aaa",
                font: {
                    family: "Poppins",
                    size: 18,
                    style: "normal",
                    lineHeight: 1.4
                },
                padding: { top: 30, left: 0, right: 0, bottom: 0 }
            }

        }
    },
    interaction: {
        mode: "index",
        intersect: true,
        },
    stacked: true,
    animations: {
        y: {
            easing: "easeInOutElastic",
            from: (ctx) => {
                if (ctx.type === "data") {
                    if (ctx.mode === "default" && !ctx.dropped) {
                        ctx.dropped = true;
                        return 0;
                    }
                }
            }
        },
        radius: {
                        duration: 400,
                        easing: "linear",
                        loop: (context) => context.active
                    },
                    hoverRadius: 12,
                    hoverBackgroundColor: "yellow",
                    interaction: {
                    mode: "nearest",
                    intersect: false,
                    axis: "x"
                    },
    },
    borderDashOffset: 25,
    title: {
        display: true,
        text: `Vremenski parametri za ${station}` ,
        fontSize: 32
    },
    legend: {
        position: "right",
        labels: {
            fontColor: "#fff"
        }
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    tooltips: {
        enabled: true
    },
    plugins: {
        legend: {
            display: false,
            position: "top",
            labels: {
                fontColor: "#fff"
            }
        },
        chartAreaBorder: {
            borderColor: "#aaa",
            borderWidth: 2,
            borderDash: [2, 5],
            borderDashOffset: 2,
        }
    },
    },
    plugins: [chartAreaBorder]
})

const lineChart3 = new Chart(myChart3, {
    type: "line",
    data: {
    labels: labelsArr,
    datasets: [
        {
        label: "Pritisak(hPa)",
        data: pritArr,
        animations: {
            y: {
            duration: 2000,
            delay: 500
            }
        },
        backgroundColor: "#61235250",
        borderColor: "bisque",
        borderWidth: 1,
        fill: true,
        tension: 0,
        pointStyle: true,
        pointRadius: 5,
        pointHoverRadius: 10
        }
    ]
    },
    options: {
        responsive: true,
        scales: {
        x: {
            display: true,
            grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: true,
            },
            ticks: {
                color: "#aaa",
            },
            title: {
                display: false,
                text: "Vreme",
                color: "#aaa",
                font: {
                    family: "Poppins",
                    size: 18,
                    weight: "bold",
                    lineHeight: 1.4,
                },
                padding: { top: 5, left: 0, right: 0, bottom: 0 }
            }
        },
        y: {
            display: true,
            suggestedMin: averagePritisak * 0.99,
            suggestedMax: averagePritisak * 1.01,
            border: {
            display: true
            },
            grid: {
                color: "#aaa"
            },
            ticks: {
                color: "#aaa"
            },
            title: {
                display: true,
                text: "Pritisak (hPa)",
                color: "#aaa",
                font: {
                    family: "Poppins",
                    size: 18,
                    style: "normal",
                    lineHeight: 1.4
                },
                padding: { top: 30, left: 0, right: 0, bottom: 0 }
            }
        }
    },
    interaction: {
        mode: "index",
        intersect: true,
        },
        stacked: true,
    animations: {
        y: {
            easing: "easeInOutElastic",
            from: (ctx) => {
                if (ctx.type === "data") {
                    if (ctx.mode === "default" && !ctx.dropped) {
                        ctx.dropped = true;
                        return 0;
                    }
                }
            }
        },
        radius: {
                        duration: 400,
                        easing: "linear",
                        loop: (context) => context.active
                    },
                    hoverRadius: 12,
                    hoverBackgroundColor: "yellow",
                    interaction: {
                    mode: "nearest",
                    intersect: false,
                    axis: "x"
                    },
    },
    borderDashOffset: 25,
    title: {
        display: true,
        text: `Vremenski parametri za ${station}` ,
        fontSize: 32
    },
    legend: {
        position: "right",
        labels: {
            fontColor: "#fff"
        }
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    tooltips: {
        enabled: true
    },
    plugins: {
        legend: {
            display: false,
            position: "top",
            labels: {
                fontColor: "#fff"
            }
        },
        chartAreaBorder: {
            borderColor: "#aaa",
            borderWidth: 2,
            borderDash: [2, 5],
            borderDashOffset: 2,
        }
    },
    },
    plugins: [chartAreaBorder]
})

const lineChart4 = new Chart(myChart4, {
    type: "line",
    data: {
    labels: labelsArr,
    datasets: [
        {
        label: "Brz.vetra(m/s)",
        animations: {
            y: {
            duration: 2200,
            delay: 300
            }
        },
        data: vetarArr,
        backgroundColor: "magenta",
        borderColor: "magenta",
        borderWidth: 1,
        fill: 0,
        tension: 0,
        pointStyle: true,
        pointRadius: 5,
        pointHoverRadius: 10
    },
    ]
    },
    options: {
        responsive: true,
           scales: {
    x: {
        display: true,
        grid: {
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
        },
        ticks: {
            color: "#aaa",
        },
        title: {
            display: false,
            text: "Vreme",
            color: "#aaa",
            font: {
                family: "Poppins",
                size: 18,
                weight: "bold",
                lineHeight: 1.4,
            },
            padding: { top: 5, left: 0, right: 0, bottom: 0 }
        }
    },
    y: {
        display: true,
                grid: {
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
        },
        suggestedMin: 0,
        suggestedMax: averageWindSpeed * 2,
        border: {
        display: true
        },
        grid: {
            color: "#aaa"
        },
        ticks: {
            color: "#aaa"
        },
        title: {
            display: true,
            text: "Brzina vetra (m/m)",
            color: "#aaa",
            font: {
                family: "Poppins",
                size: 18,
                style: "normal",
                lineHeight: 1.4
            },
            padding: { top: 30, left: 0, right: 0, bottom: 0 }
        }
    }
},
    interaction: {
        mode: "index",
        intersect: true,
        },
    stacked: true,
    animations: {
        y: {
            easing: "easeInOutElastic",
            from: (ctx) => {
                if (ctx.type === "data") {
                    if (ctx.mode === "default" && !ctx.dropped) {
                        ctx.dropped = true;
                        return 0;
                    }
                }
            }
        },
        radius: {
                    duration: 400,
                    easing: "linear",
                    loop: (context) => context.active
                },
                hoverRadius: 12,
                hoverBackgroundColor: "yellow",
                interaction: {
                mode: "nearest",
                intersect: false,
                axis: "x"
                },
    },
    borderDashOffset: 25,
    title: {
        display: true,
        text: `Vremenski parametri za ${station}` ,
        fontSize: 32
    },
    legend: {
        position: "right",
        labels: {
            fontColor: "#fff"
        }
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    tooltips: {
        enabled: true
    },
    plugins: {
        legend: {
            display: false,
            position: "top",
            labels: {
                fontColor: "#fff"
            }
        },
        chartAreaBorder: {
            borderColor: "#aaa",
            borderWidth: 2,
            borderDash: [2, 5],
            borderDashOffset: 2,
        }
    },
    },
    plugins: [chartAreaBorder]
})      
}
    if (event.data?.msg) {
        response.innerText = event.data.msg;
    }
 })

const closeWindow = (message) => {
    window.opener.postMessage({ msg: message }, "*");
    setTimeout(w => window.close(), 1000)
}

const isSameDay = (arr1) => {
    const arr2 = arr1.slice(0, 6)
    return arr1.join(",") === arr2.join(",")
}