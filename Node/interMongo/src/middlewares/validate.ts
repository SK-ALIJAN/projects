import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import httpStatus from 'http-status';
import createError from 'http-errors';

import pick from '../utils/pick.js';

const validate =
  (schema: Record<string, unknown>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details: { message: string }) => details.message)
        .join(', ');

      return next(
        createError(httpStatus.BAD_REQUEST, errorMessage)
      );
    }

    Object.assign(req, value);
    next();
  };

export default validate;
