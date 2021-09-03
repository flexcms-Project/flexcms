const InvariantError = require('../../exceptions/InvariantError');
const { UserRegisterSchema, UserLoginSchema, UserUpdateSchema } = require('./schema');

const UsersValidator = {
  validateUserRegister: (payload) => {
    const validationResult = UserRegisterSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUserLogin: (payload) => {
    const validationResult = UserLoginSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUserUpdate: (payload) => {
    const validationResult = UserUpdateSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;