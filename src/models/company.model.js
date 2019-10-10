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
    avgRatingSpeed: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 5
    },
    avgRatingQuality: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 5
    },
    coverage: {
        type: [[mongoose.Schema.Types.Number]]
    },
    phone: {
        type: mongoose.Schema.Types.String
    }
});

Company.statics.findByLocation = function findByLocation(location) {
    //TO BE DONE, currently as is:
    return this.findOne();
};

Company.virtual('avgRatingOverall')
    .get(function () {
        return (avgRatingQuality + avgRatingSpeed) / 2.0;
    });


export default mongoose.model("Company", Company);