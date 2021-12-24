import {
  validateInputs,
  imageAvailble,
  createUpdatedImageDIR,
  resizeImage,
} from "../util";

import fs from "fs";

describe("test validatInputs function", () => {
  it("should give me true as all required data available", () => {
    const validate = validateInputs("image", 200, 300);
    expect(validate).toBeTrue();
  });

  it("should give me false as some required data not available", () => {
    const validate = validateInputs("", 200, 300);
    expect(validate).toBeFalse();
  });
});

// ---------------------------------------------------------------------------
describe("test imageAvailble function", () => {
  it("should give me true if image is available in folder /images", () => {
    const availble = imageAvailble("santamonica");
    expect(availble).toBeTrue();
  });

  it("should give me false as some required data not available", () => {
    const availble = imageAvailble("imagesss");
    expect(availble).toBeFalse();
  });
});

// ---------------------------createUpdatedImageDIR--------------------------------------------

describe("test createUpdatedImageDIR function", () => {
  it("should output folder with name 'updatedImages/' ", () => {
    createUpdatedImageDIR().then(() => {
      const dir = `updatedImages/`;
      expect(fs.existsSync(dir)).toBeTrue();
    });
  });
});

// --------------------------resizing function --------------------------------------------
// shoud not be available image with same name in the updatedImages folder
describe("test resizing function", () => {
  it("should output true when new image resized in folder /udatedImages", async () => {
    await resizeImage("santamonica", 200, 300).then(() => {
      const thePath = `updatedImages/santamonica_200_300.jpg`;
      expect(fs.existsSync(thePath)).toBeTrue();
    });
  });
});
