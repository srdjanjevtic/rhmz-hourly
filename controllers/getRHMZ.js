const MainStation = require('../model/MainStation')
const AdditionalStation = require('../model/AdditionalStation')
const asyncHandler = require('express-async-handler')
const { query } = require('express')

const getAllMain = asyncHandler(async (req, res) => {
    const stations = await MainStation.find().sort({ Stanica: 'asc', 'Pritisak(hPa)': 'desc' }).exec()
    if (!stations?.length) {
        return res.status(400).json({ message: 'Nema podataka' })
    }
    res.json({ stations, total: `${stations.length} dokumenata ukupno.`})
})

const getAllAdditional = asyncHandler(async (req, res) => {
    const stations = await AdditionalStation.find().sort({ Stanica: 'asc', 'Pritisak(hPa)': 'desc' }).exec()
    if (!stations?.length) {
        return res.status(400).json({ message: 'Nema podataka' })
    }
    res.json({ stations, total: `${stations.length} dokumenata ukupno.`})
})

const getOneMain = asyncHandler(async (req, res) => {
    const query = {}
    let isParamPresent = false
    if (req.query.vreme) {
        query['date-time'] = req.query.vreme
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
    if (req.query.subjektivni) {
        query['Subjektivniosećajtemperature(°C)'] = req.query.subjektivni
        isParamPresent = true
    }
    if (req.query.opis) {
        query['Opisvremena'] = req.query.opis
        isParamPresent = true
    }
    if (isParamPresent) {
        const result = await MainStation.find(query).exec()
    } else {
        const result = await MainStation.find().exec()
    }
    const result = await MainStation.find(query).exec()
    if (!isParamPresent) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    if (result.length === 0) {
        res.send("Nema podataka!")
    } else {
        res.status(200).json(result)
    }
})

const getOneAdditional = asyncHandler(async (req, res) => {
    // const result = await AdditionalStation.find({ 'Stanica': 'Tamnava' }).exec()
    // if (!result) {
    //     return res.status(204).json({ message: `No results for ${_search}` })
    // }
    // res.status(200).json(result)
     const query = {}
    let isParamPresent = false
    if (req.query.vreme) {
        query['date-time'] = req.query.vreme
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
    if (isParamPresent) {
        const result = await AdditionalStation.find(query).exec()
    } else {
        const result = await AdditionalStation.find().exec()
    }
    const result = await AdditionalStation.find(query).exec()
    if (!isParamPresent) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    if (result.length === 0) {
        res.send("Nema podataka!")
    } else {
        res.status(200).json(result)
    }

})

module.exports = { getAllMain, getAllAdditional, getOneMain, getOneAdditional }