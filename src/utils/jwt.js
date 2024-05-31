import Jwt from 'jsonwebtoken';
import config from '../config/config.js';
// 1d -> day // 24h -> hours // 1440m -> minutes // 86400s -> seconds
export const generateAccessToken = (payload) => {
  return Jwt.sign(payload, config.jwtAccessSecretKey, {
    expiresIn: '1m',
  });
};

export const generateRefreshToken = (payload) => {
  return Jwt.sign(payload, config.jwtRefreshSecretKey, {
    expiresIn: '1h',
  });
};

export const verifyAccessToken = (token) => {
  // return new Promise((resolve, reject) => {
    Jwt.verify(token, config.jwtAccessSecretKey, (err, payload) => {
      console.log("----error-------------------------------------------------------");
      console.log("err",err);
      console.log("payload",payload);
      return res.render("auth/loginSinginReg", {
        errors: "",
      }); 
      if (err) {
        // reject()
        return res.render("auth/loginSinginReg", {
          errors: "",
        }); 
      }
      // resolve(payload);
    });
  // });
};

export const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(token, config.jwtRefreshSecretKey, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });
};
