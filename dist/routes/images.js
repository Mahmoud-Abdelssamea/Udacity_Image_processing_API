"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const util_1 = require("../util");
const router = (0, express_1.Router)();
router.get("/convert/", util_1.resizingHandler);
exports.default = router;
