import * as Joi from 'joi';

export const createAccountValidation = {
  body: Joi.object({
    first_name: Joi.string().trim().required().label('First Name'),
    last_name: Joi.string().trim().required().label('Last Name'),
    email: Joi.string().trim().required().label('Email'),
    password: Joi.string().trim().required().min(6).label('Password'),
    confirm_password: Joi.string()
      .trim()
      .required()
      .min(6)
      .label('Confirm Password')
  })
};

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().trim().required().label('Email'),
    password: Joi.string().trim().required().min(6).label('Password')
  })
};
