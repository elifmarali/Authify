import mongoose from "mongoose";

export async function initMongoose() {
  console.log("Trying to connect to MongoDB...");

  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB.");
    return mongoose.connection.asPromise();
  }
  
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log("Connected to MongoDB ✅");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error ❌:", error);
  }
}
