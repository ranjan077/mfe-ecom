import { useState } from "react";

import "./App.css";

type Product = {
  id: string;
  name: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Wireless Mouse", price: 29 },
  { id: "p2", name: "Mechanical Keyboard", price: 89 },
  { id: "p3", name: "USB-C Hub", price: 45 },
  { id: "p4", name: "Monitor Stand", price: 39 },
  { id: "p5", name: "Webcam HD", price: 59 },
  { id: "p6", name: "Desk Lamp", price: 34 },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyeBrow">Products MFE - standalone</p>
          <h1>Products</h1>
        </div>
      </header>
      <main className="main">
        <div className="grid">
          {PRODUCTS.map((product) => {
            return (
              <article className="card" key={product.id}>
                <h2>{product.name}</h2>
                <p className="price">${product.price}</p>
                <button type="button">Add to cart</button>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
