import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptoJS from "crypto-js";
import config from "config";

const { JWT, CRYPTO } = config.get("SECRET_KEYS");

// DB Models
import User from "../models/User/index.js";
import Admin from "../models/Admin/index.js";

import generateToken from "../middlewares/auth/generateToken.js";
import {
    userLoginValidatorRules,
    errorMiddleware,
} from "../middlewares/validations/index.js";

const router = express.Router();

/*
    API End Point : /api/login
    Method : POST
    Access Type : Public
    Validations:
       Email is not Empty
       Password is Not Empty
    Description: User Login


*/
router.post("/login", userLoginValidatorRules(), errorMiddleware, async (req, res) => {
    try {

        let userData = await Admin.findOne({ email: req.body.email });

        if (!userData) {
            userData = await User.findOne({ email: req.body.email });
            if (!userData)
                return res.status(404).json({ error: "Invalid Credentials" });
        }

        if (!userData.userverified)
            return res
                .status(400)
                .json({ error: "Please accept the invitation on email" });

        let validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!validPassword)
            return res.status(401).json({ error: "Invalid Credentials" });

        let token = generateToken({
            _id: userData._id,
            email: userData.email,
            role: userData.role,
        });
        return res.status(200).json({ role: userData.role, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Issue" });
    }
});


router.get("/auth", async (req, res) => {
    try {
        let token = req.headers["x-auth-token"];
        let bytes = cryptoJS.AES.decrypt(token, CRYPTO); // decrypting token
        let originalToken = bytes.toString(cryptoJS.enc.Utf8); // original token
        const payload = jwt.verify(originalToken, JWT); // decoding token & getting payload
        res.status(200).json(payload)
    } catch (error) {
        return res
            .status(401)
            .json({ error: "Access Denied. Invalid Token/Token Expired" });
    }
})
export default router;
