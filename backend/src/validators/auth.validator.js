import validator from 'validator';

export const validateSignup = ({ email, password }) => {
  const errors = [];
  if (!email || !validator.isEmail(email)) errors.push('Valid email required');
  if (!password || password.length < 6) errors.push('Password min length 6');
  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = [];
  if (!email || !validator.isEmail(email)) errors.push('Valid email required');
  if (!password) errors.push('Password required');
  return errors;
};
