import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IJobsType, IDJobsType, IUserType, IDUserType} from '../types/types';


export const Jobs:ModelDefined< IUserType,IDUserType > = sequelize.define('Users',{
    _id:{
        type:DataTypes.TEXT,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    headLine:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{
    timestamps:true,
    paranoid:true
})


sequelize.sync({alter:true})