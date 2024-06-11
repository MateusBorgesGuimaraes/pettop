import React from "react";
import { useNavigate } from "react-router-dom";
import { ATT_CART, CREATE_USER_CART, GET_USER_CART_BY_ID } from "../api";
import UserContext from "./UserContext";
import useFetch from "../Hooks/useFetch";

type ICart = {
  _id: string;
  userId: string;
  products: { productId: string; quantity: number }[];
};

type ICartContext = {
  dataCart: ICart | null;
  loading: boolean;
  error: string | null;
  createCart: () => Promise<void>;
  addItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

export const CartContext = React.createContext<ICartContext | null>(null);

export const CartStorage = ({ children }: React.PropsWithChildren) => {
  const { data, login } = React.useContext(UserContext) || {};

  const { request } = useFetch();

  const [dataCart, setDataCart] = React.useState<ICart | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const token = window.localStorage.getItem("token");

  async function createCart() {
    if (data && token && login) {
      const { url, options } = GET_USER_CART_BY_ID(data?._id, token);
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.length === 0 && token) {
        const { url, options } = CREATE_USER_CART(token, data?._id);
        const response = await fetch(url, options);
        const json = await response.json();
        setDataCart(json[0]);
      } else {
        setDataCart(json[0]);
      }
    }
  }

  async function removeItem(id: string) {
    let newProducts: { productId: string; quantity: number }[] = [];
    if (dataCart && dataCart.products) {
      newProducts = dataCart.products
        .map((prod) => {
          if (prod.productId === id) {
            return { ...prod, quantity: prod.quantity - 1 };
          } else {
            return prod;
          }
        })
        .filter((prod) => prod.quantity > 0); // Remove produtos com quantidade zero
    }

    if (data && dataCart && token && dataCart._id) {
      const { url, options } = ATT_CART(token, dataCart._id, {
        ...dataCart,
        products: newProducts,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setDataCart(json);
      }
    }
  }

  async function addItem(id: string) {
    let productFound = false;
    let newProducts: { productId: string; quantity: number }[] = [];
    if (dataCart && dataCart.products) {
      newProducts = dataCart.products.map((prod) => {
        if (prod.productId === id) {
          productFound = true;
          return { ...prod, quantity: prod.quantity + 1 };
        } else {
          return prod;
        }
      });

      if (!productFound) {
        newProducts.push({ productId: id, quantity: 1 });
      }
    }

    if (data && dataCart && token && dataCart._id) {
      const { url, options } = ATT_CART(token, dataCart._id, {
        ...dataCart,
        products: newProducts,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setDataCart(json);
      }
    }
  }

  return (
    <CartContext.Provider
      value={{ addItem, removeItem, createCart, dataCart, loading, error }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
