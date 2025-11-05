// src/App.jsx - TEMİZ, ÇALIŞIR, iyzico ÖDEME
import React from 'react'
import { useState } from 'react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, title: 'Kutlamalar', price: 499.90, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Hediyelik Mumlar', price: 89.90, img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Hediyelik Sabunlar', price: 69.90, img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Düğünler', price: 2999.90, img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { id: 5, title: 'Etkinlikler', price: 1499.90, img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  ];

  const handleAddToBasket = (title) => {
    const product = products.find(p => p.title === title);
    if (product) {
      setCart([...cart, product]);
      alert(`${title} sepete eklendi!`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
const startIyzico = async () => {
  if (cart.length === 0) return alert('Sepet boş!');

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const totalStr = totalAmount.toFixed(2);

  const basketItems = cart.map(item => ({
    id: item.id.toString(),
    name: item.title.substring(0, 100),
    category1: "Genel",
    itemType: "VIRTUAL",
    price: item.price.toFixed(2)
  }));

  const payload = {
    locale: "tr",
    conversationId: Date.now().toString(),
    price: totalStr,
    paidPrice: totalStr,
    currency: "TRY",
    installment: "1",
    basketId: "B" + Date.now(),
    paymentGroup: "PRODUCT",
    callbackUrl: `${window.location.origin}/payment-success.html`,
    enabledInstallments: [1],

    buyer: {
      id: "BY" + Date.now(),
      name: "Ebru",
      surname: "Test",
      gsmNumber: "+905350000000",
      email: "ebru@example.com",
      identityNumber: "11111111111",
      registrationAddress: "Test Adres",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34000"
    },

    shippingAddress: {
      contactName: "Ebru Test",
      city: "Istanbul",
      country: "Turkey",
      address: "Test Adres",
      zipCode: "34000"
    },

    billingAddress: {
      contactName: "Ebru Test",
      city: "Istanbul",
      country: "Turkey",
      address: "Test Adres",
      zipCode: "34000"
    },

    basketItems: basketItems
  };

  console.log('GÖNDERİLEN PAYLOAD:', JSON.stringify(payload, null, 2));

  try {
    const res = await fetch('http://localhost:3001/api/iyzico/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('İYZİCO YANIT:', data);

    if (data.status === 'success') {
      console.log('YÖNLENDİRME BAŞLIYOR...');
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.paymentPageUrl;
      form.innerHTML = data.checkoutFormContent;
      document.body.appendChild(form);
      form.submit();
    } else {
      alert(`Hata: ${data.errorMessage} (Kod: ${data.errorCode})`);
    }
  } catch (err) {
    alert('Sunucu hatası: ' + err.message);
  }
};

  return (
    <div className="min-h-screen bg-[#cae6d5] bg-cover bg-center bg-no-repeat font-serif">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8 px-8 pt-6">
        <a href="/" className="flex items-center space-x-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-gray-700">MarkaAdı</span>
        </a>
        <a href="/about" className="text-green-700 font-semibold hover:underline">Hakkımızda</a>
        <a href="mailto:info@markaadi.com" className="text-green-700 font-semibold hover:underline">İletişim</a>
        <button
          onClick={() => setShowCart(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-4"
        >
          Sepete Git ({cart.length})
        </button>
      </div>

      <h1 className="text-gray-700 text-4xl text-center font-family-times mb-8 px-2">
        Eşsiz deneyimlerimizle yeni anlar yaşayın
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-lg flex flex-col items-center w-64 p-6 mb-6">
            <img src={p.img} alt={p.title} className="rounded-full w-32 h-32 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-center">{p.title}</h3>
            <p className="text-gray-600 text-sm text-center line-clamp-3 mb-2">
              {p.title === 'Kutlamalar' ? 'Lorem ipsum dolor sit amet, consectetur...' :
               p.title === 'Hediyelik Mumlar' ? 'Özel günleriniz için el yapımı, hoş kokulu...' :
               p.title === 'Hediyelik Sabunlar' ? 'Doğal içerikli, zarif tasarımlı...' :
               p.title === 'Düğünler' ? 'Hayatınızın en özel gününü unutulmaz kılmak...' :
               'Farklı etkinlikler için esnek ve yaratıcı çözümler...'}
            </p>
            <div className="text-green-600 font-bold mb-2">{p.price.toFixed(2)} TL</div>
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={() => handleAddToBasket(p.title)}
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>

      <footer className="w-full mt-12 py-6 bg-green-100 text-center text-gray-600 text-sm rounded-t-lg">
        © {new Date().getFullYear()} MarkaAdı. Tüm hakları saklıdır.
      </footer>

      {/* SEPET MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sepetim ({cart.length})</h2>
              <button onClick={() => setShowCart(false)} className="text-2xl">&times;</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Sepetiniz boş</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b py-2">
                    <span>{item.title}</span>
                    <span className="font-semibold">{item.price.toFixed(2)} TL</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Kaldır</button>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Toplam:</span>
                    <span>{total.toFixed(2)} TL</span>
                  </div>
                  <button
                    onClick={startIyzico}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                  >
                    Ödeme Yap (iyzico)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;