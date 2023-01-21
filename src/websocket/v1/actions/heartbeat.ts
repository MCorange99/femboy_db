export default {
    op: 3,
    action: (ws, wsu) => {
        if (wsu.isAlive === true) {
            return wsu.close(3008, "Invalid heartbeat");
        }

        wsu.isAlive = true;
        wsu.heartbeat();
        ws.payloads.sendHeartBeatReceive(wsu);
        return wsu;
    }
};