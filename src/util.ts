import fs from "fs";
import sharp from "sharp";

// to check if user added all required data
const validateInputs = (imageName: string, width: number, height: number) => {
  if (imageName && width && height) {
    return true;
  } else {
    return false;
  }
};

// check image availalbe in /images folder
const imageAvailble = (imageName: string) => {
  // if user added image name with extention .jpg
  if (imageName.slice(-4) === ".jpg") {
    if (fs.existsSync(`images/${imageName}`)) {
      return true;
    } else {
      return false;
    }
  } else {
    // if user added image name without extention .jpg
    if (fs.existsSync(`images/${imageName}.jpg`)) {
      return true;
    } else {
      return false;
    }
  }
};

// sharp function to resize the image
const resizeImage = (imageName: string, width: number, height: number) => {
  const path = `images/${imageName}`;

  sharp(path)
    .resize(width, height, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0.5 },
    })
    .toFile(`updatedImages/${imageName}_${width}_${height}.jpg`)
    .then(() => {
      // output.png is a 200 pixels wide and 300 pixels high image
      // containing a nearest-neighbour scaled version
      // contained within the north-east corner of a semi-transparent white canvas
    });
};
export { validateInputs, imageAvailble, resizeImage };
