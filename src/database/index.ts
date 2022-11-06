/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import channelSchema from "./schema/channelSchema";
import guildSchema from "./schema/guildSchema";
import messageSchema from "./schema/messageSchema";
import roleSchema from "./schema/roleSchema";
import userShema from "./schema/userSchema";
export default class Database {
    userSchema: any;
    guildSchema: any;
    channelSchema: any;
    messageSchema: any;
    roleSchema: any;

    constructor(){
        this.channelSchema = channelSchema;
        this.messageSchema = messageSchema;
        this.roleSchema = roleSchema;
        this.userSchema = userShema;
        this.guildSchema = guildSchema;

        mongoose.connection.once("open", () => {
            logger.info("Connected to database", __filename, "Database");
        });
        return;
    }

    async connect(url: string, username: string, password: string, protocol: string){
        logger.info(logger.color(`Connecting to database at &u${url}&r`), __filename, "Database");

        await mongoose.connect(`${protocol}${username}:${password}@${url}`, {
            keepAlive: true,
            connectTimeoutMS: 0,
            socketTimeoutMS: 0,
            serverSelectionTimeoutMS: 0,
        });
        return;
    }
}