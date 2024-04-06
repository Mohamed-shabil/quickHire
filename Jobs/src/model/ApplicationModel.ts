import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IApplication, IDApplication} from '../types/types';
import { Jobs } from './JobsModel';


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
    jobId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'Jobs',
            key:'_id'
        }
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
    applicantId: {
        type: DataTypes.TEXT, 
        allowNull: false,
        references: { 
          model: 'Users', 
          key: '_id', 
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

