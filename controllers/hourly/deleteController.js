const asyncHandler = require('express-async-handler')
const MainStation = require('../../model/MainStation')

const deleteDocs = asyncHandler(async (req, res) => {
    const { date, time } = req.body
    // Confirm data
    if (!date && !time) {
        return res.status(400).json({ message: 'Date and time required' })
    }
    // Confirm note exists to delete 
    const docToRemove = await MainStation.find({date, time}).exec()
    if (!docToRemove) {
        return res.status(400).json({ message: 'Data not found' })
    }
    const result = await docToRemove.deleteMany()
    res.json({ message: "Documents removed!", result})
})

module.exports = deleteDocs