import GroupModel from "../../../models/mfa_groups.model";

const groupQueries = {
  getGroup: async () => {
    try {
      const data = await GroupModel.findAll({ where: { is_active: true } });
      return data;
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },
};

export default groupQueries;
