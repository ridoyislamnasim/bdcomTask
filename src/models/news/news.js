
import mongoose from "mongoose";
const Schema = mongoose.Schema
const newsSchema = new Schema(
  {   
    title:{
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },

  },
  {
    timestamps: true,
  }
);
export const newsschema = mongoose.model("news", newsSchema);
