import { DataTypes, ModelDefined } from "sequelize";
import { sequelize } from "../config/config";

export const Subscription: ModelDefined<any, any> = sequelize.define(
    "Subscription",
    {
        _id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },

        planName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        billingPeriod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);
