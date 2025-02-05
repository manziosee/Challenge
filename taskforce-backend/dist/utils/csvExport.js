"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = void 0;
const json2csv_1 = require("json2csv");
const generateCSV = (data) => {
    const parser = new json2csv_1.Parser();
    return parser.parse(data);
};
exports.generateCSV = generateCSV;
