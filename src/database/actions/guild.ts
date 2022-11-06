import Database from "..";

export default class GuildActions {
    constructor(){
        return;
    }

    async createGuild(db: Database, guildid: string, ownerid: string){
        const guild = await db.guildSchema({
            _id: guildid,
            owner: ownerid,
            users: [],
            roles: [],
            channels: [],
            inviteStrings: []
        });
        await guild.save();
    }



    async create_channel(db: Database, guildid: string, channelid: string, name: string, type: "text") {
        const guild = await db.guildSchema.findOne({ _id: guildid});
        const channel = db.channelSchema({
            _id: channelid,
            name: name,
            type: type,
        });
        guild.channels.push(channelid);
        await channel.save();
        await guild.save();
    }

    async add_user_to_guild(db: Database, guildid: string, userid: string) {
        const guild = await db.guildSchema.findOne({ _id: guildid});
        guild.users.push(userid);
        await guild.save();
    }

    // async send_message(db: Database, guild)
}