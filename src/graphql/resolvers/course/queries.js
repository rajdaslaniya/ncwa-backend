import CourseModel from "../../../models/course.model";

const courseQueries = {
  getCourse: async () => {
    try {
      // const client = await pool.connect();
      const data = await CourseModel.findAll({ where: { is_active: true } });
      return data;
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },
};

export default courseQueries;
