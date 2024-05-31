import { Router } from 'express';
import controller from '../../modules/auth/auth.controller.js';
import { doLoginValidationHandler } from '../../middleware/auth/isLogin.js';
import { alreadyLoginValidationHandler } from '../../middleware/auth/alreadyLogin.js';

const AuthRouter = Router();
AuthRouter
.get('/',alreadyLoginValidationHandler,  controller.getLoginPage)
.post('/login', controller.createLogin)
.delete('/logout', controller.logout)


export default AuthRouter;
