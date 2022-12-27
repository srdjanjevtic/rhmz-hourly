require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500
const cron = require('node-cron')
const { scrapeAdditional, scrapeMain } = require('./controllers/scrapeController')

connectDB()

cron.schedule('52 * * * *', scrapeMain), {
   scheduled: true,
   timezone: "Europe/Belgrade"
}
 cron.schedule('53 * * * *', scrapeAdditional), {
   scheduled: true,
   timezone: "Europe/Belgrade"
 }

app.use(logger)
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/scrapeMain', require('./routes/scrapeMainRoute'))
app.use('/scrapeAdditional', require('./routes/scrapeAdditionalRoute'))
app.use('/insertMain', require('./routes/insertMainRoute'))
app.use('/insertAdditional', require('./routes/insertAdditionalRoute'))
app.use('/getAllMain', require('./routes/getAllMainRoute'))
app.use('/getAllAdditional', require('./routes/getAllAdditionalRoute'))
app.use('/getOneMain', require('./routes/getOneMainRoute'))
app.use('/getOneAdditional', require('./routes/getOneAdditionalRoute'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" })
    } else {
        res.type('txt').send("404 Not Found")
    }
});

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})