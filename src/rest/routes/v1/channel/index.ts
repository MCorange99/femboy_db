import createChannel from "./createChannel";

import express from "express";
const router = express.Router();

router.use("/create_channel", createChannel);

export default router;