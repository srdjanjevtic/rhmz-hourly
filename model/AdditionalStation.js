const mongoose = require('mongoose')
const Schema = mongoose.Schema

const additionalSchema = new Schema({
    'date-time': String,
    "Stanica": {
        type: String,
        required: 'Merna stanica je obavezan podatak'
    },
    "Vreme": {
        type: String,
        // required: 'Vreme je obavezan podatak'
    },
    'Temperatura(°C)': {
        type: String,
        // required: 'Temperatura je obavezan podatak'
    },
    'Pritisak(hPa)': {
        type: String,
        // required: 'Temperatura je obavezan podatak'
    },
    "Vetarpravac(°)": {
        type: String,
        // required: 'Pravac vetra je obavezan podatak'
    },
    'Detaljnije': String
})

module.exports = mongoose.model('AdditionalStation', additionalSchema)
