import { Router } from "express";
import { resizingHandler } from "../util";

const router = Router();

router.get("/convert/", resizingHandler);

export default router;
