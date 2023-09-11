import pool from "../../../config/db";

const assessmentDetailQueries = {
  GetAssessmentDetail: async (_, args) => {
    try {
      const { assessment_id } = args;
      console.log("assessment_id---", assessment_id);
      // const client = await pool.connect();
      const values = [assessment_id];
      const queryto = `SELECT * FROM assessment_detail where assessment_id = $1 and status = 1`;
      console.log("queryto--", queryto);
      const result = await pool.query(queryto, values);
      console.log("CheckUserEmail--", result);
      return result.rows;
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },
};

export default assessmentDetailQueries;
