const mongoose = require("mongoose");

module.exports = class Database {
    constructor(){
        mongoose.connection.once("open", () => {
            logger.info("Connected to database", __filename, "Server");
        });
        return;
    }

    async connect(url: string, username: string, password: string, protocol: string){
        logger.info(logger.color(`Connecting to database at &u${url}&r`), __filename, "Server");

        await mongoose.connect(`${protocol}${username}:${password}@${url}`, {
            keepAlive: true,
            connectTimeoutMS: 0,
            socketTimeoutMS: 0,
            serverSelectionTimeoutMS: 0,
        });
        return;
    }
};