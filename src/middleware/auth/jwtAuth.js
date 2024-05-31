import Jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import { generateAccessToken } from '../../utils/jwt.js';
import { userRegschema } from '../../models/auth/user.js';


const jwtAuth = (...allowedRoles) => {
  return async (req, res, next) => {
    function userInfo(userid){
      return  userRegschema.findById(userid);
     }

    try {
      let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

      if (!cookies) {
        // return res.status(400).json({ message: 'Token Not Found.' });
        return res.render("auth/loginSinginReg", {
          errors: "",
          return_value :""
        });
      }

      const parsedCookie = JSON.parse(cookies?.bdcom);
      const { role, accessToken, refreshToken } = parsedCookie;

      // Check if both tokens are present
      if (!accessToken || !refreshToken) {
        return res.render("auth/loginSinginReg", {
          errors: "",
          return_value :""
        });
      }
      const verifyAccessToken = await new Promise((resolve, reject) => {
       Jwt.verify(accessToken, config.jwtAccessSecretKey, (err, payload) => {
        if (err) {
          // return reject(err);
        }
        resolve(payload);
      });
    });
    const verifyRefreshToken = await   new Promise((resolve, reject) => {
       Jwt.verify(refreshToken, config.jwtRefreshSecretKey, (err, payload) => {
        if (err) {
          // return reject(err);
        }
        resolve(payload);
      });
    });

    if (verifyAccessToken) {
      // Access token is verified successfully
      req.user = {
       ...verifyAccessToken.userInfo
      };
      req.role = role;
      // next();
    } else if (verifyRefreshToken) {
      // Refresh token is verified successfully
      const userId = verifyRefreshToken.userInfo.user_info_encrypted.id;
      const user = await userInfo(userId);
      const user_info_encrypted = {
        id: user._id || null,
        name: user.name || null,
        email: user.email || null,
        role: user.role || null
      };
      // new access token generated from the refresh token
      const newAccessToken = generateAccessToken({ userInfo: { user_info_encrypted } });

      const token = {
        role: user.role,
        accessToken: newAccessToken,
        refreshToken: refreshToken
      };
      res.cookie("bdcom", JSON.stringify(token), {
        maxAge: config.cookieMaxAge,
        // milliseconds *  seconds * minutes * hours * days
        httpOnly: true,
        signed: true,

      });

      req.user = {
       ...verifyRefreshToken.userInfo
      };
      req.role = role;
    } else {
      // Both tokens are invalid
      return res.render("auth/loginSinginReg", {
        errors: "",
        return_value :""
      });
    }


      if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
        return res.render("auth/loginSinginReg", {
          errors: "",
          return_value :""
        });
      }

      next();
    } catch (error) {
      console.error(error);
      // return res.status(500).json({ message: 'Internal Server Error.' });
      return res.render("auth/loginSinginReg", {
        errors: "",
        return_value :""
      });
    }
  };
};


export default jwtAuth;
