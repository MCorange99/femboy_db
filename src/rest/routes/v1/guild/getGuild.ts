import { default as Util, ApiError} from "../../../../utils";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    if (!await Util.checkApiAuth(req, res)) return;

    const { id } = req.body;

    if (!id) {
        return ApiError.MissingProps(res, ["id"]);
    }

    const user = await Server.db.userSchema.findOne({
        api: {
            key: req.headers["authorization"]
        }
    });
    if (!user) {
        return ApiError.InternalError(res, "User passed auth check but user wasnt found");
    }

    const guild: GuildI = await Server.db.guildSchema.findOne({ _id: id });

    logger.debug(`Gave guild info to user ${user.username}<${user.email}> for guild ${guild.name}<${guild._id}>`, __filename, "Rest /user/getinfo");


    res.status(200).json({
        id: String(guild._id),
        owner: {
            id: String(guild.owner.id)
        },
        name: String(guild.name),
        iconUrl: String(guild.iconUrl),
        roles: guild.roles.map(g => String(g)),
        invite_strings: guild.inviteStrings.map(x => String(x)),
        nicknames: Object(guild.nicknames),
        users: guild.users.map(u => String(u))
    });
});

export default router;