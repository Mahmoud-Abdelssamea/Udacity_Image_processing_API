"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
it("should remove the extention .jpg if available", () => {
    expect((0, util_1.removeImageExtention)("image.jpg")).toEqual("image");
    expect((0, util_1.removeImageExtention)("image")).toEqual("image");
});
it("should add the extention .jpg if not available", () => {
    expect((0, util_1.addImageExtention)("image")).toEqual("image.jpg");
    expect((0, util_1.addImageExtention)("image.jpg")).toEqual("image.jpg");
});
