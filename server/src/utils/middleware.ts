import logger from './logger';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { parseString } from './utils';

interface MiddleWare {
  method: string;
  path: string;
  body: string;
  token: string;
  user: string;
}
const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const requests: MiddleWare = request as unknown as MiddleWare;
  logger.info('Method', requests.method);
  logger.info('Path', requests.path);
  logger.info('Body', requests.body);
  logger.info('Token', requests.token);
  logger.info('User', requests.user);
  logger.info('---');
  next();
};

const userExtractor = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requests = request as unknown as MiddleWare;

  const secret = parseString('process.env.SECRET', process.env.SECRET);
  const decodedToken = jwt.verify(requests.token, secret) as jwt.JwtPayload;

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    requests.user = decodedToken.id;
  }

  return next();
};

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const requests: MiddleWare = request as unknown as MiddleWare;
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    requests.token = authorization.substring(7);
  }

  next();
};

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler: ErrorRequestHandler = (
  error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const errorMessage = parseString('error.message', error.message);
  logger.error(errorMessage);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id',
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: errorMessage,
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({
      error: 'token expired',
    });
  }

  return next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
