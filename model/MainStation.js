const mongoose = require('mongoose')
const Schema = mongoose.Schema

const weatherSchema = new Schema({
    'date': String,
    'time': String,
    Stanica: {
        type: String,
        required: 'Merna stanica je obavezan podatak'
    },
    'Temperatura(°C)': {
        type: Number,
        required: 'Temperatura je obavezan podatak'
    },
    'Pritisak(hPa)': {
        type: String
    },
    Pravacvetra: {
        type: String
    },
    'Brzinavetra(m/s)': {
        type: String
    },
    'Vlažnost(%)': {
        type: String
    },
    'Subjektivniosećajtemperature(°C)': {
        type: String
    },
    Opisvremena: {
        type: String
    }
})

module.exports = mongoose.model('MainStation', weatherSchema)
