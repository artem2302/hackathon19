import mongoose from "mongoose";

const Application = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 10,
        maxlength: 300
    },
    photo: {
        type: mongoose.Schema.Types.String,
        data: Buffer
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 1,
        max: 5
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


export default mongoose.model("Application", Application);