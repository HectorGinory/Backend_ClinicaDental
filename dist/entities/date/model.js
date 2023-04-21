import mongoose from "mongoose";
const Quote = mongoose.model('Date', new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}));
//# sourceMappingURL=model.js.map