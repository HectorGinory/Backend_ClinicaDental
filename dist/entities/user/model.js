import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 100,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
const Users = mongoose.model('Users', UserSchema);
export default Users;
//# sourceMappingURL=model.js.map