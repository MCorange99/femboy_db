import { default as Util, ApiError,  } from "../../../../utils";
import Actions from "../../../../database/actions";
import express from "express";
const router = express.Router();
const actions = new Actions();

router.post("/", async (req, res) => {
    if (!await Util.checkApiAuth(req, res)) return;

    const {
        name
    } = req.body;

    if (!name) {
        return ApiError.MissingProps(res, ["name"]);
    }

    const user = await Server.db.userSchema.findOne({
        api: {
            key: req.headers["authorization"]
        }
    });
    if (!user) {
        return ApiError.InternalError(res, "User passed auth check but user wasnt found");
    }

    const guild: GuildI = await actions.guild.createGuild(Server.db, user, name);

    logger.debug(`Created server ${guild.name}<${guild._id}> by ${user.username}<${user._id}>`, __filename, "Rest /guild/create_guild");


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