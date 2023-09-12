const dotenv = require("dotenv");

export const SALT_ROUNDS = 10;

dotenv.config();

export const DATABASE = {
  USER_NAME: process.env.DB_USER,
  HOST: process.env.DB_HOST,
  DATABASE: process.env.DB_NAME,
  PASSWORD: process.env.DB_PASS,
};
