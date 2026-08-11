import { nanoid } from "nanoid";
import URL from "../models/models.url.js";
async function HandleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  const ShortId = nanoid(8);
  if (!ShortId) {
    return res.status(404).json({ message: "nano id failing" });
  }
  await URL.create({
    ShortId: ShortId,
    RedirectUrl: body.url,
    VisitHistory: [],
    createdBy: req.user._id,
  });
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home.ejs", {
    id: ShortId,
    urls : allUrls,
  });
}

// /controllers/controllers.url.js

async function HandleRedirectOrignalUrl(req, res) {
  try {
    const shortIdParam = req.params.id;

    const entry = await URL.findOneAndUpdate(
      {
        ShortId: shortIdParam,
      },
      {
        $push: {
          VisitHistory: {
            timestamps: Date.now(),
          },
        },
      },
      { returnDocument: "after" },
    );

    if (!entry) {
      return res.status(404).send(`
                <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
                    <h1>🔗 Link Not Found</h1>
                    <p>The short URL code <strong>"${shortIdParam}"</strong> does not exist in our database.</p>
                </div>
            `);
    }
    return res.redirect(entry.RedirectUrl);
  } catch (error) {
    console.error("🔴 REDIRECT SYSTEM ERROR:", error);
    return res.status(500).json({ error: "Internal Server Redirect Failure." });
  }
}

async function HandleGetAnalytics(req, res) {
  const ShortId = req.params.id;
  const result = await URL.findOne({ ShortId });
  return res.status(200).json({
    totalClicks: result.VisitHistory.length,
    analytics: result.VisitHistory,
  });
}

export {
  HandleGenerateNewShortUrl,
  HandleRedirectOrignalUrl,
  HandleGetAnalytics,
};
