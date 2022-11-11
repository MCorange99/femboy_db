import { Schema, model, models } from "mongoose";


const GuildSchema = new Schema<GuildI>({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    },
    owner: {
        id: {
            type: String,
            required: true
        }
    },
    roles: [String],

    nicknames: {
        type: Map,
        of: String
    },
    inviteStrings: [String],
    users: [String],

    channels: [String]

});

export default models.guild || model<GuildI>("guild", GuildSchema);