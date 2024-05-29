import { Router } from 'express';
import controller from '../../modules/user/user.controller.js';
import multer from 'multer';
const upload = multer();
const UserRouter = Router();
UserRouter
  .get('/', controller.getUser)
  .post('/',   upload.any(), controller.createUser)
//   .get('/', controller.getAllUser);

UserRouter
  .route('/:id')
//   .get(controller.getSingleUser)
//   .put(controller.updateUser)
  .delete(controller.deleteUser);

//   UserRouter
//   .put('/:id/status', controller.updateUserStatus)


export default UserRouter;
