const MainRainStation = require("../../model/MainRainStation")
const asyncHandler = require("express-async-handler")

const getAllMainRain = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    const result = await MainRainStation.find(search).exec()
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForMainRainStations", { result })
    }
})

const getMainRain = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    if (req.query.date) {
        search.date = req.query.date
    }
    if (req.query.datumEnd) {
        search.date = { $gte: req.query.date, $lte: req.query.datumEnd }
        delete req.query.datumEnd
    }
    if (req.query["Padavine"]) {
        search["Padavine"] = req.query["Padavine"]
    }
    if (req.query["min-padavine"] && req.query["max-padavine"]) {
        search["Padavine"] = { $gte: req.query["min-padavine"], $lte: req.query["max-padavine"] }
        delete req.query["min-padavine"]
        delete req.query["max-padavine"]
    }
    if (req.query["Sliv"]) {
        search["Sliv"] = req.query["Sliv"]
    }
    if (req.query["Opština"]) {
        search["Opština"] = req.query["Opština"]
    }
    if (Object.keys(req.query).length === 0) {
        res.send("Niste uneli parametre za pretragu!")
        return
    }
    const result = await MainRainStation.find(search).exec()
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForMainRainStations", { result })
    }
})

module.exports = { getAllMainRain, getMainRain }