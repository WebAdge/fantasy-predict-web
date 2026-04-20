const routes = [
  "/",
  "/login",
  "/features",
  "/verify-account",
  "/create-account",
  "/create-password",
  "/privacy-policy",
  "/reset-password",
  "/forget-password",
  "/terms-and-condition",
  "/home",
  "/home/score",
  "/home/pools",
  "/create-pool",
  "/profile",
];

function generateSitemap() {
  const currentDate = new Date().toISOString();
  const sitemapItems = routes.map((route) => {
    const loc = route.replace(/:([^\/]+)/g, "");
    return `
        <url>
          <loc>https://app.chacha.nyc${loc}</loc>
          <lastmod>${currentDate}</lastmod>
        </url>
      `;
  });

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapItems.join("")}
      </urlset>
    `;

  return sitemap;
}

module.exports = generateSitemap;
