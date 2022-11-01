"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../lib/logger"));
const requestLogger = (req, _res, next) => {
    // Note that this may be a different header if we
    // route traffic through a load  balancer
    const ip = req.headers["x-forwarded-for"] || req.ip;
    (0, logger_1.default)().info(` ==> Started request to ${req.url}`);
    (0, logger_1.default)().info(`Query parameters: ${JSON.stringify(req.query)}`);
    (0, logger_1.default)().info(`Body: ${JSON.stringify(req.body)}`);
    next();
};
exports.default = requestLogger;
