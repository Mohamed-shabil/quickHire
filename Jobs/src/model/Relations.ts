import {User} from './UsersModel';
import { Resume } from './ResumeModel';
import { Jobs } from './JobsModel'
import { Applications } from './ApplicationModel';
import { sequelize } from '../config/config';

User.hasMany(Resume,{
    foreignKey:'user',
    as:'resume'
})

Resume.belongsTo(User,{
    foreignKey:'user',
})

User.hasMany(Applications,{
    foreignKey:'application',
});

Applications.belongsTo(User, { 
    foreignKey: 'applicantId', 
    as: 'owner' 
});

Jobs.hasMany(Applications,{
    foreignKey:'jobId'
})

Applications.belongsTo(Jobs,{
    foreignKey:'jobId',
    as:'job'
})

sequelize.sync({alter:true}).then((res)=>{
    console.log('SEQUELIZE IS SYNC')
}).catch((err)=>{
    console.log('ERROR',err);
})