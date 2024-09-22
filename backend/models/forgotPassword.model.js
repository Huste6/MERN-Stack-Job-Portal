import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String
        },
        expireAt: {
            type: Date,
            expires: 1000
        }
    },
    {
        timestamps: true
    }
);

export const forgotPassword = mongoose.model("forgotPassword", forgotPasswordSchema,"forgotPassword");