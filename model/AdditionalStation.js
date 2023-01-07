const mongoose = require('mongoose')
const Schema = mongoose.Schema

const additionalSchema = new Schema({
    'date': String,
    'time': String,
    "Stanica": {
        type: String,
        required: 'Merna stanica je obavezan podatak'
    },
    "Vreme": {
        type: String
    },
    'Temperatura(°C)': {
        type: String
    },
    'Pritisak(hPa)': {
        type: String
    },
    'Vlažnost(%)': String,
    "Vetarpravac(°)": {
        type: String
    },
    "Vetarbrzina(m/s)": String
})

module.exports = mongoose.model('AdditionalStation', additionalSchema)
