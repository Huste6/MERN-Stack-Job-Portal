import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleteJob, EditJob, getAdminJobs, getAllJobs, getJobById, getJobByIdAdmin, postJob } from "../controller/job.controller.js";
const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getAdminJob").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getAdmin/:id").get(isAuthenticated,getJobByIdAdmin);
router.route("/updateJob/:id").patch(isAuthenticated,EditJob);
router.route("/deleteJob").delete(isAuthenticated,deleteJob);

export default router