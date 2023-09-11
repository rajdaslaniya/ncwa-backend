import sequelize from "../config/connect";
import { DataTypes } from "sequelize";

const UserRolesModel = sequelize.define(
  "user_roles",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updated_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  { sequelize, timestamps: false }
);

export default UserRolesModel;
