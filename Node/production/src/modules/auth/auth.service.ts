import httpStatus from 'http-status';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import moment from 'moment';
import axios from 'axios';
import admin from 'firebase-admin';
import { Op, literal } from 'sequelize';

import User from '../../models/User.model.js';
import Student from '../../models/Student.model.js';
import Currency from '../../models/Currency.model.js';
import Notifications from '../../models/Notifications.model.js';

import jwt from '../../utils/token.js';
import slugify from '../../utils/slugify.js';
import sendMail from '../../utils/mailService.js';
import getResetPasswordTemplate from '../../mailTemplates/resetPasswordMail.template.js';
import { WhenStudentResetpassword } from '../../utils/allMailingFunctionality.js';
import config from '../../config/index.js';

/* ================= CREATE ACCOUNT ================= */

export const createAccountService = async (
  payload: any,
  timeZone?: string
) => {
  const existing = await User.findOne({ where: { email: payload.email } });
  if (existing) {
    throw createError(httpStatus.CONFLICT, 'Email already registered');
  }

  payload.password = await bcrypt.hash(payload.password, 10);
  payload.display_name = `${payload.first_name} ${payload.last_name}`;
  payload.time_zone = timeZone;
  payload.currency_id = 1;
  payload.profile_image = 'avatar.png';
  payload.last_login_at = moment().format('YYYY-MM-DD HH:mm');

  const slugBase = slugify(payload.display_name);
  const count = await User.count({
    where: { slug: { [Op.like]: `${slugBase}%` } }
  });
  payload.slug = count ? `${slugBase}${count + 1}` : slugBase;

  const user = await User.create(payload);
  const token = await jwt.genToken(user.dataValues);

  delete user.dataValues.password;
  delete user.dataValues.id;

  return { user, token };
};

/* ================= LOGIN ================= */

export const loginService = async (
  email: string,
  password: string,
  baseUrl: string
) => {
  const user = await User.findOne({
    where: { email, is_deleted: 0 },
    include: [{ model: Currency }]
  });

  if (!user) {
    throw createError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw createError(httpStatus.FORBIDDEN, 'Invalid credentials');
  }

  await User.update(
    { last_login_at: moment().format('YYYY-MM-DD HH:mm') },
    { where: { id: user.id } }
  );

  const token = await jwt.genToken(user.dataValues);

  delete user.dataValues.password;
  user.dataValues.profile_image =
    `${baseUrl}/uploads/profile/${user.profile_image}`;

  return { user, token };
};

/* ================= RESET PASSWORD ================= */

export const resetPasswordService = async (
  code: string,
  password: string,
  page?: string
) => {
  const payload = await jwt.verifyToken(code);
  if (!payload) {
    throw createError(httpStatus.BAD_REQUEST, 'Invalid or expired link');
  }

  const Model = page === 'student' ? Student : User;
  const user = await Model.findByPk(payload.userId);

  if (!user || user.reset_password_token !== code) {
    throw createError(httpStatus.BAD_REQUEST, 'Invalid or expired link');
  }

  const hash = await bcrypt.hash(password, 10);

  await Model.update(
    { password: hash, reset_password_token: null },
    { where: { id: payload.userId } }
  );

  await WhenStudentResetpassword(
    user.display_name ?? `${user.first_name} ${user.last_name}`,
    user.email
  );
};

/* ================= GOOGLE SIGN IN ================= */

export const googleSignInService = async (idToken: string) => {
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch {
    throw createError(httpStatus.FORBIDDEN, 'Google authentication failed');
  }
};
