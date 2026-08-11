import UserModel from "../models/models.user.js"
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

async function HandleUserSignUp(req,res) {
    const {name,email,password} = req.body;
     await UserModel.create({
      name,
      email,
      password,
     });
     return res.redirect("/test");
}

async function HandleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await UserModel.findOne({email,password});
    if(!user) return res.render('login.ejs',{
        error : "Invalid username or password"
    })
    
   const token =  setUser(user);
//    console.log(token);
     res.cookie("token",token);
     
    return res.redirect("/test");
}

export { HandleUserSignUp, HandleUserLogin };