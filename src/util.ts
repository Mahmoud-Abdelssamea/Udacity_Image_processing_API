import fs from "fs";
import sharp from "sharp";
import { Request, Response } from "express";

//
// -------------------createUpdatedImageDIR---------------------
const createUpdatedImageDIR = async (): Promise<void> => {
  if (!fs.existsSync(`updatedImages`)) {
    fs.mkdir("updatedImages/", err => {
      if (err) {
        console.error(err);
      }
    });
  }
};
// -------------------------------------------------------------------

// -------------------validateInputs----------------------------------
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
// ---------------------------------------------------------------

// --------------------imageAvailble------------------------------
// check image availalbe in /images folder
const imageAvailble = (imageName: string): boolean => {
  // if user added image name without extention .jpg
  if (fs.existsSync(`images/${imageName}.jpg`)) {
    return true;
  } else {
    return false;
  }
};
// ----------------------------------------------------------------

// -------------------------resizingHandler------------------------
const resizingHandler = async (req: Request, res: Response) => {
  // get the required image name, width and height
  const imageName = req.query.filename as string;
  const width = +(req.query.width as string) as number;
  const height = +(req.query.height as string) as number;

  if (validateInputs(imageName, width, height)) {
    createUpdatedImageDIR();
    const imagePath = `updatedImages/${imageName}_${width}_${height}.jpg`;

    // if image already resized before so it will show it again and will not resize it.
    if (fs.existsSync(imagePath)) {
      res.setHeader("content-type", "image/jpeg");
      // read file to the browser
      fs.readFile(imagePath, (err, updatedImage) => {
        res.end(updatedImage);
      });

      // if this image is new and not resized before so it will be resized as required
    } else if (imageAvailble(imageName)) {
      await resizeImage(imageName, width, height);

      // send image to Browser by changing content-type
      res.setHeader("content-type", "image/jpeg");
      // read file to the browser
      fs.readFile(
        `updatedImages/${imageName}_${width}_${height}.jpg`,
        (err, updatedImage) => {
          res.end(updatedImage);
        }
      );

      // if image you want to resize not availabe in folder images/ so it will send message
    } else {
      // throw new Error("image name not available in folder /images");
      console.error("image name not available in folder /images");
      res.send(
        "image name not available in folder /images   ##Note if you added extention of image Please remove it"
      );
      // throw new Error("image name not available in folder /images");
    }
  } else if (!imageName && width && height) {
    res.send("filename value is missing");
  } else if (imageName && !width && height) {
    res.send("width value is missing");
  } else {
    res.send("height Value is missing");
  }
};
// -----------------------------------------------------------------------

// ----------------------resizeImage-------------------------------------
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
    console.error(error);
  }
};
// ---------------------------------------------------------------------------

// -------------------------exporting----------------------------------------
export {
  validateInputs,
  imageAvailble,
  resizeImage,
  createUpdatedImageDIR,
  resizingHandler,
};
