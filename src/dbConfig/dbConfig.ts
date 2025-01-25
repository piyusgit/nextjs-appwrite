import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected Successfully!");
    });

    connection.on("error", (err) => {
      console.log("Error connecting to MongoDB!" + err);
      process.exit();
    });
  } catch (err) {
    console.log("Error connecting with database!");
    console.log(err);
  }
}
