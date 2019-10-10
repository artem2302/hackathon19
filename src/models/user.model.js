const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    login: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    password: {
        type: mongoose.Schema.Types.String
    },
    address: {
        type: mongoose.Schema.Types.String
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company"
    },
    name: {
        first: {
            type: mongoose.Schema.Types.String,
            required: true,
            minlength: 3,
            maxlength: 20
        },
        last: {
            type: mongoose.Schema.Types.String,
            required: true,
            minlength: 3,
            maxlength: 20
        }
    },
    phoneNumber: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ["admin", "user", "company"],
        required: true
    }

});

User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) { return next() };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})
User.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch)
    })
}

module.exports = mongoose.model("User", User);