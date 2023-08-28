const express = require("express");
const router = express.Router();
const { scrapeMain } = require("../../controllers/hourly/scrapeController");
// const cron = require("node-cron");
const request = require("request");

// cron.schedule('18 * * * *', () => {
//     console.log("scraping main stations data every 18th minute");
//     request("http://localhost:3330/scrapeMain", function (err, resp, body) {
//         if (err) {
//             console.error(err);
//         }
//         console.log("Status code:", resp.statusCode);
//         console.log("Response:", resp.body.message);
//     });
// });

router.get("/", scrapeMain);

module.exports = router;