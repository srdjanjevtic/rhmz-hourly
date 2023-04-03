const canvas1 = document.getElementById("myChart1");
const canvas2 = document.getElementById("myChart2");
window.addEventListener("DOMContentLoaded", resize);
window.addEventListener("resize", resize);
function resize() {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
}
const stationHeader = document.querySelector(".station-header");
const averagePrecipitation = document.getElementById("average-precipitation");
const sumPrecipitation = document.getElementById("sum-precipitation");
const maxPrecipitation = document.getElementById("max-precipitation");
const averageSnowH3 = document.getElementById("average-snow-h3");
const sumSnowH3 = document.getElementById("sum-snow-h3");
const maxSnowH3 = document.getElementById("max-snow-h3");
let easing = "easeOutExpo";
let restart = false;
const totalDuration = 15000;
const duration = (ctx) => easing(ctx.index / data.length) * totalDuration / data.length;
const delay = (ctx) => easing(ctx.index / data.length) * totalDuration;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(["y"], true).y;
const progressiveAnimation = {
  x: {
    type: "number",
    easing: "linear",
    duration: duration,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== "data" || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return delay(ctx);
    }
  },
  y: {
    type: "number",
    easing: "linear",
    duration: duration,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== "data" || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return delay(ctx);
    }
  }
};

window.addEventListener("message", (event) => {
    let labelsArr = [];
    let precipArr = [];
    let snowArr = [];
    let station = null;
    let averagePrecip = null;
    let averageSnow = null;
    if (event.data?.station) {
        station = event.data.station;
        stationHeader.innerText = `${station}`;
    }
    if (event.data?.labels) {
        labelsArr = event.data.labels.split(",");
    }
    if (event.data?.sneg) {
        snowArr = event.data.sneg.split(",");
        snowArr = Array.from(snowArr, item => typeof item === "undefined" ? 0 : item);
        snowArr.forEach((item, i) => {
            if (item == "") {
                snowArr[i] = 0;
            }
        });
        const snowArrNum = snowArr.map(str => parseFloat(str, 10));
        const maxSnow = Math.max(...snowArrNum);
        const sumSnow = snowArrNum.reduce((a, b) => a + b, 0);
        averageSnow = sumSnow / snowArrNum.length;
        averageSnowH3.innerText = `Prosečna visina snežnog pokrivača za period: ${averageSnow.toFixed(2)}cm`;
        sumSnowH3.innerText = `Ukupna visina snežnog pokrivača za period: ${sumSnow}cm`;
        maxSnowH3.innerText = `Maksimalna visina snežnog pokrivača za period: ${maxSnow}cm`;
    }
    if (event.data?.padavine) {
        precipArr = event.data.padavine.split(",");
        const precipArrNum = precipArr.map(str => parseFloat(str, 10));
        const maxPrecip = Math.max(...precipArrNum);
        const sumPrecip = precipArrNum.reduce((a, b) => a + b, 0);
        averagePrecip = sumPrecip / precipArrNum.length;
        averagePrecipitation.innerText = `Prosečna količina padavina za period: ${averagePrecip.toFixed(2)}mm`;
        sumPrecipitation.innerText = `Ukupna količina padavina za period: ${sumPrecip.toFixed(2)}mm`;
        maxPrecipitation.innerText = `Maksimalna količina padavina za period: ${maxPrecip}mm`;
        const chartAreaBorder = {
            id: "chartAreaBorder",
            beforeDraw(chart, args, options) {
                const { ctx, chartArea: { left, top, width, height } } = chart;
                ctx.save();
                ctx.strokeStyle = options.borderColor;
                ctx.lineWidth = options.borderWidth;
                ctx.setLineDash(options.borderDash || []);
                ctx.lineDashOffset = options.borderDashOffset;
                ctx.strokeRect(left, top, width, height);
                ctx.restore();
            }
        };
        const lineChart1 = new Chart(myChart1, {
            type: "line",
            data: {
                labels: labelsArr,
                datasets: [
                    {
                        label: "Količina padavina (mm)",
                        animations: {
                            y: {
                                duration: 2000,
                                delay: 500
                            }
                        },
                        data: precipArr,
                        backgroundColor: "#12169345",
                        borderColor: "#fff",
                        borderWidth: 1,
                        fill: true,
                        tension: 0,
                        pointStyle: true,
                        pointRadius: 7.5,
                        pointHoverRadius: 30
                    }
                ]
            },
            options: {
                progressiveAnimation,
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
                            padding: { top: 0, left: 0, right: 0, bottom: 0 }
                        }
                    },
                    y: {
                        display: true,
                        suggestedMin: averagePrecip * 0.75,
                        suggestedMax: averagePrecip * 1.5,
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
                            text: "Količina padavina (mm)",
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
                tooltips: {
                    enabled: true
                },
                plugins: {
                    title: {
                        display: true,
                        text: `${station} - količina padavina (mm)`,
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
        });

        const lineChart2 = new Chart(myChart2, {
            type: "line",
            data: {
                labels: labelsArr,
                datasets: [
                    {
                        label: "Visina snežnog pokrivača (cm)",
                        animations: {
                            y: {
                                duration: 2000,
                                delay: 500
                            }
                        },
                        data: snowArr,
                        backgroundColor: "#ffffff25",
                        borderColor: "#fff",
                        borderWidth: 1,
                        fill: true,
                        tension: 0,
                        pointStyle: true,
                        pointRadius: 7.5,
                        pointHoverRadius: 20
                    }
                ]
            },
            options: {
                progressiveAnimation,
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
                            padding: { top: 0, left: 0, right: 0, bottom: 0 }
                        }
                    },
                    y: {
                        display: true,
                        suggestedMin: averagePrecip * 0.75,
                        suggestedMax: averagePrecip * 1.5,
                        border: {
                            display: true
                        },
                        grid: {
                            color: "#fff"
                        },
                        ticks: {
                            color: "#fff"
                        },
                        title: {
                            display: true,
                            text: "Visina snežnog pokrivača (cm)",
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
                tooltips: {
                    enabled: true
                },
                plugins: {
                    title: {
                        display: true,
                        text: `${station} - količina padavina (mm)`,
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
        });

        if (!event.data.sneg) {
            canvas2.style.display = "none"
        }
    }

});

const closeWindow = (message) => {
    window.opener.postMessage({ msg: message }, "*");
    setTimeout(w => window.close(), 1000);
};
