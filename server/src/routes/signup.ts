import express, { Request, RequestHandler, Response } from 'express';
import userService from '../services/userService';
import { NewUser } from '../services/userService';
import { Document } from 'mongoose';
import User from '../models/user';

const userRouter = express.Router();

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

userRouter.post('/', (async (req: Request, res: Response) => {
  const body: NewUser = req.body as NewUser;

  const existingUser: Document | null = await User.findOne({
    email: body.email,
  });

  if (existingUser) {
    return res.status(400).json({
      error: 'account already exists try logging in.',
    });
  }

  const newUser = await userService.createNewUser(body);

  return res.status(200).send(newUser);
}) as RequestHandler);

// userRouter.get('/', async (request, response) => {
//   const users = await User
//     .find({})
//     .populate('blog', 'title author url likes')

//   response.json(users)
// })

export default userRouter;
