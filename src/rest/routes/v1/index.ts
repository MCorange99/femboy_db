import auth from "./auth";
import channel from "./channel";
import guild from "./guild";
import message from "./message";
import user from "./message";

import express from "express";
const router = express.Router();


router.use("/auth", auth);
router.use("/user", user);
router.use("/guild", guild);
router.use("/channel", channel);
router.use("/message", message);

export default router;