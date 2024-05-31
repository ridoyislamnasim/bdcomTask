
import mongoose from "mongoose";
const Schema = mongoose.Schema
const roleSchema = new Schema(
  {   
    role:{
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);
export const roleschema = mongoose.model("role", roleSchema);
