import { Jobs } from "../model/JobsModel";
import { User } from "../model/UsersModel";
import express, { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
    isRecruiter,
    requireAuth,
    NotAutherizedError,
    validateRequest,
    BadRequestError,
    ForbiddenError,
} from "@quickhire/common";
import { uploadCompanyImage } from "../middleware/upload";
import { body } from "express-validator";

const router = express.Router();
router.post(
    "/api/jobs/create-job",
    requireAuth,
    uploadCompanyImage,
    [
        body("title").notEmpty().withMessage("Title can't be empty"),
        body("company").notEmpty().withMessage("Company Name can't be Empty"),
        body("workplace").notEmpty().withMessage("Work Place can't be empty"),
        body("employmentType")
            .notEmpty()
            .withMessage("Employment Type Can't be empty"),
        body("jobDescription")
            .notEmpty()
            .withMessage("job description can't be empty"),
        body("experience").notEmpty().withMessage("experience can't be empty"),
        body("location").notEmpty().withMessage("location can't be empty"),
        body("openings").notEmpty().withMessage("openings can't be empty"),
        body("skills").notEmpty().withMessage("skills can't empty"),
        body("minSalary")
            .notEmpty()
            .withMessage("Minimum Salary Can't be empty"),
        body("maxSalary")
            .notEmpty()
            .withMessage("Maximum Salary Can't be empty"),
        validateRequest,
    ],
    catchAsync(async (req: Request, res: Response) => {
        const {
            title,
            company,
            workplace,
            employmentType,
            jobDescription,
            requirements,
            skills,
            minSalary,
            maxSalary,
            experience,
            location,
            openings,
        } = req.body;

        const currentUser = req.currentUser;

        if (!currentUser) {
            throw new NotAutherizedError();
        }

        if (currentUser.role == "recruiter") {
            console.log(true);
        }

        if (currentUser.role != ("recruiter" || "admin")) {
            console.log("why this could happen", currentUser?.role.toString());
            throw new ForbiddenError();
        }

        const file = req.file as Express.MulterS3.File | undefined;

        const recruiter = await User.findOne({
            where: { _id: currentUser._id },
        });

        if (!recruiter) {
            throw new NotAutherizedError();
        }

        const newJob = await Jobs.create({
            recruiterId: currentUser._id,
            recruiterName: currentUser.name.toLowerCase(),
            title: title.toLowerCase(),
            company: company.toLowerCase(),
            workPlace: workplace.toLowerCase(),
            employmentType: employmentType.toLowerCase(),
            requirements: requirements.toLowerCase(),
            jobDescription: jobDescription.toLowerCase(),
            skills,
            minSalary,
            maxSalary,
            companyImage: file?.location,
            experience: experience.toLowerCase(),
            location: location.toLowerCase(),
            openings,
        });

        await newJob.save();

        res.status(201).json({
            status: "success",
            job: newJob,
        });
    })
);

export { router as createJobRoute };
