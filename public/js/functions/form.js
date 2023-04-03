function closeFieldset(ev) {
    ev.target.parentElement.style.display = "none";
    ev.target.nextElementSibling.style.display = "none";
}

function toggleSubset(ev) {
    if (ev.target.value) {
        ev.target.parentElement.nextElementSibling.style.display = "none";
        ev.target.parentElement.nextElementSibling.nextElementSibling.style.display = "none";
    } else {
        ev.target.parentElement.nextElementSibling.style.display = "flex";
        ev.target.parentElement.nextElementSibling.nextElementSibling.style.display = "flex";
    }
}

function toggleMainField(ev) {
    if (minT.value && maxT.value) {
        temp.parentElement.style.display = "none";
    } else {
        temp.parentElement.style.display = "flex";
    }
    if (minBV.value && maxBV.value) {
        brzinaVetra.parentElement.style.display = "none";
    } else {
        brzinaVetra.parentElement.style.display = "flex";
    }
    if (minP.value && maxP.value) {
        pritisak.parentElement.style.display = "none";
    } else {
        pritisak.parentElement.style.display = "flex";
    }
    if (minV.value && maxV.value) {
        vlaga.parentElement.style.display = "none";
    } else {
        vlaga.parentElement.style.display = "flex";
    }
}

function toggleEnd(ev) {
    if (ev.target.value) {
        ev.target.parentElement.nextElementSibling.style.display = "flex";
    } else {
        ev.target.parentElement.nextElementSibling.style.display = "none";
    }
}

function formDataToJSObj(formData) {
    const obj = {};
    for (let key of formData.keys()) {
        if (formData.get(key) && key !== "Time") {
            obj[key] = formData.get(key);
        }
        if (key === "Time" || key === "timeEnd") {
            let item = formData.get(key);
            item = item.replace(":", "");
            obj["Time"] = item;
        }
    }
    return obj;
}

function convertFD2JSON(formData) {
    let obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return JSON.stringify(obj);
}

export { closeFieldset, toggleEnd, toggleMainField, toggleSubset, formDataToJSObj, convertFD2JSON };