import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";

const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/home", changefreq: "daily", priority: 0.8 },
    { url: "/events", changefreq: "weekly", priority: 0.7 },
    { url: "/CA", changefreq: "monthly", priority: 0.5 },
    { url: "/login", changefreq: "monthly", priority: 0.5 },
    { url: "/signup", changefreq: "monthly", priority: 0.5 },
    { url: "/myTeams", changefreq: "weekly", priority: 0.7 },
    { url: "/ca-register", changefreq: "monthly", priority: 0.5 },
    { url: "/allCaRequests", changefreq: "monthly", priority: 0.5 },
    { url: "/allUsers", changefreq: "monthly", priority: 0.5 },
];

const sitemapStream = new SitemapStream({ hostname: "https://codefest.iitbhu.tech" });

streamToPromise(sitemapStream)
    .then((data) => fs.writeFileSync("./public/sitemap.xml", data.toString()))
    .catch((err) => console.error(err));

links.forEach((link) => sitemapStream.write(link));
sitemapStream.end();
