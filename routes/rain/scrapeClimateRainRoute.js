const express = require("express");
const router = express.Router();
const { scrapeClimateRain } = require("../../controllers/rain/scrapeController");

// const cron = require("node-cron");
// const request = require("request");

// cron.schedule("24 15 * * *", () => {
//     console.log("scraping climate rain stations data every day at 15:24");
//     request("http://localhost:3330/scrapeClimateRain", function (err, resp, body) {
//         if (err) {
//             console.error(err);
//         }
//         console.log("Status code:", resp.statusCode);
//         console.log("Response:", resp.body.message);
//     });
// });

router.get("/", scrapeClimateRain);

module.exports = router;