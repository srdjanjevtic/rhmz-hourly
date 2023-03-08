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

function toggleEnd(ev) {
    if (ev.target.value) {
        ev.target.parentElement.nextElementSibling.style.display = "flex"
    } else {
        ev.target.parentElement.nextElementSibling.style.display = "none"
    }
}

function submitForm(ev) {
    ev.preventDefault()
    const myForm = ev.target
    let fd = new FormData(myForm)
    const jsData = formDataToJSObj(fd)
    if (jsData["Time"] === "") delete jsData["Time"]
    if (jsData["timeEnd"] === "") delete jsData["timeEnd"]
    // console.log(jsData)
    const searchParams = new URLSearchParams(jsData)
    const queryString = searchParams.toString()
    const urlQS = "/getMain?" + queryString
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

function formDataToJSObj(formData) {
    const obj = {}
    for (let key of formData.keys()) {
        if (formData.get(key) && key !== "Time") {
            obj[key] = formData.get(key)
        }
        if (key === "Time") {
            let item = formData.get(key)
            item = item.replace(":", "")
            // console.log(item)
            obj["Time"] = item
        }
        if (key === "timeEnd") {
            let item = formData.get(key)
            item = item.replace(":", "")
            // console.log(item)
            obj["timeEnd"] = item
        }
    }
    return obj
}

export { closeFieldset, toggleEnd, toggleMainField, toggleSubset, formDataToJSObj, resetForm }