import { validateInputs, imageAvailble } from "../util";

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
