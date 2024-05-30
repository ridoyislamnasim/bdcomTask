import { Router } from 'express';
import controller from '../../modules/auth/auth.controller.js';
import { doLoginValidationHandler } from '../../middleware/auth/isLogin.js';

const AuthRouter = Router();
AuthRouter
.get('/',  controller.getLoginPage)
.post('/login', controller.createLogin)
.delete('/logout', controller.logout)


export default AuthRouter;
