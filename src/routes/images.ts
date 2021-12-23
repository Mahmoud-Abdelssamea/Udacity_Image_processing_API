import { Router } from "express";
import { validateInputs, imageAvailble, resizeImage } from "../util";
import fs from "fs";
// import resizing from "../util";

const router = Router();

router.get("/convert/", async (req, res, next) => {
  // get the required image name, width and height
  const imageName = (req.query as { filename: string }).filename;
  const width = +(req.query as { width: string }).width;
  const height = +(req.query as { height: string }).height;

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

      // throw new Error("image name not available in folder /images");
    }
  } else {
    console.log("you forgot to add some data");
    res.send("you forgot to add some data");
  }
});

export default router;
