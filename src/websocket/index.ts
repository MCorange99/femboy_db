import WebSocket, { WebSocketServer } from "ws";
import v1 from "./v1";
import { IncomingMessage } from "http";

export default class _Websocket {
    server: WebSocketServer | null;
    v1: v1;

    constructor() {
        this.v1 = new v1(this);
        this.server = null;

    }

    async init(server) {

        this.server = new WebSocketServer({ server });

        this.server.on("connection", (ws: WebSocket, req: IncomingMessage) => {

            if (req.url === "/v1") return this.v1.run(ws, req);
            return ws.close(3001, "The version was invalid or not provided");
        });
    }


}