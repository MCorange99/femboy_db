import Database from "..";
import {default as Util, Id} from "../../utils";

export default class UserActions {
    constructor(){
        return;
    }

    async createUser(db: Database, userid: string, username: string, discrim: string, salt: string, password_hash: string, avatarUrl: string, apiKey: string, verified = false){
        const UserData: UserI = {
            _id: userid,
            username: username,
            discriminator: discrim,
            salt: salt,
            password_hash: password_hash,
            avatarUrl: avatarUrl,
            guilds: [],
            api: {
                key: apiKey
            },
            verified: verified
        };

        const guild = await db.userSchema(UserData);
        await guild.save();
    }

    async sendTextMessage(db: Database, channel: ChannelI, user: UserI, content: string){
        const date = Date.now();
        const messageId = Id.MessageID();
        const message = await db.messageSchema({
            _id: messageId,
            author: {
                id: user._id
            },
            content: content,
            createdAt: date.toString()
        });
        //? i know this is inefficient but first get everything working then make it fast
        const ch = await db.channelSchema.findOne({_id: channel._id});
        ch.messages.push(messageId);
        await message.save();
        await ch.save();
    }
}