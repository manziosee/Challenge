"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrency = void 0;
const axios_1 = __importDefault(require("axios"));
const convertCurrency = (amount, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.OPEN_EXCHANGE_RATES_API_KEY;
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    try {
        const response = yield axios_1.default.get(url);
        const rates = response.data.rates;
        // Check if the rates for 'from' and 'to' currencies exist
        if (!rates[from]) {
            throw new Error(`Currency rate for '${from}' not found.`);
        }
        if (!rates[to]) {
            throw new Error(`Currency rate for '${to}' not found.`);
        }
        const convertedAmount = (amount / rates[from]) * rates[to];
        return convertedAmount;
    }
    catch (error) {
        // Provide a more informative error message
        if (error instanceof Error) {
            throw new Error(`Error converting currency: ${error.message}`);
        }
        else {
            throw new Error('Error converting currency: An unknown error occurred.');
        }
    }
});
exports.convertCurrency = convertCurrency;
