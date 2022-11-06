import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema<MessageI>({
    _id: String,
    content: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: String,
            required: true
        },
    },
    //* linux epoch time
    createdAt: {
        type: String,
        required: true
    },
    embed: {
        title: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        },
        author: {
            name: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            },
            iconUrl: {
                type: String,
                required: false
            },
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
                required: false
            },
            imageUrl: {
                type: String,
                required: false
            },
            required: false
        },
        required: false
    },
});

export default models.message || model<MessageI>("message", MessageSchema);