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
        type: Number,
        required: 'Temperatura je obavezan podatak'
    },
    Pravacvetra: {
        type: String,
        required: 'Pravac vetra je obavezan podatak'
    },
    'Brzina vetra(m/s)': Number,
    'Vlažnost(%)': Number,
    'Subjektivniosećajtemperature(°C)': {
        type: Number,
        required: 'Subjektivni osećaj temperature je obavezan podatak'
    },
    Opisvremena: {
        type: String,
        required: 'Opis vremena je obavezan podatak'
    }
})

module.exports = mongoose.model('MainStation', weatherSchema)
