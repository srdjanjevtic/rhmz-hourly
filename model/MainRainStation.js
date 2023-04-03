const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
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
    "Sliv": {
        type: String
    },
    "Opština": {
        type: String
    }
});

module.exports = mongoose.model("MainRainStation", weatherSchema);
