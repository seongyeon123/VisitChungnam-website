// controllers/user.js
import User from "../models/User.js";
import { createError } from "../utils/error.js";

// 사용자 등록
export const registerUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// 특정 사용자 가져오기
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// 모든 사용자 가져오기
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// 사용자 업데이트
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return next(createError(404, "User not found"));
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// 사용자 삭제
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getUserReviews = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const list = await Promise.all(user.reviews.map((review) => {
            return Travelreview.findById(review);
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};
