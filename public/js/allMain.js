import { formDataToJSObj } from "./functions/form.js"

document.addEventListener("DOMContentLoaded", init)

function init() {
    const myForm = document.getElementById("allMainForm")
    myForm.addEventListener("submit", submitForm)
}

function submitForm(ev) {
    ev.preventDefault()
    let myForm = ev.target
    let fd = new FormData(myForm)
    const jsData = formDataToJSObj(fd)
    const searchParams = new URLSearchParams(jsData)
    const queryString = searchParams.toString()
    const urlQS = "/getAllMain?" + queryString
    window.location.href = urlQS
}
