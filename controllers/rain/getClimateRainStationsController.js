const ClimateRainStation = require("../../model/ClimateRainStation")
const asyncHandler = require("express-async-handler")

const getAllClimateRain = asyncHandler(async (req, res) => {
    const search = {}
    if (req.query.Stanica) {
        search.Stanica = req.query.Stanica
    }
    const result = await ClimateRainStation.find(search).exec()
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForClimateRainStations.ejs", { result })
    }
})

const getClimateRain = asyncHandler(async (req, res) => {
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
    if (req.query["Sneg"]) {
        search["Sneg"] = req.query["Sneg"]
    }
    if (req.query["min-sneg"] && req.query["max-sneg"]) {
        search["Sneg"] = { $gte: req.query["min-sneg"], $lte: req.query["max-sneg"] }
        delete req.query["min-sneg"]
        delete req.query["max-sneg"]
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
    const result = await ClimateRainStation.find(search).exec()
    const dateArray = []
    let padavineArray = []
    let snegArray = []
    result.forEach(row => {
        dateArray.push(row["date"].toLocaleDateString("sr-SR"))
        padavineArray.push(row["Padavine"])
        snegArray.push(row["Sneg"])
    })
    console.log("dani", dateArray,"padavine", padavineArray,"sneg", snegArray)
    if (result.length === 0) {
        res.status(200).render("noData")
    } else {
        res.status(200).render("searchResultForClimateRainStations", { result, dateArray, padavineArray, snegArray })
    }
})

module.exports = { getAllClimateRain, getClimateRain }