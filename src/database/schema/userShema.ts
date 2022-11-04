const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        unique: false
    },
    disriminator: {
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
    gravatar: {
        email: {
            type: String,
            required: false
        }
    }
});

exports.userSchema = models.user || model("user", UserSchema);