import User from '../models/user';
import bcrypt from 'bcrypt';

export interface NewUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const createNewUser = async (body: NewUser) => {
  try {
    // const existingUser =  await User.findOne({ email: body.email });

    // if (existingUser) {
    //   return {
    //     error: 'account already exists try logging in.'
    //   };
    // }

    const saltRounds = 10;
    const passwordHash: string = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      passwordHash,
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (error: unknown) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
};

export default {
  createNewUser,
};
