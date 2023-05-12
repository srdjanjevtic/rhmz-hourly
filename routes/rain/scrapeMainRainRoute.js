const express = require("express");
const router = express.Router();
const { scrapeMainRain } = require("../../controllers/rain/scrapeController");

// const cron = require("node-cron");
// const request = require("request");

// cron.schedule("22 15 * * *", () => {
//     console.log("scraping main rain stations data every day at 15:22");
//     request("http://localhost:3330/scrapeMainRain", function (err, resp, body) {
//         if (err) {
//             console.error(err);
//         }
//         console.log("Status code:", resp.statusCode);
//         console.log("Response:", resp.body.message);
//     });
// });

router.get("/", scrapeMainRain);

module.exports = router;