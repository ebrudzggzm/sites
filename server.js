// server.js - İYZİCO RESMİ SDK ile
import express from 'express';
import cors from 'cors';
import Iyzipay from 'iyzipay';

const app = express();
app.use(cors());
app.use(express.json());

// İyzico Configuration
const iyzipay = new Iyzipay({
  apiKey: 'sandbox-N8QTPjGp73FZUdyRtuvMAqkteKY7Dlvx',
  secretKey: 'sandbox-VSzXmJWRBRJUfSYsHkJfh3aw5bh1bSlC',
  uri: 'https://sandbox-api.iyzipay.com'
});

app.post('/api/iyzico/initialize', async (req, res) => {
  const requestData = req.body;
  
  console.log('\n' + '='.repeat(80));
  console.log('📨 FRONTEND\'TEN GELEN İSTEK');
  console.log('='.repeat(80));
  console.log(JSON.stringify(requestData, null, 2));
  console.log('='.repeat(80) + '\n');

  // iyzico SDK ile checkout form oluştur
  iyzipay.checkoutFormInitialize.create(requestData, function (err, result) {
    console.log('\n' + '='.repeat(80));
    console.log('📥 İYZİCO SDK YANITI');
    console.log('='.repeat(80));
    
    if (err) {
      console.error('❌ SDK HATASI:', err);
      console.log('='.repeat(80) + '\n');
      return res.status(500).json({
        status: 'error',
        error: err.message || err
      });
    }
    
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    console.log('='.repeat(80) + '\n');
    
    if (result.status === 'success') {
      console.log('✅ BAŞARILI! Ödeme sayfası hazır!');
      console.log('🔗 Payment URL:', result.paymentPageUrl);
      console.log('🎫 Token:', result.token);
    } else {
      console.log('❌ HATA:', result.errorMessage || 'Bilinmeyen hata');
      console.log('🔢 Hata Kodu:', result.errorCode || 'N/A');
    }
    
    res.json(result);
  });
});

app.listen(3001, () => {
  console.log('\n' + '✅'.repeat(40));
  console.log('🚀 BACKEND SUNUCU ÇALIŞIYOR!');
  console.log('🔗 URL: http://localhost:3001');
  console.log('📦 İyzico SDK: ENTEGRE');
  console.log('✅'.repeat(40) + '\n');
});