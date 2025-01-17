"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@react-email/components");
const react_1 = __importDefault(require("react"));
const BudgetNotificationEmail = ({ message }) => {
    return (react_1.default.createElement(components_1.Html, null,
        react_1.default.createElement(components_1.Head, null),
        react_1.default.createElement(components_1.Preview, null, "Budget Exceeded Notification"),
        react_1.default.createElement(components_1.Body, { style: main },
            react_1.default.createElement(components_1.Container, { style: container },
                react_1.default.createElement(components_1.Text, { style: company }, "TaskForce Wallet"),
                react_1.default.createElement(components_1.Heading, { style: heading }, "Budget Exceeded Notification"),
                react_1.default.createElement(components_1.Text, { style: messageStyle }, message),
                react_1.default.createElement(components_1.Text, { style: paragraph }, "Please review your budget and adjust accordingly.")))));
};
exports.default = BudgetNotificationEmail;
const main = {
    backgroundColor: "#ffffff",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center",
};
const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginTop: "20px",
    width: "480px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "12% 6%",
};
const company = {
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center",
};
const heading = {
    textAlign: "center",
};
const messageStyle = {
    textAlign: "center",
    margin: "16px 0",
};
const paragraph = {
    color: "#444",
    letterSpacing: "0",
    padding: "0 40px",
    margin: "0",
    textAlign: "center",
};
