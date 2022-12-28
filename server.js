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
const cron = require('node-cron')
const { scrapeAdditional, scrapeMain } = require('./controllers/scrapeController')

connectDB()

<<<<<<< HEAD
cron.schedule('35 * * * *', scrapeMain), {
   scheduled: true,
   timezone: "Europe/Belgrade"
}
 cron.schedule('36 * * * *', scrapeAdditional), {
   scheduled: true,
   timezone: "Europe/Belgrade"
 }
=======
// cron.schedule('25 * * * *', scrapeMain), {
//    scheduled: true,
//    timezone: "Europe/Belgrade"
// }
//  cron.schedule('26 * * * *', scrapeAdditional), {
//    scheduled: true,
//    timezone: "Europe/Belgrade"
//  }

setInterval(scrapeMain, 60*60*1000);
setInterval(scrapeAdditional, 60*60*1000);
>>>>>>> b4c27388ec272f225fdf63fd416ded459ad99093

app.use(logger)
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
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
