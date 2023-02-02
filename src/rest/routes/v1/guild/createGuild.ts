import { default as Util, ApiError, Id,  } from "../../../../utils";
import Actions from "../../../../database/actions";
import express from "express";
import { addResource } from "../resource";
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


    const data = JSON.stringify({
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

    const rid = Id.ResourceID();
    addResource(rid, JSON.stringify(data), req, 2000, true, true);
    logger.debug(`Created new resource at /resource/${rid} for user ${guild.owner.id}`, __filename, "Rest /guild/create_guild");
    res.status(201).set({
        Location: `/resource/${rid}`
    }).json({
        Location: `/resource/${rid}`
    });
});

export default router;