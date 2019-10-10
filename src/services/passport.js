const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
import config from '../config';
import bcrypt from "bcrypt";

const User = mongoose.model("User");

const LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
},
    function (login, password, cb) {
        return User.findOne({ login })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'User not found' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return cb(null, false, { message: 'Invalid password' });

                }
                return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
},
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

export default passport;