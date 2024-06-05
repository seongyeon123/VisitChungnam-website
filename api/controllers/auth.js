import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send('User has been created');
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    try {
        if(!user) {
            return next(createError(404, "User not found"));
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect) {
            return next(createError(400, "Password is incorrect"));
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        }).status(200)
        .json({details: {...otherDetails}, isAdmin, token});
    } catch (err) {
        next(err);
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        sameSite: 'strict',
    }).status(200)
    .json({message: "Logged out successfully"});
}