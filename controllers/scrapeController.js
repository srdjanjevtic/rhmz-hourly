require ('dotenv').config();
const cheerio = require('cheerio')
const request = require('request')
const asyncHandler = require('express-async-handler')
const urlToScrape = 'https://www.hidmet.gov.rs/latin/osmotreni/index.php'
const MainStation = require('../model/MainStation')
const AdditionalStation = require('../model/AdditionalStation')
const fsPromises = require('fs').promises
const path = require('path')

function formatAdditional (obj, rem = []) {
    const columns = []
    const items = []
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(''))
    }
    obj('#sadrzaj > div > div > table > thead > tr > th').each((tr_index, element) => {
        let item = obj(element).text().trim().toString()
        item = item.replace("Temp.", "Temperatura")
        item = item.replace("Prit.", "Pritisak")
        columns.push(item)
    })
    obj('#sadrzaj > div > div > table > tbody > tr').each((index, row) => {
        const item = {}
        index.toString().replace('.', '')
        obj('td:not([colspan])', row).each((idx, td) => {
            item[columns[idx]] = cheerio.load(td).text().trim()
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
        rem.forEach(tag => obj(tag).replaceWith(''))
    }
    obj('#sadrzaj > div > table > thead > tr > th').each((tr_index, element) => {
        columns.push(obj(element).text().trim())
    })
    obj('#sadrzaj > div > table > tbody > tr').each((index, row) => {
        const item = {}
        obj('td:not([colspan])', row).each((idx, td) => {
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
            const h1 = table('#sadrzaj > div > h1').text().trim()
            let date = h1.slice(-37, -27)
            let time = h1.slice(-17, -12)
            const res = formatMain(table, [''])
            const current = {}
            while (date.indexOf('.') > -1) {
                date = date.replace(".", "")
            }
            const timeStriped = time.replace(":", "")
            const dateTime = '' + date + '-' + timeStriped
            res.forEach(item => item['date'] = date)
            res.forEach(item => item['time'] = timeStriped)
            current[dateTime] = res
            const data = JSON.stringify(current)
            const dataArray = Object.values(current)
            for await (const obj of Object.values(dataArray[0])) {
                const item = new MainStation(obj)
                await item.save()
        }
            const folderName = 'Main'
            await fsPromises.writeFile(path.join(__dirname, folderName, `${date}-${timeStriped}.json`), data)
        }
    })
    res.status(200).json({message: 'Data scraped!', data})
})

const scrapeAdditional = asyncHandler(async (req, res) => {
    request(urlToScrape, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html)
            const h1 = table('#sadrzaj > div > h1').text().trim()
            let date = h1.slice(-37, -27)
            let time = h1.slice(-17, -12)
            const res = formatAdditional(table, [''])
            const current = {}
            while (date.indexOf('.') > -1) {
                date = date.replace(".", "")
            }
            const timeStriped = time.replace(":", "")
            const dateTime = '' + date + '-' + timeStriped
            res.forEach(item => item['date'] = date)
            res.forEach(item => item['time'] = timeStriped)
            current[dateTime] = res
            const data = JSON.stringify(current)
            const dataArray = Object.values(current)
            for await (const obj of Object.values(dataArray[0])) {
                const item = new AdditionalStation(obj)
                await item.save()

        }
            const folder = 'Additional'
            await fsPromises.writeFile(path.join(__dirname, folder, `${date}-${timeStriped}.json`), data)
        }
    })
    res.status(200).json({message: 'Data scraped!', data})
})

module.exports = { scrapeMain, scrapeAdditional }