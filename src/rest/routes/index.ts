import v1 from "./v1";
import express from "express";
const router = express.Router();

//* Current stable version is v1
router.use("/", v1);


router.use("/v1", v1);

export default router;