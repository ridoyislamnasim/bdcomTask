import catchError from '../../middleware/errors/catchError.js';
import responseHandler from '../../utils/responseHandler.js';
import withTransaction from '../../middleware/transactions/withTransaction.js';
import RoomService from './room.service.js';

class RoomController {
  createRoom = catchError(async (req, res, next) => {

    const payload = {
			room_number: req.body?.room_number,
			department_name: req.body?.department_name,
			rows_number: req.body?.rows_number,
			columns_name: req.body?.columns_name,
      room_type: req.body?.room_type,
		};

		const feature = await RoomService.createRoom(payload);
    const resDoc = responseHandler(201, 'Room Created successfully', feature);
    res.status(resDoc.statusCode).json(resDoc);
	});

  getAllRoom = catchError(async (req, res, next) => {
    res.render("auth/loginSinginReg", {
      // res.render("auth/ridoy", {
      errors: "",
      functionCall: 1,
      return_value: '',
      emp_return_value: '',
  })
    // let query={
		// 	page: req.query.page,
		// 	limit: req.query.limit,
		// 	order: req.query.order
		// }
    // const feature = await RoomService.getAllRoom(query);
    // const resDoc = responseHandler(200, 'Room get successfully', feature);
    // res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleRoom = catchError(async (req, res, next) => {
    const {id}=req.params;
    const feature  = await RoomService.getSingleRoom(id);
    const resDoc = responseHandler(200, 'Room get successfully', feature);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateRoom = catchError(async (req, res, next) => {
		console.log("Room",req.body);

    const payload = {
      room_id: req.params?.id,
			room_number: req.body?.room_number,
			department_name: req.body?.department_name,
			rows_number: req.body?.rows_number,
			columns_name: req.body?.columns_name,
      room_type: req.body?.room_type,
		};
		const room = await RoomService.updateRoom(payload);
    const resDoc = responseHandler(200,'Room update successfully', room);
		return res.status(201).json(resDoc);
	});

  deleteRoom = catchError(async (req, res, next) => {
    const {id}=req.params;
    const room  = await RoomService.deleteRoom(id);
    const resDoc = responseHandler(200, 'room delete successfully');
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateRoomStatus = catchError(async (req, res, next) => {
    const { id } = req.params;
    await featureService.updateRoomStatus(id, req.query);
    const resDoc = responseHandler(200, 'Room Update Status successfully');
    res.status(resDoc.statusCode).json(resDoc);
  });
}

export default new RoomController();
