// const jsonwebtoken = require('jsonwebtoken');
const TokenManager = require('../config/lib/tokenize/TokenManager');

const authVerif = async(req, res, next) => {
  if(!req.cookies.token && !req.headers.token ){
		next();
  }else{
    if(req.cookies.token){
      let tokenParts = req.cookies.token.split(' ');
      req.user = await TokenManager.verifyJwtToken(tokenParts);
      const tokenData = await TokenManager.generateJwtToken(req.user.sub);
      res.setHeader('Set-Cookie', [`token=${tokenData.token}; path=/; expires= ${tokenData.date};Secure; HttpOnly`]);
      next();
    }else{
      let tokenParts = req.headers.token.split(' ');
      tokenParts[1] = tokenParts[1].slice(0, -1);
      req.user = await TokenManager.verifyJwtToken(tokenParts);
      const tokenData = await TokenManager.generateJwtToken(req.user.sub);
      res.setHeader('Set-Cookie', [`token=${tokenData.token}; path=/; expires= ${tokenData.date};Secure; HttpOnly`]);
      next();
    }
  }
}

module.exports = authVerif;
