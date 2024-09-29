import {
    Company
} from "../models/company.model.js";
import {
    Job
} from "../models/job.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

//[POST] /api/v1/company/register
export const registerCompany = async (req, res) => {
    try {
        const {
            companyName,
            logo
        } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Require",
                success: false
            })
        }

        let company = await Company.findOne({
            name: companyName
        });

        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            logo: logo,
            userId: req.id
        })
        return res.status(201).json({
            message: "Company register successfully",
            success: true,
            company
        })
    } catch (error) {
        console.log(error);
    }
}

//[GET] /api/v1/company/get
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({
            userId: userId
        })
        if (!companies) {
            return res.status(404).json({
                message: "companies not found!",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            companies
        })
    } catch (error) {
        console.log(error);
    }
}

//[GET] /api/v1/company/get/:id
export const getCompanyById = async (req, res) => {
    try {
        const companyID = req.params.id;
        const company = await Company.findById(companyID);
        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//[PATCH] /api/v1/company/update/:id
export const updateCompany = async (req, res) => {
    try {
        const {
            name,
            description,
            website,
            location
        } = req.body;
        // console.log(name,description,website,location)
        const file = req.file;
        // cloudinary
        let cloudResponse;
        let logo;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url
        }
        const companyBeforeUpdate = await Company.findOne({
            _id: req.params.id
        });

        const updateData = {
            name: name ? name : companyBeforeUpdate.name,
            description: description ? description : companyBeforeUpdate.description,
            website: website ? website : companyBeforeUpdate.website,
            location: location ? location : companyBeforeUpdate.location,
            logo: logo ? logo : companyBeforeUpdate.logo,
        };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        });

        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company infomation updated",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//[DELETE] /api/v1/company/deleteCompany
export const deleteCompany = async (req, res) => {
    try {
        const {
            companyId
        } = req.body;

        const existCompany = await Company.findOne({
            _id: companyId
        })

        if (!existCompany) {
            return res.status(201).json({
                message: 'Not found company!',
                success: false
            })
        }
        //delete job
        await Job.deleteMany({
            company: companyId
        });

        //delete company
        await existCompany.deleteOne();
        return res.status(200).json({
            message: 'Delete Company successfully!',
            success: true
        })
    } catch (error) {
        console.error(error);
    }
}