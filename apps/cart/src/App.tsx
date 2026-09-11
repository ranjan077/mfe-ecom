import "./App.css";
import {
  clearCart as clearCartAction,
  removeItem as removeItemAction,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  useAppDispatch,
  useAppSelector,
} from "@shared/components";

function App() {
  const items = useAppSelector(selectCartItems);
  const totalCount = useAppSelector(selectCartCount);
  const totalPrice = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  const removeItem = (id: string) => dispatch(removeItemAction(id));
  const clearCart = () => dispatch(clearCartAction());

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
