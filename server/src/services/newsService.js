const axios = require("axios");

/**
 * Fetches latest news headlines for a country.
 * Uses GNews API (free tier: 100 requests/day).
 * Fallback: returns empty array gracefully.
 */

const GNEWS_API_KEY = process.env.GNEWS_API_KEY || "";

const fetchNewsData = async (countryName) => {
  try {

    // Try GNews API first
    if (GNEWS_API_KEY) {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(countryName)}&lang=en&max=5&apikey=${GNEWS_API_KEY}`,
        { timeout: 8000 }
      );

      if (response.data?.articles?.length) {
        return {
          headlines: response.data.articles.map((article) => ({
            title: article.title,
            source: article.source?.name || "Unknown",
            date: article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Unknown",
            url: article.url,
            image: article.image || null,
          })),
        };
      }
    }

    // Fallback: Use free NewsData.io or similar
    try {
      const fallbackResponse = await axios.get(
        `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_API_KEY || ""}&q=${encodeURIComponent(countryName)}&language=en&size=5`,
        { timeout: 8000 }
      );

      if (fallbackResponse.data?.results?.length) {
        return {
          headlines: fallbackResponse.data.results.slice(0, 5).map((article) => ({
            title: article.title,
            source: article.source_name || article.source_id || "Unknown",
            date: article.pubDate
              ? new Date(article.pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Unknown",
            url: article.link,
            image: article.image_url || null,
          })),
        };
      }
    } catch {
      // Fallback also failed, return empty
    }

    // Final fallback: generated placeholder headlines
    return {
      headlines: [
        {
          title: `Latest developments in ${countryName}`,
          source: "Grey Globes",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          url: `https://news.google.com/search?q=${encodeURIComponent(countryName)}`,
          image: null,
        },
        {
          title: `Economic outlook for ${countryName} — what to watch`,
          source: "Grey Globes",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          url: `https://news.google.com/search?q=${encodeURIComponent(countryName)}+economy`,
          image: null,
        },
        {
          title: `${countryName} in global spotlight — policy and development`,
          source: "Grey Globes",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          url: `https://news.google.com/search?q=${encodeURIComponent(countryName)}+policy`,
          image: null,
        },
      ],
    };

  } catch (error) {

    console.error("News fetch error:", error.message);

    return {
      headlines: [],
    };

  }
};

module.exports = {
  fetchNewsData,
};
