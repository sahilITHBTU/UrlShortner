import express from "express"
import path from "path";
import cookieParser from "cookie-parser";

import ConnectMongoDB from "./connect.js";

import URL from "./models/models.url.js";

import {checkForAuthentication,restrictTo} from "./middleware/auth.js"

import Staticrouter from "./route/StaticRouter.js";
import router from "./route/route.url.js";
import AuthRouter from "./route/auth.user.js"

const app = express();
const Port = 8000;
app.use(express.json())
ConnectMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("MongoDB connected");
});
app.set("view engine","ejs");
app.set("views",path.resolve("./view"))


app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
 app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/test", Staticrouter);
app.use("/api/url",restrictTo(["NORMAL","ADMIN"]) ,router);
app.use("/user",AuthRouter);
app.listen(Port,()=>{
    console.log(`Server started at ${Port}`);
})