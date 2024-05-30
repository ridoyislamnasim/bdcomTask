import { BadRequestError } from '../../utils/errors.js';
import { verifyAccessToken, verifyRefreshToken } from '../../utils/jwt.js';

const jwtAuth = (...role) => { // rider branch admin  merchant
  return async (req, res, next) => {
    let cookies =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
      if(!cookies) {
        res.status(400).json({ message: 'Token Not Found.' });
      }
    const parsedCookie = JSON.parse(cookies.bdcom);
    const { role, accessToken, refreshToken } = parsedCookie;

    try {
      if (!accessToken || !refreshToken) {
        res.status(400).json({ message: 'Token Not Found.' });
      }
      const payload = await verifyAccessToken(accessToken);
      if (!payload) {
        const decode = await verifyRefreshToken(refreshToken);
        req.user = { ...decode.userInfo };
        if (!decode) {
          res.status(400).json({ message: 'unauthorized.' });
        }
      }
      req.user = { ...payload.userInfo };
      next();
    } catch (err) {
      res.status(400).json({ message: 'unauthorized.' });
    }
  }
};

export default jwtAuth;
