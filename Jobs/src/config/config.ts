import { Sequelize } from "sequelize";
// @ts-ignore
export const sequelize = new Sequelize(process.env.POSTGRES_URI!, {
    dialect: process.env.DIALECT!,
});

sequelize
    .authenticate()
    .then((res) => {
        console.log("Sequeliser connected");
    })
    .catch((err) => {
        console.log(err);
    });
