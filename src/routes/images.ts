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
    // if image already resized before so it will show it again and will not resize it.
    if (fs.existsSync(`updatedImages/${imageName}_${width}_${height}.jpg`)) {
      res.send("image is already available");

      // if this image is new and not resized before so it will be resized as required
    } else if (imageAvailble(imageName)) {
      resizeImage(imageName, width, height);
      console.log("image resized");

      // if image you want to resize not availabe in folder images/ so it will send message
    } else {
      console.log("image name not available in folder /images");

      // throw new Error("image name not available in folder /images");
    }
  } else {
    console.log("you forgot to add some data");
  }
});

export default router;
