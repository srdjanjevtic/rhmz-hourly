require("dotenv").config();
const cheerio = require("cheerio");
const request = require("request");
const asyncHandler = require("express-async-handler");
const urlToScrapeRain = "https://www.hidmet.gov.rs/latin/osmotreni/padavine.php";
const MainRainStation = require("../../model/MainRainStation");
const PrecipitationRainStation = require("../../model/PrecipitationRainStation");
const ClimateRainStation = require("../../model/ClimateRainStation");
//.................. LOCAL SERVER FILE SYSTEM ..........................//
const fsPromises = require("fs").promises
const path = require("path")
//.................. ...................................................//

function formatMainRain (obj, rem = []) {
    const columns = [];
    const items = [];
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(""));
    }
    obj("#pad_gms > thead > tr > th").each((tr_index, element) => {
        let el = obj(element).text().trim();
        columns.push(el);
    });
    obj("#pad_gms > tbody > tr").each((index, row) => {
        const item = {};
        obj("td:not([colspan])", row).each((idx, td) => {
            item[columns[idx]] = cheerio.load(td).text().trim()
        });
        if (Object.entries(item).length !== 0) {
            items[index] = item;
        }
    });
    for (let item of items) {
        if (!item["Padavine"] || item["Padavine"] === "-") {
            item["Padavine"] = 0;
        }
        item["Padavine"] = parseFloat(item["Padavine"]);
    }
    return items;
}

function formatClimateRain (obj, rem = []) {
    const columns = [];
    const items = [];
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(""));
    }
    obj("#pad > thead > tr > th").each((tr_index, element) => {
        let item = obj(element).text().trim().toString();
        item = item.replace("Temp.", "Temperatura");
        item = item.replace("Prit.", "Pritisak");
        columns.push(item);
    });
    obj("#pad > tbody > tr").each((index, row) => {
        const item = {};
        index.toString().replace(".", "");
        obj("td:not([colspan])", row).each((idx, td) => {
            item[columns[idx]] = cheerio.load(td).text().trim();
        })
        if (Object.entries(item).length !== 0) {
            items[index] = item;
        }
    });
    for (let item of items) {
        if (!item["Padavine"] || item["Padavine"] === "-") {
            item["Padavine"] = 0;
        }
        item["Padavine"] = parseFloat(item["Padavine"]);
        if (item["Sneg"]) {
            item["Sneg"] = parseInt(item["Sneg"]);
        }
    }
    return items;
}

function formatPrecipitationRain (obj, rem = []) {
    const columns = [];
    const items = [];
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(""));
    }
    obj("#pad_pad > thead > tr > th").each((tr_index, element) => {
        let item = obj(element).text().trim().toString();
        item = item.replace("Temp.", "Temperatura");
        item = item.replace("Prit.", "Pritisak");
        columns.push(item);
    });
    obj("#pad_pad > tbody > tr").each((index, row) => {
        const item = {};
        index.toString().replace(".", "");
        obj("td:not([colspan])", row).each((idx, td) => {
            item[columns[idx]] = cheerio.load(td).text().trim();
        });
        if (Object.entries(item).length !== 0) {
            items[index] = item;
        }
    });
    for (let item of items) {
        if (!item["Padavine"] || item["Padavine"] === "-") {
            item["Padavine"] = 0;
        }
        item["Padavine"] = parseFloat(item["Padavine"])
        if (item["Sneg"]) {
            item["Sneg"] = parseInt(item["Sneg"]);
        }
    }
    return items;
}

const scrapeMainRain = asyncHandler(async (req, res) => {
    request(urlToScrapeRain, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html);
            const h1 = table("#sadrzaj > div > h1:nth-child(2)").text().trim();
            let date = h1.slice(-10);
            while (date.indexOf(".") > -1) {
                date = date.replace(".", "");
            }
            const res = formatMainRain(table, [""]);
            const dan = date.substring(0, 2);
            const mesec = date.substring(2, 4);
            const godina = date.substring(4, 8);
            const datum = [godina, mesec, dan].join("-");
            res.forEach(item => {
                item["date"] = new Date(datum)
            });
            const current = {};
            current[date] = res;
            const dataArray = Object.values(current);
            for await (const obj of Object.values(dataArray[0])) {
                const item = new MainRainStation(obj);
                await item.save();
            }
            //.................. LOCAL SERVER FILE SYSTEM ..........................//
            const data = JSON.stringify(current);
            const folderName = "MainRain";
            await fsPromises.writeFile(path.join(__dirname, folderName, `${date}.json`), data);
            // ..................................................................... //
        }
    });
    res.status(200).json({ message: `Podaci skinuta sa ${urlToScrapeRain} i sačuvani u ${process.env.MONGODB_DB}!` });
});

const scrapeClimateRain = asyncHandler(async (req, res) => {
    request(urlToScrapeRain, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html);
            const h1 = table("#sadrzaj > div > h1:nth-child(6)").text().trim();
            let date = h1.slice(-10);
            while (date.indexOf(".") > -1) {
                date = date.replace(".", "");
            }
            const res = formatClimateRain(table, [""]);
            const current = {};
            const dan = date.substring(0, 2);
            const mesec = date.substring(2, 4);
            const godina = date.substring(4, 8);
            const datum = [godina, mesec, dan].join("-");
            res.forEach(item => item["date"] = new Date(datum));
            current[date] = res;
            const dataArray = Object.values(current);
            for await (const obj of Object.values(dataArray[0])) {
                const item = new ClimateRainStation(obj);
                await item.save();
            }
            //.................. LOCAL SERVER FILE SYSTEM ..........................//
            const data = JSON.stringify(current);
            const folder = "Climate";
            await fsPromises.writeFile(path.join(__dirname, folder, `${date}.json`), data);
            // ..................................................................... //
        }
    });
    res.status(200).json({ message: `Podaci skinuti sa ${urlToScrapeRain} i sačuvani u ${process.env.MONGODB_DB}!` });
});

const scrapePrecipitationRain = asyncHandler(async (req, res) => {
    request(urlToScrapeRain, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html);
            const h1 = table("#sadrzaj > div > h1:nth-child(10)").text().trim();
            let date = h1.slice(-10);
            while (date.indexOf(".") > -1) {
                date = date.replace(".", "");
            }
            const res = formatPrecipitationRain(table, [""]);
            const current = {};
            const dan = date.substring(0, 2);
            const mesec = date.substring(2, 4);
            const godina = date.substring(4, 8);
            const datum = [godina, mesec, dan].join("-");
            res.forEach(item => {
                item["date"] = new Date(datum)
            });
            current[date] = res;
            const dataArray = Object.values(current);
            for await (const obj of Object.values(dataArray[0])) {
                const item = new PrecipitationRainStation(obj);
                await item.save();
            }
            //.................. LOCAL SERVER FILE SYSTEM ..........................//
            const data = JSON.stringify(current);
            const folder = "Precipitation";
            await fsPromises.writeFile(path.join(__dirname, folder, `${date}.json`), data);
            // ..................................................................... //
        }
    });
    res.status(200).json({ message: `Podaci skinuta sa ${urlToScrapeRain} i sačuvani u ${process.env.MONGODB_DB}!` });
});

module.exports = { scrapeMainRain, scrapeClimateRain, scrapePrecipitationRain };