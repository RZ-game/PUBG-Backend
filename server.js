import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔒 Sua chave está protegida no Render (variável de ambiente)
const API_KEY = process.env.PUBG_API_KEY;

app.use(cors());

// Rota para buscar estatísticas
app.get("/stats/:player", async (req, res) => {
  try {
    const playerName = req.params.player;

    const response = await fetch(
      `https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`,
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Accept": "application/vnd.api+json"
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados do PUBG" });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
