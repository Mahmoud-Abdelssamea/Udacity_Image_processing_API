import { Router } from "express";
import { validateInputs, imageAvailble, resizeImage } from "../util";
import fs from "fs";

const router = Router();

router.get("/convert/", async (req, res) => {
  // get the required image name, width and height
  const imageName = req.query.filename as string;
  const width = +(req.query.width as string) as number;
  const height = +(req.query.height as string) as number;

  if (validateInputs(imageName, width, height)) {
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
    console.log("filename value is missing");
    res.send("filename value is missing");
  } else if (imageName && !width && height) {
    console.log("Width Value is missing");
    res.send("width value is missing");
  } else {
    console.log("height Value is missing");
    res.send("height Value is missing");
  }
});

export default router;
