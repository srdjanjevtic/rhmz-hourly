const express = require("express");
const router = express.Router();
const { scrapePrecipitationRain } = require("../../controllers/rain/scrapeController");

// const cron = require("node-cron");
// const request = require("request");

// cron.schedule("26 15 * * *", () => {
//     console.log("scraping precipitation rain stations data every day at 15:26");
//     request("http://localhost:3330/scrapePrecipitationRain", function (err, resp, body) {
//         if (err) {
//             console.error(err);
//         }
//         console.log("Status code:", resp.statusCode);
//         console.log("Response:", resp.body.message);
//     });
// });

router.get("/", scrapePrecipitationRain);

module.exports = router;