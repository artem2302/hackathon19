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

import companyCtrl from "./controllers/company.controller";

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

app.get('/company', asyncHandler(companyCtrl.all));
app.post('/company', asyncHandler(companyCtrl.create));
app.get('/company/:id', asyncHandler(companyCtrl.load))
app.put('/company/:id', asyncHandler(companyCtrl.update));
app.delete('/company/:id', asyncHandler(companyCtrl.remove));


app.listen(config.port, () => console.log("Server listening on " + config.port));