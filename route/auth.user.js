import express from "express"
const AuthRouter = express.Router();
import {
  HandleUserSignUp,
  HandleUserLogin,
} from "../controllers/controllers.user.js";

AuthRouter.post("/", HandleUserSignUp);
AuthRouter.post("/login", HandleUserLogin);
export default AuthRouter