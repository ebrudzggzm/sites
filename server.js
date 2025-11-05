// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/iyzico/initialize', async (req, res) => {
  const payload = req.body;
  console.log('ALINAN PAYLOAD:', JSON.stringify(payload, null, 2));

  const API_KEY = 'sandbox-N8QTPjGp73FZUdyRtuvMAqkteKY7Dlvx';
  const SECRET_KEY = 'sandbox-VSzXmJWRBRJUfSYsHkJfh3aw5bh1bSlC';

  const auth = 'Basic ' + Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString('base64');

  try {
    const response = await fetch('https://sandbox-api.iyzipay.com/payment/v2/checkout-form/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('İYZİCO YANIT (BACKEND):', data);
    res.json(data);
  } catch (err) {
    console.error('BACKEND HATA:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('BACKEND ÇALIŞIYOR: http://localhost:3001');
});