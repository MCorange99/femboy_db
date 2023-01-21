export default {
    op: 2,
    action: async (ws, wsu, payload) => {

        if (wsu.isVerified) {
            return wsu.close(3003, "Tried to verify again after being verified.");
        }

        if (!payload.token) {
            return wsu.close(3002, "Token was not provided");
        }

        const user = await Server.db.userSchema.findOne({token: payload.token});

        if (!user) {
            return wsu.close(3004, "An invalid token was provided");
        }

        if (ws.users.get(user.id)) {
            return wsu.close(3005, "Only one session allowed at a time");
        } else {

            logger.info("The user connection has been verified on ", __filename, "verify.action()");

            ws.users.set(user.id, wsu);
            // await User.updateStatus(user.id, "online");
        }

        ws.payloads.sendHello(wsu);
        wsu.isVerified = true;
        wsu.user = user;
        ws.payloads.sendEvent("user_ready", wsu.user);

        // ------------------------------Heartbeat Start--------------------------
        wsu.isAlive = false;
        wsu.heartbeat = () => {
            clearTimeout(wsu.heartbeat.timeout);
            wsu.heartbeat.destroy = () => {
                clearTimeout(wsu.heartbeat.timeout);
            };
            wsu.heartbeat.timeout = setTimeout(() => {

                if (wsu.isAlive === false) {
                    wsu.close(3006, "Heartbeat failure");
                }
            }, ws.hbInterval + 3000);
            wsu.isAlive = false;
        };

        wsu.heartbeat();
        // ------------------------------Heartbeat End----------------------------
        wsu.once("close", () => {
            logger.info(`User: ${user.id} has closed their websocket connection`);

            ws.users.delete(wsu.user.id);
            // User.updateStatus(wsu.user.id, "offline");
            wsu.heartbeat.destroy();
            wsu.heartbeat = undefined;
            wsu.isAlive = undefined;
            wsu.user = undefined;
            wsu.isVerified = undefined;
        });
        return wsu;
    },
};