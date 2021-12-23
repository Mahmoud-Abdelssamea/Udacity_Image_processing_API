"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
describe("should remove the extention .jpg", () => {
    it("should remove the extention .jpg if available", () => {
        expect((0, util_1.removeImageExtention)("image.jpg")).toEqual("image");
    });
    it("should send the same image without remove any thing ", () => {
        expect((0, util_1.removeImageExtention)("image")).toEqual("image");
    });
    it("should not send any thing", () => {
        expect((0, util_1.removeImageExtention)("")).toEqual("");
    });
});
describe("should add the extention .jpg if not available", () => {
    it("should add the extention .jpg ", () => {
        expect((0, util_1.addImageExtention)("image")).toEqual("image.jpg");
    });
    it("should send file name with its extention without adding again", () => {
        expect((0, util_1.addImageExtention)("image.jpg")).toEqual("image.jpg");
    });
    it("should add the extention .jpg if not available", () => {
        expect((0, util_1.addImageExtention)("")).toEqual(undefined);
    });
});
