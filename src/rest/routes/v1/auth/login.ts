import crypto from "crypto";
import express from "express";
import { json } from "stream/consumers";
import Util, { ApiError, Id } from "../../../../utils";
import {addResource} from "../resource";
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

    const rid = Id.ResourceID();
    addResource(rid, JSON.stringify(user), req, 30, true, true); // 30 secs
    logger.debug(`Created new resource at /resource/${rid} for ${user.username}<${user._id}>`, __filename, "Rest /auth/login");
    res.status(201).set({
        Location: `/resource/${rid}`
    }).json({
        Location: `/resource/${rid}`
    });
});

export default router;