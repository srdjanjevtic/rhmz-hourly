const canvas1 = document.getElementById("myChart1");
canvas1.width = screen.availWidth;
canvas1.height = screen.availHeight;
const myChart1 = canvas1.getContext("2d");
const canvas2 = document.getElementById("myChart2");
canvas2.width = screen.availWidth;
canvas2.height = screen.availHeight;
const myChart2 = canvas2.getContext("2d");

const stationHeader = document.getElementById("station-header");
const dayHeader = document.getElementById("day-header");

window.addEventListener("message", (event) => {
    const closeWindow = (message) => {
        window.opener.postMessage({ msg: message }, "*");
    };
    stationHeader.addEventListener("click", closeWindow(`Powered by <a href='https://www.chartjs.org/' target='blank'><img src='https://www.chartjs.org/img/chartjs-logo.svg' alt='Chart.js logo'></a><span> Chart.js</span>`));
    if (event.data?.dateArraySize && event.data.dateArraySize == 1) {
        dayHeader.innerText = `${event.data.day}`
    } else {
        dayHeader.innerText = "";
    }
    if (event.data?.station) {
        stationHeader.innerText = `${event.data.station}`;

const barChart1 = new Chart(myChart1, {
    type: "bar",
    data: {
        labels: event.data.opisVremenaLabels,
        datasets: [{
            label: "Sati",
            animations: {
                easing: "easeInCirc",
                y: {
                    duration: 2000,
                    delay: 500
                }
            },
            data: event.data.opisArr,
            backgroundColor: [
                "rgba(5, 199, 32, 0.5)",
                "rgba(205, 25, 132, 0.5)",
                "rgba(155, 99, 232, 0.5)",
                "rgba(255, 59, 164, 0.5)",
                "rgba(155, 205, 86, 0.5)",
                "rgba(75, 92, 92, 0.5)",
                "rgba(154, 162, 235, 0.5)",
                "rgba(153, 202, 255, 0.5)",
                "rgba(101, 203, 107, 0.5)",
                "rgba(23, 102, 255, 0.5)",
                "rgba(83, 202, 5, 0.5)",
                "rgba(153, 112, 105, 0.5)",
                "rgba(203, 111, 25, 0.5)",
                "rgba(12, 35, 115, 0.5)",
                "rgba(83, 142, 241, 0.5)",
                "rgba(154, 86, 33, 0.5)",
                "rgba(222, 244, 174, 0.5)",
                "rgba(88, 187, 78, 0.5)",
                "rgba(48, 28, 188, 0.5)",
                "rgba(248, 128, 8, 0.5)"
                ],
            borderColor: [
                "rgb(5, 199, 32)",
                "rgb(205, 25, 132)",
                "rgb(155, 99, 232)",
                "rgb(255, 59, 164)",
                "rgb(155, 205, 86)",
                "rgb(75, 92, 92)",
                "rgb(154, 162, 235)",
                "rgb(153, 202, 255)",
                "rgb(101, 203, 107)",
                "rgb(23, 102, 255)",
                "rgb(83, 202, 5)",
                "rgb(153, 112, 105)",
                "rgb(203, 111, 25)",
                "rgb(12, 35, 115)",
                "rgb(83, 142, 241)",
                "rgb(154, 86, 33)",
                "rgb(222, 244, 174)",
                "rgb(88, 187, 78)",
                "rgb(48, 28, 188)",
                "rgb(248, 128, 8)"
            ],
            borderWidth: 1,
            hoverBorderWidth: 3
        }]
        },
    options: {
        responsive: true,
        minBarLength: 5,
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
                    display: true,
                    text: "Opis vremena",
                    color: "#5186ad",
                    font: {
                        family: "Poppins",
                        size: 32,
                        weight: "bold",
                        lineHeight: 1.4,
                    },
                    padding: { top: 5, left: 0, right: 0, bottom: 0 }
                }
            },
            y: {
                display: true,
                suggestedMin: Math.min(...event.data.opisArr),
                suggestedMax: Math.max(...event.data.opisArr),
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
                    text: "sati",
                    color: "#aaa",
                    font: {
                        family: "Poppins",
                        size: 32,
                        style: "normal",
                        lineHeight: 1.4
                    },
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
                }
            }
        },
        plugins: {
        legend: {
            display: false
            }
        }
    }
}
);

const barChart2 = new Chart(myChart2, {
    type: "bar",
    data: {
        labels: event.data.pravacVetraLabels,
        datasets: [{
            label: "Sati",
            animations: {
                easing: "easeInOutBack",
                y: {
                duration: 2000,
                delay: 500
                }
            },
            data: event.data.pravacArr,
            backgroundColor: [
                "rgba(155, 99, 232, 0.5)",
                "rgba(255, 59, 164, 0.5)",
                "rgba(155, 205, 86, 0.5)",
                "rgba(75, 92, 92, 0.5)",
                "rgba(154, 162, 235, 0.5)",
                "rgba(153, 202, 255, 0.5)",
                "rgba(101, 203, 107, 0.5)",
                "rgba(23, 102, 255, 0.5)",
                "rgba(83, 202, 5, 0.5)",
                "rgba(153, 112, 105, 0.5)",
                "rgba(203, 111, 25, 0.5)",
                "rgba(12, 35, 115, 0.5)",
                "rgba(83, 142, 241, 0.5)",
                "rgba(154, 86, 33, 0.5)",
                "rgba(222, 244, 174, 0.5)",
                "rgba(88, 187, 78, 0.5)",
                "rgba(48, 28, 188, 0.5)"
            ],
            borderColor: [
                "rgb(155, 99, 232)",
                "rgb(255, 59, 164)",
                "rgb(155, 205, 86)",
                "rgb(75, 92, 92)",
                "rgb(154, 162, 235)",
                "rgb(153, 202, 255)",
                "rgb(101, 203, 107)",
                "rgb(23, 102, 255)",
                "rgb(83, 202, 5)",
                "rgb(153, 112, 105)",
                "rgb(203, 111, 25)",
                "rgb(12, 35, 115)",
                "rgb(83, 142, 241)",
                "rgb(154, 86, 33)",
                "rgb(222, 244, 174)",
                "rgb(88, 187, 78)",
                "rgb(48, 28, 188)"
            ],
            borderWidth: 1,
            hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            minBarLength: 5,
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
                    display: true,
                    text: "Pravac vetra",
                    color: "#258468",
                    font: {
                        family: "Poppins",
                        size: 32,
                        weight: "bold",
                        lineHeight: 1.4,
                    },
                    padding: { top: 5, left: 0, right: 0, bottom: 0 }
                }
            },
                y: {
                    display: true,
                    suggestedMin: Math.min(...event.data.pravacArr),
                    suggestedMax: Math.max(...event.data.pravacArr),
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
                        text: "sati",
                        color: "#aaa",
                        font: {
                            family: "Poppins",
                            size: 32,
                            style: "normal",
                            lineHeight: 1.4
                        },
                        padding: { top: 30, left: 0, right: 0, bottom: 0 }
                    }
                }
            },
            plugins: {
            legend: {
                display: false
            }
        }
    }
}
);
}
});
