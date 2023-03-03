import mongoose from 'mongoose';
import { model } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  weatherLocationData: WeatherLocationData;
}

export interface WeatherLocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  id: string;
}

const weatherSchema = new mongoose.Schema<WeatherLocationData>({
  name: String,
  lat: Number,
  lon: Number,
  country: String,
  state: String,
  id: String,
});

const userSchema = new mongoose.Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  weatherLocationData: weatherSchema,
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
