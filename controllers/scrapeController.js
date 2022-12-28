require ('dotenv').config();
const cheerio = require('cheerio')
const request = require('request')
const asyncHandler = require('express-async-handler')
const urlToScrape = 'https://www.hidmet.gov.rs/latin/osmotreni/index.php'
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const {GoogleDriveService} = require('../googleDriveService')
const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || ''
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || ''
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || ''
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || ''

const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken)


function formatAdditional (obj, rem = []) {
    const columns = []
    const items = []
    if (rem && rem.length) {
        rem.forEach(tag => obj(tag).replaceWith(''))
    }
    obj('#sadrzaj > div > div > table > thead > tr > th').each((tr_index, element) => {
        let item = obj(element).text().trim().toString()
        item = item.replaceAll("Temp.", "Temperatura")
        item = item.replaceAll("Prit.", "Pritisak")
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
            const date = h1.slice(-37, -27)
            const time = h1.slice(-17, -12)
            const res = formatMain(table, [''])
            const current = {}
            const dateStriped = date.replace("/./g", "")
            const timeStriped = time.replace("/:/g", "")
            const dateTime = '' + dateStriped + '-' + timeStriped
            res.forEach(item => item['date'] = dateStriped)
            res.forEach(item => item['time'] = timeStriped)
            current[dateTime] = res
            const data = JSON.stringify(current)
            const folderName = 'Main'
            const folder = await googleDriveService.searchFolder(folderName)
                .catch((error) => {
                console.error(error)
                return null
            })
            if (!folder) {
                folder = await googleDriveService.createFolder(folderName)
            }
            await googleDriveService.saveFile(`${dateStriped}-${timeStriped}.json`, data, 'application/json', folder.id).catch((error) => {
                console.error(error)
            })
            await fsPromises.writeFile(path.join(__dirname, folderName, `${dateStriped}-${timeStriped}.json`), data)
        }
    })
    res.status(200).json({message: 'Data scraped!'})
})

const scrapeAdditional = asyncHandler(async (req, res) => {
    request(urlToScrape, async (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const table = cheerio.load(html)
            const h1 = table('#sadrzaj > div > h1').text().trim()
            const date = h1.slice(-37, -27)
            const time = h1.slice(-17, -12)
            const res = formatAdditional(table, [''])
            const current = {}
            const dateStriped = date.replace("/./g", "")
            const timeStriped = time.replace("/:/g", "")
            const dateTime = '' + dateStriped + '-' + timeStriped
            res.forEach(item => item['date-time'] = dateTime)
            current[dateTime] = res
            const folder = './Additional'
            const data = JSON.stringify(current)
            await fsPromises.writeFile(path.join(__dirname, folder, `${dateStriped}-${timeStriped}.json`), data)
        }
    })
    res.status(200).json(result)
})

module.exports = { scrapeMain, scrapeAdditional }