import { createContext, useEffect, useReducer } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const CartContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exits = state.products.find(
        (item) => item.productId === action.payload.productId
      );
      if (exits) {
        return {
          ...state,
          products: state.products.map((item) => {
            if (item.productId === action.payload.productId) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            } else {
              return item;
            }
          }),
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      }
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload.productId
        ),
      };
    case "UPDATE_CART": {
      const updatedProducts = state.products.map((product) => {
        if (product.productId === action.payload.productId) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }
        return product;
      });

      return {
        ...state,
        products: updatedProducts,
      };
    }
    case "REMOVE_CART":
      return {
        ...state,
        products: [],
      };
    default:
      throw new Error("Invalid action type: " + action.type);
  }
};
const storedCartData = localStorage.getItem("cart");

let initialState = {
  products: [],
};

if (storedCartData) {
  const parsedCartData = JSON.parse(storedCartData);
  initialState = {
    products: parsedCartData,
  };
}
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const { findProductById } = useAppContext();
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.products));
  }, [state.products]);

  const totalItems = state.products.length;

  const handleAddItem = (productId, quantity) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { productId, quantity },
    });
  };
  const handleRemoveItem = (productId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { productId },
    });
  };
  const handleUpdateItem = (productId, quantity) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { productId, quantity },
    });
  };
  const handleRemoveCart = () => {
    dispatch({
      type: "REMOVE_CART",
    });
  };
  const items = state.products.map((item) => ({
    product: findProductById(item.productId),
    quantity: item.quantity,
  }));

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleAddItem,
        totalItems,
        handleRemoveItem,
        items,
        handleUpdateItem,
        handleRemoveCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
