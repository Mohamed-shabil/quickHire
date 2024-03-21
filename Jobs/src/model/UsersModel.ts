import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IUserType, IDUserType} from '../types/types';


export const User:ModelDefined< IDUserType,IUserType > = sequelize.define('Users',{
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
        allowNull:false
    },
    headLine:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
    },
    resumes:{
        type:DataTypes.ARRAY(DataTypes.STRING),
    }
},{
    timestamps:true,
    paranoid:true
})


sequelize.sync({alter:true})