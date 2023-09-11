import pkg from "pg";
import { DATABASE } from "../utils/constant";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ncwa-backend",
  password: "Raj@21799",
  port: 5432,
});

export default pool;
