import { Router } from 'express';
import controller from '../../modules/role/role.controller.js';
import multer from 'multer';
import jwtAuth from '../../middleware/auth/jwtAuth.js';
import { doLoginValidationHandler } from '../../middleware/auth/isLogin.js';
import { validateRole } from '../../middleware/validator/role/roleValidator.js';
import { validateUpdateRole } from '../../middleware/validator/role/UpdateRoleValidator.js';

const upload = multer();
const RoleRouter = Router();
RoleRouter
  .get('/',doLoginValidationHandler, jwtAuth(''), controller.getRolePage)
  .post('/',  upload.any(), jwtAuth(''), validateRole , controller.createRole)

RoleRouter
  .route('/:id')
  .put(upload.any(),validateUpdateRole, controller.updateRole)
  .delete(controller.deleteRole);


export default RoleRouter;
