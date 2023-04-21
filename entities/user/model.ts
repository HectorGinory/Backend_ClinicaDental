import mongoose from "mongoose";

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        unique: true
    },
    number: String,
    dni: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    rol: {
        type: String,
        default: 'Cliente'
    }
}))

export default User