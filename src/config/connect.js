import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize("ncwa-backend", "postgres", "Raj@21799", {
  host: "localhost",
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
