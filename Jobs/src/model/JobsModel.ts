import { Sequelize, DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../config/config";
import { IJobsType, IDJobsType } from "../types/types";

export const Jobs: ModelDefined<IDJobsType, IJobsType> = sequelize.define(
    "Job",
    {
        _id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        recruiterName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        recruiterId: {
            type: DataTypes.TEXT,
            references: {
                model: "Users",
                key: "_id",
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyImage: {
            type: DataTypes.STRING,
        },
        workPlace: {
            type: DataTypes.ENUM("hybrid", "onsite", "remote"),
            allowNull: false,
        },
        employmentType: {
            type: DataTypes.ENUM(
                "part-time",
                "full-time",
                "internship",
                "freelance"
            ),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        openings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jobDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        minSalary: {
            type: DataTypes.INTEGER,
        },
        maxSalary: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);
