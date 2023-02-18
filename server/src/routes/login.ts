import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { Request, RequestHandler, Response } from 'express';
import User from '../models/user';
import { parseString } from '../utils/utils';

const loginRouter = express.Router();

interface LoginCredentials {
  email: string;
  password: string;
}

loginRouter.post('/', (async (request: Request, response: Response) => {
  try {
    const body: LoginCredentials = request.body as LoginCredentials;
    const userToLogin = await User.findOne({
      email: body.email,
    });

    if (userToLogin === null) {
      response.send(400).send({
        error: 'user does not exist create an account',
      });
    }

    const passwordCorrect: boolean =
      userToLogin === null
        ? false
        : await bcrypt.compare(body.password, userToLogin.passwordHash);

    if (!(userToLogin && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      email: userToLogin.email,
      id: userToLogin._id,
    };

    const secret = parseString('process.env.SECRET', process.env.SECRET);

    const token = jwt.sign(userForToken, secret, { expiresIn: 60 * 60 });

    return response.status(200).send({
      token,
      email: userToLogin.email,
      firstName: userToLogin.firstName,
      lastName: userToLogin.lastName,
      id: userToLogin._id,
    });
  } catch (error) {
    return response.status(400).send({ error });
  }
}) as RequestHandler);

export default loginRouter;