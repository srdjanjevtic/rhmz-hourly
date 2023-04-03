const MainStation = require("../../model/MainStation");
const asyncHandler = require("express-async-handler");
const path = require("path");
const { readFileSync, readdirSync } = require("fs");

const weather = JSONFile => JSON.parse(readFileSync(path.join(__dirname, "..", "controllers", "Main", JSONFile)));
const files = readdirSync(path.join(__dirname, "Main"));

const insertData = asyncHandler(async (req, res) => {
    for await (const f of files) {
        const jf = weather(f);
        const values = Object.values(jf);
        for await (const obj of values[0]) {
            const item = new MainStation(obj);
            item.save();
        }
    }
    res.status(201).json({ message: "Dokumenata sačuvano!" });
});

module.exports = insertData;