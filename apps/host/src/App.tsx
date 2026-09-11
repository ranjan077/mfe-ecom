import { lazy, Suspense } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

const ProductList = lazy(() => import("products/ProductList"));
const Cart = lazy(() => import("cart/Cart"));

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "shell-nav-link is-active" : "shell-nav-link";

function RemoteFallback({ name }: { name: string }) {
  return (
    <p className="shell-loading">
      <span className="shell-spinner" aria-hidden="true" />
      Loading {name} remote…
    </p>
  );
}

function Home() {
  return (
    <section className="shell-panel">
      <p className="shell-eyebrow">Host / Shell</p>
      <h1>Microshop</h1>
      <p className="shell-lede">
        This shell composes independently deployed microfrontends at runtime
        with Module Federation. Pick a section to load its remote on demand.
      </p>

      <div className="shell-remote-grid">
        <article className="shell-remote-card">
          <h2>Products</h2>
          <p>
            Catalog remote · <span className="shell-port">:3001</span>
          </p>
        </article>
        <article className="shell-remote-card">
          <h2>Cart</h2>
          <p>
            Cart remote · <span className="shell-port">:3002</span>
          </p>
        </article>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="shell-header">
          <NavLink to="/" className="shell-brand">
            <span className="shell-brand-mark" aria-hidden="true">
              M
            </span>
            Microshop
          </NavLink>

          <nav className="shell-nav" aria-label="Main">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              Cart
            </NavLink>
          </nav>
        </header>

        <main className="shell-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <Suspense fallback={<RemoteFallback name="Products" />}>
                  <ProductList />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<RemoteFallback name="Cart" />}>
                  <Cart />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
