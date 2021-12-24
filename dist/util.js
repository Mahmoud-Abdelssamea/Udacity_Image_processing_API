"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizingHandler = exports.createUpdatedImageDIR = exports.resizeImage = exports.imageAvailble = exports.validateInputs = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
//
// -------------------createUpdatedImageDIR---------------------
const createUpdatedImageDIR = async () => {
    if (!fs_1.default.existsSync(`updatedImages`)) {
        fs_1.default.mkdir("updatedImages/", err => {
            if (err) {
                console.error(err);
            }
        });
    }
};
exports.createUpdatedImageDIR = createUpdatedImageDIR;
// -------------------------------------------------------------------
// -------------------validateInputs----------------------------------
// to check if user added all required data
const validateInputs = (imageName, width, height) => {
    if (imageName && width !== 0 && width && height && height !== 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.validateInputs = validateInputs;
// ---------------------------------------------------------------
// --------------------imageAvailble------------------------------
// check image availalbe in /images folder
const imageAvailble = (imageName) => {
    // if user added image name without extention .jpg
    if (fs_1.default.existsSync(`images/${imageName}.jpg`)) {
        return true;
    }
    else {
        return false;
    }
};
exports.imageAvailble = imageAvailble;
// ----------------------------------------------------------------
// -------------------------resizingHandler------------------------
const resizingHandler = async (req, res) => {
    // get the required image name, width and height
    const imageName = req.query.filename;
    const width = +req.query.width;
    const height = +req.query.height;
    if (validateInputs(imageName, width, height)) {
        createUpdatedImageDIR();
        const imagePath = `updatedImages/${imageName}_${width}_${height}.jpg`;
        // if image already resized before so it will show it again and will not resize it.
        if (fs_1.default.existsSync(imagePath)) {
            res.setHeader("content-type", "image/jpeg");
            // read file to the browser
            fs_1.default.readFile(imagePath, (err, updatedImage) => {
                res.end(updatedImage);
            });
            // if this image is new and not resized before so it will be resized as required
        }
        else if (imageAvailble(imageName)) {
            await resizeImage(imageName, width, height);
            // send image to Browser by changing content-type
            res.setHeader("content-type", "image/jpeg");
            // read file to the browser
            fs_1.default.readFile(`updatedImages/${imageName}_${width}_${height}.jpg`, (err, updatedImage) => {
                res.end(updatedImage);
            });
            // if image you want to resize not availabe in folder images/ so it will send message
        }
        else {
            // throw new Error("image name not available in folder /images");
            console.error("image name not available in folder /images");
            res.send("image name not available in folder /images   ##Note if you added extention of image Please remove it");
            // throw new Error("image name not available in folder /images");
        }
    }
    else if (!imageName && width && height) {
        res.send("filename value is missing");
    }
    else if (imageName && !width && height) {
        res.send("width value is missing");
    }
    else {
        res.send("height Value is missing");
    }
};
exports.resizingHandler = resizingHandler;
// -----------------------------------------------------------------------
// ----------------------resizeImage-------------------------------------
// sharp function to resize the image
const resizeImage = async (imageName, width, height) => {
    const path = `images/${imageName}.jpg`;
    try {
        await (0, sharp_1.default)(path)
            .resize(width, height, {
            fit: "contain",
            background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        })
            .toFile(`updatedImages/${imageName}_${width}_${height}.jpg`);
    }
    catch (error) {
        console.error(error);
    }
};
exports.resizeImage = resizeImage;
