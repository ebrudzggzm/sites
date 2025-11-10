// src/App.jsx - TEMİZ, ÇALIŞIR, iyzico ÖDEME - DÜZELTİLMİŞ
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

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const startIyzico = async () => {
    if (cart.length === 0) return alert('Sepet boş!');

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    // Her sepet öğesine unique ID ve doğru format veriyoruz (fiyatlar STRING olmalı!)
    const basketItems = cart.map((item, index) => ({
      id: `BI${Date.now()}${index}`,
      name: item.title.substring(0, 256),
      category1: "Genel",
      itemType: "PHYSICAL",
      price: item.price.toFixed(2)
    }));

    const conversationId = `${Date.now()}`;
    const buyerId = `BY${Date.now()}`;
    const basketId = `B${Date.now()}`;

    const payload = {
      locale: "tr",
      conversationId: conversationId,
      price: totalAmount.toFixed(2),
      paidPrice: totalAmount.toFixed(2),
      currency: "TRY",
      basketId: basketId,
      paymentGroup: "PRODUCT",
      callbackUrl: `${window.location.origin}/payment-success.html`,
      enabledInstallments: [1, 2, 3, 6, 9, 12],

      buyer: {
        id: buyerId,
        name: "Ebru",
        surname: "Test",
        gsmNumber: "+905350000000",
        email: "ebru@example.com",
        identityNumber: "11111111111",
        lastLoginDate: "2024-01-01 12:00:00",
        registrationDate: "2023-01-01 12:00:00",
        registrationAddress: "Nidakule Göztepe Merdivenköy Mah. Bora Sok. No:1",
        ip: "85.34.78.112",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34742"
      },

      shippingAddress: {
        contactName: "Ebru Test",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742"
      },

      billingAddress: {
        contactName: "Ebru Test",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742"
      },

      basketItems: basketItems
    };

    console.log('🚀 GÖNDERİLEN PAYLOAD:', JSON.stringify(payload, null, 2));
    console.log('📦 Sepet Öğe Sayısı:', basketItems.length);
    console.log('💰 Toplam Tutar:', totalAmount.toFixed(2), 'TL');

    try {
      const res = await fetch('http://localhost:3001/api/iyzico/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('📥 İYZİCO YANIT:', data);

      // İyzico success durumunu kontrol et
      if (data.status === 'success' && data.paymentPageUrl) {
        console.log('✅ BAŞARILI! Ödeme sayfasına yönlendiriliyor...');
        console.log('🔗 Payment URL:', data.paymentPageUrl);
        console.log('🎫 Token:', data.token);
        
        // İyzico'nun ödeme sayfasına yönlendir
        // checkoutFormContent varsa onu kullan, yoksa direkt URL'e git
        if (data.checkoutFormContent) {
          // Form içeriğini kullan
          const div = document.createElement('div');
          div.innerHTML = data.checkoutFormContent;
          document.body.appendChild(div);
          const form = div.querySelector('form');
          if (form) {
            form.submit();
          } else {
            // Form yoksa direkt URL'e yönlendir
            window.location.href = data.paymentPageUrl;
          }
        } else if (data.paymentPageUrl) {
          // Direkt URL'e yönlendir
          window.location.href = data.paymentPageUrl;
        }
      } else {
        // Hata durumunda detaylı bilgi göster
        console.error('❌ HATA:', data);
        const errorMsg = data.errorMessage || 'Bilinmeyen hata';
        const errorCode = data.errorCode || 'N/A';
        alert(`Ödeme başlatılamadı!\n\nHata: ${errorMsg}\nKod: ${errorCode}\n\nLütfen tekrar deneyin.`);
      }
    } catch (err) {
      console.error('🔥 SUNUCU HATASI:', err);
      alert('Sunucu ile bağlantı kurulamadı: ' + err.message + '\n\nLütfen backend sunucusunun çalıştığından emin olun.');
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
          data-testid="cart-button"
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
              data-testid={`add-to-cart-${p.id}`}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-testid="cart-modal">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sepetim ({cart.length})</h2>
              <button onClick={() => setShowCart(false)} className="text-2xl" data-testid="close-cart">&times;</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Sepetiniz boş</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b py-2">
                    <span>{item.title}</span>
                    <span className="font-semibold">{item.price.toFixed(2)} TL</span>
                    <button 
                      onClick={() => removeFromCart(i)} 
                      className="text-red-500 text-sm"
                      data-testid={`remove-item-${i}`}
                    >
                      Kaldır
                    </button>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Toplam:</span>
                    <span data-testid="cart-total">{total.toFixed(2)} TL</span>
                  </div>
                  <button
                    onClick={startIyzico}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                    data-testid="payment-button"
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