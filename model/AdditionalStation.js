const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const additionalSchema = new Schema({
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
    "Pritisak(hPa)": {
        type: Number
    },
    "Vlažnost(%)": {
        type: Number
    },
    "Vetarpravac(°)": {
        type: Number
    },
    "Vetarbrzina(m/s)": {
        type: Number
    }
})

module.exports = mongoose.model("AdditionalStation", additionalSchema);
