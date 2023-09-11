import moment from "moment/moment";
import pool from "../../../config/db";
import UsersModel from "../../../models/users.modal";
import {
  createToken,
  generateSixDigitNumber,
  passwordCompare,
  passwordEncrypt,
  sendEmailVerification,
} from "../../../utils/common";

const userMutations = {
  createUser: async (_, args) => {
    const {
      email,
      password,
      first_name,
      middle_name,
      last_name,
      entry_reason,
      work_address_line1,
      work_address_line2,
      work_address_city,
      work_address_state,
      work_address_zipCode,
      phone_number,
      group_id,
      is_member,
      organization,
      job_title,
      is_news_subscribed,
      is_public,
      instructor_certificate_status,
      instructor_accredited_date,
      instructor_anniversary_date,
      dietary_restriction,
      dietary_restriction_other,
      adult_certification_date,
      adult_anniversary_date,
      youth_certification_date,
      youth_anniversary_date,
      teen_certification_date,
      teen_anniversary_date,
      sponsor_status,
      primary_organization_name,
      primary_organization_id,
      secondary_organization_name,
      secondary_organization_id,
      tertiary_organization_name,
      tertiary_organization_id,
    } = args;

    const query =
      "INSERT INTO user_data(email, password, first_name, middle_name, last_name, entry_reason,work_address_line1, work_address_line2, work_address_city, work_address_state,work_address_zipCode, phone_number, group_id, is_member, organization, job_title,is_news_subscribed, is_public, instructor_certificate_status, instructor_accredited_date,instructor_anniversary_date, dietary_restriction, dietary_restriction_other,adult_certification_date, adult_anniversary_date, youth_certification_date,youth_anniversary_date, teen_certification_date, teen_anniversary_date, sponsor_status,primary_organization_name, primary_organization_id, secondary_organization_name,secondary_organization_id, tertiary_organization_name, tertiary_organization_id, creation, modified_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36, NOW(), NOW()) RETURNING *";
    console.log("query---", query);
    const values = [
      email,
      password,
      first_name,
      middle_name,
      last_name,
      entry_reason,
      work_address_line1,
      work_address_line2,
      work_address_city,
      work_address_state,
      work_address_zipCode,
      phone_number,
      group_id,
      is_member,
      organization,
      job_title,
      is_news_subscribed,
      is_public,
      instructor_certificate_status,
      instructor_accredited_date,
      instructor_anniversary_date,
      dietary_restriction,
      dietary_restriction_other,
      adult_certification_date,
      adult_anniversary_date,
      youth_certification_date,
      youth_anniversary_date,
      teen_certification_date,
      teen_anniversary_date,
      sponsor_status,
      primary_organization_name,
      primary_organization_id,
      secondary_organization_name,
      secondary_organization_id,
      tertiary_organization_name,
      tertiary_organization_id,
    ];
    // const client = await pool.connect();

    try {
      const result = await pool.query(query, values);
      console.log("result---", result);
      return result.rows[0];
    } catch (error) {
      return error;
    }
  },

  updateUser: async (_, args) => {
    const { id, email, password, phoneNumber, additionalDetails } = args;
    const query =
      "UPDATE user_data SET email = $2, password = $3, phone_number = $4, additional_details = $5 WHERE id = $1 RETURNING *";
    const values = [id, email, password, phoneNumber, additionalDetails];
    // const client = await pool.connect();

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  },

  deleteUser: async (_, args) => {
    const { id } = args;
    const query = "DELETE FROM user_data WHERE id = $1 RETURNING *";
    const values = [id];
    // const client = await pool.connect();

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      return err;
    }
  },

  userRegistration: async (_, args) => {
    try {
      const {
        email,
        name,
        phone_number,
        address,
        is_council_member,
        password,
        group_id,
      } = args;
      const hashPassword = await passwordEncrypt(password);
      const findData = await UsersModel.findOne({ where: { email } });
      if (findData) {
        const updatedData = await UsersModel.update(
          {
            email,
            name,
            phone_number,
            address,
            password: hashPassword,
            is_council_member,
            group_id,
            updated_date: new Date(),
          },
          { where: { email } }
        );
        if (updatedData[0] > 0) {
          const token = createToken(findData.id, findData.email);
          return {
            message: "Details saved successfully",
            success: true,
            status: 200,
            token,
            data: findData,
          };
        }
      }
      return {
        message: "Something went to wrong please try again",
        success: true,
        status: 400,
        token: "",
        data: {},
      };
    } catch (error) {
      console.log("error---", error);
      return error;
    }
  },

  resendOtp: async (_, args) => {
    try {
      const { email } = args;
      const otp = generateSixDigitNumber();
      sendEmailVerification(email, otp);
      const singleData = await UsersModel.findOne({ where: { email } });
      if (!singleData) {
        return {
          message: "Please verify email",
          success: true,
          status: 400,
          is_email_sent: false,
        };
      }
      const data = await UsersModel.update(
        {
          otp,
          is_email_verified: false,
          expiration_time: new Date(Date.now() + 10 * 60 * 1000),
          updated_date: new Date(),
        },
        { where: { email } }
      );
      if (data) {
        return {
          message: "Successfully otp send",
          success: true,
          status: 200,
          is_email_sent: true,
        };
      }
      return {
        message: "Please try again",
        success: false,
        status: 400,
        is_email_sent: false,
      };
    } catch (error) {
      return error;
    }
  },

  verifyOtp: async (_, args) => {
    try {
      // const result = await pool.query("SELECT * FROM users_data");
      // console.log(result.rows);
      const { otp, email } = args;
      const data = await UsersModel.findOne({
        where: { email },
      });
      if (data.otp == otp && new Date(data.expiration_time) > new Date()) {
        await UsersModel.update(
          { updated_date: new Date(), is_email_verified: true },
          { where: { email } }
        );
        return {
          message: "Otp verified successfully",
          success: true,
          status: 200,
        };
      }
      return {
        message: "Otp is expired or not valid",
        success: false,
        status: 400,
      };
    } catch (error) {
      return error;
    }
  },

  loginUser: async (_, args) => {
    try {
      const { email, password } = args;
      const checkEmailPresent = await UsersModel.findOne({
        where: { email, is_active: true },
      });
      if (checkEmailPresent) {
        const isProperPassword = await passwordCompare(
          password,
          checkEmailPresent.password
        );
        if (isProperPassword) {
          const token = createToken(
            checkEmailPresent.id,
            checkEmailPresent.email
          );
          return {
            message: "Login Successfully",
            success: true,
            status: 200,
            token: token,
            data: checkEmailPresent,
          };
        }
      }
      return {
        message: "Invalid email or password",
        success: false,
        status: 404,
        token: "",
        data: {},
      };
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },

  checkUserEmail: async (_, args) => {
    try {
      const { email } = args;
      const data = await UsersModel.findOne({
        where: { email },
      });
      if (!data) {
        const otp = generateSixDigitNumber();
        sendEmailVerification(email, otp);
        const createdData = await UsersModel.create({
          email,
          otp,
          is_email_verified: false,
          expiration_time: new Date(Date.now() + 10 * 60 * 1000),
          created_date: new Date(),
        });
        return {
          message: "Otp is send in email",
          success: true,
          status: 200,
          is_email_sent: true,
          is_user_registered: false,
          data: createdData,
        };
      }
      if (!data.is_email_verified) {
        const otp = generateSixDigitNumber();
        sendEmailVerification(email, otp);
        await UsersModel.update(
          {
            email,
            otp,
            is_email_verified: false,
            expiration_time: new Date(Date.now() + 10 * 60 * 1000),
            updated_date: new Date(),
            is_user_registered: data.name.length > 0 ? true : false,
          },
          { where: { email } }
        );
      }
      return {
        message: "User is present",
        success: true,
        status: 200,
        is_email_sent: !data.is_email_verified,
        is_user_registered: data.name.length > 0 ? true : false,
        data,
      };
    } catch (error) {
      console.log("catch--", error);
      return error;
    }
  },
};

export default userMutations;
