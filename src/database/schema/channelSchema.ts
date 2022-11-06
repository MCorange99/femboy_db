import { Schema, model, models } from "mongoose";

const ChannelSchema = new Schema<ChannelI>({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    //? other channel types soon
    type: {
        type: String,
        required: true
    },
    roles: [String],
    messages: [String]

});

export default models.channel || model<ChannelI>("channel", ChannelSchema);