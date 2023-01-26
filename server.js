require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3000
// const cron = require('node-cron')
// const { scrapeAdditional, scrapeMain } = require('./controllers/scrapeController')

connectDB()

// cron.schedule('07 * * * *', scrapeMain), {
//    scheduled: true,
//    timezone: "Europe/Belgrade"
// }
//  cron.schedule('22 * * * *', scrapeAdditional), {
//    scheduled: true,
//    timezone: "Europe/Belgrade"
//  }

app.use(logger)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/scrapeMain', require('./routes/hourly/scrapeMainRoute'))
app.use('/scrapeAdditional', require('./routes/hourly/scrapeAdditionalRoute'))
app.use('/insertMain', require('./routes/hourly/insertMainRoute'))
app.use('/insertAdditional', require('./routes/hourly/insertAdditionalRoute'))
app.use('/getAllMain', require('./routes/hourly/getAllMainRoute'))
app.use('/getAllAdditional', require('./routes/hourly/getAllAdditionalRoute'))
app.use('/getMain', require('./routes/hourly/getMainRoute'))
app.use('/getMainNew', require('./routes/hourly/getMainNewRoute'))
app.use('/getAdditional', require('./routes/hourly/getAdditionalRoute'))

app.use('/scrapeMainRain', require('./routes/rain/scrapeMainRainRoute'))
app.use('/scrapeClimateRain', require('./routes/rain/scrapeClimateRainRoute'))
app.use('/scrapePrecipitationRain', require('./routes/rain/scrapePrecipitationRainRoute'))

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
    console.log(`Connected to ${process.env.MONGODB_DB}`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
