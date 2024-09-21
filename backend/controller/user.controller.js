import {
    User
} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

//[POST] /api/v1/user/register
export const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            password,
            role
        } = req.body;
        // console.log(req.body);
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }
        const file =req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const user = await User.findOne({
            email: email
        })
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email!",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url 
            }
        })
        return res.status(201).json({
            message: "Account created successfully!",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//[POST] /api/v1/user/login
export const login = async (req, res) => {
    try {
        const {
            email,
            password,
            role
        } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }

        let user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                message: "Password or Email incorrect!",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Password or Email incorrect!",
                success: false
            })
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role!",
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpsOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${user.fullName}`,
            user: user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//[GET] /api/v1/user/logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0
        }).json({
            message: "Logout successfully!",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//[POST] /api/v1/user/profile/update
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const skillsArray = skills ? skills.split(",") : undefined;
        const userID = req.id; 

        const user = await User.findById(userID);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            });
        }

        // Update user data
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URI
            user.profile.resumeOriginalName = file.originalname; // Save the original name
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully!",
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the profile.",
            success: false
        });
    }
};
