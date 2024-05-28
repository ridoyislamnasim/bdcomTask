import { Router } from 'express';
import controller from '../../modules/room/room.controller.js';
import { upload } from '../../middleware/upload/upload.js';

const RoomRouter = Router();
RoomRouter
  .post('/', controller.createRoom)
  .get('/', controller.getAllRoom);

RoomRouter
  .route('/:id')
  .get(controller.getSingleRoom)
  .put(controller.updateRoom)
  .delete(controller.deleteRoom);

//   RoomRouter
//   .put('/:id/status', controller.updateRoomStatus)


export default RoomRouter;
