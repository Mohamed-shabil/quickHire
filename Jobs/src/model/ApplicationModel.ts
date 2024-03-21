import { Sequelize, DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IApplication, IDApplication} from '../types/types';


export const Applications:ModelDefined< IDApplication,IApplication> = sequelize.define('Applications',{
    _id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    recruiterName:{
        type:DataTypes.STRING,
        allowNull:false
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
    applicant:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('submitted','reviewing','shortlisted','interviewing','accepted','rejected'),
        allowNull:false,
    }
},{
    timestamps:true,
    paranoid:true
})


sequelize.sync({alter:true})