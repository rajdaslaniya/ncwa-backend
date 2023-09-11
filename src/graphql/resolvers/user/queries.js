import UsersModel from "../../../models/users.modal";

const userQueries = {
  GetAllUser: async () => {
    try {
      const data = await UsersModel.findAll({
        where: { is_active: true },
      });
      return {
        message: "User details get successfully",
        success: true,
        status: 200,
        data,
      };
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },
};

export default userQueries;
