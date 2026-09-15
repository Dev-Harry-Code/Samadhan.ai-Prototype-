import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/samadhan";

type DbCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const g = globalThis as typeof globalThis & { __samadhanDb?: DbCache };
const cached: DbCache = (g.__samadhanDb ??= { conn: null, promise: null });

export async function connectToDb(): Promise<typeof mongoose> {
  const MONGO_URI = process.env.MONGO_URI ?? DEFAULT_URI;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    mongoose.connection.on("disconnected", () => {
      cached.conn = null;
      cached.promise = null;
    });
    cached.promise = mongoose.connect(MONGO_URI);
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}