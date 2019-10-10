import mongoose from "mongoose";

const Company = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    ratingCount: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0
    },
    avgRating: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 5
    }
});


export default mongoose.model("Company", Company);