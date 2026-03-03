// src/modules/auth/controllers/auth.admin.controller.js

const { loginBase } = require('./auth.base.controller');
const { successResponse } = require('../../../utils/response');

const loginAdmin = async (req, res, next) => {
  try {
    const result = await loginBase(req.body);

    return successResponse(res, {
      message: 'Admin login successful',
      data: result, // admins can see full data
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginAdmin,
};
