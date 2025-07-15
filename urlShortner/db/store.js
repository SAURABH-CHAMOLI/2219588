import { recordClick, getStats, saveUrl, exists } from '../db/store.js';
import { Log } from '../logService.js';
import { generateShortCode } from '../utils/shortener.js';

export const handleRedirect = async (req, res) => {
  const code = req.params.code;
  const link = getUrl(code);

  if (!link) {
    await Log("backend", "warn", "url", `Code '${code}' missing or expired`);
    return res.status(404).json({ error: "Not found or expired" });
  }

  const from = req.get("Referrer") || "direct";
  recordClick(code, from, "IN");
  await Log("backend", "info", "url", `Used '${code}' for redirect`);
  res.redirect(link);
};

export const showStats = async (req, res) => {
  const code = req.params.code;
  const info = getStats(code);

  if (!info) {
    await Log("backend", "warn", "url", `No data for '${code}'`);
    return res.status(404).json({ error: "No data found" });
  }

  await Log("backend", "info", "url", `Stats shown for '${code}'`);
  res.status(200).json(info);
};

export const generateShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || typeof url !== 'string') {
      await Log("backend", "error", "url", "Bad input");
      return res.status(400).json({ error: "Invalid URL" });
    }

    const code = generateShortCode(shortcode);
    const now = new Date();
    const expires = new Date(now.getTime() + validity * 60000);

    saveUrl(code, url, expires);

    await Log("backend", "info", "url", `Made '${code}' for '${url}'`);

    res.status(201).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: expires.toISOString()
    });
  } catch (err) {
    await Log("backend", "fatal", "url", "Could not shorten");
    res.status(500).json({ error: "Something went wrong" });
  }
};
