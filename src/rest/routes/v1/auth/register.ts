import crypto from "crypto";
import express from "express";
import { default as Util, ApiError, Id } from "../../../../utils";
import validator from "validator";
import { addResource } from "../resource";
const router = express.Router();

router.post("/", async (req, res) => {
    const {
        username,
        password,
        email
    } = req.body;


    if (!username || !password || !email) return ApiError.MissingProps(res, ["username", "password", "email"]);

    let discrim = Util.newDiscrim();
    let discrimTries = 0;
    while (!Util.isUsernameAvailable(username, discrim)) {
        discrim = Util.newDiscrim();
        discrimTries++;

        if (discrimTries > 2000) {
            return ApiError.UsernameTaken(res);
        }
    }

    if (!validator.isEmail(email)) return ApiError.InvalidEmail(res);

    if (!await Util.isEmailAvailable(email)) return ApiError.EmailTaken(res);

    const salt = Util.newSalt();
    const hash = crypto.createHash("sha256").update(salt + password).digest("base64");
    const token = Util.newToken();
    const id = Id.UserID();


    await Server.db.userSchema({
        _id: id,
        username: username,
        discriminator: discrim,
        salt: salt,
        email: email,
        password_hash: hash,
        avatarUrl: "https://mcorangehq.xyz/", // TODO: make a default user pfp
        guilds: [],
        api: {
            key: token
        },
        verified: false

    }).save();

    let user = await Server.db.userSchema.findOne({ _id: id });
    logger.debug(`Registered user ${user.username}<${user.id}>`, __filename, "Rest /auth/register");
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
    addResource(rid, JSON.stringify(user), req, 5000, true, true); // 5 secs
    res.status(201).set({
        Location: `/resource/${rid}`
    }).json({
        Location: `/resource/${rid}`
    });
});

export default router;