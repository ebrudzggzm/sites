import React from 'react'

const Basket = () => {
  // Örnek sepet verisi (gerçek uygulamada props veya context ile alınır)
  const [basket, setBasket] = React.useState([
    { id: 1, name: "Ürün 1", quantity: 2, price: 100 },
    { id: 2, name: "Ürün 2", quantity: 1, price: 150 }
  ]);

  const increase = (id) => {
    setBasket(basket.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrease = (id) => {
    setBasket(basket.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const remove = (id) => {
    setBasket(basket.filter(item => item.id !== id));
  };

  const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Örnek yeni ürünler (gerçek uygulamada props veya context ile alınır)
  const newProducts = [
    { id: 101, name: "Yeni Ürün A", price: 120 },
    { id: 102, name: "Yeni Ürün B", price: 90 },
    { id: 103, name: "Yeni Ürün C", price: 75 }
  ];

  // Örnek ödeme yöntemleri
  const paymentMethods = [
    { id: 1, name: "Kredi Kartı" },
    { id: 2, name: "Banka Kartı" },
    { id: 3, name: "Kapıda Ödeme" }
  ];

  if (basket.length === 0) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e8f5e9"
      }}>
        <div style={{
          padding: "32px",
          textAlign: "center",
          color: "#7cb342",
          fontSize: "18px",
          background: "#f1f8e9",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(124,179,66,0.08)"
        }}>
          Sepetiniz boş
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#e8f5e9",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }}>
      {/* Sol yeni ürünler */}
      <div style={{
        width: 220,
        padding: "40px 16px",
        background: "#f1f8e9",
        borderRadius: "0 16px 16px 0",
        marginRight: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(124,179,66,0.06)"
      }}>
        <div style={{ fontWeight: 600, color: "#388e3c", marginBottom: 18, fontSize: 17 }}>Yeni Ürünler</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
          {newProducts.map(prod => (
            <li key={prod.id} style={{
              marginBottom: 18,
              background: "#fff",
              borderRadius: 8,
              padding: "12px 10px",
              boxShadow: "0 1px 4px rgba(124,179,66,0.07)",
              color: "#388e3c",
              fontSize: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}>
              <span style={{ fontWeight: 500 }}>{prod.name}</span>
              <span style={{ color: "#7cb342", fontSize: 14 }}>{prod.price}₺</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sepet */}
      <div style={{
        flex: 1,
        maxWidth: 600,
        margin: "0 0",
        padding: "40px 24px",
        background: "#e8f5e9",
        borderRadius: "0",
        boxShadow: "none",
        border: "none",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#388e3c"
        }}>Sepetiniz</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {basket.map(item => (
            <li key={item.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 0",
              borderBottom: "1px solid #c5e1a5"
            }}>
              <div>
                <div style={{ fontWeight: 500, color: "#388e3c" }}>{item.name}</div>
                <div style={{ color: "#7cb342", fontSize: 14 }}>{item.price}₺ x {item.quantity}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => decrease(item.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid #c5e1a5",
                    background: "#f1f8e9",
                    fontSize: 20,
                    color: "#388e3c",
                    cursor: "pointer"
                  }}
                >-</button>
                <span style={{ margin: "0 14px", minWidth: 24, textAlign: "center", color: "#388e3c", fontSize: 16 }}>{item.quantity}</span>
                <button
                  onClick={() => increase(item.id)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid #c5e1a5",
                    background: "#f1f8e9",
                    fontSize: 20,
                    color: "#388e3c",
                    cursor: "pointer"
                  }}
                >+</button>
                <button
                  onClick={() => remove(item.id)}
                  style={{
                    marginLeft: 20,
                    background: "#ffebee",
                    color: "#d32f2f",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: 15
                  }}
                >Sil</button>
              </div>
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: 32,
          fontWeight: 600,
          fontSize: 20,
          textAlign: "right",
          color: "#388e3c"
        }}>
          Toplam: <span style={{ color: "#558b2f" }}>{total}₺</span>
        </div>
        {/* Ödeme yöntemleri */}
        <div style={{
          marginTop: 40,
          background: "#f1f8e9",
          borderRadius: 10,
          padding: "24px 16px",
          boxShadow: "0 2px 8px rgba(124,179,66,0.07)"
        }}>
          <div style={{ fontWeight: 600, color: "#388e3c", marginBottom: 16, fontSize: 17 }}>Ödeme Yöntemleri</div>
          <div style={{ display: "flex", gap: 16 }}>
            {paymentMethods.map(method => (
              <button
                key={method.id}
                style={{
                  flex: 1,
                  background: "#fff",
                  color: "#388e3c",
                  border: "1px solid #c5e1a5",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(124,179,66,0.05)"
                }}
              >
                {method.name}
              </button>
            ))}
          </div>
        </div>
        <button
          style={{
            width: "100%",
            marginTop: 32,
            padding: "16px 0",
            background: "#43a047",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(67,160,71,0.12)"
          }}
        >
          Öde
        </button>
      </div>

      {/* Sağ yeni ürünler */}
      <div style={{
        width: 220,
        padding: "40px 16px",
        background: "#f1f8e9",
        borderRadius: "16px 0 0 16px",
        marginLeft: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(124,179,66,0.06)"
      }}>
        <div style={{ fontWeight: 600, color: "#388e3c", marginBottom: 18, fontSize: 17 }}>Yeni Ürünler</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
          {newProducts.map(prod => (
            <li key={prod.id} style={{
              marginBottom: 18,
              background: "#fff",
              borderRadius: 8,
              padding: "12px 10px",
              boxShadow: "0 1px 4px rgba(124,179,66,0.07)",
              color: "#388e3c",
              fontSize: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}>
              <span style={{ fontWeight: 500 }}>{prod.name}</span>
              <span style={{ color: "#7cb342", fontSize: 14 }}>{prod.price}₺</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Basket