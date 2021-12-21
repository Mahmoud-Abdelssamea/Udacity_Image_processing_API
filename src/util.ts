import sharp from "sharp";

// check the extention for image is availble or not
// if not will add extention .jpg
const addImageExtention = (nameOfImage: string) => {
  if (nameOfImage.slice(-4) === ".jpg") {
    return nameOfImage;
  } else {
    return `${nameOfImage}.jpg`;
  }
};

// remove extention from image
const removeImageExtention = (nameOfImage: string) => {
  if (nameOfImage.slice(-4) === ".jpg") {
    return nameOfImage.slice(0, -4);
  } else {
    return nameOfImage;
  }
};

// function to get the path for the image
const imagePath = (
  folder: string,
  imageName: string,
  height?: number,
  width?: number
) => {
  if (width && height) {
    return `${folder}/${removeImageExtention(
      imageName
    )}_${height}_${width}.jpg`;
  } else {
    return `${folder}/${addImageExtention(imageName)}`;
  }
};

// make resizing funcion to resize the image
const resizing = async (imageName: string, height: number, width?: number) => {
  // check if user added extention to image name

  //   use sharp middleware to resize the image

  const convert = sharp(imagePath("images", imageName));

  convert.resize(height, width, { fit: "contain" });
  await convert.toFile(imagePath("updatedImages", imageName, height, width));
};

export { resizing, imagePath };
