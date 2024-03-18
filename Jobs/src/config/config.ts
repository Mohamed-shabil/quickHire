import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('jobs','postgres','admin1234', {
    host: 'localhost',
    dialect:  'postgres',
    logging: false
});

sequelize.authenticate().then((res)=>{
    console.log('Sequeliser connected')
}).catch((err)=>{
    console.log(err);
})

