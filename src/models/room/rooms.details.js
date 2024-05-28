import mongoose from "mongoose";
const Schema = mongoose.Schema
const roomDetailsSchema = new Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId, // Assuming rows_id is a reference to another schema
      ref: "Room", // Reference to the RoomInfo model
      // required: true,
      // trim: true,
    },
    column_name: {
      type: String,
      // required: true,
      trim: true
    },
    row_number: {
      type: Number,
      // required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }

);

export const roomDetailsschem = mongoose.model("Room_Details", roomDetailsSchema);
