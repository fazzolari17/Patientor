import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { Request, RequestHandler, Response } from 'express';
import User from '../models/user';
import { parseString } from '../utils/utils';
import config from '../utils/config';

const loginRouter = express.Router();

interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

loginRouter.post('/', (async (request: Request, response: Response) => {
  try {
    const body: ILoginCredentials = request.body as ILoginCredentials;
    const userToLogin = await User.findOne({
      email: body.email,
    });

    if (!userToLogin) {
      return response
        .status(400)
        .json({
          error: 'user does not exist create an account',
        })
        .end();
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

    const token = jwt.sign(userForToken, secret, {
      expiresIn: config.setJwtExpirationTime(body.rememberMe),
    });

    return response.status(200).send({
      token,
      email: userToLogin.email,
      firstName: userToLogin.firstName,
      lastName: userToLogin.lastName,
      id: userToLogin._id,
    });
  } catch (error) {
    console.log('ERROR', { error });
    return response.end().status(400).send({ error }).end();
  }
}) as RequestHandler);

export default loginRouter;
