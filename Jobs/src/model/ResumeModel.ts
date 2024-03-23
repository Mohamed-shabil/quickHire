import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/config';
import { IResume, IDResume} from '../types/types';
import { User } from './UsersModel';

export const Resume:ModelDefined< IDResume, IResume> = sequelize.define('Resume',{
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fileName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: User,
            key: '_id'
        }
    }
},{
    timestamps:true,
    paranoid:true,
    underscored: true,
})

sequelize.sync({alter:true})


