import mongoose from "mongoose";

const Quote = mongoose.model('Quote', new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        unique: true
    },
    dentist: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    consultation: {
        type: String,
        default: "Revisión"
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false }))

export default Quote;
