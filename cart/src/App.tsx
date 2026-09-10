import { useEffect, useState } from "react";
import "./App.css";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const DEMO_ITEMS: CartItem[] = [
  {
    id: "p1",
    name: "Wireless Mouse",
    price: 29,
    quantity: 1,
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    price: 89,
    quantity: 2,
  },
];

function App() {
  const [items, setItems] = useState<CartItem[]>(DEMO_ITEMS);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const removeItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
  };

  const clearCart = () => {
    setItems([]);
  };
  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">Cart MFE · standalone</p>
          <h1>Cart</h1>
        </div>
      </header>

      <main className="main">
        <section className="panel">
          <div className="panel-top">
            <h2>Your cart</h2>
            <span className="badge">Items: {totalCount}</span>
          </div>

          {items.length === 0 ? (
            <p className="empty">Cart is empty. Add a product from Products.</p>
          ) : (
            <ul className="list">
              {items.map((item) => (
                <li key={item.id} className="row">
                  <span>
                    {item.name} × {item.quantity} — $
                    {item.price * item.quantity}
                  </span>
                  <button type="button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 ? (
            <div className="footer">
              <strong>Total: ${totalPrice}</strong>
              <button type="button" className="secondary" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default App;
