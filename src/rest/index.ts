import express from "express";
import cors from "cors";
import routes from "./routes";
import _Websocket from "../websocket";
export default class Rest {
    app: express;
    constructor() {
        this.app = new express();
        this.app.get("/", (_req, res) => {
            return res.status(200).json({
                status: "OK"
            });
        });

        this.middleware();
        this.app.use("/", routes);
        this.app.all("*", (_req, res, ) => {
            return res.status(404).json({
                code: 404,
                message: "RouteNotFound"
            });
        });

    }

    middleware(){
        this.app.use(express.json());
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST"]
        }));
    }

    listen(ip: string, port: number){
        const server = this.app.listen(port, async () => {
            logger.info(logger.color(`Rest api is listening on &uhttp://${ip}:${port}&r`), __filename, "Rest");
            await websocket.init(server);
        });
    }


}