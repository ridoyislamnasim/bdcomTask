import 'dotenv/config';

const {
  NODE_ENV,
  SERVER_VERSION,
  PORTV1,
  PORTV2,
  HOST,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  UPLOAD_FOLDER,
  UPLOAD_PATH,

} = process.env;

const config = {
  port: SERVER_VERSION === 'v1' ? PORTV1 : PORTV2,
  host: HOST,
  jwtAccessSecretKey: JWT_ACCESS_SECRET_KEY,
  jwtRefreshSecretKey: JWT_REFRESH_SECRET_KEY,
  uploadFolder: UPLOAD_FOLDER,
  uploadPath: UPLOAD_PATH,


};

export default config;
