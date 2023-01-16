import _Websocket from ".";

export default class Payload_v1 {
    ws: _Websocket;
    constructor (websocket) {
        this.ws = websocket;
    }

    sendWelcome(wsu) {
        const payload = JSON.stringify({
            op: 0,
            message: "Welcome user, please verify yourself"
        });

        return wsu.send(payload);
    }

    sendHello(wsu) {

        const data = JSON.stringify({
            op: 1,
            heartbeat: {
                interval: this.ws.hbInterval
            }
        });

        return wsu.send(data);
    }

    sendHeartBeatReceive(wsu) {
        const data = JSON.stringify({
            op: 4,
            message: "Heartbeat was received successfully!"
        });

        return wsu.send(data);
    }

    sendEvent(name, data, id) {
        data = JSON.stringify({
            op: 5,
            name, data
        });

        if (id) {
            const client = this.ws.users.get(id);

            if (client) {
                return client.send(data);
            }
        }

        if (!this.ws.wss.server) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.ws.wss.server.clients.forEach((client: any) => {
            if (client.isVerified === true) {
                client.send(data);
            }
        });
    }

}