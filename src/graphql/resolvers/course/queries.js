import pool from "../../../config/db";

const courseQueries = {
  GetCourse: async () => {
    try {
      // const client = await pool.connect();
      const result = await pool.query("SELECT * FROM course where status = 1");
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },
};

export default courseQueries;
