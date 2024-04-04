import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';

export const Subscription: ModelDefined<any, any> = sequelize.define('Subscription', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    recruiterId: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: 'Users',
            key: '_id'
        }
    },
    subscriptionName:{
        type:DataTypes.STRING,
    },
    postLimit:{
        type:DataTypes.INTEGER
    },
    postCount:{
        type:DataTypes.INTEGER
    },
    subscriptionStartDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    subscriptionEndDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true
});