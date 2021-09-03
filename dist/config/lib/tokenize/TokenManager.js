const jwt = require('jsonwebtoken');
const AuthenticationError = require('../../../exceptions/AuthenticationError');

const TokenManager = {
  generateJwtToken(_id) {
    const expiresIn = process.env.TOKEN_AGE_IN_DAY;

    const payload = {
      sub: _id,
      iat: Date.now(),
    }

    const signedToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2' + 'd' });

    var date = new Date();
    // add a day
    date.setDate(date.getDate() + parseInt(expiresIn));
    date = date.toUTCString();

    return {token: 'Bearer ' + signedToken, date: date}
  },

  verifyJwtToken(jwtToken) {
    try {
      if (jwtToken[0] !== 'Bearer' && jwtToken[1].match(/\S+\.\S+\.\S+/) === null) {
        throw new AuthenticationError('authentication token tidak valid')
      }

      const verification = jwt.verify(jwtToken[1], process.env.TOKEN_SECRET );
      return verification;
    } catch (error) {
      throw new AuthenticationError('authentication token tidak valid');
    }
  },
};

module.exports = TokenManager;
