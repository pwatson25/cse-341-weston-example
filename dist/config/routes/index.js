"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const requestLogger_1 = __importDefault(require("../../middlware/requestLogger"));
const event_routes_1 = __importDefault(require("./event.routes"));
const cleanRomance_routes_1 = __importDefault(require("./cleanRomance.routes"));
const fairytale_routes_1 = __importDefault(require("./fairytale.routes"));
const swagger_output_json_1 = __importDefault(require("../../swagger-output.json"));
const router = (0, express_1.Router)();
// API docs
router.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
// Login, logout, etc. with Auth0
router.use(requestLogger_1.default);
// Events
router.use("/api/v1/events", (0, event_routes_1.default)(express_1.default.Router()));
// Clean Romance Books
router.use(cleanRomance_routes_1.default);
// Fairytales and Fantasy Books
router.use(fairytale_routes_1.default);
// Custom 404 handler
// See https://expressjs.com/en/starter/faq.html
router.use((_req, res) => {
    res.status(404).json({ error: "not found" });
});
// See http://expressjs.com/en/guide/error-handling.html
router.use((error, req, res, _next) => {
    const statusMap = {
        ValidationError: 400,
    };
    res.status(statusMap[error.name] || 500);
    res.json({
        error: error.message || "Application error, please contact support.",
    });
});
exports.default = router;
