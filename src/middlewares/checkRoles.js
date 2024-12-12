import createHttpError from 'http-errors';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;

    if (!user) {
      return next(createHttpError(401, 'User not authenticated'));
    }

    const { role } = user;

    if (roles.includes(role)) {
      return next();
    }

    next(createHttpError(403, 'Access denied'));
  };
