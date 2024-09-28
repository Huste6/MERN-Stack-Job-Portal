import {
    Job
} from "../models/job.model.js";
import {
    LaterJob
} from "../models/laterJob.model.js";

// [POST] /api/v1/laterJob/post
export const postLaterJob = async (req, res) => {
    try {
        const userId = req.id;
        const {
            jobId,
            companyId
        } = req.body;

        const existJob = await Job.findOne({
            _id: jobId,
            company: companyId
        });
        if (!existJob) {
            return res.status(404).json({
                message: 'Job not found in this company!',
                success: false
            });
        }

        const existLaterJob = await LaterJob.findOne({
            job: jobId,
            company: companyId,
            SaveForLater: userId
        });

        if (existLaterJob) {
            return res.status(409).json({
                message: 'This job is already saved for later!',
                success: false,
                exist: true
            });
        }

        const newLaterJob = await LaterJob.create({
            job: jobId,
            company: companyId,
            SaveForLater: userId
        });

        return res.status(201).json({
            message: 'Later Job created successfully!',
            success: true,
            newLaterJob
        });
    } catch (error) {
        console.error('Error saving job for later:', error);
        return res.status(500).json({
            message: 'An error occurred while saving the job for later.',
            success: false
        });
    }
};

// [GET] /api/v1/laterJob/get
export const getLaterJob = async (req, res) => {
    try {
        const userId = req.id;
        const getAllLaterJob = await LaterJob.find({
            SaveForLater: userId
        }).populate('job company').sort({
            createdAt: -1
        });
        if (!getAllLaterJob) {
            return res.status(401).json({
                message: 'Your Account not have any Later Job',
                success: false
            })
        }
        return res.status(200).json({
            message: 'Get all later job successfully!',
            success: true,
            getAllLaterJob
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while get all the later job.',
            success: false
        });
    }
}

//[DELETE] /api/v1/laterJob/delete
export const deleteLaterJob = async (req, res) => {
    try {
        const userId = req.id;
        const {
            jobId,
            companyId
        } = req.body;

        const existJob = await Job.findOne({
            _id: jobId,
            company: companyId
        });
        if (!existJob) {
            return res.status(404).json({
                message: 'Job not found in this company!',
                success: false
            });
        }

        const existLaterJob = await LaterJob.findOne({
            job: jobId,
            company: companyId,
            SaveForLater: userId
        });

        if (!existLaterJob) {
            return res.status(404).json({
                message: 'Saved job not found in this company!',
                success: false
            });
        }

        await existLaterJob.deleteOne();

        return res.status(200).json({
            message: 'Deleted successfully!',
            success: true
        });
    } catch (error) {
        console.error('Error deleting saved job:', error);
        return res.status(500).json({
            message: 'An error occurred while deleting the saved job.',
            success: false
        });
    }
};