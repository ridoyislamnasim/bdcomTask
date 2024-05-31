import AuthRouter from './auth.route.js';
import HomeRouter from './home.route.js';
import UserRouter from './user.route.js';
import NewsRouter from './news.route.js';
import RoleRouter from './role.route.js';

import { Router } from 'express';
const rootRouter = Router();

rootRouter.use('/auth', AuthRouter);
rootRouter.use('/home', HomeRouter);
rootRouter.use('/user', UserRouter);
rootRouter.use('/news', NewsRouter);
rootRouter.use('/role', RoleRouter);

export default rootRouter;
