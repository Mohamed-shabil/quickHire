import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IUserType, IDUserType} from '../types/types';


export const User:ModelDefined< IDUserType,IUserType > = sequelize.define('User',{
    _id:{
        type:DataTypes.TEXT,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fullName:{
        type:DataTypes.STRING,
    },
    headLine:{
        type:DataTypes.STRING,
    },
    avatar:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
    },
},{
    timestamps:true,
    paranoid:true
})
