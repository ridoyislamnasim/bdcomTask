import { Router } from 'express';
import controller from '../../modules/user/user.controller.js';
import multer from 'multer';
import jwtAuth from '../../middleware/auth/jwtAuth.js';
import { doLoginValidationHandler } from '../../middleware/auth/isLogin.js';
import { validateCreateUser } from '../../middleware/validator/createUserValidator.js';
import { validateUpdateUser } from '../../middleware/validator/updateUserValidator.js';
const upload = multer();
const UserRouter = Router();
UserRouter
  .get('/',doLoginValidationHandler, jwtAuth('admin','user'), controller.getUserPage)
  .post('/',  upload.any(), jwtAuth(''), validateCreateUser , controller.createUser)

UserRouter
  .route('/:id')
  .put(upload.any(),validateUpdateUser, controller.updateUser)
  .delete(controller.deleteUser);


export default UserRouter;
