const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrape() {
  try {
    const url = "https://eksisozluk.com/entry/180874625?debe=true";
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const $ = cheerio.load(data);

    const titleHtml = $("#title").prop("outerHTML") || "";
    const contentHtml = $("#entry-item-list").prop("outerHTML") || "";
     const oncekisonki = $("#debe-nav").prop("outerHTML") || "";

    // 🔹 HTML çıktısını CSS linkiyle birlikte hazırla
    const finalHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DEBE</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ${titleHtml}
  ${contentHtml}
  ${oncekisonki}
</body>
</html>
`;

    fs.writeFileSync("debe.html", finalHtml, "utf-8");
    console.log("Başlık ve içerik debe.html dosyasına yazıldı, CSS linki eklendi!");
  } catch (err) {
    console.error("Hata:", err.message);
  }
}

scrape();

