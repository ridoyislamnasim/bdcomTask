import Jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import { BadRequestError } from '../../utils/errors.js';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../../utils/jwt.js';
import { userRegschema } from '../../models/auth/user.js';

// const jwtAuth = (...role) => { // rider branch admin  merchant
//   return async (req, res, next) => {
//     let cookies =
//       Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
//       console.log("-")
//     if (!cookies) {
//      return res.status(400).json({ message: 'Token Not Found.' });

//     }

//     const parsedCookie = JSON.parse(cookies?.bdcom);
//     const { role, accessToken, refreshToken } = parsedCookie;

//     try {
//       if (!accessToken || !refreshToken) {
//         return res.status(400).json({ message: 'Token Not Found.' });
//       }
//       // const payload = await verifyAccessToken(accessToken);
//       console.log("----error-------------------------------------------------------");

//       const payload = Jwt.verify(accessToken, config.jwtAccessSecretKey, );
//       console.log("payload",payload);

//       if (!payload) {
//         const decode = await verifyRefreshToken(refreshToken);
//         req.user = { ...decode.userInfo };
//         req.role = role;
//         if (!decode) {
//           // return  res.status(400).json({ message: 'unauthorized.' });
//           return res.render("auth/loginSinginReg", {
//             errors: "",
//           }); 
//         }
//       }else{
//         req.user = { ...payload.userInfo };
//         req.role = role;
//       }

//       next();
//     } catch (err) {
//       // return res.status(400).json({ message: 'unauthorized.' });
//       return res.render("auth/loginSinginReg", {
//         errors: "",
//       }); 
//     }
//   }
// };

const jwtAuth = (...allowedRoles) => {
  return async (req, res, next) => {
    console.log("jwtAuth---------------------")
    try {
      let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

      if (!cookies) {
        // return res.status(400).json({ message: 'Token Not Found.' });
        return res.render("auth/loginSinginReg", {
          errors: "",
        });
      }

      const parsedCookie = JSON.parse(cookies?.bdcom);
      const { role, accessToken, refreshToken } = parsedCookie;
      console.log("parsedCookie", accessToken, refreshToken);

      // Check if both tokens are present
      if (!accessToken || !refreshToken) {
        // return res.status(400).json({ message: 'Token Not Found.' });
        return res.render("auth/loginSinginReg", {
          errors: "",
        });
      }

      // Verify the access token
      let payload;
      try {
        payload =  Jwt.verify(refreshToken, config.jwtRefreshSecretKey);
      } catch (error) {
        try {
          console.log("error ============================================== refreshToken", refreshToken)
          // const refreshPayload = await Jwt.verify(refreshToken, config.jwtRefreshSecretKey);
          const refreshPayload = Jwt.verify(refreshToken, config.jwtRefreshSecretKey);
          req.user = { ...payload.userInfo };
          console.log("refreshPayload", refreshPayload);
          // console.log("refreshPayload", refreshPayload.userInfo.user_info_encrypted.id);
          //
          const userId = refreshPayload.userInfo.user_info_encrypted.id;
          const user = await userRegschema.findById(userId);
          const user_info_encrypted = {
            id: user._id || null,
            name: user.name || null,
            email: user.email || null,
            role: user.role || null
          };
          // console.log("user_info_encrypted", user_info_encrypted);

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

        } catch (refreshError) {
          // return res.status(401).json({ message: 'Invalid Refresh Token.' });
          return res.render("auth/loginSinginReg", {
            errors: "",
          });
        }
      }

      // Check if the user's role is allowed
      console.log("----", role);
      console.log("----", allowedRoles);
      if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
        return res.render("auth/loginSinginReg", {
          errors: "",
        });
      }

      // Attach user info to the request object
      // req.user = { userId: payload.userId, role };
      req.user = { ...payload.userInfo };
      req.role = role;

      next();
    } catch (error) {
      console.error(error);
      // return res.status(500).json({ message: 'Internal Server Error.' });
      return res.render("auth/loginSinginReg", {
        errors: "",
      });
    }
  };
};


export default jwtAuth;
