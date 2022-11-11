import crypto from "crypto";
import express from "express";
import { ApiError } from "../../../../utils";
const router = express.Router();

router.post("/", async (req, res) => {
    const {
        password,
        email
    } = req.body;


    if (!password || !email) return ApiError.MissingProps(res, ["password", "email"]);

    let user = await Server.db.userSchema.findOne({ email: email});
    if (!user) {
        return ApiError.UserNotFound(res);
    }

    const hash = crypto.createHash("sha256").update(user.salt + password).digest("base64");

    if (hash !== user.password_hash) {
        return ApiError.CredsInvalid(res);
    }

    logger.debug(`Logged in user ${user.username}<${user._id}>`, __filename, "Rest /auth/login");


    user = {
        id: String(user._id),
        username: String(user.username),
        discriminator: String(user.discriminator),
        email: String(user.email),
        avatarUrl: String(user.avatarUrl),
        verified: Boolean(user.verified),
        token: String(user.api.key),
        guilds: user.guilds.map((guild) => { String(guild);}),
    };

    res.status(200).json({ ...user });
});

export default router;