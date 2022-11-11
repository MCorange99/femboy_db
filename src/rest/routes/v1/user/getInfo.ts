import crypto from "crypto";
import express from "express";
import { default as Util, ApiError, Id } from "../../../../utils";
import validator from "validator";
const router = express.Router();

router.get("/", async (req, res) => {
    if (!await Util.checkApiAuth(req, res)) return;
    const user = await Server.db.userSchema.findOne({
        api: {
            key: req.headers["authorization"]
        }
    });
    if (!user) {
        return ApiError.InternalError(res, "User passed auth check but user wasnt found");
    }

    logger.debug(`Gave info to user ${user.username}<${user.email}>`, __filename, "Rest /user/getinfo");


    res.status(200).json({
        id: String(user._id),
        username: String(user.username),
        discriminator: String(user.discriminator),
        email: String(user.email),
        avatarUrl: String(user.avatarUrl),
        verified: Boolean(user.verified),
        token: String(user.api.key),
        guilds: user.guilds.map((guild) => { String(guild);}),
    });
});

export default router;