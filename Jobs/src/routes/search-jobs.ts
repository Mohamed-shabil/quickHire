import express, { Request, Response } from "express";
import { requireAuth } from "@quickhire/common";
import catchAsync from "../utils/catchAsync";
import { Op } from "sequelize";
import { Jobs } from "../model/JobsModel";
const router = express.Router();

router.get(
    "/api/jobs/search-job",
    requireAuth,
    catchAsync(async (req: Request, res: Response) => {
        const { experience, location, title } = req.query;
        const filter: any = [];

        if (location) {
            filter.push({ location: { [Op.like]: `%${location}%` } });
        }

        if (experience) {
            filter.push({ experience: experience });
        }

        if (title) {
            filter.push({
                [Op.or]: [
                    { title: { [Op.like]: `%${title}%` } },
                    { company: { [Op.like]: `%${title}%` } },
                    { jobDescription: { [Op.like]: `%${title}%` } },
                    { requirements: { [Op.like]: `%${title}%` } },
                ],
            });
        }
        const jobs = await Jobs.findAll({
            where: {
                [Op.and]: filter,
            },
        });

        console.log("Search Result : ===", jobs);
        res.status(200).json({
            status: "success",
            jobs,
        });
    })
);

export { router as searchRouter };
