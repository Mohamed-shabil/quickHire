import { Sequelize } from "sequelize";
import { User } from '../model/UsersModel'
import { Resume } from '../model/ResumeModel'
export const sequelize = new Sequelize(
    process.env.SEQUELISE_DB!,
    process.env.SEQUELISE_USERNAME!,
    process.env.SEQUELISE_PASSWORD!,
    {
    host: process.env.SEQUELISE_HOST!,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then((res)=>{
        console.log('Sequeliser connected');
    }).catch((err)=>{
        console.log(err);
    })


