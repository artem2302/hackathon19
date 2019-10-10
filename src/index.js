import express from "express";
//import passport from "passport";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import config from "./config";
import models from "./models";
import passport from "./services/passport";

mongoose.connect(config.mongoHost);

const app = express();
const router = express.Router();
const User = mongoose.model("User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/login', function (req, res, next) {

    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.toJSON(), config.jwtSecret);

            return res.json({ user, token });
        });
    })
        (req, res);

});

app.post('/register', asyncHandler(async function (req, res, next) {
    const user = new User(req.body);
    await user.save();
    res.json(user)
}));



app.listen(3030, () => console.log("Server listening on 3030"));