import { Router } from "express";
import { imagePath, resizing } from "../util";
import fs from "fs";
// import resizing from "../util";

const router = Router();

router.get("/convert/", async (req, res, next) => {
  // get the required image name, width and height
  const imageName = (req.query as { filename: string }).filename;
  const width = +(req.query as { width: string }).width;
  const height = +(req.query as { height: string }).height;

  //check if image is already converted with same size before (caching)
  const convertedImagepath = imagePath(
    "updatedImages",
    imageName,
    height,
    width
  );

  // if required image is already available and converted before
  // send it to browser
  if (fs.existsSync(convertedImagepath)) {
    res.setHeader("content-type", "image/jpeg");
    fs.readFile(convertedImagepath, (err, image) => {
      res.end(image);
    });
  } else {
    // if not converted before so we start convert it
    await resizing(imageName, height, width);

    //After send image to browser
    res.setHeader("content-type", "image/jpeg");
    const path = imagePath("updatedImages", imageName, height, width);
    fs.readFile(path, (err, image) => {
      res.end(image);
    });
  }
});

export default router;
