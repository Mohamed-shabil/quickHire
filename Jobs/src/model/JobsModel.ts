import { Sequelize, DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IJobsType, IDJobsType} from '../types/types';


export const Jobs:ModelDefined< IDJobsType,IJobsType> = sequelize.define('Jobs',{
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
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    company:{
        type:DataTypes.STRING,
        allowNull:false
    },
    companyImage:{
        type:DataTypes.STRING
    },
    workPlace:{
        type:DataTypes.ENUM('Hybrid','Onsite','Remote'),
        allowNull:false,
    },
    employmentType:{
        type:DataTypes.ENUM('Part-time','Full-time','Internship','Freelance'),
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    experience:{
        type:DataTypes.STRING,
        allowNull:false
    },
    openings:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    jobDescription:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    requirements:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    skills:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
    },
    minSalary:{
        type:DataTypes.INTEGER
    },
    maxSalary:{
        type:DataTypes.INTEGER
    },
},{
    timestamps:true,
    paranoid:true
})


sequelize.sync({alter:true})