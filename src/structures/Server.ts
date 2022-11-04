const Rest = require("../rest/");
const Database = require("../database");
const config = require("../../config.json");

module.exports = class Server {

    rest: typeof Rest;
    db: typeof Database;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: any;

    constructor(){
        logger.info("Initialising Server", __filename, "Server");
        this.rest = new Rest();
        this.db = new Database();
        this.config = config;


        (async () => {

            await this.db.connect(
                this.config.database.main.url,
                this.config.database.main.username,
                this.config.database.main.password,
                this.config.database.main.protocol
            );
        })();

        this.startRest(
            this.config.rest.ip,
            this.config.rest.port
        );
    }



    startRest(ip: string, port: number){
        logger.info(logger.color(`Starting Rest api at &u${ip}:${port}&r`), __filename, "Server");
        return;
    }

};