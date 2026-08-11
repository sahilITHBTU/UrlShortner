import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 name :{
    type : String,
    required : true,
 },
 email :{
    type : String,
    required : true,
    unique : true,
 },
 role :{
   type : String,
  requried : true,
  default : "NORMAL"
 },
 password :{
    type : String,
    required : true,
 }
},{timestamps:true});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;