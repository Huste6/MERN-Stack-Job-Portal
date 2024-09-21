import {
    Job
} from "../models/job.model.js";
import {
    User
} from "../models/user.model.js";

//admin
//[POST] /api/v1/job/post
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyID
        } = req.body.data;
        const userID = req.id;
        if (!title || !description || !salary || !requirements || !location || !jobType || !experience || !position || !companyID) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            })
        }
        //check role user id is recruiter ? 
        const user = await User.findOne({
            _id: userID
        });
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            })
        } else {
            if (user.role === "student") {
                return res.status(400).json({
                    message: "You don't have permission",
                    success: false
                })
            }
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyID,
            created_by: userID
        })
        return res.status(201).json({
            message: "New Job created successfully!",
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
}

//student
//[GET] /api/v1/job/get?Key=...&Value=...
export const getAllJobs = async (req, res) => {
    try {
        const key = req.query.Key || 'title';
        const value = req.query.Value || '';
        const query = {
            [key]: {
                $regex: value,
                $options: "i"
            }
        }
        const jobs = await Job.find(query)
            .populate({
                path: "company",
            })
            .populate({
                path: "applications",
                populate: [{
                    path: "applicant",
                    select: "fullName"
                }]
            })
            .sort({
                createdAt: -1
            });
        if (!jobs) {
            return res.status(404).json({
                message: "Job not found!",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//student
//[GET] /api/v1/job/get/:id
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate(
            [{
                    path: 'applications',
                    select: "applicant"
                },
                {
                    path: 'company',
                    select: "name"
                }
            ]
        );
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found!",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//admin
//[GET] /api/v1/job/getAdminJob
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({
            created_by: adminId
        }).populate({
            path: 'company',
            select: 'name logo'
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Job not found!",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}