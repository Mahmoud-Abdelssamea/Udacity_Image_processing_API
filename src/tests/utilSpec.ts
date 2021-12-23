import { removeImageExtention, addImageExtention, resizing } from "../util";

describe("should remove the extention .jpg", () => {
  it("should remove the extention .jpg if available", () => {
    expect(removeImageExtention("image.jpg")).toEqual("image");
  });

  it("should send the same image without remove any thing ", () => {
    expect(removeImageExtention("image")).toEqual("image");
  });

  it("should not send any thing", () => {
    expect(removeImageExtention("")).toEqual("");
  });
});

describe("should add the extention .jpg if not available", () => {
  it("should add the extention .jpg ", () => {
    expect(addImageExtention("image")).toEqual("image.jpg");
  });

  it("should send file name with its extention without adding again", () => {
    expect(addImageExtention("image.jpg")).toEqual("image.jpg");
  });

  it("should add the extention .jpg if not available", () => {
    expect(addImageExtention("")).toEqual(undefined);
  });
});
