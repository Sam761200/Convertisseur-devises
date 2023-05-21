const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Endpoint pour obtenir les devises disponibles
app.get('/currencies', async (req, res) => {
  try {
    // Appel à l'API pour obtenir les devises
    const response = await axios.get(
      'https://openexchangerates.org/api/currencies.json'
    );

    const currencies = response.data;
    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
});

// Endpoint pour effectuer la conversion
app.post('/convert', async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    // Appel à l'API pour obtenir les taux de change
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=YOUR_APP_ID&base=${from}`
    );

    const rates = response.data.rates;
    const convertedAmount = amount * rates[to];

    res.json({ result: convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});