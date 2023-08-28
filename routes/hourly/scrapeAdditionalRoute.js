const express = require("express");
const router = express.Router();
const { scrapeAdditional } = require("../../controllers/hourly/scrapeController");
// const cron = require("node-cron");
const request = require("request");

// cron.schedule('20 * * * *', () => {
//     console.log('scraping additional stations data every 20th minute');
//     request("http://localhost:3330/scrapeAdditional", function (err, resp, body) {
//         if (err) {
//             console.error(err);
//         }
//         console.log("Status code:", resp.statusCode);
//         console.log("Response:", resp.body.message);
//     });
// });

router.get("/", scrapeAdditional);

module.exports = router;