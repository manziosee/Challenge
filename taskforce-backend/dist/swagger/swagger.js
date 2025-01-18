"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
// src/swagger/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = __importDefault(require("../utils/logger")); // Import logger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Force Wallet API',
            version: '1.0.0',
            description: 'API for managing personal finances',
        },
        servers: [
            { url: 'http://localhost:5000', description: 'Development server' },
            { url: 'https://taskforce-challenge.onrender.com', description: 'Render server' }, // Add your Render URL here
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API routes
};
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    logger_1.default.info('Setting up Swagger documentation'); // Add log
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    logger_1.default.info('Swagger documentation setup complete'); // Add log
};
exports.setupSwagger = setupSwagger;
