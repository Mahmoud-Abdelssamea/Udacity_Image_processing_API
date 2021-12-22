"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const images_1 = __importDefault(require("./routes/images"));
const morgan_1 = __importDefault(require("morgan"));
dotenv.config();
const app = (0, express_1.default)();
// get port from .env file
const port = process.env.PORT || 3000;
// middleware morgan logger
app.use((0, morgan_1.default)("dev"));
// static middleware
app.use("/images", express_1.default.static(__dirname + "/images"));
app.use("/updatedImages", express_1.default.static(__dirname + "/updatedImages"));
// routes middleware
app.use("/api", images_1.default);
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});