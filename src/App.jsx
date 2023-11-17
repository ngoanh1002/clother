import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./routes/Root";
import Home from "./routes/Home";
import Products from "./routes/Products";
import Blog from "./routes/Blog";
import Cart from "./routes/Cart";
import Login from "./routes/Login";
import ProductDetail from "./routes/ProductDetail";
import Wishlist from "./routes/Wishlist";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import Checkout from "./routes/Checkout";
import Confirm from "./routes/Confirm";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "cart", element: <Cart /> },
        { path: "login", element: <Login /> },
        { path: "products/:productId", element: <ProductDetail /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "checkout", element: <Checkout /> },
        { path: "confirm", element: <Confirm /> },
      ],
    },
  ]);
  return (
    <AppProvider>
      <CartProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CartProvider>
    </AppProvider>
  );
}

export default App;
