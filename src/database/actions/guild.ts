import Database from "..";
import {default as _Util, Id} from "../../utils";
export default class GuildActions {
    constructor(){
        return;
    }

    async createGuild(db: Database, owner: UserI, server_name: string): Promise<GuildI> {
        const guild = await db.guildSchema({
            _id: Id.GuildID(),
            owner: {
                id: owner._id
            },
            users: [owner._id],
            name: server_name,
            iconUrl: "https://mcorangehq.xyz/",
            roles: [],
            channels: [],
            inviteStrings: []
        });
        return await guild.save();
    }



    async create_channel(db: Database, guildid: string, name: string, type: "text"): Promise<ChannelI> {
        const guild = await db.guildSchema.findOne({ _id: guildid});
        const channel = db.channelSchema({
            _id: Id.ChannelID(),
            name: name,
            type: type,
        });
        guild.channels.push(channel._id);
        await channel.save();
        await guild.save();

        return await db.channelSchema.findOne({ _id: channel._id});
    }

    async add_user_to_guild(db: Database, guildid: string, userid: string) {
        const guild = await db.guildSchema.findOne({ _id: guildid});
        guild.users.push(userid);
        await guild.save();
    }

    // async send_message(db: Database, guild)
}