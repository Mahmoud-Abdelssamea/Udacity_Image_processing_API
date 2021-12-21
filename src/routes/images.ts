import { Router } from "express";

const router = Router();

router.get("/convert/", (req, res, next) => {
  const imageName = req.query.filename;
  const width = req.query.width;
  const hieght = req.query.hieght;
  console.log(imageName, width, hieght);
});

export default router;
