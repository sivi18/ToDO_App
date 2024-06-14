const mongoose = require("mongoose");
require("dotenv").config();
const ConnectionDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = ConnectionDb;
