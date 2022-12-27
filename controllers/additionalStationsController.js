const AdditionalStation = require('../model/AdditionalStation')
const asyncHandler = require('express-async-handler')
const path = require('path')
const { readFileSync, readdirSync } = require('fs')

const weather = JSONFile => JSON.parse(readFileSync(path.join(__dirname, '..', 'controllers', 'Additional', JSONFile)))

const files = readdirSync(path.join(__dirname, 'Additional'))

const insertData = asyncHandler(async (req, res) => {
    for await (const f of files) {
        const jf = weather(f)
        const values = Object.values(jf)
        for await (const obj of values[0]) {
            const item = new AdditionalStation(obj)
            item.save()
        }
    }
    res.status(201).json({message: 'Documents inserted!'})
})

module.exports = insertData