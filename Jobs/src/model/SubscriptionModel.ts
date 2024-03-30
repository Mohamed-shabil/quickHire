import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';

export const Subscription: ModelDefined<any, any> = sequelize.define('Subscription', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    recruiterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: '_id'
        }
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
