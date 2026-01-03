const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Proje klasöründeki dosyaları (debe.html, style.css vb.) statik olarak sun
app.use(express.static(path.join(__dirname)));

// Ana sayfa isteğinde debe.html dosyasını gönder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "debe.html"));
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
