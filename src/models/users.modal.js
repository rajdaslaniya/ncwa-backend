import sequelize from "../config/connect";
import { DataTypes } from "sequelize";
import GroupModel from "./mfa_groups.model";
import UserRolesModel from "./user_roles.modal";

const UsersModel = sequelize.define(
  "users_data",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    group_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "mfa_groups",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: true,
    },
    role_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "user_roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: true,
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_council_member: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

UsersModel.belongsTo(GroupModel, { foreignKey: "group_id" });
UsersModel.belongsTo(UserRolesModel, { foreignKey: "role_id" });

export default UsersModel;
