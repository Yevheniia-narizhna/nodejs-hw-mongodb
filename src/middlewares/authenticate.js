import createHttpError from 'http-errors';
import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const bearer = authHeader.split(' ', 2)[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const userId = session.userId;
  const user = await UsersCollection.findOne({ _id: userId });

  if (!user) {
    return next(createHttpError(401));
  }

  req.user = user;

  next();
};
