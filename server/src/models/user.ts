import mongoose from 'mongoose';
import { model } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

const userSchema = new mongoose.Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = model<User>('User', userSchema);

export default User;
