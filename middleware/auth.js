import { getUser } from "../service/auth.js";



function checkForAuthentication(req,res,next){
     const TokenCookie = req.cookies?.token;
     req.user = null;
     if (!TokenCookie ) return next();
     const token = TokenCookie;
     const user = getUser(token)
     req.user = user;
     return next()
}
//Admin Normal

function restrictTo(roles){
    return function(req,res,next){
    if(!req.user) return res.render("login.ejs");
    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
}
}
export { checkForAuthentication, restrictTo };