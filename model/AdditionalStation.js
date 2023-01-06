const mongoose = require('mongoose')
const Schema = mongoose.Schema

const additionalSchema = new Schema({
    'date-time': String,
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
    'Vlažnost(%)': Number,
    "Vetarpravac(°)": {
        type: Number
    },
    "Vetarbrzina(m/s)": Number
})

module.exports = mongoose.model('AdditionalStation', additionalSchema)
