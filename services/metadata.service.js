import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Fetch site metadata (description & favicon) from a given URL
 * @param {string} url - Website URL to fetch metadata from
 * @returns {Promise<{ description?: string, favicon?: string }>}
 */

export const fetchMetadata = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 8000 });
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract description
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      "";

    // Extract favicon
    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      $('meta[property="og:image"]').attr("content") ||
      "";

    // Resolve relative favicon URLs
    if (favicon && !/^https?:\/\//.test(favicon)) {
      const base = new URL(url).origin;
      favicon = `${base}${favicon.startsWith("/") ? "" : "/"}${favicon}`;
    }

    return { description, favicon };
  } catch (err) {
    console.warn(`⚠️ Failed to fetch metadata for ${url}: ${err.message}`);
    return { description: "", favicon: "" };
  }
};
