import { Router } from 'express';
import controller from '../../modules/auth/auth.controller.js';
import { upload } from '../../middleware/upload/upload.js';

const AuthRouter = Router();
AuthRouter
.get('/', controller.getLoginPage)
.post('/login', controller.createLogin)
.get('/user', controller.createUser)


export default AuthRouter;
