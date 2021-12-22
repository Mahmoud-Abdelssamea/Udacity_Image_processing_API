"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImageExtention = exports.removeImageExtention = exports.imagePath = exports.resizing = void 0;
const sharp_1 = __importDefault(require("sharp"));
// check the extention for image is availble or not
// if not will add extention .jpg
const addImageExtention = (nameOfImage) => {
    if (nameOfImage.slice(-4) === ".jpg") {
        return nameOfImage;
    }
    else {
        return `${nameOfImage}.jpg`;
    }
};
exports.addImageExtention = addImageExtention;
// remove extention from image
const removeImageExtention = (nameOfImage) => {
    if (nameOfImage.slice(-4) === ".jpg") {
        return nameOfImage.slice(0, -4);
    }
    else {
        return nameOfImage;
    }
};
exports.removeImageExtention = removeImageExtention;
// function to get the path for the image
const imagePath = (folder, imageName, height, width) => {
    if (width && height) {
        return `${folder}/${removeImageExtention(imageName)}_${height}_${width}.jpg`;
    }
    else {
        return `${folder}/${addImageExtention(imageName)}`;
    }
};
exports.imagePath = imagePath;
// make resizing funcion to resize the image
const resizing = async (imageName, height, width) => {
    // check if user added extention to image name
    //   use sharp middleware to resize the image
    const convert = (0, sharp_1.default)(imagePath("images", imageName));
    convert.resize(height, width, { fit: "contain" });
    await convert.toFile(imagePath("updatedImages", imageName, height, width));
};
exports.resizing = resizing;
