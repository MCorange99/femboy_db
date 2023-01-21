import { IncomingMessage } from "http";
// import WebSocket, { WebSocketServer } from "ws";
import _Websocket from "..";
import fs from "fs";
import Payload_v1 from "./payloads";


export default class V1 {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actions: Map<number, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    users: Map<any, any>;
    hbInterval: number;
    wss: _Websocket;
    payloads: Payload_v1;
    constructor(wss: _Websocket) {
        this.wss = wss;
        this.users = new Map();
        this.actions = new Map();

        this.hbInterval = 1000 * 10;
        this.payloads = new Payload_v1(this);
        this.set_actions();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async run (ws: any, req: IncomingMessage) {
        const client_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        logger.info(`Client connected on ${client_ip}`, __filename, "v1.run");
        this.payloads.sendWelcome(ws);
        // ws.isVerified = false;
        ws.on("message", async (payload) => {
            try {

                const parse = JSON.parse(payload as unknown as string);
                const { op } = parse;

                if (!ws.isVerified && op !== 2) {
                    logger.error("User is not verified and isnt trying to", __filename, "is-verified");
                    return;
                }
                if (op && this.actions.get(op)) {
                    ws = await this.actions.get(op).action(this, ws, parse);
                }

            } catch {return;}
        });

    }

    set_actions() {
        const dir = fs.readdirSync(__dirname + "/actions");

        for (const name of dir) {
            if (!name.endsWith(".js")) continue;

            const action = require(`./actions/${name}`).default;

            if (typeof action == "object" ) {
                if (action.op) {
                    if (this.actions.get(action.op)) return logger.warn("Actions opcode already exists (" + action.op +  ")", __filename, "ws.v1.set_actions");
                }
                this.actions.set(action.op, action);
            }
        }

    }
}