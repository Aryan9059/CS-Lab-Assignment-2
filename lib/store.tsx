"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { Product } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CouponLogEntry {
  application: number;
  before: number;
  after: number;
  saved: number;
}

interface CartState {
  items: CartItem[];
  discountedTotal: number | null; // null means no coupon applied yet
  couponLog: CouponLogEntry[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "APPLY_DISCOUNT"; newTotal: number }
  | { type: "CLEAR_COUPON" }
  | { type: "HYDRATE"; state: CartState };

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  originalTotal: number;
  discountedTotal: number | null;
  couponLog: CouponLogEntry[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  applyDiscount: (newTotal: number) => void;
  clearCoupon: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Reducer ──────────────────────────────────────────────────────────────────

function computeOriginal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          )
        : [...state.items, { product: action.product, quantity: action.quantity }];
      // Reset coupon when cart changes
      return { items, discountedTotal: null, couponLog: [] };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.product.id !== action.productId);
      return { items, discountedTotal: null, couponLog: [] };
    }
    case "UPDATE_QTY": {
      const items =
        action.quantity <= 0
          ? state.items.filter((i) => i.product.id !== action.productId)
          : state.items.map((i) =>
              i.product.id === action.productId
                ? { ...i, quantity: action.quantity }
                : i
            );
      return { items, discountedTotal: null, couponLog: [] };
    }
    case "APPLY_DISCOUNT": {
      // ⚠️ VULNERABILITY: This just blindly accepts the new total from the API.
      // No check on how many times the coupon has been used.
      const before =
        state.discountedTotal ?? computeOriginal(state.items);
      const after = action.newTotal;
      const saved = parseFloat((before - after).toFixed(2));
      const entry: CouponLogEntry = {
        application: state.couponLog.length + 1,
        before,
        after,
        saved,
      };
      return {
        ...state,
        discountedTotal: after,
        couponLog: [...state.couponLog, entry],
      };
    }
    case "CLEAR_COUPON": {
      return { ...state, discountedTotal: null, couponLog: [] };
    }
    case "HYDRATE": {
      return action.state;
    }
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  discountedTotal: null,
  couponLog: [],
};

// ─── Provider ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "diyas_shop_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: "HYDRATE", state: JSON.parse(saved) });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const originalTotal = computeOriginal(state.items);
  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    originalTotal,
    discountedTotal: state.discountedTotal,
    couponLog: state.couponLog,
    cartCount,
    addToCart: (product, quantity = 1) =>
      dispatch({ type: "ADD_ITEM", product, quantity }),
    removeFromCart: (productId) =>
      dispatch({ type: "REMOVE_ITEM", productId }),
    updateQty: (productId, quantity) =>
      dispatch({ type: "UPDATE_QTY", productId, quantity }),
    applyDiscount: (newTotal) =>
      dispatch({ type: "APPLY_DISCOUNT", newTotal }),
    clearCoupon: () => dispatch({ type: "CLEAR_COUPON" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
