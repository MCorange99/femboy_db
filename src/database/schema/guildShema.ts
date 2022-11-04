
const GuildSchema = new Schema({
    _id: String,
    owner: {
        id: {
            type: String,
            required: true
        },
        required: true
    },
    roles: {
        type: Map,
        of: {
            name: {
                type: String,
                required: true
            },
            permissions: {
                type: Number,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            color: {
                type: String,
                required: true
            }
        },
        required: true
    },

    users: {
        type: Map,
        of: {
            roles: [
                {
                    id: {
                        type: String,
                        required: true
                    },
                    required: false
                }
            ]
        }
    },

    channels: {
        type: Map,
        of: {
            id: String,
            name: String,
            type: "text", //? other channel types soon
            messages: {
                type: Map,
                of: {
                    id: String,
                    content: String,
                    embed: {
                        title: {
                            type: String,
                            required: true
                        },
                        color: {
                            type: String,
                            required: true
                        },
                        url: {
                            type: String,
                            required: false
                        },
                        author: {
                            name: {
                                type: String,
                                required: true
                            },
                            url: {
                                type: String,
                                required: false
                            },
                            iconUrl: {
                                type: String,
                                required: false
                            },
                            required: true
                        },
                        description: {
                            type: String,
                            required: false
                        },
                        thumbnail: {
                            type: String,
                            required: false
                        },
                        image: {
                            type: String,
                            required: false
                        },
                        timestamp: {
                            type: String,
                            required: false
                        },
                        footer: {
                            content: {
                                type: String,
                                required: true
                            },
                            imageUrl: {
                                type: String,
                                required: false
                            },
                            required: false
                        },
                        required: false
                    },
                }
            },

        }
    }
});

exports.guildSchema = models.guild || model("guild", GuildSchema);