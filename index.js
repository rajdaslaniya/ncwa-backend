const dotenv = require("dotenv");
import createServer from "./src/graphql";
import sequelize from "./src/config/connect";

dotenv.config();

const start = async () => {
  try {
    await sequelize.authenticate();
    const app = await createServer();
    await app.listen(process.env.PORT || 4001);
    console.log(
      `🚀  GraphQL server running at port: ${process.env.PORT || 4001}`
    );
  } catch (err) {
    console.log("Not able to run GraphQL server", err);
  }
};

start();
