import mongoose from "mongoose";
import config from "config";

async function connectDB() {
  try {
    await mongoose.connect(config.get("DB_URL"));
    console.log(`DB Connected`);
  } catch (error) {
    console.log(error);
  }
}
connectDB();
