
import mongoose from 'mongoose';
import dns from 'dns';

try { dns.setServers(['8.8.8.8', '8.8.4.4']); } catch { }

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gopratle_db';
  await mongoose.connect(mongoUri);
  console.log(`[MongoDB] Connected to ${mongoose.connection.name}`);
};
