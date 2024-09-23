import express from "express";
import {
    forgotPasswordPost,
    forgotPasswordPostOtp,
    login,
    logout,
    register,
    resetPassword,
    updateImageProfile,
    updateProfile
} from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
    singleUpload
} from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.get("/logout", logout);
router.route('/password/forgot').post(forgotPasswordPost);
router.route('/password/forgot/otp').post(forgotPasswordPostOtp);
router.route('/password/reset').post(resetPassword);
router.route('/profile/update/img').post(isAuthenticated, singleUpload, updateImageProfile);

export default router;