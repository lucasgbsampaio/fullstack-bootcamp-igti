import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const gradesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const gradeModel = mongoose.model('grade', gradesSchema, 'grade');
export { db, gradeModel };
