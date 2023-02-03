import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<UserI>({
    _id: String,
    username: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true
    },
    discriminator: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    password_hash: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true
    },
    guilds: [String],
    banned: {
        isBanned: {
            type: Boolean,
            required: true,
            default: false
        },
        bannedOn: {
            type: String,
            required: false,
        },
        bannedUntil: {
            type: String,
            required: false
        }
    },
    api: {
        key: {
            type: String,
            required: true,
            unique: true
        },
        //? Maybe make the key expire after 7 days for security
    },
    verified: {
        type: Boolean,
        default: false
    },

});

export default models.user || model<UserI>("user", UserSchema);