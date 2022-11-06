interface GuildI {
    _id: string,
    owner: {
        id: string
    },
    roles: Map<string, {
        name: string,
        permissions: number,
        color: string
    }>,
    inviteStrings: string[],
    nicknames: Map<string, string>,
    users: string[],
    channels: string[f],

}

interface UserI {
    _id: string,
    username: string
    discriminator: string
    salt: string
    password_hash: string
    avatarUrl: string
    guilds: string[]
    api: {
        key: string
        //? Maybe make the key expire after 7 days for security
    },
    verified: false | true
}

interface ChannelI {
    _id: string,
    name: string,
    type: string,
    roles: string,
    messages: string,
}

interface RoleI {
    _id: string
    name: string
    permissions: number
    color: string
}

interface MessageI {
    _id: string
    content: string,
    author: UserI,
    createdAt: string,
    embed?:{
        title: string
        color: string
        url?: string
        author?: {
            name: string
            url?: string
            iconUrl?: string
        },
        description?: string
        thumbnail?: string
        image?: string
        timestamp?: string
        footer?: {
            content: string
            imageUrl?: string
        },
    }
}

