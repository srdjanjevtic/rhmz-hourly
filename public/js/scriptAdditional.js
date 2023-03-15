import { toggleEnd, toggleSubset, toggleMainField, formDataToJSObj, closeFieldset } from "./functions/form.js"

const myForm = document.getElementById("myAdditionalForm")
const btnCancel = document.getElementById("btnCancel")

document.addEventListener("DOMContentLoaded", init)

function init() {
    const dateStart = document.getElementById("date")
    const dateEnd = document.getElementById("dateEnd")
    const timeStart = document.getElementById("time")
    const temp = document.getElementById("temperatura")
    const minT = document.getElementById("min-temperatura")
    const maxT = document.getElementById("max-temperatura")
    const pritisak = document.getElementById("pritisak")
    const minP = document.getElementById("min-pritisak")
    const maxP = document.getElementById("max-pritisak")
    const vlaga = document.getElementById("vlaga")
    const minV = document.getElementById("min-vlaga")
    const maxV = document.getElementById("max-vlaga")
    const minPravac = document.getElementById("min-pravac")
    const maxPravac = document.getElementById("max-pravac")
    const brzinaVetra = document.getElementById("brzVetra")
    const minBV = document.getElementById("min-brzina")
    const maxBV = document.getElementById("max-brzina")
    
    const legends = document.getElementsByTagName("legend")
    for(const legend of legends) {
        legend.setAttribute("title", "klikni da ukloniš")
        legend.addEventListener("click", closeFieldset)
    }

    myForm.addEventListener("submit", submitForm)
    btnCancel.addEventListener("click", resetForm)
    dateStart.addEventListener("change", toggleEnd)
    dateStart.max = new Date().toISOString().split("T")[0]
    dateEnd.max = new Date().toISOString().split("T")[0]
    timeStart.addEventListener("change", toggleEnd)
    temp.addEventListener("change", toggleSubset)
    minT.addEventListener("change", toggleMainField)
    maxT.addEventListener("change", toggleMainField)
    vlaga.addEventListener("change", toggleSubset)
    minV.addEventListener("change", toggleMainField)
    maxV.addEventListener("change", toggleMainField)
    pritisak.addEventListener("change", toggleSubset)
    minP.addEventListener("change", toggleMainField)
    maxP.addEventListener("change", toggleMainField)
    minPravac.addEventListener("change", toggleMainField)
    maxPravac.addEventListener("change", toggleMainField)
    brzinaVetra.addEventListener("change", toggleSubset)
    minBV.addEventListener("change", toggleMainField)
    maxBV.addEventListener("change", toggleMainField)
}

function submitForm(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    let myForm = ev.target
    let fd = new FormData(myForm)
    const jsData = formDataToJSObj(fd)
    if (jsData["Time"] === "") delete jsData["Time"]
    if (jsData["timeEnd"] === "") delete jsData["timeEnd"]
    console.log(jsData)
    const searchParams = new URLSearchParams(jsData)
    const queryString = searchParams.toString()
    const urlQS = "/getAdditional?" + queryString
    window.location.href = urlQS
}

function resetForm(ev) {
    ev.preventDefault()
    const fields = document.querySelectorAll("fieldset")
    fields.forEach(fieldset => fieldset.style.display = "block")
    const pretraga = document.getElementById("pretraga")
    window.scrollTo({ top: pretraga, behavior: "smooth"})
    myForm.reset()
}