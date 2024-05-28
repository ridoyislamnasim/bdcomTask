import RoomRouter from './room.route.js';
import AuthRouter from './auth.route.js';

import { Router } from 'express';
const rootRouter = Router();

rootRouter.use('/room', RoomRouter);
rootRouter.use('/auth', AuthRouter);

export default rootRouter;
