import { ObjectId } from 'mongodb';
import { User } from '../../interfaces/users/user.interface';
import mongoose, { Schema, Document } from 'mongoose';

const schema = new Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    user_uid: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, minimize: false },
);

const db = mongoose.connection.useDb('users');
const userModel = db.model<User & Document>('user', schema, 'users');

export default userModel;
