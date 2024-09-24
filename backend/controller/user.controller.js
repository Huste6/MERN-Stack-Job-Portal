import {
    User
} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {
    generateRandomNumber
} from "../helpers/generate.js";
import {
    forgotPassword
} from "../models/forgotPassword.model.js";
import {
    sendMail
} from "../helpers/sendMail.js";

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

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            });
        }
        const file = req.file;
        let profilePhoto = '';
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url;
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email!",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto
            }
        });
        return res.status(201).json({
            message: "Account created successfully!",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
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
        const {
            fullName,
            email,
            phoneNumber,
            bio,
            skills
        } = req.body;
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

//[POST] /api/v1/user/password/forgot
export const forgotPasswordPost = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        const userExist = await User.findOne({
            email
        });
        if (!userExist) {
            return res.status(401).json({
                message: 'User not found',
                success: false
            });
        }

        const otp = generateRandomNumber(8);
        const objectForgotPassword = {
            email,
            otp,
            expireAt: Date.now()
        };

        const forgot = new forgotPassword(objectForgotPassword);
        await forgot.save();

        const subject = "Mã OTP xác minh lấy lại mật khẩu: ";
        const html = `
            Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng 1 phút.
        `;

        sendMail(email, subject, html);

        return res.status(200).json({
            message: 'Send OTP successfully!',
            success: true,
            email
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        });
    }
};

//[POST] /api/v1/user/password/forgot/otp
export const forgotPasswordPostOtp = async (req, res) => {
    try {
        const {
            otp,
            email
        } = req.body;
        const checkExistOtp = await forgotPassword.findOne({
            email,
            otp
        })
        if (!checkExistOtp) {
            return res.status(401).json({
                message: 'OTP is not correct',
                success: false
            });
        }
        return res.status(200).json({
            message: 'OTP is correct',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//[POST] /api/v1/user/password/reset
export const resetPassword = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Something is missing!',
            success: false
        })
    }
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        return res.status(400).json({
            message: "User don't exist with this email!",
            success: false
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (hashedPassword === user.password) {
        return res.status(400).json({
            message: 'password already exists',
            success: false
        })
    }
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
        message: 'Reset password successfully!',
        success: true
    })
}

//[POST] /profile/update/img
export const updateImageProfile = async (req, res) => {
    const file = req.file;
    const userId = req.id;
    const user = await User.findOne({_id: userId});
    if(!file){
        return res.status(401).json({
            message: 'Image not found!',
            success: false
        })
    }
    if(!user){
        return res.status(401).json({
            message: 'User not found!',
            success: false
        })
    }
    let cloudResponse;
    if (file) {
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    if (cloudResponse) {
        user.profile.profilePhoto = cloudResponse.secure_url;
    }
    await user.save();
    return res.status(200).json({
        message: 'Update image successfully!',
        success: true,
        user
    })
}