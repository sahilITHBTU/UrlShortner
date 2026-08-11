import express from "express";
import {
    HandleGenerateNewShortUrl,HandleRedirectOrignalUrl,HandleGetAnalytics} from "../controllers/controllers.url.js"
const router = express.Router();

router.post("/",HandleGenerateNewShortUrl)
router.get("/:id", HandleRedirectOrignalUrl);
router.get("/analytics/:id",HandleGetAnalytics);
export default router;