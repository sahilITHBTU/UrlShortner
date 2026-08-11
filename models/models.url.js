import mongoose from "mongoose";
import UserModel from "./models.user.js";
const UrlScheme = new mongoose.Schema(
  {
    ShortId: {
      type: String,
      required: true,
      unique: true,
    },
    RedirectUrl: {
      type: String,
      required: true,
    },
    VisitHistory: [{ timestamps: { type: String } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  { timestamps: true },
);

const URL = mongoose.model('urls',UrlScheme);
export default URL