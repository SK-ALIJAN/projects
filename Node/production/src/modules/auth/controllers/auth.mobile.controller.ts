// src/modules/auth/controllers/auth.mobile.controller.js

const { loginBase } = require('./auth.base.controller');
const { successResponse } = require('../../../utils/response');

const loginMobile = async (req, res, next) => {
  try {
    const result = await loginBase(req.body);

    return successResponse(res, {
      message: 'Login successful',
      data: {
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
        },
        tokens: result.tokens,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginMobile,
};
