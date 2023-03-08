const mongoose = require("mongoose")
const Schema = mongoose.Schema

const climateSchema = new Schema({
    "date": {
        type: Date,
        required: "Datum je obavezan podatak"
    },
    "Stanica": {
        type: String,
        required: "Merna stanica je obavezan podatak"
    },
    "Padavine": {
        type: Number
    },
    "Sneg": {
        type: Number
    },
    "Opština": {
        type: String
    },
    "Sliv": {
        type: String
    }
})

module.exports = mongoose.model("ClimateStation", climateSchema)