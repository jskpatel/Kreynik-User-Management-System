import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGODB_URI as string;
const MONGO_DB_NAME = process.env.MONGO_DBNAME as string;

if (!MONGO_DB_URI) {
  throw new Error("Please define mongodb uri in env file")
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const promise = {
      dbName: MONGO_DB_NAME,
      bufferCommands: false,
      maxPoolSize: 10
    }

    cached.promise = mongoose.connect(MONGO_DB_URI, promise).then((mongoose) => {
      return mongoose.connection
    })
  }

  try {
    cached.conn = await cached.promise
    console.log("🔥 DB Connected 🔥")
  } catch (error) {
    cached.promise = null
    console.log("❌ DB Not Connected ❌")
    throw error
  }

  return cached.conn
}