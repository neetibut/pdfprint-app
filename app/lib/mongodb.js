// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     console.log("Using cached database connection");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     };

//     console.log("Connecting to MongoDB...");
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log("New database connection established");
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     console.log("Database connection successful");
//     return cached.conn;
//   } catch (e) {
//     console.error("Database connection failed:", e);
//     throw e;
//   }
// }

// lib/mongodb.js

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("New database connection established");
      return mongoose;
    }).catch((err) => {
      console.error("Database connection failed:", err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connection successful");
    return cached.conn;
  } catch (e) {
    console.error("Database connection failed:", e);
    throw e;
  }
}
