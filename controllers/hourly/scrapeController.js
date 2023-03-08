require ("dotenv").config();
const cheerio = require("cheerio")
const request = require("request")
const asyncHandler = require("express-async-handler")
const urlToScrape = "https://www.hidmet.gov.rs/latin/osmotreni/index.php"
const MainStation = require("../../model/MainStation")
const AdditionalStation = require("../../model/AdditionalStation")
// const fsPromises = require("fs").promises
// const path = require("path")

function formatAdditional (obj, rem = []) {
    const columns = []
    const items = []
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(""))
    }
    obj("#sadrzaj > div > div > table > thead > tr > th").each((tr_index, element) => {
        let item = obj(element).text().trim().toString()
        item = item.replace("Temp.", "Temperatura")
        item = item.replace("Prit.", "Pritisak")
        columns.push(item)
    })
    obj("#sadrzaj > div > div > table > tbody > tr").each((index, row) => {
        const item = {}
        index.toString().replace(".", "")
        obj("td:not([colspan])", row).each((idx, td) => {
            item[columns[idx]] = cheerio.load(td).text().trim()
            // item[columns[idx]].toString().replace("-", "")
        })
        if (Object.entries(item).length !== 0) {
            items[index]= item
        }
    })
    return items
}

function formatMain (obj, rem = []) {
    const columns = []
    const items = []
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(""))
    }
    obj("#sadrzaj > div > table > thead > tr > th").each((tr_index, element) => {
        let el = obj(element).text().trim()
        if (el.indexOf("Brzina") > -1) {
            el = el.slice(0, 1) + "rzinavetra(m/s)"
        }
        columns.push(el)
    })
    obj("#sadrzaj > div > table > tbody > tr").each((index, row) => {
        const item = {}
        obj("td:not([colspan])", row).each((idx, td) => {
            item[columns[idx]] = cheerio.load(td).text().trim()
        })
        if (Object.entries(item).length !== 0) {
            items[index]= item
        }
    })
    return items
}

const scrapeMain = asyncHandler(async (req, res) => {
    request(urlToScrape, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html)
            const h1 = table("#sadrzaj > div > h1").text().trim()
            let date = h1.slice(-37, -27)
            let time = h1.slice(-17, -12)
            const res = formatMain(table, [""])
            const current = {}
            while (date.indexOf(".") > -1) {
                date = date.replace(".", "")
            }
            const timeStriped = time.replace(":", "")
            const dateTime = "" + date + "-" + timeStriped
            const dan = date.substring(0, 2)
            const mesec = date.substring(2, 4)
            const godina = date.substring(4, 8)
            const datum = [godina, mesec, dan].join("-")
            res.forEach(item => {
                item["Date"] = new Date(datum)
                item["Time"] = timeStriped
                if (!item["Subjektivniosećajtemperature(°C)"]) {
                    item["Subjektivniosećajtemperature(°C)"] = -100
                }
                if (item["Subjektivniosećajtemperature(°C)" === "-"] || item["Subjektivniosećajtemperature(°C)" === "undefined"]) {
                    item["Subjektivniosećajtemperature(°C)"] = 0
                }
                item["Subjektivniosećajtemperature(°C)"] = parseInt(item["Subjektivniosećajtemperature(°C)"])
                item["Temperatura(°C)"] = parseInt(item["Temperatura(°C)"])
                if (!item["Vlažnost(%)"]) {
                  item["Vlažnost(%)"] = -100
                }
                item["Vlažnost(%)"] = parseInt(item["Vlažnost(%)"])
                if (item["Pritisak(hPa)"] && item["Pritisak(hPa)"] === "-") {
                    item["Pritisak(hPa)"] = 0
                }
                item["Pritisak(hPa)"] = parseFloat(item["Pritisak(hPa)"])
                if (item["Brzinavetra(m/s)"] && item["Brzinavetra(m/s)"] === "-") {
                    item["Brzinavetra(m/s)"] = 0
                }
                if (item["Brzinavetra(m/s)"] && item["Brzinavetra(m/s)"] === "tiho") {
                    item["Brzinavetra(m/s)"] = 0
                }
                item["Brzinavetra(m/s)"] = parseFloat(item["Brzinavetra(m/s)"])
            })
            current[dateTime] = res
            const dataArray = Object.values(current)
            for await (const obj of Object.values(dataArray[0])) {
                const item = new MainStation(obj)
                await item.save()
            }
            //.................. LOCAL SERVER FILE SYSTEM ..........................//
            // const data = JSON.stringify(current)
            // const folderName = "Main"
            // await fsPromises.writeFile(path.join(__dirname, folderName, `${date}-${timeStriped}.json`), data)
        }
    })
    res.status(200).json({message: `Data scraped from ${urlToScrape} and inserted into ${process.env.MONGODB_DB}!`})
})

const scrapeAdditional = asyncHandler(async (req, res) => {
    request(urlToScrape, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html)
            const h1 = table("#sadrzaj > div > h1").text().trim()
            let date = h1.slice(-37, -27)
            let time = h1.slice(-17, -12)
            const res = formatAdditional(table, [""])
            const current = {}
            while (date.indexOf(".") > -1) {
                date = date.replace(".", "")
            }
            const timeStriped = time.replace(":", "")
            const dateTime = "" + date + "-" + timeStriped
            const dan = date.substring(0, 2)
            const mesec = date.substring(2, 4)
            const godina = date.substring(4, 8)
            const datum = [godina, mesec, dan].join("-")
            res.forEach(item => {
                item["Date"] = new Date(datum)
                item["Time"] = timeStriped
                if (!item["Temperatura(°C)"] || item["Temperatura(°C)"] === "-" || item["Temperatura(°C)"] === "undefined") item["Temperatura(°C)"] = -100
                item["Temperatura(°C)"] = parseFloat(item["Temperatura(°C)"])
                if (!item["Vlažnost(%)"] || item["Vlažnost(%)"] === "-" || item["Vlažnost(%)"] === "undefined") item["Vlažnost(%)"] = -100
                item["Vlažnost(%)"] = parseInt(item["Vlažnost(%)"])
                if (!item["Pritisak(hPa)"] || item["Pritisak(hPa)"] === "-" || item["Pritisak(hPa)"] === "undefined") item["Pritisak(hPa)"] = -100
                item["Pritisak(hPa)"] = parseFloat(item["Pritisak(hPa)"])
                if (!item["Vetarbrzina(m/s)"] || item["Vetarbrzina(m/s)"] === "-" || item["Vetarbrzina(m/s)"] === "undefined") item["Vetarbrzina(m/s)"] = -100
                if (item["Vetarbrzina(m/s)"] === "tiho") item["Vetarbrzina(m/s)"] = 0
                item["Vetarbrzina(m/s)"] = parseFloat(item["Vetarbrzina(m/s)"])
                if (!item["Vetarpravac(°)"] || item["Vetarpravac(°)"] === "-" || item["Vetarpravac(°)"] === "undefined") item["Vetarpravac(°)"] = -100
                item["Vetarpravac(°)"] = parseInt(item["Vetarpravac(°)"])
            })
            current[dateTime] = res
            const dataArray = Object.values(current)
            for await (const obj of Object.values(dataArray[0])) {
                const item = new AdditionalStation(obj)
                await item.save()
            }
            //.................. LOCAL SERVER FILE SYSTEM ..........................//
            // const data = JSON.stringify(current)
            // const folder = "Additional"
            // await fsPromises.writeFile(path.join(__dirname, folder, `${date}-${timeStriped}.json`), data)
        }
    })
        res.status(200).json({ message: `Data scraped from ${urlToScrape} and inserted into ${process.env.MONGODB_DB}!` })
})

module.exports = { scrapeMain, scrapeAdditional }