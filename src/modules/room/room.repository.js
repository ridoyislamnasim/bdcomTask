
import mongoose from 'mongoose';
import { roomDetailsschem } from '../../models/room/rooms.details.js';
import { roomschem } from '../../models/room/rooms.js';
import BaseRepository from '../base/base.repository.js';
import pagination from '../../utils/pagination.js';


class RoomRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }
  async createRoom(payload) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { room_number, department_name, rows_number, columns_name, room_type } = payload;
      let total_capacity = 0;
      let even_capacity = 0;
      let odd_capacity = 0;
  
      for (let i = 0; i < rows_number.length; i++) {
        total_capacity += Number(rows_number[i]);
        if (i % 2 === 0) {
          even_capacity += Number(rows_number[i]);
        } else {
          odd_capacity += Number(rows_number[i]);
        }
      }
      console.log("total_capacity", total_capacity);
      console.log("even_capacity", even_capacity);
      console.log("odd_capacity", odd_capacity);
  
      let priority = 0;
      if (room_type == "Simple Room") {
        priority = 1
      } else if (room_type == "Big Room") {
        priority = 2
      } else {
        priority = 3
      }
  
      let roomObj = new roomschem({
        room_number: room_number,
        department_name: department_name,
        total_capacity: total_capacity,
        even_capacity: even_capacity,
        odd_capacity: odd_capacity,
        priority: priority,
        room_type: room_type,
      });
  console.log("================================", roomObj);
      const createRoom = await roomObj.save({ session });
      console.log("================createRoom================", createRoom);
  
      for (let i = 0; i < rows_number.length; i++) {
        let roomDetailObj = new roomDetailsschem({
          row_number: rows_number[i],
          column_name: columns_name[i],
          room_id: createRoom._id,
        });
  console.log("================================", roomDetailObj);

        await roomDetailObj.save({ session });
        await this.#model.findByIdAndUpdate(
          createRoom._id,
           { $push: { room_details: roomDetailObj._id } },
           { session }
           );
      }
  
      await session.commitTransaction();
      session.endSession();
      return createRoom;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  async getSingleRoom(id) {
    const rooms = await this.#model.findById(id).populate("room_details")
    return rooms;
  }

  // async getAllRoom() {
  //   const rooms = await this.#model.find().populate("room_details")
  //   return rooms;
  // }



// Define the getRoomsPagination method
async getAllRoom(query) {
  try {
    const rooms = await pagination(query, async (limit, offset, sortOrder) => {
      const rooms = await roomschem.find()
        .sort({ createdAt: sortOrder }) 
        .skip(offset)
        .limit(limit)
        .populate('room_details') 

      // Count total documents
      const totalRooms = await roomschem.countDocuments();

      return { doc: rooms, totalDoc: totalRooms };
    });

    return rooms;
  } catch (error) {
    console.error("Error getting rooms with pagination:", error);
    throw error;
  }
}


  async updateRoom(payload) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      console.log("payload", payload);
      const { room_id, room_number, department_name, rows_number, columns_name, room_type } = payload;
      let total_capacity = 0;
      let even_capacity = 0;
      let odd_capacity = 0;
  
      for (let i = 0; i < rows_number.length; i++) {
        total_capacity += Number(rows_number[i]);
        if (i % 2 === 0) {
          even_capacity += Number(rows_number[i]);
        } else {
          odd_capacity += Number(rows_number[i]);
        }
      }
  
      let priority = 0;
      if (room_type == "Simple Room") {
        priority = 1
      } else if (room_type == "Big Room") {
        priority = 2
      } else {
        priority = 3
      }
  
      // Update room document
          // Update room document
    const updatedRoom = await roomschem.findByIdAndUpdate(
      room_id,
      {
        $set: {
          room_number: room_number,
          department_name: department_name,
          total_capacity: total_capacity,
          even_capacity: even_capacity,
          odd_capacity: odd_capacity,
          priority: priority,
          room_type: room_type,
        }
      },
      { session, new: true }
    );

    if (!updatedRoom) {
      throw new Error(`Room with ID ${room_id} not found.`);
    }

  console.log("updatedRoom", updatedRoom)
      // Delete existing room details
      await roomDetailsschem.deleteMany({ room_id: room_id }, { session });
  
      // Add updated room details
    const roomDetails = [];
    for (let i = 0; i < rows_number.length; i++) {
      let roomDetailObj = new roomDetailsschem({
        row_number: rows_number[i],
        column_name: columns_name[i],
        room_id: room_id,
      });
      await roomDetailObj.save({ session });
      roomDetails.push(roomDetailObj._id);
    }
console.log("roomDetails", roomDetails);
    // Update room with new room details
    await roomschem.findByIdAndUpdate(
      room_id,
      { room_details: roomDetails },
      { session }
    );

      await session.commitTransaction();
      session.endSession();
  
      return updatedRoom;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async deleteRoom(roomId) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Find the room by ID
      const room = await roomschem.findById(roomId);
  
      if (!room) {
        throw new Error(`Room with ID ${roomId} not found.`);
      }
  
      // Delete associated room details
      await roomDetailsschem.deleteMany({ room_id: roomId }, { session });
  
      // Delete the room
      await roomschem.findByIdAndDelete(roomId, { session });
  
      await session.commitTransaction();
      session.endSession();
  
      return { message: `Room with ID ${roomId} successfully deleted.` };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error deleting room:", error);
      throw error;
    }
  }
  
  

}

export default new RoomRepository(roomschem);
