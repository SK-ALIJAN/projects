import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import {
  createAccountService,
  loginService,
  resetPasswordService,
  googleSignInService
} from '../auth.service.js';

import { successResponse } from '../../../utils/response.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

export const createAccount = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await createAccountService(
    req.body,
    req.headers['system-time-zone'] as string
  );

  return successResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Account created successfully',
    data: { user, token }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await loginService(
    req.body.email,
    req.body.password,
    req.app.locals.baseurl
  );

  return successResponse(res, {
    message: 'Successfully logged in',
    data: { user, token }
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  await resetPasswordService(
    req.body.code,
    req.body.password,
    req.body.page
  );

  return successResponse(res, {
    message: 'Password reset successfully'
  });
});
