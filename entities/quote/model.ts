import mongoose, { now } from "mongoose";

const Quote = mongoose.model('Date', new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: String,
    },
    dentist: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    consultation: {
        type: String
    }
}))


