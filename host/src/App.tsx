import { useState, lazy, Suspense } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

type Page = "home" | "products" | "cart";

const ProductList = lazy(() => import("products/ProductList"));
const Cart = lazy(() => import("cart/Cart"));

function App() {
  const [page, setPage] = useState<Page>("home");
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <strong>Microshop</strong>
          <nav className="nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav link active" : "nav-link"
              }
              onClick={() => setPage("home")}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              end
              className={({ isActive }) => {
                return isActive ? "nav link active" : "nav-link";
              }}
              onClick={() => setPage("products")}
            >
              Products
            </NavLink>
            <NavLink
              type="button"
              to="/cart"
              end
              className={({ isActive }) => {
                return isActive ? "nav link active" : "nav-link";
              }}
              onClick={() => setPage("cart")}
            >
              Cart
            </NavLink>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <section className="panel">
                  <h1>Host/Shell</h1>
                </section>
              }
            ></Route>
            <Route
              path="/products"
              element={
                <Suspense
                  fallback={
                    <p className="loading">Loading Products remote...</p>
                  }
                >
                  <ProductList />
                </Suspense>
              }
            ></Route>
            <Route
              path="/cart"
              element={
                <Suspense>
                  <Cart />
                </Suspense>
              }
            ></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
