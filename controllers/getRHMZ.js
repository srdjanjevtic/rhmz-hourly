const MainStation = require('../model/MainStation')
const AdditionalStation = require('../model/AdditionalStation')
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
        query['time'] = req.query.vreme
        isParamPresent = true
    }
        if (req.query.dan) {
        query['date'] = req.query.dan
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

module.exports = { getAllMain, getAllAdditional, getMain, getAdditional }