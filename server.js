require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const expressLayouts = require("express-ejs-layouts")
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const searchParamsToTable = require("./middleware/searchParamsToTable")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 3000

connectDB()

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)

app.use(logger)
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.json())

app.use("/", express.static(path.join(__dirname, "/public")))

app.use("/", require("./routes/root"))
app.use("/allMain", require("./routes/allMainStations"))
app.use("/allAdditional", require("./routes/allAdditionalStations"))
app.use("/searchMain", require("./routes/searchMain"))
app.use("/searchAdditional", require("./routes/searchAdditional"))

app.use("/scrapeMain", require("./routes/hourly/scrapeMainRoute"))
app.use("/scrapeAdditional", require("./routes/hourly/scrapeAdditionalRoute"))
app.use("/insertMain", require("./routes/hourly/insertMainRoute"))
app.use("/insertAdditional", require("./routes/hourly/insertAdditionalRoute"))
app.use("/getAllMain", searchParamsToTable, require("./routes/hourly/getAllMainRoute"))
app.use("/getAllAdditional", searchParamsToTable, require("./routes/hourly/getAllAdditionalRoute"))
app.use("/getMain", searchParamsToTable, require("./routes/hourly/getMainRoute"))
app.use("/getAdditional", searchParamsToTable, require("./routes/hourly/getAdditionalRoute"))

app.use("/scrapeMainRain", require("./routes/rain/scrapeMainRainRoute"))
app.use("/scrapeClimateRain", require("./routes/rain/scrapeClimateRainRoute"))
app.use("/scrapePrecipitationRain", require("./routes/rain/scrapePrecipitationRainRoute"))

app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.ejs"))
    } else if (req.accepts("json")) {
        res.json({ "error": "404 Not Found" })
    } else {
        res.type("txt").send("404 Not Found")
    }
});

app.use(errorHandler)

mongoose.connection.once("open", () => {
    console.log(`Connected to ${process.env.MONGODB_DB}`)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
