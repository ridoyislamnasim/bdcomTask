
import mongoose from "mongoose";
const Schema = mongoose.Schema
const userRegSchema = new Schema(
  {   
    name:{
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      minlength:5,
      required: true,
    }, 
    role: {
      type: String,
      enum: [ 'admin', 'user'],
      default: "user",
  },

  },
  {
    timestamps: true,
  }
);
export const userRegschema = mongoose.model("user", userRegSchema);
