import mongoose from "mongoose";

const Quote = mongoose.model('Quote', new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    dentist: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
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
    }
}, { versionKey: false }))

export default Quote;
