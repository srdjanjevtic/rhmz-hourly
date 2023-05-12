const express = require("express");
const router = express.Router();
const path = require("path");

// UNCOMMENT IN CASE OF DEPLOY SITE ON SERVICE WHICH SUPPORT CRON JOBS
//...................................................................//

// const cron = require("node-cron");
// const request = require("request");

// cron.schedule('15 * * * *', () => {
//     console.log('scraping main stations data every 15th minute');
//     request("http://localhost:3330/", function (err, resp, body) {
//         if (err) {
//             console.error(err);
//         }
//         console.log("Status code:", resp.statusCode);
//         console.log("Response:", resp);
//     });
// });

router.get("^/$|/index(.ejs)?", (req, res) => {
    res.render(path.join(__dirname, "..", "views", "index.ejs"));
})

module.exports = router;