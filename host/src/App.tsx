import { useState } from "react";
import "./App.css";

type Page = "home" | "products" | "cart";
function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="app">
      <header>
        <strong>Microshop</strong>
        <nav className="nav">
          <button
            type="button"
            className="{
          page == 'home' ? 'nav link active' : 'nav-link'
          }"
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            type="button"
            className="{
          page == 'products' ? 'nav link active' : 'nav-link'
          }"
            onClick={() => setPage("products")}
          >
            Products
          </button>
          <button
            type="button"
            className="{
          page == 'cart' ? 'nav link active' : 'nav-link'
          }"
            onClick={() => setPage("cart")}
          >
            Cart
          </button>
        </nav>
      </header>
      <main className="main">
        {page == "home" && (
          <section className="panel">
            <h1>Host/Shell</h1>
          </section>
        )}
        {page == "products" && (
          <section className="panel">
            <h1>Products</h1>
            <p className="muted">Products remote will be rendered here...</p>
          </section>
        )}
        {page == "cart" && (
          <section className="panel">
            <h1>Cart</h1>
            <p className="muted">Cart remote will be rendered here...</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
