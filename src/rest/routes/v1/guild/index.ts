import express from "express";
import createGuild from "./createGuild";
import getGuild from "./getGuild";
const router = express.Router();

router.use("/create_guild", createGuild);
router.use("/get_guild", getGuild);


export default router;