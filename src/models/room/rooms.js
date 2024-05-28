
import mongoose from "mongoose";
const Schema = mongoose.Schema
const roomSchema = new Schema(
  {
    room_number: {
      type: String,
      // required: true,
      trim: true
    },
    department_name: {
      type: String,
      // required: true,
      trim: true
    },
    total_capacity: {
      type: Number,
      // required: true,
      trim: true
    },
    even_capacity: {
      type: Number,
      // required: true,
      trim: true
    },
    odd_capacity: {
      type: Number,
      // required: true,
      trim: true
    },
    priority: {
      type: Number,
      // required: true,
      trim: true
    },
    room_type: {
      type: String,
      enum: ["Simple Room", "Big Room", "Lab Room"],
      default: "Simple Room",
    },
    room_details: [
      {
        type: mongoose.Schema.Types.ObjectId, 
      ref: "Room_Details",
      },
    ],
  },
  {
    timestamps: true,
  }

);
export const roomschem = mongoose.model("Room", roomSchema);
