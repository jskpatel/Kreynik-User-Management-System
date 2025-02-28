import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

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
      dbName: process.env.MONGO_DBNAME,
      bufferCommands: true,
      maxPoolSize: 10
    }

    cached.promise = mongoose.connect(MONGO_DB_URI, promise).then(() => mongoose.connection)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}