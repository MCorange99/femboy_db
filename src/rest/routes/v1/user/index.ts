import getInfo from "./getInfo";
import express from "express";
const router = express.Router();


router.use("/get_info", getInfo);

export default router;