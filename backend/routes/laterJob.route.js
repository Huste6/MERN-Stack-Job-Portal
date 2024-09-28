import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleteLaterJob, getLaterJob, postLaterJob } from "../controller/laterJob.controller.js";

const router = express.Router();

router.route('/post').post(isAuthenticated,postLaterJob);
router.route('/get').get(isAuthenticated,getLaterJob);
router.route('/delete').delete(isAuthenticated,deleteLaterJob);

export default router;