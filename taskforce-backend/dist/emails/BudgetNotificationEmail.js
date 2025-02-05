"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const BudgetNotificationEmail = ({ message }) => {
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: "Budget Exceeded Notification" }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: main, children: (0, jsx_runtime_1.jsxs)(components_1.Container, { style: container, children: [(0, jsx_runtime_1.jsx)(components_1.Text, { style: company, children: "TaskForce Wallet" }), (0, jsx_runtime_1.jsx)(components_1.Heading, { style: heading, children: "Budget Exceeded Notification" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: messageStyle, children: message }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: paragraph, children: "Please review your budget and adjust accordingly." })] }) })] }));
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
