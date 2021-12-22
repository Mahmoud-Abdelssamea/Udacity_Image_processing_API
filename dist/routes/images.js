"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const util_1 = require("../util");
const fs_1 = __importDefault(require("fs"));
// import resizing from "../util";
const router = (0, express_1.Router)();
router.get("/convert/", async (req, res, next) => {
    // get the required image name, width and height
    const imageName = req.query.filename;
    const width = +req.query.width;
    const height = +req.query.height;
    //check if image is already converted with same size before (caching)
    const convertedImagepath = (0, util_1.imagePath)("updatedImages", imageName, height, width);
    // if required image is already available and converted before
    // send it to browser
    if (fs_1.default.existsSync(convertedImagepath)) {
        res.setHeader("content-type", "image/jpeg");
        fs_1.default.readFile(convertedImagepath, (err, image) => {
            res.end(image);
        });
    }
    else {
        // if not converted before so we start convert it
        await (0, util_1.resizing)(imageName, height, width);
        //After send image to browser
        res.setHeader("content-type", "image/jpeg");
        const path = (0, util_1.imagePath)("updatedImages", imageName, height, width);
        fs_1.default.readFile(path, (err, image) => {
            res.end(image);
        });
    }
});
exports.default = router;
