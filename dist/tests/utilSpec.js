"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const fs_1 = __importDefault(require("fs"));
describe("test validatInputs function", () => {
    it("should give me true as all required data available", () => {
        const validate = (0, util_1.validateInputs)("image", 200, 300);
        expect(validate).toBeTrue();
    });
    it("should give me false as some required data not available", () => {
        const validate = (0, util_1.validateInputs)("", 200, 300);
        expect(validate).toBeFalse();
    });
});
// ---------------------------------------------------------------------------
describe("test imageAvailble function", () => {
    it("should give me true if image is available in folder /images", () => {
        const availble = (0, util_1.imageAvailble)("santamonica");
        expect(availble).toBeTrue();
    });
    it("should give me false as some required data not available", () => {
        const availble = (0, util_1.imageAvailble)("imagesss");
        expect(availble).toBeFalse();
    });
});
// ---------------------------createUpdatedImageDIR--------------------------------------------
describe("test createUpdatedImageDIR function", () => {
    it("should output folder with name 'updatedImages/' ", () => {
        (0, util_1.createUpdatedImageDIR)().then(() => {
            const dir = `updatedImages/`;
            expect(fs_1.default.existsSync(dir)).toBeTrue();
        });
    });
});
// --------------------------resizing function --------------------------------------------
// shoud not be available image with same name in the updatedImages folder
describe("test resizing function", () => {
    it("should output true when new image resized in folder /udatedImages", async () => {
        await (0, util_1.resizeImage)("santamonica", 200, 300).then(() => {
            const thePath = `updatedImages/santamonica_200_300.jpg`;
            expect(fs_1.default.existsSync(thePath)).toBeTrue();
        });
    });
});
