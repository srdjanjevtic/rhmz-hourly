document.addEventListener("DOMContentLoaded", init)
// const myForm = document.getElementById("myForm")
const temp = document.getElementById("temperatura")
const minT = document.getElementById("min-temperatura")
const maxT = document.getElementById("max-temperatura")
const brzinaVetra = document.getElementById("brzina-vetra")
///
const brzinaVetraAdd = document.getElementById("brzVetraAdd")
const pravacVetraAdd = document.getElementById("pravacVetraAdd")
///
const minBV = document.getElementById("min-brzina")
const maxBV = document.getElementById("max-brzina")
const pritisak = document.getElementById("pritisak")
const minP = document.getElementById("min-pritisak")
const maxP = document.getElementById("max-pritisak")
const vlaga = document.getElementById("vlaga")
const minV = document.getElementById("min-vlaga")
const maxV = document.getElementById("max-vlaga")
const datumStart = document.getElementById("date")
const datumEnd = document.getElementById("datumEnd")
const datumEndContainer = document.getElementById("datumEndContainer")

function init() {
    document.getElementById("myForm").addEventListener("submit", submitForm)
    document.getElementById("btnCancel").addEventListener("click", resetForm)
    const legends = document.getElementsByTagName("legend")
    for(const legend of legends) {
        legend.setAttribute("title", "klikni da ukloniš")
        legend.addEventListener("click", closeFieldset)
    }
    temp.addEventListener("change", toggleSubset)
    pritisak.addEventListener("change", toggleSubset)
    vlaga.addEventListener("change", toggleSubset)
    minT.addEventListener("change", toggleMainField)
    maxT.addEventListener("change", toggleMainField)
    minBV.addEventListener("change", toggleMainField)
    maxBV.addEventListener("change", toggleMainField)
    minP.addEventListener("change", toggleMainField)
    maxP.addEventListener("change", toggleMainField)
    minV.addEventListener("change", toggleMainField)
    maxV.addEventListener("change", toggleMainField)
    datumStart.addEventListener("change", toggleEndDate)
    datumStart.max = new Date().toISOString().split("T")[0]
    datumEnd.max = new Date().toISOString().split("T")[0]
    brzinaVetra.addEventListener("change", toggleSubset)
}

function closeFieldset(ev) {
    ev.target.parentElement.style.display = "none"
    ev.target.nextElementSibling.style.display = "none"
}

function toggleSubset(ev) {
    if (ev.target.value) {
        ev.target.parentElement.nextElementSibling.style.display = "none"
        ev.target.parentElement.nextElementSibling.nextElementSibling.style.display = "none"
    } else {
        ev.target.parentElement.nextElementSibling.style.display = "flex"
        ev.target.parentElement.nextElementSibling.nextElementSibling.style.display = "flex"
    }
}

function toggleMainField(ev) {
    if (minT.value && maxT.value) {
        temp.parentElement.style.display = "none"
    } else {
        temp.parentElement.style.display = "flex"
    }
    if (minBV.value && maxBV.value) {
        brzinaVetra.parentElement.style.display = "none"
    } else {
        brzinaVetra.parentElement.style.display = "flex"
    }
    if (minP.value && maxP.value) {
        pritisak.parentElement.style.display = "none"
    } else {
        pritisak.parentElement.style.display = "flex"
    }
    if (minV.value && maxV.value) {
        vlaga.parentElement.style.display = "none"
    } else {
        vlaga.parentElement.style.display = "flex"
    }
}

function toggleEndDate() {
    if (datumStart.value) {
        datumEndContainer.style.display = "flex"
    } else {
        datumEndContainer.style.display = "none"
    }
}

async function submitForm(ev) {
    ev.preventDefault()
    let myForm = ev.target
    let fd = new FormData(myForm)
    // fd.append("client", "jek")
    // for (let key of fd.keys()) {
    //     if (fd.get(key) == "" || fd.get(key) == null) {
    //         fd.delete(key)
    //     }
    //     console.log(key, fd.get(key))
    // }
    const jsData = formDataToJSObj(fd)
    if (jsData["Time"] === "") delete jsData["Time"]
    console.log(jsData)
    // const url = "/getMain"
    ///////////
    const searchParams = new URLSearchParams(jsData)
    const queryString = searchParams.toString()
    console.log(queryString)
    const urlQS = "/getMain?" + queryString
    window.location.href = urlQS
    ///////////
    // await axios.post(url, jsData)
    // .then(function (res) {
    //     console.log(res.data)
    // })
    // .catch(function (error) {
    //     console.log(error)
    // })
}

function resetForm(ev) {
    ev.preventDefault()
    const fields = document.querySelectorAll("fieldset")
    fields.forEach(fieldset => fieldset.style.display = "block")
    const pretraga = document.getElementById("pretraga")
    window.scrollTo({ top: pretraga, behavior: "smooth"})
    myForm.reset()
}

function formDataToJSObj(formData) {
    const obj = {}
    for (let key of formData.keys()) {
        if (formData.get(key) && key !== "Time") {
            obj[key] = formData.get(key)
        } else if (key === "Time") {
            let item = formData.get(key)
            item = item.replace(":", "")
            console.log(item)
            obj["Time"] = item
        }
    }
    return obj
}