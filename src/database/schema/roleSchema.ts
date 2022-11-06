import { Schema, model, models } from "mongoose";


const RoleSchema = new Schema<RoleI>({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }

});

export default models.role || model<RoleI>("role", RoleSchema);