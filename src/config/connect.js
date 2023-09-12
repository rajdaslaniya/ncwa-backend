import Sequelize from "sequelize";
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  database: "ohouahuz",
  username: "ohouahuz",
  password: "39XprzBd_8xm3fxh2uLcffuSLaimoTyu",
  host: "silly.db.elephantsql.com",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
  // timezone: "UTC",
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    // useUTC: true,
  },
});

export default sequelize;
