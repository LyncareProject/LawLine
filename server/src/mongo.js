const mongoose = require("mongoose");

const {
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_USER,
  MONGO_DBNAME,
} = require("./common");

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`;

const client = mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client;
    console.log("MongoDB connection successful");
  } catch (error) {
    console.error("MongoDB connection failed : ", error);
    throw new Error("MongoDB connection failed");
  }
}

module.exports = {
  connectToDatabase,
};
