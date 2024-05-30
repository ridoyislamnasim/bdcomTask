import { Router } from 'express';
import controller from '../../modules/user/user.controller.js';
import multer from 'multer';
import jwtAuth from '../../middleware/auth/jwtAuth.js';
const upload = multer();
const UserRouter = Router();
UserRouter
  .get('/',  controller.getUser)
  .post('/',  upload.any(), jwtAuth('') , controller.createUser)
//   .get('/', controller.getAllUser);

UserRouter
  .route('/:id')
//   .get(controller.getSingleUser)
//   .put(controller.updateUser)
  .delete(controller.deleteUser);

//   UserRouter
//   .put('/:id/status', controller.updateUserStatus)


export default UserRouter;
