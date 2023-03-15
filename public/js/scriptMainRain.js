import { toggleEnd, toggleSubset, toggleMainField, formDataToJSObj, closeFieldset } from "./functions/form.js"

const myForm = document.getElementById("myMainForm")
const btnCancel = document.getElementById("btnCancel")

document.addEventListener("DOMContentLoaded", init)

function init() {
    const dateStart = document.getElementById("date")
    const dateEnd = document.getElementById("dateEnd")
    const padavine = document.getElementById("padavine")
    const minP = document.getElementById("min-padavine")
    const maxP = document.getElementById("max-padavine")
    
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
    padavine.addEventListener("change", toggleSubset)
    minP.addEventListener("change", toggleMainField)
    maxP.addEventListener("change", toggleMainField)
}

function submitForm(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    let myForm = ev.target
    let fd = new FormData(myForm)
    const jsData = formDataToJSObj(fd)
    const searchParams = new URLSearchParams(jsData)
    const queryString = searchParams.toString()
    const urlQS = "/getMainRain?" + queryString
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