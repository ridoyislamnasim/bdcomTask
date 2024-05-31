import { Router } from 'express';
import controller from '../../modules/news/news.controller.js';
import multer from 'multer';
import jwtAuth from '../../middleware/auth/jwtAuth.js';
import { validateNews } from '../../middleware/validator/news/newsValidator.js';
import { doLoginValidationHandler } from '../../middleware/auth/isLogin.js';

const upload = multer();
const NewsRouter = Router();
NewsRouter
  .get('/',doLoginValidationHandler, jwtAuth(''),  controller.getNewsPage)
  .post('/',  upload.any(), jwtAuth(''), validateNews , controller.createNews)

NewsRouter
  .route('/:id')
  .put(upload.any(),validateNews, controller.updateNews)
  .delete(controller.deleteNews);


export default NewsRouter;
