import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  phone: string;
  name: string;
  user_uid: string;
  deleted: boolean;
  surname: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface UserDTO extends Omit<User, '_id' | 'password' | 'deleted'> {
  access_token: string;
  refresh_token: string;
}
