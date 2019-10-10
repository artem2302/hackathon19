//require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET,
    mongoHost: process.env.MONGO_HOST
}