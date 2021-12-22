import { removeImageExtention, addImageExtention, resizing } from "../util";

it("should remove the extention .jpg if available", () => {
  expect(removeImageExtention("image.jpg")).toEqual("image");

  expect(removeImageExtention("image")).toEqual("image");
});

it("should add the extention .jpg if not available", () => {
  expect(addImageExtention("image")).toEqual("image.jpg");

  expect(addImageExtention("image.jpg")).toEqual("image.jpg");
});
