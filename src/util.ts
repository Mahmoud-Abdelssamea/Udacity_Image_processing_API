import fs from "fs";
import sharp from "sharp";

const createUpdatedImageDIR = async (): Promise<void> => {
  if (!fs.existsSync(`updatedImages`)) {
    fs.mkdir("updatedImages/", err => {
      if (err) {
        console.error(err);
      }
    });
  }
};

// to check if user added all required data
const validateInputs = (
  imageName: string,
  width: number,
  height: number
): boolean => {
  if (imageName && width !== 0 && width && height && height !== 0) {
    return true;
  } else {
    return false;
  }
};

// check image availalbe in /images folder
const imageAvailble = (imageName: string): boolean => {
  // if user added image name without extention .jpg
  if (fs.existsSync(`images/${imageName}.jpg`)) {
    return true;
  } else {
    return false;
  }
};

// sharp function to resize the image
const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<void> => {
  const path = `images/${imageName}.jpg`;

  try {
    await sharp(path)
      .resize(width, height, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0.5 },
      })
      .toFile(`updatedImages/${imageName}_${width}_${height}.jpg`);
  } catch (error) {
    console.log(error);
  }
};

export { validateInputs, imageAvailble, resizeImage, createUpdatedImageDIR };
