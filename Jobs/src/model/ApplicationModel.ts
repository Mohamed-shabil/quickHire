import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IApplication, IDApplication} from '../types/types';


export const Applications:ModelDefined<IDApplication,IApplication> = sequelize.define('Application',{
    _id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    recruiter:{
        type:DataTypes.STRING,
        allowNull:false
    },
    job:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    resume:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    phone:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    applicantId: { // Use `applicantId` for clarity (foreign key)
        type: DataTypes.TEXT, // Match User model's ID type
        allowNull: false,
        references: { // Define foreign key relationship
          model: 'Users', // Reference the User model
          key: '_id', // Reference the primary key of the User model
        },
    },
    status:{
        type:DataTypes.ENUM('submitted','reviewing','shortlisted','accepted','rejected'),
        allowNull:false,
        defaultValue:'submitted'
    }
},{
    timestamps:true,
    paranoid:true
})

