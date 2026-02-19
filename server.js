const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let players = {};

app.post("/register", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.json({ success: false, message: "Thiếu username" });
  }

  if (players[username]) {
    return res.json({ success: false, message: "Tài khoản đã tồn tại" });
  }

  players[username] = {
    level: 1,
    gold: 100,
    pokemon: ["Eevee"]
  };

  res.json({ success: true, data: players[username] });
});

app.get("/player/:username", (req, res) => {
  const username = req.params.username;
  res.json(players[username] || {});
});

app.listen(3000, () => {
  console.log("Server chạy tại cổng 3000");
});
