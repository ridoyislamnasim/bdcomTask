import { Router } from 'express';
import controller from '../../modules/auth/auth.controller.js';

const AuthRouter = Router();
AuthRouter
.get('/', controller.getLoginPage)
.post('/login', controller.createLogin)
.delete('/logout', controller.logout)


export default AuthRouter;
