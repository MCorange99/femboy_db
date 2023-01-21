

interface PayloadI {
    id: string,
    username: string,
    discriminator: string,
    avatarUrl: string,
    verified: boolean
}

export default {
    name: "user_connect",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: async function (_ws: any, wsu: any, payload: PayloadI) {
        wsu.broadcast.emit("global-message-create", JSON.stringify(payload));
    }
};