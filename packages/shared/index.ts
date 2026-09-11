import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export type CartAddDetail = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = CartAddDetail & {
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

/*
 * The slice lives here rather than in the host on purpose. If it lived in the
 * host, remotes would have to `import from "host/cartSlice"` — a remote -> host
 * federated import, which inverts the dependency direction and stops each
 * remote from running standalone on its own port.
 *
 * `name: "cart"` is frozen API. It produces the action type strings
 * ("cart/addItem", ...) that are the actual contract across the federation
 * boundary, since each remote bundles its own copy of this module.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartAddDetail>) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

/**
 * Builds a complete store. The host calls this once and provides the instance;
 * each remote calls it only in its standalone `main.tsx` entry.
 *
 * Deliberately a factory, never a module-scope instance: this module is bundled
 * into every app, so a module-scope store would silently become three stores.
 */
export function createAppStore() {
  return configureStore({
    reducer: { cart: cartSlice.reducer },
  });
}

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
