import mongoose from "mongoose";

const Quote = mongoose.model('Quote', new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dentist: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    dateOfQuote: {
        type: Date,
        required:true
    },
    endOfQuote: {
        type: Date,
        required:true
    },
    activeQuote: {
        type: Boolean,
        default: true
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { versionKey: false }))

export default Quote;
