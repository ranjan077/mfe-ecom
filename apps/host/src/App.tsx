import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { selectCartCount, useAppSelector } from "@shared/components";
import { store } from "./store";
import "./App.css";

const ProductList = lazy(() => import("products/ProductList"));
const Cart = lazy(() => import("cart/Cart"));

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "shell-nav-link is-active" : "shell-nav-link";

function CartIcon() {
  return (
    <svg
      className="shell-nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.4l2.3 11.2a1.8 1.8 0 0 0 1.77 1.44h9.1a1.8 1.8 0 0 0 1.76-1.4L21 7.5H5.4" />
    </svg>
  );
}

/*
 * Reads the host-owned store, so it reflects adds dispatched from the Products
 * remote and removals dispatched from the Cart remote alike. Has to be its own
 * component because a hook cannot be called inside NavLink's className callback.
 */
function CartNavLink() {
  const count = useAppSelector(selectCartCount);

  return (
    <NavLink
      to="/cart"
      className={navLinkClass}
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart, empty"}
    >
      <CartIcon />
      Cart
      {count > 0 ? (
        <span className="shell-cart-count" aria-hidden="true">
          {count}
        </span>
      ) : null}
    </NavLink>
  );
}

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
    // Provider sits above BrowserRouter so every remote lazily mounted under
    // <Routes> is inside it and can useSelector/useDispatch with no props.
    <Provider store={store}>
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
              <CartNavLink />
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
    </Provider>
  );
}

export default App;
