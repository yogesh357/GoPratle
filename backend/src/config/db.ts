// import mongoose from 'mongoose';
// import dns from 'dns';

// try {
//   dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
// } catch (e) {
// }


// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export const connectDB = async (): Promise<typeof mongoose> => {
//   const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gopratle_db';

//   if (!mongoUri) {
//     throw new Error('MONGODB_URI environment variable is not defined.');
//   }

//   if (cached.conn && mongoose.connection.readyState === 1) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       serverSelectionTimeoutMS: 10000,
//     };

//     console.log('[MongoDB] Initiating connection...');
//     cached.promise = mongoose.connect(mongoUri, opts).then((m) => {
//       console.log(`[MongoDB] Connected successfully: ${m.connection.host}/${m.connection.name}`);
//       return m;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     console.error('[MongoDB] Connection error:', e);
//     throw e;
//   }

//   return cached.conn;
// };


import mongoose from 'mongoose';
import dns from 'dns';

// Fix Windows/ISP SRV lookup
try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch { }

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gopratle_db';
  await mongoose.connect(mongoUri);
  console.log(`[MongoDB] Connected to ${mongoose.connection.name}`);
};
