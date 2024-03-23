import {User} from './UsersModel';
import { Resume } from './ResumeModel';

User.hasMany(Resume,{
    foreignKey:'user',
    as:'resume'
})

Resume.belongsTo(User,{
    foreignKey:'user',
})