const mongoose = require("mongoose")
const Schema = mongoose.Schema

const weatherSchema = new Schema({
    "Date": {
        type: Date,
        required: "Datum je obavezan podatak"
    },
    "Time": {
        type: String,
        required: "Vreme je obavezan podatak"
    },
    "Stanica": {
        type: String,
        required: "Merna stanica je obavezan podatak"
    },
    "Temperatura(°C)": {
        type: Number
    },
    "Subjektivniosećajtemperature(°C)": {
        type: Number
    },
    "Pritisak(hPa)": {
        type: Number
    },
    "Vlažnost(%)": {
        type: Number
    },
    "Brzinavetra(m/s)": {
        type: Number
    },
    "Pravacvetra": {
        type: String
    },
    "Opisvremena": {
        type: String
    }
})

module.exports = mongoose.model("MainStation", weatherSchema)