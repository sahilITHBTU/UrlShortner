import express from "express";
import URL from "../models/models.url.js";
import { restrictTo } from "../middleware/auth.js";

const Staticrouter = express.Router();

Staticrouter.get("/admin/urls",restrictTo(['ADMIN']) ,async(req,res)=>{
 try {
    
    if (!req.user) {
      console.log(req.user);
      return res.render("login.ejs");
    }

    
    const AllUrls = await URL.find({});

   
    return res.render("home.ejs", { urls: AllUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

Staticrouter.get("/", restrictTo(["NORMAL","ADMIN"]) ,async (req, res) => {
  try {
    
    if (!req.user) {
      console.log(req.user);
      return res.render("login.ejs");
    }

    
    const AllUrls = await URL.find({
      createdBy : req.user._id,
    });

   
    return res.render("home.ejs", { urls: AllUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});


Staticrouter.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});


Staticrouter.get("/login", (req, res) => {
  return res.render("login.ejs");
});

export default Staticrouter;
