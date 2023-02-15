const MainStation = require('../../model/MainStation')
const AdditionalStation = require('../../model/AdditionalStation')
const asyncHandler = require('express-async-handler')

const getAllMain = asyncHandler(async (req, res) => {
    const stations = await MainStation.find().exec()
    if (!stations?.length) {
        return res.status(400).json({ message: 'Nema podataka' })
    }
    res.json({ stations, total: `${stations.length} dokumenata ukupno.`})
})

const getAllAdditional = asyncHandler(async (req, res) => {
    const stations = await AdditionalStation.find().exec()
    if (!stations?.length) {
        return res.status(400).json({ message: 'Nema podataka' })
    }
    res.json({ stations, total: `${stations.length} dokumenata ukupno.`})
})

const getMain = asyncHandler(async (req, res) => {
    const query = {}
    let isParamPresent = false
    if (req.query.vreme) {
        query['Time'] = req.query.vreme
        isParamPresent = true
    }
        if (req.query.dan) {
        query['Date'] = req.query.dan
        isParamPresent = true
    }
    if (req.query.stanica) {
        query['Stanica'] = req.query.stanica
        isParamPresent = true
    }
    if (req.query.temperatura) {
        query['Temperatura(°C)'] = req.query.temperatura
        isParamPresent = true
    }
    if (req.query.pritisak) {
        query['Pritisak(hPa)'] = req.query.pritisak
        isParamPresent = true
    }
    if (req.query.pravac) {
        query['Pravacvetra'] = req.query.pravac
        isParamPresent = true
    }
        if (req.query.brzina) {
        query['Brzina vetra(m/s)'] = req.query.brzina
        isParamPresent = true
    }
    if (req.query.vlaga) {
        query['Vlažnost(%)'] = req.query.vlaga
        isParamPresent = true
    }
    if (req.query.subjektivni) {
        query['Subjektivniosećajtemperature(°C)'] = req.query.subjektivni
        isParamPresent = true
    }
    if (req.query.opis) {
        query['Opisvremena'] = req.query.opis
        isParamPresent = true
    }
    const result = await MainStation.find(query).exec()
    if (!isParamPresent) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    if (result.length === 0) {
        res.send("Nema podataka!")
    } else {
        res.status(200).json({result, total: `${result.length} documenata prikazano`})
    }
})

const getMainNew = asyncHandler(async (req, res) => {
    const search = req.body
    if (req.body.Time === " " || req.body.Time === "" ) {
        delete req.body.Time
    }
    if (req.body.timeEnd === " " || req.body.timeEnd === "" ) {
        delete req.body.timeEnd
    }
    if (req.body.Time) {
        req.body.Time = req.body.Time.replace(":", "")
    }
    if (req.body.timeEnd) {
        req.body.timeEnd = req.body.timeEnd.replace(":", "")
    }
    if (req.body.datumEnd) {
        search.Date = { $gte: req.body.Date, $lte: req.body.datumEnd }
        delete search.datumEnd
    }
    if (req.body.timeEnd) {
        search.Time = { $gte: req.body.Time, $lte: req.body.timeEnd }
    }
    if (req.body["min-temperatura"] && req.body["max-temperatura"]) {
        search["Temperatura(°C)"] = { $gte: req.body["min-temperatura"], $lte: req.body["max-temperatura"] }
        delete search["min-temperatura"]
        delete search["max-temperatura"]
    }
    if (req.body["min-brzina"] && req.body["max-brzina"]) {
        search["Brzinavetra(m/s)"] = { $gte: req.body["min-brzina"], $lte: req.body["max-brzina"] }
        delete search["min-brzina"]
        delete search["max-brzina"]
    }
    if (req.body["min-vlaga"] && req.body["max-vlaga"]) {
        search["Vlažnost(%)"] = { $gte: req.body["min-vlaga"], $lte: req.body["max-vlaga"] }
        delete search["min-vlaga"]
        delete search["max-vlaga"]
    }
    if (req.body["min-pritisak"] && req.body["max-pritisak"]) {
        search["Pritisak(hPa)"] = { $gte: req.body["min-pritisak"], $lte: req.body["max-pritisak"] }
        delete search["min-pritisak"]
        delete search["max-pritisak"]
    }
    const isEmpty = obj => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false
        }
        return true
    }
    console.log(isEmpty(search), search)
    if (isEmpty(search)) {
        res.status(400).json({ message: "Sva polja su prazna!" })
        return
    } else {
        const result = await MainStation.find(search)
        if (result.length === 0) {
            res.json("Nema podataka!")
        } else {
            res.status(200).json({result, total: `${result.length} dokumenata prikazano`})
        }
    }
})

const getAdditional = asyncHandler(async (req, res) => {
    const query = {}
    let isParamPresent = false
    if (req.query.dan) {
        query['date'] = req.query.dan
        isParamPresent = true
    }
     if (req.query.vreme) {
        query['time'] = req.query.vreme
        isParamPresent = true
    }
    if (req.query.stanica) {
        query['Stanica'] = req.query.stanica
        isParamPresent = true
    }
    if (req.query.temperatura) {
        query['Temperatura(°C)'] = req.query.temperatura
        isParamPresent = true
    }
    if (req.query.pritisak) {
        query['Pritisak(hPa)'] = req.query.pritisak
        isParamPresent = true
    }
    if (req.query.pravac) {
        query['Vetarpravac(°)'] = req.query.pravac
        isParamPresent = true
    }
    const result = await AdditionalStation.find(query).exec()
    if (!isParamPresent) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    if (result.length === 0) {
        res.send("Nema podataka!")
    } else {
        res.status(200).json({result, total: `${result.length} documenata prikazano`})
    }

})

module.exports = { getAllMain, getAllAdditional, getMain, getMainNew, getAdditional }