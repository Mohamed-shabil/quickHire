import { Sequelize } from "sequelize";
// @ts-ignore
export const sequelize = new Sequelize(process.env.SEQUELISE_URL!, {
    dialect: process.env.SEQUELISE_DIALECT!,
});

sequelize
    .authenticate()
    .then((res) => {
        console.log("Sequeliser connected");
    })
    .catch((err) => {
        console.log(err);
    });
