import { default as Util, ApiError} from "../../../../utils";
import express from "express";
import Actions from "../../../../database/actions";
const actions = new Actions();
const router = express.Router();

router.post("/", async (req, res) => {
    if (!await Util.checkApiAuth(req, res)) return;

    const { name, type, guild_id } = req.body;

    if (!name || !type || !guild_id) {
        return ApiError.MissingProps(res, ["name", "type", "guild_id"]);
    }

    const user = await Server.db.userSchema.findOne({
        api: {
            key: req.headers["authorization"]
        }
    });

    if (!user) {
        return ApiError.InternalError(res, "User passed auth check but user wasnt found");
    }

    if (!["text"].includes(type)) {
        return ApiError.InvalidType(res, type, ["text"]);
    }

    const guild: GuildI = await Server.db.guildSchema.findOne({ _id: guild_id });
    const channel: ChannelI = await actions.guild.create_channel(Server.db, guild._id, name, type);

    logger.debug(`Created channel ${channel.name}<${channel._id}> for guild ${guild.name}<${guild._id}>`, __filename, "Rest /user/getinfo");


    res.status(200).json({
        id: String(channel._id),
        name: String(channel.name),
        type: String(channel.type),
        roles: channel.roles.map(r => String(r)),
        messages: channel.messages.map(m => String(m)),
    });
});

export default router;