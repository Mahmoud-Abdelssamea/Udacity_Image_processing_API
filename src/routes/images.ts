import { Router } from "express";
import { resizingHandler } from "../util";
import fs from "fs";

const router = Router();

router.get("/convert/", resizingHandler);

export default router;
