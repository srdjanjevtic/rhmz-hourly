require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const expressLayouts = require("express-ejs-layouts");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const searchParamsToTable = require("./middleware/searchParamsToTable");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3000;
// const cron = require("node-cron");

connectDB();

// cron.schedule("50 * * * *", () => {
//   console.log("running a task every 50th minute");
// });

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.use(logger);
app.use(cors()); // cors(corsOptions)
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/registerPageRoute"));
app.use("/loginPage", require("./routes/loginPageRoute"));

app.use("/users", require("./routes/user/userRoutes"));

app.use("/register", require("./routes/user/registerRoute"));
app.use("/login", require("./routes/user/loginRoute"));
app.use("/refresh", require("./routes/user/refreshRoute"));
app.use("/logout", require("./routes/user/logoutRoute"));

app.use("/allMain", require("./routes/allMainStations"));
app.use("/allAdditional", require("./routes/allAdditionalStations"));

app.use("/searchMain", require("./routes/searchMain"));
app.use("/searchAdditional", require("./routes/searchAdditional"));

app.use("/allMainRain", require("./routes/allMainRainStations"));
app.use("/allClimateRain", require("./routes/allClimateRainStations"));
app.use("/allPrecipitationRain", require("./routes/allPrecipitationRainStations"));

app.use("/searchMainRain", require("./routes/searchMainRain"));
app.use("/searchClimateRain", require("./routes/searchClimateRain"));
app.use("/searchPrecipitationRain", require("./routes/searchPrecipitationRain"));

app.use("/scrapeMain", require("./routes/hourly/scrapeMainRoute"));
app.use("/scrapeAdditional", require("./routes/hourly/scrapeAdditionalRoute"));
app.use("/insertMain", require("./routes/hourly/insertMainRoute"));
app.use("/insertAdditional", require("./routes/hourly/insertAdditionalRoute"));
app.use("/getAllMain", searchParamsToTable, require("./routes/hourly/getAllMainRoute"));
app.use("/getAllAdditional", searchParamsToTable, require("./routes/hourly/getAllAdditionalRoute"));
app.use("/getMain", searchParamsToTable, require("./routes/hourly/getMainRoute"));
app.use("/getAdditional", searchParamsToTable, require("./routes/hourly/getAdditionalRoute"));

app.use("/getAllMainRain", searchParamsToTable, require("./routes/rain/getAllMainRainRoute"));
app.use("/getAllClimateRain", searchParamsToTable, require("./routes/rain/getAllClimateRainRoute"));
app.use("/getAllPrecipitationRain", searchParamsToTable, require("./routes/rain/getAllPrecipitationRainRoute"));
app.use("/getMainRain", searchParamsToTable, require("./routes/rain/getMainRainRoute"));
app.use("/getClimateRain", searchParamsToTable, require("./routes/rain/getClimateRainRoute"));
app.use("/getPrecipitationRain", searchParamsToTable, require("./routes/rain/getPrecipitationRainRoute"));
app.use("/scrapeMainRain", require("./routes/rain/scrapeMainRainRoute"));
app.use("/scrapeClimateRain", require("./routes/rain/scrapeClimateRainRoute"));
app.use("/scrapePrecipitationRain", require("./routes/rain/scrapePrecipitationRainRoute"));

// app.use(verifyJWT)
app.use("/checkAuth", require("./routes/user/checkAuthRoute"));

app.all("*", (req, res) => {
    res.render(path.join(__dirname, "views", "404.ejs"));
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log(`Connected to ${process.env.MONGODB_DB}`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
