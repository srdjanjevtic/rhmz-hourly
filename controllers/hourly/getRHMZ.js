const MainStation = require("../../model/MainStation")
const AdditionalStation = require("../../model/AdditionalStation")
const asyncHandler = require("express-async-handler")

const getAllMain = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    const result = await MainStation.find(search).exec()
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForMainStations", { result })
    }
})

const getAllAdditional = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    const result = await AdditionalStation.find(search).exec()
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForAdditionalStations", { result })
    }
})

const getMain = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Time) {
        search.Time = req.query.Time.replace(":", "")
    }
    if (req.query.timeEnd) {
        search.timeEnd = req.query.timeEnd.replace(":", "")
        search.Time = { $gte: req.query.Time, $lte: req.query.timeEnd }
    }
    if (req.query.timeEnd === " " || req.query.timeEnd === "" ) {
        delete req.query.timeEnd
    }
    if (req.query.Time === " " || req.query.Time === "" ) {
        delete req.query.Time
    }
    if (req.query.Date) {
        search.Date = req.query.Date
    }
    if (req.query.datumEnd) {
        search.Date = { $gte: req.query.Date, $lte: req.query.datumEnd }
        // delete req.query.datumEnd
    }
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    if (req.query["Temperatura(°C)"]) {
        search["Temperatura(°C)"] = req.query["Temperatura(°C)"]
    }
    if (req.query["min-temperatura"] && req.query["max-temperatura"]) {
        search["Temperatura(°C)"] = { $gte: req.query["min-temperatura"], $lte: req.query["max-temperatura"] }
        delete req.query["min-temperatura"]
        delete req.query["max-temperatura"]
    }
    if (req.query["Subjektivniosećajtemperature(°C)"]) {
        search["Subjektivniosećajtemperature(°C)"] = req.query["Subjektivniosećajtemperature(°C)"]
    }
    if (req.query["Pritisak(hPa)"]) {
        search["Pritisak(hPa)"] = req.query["Pritisak(hPa)"]
    }
    if (req.query["min-pritisak"] && req.query["max-pritisak"]) {
        search["Pritisak(hPa)"] = { $gte: req.query["min-pritisak"], $lte: req.query["max-pritisak"] }
        delete req.query["min-pritisak"]
        delete req.query["max-pritisak"]
    }
    if (req.query["Pravacvetra"]) {
        search["Pravacvetra"] = req.query["Pravacvetra"]
    }
    if (req.query["Brzinavetra(m/s)"]) {
        search["Brzinavetra(m/s)"] = req.query["Brzinavetra(m/s)"]
    }
    if (req.query["min-brzina"] && req.query["max-brzina"]) {
        search["Brzinavetra(m/s)"] = { $gte: req.query["min-brzina"], $lte: req.query["max-brzina"] }
        delete search["min-brzina"]
        delete search["max-brzina"]
    }
    if (req.query["Vlažnost(%)"]) {
        search["Vlažnost(%)"] = req.query["Vlažnost(%)"]
    }
    if (req.query["min-vlaga"] && req.query["max-vlaga"]) {
        search["Vlažnost(%)"] = { $gte: req.query["min-vlaga"], $lte: req.query["max-vlaga"] }
        delete search["min-vlaga"]
        delete search["max-vlaga"]
    }
    if (req.query["Opisvremena"]) {
        search["Opisvremena"] = req.query["Opisvremena"]
        isParamPresent = true
    }
    if (Object.keys(req.query).length === 0) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    const result = await MainStation.find(search).exec()
    const dateTimeArray = []
    const tempArr = []
    const subjArr = []
    const vlagaArr = []
    const pritArr = []
    const vetarArr = []
    result.forEach(row => {
        dateTimeArray.push(row["Date"].toLocaleDateString("sr-SR") + " " + row["Time"].slice(0, 2) + ":" + row["Time"].slice(2, 4))
        tempArr.push(row["Temperatura(°C)"])
        subjArr.push(row["Subjektivniosećajtemperature(°C)"])
        vlagaArr.push(row["Vlažnost(%)"])
        pritArr.push(row["Pritisak(hPa)"])
        vetarArr.push(row["Brzinavetra(m/s)"])
    })
    // console.log("vreme: ", dateTimeArray)
    // console.log("temp.: ", tempArr)
    // console.log("subj.: ", subjArr)
    // console.log("vlaga.: ", vlagaArr)
    // console.log("ptitisak: ", pritArr)
    console.log("brzina vetra: ", vetarArr)
    // Pravacvetra: 'S',
    // Opisvremena: 'Pretežno oblačno',
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForMainStations", { result, dateTimeArray, tempArr, subjArr, vlagaArr, pritArr, vetarArr })
    }
})

const getAdditional = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Time === " " || req.query.Time === "" ) {
        delete req.query.Time
    }
    if (req.query.timeEnd === " " || req.query.timeEnd === "" ) {
        delete req.query.timeEnd
    }
    if (req.query.Time) {
        search.Time = req.query.Time.replace(":", "")
    }
    if (req.query.timeEnd) {
        search.timeEnd = req.query.timeEnd.replace(":", "")
        search.Time = { $gte: req.query.Time, $lte: req.query.timeEnd }
    }
    if (req.query.Date) {
        search.Date = req.query.Date
    }
    if (req.query.datumEnd) {
        search.Date = { $gte: req.query.Date, $lte: req.query.datumEnd }
    }
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    if (req.query["Temperatura(°C)"]) {
        search["Temperatura(°C)"] = req.query["Temperatura(°C)"]
    }
    if (req.query["min-temperatura"] && req.query["max-temperatura"]) {
        search["Temperatura(°C)"] = { $gte: req.query["min-temperatura"], $lte: req.query["max-temperatura"] }
    }
    if (req.query["Pritisak(hPa)"]) {
        search["Pritisak(hPa)"] = req.query["Pritisak(hPa)"]
    }
    if (req.query["min-pritisak"] && req.query["max-pritisak"]) {
        search["Pritisak(hPa)"] = { $gte: req.query["min-pritisak"], $lte: req.query["max-pritisak"] }
    }
    if (req.query["min-pravac"] && req.query["max-pravac"]) {
        search["Vetarpravac(°)"] = { $gte: req.query["min-pravac"], $lte: req.query["max-pravac"] }
    }
    if (req.query["Vetarbrzina(m/s)"]) {
        search["Vetarbrzina(m/s)"] = req.query["Vetarbrzina(m/s)"]
    }
    if (req.query["min-brzina"] && req.query["max-brzina"]) {
        search["Vetarbrzina(m/s)"] = { $gte: req.query["min-brzina"], $lte: req.query["max-brzina"] }
    }
    if (req.query["Vlažnost(%)"]) {
        search["Vlažnost(%)"] = req.query["Vlažnost(%)"]
    }
    if (req.query["min-vlaga"] && req.query["max-vlaga"]) {
        search["Vlažnost(%)"] = { $gte: req.query["min-vlaga"], $lte: req.query["max-vlaga"] }
    }
    if (Object.keys(req.query).length === 0) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    let result = await AdditionalStation.find(search).exec()

    const dateTimeArray = []
    const tempArr = []
    const vlagaArr = []
    const pritArr = []
    const vetarArr = []
    const vetarPravacArr = []
    result.forEach(row => {
        dateTimeArray.push(row["Date"].toLocaleDateString("sr-SR") + " " + row["Time"].slice(0, 2) + ":" + row["Time"].slice(2, 4))
        tempArr.push(row["Temperatura(°C)"])
        pritArr.push(row["Pritisak(hPa)"])
        vlagaArr.push(row["Vlažnost(%)"])
        vetarArr.push(row["Vetarbrzina(m/s)"])
        vetarPravacArr.push(row["Vetarpravac(°)"])
    })
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForAdditionalStations", { result, dateTimeArray, tempArr, vlagaArr, pritArr, vetarArr, vetarPravacArr  })
    }
})

module.exports = { getAllMain, getAllAdditional, getMain, getAdditional }