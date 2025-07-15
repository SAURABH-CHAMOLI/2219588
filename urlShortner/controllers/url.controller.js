import { recordClick, getStats, saveUrl, exists } from '../db/store.js';
import { Log } from '../logService.js';
import { generateShortCode } from '../utils/shortener.js';

// Redirect to the original URL using shortcode
export const goToOriginalUrl = async (req, res) => {
  const shortCode = req.params.code;
  const fullUrl = getUrl(shortCode);

  if (!fullUrl) {
    await Log("backend", "warn", "url", `Code '${shortCode}' not found or expired`);
    return res.status(404).json({ error: "Short URL not found or expired" });
  }

  const source = req.get("Referrer") || "direct";
  recordClick(shortCode, source, "IN");
  await Log("backend", "info", "url", `Redirected using code '${shortCode}'`);
  res.redirect(fullUrl);
};

// Get usage stats for a given shortcode
export const fetchUrlStats = async (req, res) => {
  const shortCode = req.params.code;
  const urlStats = getStats(shortCode);

  if (!urlStats) {
    await Log("backend", "warn", "url", `No stats found for '${shortCode}'`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  await Log("backend", "info", "url", `Fetched stats for '${shortCode}'`);
  res.status(200).json(urlStats);
};

// Create a new short URL
export const makeShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || typeof url !== 'string') {
      await Log("backend", "error", "url", "Invalid URL input");
      return res.status(400).json({ error: "Please provide a valid URL" });
    }

    const code = generateShortCode(shortcode);
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + validity * 60000);

    saveUrl(code, url, endTime);

    await Log("backend", "info", "url", `Created short URL '${code}' for '${url}' valid for ${validity} mins`);

    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: endTime.toISOString()
    });
  } catch (error) {
    await Log("backend", "fatal", "url", "Error while making short URL");
    res.status(500).json({ error: "Internal server error" });
  }
};
