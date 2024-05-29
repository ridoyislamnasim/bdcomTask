import { Router } from 'express';
import controller from '../../modules/home/home.controller.js';

const HomeRouter = Router();
HomeRouter
.get('/', controller.home)
// .post('/login', controller.createLogin)
// .get('/user', controller.createUser)


export default HomeRouter;
